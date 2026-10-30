import re, sys
sys.stdout.reconfigure(encoding='utf-8')
from pathlib import Path
t = Path('bars-map.html').read_text(encoding='utf-8')
cats = re.findall(r'data-category="([^"]+)"', t)
print(f"{len(cats)} categorized stops:")
for c in cats:
    print(f"  {c}")
