import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


class AfterDarkMediaTests(unittest.TestCase):
    """The journey holds ~36 MB of video. It may only arrive a clip at a time."""

    def setUp(self):
        self.html = (ROOT / 'tokyo-after-dark.html').read_text(encoding='utf-8')
        self.js = (ROOT / 'js/tokyo-after-dark.js').read_text(encoding='utf-8')
        self.build = (ROOT / 'tools/build.py').read_text(encoding='utf-8')

    def test_journey_videos_do_not_autoplay(self):
        """Interstitial media is position:fixed, so the browser never sees it as
        offscreen: an autoplay attribute made it fetch and decode all ten at
        once and the journey stalled partway down. tokyo-after-dark.js starts
        each clip with play() when its spacer reaches the screen instead."""
        journey = self.html.split('<!-- build:journey -->')[1].split('<!-- /build:journey -->')[0]
        offenders = [tag for tag in re.findall(r'<video[^>]*>', journey) if 'autoplay' in tag]
        self.assertEqual(offenders, [], f'journey videos must not autoplay: {offenders}')
        for tag in re.findall(r'<video[^>]*>', journey):
            self.assertIn('preload="none"', tag, f'journey video must not preload: {tag}')

    def test_generator_matches(self):
        """build.py rewrites the journey region, so the rule lives there too."""
        tags = re.findall(r'<video class="stop-video"[^>]*>', self.build)
        self.assertTrue(tags, 'no video template found in build.py; this guard has gone blind')
        for tag in tags:
            self.assertNotIn('autoplay', tag, f'build.py emits an autoplaying video: {tag}')

    def test_overture_is_the_only_eager_video(self):
        """The opening clip is the first thing on screen, so it alone preloads."""
        eager = re.findall(r'<video[^>]*preload="auto"[^>]*>', self.html)
        self.assertEqual(len(eager), 1, f'exactly one eager video expected, got {len(eager)}')
        self.assertIn('whiskey-glass', eager[0])

    def test_scroll_handler_still_drives_playback(self):
        """Removing autoplay only works because these handlers call play()."""
        self.assertIn('v.play()', self.js)       # interstitials
        self.assertIn('v.play().then', self.js)  # stop cards
        self.assertIn('_interstitialUpdate', self.js)


if __name__ == '__main__':
    unittest.main()
