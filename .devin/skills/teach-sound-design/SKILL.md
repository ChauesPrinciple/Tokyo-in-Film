---
description: Teach sound design and recording techniques including location sound, foley, mixing, and creative audio storytelling
tags: [sound-design, audio, recording, foley, mixing, pedagogy]
---

# Teach Sound Design Skill

## Purpose
Create pedagogical content that teaches students practical sound recording and design techniques using smartphones and free software, emphasizing creative problem-solving over expensive equipment.

## Existing Sound Resources
- `production/sound-design.html` (18KB) - Production sound module
- `post-production/sound-design.html` (43KB) - Post-production sound module
- Free software: Audacity (audio editing)
- Smartphone recording capabilities

## Core Sound Design Areas

### 1. Location Sound Recording

**Smartphone Recording Basics**
- Built-in microphone limitations
- Voice memo apps vs. dedicated recording apps
- Mono vs. stereo recording
- Sample rate and bit depth settings

**Recording Technique**
- Get close to sound source (inverse square law)
- Avoid handling noise
- Monitor with headphones when possible
- Record room tone for every location

**Tokyo Location Challenges**
- Train noise (constant background)
- Crowd noise in public spaces
- Traffic and urban sounds
- Wind noise outdoors

**Dialogue Recording**
- Close-mic technique with phone
- Quiet locations and times
- Multiple takes for safety
- Wild lines for ADR

### 2. Sound Design Fundamentals

**Three Layers of Sound**
- **Dialogue**: Character voices, narration
- **Sound Effects**: Diegetic sounds in the world
- **Music**: Score, source music, emotional underscore

**Diegetic vs. Non-Diegetic**
- Diegetic: Characters can hear it
- Non-Diegetic: Audience only (score, narration)
- Creative ambiguity (is the music real?)

**Sound Perspective**
- Close sounds: intimate, detailed
- Distant sounds: reverb, muffled
- Off-screen sounds: spatial awareness
- Matching sound to shot size

**Silence as Tool**
- Absence creates tension
- Contrast with loud moments
- Emotional impact
- Audience attention

### 3. Foley and Sound Effects

**What is Foley?**
- Recreating everyday sounds in sync
- Footsteps, cloth movement, props
- Recorded in post-production
- Adds texture and realism

**DIY Foley Techniques**
- Footsteps: shoes on various surfaces
- Cloth: rustling fabric for movement
- Props: actual objects or substitutes
- Body sounds: creative alternatives

**Household Foley Items**
- Vegetables for body impacts (celery, lettuce)
- Bags of rice/beans for movement
- Cardboard for various textures
- Kitchen items for props

**Recording Foley**
- Close-mic with smartphone
- Quiet room essential
- Multiple takes for variety
- Sync in editing software

**Sound Effects Libraries**
- Free resources (Freesound.org, BBC Sound Effects)
- Creative Commons licensing
- Recording your own library
- Tokyo-specific sounds

### 4. Dialogue Editing

**Dialogue Cleanup**
- Noise reduction (careful, not too much)
- EQ for clarity
- Compression for consistency
- De-essing harsh sibilants

**ADR (Automated Dialogue Replacement)**
- When to re-record dialogue
- Matching room tone
- Sync techniques
- Performance matching

**Dialogue Mixing**
- Consistent volume levels
- Presence and clarity
- Spatial placement (left/right)
- Ducking under music/effects

### 5. Music and Score

**Using Music Legally**
- Copyright issues (no popular music without license)
- Creative Commons music
- Royalty-free libraries
- Student composer collaborations

**Music Selection**
- Emotional tone matching
- Pacing and rhythm
- Cultural appropriateness
- Avoiding clichés

**Music Editing**
- Cutting to length
- Fading in/out
- Looping techniques
- Matching to picture

**Temp Music**
- Placeholder during editing
- Finding final music later
- Avoiding temp love
- Communicating intent

