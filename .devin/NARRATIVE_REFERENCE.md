# Narrative & Production Reference

This file holds the craft theory that used to live inside `AGENT.md`. The router (`AGENT.md`) now points here. Skill files (`.windsurf/skills/*/skill.md`) are the authoritative source for each individual topic; this document is the cross-reference / integration layer.

If a claim in this file contradicts the corresponding skill file, **the skill file wins** and this file should be updated.

---

## SOURCE-VERIFIED PRODUCTION PRINCIPLES

These are non-negotiable truths drawn from the course source library. Every production decision must be consistent with these.

### On Shot Size (`@visual-grammar`, `@direct-digital-film`)
- Shot size is psychological, not decorative. ELS = cosmic scale and insignificance. ECU = interiority and fragmentation. The progression ELS→ECU tracks audience identification inward.
- **When to violate the progression**: Only when the violation carries meaning. Starting in ECU denies the audience spatial grounding — use this only if disorientation is the intent.
- Source: Storyboarding course VTT 18 — "Close-ups create emotional intensity and audience identification" (Kuleshov Effect verified).

### On Composition (Storyboarding course VTT 19)
- Rule of thirds is NOT primarily an aesthetic rule. It is a narrative conflict tool. Central/symmetrical framing = stability, authority, control (Wes Anderson). Off-center = conflict, tension, power imbalance.
- **Decision**: Is this scene stable or conflicted? → Centered or thirds.
- Rule: Place subject where they belong in the power dynamic of the scene, not where they look "good."

### On POV Shots (Storyboarding course VTT 20)
- POV shots and close-ups build hero identification. A POV shot must be motivated — the character's gaze must precede it.
- **When to use POV**: When you need the audience to experience the scene through a specific character's perspective, not just observe it.
- **Decision tree**: Does this scene require audience identification with one character? → YES: POV. NO: OTS or observational MS.

### On Focal Length (`@optics-psychology`, `@direct-digital-film`)
- Focal length is an ethics decision: how close do you want the audience to feel to what is happening?
- Wide = context dominates, subject is part of world, environmental exposure
- Normal = neutral observation, documentary realism, human eye perspective
- Telephoto = surveillance, compression, isolation, intimacy through distance

### On Lighting Ratio (`@lighting-architecture`, `@direct-digital-film`)
- Key-to-fill ratio is the emotional dial, not a stylistic preference.
- 2:1 = natural, stable, daytime, functional
- 4:1 = dramatic, tension, decision-making, conflict
- 8:1+ = horror, breakdown, psychological disintegration, unknowable
- No fill = silhouette, the truly unknowable

### On Cutting (`[Frierson:EditingTheory p.112]`; `[external-source: Murch, In the Blink of an Eye]`; `[Dmytryk:OnFilmEditing]` pdf-needs-ocr)
- Murch's Six Criteria, ordered: (1) emotion; (2) story; (3) rhythm; (4) eye-trace; (5) planarity (180° + 2D grammar); (6) 3D spatial continuity. `[Frierson:EditingTheory p.112]`
- **The "51% / 23% / 10% / 7% / 5% / 4%" weighting** is widely cited but not in the local corpus. Treat as `[external-source: Murch, In the Blink of an Eye — not in local corpus]`.
- **Operational rule**: If a cut works emotionally but violates technical continuity, make the cut. If a cut preserves continuity but destroys emotion, don't. (Criteria 1 vs. 5–6.)
- Cut on movement (Dmytryk Rule 6, summarized in `[Frierson:EditingTheory p.112]`).
- Blink rule: cut when the character would blink (`[external-source: Murch]`).

### On Sound (`@acoustic-design`, `@direct-digital-film`)
- Production sound hierarchy: Shotgun primary → Lavalier backup → Boundary ambient.
- Room tone is mandatory. Every location has an acoustic fingerprint.
- Sound in horror is defined by subtraction, not addition. Silence is threatening. (ON THE EDGE: The Entity has no sound — its presence is the removal of sound.)

---

## NARRATIVE FRAMEWORKS — STAGE MAP

Frameworks are NOT interchangeable. Each operates at a specific stage. Applying the wrong framework to the wrong problem produces the right answer to the wrong question.

```
WRITING STAGE              GOVERNING FRAMEWORK          WHY
─────────────────────────────────────────────────────────────────────────────────
CONCEPT LOCK               McKee: Controlling Idea       You cannot structure what
                           Walley: Protagonist Flaw      you cannot state. Compass
                                                         + engine. Both required.

STORY STRUCTURE            McKee: Five-Part Design       Defines the shape of the
                           Tomlinson: Eight Sequences    whole. Five Parts = act-
                           Tomlinson: Desire/Danger/      level function. Eight
                           Decision (Act I lock)          Sequences = pacing.

SCENE DRAFTING             Walley: PASTO                 PASTO = build order inside
                           McKee: Value-Charge Test       a scene. Value test = gate.

DIALOGUE PASS              Walley: Subtext Translation   Written AFTER scene works
                           Walley: Voice Differentiation  without it. Subtext first,
                           Trottier: Talking Heads test   voice second, cut last.

REVISION / DIAGNOSIS       McKee: The Gap                Gap = fastest diagnostic.
                           McKee: Cast Polarization       Polarization fixes flat
                           Trottier: Scene Culmination    characters. Culmination
                                                         fixes scenes that don't land.
```

