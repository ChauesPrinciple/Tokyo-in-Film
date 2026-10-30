import pathlib

p = pathlib.Path('bars-map.html')
t = p.read_text(encoding='utf-8')
old = 'stop-video" muted loop playsinline autoplay preload="metadata"'
new = 'stop-video" muted loop playsinline preload="metadata"'
count = t.count(old)
t = t.replace(old, new)
p.write_text(t, encoding='utf-8', newline='')
print(f'Replaced {count} occurrences. Remaining autoplay attrs: {t.count("autoplay preload")}')
