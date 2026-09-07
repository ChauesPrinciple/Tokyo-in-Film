(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const svg = $('ramen-map');
  const normalize = text => String(text).normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase();
  const locality = shop => shop.ward ? `${shop.ward} ward, Tokyo` : `${shop.municipality}, ${shop.prefecture}`;
  const NS = 'http://www.w3.org/2000/svg';
  const radians = Math.PI / 180;
  const radius = 6378137 * Math.cos(35.65 * radians);
  const mercator = lat => Math.log(Math.tan(Math.PI / 4 + lat * radians / 2));
  const originY = mercator(35.65);
  const project = (lng, lat) => [(lng - 139.75) * radians * radius, -(mercator(lat) - originY) * radius];
  const camera = {x: 0, y: 0, width: 18000};
  let shops = [], visible = [], selected = '', world, markers, wardLabels = [], savedPrint = null;
  let width = 800, height = 600, ready = false, transitAvailable = true;
  let frame = 0;
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
      const path = el('path', {
        d: polygons.flatMap(polygon => polygon.map(ringPath)).join(''),
        class: 'ward-shape', 'fill-rule': 'evenodd', 'vector-effect': 'non-scaling-stroke'
      });
      if (feature.properties.context) path.setAttribute('data-context', '');
      wards.append(path);
      if (feature.properties.context) return;
      const center = polygons.map(polygon => centroid(polygon[0])).sort((a, b) => b.area - a.area)[0];
      const name = (feature.properties.ward_en || '').replace(/ Ku$/, '');
      if (name && Number.isFinite(center.x)) wardLabels.push({...center, name});
    });
    world.append(wards);
    markers = el('g', {id: 'ramen-markers'});
    svg.append(world, el('g', {id: 'ward-labels', 'aria-hidden': 'true'}), markers);
  }

  function subway(data) {
    const nodes = new Map(), ways = new Map(), seen = new Set();
    data.elements.forEach(item => {
      if (item.type === 'node') nodes.set(item.id, project(item.lon, item.lat));
      if (item.type === 'way') ways.set(item.id, item.nodes);
    });
    const group = el('g', {id: 'ramen-transit'});
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
    const xs = places.map(shop => shop.point[0]), ys = places.map(shop => shop.point[1]);
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

  function select(shop, fromList = false) {
    selected = shop.id;
    const [x, y] = screen(shop.point);
    if (fromList || x < 30 || y < 30 || x > width - 30 || y > height - 30) {
      camera.x = shop.point[0];
      camera.y = shop.point[1];
      camera.width = Math.min(camera.width, 4500);
    }
    updateSelection();
    if (!fromList) scrollToCard(shop.id);
    $('map-status').textContent = `${shop.number}. ${shop.name} — ${shop.area}, ${locality(shop)}${shop.status ? ` · ${shop.status}` : ''}`;
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

  function marker(shop, x, y, placed, bounds, target) {
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
      class: `map-marker${shop.oni ? ' is-oni' : ''}${selected === shop.id ? ' is-selected' : ''}`,
      'data-shop': shop.id, tabindex: 0, role: 'button', 'aria-pressed': String(selected === shop.id),
      'aria-label': `${shop.number}. ${shop.name}, ${shop.area}, ${locality(shop)}.${shop.status ? ` ${shop.status}.` : ''} Show shop details.`
    });
    group.append(el('title', {}, `${shop.number}. ${shop.name}${shop.status ? ` — ${shop.status}` : ''}`));
    group.append(el('line', {x1: x, y1: y, x2: cx, y2: cy, class: 'marker-leader'}));
    group.append(el('circle', {cx: x, cy: y, r: 2.6, class: 'location-dot'}));
    group.append(el('circle', {cx, cy, r: 20, fill: 'transparent', class: 'marker-hit'}));
    group.append(el('circle', {cx, cy, r, class: 'marker-disc'}));
    group.append(el('text', {x: cx, y: cy, class: 'marker-number', 'text-anchor': 'middle', 'dominant-baseline': 'central'}, shop.number));
    group.addEventListener('click', () => { if (!suppressClick) select(shop); });
    group.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select(shop);
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
    visible.forEach(shop => {
      const [x, y] = screen(shop.point);
      if (x >= 4 && y >= 4 && x <= width - 4 && y <= height - 4) marker(shop, x, y, placed, [width, height], markers);
    });
    const labels = $('ward-labels');
    labels.replaceChildren();
    wardLabels.forEach(ward => {
      const [x, y] = screen([ward.x, ward.y]);
      if (x < 50 || y < 20 || x > width - 50 || y > height - 20 || placed.some(([px, py]) => Math.abs(x - px) < 65 && Math.abs(y - py) < 24)) return;
      labels.append(el('text', {x, y, class: 'ward-name', 'text-anchor': 'middle'}, ward.name.toUpperCase()));
    });
    const areaLabels = [];
    [...new Set(visible.map(shop => shop.area))].forEach(area => {
      const points = visible.filter(shop => shop.area === area).map(shop => screen(shop.point));
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
    if (savedPrint) fit(shops);
    else render();
  }

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
    visible = shops.filter(shop => (!area || shop.area === area) && shop.haystack.includes(query));
    const ids = new Set(visible.map(shop => shop.id));
    shops.forEach(shop => { $(`shop-${shop.id}`).hidden = !ids.has(shop.id); });
    $('empty-state').hidden = visible.length > 0;
    $('shop-count').textContent = `${visible.length} / ${shops.length}`;
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

  function cards(data) {
    shops.forEach(shop => {
      const card = html('article', `shop-card${shop.oni ? ' is-oni' : ''}`);
      card.id = `shop-${shop.id}`;
      const button = html('button', 'shop-select');
      button.type = 'button';
      button.setAttribute('aria-pressed', 'false');
      button.append(html('span', 'shop-number', shop.number), document.createTextNode(shop.name));
      button.addEventListener('click', () => select(shop, true));
      const areaLine = shop.ward ? `${shop.area} · ${shop.ward} ward` : `${shop.area} · ${shop.municipality}, ${shop.prefecture}`;
      card.append(button, html('p', 'shop-area', areaLine));
      if (shop.style) card.append(html('p', 'shop-style', shop.style));
      card.append(html('p', 'shop-address', shop.address));
      if (shop.station) card.append(html('p', 'shop-station', shop.station));
      if (shop.description) card.append(html('p', 'shop-description', shop.description));
      if (shop.note) card.append(html('p', 'shop-note', shop.note));
      if (shop.status) card.append(html('p', 'shop-status', shop.status));
      const links = html('div', 'shop-links');
      links.append(link('Open saved location', mapUrl(shop)));
      shop.sources.forEach(source => links.append(link(source.label, source.url)));
      card.append(links);
      card.addEventListener('click', event => {
        if (!event.target.closest('a, button')) select(shop, true);
      });
      $('shop-list').append(card);
    });
    [...new Set(shops.map(shop => shop.area))].sort().forEach(area => {
      const option = html('option', '', area);
      option.value = area;
      $('area-filter').append(option);
    });
    const excludedList = $('excluded-list');
    data.excluded.filter(place => place.id === 'ramen-museum').forEach(place => {
      const paragraph = html('p');
      paragraph.append(html('strong', '', `${place.name}. `), document.createTextNode(place.reason + ' '), link('Source', place.url));
      if (Number.isFinite(place.lat) && Number.isFinite(place.lng)) paragraph.append(document.createTextNode(' '), link('Original pin', mapUrl(place)));
      excludedList.append(paragraph);
    });

    const museum = data.excluded.find(place => place.id === 'ramen-museum');
    if (museum && museum.partner) {
      const partner = $('partner-block');
      partner.querySelector('.partner-name').textContent = museum.name;
      partner.querySelector('.partner-cooking').href = museum.cookingClassUrl;
      partner.querySelector('.partner-film').href = museum.filmUrl;
      partner.hidden = false;
    }
  }

  function beforePrint() {
    if (!ready || savedPrint) return;
    savedPrint = {camera: {...camera}, search: $('shop-search').value, area: $('area-filter').value, selected};
    $('shop-search').value = '';
    $('area-filter').value = '';
    filter();
    resize();
  }

  function afterPrint() {
    if (!savedPrint) return;
    const previous = savedPrint;
    savedPrint = null;
    $('shop-search').value = previous.search;
    $('area-filter').value = previous.area;
    selected = previous.selected;
    filter();
    Object.assign(camera, previous.camera);
    resize();
  }

  $('zoom-in').addEventListener('click', () => zoom(0.7));
  $('zoom-out').addEventListener('click', () => zoom(1 / 0.7));
  $('fit-map').addEventListener('click', () => fit());
  $('shop-search').addEventListener('input', filter);
  $('area-filter').addEventListener('change', filter);
  $('show-transit').addEventListener('change', () => {
    const group = $('ramen-transit');
    if (group) group.style.display = $('show-transit').checked ? '' : 'none';
  });
  $('print-map').addEventListener('click', () => window.print());
  window.addEventListener('beforeprint', beforePrint);
  window.addEventListener('afterprint', afterPrint);
  svg.setAttribute('tabindex', '0');
  svg.style.touchAction = 'none';
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
      const [data, boundaries] = await Promise.all([getJSON('assets/ramen-map-data.json'), getJSON('assets/tokyo-wards.geojson')]);
      shops = data.shops
        .map(shop => ({
          ...shop,
          point: project(shop.lng, shop.lat),
          haystack: normalize([shop.name, ...(shop.aliases || []), shop.area, shop.ward,
                               shop.municipality, shop.prefecture, shop.address,
                               shop.station, shop.style].filter(Boolean).join(' '))
        }))
        .sort((a, b) => a.number - b.number);
      visible = [...shops];
      geography(boundaries);
      cards(data);
      resize();
      filter();
      ready = true;
      document.documentElement.dataset.mapReady = 'true';
      $('print-map').disabled = false;
      try {
        subway(await getJSON('assets/tokyo-subway.json'));
      } catch (error) {
        transitAvailable = false;
        $('show-transit').disabled = true;
        $('show-transit').checked = false;
        $('map-status').textContent += ' Subway context unavailable; shop locations are still usable.';
      }
    } catch (error) {
      $('map-status').textContent = 'The map could not load its local data. Reload this page through the site or a local HTTP server, not directly as a file.';
      document.documentElement.dataset.mapReady = 'error';
    }
  }

  init();
})();