### 6. Mixing Fundamentals

**The Mix Process**
1. **Dialogue first**: Clarity and presence
2. **Sound effects**: Support and realism
3. **Music**: Emotional foundation
4. **Balance**: All elements working together

**Volume Levels**
- Dialogue: -12 to -6 dB
- Music: -20 to -12 dB (under dialogue)
- Sound effects: Varies by importance
- Headroom: Leave space, avoid clipping

**Panning**
- Dialogue: Center (usually)
- Effects: Spatial placement
- Music: Stereo spread
- Creating space in mix

**EQ in Mixing**
- Carve space for dialogue (reduce mid-range in music)
- Remove mud (low-mid frequencies)
- Add presence (high frequencies)
- Fix problem frequencies

**Compression and Dynamics**
- Even out volume variations
- Add punch to effects
- Glue mix together
- Avoid over-compression

## DECISION PROTOCOL

This section defines the reasoning framework for every sound decision — before recording, during production, and in post.

### Diagnostic: Is This Audio Salvageable? (Source: `@audio-post-production`; Skillshare VTT 15)

Before spending time on post-production audio work, diagnose whether the problem is fixable. Some problems are not fixable in post — they must be prevented in production or replaced.

```
LISTEN TO THE RAW AUDIO. ANSWER IN ORDER:

1. Can you understand the dialogue?
     → NO: Is the problem noise (traffic, HVAC, crowd)?
          → YES: EQ/compression CANNOT fix competing noise sources. 
                 Options: ADR, reshoot, or abandon the clip.
          → NO: Is the problem tonal (muffled, hollow, thin)?
               → YES: EQ can fix this. Proceed to EQ diagnosis.

2. Is the volume jumping between loud and quiet?
     → YES: Compression will fix this. Apply before mixing.
     → NO: Go to 3.

3. Does the audio have unwanted low rumble or hiss?
     → RUMBLE: High-pass filter (cut below 80–100 Hz). Always the first EQ move.
     → HISS: Low-pass filter (cut above 12–14 kHz).
     → Both fixable with EQ.

4. Is the room echo severe (heavy reverb)?
     → MODERATE: EQ cut at 500–800 Hz reduces it slightly.
     → SEVERE: EQ cannot fix severe reverb. ADR required.
     → RULE: If you can hear the room more than the person, ADR.

5. Does the audio match other clips in the same scene?
     → NO: Level match first (volume), then EQ match (tone).
     → YES: Ready for the mix.

THE RULE: Production problems require production solutions. Post-production fixes tonal and
dynamic problems. It cannot fix bad location choices, wrong mic placement, or competing sounds.
```

---

### Decision Tree: Which Recording Approach?

```
WHERE AND WHAT ARE YOU RECORDING?

→ Interior, controlled environment (classroom, room, quiet space)
     → Smartphone close-mic: Hold phone 20–30cm from subject's mouth
     → If available: External mic attachment for smartphone (lavalier preferred)
     → Record room tone: 30–60 seconds of silence before recording dialogue

→ Exterior, moderate noise (park, quieter street)
     → Close-mic still works; keep phone/mic within 30cm of subject
     → Shoot in early morning or late evening for lowest ambient noise
     → Prioritize direction: put noise source behind subject, mic aimed away from it
     → Multiple takes for safety — one clean take is all you need

→ Exterior, high noise (Shibuya crossing, train station, markets)
     → You cannot fix this environment in post
     → Three options: (1) record dialogue wild (not on set) and sync later; 
       (2) use the location for visuals only and record sound elsewhere; 
       (3) embrace the ambient noise as design (must be intentional)
     → Record the ambient noise as a sound design asset (use it, don't fight it)

→ Moving subject (walking, running)
     → Smartphone on a boom (improvised: phone taped to a pole or stick)
     → Or: record close-up static shot, use ambient track from location underneath
     → Avoid: holding the phone while walking (handling noise)

→ Group scene, multiple people talking
     → Record each person separately when possible (coverage-style audio)
     → Or: boom positioned to capture group, accept some distance
     → Always: record room tone to cover edits
```

