---
description: Acoustic design — microphone selection, boom technique, room tone, L-cut/J-cut, horror sound strategy
tags: [filmmaking, sound, audio, production]
---

# ACOUSTIC DESIGN

## Microphone Types

### By Impedance
**High-impedance mics**: Consumer grade. Shorter cable runs (under 20 feet). Susceptible to interference. Not used on professional sets.

**Low-impedance mics (XLR)**: Professional standard. Use balanced XLR cables. Long cable runs without signal degradation. Phantom power capable.

### By Design

| Type | Pattern | Best Use | Limitation |
|------|---------|----------|-----------|
| Standard hand mic | Cardioid/Omni | Host/reporter | Visible in frame |
| Shotgun mic (boom) | Hypercardioid | Primary production audio, off-camera dialog | Must point at source; off-axis rejection |
| Lavalier/lapel (lav) | Omni (small) | Concealed on actor body | Clothing rustle, cable management |
| Boundary mic | Hemisphere | Table surfaces, floors | Picks up everything in hemisphere |

## Pickup Patterns

The pickup pattern defines which directions a microphone is sensitive to:

- **Omnidirectional**: Equal sensitivity in all directions — sphere. Picks up everything. Used when ambient sound is the subject.
- **Bidirectional (figure-8)**: Sensitive front and back, rejects sides. Interview setups, two-person facing.
- **Cardioid**: Heart-shaped sensitivity, rejects rear. Standard hand mic, many lavs. Good general-purpose rejection.
- **Hypercardioid/Supercardioid**: Narrower than cardioid, more rear rejection, small rear lobe. Shotgun family. Maximum directional selectivity.
- **Shotgun**: Extreme hypercardioid plus interference tube (lobar pattern). Rejects nearly everything off-axis. The standard production mic.

## Boom Technique (Fish Pole)

The boom pole ("fish pole") holds the shotgun mic outside the frame, pointed at the sound source.

**Above-frame placement (preferred)**: Boom operator holds pole overhead, mic angled down toward actor's mouth. Mic stays just outside upper frame edge. This is the standard approach — shadows from the mic fall down and away from the subject.

**Below-frame placement**: Used on tight close-ups or extreme close-ups where above placement would require an impossible angle. Mic points upward toward mouth. Risk: mic shadow visible if not managed. Boom operator must watch monitor.

**Boom operator's absolute requirement**: Wearing headphones. Always. The boom operator is the only person whose job is to listen to what the camera is recording, in real time. The director listens for performance; the boom op listens for audio quality — noise, off-axis sounds, distortion, handling noise.

## Wireless Lavalier Systems

**Transmitter**: Small unit clipped to actor's clothing, taped to body, or hidden in costume. Contains the lav mic element. Transmits via radio frequency to receiver.

**Receiver**: Mounted on camera or in sound bag. Receives signal and outputs to camera's audio input.

**Placement principle**: Place lav as close to the mouth as possible while concealed — typically chest height, under a shirt layer, away from fabric that will rub. A lav under two layers of fabric sounds distant and muffled; a lav at collar level behind a lapel sounds clean.

## Sound Baffle Accessories

- **Foam sock (windscreen)**: Foam covering over microphone capsule. Reduces wind noise and breath pops. Basic protection outdoors.
- **Blimp (zeppelin)**: Hollow cylindrical cage around the mic, with internal suspension (shock mount) and external wind-resistant fur (dead cat/windjammer). Professional exterior use. Eliminates wind noise almost completely.

## Mixers

For multi-mic setups (multiple lavs + boom), a field mixer combines signals with individual level control and sends the mixed output to camera. Essential on any shoot with more than one mic actively recording.

## Room Tone

**Definition**: The ambient sound of a space with no deliberate sound being made — no dialogue, no action, no music. The "silence" of a location.

**Why it's mandatory**: When dialog is cut, edited, or ADR'd in post, the transitions between audio clips create audible silence. Pure silence sounds wrong — it's a gap, an edit scar. Room tone fills those gaps seamlessly. The edit becomes inaudible.

**How to record**: At the END of every shooting session at every location — before moving to a new set or striking the location — the director calls for quiet. Everyone freezes. The boom op records 30 seconds to 1 minute of the room's ambient sound. No one speaks. No one moves. No one leaves.

**For ON THE EDGE**: The ship's room tone is the most important audio element in the film. It is:
- Stage One: Low hum of life support, almost subliminal, neutral and mechanical
- Stage Two: Same hum but with an added frequency — very low, almost below hearing, that the audience feels rather than hears
- Stage Three: The hum has changed register. Something is resonating in the hull that has no mechanical source.

Room tone in a horror film is not neutral — it is a character.

## ADR (Automatic Dialogue Replacement)

When production audio is unusable — excessive noise, performance issues, location sound bleed — dialogue is re-recorded in a studio by the same actor, watching the footage, and matching lip movement.

ADR is scheduled in post-production, not production. However, the production team must flag lines during production that will likely require ADR — noisy environments, overlapping sound sources, exterior shots in wind.

## L-Cut and J-Cut: Split Edits

These are the two most important editorial tools in acoustic design. They are planned in production, executed in post.

