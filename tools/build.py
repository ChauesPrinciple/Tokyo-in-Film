"""Regenerate shared regions in every page and refresh asset cache-busting hashes.

Usage:  python tools/build.py [--check]

Each templated page contains marker regions:

    <!-- build:head --> ... <!-- /build:head -->
    <!-- build:nav --> ... <!-- /build:nav -->
    <!-- build:footer --> ... <!-- /build:footer -->

The content between the markers is REPLACED from tools/partials/<name>.html on
every run, so edit the partial, not the page. Anything outside the markers is
left untouched. Local ``?v=`` query strings on style.css / js files are rewritten
to a content hash so browsers pick up changes without manual version bumps.

--check exits non-zero if any page would change (useful before deploying).

bars-map.html also has a generated region:

    <!-- build:journey --> ... <!-- /build:journey -->

This is filled from assets/bars-map-data.json with one <section class="stop">
per venue, so the journey view is readable even without JavaScript.
"""
import html as _html
import json
import math
import re
import sys
from pathlib import Path

import sitelib as s

ASSET_RE = re.compile(r'(?P<path>(?:\.\./)*(?:style\.css|(?:js/|assets/)?[\w-]+\.(?:js|json)))\?v=[\w.]+')
REGIONS = ('head', 'nav', 'footer')
# JS files that reference other assets with ?v= (e.g. glossary.js -> glossary-data.json)
JS_WITH_ASSETS = ('js/glossary.js',)
# Pages with a generated journey region (built from a JSON data file).
JOURNEY_PAGES = {
    'bars-map.html': 'assets/bars-map-data.json',
}


def rehash_assets(rel, text):
    """Rewrite ?v= on local asset references relative to the file `rel`."""
    def rehash(m):
        target = (s.ROOT / rel).parent / m.group('path')
        if not target.exists():
            return m.group(0)
        return f"{m.group('path')}?v={s.file_hash(target.resolve().relative_to(s.ROOT))}"
    return ASSET_RE.sub(rehash, text)


def _esc(text):
    return _html.escape(str(text), quote=True)


def _locality(bar):
    if bar.get('ward'):
        return f"{bar['ward']} ward, Tokyo"
    if bar.get('municipality') and bar.get('prefecture'):
        return f"{bar['municipality']}, {bar['prefecture']}"
    return "Tokyo"


def _floor_label(bar):
    """Pull a short floor/building label out of the address, when present."""
    addr = bar.get('address', '')
    # Match leading floor tokens like 'B1F', 'B2F', '1F', '6F', '38F', '4F',
    # '3F', optionally followed by a hyphen + room letter (e.g. '6F-E').
    m = re.match(r'^((?:B\d+F|\d+F)(?:-[A-Z])?)\b', addr)
    return m.group(1).strip() if m else ''


# Tokyo center reference (roughly Imperial Palace) for distance checks.
_CENTER = (35.685, 139.752)


def _distance_km(lat1, lng1, lat2, lng2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    a = math.sin(dlat / 2) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlng / 2) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def _category(bar):
    """Classify a bar for special-case camera/visual treatment."""
    cats = []
    addr = bar.get('address', '')
    if addr.startswith('B1F') or addr.startswith('B2F'):
        cats.append('basement')
    # High-rise: 10F+ or named towers
    if any(token in addr for token in ['38F', '52F', 'Park Hyatt', 'Mandarin Oriental']):
        cats.append('highrise')
    if bar.get('subvenues'):
        cats.append('golden-gai')
    if bar.get('spotlight'):
        cats.append('spotlight')
    # Distant: more than 8km from central Tokyo
    if _distance_km(_CENTER[0], _CENTER[1], bar['lat'], bar['lng']) > 8:
        cats.append('distant')
    return ' '.join(cats)


