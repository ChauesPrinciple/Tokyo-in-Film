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
    const {canvas, ctx, rect} = resize(figure);
    if (!ctx) return;
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
    for (const r of ripples) {
      r.life += 1 / 60;
      r.radius += (r.maxRadius - r.radius) * 0.04;
      r.alpha *= 0.96;
      r.ctx.clearRect(0, 0, r.canvas.width, r.canvas.height);
      r.ctx.beginPath();
      r.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      r.ctx.strokeStyle = `rgba(220, 210, 240, ${r.alpha})`;
      r.ctx.lineWidth = 1.5;
      r.ctx.stroke();
      if (r.alpha > 0.02) alive.push(r);
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