**L-Cut**: The outgoing shot's audio continues into the beginning of the incoming shot's video. The audience hears the next moment before they see it. The world has already moved on before the image catches up. Creates continuity, naturalism, forward momentum. Named because the audio track on the timeline extends right (like the bottom of an L) past the video cut.

**J-Cut**: The incoming shot's audio begins before the incoming shot's video arrives. The audience hears what's coming before they see it. Creates anticipation, dread, irony. Named because the audio track extends left (like the top of a J) before the video cut.

**Horror application**: The J-cut is the grammar of dread. Hearing the Entity before seeing it. Hearing a crew member's scream before cutting to them. The gap between audio cue and visual confirmation is where the audience's imagination does the work — and imagination is always more terrifying than the image.

## ON THE EDGE Sound Plan

| Stage | Primary Mic | Backup | Room Tone Character | Key Technique |
|-------|------------|--------|---------------------|---------------|
| Stage One | Shotgun boom above frame | Wireless lav concealed | Mechanical hum, 60-80Hz, consistent | L-cuts between scenes for continuity |
| Stage Two | Shotgun boom; increasing use of lav for intimacy | Both simultaneously | Hum + sub-bass intrusion, 20-40Hz | J-cuts begin: hear the wrong thing first |
| Stage Three | Lav primary (boom axis unreliable as staging breaks) | Shotgun for coverage | Sub-bass dominant, mechanical sounds absent | J-cuts with extended pre-audio delay |

**Entity audio rule**: The Entity has no sound. Its presence is defined by the subtraction of sound — the room tone drops frequency by frequency as it approaches. Silence is not peaceful in this film. Silence is the Entity.

## DECISION PROTOCOL

### When to Invoke This Skill

During pre-production (microphone selection and location sound strategy) AND in post-production (L/J-cut editorial planning). Room tone recording is a production-day non-negotiable — it cannot be created in post.

### How to Choose Microphone

Source: `@direct-digital-film`; Tomlinson Holman, *Sound for Film and Television* (2010)

```
ASK: What is the environment and how is the subject moving?

→ Controlled interior, subject relatively static
     → SHOTGUN BOOM above frame (hypercardioid; maximum off-axis rejection)
     → Boom operator wears headphones. Always.

→ Subject moving through space; concealment required
     → LAVALIER on body (omni pattern; hidden in costume)
     → Placement: as close to mouth as possible while concealed (collar/lapel preferred)
     → Caution: fabric rustling; test before shooting

→ Group at a table or surface; no single subject
     → BOUNDARY MIC (hemisphere pickup)
     → Records the whole surface; no directionality; use when boom is impractical

→ Multiple mic sources active simultaneously
     → FIELD MIXER required to combine signals with individual level control
     → Without a mixer, camera audio receives one signal; other signals are lost
```

### When to Use L-Cut vs. J-Cut

Source: Walter Murch (credited with systematizing split edit practice); `@editorial-grammar`

```
ASK: Does the next scene arrive before or after we expect it?

→ The world flows naturally forward; scene change is organic
     → L-CUT: Outgoing audio continues into incoming video.
     → The conversation keeps going even though we've moved rooms. Life doesn't pause.

→ Something in the next scene arrives before the audience expects it
     → J-CUT: Incoming audio begins before its video arrives.
     → We hear the alarm before we see the alarm. We hear the scream before we cut to it.
     → The gap between audio cue and visual confirmation = where imagination does the work.

→ Horror/dread — the threat precedes its own arrival
     → J-CUT with extended audio lead (hear it longer before seeing it)
     → Stage Three: J-cuts with 3-5 second audio lead before video cut

→ Stage mapping:
     → Stage One: L-cuts dominant (world flows forward naturally)
     → Stage Two: Mixed (the future sometimes bleeds in)
     → Stage Three: J-cuts dominant (the future arrives before the present resolves)
```

### Room Tone Protocol (Non-Negotiable Production Requirement)

```
AT EVERY LOCATION, EVERY SHOOTING DAY, BEFORE STRIKING:

1. Director calls for quiet
2. All crew freezes — no movement, no speech
3. Boom operator records 30–60 seconds with the same mic used for dialogue
4. Label with: location name / date / HVAC state (on or off) / any ambient conditions
5. Store with the production audio — it is as critical as any dialogue take

WHY: When dialogue is cut or edited, the gap between audio clips is pure silence.
Pure silence under cut dialogue sounds wrong — the ear hears an edit scar.
Room tone fills those gaps. The edit becomes inaudible.

IF ROOM TONE WAS NOT RECORDED: Post-production audio is damaged before it starts.
ADR may be required for scenes where room tone is missing and dialogue has been edited.
```

### Source Index

- **Microphone types and polar patterns**: `@direct-digital-film`; Tomlinson Holman, *Sound for Film and Television* (3rd ed., 2010)
- **L-cut/J-cut as editorial grammar**: Walter Murch (split edit terminology and practice)
- **Room tone as acoustic fingerprint**: Standard production sound protocol; Holman, *Sound for Film and Television*
- **Boom operator absolute requirement (headphones)**: Production sound standard practice
- **Entity audio rule (sound as subtraction)**: ON THE EDGE production design; `@direct-digital-film`
- **Horror application of J-cut**: `@editorial-grammar` split edit strategy
