---
description: Color grading — color correction decision protocol, when to grade, LUT selection, cinematic look, stage-driven color strategy
tags: [filmmaking, color, post-production, grading, DI]
---

# COLOR GRADING

## THE FUNDAMENTAL DECISION

Before touching any color control, answer two questions:

**Question 1: Does the footage need correction?**
- Does the image look natural and accurate? → Skip correction, go to grading
- Is there a color cast, wrong exposure, or inconsistency? → Correct first, always

**Question 2: Does this content warrant grading?**
- Narrative/artistic film → Grade after correction
- Interview, documentary, informational → Correct only. Do NOT grade.
- Student project with filmic intent → Grade

**The rule**: Correction is always mandatory when needed. Grading is always optional. Never grade before correcting. Never skip correction to save time.

---

## DECISION TREE: WHAT TO FIX FIRST

When you open footage that needs correction, diagnose in this order:

```
STEP 1 — COLOR CAST (Temperature/Tint)
Is there a dominant color bias? (Too blue? Too green? Too orange?)
→ YES: Fix temperature and tint first. Everything else is built on neutral color.
→ Use white balance dropper on any neutral white/grey in frame.
→ NO: Skip to Step 2.

STEP 2 — EXPOSURE
Is the overall image too bright or too dark?
→ TOO BRIGHT: Lower exposure. Then check highlights (blown faces = highlights down).
→ TOO DARK: Raise exposure. Then check shadows (crushed blacks = shadows up).
→ CORRECT: Skip to Step 3.

STEP 3 — CONTRAST
Does the image look flat (grey, lifeless)? Or crushed (too harsh)?
→ FLAT: Raise contrast. Lower blacks.
→ CRUSHED: Lower contrast. Raise shadows.
→ CORRECT: Skip to Step 4.

STEP 4 — DETAIL RECOVERY
Specific problems remaining:
→ Face blown out (white): Highlights DOWN
→ Background black detail missing: Shadows UP
→ Whole image too vivid: Saturation DOWN
→ Whole image too grey: Saturation UP slightly

STEP 5 — CONSISTENCY CHECK
Compare this clip against the clip before it and after it.
→ Do they match? → Done with correction.
→ Mismatch in warmth, brightness, or contrast? → Copy correction settings from the matching clip and adjust.
```

---

## Two Distinct Processes

Color work in post-production is always two steps. They must not be confused.

**Color Correction** = making the image look natural. Fixing what the camera got wrong. The goal is neutral, accurate, consistent.

**Color Grading** = applying a mood to corrected footage through deliberate color choices. The goal is emotional. Color grading is never done before color correction.

Sequence is always: Shoot → Color Correct → Color Grade. Never grade uncorrected footage.

---

## STEP 1: COLOR CORRECTION

### The Control Set

Every editing application has a color panel with the same fundamental controls:

| Control | What It Does | Direction |
|---------|-------------|-----------|
| **Temperature** | Blue-to-orange axis | Left = cooler/bluer; Right = warmer/more orange |
| **Tint** | Green-to-magenta axis | Left = green shift; Right = magenta shift. Use sparingly — tint is finicky |
| **Exposure** | Overall brightness of the entire image | Up = brighter; Down = darker |
| **Contrast** | Distance between lightest and darkest values | Up = deeper blacks, brighter whites; Down = flat, grey |
| **Highlights** | Brightness of the brightest image areas | Down = recover blown-out faces/lights; Up = intensify brights |
| **Shadows** | Brightness of the darkest image areas | Up = open up detail in blacks; Down = deeper, richer darks |
| **Whites** | Defines the threshold of what counts as highlight | Expands or contracts the highlight range |
| **Blacks** | Defines the threshold of what counts as shadow | Expands or contracts the shadow range |
| **Saturation** | Color intensity of the entire image | Up = more vivid; Down = desaturated toward grey |

### Correction Order (Always This Sequence)

1. **Temperature + Tint** — fix white balance first. Use the white balance dropper: click on something that should be neutral white in the frame. The software adjusts temperature and tint to make that value true neutral.
2. **Exposure** — get overall brightness to natural range
3. **Contrast** — set the tonal spread
4. **Highlights** — recover any blown-out areas
5. **Shadows** — open any crushed blacks
6. **Whites/Blacks** — fine-tune the range boundaries
7. **Saturation** — last; saturation changes will look wrong on wrongly-colored, wrongly-exposed footage

### White Balance Dropper

The fastest correction tool. Click on anything in the frame that should be neutral white (a white wall, white paper, a white shirt). The software adjusts temperature and tint to make that value truly neutral. This single action corrects most color casts from mixed lighting or incorrect in-camera settings.

