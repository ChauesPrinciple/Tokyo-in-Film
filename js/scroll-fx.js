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

    /* ---------- 2. [data-scroll] elements stay with scroll-animate.js ---------- */
    // Their CSS transitions (style.css ~1329) fight GSAP inline styles frame by
    // frame, which broke the index layout. GSAP must not touch them.

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
        gsap.from(pageH1, { y: 40, z: -120, rotateX: 8, duration: 0.9, ease: 'power3.out' });
        var lead = document.querySelector('p.lead');
        if (lead) {
            gsap.from(lead, { y: 30, duration: 0.9, delay: 0.15, ease: 'power3.out' });
        }
    }

    /* ---------- 5. 3D tilt-in for toc tiles ---------- */
    // Narrow, safe target set: no [data-scroll] elements (see section 2).
    gsap.utils.toArray('.toc-grid .toc-item').forEach(function (el, i) {
        if (el.parentNode) { gsap.set(el.parentNode, { perspective: 900 }); }
        gsap.from(el, {
            rotateX: 22,
            y: 70,
            z: -100,
            duration: 1,
            delay: (i % 3) * 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' }
        });
    });

    /* ---------- 6. Interactive hover tilt on cards (pointer devices only) ---------- */
    if (window.matchMedia('(hover: hover)').matches) {
        gsap.utils.toArray('.section-grid .card, .toc-grid .toc-item').forEach(function (card) {
            var setX = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power2.out' });
            var setY = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power2.out' });
            // Kill the [data-scroll] CSS transition once the entrance fade is done,
            // otherwise it re-eases every GSAP frame and the tilt stutters.
            card.addEventListener('mouseenter', function () { card.style.transition = 'none'; });
            card.addEventListener('mousemove', function (e) {
                var r = card.getBoundingClientRect();
                setX(((e.clientX - r.left) / r.width - 0.5) * 10);
                setY(-((e.clientY - r.top) / r.height - 0.5) * 8);
            });
            card.addEventListener('mouseleave', function () { setX(0); setY(0); });
        });
    }

    /* ---------- 7. Keep ScrollTrigger honest after layout shifts ---------- */
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });

    console.info('[scroll-fx] active (hero parallax)');
})();
