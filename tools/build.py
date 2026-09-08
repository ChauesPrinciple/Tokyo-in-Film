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
    # Match leading floor tokens like 'B1F', 'B2F', '1F', '6F', '38F', '4F', '3F'.
    m = re.match(r'^((?:B\d+F|\d+F)(?:\s*[-A-Z])?)\b', addr)
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
    parts.append(f'      <article class="subvenue" data-floor="{_esc(sv.get("floor") or "")}">')
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
    """Render one venue as a semantic <section class="stop">."""
    bid = _esc(bar['id'])
    num = bar['number']
    spotlight = ' is-spotlight' if bar.get('spotlight') else ''
    floor = _floor_label(bar)
    floor_attr = f' data-floor="{_esc(floor)}"' if floor else ''
    category = _category(bar)
    cat_attr = f' data-category="{_esc(category)}"' if category else ''
    parts = []
    parts.append(f'  <section class="stop{spotlight}" id="stop-{bid}" data-stop="{bid}" data-number="{num}"{floor_attr}{cat_attr}>')
    parts.append(f'    <header class="stop-head">')
    parts.append(f'      <p class="stop-number">{num}</p>')
    parts.append(f'      <h3 class="stop-name">{_esc(bar["name"])}</h3>')
    aliases = bar.get('aliases') or []
    if aliases:
        parts.append(f'      <p class="stop-aliases">{_esc(" · ".join(aliases))}</p>')
    parts.append(f'    </header>')
    parts.append(f'    <dl class="stop-facts">')
    if bar.get('style'):
        parts.append(f'      <dt>Type</dt><dd>{_esc(bar["style"])}</dd>')
    if floor:
        parts.append(f'      <dt>Floor</dt><dd>{_esc(floor)}</dd>')
    parts.append(f'      <dt>Address</dt><dd>{_esc(bar["address"])}</dd>')
    parts.append(f'      <dt>Locality</dt><dd>{_esc(_locality(bar))}</dd>')
    if bar.get('station'):
        parts.append(f'      <dt>Station</dt><dd>{_esc(bar["station"])}</dd>')
    if bar.get('status'):
        parts.append(f'      <dt>Access</dt><dd>{_esc(bar["status"])}</dd>')
    parts.append(f'    </dl>')
    if bar.get('description'):
        parts.append(f'    <p class="stop-description">{_esc(bar["description"])}</p>')
    # Golden Gai subvenues
    subvenues = bar.get('subvenues') or []
    if subvenues:
        parts.append(f'    <div class="subvenues" role="list">')
        for sv in subvenues:
            parts.append(_render_subvenue(sv))
        parts.append(f'    </div>')
    # Links
    parts.append(f'    <p class="stop-links">')
    maps_url = bar.get('mapsUrl') or f'https://www.google.com/maps/search/?api=1&query={bar["lat"]},{bar["lng"]}'
    parts.append(f'      <a class="stop-link" href="{_esc(maps_url)}" target="_blank" rel="noopener noreferrer">Open in Maps</a>')
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
    stops = '\n'.join(_render_stop(b) for b in bars)
    intro = (
        '<p class="journey-intro">Scroll through the night. Each stop is a place — '
        'with its floor, its address, and a note on what it is. '
        'Switch to Map & list to see them all at once.</p>'
    )
    return intro + '\n' + stops


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
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
