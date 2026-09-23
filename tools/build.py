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

tokyo-after-dark.html also has a generated region:

    <!-- build:journey --> ... <!-- /build:journey -->

This is filled from assets/tokyo-after-dark.json with one <section class="stop">
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
    'tokyo-after-dark.html': 'assets/tokyo-after-dark.json',
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


def _alias_columns(aliases, font=13, usable=118):
    """Columns the vertical alias spine needs.

    Each alias starts its own column (writing-mode: vertical-rl), and a long
    alias wraps into further columns. `usable` is a deliberately pessimistic
    spine height in px, taken from the shortest card we can expect (one with
    no media and a one-line description), so the reserved gutter is never
    too narrow. Over-reserving on tall cards costs a little whitespace;
    under-reserving would put vertical text over the copy.
    """
    return sum(max(1, math.ceil(len(a) * font / usable)) for a in aliases)


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
    parts.append(f'      <article class="subvenue" role="listitem" data-floor="{_esc(sv.get("floor") or "")}" tabindex="0" aria-label="{_esc(sv["name"])}">')
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

    Media (video or image) is a background layer behind the text. The text
    sits in .stop-body with a sakura-tinted panel for readability over the
    media. Hierarchy is ordered for choosing-then-finding:
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
    aliases = bar.get('aliases') or []
    # Reserve the right-hand gutter the vertical alias spine will occupy.
    # One column per alias is not enough: a long alias wraps into extra
    # columns, so count the columns each alias actually needs. Reserving the
    # real width is what keeps the spine off the horizontal text.
    cols_attr = f' style="--alias-cols:{_alias_columns(aliases)}"' if aliases else ''
    epilogue_cls = ' epilogue' if bar.get('epilogue') else ''
    no_media = not (bar.get('video') or bar.get('image'))
    no_media_cls = ' no-media' if no_media else ''
    num_attr = '' if bar.get('epilogue') else f' data-number="{num}"'
    leg_attr = f' data-leg="{_esc(bar["leg"])}"' if bar.get('leg') else ''
    parts = []
    parts.append(f'  <section class="stop{spotlight}{epilogue_cls}{no_media_cls}" id="stop-{bid}" data-stop="{bid}"{num_attr}{floor_attr}{cat_attr}{leg_attr}{cols_attr}>')
    # Media as a background layer — video or image covers the full card.
    video = bar.get('video')
    image = bar.get('image')
    if video:
        poster = bar.get('videoPoster') or ''
        poster_attr = f' poster="{_esc(poster)}"' if poster else ''
        mp4 = bar.get('videoMp4') or video.replace('.webm', '.mp4')
        parts.append(f'    <div class="stop-media-bg">')
        parts.append(f'      <video class="stop-video" muted loop playsinline preload="none"{poster_attr}>')
        parts.append(f'        <source src="{_esc(video)}" type="video/webm">')
        parts.append(f'        <source src="{_esc(mp4)}" type="video/mp4">')
        parts.append(f'      </video>')
        parts.append(f'    </div>')
    elif image:
        alt = _esc(bar.get('imageAlt') or bar.get('name', ''))
        parts.append(f'    <div class="stop-media-bg">')
        parts.append(f'      <img src="{_esc(image)}" alt="{alt}" loading="lazy" decoding="async">')
        parts.append(f'    </div>')
    else:
        # No footage: a designed background instead — leg-tinted gradient
        # with the first Japanese alias as a faint vertical watermark.
        wm = aliases[0] if aliases else bar.get('name', '')
        parts.append(f'    <div class="stop-media-bg stop-media-bg--type" aria-hidden="true"><span class="stop-watermark">{_esc(wm)}</span></div>')
    # Text body on top of the media, with a sakura-tinted panel.
    parts.append(f'    <div class="stop-body">')
    # Epilogue veil: a reveal button over the "naughty" card. tokyo-after-dark.js
    # shows it and makes the content behind it inert until it's opened.
    if bar.get('epilogue'):
        parts.append(f'      <button type="button" class="stop-veil" aria-label="Secret. Reveal this card">SECRET</button>')
    # 1. Name
    parts.append(f'      <header class="stop-head">')
    if bar.get('epilogue'):
        parts.append(f'        <p class="stop-number" aria-hidden="true"></p>')
    else:
        parts.append(f'        <p class="stop-number">{num}</p>')
    parts.append(f'        <div class="stop-head-text">')
    parts.append(f'          <h3 class="stop-name">{_esc(bar["name"])}</h3>')
    parts.append(f'        </div>')
    parts.append(f'      </header>')
    if aliases:
        # Each alias is its own vertical column (writing-mode: vertical-rl);
        # <br> starts the next column to the left, the way several lantern
        # cards sit beside a sign. Kept here in the flow, directly after the
        # name, so narrow screens read name then Japanese name. On wide
        # screens CSS lifts it into the reserved gutter on the right.
        alias_html = '<br>'.join(_esc(a) for a in aliases)
        parts.append(f'      <p class="stop-aliases">{alias_html}</p>')
    # 2. Neighborhood, type, floor — a compact "where it sits" line
    summary_bits = [_locality(bar)]
    if bar.get('style'):
        summary_bits.append(bar['style'])
    if floor:
        summary_bits.append(floor)
    parts.append(f'      <p class="stop-summary">{_esc(" · ".join(summary_bits))}</p>')
    # 3. Description — why to go
    if bar.get('description'):
        parts.append(f'      <p class="stop-description">{_esc(bar["description"])}</p>')
    # 3b. Editorial note — hours, access warnings, status caveats
    if bar.get('note'):
        parts.append(f'      <p class="stop-note">{_esc(bar["note"])}</p>')
    # 4. Practical details for finding the entrance
    parts.append(f'      <dl class="stop-facts">')
    if bar.get('station'):
        parts.append(f'        <dt>Station</dt><dd>{_esc(bar["station"])}</dd>')
    parts.append(f'      <dt>Address</dt><dd>{_esc(bar["address"])}</dd>')
    if bar.get('status'):
        parts.append(f'        <dt>Access</dt><dd>{_esc(bar["status"])}</dd>')
    parts.append(f'      </dl>')
    # Golden Gai subvenues
    subvenues = bar.get('subvenues') or []
    if subvenues:
        parts.append(f'      <div class="subvenues" role="list">')
        for sv in subvenues:
            parts.append('      ' + _render_subvenue(sv))
        parts.append(f'      </div>')
    # 5. Primary Maps action + secondary sources (deduplicated)
    parts.append(f'      <p class="stop-links">')
    maps_url = bar.get('mapsUrl') or f'https://www.google.com/maps/search/?api=1&query={bar["lat"]},{bar["lng"]}'
    parts.append(f'        <a class="stop-link stop-link-primary" href="{_esc(maps_url)}" target="_blank" rel="noopener noreferrer">Open in Maps</a>')
    for src in bar.get('sources') or []:
        if src.get('label') and src.get('url'):
            # Skip sources that duplicate the mapsUrl link.
            if src['url'] == maps_url:
                continue
            parts.append(f'        <a class="stop-link" href="{_esc(src["url"])}" target="_blank" rel="noopener noreferrer">{_esc(src["label"])}</a>')
    parts.append(f'      </p>')
    parts.append(f'    </div>')
    parts.append(f'  </section>')
    return '\n'.join(parts)


