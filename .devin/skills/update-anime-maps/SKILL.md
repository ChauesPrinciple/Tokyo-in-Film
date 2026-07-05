---
description: Add or update POI markers and barrier zones on anime location maps (JJK, Tokyo Ghoul, Chainsaw Man)
tags: [maps, anime, locations, poi, geojson]
---

# Update Anime Maps Skill

## Purpose
Add filming locations, POI markers, and canon barrier zones to the interactive anime maps. Each map shows real-world Tokyo locations featured in specific anime/manga series.

## Map Files
- `jjk-culling-game-map.html` - Jujutsu Kaisen locations and Culling Game barriers
- `tokyo-ghoul-map.html` - Tokyo Ghoul locations and territory zones
- `chainsaw-man-map.html` - Chainsaw Man filming locations

## Map Structure

### POI Markers Array
```javascript
const pois = [
  { lat: 35.6595, lng: 139.7004, title: "Location Name", subtitle: "Chapter/Episode - Description", color: "#8b5cf6" }
];
```

### Barrier Domes (JJK only)
```javascript
const barrierDomes = [
  { center: [35.6595, 139.7004], radius: 2000, color: '#8b0000', name: 'Barrier Name', ward: '渋谷区' }
];
```

### Ward Status (Tokyo Ghoul only)
```javascript
const WARDS = {
  '新宿区': 'ccg',      // CCG controlled
  '渋谷区': 'ghoul',    // Ghoul territory
  '港区': 'neutral'     // Neutral zone
};
```

## Adding POI Markers

### Step 1: Find coordinates
Use Google Maps to get lat/lng for the location:
1. Right-click location on Google Maps
2. Click coordinates to copy
3. Format: `lat: 35.xxxx, lng: 139.xxxx`

### Step 2: Add to POI array
Insert before the closing `];` of the pois array:
```javascript
{ lat: 35.xxxx, lng: 139.xxxx, title: "Location Name", subtitle: "Context", color: "#8b5cf6" }
```

**Important:** Check for trailing commas. Last item should NOT have a comma.

### Step 3: Verify
Open the map in browser and check:
- Marker appears at correct location
- Popup shows correct title and subtitle
- No JavaScript console errors

## Canon Verification

### JJK Locations
Only add locations that appear in:
- Official manga chapters (cite chapter number)
- Anime episodes (cite episode)
- Official JJK location guides

**Do NOT add:**
- Speculative locations
- Fan theories
- Generic ward overlays

### Current Canon Barriers (JJK)
1. **Shibuya Incident Curtain** - 渋谷区 (Shibuya ward)
2. **Tokyo Colony No.1** - 新宿区 (Shinjuku ward)
3. **Tokyo Colony No.2** - 港区 (Minato ward)
4. **Tokyo Jujutsu High Territory** - 文京区 (Bunkyo ward)

## Common Issues

### Duplicate Entries
Before adding, search for existing POI:
```bash
grep -i "location name" jjk-culling-game-map.html
```

### Syntax Errors
- Missing commas between objects
- Extra comma after last item
- Mismatched quotes or brackets

### Wrong Coordinates
- Verify location on Google Maps
- Check lat/lng order (lat first, lng second)
- Ensure coordinates are in Tokyo (lat ~35.6, lng ~139.7)

## File Encoding
Always use UTF-8 encoding when editing HTML files. Japanese characters (kanji) must be preserved.

## Testing Checklist
- [ ] Map loads without errors
- [ ] Base tiles display
- [ ] POI markers appear
- [ ] Popups show correct info
- [ ] Barrier domes render (if applicable)
- [ ] No console errors


---

## Sources

This skill is **procedural** — it does not make film-craft claims. Per `CITATION_PROTOCOL.md` the citation discipline does not apply to procedural workflows (deployment, formatting, encoding, file management). If this skill is later extended with craft-level reasoning, replace this block with citations to the relevant entries in `SOURCE_INDEX.md`.