"""Repair voice damage from the blunt em-dash replacement.

The earlier pass turned "X - Y" into "X. y", producing lowercase sentence
starts ("Not a cocktail bar. a place where..."). An em dash in these
sentences was doing the work of a comma, so restore a comma.

Also converts the em dash in station fields ("Ebisu (JR) - 3 min walk")
to a comma, which reads correctly and matches the field's plain style.
"""
import json
import re

path = 'assets/bars-map-data.json'
with open(path, encoding='utf-8') as f:
    data = json.load(f)

# ". lowercase" -> ", lowercase"  (only where a comma clause was broken)
BROKEN = re.compile(r'([a-z\'\)])\. ([a-z])')


def fix_prose(text):
    return BROKEN.sub(lambda m: f'{m.group(1)}, {m.group(2)}', text)


def fix_station(text):
    # "Ebisu (JR Yamanote / Tokyo Metro Hibiya) - 3 min walk"
    return text.replace(' \u2014 ', ', ').replace(' - ', ', ')


changed = 0

if 'coordinateNote' in data:
    data['coordinateNote'] = fix_prose(data['coordinateNote'])

for bar in data['bars']:
    for field in ('description',):
        if field in bar:
            new = fix_prose(bar[field])
            if new != bar[field]:
                bar[field] = new
                changed += 1
    if 'station' in bar:
        bar['station'] = fix_station(bar['station'])
    for sv in bar.get('subvenues', []):
        if 'description' in sv:
            new = fix_prose(sv['description'])
            if new != sv['description']:
                sv['description'] = new
                changed += 1

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write('\n')

print(f'Repaired {changed} description(s); normalized station separators.')