# Night-journey legs: geographic clusters that progress deeper into the
# night. Each bar declares its leg via the 'leg' key in the JSON; this
# dict fixes the order the legs appear and their header text.
LEGS = {
    'ginza':       ('Ginza', 'Early evening: cocktails and counters'),
    'shinjuku':    ('Shinjuku', 'Late evening: hotel bars, speakeasies, Golden Gai'),
    'west':        ('Shibuya & Setagaya & Meguro & Minato', 'Midnight: coffee shops that aren\u2019t, jazz rooms, Azabujuban counters'),
    'east':        ('East Tokyo', 'After hours: Kanda to Ueno to Bunkyo'),
    'locked-door': ('The locked door', 'The one place you can\u2019t walk into'),
}


def _known_styles():
    """Styles the Type filter in js/tokyo-after-dark.js knows about.

    Parsed out of STYLE_CATEGORIES so the JSON can't drift into a style
    the filter would silently drop.
    """
    js = s.read(Path('js/tokyo-after-dark.js'))
    m = re.search(r'STYLE_CATEGORIES\s*=\s*\[(.*?)\];', js, re.S)
    if not m:
        return None
    # Inner lists hold the styles; the outer pairs also contain the label.
    styles = set()
    for inner in re.findall(r"\[('[^']*'(?:\s*,\s*'[^']*')*)\]", m.group(1)):
        styles.update(re.findall(r"'([^']*)'", inner))
    return styles


