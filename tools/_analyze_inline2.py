import re, sys, collections
import sitelib as s
sys.stdout.reconfigure(encoding='utf-8', errors='replace')
TAG_RE = re.compile(r'<(\w+)([^>]*?)\sstyle="([^"]*)"([^>]*)>')
def norm(v):
    parts = [p.strip() for p in v.split(';') if p.strip()]
    return '; '.join(re.sub(r'\s*:\s*', ': ', p) for p in parts)
info = collections.defaultdict(lambda: {'n': 0, 'files': set(), 'tags': collections.Counter(), 'cls': collections.Counter()})
for rel in s.pages():
    if rel.name.startswith('Practical Effects'): continue
    for tag, pre, val, post in TAG_RE.findall(s.read(rel)):
        d = info[norm(val)]; d['n'] += 1; d['files'].add(rel.as_posix()); d['tags'][tag] += 1
        m = re.search(r'class="([^"]*)"', pre + post); d['cls'][m.group(1) if m else '-'] += 1
print('total (excluding Practical Effects*):', sum(d['n'] for d in info.values()), 'distinct:', len(info))
for val, d in sorted(info.items(), key=lambda kv: -kv[1]['n']):
    tags = ','.join(f'{t}x{c}' for t, c in d['tags'].most_common(3))
    cls = ','.join(f'{t}' for t, c in d['cls'].most_common(2))
    print(f'{d["n"]:4} f={len(d["files"]):2} <{tags}> cls[{cls}]\n       {val}')
    if len(d['files']) <= 2: print('       @', ', '.join(sorted(d['files'])))
