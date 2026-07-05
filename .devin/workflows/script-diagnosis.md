---
description: Diagnose a screenplay draft end-to-end — structural, character, scene, dialogue, prose discipline — and output a prioritized fix list ranked by dependency level
---

# Script Diagnosis Workflow

## When to Use
When you have a draft (any stage) and need to know what's broken and in what order to fix it. This workflow reads the full script and applies every diagnostic framework in the agent's network, top-down through the irreversible dependency chain.

## Prerequisites
- The full draft must be readable (text, .txt, .docx extracted, or screenplay format)
- No fixes are made during diagnosis. This workflow produces a report, not a rewrite.

---

## Pass 1: Controlling Idea Lock (Highest Level)

Read the full script. Then answer — do not guess, do not infer charitably:

1. **Can you state the Controlling Idea in one sentence?** (VALUE + CAUSE: "_______ is achieved/lost through _______.")
   - If YES → write it down. Every subsequent pass tests against this sentence.
   - If NO → **STOP. This is the #1 problem.** Flag it. Nothing below this level can be reliably diagnosed until the Controlling Idea exists. Suggest three candidate Controlling Ideas based on what the draft seems to be reaching toward, and ask the writer to choose or revise.

2. **Can you name the Inciting Incident?** Does it appear on screen as a dramatized event (not dialogue, not backstory reference)?
   - If NO → flag. The story has no engine. This must be built before structure diagnosis is meaningful.

3. **Can you identify the protagonist's Flaw?** What misconception about life does the protagonist carry? Does the climax test this specific flaw?
   - If NO → flag. The protagonist is a vehicle without a destination.

**Pass 1 output:** Controlling Idea (stated or flagged missing), Inciting Incident (located or flagged missing), Protagonist Flaw (identified or flagged missing). If any are missing, the report should state: *"Structure, scene, and dialogue passes will proceed, but all findings below are provisional until Pass 1 items are resolved."*

---

## Pass 2: Story Architecture (McKee Five-Part + Tomlinson Eight Sequences)

### 2A: Five-Part Design Check
Map the draft against McKee's five parts. For each, note the scene number/page or flag as missing:

| Part | Scene/Page | Present? | Notes |
|------|-----------|----------|-------|
| Inciting Incident | | Y/N | |
| Progressive Complications (at least 3) | | Y/N | Do they escalate? Each harder than the last? |
| Crisis | | Y/N | Is it a true dilemma (irreconcilable goods or lesser of two evils)? |
| Climax | | Y/N | Is it the moment of maximum energy + irreversible change? |
| Resolution | | Y/N | Does it show the world remade — not just an epilogue? |

### 2B: Eight-Sequence Mapping
Map every scene to a sequence (1-8). Use this template:

| Seq | Pages/Scenes | Function (expected) | Function (actual) | Pressure Level (1-10) | Mini-Climax Present? |
|-----|-------------|--------------------|--------------------|----------------------|---------------------|
| 1 | | Status quo + inciting incident | | | Y/N |
| 2 | | Protagonist commits to goal | | | Y/N |
| 3 | | First obstacles, early failures | | | Y/N |
| 4 | | Midpoint reversal | | | Y/N |
| 5 | | New approach, false progress | | | Y/N |
| 6 | | Crisis — everything falls apart | | | Y/N |
| 7 | | Climax — final confrontation | | | Y/N |
| 8 | | Resolution — new equilibrium | | | Y/N |

Flag:
- Any sequence that is functionally empty (scenes exist but do not perform the expected function)
- Any sequence without a mini-climax at its end
- Any point where pressure DECREASES without a deliberate release beat
- The midpoint (end of Seq 4): does it irreversibly raise stakes? If it's a rest, flag it.

### 2C: Act I Contract (Tomlinson)
Check that Act I (Sequences 1-2) delivers all three elements:
- [ ] **Desire** — is the protagonist's want on screen?
- [ ] **Danger** — is the antagonistic force visible?
- [ ] **Decision** — does the protagonist choose to act despite risk?
- [ ] **Major Dramatic Question** — is it posed by the end of Act I? State it.

**Pass 2 output:** Sequence map, five-part checklist, Act I contract checklist, list of structural flags ranked by severity.

---

## Pass 3: Cast Polarization (McKee)

For each named character, answer:

