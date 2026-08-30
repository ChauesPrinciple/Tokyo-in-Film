/**
 * Converts parsed_pois_with_desc.json -> assets/class-map-data.js
 *
 * Produces a `class_locations` dataset in the same shape the anime map engine
 * already consumes (see assets/anime-map-data.js), so the class POIs render
 * through the existing clustering / search / deep-link machinery instead of
 * the Google My Maps iframe.
 *
 * Run: node build-class-map-data.js
 */
const fs = require('fs');

const SRC = 'parsed_pois_with_desc.json';
const OUT = 'assets/class-map-data.js';

// Bounds the map engine projects against (CONFIG.BOUNDS in anime-map.html).
// POIs outside this box can't be plotted, so they're reported and dropped.
const BOUNDS = { minLng: 139.56, maxLng: 139.93, minLat: 35.51, maxLat: 35.83 };

// ── Categories ───────────────────────────────────────────────
// Mirrors the emoji map key that was hand-written on index.html.
// Order matters: first matching rule wins.
const CATEGORIES = {
  filming:  { color: '#00f3ff', label: 'Filming Location' },
  food:     { color: '#ff6b4a', label: 'Food' },
  shrine:   { color: '#e0533a', label: 'Shrine / Temple' },
  nature:   { color: '#4ade80', label: 'Parks / Greenery' },
  shopping: { color: '#c084fc', label: 'Otaku / Thrift' },
  music:    { color: '#a8b4c4', label: 'Arcades / Music' },
  culture:  { color: '#f5c542', label: 'Museums / Landmarks' },
  transit:  { color: '#64748b', label: 'Stations / Transit' },
  other:    { color: '#8899aa', label: 'Other' }
};

const RULES = [
  // A parenthetical film title is the strongest signal in this dataset.
  ['filming', /\((?:[^)]*(?:JJK|Tokyo Drift|Godzilla|Suzume|Your Name|Tokyo Ghoul|Initial D|Shoplifters|Spirited Away|Sprited Away|Weathering With You|13 Assassins|Kubi|Samurai|Midnight Diner|Garden of Words|Adrift in Tokyo|Shin Godzilla)[^)]*)\)/i],
  ['filming', /Toho Studios|Edo-Tokyo Open Air|Godzilla (?:Head|Square)/i],

  ['shrine',  /Shrine|Temple|Jingu|Jinja|-ji\b|Myoujin|Kotohiragu|Hachiman|Tenjin|Fudou|Inari|Kannon/i],

  ['nature',  /\bPark\b|Garden|Greenway|Cemet|Rinkai|Aqueduct|Wisteria|Zoo/i],

  ['food',    /Ramen|Rāmen|Soba|Sushi|Curry|Doughnut|Coffee|Cafe|Café|Yakiniku|Yakitori|Teppanyaki|Tonkatsu|Tofu|Izakaya|Shokudo|Dining|Restaurant|Niku|Shabu|Syabu|Cream Puff|Fruits Parlor|Latte|Dagashi|Gonpachi|Benitsuru|Sukiyabashi|Kikanbō|Menya|\bMen\b|Buta-Daigaku|Torisawa|Yatai|Tesshin|Summit|Kantan-na Yume|Sanzoku Kaizoku|Himuka|Trois Bagues|da GIORGIO|Udatsu|Kibun|Ichikan|Shuuichi|Norengai|Yokocho|Golden-Gai|Golden Gai|KFC|Suzukien|Fungo|Shabuzen|Kanda Yabu/i],

  ['shopping',/Mandarake|animate|Animate|Gashapon|Kotobukiya|Radio Kaikan|Evangelion Store|TAMASHII|Toy Sapiens|Character Street|Used Clothing|Kinji|RAGTAG|BRAND COLLECT|A\.P\.C|Don Quijote|Tower Records|TSUTAYA|Book|Parco|Department store|Omotesando Hills|VenusFort|Matsuzakaya|Wako Department|Godzilla Store|D\.D\.R/i],

  ['music',   /Game (?:Center|Museum)|Joypolis|GiGO|Karaoke|Jazz|Nightclub|Blue Note|Livehouse|Mikado|Natsuge|HEY \(Hirose|Arcade|RED° TOKYO TOWER|Adidas Futsal/i],

  ['transit', /Station|Sta\.|Bridge|Expressway|Junction|Dori|Avenue|Yasukuni|Cat Street|Onnazaka|Takeshita Street|Crossing|Kabukicho|Kabukichō/i],

  ['culture', /Museum|Art Center|Gallery|teamLab|Kabuki-za|Skytree|Tokyo Tower|Diet Building|Imperial Palace|Metropolitan Government|Capsule Tower|Gymnasium|University|Hostel|Hotel|Marriott|Park Hyatt|Gajoen|Hall|Sword|Hokusai|Literary|Book Binding|Big Clock|Caretta|Ginza Six|ART AQUARIUM|DAWN|Kaikan|Maneki-neko|Kukyo|BUNBUN|Rainbow Bridge|Church|Roppongi/i]
];

