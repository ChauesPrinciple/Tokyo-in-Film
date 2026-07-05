---
description: Plan master shot + story shots + cut-ins + cut-aways with 180° line tracking
---

# COVERAGE STRATEGY WORKFLOW

## WHEN TO INVOKE

**YES — invoke this workflow when:**
- You have a completed shot list (from `/script-to-shotlist`) and need to plan how cameras are positioned relative to actors
- Someone asks "where does the camera go?", "how do we cover this scene?", or "what's the 180° plan?"
- A scene involves two or more subjects and spatial relationships must be locked before shooting

**NO — do not invoke when:**
- You don't have a shot list yet → run `/script-to-shotlist` first
- The question is about which shot SIZES to use → that is `@visual-grammar`, not this workflow
- The question is about lighting positions → that is `/location-lighting-plan`, which comes AFTER this workflow

**Sequence position**: Step 2 of the production chain.
`/script-to-shotlist` → `/coverage-strategy` → `/location-lighting-plan` → `/editorial-assembly`

**Dependencies required before starting**:
- Shot list from `/script-to-shotlist`
- Location layout (floor plan, sketch, or description)
- Number of subjects in scene and their spatial relationship

## Input Required
- Scene type (dialogue/action/montage)
- Number of subjects
- Location layout
- Emotional arc (stable/escalating/chaotic)
- Shot list (from script-to-shotlist workflow)

## Process

### Step 1: Establish 180° Line with @staging-blocking
- Identify subjects in scene
- Draw imaginary line between subjects
- Determine which side of line camera stays on
- Note any intentional line crossings (dolly moves, cutaways)

### Step 2: Plan Master Shot
- Wide shot covering entire scene
- Runs from "Action" to "Cut" — full scene, no breaks
- Establishes geography and spatial relationships
- Always shoot master first

### Step 3: Plan Story Shots
- MS Two-Shots: Both subjects in frame, relationship visible
- OTS (Over-the-Shoulder): Subject A foreground, Subject B background
- Reverse OTS: Subject B foreground, Subject A background
- Singles: CU of each subject, isolated

### Step 4: Plan Cut-Ins (Detail Shots)
- CU or ECU of objects, hands, props
- Same axis as master — maintains screen direction
- Function: Emphasis, information, pacing control

### Step 5: Plan Cut-Aways (Reaction Shots, Environment)
- Shots outside main action
- Different axis from master — doesn't need to match screen direction
- Function: Time compression, parallel action, editorial flexibility

### Step 6: Plan Re-Establishing Shot
- Return to wide shot after CU sequence
- Re-grounds audience in space
- Function: Spatial reset, act break, transition

### Step 7: Create Floor Plan
- Mark actor spike marks (color-coded)
- Mark camera T-marks (numbered)
- Draw 180° line
- Note which shots use which camera positions

## Output Format

```
SCENE: [heading]
SCENE TYPE: [dialogue/action/montage]
SUBJECTS: [list]

180° LINE:
- Established between: [Subject A] and [Subject B]
- Line runs: [direction across frame]
- Camera side: [which side camera stays on]
- Intentional crossings: [if any, how executed]

COVERAGE PLAN:

MASTER SHOT:
- Shot #: [number from shot list]
- Size: [LS/ELS]
- Focal Length: [mm]
- Position: [T-mark number]
- Function: Safety, spatial reference, full scene

STORY SHOTS:
- Shot #: [number] - [MS Two-Shot] - [subjects] - [T-mark]
- Shot #: [number] - [OTS] - [Subject A foreground] - [T-mark]
- Shot #: [number] - [Reverse OTS] - [Subject B foreground] - [T-mark]
- Shot #: [number] - [Single CU] - [Subject A] - [T-mark]
- Shot #: [number] - [Single CU] - [Subject B] - [T-mark]

CUT-INS:
- Shot #: [number] - [ECU hands/object] - [function] - [T-mark]
- Shot #: [number] - [CU detail] - [function] - [T-mark]

CUT-AWAYS:
- Shot #: [number] - [environment/reaction] - [function] - [T-mark]
- Shot #: [number] - [parallel action] - [function] - [T-mark]

RE-ESTABLISHING:
- Shot #: [number] - [LS] - [when in scene] - [T-mark]

FLOOR PLAN:
[ASCII diagram showing:
 - Actor spike marks (A1, A2, B1, B2)
 - Camera T-marks (T1, T2, T3...)
 - 180° line
 - Furniture/set pieces]

SHOOTING ORDER:
[Shots grouped by T-mark to minimize camera moves]

ESTIMATED COVERAGE TIME:
Master: [time]
Story Shots: [time]
Cut-ins: [time]
Cut-aways: [time]
Total: [time]
```

