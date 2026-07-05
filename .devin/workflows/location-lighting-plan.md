---
description: Create lighting plot for location with key-to-fill ratios, positions, gels, motivated sources
---

# LOCATION LIGHTING PLAN WORKFLOW

## WHEN TO INVOKE

**YES — invoke this workflow when:**
- You have a shot list AND coverage plan and need to design the lighting setup for a specific location
- Someone asks "how do we light this?", "what's the key-to-fill ratio?", or "where do lights go?"
- The scene's emotional register requires a specific lighting strategy (2:1 stable / 4:1 tense / 8:1 horror)

**NO — do not invoke when:**
- You don't have a shot list or coverage plan yet → those must come first
- The question is about color grading in post → that is `@color-grading`
- The question is about smartphone auto-exposure or natural light adjustments → answer inline from `@lighting-architecture`

**Sequence position**: Step 3 of the production chain.
`/script-to-shotlist` → `/coverage-strategy` → `/location-lighting-plan` → `/editorial-assembly`

**Dependencies required before starting**:
- Shot list (with shot sizes per shot)
- Coverage plan (camera positions, 180° line)
- Emotional register of the scene (determines key-to-fill ratio via `@lighting-architecture`)

## Input Required
- Location description (interior/exterior, specific room/space)
- Emotional tone (2-3 words)
- Time of day (day/night/institutional)
- Motivated sources (windows, practicals, overhead lights)
- Shot list (to determine lighting needs per shot)

## Process

### Step 1: Identify Motivated Sources with @lighting-architecture
- List all visible or implied light sources in location
- Determine color temperature of each source
- Note which sources can serve as key, fill, or back lights

### Step 2: Determine Key-to-Fill Ratio
- Based on emotional tone:
  - Stable/ordinary → 2:1 ratio
  - Dramatic/tense → 4:1 ratio
  - Horror/breakdown → 8:1+ ratio
  - Unknowable → No fill (silhouette)

### Step 3: Position Three-Point Lights
- Key light: 30–45° off camera axis, 30–45° above subject, at determined intensity
- Fill light: Opposite side, camera height, at ratio-appropriate intensity
- Back light: Behind subject, 45° above, equal to key intensity

### Step 4: Plan Gels and Color Correction
- Match or contrast motivated sources
- CTO for warming, CTB for cooling
- Plus/Minus Green for fluorescent correction

### Step 5: Create Lighting Diagram
- Floor plan showing light positions
- Numbered lights corresponding to equipment list
- Beam angles and diffusion notes

## Output Format

```
LOCATION: [name]
EMOTIONAL TONE: [2-3 words]
TIME OF DAY: [day/night/institutional]

MOTIVATED SOURCES:
- [Source 1]: [color temp] - [function in scene]
- [Source 2]: [color temp] - [function in scene]
...

LIGHTING PLOT:

Key Light:
- Position: [degrees off axis, degrees above subject]
- Intensity: [foot-candles]
- Quality: [hard/soft]
- Gel: [if any]
- Motivated by: [source]

Fill Light:
- Position: [opposite key, camera height]
- Intensity: [foot-candles] (Ratio: [X:1])
- Quality: [soft always]
- Gel: [if any]

Back Light:
- Position: [behind subject, degrees above]
- Intensity: [foot-candles]
- Quality: [hard/soft]
- Gel: [if any]

Practicals (in frame):
- [Practical 1]: [position] - [wattage] - [function]
- [Practical 2]: [position] - [wattage] - [function]

EQUIPMENT LIST:
- [Number] × [Light type] ([wattage])
- [Number] × [Diffusion type]
- [Number] × [Gel type]
- [Number] × [Stands/clamps]

LIGHTING DIAGRAM:
[ASCII or description of floor plan with numbered light positions]

SETUP TIME: [estimated hours]
POWER REQUIREMENTS: [amps needed]
SAFETY NOTES: [any electrical/heat concerns]
```

## Example

**Input:**
```
Location: INT. BRIDGE — Ship interior
Emotional Tone: Functional, ordinary, stable (Stage One)
Time of Day: Continuous artificial light
Motivated Sources: Overhead fluorescent panels, console screens, viewport starlight
```

**Output:**
```
LOCATION: INT. BRIDGE — Ship Interior
EMOTIONAL TONE: Functional, ordinary, stable
TIME OF DAY: Continuous artificial (space)

MOTIVATED SOURCES:
- Overhead fluorescent panels: 4100K (institutional) - main illumination
- Console screens: 5600K (blue-white) - fill on faces
- Viewport starlight: 5600K (cool) - backlight/rim

LIGHTING PLOT:

Key Light:
- Position: 45° camera right, 45° above subject (simulating overhead panels)
- Intensity: 300 foot-candles
- Quality: Soft (through 4×4 silk to simulate fluorescent diffusion)
- Gel: Plus Green 1/4 (fluorescent tint)
- Motivated by: Overhead fluorescent panels

Fill Light:
- Position: 45° camera left, camera height
- Intensity: 150 foot-candles (Ratio: 2:1)
- Quality: Soft (bounce off white foam core)
- Gel: Plus Green 1/8 (match key)

Back Light:
- Position: Behind subject, 45° above, aimed at shoulders
- Intensity: 300 foot-candles
- Quality: Hard (focused beam)
- Gel: CTB 1/2 (cool rim, simulating viewport starlight)

Practicals (in frame):
- Console screens: LED panels at 50% brightness - motivated fill
- Overhead panels: Practical fluorescent tubes (visible in wide shots) - motivated key
- Viewport: LED panel outside window with star field - motivated back

EQUIPMENT LIST:
- 2 × Kino Flo 4-bank (key and fill)
- 1 × 650W Fresnel (back light)
- 4 × LED panels (console practicals)
- 2 × Practical fluorescent fixtures (overhead)
- 1 × Large LED panel (viewport exterior)
- 2 × 4×4 silk (diffusion)
- 1 × White foam core 4×8 (bounce for fill)
- Gels: Plus Green 1/4, Plus Green 1/8, CTB 1/2
- 6 × C-stands with arms
- 2 × Combo stands

LIGHTING DIAGRAM:
```
        [Overhead Practical]
                |
    [Key]----[SUBJECT]----[Fill]
                |
            [Back]
        (viewport behind)
```

Camera positions rotate around subject, lighting stays consistent.

SETUP TIME: 2.5 hours (first setup), 30 min adjustments per new angle
POWER REQUIREMENTS: 30 amps (dedicated circuit needed)
SAFETY NOTES: Kino Flos run cool, Fresnel gets hot (keep clear of set dressing)
```

## Integration

This workflow uses:
- @lighting-architecture for all lighting decisions
- @visual-grammar for shot size considerations (CU needs tighter lighting control)
- @staging-blocking for camera positions (lights must stay out of frame)
- @acoustic-design for avoiding lighting hum in audio
