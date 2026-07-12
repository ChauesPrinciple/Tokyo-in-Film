(function () {
    'use strict';

    // Bail out entirely for reduced-motion users or if a CDN failed to load.
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        console.info('[scroll-fx] disabled: prefers-reduced-motion is set in your OS settings');
        return;
    }
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('[scroll-fx] disabled: GSAP/ScrollTrigger failed to load');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* ---------- 1. Inertial smooth scrolling (Lenis) ---------- */
    // Isolated so a Lenis failure never kills the 3D effects below.
    var lenis = null;
    try {
        if (typeof Lenis === 'undefined') throw new Error('Lenis not loaded');
        lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
        console.info('[scroll-fx] Lenis smooth scroll active');
    } catch (err) {
        console.warn('[scroll-fx] Lenis unavailable, native scroll kept:', err.message);
    }

    // In-page anchors glide instead of jumping.
    if (lenis) {
        document.querySelectorAll('a[href^="#"]').forEach(function (a) {
            a.addEventListener('click', function (e) {
                var href = a.getAttribute('href');
                if (href.length < 2) return;
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    lenis.scrollTo(target, { offset: -70 });
                }
            });
        });
    }

    // Pause smooth scroll while the film modal is open (index.html).
    var modal = document.getElementById('filmModal');
    if (modal && lenis) {
        new MutationObserver(function () {
            if (modal.classList.contains('active')) { lenis.stop(); } else { lenis.start(); }
        }).observe(modal, { attributes: true, attributeFilter: ['class'] });
    }

    /* ---------- 2. Hand-off from scroll-animate.js ---------- */
    // GSAP owns [data-scroll] now; neutralize the CSS-transition fade-ins
    // so elements are never animated twice.
    document.querySelectorAll('[data-scroll]').forEach(function (el) {
        el.classList.add('is-visible');
    });

    /* ---------- 3. Hero: parallax video + content receding into depth ---------- */
    var hero = document.querySelector('.hero');
    if (hero) {
        var heroBg = hero.querySelector('.hero-bg');
        var heroContent = hero.querySelector('.hero-content');
        if (heroBg) {
            gsap.to(heroBg, {
                yPercent: 22,
                scale: 1.12,
                ease: 'none',
                scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
            });
        }
        if (heroContent) {
            gsap.set(hero, { perspective: 900 });
            gsap.to(heroContent, {
                yPercent: -28,
                rotateX: 10,
                z: -140,
                opacity: 0,
                ease: 'none',
                scrollTrigger: { trigger: hero, start: 'top top', end: '85% top', scrub: true }
            });
        }
    }

    /* ---------- 4. Page-load depth entrance for landing headers ---------- */
    var pageH1 = document.querySelector('main > h1, .container > h1');
    if (pageH1 && !hero) {
        gsap.set(pageH1.parentNode, { perspective: 900 });
        gsap.from(pageH1, { y: 40, z: -120, rotateX: 8, opacity: 0, duration: 0.9, ease: 'power3.out' });
        var lead = document.querySelector('p.lead');
        if (lead) {
            gsap.from(lead, { y: 30, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out' });
        }
    }

    /* ---------- 5. Tile-to-tile 3D fly-through (phase landing pages) ---------- */
    // Pins the chapter grid and scrubs each tile from deep space, to front
    // and center, then past the camera as you scroll.
    var showcaseBuilt = false;
    var tocGrid = document.querySelector('.toc-grid');
    if (tocGrid && window.innerWidth >= 768) {
        var tiles = gsap.utils.toArray(tocGrid.querySelectorAll('.toc-item'));
        if (tiles.length >= 3) {
            var stage = document.createElement('div');
            stage.className = 'tile-stage';
            tocGrid.parentNode.insertBefore(stage, tocGrid);
            stage.appendChild(tocGrid);

            gsap.set(stage, { height: '82vh', position: 'relative', perspective: 1100 });
            gsap.set(tocGrid, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'block', transformStyle: 'preserve-3d' });
            tiles.forEach(function (t) {
                gsap.set(t, {
                    position: 'absolute', top: '50%', left: '50%',
                    xPercent: -50, yPercent: -50,
                    width: 'min(640px, 86vw)',
                    transformStyle: 'preserve-3d',
                    margin: 0
                });
            });

            // Progress hint so students know to keep scrolling.
            var hint = document.createElement('div');
            hint.textContent = '1 / ' + tiles.length + '  \u2014  scroll';
            hint.style.cssText = 'position:absolute;bottom:1.2rem;left:50%;transform:translateX(-50%);font-family:Inter,sans-serif;font-size:0.75rem;letter-spacing:0.25em;text-transform:uppercase;color:rgba(0,243,255,0.7);pointer-events:none;';
            stage.appendChild(hint);

            var tl = gsap.timeline({
                scrollTrigger: {
                    trigger: stage,
                    start: 'top top+=70',
                    end: '+=' + (tiles.length * 85) + '%',
                    scrub: 0.6,
                    pin: true,
                    anticipatePin: 1,
                    onUpdate: function (self) {
                        var idx = Math.min(tiles.length, Math.floor(self.progress * tiles.length) + 1);
                        hint.textContent = idx + ' / ' + tiles.length + '  \u2014  scroll';
                    }
                }
            });

            tiles.forEach(function (t, i) {
                if (i === 0) {
                    gsap.set(t, { z: 0, opacity: 1 });
                } else {
                    gsap.set(t, { z: -1400, opacity: 0, rotateX: -22, yPercent: -30 });
                    tl.to(t, { z: 0, opacity: 1, rotateX: 0, yPercent: -50, duration: 0.9, ease: 'power2.out' }, i);
                }
                if (i < tiles.length - 1) {
                    tl.to(t, { z: 800, opacity: 0, rotateX: 18, yPercent: -75, duration: 0.9, ease: 'power2.in' }, i + 0.1);
                }
            });
            // Hold the last tile briefly at the end of the pin.
            tl.to({}, { duration: 0.4 });

            showcaseBuilt = true;
            console.info('[scroll-fx] tile fly-through active: ' + tiles.length + ' tiles');
        }
    }

    /* ---------- 6. Generic 3D tilt-in for remaining content blocks ---------- */
    var blockSelector = showcaseBuilt
        ? '[data-scroll], .film-slider, .film-slider-nav'
        : '[data-scroll], .toc-grid .toc-item, .film-slider, .film-slider-nav';
    var blocks = gsap.utils.toArray(blockSelector);
    blocks.forEach(function (el) {
        if (el.parentNode) { gsap.set(el.parentNode, { perspective: 900 }); }
        var siblings = el.parentNode ? Array.prototype.slice.call(el.parentNode.children) : [el];
        var indexInParent = siblings.indexOf(el);
        gsap.from(el, {
            rotateX: 28,
            y: 90,
            z: -120,
            opacity: 0,
            duration: 1.1,
            delay: (indexInParent % 4) * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' }
        });
    });

    /* ---------- 7. Interactive hover tilt on cards (pointer devices only) ---------- */
    var hoverSelector = showcaseBuilt ? '.section-grid .card' : '.section-grid .card, .toc-grid .toc-item';
    if (window.matchMedia('(hover: hover)').matches) {
        gsap.utils.toArray(hoverSelector).forEach(function (card) {
            var setX = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power2.out' });
            var setY = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power2.out' });
            card.addEventListener('mousemove', function (e) {
                var r = card.getBoundingClientRect();
                setX(((e.clientX - r.left) / r.width - 0.5) * 10);
                setY(-((e.clientY - r.top) / r.height - 0.5) * 8);
            });
            card.addEventListener('mouseleave', function () { setX(0); setY(0); });
        });
    }

    /* ---------- 8. Keep ScrollTrigger honest after layout shifts ---------- */
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });

    console.info('[scroll-fx] 3D scroll effects active on ' + blocks.length + ' elements');
})();
