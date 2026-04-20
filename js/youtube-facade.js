/**
 * YouTube Facade — lazy-loads YouTube iframes on click.
 * Replaces every YouTube <iframe> with a static thumbnail + play button.
 * The real iframe is only injected when the user clicks play.
 *
 * Include this script on any page: <script src="../js/youtube-facade.js"></script>
 * No HTML changes needed — it works with existing iframe embeds automatically.
 */
(function () {
    'use strict';

    function getVideoId(src) {
        if (!src) return null;
        var m = src.match(/youtube\.com\/embed\/([^?&#]+)/);
        return m ? m[1] : null;
    }

    function getStartTime(src) {
        if (!src) return '';
        var m = src.match(/[?&]start=(\d+)/);
        return m ? '&start=' + m[1] : '';
    }

    function buildThumbnailUrl(videoId) {
        // hqdefault is 480x360 and always available; maxresdefault may 404
        return 'https://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg';
    }

    function createFacade(iframe) {
        var videoId = getVideoId(iframe.src);
        if (!videoId) return; // not a YouTube embed, skip

        var startTime = getStartTime(iframe.src);
        var parent = iframe.parentNode;

        // Create the facade container
        var facade = document.createElement('div');
        facade.className = 'yt-facade';
        facade.setAttribute('data-video-id', videoId);
        facade.setAttribute('data-start', startTime);
        facade.setAttribute('role', 'button');
        facade.setAttribute('tabindex', '0');
        facade.setAttribute('aria-label', 'Play video');

        // Thumbnail
        var img = document.createElement('img');
        img.src = buildThumbnailUrl(videoId);
        img.alt = 'Video thumbnail';
        img.loading = 'lazy';
        facade.appendChild(img);

        // Play button (SVG)
        var btn = document.createElement('div');
        btn.className = 'yt-facade-btn';
        btn.innerHTML = '<svg viewBox="0 0 68 48" width="68" height="48">' +
            '<path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55' +
            'C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41' +
            ' 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19' +
            'C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#212121" fill-opacity="0.8"/>' +
            '<path d="M45 24L27 14v20" fill="#fff"/></svg>';
        facade.appendChild(btn);

        // Click handler — swap in the real iframe
        function activate() {
            var newIframe = document.createElement('iframe');
            newIframe.src = 'https://www.youtube.com/embed/' + videoId +
                '?autoplay=1' + startTime;
            newIframe.setAttribute('frameborder', '0');
            newIframe.setAttribute('allowfullscreen', '');
            newIframe.setAttribute('allow',
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            newIframe.style.position = 'absolute';
            newIframe.style.top = '0';
            newIframe.style.left = '0';
            newIframe.style.width = '100%';
            newIframe.style.height = '100%';
            newIframe.style.border = '0';
            facade.replaceWith(newIframe);
        }

        facade.addEventListener('click', activate);
        facade.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activate();
            }
        });

        // Replace the iframe with the facade
        parent.replaceChild(facade, iframe);
    }

    // Run on DOM ready
    function init() {
        var iframes = document.querySelectorAll('iframe[src*="youtube.com/embed"]');
        for (var i = 0; i < iframes.length; i++) {
            createFacade(iframes[i]);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