---

### Decision Tree: When Does Silence Work as Sound Design?

```
SILENCE IS A TOOL. USE IT WHEN:

→ Something terrible just happened
     → Hard cut to silence after impact. Do not fill it immediately.
     → Silence after violence or shock = the world has stopped. It holds the audience.

→ Building dread before an event
     → Gradually reduce ambient sound before a threat arrives
     → Per @acoustic-design: Entity-adjacent scenes use gradual frequency subtraction
     → The ABSENCE of expected sound is more threatening than added sound

→ A character is isolated
     → Strip away all sound except their breathing and immediate foley
     → The absence of the outside world = the inside world has consumed them

→ A moment of clarity or decision
     → Remove music; let the silence make the decision feel real
     → Music tells the audience what to feel. Silence forces them to decide.

WHEN NOT TO USE SILENCE:
→ To save time on sound design: Audiences notice
→ Under dialogue that has usable room tone: Flat silence under dialogue = unnatural
→ RULE: Silent sections need room tone underneath. Pure silence is a sound effect, not absence.
```

---

### Decision Tree: ADR vs. Fix in Post?

```
THE AUDIO PROBLEM IS:

→ Wrong tone (muffled, thin, boomy) but dialogue is clear
     → FIX IN POST: EQ first. Target specific frequency. 
       (Source: Skillshare VTT 15 — EQ adjusts frequency spectrum to shape sound)

→ Inconsistent volume (loud lines, quiet lines in same clip)
     → FIX IN POST: Compression. 
       (Source: Skillshare VTT 15 — compression reduces dynamic range)

→ Noise underneath dialogue (constant HVAC, wind, rumble)
     → CONSTANT NOISE: High-pass filter + noise reduction plugin (Audacity noise removal)
       May work. Test first.
     → VARIABLE NOISE (traffic, crowd): ADR required.

→ Dialogue is present but performance needs to be re-recorded
     → ADR: EQ and compression cannot fix performance. Only ADR fixes performance.

→ Dialogue is completely unusable (clipping, severe distortion)
     → ADR: Clipping is the one audio problem that cannot be fixed in post.

→ Room reverb is heavy throughout the clip
     → ADR: EQ can reduce moderate reverb; it cannot remove heavy reverb.
       Better to record clean in a controlled space.

PRIORITY ORDER: Try fix-in-post first. If three minutes of work doesn't solve it, plan ADR.
ADR adds time but is always cleaner than over-processed location sound.
```

---

### Integration with Other Skills

- `@audio-post-production` — full EQ/compression diagnosis protocol and dialogue polish workflow
- `@acoustic-design` — microphone types, boom placement, room tone protocol, L-cut/J-cut editorial strategy
- `teach-editing-principles` — L-cuts and J-cuts require coordinated decisions between picture and sound
- `@color-grading` — audio mix happens after picture lock; color grade and audio mix are parallel workflows

---

## Pedagogical Approach

### Teaching Progression

**Week 1: Recording Basics**
- Smartphone recording techniques
- Location sound challenges
- Room tone and wild sound
- Listening exercises

**Week 2: Foley and Effects**
- DIY foley techniques
- Recording household sounds
- Sound effects libraries
- Sync and timing

**Week 3: Dialogue and Cleanup**
- Dialogue editing in Audacity
- Noise reduction basics
- ADR techniques
- Consistency and clarity

**Week 4: Music and Mixing**
- Music selection and editing
- Three-layer mix approach
- Final mix export
- Presentation and critique

### Exercise Design

**Recording Exercises**
1. **Room Tone Collection**: Record 5 Tokyo locations
2. **Dialogue Practice**: Record clean dialogue outdoors
3. **Sound Scavenger Hunt**: Capture 20 different sounds
4. **Foley Challenge**: Recreate 5 sounds from a film scene