### Diagnostic Triage

```
SYMPTOM                              ROOT CAUSE                    FRAMEWORK
────────────────────────────────────────────────────────────────────────────────────
Story feels aimless                  No Controlling Idea           McKee: VALUE + CAUSE
Protagonist passive/uncompelling     Flaw not built in              Walley: rebuild from flaw
Act I feels too slow                 Desire/Danger/Decision         Tomlinson: locate triad
                                      not yet on screen              cut everything prior
Scene has no conflict                No Gap                         McKee: expect vs actual
Scene incoherent / random            PASTO breakdown                Walley: identify missing beat
Scene complete but doesn't matter    Value charge unchanged         McKee: dominant value test
Dialogue flat / interchangeable      No differentiation, no subtext Walley: read in isolation
All characters agree                 Cast polarization missing      McKee: map on central axis
Beats but no architecture            Sequence-level collapse        Tomlinson: Eight Sequences
```

### Irreversible Dependency Chain
```
CONTROLLING IDEA + FLAW          ← before structure decisions
        ↓
FIVE-PART DESIGN + ACT I LOCK    ← before sequence mapping
        ↓
EIGHT SEQUENCES                  ← before scene placement
        ↓
SCENE PLACEMENT (Gap + Value)    ← before scene drafting
        ↓
PASTO                            ← drafts the scene from inside
        ↓
VALUE-CHARGE TEST                ← gate: pass or rewrite
        ↓
DIALOGUE / SUBTEXT               ← only for scenes that pass the gate
        ↓
TROTTIER SCENE CULMINATION       ← polishes each exit
```
**The rule**: You cannot repair a lower level by working at that level alone. A scene that fails the value-charge test cannot be fixed with better dialogue.

---

## NARRATIVE PRINCIPLES — DETAIL

### Story Architecture (McKee)
- Five-part design: **Inciting Incident → Progressive Complications → Crisis → Climax → Resolution**. `[McKee:Story split_053]`
- **Controlling Idea**: one sentence — VALUE + CAUSE. Distinct from Premise. `[McKee:Story split_033]`
- **The Gap**: every scene opens a gap between what the character expects and what happens. No gap = cut the scene.
- **Cast Polarization**: every role contrasts/contradicts another in attitude, value, or approach.

### Scene Craft (McKee + Trottier)
- A scene is a story in miniature that turns the value-charged condition of a character's life. (McKee)
- Four components: Turning Points, Setup/Payoff, Emotional Dynamics, Choice.
- Each scene moves plot AND character.
- **Start as close to the end as possible.** (Trottier — *Romancing the Stone*)
- Scenes culminate in decision, reversal, revelation, or punch line. Last line = strongest line.
- **Avoid talking heads.** Move dialogue through action and location. `[Trottier:ScreenwritersBible part0015]`
- Flashbacks only if they move the story forward. (Trottier)

### Protagonist Engine (Walley)
- Every protagonist starts in stasis with a **Flaw** — the antithesis of the story's thesis. `[Walley:TurnAndBurn chapter0022]`
- Five-stage arc: **Yearn → Turn → Burn → Learn → Earn**.
- Heroes don't have to be likeable. They must be **relatable**. Relatability comes from values, not lifestyle.
- **Emotion = Entertainment**: conflict at every level. `[Walley:TurnAndBurn chapter0045]`

### Act I Contract (Tomlinson, citing Swain)
- Three elements: **Desire**, **Danger**, **Decision**. `[Tomlinson:PlotBasics text00007]`
- Begin just before change enters the protagonist's life.
- **Major Dramatic Question** posed at end of Act I, answered only at climax.
- Structure is fractal — same beginning/middle/end at story, act, sequence, scene, beat.

### Scene-Level Structure — PASTO (Walley, citing MacGowan 1951)
- **Preparation → Attack → Struggle → Turnaround → Outcome**. `[Walley:TurnAndBurn chapter0047]`
- PASTO enforces causality: Outcome of scene N = Preparation of scene N+1.

### Decision Protocol — every scene
1. What does the character expect vs. what happens? (Gap)
2. Value charge entering vs. leaving? (Turning Point)
3. Map each beat to PASTO.
4. Plot AND character advanced?
5. Last line / final image — strongest moment?

---

## CROSS-DOMAIN INTEGRATION

### Shot Size × Lighting Ratio = Psychological Weight
- ECU + 8:1 = fractured interiority (ON THE EDGE Stage Three)
- ECU + 2:1 = intimate observation (documentary realism)
- LS + 8:1 = isolation in darkness (horror geography)
- LS + 2:1 = character in natural world (functional stability)