**Auto button**: Every software has one. Useful as a starting point, rarely sufficient as a finish. Use auto to get the image into the right zone, then adjust manually.

### Common Correction Problems and Fixes

| Problem | Cause | Fix |
|---------|-------|-----|
| Footage too blue/cold | Daylight camera setting indoors | Temperature up (warm) |
| Footage too green | Fluorescent lighting | Tint toward magenta |
| Face blown out (white) | Overexposed | Highlights down |
| Image flat/grey | Low contrast | Contrast up; Blacks down |
| Too dark overall | Underexposed | Exposure up, then Shadows up to recover detail |
| Oversaturated, garish | High-saturation in-camera setting | Saturation down |

---

## STEP 2: COLOR GRADING

Color grading imposes a deliberate emotional mood on corrected footage. Used only in artistic/narrative film — not in interviews, news, or informational video.

### Emotional Color Language

| Mood | Color Direction | Application |
|------|----------------|-------------|
| Cold, sad, clinical, alien | Blues and greens in highlights | Raise blue in shadows; green tint overall |
| Warm, hopeful, intimate | Oranges and ambers | Warm temperature; orange highlights |
| Teal-orange (cinematic standard) | Blue shadows + orange highlights | The most common Hollywood look — cool darks, warm skin tones |
| Horror, dread | Desaturated overall + single color preserved | Pull saturation; keep one hue (often red or green) |
| Nostalgia, memory | Faded blacks (lifted shadows), warm | Shadow lift (never true black); warm temperature |
| Clinical, institutional | Desaturated, flat contrast, slight green | Low saturation; slight green tint; low contrast |

### The Teal-Orange Look (Standard Cinematic Grade)

The most widely used cinematic grade. Works because skin tones are naturally orange — grading orange into highlights makes skin pop; grading blue into shadows creates contrast against warm skin.

**Method:**
1. In the shadow color controls: push toward blue/teal
2. In the highlight color controls: push toward orange
3. Adjust intensity — subtle is correct; extreme is a stylistic choice, not a professional standard

### LUTs (Look-Up Tables)

A LUT is a one-click color transformation — a mathematical map from input color values to output values. LUTs can simulate film stocks, match cameras, or apply complete grade looks.

**How to use**: Apply LUT, then reduce intensity to taste. A LUT at 100% is usually too strong. 30–70% is the working range.

**LUT order**: Correction LUT (technical, for camera matching) → Creative LUT (aesthetic, for mood) → Manual adjustments on top.

**Caution**: LUTs designed for one camera look wrong on footage from a different camera. Match LUT to source camera profile.

---

## THE CINEMATIC LOOK: THREE ELEMENTS

Combined, these three create the "film look" associated with narrative cinema:

### 1. Color Grade
Teal-orange (or any deliberate grading choice). The emotional color layer.

### 2. Letterboxing
Black bars added to top and bottom of frame, creating a widescreen (2.35:1 or 2.39:1) aspect ratio from standard 16:9 footage. Most cinema is shot wider than 16:9 — letterboxing signals "this is a film."

**When to use**: Only in narrative film with intentional framing. Not in talking-head or informational video — letterboxing removes visual information from these formats.

### 3. Film Grain / Noise
A small percentage of artificial grain added to the image. Digital cameras produce images that are too clean — they read as video, not film. A small amount of grain (1–5%) gives the image organic texture.

**Rule**: Less is more. If the grain is visible and noticeable, it's too much. The grain should be felt, not seen.

---

## DECISION PROTOCOL: CHOOSING A GRADE

Given a scene, determine its grade by answering these questions in order:

**1. What is the emotional register of this scene?**
- Safe, functional, professional → No grade. Correction only.
- Tension building, first signs of wrongness → Subtle: slight teal in shadows, saturation -10%
- Psychological pressure, loss of stability → Moderate: teal-orange inverted (blue highlights), saturation -20–30%
- Horror, breakdown, disintegration → Strong: near-monochromatic, single color preserved, blue dominant
- Resolution/aftermath of horror → Desaturated almost to black and white, but with one warm note preserved (the human that survived)

**2. What is the Stage?**
- Stage One → Correction only. The world should look real and knowable.
- Stage Two → Subtle grade. The world looks almost right. The wrongness is felt, not seen.
- Stage Three → Full grade. The world no longer looks like the world.

**3. Is there an Entity-adjacent element in the frame?**
- YES → Desaturate the Entity's portion of frame 30–50% relative to the rest. Do not grade the Entity — it absorbs the grade. It has no color.
- NO → Grade the whole frame uniformly.

