// Ripple transition effect for interstitials.
// When a .journey-interstitial enters the viewport, a ripple burst plays
// from the center outward. When it leaves, another burst plays.
// Also adds hover ripples to any [data-ripple] figures that still exist.
(() => {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ripples = [];

  function ensureCanvas(el) {
    let canvas = el.querySelector('canvas');
    if (canvas) return canvas;
    canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2';
    el.appendChild(canvas);
    return canvas;
  }

  function sizeCanvas(el) {
    const canvas = ensureCanvas(el);
    const rect = el.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
    return {canvas, ctx, rect};
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

  // Interstitial ripple transitions
  const interstitials = document.querySelectorAll('.journey-interstitial');
  if (interstitials.length) {
    interstitials.forEach(el => {
      let sized = false;
      let hasBurstIn = false;
      const io = new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (!sized && e.isIntersecting) {
            sized = true;
            el._sized = sizeCanvas(el);
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
})();
