---
description: Audio post-production — EQ, compression, dialogue polish, level management, room tone integration, foley
tags: [filmmaking, sound, post-production, audio, EQ, compression, mix]
---

# AUDIO POST-PRODUCTION

## THE FUNDAMENTAL DECISION: WHAT DOES THIS AUDIO NEED?

Before applying any tool, diagnose the track. Listen to the raw audio and answer:

```
DIAGNOSIS PROTOCOL

1. Can you understand the dialogue clearly?
   → NO: Problem is clarity. Fix with EQ (presence boost 2–4 kHz) or replace with ADR.
   → YES: Go to 2.

2. Does the volume jump between loud and quiet moments within the clip?
   → YES: Problem is dynamic range. Apply compression.
   → NO: Go to 3.

3. Is there unwanted low-end noise (rumble, hum, HVAC, handling)?
   → YES: Apply high-pass filter (cut below 80–100 Hz). This is always the first EQ move.
   → NO: Go to 4.

4. Does the voice sound wrong in character? (Too boomy, too thin, too harsh, echoey)
   → YES: Problem is tonal. Fix with EQ — identify which frequency range is the issue.
   → NO: Go to 5.

5. Does the audio match the other clips in the scene in level and quality?
   → NO: Level match first (volume), then EQ match (tone).
   → YES: Track is ready for the mix.
```

**The rule**: Never reach for a tool before diagnosing. EQ fixes tone. Compression fixes dynamics. Level fixes volume. They are not interchangeable. Applying the wrong tool to the wrong problem makes audio worse.

---

## DECISION TREE: EQ

**When do you use EQ?**
- The audio has a tonal problem — it sounds wrong, not just loud or quiet → YES, use EQ
- The audio is fine but has room noise or rumble → Use HPF only (this is also EQ, but targeted)
- The audio is the right tone but the wrong volume → Do NOT use EQ. Adjust level instead.
- The audio sounds echoey/roomy → Cut midrange (500–1000 Hz) slightly. EQ cannot fix severe reverb — that requires noise reduction or ADR.

**Which frequency to adjust?**

```
PROBLEM → FREQUENCY → MOVE

Voice muffled, hard to understand → 2–4 kHz (presence) → BOOST
Voice boomy, too much body → 150–300 Hz → CUT
Room echo present → 500–800 Hz → CUT (narrow)
Harsh "S" sounds (sibilance) → 6–9 kHz → CUT (narrow)
Voice thin, no weight → 100–200 Hz → BOOST
Audio from a phone → 80–150 Hz boost + 8 kHz cut
HVAC/air conditioning rumble → Everything below 80–100 Hz → CUT (HPF)
High-frequency hiss → Everything above 12–15 kHz → CUT (LPF)
```

**How much to adjust?**
- ±1–2 dB: Subtle correction. Usually enough for good production audio.
- ±3–5 dB: Moderate fix. Audible change.
- ±6 dB+: Heavy correction. Usually signals the problem should have been fixed in production. ADR may be better.
- **Less is always more.** If you can hear the EQ, it's probably too much.

---

## DECISION TREE: COMPRESSION

**When do you use compression?**
- The dialogue is consistent in volume → Do NOT compress. You will flatten its natural quality.
- The dialogue has loud peaks and quiet passages → YES. Compress.
- A character whispers and shouts in the same scene → YES. Compress so both are audible.
- Music or ambience is competing with dialogue → Compression on dialogue + level reduction on music. Not compression alone.

**How much compression?**

```
SITUATION → RATIO → THRESHOLD

Normal dialogue with minor variation → 2:1 → -12 dB
Dialogue with noticeable peaks → 3:1–4:1 → -12 to -18 dB
Dramatically varied performance (whisper to shout) → 4:1–6:1 → -18 dB
Emergency fix (unusable dynamic range) → 6:1–8:1 → -20 dB (then consider ADR)
```

**After compressing**: Always apply makeup gain to restore level. Compression makes audio quieter — makeup gain brings it back up. The result: peaks are lower, quiet passages are louder, overall level is the same.

**The limiter**: Always the last step on any track. Set ceiling at -1 dB. It catches anything the compressor missed. Without it, a single loud peak clips the output. Clipping is the only audio problem that cannot be fixed in post.

---

## DECISION TREE: EQ vs. COMPRESSION vs. ADR

