"""Fix em dashes in build.py journey intro and subvenue aria-labels."""
path = 'tools/build.py'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix journey intro
content = content.replace(
    'and the east-side after-hours crawl, and the far outliers \\u2014 ending at a door you have to be let into. Each stop is a place \\u2014 ',
    'and the east-side after-hours crawl, and the far outliers, ending at a door you have to be let into. Each stop is a place '
)

# Fix subvenue aria-label
content = content.replace(
    '\\u2014 focus on map',
    '- focus on map'
)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Fixed build.py voice violations')