| Character | Attitude toward central conflict | What they want | What they believe | Who do they contrast with? |
|-----------|--------------------------------|----------------|-------------------|---------------------------|
| | | | | |

Then check:
- [ ] Does every character occupy a **different position** on the central conflict axis?
- [ ] Does any character exist only to deliver exposition? (Flag for removal or redesign)
- [ ] Do any two characters agree on everything? (Flag — they should be merged or polarized)
- [ ] Does the antagonist have a coherent worldview that makes them right from their own perspective?

**Pass 3 output:** Cast polarization map. List of redundant, under-differentiated, or exposition-only characters.

---

## Pass 4: Scene-by-Scene Analysis

For every scene, fill this row. This is the most time-intensive pass — do not skip scenes.

| Scene # | Seq | Value In | Value Out | Gap? | PASTO Complete? | Advances Plot? | Advances Character? | Strongest Beat = Final Beat? | Verdict |
|---------|-----|----------|-----------|------|-----------------|----------------|--------------------|-----------------------------|---------|
| | | | | Y/N | Y/N (which beat missing?) | Y/N | Y/N | Y/N | KEEP / REWRITE / CUT |

### Scene Failure Modes (flag any that apply):
- **FLAT**: Value charge unchanged (enters and exits the same). Scene did not happen narratively.
- **GAPLESS**: Character expected X, got X. No conflict. No drama.
- **PASTO-BROKEN**: Missing Turnaround (scene is an anecdote) or missing Outcome→Preparation chain (sequence is a list).
- **PLOT-ONLY**: Advances plot but reveals nothing about character. Mechanical.
- **CHARACTER-ONLY**: Reveals character but advances nothing. Indulgent.
- **LATE START**: Scene begins before the conflict. Cut everything before the first moment of tension.
- **WEAK EXIT**: Scene trails off instead of culminating. Final beat is not the strongest.
- **TALKING HEADS**: Two people sit and talk without action, movement, or environmental interaction.

**Pass 4 output:** Scene-by-scene table. Count of scenes flagged per failure mode. List of scenes recommended for cut.

---

## Pass 5: Dialogue Diagnosis

Invoke `@dialogue-craft` for this pass. For each scene with dialogue:

### 5A: Subtext Check
- Read each line. Is the character saying what they mean directly?
- For every direct statement, write the subtext translation. If the direct version is more powerful, keep it (this is rare — flag it as an exception with justification).

### 5B: Voice Differentiation
- Extract all lines for Character A. Read them in isolation. Then Character B. Then C.
- Could any line be swapped between characters without the reader noticing? If yes → flag those characters as voice-undifferentiated.

### 5C: Exposition Audit
- Flag every line where a character tells another character something they both already know.
- Flag every line that exists only to inform the audience of backstory.
- For each flagged line: can this information be shown visually instead? If yes → recommend the visual alternative.

### 5D: Density Test (per scene)
For each dialogue-heavy scene, answer:
- [ ] Does every line advance plot OR reveal character?
- [ ] Could any line be cut without losing meaning?
- [ ] Is anything said twice (same information, different words)?
- [ ] Does the scene work if you mute the dialogue and watch only the action?

**Pass 5 output:** Subtext translation table, voice differentiation report, exposition flags with visual alternatives, density scores per scene.

---

## Pass 6: Action Line Prose Discipline

Read every action line in the script. Flag any that violate these rules:

| # | Violation | What to look for |
|---|-----------|------------------|
| 1 | **Internal monologue** | "He thinks:", "She realizes:", "It occurs to him" — any rendering of unspoken thought |
| 2 | **Thesis statements** | Any sentence that states the screenplay's theme, moral, or meaning directly in an action line |
| 3 | **Author commentary** | The writer evaluating a character's action ("This is not a comfort", "which is the only sign that the last forty minutes affected him") |
| 4 | **Narrating the unspoken** | "Neither of them says:" followed by the thing they don't say |
| 5 | **Over-precise emotional direction** | Multi-clause descriptions of exactly what an actor should feel — e.g. "the gentle frustration of someone who believes they are watching another person make a serious mistake" |
| 6 | **Psychology as action** | Explaining WHY a character does something in the same line that describes WHAT they do |
| 7 | **Second-person address** | "The way you look at" / "the kind of silence you feel when" — the screenplay addressing the reader |