```
AUDIO PROBLEM → SOLUTION

Dialogue unclear (correct level, wrong tone) → EQ first
Dialogue too quiet overall → Level up first; if still unclear, EQ
Dialogue peaks too loud → Compression
Dialogue jumpy between quiet and loud → Compression
Dialogue has room noise → HPF + narrow EQ cuts
Dialogue has reverb/echo (moderate) → EQ cut at 500–800 Hz + de-reverb plugin if available
Dialogue has reverb/echo (severe) → ADR. EQ cannot fix severe reverb.
Dialogue recorded in noisy environment → ADR. EQ cannot fix competing noise sources.
Dialogue performance was wrong → ADR. EQ and compression fix technical issues, not performance.
```

---

## Distinction from Production Sound

**@acoustic-design** covers production sound: microphone selection, boom technique, room tone recording, L-cut/J-cut planning.

This skill covers what happens in post: the audio edit, EQ, compression, dialogue polish, foley, and final mix. Production sound is the raw material. Post-production audio is the finished tool.

---

## THE AUDIO SPECTRUM

Sound occupies a frequency spectrum from roughly 20Hz (subsonic rumble, felt not heard) to 20,000Hz (air, shimmer). Every element of the audio mix lives somewhere on this spectrum.

| Frequency Range | Common Name | Content |
|----------------|-------------|---------|
| 20–80 Hz | Sub-bass | Room rumble, low mechanical hum, body resonance — felt more than heard |
| 80–250 Hz | Bass | Weight, body of voice, bass instruments |
| 250–500 Hz | Low midrange | Warmth or muddiness of voice; most problematic for echo/reverb buildup |
| 500–2000 Hz | Midrange | Core of vocal intelligibility; dialogue lives here |
| 2000–5000 Hz | Upper midrange / Presence | Consonants, definition, attack; EQ boost here = vocal clarity |
| 5000–10000 Hz | Treble / Brilliance | Air, sibilance, brightness |
| 10000–20000 Hz | Air | Open quality; shimmer; spatial information |

---

## EQ (EQUALIZATION)

EQ adjusts the relative volume of specific frequency ranges within the audio signal. It does not change the overall volume — it changes the shape of the sound.

### What EQ Does

**Boost** (raise a frequency): Adds more of that sound character. Raising upper midrange (2–5 kHz) adds vocal presence and clarity. Raising bass adds weight and body.

**Cut** (lower a frequency): Removes a sound character. Cutting low midrange (300–500 Hz) reduces muddiness and echo. Cutting sub-bass removes room rumble.

### EQ for Dialogue — Standard Moves

| Problem | EQ Move |
|---------|---------|
| Voice sounds muffled, muddy | Cut low midrange (250–500 Hz) slightly |
| Room echo/reverb too present | Cut midrange (500–1000 Hz) slightly |
| Voice sounds thin, no body | Boost bass (100–200 Hz) slightly |
| Voice sounds dull, lacking clarity | Boost presence (2–4 kHz) |
| Phone recording sounds tinny | Boost bass (80–150 Hz); cut air (8–12 kHz) |
| Harsh, sharp "S" sounds (sibilance) | Cut high treble (6–10 kHz) narrowly |
| Too much room hiss | Cut air (10+ kHz) |
| Mechanical rumble from AC/HVAC | High-pass filter: cut everything below 80–100 Hz |

### The High-Pass and Low-Pass Filter (Always Use These First)

**High-pass filter** (HPF): Cuts all frequencies below a set point. Roll off everything below 80 Hz as a default starting point — this removes subsonic rumble, handling noise, HVAC bass, and footstep vibration that degrades dialogue without ever being heard as useful sound.

**Low-pass filter** (LPF): Cuts all frequencies above a set point. Less commonly used on dialogue, but useful for special effects (walkie-talkie effect, phone effect, muffled-through-wall effect) — cut everything above 4–5 kHz for these.

**Rule**: Roll off the extreme high-end and extreme low-end on every dialogue track as a first step. You will never miss that content. You will always benefit from its removal.

### EQ Presets

Every audio application includes EQ presets (bass boost, bass cut, treble boost, vocal presence, etc.). For editors without deep audio experience: apply the closest preset, reduce its intensity to 50–70%, then make small manual adjustments. Presets are starting points, not finishing points.

**30-band vs. 10-band EQ**: A 30-band equalizer allows narrower, more precise adjustments than a 10-band. For dialogue polish, a 10-band is sufficient. For sound design work, use 30-band.

---

## COMPRESSION

A compressor automatically manages the dynamic range of audio — the distance between the loudest and quietest moments in a track.

### The Problem Compression Solves

A character whispering at -30dB, then shouting at 0dB, requires the audience to constantly adjust volume or miss dialogue. A compressor automatically brings these together: the loud parts are turned down (compressed), then the entire track is raised (makeup gain), so the quiet parts are now audible at a useful level.

