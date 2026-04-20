/**
 * Converts tokyo_23_wards.geojson → SVG paths for the anime ward maps.
 * Outputs: assets/tokyo-wards.svg (just the <svg> with <path> elements)
 * 
 * Run: node build-svg-map.js
 */
const fs = require('fs');

const geo = JSON.parse(fs.readFileSync('tokyo_23_wards.geojson', 'utf8'));

// Bounding box for Tokyo 23 wards (approximate)
const BOUNDS = { minLng: 139.56, maxLng: 139.92, minLat: 35.52, maxLat: 35.82 };
const WIDTH = 960;
const HEIGHT = 720;

// Simple Mercator projection
function project(lng, lat) {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * WIDTH;
  // Invert Y for SVG (top = 0)
  const y = HEIGHT - ((lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * HEIGHT;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

// Simplify: skip points that are very close together (< threshold px)
function simplify(points, threshold = 1.5) {
  if (points.length < 3) return points;
  const result = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    const prev = result[result.length - 1];
    const dx = points[i][0] - prev[0];
    const dy = points[i][1] - prev[1];
    if (Math.sqrt(dx * dx + dy * dy) >= threshold) {
      result.push(points[i]);
    }
  }
  result.push(points[points.length - 1]); // always keep last
  return result;
}

// Build ward name → English key mapping
const wardKeyMap = {
  '足立区': 'adachi', '荒川区': 'arakawa', '板橋区': 'itabashi',
  '江戸川区': 'edogawa', '大田区': 'ota', '葛飾区': 'katsushika',
  '北区': 'kita', '江東区': 'koto', '品川区': 'shinagawa',
  '渋谷区': 'shibuya', '新宿区': 'shinjuku', '杉並区': 'suginami',
  '墨田区': 'sumida', '世田谷区': 'setagaya', '台東区': 'taito',
  '中央区': 'chuo', '千代田区': 'chiyoda', '豊島区': 'toshima',
  '中野区': 'nakano', '練馬区': 'nerima', '文京区': 'bunkyo',
  '港区': 'minato', '目黒区': 'meguro'
};

let paths = [];
let centers = {};
let totalOrigPts = 0;
let totalSimplPts = 0;

geo.features.forEach(feature => {
  const props = feature.properties;
  const jpName = props.ward_ja || props.N03_004 || '';
  const key = wardKeyMap[jpName];
  if (!key) {
    console.log('Skipping unknown ward:', jpName);
    return;
  }

  const geom = feature.geometry;
  let rings = [];
  
  if (geom.type === 'Polygon') {
    rings = geom.coordinates;
  } else if (geom.type === 'MultiPolygon') {
    geom.coordinates.forEach(poly => {
      rings = rings.concat(poly);
    });
  }

  let allX = [], allY = [];
  let dParts = [];

  rings.forEach(ring => {
    const projected = ring.map(([lng, lat]) => project(lng, lat));
    totalOrigPts += projected.length;
    const simplified = simplify(projected);
    totalSimplPts += simplified.length;

    simplified.forEach(([x, y]) => { allX.push(x); allY.push(y); });

    let d = `M${simplified[0][0]},${simplified[0][1]}`;
    for (let i = 1; i < simplified.length; i++) {
      d += `L${simplified[i][0]},${simplified[i][1]}`;
    }
    d += 'Z';
    dParts.push(d);
  });

  const fullD = dParts.join(' ');
  
  // Calculate center for label positioning
  const cx = Math.round((allX.reduce((a, b) => a + b, 0) / allX.length) * 10) / 10;
  const cy = Math.round((allY.reduce((a, b) => a + b, 0) / allY.length) * 10) / 10;
  centers[key] = { x: cx, y: cy };

  paths.push(`  <path id="ward-${key}" class="ward" data-ward="${key}" data-jp="${jpName}" d="${fullD}"/>`);
});

// Build SVG
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" id="tokyo-wards-svg">
${paths.join('\n')}
</svg>`;

fs.writeFileSync('assets/tokyo-wards.svg', svg, 'utf8');

// Also output centers as JSON for label positioning
fs.writeFileSync('assets/tokyo-ward-centers.json', JSON.stringify(centers, null, 2), 'utf8');

const svgSize = Math.round(fs.statSync('assets/tokyo-wards.svg').size / 1024);
console.log(`Done: ${paths.length} wards`);
console.log(`Points: ${totalOrigPts} original → ${totalSimplPts} simplified (${Math.round(totalSimplPts/totalOrigPts*100)}%)`);
console.log(`SVG size: ${svgSize} KB`);
console.log(`Centers saved to assets/tokyo-ward-centers.json`);
