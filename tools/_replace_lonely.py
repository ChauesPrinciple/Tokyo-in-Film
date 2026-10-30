"""Replace Bar Lonely (#7) with KAKURETAI speakeasy bar."""
import json, sys
sys.stdout.reconfigure(encoding='utf-8')

path = 'assets/bars-map-data.json'
with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

for bar in data['bars']:
    if bar['id'] == 'bar-lonely':
        bar.update({
            "id": "kakuretai",
            "name": "KAKURETAI",
            "aliases": ["かくれたい", "KAKURETAI Speakeasy Bar"],
            "area": "Arakicho",
            "ward": "Shinjuku",
            "lat": 35.6890885,
            "lng": 139.721872,
            "mapsUrl": "https://www.google.com/maps/place/KAKURETAI-+Speakeasy+Bar/data=!4m2!3m1!1s0x60188dfe7fa3624d:0x6179cc8341bd4c44",
            "address": "B1F Nakabayashi Building, 1-2 Arakicho, Shinjuku-ku, Tokyo",
            "station": "Yotsuya-Sanchome (Tokyo Metro Marunouchi) — 2 min walk",
            "style": "Speakeasy",
            "description": "A hidden speakeasy in Arakicho, down an unmarked basement entrance. Owner Yuta crafts seasonal cocktails with Japanese fruits — the strawberry margarita and Earl Grey tea sake are standouts. Cheese-and-mouse decor, J-Pop playlists, sometimes a live DJ. A cozy hideout that treats regulars and first-timers the same. Closed weekends.",
            "sources": [
                {"label": "Tabelog", "url": "https://tabelog.com/en/tokyo/A1309/A130903/13282157/"},
                {"label": "Instagram", "url": "https://www.instagram.com/kakuretai_tokyo"}
            ]
        })
        print(f"Replaced: {bar['name']} (#{bar['number']})")
        break

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write('\n')
print("Done.")
