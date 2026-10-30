"""Verify the reserved alias gutter matches what the spine needs.

Layout: .stop reserves padding-right of 30px + --alias-cols * 24px, and
.stop-aliases is absolutely positioned into that gutter with no max-height,
so nothing can be clipped. build.py sets --alias-cols via _alias_columns().

This cross-checks the value actually emitted into bars-map.html against the
columns the spine needs at a pessimistic card height, and reports the gutter
each card ends up with.
"""
import json
import math
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from build import _alias_columns  # noqa: E402

FONT = 13
COL = 24
GUTTER_BASE = 30

with open('assets/bars-map-data.json', encoding='utf-8') as f:
    data = json.load(f)

html = Path('bars-map.html').read_text(encoding='utf-8')
emitted = {
    m.group(1): int(m.group(2))
    for m in re.finditer(r'id="stop-([^"]+)"[^>]*--alias-cols:(\d+)', html)
}

print(f'{"bar":34} {"aliases":>7} {"need":>4} {"emitted":>7} {"gutter":>7}')
print('-' * 66)

bad = []
for bar in data['bars']:
    aliases = bar.get('aliases') or []
    if not aliases:
        continue
    need = _alias_columns(aliases)
    got = emitted.get(bar['id'])
    gutter = GUTTER_BASE + (got or 0) * COL
    ok = got == need
    if not ok:
        bad.append((bar['id'], need, got))
    print(f'{bar["name"][:32]:34} {len(aliases):7} {need:4} {got if got is not None else "-":>7} '
          f'{str(gutter) + "px":>7} {"" if ok else "  MISMATCH"}')

widest = max(emitted.values()) if emitted else 0
print()
print(f'cards checked: {len(emitted)}')
print(f'widest gutter: {GUTTER_BASE + widest * COL}px ({widest} columns)')
print()
if bad:
    print('MISMATCHES between needed and emitted columns:')
    for bid, need, got in bad:
        print(f'  {bid}: need {need}, emitted {got}')
    sys.exit(1)
print('All cards reserve exactly the columns their spine needs.')
print('No max-height on .stop-aliases, so no alias can be clipped.')
