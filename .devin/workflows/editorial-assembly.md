---
description: Plan cut sequence with transitions, Kuleshov moments, pacing notes
---

# EDITORIAL ASSEMBLY WORKFLOW

## WHEN TO INVOKE

**YES — invoke this workflow when:**
- You have footage (or a confirmed shot list) and need to plan the cut sequence, transitions, and pacing for a scene
- Someone asks "how do I edit this?", "what transitions do I use?", or "how do I pace this scene?"
- Post-production has begun and picture assembly decisions need to be made

**NO — do not invoke when:**
- You don't have footage yet → production hasn't happened; this workflow applies to post
- The question is about which shots to shoot → that is `/script-to-shotlist` (pre-production)
- You need deep editorial theory (Murch, Eisenstein, Bazin, Tarkovsky) → invoke `/advanced-editorial-theory`

**Sequence position**: Step 4 of the production chain (post-production).
`/script-to-shotlist` → `/coverage-strategy` → `/location-lighting-plan` → `/editorial-assembly` → `/production-package`

**Core skill invoked**: `@editorial-grammar` (apply Murch's hierarchy before making any cut)

## Input Required
- Shot list (all footage available)
- Scene emotional arc (stable/escalating/chaotic)
- Narrative function (what must be conveyed)
- Transition type to next scene (straight cut/dissolve/dip to black/L-cut/J-cut)

## Process

### Step 1: Determine Cut Sequence with @editorial-grammar
- Order shots to tell the story
- Not necessarily shooting order
- Follow emotional arc progression

### Step 2: Assign Cut Types
- Straight cut: Same sequence, same time, continuous action (95% of cuts)
- Match cut: Visual rhyme between shots
- Jump cut: Time compression, disorientation
- Smash cut: Shock, tonal whiplash

### Step 3: Identify Kuleshov Opportunities
- Neutral face + object = inferred emotion
- Plan reaction shots based on what precedes them
- Use juxtaposition to create meaning

### Step 4: Determine Pacing
- Calculate average shot length (ASL)
- Plan rhythm: consistent/accelerating/decelerating/erratic
- Identify long takes vs. rapid cutting sequences

### Step 5: Plan Scene Transition
- To next scene: straight cut/dissolve/dip to black
- L-cut: Outgoing audio continues into incoming video
- J-cut: Incoming audio bleeds into outgoing video

### Step 6: Add Editorial Notes
- Music cues (if any)
- Sound design moments
- Color grading notes
- VFX needs

## Output Format

```
SCENE: [heading]
EMOTIONAL ARC: [stable/escalating/chaotic]
TOTAL DURATION: [runtime]

CUT SEQUENCE:

1. Shot [#] → Shot [#]
   Cut Type: [straight/match/jump/smash]
   Duration: [seconds]
   Function: [establishing/information/emotion]
   Notes: [any special considerations]

2. Shot [#] → Shot [#]
   Cut Type: [type]
   Duration: [seconds]
   Function: [function]
   Kuleshov: [if applicable: neutral face + object = emotion]

3. Shot [#] → Shot [#]
   Cut Type: [type]
   Duration: [seconds]
   Function: [function]
   Notes: [any special considerations]

...

PACING:
- Average Shot Length: [seconds]
- Rhythm: [consistent/accelerating/decelerating/erratic]
- Long Takes: [which shots, duration, reason]
- Rapid Cutting: [which sequence, ASL, reason]

TRANSITION TO NEXT SCENE:
- Type: [straight cut/dissolve/dip to black/L-cut/J-cut]
- Audio Strategy: [which audio leads/follows, if L/J-cut]
- Duration: [if dissolve/dip, how many frames]

EDITORIAL NOTES:
- Music: [cues, if any]
- Sound Design: [key moments]
- Color Grading: [any specific needs]
- VFX: [if any]

ESTIMATED EDIT TIME:
Assembly: [hours]
Fine Cut: [hours]
Total: [hours]
```

## Example

**Input:**
```
Scene: INT. BRIDGE — STAGE TWO (Tanaka Consumption)
Emotional Arc: Stable → escalating → breakdown
Shots Available: 1-12 (from coverage-strategy)
Transition: J-cut to next scene (hear static before we see it)
```

**Output:**
```
SCENE: INT. BRIDGE — STAGE TWO (Tanaka Consumption)
EMOTIONAL ARC: Stable → escalating → breakdown
TOTAL DURATION: 2 minutes 15 seconds

CUT SEQUENCE:

1. Shot 1 (MS Tanaka at console) → Shot 2 (CU Tanaka's face)
   Cut Type: Straight cut
   Duration: 5 sec → 4 sec
   Function: Establish location → focus on character state
   Notes: Tanaka looks normal, functional

2. Shot 2 (CU Tanaka's face) → Shot 3 (ECU headphones)
   Cut Type: Straight cut
   Duration: 4 sec → 2 sec
   Function: Reaction → detail
   Kuleshov: Neutral face + headphones = anticipation/dread

3. Shot 3 (ECU headphones) → Shot 4 (CU Tanaka's face, eyes closed)
   Cut Type: Straight cut
   Duration: 2 sec → 6 sec
   Function: Detail → reaction
   Notes: He's listening, something is happening

4. Shot 4 (CU Tanaka, eyes closed) → Shot 5 (ECU mouth moving)
   Cut Type: Jump cut (time compression)
   Duration: 6 sec → 3 sec
   Function: Reaction → fragmentation
   Notes: Time has passed, he's now speaking equations

5. Shot 5 (ECU mouth) → Shot 6 (MS Costa enters, stops)
   Cut Type: Straight cut
   Duration: 3 sec → 4 sec
   Function: Fragmentation → witness
   Notes: Costa sees what's happening

6. Shot 6 (MS Costa) → Shot 7 (CU Costa's face)
   Cut Type: Straight cut
   Duration: 4 sec → 3 sec
   Function: Witness → reaction
   Kuleshov: Neutral face + Tanaka outputting = horror/recognition

7. Shot 7 (CU Costa) → Shot 8 (ECU Tanaka's hand writing HELP)
   Cut Type: Straight cut
   Duration: 3 sec → 5 sec
   Function: Reaction → detail
   Notes: He's still in there, trying to warn

8. Shot 8 (ECU hand HELP) → Shot 9 (ECU hand writing equations)
   Cut Type: Jump cut (no time passage, just continuation)
   Duration: 5 sec → 4 sec
   Function: Detail → detail
   Notes: The entity overrides his attempt

9. Shot 9 (ECU equations) → Shot 10 (MS Marshall enters)
   Cut Type: Straight cut
   Duration: 4 sec → 3 sec
   Function: Detail → new witness
   Notes: Marshall called by Costa

10. Shot 10 (MS Marshall) → Shot 11 (CU Tanaka's eyes, terrified)
    Cut Type: Straight cut
    Duration: 3 sec → 4 sec
    Function: Witness → victim
    Kuleshov: Marshall's neutral face + Tanaka's eyes = understanding/horror

11. Shot 11 (CU Tanaka's eyes) → Shot 12 (MS Marshall shuts down array)
    Cut Type: Straight cut
    Duration: 4 sec → 6 sec
    Function: Victim → action
    Notes: Marshall makes the call

12. Shot 12 (MS array shutdown) → Shot 13 (LS Tanaka slumps)
    Cut Type: Straight cut
    Duration: 6 sec → 8 sec
    Function: Action → aftermath
    Notes: Tanaka quiet, eyes open, not gone

PACING:
- Average Shot Length: 4.3 seconds
- Rhythm: Accelerating (starts 5-6 sec, ends 3-4 sec, jump cuts compress further)
- Long Takes: Shot 13 (8 sec) - aftermath needs to breathe
- Rapid Cutting: Shots 4-9 (3-5 sec each) - breakdown sequence

TRANSITION TO NEXT SCENE:
- Type: J-cut
- Audio Strategy: Static from anomaly bleeds into Shot 13 (Tanaka slumping)
- We hear the next scene (signal array room, static) before we cut to it
- Creates dread, inevitability

EDITORIAL NOTES:
- Music: None (silence is the horror)
- Sound Design:
  - Tanaka's voice: starts human, becomes synthesized/layered
  - Equations: whispered under his voice, building
  - Array shutdown: sharp electronic cut-off
  - Static: begins under Shot 13, carries into next scene
- Color Grading:
  - Shots 1-3: 2:1 lighting ratio (normal)
  - Shots 4-9: Push to 4:1 in grade (increase contrast)
  - Shots 10-13: 8:1 ratio (half Tanaka's face in shadow)
- VFX: None (all practical)

ESTIMATED EDIT TIME:
Assembly: 1 hour (rough cut, get it in order)
Fine Cut: 2 hours (trim, pacing, transitions, sound design)
Total: 3 hours
```

## Integration

This workflow uses:
- @editorial-grammar for all cut types, Kuleshov, pacing
- @acoustic-design for L-cut/J-cut audio strategy
- @visual-grammar for understanding shot size progression
- @lighting-architecture for color grading notes (push ratios)