**Editing Exercises**
1. **Dialogue Cleanup**: Fix noisy dialogue recording
2. **Foley Sync**: Add footsteps to silent footage
3. **Ambience Build**: Layer sounds for location
4. **Music Edit**: Cut music to match scene length

**Mixing Exercises**
1. **Three-Layer Mix**: Dialogue, effects, music balance
2. **Perspective Match**: Sound matches shot size
3. **Emotional Mix**: Same scene, different moods
4. **Final Project Mix**: Complete short film

### Tokyo-Specific Considerations

**Recording Opportunities**
- Train station ambience
- Street sounds (Shibuya, Shinjuku)
- Temple/shrine atmospheres
- Park and nature sounds
- Residential neighborhood tones

**Recording Challenges**
- Constant background noise
- Limited quiet spaces
- Public recording permissions
- Equipment limitations

**Creative Solutions**
- Early morning recording (quieter)
- Indoor locations for dialogue
- Embrace Tokyo soundscape
- Creative sound design over perfect recording

## Film Analysis Framework

### Analyzing Sound in Course Films

**Seven Samurai (1954)**
- Rain and weather sounds
- Battle sound design
- Dialogue clarity in chaos
- Silence and tension

**Shoplifters (2018)**
- Intimate dialogue recording
- Domestic sound details
- Tokyo urban ambience
- Naturalistic approach

**Your Name (2016)**
- Animated sound design
- Music integration (RADWIMPS)
- Tokyo soundscape
- Emotional sound moments

**Jujutsu Kaisen (anime)**
- Supernatural sound effects
- Impact and action sounds
- Voice acting and ADR
- Music and sound relationship

### Analysis Questions

1. What are the three sound layers in this scene?
2. How does sound create spatial awareness?
3. What sounds are diegetic vs. non-diegetic?
4. How does sound support emotion?
5. What could you recreate with your resources?
6. How does sound direct attention?

## Common Student Challenges

### Recording Issues

**Problem**: Noisy location recordings
- **Solution**: Record early morning when quieter
- **Solution**: Get closer to sound source
- **Solution**: Use noise reduction carefully in post
- **Solution**: Embrace Tokyo soundscape creatively

**Problem**: Inconsistent dialogue levels
- **Solution**: Monitor distance from phone mic
- **Solution**: Record multiple takes
- **Solution**: Use compression in mixing
- **Solution**: ADR problem sections

**Problem**: Wind noise on smartphone
- **Solution**: Windscreen (even makeshift foam)
- **Solution**: Shield mic with hand/body
- **Solution**: Record indoors when possible
- **Solution**: High-pass filter in post

### Creative Issues

**Problem**: Sound feels flat or boring
- **Solution**: Layer multiple sound sources
- **Solution**: Add subtle background ambience
- **Solution**: Use foley for texture
- **Solution**: Dynamic range (quiet to loud)

**Problem**: Music overpowers dialogue
- **Solution**: Dialogue always clearest
- **Solution**: Duck music under dialogue
- **Solution**: EQ to carve space
- **Solution**: Choose less busy music

**Problem**: Sounds don't match picture
- **Solution**: Watch while mixing (picture lock)
- **Solution**: Sync foley carefully
- **Solution**: Match perspective to shot size
- **Solution**: Use reference films

### Technical Issues

**Problem**: Audacity learning curve
- **Solution**: Start with basic tools only
- **Solution**: Tutorial videos
- **Solution**: Practice exercises
- **Solution**: Peer teaching

**Problem**: File management chaos
- **Solution**: Naming conventions
- **Solution**: Organized folder structure
- **Solution**: Backup everything
- **Solution**: Project templates

## Assessment Criteria

### Evaluating Student Sound Work

**Recording Quality (20%)**
- Clean dialogue capture
- Appropriate levels
- Minimal unwanted noise
- Good room tone

