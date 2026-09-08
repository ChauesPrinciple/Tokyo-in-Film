"""Build-time consistency checks for the bars map."""
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

errors = []

# 1. data-category must be single-valued
with open('bars-map.html', 'r', encoding='utf-8') as f:
    html = f.read()

cats = re.findall(r'data-category="([^"]+)"', html)
for c in cats:
    parts = c.split()
    if len(parts) > 1:
        errors.append(f"Multi-valued data-category: '{c}'")

# 2. bar-count span text == number of .stop sections == max data-number
stop_count = len(re.findall(r'class="stop(?: is-spotlight)?"\s', html))
data_numbers = [int(n) for n in re.findall(r'data-number="(\d+)"', html)]
max_number = max(data_numbers) if data_numbers else 0

count_match = re.search(r'id="bar-count"[^>]*>(\d+)<', html)
static_count = int(count_match.group(1)) if count_match else 0

if static_count != stop_count:
    errors.append(f"bar-count span ({static_count}) != .stop count ({stop_count})")
if stop_count != max_number:
    errors.append(f".stop count ({stop_count}) != max data-number ({max_number})")

# 3. JSON bar count matches
with open('assets/bars-map-data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
json_count = len(data['bars'])
if json_count != stop_count:
    errors.append(f"JSON bar count ({json_count}) != .stop count ({stop_count})")

if errors:
    print("FAIL:")
    for e in errors:
        print(f"  {e}")
    sys.exit(1)
else:
    print(f"OK: {stop_count} stops, bar-count={static_count}, max-number={max_number}, json={json_count}")