function categorize(name, desc) {
  const hay = `${name} ${desc || ''}`;
  for (const [cat, re] of RULES) {
    if (re.test(hay)) return cat;
  }
  return 'other';
}

// ── Clean ────────────────────────────────────────────────────
const raw = JSON.parse(fs.readFileSync(SRC, 'utf8'));

const dropped = { unknown: [], coords: [], outOfBounds: [], duplicate: [] };
const seen = new Map();
const pois = [];

for (const p of raw) {
  const name = (p.name || '').trim();

  // Placeholder rows from the original Google My Maps export.
  if (!name || /^unknown$/i.test(name)) { dropped.unknown.push(name || '(blank)'); continue; }

  // A few rows have raw coordinates where the name should be.
  if (/^-?\d+\.\d+\s*,\s*-?\d+\.\d+$/.test(name)) { dropped.coords.push(name); continue; }

  if (typeof p.lat !== 'number' || typeof p.lng !== 'number') { dropped.coords.push(name); continue; }

  if (p.lat < BOUNDS.minLat || p.lat > BOUNDS.maxLat ||
      p.lng < BOUNDS.minLng || p.lng > BOUNDS.maxLng) {
    dropped.outOfBounds.push(`${name} (${p.lat}, ${p.lng})`);
    continue;
  }

  // Dedupe on name + rounded position. Keep whichever copy has a description.
  const key = `${name.toLowerCase()}|${p.lat.toFixed(4)}|${p.lng.toFixed(4)}`;
  const desc = (p.description || '').trim();
  if (seen.has(key)) {
    const prev = seen.get(key);
    if (!prev.label && desc) prev.label = desc;
    dropped.duplicate.push(name);
    continue;
  }

  const entry = {
    name,
    lat: p.lat,
    lng: p.lng,
    label: desc,
    cat: categorize(name, desc)
  };
  seen.set(key, entry);
  pois.push(entry);
}

// Fall back to the category label so every popup says something.
pois.forEach(p => {
  if (!p.label) p.label = CATEGORIES[p.cat].label;
  p.color = CATEGORIES[p.cat].color;
});

pois.sort((a, b) => a.name.localeCompare(b.name, 'en'));

// ── Emit ─────────────────────────────────────────────────────
const body = pois.map(p => {
  const o = {
    name: p.name,
    lat: Math.round(p.lat * 1e6) / 1e6,
    lng: Math.round(p.lng * 1e6) / 1e6,
    label: p.label,
    cat: p.cat,
    color: p.color
  };
  return '    ' + JSON.stringify(o);
}).join(',\n');

const statuses = Object.entries(CATEGORIES)
  .map(([k, v]) => `    ${k}: ${JSON.stringify(v)}`)
  .join(',\n');

const out = `/* Class map data — GENERATED FILE, DO NOT EDIT BY HAND.
 * Source: ${SRC}
 * Regenerate: node build-class-map-data.js
 *
 * Adds the course's own Tokyo locations to the map engine defined in
 * anime-map.html, replacing the external Google My Maps embed.
 */
(function () {
  window.ANIME = window.ANIME || {};
  window.ANIME.class_locations = {
    title: "Class Locations",
    eyebrow: "Tokyo in Film",
    subtitle: "Excursions \\u00b7 Filming Sites \\u00b7 Food \\u00b7 Shrines \\u00b7 Shopping",
    theme: {
      accent: '#0b7f8c', accentBright: '#00f3ff',
      border: 'rgba(0,243,255,0.35)', glow: 'rgba(0,243,255,0.25)'
    },
    // Wards are administrative boundaries here, not story units — no ward panel.
    disableWardInfo: true,
    // Legend is driven by POI category rather than ward status.
    poiLegend: true,
    statuses: {
${statuses}
    },
    wards: {},
    pois: [
${body}
    ],
    overlays: []
  };
})();
`;

fs.mkdirSync('assets', { recursive: true });
fs.writeFileSync(OUT, out, 'utf8');

// ── Report ───────────────────────────────────────────────────
const counts = {};
pois.forEach(p => { counts[p.cat] = (counts[p.cat] || 0) + 1; });

console.log(`Read    ${raw.length} rows from ${SRC}`);
console.log(`Wrote   ${pois.length} POIs to ${OUT} (${Math.round(fs.statSync(OUT).size / 1024)} KB)`);
console.log(`Dropped ${dropped.unknown.length} placeholder, ${dropped.coords.length} bad-coord, ${dropped.duplicate.length} duplicate, ${dropped.outOfBounds.length} out-of-bounds`);
if (dropped.outOfBounds.length) console.log('  out of bounds:', dropped.outOfBounds.join('; '));
if (dropped.duplicate.length) console.log('  duplicates:', [...new Set(dropped.duplicate)].join('; '));
console.log('Categories:');
Object.keys(CATEGORIES).forEach(c => {
  if (counts[c]) console.log(`  ${c.padEnd(9)} ${counts[c]}`);
});
const uncategorized = pois.filter(p => p.cat === 'other').map(p => p.name);
if (uncategorized.length) console.log(`Uncategorized (${uncategorized.length}):`, uncategorized.join('; '));
