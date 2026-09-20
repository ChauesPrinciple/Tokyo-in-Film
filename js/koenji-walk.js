(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const svg = $('koenji-map');
  const normalize = text => String(text).normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase();
  const NS = 'http://www.w3.org/2000/svg';
  const radians = Math.PI / 180;
  const radius = 6378137 * Math.cos(35.70 * radians);
  const mercator = lat => Math.log(Math.tan(Math.PI / 4 + lat * radians / 2));
  const originY = mercator(35.70);
  const project = (lng, lat) => [(lng - 139.65) * radians * radius, -(mercator(lat) - originY) * radius];
  const camera = {x: 0, y: 0, width: 4000};
  let spots = [], visible = [], selected = '', world, streetsLayer, markers, sections = [], savedPrint = null;
  let markerNodes = new Map(), branch = '', dataRef = {}, startSpot = null, contextLayer;
  let width = 800, height = 600, ready = false;
  let frame = 0;
  let lastSection = '', lastWhen = '';
  const pointers = new Map();
  let gesture = null, suppressClick = false;
  const DATA_VERSION = '20260921z';
  const STORAGE_KEY = 'koenji-walk-state';
  const BEEN_KEY = 'koenji-been-here';
  let beenHere = new Set();

  function el(tag, attrs = {}, text) {
    const node = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function html(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function link(label, url) {
    const node = html('a', 'shop-link', label);
    node.href = url;
    node.target = '_blank';
    node.rel = 'noopener noreferrer';
    return node;
  }

  function mapUrl(place) {
    return place.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
  }

  async function getJSON(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Unable to load ${url}`);
    return response.json();
  }

  // --- State persistence ---

  function loadState() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const state = JSON.parse(raw);
        if (state.camera) Object.assign(camera, state.camera);
        if (state.selected) selected = state.selected;
        if (state.branch) branch = state.branch;
      }
      const been = localStorage.getItem(BEEN_KEY);
      if (been) beenHere = new Set(JSON.parse(been));
    } catch (e) { /* ignore corrupt state */ }
  }

  function saveState() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({camera, selected, branch}));
    } catch (e) { /* ignore */ }
  }

  function saveBeen() {
    try {
      localStorage.setItem(BEEN_KEY, JSON.stringify([...beenHere]));
    } catch (e) { /* ignore */ }
  }

  function toggleBeen(id) {
    if (beenHere.has(id)) beenHere.delete(id);
    else beenHere.add(id);
    saveBeen();
    const card = $(`shop-${id}`);
    if (card) {
      const btn = card.querySelector('.been-toggle');
      if (btn) {
        const on = beenHere.has(id);
        btn.classList.toggle('is-on', on);
        btn.setAttribute('aria-pressed', String(on));
        btn.textContent = on ? '✓ Been here' : 'Mark as visited';
      }
    }
    render();
  }

  // --- Geography ---

  function geography() {
    world = el('g', {'aria-hidden': 'true'});
    contextLayer = el('g', {id: 'koenji-context'});
    streetsLayer = el('g', {id: 'koenji-streets'});
    markers = el('g', {id: 'koenji-markers'});
    svg.append(world, contextLayer, streetsLayer, markers);
  }

  // The ring of trunk roads, rail and neighbouring stations that only matters
  // once you zoom past Koenji itself. Without it the map runs out of world.
  function renderContext(data) {
    contextLayer.replaceChildren();
    const order = {ctxroad: 0, ctxmajor: 1, ctxrail: 2};
    const lines = [...(data.context || [])].sort((a, b) => (order[a.k] ?? 9) - (order[b.k] ?? 9));
    const paths = el('g');
    lines.forEach(line => {
      const pts = line.c.map(([lng, lat]) => project(lng, lat));
      if (pts.length < 2) return;
      const dd = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('');
      paths.append(el('path', {d: dd, fill: 'none', 'vector-effect': 'non-scaling-stroke',
                               class: `ctx-line ctx-${line.k.slice(3)}`}));
    });
    const stops = el('g', {id: 'context-stations'});
    (data.stations || []).forEach(st => {
      const [x, y] = project(st.c[0], st.c[1]);
      const g = el('g', {class: 'ctx-station'});
      g.append(el('circle', {cx: x, cy: y, r: 3, class: 'ctx-station-dot'}));
      g.append(el('text', {x: x + 6, y: y + 1, class: 'ctx-station-name'}, st.n));
      stops.append(g);
    });
    contextLayer.append(paths, stops);
  }

  // Named streets carry their own identity: colour = which street you are on.
  const STREETS = {
    '高円寺パル商店街': {slug: 'pal',    label: 'Pal Shōtengai',    short: 'Pal St'},
    '高円寺ルック':             {slug: 'look',   label: 'Look Shōtengai',   short: 'Look St'},
    'エトアール通り':       {slug: 'etoile', label: 'Etoile-dōri',      short: 'Etoile'},
    '高南通り':                         {slug: 'konan',  label: 'Kōnan-dōri', short: 'Kōnan'},
    '純情商店街':                   {slug: 'junjo',  label: 'Junjō Shōtengai', short: 'Junjō St'}
  };
  // Each section of the walk borrows the colour of the street it runs along.
  const SECTION_STREET = {
    start: 'start', station: 'junjo', daiichi: 'daiichi', pal: 'pal', etoile: 'etoile',
    look: 'look', 'konan-dori': 'konan', hikawa: 'shrine'
  };
  // Shape carries what kind of place it is. Four glyphs, nothing else.
  const KIND = {day: 'shop', refuel: 'food', night: 'night', shrine: 'shrine', start: 'start'};

  function streetOf(spot) { return spot.street || SECTION_STREET[spot.section] || 'other'; }
  function kindOf(spot) { return KIND[spot.daypart] || 'shop'; }

  const pathLengths = new Map();
  function streetPathLength(id) {
    if (!id) return 0;
    if (!pathLengths.has(id)) {
      const node = $(id);
      pathLengths.set(id, node ? node.getTotalLength() : 0);
    }
    return pathLengths.get(id);
  }

  function renderStreets(data) {
    const layer = streetsLayer;
    layer.replaceChildren();
    pathLengths.clear();
    const order = {foot: 0, street: 1, tertiary: 2, major: 3, rail: 4, shopping: 5, route: 6};
    const sorted = [...data.lines].sort((a, b) => (order[a.k] ?? 9) - (order[b.k] ?? 9));
    const paths = el('g');
    const labels = el('g', {id: 'street-labels'});
    const defs = el('defs');
    const labelled = new Map();
    sorted.forEach((line, i) => {
      const points = line.c.map(([lng, lat]) => project(lng, lat));
      if (points.length < 2) return;
      const d = points.map(([x, y], n) => `${n ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('');
      const street = STREETS[line.n];
      const slug = street ? street.slug : '';
      paths.append(el('path', {
        d, fill: 'none', 'vector-effect': 'non-scaling-stroke',
        class: `street-line street-${line.k}${slug ? ` street-is-${slug}` : ''}`
      }));
      // A named street reads as a corridor you walk down: soft band, crisp centre.
      if (slug) {
        paths.append(el('path', {
          d, fill: 'none', 'vector-effect': 'non-scaling-stroke',
          class: `street-line street-core street-is-${slug}`
        }));
      }
      // Label the route streets along their own longest run, the way a map does it.
      if (!street) return;
      const span = Math.hypot(points[points.length - 1][0] - points[0][0],
                              points[points.length - 1][1] - points[0][1]);
      const best = labelled.get(street.slug);
      if (!best || span > best.span) labelled.set(street.slug, {span, d, i, street, points});
    });
    labelled.forEach(entry => {
      // Run the label left-to-right so the text never reads upside down.
      const [a, b] = [entry.points[0], entry.points[entry.points.length - 1]];
      const forward = b[0] >= a[0] ? entry.points : [...entry.points].reverse();
      const d = forward.map(([x, y], n) => `${n ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('');
      const id = `street-path-${entry.street.slug}`;
      defs.append(el('path', {id, d, fill: 'none'}));
      const text = el('text', {class: `street-label street-label-${entry.street.slug}`});
      text.dataset.path = id;
      const tp = document.createElementNS(NS, 'textPath');
      tp.setAttribute('startOffset', '50%');
      tp.setAttribute('text-anchor', 'middle');
      tp.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${id}`);
      tp.setAttribute('href', `#${id}`);
      tp.textContent = entry.street.label;
      text.dataset.long = entry.street.label;
      text.dataset.short = entry.street.short || entry.street.label;
      text.append(tp);
      labels.append(text);
    });
    // The walk itself, drawn over the streets: casing, then core. This is the
    // line the page is named after and it outranks every other stroke.
    const walk = el('g', {id: 'walk-route'});
    (data.walk || []).forEach(leg => {
      const pts = leg.c.map(([lng, lat]) => project(lng, lat));
      if (pts.length < 2) return;
      const dd = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join('');
      const branch = leg.leg === 'mabashi' || leg.leg === 'hikawa';
      const g = el('g', {class: `walk-leg walk-${leg.leg}${branch ? ' is-branch' : ''}`, 'data-leg': leg.leg});
      g.append(el('path', {d: dd, class: 'walk-casing', fill: 'none', 'vector-effect': 'non-scaling-stroke'}));
      g.append(el('path', {d: dd, class: 'walk-core', fill: 'none', 'vector-effect': 'non-scaling-stroke'}));
      walk.append(g);
    });
    layer.append(defs, paths, walk, labels);
  }
  function fit(places = visible) {
    if (!places.length) { render(); return; }
    const xs = places.map(s => s.point[0]), ys = places.map(s => s.point[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    camera.x = (minX + maxX) / 2;
    camera.y = (minY + maxY) / 2;
    const pad = 300;
    camera.width = Math.max(maxX - minX + pad, (maxY - minY + pad) * width / height, 1300);
    render();
  }

  function screen(point) {
    const scale = width / camera.width;
    return [(point[0] - camera.x) * scale + width / 2, (point[1] - camera.y) * scale + height / 2];
  }

  function updateSelection() {
    document.querySelectorAll('.shop-card').forEach(card => {
      const active = card.id === `shop-${selected}`;
      card.classList.toggle('is-selected', active);
      const btn = card.querySelector('.shop-select');
      if (btn) btn.setAttribute('aria-pressed', String(active));
    });
  }

  function select(spot, fromList = false) {
    selected = spot.id;
    svg.classList.add('has-selection');
    const [x, y] = screen(spot.point);
    if (fromList || x < 30 || y < 30 || x > width - 30 || y > height - 30) {
      camera.x = spot.point[0];
      camera.y = spot.point[1];
      camera.width = Math.min(camera.width, 2000);
    }
    saveState();
    updateSelection();
    if (!fromList) scrollToCard(spot.id);
    const been = beenHere.has(spot.id) ? ' · ✓ visited' : '';
    $('map-status').textContent = `${spot.number}. ${spot.name} — ${spot.style}, Koenji${been}`;
    render();
  }

  function scrollToCard(id) {
    const card = $(`shop-${id}`);
    if (!card) return;
    const panel = document.querySelector('.list-panel');
    const wide = window.matchMedia('(min-width: 1041px)').matches;
    if (!wide || !panel) { card.scrollIntoView({block: 'start', behavior: 'smooth'}); return; }
    const controls = panel.querySelector('.list-controls');
    const header = controls ? controls.getBoundingClientRect().height : 0;
    panel.scrollTo({top: card.offsetTop - panel.offsetTop - header - 10, behavior: 'smooth'});
  }

  // Pin radius grows as you zoom in; at walking zoom the marks are full size.
  function pinRadius() {
    return Math.max(8, Math.min(15, 26000 / camera.width));
  }

  // Keep every pin ON its place. Nudge overlapping pins apart by a few pixels
  // and no more - a badge that drifts across the map stops being a location.
  // O(n^2) over visible markers. Fine at ~37; if this engine is ever reused for
  // a city-wide set, bucket the nodes into a grid before porting it.
  function layoutMarkers(places, r) {
    const nodes = places.map(p => {
      const [x, y] = screen(p.point);
      return {spot: p, x, y, ox: x, oy: y};
    });
    const gap = r * 2 + 1;
    const maxOffset = Math.min(18, r * 1.4);
    for (let pass = 0; pass < 24; pass++) {
      let moved = false;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          let dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy);
          if (d >= gap) continue;
          if (d < 0.01) { dx = Math.cos(i * 2.4); dy = Math.sin(i * 2.4); d = 1; }
          const push = (gap - d) / (2 * d);
          a.x -= dx * push; a.y -= dy * push;
          b.x += dx * push; b.y += dy * push;
          moved = true;
        }
      }
      for (const n of nodes) {
        const dx = n.x - n.ox, dy = n.y - n.oy, d = Math.hypot(dx, dy);
        if (d > maxOffset) { n.x = n.ox + dx / d * maxOffset; n.y = n.oy + dy / d * maxOffset; }
        n.x = Math.max(r + 2, Math.min(width - r - 2, n.x));
        n.y = Math.max(r + 2, Math.min(height - r - 2, n.y));
      }
      if (!moved) break;
    }
    return nodes;
  }

  function glyph(kind, r) {
    if (kind === 'food') {
      return el('rect', {x: -r * 0.92, y: -r * 0.92, width: r * 1.84, height: r * 1.84,
                         rx: r * 0.28, class: 'marker-shape'});
    }
    if (kind === 'night') {
      const k = r * 1.2;
      return el('path', {d: `M0,${-k}L${k},0L0,${k}L${-k},0Z`, class: 'marker-shape'});
    }
    return el('circle', {r, class: 'marker-shape'});
  }

  // Built once per place, then moved. Rebuilding 32 groups per pan frame was
  // the thing that stuttered on a phone.
  function buildMarker(spot) {
    const kind = kindOf(spot);
    const shrine = kind === 'shrine';
    const r = shrine ? 15 : 13;
    const g = el('g', {
      class: `map-marker kind-${kind} street-${streetOf(spot)}${spot.approximate ? ' is-approximate' : ''}`,
      'data-shop': spot.id, tabindex: 0, role: 'button'
    });
    const title = el('title');
    const leader = el('line', {x1: 0, y1: 0, x2: 0, y2: 0, class: 'marker-leader'});
    const hit = el('circle', {r: Math.max(20, r + 7), fill: 'transparent', class: 'marker-hit'});
    g.append(title, leader, hit);
    let shape, num = null, badge = null, check = null;
    if (shrine) {
      g.append(el('circle', {r: r + 5, class: 'marker-halo'}));
      shape = el('circle', {r, class: 'marker-shape'});
      g.append(shape, el('path', {
        d: 'M-8.4,-6.4 h16.8 M-10,-3.2 h20 M-5.4,-3.2 v10 M5.4,-3.2 v10',
        class: 'marker-torii'
      }));
    } else if (kind === 'start') {
      shape = el('circle', {r: r + 1, class: 'marker-shape'});
      g.append(shape, el('circle', {r: r - 4.5, class: 'marker-hole'}));
    } else {
      shape = glyph(kind, r);
      num = el('text', {class: 'marker-number', 'text-anchor': 'middle', 'dominant-baseline': 'central'}, spot.number);
      badge = el('circle', {cx: r - 2, cy: -r + 2, r: 6, class: 'been-badge'});
      check = el('text', {x: r - 2, y: -r + 2, class: 'been-check', 'text-anchor': 'middle', 'dominant-baseline': 'central'}, '✓');
      g.append(shape, num, badge, check);
    }
    g.addEventListener('click', () => { if (!suppressClick) select(spot); });
    g.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); select(spot); }
    });
    const node = {g, title, leader, shape, num, badge, check, baseR: r, shrine};
    markerNodes.set(spot.id, node);
    markers.append(g);
    return node;
  }

  function render() {
    if (!world) return;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const scale = width / camera.width;
    const shift = `translate(${width / 2 - camera.x * scale} ${height / 2 - camera.y * scale}) scale(${scale})`;
    world.setAttribute('transform', shift);
    streetsLayer.setAttribute('transform', shift);
    if (contextLayer) {
      contextLayer.setAttribute('transform', shift);
      // The default view of the walk is already ~2600m across, so context must
      // not appear until you have deliberately zoomed out past the neighbourhood.
      const wide = camera.width;
      const show = wide > 3400;
      contextLayer.style.display = show ? '' : 'none';
      if (show) {
        contextLayer.style.opacity = Math.min(1, (wide - 3400) / 1800).toFixed(2);
        const names = $('context-stations');
        if (names) {
          const k = 1 / scale;
          names.style.fontSize = (11 * k).toFixed(2) + 'px';
          names.style.display = wide > 4200 ? '' : 'none';
          names.querySelectorAll('circle').forEach(c => c.setAttribute('r', (3 * k).toFixed(2)));
          names.querySelectorAll('text').forEach(t => t.setAttribute('x',
            (parseFloat(t.getAttribute('x')) || 0)));
        }
      }
    }
    // Footpaths turn to mush once you are looking at more than the neighbourhood.
    svg.classList.toggle('is-wide', camera.width > 3400);
    // Labels live in the scaled street layer, so counter-scale their type or
    // they shrink away with the map.
    const labels = $('street-labels');
    if (labels) {
      const k = 1 / scale;
      labels.style.strokeWidth = (3.5 * k).toFixed(2) + 'px';
      const dy = (-7 * k).toFixed(2);
      labels.querySelectorAll('text').forEach(t => {
        t.setAttribute('dy', dy);
        // Shrink a name that outruns its street, and drop it if it still will not fit.
        const room = streetPathLength(t.dataset.path) * 0.92;
        const tp = t.firstChild;
        let size = 11.5;
        if (room) {
          // Prefer the full name; fall back to the short form before shrinking type.
          tp.textContent = t.dataset.long;
          t.style.fontSize = (size * k).toFixed(2) + 'px';
          if (t.getComputedTextLength() > room) {
            tp.textContent = t.dataset.short;
            const drawn = t.getComputedTextLength();
            if (drawn > room) size = Math.max(7.5, size * room / drawn);
          }
        }
        t.style.fontSize = (size * k).toFixed(2) + 'px';
        t.style.display = '';
      });
    }

    const r = pinRadius();
    const shown = visible.filter(s => s.daypart !== 'area');
    const laid = layoutMarkers(shown, r);
    const live = new Set();
    laid.forEach(n => {
      const spot = n.spot;
      live.add(spot.id);
      const node = markerNodes.get(spot.id) || buildMarker(spot);
      const onScreen = n.ox >= -40 && n.oy >= -40 && n.ox <= width + 40 && n.oy <= height + 40;
      node.g.style.display = onScreen ? '' : 'none';
      if (!onScreen) return;
      const been = beenHere.has(spot.id);
      const dim = branch && spot.branch && spot.branch !== branch;
      const k = r / node.baseR;
      node.g.setAttribute('transform', `translate(${n.x.toFixed(1)} ${n.y.toFixed(1)}) scale(${k.toFixed(3)})`);
      node.g.classList.toggle('is-selected', selected === spot.id);
      node.g.classList.toggle('is-been', been);
      node.g.classList.toggle('is-muted', !!dim);
      node.g.setAttribute('aria-pressed', String(selected === spot.id));
      node.g.setAttribute('aria-label',
        `${spot.number}. ${spot.name}, ${spot.style}, Koenji.${been ? ' Visited.' : ''} Show place details.`);
      node.title.textContent = `${spot.number}. ${spot.name}${been ? ' ✓' : ''}`
        + (spot.closedDays ? ` — closed ${spot.closedDays}` : '');
      // Leader only when the pin actually had to move off its point.
      const dx = (n.ox - n.x) / k, dy = (n.oy - n.y) / k;
      const off = Math.hypot(dx, dy);
      const needs = off > node.baseR;
      node.leader.style.display = needs ? '' : 'none';
      if (needs) {
        node.leader.setAttribute('x2', dx.toFixed(1));
        node.leader.setAttribute('y2', dy.toFixed(1));
      }
    });
    markerNodes.forEach((node, id) => { if (!live.has(id)) node.g.style.display = 'none'; });

    const distance = [50, 100, 200, 500, 1000, 2000].filter(value => value * scale <= 110).pop() || 50;
    $('scale-bar').replaceChildren();
    const bar = html('span');
    bar.style.cssText = `display:block;width:${distance * scale}px;border:solid currentColor;border-width:0 1px 2px;height:5px;margin-bottom:5px`;
    $('scale-bar').append(bar, document.createTextNode(distance >= 1000 ? `${distance / 1000} km` : `${distance} m`));
  }

  function scheduleRender() {
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = 0; render(); });
  }

  function resize() {
    const rect = svg.getBoundingClientRect();
    width = Math.max(280, rect.width);
    height = Math.max(200, rect.height);
    if (savedPrint) fit(spots);
    else render();
  }

  function zoom(factor, anchor = [width / 2, height / 2]) {
    const old = camera.width;
    camera.width = Math.min(9500, Math.max(600, old * factor));
    camera.x += (anchor[0] - width / 2) * (old - camera.width) / width;
    camera.y += (anchor[1] - height / 2) * (old - camera.width) / width;
    saveState();
    render();
  }

  function filter(refit = false) {
    const query = normalize($('shop-search').value.trim());
    const section = $('section-filter').value;
    const when = $('when-filter').value;
    // Choosing the evening implies the evening palette; the toggle can still
    // override it either way.
    const sectionChanged = section !== lastSection || when !== lastWhen;
    lastSection = section;
    lastWhen = when;
    const inWhen = s => !when
      || (when === 'day' && (s.daypart === 'day' || s.daypart === 'refuel'))
      || (when === 'night' && (s.daypart === 'night' || s.daypart === 'shrine'));
    visible = spots.filter(s => s.daypart === 'start' ||
      ((!section || s.section === section) && inWhen(s) && s.haystack.includes(query)));
    const ids = new Set(visible.map(s => s.id));
    spots.forEach(s => { const c = $(`shop-${s.id}`); if (c) c.hidden = !ids.has(s.id); });
    $('empty-state').hidden = visible.length > 0;
    const walkable = s => s.daypart !== 'area' && s.daypart !== 'start';
    $('shop-count').textContent = `${visible.filter(walkable).length} / ${spots.filter(walkable).length}`;
    $('map-status').textContent = visible.length ? `${visible.filter(walkable).length} places shown.` : 'No matching places. Clear the search or choose another section.';
    // Hide section headers with no visible cards
    sections.forEach(sec => {
      const header = $(`section-${sec.id}`);
      if (!header) return;
      const hasShops = visible.some(s => s.section === sec.id && s.daypart === 'day');
      const hasBreak = (dataRef.breaks || []).some(b => b.after === sec.id
        && visible.some(s => s.break === b.id));
      header.classList.toggle('is-hidden', !hasShops && !hasBreak);
    });
    (dataRef.breaks || []).forEach(meta => {
      const block = $(`break-${meta.id}`);
      if (block) block.classList.toggle('is-hidden',
        !visible.some(s => s.break === meta.id));
    });
    const endingsHead = $('section-endings');
    const endingsBlock = document.querySelector('.endings');
    const showEndings = visible.some(s => s.daypart === 'shrine');
    if (endingsHead) endingsHead.classList.toggle('is-hidden', !showEndings);
    if (endingsBlock) endingsBlock.classList.toggle('is-hidden', !showEndings);
    const nightShown = visible.filter(s => s.daypart === 'night');
    const nightHead = $('section-night');
    if (nightHead) nightHead.classList.toggle('is-hidden', !nightShown.length);
    (dataRef.branches || []).forEach(meta => {
      const group = $(`night-${meta.id}`);
      if (group) group.classList.toggle('is-hidden', !nightShown.some(s => s.branch === meta.id));
    });
    if (!ids.has(selected)) {
      selected = '';
      document.querySelectorAll('.shop-card.is-selected').forEach(card => {
        card.classList.remove('is-selected');
        const btn = card.querySelector('.shop-select');
        if (btn) btn.setAttribute('aria-pressed', 'false');
      });
    }
    svg.classList.toggle('has-selection', !!selected);
    // Filters changed which anchors are on screen, so the clock must re-read them.
    clockAnchors = null;
    // Only refit on section change or explicit request, not on every keystroke
    if (visible.length && (refit || sectionChanged)) fit();
    else render();
  }

  const KIND_LABEL = {shop: 'Vintage & shops', food: 'Coffee, lunch & snacks', night: 'Bars & live houses', shrine: 'Shrine', start: 'Start'};
  const STREET_LABEL = {
    start: 'Station front', junjo: 'North side', daiichi: 'Daiichi Market', pal: 'Pal arcade',
    etoile: 'Etoile-dōri', look: 'Look Shōtengai', konan: 'Kōnan-dōri', shrine: 'Shrine'
  };

  // ---- Time of day -------------------------------------------------------
  // Scrolling the walk is scrolling the day: the station in the morning, the
  // market at lunch, the shrine at dusk, the live houses after dark. The page
  // grades continuously rather than flipping.
  // The walk starts at sunrise and ends after dark. Midday is deliberately
  // brief - you are only under a high sun for the middle of the arcade.
  const PHASES = [
    {t: 0.00, name: 'Morning',
     tok: {paper: '#2a1e15', panel: '#38291c', sea: '#302418', land: '#35271a', line: '#4d3724',
           ink: '#fbeeda', inkSoft: '#d8c2a0', muted: '#a3896b', signboard: '#e8593c', gold: '#f0b444',
           stFoot: '#3c2e20', stStreet: '#463626', stMajor: '#5b4731', stRail: '#6c553b',
           walk: '#fbeeda', breakBg: '#342719', breakLine: '#4d3724', breakInk: '#e3c391'},
     sky: ['#243b5e', '#6a7f96', '#d99a5e']},
    {t: 0.20, name: 'Late morning',
     tok: {paper: '#2f2317', panel: '#3e2e1f', sea: '#35291b', land: '#3a2c1d', line: '#523c28',
           ink: '#fdf2e0', inkSoft: '#ddc8a6', muted: '#a88e70', signboard: '#ec5f3e', gold: '#f5bc4a',
           stFoot: '#413323', stStreet: '#4b3b29', stMajor: '#614c35', stRail: '#735b3f',
           walk: '#fdf2e0', breakBg: '#392b1d', breakLine: '#523c28', breakInk: '#e8c996'},
     sky: ['#2a62a0', '#83a6c2', '#f2c27c']},
    {t: 0.38, name: 'Midday',
     tok: {paper: '#33291a', panel: '#43371f', sea: '#3a301d', land: '#3f3420', line: '#5a4a2a',
           ink: '#fff8e4', inkSoft: '#e2d1a8', muted: '#af9a70', signboard: '#f06a42', gold: '#ffd257',
           stFoot: '#483b25', stStreet: '#53452c', stMajor: '#6b5938', stRail: '#7d6942',
           walk: '#fff8e4', breakBg: '#3d321f', breakLine: '#5a4a2a', breakInk: '#f0d69c'},
     sky: ['#2f7fc4', '#8fc0dd', '#ffe89a']},
    {t: 0.56, name: 'Afternoon',
     tok: {paper: '#2f2016', panel: '#3e2b1d', sea: '#35241a', land: '#3a281c', line: '#563a26',
           ink: '#fdedd8', inkSoft: '#dcbd9c', muted: '#a88865', signboard: '#f05f3a', gold: '#ffbc4d',
           stFoot: '#43301f', stStreet: '#4e3925', stMajor: '#664b2f', stRail: '#785938',
           walk: '#fdedd8', breakBg: '#39271b', breakLine: '#563a26', breakInk: '#eabd8c'},
     sky: ['#3a6fae', '#a48ba8', '#ffb45e']},
    {t: 0.72, name: 'Dusk',
     tok: {paper: '#26142a', panel: '#341d38', sea: '#2c1830', land: '#301a34', line: '#4a2749',
           ink: '#fbe3ea', inkSoft: '#d2a6bb', muted: '#9c7789', signboard: '#ff5f66', gold: '#ffab5c',
           stFoot: '#361d37', stStreet: '#3e2440', stMajor: '#533053', stRail: '#623a61',
           walk: '#fbe3ea', breakBg: '#2d1830', breakLine: '#4a2749', breakInk: '#dea9b6'},
     sky: ['#1a1038', '#7b2a5c', '#ff6a3a']},
    {t: 0.88, name: 'Nightfall',
     tok: {paper: '#140f1e', panel: '#1e172c', sea: '#110d1a', land: '#181226', line: '#2f2545',
           ink: '#efe8fa', inkSoft: '#b8adcf', muted: '#867c9d', signboard: '#ff5468', gold: '#ffc766',
           stFoot: '#241d36', stStreet: '#2b2340', stMajor: '#3c3257', stRail: '#493d68',
           walk: '#efe8fa', breakBg: '#1d1730', breakLine: '#2f2545', breakInk: '#c4b6dd'},
     sky: ['#0a0718', '#1d1440', '#4a2a63']},
    {t: 1.00, name: 'After hours',
     tok: {paper: '#0c0b10', panel: '#15131d', sea: '#0a0910', land: '#121019', line: '#272338',
           ink: '#eae7f3', inkSoft: '#aba4c2', muted: '#7d7591', signboard: '#ff4d5e', gold: '#ffd166',
           stFoot: '#1c1a28', stStreet: '#232030', stMajor: '#363146', stRail: '#423b56',
           walk: '#eae7f3', breakBg: '#17141f', breakLine: '#282238', breakInk: '#bbb0d2'},
     sky: ['#05040a', '#0d0a1a', '#1f1733']}
  ];

  // Time is anchored to the places, not to pixels: each stretch of the walk
  // owns a slice of the day. Night starts at the dinner break.
  const WALK_CLOCK = {
    'origin': 0.00,            // arrive at the station at first light
    'section-station': 0.08,
    'break-first': 0.20,       // morning coffee at the top of Junjo
    'section-daiichi': 0.30,
    'break-lunch': 0.38,       // midday, and a short block so it passes fast
    'section-pal': 0.46,
    'break-kissa': 0.56,       // afternoon, long and slow in the arcade
    'section-etoile': 0.66,
    'break-late': 0.72,        // dinner - the light starts going
    'section-look': 0.82,
    'section-konan-dori': 0.87,
    'section-endings': 0.90,
    'section-night': 0.96,
    'night-mabashi': 0.98,
    'night-hikawa': 1.00
  };

  // Street identity warms at midday and goes electric after dark.
  const STREET_DAY = {junjo: '#e0685a', daiichi: '#a58e6e', pal: '#e0a340', etoile: '#d98aa8',
                      look: '#6f9ad6', konan: '#ae8cc9', shrine: '#ff6a48', start: '#93a7b7'};
  const STREET_NIGHT = {junjo: '#ff6b7a', daiichi: '#9089ac', pal: '#ffb54d', etoile: '#e88ad4',
                        look: '#5fa8ff', konan: '#bd8cff', shrine: '#ff5a3c', start: '#92b3cb'};

  const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const mix = (a, b, k) => {
    const A = hex(a), B = hex(b);
    return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, '0')).join('');
  };

  function phaseAt(t) {
    let i = 0;
    while (i < PHASES.length - 2 && t > PHASES[i + 1].t) i += 1;
    const a = PHASES[i], b = PHASES[i + 1];
    const k = b.t === a.t ? 0 : Math.max(0, Math.min(1, (t - a.t) / (b.t - a.t)));
    return {a, b, k};
  }

  const VARS = {paper: '--paper', panel: '--panel', sea: '--sea', land: '--land', line: '--line',
                ink: '--ink', inkSoft: '--ink-soft', muted: '--muted', signboard: '--signboard',
                gold: '--gold', stFoot: '--st-foot', stStreet: '--st-street', stMajor: '--st-major',
                stRail: '--st-rail', walk: '--walk-core', breakBg: '--break-bg',
                breakLine: '--break-line', breakInk: '--break-ink'};

  function applyTime(t) {
    const {a, b, k} = phaseAt(t);
    const root = document.documentElement;
    Object.entries(VARS).forEach(([key, cssVar]) => {
      if (a.tok[key] && b.tok[key]) root.style.setProperty(cssVar, mix(a.tok[key], b.tok[key], k));
    });
    // Derived tokens that follow the ground.
    const paper = mix(a.tok.paper, b.tok.paper, k);
    const ink = mix(a.tok.ink, b.tok.ink, k);
    root.style.setProperty('--land-line', mix(a.tok.line, b.tok.line, k));
    root.style.setProperty('--accent', ink);
    root.style.setProperty('--accent-ink', ink);
    root.style.setProperty('--st-tertiary', mix(a.tok.stStreet, b.tok.stMajor, 0.5));
    root.style.setProperty('--st-shopping', mix(a.tok.stStreet, b.tok.stMajor, 0.4));
    const sb = mix(a.tok.signboard, b.tok.signboard, k);
    root.style.setProperty('--mark', sb);
    root.style.setProperty('--mark-ink', mix(sb, '#ffffff', 0.35));
    root.style.setProperty('--mark-soft', mix(paper, sb, 0.2));
    root.style.setProperty('--transit', mix(a.tok.muted, b.tok.muted, k));
    // After dusk the daytime places are shut; let the map say so.
    root.style.setProperty('--day-fade', (1 - Math.max(0, Math.min(1, (t - 0.72) / 0.26)) * 0.62).toFixed(3));
    root.style.setProperty('--ctx-road', mix(a.tok.stFoot, b.tok.stFoot, k));
    root.style.setProperty('--ctx-major', mix(a.tok.stMajor, b.tok.stMajor, k));
    root.style.setProperty('--ctx-rail', mix(a.tok.stRail, b.tok.stRail, k));
    root.style.setProperty('--ctx-station', mix(a.tok.muted, b.tok.muted, k));
    // Street identity: warm by day, electric after dark.
    const night = Math.max(0, Math.min(1, (t - 0.62) / 0.32));
    Object.keys(STREET_DAY).forEach(slug => {
      root.style.setProperty('--' + slug, mix(STREET_DAY[slug], STREET_NIGHT[slug], night));
    });
    // Sky and the thing crossing it.
    const sky = $('sky');
    if (sky) {
      const s0 = mix(a.sky[0], b.sky[0], k), s1 = mix(a.sky[1], b.sky[1], k), s2 = mix(a.sky[2], b.sky[2], k);
      sky.style.background = `linear-gradient(180deg, ${s0} 0%, ${s1} 52%, ${s2} 100%)`;
    }
    // The arc stays in the band of sky the page actually leaves visible - above
    // and beside the map panel. Any lower and it just hides behind the map.
    const dawn = $('dawn-glow');
    if (dawn) dawn.style.opacity = Math.max(0, 1 - t / 0.19).toFixed(3);
    // A real arc across the whole height: up out of the morning, over the top,
    // down into the evening. You catch it in the gutter between the two panes
    // and as a bloom through them.
    const sun = $('sun'), moon = $('moon');
    if (sun) {
      const st = Math.max(0, Math.min(1, t / 0.80));
      const angle = (0.22 + st * 0.78) * Math.PI;   // already risen when the walk starts
      sun.style.left = (4 + st * 92).toFixed(1) + '%';
      sun.style.top = (90 - Math.sin(angle) * 78).toFixed(1) + '%';
      sun.style.opacity = (t < 0.70 ? 1 : Math.max(0, 1 - (t - 0.70) / 0.13)).toFixed(2);
      sun.style.background = mix('#ffd98c', '#ff6a2c', Math.min(1, Math.abs(st - 0.5) * 2.1));
    }
    if (moon) {
      const mt = Math.max(0, Math.min(1, (t - 0.64) / 0.36));
      moon.style.left = (14 + mt * 50).toFixed(1) + '%';
      moon.style.top = (92 - Math.sin(mt * 0.56 * Math.PI) * 64).toFixed(1) + '%';
      moon.style.opacity = (t < 0.66 ? 0 : Math.min(1, (t - 0.66) / 0.15)).toFixed(2);
    }
    const label = $('mode-label');
    if (label) label.textContent = phaseName(t);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', paper);
    timeNow = t;
  }

  function phaseName(t) {
    const {a, b, k} = phaseAt(t);
    return k < 0.5 ? a.name : b.name;
  }

  // Time comes from the places going past, not from a pixel fraction: each
  // stretch of the walk owns a slice of the day, so a long section of shops
  // does not rush the sun and a short one does not stall it.
  let clockAnchors = null;
  function buildClock() {
    const list = $('shop-list');
    if (!list) return [];
    const rows = [];
    Object.entries(WALK_CLOCK).forEach(([id, t]) => {
      const node = id === 'origin' ? list.querySelector('.origin') : $(id);
      // A display:none node reports top 0, which reads as "above the reference
      // line" and drags the clock to whatever time that anchor holds.
      if (node && node.offsetParent !== null) rows.push({node, t});
    });
    rows.sort((a, b) => a.t - b.t);
    return rows;
  }

  function walkTime() {
    if (!clockAnchors || !clockAnchors.length) clockAnchors = buildClock();
    if (!clockAnchors.length) return 0;
    const panel = document.querySelector('.list-panel');
    const wide = window.matchMedia('(min-width: 1041px)').matches;
    const scroller = wide && panel && panel.scrollHeight > panel.clientHeight + 40 ? panel : null;
    // Reference line: a third of the way down whatever is doing the scrolling.
    const ref = scroller
      ? scroller.getBoundingClientRect().top + scroller.clientHeight * 0.34
      : window.innerHeight * 0.34;
    // At the very top of the walk it is morning, whichever column is scrolling.
    const atTop = scroller ? scroller.scrollTop <= 2 : window.scrollY <= 2;
    if (atTop) return 0;
    let prev = null, next = null;
    for (const row of clockAnchors) {
      const top = row.node.getBoundingClientRect().top;
      if (top <= ref) prev = {t: row.t, top};
      else { next = {t: row.t, top}; break; }
    }
    if (!prev) return 0;
    if (!next) return prev.t;
    const span = next.top - prev.top;
    const k = span > 1 ? Math.max(0, Math.min(1, (ref - prev.top) / span)) : 0;
    return Math.max(0, Math.min(1, prev.t + (next.t - prev.t) * k));
  }
  const scrollTime = walkTime;

  let timeNow = -1, timeLast = 0, timeQueued = false;
  // Driven by scroll events rather than a frame loop: rAF is suspended whenever
  // the page is hidden or backgrounded, and the clock has to survive that.
  // Throttled by timestamp so a fast scroll costs at most one update a frame.
  function scheduleTime() {
    const now = performance.now();
    if (now - timeLast >= 16) {
      timeLast = now;
      const t = scrollTime();
      if (Math.abs(t - timeNow) > 0.0015) applyTime(t);
      return;
    }
    if (timeQueued) return;
    timeQueued = true;
    setTimeout(() => {
      timeQueued = false;
      timeLast = performance.now();
      const t = scrollTime();
      if (Math.abs(t - timeNow) > 0.0015) applyTime(t);
    }, 16);
  }

  function startTime() {
    // Catch every scroller: the window in one column, the list panel in two.
    window.addEventListener('scroll', scheduleTime, {passive: true, capture: true});
    document.addEventListener('scroll', scheduleTime, {passive: true, capture: true});
    window.addEventListener('resize', scheduleTime);
    // A hidden document dispatches no scroll events and runs no frames, so the
    // clock can drift while the tab is in the background. Re-sync on return.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') applyTime(scrollTime());
    });
    window.addEventListener('pageshow', () => applyTime(scrollTime()));
    applyTime(scrollTime());
  }

  function setBranch(next) {
    branch = branch === next ? '' : next;
    document.querySelectorAll('.branch-pick').forEach(btn => {
      const on = btn.dataset.branch === branch;
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    document.querySelectorAll('.ending').forEach(panel => {
      panel.classList.toggle('is-chosen', panel.dataset.branch === branch);
      panel.classList.toggle('is-dimmed', !!branch && panel.dataset.branch !== branch);
    });
    spots.forEach(s => {
      const card = $(`shop-${s.id}`);
      if (card) card.classList.toggle('is-muted', !!branch && !!s.branch && s.branch !== branch);
    });
    (dataRef.branches || []).forEach(meta => {
      const group = $(`night-${meta.id}`);
      if (group) group.classList.toggle('is-muted', !!branch && meta.id !== branch);
      const leg = svg.querySelector(`.walk-leg[data-leg="${meta.id}"]`);
      if (leg) leg.classList.toggle('is-muted', !!branch && meta.id !== branch);
    });
    saveState();
    const chosen = (dataRef.branches || []).find(b => b.id === branch);
    $('map-status').textContent = chosen
      ? `${chosen.heading}. ${chosen.blurb}`
      : 'Both endings shown. Pick one to see the night that goes with it.';
    render();
  }

  function endingPanel(spot, meta) {
    const panel = html('article', 'ending');
    panel.dataset.branch = meta.id;
    panel.id = `shop-${spot.id}`;
    const head = html('button', 'ending-head');
    head.type = 'button';
    head.append(html('span', 'ending-torii', '⛩'), html('span', 'ending-name', spot.name));
    head.addEventListener('click', () => select(spot, true));
    panel.append(head);
    panel.append(html('p', 'ending-heading', meta.heading));
    if (meta.legMetres) {
      panel.append(html('p', 'ending-cost',
        `${meta.legMetres} m from the Look junction · about ${meta.legMinutes} min walk`));
    }
    panel.append(html('p', 'ending-blurb', meta.blurb));
    if (spot.description) panel.append(html('p', 'ending-desc', spot.description));
    const bars = spots.filter(s => s.branch === meta.id && s.daypart === 'night');
    if (bars.length) {
      const list = html('p', 'ending-bars');
      list.append(html('span', 'ending-bars-label', 'The night: '));
      bars.forEach((b, i) => {
        const a = html('button', 'ending-bar', b.name);
        a.type = 'button';
        a.addEventListener('click', () => select(b, true));
        list.append(a);
        if (i < bars.length - 1) list.append(document.createTextNode(' · '));
      });
      panel.append(list);
    }
    const pick = html('button', `branch-pick${branch === meta.id ? ' is-on' : ''}`);
    pick.type = 'button';
    pick.dataset.branch = meta.id;
    pick.setAttribute('aria-pressed', String(branch === meta.id));
    pick.textContent = 'Walk to this one';
    pick.addEventListener('click', e => { e.stopPropagation(); setBranch(meta.id); });
    const links = html('div', 'shop-links');
    links.append(link('Open in Maps', mapUrl(spot)), pick);
    panel.append(links);
    return panel;
  }

  function originPanel(spot) {
    const panel = html('article', 'origin');
    panel.id = `shop-${spot.id}`;
    const head = html('button', 'origin-head');
    head.type = 'button';
    head.append(html('span', 'origin-ring', ''), html('span', '', spot.name));
    head.addEventListener('click', () => select(spot, true));
    panel.append(head);
    panel.append(html('p', 'origin-heading', spot.heading || 'Start'));
    if (spot.blurb) panel.append(html('p', 'origin-blurb', spot.blurb));
    const links = html('div', 'shop-links');
    links.append(link('Open in Maps', mapUrl(spot)));
    panel.append(links);
    return panel;
  }

  function placeCard(spot) {
    const card = html('article', 'shop-card');
    card.id = `shop-${spot.id}`;
    card.dataset.kind = kindOf(spot);
    card.dataset.street = streetOf(spot);
    const button = html('button', 'shop-select');
    button.type = 'button';
    button.setAttribute('aria-pressed', 'false');
    button.append(html('span', `shop-number kind-${kindOf(spot)}`, spot.number), document.createTextNode(spot.name));
    card.append(button);
    const badges = html('div', 'shop-badges');
    badges.append(html('span', `shop-badge badge-kind kind-${kindOf(spot)}`, spot.style || KIND_LABEL[kindOf(spot)]));
    badges.append(spot.offRoute
      ? html('span', 'shop-badge badge-detour', spot.offRoute)
      : html('span', `shop-badge badge-street street-${streetOf(spot)}`, STREET_LABEL[streetOf(spot)]));
    if (spot.closedDays) badges.append(html('span', 'shop-badge is-closed', `Closed ${spot.closedDays}`));
    if (beenHere.has(spot.id)) badges.append(html('span', 'shop-badge is-been', '✓ Visited'));
    card.append(badges);
    if (spot.style) card.append(html('p', 'shop-style', spot.style));
    if (spot.rating) card.append(html('p', 'shop-rating', `★ ${spot.rating}`));
    card.append(html('p', 'shop-address', spot.address));
    if (spot.station && /\d/.test(spot.station)) card.append(html('p', 'shop-station', spot.station));
    if (spot.description) card.append(html('p', 'shop-description', spot.description));
    if (spot.note) card.append(html('p', 'shop-note', spot.note));
    const links = html('div', 'shop-links');
    links.append(link('Open in Maps', mapUrl(spot)));
    (spot.sources || []).forEach(source => links.append(link(source.label, source.url)));
    const been = html('button', `been-toggle${beenHere.has(spot.id) ? ' is-on' : ''}`);
    been.type = 'button';
    been.setAttribute('aria-pressed', String(beenHere.has(spot.id)));
    been.textContent = beenHere.has(spot.id) ? '✓ Been here' : 'Mark as visited';
    been.addEventListener('click', e => { e.stopPropagation(); toggleBeen(spot.id); });
    links.append(been);
    card.append(links);
    card.addEventListener('click', event => {
      if (!event.target.closest('a, button')) select(spot, true);
    });
    return card;
  }

  function sectionHead(id, name, subtitle, slug) {
    const header = html('div', `section-header street-${slug || 'other'}`);
    header.id = `section-${id}`;
    header.append(html('h2', '', name), html('p', '', subtitle));
    return header;
  }

  // A break is a stage of the walk, not a street: where you would actually
  // want to stop, with the food that is nearest at that point.
  function appendBreaks(data, sectionId) {
    (data.breaks || []).filter(b => b.after === sectionId).forEach(meta => {
      const mine = spots.filter(s => s.break === meta.id)
        .sort((a, b) => b.lat - a.lat);
      if (!mine.length) return;
      const block = html('div', 'break-group');
      block.id = `break-${meta.id}`;
      const head = html('div', 'break-head');
      head.append(html('span', 'break-mark', ''), html('h3', 'break-title', meta.title));
      block.append(head);
      if (meta.subtitle) block.append(html('p', 'break-sub', meta.subtitle));
      if (meta.blurb) block.append(html('p', 'break-blurb', meta.blurb));
      mine.forEach(spot => block.append(placeCard(spot)));
      $('shop-list').append(block);
    });
  }

  function cards(data) {
    sections = data.sections;
    const list = $('shop-list');
    if (startSpot) list.append(originPanel(startSpot));

    // The walk runs in daypart order: shopping and eating by street, then the
    // shrine you pick, then the night. A live house has no business sitting
    // between two vintage shops.
    // Route order comes from the section list, not from the numbering - the
    // numbers run roughly north to south and interleave the streets.
    // Within a section, run in the direction you are actually walking: north to
    // south down the spine, east to west along Etoile. Numbering is not the walk.
    const along = sec => sec === 'etoile' ? (x => -x.lng) : (x => -x.lat);
    const shops = spots.filter(x => x.daypart === 'day');
    // Walk the sections in route order. A stretch earns a heading if it has
    // shops OR a break - Etoile is nothing but food, and still part of the walk.
    sections.forEach(sec => {
      const mine = shops.filter(x => x.section === sec.id)
        .sort((a, b) => along(sec.id)(a) - along(sec.id)(b));
      const breaks = (data.breaks || []).filter(b => b.after === sec.id);
      if (!mine.length && !breaks.length) return;
      list.append(sectionHead(sec.id, sec.name, sec.subtitle, SECTION_STREET[sec.id]));
      mine.forEach(spot => list.append(placeCard(spot)));
      appendBreaks(data, sec.id);
    });

    // The two endings: a choice, not a thirty-second stop on a list.
    list.append(sectionHead('endings', 'Choose your ending',
      'Two shrines, two nights — pick by where you want to drink', 'shrine'));
    const endings = html('div', 'endings');
    (data.branches || []).forEach(meta => {
      const spot = spots.find(s => s.number === meta.shrine);
      if (spot) endings.append(endingPanel(spot, meta));
    });
    list.append(endings);

    // The night, grouped by the ending it follows.
    const night = spots.filter(s => s.daypart === 'night');
    if (night.length) {
      list.append(sectionHead('night', 'The night',
        'Bars and live houses — after the shrine, not before it', 'konan'));
      (data.branches || []).forEach(meta => {
        const mine = night.filter(s => s.branch === meta.id);
        const picked = mine.filter(s => s.shortlist !== false);
        if (!picked.length) return;
        const group = html('div', 'night-group');
        group.dataset.branch = meta.id;
        group.id = `night-${meta.id}`;
        group.append(html('p', 'night-label', `After ${meta.name}`));
        picked.forEach(spot => group.append(placeCard(spot)));
        const rest = mine.filter(s => s.shortlist === false);
        if (rest.length) {
          const also = html('p', 'night-also');
          also.append(html('span', 'night-also-label', 'Also on this stretch: '));
          rest.forEach((spot, i) => {
            const b = html('button', 'ending-bar', spot.name);
            b.type = 'button';
            b.addEventListener('click', () => select(spot, true));
            also.append(b);
            if (i < rest.length - 1) also.append(document.createTextNode(' · '));
          });
          group.append(also);
        }
        list.append(group);
      });
      const orphans = night.filter(s => !s.branch);
      orphans.forEach(spot => list.append(placeCard(spot)));
    }

    sections.filter(sec => !['hikawa', 'start'].includes(sec.id)).forEach(sec => {
      const option = html('option', '', sec.name);
      option.value = sec.id;
      $('section-filter').append(option);
    });
  }

  // Print tokens are written inline like every other palette, because applyTime
  // sets them inline and a stylesheet cannot outrank that.
  const PRINT_TOKENS = {
    '--paper': '#ffffff', '--panel': '#ffffff', '--sea': '#f2efe8', '--land': '#f8f5ef',
    '--land-line': '#c9c2b6', '--line': '#c9c2b6', '--ink': '#14110d', '--ink-soft': '#3d3730',
    '--muted': '#6b6459', '--accent': '#14110d', '--accent-ink': '#14110d',
    '--signboard': '#a8281d', '--gold': '#7d5a0e', '--mark': '#a8281d',
    '--mark-soft': '#f3e3dc', '--mark-ink': '#8a2016', '--transit': '#6b6459',
    '--junjo': '#a8352c', '--daiichi': '#473a2c', '--pal': '#8a5615', '--etoile': '#8f4a63',
    '--look': '#2f5180', '--konan': '#5a3d70', '--shrine': '#b8331c', '--start': '#4a5560',
    '--st-foot': '#ded8cc', '--st-street': '#d4cdbf', '--st-tertiary': '#c6bdab',
    '--st-major': '#b4a992', '--st-rail': '#7d7362', '--st-shopping': '#cfc6b3',
    '--ctx-road': '#ded8cc', '--ctx-major': '#c4baa4', '--ctx-rail': '#a89c85',
    '--ctx-station': '#6b6459', '--walk-core': '#14110d',
    '--break-bg': '#f6f1e6', '--break-line': '#ddd4c0', '--break-ink': '#6b5a38',
    '--day-fade': '1'
  };

  function beforePrint() {
    if (!ready || savedPrint) return;
    savedPrint = {camera: {...camera}, search: $('shop-search').value, section: $('section-filter').value,
                  when: $('when-filter').value, selected, time: timeNow};
    Object.entries(PRINT_TOKENS).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
    $('shop-search').value = '';
    $('section-filter').value = '';
    $('when-filter').value = '';
    lastSection = '';
    lastWhen = '';
    filter(true);
    resize();
  }

  function afterPrint() {
    if (!savedPrint) return;
    const previous = savedPrint;
    savedPrint = null;
    $('shop-search').value = previous.search;
    $('section-filter').value = previous.section;
    $('when-filter').value = previous.when || '';
    lastSection = previous.section;
    lastWhen = previous.when || '';
    selected = previous.selected;
    applyTime(previous.time || 0);
    filter();
    Object.assign(camera, previous.camera);
    resize();
  }

  $('zoom-in').addEventListener('click', () => zoom(0.7));
  $('zoom-out').addEventListener('click', () => zoom(1 / 0.7));
  $('fit-map').addEventListener('click', () => fit());
  $('shop-search').addEventListener('input', () => filter(false));
  $('section-filter').addEventListener('change', () => filter(true));
  $('when-filter').addEventListener('change', () => filter(true));
  $('print-map').addEventListener('click', () => window.print());
  startTime();
  window.addEventListener('beforeprint', beforePrint);
  window.addEventListener('afterprint', afterPrint);
  svg.setAttribute('tabindex', '0');
  svg.addEventListener('wheel', event => {
    event.preventDefault();
    const rect = svg.getBoundingClientRect();
    zoom(Math.exp(Math.max(-200, Math.min(200, event.deltaY)) * 0.002), [event.clientX - rect.left, event.clientY - rect.top]);
  }, {passive: false});
  svg.addEventListener('keydown', event => {
    if (event.target !== svg) return;
    const moves = {ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1]};
    if (moves[event.key]) {
      event.preventDefault();
      camera.x += moves[event.key][0] * camera.width * 0.12;
      camera.y += moves[event.key][1] * camera.width * 0.12;
      saveState();
      render();
    } else if (['+', '=', '-', '0'].includes(event.key)) {
      event.preventDefault();
      if (event.key === '0') fit();
      else zoom(event.key === '-' ? 1.3 : 1 / 1.3);
    }
  });

  function resetGesture() {
    const points = [...pointers.values()];
    gesture = points.length ? {points, camera: {...camera}} : null;
  }

  svg.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    suppressClick = false;
    pointers.set(event.pointerId, [event.clientX, event.clientY]);
    if (!event.target.closest('.map-marker')) svg.setPointerCapture(event.pointerId);
    resetGesture();
  });
  svg.addEventListener('pointermove', event => {
    if (!pointers.has(event.pointerId) || !gesture) return;
    pointers.set(event.pointerId, [event.clientX, event.clientY]);
    const points = [...pointers.values()];
    const mid = list => list.reduce(([x, y], point) => [x + point[0] / list.length, y + point[1] / list.length], [0, 0]);
    const start = mid(gesture.points), current = mid(points);
    const dx = current[0] - start[0], dy = current[1] - start[1];
    if (Math.hypot(dx, dy) > 4 || points.length > 1) suppressClick = true;
    Object.assign(camera, gesture.camera);
    if (points.length === 2 && gesture.points.length === 2) {
      const distance = list => Math.hypot(list[0][0] - list[1][0], list[0][1] - list[1][1]);
      camera.width = Math.min(9500, Math.max(600, gesture.camera.width * distance(gesture.points) / Math.max(1, distance(points))));
    }
    const rect = svg.getBoundingClientRect();
    camera.x += (start[0] - rect.left - width / 2) * (gesture.camera.width - camera.width) / width - dx * camera.width / width;
    camera.y += (start[1] - rect.top - height / 2) * (gesture.camera.width - camera.width) / width - dy * camera.width / width;
    scheduleRender();
  });
  const release = event => { pointers.delete(event.pointerId); if (suppressClick) saveState(); resetGesture(); };
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  new ResizeObserver(resize).observe(svg);

  async function init() {
    loadState();
    applyTime(0);
    try {
      const [data, streetData] = await Promise.all([
        getJSON(`assets/koenji-walk-data.json?v=${DATA_VERSION}`),
        getJSON(`assets/koenji-streets.json?v=${DATA_VERSION}`).catch(() => null),
      ]);
      const rows = data.start
        ? [...data.spots, Object.assign({
            number: 0, section: 'start', daypart: 'start', area: 'Koenji', ward: 'Suginami',
            address: 'Koenji Station north exit, Suginami, Tokyo'
          }, data.start)]
        : data.spots;
      spots = rows
        .map(spot => ({
          ...spot,
          point: project(spot.lng, spot.lat),
          haystack: normalize([spot.name, ...(spot.aliases || []), spot.section, spot.area,
                               spot.ward, spot.address, spot.station, spot.style].filter(Boolean).join(' '))
        }))
        .sort((a, b) => a.number - b.number);
      visible = [...spots];
      startSpot = spots.find(s => s.daypart === 'start') || null;
      geography();
      if (streetData) { renderContext(streetData); renderStreets(streetData); }
      dataRef = data;
      cards(data);
      clockAnchors = null;
      resize();
      // Restore selection if it still exists
      if (selected && !spots.some(s => s.id === selected)) selected = '';
      // A branch id saved by an older version of the data must not survive,
      // or every branched place is dimmed with no ending selected.
      const known = new Set((data.branches || []).map(b => b.id));
      if (branch && !known.has(branch)) branch = '';
      if (branch) { const want = branch; branch = ''; setBranch(want); }
      filter(!sessionStorage.getItem(STORAGE_KEY));
      ready = true;
      document.documentElement.dataset.mapReady = 'true';
      $('print-map').disabled = false;
      if (!streetData) $('map-status').textContent += ' Street context unavailable; places are still usable.';
    } catch (error) {
      $('map-status').textContent = 'The map could not load its local data. Reload this page through the site or a local HTTP server, not directly as a file.';
      document.documentElement.dataset.mapReady = 'error';
    }
  }

  init();
})();
