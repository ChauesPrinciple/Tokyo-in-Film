import json, sys
sys.stdout.reconfigure(encoding='utf-8')
d = json.load(open('assets/bars-map-data.json', 'r', encoding='utf-8'))
for b in d['bars']:
    print(f"#{b['number']} {b['name']}")
    print(f"  id: {b['id']}")
    print(f"  area: {b.get('area','?')} | ward: {b.get('ward','?')} | muni: {b.get('municipality','?')} | pref: {b.get('prefecture','?')}")
    print(f"  lat: {b['lat']}, lng: {b['lng']}")
    print(f"  address: {b.get('address','?')}")
    print(f"  station: {b.get('station','?')}")
    print(f"  style: {b.get('style','?')}")
    print(f"  mapsUrl: {b.get('mapsUrl','?')}")
    if b.get('sources'):
        for s in b['sources']:
            print(f"  source: {s['label']} -> {s['url']}")
    print()
