"""One-off: replace inline style="" attributes with classes, and inline on*="" handlers
with data attributes + shared JS."""
import re, sys, collections
import sitelib as s
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

SKIP = {'anime-map.html', 'Practical Effects.html', 'Practical Effects List of Ingredients.html'}

def norm(v):
    parts = [p.strip() for p in v.split(';') if p.strip()]
    return '; '.join(re.sub(r'^([\w-]+)\s*:\s*', r'\1: ', p) for p in parts)

# ---- values that map to classes already defined in style.css -------------------------
SHARED = {
    'padding-top: 100px': 'page-main',
    'padding: 0 2rem 4rem': 'container-tight',
    'padding-bottom: 2rem': 'pb-2',
    'display: flex; justify-content: space-between; align-items: center; margin-top: 4rem; margin-bottom: 2rem; gap: 1rem; flex-wrap: wrap': 'chapter-nav',
    'display: flex; justify-content: center; margin-top: 4rem; margin-bottom: 2rem': 'chapter-nav center',
    'text-align: center; margin-top: 4rem; margin-bottom: 2rem': 'text-center mt-4 mb-2',
    'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0': 'embed-fill',
    'position: absolute; top: 0; left: 0; width: 100%; height: 100%': 'embed-fill',
    'position: relative; max-width: 640px; width: 100%; margin: auto; text-align: center': 'media-center',
    'max-width: 800px; margin: 2.5rem auto 0': 'content-narrow',
    'overflow-x: auto': 'table-scroll',
    # tables
    'width: 100%; border-collapse: collapse; font-size: 0.95rem; margin: 0.75rem 0 1rem 0': 'data-table',
    'padding: 0.5rem 0.75rem': '',                                   # td inside .data-table
    'border-bottom: 1px solid rgba(255,255,255,0.06)': '',           # tr inside .data-table
    'border-bottom: 1px solid rgba(255,255,255,0.18)': '',           # thead tr inside .data-table
    'text-align: left; padding: 0.5rem 0.75rem; color: #aaa; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; font-size: 0.8rem': '',  # th
    # quiz cta
    'margin: 4rem auto 0; max-width: 480px; padding: 1.5rem 2rem; border: 1px solid var(--accent-neon-cyan); background: rgba(0, 243, 255, 0.05); text-align: center; box-shadow: 0 0 15px rgba(0, 243, 255, 0.15)': 'quiz-cta',
    'font-family: var(--font-heading); color: var(--accent-neon-cyan); font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 0.35rem': 'quiz-kicker',
    'color: #fff; font-family: var(--font-heading); margin: 0 0 1rem 0; font-size: 1.05rem; font-weight: 600': '',  # h3 inside .quiz-cta
    # info panel (cinematography x2)
    'background: rgba(255,255,255,0.03); border-left: 3px solid var(--accent-neon-cyan); padding: 1.25rem 1.5rem; margin: 2rem 0; border-radius: 4px': 'info-panel',
    'color: var(--accent-neon-cyan); font-size: 1rem; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 0.75rem 0': 'info-panel-title',
    'font-size: 0.75rem; color: var(--accent-neon-cyan); font-weight: 400': 'tab-note',
    'font-size: 0.9rem; text-decoration: underline; color: #fff': 'link-plain',
    'border: 0; border-top: 1px solid #444; margin: 3rem 0': 'divider',
    'color: silver': 'icon-silver',
    # images
    'max-width: 100%; height: auto': 'img-fluid',
    'max-width: 100%; height: auto; display: block; margin: 0 auto': 'img-fluid img-center',
    'max-width: 100%; border-radius: 8px': 'img-fluid rounded',
    'display: block; margin: 2rem auto; max-width: 450px': 'img-center maxw-450 my-2',
    'display: block; margin: 0 auto; max-width: 450px; height: auto': 'img-center maxw-450',
    'max-width: 450px; height: auto; display: block; margin: 0 auto': 'img-center maxw-450',
    'display: block; margin: 2rem auto; max-width: 100%': 'img-center img-fluid my-2',
    'display: block; margin: 2rem auto; max-width: 300px; width: 100%': 'img-center maxw-300 my-2',
    'display: block; margin: 1.5rem auto; max-width: 400px; height: auto': 'img-center maxw-400 my-15',
    'width: 500px; height: auto': 'img-w-500',
    'width: 280px; height: auto': 'img-w-280',
    'max-width: 100%; height: auto; width: 519px': 'img-w-519',
    'max-width: 100%; height: auto; width: 506px': 'img-w-506',
    'width: 100%; border-radius: 8px; margin: 2rem 0': 'img-fluid rounded my-2',  # narrative (max-width vs width: both fill container)
    # text / spacing utilities
    'text-align: center': 'text-center',
    'text-align: center; margin: 2rem 0': 'text-center my-2',
    'text-align: center; margin-bottom: 2rem': 'text-center mb-2',
    'text-align: center; margin-bottom: 1.5rem': 'text-center mb-15',
    'text-align: center; margin-bottom: 1rem': 'text-center mb-1',
    'text-align: center; margin-bottom: 0': 'text-center mb-0',
    'text-align: center; margin-top: 3rem': 'text-center mt-3',
    'text-align: center; text-decoration: underline; margin-bottom: 2rem': 'text-center underline mb-2',
    'margin-bottom: 1rem; color: var(--accent-neon-pink); text-align: center; margin-top: 2rem': 'text-pink text-center mt-2 mb-1',
    'margin-bottom: 1rem; color: var(--accent-neon-pink); text-align: center; margin-top: 3rem': 'text-pink text-center mt-3 mb-1',
    'margin: 0': 'm-0',
    'margin-top: 0': 'mt-0',
    'margin-top: 0.3rem': 'mt-03',
    'margin-top: 0.75rem': 'mt-075',
    'margin-top: 1rem': 'mt-1',
    'margin-top: 2rem': 'mt-2',
    'margin-top: 2.5rem': 'mt-25',
    'margin-top: 3rem': 'mt-3',
    'margin-top: 1.5rem; font-weight: bold': 'mt-15 bold',
    'margin-top: 2rem; display: none': 'hidden',
    'display: none': 'hidden',
    'margin-bottom: 0': 'mb-0',
    'margin-bottom: 0.75rem': 'mb-075',
    'margin-bottom: 1rem': 'mb-1',
    'margin-bottom: 1.5rem': 'mb-15',
    'margin-bottom: 3rem': 'mb-3',
    'margin-bottom: 1.5rem; text-transform: uppercase': 'mb-15 uppercase',
    'margin-bottom: 0; color: #bbb': 'mb-0 text-soft',
    'color: #bbb': 'text-soft',
    'color: #aaa': 'text-muted',
    'color: #aaa; margin-top: 0.5rem': 'text-muted mt-05',
    'color: #aaa; font-size: 0.9rem': 'text-muted text-sm',
    'font-size: 0.9rem; color: #aaa': 'text-muted text-sm',
    'font-size: 0.9rem': 'text-sm',
    'font-size: 0.9rem; margin-bottom: 1rem': 'text-sm mb-1',
    'font-size: 0.85rem; color: #888': 'text-xs text-dim',
    'font-size: 0.9rem; color: #888; margin-top: 0.5rem': 'text-sm text-dim mt-05',
    'font-style: italic; color: #aaa': 'italic text-muted',
    'font-size: 1.1rem; color: #fff': 'text-lg text-white',
    'color: var(--accent-neon-cyan)': 'text-cyan',
    'color: var(--accent-neon-cyan); margin-top: 0': 'text-cyan mt-0',
    'margin-top: 0; color: var(--accent-neon-cyan)': 'text-cyan mt-0',
    'color: var(--accent-neon-cyan); margin-top: 1.5rem': 'text-cyan mt-15',
    'color: var(--accent-neon-cyan); margin: 0 0 0.5rem 0': 'text-cyan m-0 mb-05',
    'color: var(--accent-neon-cyan); margin-bottom: 1rem': 'text-cyan mb-1',
    'color: var(--accent-neon-cyan); margin-left: 0.5rem': 'text-cyan ml-05',
    'color: var(--accent-neon-cyan); font-style: italic': 'text-cyan italic',
    'margin-top: 1rem; color: var(--accent-neon-cyan)': 'text-cyan mt-1',
    'margin-top: 1rem; color: #ddd': 'text-light mt-1',
    'color: var(--accent-neon-pink); margin-top: 0': 'text-pink mt-0',
    'margin-top: 0; color: var(--accent-neon-pink)': 'text-pink mt-0',
    'color: var(--accent-neon-pink); margin-bottom: 1rem': 'text-pink mb-1',
    'color: #ffd700; margin-bottom: 1rem': 'text-gold mb-1',
    'margin-bottom: 1rem; color: #ffd700': 'text-gold mb-1',
    'min-height: 50px': 'minh-50',
    'min-height: 60px': 'minh-60',
    'min-height: 80px': 'minh-80',
    'min-height: 120px': 'minh-120',
    'min-height: 200px': 'minh-200',
    'list-style: none; padding-left: 0': 'list-plain',
    'margin-left: 2rem': 'ml-2',
    'text-align: center; margin-top: 1.5rem; color: #666; font-size: 0.8rem': 'text-center mt-15 text-fine',
    'text-align: center; margin-top: 1rem; color: #999; font-size: 0.85rem': 'text-center mt-1 text-note',
    'text-align: center; color: #bbb; max-width: 600px; margin: 0 auto 3rem': 'text-center text-soft intro-lede',
    'color: #bbb; max-width: 600px; margin-bottom: 1.5rem': 'text-soft intro-text mb-15',
    'color: #bbb; max-width: 600px; margin-bottom: 2rem': 'text-soft intro-text mb-2',
    'max-width: 700px; margin: 0 auto 2rem': 'intro-lede-wide',
    'font-weight: 400; font-size: 0.85em; opacity: 0.7': 'sub-note',
    'font-weight: 400; font-size: 0.8em; opacity: 0.7': 'sub-note sub-note-sm',
    'margin-top: 1.5rem; margin-bottom: 2rem': 'mt-15 mb-2',
    'margin-bottom: 2rem; position: relative': 'timeline-item-gap',
    'margin-bottom: 0; position: relative': 'mb-0',
}
# extra utilities referenced above that still need CSS in style.css (added below to a new block)
EXTRA_SHARED_CSS = """
.underline { text-decoration: underline; }
.text-lg { font-size: 1.1rem; }
.text-light { color: #ddd; }
.text-note { color: #999; font-size: 0.85rem; }
.text-fine { color: #666; font-size: 0.8rem; }
.list-plain { list-style: none; padding-left: 0; }
.mt-03 { margin-top: 0.3rem; }
.ml-05 { margin-left: 0.5rem; }
.ml-2 { margin-left: 2rem; }
.intro-text { max-width: 600px; }
.intro-lede { max-width: 600px; margin: 0 auto 3rem; }
.intro-lede-wide { max-width: 700px; margin: 0 auto 2rem; }
.sub-note { font-weight: 400; font-size: 0.85em; opacity: 0.7; }
.sub-note-sm { font-size: 0.8em; }
"""

