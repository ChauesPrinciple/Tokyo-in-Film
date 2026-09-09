(() => {
  'use strict';

  const $ = id => document.getElementById(id);

  // --- View switch: Journey vs Map & list ---
  // The journey content is server-rendered (build:journey region), so this
  // toggle only controls visibility. No data fetching required.
  // `onShowMap` is wired later (after resize() is defined) so switching to the
  // map view re-measures the SVG, which the ResizeObserver may have missed
  // while the panel was hidden.
  let onShowMap = null;
  let setViewFn = null; // set by initViewSwitch; used by hash-link restore
  (function initViewSwitch() {
    const journeyTab = $('view-journey');
    const mapTab = $('view-map');
    const journeyView = $('journey-view');
    const mapView = $('map-view');
    if (!journeyTab || !mapTab || !journeyView || !mapView) return;

    const tabs = [journeyTab, mapTab];

    function setView(mode) {
      const isJourney = mode === 'journey';
      journeyTab.classList.toggle('is-active', isJourney);
      journeyTab.setAttribute('aria-selected', String(isJourney));
      mapTab.classList.toggle('is-active', !isJourney);
      mapTab.setAttribute('aria-selected', String(!isJourney));
      journeyView.classList.toggle('is-active', isJourney);
      journeyView.hidden = !isJourney;
      mapView.classList.toggle('is-active', !isJourney);
      mapView.hidden = isJourney;
      // Drive the layout grid + skip-link target from the active view.
      const layout = document.querySelector('.layout');
      if (layout) layout.setAttribute('data-view', mode);
      const skip = document.querySelector('.skip-link');
      if (skip) skip.setAttribute('href', isJourney ? '#journey-view' : '#shop-search');
      try { localStorage.setItem('bars-view', mode); } catch (e) {}
      if (!isJourney && typeof onShowMap === 'function') onShowMap();
    }
    setViewFn = setView;

    journeyTab.addEventListener('click', () => setView('journey'));
    mapTab.addEventListener('click', () => setView('map'));

    // Arrow-key navigation for the tablist (left/right, home/end).
    tabs.forEach((tab, i) => {
      tab.addEventListener('keydown', e => {
        const keys = {ArrowLeft: i - 1, ArrowRight: i + 1, Home: 0, End: tabs.length - 1};
        const next = keys[e.key];
        if (next === undefined) return;
        e.preventDefault();
        const target = tabs[Math.max(0, Math.min(tabs.length - 1, next))];
        target.focus();
        setView(target === journeyTab ? 'journey' : 'map');
      });
    });

    // Restore last choice, default to journey.
    let initial = 'journey';
    try { initial = localStorage.getItem('bars-view') || 'journey'; } catch (e) {}
    if (initial !== 'journey' && initial !== 'map') initial = 'journey';
    const layoutEl = document.querySelector('.layout');
    if (layoutEl) layoutEl.setAttribute('data-view', initial);
    if (initial === 'map') setView('map');
  })();

  const svg = $('bars-map');
  const normalize = text => String(text).normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase();
  const locality = bar => bar.ward ? `${bar.ward} ward, Tokyo` : `${bar.municipality}, ${bar.prefecture}`;
  // Group the granular per-venue styles into a handful of useful buckets so
  // the Type filter stays practical (8 options, not 18 near-synonyms).
  const STYLE_CATEGORIES = [
    ['Cocktail bars', ['Classic cocktail bar', 'Cocktail bar', 'Cocktail bar · high-end', 'Whisky & cocktail bar']],
    ['Hotel bars', ['Hotel bar · high-end']],
    ['Jazz & listening', ['Jazz bar', 'Jazz livehouse']],
    ['Speakeasy', ['Speakeasy']],
    ['Sake bars', ['Sake bar', 'Exclusive sake club']],
    ['Snack & authentic bars', ['Snack bar', 'Bar', 'Authentic bar']],
    ['Themed bars', ['Game bar', 'Shooting bar', 'Rock bar', 'Burlesque bar', 'Coffee & beer bar']],
    ['Golden Gai', ['Golden Gai bars']],
  ];
  const _styleToCategory = new Map(STYLE_CATEGORIES.flatMap(([cat, styles]) => styles.map(s => [s, cat])));
  const categoryOf = style => _styleToCategory.get(style || '') || '';
  const NS = 'http://www.w3.org/2000/svg';
  const radians = Math.PI / 180;
  const radius = 6378137 * Math.cos(35.65 * radians);
  const mercator = lat => Math.log(Math.tan(Math.PI / 4 + lat * radians / 2));
  const originY = mercator(35.65);
  const project = (lng, lat) => [(lng - 139.75) * radians * radius, -(mercator(lat) - originY) * radius];
  const camera = {x: 0, y: 0, width: 18000};
  let bars = [], visible = [], selected = '', world, markers, wardLabels = [], savedPrint = null;
  let width = 800, height = 600, ready = false, transitAvailable = true;
  let frame = 0;
  let followReading = true;
  const wardPaths = new Map();
  const pointers = new Map();
  let gesture = null, suppressClick = false;

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

  function ringPath(ring) {
    return ring.map(([lng, lat], i) => {
      const [x, y] = project(lng, lat);
      return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join('') + 'Z';
  }

  function centroid(ring) {
    const points = ring.map(([lng, lat]) => project(lng, lat));
    let area = 0, x = 0, y = 0;
    points.forEach(([ax, ay], i) => {
      const [bx, by] = points[(i + 1) % points.length];
      const cross = ax * by - bx * ay;
      area += cross;
      x += (ax + bx) * cross;
      y += (ay + by) * cross;
    });
    return {area: Math.abs(area), x: x / (3 * area), y: y / (3 * area)};
  }

  function geography(data) {
    world = el('g', {'aria-hidden': 'true'});
    const wards = el('g');
    data.features.forEach(feature => {
      const geometry = feature.geometry;
      const polygons = geometry.type === 'MultiPolygon' ? geometry.coordinates : [geometry.coordinates];
      const d = polygons.flatMap(polygon => polygon.map(ringPath)).join('');
      const path = el('path', {
        d, class: 'ward-shape', 'fill-rule': 'evenodd', 'vector-effect': 'non-scaling-stroke'
      });
      if (feature.properties.context) path.setAttribute('data-context', '');
      wards.append(path);
      const name = (feature.properties.ward_en || '').replace(/ Ku$/, '');
      if (name) wardPaths.set(name, {d, context: !!feature.properties.context});
      if (feature.properties.context) return;
      const center = polygons.map(polygon => centroid(polygon[0])).sort((a, b) => b.area - a.area)[0];
      if (name && Number.isFinite(center.x)) wardLabels.push({...center, name});
    });
    world.append(wards);
    markers = el('g', {id: 'bars-markers'});
    svg.append(world, el('g', {id: 'ward-labels', 'aria-hidden': 'true'}), markers);
  }

  function subway(data) {
    const nodes = new Map(), ways = new Map(), seen = new Set();
    data.elements.forEach(item => {
      if (item.type === 'node') nodes.set(item.id, project(item.lon, item.lat));
      if (item.type === 'way') ways.set(item.id, item.nodes);
    });
    const group = el('g', {id: 'bars-transit'});
    data.elements.filter(item => item.type === 'relation').forEach(relation => {
      relation.members.filter(member => member.type === 'way' && member.role !== 'platform').forEach(member => {
        if (seen.has(member.ref)) return;
        seen.add(member.ref);
        const points = (ways.get(member.ref) || []).map(id => nodes.get(id)).filter(Boolean);
        if (points.length < 2) return;
        group.append(el('path', {
          d: points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(''),
          class: 'transit-line', fill: 'none', 'vector-effect': 'non-scaling-stroke'
        }));
      });
    });
    world.append(group);
    group.style.display = $('show-transit').checked ? '' : 'none';
  }

  function fit(places = visible) {
    if (!places.length) {
      render();
      return;
    }
    const xs = places.map(bar => bar.point[0]), ys = places.map(bar => bar.point[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    camera.x = (minX + maxX) / 2;
    camera.y = (minY + maxY) / 2;
    camera.width = Math.max(maxX - minX + 2200, (maxY - minY + 2200) * width / height, 3200);
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
      card.querySelector('button').setAttribute('aria-pressed', String(active));
    });
  }

  function select(bar, fromList = false) {
    selected = bar.id;
    const [x, y] = screen(bar.point);
    if (fromList || x < 30 || y < 30 || x > width - 30 || y > height - 30) {
      camera.x = bar.point[0];
      camera.y = bar.point[1];
      camera.width = Math.min(camera.width, 4500);
    }
    updateSelection();
    if (!fromList) {
      // Scroll the surface that's actually visible: the journey stop or the
      // list card. Selecting from the map should never scroll a hidden panel.
      const mapView = $('map-view');
      if (mapView && mapView.hidden) scrollToStop(bar.id);
      else scrollToCard(bar.id);
    }
    $('map-status').textContent = `${bar.number}. ${bar.name} — ${bar.area}, ${locality(bar)}${bar.status ? ` · ${bar.status}` : ''}`;
    try { history.replaceState(null, '', `#stop-${bar.id}`); } catch (e) {}
    render();
  }

  // --- Scroll-driven camera for Journey view ---
  // As the user scrolls through .stop sections, the map camera pans to the
  // corresponding bar. Uses an IntersectionObserver to find the active stop,
  // then smoothly animates the camera. No scroll hijacking — the page scrolls
  // normally and the map follows. "Follow" can be paused by the user (or by
  // manual map interaction) and resumed from the toolbar.
  let activeStopId = null;
  let cameraAnim = null; // {fromX, fromY, fromW, toX, toY, toW, start, duration}
  let phaseTimer = null; // pending phase-2 setTimeout for distant stops

  function setFollow(on) {
    followReading = on;
    const cb = $('follow-reading');
    if (cb) cb.checked = on;
    // When follow is paused, cancel any in-flight scroll-driven camera motion
    // so the map stays where the user left it instead of drifting to a stop.
    if (!on) {
      if (cameraAnim) { cancelAnimationFrame(cameraAnim.raf); cameraAnim = null; }
      if (phaseTimer) { clearTimeout(phaseTimer); phaseTimer = null; }
    }
  }

  // Manual map interaction pauses scroll-driven following; the user can resume
  // it from the toolbar toggle. This prevents the camera from yanking control
  // back after the user has deliberately explored the map.
  function pauseFollow() { if (followReading) setFollow(false); }

  function animateCameraTo(targetX, targetY, targetWidth, duration = 600) {
    if (cameraAnim) cancelAnimationFrame(cameraAnim.raf);
    if (phaseTimer) { clearTimeout(phaseTimer); phaseTimer = null; }
    // Respect reduced-motion: snap instead of animate
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      camera.x = targetX; camera.y = targetY; camera.width = targetWidth;
      render();
      return;
    }
    cameraAnim = {
      fromX: camera.x, fromY: camera.y, fromW: camera.width,
      toX: targetX, toY: targetY, toW: targetWidth,
      start: performance.now(), duration
    };
    function step(now) {
      if (!cameraAnim) return;
      const t = Math.min(1, (now - cameraAnim.start) / cameraAnim.duration);
      // ease-in-out cubic
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      camera.x = cameraAnim.fromX + (cameraAnim.toX - cameraAnim.fromX) * e;
      camera.y = cameraAnim.fromY + (cameraAnim.toY - cameraAnim.fromY) * e;
      camera.width = cameraAnim.fromW + (cameraAnim.toW - cameraAnim.fromW) * e;
      render();
      if (t < 1) cameraAnim.raf = requestAnimationFrame(step);
      else cameraAnim = null;
    }
    cameraAnim.raf = requestAnimationFrame(step);
  }

  function focusStop(bar, stopElement) {
    if (!bar || !bar.point) return;
    activeStopId = bar.id;
    selected = bar.id;
    updateSelection();

    // Category-aware camera behavior
    const cats = stopElement ? (stopElement.dataset.category || '') : '';
    const isBasement = cats.includes('basement');
    const isHighrise = cats.includes('highrise');
    const isDistant = cats.includes('distant');
    const isSpotlight = cats.includes('spotlight');
    const isGoldenGai = cats.includes('golden-gai');

    // Default zoom width per category
    let targetWidth = 3500;
    if (isBasement) targetWidth = 2800;       // tighter — you're going down
    if (isHighrise) targetWidth = 5000;        // wider — show the tower in context
    if (isGoldenGai) targetWidth = 2200;       // tightest — alleys are tiny
    if (isSpotlight) targetWidth = 4500;      // deliberate, wider final view
    let duration = 700;
    if (isSpotlight) duration = 1200;          // slower, more deliberate

    // Distant stops: two-phase animation — pull back to overview, then zoom in
    if (isDistant) {
      // Phase 1: pull back to a wide overview between current camera and target
      animateCameraTo(
        (camera.x + bar.point[0]) / 2,
        (camera.y + bar.point[1]) / 2,
        12000, // wide overview showing both areas
        500
      );
      // Phase 2: zoom in after phase 1 completes
      phaseTimer = setTimeout(() => {
        phaseTimer = null;
        animateCameraTo(bar.point[0], bar.point[1], targetWidth, duration);
      }, 550);
    } else {
      animateCameraTo(bar.point[0], bar.point[1], targetWidth, duration);
    }

    $('map-status').textContent = `${bar.number}. ${bar.name} — ${bar.area}, ${locality(bar)}${bar.status ? ` · ${bar.status}` : ''}`;

    // In map view, scroll the corresponding card into view
    const mapView = $('map-view');
    if (mapView && !mapView.hidden) scrollToCard(bar.id);
  }

  function initScrollObserver() {
    const stops = document.querySelectorAll('.stop[data-stop]');
    if (!stops.length) return;

    // Find the bar data for each stop id
    const barById = new Map(bars.map(b => [b.id, b]));

    // IntersectionObserver: when a stop crosses the middle of the viewport,
    // it becomes active and the map pans to it.
    const observer = new IntersectionObserver(entries => {
      // Only act when journey view is active and follow is enabled
      const journeyView = $('journey-view');
      if (!journeyView || journeyView.hidden) return;
      if (!followReading) return;

      // Find the entry closest to the center of the viewport
      let bestEntry = null, bestDistance = Infinity;
      const viewportCenter = window.innerHeight / 2;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const rect = entry.boundingClientRect;
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < bestDistance) {
          bestDistance = dist;
          bestEntry = entry;
        }
      }
      if (bestEntry) {
        const stopId = bestEntry.target.dataset.stop;
        if (stopId && stopId !== activeStopId) {
          const bar = barById.get(stopId);
          if (bar) focusStop(bar, bestEntry.target);
        }
      }
    }, {
      // Trigger when any part of a stop is in the middle band of the viewport
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    });

    stops.forEach(stop => observer.observe(stop));

    // Also handle direct clicks on stops — focus the map
    stops.forEach(stop => {
      stop.addEventListener('click', () => {
        const stopId = stop.dataset.stop;
        const bar = barById.get(stopId);
        if (bar) focusStop(bar, stop);
      });
    });

    // Golden Gai: clicking a subvenue focuses the parent stop's location
    const subvenues = document.querySelectorAll('.subvenue');
    subvenues.forEach(sv => {
      sv.addEventListener('click', e => {
        e.stopPropagation();
        const stop = sv.closest('.stop');
        if (!stop) return;
        const stopId = stop.dataset.stop;
        const bar = barById.get(stopId);
        if (bar) focusStop(bar, stop);
      });
    });
  }

  function scrollToStop(id) {
    const stop = $(`stop-${id}`);
    if (stop) stop.scrollIntoView({block: 'start', behavior: 'smooth'});
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

  function marker(bar, x, y, placed, bounds, target) {
    const r = 13;
    let position = null;
    const angles = [-Math.PI / 4, Math.PI / 4, -3 * Math.PI / 4, 3 * Math.PI / 4, 0, Math.PI, -Math.PI / 2, Math.PI / 2];
    for (const distance of [24, 42, 60, 78, 96]) {
      if (position) break;
      for (const angle of angles) {
        const cx = x + Math.cos(angle) * distance, cy = y + Math.sin(angle) * distance;
        if (cx < r + 4 || cy < r + 4 || cx > bounds[0] - r - 4 || cy > bounds[1] - r - 4) continue;
        if (placed.every(([px, py]) => Math.hypot(cx - px, cy - py) > 32)) {
          position = [cx, cy];
          break;
        }
      }
      if (position) break;
    }
    const [cx, cy] = position || [Math.max(18, Math.min(bounds[0] - 18, x)), Math.max(18, Math.min(bounds[1] - 18, y))];
    placed.push([cx, cy]);
    const group = el('g', {
      class: `map-marker${bar.spotlight ? ' is-spotlight' : ''}${selected === bar.id ? ' is-selected' : ''}`,
      'data-shop': bar.id, tabindex: 0, role: 'button', 'aria-pressed': String(selected === bar.id),
      'aria-label': `${bar.number}. ${bar.name}, ${bar.area}, ${locality(bar)}.${bar.status ? ` ${bar.status}.` : ''} Show bar details.`
    });
    group.append(el('title', {}, `${bar.number}. ${bar.name}${bar.status ? ` — ${bar.status}` : ''}`));
    group.append(el('line', {x1: x, y1: y, x2: cx, y2: cy, class: 'marker-leader'}));
    group.append(el('circle', {cx: x, cy: y, r: 2.6, class: 'location-dot'}));
    group.append(el('circle', {cx, cy, r: 20, fill: 'transparent', class: 'marker-hit'}));
    group.append(el('circle', {cx, cy, r, class: 'marker-disc'}));
    group.append(el('text', {x: cx, y: cy, class: 'marker-number', 'text-anchor': 'middle', 'dominant-baseline': 'central'}, bar.number));
    group.addEventListener('click', () => { if (!suppressClick) select(bar); });
    group.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select(bar);
      }
    });
    target.append(group);
  }

  function render() {
    if (!world) return;
    const focused = markers.contains(document.activeElement) ? document.activeElement.dataset.shop : null;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const scale = width / camera.width;
    world.setAttribute('transform', `translate(${width / 2 - camera.x * scale} ${height / 2 - camera.y * scale}) scale(${scale})`);
    markers.replaceChildren();
    const placed = [];
    visible.forEach(bar => {
      const [x, y] = screen(bar.point);
      if (x >= 4 && y >= 4 && x <= width - 4 && y <= height - 4) marker(bar, x, y, placed, [width, height], markers);
    });
    const labels = $('ward-labels');
    labels.replaceChildren();
    wardLabels.forEach(ward => {
      const [x, y] = screen([ward.x, ward.y]);
      if (x < 50 || y < 20 || x > width - 50 || y > height - 20 || placed.some(([px, py]) => Math.abs(x - px) < 65 && Math.abs(y - py) < 24)) return;
      labels.append(el('text', {x, y, class: 'ward-name', 'text-anchor': 'middle'}, ward.name.toUpperCase()));
    });
    const areaLabels = [];
    [...new Set(visible.map(bar => bar.area))].forEach(area => {
      const points = visible.filter(bar => bar.area === area).map(bar => screen(bar.point));
      const x = points.reduce((sum, point) => sum + point[0], 0) / points.length;
      const y = points.reduce((sum, point) => sum + point[1], 0) / points.length;
      const labelWidth = area.length * 6;
      for (const [left, top] of [[x + 42, y + 8], [x - labelWidth - 42, y + 8], [x - labelWidth / 2, y + 54]]) {
        if (left < 10 || top < 65 || left + labelWidth > width - 10 || top > height - 25) continue;
        const clashes = ([px, py]) => px > left - 18 && px < left + labelWidth + 18 && Math.abs(py - top) < 20;
        if (placed.some(clashes) || areaLabels.some(box => left < box[0] + box[2] + 8 && left + labelWidth > box[0] - 8 && Math.abs(top - box[1]) < 20)) continue;
        labels.append(el('text', {x: left, y: top, class: 'place-label'}, area));
        areaLabels.push([left, top, labelWidth]);
        break;
      }
    });
    const distance = [50, 100, 200, 500, 1000, 2000, 5000].filter(value => value * scale <= 110).pop() || 50;
    $('scale-bar').replaceChildren();
    const bar = html('span');
    bar.style.cssText = `display:block;width:${distance * scale}px;border:solid currentColor;border-width:0 1px 2px;height:5px;margin-bottom:5px`;
    $('scale-bar').append(bar, document.createTextNode(distance >= 1000 ? `${distance / 1000} km` : `${distance} m`));
    if (focused) markers.querySelector(`[data-shop="${focused}"]`)?.focus({preventScroll: true});
  }

  function scheduleRender() {
    if (frame) return;
    frame = requestAnimationFrame(() => { frame = 0; render(); });
  }

  function resize() {
    const rect = svg.getBoundingClientRect();
    width = Math.max(280, rect.width);
    height = Math.max(200, rect.height);
    if (savedPrint) fit(bars);
    else render();
  }

  // Now that resize() exists, wire the view switch so unhiding the map
  // re-measures the SVG (the ResizeObserver may have missed the hidden span).
  onShowMap = () => requestAnimationFrame(resize);

  function zoom(factor, anchor = [width / 2, height / 2]) {
    const old = camera.width;
    camera.width = Math.min(55000, Math.max(600, old * factor));
    camera.x += (anchor[0] - width / 2) * (old - camera.width) / width;
    camera.y += (anchor[1] - height / 2) * (old - camera.width) / width;
    render();
  }

  function filter() {
    const query = normalize($('shop-search').value.trim());
    const area = $('area-filter').value;
    const type = $('type-filter').value;
    const matches = bar => (!area || bar.area === area) && (!type || categoryOf(bar.style) === type) && bar.haystack.includes(query);
    visible = bars.filter(matches);
    const ids = new Set(visible.map(bar => bar.id));
    bars.forEach(bar => {
      $(`shop-${bar.id}`).hidden = !ids.has(bar.id);
      // Keep Journey stops in sync with the same filter, so the reading view
      // never focuses a venue whose marker is hidden on the map.
      const stop = $(`stop-${bar.id}`);
      if (stop) stop.hidden = !ids.has(bar.id);
    });
    $('empty-state').hidden = visible.length > 0;
    $('shop-count').textContent = `${visible.length} / ${bars.length}`;
    $('map-status').textContent = visible.length ? `${visible.length} places shown.${transitAvailable ? '' : ' Subway context unavailable.'}` : 'No matching places. Clear the search or choose another area.';
    if (!ids.has(selected)) {
      selected = '';
      document.querySelectorAll('.shop-card.is-selected').forEach(card => {
        card.classList.remove('is-selected');
        card.querySelector('button').setAttribute('aria-pressed', 'false');
      });
    }
    if (visible.length) fit();
    else render();
  }

  function cards() {
    bars.forEach(bar => {
      const card = html('article', `shop-card${bar.spotlight ? ' is-spotlight' : ''}`);
      card.id = `shop-${bar.id}`;
      const button = html('button', 'shop-select');
      button.type = 'button';
      button.setAttribute('aria-pressed', 'false');
      button.append(html('span', 'shop-number', bar.number), document.createTextNode(bar.name));
      button.addEventListener('click', () => select(bar, true));
      const areaLine = bar.ward ? `${bar.area} · ${bar.ward} ward` : `${bar.area} · ${bar.municipality}, ${bar.prefecture}`;
      card.append(button, html('p', 'shop-area', areaLine));
      if (bar.style) card.append(html('p', 'shop-style', bar.style));
      card.append(html('p', 'shop-address', bar.address));
      if (bar.station) card.append(html('p', 'shop-station', bar.station));
      if (bar.description) card.append(html('p', 'shop-description', bar.description));
      if (bar.note) card.append(html('p', 'shop-note', bar.note));
      if (bar.status) card.append(html('p', 'shop-status', bar.status));
      const links = html('div', 'shop-links');
      const primaryUrl = mapUrl(bar);
      // The always-visible primary "Open in Maps" pill below covers the maps
      // URL, so the link cluster only carries secondary sources (Tabelog,
      // Instagram, official site, ...), deduplicated against the maps URL.
      const seen = new Set([primaryUrl]);
      (bar.sources || []).forEach(source => {
        if (seen.has(source.url)) return;
        seen.add(source.url);
        const a = link(source.label, source.url);
        a.target = '_blank'; a.rel = 'noopener noreferrer';
        links.append(a);
      });
      card.append(links);
      // Always-visible primary Maps action so users don't have to expand the
      // link cluster to find the venue on a map.
      const primary = document.createElement('a');
      primary.className = 'shop-link-primary';
      primary.href = primaryUrl;
      primary.textContent = 'Open in Maps';
      primary.target = '_blank'; primary.rel = 'noopener noreferrer';
      card.append(primary);
      card.addEventListener('click', event => {
        if (!event.target.closest('a, button')) select(bar, true);
      });
      $('shop-list').append(card);
    });
    [...new Set(bars.map(bar => bar.area))].sort().forEach(area => {
      const option = html('option', '', area);
      option.value = area;
      $('area-filter').append(option);
    });
    // Type filter uses grouped categories, not the granular per-venue styles.
    STYLE_CATEGORIES.forEach(([cat]) => {
      const option = html('option', '', cat);
      option.value = cat;
      $('type-filter').append(option);
    });
  }

  function beforePrint() {
    if (!ready || savedPrint) return;
    savedPrint = {camera: {...camera}, search: $('shop-search').value, area: $('area-filter').value, type: $('type-filter').value, selected};
    $('shop-search').value = '';
    $('area-filter').value = '';
    $('type-filter').value = '';
    filter();
    resize();
  }

  function afterPrint() {
    if (!savedPrint) return;
    const previous = savedPrint;
    savedPrint = null;
    $('shop-search').value = previous.search;
    $('area-filter').value = previous.area;
    $('type-filter').value = previous.type;
    selected = previous.selected;
    filter();
    Object.assign(camera, previous.camera);
    resize();
  }

  $('zoom-in').addEventListener('click', () => { pauseFollow(); zoom(0.7); });
  $('zoom-out').addEventListener('click', () => { pauseFollow(); zoom(1 / 0.7); });
  $('fit-map').addEventListener('click', () => { pauseFollow(); fit(); });
  $('shop-search').addEventListener('input', filter);
  $('area-filter').addEventListener('change', filter);
  $('type-filter').addEventListener('change', filter);
  $('show-transit').addEventListener('change', () => {
    const group = $('bars-transit');
    if (group) group.style.display = $('show-transit').checked ? '' : 'none';
  });
  $('follow-reading').addEventListener('change', () => {
    followReading = $('follow-reading').checked;
  });
  $('print-map').addEventListener('click', () => window.print());
  window.addEventListener('beforeprint', beforePrint);
  window.addEventListener('afterprint', afterPrint);
  svg.setAttribute('tabindex', '0');
  svg.addEventListener('wheel', event => {
    event.preventDefault();
    pauseFollow();
    const rect = svg.getBoundingClientRect();
    zoom(Math.exp(Math.max(-200, Math.min(200, event.deltaY)) * 0.002), [event.clientX - rect.left, event.clientY - rect.top]);
  }, {passive: false});
  svg.addEventListener('keydown', event => {
    if (event.target !== svg) return;
    const moves = {ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1]};
    if (moves[event.key]) {
      event.preventDefault();
      pauseFollow();
      camera.x += moves[event.key][0] * camera.width * 0.12;
      camera.y += moves[event.key][1] * camera.width * 0.12;
      render();
    } else if (['+', '=', '-', '0'].includes(event.key)) {
      event.preventDefault();
      pauseFollow();
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
    if (!event.target.closest('.map-marker')) {
      svg.setPointerCapture(event.pointerId);
      pauseFollow();
    }
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
      camera.width = Math.min(55000, Math.max(600, gesture.camera.width * distance(gesture.points) / Math.max(1, distance(points))));
    }
    const rect = svg.getBoundingClientRect();
    camera.x += (start[0] - rect.left - width / 2) * (gesture.camera.width - camera.width) / width - dx * camera.width / width;
    camera.y += (start[1] - rect.top - height / 2) * (gesture.camera.width - camera.width) / width - dy * camera.width / width;
    scheduleRender();
  });
  const release = event => { pointers.delete(event.pointerId); resetGesture(); };
  window.addEventListener('pointerup', release);
  window.addEventListener('pointercancel', release);
  new ResizeObserver(resize).observe(svg);

  async function init() {
    try {
      const [data, boundaries] = await Promise.all([getJSON('assets/bars-map-data.json'), getJSON('assets/tokyo-wards.geojson')]);
      bars = data.bars
        .map(bar => ({
          ...bar,
          point: project(bar.lng, bar.lat),
          haystack: normalize([bar.name, ...(bar.aliases || []), bar.area, bar.ward,
                               bar.municipality, bar.prefecture, bar.address,
                               bar.station, bar.style].filter(Boolean).join(' '))
        }))
        .sort((a, b) => a.number - b.number);
      visible = [...bars];
      const countEl = $('bar-count');
      if (countEl) countEl.textContent = bars.length;
      geography(boundaries);
      cards();
      resize();
      filter();
      ready = true;
      document.documentElement.dataset.mapReady = 'true';
      $('print-map').disabled = false;
      // Wire scroll-driven camera for Journey view
      initScrollObserver();
      // Restore a venue from the URL hash (#stop-<id>) if present and valid;
      // otherwise start on the first stop in Journey view, or fit() in Map view.
      const hashMatch = /^#stop-(.+)$/.exec(location.hash);
      const hashBar = hashMatch ? bars.find(b => b.id === hashMatch[1]) : null;
      const journeyView = $('journey-view');
      if (hashBar) {
        // A shared selection should land in Map & list so the card is visible
        // and the marker is selectable, regardless of the saved view.
        if (setViewFn) setViewFn('map');
        select(hashBar, true);
      } else if (journeyView && !journeyView.hidden && bars.length) {
        const first = bars[0];
        camera.x = first.point[0];
        camera.y = first.point[1];
        camera.width = 3500;
        selected = first.id;
        updateSelection();
        render();
      }
      try {
        subway(await getJSON('assets/tokyo-subway.json'));
      } catch (error) {
        transitAvailable = false;
        $('show-transit').disabled = true;
        $('show-transit').checked = false;
        $('map-status').textContent += ' Subway context unavailable; bar locations are still usable.';
      }
    } catch (error) {
      $('map-status').textContent = 'The map could not load its local data. Reload this page through the site or a local HTTP server, not directly as a file.';
      document.documentElement.dataset.mapReady = 'error';
    }
  }

  init();
})();
