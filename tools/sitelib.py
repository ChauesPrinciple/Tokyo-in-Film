"""Shared helpers for the Tokyo in Film build/check tooling."""
import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PARTIALS = ROOT / 'tools' / 'partials'

# Directories / filenames that are not part of the deployed site.
_SKIP_DIRS = {'archive', 'kmz_extracted', 'kurasawa_extracted', 'Student Work',
              'class_resources', 'scripts', 'node_modules', '.git', 'tools', 'film-coach-worker'}
_SKIP_NAME = re.compile(r'^(scratch|backup|debug_|test_|temp_)')

# Pages that intentionally have no shared nav/footer (redirects, embeds, standalone tools).
STANDALONE = {
    'anime-map.html', 'contact-form-embedded.html', 'scene-project.html',
    'your-documentary.html', 'Practical Effects.html', 'Practical Effects List of Ingredients.html',
}

MARK = '<!-- build:{name} -->'
END_MARK = '<!-- /build:{name} -->'


def pages():
    """All deployable HTML pages, sorted, as paths relative to ROOT."""
    out = []
    for p in ROOT.rglob('*.html'):
        rel = p.relative_to(ROOT)
        if any(part in _SKIP_DIRS or part.startswith('temp_') for part in rel.parts[:-1]):
            continue
        if _SKIP_NAME.match(rel.name):
            continue
        out.append(rel)
    return sorted(out, key=lambda r: r.as_posix())


def templated_pages():
    return [r for r in pages() if r.name not in STANDALONE]


def root_prefix(rel):
    return '../' * (len(rel.parts) - 1)


def active_key(rel):
    """Which nav item is highlighted for this page."""
    if len(rel.parts) > 1:
        return rel.parts[0]  # pre-production / production / post-production / guides
    return {'index.html': 'home', 'documentary-project.html': 'documentary',
            'glossary.html': 'glossary', 'free-guides.html': 'guides'}.get(rel.name)


def read(rel):
    return (ROOT / rel).read_bytes().decode('utf-8')


def write(rel, text):
    (ROOT / rel).write_bytes(text.encode('utf-8'))


def file_hash(rel, length=8):
    return hashlib.sha1((ROOT / rel).read_bytes()).hexdigest()[:length]


def render_partial(name, rel):
    """Fill a partial template for a given page."""
    tpl = (PARTIALS / f'{name}.html').read_text(encoding='utf-8').rstrip('\r\n')
    key = active_key(rel)
    tpl = tpl.replace('{{root}}', root_prefix(rel))
    tpl = re.sub(r'\{\{active:([\w-]+)\}\}', lambda m: ' class="active"' if m.group(1) == key else '', tpl)
    tpl = re.sub(r'\{\{hash:([\w./-]+)\}\}', lambda m: file_hash(m.group(1)), tpl)
    return tpl


def region_re(name):
    return re.compile(re.escape(MARK.format(name=name)) + r'.*?' + re.escape(END_MARK.format(name=name)), re.S)


def indent_block(text, indent, eol):
    lines = text.splitlines()
    return eol.join((indent + l) if l.strip() else '' for l in lines)


def eol_of(text):
    return '\r\n' if '\r\n' in text else '\n'
