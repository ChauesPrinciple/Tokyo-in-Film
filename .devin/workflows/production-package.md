---
description: Compile all production outputs into single production-ready package
---

# PRODUCTION PACKAGE WORKFLOW

## WHEN TO INVOKE

**YES — invoke this workflow when:**
- All four prior chain steps are complete and the deliverables need to be compiled into one production-ready document
- Someone asks "is this production ready?", "what's the complete package?", or "what does the crew need on shoot day?"
- A scene or project is moving from pre-production into active production

**NO — do not invoke when:**
- Any prior chain step is incomplete → `/production-package` is a final-step assembler, not a shortcut
- Only one element is needed → invoke the specific workflow for that element instead

**Sequence position**: Final step. Only invoke when all upstream workflows are complete.
`/script-to-shotlist` → `/coverage-strategy` → `/location-lighting-plan` → `/editorial-assembly` → `/production-package`

**Required inputs** (all must exist before invoking):
- Shot list (from `/script-to-shotlist`)
- Coverage plan (from `/coverage-strategy`)
- Lighting plot (from `/location-lighting-plan`)
- Editorial notes (from `/editorial-assembly`)
- Production logistics (from `@production-protocol`)

## Input Required
- Shot list (from /script-to-shotlist)
- Lighting plot (from /location-lighting-plan)
- Coverage plan (from /coverage-strategy)
- Editorial notes (from /editorial-assembly)
- Production protocol (from @production-protocol)

## Process

### Step 1: Compile Shot List
- All shots numbered and sequenced
- Shooting order optimized for efficiency
- Cross-reference with coverage plan

### Step 2: Compile Lighting Plots
- One plot per location
- Equipment lists consolidated
- Power requirements calculated

### Step 3: Compile Floor Plans
- Actor spike marks
- Camera T-marks
- 180° lines
- Lighting positions
- All cross-referenced

### Step 4: Compile Sound Plan
- Mic types and positions per shot
- Room tone requirements per location
- L-cut/J-cut opportunities noted

### Step 5: Create Call Sheet
- Crew call times
- Cast call times
- Location address and parking
- Shot list for the day
- Meal break schedule

### Step 6: Create Production Timeline
- Setup times per shot
- Shoot times per shot
- Wrap time
- Total day estimate

### Step 7: Verify Completeness
- Every shot has lighting notes
- Every shot has sound notes
- Every shot has camera position
- 180° line tracked across all shots
- Coverage is complete for editorial

## Output Format

```
PRODUCTION PACKAGE
[Project Title] - [Scene/Day]
[Date]

========================================
TABLE OF CONTENTS
========================================
1. Call Sheet
2. Shot List (Shooting Order)
3. Lighting Plots (by Location)
4. Floor Plans (by Location)
5. Sound Plan
6. Editorial Notes
7. Equipment Checklist
8. Safety Notes

========================================
1. CALL SHEET
========================================
Production: [title]
Date: [date]
Location: [address]
Parking: [instructions]
Weather: [forecast]

CREW CALL TIMES:
- Director: [time]
- DOP: [time]
- 1st AD: [time]
- Gaffer: [time]
- Key Grip: [time]
- Sound Mixer: [time]
- Script Supervisor: [time]
- Production Assistants: [time]

CAST CALL TIMES:
- [Actor 1]: [time]
- [Actor 2]: [time]
...

SCHEDULE:
- [time]: Crew call, begin setup
- [time]: Cast call, blocking rehearsal
- [time]: First shot (Shot #[X])
- [time]: Lunch (30 min)
- [time]: Resume shooting
- [time]: Estimated wrap
- [time]: Actual wrap (to be filled in)

SCENES SHOOTING TODAY:
- [Scene heading 1]
- [Scene heading 2]
...

========================================
2. SHOT LIST (SHOOTING ORDER)
========================================
[Full shot list from /script-to-shotlist, reordered by shooting efficiency]

Shot #1: [Size] - [Focal Length] - [Movement] - [Subject]
- Setup: [lighting/camera notes]
- Duration: [seconds]
- T-Mark: [position]
- Lighting: [reference to plot]
- Sound: [mic type/position]

[Continue for all shots...]

========================================
3. LIGHTING PLOTS (BY LOCATION)
========================================
[Full lighting plots from /location-lighting-plan, one per location]

LOCATION: [name]
[Complete lighting plot with diagrams]

[Repeat for each location...]

========================================
4. FLOOR PLANS (BY LOCATION)
========================================
[Full floor plans from /coverage-strategy, one per location]

LOCATION: [name]
[ASCII diagram with spike marks, T-marks, 180° line, furniture]

[Repeat for each location...]

========================================
5. SOUND PLAN
========================================
[Mic selections and room tone requirements from @acoustic-design]

LOCATION: [name]
- Primary Mic: [type + position]
- Backup: [type]
- Room Tone: [duration] at [location]
- Special Notes: [any acoustic challenges]

[Repeat for each location...]

========================================
6. EDITORIAL NOTES
========================================
[Cut sequence and transitions from /editorial-assembly]

SCENE: [heading]
- Transition from previous: [type]
- Transition to next: [type]
- Kuleshov moments: [list]
- Pacing notes: [ASL, rhythm]

[Repeat for each scene...]

========================================
7. EQUIPMENT CHECKLIST
========================================
CAMERA:
- [Camera body]
- [Lenses: list with focal lengths]
- [Tripod/support]
- [Media cards]
- [Batteries]

LIGHTING:
[Consolidated from all lighting plots]
- [Light type] × [quantity]
- [Diffusion] × [quantity]
- [Gels] × [quantity]
- [Stands] × [quantity]

SOUND:
- [Shotgun mic]
- [Lav mics] × [quantity]
- [Boom pole]
- [Recorder]
- [Headphones]
- [Batteries]

GRIP:
- [Flags/nets/silks]
- [C-stands] × [quantity]
- [Apple boxes]
- [Sandbags]

========================================
8. SAFETY NOTES
========================================
ELECTRICAL:
- Total power draw: [amps]
- Circuits needed: [number]
- Extension cables: [quantity/length]
- Fire extinguisher location: [noted]

SET SAFETY:
- Trip hazards: [cables taped down]
- Hot lights: [Fresnels marked, keep clear]
- Emergency exits: [clear and marked]
- First aid kit: [location]

TALENT SAFETY:
- Breaks: Every 2 hours minimum
- Water: Available on set
- Meal: [time]
- Special needs: [if any]

========================================
PRODUCTION NOTES
========================================
[Any location-specific restrictions, weather contingencies, backup plans]

========================================
SIGN-OFF
========================================
Director: _________________ Date: _______
DOP: _____________________ Date: _______
1st AD: ___________________ Date: _______
```

## Integration

This workflow compiles outputs from:
- /script-to-shotlist
- /location-lighting-plan
- /coverage-strategy
- /editorial-assembly
- @production-protocol

It creates a single document that the entire crew can reference on set.