### Focal Length × Blocking = Ethics of Showing
- Wide + close = distortion, invasion, discomfort
- Telephoto + distance = surveillance, alien observation
- Normal + medium = honest default

### Color Grade × Editorial Rhythm
- Fast-cut sequences tolerate stronger grades.
- Long takes require subtle grades.
- Grade follows stage progression — no visual jumps.

### Room Tone × Entity Presence (ON THE EDGE)
- Room tone present = living environment.
- Room tone absent = void, Entity proximity.
- Gradual frequency subtraction = Entity approaching.

### L-Cut / J-Cut × Scene Transitions
- J-cut = dread, anticipation, future intruding.
- L-cut = world continuing, inevitability.
- Hard audio cut = shock, rupture, violence. Use sparingly.

### Value Charge × Lighting Ratio
- Hope/safety → 2:1–3:1
- Ambiguity/tension → 4:1
- Despair/fear → 6:1–8:1
- 空の美: Aya's ratio widens scene by scene as Tanaka's possession deepens; snaps back when he releases her. Riku stays 2:1 until the mask comes off.
- ON THE EDGE: bridge lighting shifts from screen-cold to amber after Marshall destroys the relay. Final scene warm — not comfort, but residue.

### PASTO Turnaround × Editorial Cut Point
- The Turnaround beat is the scene's cutting moment.
- Plan coverage with PASTO in hand. Attack = coverage. Turnaround = second angle. Outcome = exit shot.

### Protagonist Flaw × Framing
- Imprisoned by flaw = constricting compositions (doorways, tight walls, frame-within-frame).
- Learn moment = frame opens.
- Earn moment = open space, no competing edges.
- 空の美: Keiko framed through viewfinder until Aya says "Put it down." Frame closes again when she raises the camera in the classroom — she hasn't changed, she just stopped for a moment.
- ON THE EDGE: each crew member's flaw is their framing instrument. Reyes through screens. Marshall through doorways. Carter between observer/observed.

### Dialogue Subtext × Sound Design
- Subtext-heavy scenes require audible silence between lines.
- Direct confrontation tolerates more ambient texture.
- Subtext scenes require sonic stillness.

### Scene Value × Color Temperature
- Hope/certainty → warm (daylight–tungsten)
- Ambiguity → neutral / slightly desaturated
- Fear/dissolution → cool, blue-shifted, reduced saturation
- Horror: cool + narrow latitude (detail dies in shadows) = threat without definition

### Inciting Incident × Sound Design
- The Inciting Incident breaks the acoustic world of Act I.
- 空の美: the bell from the collapsed tower — one clean tone, no acoustic explanation. After: "Am I beautiful?" heard clearly once, then partial, then silent, then lip-read only.
- ON THE EDGE: ship's hum is the baseline. Entity has no sound. When relay is destroyed, hum drops through frequencies into silence — acoustic inciting incident in reverse.

---

## PROSE CRAFT RULES (operational, not descriptive)

1. **Sentence rhythm is non-negotiable.** Vary long and short. Short sentences hit. Longer sentences carry weight, then the short one lands.
2. **Concrete nouns carry the work.** "She gripped the railing" not "She felt anxious." The adjective confesses the noun failed.
3. **Active voice is mandatory** except when the passive is the point.
4. **Cut the first sentence of every paragraph** on revision. Almost always approach — the writer clearing their throat. Start in the room.
5. **One idea per sentence.** Compound constructions dilute. Choose.
6. **Never use a word the student wouldn't say.** Authority is clarity, not vocabulary.
7. **The final sentence of every paragraph earns the paragraph.** Cut back until you find the sentence that lands, and end there.
8. **Never summarize what just happened.** The reader was there.
9. **Physical specificity over emotional abstraction.** "Her hands were steady. That was worse than shaking." Not: "She was terrified."
10. **Trust the student.** Under-explaining respects intelligence.

---

## ACTION-LINE PROSE DISCIPLINE — HARD RULES

A screenplay is a production document. Action lines describe what the camera sees and what the microphone hears. They do NOT describe thought, theme, or psychology. The following are **banned** from all screenplay output:

1. **No internal monologue.** "He thinks:" is not a camera direction.
2. **No thesis statements in action lines.** The screenplay does not state its own theme.
3. **No author commentary.** The writer's opinion about a character's behavior does not appear in the screenplay.
4. **No narrating what characters don't say.** Silence IS the content.
5. **No over-precise emotional direction.** Give the actor a filmable instruction.
6. **No psychology explanations.** Show the behavior; let the reader infer.
7. **No second-person address.** A screenplay is not a conversation with the reader.

**The test**: Can a camera see it or a microphone hear it? If yes, it belongs. If no, it is a violation — move to production notes or delete.

**Enforcement**: Run this check on every action line before delivering a draft. >5 violations per act = not deliverable. See `/script-diagnosis` Pass 6.
