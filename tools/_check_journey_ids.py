"""Verify every data-stop id in the generated journey HTML matches a bar.id in the JSON."""
import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('assets/bars-map-data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
json_ids = {b['id'] for b in data['bars']}

with open('bars-map.html', 'r', encoding='utf-8') as f:
    html = f.read()

stop_ids = set(re.findall(r'data-stop="([^"]+)"', html))
journey_ids = set(re.findall(r'id="stop-([^"]+)"', html))

print(f"JSON bar ids:    {len(json_ids)}")
print(f"HTML data-stop:  {len(stop_ids)}")
print(f"HTML id=stop-:   {len(journey_ids)}")

missing_in_html = json_ids - stop_ids
extra_in_html = stop_ids - json_ids
mismatched = stop_ids ^ journey_ids

if missing_in_html:
    print(f"  MISSING in HTML: {sorted(missing_in_html)}")
if extra_in_html:
    print(f"  EXTRA in HTML:   {sorted(extra_in_html)}")
if mismatched:
    print(f"  data-stop / id mismatch: {sorted(mismatched)}")
if not missing_in_html and not extra_in_html and not mismatched:
    print("OK: all ids match.")
