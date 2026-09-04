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
"""
import re
import sys

import sitelib as s

ASSET_RE = re.compile(r'(?P<path>(?:\.\./)*(?:style\.css|js/[\w-]+\.js))\?v=[\w.]+')
REGIONS = ('head', 'nav', 'footer')


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

    def rehash(m):
        target = (s.ROOT / rel).parent / m.group('path')
        if not target.exists():
            return m.group(0)
        return f"{m.group('path')}?v={s.file_hash(target.resolve().relative_to(s.ROOT))}"
    return ASSET_RE.sub(rehash, text)


def main(argv):
    check = '--check' in argv
    changed = []
    for rel in s.pages():
        old = s.read(rel)
        new = build_page(rel, old)
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
