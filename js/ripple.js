// Vanilla JS ripple effect for atmospheric images.
// No jQuery. Adds a canvas overlay to each [data-ripple] figure and draws
// expanding water ripples on pointer move/touch. Degrades gracefully: if
// canvas is unavailable or the image hasn't loaded, nothing happens.
(() => {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll('[data-ripple]');
  if (!targets.length) return;

  const ripples = []; // active ripple animations

  function ensureCanvas(figure) {
    let canvas = figure.querySelector('canvas');
    if (canvas) return canvas;
    canvas = document.createElement('canvas');
    figure.appendChild(canvas);
    return canvas;
  }

  function resize(figure) {
    const canvas = ensureCanvas(figure);
    const rect = figure.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.scale(dpr, dpr);
    return {canvas, ctx, rect};
  }

  function spawnRipple(figure, x, y) {
    // Only resize the canvas once per figure (on first spawn), not on every
    // pointermove. getBoundingClientRect + canvas resize is expensive churn
    // when called ~8x/sec during a hover-drag. A ResizeObserver would be
    // ideal, but for 1-2 figures a one-shot is fine.
    if (!figure._sized) {
      const sized = resize(figure);
      if (!sized.ctx) return;
      figure._sized = sized;
    }
    const {canvas, ctx, rect} = figure._sized;
    ripples.push({
      canvas, ctx, rect,
      x: x - rect.left, y: y - rect.top,
      radius: 0, maxRadius: Math.max(rect.width, rect.height) * 0.6,
      alpha: 0.35, life: 0
    });
    if (ripples.length === 1) requestAnimationFrame(animate);
  }

  function animate() {
    const alive = [];
    // Group ripples by canvas so we clear each canvas once per frame, then
    // draw all ripples for that canvas. Without this, each ripple's clearRect
    // erases the previous ripple on the same canvas.
    const byCanvas = new Map();
    for (const r of ripples) {
      r.life += 1 / 60;
      r.radius += (r.maxRadius - r.radius) * 0.04;
      r.alpha *= 0.96;
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
        ctx.strokeStyle = `rgba(220, 210, 240, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    }
    ripples.length = 0;
    ripples.push(...alive);
    if (ripples.length) requestAnimationFrame(animate);
  }

  targets.forEach(figure => {
    // Only activate once the image has loaded so we know the figure has size.
    const img = figure.querySelector('img');
    if (!img) return;
    const start = () => {
      figure.addEventListener('pointermove', e => {
        // Throttle: only spawn a ripple every ~120ms per figure.
        if (figure._lastRipple && performance.now() - figure._lastRipple < 120) return;
        figure._lastRipple = performance.now();
        spawnRipple(figure, e.clientX, e.clientY);
      });
      figure.addEventListener('pointerleave', e => spawnRipple(figure, e.clientX, e.clientY));
    };
    if (img.complete && img.naturalWidth) start();
    else img.addEventListener('load', start, {once: true});
  });
})();
