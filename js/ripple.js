// Ripple transition effect for interstitials.
// Uses normalized animation progress (0 → 1) with easing curves so radius,
// opacity, and line width are each controlled independently. This replaces
// the old asymptotic-growth model that died from opacity before reaching
// its intended size.
//
// Interstitial ripples fire when the .is-active class is toggled, which
// bars-map.js does as the spacer takes over / releases the viewport, so a
// burst marks both the entry and the exit of the transition. Hover ripples
// on [data-ripple] figures are also supported for legacy stop-image figures.
(() => {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ripples = [];

  // --- Easing functions ---
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function ensureCanvas(el, fixed) {
    let canvas = el.querySelector('canvas');
    if (canvas) return canvas;
    canvas = document.createElement('canvas');
    if (fixed) {
      canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:51';
    } else {
      canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2';
    }
    el.appendChild(canvas);
    return canvas;
  }

  function sizeCanvas(el, viewport = false) {
    const canvas = ensureCanvas(el, viewport);
    const dpr = window.devicePixelRatio || 1;
    let w, h;
    if (viewport) {
      w = window.innerWidth;
      h = window.innerHeight;
    } else {
      const rect = el.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
    }
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
    return {canvas, ctx, w, h};
  }

  // Create a ripple with normalized progress. The ripple expands from 0 to
  // maxRadius over `duration` ms, with opacity and line width derived from
  // the same progress value via independent curves.
  function spawnRipple(canvas, ctx, w, h, x, y, opts = {}) {
    const maxR = opts.maxRadius || Math.max(w, h) * 0.85;
    const duration = opts.duration || 1400;
    const peakAlpha = opts.alpha || 0.55;
    const startWidth = opts.lineWidth || 2.5;
    ripples.push({
      canvas, ctx,
      x, y,
      startTime: performance.now(),
      duration,
      maxRadius: maxR,
      peakAlpha,
      startWidth,
      color: opts.color || '200, 190, 235'
    });
    if (ripples.length === 1) requestAnimationFrame(animate);
  }

  // A cinematic burst: 3 staggered ripples from center, each larger and
  // longer than the last, creating a layered expansion effect. The generation
  // token cancels stale scheduled ripples if the user scrolls past before
  // all three rings have spawned.
  function spawnBurst(canvas, ctx, w, h, gen) {
    const cx = w / 2;
    const cy = h / 2;
    const base = Math.max(w, h);
    spawnRipple(canvas, ctx, w, h, cx, cy, {
      alpha: 0.65, lineWidth: 3, duration: 1600,
      maxRadius: base * 0.7
    });
    setTimeout(() => {
      if (gen.current !== gen.token) return;
      spawnRipple(canvas, ctx, w, h, cx, cy, {
        alpha: 0.45, lineWidth: 2, duration: 1800,
        maxRadius: base * 0.85
      });
    }, 200);
    setTimeout(() => {
      if (gen.current !== gen.token) return;
      spawnRipple(canvas, ctx, w, h, cx, cy, {
        alpha: 0.3, lineWidth: 1.5, duration: 2000,
        maxRadius: base
      });
    }, 450);
  }

  function animate() {
    const now = performance.now();
    const alive = [];
    // Track every canvas that has ripples this frame, so we can clear
    // them all — including the final frame where the last ripple expires.
    const allCanvases = new Set();
    const byCanvas = new Map();
    for (const r of ripples) {
      allCanvases.add(r.canvas);
      const elapsed = now - r.startTime;
      const t = Math.min(1, elapsed / r.duration);
      if (t < 1) alive.push(r);
      // Eased progress for radius (ease-out: fast expansion, slow settle)
      const easedR = easeOutCubic(t);
      // Opacity: hold near peak early, then fade out (ease-in-out)
      const alphaT = easeInOutCubic(t);
      const alpha = r.peakAlpha * (1 - alphaT);
      // Line width: thins as it expands
      const width = r.startWidth * (1 - t * 0.6);
      if (alpha > 0.01 && width > 0.1) {
        if (!byCanvas.has(r.canvas)) byCanvas.set(r.canvas, []);
        byCanvas.get(r.canvas).push({r, easedR, alpha, width});
      }
    }
    // Clear every canvas that had ripples, even if no visible ripples
    // remain this frame (the final-frame fix: prevents frozen circles).
    for (const canvas of allCanvases) {
      const group = byCanvas.get(canvas);
      const ctx = group ? group[0].r.ctx : canvas.getContext('2d');
      if (!ctx) continue;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (group) {
        for (const item of group) {
          const {r, easedR, alpha, width} = item;
          const radius = easedR * r.maxRadius;
          ctx.beginPath();
          ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${r.color}, ${alpha})`;
          ctx.lineWidth = width;
          ctx.stroke();
        }
      }
    }
    ripples.length = 0;
    ripples.push(...alive);
    if (ripples.length) requestAnimationFrame(animate);
  }

  // Interstitial ripple transitions. The interstitial itself is a transparent
  // 100vh spacer in the scroll flow; the video/canvas/overlay are position:fixed
  // and their opacity is scroll-linked through the --reveal custom property set
  // by bars-map.js. Here we size the canvas to the viewport on first
  // intersection, then fire a ripple burst when .is-active is added (the media
  // takes over the screen) and again when it is removed (the media releases it).
  const interstitials = document.querySelectorAll('.journey-interstitial');
  if (interstitials.length) {
    interstitials.forEach(el => {
      let sized = false;
      let hasBurst = false;
      // Generation token: incremented when the stage changes, so stale
      // setTimeout callbacks from a previous burst can bail out.
      const gen = { current: 0, token: 0 };
      // Size the canvas the first time the spacer enters the viewport.
      const sizeIo = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !sized) {
            sized = true;
            el._sized = sizeCanvas(el, true);
          }
        }
      }, {threshold: [0]});
      sizeIo.observe(el);
      // Fire ripple bursts when the .is-active stage class is toggled.
      // Incrementing gen.token cancels any pending staggered ripples.
      const classIo = new MutationObserver(() => {
        if (!el._sized) return;
        const {canvas, ctx, w, h} = el._sized;
        if (el.classList.contains('is-active') && !hasBurst) {
          hasBurst = true;
          gen.token = ++gen.current;
          spawnBurst(canvas, ctx, w, h, gen);
        } else if (!el.classList.contains('is-active') && hasBurst) {
          hasBurst = false;
          gen.token = ++gen.current;
          spawnBurst(canvas, ctx, w, h, gen);
        }
      });
      classIo.observe(el, { attributes: true, attributeFilter: ['class'] });
    });
  }

  // Hover ripples on [data-ripple] figures (legacy support)
  const targets = document.querySelectorAll('[data-ripple]');
  targets.forEach(figure => {
    const img = figure.querySelector('img');
    if (!img) return;
    const start = () => {
      let sized = false;
      figure.addEventListener('pointermove', e => {
        if (figure._lastRipple && performance.now() - figure._lastRipple < 120) return;
        figure._lastRipple = performance.now();
        if (!sized) { figure._sized = sizeCanvas(figure); sized = true; }
        if (!figure._sized) return;
        const {canvas, ctx, w, h} = figure._sized;
        const rect = figure.getBoundingClientRect();
        spawnRipple(canvas, ctx, w, h, e.clientX - rect.left, e.clientY - rect.top,
                    {alpha: 0.35, lineWidth: 1.5, duration: 800,
                     maxRadius: Math.max(w, h) * 0.3});
      });
    };
    if (img.complete && img.naturalWidth) start();
    else img.addEventListener('load', start, {once: true});
  });

  // Re-size canvases on viewport changes (rotate, resize) so ripples stay
  // correctly scaled. Only touches elements that have already been sized.
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeTimer = null;
      document.querySelectorAll('.journey-interstitial').forEach(el => {
        if (el._sized) el._sized = sizeCanvas(el, true);
      });
      document.querySelectorAll('[data-ripple]').forEach(el => {
        if (el._sized) el._sized = sizeCanvas(el);
      });
    }, 200);
  });
})();