For each flagged line, provide:
- The exact line
- The violation category (1-7)
- A recommended fix (externalize, simplify, move to production notes, or delete)

**The test:** Can a camera see it or a microphone hear it? If not, it's a violation.

**Pass 6 output:** Violation count by category. Full list of flagged lines with fixes. This is a BLOCKING pass — a draft with more than 5 violations per act is not ready for delivery.

---

## Pass 7: Tension and Pacing Map

Map the script's tension level scene by scene on a 1-10 scale:

```
Scene:    1  2  3  4  5  6  7  8  9  10  11  12  ...
Tension:  _  _  _  _  _  _  _  _  _  __  __  __  ...
```

Check:
- [ ] Do peaks ascend toward the climax? (Each peak should be higher than the last)
- [ ] Are there valleys between peaks? (Without release, peaks flatten)
- [ ] Does Act III have the highest sustained tension?
- [ ] Are release beats earned (character warmth, humor, small victory) or arbitrary (random scene change)?
- [ ] Is any section at constant high tension for more than 3 consecutive scenes? (Flag — audience goes numb)

**Pass 7 output:** Tension graph, pacing flags, release beat locations.

---

## Pass 8: Synthesis — The Fix List

Compile all flags from Passes 1-7. Rank them by the **irreversible dependency chain**:

### Priority 1 — Story-Level (fix these first; everything below is provisional until these resolve)
- Missing or unclear Controlling Idea
- Missing Inciting Incident
- Missing or untested Protagonist Flaw

### Priority 2 — Structure-Level
- Empty or dysfunctional sequences
- Missing midpoint reversal
- Act I contract incomplete (Desire/Danger/Decision)
- Pressure doesn't escalate

### Priority 3 — Cast-Level
- Undifferentiated characters
- Missing polarization
- Exposition-only characters

### Priority 4 — Scene-Level
- Flat scenes (no value charge shift)
- Gapless scenes
- PASTO-broken scenes
- Late starts / weak exits

### Priority 5 — Dialogue-Level
- Voice undifferentiation
- Direct statements that should be subtext
- Exposition dumps
- Talking heads

### Priority 5.5 — Prose Discipline (Action Lines)
- Internal monologue
- Thesis statements in action lines
- Author commentary
- Narrating unspoken thoughts
- Over-precise emotional direction
- Psychology explanations
- Second-person address

### Priority 6 — Pacing-Level
- Missing release beats
- Non-ascending peaks
- Sustained flatline tension

**The rule:** Do not repair Priority 4 problems until Priority 1-3 are resolved. A rewritten scene inside a broken structure is wasted work.

---

## Output Format

The final diagnosis report should follow this structure:

```
SCRIPT DIAGNOSIS: [Title]
Draft: [number/date]
Diagnosed: [date]

═══ CONTROLLING IDEA ═══
[Stated or "NOT FOUND — candidates suggested below"]

═══ STRUCTURAL HEALTH ═══
Five-Part: [X/5 present]
Sequences: [X/8 functional]
Act I Contract: [complete/incomplete — which element missing]

═══ CAST HEALTH ═══
Characters: [count]
Polarization: [strong/weak/absent]
Exposition-only characters: [list or "none"]

═══ SCENE HEALTH ═══
Total scenes: [count]
Passing all tests: [count]
Flagged: [count] ([breakdown by failure mode])
Recommended cuts: [count]

═══ DIALOGUE HEALTH ═══
Subtext ratio: [X% of lines carry subtext vs direct]
Voice differentiation: [strong/weak — which characters overlap]
Exposition flags: [count]

═══ PROSE DISCIPLINE ═══
Action line violations: [count] ([breakdown by category])
Blocking: [YES if >5 per act / NO]

═══ PACING HEALTH ═══
Peak-valley pattern: [ascending/flat/irregular]
Release beats: [sufficient/insufficient]
Tension ceiling: [scene #]

═══ PRIORITIZED FIX LIST ═══
[Numbered list, ranked by dependency level]
```

---

## Related Skills
- `@narrative-structure` — Eight sequences, McKee frameworks, PASTO, value-charge
- `@dialogue-craft` — Subtext, voice, exposition, density
- `@character-architecture` — Flaw/arc, polarization, telling details (when created)
- `@editorial-grammar` — Cut types, pacing, Kuleshov, Murch hierarchy