# ---- page-local one-offs: value -> (class to add, css body or None if class already styled) --
PAGE = {
    'documentary-project.html': {
        'min-height: 50vh': ('hero-short', 'min-height: 50vh;'),
        'opacity: 0.4': ('hero-bg-dim', 'opacity: 0.4;'),
    },
    'free-guides.html': {
        'margin-top: 3rem; border-bottom: 2px solid var(--accent-neon-pink); display: inline-block; padding-bottom: 0.5rem': ('guide-group-title pink', None),
        'margin-top: 3rem; border-bottom: 2px solid var(--accent-neon-cyan); display: inline-block; padding-bottom: 0.5rem': ('guide-group-title cyan', None),
        'margin-top: 3rem; border-bottom: 2px solid #ffd700; display: inline-block; padding-bottom: 0.5rem': ('guide-group-title gold', None),
    },
    'index.html': {
        'position: relative; padding-bottom: 79.17%; height: 0; overflow: hidden; border: 1px solid var(--accent-neon-cyan); border-top: none; box-shadow: 0 0 20px rgba(0, 243, 255, 0.2)':
            ('map-container', 'position: relative; padding-bottom: 79.17%; height: 0; overflow: hidden; border: 1px solid var(--accent-neon-cyan); border-top: none; box-shadow: 0 0 20px rgba(0, 243, 255, 0.2);'),
    },
    'textbook.html': {
        'position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border: 1px solid var(--accent-neon-cyan); box-shadow: 0 0 20px rgba(0, 243, 255, 0.2)':
            ('map-container', 'position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border: 1px solid var(--accent-neon-cyan); box-shadow: 0 0 20px rgba(0, 243, 255, 0.2);'),
    },
    'guides/motivated-camera-movement.html': {
        'border-bottom: 1px solid #666; display: inline-block; width: 200px': ('fill-line', 'border-bottom: 1px solid #666; display: inline-block; width: 200px;'),
    },
    'guides/tailor-film-to-resources.html': {
        'border-left-color: var(--accent-neon-pink); background: rgba(255, 0, 127, 0.05)': ('example-box-pink', 'border-left-color: var(--accent-neon-pink); background: rgba(255, 0, 127, 0.05);'),
    },
    'guides/three-act-three-shot.html': {
        'background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 8px': ('summary-panel', 'background: rgba(0,0,0,0.2); padding: 1.5rem; border-radius: 8px;'),
    },
    'post-production/editing-and-animation.html': {
        'max-width: 720px; margin: 1rem auto 1.5rem auto; background: rgba(0,243,255,0.04); border-left: 3px solid var(--accent-neon-cyan); padding: 0.85rem 1.15rem; font-size: 0.95rem; color: #ccc':
            ('etymology-note', 'max-width: 720px; margin: 1rem auto 1.5rem auto; background: rgba(0,243,255,0.04); border-left: 3px solid var(--accent-neon-cyan); padding: 0.85rem 1.15rem; font-size: 0.95rem; color: #ccc;'),
        'margin: 0 0 0.4rem 0; color: var(--accent-neon-cyan); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 0.75rem':
            ('note-kicker', 'margin: 0 0 0.4rem 0; color: var(--accent-neon-cyan); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 0.75rem;'),
    },
    'pre-production/how-to-watch.html': {
        'background: url(https://libretexts.org/@api/deki/files/162714/YellowWomanPhotocentricLocalDramaFilmYouTubeBanner-ezgif.com-resize.gif?revision=1) no-repeat center center/cover; min-height: 200px; display: flex; align-items: flex-end; justify-content: center; padding: 1rem; margin-top: 1rem; border-radius: 8px':
            ('banner', "background: url(https://libretexts.org/@api/deki/files/162714/YellowWomanPhotocentricLocalDramaFilmYouTubeBanner-ezgif.com-resize.gif?revision=1) no-repeat center center/cover; min-height: 200px; display: flex; align-items: flex-end; justify-content: center; padding: 1rem; margin-top: 1rem; border-radius: 8px;"),
        'background: rgba(0,0,0,0.8); color: white; padding: 1rem; border-radius: 4px; width: 100%; text-align: center':
            ('banner-caption', 'background: rgba(0,0,0,0.8); color: white; padding: 1rem; border-radius: 4px; width: 100%; text-align: center;'),
    },
    'pre-production/narrative.html': {
        'display: inline-block; background: #00f3ff; color: #000; border-radius: 50%; width: 1.3em; height: 1.3em; font-size: 0.65em; font-weight: 700; text-align: center; margin-left: 0.4em; line-height: 1.3em; font-family: \'Inter\',sans-serif':
            ('script-ref', "display: inline-block; background: #00f3ff; color: #000; border-radius: 50%; width: 1.3em; height: 1.3em; font-size: 0.65em; font-weight: 700; text-align: center; margin-left: 0.4em; line-height: 1.3em; font-family: 'Inter', sans-serif; text-transform: none;"),
        'display: inline-block; background: #00f3ff; color: #000; border-radius: 50%; width: 1.3em; height: 1.3em; font-size: 0.65em; font-weight: 700; text-align: center; margin-left: 0.4em; line-height: 1.3em; font-family: \'Inter\',sans-serif; text-transform: none': ('script-ref', None),
        'position: absolute; left: -2.6rem; top: 0; width: 1.2rem; height: 1.2rem; background: var(--accent-neon-cyan); border-radius: 50%; box-shadow: 0 0 10px var(--accent-neon-cyan)':
            ('timeline-marker', 'position: absolute; left: -2.6rem; top: 0; width: 1.2rem; height: 1.2rem; background: var(--accent-neon-cyan); border-radius: 50%; box-shadow: 0 0 10px var(--accent-neon-cyan);'),
        'position: relative; margin: 2rem 0; padding-left: 2rem; border-left: 2px solid var(--accent-neon-cyan)':
            ('timeline-container', 'position: relative; margin: 2rem 0; padding-left: 2rem; border-left: 2px solid var(--accent-neon-cyan);'),
        'display: block; margin-bottom: 0.5rem; color: #fff': ('timeline-label', 'display: block; margin-bottom: 0.5rem; color: #fff;'),
        'font-size: 1.1rem; color: var(--accent-neon-cyan); margin-bottom: 0.5rem; text-transform: uppercase': ('act-title', 'font-size: 1.1rem; color: var(--accent-neon-cyan); margin-bottom: 0.5rem; text-transform: uppercase;'),
        'font-size: 0.9rem; color: #aaa; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px': ('act-kicker', 'font-size: 0.9rem; color: #aaa; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 1px;'),
        'margin: 0 auto; width: 60%; margin-bottom: 1.5rem': ('figure-60', 'margin: 0 auto 1.5rem; width: 60%;'),
        'background: rgba(0,243,255,0.05); border-top: 3px solid var(--accent-neon-cyan); padding: 1.5rem; border-radius: 0 0 8px 8px': ('compare-col cyan', None),
        'background: rgba(255,0,127,0.05); border-top: 3px solid var(--accent-neon-pink); padding: 1.5rem; border-radius: 0 0 8px 8px': ('compare-col pink', None),
        'display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0': ('split-col-grid', 'display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin: 2rem 0;'),
        'display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin: 2rem 0': ('three-col-grid', 'display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin: 2rem 0;'),
        'display: grid; gap: 1.5rem': ('stack-grid', 'display: grid; gap: 1.5rem;'),
        'background: #fff; color: #000; padding: 2rem 3rem; font-family: \'Courier Prime\', \'Courier New\', Courier, monospace; font-size: 1rem; line-height: 1.1; margin: 2rem 0 0.75rem 0; box-shadow: 0 0 15px rgba(0,0,0,0.5); max-width: 800px; border: 1px solid #ccc':
            ('script-sample', "background: #fff; color: #000; padding: 2rem 3rem; font-family: 'Courier Prime', 'Courier New', Courier, monospace; font-size: 1rem; line-height: 1.1; margin: 2rem 0 0.75rem 0; box-shadow: 0 0 15px rgba(0,0,0,0.5); max-width: 800px; border: 1px solid #ccc;"),
        'max-width: 800px; margin: 0 auto 2rem auto; background: rgba(0,243,255,0.04); border-left: 3px solid var(--accent-neon-cyan); padding: 1rem 1.25rem; font-size: 0.95rem':
            ('script-legend', 'max-width: 800px; margin: 0 auto 2rem auto; background: rgba(0,243,255,0.04); border-left: 3px solid var(--accent-neon-cyan); padding: 1rem 1.25rem; font-size: 0.95rem;'),
        'margin: 0 0 0.75rem 0; color: var(--accent-neon-cyan); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem':
            ('legend-kicker', 'margin: 0 0 0.75rem 0; color: var(--accent-neon-cyan); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; font-size: 0.8rem;'),
        'margin: 0; padding-left: 1.25rem; display: grid; gap: 0.4rem': ('legend-list', 'margin: 0; padding-left: 1.25rem; display: grid; gap: 0.4rem;'),
        'text-align: center; margin: 2rem 0; font-size: 1.4rem; font-family: var(--font-heading); color: var(--accent-neon-cyan); border: 1px solid var(--accent-neon-cyan); padding: 1.5rem; border-radius: 8px; background: rgba(0, 243, 255, 0.05)':
            ('formula-box', 'text-align: center; margin: 2rem 0; font-size: 1.4rem; font-family: var(--font-heading); color: var(--accent-neon-cyan); border: 1px solid var(--accent-neon-cyan); padding: 1.5rem; border-radius: 8px; background: rgba(0, 243, 255, 0.05);'),
        'background: rgba(0, 243, 255, 0.05); padding: 1.5rem; border-left: 3px solid var(--accent-neon-cyan)': ('note-panel cyan', None),
        'background: rgba(0,243,255,0.05); padding: 1.5rem; border-left: 3px solid var(--accent-neon-cyan)': ('note-panel cyan', None),
        'background: rgba(255, 0, 255, 0.05); padding: 1.5rem; border-left: 3px solid var(--accent-neon-pink)': ('note-panel magenta', None),
        'background: rgba(255,0,127,0.05); padding: 1.5rem; border-left: 3px solid var(--accent-neon-pink)': ('note-panel pink', None),
        'color: var(--accent-neon-cyan); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px': ('box-legend-cyan', 'color: var(--accent-neon-cyan); text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;'),
        'background: rgba(255,255,255,0.05); border-left: 3px solid #d4af37': ('genre-card gold', None),
        'background: rgba(255,255,255,0.05); border-left: 3px solid #ff4d4d': ('genre-card red', None),
        'background: rgba(255,255,255,0.05); border-left: 3px solid #00f3ff': ('genre-card cyan', None),
        'color: #d4af37; margin-bottom: 0.5rem; font-size: 1.1rem': ('genre-title gold', None),
        'color: #ff4d4d; margin-bottom: 0.5rem; font-size: 1.1rem': ('genre-title red', None),
        'color: #00f3ff; margin-bottom: 0.5rem; font-size: 1.1rem': ('genre-title cyan', None),
        'text-align: center; font-family: var(--font-heading); font-size: 1.1rem; color: var(--accent-neon-cyan); margin-top: 2rem': ('closing-line', 'text-align: center; font-family: var(--font-heading); font-size: 1.1rem; color: var(--accent-neon-cyan); margin-top: 2rem;'),
    },
}
# multi-variant page rules (the (class, None) entries above)
PAGE_EXTRA_CSS = {
    'free-guides.html': """.guide-group-title { margin-top: 3rem; display: inline-block; padding-bottom: 0.5rem; border-bottom: 2px solid; }
.guide-group-title.pink { border-color: var(--accent-neon-pink); }
.guide-group-title.cyan { border-color: var(--accent-neon-cyan); }
.guide-group-title.gold { border-color: #ffd700; }""",
    'pre-production/narrative.html': """.compare-col { padding: 1.5rem; border-radius: 0 0 8px 8px; border-top: 3px solid; }
.compare-col.cyan { background: rgba(0,243,255,0.05); border-color: var(--accent-neon-cyan); }
.compare-col.pink { background: rgba(255,0,127,0.05); border-color: var(--accent-neon-pink); }
.note-panel { padding: 1.5rem; border-left: 3px solid; }
.note-panel.cyan { background: rgba(0,243,255,0.05); border-color: var(--accent-neon-cyan); }
.note-panel.pink { background: rgba(255,0,127,0.05); border-color: var(--accent-neon-pink); }
.note-panel.magenta { background: rgba(255,0,255,0.05); border-color: var(--accent-neon-pink); }
.genre-card { background: rgba(255,255,255,0.05); border-left: 3px solid; }
.genre-card.gold { border-color: #d4af37; }
.genre-card.red { border-color: #ff4d4d; }
.genre-card.cyan { border-color: #00f3ff; }
.genre-title { margin-bottom: 0.5rem; font-size: 1.1rem; }
.genre-title.gold { color: #d4af37; }
.genre-title.red { color: #ff4d4d; }
.genre-title.cyan { color: #00f3ff; }""",
}

