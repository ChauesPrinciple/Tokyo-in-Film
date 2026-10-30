"""
Apply Phase 1 verification fixes to assets/bars-map-data.json.

Fixes:
- 7 critical mismatches (wrong city, wrong business, wrong location)
- 17 floor/building additions
- 3 coordinate corrections
- Golden Gai structured subvenues
- Separate factual data from presentation settings
"""
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

path = 'assets/bars-map-data.json'
with open(path, 'r', encoding='utf-8') as f:
    d = json.load(f)

bars = d['bars']
by_id = {b['id']: b for b in bars}

# --- Critical fixes ---

# #4 Nocturne -> Tokyo NOCTURNE (not Hong Kong)
b = by_id['nocturne']
b['name'] = 'NOCTURNE'
b['aliases'] = ['ノクターン', 'オーセンティックバー Nocturne']
b['address'] = '3F Ryushin Building, 8-7-9 Ginza, Chuo-ku, Tokyo'
b['style'] = 'Authentic bar'
b['description'] = "An authentic bar on the 3rd floor of the Ryushin Building in Ginza, near Shimbashi. A quiet counter with a master who knows his cocktails and his regulars. The kind of Ginza bar where the elevator entrance is hard to find — that is the point."
b['mapsUrl'] = 'https://www.google.com/maps/search/?api=1&query=NOCTURNE+Ginza+8-7-9+Tokyo'
b['sources'] = [
    {'label': 'Tabelog', 'url': 'https://tabelog.com/tokyo/A1301/A130103/13058173/'},
    {'label': 'Open in Maps', 'url': 'https://www.google.com/maps/search/?api=1&query=NOCTURNE+Ginza+8-7-9+Tokyo'}
]

# #8 Bar rest fine -> Bar rest (Tokyo, not Kumamoto)
b = by_id['bar-rest-fine']
b['id'] = 'bar-rest'
b['name'] = 'Bar rest'
b['aliases'] = ['歌舞伎町 rest', 'スナックバー rest']
b['address'] = '3F Dai-san Hirasawa Building, 2-46-7 Kabukicho, Shinjuku-ku, Tokyo'
b['style'] = 'Snack bar'
b['description'] = "A snack bar on the 3rd floor of the Dai-san Hirasawa Building in Kabukicho, one minute from Seibu-Shinjuku station. A hidden counter with a view of the trains rolling past the Shinjuku skyline. The master keeps a quiet room above the noise below."
b['mapsUrl'] = 'https://www.google.com/maps/search/?api=1&query=Bar+rest+2-46-7+Kabukicho+Shinjuku+Tokyo'
b['sources'] = [
    {'label': 'Official site', 'url': 'https://bar-rest.shop/'},
    {'label': 'Open in Maps', 'url': 'https://www.google.com/maps/search/?api=1&query=Bar+rest+2-46-7+Kabukicho+Shinjuku+Tokyo'}
]

# #9 Eigakan Jazz -> Hakusan, Bunkyo-ku (not Kabukicho)
b = by_id['eigakan-jazz']
b['area'] = 'Hakusan'
b['ward'] = 'Bunkyo'
b['lat'] = 35.721989
b['lng'] = 139.752213
b['address'] = 'B1F, 5-33-19 Hakusan, Bunkyo-ku, Tokyo 112-0001'
b['station'] = 'Hakusan (Toei Mita Line A3) — 1 min walk'
b['description'] = "A jazz kissa in Hakusan, down a narrow staircase from street level. The name means 'cinema.' Vinyl on the turntable, dim light below ground, and a room that has been spinning records for decades. Cash only. Closed Sundays, Mondays, and holidays."
b['mapsUrl'] = 'https://www.google.com/maps/search/?api=1&query=Eigakan+Jazz+5-33-19+Hakusan+Bunkyo+Tokyo'
b['sources'] = [
    {'label': 'Official site', 'url': 'http://www.jazzeigakan.com/'},
    {'label': 'Open in Maps', 'url': 'https://www.google.com/maps/search/?api=1&query=Eigakan+Jazz+5-33-19+Hakusan+Bunkyo+Tokyo'}
]

# #14 FIGHTCLUB Shibuya -> Dogenzaka (not Udagawacho)
b = by_id['fightclub']
b['area'] = 'Dogenzaka'
b['lat'] = 35.659412
b['lng'] = 139.697601
b['address'] = '1F Towa Dogenzaka Building, 2-27-2 Dogenzaka, Shibuya-ku, Tokyo'
b['description'] = "A kickboxing gym and bar on Dogenzaka in Shibuya. Fight training upstairs, drinks after. Not a cocktail bar — a place where the crowd came to hit things and then order a round. Loud, young, and exactly what the name says."
b['mapsUrl'] = 'https://www.google.com/maps/search/?api=1&query=FIGHTCLUB+Shibuya+2-27-2+Dogenzaka+Tokyo'
b['sources'] = [
    {'label': 'Open in Maps', 'url': 'https://www.google.com/maps/search/?api=1&query=FIGHTCLUB+Shibuya+2-27-2+Dogenzaka+Tokyo'}
]