def _validate_journey(bars, interstitial_count):
    """Fail loudly when the JSON's leg/interstitial declarations drift."""
    def label(b):
        return f"bar #{b.get('number')} ({b.get('id', '?')})"

    errors = []
    order = list(LEGS)
    seen = []
    numbered = [b for b in bars if not b.get('epilogue')]
    for b in numbered:
        leg = b.get('leg')
        if leg is None:
            errors.append(f"{label(b)}: missing 'leg'")
            continue
        if leg not in LEGS:
            errors.append(f"{label(b)}: unknown leg '{leg}' (expected one of: {', '.join(order)})")
            continue
        if not seen or leg != seen[-1]:
            if leg in seen:
                errors.append(f"{label(b)}: leg '{leg}' reappears after a later leg - legs must be contiguous")
            elif len(seen) >= len(order) or order[len(seen)] != leg:
                want = order[len(seen)] if len(seen) < len(order) else '(no further legs)'
                errors.append(f"{label(b)}: leg '{leg}' out of order - next expected leg is '{want}'")
            else:
                seen.append(leg)

    flagged = [b for b in numbered if b.get('interstitialAfter')]
    if len(flagged) != interstitial_count:
        errors.append(f"{len(flagged)} 'interstitialAfter' flag(s) but {interstitial_count} interstitial clips - counts must match")
    if numbered and numbered[-1].get('interstitialAfter'):
        errors.append(f"{label(numbered[-1])}: 'interstitialAfter' on the last numbered stop - the coda goes there instead")
    for b in bars:
        if not b.get('epilogue'):
            continue
        if b.get('interstitialAfter'):
            errors.append(f"{label(b)}: 'interstitialAfter' on the epilogue")
        if b.get('leg') != 'epilogue':
            errors.append(f"{label(b)}: epilogue must have \"leg\": \"epilogue\"")

    known = _known_styles()
    if known is None:
        errors.append('could not parse STYLE_CATEGORIES from js/tokyo-after-dark.js')
    else:
        for b in bars:
            style = b.get('style')
            if style and style not in known:
                errors.append(f"{label(b)}: style '{style}' maps to no Type category")

    if errors:
        print('ERROR: tokyo-after-dark journey data is inconsistent:')
        for e in errors:
            print(f'  {e}')
        sys.exit(1)