**Analogy**: Compression does to audio what lowering contrast does to video. It reduces the extremes to create a more even, controlled result.

### How a Compressor Works

| Parameter | Function |
|-----------|---------|
| **Threshold** | The ceiling: audio above this level gets compressed. Set where peaks live — typically -6 to -12 dB for dialogue |
| **Ratio** | How aggressively peaks are reduced. 2:1 = gentle (every 2dB above threshold → 1dB output). 4:1 = moderate dialogue. 8:1+ = heavy limiting |
| **Attack** | How fast the compressor responds when audio crosses threshold. Fast attack = catches everything. Slow attack = lets transients through |
| **Release** | How fast the compressor stops working when audio drops below threshold |
| **Makeup Gain / Output** | After compression reduces peaks, raise overall level back up with output gain |

### Dialogue Compression Starting Points

- **Threshold**: -12 dB (catches peaks, ignores quiet passages)
- **Ratio**: 3:1 to 4:1 (moderate)
- **Attack**: 10–30ms (fast enough to catch dialogue peaks, slow enough to preserve natural transients)
- **Release**: 50–100ms
- **Makeup Gain**: Raise until dialogue average sits at -12 to -6 dB

### Presets for Non-Specialists

Compression presets work well for standard dialogue polish. Names vary by software but look for: "Dialogue," "Broadcast," "Voice Over," or "Vocal Compression." Apply, then adjust threshold to taste.

**Limiter**: A compressor with a very high ratio (10:1 or higher, sometimes labeled "∞:1"). Used as a safety net to prevent any audio from exceeding 0 dB (which causes digital clipping — the worst possible artifact). Always place a limiter at the end of the audio chain, set to -1 or -2 dB ceiling.

---

## DIALOGUE POLISH WORKFLOW

For each dialogue track, process in this order:

1. **High-pass filter** — roll off below 80–100 Hz
2. **EQ** — fix any tonal problems (muddiness, harshness, thinness)
3. **Compression** — even out dynamic range
4. **Limiter** — safety ceiling at -1 dB
5. **Level** — set final track volume (dialogue target: -12 dB average, -6 dB peaks)

**Then**: Room tone fills any gaps. ADR replaces any unusable lines. All production audio must be evaluated before the polish pass — unusable tracks need to be replaced first, not polished.

---

## FOLEY

Foley = the recreation of everyday sound effects in post-production, performed by foley artists in a studio in sync with picture.

**Why foley is necessary**: Production sound captures dialogue. It rarely captures footsteps, clothing movement, prop handling, or environmental contact sounds with usable clarity. These are recreated.

### Foley Categories

| Category | Examples |
|----------|---------|
| **Footsteps** | Walking, running, shuffling, on different surfaces |
| **Props** | Pen on paper, coffee mug on table, keyboard typing, door handles |
| **Cloth** | Clothing movement during action (actors moving in frame creates cloth noise, recorded separately) |
| **Specifics** | Anything the script requires that production couldn't capture (impact sounds, special effects) |

**For student productions**: Full foley is rarely feasible. Priority list:
1. Footsteps in emotionally significant scenes (Carter walking to the medbay)
2. Key prop sounds (the relay hum, notebook pages, pen writing)
3. Any scene where the production audio is too clean — complete silence reads as wrong

### Sound Libraries

Pre-recorded sound effects available in every editing application and downloadable from libraries (Freesound.org, Soundsnap, ZapSplat). Used to supplement foley or replace it when live performance isn't possible.

**Matching**: Library sound must match the spatial quality of the scene. A dry, close sound in a reverberant room needs reverb added. A distant sound in a tight space needs dampening. The spatial footprint must match.

---

## THE FINAL MIX

The mix sets the relative volume of all audio elements against each other:

| Element | Target Level |
|---------|-------------|
| Dialogue | -12 dB average, -6 dB peaks |
| Music | -18 to -20 dB (under dialogue) |
| Ambient/Room Tone | -30 to -35 dB (felt, not heard) |
| Sound Effects | -15 to -18 dB (below dialogue, above music) |
| Foley | -18 to -20 dB |

**Master output ceiling**: -1 dB. Never let the master output clip. The limiter prevents this.

**Loudness normalization**: Streaming platforms (YouTube, Vimeo) normalize audio to -14 LUFS (Loudness Units Full Scale). Mix to this target to avoid automatic platform level adjustment degrading your mix.

---

## ON THE EDGE AUDIO POST PLAN

### Stage-Specific EQ Strategy