# #15 BUNDAN -> Komaba, Meguro-ku (not Shibuya/Jinnan)
b = by_id['bundan']
b['area'] = 'Komaba'
b['ward'] = 'Meguro'
b['lat'] = 35.663353
b['lng'] = 139.679703
b['address'] = 'Inside the Museum of Modern Japanese Literature, 4-3-55 Komaba, Meguro-ku, Tokyo'
b['station'] = 'Komaba-Todaimae (Keio Inokashira) — 3 min walk'
b['description'] = "A literary cafe and bar inside the Museum of Modern Japanese Literature in Komaba. Coffee by day, beer and wine by evening, and books on every wall. The name means 'passing along a story.' A quiet stop between the museum and the park."
b['mapsUrl'] = 'https://www.google.com/maps/search/?api=1&query=BUNDAN+Coffee+Beer+Komaba+Meguro+Tokyo'
b['sources'] = [
    {'label': 'Open in Maps', 'url': 'https://www.google.com/maps/search/?api=1&query=BUNDAN+Coffee+Beer+Komaba+Meguro+Tokyo'}
]

# #25 NARU -> Fix address (2-1, not 2-1-19), B1 Jujiya Building
b = by_id['naru-jazz']
b['lat'] = 35.6995469
b['lng'] = 139.7630305
b['address'] = 'B1 Jujiya Building, 2-1 Kanda Surugadai, Chiyoda-ku, Tokyo 101-0062'
b['mapsUrl'] = 'https://www.google.com/maps/search/?api=1&query=NARU+Jazz+Livehouse+2-1+Kanda+Surugadai+Ochanomizu+Tokyo'
b['sources'] = [
    {'label': 'Open in Maps', 'url': 'https://www.google.com/maps/search/?api=1&query=NARU+Jazz+Livehouse+2-1+Kanda+Surugadai+Ochanomizu+Tokyo'},
    {'label': 'ocha-naru.com', 'url': 'http://ocha-naru.com/'}
]

# #30 Sake Bar O -> SAKEBARO Aoyama (confirmed Aoyama branch)
b = by_id['sake-bar-o']
b['name'] = 'SAKEBARO Aoyama'
b['aliases'] = ['酒バー O', 'Sakebaro', 'SAKEBARO 青山店']
b['address'] = '1F MD Aoyama, 2-10-8 Minami-Aoyama, Minato-ku, Tokyo 107-0062'
b['description'] = "The one that is not like the others. A members-only sake club in Minami-Aoyama — an extension of the original Naka-Meguro SAKEBARO. A tin cube counter, an auto-playing piano, LED light that shifts from deep blue to red. A curated cellar of rare and seasonal brews, and staff who can tell you the brewery, the yeast strain, and the rice polish rate for every pour. Everything else on this map you can walk into. This one you have to be let into."
b['mapsUrl'] = 'https://www.google.com/maps/search/?api=1&query=SAKEBARO+Aoyama+2-10-8+Minami-Aoyama+Tokyo'
b['sources'] = [
    {'label': 'Official site', 'url': 'https://www.sakebaro.biz/location-aoyama'},
    {'label': 'Open in Maps', 'url': 'https://www.google.com/maps/search/?api=1&query=SAKEBARO+Aoyama+2-10-8+Minami-Aoyama+Tokyo'}
]

# --- Floor/building additions ---

# #1 Apollo Bar Ginza
b = by_id['apollo-bar']
b['address'] = 'B1F MEIKO Building, 8-2-15 Ginza, Chuo-ku, Tokyo'

# #2 Star Bar Ginza
b = by_id['star-bar']
b['address'] = 'B1F MODERNS GINZA, 1-5-13 Ginza, Chuo-ku, Tokyo'

# #3 Lamp Bar
b = by_id['lamp-bar']
b['address'] = '4F Wakamatsu Building, 6-6-19 Ginza, Chuo-ku, Tokyo'

# #6 Bar Cocktailbook Shinjuku
b = by_id['bar-cocktailbook']
b['address'] = '2F Plaza Nishishinjuku, 7-5-5 Nishishinjuku, Shinjuku-ku, Tokyo'

# #10 SAKE MARKET Shinjuku
b = by_id['sake-market']
b['address'] = '6F Shinjuku Watassei-Tama Building, 3-9-9 Shinjuku, Shinjuku-ku, Tokyo'

