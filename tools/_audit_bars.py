import json, sys
sys.stdout.reconfigure(encoding='utf-8')
d = json.load(open('assets/bars-map-data.json', 'r', encoding='utf-8'))
print(f"Total: {len(d['bars'])}\n")
for x in d['bars']:
    lat, lng = x['lat'], x['lng']
    flag = ''
    if lat < 35.5 or lat > 35.9 or lng < 139.4 or lng > 139.9:
        flag = '  <-- OUTSIDE TOKYO'
    print(f"{x['number']:2}. {x['name']:42} {lat}, {lng}  {x.get('ward','?')}{flag}")
