import re, sys, collections
import sitelib as s
sys.stdout.reconfigure(encoding='utf-8', errors='replace')

STYLE_RE = re.compile(r'\sstyle="([^"]*)"')
ONCLICK_RE = re.compile(r'\son(\w+)="([^"]*)"')

def norm(v):
    parts = [p.strip() for p in v.split(';') if p.strip()]
    return '; '.join(re.sub(r'\s*:\s*', ': ', p) for p in parts)

by_val = collections.Counter(); by_file = collections.Counter(); files_for = collections.defaultdict(set)
handlers = collections.Counter(); handler_files = collections.defaultdict(set)
for rel in s.pages():
    t = s.read(rel)
    for v in STYLE_RE.findall(t):
        nv = norm(v); by_val[nv] += 1; by_file[rel.as_posix()] += 1; files_for[nv].add(rel.as_posix())
    for ev, code in ONCLICK_RE.findall(t):
        key = (ev, re.sub(r"'[^']*'", "'…'", re.sub(r'\d+', 'N', code))[:80])
        handlers[key] += 1; handler_files[key].add(rel.as_posix())

print(f'inline style attrs: {sum(by_val.values())}  distinct values: {len(by_val)}')
print(f'values used once: {sum(1 for c in by_val.values() if c == 1)}')
print('\nper file:'); [print(f'  {c:4} {f}') for f, c in by_file.most_common()]
print('\ntop values:'); [print(f'  {c:4} [{len(files_for[v])} files] {v[:110]}') for v, c in by_val.most_common(45)]
print(f'\ninline event handlers: {sum(handlers.values())}')
[print(f'  {c:4} {ev}  {code}   <- {", ".join(sorted(handler_files[(ev, code)]))[:120]}') for (ev, code), c in handlers.most_common()]