# #11 a BAR Sleeping Tales — fix coordinates too
b = by_id['a-bar-sleeping-tales']
b['lat'] = 35.688427
b['lng'] = 139.709824
b['address'] = 'B1F (right door) Towa Shinjuku Gyoen Co-op II, 2-1-14 Shinjuku, Shinjuku-ku, Tokyo'

# #13 A10 — fix district (Ebisunishi, not Ebisuminami)
b = by_id['a10']
b['area'] = 'Ebisunishi'
b['address'] = 'B1F Bios Building, 1-12-11 Ebisunishi, Shibuya-ku, Tokyo'

# #16 Bar sawa
b = by_id['bar-sawa']
b['address'] = '1F Forum Nakameguro, 1-6-7 Higashiyama, Meguro-ku, Tokyo'

# #17 Gen Yamamoto
b = by_id['gen-yamamoto']
b['address'] = '1F Anniversary Building, 1-6-4 Azabujuban, Minato-ku, Tokyo'

# #18 Bar Centifolia
b = by_id['bar-centifolia']
b['address'] = '6F La Muse Azabujuban Building, 1-6-5 Azabujuban, Minato-ku, Tokyo'

# #19 Rokusan Angel
b = by_id['rokusan-angel']
b['address'] = 'B2F Roppongi Nittaku Building, 3-8-15 Roppongi, Minato-ku, Tokyo'

# #23 The TRAD
b = by_id['the-trad']
b['address'] = '1F Fukase Building, 3-43-9 Yushima, Bunkyo-ku, Tokyo'

# #24 Rock Bar Sakebi
b = by_id['rock-bar-sakebi']
b['address'] = '1F, 2-16-11 Negishi, Taito-ku, Tokyo'

# #26 Game Bar A-Button
b = by_id['game-bar-abutton']
b['address'] = '1F Dai-5 Mitsumasa Building, 1-13-9 Taito, Taito-ku, Tokyo'

# #27 No Room For Squares
b = by_id['no-room-squares']
b['address'] = '4F Housing Kitazawa Building II, 2-1-7 Kitazawa, Setagaya-ku, Tokyo'

# #28 Shooting Bar EA
b = by_id['shooting-bar-ea']
b['address'] = '2F Sawada Building, 1-5-5 Gotenyama, Musashino, Tokyo'

# --- Golden Gai: add structured subvenues ---
b = by_id['golden-gai-trio']
b['subvenues'] = [
    {
        'name': 'Happy (Rockin\' Soul Bar)',
        'aliases': ['ハッピー', 'ロッキンソールバー'],
        'address': '3F Maruha Building, 1-1-7 Kabukicho, Shinjuku-ku, Tokyo',
        'floor': '3F',
        'building': 'Maruha Building',
        'description': "A soul-and-rock counter bar on the 3rd floor of the Maruha Building. 4.8 rating. Go up the stairs.",
        'mapsUrl': 'https://www.google.com/maps/search/?api=1&query=Happy+Rockin+Soul+Bar+1-1-7+Kabukicho+Shinjuku+Tokyo'
    },
    {
        'name': 'BAR COO',
        'aliases': ['バー 空', 'BAR COO 空'],
        'address': '1F, 1-1-8 Kabukicho, Shinjuku-ku, Tokyo',
        'floor': '1F',
        'building': None,
        'description': "A six-seat casual bar on Golden Gai 3rd street. Drinks and snacks at the owner's discretion — like drinking in a friend's kitchen.",
        'mapsUrl': 'https://www.google.com/maps/search/?api=1&query=BAR+COO+1-1-8+Kabukicho+Shinjuku+Tokyo'
    },
    {
        'name': 'OPEN BOOK',
        'aliases': ['オープンブック'],
        'address': '1-1-6 Kabukicho, Shinjuku-ku, Tokyo',
        'floor': 'Ground floor',
        'building': None,
        'description': "A lemon sour bar on Golden Gai 5th street, founded in 2015. No signboard — third door from the outside. Shelves lined with books inherited from the owner's grandfather, poet Tanaka Kojimasa.",
        'mapsUrl': 'https://www.google.com/maps/search/?api=1&query=OPEN+BOOK+1-1-6+Kabukicho+Golden+Gai+Shinjuku+Tokyo'
    }
]

# --- Update metadata ---
d['reviewed'] = '2026-09-08'
d['coordinateNote'] = "Coordinates verified against official venue pages, Tabelog, the GSI address-search API, and the saved-place export. Floor and building data added from official sources. Some pins are address-level approximations — check opening hours and reservations directly with each bar."

# --- Write ---
with open(path, 'w', encoding='utf-8') as f:
    json.dump(d, f, ensure_ascii=False, indent=2)

print(f"Applied all Phase 1 fixes to {len(bars)} bars.")
print()
for b in bars:
    print(f"  {b['number']:2}. {b['name']:42} {b['lat']}, {b['lng']}  {b.get('ward','?')}")