def _render_subvenue(sv):
    parts = []
    parts.append(f'      <article class="subvenue" data-floor="{_esc(sv.get("floor") or "")}" tabindex="0" aria-label="{_esc(sv["name"])} \u2014 focus on map">')
    parts.append(f'        <h4 class="subvenue-name">{_esc(sv["name"])}</h4>')
    aliases = sv.get('aliases') or []
    if aliases:
        parts.append(f'        <p class="subvenue-aliases">{_esc(" · ".join(aliases))}</p>')
    if sv.get('floor') or sv.get('building'):
        bits = [x for x in (sv.get('floor'), sv.get('building')) if x]
        parts.append(f'        <p class="subvenue-floor">{_esc(" · ".join(bits))}</p>')
    parts.append(f'        <p class="subvenue-address">{_esc(sv["address"])}</p>')
    if sv.get('description'):
        parts.append(f'        <p class="subvenue-description">{_esc(sv["description"])}</p>')
    if sv.get('mapsUrl'):
        parts.append(f'        <a class="subvenue-link" href="{_esc(sv["mapsUrl"])}" target="_blank" rel="noopener noreferrer">Open in Maps</a>')
    parts.append('      </article>')
    return '\n'.join(parts)


def _render_stop(bar):
    """Render one venue as a semantic <section class="stop">.

    Hierarchy is ordered for choosing-then-finding:
      1. Name + Japanese aliases (what it is)
      2. Neighborhood, type, floor (where it sits in the city)
      3. Description (why to go)
      4. Station, address, access (how to find the entrance)
      5. Primary Maps action + secondary sources
    """
    bid = _esc(bar['id'])
    num = bar['number']
    spotlight = ' is-spotlight' if bar.get('spotlight') else ''
    floor = _floor_label(bar)
    floor_attr = f' data-floor="{_esc(floor)}"' if floor else ''
    category = _category(bar)
    cat_attr = f' data-category="{_esc(category)}"' if category else ''
    parts = []
    parts.append(f'  <section class="stop{spotlight}" id="stop-{bid}" data-stop="{bid}" data-number="{num}"{floor_attr}{cat_attr}>')
    # 1. Name + Japanese aliases
    parts.append(f'    <header class="stop-head">')
    parts.append(f'      <p class="stop-number">{num}</p>')
    parts.append(f'      <div class="stop-head-text">')
    parts.append(f'        <h3 class="stop-name">{_esc(bar["name"])}</h3>')
    aliases = bar.get('aliases') or []
    if aliases:
        # Each alias becomes its own vertical column (writing-mode: vertical-rl);
        # <br> moves to the next column to the left, the way multiple lantern
        # cards sit beside a sign.
        alias_html = '<br>'.join(_esc(a) for a in aliases)
        parts.append(f'        <p class="stop-aliases">{alias_html}</p>')
    parts.append(f'      </div>')
    parts.append(f'    </header>')
    # 2. Neighborhood, type, floor — a compact "where it sits" line
    summary_bits = [_locality(bar)]
    if bar.get('style'):
        summary_bits.append(bar['style'])
    if floor:
        summary_bits.append(floor)
    parts.append(f'    <p class="stop-summary">{_esc(" · ".join(summary_bits))}</p>')
    # 3. Description — why to go
    if bar.get('description'):
        parts.append(f'    <p class="stop-description">{_esc(bar["description"])}</p>')
    # 3a. Optional atmospheric media — if the bar has a "video" or "image"
    # field, render it between the description and the practical facts.
    # Video takes precedence over image when both are present.
    video = bar.get('video')
    image = bar.get('image')
    if video:
        poster = bar.get('videoPoster') or ''
        poster_attr = f' poster="{_esc(poster)}"' if poster else ''
        mp4 = bar.get('videoMp4') or video.replace('.webm', '.mp4')
        parts.append(f'    <figure class="stop-media">')
        parts.append(f'      <video class="stop-video" muted loop playsinline preload="metadata"{poster_attr}>')
        parts.append(f'        <source src="{_esc(video)}" type="video/webm">')
        parts.append(f'        <source src="{_esc(mp4)}" type="video/mp4">')
        parts.append(f'      </video>')
        parts.append(f'    </figure>')
    elif image:
        alt = _esc(bar.get('imageAlt') or bar.get('name', ''))
        parts.append(f'    <figure class="stop-image" data-ripple>')
        parts.append(f'      <img src="{_esc(image)}" alt="{alt}" loading="lazy" decoding="async">')
        parts.append(f'    </figure>')
    # 4. Practical details for finding the entrance
    parts.append(f'    <dl class="stop-facts">')
    if bar.get('station'):
        parts.append(f'      <dt>Station</dt><dd>{_esc(bar["station"])}</dd>')
    parts.append(f'      <dt>Address</dt><dd>{_esc(bar["address"])}</dd>')
    if bar.get('status'):
        parts.append(f'      <dt>Access</dt><dd>{_esc(bar["status"])}</dd>')
    parts.append(f'    </dl>')
    # Golden Gai subvenues
    subvenues = bar.get('subvenues') or []
    if subvenues:
        parts.append(f'    <div class="subvenues" role="list">')
        for sv in subvenues:
            parts.append(_render_subvenue(sv))
        parts.append(f'    </div>')
    # 5. Primary Maps action + secondary sources (deduplicated)
    parts.append(f'    <p class="stop-links">')
    maps_url = bar.get('mapsUrl') or f'https://www.google.com/maps/search/?api=1&query={bar["lat"]},{bar["lng"]}'
    parts.append(f'      <a class="stop-link stop-link-primary" href="{_esc(maps_url)}" target="_blank" rel="noopener noreferrer">Open in Maps</a>')
    for src in bar.get('sources') or []:
        if src.get('label') and src.get('url'):
            # Skip sources that duplicate the mapsUrl link.
            if src['url'] == maps_url:
                continue
            parts.append(f'      <a class="stop-link" href="{_esc(src["url"])}" target="_blank" rel="noopener noreferrer">{_esc(src["label"])}</a>')
    parts.append(f'    </p>')
    parts.append(f'  </section>')
    return '\n'.join(parts)