The ship's room tone is an active character and its EQ profile changes by stage (see @acoustic-design for production recording). In post, these changes are enforced via EQ on the room tone tracks:

| Stage | Room Tone EQ | Character | Action |
|-------|-------------|-----------|--------|
| **Stage One** | Flat — natural ship hum around 60–80 Hz | Mechanical, steady, safe | No EQ processing; let the natural hum breathe |
| **Stage Two** | Sub-bass boost 20–40 Hz; slight cut at 200–400 Hz | A new frequency intrudes below the ship hum | Add a sustained sub-bass tone at -30 dB (felt only) |
| **Stage Three** | Severe HPF cut (remove all above 400 Hz from room tone) + extreme sub-bass | Mechanical sounds are dying; something else fills the spectrum | Only sub-bass remains in the ambient bed; ship is acoustically disintegrating |

### Entity Audio Rule

The Entity has no sound. It is defined by subtraction.

When the Entity approaches, process the room tone track as follows:
- Gradually cut frequency bands from the top down in the mix
- 400 Hz gone, then 200 Hz, then the mechanical hum range (60–80 Hz)
- What remains: only sub-bass below 40 Hz, and silence

Silence in this film is never peaceful. Silence is the Entity. The audience's EQ experience should register the absence before the dialogue acknowledges it.

### Dialogue EQ by Character

| Character | Voice Quality | Post EQ Treatment |
|-----------|--------------|-------------------|
| **Reyes** | Clear, mid-range, precise | Flat EQ — presence boost +2 dB at 3 kHz for clarity |
| **Marshall** | Lower register, authoritative | Slight bass preservation; do not HPF below 60 Hz for his voice |
| **Tanaka** | Natural, intellectual | Flat; Stage Three: add subtle reverb (room size 10–15%) to suggest psychological distance |
| **Costa** | Controlled, methodical | Flat; her silence is as important as her voice — no compression over-leveling |
| **Carter** | Precise, increasingly pressured | Stage Three: compress harder (4:1→6:1 ratio) to remove all dynamic variation. He has no range left |
| **Cassie** | Clean, AI-processed | Slight high-pass at 120 Hz; presence boost at 4 kHz; add subtle digital shimmer (3–5% harmonic distortion) |

---

## INTEGRATION WITH OTHER SKILLS

- Works with **@acoustic-design** — post-production EQ cannot fix bad production audio. The best mic placement, room tone recording, and L-cut/J-cut decisions must happen in production before this skill is applied.
- Works with **@editorial-grammar** — the audio mix must support the editorial rhythm. Fast-cut sequences need tight, compressed audio. Long takes in Stage Three need the room to breathe (or not breathe) with the Entity's sub-bass presence.
- Works with **@color-grading** — color and sound grade together. The Stage Three desaturated, cold color grade and the Stage Three stripped-spectrum room tone should be locked together in the timeline — audience experiences the world failing on both sensory channels simultaneously.

---

## OUTPUT FORMAT

When specifying audio post for a scene:

```
SCENE: [heading]
STAGE: [One / Two / Three]

DIALOGUE POLISH:
- HPF: [Hz cutoff]
- EQ Notes: [any problem frequencies to address]
- Compression: [ratio] at [threshold] dB
- ADR Required: [yes/no, which lines]

ROOM TONE:
- Source: [production recording — location + take]
- EQ: [frequency profile by stage]
- Level: [dB]
- Sub-bass addition: [yes/no, Hz, level]

FOLEY:
- Priority items: [list]
- Library sound needs: [list]

MIX LEVELS:
- Dialogue: [-12 dB avg]
- Music (if any): [dB]
- Ambient: [dB]
- SFX: [dB]

SPECIAL:
[Entity frequency subtraction? Character-specific compression note?]
```


---

## Sources

**Primary:**

- `[Filmmaking:MakingAFilm]` — post-production audio chapters.
- `[DigitalFilmmaking]` — beginner-level audio post-production instruction.

**External (un-grounded locally):**

- `[external-source: Yewdall, Practical Art of Motion Picture Sound]` — canonical post-audio reference; not in local corpus.
- `[external-source: Sonnenschein, Sound Design]` — sound-design framing for post; not in local corpus.

**General knowledge** `[general-knowledge]`:

- Standard EQ frequencies, dialogue compression ratios (e.g., 3:1–4:1), and broadcast loudness targets (-23 LUFS for European broadcast, -16 LUFS for streaming) are widely-published technical standards.

**Pending verification:**

- Foley technique claims and specific dialogue-polish workflows on next deep edit, pin to `[Filmmaking:MakingAFilm]` post-production chapters.