**Sound Design (25%)**
- Effective foley work
- Creative sound effects
- Appropriate ambience
- Attention to detail

**Dialogue Clarity (20%)**
- Always understandable
- Consistent levels
- Clean edits
- Natural performance

**Music Integration (15%)**
- Legally sourced
- Emotionally appropriate
- Proper levels
- Good editing

**Final Mix (20%)**
- Balanced three layers
- Professional loudness
- Spatial awareness
- Technical quality

## Integration with Course

### Pre-Production Connection
- Sound design planning
- Location sound scouting
- Music selection research
- Equipment preparation

### Production Connection
- On-set recording techniques
- Wild sound collection
- Room tone recording
- Backup recordings

### Post-Production Connection
- Dialogue editing and cleanup
- Foley recording and sync
- Music editing
- Final mix and export

## Software Guide: Audacity

### Essential Audacity Tools

**Basic Editing**
- Selection tool
- Cut, copy, paste
- Fade in/out
- Normalize

**Effects**
- Noise Reduction (use sparingly)
- Equalization (EQ)
- Compressor
- Amplify/Normalize

**Mixing**
- Multiple tracks
- Envelope tool (volume automation)
- Pan controls
- Export mix

### Audacity Workflow

1. **Import** all audio files
2. **Sync** to picture (if available)
3. **Clean** dialogue (noise reduction, EQ)
4. **Add** foley and effects
5. **Place** music
6. **Mix** all layers (volume, pan, EQ)
7. **Export** final mix

## Resources and References

### Free Sound Resources
- Freesound.org - Sound effects library
- BBC Sound Effects - Free archive
- YouTube Audio Library - Music and effects
- Incompetech - Royalty-free music

### Recording Apps
- Voice Memos (iOS)
- Voice Recorder (Android)
- Dolby On (free, good quality)
- RecForge II (Android)

### Learning Resources
- Audacity manual and tutorials
- Sound design basics videos
- Film sound analysis
- Foley technique demonstrations

## Voice and Tone

When teaching sound design:
- **Empowering**: "Great sound is possible with a smartphone"
- **Specific**: "Place your phone 6 inches from the actor's mouth"
- **Practical**: "Record room tone for every location, even if you forget"
- **Creative**: "What household object sounds like footsteps in snow?"
- **Encouraging**: "Sound design is 50% of the film experience"
- **Honest**: "Your first mixes will be rough, but you'll improve quickly"

## Example Content Structure

### Module Page Format
1. **Why Sound Matters** - 50% of the experience
2. **Recording Basics** - Smartphone techniques
3. **Film Examples** - Sound analysis from course films
4. **Foley Workshop** - Hands-on creation
5. **Mixing Fundamentals** - Three-layer approach
6. **Software Tutorial** - Audacity essentials
7. **Assignment** - Complete sound design project

### Worksheet Format
1. **Sound Planning** - Three layers outlined
2. **Recording Log** - What, where, when recorded
3. **Foley List** - Sounds to create
4. **Music Choices** - With legal sources
5. **Mix Notes** - Volume and pan decisions
6. **Technical Specs** - Export settings
7. **Reflection** - What worked, challenges faced


---

## Sources

Pedagogical wrapper around `acoustic-design` and `audio-post-production`. The craft claims trace to:

- `[Filmmaking:MakingAFilm]` — production sound and post-audio chapters.
- `[DigitalFilmmaking]` — beginner-level treatment.
- `[FilmCheckingContent]` — Sharman's sound chapter (student-facing primary).

**External (un-grounded locally):**

- `[external-source: Sonnenschein, Sound Design]` — canonical reference; not in local corpus.
- `[external-source: Yewdall, Practical Art of Motion Picture Sound]` — canonical reference; not in local corpus.

When this skill teaches a specific principle, defer to the underlying `acoustic-design` or `audio-post-production` skill for finer-grained citations.