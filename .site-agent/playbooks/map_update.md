# Playbook: Map Update

## Read First

The map's row in `SITE_ATLAS.md` section 12; the map's script header comments; `../.devin/skills/update-anime-maps/SKILL.md` for the anime map.

## Steps

1. Edit data in the JSON or data file, not in the page, unless the page holds the data.
2. `assets/class-map-data.js` is generated. Edit `parsed_pois_with_desc.json` and run `node build-class-map-data.js`.
3. Every coordinate and address comes from a source he gave or a verified official source. Do not invent descriptions, hours, prices, or reviews. No reviewer, rating, or review-site commentary in descriptions.
4. Keep the anime map inside its projection bounds (lng 139.56 to 139.93, lat 35.51 to 35.83); points outside cannot be drawn.
5. Run the map's own check script in `tools/` where one exists (`check_ramen.py`, `check_after_dark.py`), then `python tools/check.py`.
6. Load the page locally (`python -m http.server 8080`) and confirm the change renders.
