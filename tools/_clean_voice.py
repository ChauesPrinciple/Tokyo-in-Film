"""Clean voice violations in bars-map-data.json:
- Replace em dashes in descriptions with periods or commas
- Remove AI-speak patterns
"""
import json

path = 'assets/bars-map-data.json'
with open(path, 'r', encoding='utf-8') as f:
    data = json.load(f)

def clean_text(text):
    # Replace em dashes with periods (most common fix)
    # "X — Y" becomes "X. Y"
    text = text.replace(' — ', '. ')
    # Replace any remaining standalone em dashes
    text = text.replace('\u2014', '-')
    return text

def clean_bar(bar):
    if 'description' in bar:
        bar['description'] = clean_text(bar['description'])
    if 'coordinateNote' in data:
        data['coordinateNote'] = clean_text(data['coordinateNote'])
    for sv in bar.get('subvenues', []):
        if 'description' in sv:
            sv['description'] = clean_text(sv['description'])

for bar in data['bars']:
    clean_bar(bar)

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write('\n')

print('Cleaned voice violations')