**4. Do shots need to match across the scene?**
- Dialogue scene with coverage → Grade the master, then copy grade to all coverage shots. Adjust exposure only if needed.
- Single shots → Grade independently.
- Sequence with time passage → Grade may shift progressively across the sequence (track the stage deterioration).

**5. Should you use a LUT?**
- You have matching camera footage → Use a technical (correction) LUT for the camera model, then apply creative grade on top
- You want a consistent look across many clips → Apply one creative LUT at low intensity (30–60%) as a base, adjust per-clip on top
- Your footage is from different cameras → Do NOT apply the same LUT to all clips. Correct each camera independently first.
- You want to experiment with looks quickly → Use LUTs as previews. Settle on a direction, then build the grade manually for precision.

---

## ON THE EDGE COLOR STRATEGY

### Stage Map

| Stage | Temperature | Contrast | Saturation | Grade | Shadows | Highlights |
|-------|-------------|----------|------------|-------|---------|------------|
| **Stage One** | 4100K (ship fluorescent, unified) | Medium (natural) | 90% (near natural) | None — correction only | Natural dark | Natural |
| **Stage Two** | Mixed 3200K + 5600K (unmotivated mixing begins) | Medium-high | 70% (slightly desaturated) | Slight teal into shadows | Lifted slightly (unease) | Orange pushed on skin |
| **Stage Three** | 6500K+ cold (blue dominant) | High | 40–50% (near greyscale, one color preserved) | Full teal-blue, orange removed from skin | Near-crushed black | Minimal |
| **Climax/Resolution** | Near monochromatic | Maximum | 20–30% | Single hue preserved — choose one | True black | One blown element |

### Entity Color Rule
The Entity receives no color grade. Wherever it is present in frame, surrounding colors desaturate. This is achieved in post: rotoscope or mask the entity-adjacent region, desaturate it by 30–50% relative to the rest of the frame. The Entity is where color goes to die.

### Character Grade Registers
- **Reyes**: Always the most naturally colored character. Her gradual desaturation tracks the mission's deterioration.
- **Tanaka**: Once he agrees — Grade 2 applied immediately. He is already in Stage Three coloring while the rest of the crew is in Stage Two.
- **Marshall**: Warm key maintained as long as possible. His warmth is the last natural color in the film.
- **Costa**: The moment she is framed in the doorway of her quarters (pre-discovery), the grade shifts cold in her portion of the frame. Motivated by the dead color of her posture.

---

## INTEGRATION WITH OTHER SKILLS

- Works with **@lighting-architecture** — the color grade continues and deepens the key-to-fill work done in production. If Stage Two lighting creates shadow depth at 4:1, the grade deepens those shadows further.
- Works with **@editorial-grammar** — match grade to pacing. Fast-cut sequences can tolerate stronger grades; long takes require more subtle grading (the audience spends more time with the image).
- Works with **@production-protocol** — inform the DOP at pre-production about the intended grade so they shoot with latitude (flat LOG or C-LOG profiles where possible). Never correct a camera that shot in a "finished" picture profile.

---

## OUTPUT FORMAT

When specifying color for a scene:

```
SCENE: [heading]
STAGE: [One / Two / Three]

COLOR CORRECTION:
- Temperature: [K value or direction]
- Tint: [magenta/neutral/green, amount]
- Exposure: [+/- stops]
- Contrast: [low/medium/high]
- Highlights: [+/- %, note any blown regions]
- Shadows: [+/- %, note any crushed regions]
- Saturation: [% of natural]

COLOR GRADE:
- Grade Type: [teal-orange / cold / desaturated / none]
- Shadow Color: [direction and intensity]
- Highlight Color: [direction and intensity]
- LUT: [name or none]
- Intensity: [%]

CINEMATIC ELEMENTS:
- Letterbox: [yes/no + ratio]
- Grain: [% or none]

SPECIAL:
[Entity adjacent desaturation? Character-specific grade variation?]
```


---

## Sources

**Primary:**

- `[Filmmaking:MakingAFilm]` — color and post-production chapters.
- `[DigitalFilmmaking]` — beginner-level color-correction guidance.

**External (un-grounded locally):**

- `[external-source: Hullfish, The Art and Technique of Digital Color Correction]` — canonical color-grading reference; not in local corpus.
- `[external-source: Van Hurkman, Color Correction Handbook]` — canonical technical reference; not in local corpus.

**General knowledge** `[general-knowledge]`:

- LUT mechanics, color-wheel terminology, and stage-driven grading conventions (cool-for-night, warm-for-memory, etc.) are widely-taught and not contested at the level this skill operates.

**Pending verification:**

- Specific look references (e.g., "the Fincher teal-and-orange") are `[general-knowledge]` but stylistic claims attributed to specific colorists or films should be verified before assertion.