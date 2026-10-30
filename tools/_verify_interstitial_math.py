"""Verify the coverage-driven reveal never leaves a blank hole.

A blank hole is any scroll position where the spacer covers a meaningful
share of the viewport but the media is not fully opaque.
"""
h = 560.0
FADE_AT = 0.25   # reveal reaches 1.0 once the spacer owns this share
COVER_AT = 0.75  # .is-active threshold

print(' spacerTop  covers  ratio  reveal  covering  blank-hole?')
holes = 0
steps = 40
for i in range(steps + 1):
    top = h - (2 * h) * i / steps
    bottom = top + h
    covered = max(0.0, min(h, bottom) - max(0.0, top))
    ratio = covered / h
    reveal = max(0.0, min(1.0, ratio / FADE_AT))
    covering = ratio >= COVER_AT
    # Hole: spacer covers >25% of screen but media is not opaque
    hole = ratio > 0.25 and reveal < 0.99
    if hole:
        holes += 1
    print(f'{top:9.0f} {covered:7.0f} {ratio*100:5.0f}% {reveal:6.2f}  '
          f'{str(covering):5}   {"YES" if hole else "no"}')

print()
print(f'blank-hole positions: {holes}')
print()
print('old behaviour for comparison (fixed progress bands):')
for p in (0.65, 0.70, 0.80):
    traveled = p * 2 * h
    top = h - traveled
    covered = max(0.0, min(h, top + h) - max(0.0, top))
    print(f'  progress {p:.2f}: covered {covered:.0f}px ({covered/h*100:.0f}%) '
          f'but is-exiting forced opacity 0 -> blank')
