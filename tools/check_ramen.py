import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


class RamenMapTests(unittest.TestCase):
    def setUp(self):
        self.data = json.loads((ROOT / 'assets/ramen-map-data.json').read_text(encoding='utf-8'))

    def test_unique_places_and_sources(self):
        shops = self.data['shops']
        self.assertGreaterEqual(len(shops), 8)
        self.assertEqual(len(shops), len({shop['id'] for shop in shops}))
        self.assertEqual(len(shops), len({(shop['lat'], shop['lng']) for shop in shops}))
        for shop in shops:
            with self.subTest(shop=shop['id']):
                self.assertTrue(35.55 < shop['lat'] < 35.85)
                self.assertTrue(139.48 < shop['lng'] < 139.92)
                self.assertTrue(shop['ward'] or shop.get('municipality'))
                for field in ('name', 'area', 'address', 'station', 'style', 'description', 'coordinateSource', 'sources'):
                    self.assertTrue(shop[field])
                self.assertTrue(all(source['url'].startswith('https://') for source in shop['sources']))

    def test_numbers_are_contiguous_and_drive_the_map(self):
        """js/ramen-map.js sorts and labels markers straight from these numbers."""
        shops = self.data['shops']
        numbers = sorted(shop['number'] for shop in shops)
        self.assertEqual(numbers, list(range(1, len(shops) + 1)))
        by_number = {shop['number']: shop['id'] for shop in shops}
        self.assertEqual(by_number[13], 'kikanbo')  # the Oni challenge closes the loop
        script = (ROOT / 'js/ramen-map.js').read_text(encoding='utf-8')
        self.assertNotIn('number: index + 1', script)  # numbering must come from the data

    def test_original_map_corrections(self):
        shops = {shop['id']: shop for shop in self.data['shops']}
        excluded = {item['id']: item for item in self.data['excluded']}
        self.assertEqual(shops['shima']['ward'], 'Shibuya')
        self.assertEqual(shops['kamo']['ward'], 'Taito')
        self.assertEqual(shops['ninja']['ward'], 'Taito')
        self.assertIn('muginae', shops)
        self.assertEqual(len(shops), 13)
        self.assertIn('okurindo', shops)
        self.assertEqual(shops['okurindo']['ward'], 'Minato')
        self.assertIn('usagi', shops)
        self.assertEqual(shops['usagi']['ward'], 'Shibuya')
        self.assertNotIn('emoto', shops)
        self.assertNotIn('sugimoto', shops)
        self.assertIn('emoto', excluded)
        self.assertIn('sugimoto', excluded)
        self.assertEqual(shops['shibata']['municipality'], 'Komae')
        self.assertEqual(shops['kohaku']['ward'], 'Ota')
        self.assertEqual(shops['aidaya']['ward'], 'Taito')
        self.assertEqual(shops['muginae']['lat'], 35.5907765)
        self.assertIn('Muginawa', shops['muginae']['aliases'])
        self.assertIn('ramen-museum', excluded)

    def test_coordinates_match_named_ward(self):
        boundaries = json.loads((ROOT / 'assets/tokyo-wards.geojson').read_text(encoding='utf-8'))
        wards = {feature['properties']['ward_en'].removesuffix(' Ku'): feature['geometry']
                 for feature in boundaries['features']}

        def in_ring(x, y, ring):
            inside = False
            for (ax, ay), (bx, by) in zip(ring, ring[1:] + ring[:1]):
                if (ay > y) != (by > y) and x < (bx - ax) * (y - ay) / (by - ay) + ax:
                    inside = not inside
            return inside

        for shop in self.data['shops']:
            with self.subTest(shop=shop['id']):
                if not shop.get('ward'):
                    continue  # Outside the 23 wards (Komae / Yokohama); no ward polygon to test.
                geometry = wards[shop['ward']]
                polygons = geometry['coordinates'] if geometry['type'] == 'MultiPolygon' else [geometry['coordinates']]
                self.assertTrue(any(in_ring(shop['lng'], shop['lat'], polygon[0]) and
                                    not any(in_ring(shop['lng'], shop['lat'], hole) for hole in polygon[1:])
                                    for polygon in polygons))

    def test_print_and_accessible_controls(self):
        html = (ROOT / 'ramen-map.html').read_text(encoding='utf-8')
        for hook in ('ramen-map', 'shop-list', 'shop-search', 'area-filter',
                     'fit-map', 'print-map', 'map-status', 'show-transit'):
            self.assertIn(f'id="{hook}"', html)
        self.assertIn('@media print', html)
        self.assertIn('<noscript>', html)
        self.assertIn('ramen-map.html', (ROOT / 'tools/sitelib.py').read_text(encoding='utf-8'))

    def test_script_and_markup_agree(self):
        """Every id the script reads must exist, and every hook in the page must be used."""
        html = (ROOT / 'ramen-map.html').read_text(encoding='utf-8')
        script = (ROOT / 'js/ramen-map.js').read_text(encoding='utf-8')
        page_ids = set(re.findall(r'\bid="([\w-]+)"', html))
        # ids created at runtime by the script itself (markers, ward labels, per-shop cards).
        runtime_ids = set(re.findall(r"id: '([\w-]+)'", script)) | {'ramen-transit'}

        looked_up = set(re.findall(r"\$\('([\w-]+)'\)", script))
        missing = sorted(looked_up - page_ids - runtime_ids)
        self.assertEqual(missing, [], f'script reads ids that no element defines: {missing}')

        # Static containers in the page that nothing populates or styles are dead weight.
        script_refs = looked_up | runtime_ids | set(re.findall(r"getElementById\('([\w-]+)'\)", script))
        unused = sorted(i for i in page_ids - script_refs
                        if i not in html.split('<style>')[-1].split('</style>')[0]
                        and f'href="#{i}"' not in html)
        self.assertEqual(unused, [], f'page defines ids nothing uses: {unused}')


if __name__ == '__main__':
    unittest.main()