def render_journey(data_path):
    """Generate the inner HTML for the <!-- build:journey --> region."""
    with open(s.ROOT / data_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    bars = data['bars']

    parts = []

    # Interstitial transit clips — stairwell footage spliced from the
    # JANAI COFFEE approach video (3-second increments). Inserted at fixed
    # positions so the reader scrolls through movement between neighborhoods.
    # 9 unique 3-second clips from the JANAI source (15-40s range), each from
    # a different offset so every interstitial feels distinct. Order goes
    # warm → neon: early clips are the soft-lit stairwell approach, later
    # clips descend into darker neon-lit sections.
    CLIP_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    # Murakami quotes flashed on the full-screen interstitials. Dropped the
    # unverified suffering quote (widely attributed to Norwegian Wood but not
    # confirmable in the text), and the "things you can only do alone" line
    # from After Dark, which is now the page epigraph over the drive-in clip.
    # The ninth quote rides the last interstitial, right before the locked
    # door: Oshima's seeking line, spoken in the car just ahead of the
    # Cassandra prophecy. The storm quote is the coda.
    INTERSTITIAL_QUOTES = [
        ('If you only read the books that everyone else is reading, you can only think what everyone else is thinking.', 'Norwegian Wood'),
        ('I dream. Sometimes I think that\u2019s the only right thing to do.', 'Sputnik Sweetheart'),
        ('Even in the smallest events there\u2019s no such thing as coincidence.', 'Kafka on the Shore'),
        ('A certain type of perfection can only be realized through a limitless accumulation of the imperfect.', 'Kafka on the Shore'),
        ('What lasts, lasts; what doesn\u2019t, doesn\u2019t. Time solves most things. And what time can\u2019t solve, you have to solve yourself.', 'Dance Dance Dance'),
        ('No matter how far you travel, you can never get away from yourself.', 'After the Quake'),
        ('People\u2019s memories are maybe the fuel they burn to stay alive.', 'After Dark'),
        ('Memories warm you up from the inside. But they also tear you apart.', 'Kafka on the Shore'),
        ('Whatever it is you\u2019re seeking won\u2019t come in the form you\u2019re expecting.', 'Kafka on the Shore'),
    ]
    CODA_QUOTE = (
        'And once the storm is over, you won\u2019t remember how you made it through, '
        'how you managed to survive... That\u2019s what this storm\u2019s all about.',
        'Kafka on the Shore',
    )

    def _interstitial(idx):
        if idx >= len(CLIP_ORDER):
            return ''
        clip = CLIP_ORDER[idx]
        webm = f'assets/movie/interstitial-{clip}.webm'
        mp4 = f'assets/movie/interstitial-{clip}.mp4'
        quote_html = ''
        if idx < len(INTERSTITIAL_QUOTES):
            text, source = INTERSTITIAL_QUOTES[idx]
            quote_html = (
                f'<figcaption class="interstitial-quote">'
                f'<blockquote>{_esc(text)}</blockquote>'
                f'<cite>{_esc(source)}</cite>'
                f'</figcaption>'
            )
        return (
            f'<figure class="journey-interstitial" aria-label="Stairwell transition">'
            f'<video class="stop-video" muted loop playsinline preload="none">'
            f'<source src="{_esc(webm)}" type="video/webm">'
            f'<source src="{_esc(mp4)}" type="video/mp4">'
            f'</video>{quote_html}</figure>'
        )

    def _coda():
        text, source = CODA_QUOTE
        return (
            f'<figure class="journey-interstitial journey-coda" aria-label="The storm">'
            f'<video class="stop-video" muted loop playsinline preload="none">'
            f'<source src="assets/movie/coda.webm" type="video/webm">'
            f'<source src="assets/movie/coda.mp4" type="video/mp4">'
            f'</video>'
            f'<figcaption class="interstitial-quote">'
            f'<blockquote>{_esc(text)}</blockquote>'
            f'<cite>{_esc(source)}</cite>'
            f'</figcaption>'
            f'</figure>'
        )

    _validate_journey(bars, len(CLIP_ORDER))

    # The drive in is not a journey item: it is the page's opening layer,
    # hardcoded in tokyo-after-dark.html so the masthead and title sit on
    # top of it. See #overture there.
    prev_leg = None
    interstitial_idx = 0
    for bar in bars:
        if bar.get('epilogue'):
            continue
        leg = bar['leg']
        if leg != prev_leg:
            title, subtitle = LEGS[leg]
            parts.append(f'<h2 class="journey-leg">{title}<span class="journey-leg-sub">{subtitle}</span></h2>')
            prev_leg = leg
        parts.append(_render_stop(bar))
        # Interstitials are flagged per-bar in the JSON ('interstitialAfter'),
        # spaced so all 9 clips and quotes are used across the journey and no
        # stop is isolated between two interstitials. The coda goes after
        # the last stop instead of a 10th interstitial.
        if bar.get('interstitialAfter'):
            parts.append(_interstitial(interstitial_idx))
            interstitial_idx += 1
    # Closing quote after the final stop (SAKEBARO spotlight).
    parts.append(_coda())
    # Epilogue: the "naughty" stop after the storm, outside the night journey.
    epilogue = next((b for b in bars if b.get('epilogue')), None)
    if epilogue:
        parts.append(_render_stop(epilogue))
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
    # Generated journey region (tokyo-after-dark.html only).
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
    # Post-build consistency checks for tokyo-after-dark.html
    _assert_bars_consistency()
    return 0


def _assert_bars_consistency():
    """Verify tokyo-after-dark.html is internally consistent after build."""
    html_path = Path('tokyo-after-dark.html')
    if not html_path.exists():
        return
    text = html_path.read_text(encoding='utf-8')
    errors = []
    # data-category may be multi-valued (space-separated, e.g. "basement distant");
    # _category() deliberately builds these and the JS/CSS read them as lists.
    # Only flag values that contain characters that would break attribute parsing.
    for m in re.finditer(r'data-category="([^"]+)"', text):
        val = m.group(1)
        if '"' in val or '<' in val:
            errors.append(f"Invalid data-category: '{val}'")
    # stop count == bar-count == max data-number == JSON count
    # The regex matches class="stop" plus any combination of modifier
    # classes (is-spotlight, no-media) that build.py may add, but NOT
    # epilogue (which is a separate count — the epilogue card has no
    # data-number and is excluded from the numbered-stop total).
    stop_count = len(re.findall(r'class="stop(?: is-spotlight| no-media)*"\s', text))
    data_numbers = [int(n) for n in re.findall(r'data-number="(\d+)"', text)]
    max_number = max(data_numbers) if data_numbers else 0
    count_match = re.search(r'id="bar-count"[^>]*>(\d+)<', text)
    static_count = int(count_match.group(1)) if count_match else 0
    json_path = Path('assets/tokyo-after-dark.json')
    if json_path.exists():
        all_bars = json.loads(json_path.read_text(encoding='utf-8'))['bars']
        json_count = len([b for b in all_bars if not b.get('epilogue')])
    else:
        json_count = -1
    if static_count != stop_count:
        errors.append(f"bar-count span ({static_count}) != .stop count ({stop_count})")
    if stop_count != max_number:
        errors.append(f".stop count ({stop_count}) != max data-number ({max_number})")
    if json_count != stop_count:
        errors.append(f"JSON bar count ({json_count}) != .stop count ({stop_count})")
    if errors:
        print("WARNING: tokyo-after-dark consistency check failed:")
        for e in errors:
            print(f"  {e}")
        sys.exit(1)


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