TAG_RE = re.compile(r'<(\w+)(\s[^<>]*?)?\sstyle="([^"]*)"([^<>]*)>', re.S)
CLASS_RE = re.compile(r'\sclass="([^"]*)"')


def add_classes(attrs, classes):
    if not classes:
        return attrs
    m = CLASS_RE.search(attrs)
    if m:
        existing = m.group(1).split()
        new = existing + [c for c in classes.split() if c not in existing]
        return attrs[:m.start(1)] + ' '.join(new) + attrs[m.end(1):]
    return f' class="{classes}"' + attrs


def inject_style(text, css, eol):
    """Append css to the page's first <style> block (or create one before </head>)."""
    m = re.search(r'([ \t]*)</style>', text)
    body = eol.join('        ' + l for l in css.splitlines())
    if m:
        return text[:m.start()] + body + eol + m.group(0) + text[m.end():]
    idx = text.index('</head>')
    return text[:idx] + f'    <style>{eol}{body}{eol}    </style>{eol}' + text[idx:]


unmapped = collections.Counter()
for rel in s.pages():
    if rel.name in SKIP:
        continue
    text = s.read(rel)
    eol = s.eol_of(text)
    page_map = PAGE.get(rel.as_posix(), {})
    page_css = []
    seen_rules = set()
    n = 0

    def repl(m):
        global n
        tag, pre, val, post = m.group(1), m.group(2) or '', m.group(3), m.group(4)
        nv = norm(val)
        if nv in page_map:
            cls, body = page_map[nv]
            if body and cls not in seen_rules:
                seen_rules.add(cls)
                page_css.append(f'.{cls} {{ {body} }}')
        elif nv in SHARED:
            cls = SHARED[nv]
        else:
            unmapped[(rel.as_posix(), nv)] += 1
            return m.group(0)
        n += 1
        attrs = add_classes(pre + post, cls)
        return f'<{tag}{attrs}>'

    text = TAG_RE.sub(repl, text)

    # inline event handlers
    text, k1 = re.subn(r'\sonclick="window\.print\(\)"', ' data-action="print"', text)
    text, k2 = re.subn(r'\sonclick="showAssign\(\'([\w-]+)\'\)"', r' data-assign="\1"', text)
    if k2:
        text, k3 = re.subn(r'\r?\n[ \t]*<script>\s*function showAssign\(id\) \{.*?\}\s*</script>', '', text, flags=re.S)
        assert k3 == 1, rel

    extra = PAGE_EXTRA_CSS.get(rel.as_posix())
    if extra:
        page_css.append(extra)
    if page_css:
        text = inject_style(text, '/* page-specific (moved from inline style attributes) */' + eol + eol.join(page_css), eol)

    # make every local script cache-bustable by the build
    text = re.sub(r'(<script src="(?:\.\./)*js/[\w-]+\.js)"', r'\1?v=0"', text)

    s.write(rel, text)
    if n or k1 or k2:
        print(f'{rel.as_posix()}: {n} style attrs -> classes; {k1 + k2} handlers')

if unmapped:
    print('\nUNMAPPED:')
    for (f, v), c in sorted(unmapped.items()):
        print(f'  {c} {f}: {v}')

# extra shared utilities -> style.css
css_path = s.ROOT / 'style.css'
css = css_path.read_bytes().decode('utf-8')
marker = '.pb-2 { padding-bottom: 2rem; }'
assert marker in css and '.intro-lede' not in css
css = css.replace(marker, marker + EXTRA_SHARED_CSS.replace('\n', '\r\n').rstrip('\r\n'))
css_path.write_bytes(css.encode('utf-8'))
print('style.css: extra utilities added')
