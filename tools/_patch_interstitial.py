"""Patch build.py to add interstitial support."""
path = 'tools/build.py'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line with "prev_leg = -1" and insert interstitial code before it
# and modify the loop to emit interstitials between legs.
out = []
i = 0
inserted = False
while i < len(lines):
    line = lines[i]
    # Insert interstitial definitions before "prev_leg = -1"
    if 'prev_leg = -1' in line and not inserted:
        # First, insert the interstitial definitions
        out.append('    # Interstitial transit clips inserted between legs \u2014 walking footage\n')
        out.append('    # that gives the feeling of moving through Tokyo between neighborhoods.\n')
        out.append('    # Keyed by the leg index they appear BEFORE (0 = before leg 0, etc.)\n')
        out.append('    interstitials = {\n')
        out.append('        1: (\'assets/movie/interstitial-hallway.webm\', \'assets/movie/interstitial-hallway.mp4\',\n')
        out.append('            \'Walking down a narrow hallway\'),\n')
        out.append('        2: (\'assets/movie/interstitial-stairs.webm\', \'assets/movie/interstitial-stairs.mp4\',\n')
        out.append('            \'Descending stairs\'),\n')
        out.append('        3: (\'assets/movie/janai-coffee.webm\', \'assets/movie/janai-coffee.mp4\',\n')
        out.append('            \'Finding the door\'),\n')
        out.append('    }\n')
        out.append('\n')
        out.append('    def _interstitial(leg_idx):\n')
        out.append('        if leg_idx not in interstitials:\n')
        out.append('            return \'\'\n')
        out.append('        webm, mp4, alt = interstitials[leg_idx]\n')
        out.append('        return (\n')
        out.append('            f\'<figure class="journey-interstitial" aria-label="{_esc(alt)}">\'\n')
        out.append('            f\'<video class="stop-video" muted loop playsinline preload="metadata">\'\n')
        out.append('            f\'<source src="{_esc(webm)}" type="video/webm">\'\n')
        out.append('            f\'<source src="{_esc(mp4)}" type="video/mp4">\'\n')
        out.append('            f\'</video></figure>\'\\n')
        out.append('        )\n')
        out.append('\n')
        out.append(line)  # "prev_leg = -1"
        inserted = True
        i += 1
        continue
    # Modify the leg-change block to emit interstitials
    if 'if leg != prev_leg:' in line:
        out.append(line)
        i += 1
        # Next line should be "title, subtitle = legs[leg]"
        if i < len(lines) and 'title, subtitle = legs[leg]' in lines[i]:
            # Insert interstitial emission before the leg header
            out.append('            if prev_leg >= 0:\n')
            out.append('                parts.append(_interstitial(leg))\n')
            out.append(lines[i])  # title, subtitle = legs[leg]
            i += 1
        continue
    out.append(line)
    i += 1

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(out)
print('Patched' if inserted else 'Not found')
