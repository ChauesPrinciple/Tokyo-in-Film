"""Fix comma splices left where an em dash was carrying a full clause.

The blunt em-dash removal left sentences like "Not a cocktail bar, a place
where..." which is a comma splice. Where the dash joined two independent
clauses, use a period and a short punchy follow-on, matching the site's
voice (short sentences, concrete, active).
"""
import json

path = 'assets/bars-map-data.json'
with open(path, encoding='utf-8') as f:
    data = json.load(f)

FIXES = [
    ("Not a cocktail bar, a place where the crowd came to hit things and then order a round.",
     "Not a cocktail bar. This is where the crowd came to hit things and then order a round."),
    ("JANAI means 'not this', the door is a speakeasy entrance, and what is behind it is a bar.",
     "JANAI means 'not this'. The door is a speakeasy entrance, and what is behind it is a bar."),
    ("Yes, pizza, wood-fired, counter seating, and a view that rivals New York Bar's.",
     "Yes, pizza. Wood-fired, counter seating, and a view that rivals New York Bar's."),
    ("The kind of Ginza bar where the elevator entrance is hard to find, that is the point.",
     "The kind of Ginza bar where the elevator entrance is hard to find. That is the point."),
    ("No signboard, third door from the outside.",
     "No signboard. It is the third door from the outside."),
    ("on Golden Gai 3rd street, six seats, drinks and snacks at the owner's discretion, like drinking in a friend's kitchen.",
     "on Golden Gai 3rd street. Six seats, drinks and snacks at the owner's discretion, like drinking in a friend's kitchen."),
    ("A six-seat casual bar on Golden Gai 3rd street. Drinks and snacks at the owner's discretion, like drinking in a friend's kitchen.",
     "A six-seat casual bar on Golden Gai 3rd street. Drinks and snacks at the owner's discretion, like drinking in a friend's kitchen."),
    ("the dense cluster of 200-plus tiny drinking dens off Kabukicho, each on a different floor of the same narrow alley.",
     "the dense cluster of 200-plus tiny drinking dens off Kabukicho. Each sits on a different floor of the same narrow alley."),
    ("Owner Yuta crafts seasonal cocktails with Japanese fruits, the strawberry margarita and Earl Grey tea sake are standouts.",
     "Owner Yuta crafts seasonal cocktails with Japanese fruits. The strawberry margarita and Earl Grey tea sake are standouts."),
    ("ground floor, no signboard, a lemon sour bar founded in 2015,",
     "ground floor, no signboard. A lemon sour bar founded in 2015,"),
    ("The name tells you where to look, go down.",
     "The name tells you where to look. Go down."),
    ("but a uniquely Tokyo evening out, reachable on the Chuo line from Shinjuku in about 20 minutes.",
     "but a uniquely Tokyo evening out, and reachable on the Chuo line from Shinjuku in about 20 minutes."),
    ("A members-only sake club in Minami-Aoyama, an extension of the original Naka-Meguro SAKEBARO.",
     "A members-only sake club in Minami-Aoyama, an extension of the original Naka-Meguro SAKEBARO."),
    ("Some pins are address-level approximations, check opening hours and reservations directly with each bar.",
     "Some pins are address-level approximations. Check opening hours and reservations directly with each bar."),
]

applied = 0


def apply(text):
    global applied
    for old, new in FIXES:
        if old in text and old != new:
            text = text.replace(old, new)
            applied += 1
    return text


if 'coordinateNote' in data:
    data['coordinateNote'] = apply(data['coordinateNote'])

for bar in data['bars']:
    if 'description' in bar:
        bar['description'] = apply(bar['description'])
    for sv in bar.get('subvenues', []):
        if 'description' in sv:
            sv['description'] = apply(sv['description'])

with open(path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write('\n')

print(f'Applied {applied} comma-splice fix(es).')
