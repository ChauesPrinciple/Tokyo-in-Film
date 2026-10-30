import json, sys
sys.stdout.reconfigure(encoding='utf-8')
path = 'assets/bars-map-data.json'
d = json.load(open(path, 'r', encoding='utf-8'))
bars = d['bars']
for i, bar in enumerate(bars, 1):
    bar['number'] = i
with open(path, 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)
print(f"Renumbered {len(bars)} bars.")
for x in bars:
    print(('  * ' if x.get('spotlight') else '    ') + str(x['number']) + '. ' + x['name'])
