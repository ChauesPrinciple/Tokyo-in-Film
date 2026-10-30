import json, sys
sys.stdout.reconfigure(encoding='utf-8')
d = json.load(open('assets/bars-map-data.json', 'r', encoding='utf-8'))
for b in d['bars']:
    if b['number'] in [7, 21, 8]:
        print(f"{b['number']:2}. {b['name'][:35]:35} lat={b['lat']:.6f} lng={b['lng']:.6f}")
        print(f"    addr: {b['address']}")
        if b.get('subvenues'):
            for sv in b['subvenues']:
                print(f"    sub: {sv['name']} lat={sv.get('lat','?')} lng={sv.get('lng','?')} addr={sv.get('address','')}")
        print()