## Example

**Input:**
```
Scene: INT. MARSHALL'S QUARTERS — STAGE THREE
Scene Type: Dialogue (two-person)
Subjects: Reyes, Marshall
Emotional Arc: Stable → understanding → resolve
```

**Output:**
```
SCENE: INT. MARSHALL'S QUARTERS — STAGE THREE
SCENE TYPE: Dialogue (two-person)
SUBJECTS: Reyes, Marshall

180° LINE:
- Established between: Reyes and Marshall
- Line runs: Left-right across frame (Reyes left, Marshall right)
- Camera side: Audience side (front of desk)
- Intentional crossings: None (maintain spatial coherence for this scene)

COVERAGE PLAN:

MASTER SHOT:
- Shot #1 - LS - 10mm - T1
- Both subjects visible, Marshall at desk, Reyes standing
- Function: Safety, establishes room geography, full scene

STORY SHOTS:
- Shot #2 - MS Two-Shot - 10mm - T2
  Both subjects, Reyes left, Marshall right, desk between them
  
- Shot #3 - OTS - 13mm - T3
  Over Reyes's shoulder (foreground), Marshall's face (background)
  
- Shot #4 - Reverse OTS - 13mm - T4
  Over Marshall's shoulder (foreground), Reyes's face (background)
  
- Shot #5 - Single CU - 16mm - T5
  Marshall's face, 4:1 key-to-fill, half in shadow
  
- Shot #6 - Single CU - 10mm - T6
  Reyes's face, 4:1 key-to-fill, even lighting

CUT-INS:
- Shot #7 - CU - 16mm - T7
  Marshall's timeline on desk, both hands flat on it
  Function: Emphasis on his realization
  
- Shot #8 - CU - 13mm - T8
  Schematics on wall display, cognitive relay marked
  Function: Information, the target

CUT-AWAYS:
- Shot #9 - MS - 10mm - T9
  Reyes entering without knocking (earlier in scene)
  Function: Transition, establishes her urgency
  
- Shot #10 - LS - 10mm - T1
  Re-establishing after CU sequence
  Function: Spatial reset before final exchange

RE-ESTABLISHING:
- Shot #10 (same as cut-away above)
- Used after intense CU exchange about the relay
- Returns audience to room geography

FLOOR PLAN:
```
        [Wall Display]
              |
    [T3]  [Reyes A1]  [T6]
              |
         [180° LINE]
              |
    [T4]  [Marshall B1]  [T5]
           [Desk]
              |
            [T2]
              |
            [T1]
         (Master)
```

Spike Marks:
- A1 (Blue): Reyes standing position
- B1 (Red): Marshall seated at desk

Camera Positions:
- T1: Master, wide, centered
- T2: MS two-shot, closer
- T3: OTS Reyes → Marshall
- T4: OTS Marshall → Reyes
- T5: Single Marshall
- T6: Single Reyes
- T7: CU timeline (top-down on desk)
- T8: CU wall display
- T9: MS Reyes entering

SHOOTING ORDER:
T1 (Shot #1, #10) → T2 (Shot #2) → T3 (Shot #3) → T4 (Shot #4) → T5 (Shot #5) → T6 (Shot #6) → T7 (Shot #7) → T8 (Shot #8) → T9 (Shot #9)

ESTIMATED COVERAGE TIME:
Master: 20 min (3 takes)
Story Shots (2-6): 90 min (5 shots × 3 takes × 6 min)
Cut-ins (7-8): 30 min (2 shots × 3 takes × 5 min)
Cut-aways (9): 15 min (1 shot × 3 takes × 5 min)
Re-establishing: included in master
Total: 2 hours 35 minutes
```

## Integration

This workflow uses:
- @staging-blocking for 180° line, coverage types, floor plans
- @visual-grammar for shot size selection
- @optics-psychology for focal length selection
- @editorial-grammar for ensuring coverage supports cut sequence