def render_journey(data_path):
    """Generate the inner HTML for the <!-- build:journey --> region."""
    with open(s.ROOT / data_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    bars = data['bars']

    # Night-journey legs: geographic clusters that progress deeper into the
    # night. Each leg gets a header so the reader can see the structure.
    legs = [
        ('Ginza &amp; Nihonbashi', 'Early evening — cocktails and counters'),
        ('Shinjuku', 'Late evening — hotel bars, speakeasies, Golden Gai'),
        ('Shibuya &amp; Ebisu &amp; Meguro', 'Midnight — coffee shops that aren\u2019t, jazz rooms'),
        ('Minato &amp; Roppongi', 'Deep night — Azabujuban counters and Roppongi basements'),
        ('East Tokyo', 'After hours — Kanda to Ueno to Bunkyo'),
        ('The outer reaches', 'The far outliers and the locked door'),
    ]
    # Map bar numbers to leg indices (1-based numbering, 0-based legs).
    leg_bounds = [5, 12, 18, 21, 28, 30]  # last number in each leg
    leg_of = {}
    li = 0
    for n in range(1, len(bars) + 1):
        if li < len(leg_bounds) and n > leg_bounds[li]:
            li += 1
        leg_of[n] = li

    parts = [
        '<p class="journey-intro">A night in order: Ginza cocktails, then Shinjuku\u2019s '
        'hidden floors, then the midnight shift south through Ebisu and Roppongi, '
        'and the east-side after-hours crawl, and the far outliers \u2014 ending at a door you have to be let into. Each stop is a place \u2014 '
        'with its floor, its address, and a note on what it is. '
        'Switch to Map &amp; list to see them all at once.</p>'
    ]
    # Interstitial transit clips inserted between legs — walking footage
    # that gives the feeling of moving through Tokyo between neighborhoods.
    # Keyed by the leg index they appear BEFORE (0 = before leg 0, etc.)
    interstitials = {
        1: ('assets/movie/interstitial-hallway.webm', 'assets/movie/interstitial-hallway.mp4',
            'Walking down a narrow hallway'),
        2: ('assets/movie/interstitial-stairs.webm', 'assets/movie/interstitial-stairs.mp4',
            'Descending stairs'),
        3: ('assets/movie/janai-coffee.webm', 'assets/movie/janai-coffee.mp4',
            'Finding the door'),
    }

    def _interstitial(leg_idx):
        if leg_idx not in interstitials:
            return ''
        webm, mp4, alt = interstitials[leg_idx]
        return (
            f'<figure class="journey-interstitial" aria-label="{_esc(alt)}">'
            f'<video class="stop-video" muted loop playsinline preload="metadata">'
            f'<source src="{_esc(webm)}" type="video/webm">'
            f'<source src="{_esc(mp4)}" type="video/mp4">'
            f'</video></figure>'
        )

    prev_leg = -1
    for bar in bars:
        n = bar['number']
        leg = leg_of.get(n, 0)
        if leg != prev_leg:
            if prev_leg >= 0:
                parts.append(_interstitial(leg))
            title, subtitle = legs[leg]
            parts.append(f'<h3 class="journey-leg">{title}<span class="journey-leg-sub">{subtitle}</span></h3>')
            prev_leg = leg
        parts.append(_render_stop(bar))
    return '\n'.join(parts)


def build_page(rel, text):
    eol = s.eol_of(text)
    for name in REGIONS:
        rx = s.region_re(name)
        m = rx.search(text)
        if not m:
            continue
        # keep the indentation of the opening marker
        line_start = text.rfind('\n', 0, m.start()) + 1
        indent = text[line_start:m.start()]
        body = s.indent_block(s.render_partial(name, rel), indent, eol)
        block = s.MARK.format(name=name) + eol + body + eol + indent + s.END_MARK.format(name=name)
        text = text[:m.start()] + block + text[m.end():]
    # Generated journey region (bars-map.html only).
    journey_src = JOURNEY_PAGES.get(rel.as_posix())
    if journey_src:
        rx = s.region_re('journey')
        m = rx.search(text)
        if m:
            line_start = text.rfind('\n', 0, m.start()) + 1
            indent = text[line_start:m.start()]
            body = s.indent_block(render_journey(journey_src), indent, eol)
            block = s.MARK.format(name='journey') + eol + body + eol + indent + s.END_MARK.format(name='journey')
            text = text[:m.start()] + block + text[m.end():]
    return rehash_assets(rel, text)


def main(argv):
    check = '--check' in argv
    changed = []
    # JS first, so the pages then pick up the JS files' new hashes.
    targets = [(Path(p), rehash_assets) for p in JS_WITH_ASSETS] + [(rel, build_page) for rel in s.pages()]
    for rel, fn in targets:
        old = s.read(rel)
        new = fn(rel, old)
        if new != old:
            changed.append(rel.as_posix())
            if not check:
                s.write(rel, new)
    if check:
        if changed:
            print('Out of date (run python tools/build.py):')
            print('\n'.join('  ' + c for c in changed))
            return 1
        print('All pages up to date.')
        return 0
    print(f'Updated {len(changed)} page(s).' + (('\n  ' + '\n  '.join(changed)) if changed else ''))
    # Post-build consistency checks for bars-map.html
    _assert_bars_consistency()
    return 0


def _assert_bars_consistency():
    """Verify bars-map.html is internally consistent after build."""
    html_path = Path('bars-map.html')
    if not html_path.exists():
        return
    text = html_path.read_text(encoding='utf-8')
    errors = []
    # data-category must be single-valued
    for m in re.finditer(r'data-category="([^"]+)"', text):
        if len(m.group(1).split()) > 1:
            errors.append(f"Multi-valued data-category: '{m.group(1)}'")
    # stop count == bar-count == max data-number == JSON count
    stop_count = len(re.findall(r'class="stop(?: is-spotlight)?"\s', text))
    data_numbers = [int(n) for n in re.findall(r'data-number="(\d+)"', text)]
    max_number = max(data_numbers) if data_numbers else 0
    count_match = re.search(r'id="bar-count"[^>]*>(\d+)<', text)
    static_count = int(count_match.group(1)) if count_match else 0
    json_path = Path('assets/bars-map-data.json')
    if json_path.exists():
        json_count = len(json.loads(json_path.read_text(encoding='utf-8'))['bars'])
    else:
        json_count = -1
    if static_count != stop_count:
        errors.append(f"bar-count span ({static_count}) != .stop count ({stop_count})")
    if stop_count != max_number:
        errors.append(f".stop count ({stop_count}) != max data-number ({max_number})")
    if json_count != stop_count:
        errors.append(f"JSON bar count ({json_count}) != .stop count ({stop_count})")
    if errors:
        print("WARNING: bars-map consistency check failed:")
        for e in errors:
            print(f"  {e}")
        sys.exit(1)


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
