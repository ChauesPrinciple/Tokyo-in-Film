"""Classify bars by special-case category for Phase 6."""
import json, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('assets/bars-map-data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Tokyo center reference (roughly Imperial Palace)
CENTER = (35.685, 139.752)

import math
def distance_km(lat1, lng1, lat2, lng2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlng/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

for b in data['bars']:
    addr = b.get('address', '')
    floor = ''
    if addr.startswith('B1F') or addr.startswith('B2F'):
        floor = 'BASEMENT'
    elif any(addr.startswith(f'{n}F') for n in ['1F','2F','3F','4F','5F','6F','7F','8F','9F']):
        floor = 'UPPER'
    elif '38F' in addr or '52F' in addr:
        floor = 'HIGHRISE'
    
    dist = distance_km(CENTER[0], CENTER[1], b['lat'], b['lng'])
    distant = 'DISTANT' if dist > 8 else ''
    
    subvenues = 'GOLDEN-GAI' if b.get('subvenues') else ''
    spotlight = 'SPOTLIGHT' if b.get('spotlight') else ''
    
    tags = [t for t in [floor, distant, subvenues, spotlight] if t]
    if tags:
        print(f"  {b['number']:2}. {b['name']:42} {', '.join(tags):30} floor={addr[:20]}")
