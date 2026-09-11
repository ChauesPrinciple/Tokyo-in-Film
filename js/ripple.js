// Ripple transition effect for interstitials.
// When a .journey-interstitial enters the viewport, a ripple burst plays
// from the center outward. When it leaves, another burst plays.
// Also adds hover ripples to any [data-ripple] figures that still exist.
(() => {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ripples = [];

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
    return {canvas, ctx, rect: {width: w, height: h}};
  }

  function spawnRipple(canvas, ctx, rect, x, y, opts = {}) {
    const maxR = opts.maxRadius || Math.max(rect.width, rect.height) * 0.8;
    ripples.push({
      canvas, ctx, rect,
      x, y,
      radius: 0, maxRadius: maxR,
      alpha: opts.alpha || 0.5,
      lineWidth: opts.lineWidth || 2,
      decay: opts.decay || 0.97,
      growth: opts.growth || 0.06
    });
    if (ripples.length === 1) requestAnimationFrame(animate);
  }

  function spawnBurst(canvas, ctx, rect) {
    // Multiple ripples from center for a richer effect
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    spawnRipple(canvas, ctx, rect, cx, cy, {alpha: 0.6, lineWidth: 2.5, growth: 0.05});
    setTimeout(() => spawnRipple(canvas, ctx, rect, cx, cy, {alpha: 0.4, lineWidth: 2, growth: 0.07}), 150);
    setTimeout(() => spawnRipple(canvas, ctx, rect, cx, cy, {alpha: 0.3, lineWidth: 1.5, growth: 0.09}), 300);
  }

  function animate() {
    const alive = [];
    const byCanvas = new Map();
    for (const r of ripples) {
      r.radius += (r.maxRadius - r.radius) * r.growth;
      r.alpha *= r.decay;
      if (r.alpha > 0.02) {
        alive.push(r);
        if (!byCanvas.has(r.canvas)) byCanvas.set(r.canvas, []);
        byCanvas.get(r.canvas).push(r);
      }
    }
    for (const [canvas, group] of byCanvas) {
      const ctx = group[0].ctx;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const r of group) {
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200, 190, 235, ${r.alpha})`;
        ctx.lineWidth = r.lineWidth;
        ctx.stroke();
      }
    }
    ripples.length = 0;
    ripples.push(...alive);
    if (ripples.length) requestAnimationFrame(animate);
  }

  // Interstitial ripple transitions. The interstitial itself is a transparent
  // 100vh spacer in the scroll flow; the video/canvas/overlay are position:fixed
  // and faded in/out via an .is-active class (handled in bars-map.js). Here we
  // size the canvas to the viewport and spawn a ripple burst on enter/exit.
  const interstitials = document.querySelectorAll('.journey-interstitial');
  if (interstitials.length) {
    interstitials.forEach(el => {
      let sized = false;
      let hasBurstIn = false;
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (!sized && e.isIntersecting) {
            sized = true;
            el._sized = sizeCanvas(el, true);
          }
          if (e.isIntersecting && e.intersectionRatio > 0.3 && !hasBurstIn && el._sized) {
            hasBurstIn = true;
            const {canvas, ctx, rect} = el._sized;
            spawnBurst(canvas, ctx, rect);
          } else if (!e.isIntersecting && hasBurstIn && el._sized) {
            hasBurstIn = false;
            const {canvas, ctx, rect} = el._sized;
            spawnBurst(canvas, ctx, rect);
          }
        }
      }, {threshold: [0, 0.3, 0.6, 0.9]});
      io.observe(el);
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
        const {canvas, ctx, rect} = figure._sized;
        spawnRipple(canvas, ctx, rect, e.clientX - rect.left, e.clientY - rect.top,
                    {alpha: 0.35, lineWidth: 1.5, growth: 0.04, decay: 0.96});
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
