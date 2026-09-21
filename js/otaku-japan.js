/* Otaku Japan — the dream trip, compiled from the saved map.
   Engine adapted from anime-map.html, refactored to the Koenji house style:
   Mercator projection so the CartoDB tiles line up, persistent pin nodes,
   clustering on a settle debounce, one anchoredZoom for every camera move.
   Data: assets/otaku-japan-data.json */
(() => {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const $ = id => document.getElementById(id);
  const svgEl = (tag, attrs) => {
    const el = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    return el;
  };
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  const CONFIG = {
    SVG_W: 1400,
    // The world box, not the route: zooming out past the trip should still
    // land on map, so this holds the country from Kyushu to Hokkaido. What
    // "Fit route" frames is the spots' own box (routeBox), computed on load.
    BOUNDS: { minLng: 128.0, maxLng: 146.5, minLat: 30.5, maxLat: 45.8 },
    TILE_Z: 8,
    // Basemap. CARTO's open tiles now come back stamped "API KEY REQUIRED"
    // across the image, so the default is Esri's Dark Gray Canvas: keyless,
    // already dark, and drawn in two layers — the land underneath, the place
    // names on top. It stops serving at z16, so past that the camera is
    // stretching tiles rather than refining them, which is where ZOOM_MAX
    // sits. Paste a CARTO key into CARTO_KEY for dark_all instead: one
    // layer, labels baked in, @2x retina, tiles to z20.
    CARTO_KEY: '',
    TILE_BASE: 'https://services.arcgisonline.com/ArcGIS/rest/services/' +
               'Canvas/World_Dark_Gray_Base/MapServer/tile',
    TILE_LABELS: 'https://services.arcgisonline.com/ArcGIS/rest/services/' +
                 'Canvas/World_Dark_Gray_Reference/MapServer/tile',
    TILE_MAX_Z: 16,
    CLUSTER_SCREEN_PX: 24,
    CLUSTER_ZOOM_IN_RATIO: 6,
    CLUSTER_SETTLE_MS: 150,
    SEARCH_DEBOUNCE_MS: 120,
    // Breathing room around a fit. A leg of six shops a few streets apart
    // wants to land on those streets, so the floor below is a real distance
    // on the ground, not a slab of world units.
    FIT_PAD: 1.25,
    ROUTE_FIT_PAD: 1.12,
    MIN_FIT_M: 450,
    ZOOM_MIN: 0.25, ZOOM_MAX: 2048
  };

  // Derive SVG_H from the Mercator span so x and y stay isotropic.
  const mercY = lat => {
    const r = lat * Math.PI / 180;
    return (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2;
  };
  const B = CONFIG.BOUNDS;
  const yTop = mercY(B.maxLat), yBot = mercY(B.minLat);
  const xFrac = (B.maxLng - B.minLng) / 360;
  CONFIG.SVG_H = Math.round(CONFIG.SVG_W * (yBot - yTop) / xFrac);
  const SVG_W = CONFIG.SVG_W, SVG_H = CONFIG.SVG_H;

  const project = (lng, lat) => [
    (lng - B.minLng) / (B.maxLng - B.minLng) * SVG_W,
    (mercY(lat) - yTop) / (yBot - yTop) * SVG_H
  ];
  // Ground truth: how many metres one SVG unit covers, so a spot can focus
  // to a real-world radius instead of an arbitrary zoom level.
  const M_PER_UNIT = (B.maxLng - B.minLng) * 111.32e3 *
    Math.cos((B.minLat + B.maxLat) / 2 * Math.PI / 180) / SVG_W;
  const lng2tile = (lng, z) => Math.floor((lng + 180) / 360 * (1 << z));
  const lat2tile = (lat, z) => Math.floor(mercY(lat) * (1 << z));
  const tile2lng = (x, z) => x / (1 << z) * 360 - 180;
  const tile2lat = (y, z) => {
    const n = Math.PI - 2 * Math.PI * y / (1 << z);
    return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  };

  const wrap = $('map-wrap');
  const tileCanvas = $('tile-canvas');
  const mapTitleEl = $('map-title');
  const popup = $('poi-popup');
  const statusEl = $('map-status');
  const listEl = $('spot-list');
  const searchEl = $('spot-search');
  const legSel = $('leg-filter');
  const countEl = $('list-count');

  let DATA = null;
  let currentScale = 1, panX = 0, panY = 0;
  let selectedId = null;
  let activeLeg = null, activeKind = null, query = '';
  let svg = null, pinGroup = null, clusterGroup = null, trailGroup = null;
  // First user gesture on the map takes the camera away from the story beats
  // until the user hits "Fit route" or scrolls back to the top.
  let userHoldsCamera = false;
  // While the story is driving, each leg beat focuses its own map: the leg's
  // pins stay bright and cluster among themselves, everything else dims back.
  let focusLeg = null;

  const pinNodes = new Map(); // spot id -> {g, circle, beenDot}
  let clusterTimer = 0, searchTimer = 0;

  const beenKey = 'otaku-japan-been';
  const beenSet = () => {
    try { return new Set(JSON.parse(localStorage.getItem(beenKey) || '[]')); }
    catch (e) { return new Set(); }
  };
  const saveBeen = s => {
    try { localStorage.setItem(beenKey, JSON.stringify([...s])); } catch (e) {}
  };

  const legOf = id => DATA.legs[id] || { label: id, color: '#999', order: 99 };
  const stops = n => `${n} stop${n === 1 ? '' : 's'}`;
  const pinColor = s => s.accent || legOf(s.leg).color;

  // What a place is — the only thing a badge, a shape or a chip says about
  // it. Which of the saved lists a pin came out of is how this map was
  // built, not something a reader needs told.
  const CAT_LABEL = {
    shop: 'Shop', arcade: 'Arcade', bar: 'Bar', food: 'Food', cafe: 'Cafe',
    sight: 'Sight', museum: 'Museum', park: 'Park', 'film site': 'Film location'
  };
  const CAT_GROUP = {
    shop: 'shop', arcade: 'play', bar: 'drink', food: 'eat', cafe: 'eat',
    sight: 'see', museum: 'see', park: 'see', 'film site': 'film'
  };
  const catLabel = s => CAT_LABEL[s.cat] || s.cat;
  const groupOf = s => CAT_GROUP[s.cat] || 'see';
  // A chip is broader than a group: one covers the bars and the cafes both.
  const CHIP_GROUPS = { shop: ['shop'], play: ['play'], eat: ['eat', 'drink'],
                        see: ['see'], film: ['film'] };
  const inChip = (s, chip) => (CHIP_GROUPS[chip] || []).includes(groupOf(s));

  // Shape is what it is: a square to eat at, a diamond to drink at, a ring
  // where a scene was shot, a dot for everywhere you simply go.
  const shapePath = (group, r) => {
    if (group === 'eat') { const k = r * 0.88; return `M${-k},${-k}H${k}V${k}H${-k}Z`; }
    if (group === 'drink') { const k = r * 1.25; return `M0,${-k}L${k},0L0,${k}L${-k},0Z`; }
    return `M${-r},0A${r},${r} 0 1,0 ${r},0A${r},${r} 0 1,0 ${-r},0Z`;
  };

  // ── TILES — a cache, not a queue. One <div> per zoom level holds that
  //    level's own 256px grid, so a tile is laid out once and never again:
  //    the level moves as a whole, one transform per frame, and panning back
  //    over ground already loaded costs nothing. Coarser levels stay painted
  //    underneath until the level in frame has covered the screen.
  //    Esri draws in two passes: the land layer, then the names over it.
  const DPR = Math.min(2, window.devicePixelRatio || 1);
  const TILE_PX = 256;
  // One place that knows how a tile URL is spelled, so the key is the only
  // thing that changes between the two sources.
  const usingCarto = () => !!CONFIG.CARTO_KEY;
  // Esri numbers its tiles row first — /tile/{z}/{y}/{x}, not {x}/{y}.
  const tileUrl = (z, x, y, retina) => usingCarto()
    ? `https://a.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}${retina ? '@2x' : ''}.png` +
      `?api_key=${encodeURIComponent(CONFIG.CARTO_KEY)}`
    : `${CONFIG.TILE_BASE}/${z}/${y}/${x}`;
  // CARTO bakes its labels into the tile; Esri keeps them in a second layer.
  const labelUrl = (z, x, y) => usingCarto() ? null : `${CONFIG.TILE_LABELS}/${z}/${y}/${x}`;

  const levels = new Map();   // z -> {z, el, base, ref, tiles, x0, y0}
  let tileZoom = 0;           // the level being filled right now
  let tileRange = null;       // {z, xMin, xMax, yMin, yMax} last asked for
  let tilesPending = 0;       // images in flight, across every level
  let lastTileCheck = 0;

  // Ground metres per screen pixel at the camera, then the tile z whose
  // native resolution matches it. Drawing a tile near 1:1 keeps its baked-in
  // labels at the size they were drawn for — a level finer would quarter
  // them, and quadruple the number of requests. Retina takes that extra
  // level only where the source has no @2x tile to ask for instead; the
  // clamp still holds, since Esri has nothing past z16 to ask for either.
  const effTileZ = () => {
    const mPerPx = M_PER_UNIT / Math.max(currentScale, 0.01);
    const cosLat = Math.cos((B.minLat + B.maxLat) / 2 * Math.PI / 180);
    const need = Math.log2(156543 * cosLat / mPerPx);
    const retinaBump = DPR > 1.5 && !usingCarto() ? 1 : 0;
    return clamp(Math.ceil(need - 0.5) + retinaBump, 5,
                 usingCarto() ? 20 : CONFIG.TILE_MAX_Z);
  };

  // World units one tile covers at this level. x and y agree — SVG_H was
  // derived from the Mercator span to keep the projection isotropic.
  const worldPerTile = z => SVG_W * 360 / ((B.maxLng - B.minLng) * (1 << z));

  function levelFor(z, r) {
    let lv = levels.get(z);
    if (lv) return lv;
    const el = document.createElement('div');
    el.className = 'tile-level';
    const base = document.createElement('div');
    const ref = document.createElement('div');
    base.className = ref.className = 'tile-layer';
    // Names ride above the land whatever order the tiles arrive in, because
    // they live in a later sibling rather than later in one long list.
    el.append(base, ref);
    lv = { z, el, base, ref, tiles: new Map(), x0: r.xMin, y0: r.yMin };
    tileCanvas.appendChild(el);
    levels.set(z, lv);
    return lv;
  }

  function addTile(lv, tx, ty, layer) {
    const key = `${tx}/${ty}/${layer}`;
    if (lv.tiles.has(key)) return;   // already loaded here: nothing to do
    const src = layer === 'ref' ? labelUrl(lv.z, tx, ty) : tileUrl(lv.z, tx, ty, false);
    if (!src) return;
    const img = document.createElement('img');
    img.src = src;
    // Only CARTO serves an @2x tile; Esri has none to ask for.
    if (layer === 'base' && DPR > 1.5 && usingCarto()) {
      img.srcset = `${src} 1x, ${tileUrl(lv.z, tx, ty, true)} 2x`;
    }
    img.draggable = false;
    img.alt = '';
    img.style.left = ((tx - lv.x0) * TILE_PX) + 'px';
    img.style.top = ((ty - lv.y0) * TILE_PX) + 'px';
    tilesPending++;
    const done = () => { tilesPending--; sweepLevels(); };
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
    lv.tiles.set(key, img);
    (layer === 'ref' ? lv.ref : lv.base).appendChild(img);
  }

  // Once the level in frame has covered the screen, the levels under it are
  // only memory — and so are its own tiles well outside the viewport.
  function sweepLevels() {
    if (tilesPending > 0) return;
    levels.forEach((lv, z) => {
      if (z === tileZoom) return;
      lv.el.remove();
      levels.delete(z);
    });
    const lv = levels.get(tileZoom), r = tileRange;
    if (!lv || !r) return;
    const pad = 3;
    lv.tiles.forEach((img, key) => {
      const [tx, ty] = key.split('/').map(Number);
      if (tx < r.xMin - pad || tx > r.xMax + pad ||
          ty < r.yMin - pad || ty > r.yMax + pad) {
        img.remove();
        lv.tiles.delete(key);
      }
    });
  }

  // One transform per level per frame — the whole reason tiles live in their
  // own grid instead of being repositioned one at a time.
  function syncTiles() {
    levels.forEach(lv => {
      const k = currentScale * worldPerTile(lv.z) / TILE_PX;
      // A level a few doublings off the camera is a blur standing in for
      // tiles still loading. Past that it is just an enormous layer.
      if (lv.z !== tileZoom && (k > 12 || k < 0.1)) {
        lv.el.style.display = 'none';
        return;
      }
      lv.el.style.display = '';
      const [wx, wy] = project(tile2lng(lv.x0, lv.z), tile2lat(lv.y0, lv.z));
      const x = wx * currentScale + panX, y = wy * currentScale + panY;
      lv.el.style.transform =
        `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${k})`;
    });
  }

  function loadTiles(force = false) {
    // With no box the visible range comes out inside out, and every tile
    // asked for on the strength of it would be wrong.
    if (!tileCanvas || !haveBox()) return;
    const now = Date.now();
    if (!force && now - lastTileCheck <= 120) return;
    lastTileCheck = now;
    const z = effTileZ();
    // Visible world box = screen corners unprojected to SVG space
    const ww = wrap.clientWidth, wh = wrap.clientHeight;
    const sx0 = -panX / currentScale, sx1 = (ww - panX) / currentScale;
    const sy0 = -panY / currentScale, sy1 = (wh - panY) / currentScale;
    const lng0 = B.minLng + sx0 / SVG_W * (B.maxLng - B.minLng);
    const lng1 = B.minLng + sx1 / SVG_W * (B.maxLng - B.minLng);
    const my0 = yTop + sy0 / SVG_H * (yBot - yTop);
    const my1 = yTop + sy1 / SVG_H * (yBot - yTop);
    // One-tile margin so small pans stay covered
    const r = {
      xMin: lng2tile(lng0, z) - 1, xMax: lng2tile(lng1, z) + 1,
      yMin: Math.floor(my0 * (1 << z)) - 1, yMax: Math.floor(my1 * (1 << z)) + 1
    };
    // Clamp to the world bounds at this zoom
    const bx0 = lng2tile(B.minLng, z), bx1 = lng2tile(B.maxLng, z);
    const by0 = lat2tile(B.maxLat, z), by1 = lat2tile(B.minLat, z);
    r.xMin = Math.max(r.xMin, bx0); r.xMax = Math.min(r.xMax, bx1);
    r.yMin = Math.max(r.yMin, by0); r.yMax = Math.min(r.yMax, by1);
    if (tileRange && tileRange.z === z &&
        r.xMin >= tileRange.xMin && r.xMax <= tileRange.xMax &&
        r.yMin >= tileRange.yMin && r.yMax <= tileRange.yMax) return;
    tileRange = { z, ...r };
    tileZoom = z;
    const lv = levelFor(z, r);
    for (let tx = r.xMin; tx <= r.xMax; tx++) {
      for (let ty = r.yMin; ty <= r.yMax; ty++) {
        addTile(lv, tx, ty, 'base');
        addTile(lv, tx, ty, 'ref');
      }
    }
    sweepLevels();  // nothing new to wait for? then the old levels can go
    syncTiles();
  }

  // ── OVERLAY — the SVG is a screen-space layer: never CSS-scaled, every
  //    node positioned in CSS px each frame. Sizes are plain pixels. ──
  const toScreen = (x, y) => [x * currentScale + panX, y * currentScale + panY];
  const onScreen = (x, y, m = 40) =>
    x > -m && y > -m && x < wrap.clientWidth + m && y < wrap.clientHeight + m;

  const trailPaths = [];   // {el, pts, leg, tag} world-unit anchors
  const clusterNodes = []; // {g, sx, sy} world-unit anchors
  let activeTrail = null;

  // ── TRAILS — nested routes inside a themed map. The pilgrimage map holds
  //    four franchise trails; Godzilla and the shopping run get their own. ──
  function drawTrails() {
    trailGroup = svgEl('g', { id: 'trail-group' });
    const trails = {};
    DATA.spots.forEach(s => {
      if (s.trail) (trails[s.trail] = trails[s.trail] || []).push(s);
    });
    Object.entries(trails).forEach(([tag, spots]) => {
      const leg = legOf(spots[0].leg);
      const meta = (leg.trails || {})[tag] || {};
      const el = svgEl('path', {
        class: 'trail-line',
        stroke: meta.color || spots[0].accent || leg.color,
        'data-trail': tag
      });
      el.style.display = 'none';
      trailPaths.push({ el, pts: spots.map(s => project(s.lng, s.lat)),
                        leg: spots[0].leg, tag });
      trailGroup.appendChild(el);
    });
    svg.appendChild(trailGroup);
  }

  const sameName = (a, b) => a.toLowerCase() === b.toLowerCase();
  const trailLine = (tag, legId) => {
    const tr = trailMetaOf(tag);
    if (!tr) return null;
    const legLabel = DATA.legs[legId].label;
    return sameName(tr.meta.label, legLabel)
      ? `${legLabel} — ${DATA.legs[legId].sub}`
      : `${tr.meta.label} — ${legLabel}`;
  };

  const trailMetaOf = tag => {
    for (const [lid, leg] of Object.entries(DATA.legs)) {
      const t = (leg.trails || {})[tag];
      if (t) return { legId: lid, meta: t };
    }
    return null;
  };

  // One trail at a time is the active beat; earlier trails in the same map
  // stay faintly visible so the route accumulates rather than swapping.
  function setActiveTrail(tag) {
    activeTrail = tag;
    const owner = tag ? trailMetaOf(tag) : null;
    trailPaths.forEach(tp => {
      const order = Object.keys(DATA.legs[tp.leg].trails || {});
      const ai = order.indexOf(tag), i = order.indexOf(tp.tag);
      const on = owner && tp.leg === owner.legId && i >= 0 && i <= ai;
      tp.el.style.display = on ? '' : 'none';
      tp.el.style.opacity = i === ai ? '' : '0.22';
    });
    const key = $('trail-key');
    if (!key) return;
    if (!owner) { key.classList.remove('is-on'); return; }
    const row = document.createElement('span');
    row.className = 'trail-key-item';
    const dot = document.createElement('i');
    dot.style.background = owner.meta.color;
    row.append(dot, document.createTextNode(owner.meta.label));
    key.replaceChildren(row);
    key.classList.add('is-on');
  }

  // ── PINS — built once; clustering only re-runs after the gesture settles ──
  const visibleSpots = () => DATA.spots.filter(s => {
    if (activeLeg && s.leg !== activeLeg) return false;
    if (activeKind && !inChip(s, activeKind)) return false;
    if (query) {
      const hay = `${s.name} ${s.blurb} ${legOf(s.leg).label}`.toLowerCase();
      if (!hay.includes(query)) return false;
    }
    return true;
  });

  function buildPins() {
    pinGroup = svgEl('g', { id: 'pin-group' });
    clusterGroup = svgEl('g', { id: 'cluster-group' });
    DATA.spots.forEach(s => {
      const [x, y] = project(s.lng, s.lat); // world-unit anchor
      const g = svgEl('g', { class: 'pin-node' });
      const mark = svgEl('path', {
        class: 'pin', tabindex: '0', role: 'button',
        'aria-label': `${s.name} — ${catLabel(s)}`
      });
      mark.style.cursor = 'pointer';
      mark.addEventListener('click', e => { e.stopPropagation(); selectSpot(s.id, e.clientX, e.clientY); });
      mark.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const rect = mark.getBoundingClientRect();
          selectSpot(s.id, rect.left + rect.width / 2, rect.top);
        }
      });
      const beenDot = svgEl('circle', { class: 'been-dot', cx: 7, cy: -7, r: 3.6 });
      g.append(mark, beenDot);
      g.dataset.id = s.id;
      pinNodes.set(s.id, { g, mark, beenDot, sx: x, sy: y, show: false });
      pinGroup.appendChild(g);
    });
    svg.append(pinGroup, clusterGroup);
  }

  // Every visible spot keeps a persistent pin node; the focused leg clusters
  // among its own pins while the rest of the map dims back to context.
  // Positions are NOT set here — syncOverlay() owns them every frame. This
  // only decides set membership and styles, all in raw CSS pixels.
  function reclusterPins() {
    if (!pinGroup) return;
    const CLUSTER = CONFIG.CLUSTER_SCREEN_PX / currentScale; // world units
    const r2 = CLUSTER * CLUSTER;
    const been = beenSet();
    const vis = visibleSpots();

    pinNodes.forEach(n => { n.show = false; n.g.style.opacity = ''; });
    clusterGroup.replaceChildren();
    clusterNodes.length = 0;

    vis.forEach(s => {
      const node = pinNodes.get(s.id);
      const group = groupOf(s);
      const isSel = s.id === selectedId;
      const c = node.mark;
      c.setAttribute('d', shapePath(group, isSel ? 10 : 7.5));
      if (group === 'film') {
        // A location, not a destination: the outline of a place you stand in.
        c.setAttribute('fill', 'rgba(10,9,14,0.9)');
        c.setAttribute('stroke', pinColor(s));
        c.setAttribute('stroke-width', 2);
        c.setAttribute('stroke-dasharray', '3.2 2.4');
      } else {
        c.setAttribute('fill', pinColor(s));
        c.setAttribute('stroke', '#fff');
        c.setAttribute('stroke-width', 1.4);
        c.setAttribute('stroke-opacity', '0.9');
        c.removeAttribute('stroke-dasharray');
      }
      c.setAttribute('class', 'pin' + (isSel ? ' is-selected' : '') + (been.has(s.id) ? ' is-been' : ''));
      node.beenDot.style.display = been.has(s.id) ? '' : 'none';
      node.show = true;
      node.g.style.opacity = (focusLeg && s.leg !== focusLeg) ? '0.15' : '';
    });

    // Cluster only the focused map's pins; off-map pins stay dimmed context.
    const items = vis.filter(s => !focusLeg || s.leg === focusLeg).map(s => {
      const n = pinNodes.get(s.id);
      return { spot: s, node: n, sx: n.sx, sy: n.sy };
    });
    const used = new Set(), clusters = [];
    items.forEach((it, i) => {
      if (used.has(i)) return;
      const grp = [it];
      used.add(i);
      let ax = it.sx, ay = it.sy, absorbed = true;
      while (absorbed) {
        absorbed = false;
        for (let j = 0; j < items.length; j++) {
          if (used.has(j)) continue;
          const dx = ax - items[j].sx, dy = ay - items[j].sy;
          if (dx * dx + dy * dy < r2) {
            grp.push(items[j]);
            used.add(j);
            ax = grp.reduce((a, g) => a + g.sx, 0) / grp.length;
            ay = grp.reduce((a, g) => a + g.sy, 0) / grp.length;
            absorbed = true;
          }
        }
      }
      clusters.push(grp);
    });

    clusters.forEach(grp => {
      const ax = grp.reduce((a, g) => a + g.sx, 0) / grp.length;
      const ay = grp.reduce((a, g) => a + g.sy, 0) / grp.length;
      if (grp.length === 1) return; // already styled as a single pin
      grp.forEach(g => { g.node.show = false; });
      {
        const cols = new Set(grp.map(g => pinColor(g.spot)));
        const col = cols.size === 1 ? [...cols][0] : '#e8b13f';
        const g = svgEl('g', { class: 'cluster-node' });
        const c = svgEl('circle', {
          cx: 0, cy: 0, r: 15, class: 'pin pin-cluster',
          stroke: col, 'stroke-width': 2.4,
          tabindex: '0', role: 'button', 'aria-label': `Cluster of ${grp.length} places`
        });
        c.style.cursor = 'pointer';
        const t = svgEl('text', {
          x: 0, y: 0, class: 'cluster-num', 'font-size': 12, fill: col
        });
        t.textContent = grp.length;
        const expand = e => {
          e.stopPropagation();
          const newScale = Math.min(CONFIG.ZOOM_MAX, currentScale * CONFIG.CLUSTER_ZOOM_IN_RATIO);
          const th = CONFIG.CLUSTER_SCREEN_PX / newScale, th2 = th * th;
          const stays = grp.some((g1, i) =>
            grp.slice(i + 1).some(g2 => {
              const dx = g1.sx - g2.sx, dy = g1.sy - g2.sy;
              return dx * dx + dy * dy < th2;
            }));
          const rect = wrap.getBoundingClientRect();
          // Anchor on the cluster's own centroid, not the cursor.
          const [sx, sy] = toScreen(ax, ay);
          const cx = sx + rect.left, cy = sy + rect.top;
          if (stays) showClusterList(cx, cy, grp);
          else {
            takeCamera();
            glideTo(() => anchoredZoom(newScale, cx, cy));
          }
        };
        c.addEventListener('click', expand);
        t.addEventListener('click', expand);
        c.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); expand(e); }
        });
        g.append(c, t);
        clusterGroup.appendChild(g);
        clusterNodes.push({ g, sx: ax, sy: ay });
      }
    });
    syncOverlay();
  }

  // Positions, every frame — the overlay never waits for a settle.
  function syncOverlay() {
    if (!svg) return;
    trailPaths.forEach(tp => {
      tp.el.setAttribute('d', 'M' + tp.pts
        .map(p => toScreen(p[0], p[1]).map(v => v.toFixed(1)).join(','))
        .join('L'));
    });
    pinNodes.forEach(n => {
      if (!n.show) { n.g.style.display = 'none'; return; }
      const [x, y] = toScreen(n.sx, n.sy);
      n.g.style.display = onScreen(x, y) ? '' : 'none';
      n.g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    });
    clusterNodes.forEach(n => {
      const [x, y] = toScreen(n.sx, n.sy);
      n.g.style.display = onScreen(x, y) ? '' : 'none';
      n.g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    });
  }

  const scheduleRecluster = () => {
    clearTimeout(clusterTimer);
    clusterTimer = setTimeout(reclusterPins, CONFIG.CLUSTER_SETTLE_MS);
  };

  // ── POPUP ────────────────────────────────────────────────
  function positionPopup(x, y) {
    popup.style.left = '0px'; popup.style.top = '0px';
    const w = popup.offsetWidth || 280, h = popup.offsetHeight || 90;
    const vw = window.innerWidth, vh = window.innerHeight, pad = 10;
    let left = x + 14, top = y - 10;
    if (left + w > vw - pad) left = Math.max(pad, x - w - 14);
    if (top + h > vh - pad) top = Math.max(pad, vh - h - pad);
    if (top < pad) top = pad;
    popup.style.left = left + 'px';
    popup.style.top = top + 'px';
  }

  function showPopup(x, y, s) {
    popup.replaceChildren();
    const title = document.createElement('strong');
    title.style.color = pinColor(s);
    title.textContent = s.name;
    const meta = document.createElement('div');
    meta.className = 'popup-meta';
    meta.textContent = `${legOf(s.leg).label} · ${catLabel(s)}`;
    const body = document.createElement('div');
    body.className = 'popup-body';
    body.textContent = s.blurb;
    const link = document.createElement('a');
    link.href = s.mapsUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.className = 'popup-link';
    link.textContent = 'Open in Maps →';
    popup.append(title, meta, body, link);
    popup.style.display = 'block';
    positionPopup(x, y);
  }

  function showClusterList(x, y, grp) {
    popup.replaceChildren();
    const h = document.createElement('strong');
    h.textContent = `${grp.length} places here`;
    popup.appendChild(h);
    grp.forEach(g => {
      const row = document.createElement('a');
      row.href = '#';
      row.className = 'popup-cluster-row';
      row.style.color = legOf(g.spot.leg).color;
      row.textContent = `→ ${g.spot.name}`;
      row.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const rect = popup.getBoundingClientRect();
        selectSpot(g.spot.id, rect.left, rect.top);
      });
      popup.appendChild(row);
    });
    popup.style.display = 'block';
    positionPopup(x, y);
  }

  const hidePopup = () => { popup.style.display = 'none'; };

  // ── CAMERA — one anchoring rule for every zoom ───────────
  const clampScale = v => clamp(v, CONFIG.ZOOM_MIN, CONFIG.ZOOM_MAX);

  // A box with no size yet — a hidden pane, a collapsed tab, layout that has
  // not run — would divide the camera by zero and leave it NaN for good.
  // Hold the move instead, and replay it when the box arrives.
  const haveBox = () => wrap.clientWidth > 0 && wrap.clientHeight > 0;
  let pendingCamera = null;

  // Programmatic camera moves glide by animating the camera values — both
  // layers (tiles and overlay) are synced per frame, so they fly together.
  // A user gesture cancels the glide instantly.
  let glideRaf = 0;
  function glideTo(fn) {
    const from = { s: currentScale, x: panX, y: panY };
    fn(); // sets the camera to its target synchronously
    const to = { s: currentScale, x: panX, y: panY };
    if (from.s === to.s && from.x === to.x && from.y === to.y) return;
    cancelAnimationFrame(glideRaf);
    const t0 = performance.now();
    const step = now => {
      const k = Math.min(1, (now - t0) / 450);
      const e = 1 - Math.pow(1 - k, 3); // ease-out cubic
      currentScale = from.s + (to.s - from.s) * e;
      panX = from.x + (to.x - from.x) * e;
      panY = from.y + (to.y - from.y) * e;
      applyTransform();
      glideRaf = k < 1 ? requestAnimationFrame(step) : 0;
      if (!glideRaf) loadTiles(true);
    };
    glideRaf = requestAnimationFrame(step);
  }

  // Focus a spot: zoom until the viewport shows radiusM metres of ground
  // around it — a cafe opens tighter than an amusement park.
  function focusSpot(s, radiusM = 400) {
    if (!haveBox()) { pendingCamera = () => focusSpot(s, radiusM); return; }
    const ww = wrap.clientWidth, wh = wrap.clientHeight;
    const target = clampScale(ww * M_PER_UNIT / (2 * radiusM));
    const [px, py] = project(s.lng, s.lat);
    panX = ww / 2 - px * target;
    panY = wh / 2 - py * target;
    currentScale = target;
    applyTransform();
  }

  function applyTransform() {
    syncOverlay();   // positions track the camera in the same frame
    syncTiles();
    loadTiles();
    scheduleRecluster(); // set membership still settles on a debounce
  }

  // cx, cy are client (viewport) coordinates.
  function anchoredZoom(newScale, cx, cy) {
    if (!haveBox() || !currentScale) return;
    const rect = wrap.getBoundingClientRect();
    const x = cx - rect.left, y = cy - rect.top;
    const next = clampScale(newScale);
    const r = next / currentScale;
    panX = x - (x - panX) * r;
    panY = y - (y - panY) * r;
    currentScale = next;
    applyTransform();
  }

  function fitBox(minX, minY, maxX, maxY, pad = CONFIG.FIT_PAD) {
    if (!haveBox()) { pendingCamera = () => fitBox(minX, minY, maxX, maxY, pad); return; }
    const ww = wrap.clientWidth, wh = wrap.clientHeight;
    // A single stop, or two doors apart, still gets a street around it.
    const floor = CONFIG.MIN_FIT_M / M_PER_UNIT;
    const bw = Math.max(floor, maxX - minX), bh = Math.max(floor, maxY - minY);
    currentScale = clampScale(Math.min(ww / (bw * pad), wh / (bh * pad)));
    panX = ww / 2 - (minX + maxX) / 2 * currentScale;
    panY = wh / 2 - (minY + maxY) / 2 * currentScale;
    applyTransform();
  }

  function zoomToBox(minLng, minLat, maxLng, maxLat) {
    const [x0, y0] = project(minLng, maxLat);
    const [x1, y1] = project(maxLng, minLat);
    fitBox(x0, y0, x1, y1);
  }

  function zoomToLeg(legId) {
    const pts = DATA.spots.filter(s => s.leg === legId);
    if (!pts.length) return;
    const xs = pts.map(s => project(s.lng, s.lat)[0]);
    const ys = pts.map(s => project(s.lng, s.lat)[1]);
    fitBox(Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys));
    statusEl.textContent = `${DATA.legs[legId].label} — ${DATA.legs[legId].sub}`;
  }

  // The route's own box in world units, measured once the data is in. The
  // world around it is the whole country, so this is what "the whole route"
  // means on screen.
  let routeBox = null;
  function measureRoute() {
    const pts = DATA.spots.map(s => project(s.lng, s.lat));
    routeBox = [
      Math.min(...pts.map(p => p[0])), Math.min(...pts.map(p => p[1])),
      Math.max(...pts.map(p => p[0])), Math.max(...pts.map(p => p[1]))
    ];
  }

  function centerMap() {
    if (!haveBox()) { pendingCamera = centerMap; return; }
    if (routeBox) { fitBox(...routeBox, CONFIG.ROUTE_FIT_PAD); return; }
    const ww = wrap.clientWidth, wh = wrap.clientHeight;
    currentScale = clampScale(Math.min(ww / SVG_W, wh / SVG_H));
    panX = (ww - SVG_W * currentScale) / 2;
    panY = (wh - SVG_H * currentScale) / 2;
    applyTransform();
  }

  // ── STORY COLUMN — beats advise; the user's gesture owns the camera ──
  let observer = null;
  function applyView(el) {
    // A trail header carries both a box and its leg: the leg is there to
    // scope the dimming, the box is the frame it promises. Box wins, or a
    // trail of four stops would open on the whole pilgrimage.
    if (el.dataset.box) {
      const [a, b, c, d] = el.dataset.box.split(',').map(Number);
      zoomToBox(a, b, c, d);
      if (el.dataset.leg) {
        const l = DATA.legs[el.dataset.leg];
        statusEl.textContent = (el.dataset.trail && trailLine(el.dataset.trail, el.dataset.leg))
          || `${el.dataset.viewLabel || l.label} — ${l.label}`;
      }
      return;
    }
    if (el.dataset.leg) { zoomToLeg(el.dataset.leg); return; }
    if (el.dataset.viewFit !== undefined) centerMap();
  }

  function beatStatus(el) {
    const leg = el.dataset.leg;
    if (leg && el.dataset.trail) {
      const line = trailLine(el.dataset.trail, leg);
      if (line) return line;
    }
    if (leg) return `${DATA.legs[leg].label} — ${DATA.legs[leg].sub}`;
    if (el.dataset.viewFit !== undefined) return 'The whole route: Tokyo to Awaji Island.';
    return el.dataset.viewLabel || '';
  }

  // The big map caption: the name of the map currently in frame, in its accent.
  function setMapTitle(text, color) {
    if (!mapTitleEl) return;
    mapTitleEl.textContent = text || '';
    mapTitleEl.style.color = color || 'var(--gold)';
    mapTitleEl.classList.toggle('is-on', !!text);
  }

  function watchBeats() {
    // Re-runs after every renderList() (search keystroke, chip, leg select).
    // Re-observing replaces the camera-steering state mid-scroll and will not
    // re-fire the current beat until the user scrolls — intentional; trails
    // are reset on filter changes so nothing stale stays drawn.
    if (observer) observer.disconnect();
    observer = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        // Scrolling back to the top hands the camera back to the story.
        if (el.dataset.beat === 'intro') userHoldsCamera = false;
        const label = beatStatus(el);
        if (label) statusEl.textContent = label;
        const leg = el.dataset.leg || null;
        const trail = el.dataset.trail || null;
        const tr = trail ? (trailMetaOf(trail) || {}).meta : null;
        // The caption is passive info — it stays honest even while the user
        // holds the camera.
        setMapTitle(
          tr ? tr.label : leg ? DATA.legs[leg].label : (el.dataset.mapTitle || ''),
          tr ? tr.color : leg ? DATA.legs[leg].color : null);
        if (!userHoldsCamera) {
          glideTo(() => applyView(el));
          if (leg !== focusLeg) {
            focusLeg = leg;
            reclusterPins();
            setActiveTrail(null);
          }
          const trails = leg ? (DATA.legs[leg].trails || null) : null;
          if (trail) setActiveTrail(trail);
          else if (trails && Object.keys(trails).length === 1) {
            // A single-trail map (Godzilla) draws its trail with the header.
            setActiveTrail(Object.keys(trails)[0]);
          }
        }
      });
    }, { root: null, rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    listEl.querySelectorAll('.story-beat').forEach(el => observer.observe(el));
  }

  // ── LIST — rebuilt on filter changes only; scroll position survives ──
  function renderList() {
    const scroller = listEl.closest('.list-panel') || listEl;
    const scrollPos = scroller.scrollTop;
    listEl.replaceChildren();
    const been = beenSet();
    let total = 0;
    DATA.beats.forEach(beat => {
      if (beat.type === 'reset') {
        // Slim interstitial: pulls the camera back to the region overview
        // between themed maps. Carries a view, reads as a divider.
        const d = document.createElement('div');
        d.className = 'beat-reset story-beat';
        if (beat.view === 'fit') d.dataset.viewFit = '';
        else if (Array.isArray(beat.view)) {
          d.dataset.box = beat.view.join(',');
          d.dataset.viewLabel = beat.label;
        }
        d.dataset.mapTitle = `${beat.label} — the overview`;
        const cap = document.createElement('span');
        cap.textContent = `— ${beat.label} —`;
        d.appendChild(cap);
        listEl.appendChild(d);
        return;
      }
      if (beat.type === 'interlude') {
        const inter = document.createElement('div');
        inter.className = 'interlude story-beat';
        inter.dataset.beat = beat.id;
        if (beat.view === 'fit') inter.dataset.viewFit = '';
        else if (Array.isArray(beat.view)) {
          inter.dataset.box = beat.view.join(',');
          inter.dataset.viewLabel = beat.title;
        }
        inter.dataset.mapTitle = beat.title;
        const it = document.createElement('h3');
        it.textContent = beat.title;
        const ip = document.createElement('p');
        ip.textContent = beat.text;
        inter.append(it, ip);
        listEl.appendChild(inter);
        return;
      }
      const legId = beat.leg;
      const leg = DATA.legs[legId];
      const vis = DATA.spots.filter(s => {
        if (s.leg !== legId) return false;
        if (activeKind && !inChip(s, activeKind)) return false;
        if (query) {
          const hay = `${s.name} ${s.blurb}`.toLowerCase();
          if (!hay.includes(query)) return false;
        }
        return true;
      });
      if (activeLeg && legId !== activeLeg) return;
      if (!vis.length) return;

      const head = document.createElement('div');
      head.className = 'leg-header story-beat';
      head.dataset.leg = legId;
      head.style.borderBottomColor = leg.color;
      const h2 = document.createElement('h2');
      h2.textContent = leg.label;
      h2.style.color = leg.color;
      const sub = document.createElement('p');
      sub.textContent = `${leg.sub} · ${stops(vis.length)}`;
      const story = document.createElement('p');
      story.className = 'leg-story';
      story.textContent = leg.story;
      head.append(h2, sub, story);
      listEl.appendChild(head);

      // A map with nested trails (the pilgrimage leg) renders each trail as
      // its own colored sub-section inside the header.
      const trails = leg.trails || null;
      const groups = trails
        ? Object.entries(trails).map(([tag, t]) => ({ tag, meta: t, spots: vis.filter(s => s.trail === tag) }))
        : [{ tag: null, meta: null, spots: vis }];

      groups.forEach(gr => {
        if (!gr.spots.length) return;
        if (gr.meta) {
          // Each trail is its own beat: scroll arrives, the trail draws over
          // the basemap and the camera frames just its stops.
          const th = document.createElement('div');
          th.className = 'trail-header story-beat';
          th.style.borderColor = gr.meta.color;
          th.dataset.trail = gr.tag;
          th.dataset.leg = legId;
          th.dataset.viewLabel = gr.meta.label;
          const xs = gr.spots.map(s => s.lng), ys = gr.spots.map(s => s.lat);
          th.dataset.box = [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)].join(',');
          const tn = document.createElement('span');
          tn.textContent = gr.meta.label;
          tn.style.color = gr.meta.color;
          const tc = document.createElement('em');
          tc.textContent = stops(gr.spots.length);
          th.append(tn, tc);
          listEl.appendChild(th);
        }
      gr.spots.forEach(s => {
        total++;
        const card = document.createElement('article');
        card.className = 'spot-card' + (s.id === selectedId ? ' is-selected' : '');
        card.dataset.id = s.id;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'spot-select';
        const dot = document.createElement('span');
        dot.className = 'spot-dot';
        dot.style.background = s.accent || leg.color;
        const nm = document.createElement('span');
        nm.textContent = s.name;
        btn.append(dot, nm);
        btn.addEventListener('click', () => selectSpot(s.id));
        card.appendChild(btn);

        const badges = document.createElement('div');
        badges.className = 'spot-badges';
        const b1 = document.createElement('span');
        b1.className = 'spot-badge kind-' + groupOf(s);
        b1.textContent = catLabel(s);
        badges.append(b1);
        if (been.has(s.id)) {
          const b3 = document.createElement('span');
          b3.className = 'spot-badge is-been';
          b3.textContent = 'Been here';
          badges.appendChild(b3);
        }
        card.appendChild(badges);

        const blurb = document.createElement('p');
        blurb.className = 'spot-blurb';
        blurb.textContent = s.blurb;
        card.appendChild(blurb);

        const links = document.createElement('div');
        links.className = 'spot-links';
        const a = document.createElement('a');
        a.href = s.mapsUrl;
        a.target = '_blank';
        a.rel = 'noopener';
        a.className = 'spot-link';
        a.textContent = 'Open in Maps';
        const bt = document.createElement('button');
        bt.type = 'button';
        bt.className = 'been-toggle' + (been.has(s.id) ? ' is-on' : '');
        bt.textContent = been.has(s.id) ? 'Stamped' : 'Been here';
        bt.addEventListener('click', e => {
          e.stopPropagation();
          const set = beenSet();
          if (set.has(s.id)) set.delete(s.id); else set.add(s.id);
          saveBeen(set);
          renderList();
          reclusterPins();
        });
        links.append(a, bt);
        card.appendChild(links);
        listEl.appendChild(card);
      });
      });
    });
    countEl.textContent = stops(total);
    scroller.scrollTop = scrollPos;
    watchBeats();
  }

  // ── SELECT ───────────────────────────────────────────────
  function selectSpot(id, cx, cy) {
    selectedId = id;
    userHoldsCamera = true;
    const s = DATA.spots.find(x => x.id === id);
    if (!s) return;
    reclusterPins();
    listEl.querySelectorAll('.spot-card.is-selected')
      .forEach(c => c.classList.remove('is-selected'));
    const card = listEl.querySelector(`[data-id="${id}"]`);
    if (card) {
      card.classList.add('is-selected');
      card.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
    if (cx == null) {
      // From the list: the place becomes its own map — dive to its ground
      // radius, then it announces itself.
      glideTo(() => focusSpot(s, s.focusM || 400));
      const rect = wrap.getBoundingClientRect();
      showPopup(rect.left + wrap.clientWidth / 2,
                rect.top + wrap.clientHeight / 2 - 30, s);
    } else {
      showPopup(cx, cy, s);
    }
    setMapTitle(s.name, pinColor(s));
    try { history.replaceState(null, '', '?spot=' + id); } catch (e) {}
    statusEl.textContent = `${s.name} — ${legOf(s.leg).label}`;
  }

  // ── INPUT ────────────────────────────────────────────────
  const takeCamera = () => {
    userHoldsCamera = true;
    // A user gesture cuts any in-flight glide — gestures stay 1:1.
    cancelAnimationFrame(glideRaf);
    glideRaf = 0;
    setMapTitle('');
    if (focusLeg) { focusLeg = null; reclusterPins(); setActiveTrail(null); }
  };
  let dragging = false, dX = 0, dY = 0, pX = 0, pY = 0, touchDist = 0;

  wrap.addEventListener('mousedown', e => {
    takeCamera();
    hidePopup();
    dragging = true;
    dX = e.clientX; dY = e.clientY;
    pX = panX; pY = panY;
    wrap.classList.add('dragging');
  });
  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    panX = pX + (e.clientX - dX);
    panY = pY + (e.clientY - dY);
    applyTransform();
  });
  window.addEventListener('mouseup', () => {
    dragging = false;
    wrap.classList.remove('dragging');
    loadTiles(true); // settle: refine tiles at the resting position
  });
  wrap.addEventListener('wheel', e => {
    e.preventDefault();
    takeCamera();
    hidePopup();
    // ctrl+wheel is a trackpad pinch; its deltas are much bigger.
    const dy = e.ctrlKey ? e.deltaY / 8 : e.deltaY;
    anchoredZoom(currentScale * Math.exp(-clamp(dy, -200, 200) * 0.0022), e.clientX, e.clientY);
  }, { passive: false });
  wrap.addEventListener('dblclick', e => {
    if (e.target.closest('.pin')) return;
    e.preventDefault();
    takeCamera();
    anchoredZoom(currentScale * 1.5, e.clientX, e.clientY);
  });
  wrap.addEventListener('touchstart', e => {
    takeCamera();
    hidePopup();
    if (e.touches.length === 1) {
      dragging = true;
      dX = e.touches[0].clientX; dY = e.touches[0].clientY;
      pX = panX; pY = panY;
    } else if (e.touches.length === 2) {
      dragging = false;
      touchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY);
    }
  }, { passive: false });
  wrap.addEventListener('touchmove', e => {
    e.preventDefault();
    if (e.touches.length === 1 && dragging) {
      panX = pX + (e.touches[0].clientX - dX);
      panY = pY + (e.touches[0].clientY - dY);
      applyTransform();
    } else if (e.touches.length === 2 && touchDist > 0) {
      const nd = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY);
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      anchoredZoom(currentScale * (nd / touchDist), cx, cy);
      touchDist = nd;
    }
  }, { passive: false });
  wrap.addEventListener('touchend', e => {
    // Pinch → one finger left: re-anchor the pan so the surviving finger
    // keeps dragging instead of going dead.
    if (e.touches.length === 1) {
      dragging = true;
      dX = e.touches[0].clientX; dY = e.touches[0].clientY;
      pX = panX; pY = panY;
    } else {
      dragging = false;
    }
    touchDist = 0;
    loadTiles(true);
  });
  wrap.addEventListener('click', e => {
    if (!e.target.closest('.pin')) hidePopup();
  });

  $('zoom-in').addEventListener('click', () => {
    takeCamera();
    const r = wrap.getBoundingClientRect();
    anchoredZoom(currentScale * 1.5, r.left + r.width / 2, r.top + r.height / 2);
  });
  $('zoom-out').addEventListener('click', () => {
    takeCamera();
    const r = wrap.getBoundingClientRect();
    anchoredZoom(currentScale / 1.5, r.left + r.width / 2, r.top + r.height / 2);
  });
  $('fit-map').addEventListener('click', () => {
    userHoldsCamera = false;
    selectedId = null;
    hidePopup();
    glideTo(centerMap);
    setMapTitle('');
    statusEl.textContent = 'The whole route: Tokyo to Awaji Island.';
  });

  searchEl.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      query = searchEl.value.trim().toLowerCase();
      setActiveTrail(null);
      renderList();
      reclusterPins();
    }, CONFIG.SEARCH_DEBOUNCE_MS);
  });
  legSel.addEventListener('change', () => {
    activeLeg = legSel.value || null;
    setActiveTrail(null);
    renderList();
    reclusterPins();
    takeCamera();
    if (activeLeg) glideTo(() => zoomToLeg(activeLeg)); else glideTo(centerMap);
  });
  document.querySelectorAll('.kind-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const v = chip.dataset.kind;
      activeKind = activeKind === v ? null : v;
      document.querySelectorAll('.kind-chip').forEach(c =>
        c.classList.toggle('is-on', c.dataset.kind === activeKind));
      setActiveTrail(null);
      renderList();
      reclusterPins();
    });
  });
  // The map box also changes without a window resize — the sticky column
  // reflowing, a hidden pane opening — so watch the element, not the window.
  let boxW = 0, boxH = 0;
  const onBox = () => {
    const ww = wrap.clientWidth, wh = wrap.clientHeight;
    if (!ww || !wh) return;
    if (pendingCamera) {
      const held = pendingCamera;
      pendingCamera = null;
      boxW = ww; boxH = wh;
      held();
      loadTiles(true); // the box just appeared: skip the throttle
      return;
    }
    // Keep the point that was in the middle in the middle.
    if (boxW && boxH && currentScale) {
      panX += (ww - boxW) / 2;
      panY += (wh - boxH) / 2;
    }
    boxW = ww; boxH = wh;
    applyTransform();
    loadTiles(true); // a resize is a resting position, like a released drag
  };
  if (window.ResizeObserver) new ResizeObserver(onBox).observe(wrap);
  window.addEventListener('resize', onBox);

  // ── PRINT — the sheet shows the whole journey, not the last zoom ──
  let savedPrint = null;
  window.addEventListener('beforeprint', () => {
    if (!DATA || savedPrint) return;
    savedPrint = { scale: currentScale, panX, panY, hold: userHoldsCamera,
                   search: searchEl.value, leg: activeLeg, kind: activeKind,
                   focus: focusLeg, selected: selectedId, trail: activeTrail };
    userHoldsCamera = false;
    searchEl.value = '';
    legSel.value = '';
    activeLeg = null;
    activeKind = null;
    query = '';
    document.querySelectorAll('.kind-chip').forEach(c => c.classList.remove('is-on'));
    setActiveTrail(null);
    renderList();
    centerMap();
    clearTimeout(clusterTimer);
    reclusterPins();
    loadTiles(true);
  });
  // beforeprint fires before the print layout applies — recentre once the
  // mm-sized print viewport exists, or the fit is computed for the wrong box.
  if (window.matchMedia) {
    window.matchMedia('print').addEventListener('change', e => {
      if (e.matches && DATA) {
        centerMap();
        reclusterPins();
        loadTiles(true);
      }
    });
  }
  window.addEventListener('afterprint', () => {
    if (!savedPrint) return;
    currentScale = savedPrint.scale;
    panX = savedPrint.panX;
    panY = savedPrint.panY;
    userHoldsCamera = savedPrint.hold;
    searchEl.value = savedPrint.search;
    legSel.value = savedPrint.leg || '';
    activeLeg = savedPrint.leg;
    activeKind = savedPrint.kind;
    query = (savedPrint.search || '').trim().toLowerCase();
    document.querySelectorAll('.kind-chip').forEach(c =>
      c.classList.toggle('is-on', c.dataset.kind === activeKind));
    focusLeg = savedPrint.focus;
    selectedId = savedPrint.selected;
    const restoreTrail = savedPrint.trail;
    savedPrint = null;
    renderList();
    applyTransform();
    reclusterPins();
    setActiveTrail(restoreTrail);
  });

  // ── BOOT ─────────────────────────────────────────────────
  // Esri's canvas needs toning down to sit under this page; CARTO's does not.
  if (tileCanvas && !usingCarto()) tileCanvas.classList.add('is-esri');
  const bgv = $('bg-video');
  if (bgv) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      bgv.pause();
      bgv.style.display = 'none';
    } else {
      // Fade in on first frames instead of flashing a half-loaded layer.
      bgv.addEventListener('playing', () => bgv.classList.add('is-live'), { once: true });
    }
  }
  fetch('assets/otaku-japan-data.json')
    .then(r => r.json())
    .then(d => {
      DATA = d;
      // Screen-space overlay: the SVG fills the wrap and is never CSS-scaled.
      svg = svgEl('svg', {
        id: 'otaku-svg', role: 'application',
        'aria-roledescription': 'interactive map',
        'aria-label': 'Map of the otaku Japan route, Tokyo to Awaji'
      });
      measureRoute();
      drawTrails();
      buildPins();
      wrap.appendChild(svg);

      Object.keys(DATA.legs)
        .sort((a, b) => DATA.legs[a].order - DATA.legs[b].order)
        .forEach(k => {
          const o = document.createElement('option');
          o.value = k;
          o.textContent = DATA.legs[k].label;
          legSel.appendChild(o);
        });

      centerMap();
      reclusterPins();
      renderList();
      setMapTitle(DATA.meta.title || '');
      statusEl.textContent = `${stops(DATA.spots.length)} across ${Object.keys(DATA.legs).length} legs. Drag to explore, click a pin.`;

      // A shared link restores one state: spot focus wins over leg view.
      const params = new URLSearchParams(location.search);
      const spotParam = params.get('spot');
      if (spotParam && DATA.spots.some(x => x.id === spotParam)) {
        selectSpot(spotParam); // sets userHoldsCamera — the beats won't yank it
      } else if (params.get('leg') && DATA.legs[params.get('leg')]) {
        legSel.value = params.get('leg');
        activeLeg = params.get('leg');
        renderList();
        reclusterPins();
        glideTo(() => zoomToLeg(activeLeg));
      }
    })
    .catch(e => {
      statusEl.textContent = 'Could not load map data.';
      console.error(e);
    });
})();
