---
description: Transform screenplay scene into numbered shot list with size, focal length, movement, function
---

# SCRIPT TO SHOT LIST WORKFLOW

## WHEN TO INVOKE

**YES — invoke this workflow when:**
- You have a screenplay scene and need to translate it into a numbered shot list for production
- A director, producer, or filmmaker says "what shots do we need for this scene?"
- Pre-production planning requires a specific shot count and sequence

**NO — do not invoke when:**
- You only have a concept or logline (no scene written yet) → write the scene first using `/write-short-film`
- You need a full coverage floor plan → that is `/coverage-strategy`, which comes AFTER this workflow
- You need storyboard panels → that is `/professional-storyboard`, which comes AFTER this workflow

**Sequence position**: This is Step 1 of the production chain.
`/script-to-shotlist` → `/coverage-strategy` → `/location-lighting-plan` → `/editorial-assembly` → `/production-package`

**Dependencies required before starting**:
- Scene text (slug line + action lines + dialogue)
- Emotional tone of the scene (2-3 words)
- Character states (stable / pressured / breaking)

## Input Required
- Scene heading (INT/EXT, location, time)
- Scene description (action lines, dialogue)
- Emotional tone (2-3 words)
- Character states (stable/pressured/breaking/refusing)

## Process

### Step 1: Analyze Scene with @visual-grammar
- Identify emotional tone
- Determine character states
- Map shot size progression (ELS → LS → MS → CU → ECU)
- Note compositional needs (lead room, headroom, rule of thirds)

### Step 2: Determine Focal Lengths with @optics-psychology
- For each shot size, select focal length (wide/normal/telephoto)
- Determine depth of field (shallow/deep)
- Consider subject-environment relationship
- Note psychological read

### Step 3: Plan Camera Movement (if any)
- Static shots (tripod)
- Pan/tilt (motivated by subject movement or reveal)
- Dolly/track (moving with subject or crossing 180° line)
- Handheld (chaos, POV, urgency)

### Step 4: Assign Functions
- Establishing (geography, scale)
- Story shot (dialogue, relationship)
- Reaction (emotion, decision)
- Detail (emphasis, information)
- Transition (cut-away, re-establishing)

### Step 5: Number and Sequence
- Number shots in shooting order (not necessarily story order)
- Group by camera position to minimize moves
- Note dependencies (Shot 3 requires Shot 1 setup)

## Output Format

```
SCENE: [heading]
EMOTIONAL TONE: [2-3 words]
TOTAL SHOTS: [number]

SHOT LIST:
1. [Size] - [Focal Length] - [Movement] - [Subject] - [Function]
   Setup: [lighting/camera position notes]
   Duration: [estimated seconds]

2. [Size] - [Focal Length] - [Movement] - [Subject] - [Function]
   Setup: [lighting/camera position notes]
   Duration: [estimated seconds]

...

SHOOTING ORDER:
[Reordered shot numbers grouped by setup efficiency]

ESTIMATED SHOOT TIME:
Setup: [hours]
Shooting: [hours]
Total: [hours]
```

## Example

**Input:**
```
INT. BRIDGE — STAGE ONE (Minutes 0-8)
Five people doing five different things at exactly the same moment.
Emotional Tone: Functional, ordinary, stable
```

**Output:**
```
SCENE: INT. BRIDGE — STAGE ONE
EMOTIONAL TONE: Functional, ordinary, stable
TOTAL SHOTS: 10

SHOT LIST:
1. ELS - Wide (6mm) - Static - Bridge from doorway, all five crew visible - Establishing
   Setup: Key light from overhead practicals, 2:1 ratio, deep focus
   Duration: 8 seconds

2. MS - Normal (10mm) - Static - Reyes at console, three data streams visible - Story shot
   Setup: Console glow as key, 2:1 ratio, coffee cup in foreground
   Duration: 5 seconds

3. MS - Normal (10mm) - Static - Marshall behind Reyes, tablet in hand - Story shot
   Setup: Same lighting as Shot 2, reverse angle
   Duration: 4 seconds

4. MS - Normal (10mm) - Static - Tanaka at signal array, mentor's photo visible - Story shot
   Setup: New camera position, overhead key, 2:1 ratio
   Duration: 5 seconds

5. MS - Normal (10mm) - Static - Costa in doorway, watching others - Story shot
   Setup: Doorway lighting, half in/half out, 2:1 ratio
   Duration: 4 seconds

6. MS - Normal (10mm) - Static - Carter at far station, filming Costa - Story shot
   Setup: Far station lighting, 2:1 ratio
   Duration: 4 seconds

7. CU - Normal (10mm) - Static - Reyes's face as Tanaka asks question - Reaction
   Setup: Tighter on Shot 2 position, same lighting
   Duration: 3 seconds

8. MS Two-Shot - Normal (10mm) - Static - Costa and Marshall, 180° line established - Story shot
   Setup: New angle, Costa left, Marshall right, 2:1 ratio
   Duration: 6 seconds

9. LS - Normal (10mm) - Static - Mess hall, all five at table - Establishing (next scene)
   Setup: New location, overhead fluorescent, 2:1 ratio
   Duration: 7 seconds

10. CU - Normal (10mm) - Static - Marshall's hand pausing above coffee cup - Detail
    Setup: Tighter on Shot 9, same lighting
    Duration: 2 seconds

SHOOTING ORDER:
1 (ELS bridge) → 2, 3, 7 (Reyes area) → 4 (Tanaka area) → 5 (doorway) → 6 (Carter area) → 8 (two-shot) → 9, 10 (mess hall)

ESTIMATED SHOOT TIME:
Setup: 3 hours (first location setup + 6 lighting adjustments)
Shooting: 2 hours (10 shots × 3 takes × 4 minutes per take)
Total: 5 hours
```

## Integration

This workflow uses:
- @visual-grammar for shot size selection
- @optics-psychology for focal length selection
- @staging-blocking for camera positions (implied, detailed in coverage-strategy workflow)
- @lighting-architecture for setup notes (implied, detailed in location-lighting-plan workflow)
