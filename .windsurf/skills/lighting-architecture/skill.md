---
description: Lighting architecture — three-point system, key-to-fill ratios, color temperature, motivated sources, horror lighting strategy
tags: [filmmaking, lighting, cinematography, DOP]
---

# LIGHTING ARCHITECTURE

## The Three-Point System

Every lighting setup derives from three-point lighting. These are not three specific lights — they are three functions that may be served by any number of sources.

### Key Light
The primary light source. Defines the subject. Casts the main shadow.
- **Position**: Off-camera axis, approximately 45° to one side and 45° above eye level
- **Quality**: Harsh (hard-edged shadows) for drama; softened (diffused) for naturalism
- **Intensity**: 300 foot-candles is the standard reference
- **In practice**: Motivated by the strongest light source visible or implied in the scene (sun through porthole, console glow, overhead fluorescent)

### Fill Light
The shadow management light. Fills in what the key creates.
- **Position**: Opposite side from key, at or near camera axis
- **Quality**: Always soft/diffused — diffusion material, bounce card, or soft box
- **Intensity**: Half of key = 150 foot-candles at 2:1 ratio
- **In practice**: Motivated by ambient light, reflected surfaces, secondary practicals

### Back Light (Rim Light)
Separates subject from background. Creates the edge that defines the human form against a dark set.
- **Position**: Behind and above the subject, pointed toward camera
- **Quality**: Hard — creates a clean edge line
- **Intensity**: Approximately equal to key (300 foot-candles)
- **In practice**: In space: starlight, emergency lighting strips, viewport glow

## Key-to-Fill Ratio: The Emotional Dial

The ratio between key and fill intensity is the primary control of dramatic atmosphere.

| Ratio | Key FC | Fill FC | Result | Narrative Register |
|-------|--------|---------|--------|--------------------|
| 1:1 | 300 | 300 | Broadcast flat | Training video, news, no drama |
| 2:1 | 300 | 150 | Natural | Stage One, professional work, daytime |
| 3:1 | 300 | 100 | Slightly dramatic | Stage One transitions, tension building |
| 4:1 | 300 | 75 | Dramatic | Stage Two, half-shadow, pressure |
| 8:1 | 300 | 37 | High contrast | Stage Three, horror, psychological break |
| 16:1+ | 300 | <20 | Noir/extreme | Climax moments, near-silhouette |

**The rule**: As the Entity approaches, the key-to-fill ratio increases. The crew is being un-lit. Light is being unmade.

## Triangle Lighting Formula (No Light Meter)
When a light meter is unavailable, estimate by eyeballing:
1. Set key light — the visible shadow should be distinct but not impenetrable
2. Bring fill from opposite side until shadows open to desired depth
3. Add back light — if the subject's shoulder disappears into the background, the back light is needed
4. Judge by the shadow on the nose: a distinct, defined shadow = good dramatic ratio

## Color Temperature

White light contains all colors. Color temperature (measured in Kelvin) describes the color bias of a light source.

| Source | Color Temperature | Visual Quality |
|--------|------------------|----------------|
| Candlelight | 1800-2000K | Deep amber/orange |
| Tungsten/Incandescent | 2800-3200K | Warm yellow-orange |
| Halogen | 3000K | Warm white |
| Standard fluorescent | 4000-4500K | Cool white, slight green |
| Daylight/sunlight | 5600K | Neutral white |
| Overcast sky | 6500K | Cool, slight blue |
| Blue sky (shade) | 7000-10000K | Cold blue |

**Mixing color temperatures** tells emotional stories:
- Warm key (tungsten) + cool fill (daylight) = unease, alien quality
- Cool key + warm fill = clinical coldness with underlying human warmth trying to survive
- All one temperature = unified world (Stage One)
- Mixed temperatures, unmotivated = Stage Three (the world is no longer coherent)

## Motivated vs. Unmotivated Sources

**Motivated**: The audience can see or infer the source of light — a porthole, a screen, a ceiling panel, an instrument cluster. Motivated light feels real. The source is a prop.

**Unmotivated**: Light from nowhere. The audience accepts it as cinematic convention, but it breaks naturalism. In horror, unmotivated light can signal supernatural presence: light that has no source is light that should not exist.

**ON THE EDGE principle**: In Stage One, all lighting is motivated. Every source is identifiable — ship lighting systems, instrument panels, viewports. In Stage Three, sources become unmotivated or contradictory. Shadows fall the wrong way. A character is lit from below when the only light is above. The lighting itself breaks down.

## Lighting Accessories

- **Gel frame**: Metal holder that accepts colored acetate sheets (gels). Placed in front of the light fixture
- **Barn doors**: Metal flaps on the fixture that shape and cut the beam
- **French flag / gobo**: Flag mounted on a grip stand to cut light from a specific area or the lens
- **Diffusion material**: Frosted acetate or cloth placed in front of light to soften it; converts hard source to soft
- **C-stand (Century stand)**: Standard grip stand for mounting flags, cutters, diffusion

## Practical Lights in Frame

Practicals = light sources visible within the frame (lamps, screens, indicators). They serve two functions:
1. **Motivated justification** for off-camera lighting setup
2. **Direct narrative information** — a screen going dark, an indicator turning red, a light that flickers

In ON THE EDGE, practical lights are the lighting continuity of the ship. When they change — when the cool white ship lights shift to emergency amber, when consoles go dark — the audience reads it as environmental story information even before a character comments on it.

## Horror Lighting Strategy: ON THE EDGE Stage Map

| Stage | Ratio | Key Source | Back Light | Color Temp | Shadows |
|-------|-------|-----------|-----------|-----------|---------|
| Stage One | 2:1 | Ship overhead panels (cool white) | Emergency strip lighting (neutral) | 5600K unified | Clean, predictable |
| Stage Two | 4:1 | Console screens (shifted, uneven) | Viewport starlight (cold blue) | Mixed 3200K + 5600K | Inconsistent, deepening |
| Stage Three | 8:1-16:1 | Single practical or none | Backlight only (rim from viewport) | Cold blue or absent | Near-silhouette, inverted |

**Entity light rule**: The Entity receives no lighting plot. It exists only where light fails to reach. Its presence is defined by the absence of fill on nearby subjects and by unmotivated shadows that the light sources present should not cast.

## DECISION PROTOCOL

### When to Invoke This Skill

After `@visual-grammar` (shot size/composition) and `@optics-psychology` (focal length/DOF) are determined. Lighting follows the camera — you cannot design a lighting plan until you know what the lens sees and from where.

### How to Set the Key-to-Fill Ratio

Source: Herbert Zettl, *Sight, Sound, Motion* (5th ed.) — lighting as aesthetic field; `@direct-digital-film`

```
ASK: What is the emotional register of this scene?

→ Stable, professional, safe, functional
     → 2:1 ratio (Stage One default)
     → Natural: shadows present but open; subject clearly readable

→ Tension, conflict, a decision that carries weight
     → 4:1 ratio (Stage Two default)
     → Dramatic: half the face in shadow; the scene is no longer safe

→ Horror, psychological disintegration, the unknowable
     → 8:1 or higher (Stage Three default)
     → High contrast: subject near-silhouette; fill barely present

→ The Entity, or any figure that must remain opaque to the audience
     → NO FILL: Silhouette or rim only. The audience must not be able to read this presence.
     → Rule: What cannot be seen cannot be understood. The Entity must never be understood.
```

### How to Choose Color Temperature

Source: Zettl, *Sight, Sound, Motion* — color temperature as expressive tool

```
ASK: Is the world in this scene coherent?

→ YES — unified, safe, rational world
     → Single consistent color temperature throughout the scene
     → Stage One: 5600K cool white (ship overhead panels, daylight equivalent)

→ PARTIALLY — tension building, world under stress
     → Mixed temperatures, but motivated by visible sources
     → Stage Two: Mixed 3200K console warmth + 5600K viewport cold

→ NO — reality is breaking down
     → Mixed temperatures with no motivating source
     → Stage Three: Color temperature contradicts its sources; wrong light from the wrong direction

→ ENTITY ADJACENT
     → Cold blue (7000K+) or complete absence of warm spectrum
     → The Entity is always cold. Any space it occupies loses warmth.
```

### Motivated vs. Unmotivated Decision

```
ASK: Can the audience see or infer the source of this light?

→ YES (porthole, screen, panel, practical lamp visible in frame)
     → MOTIVATED: Design toward the visible source. The source is a prop with narrative information.

→ NO
     → UNMOTIVATED: Acceptable as cinematic convention in non-horror work.
     → In horror: unmotivated light IS a horror element. Light from nowhere = wrong.
     → Stage Three: Unmotivated shadows (falling the wrong direction) signal that physics has failed.
```

### Source Index

- **Key-to-fill ratio as emotional dial**: Herbert Zettl, *Sight, Sound, Motion* (5th ed., 2010); `@direct-digital-film`
- **Three-point lighting system**: Kris Malkiewicz, *Cinematography* (1989); standard cinematography theory
- **Color temperature and expressive use**: Zettl, *Sight, Sound, Motion* — color as aesthetic field
- **Motivated/unmotivated sources**: Standard cinematography theory; Malkiewicz, *Cinematography*
- **ON THE EDGE stage lighting map**: ON THE EDGE Production Design; `@direct-digital-film`
- **Entity light rule**: ON THE EDGE production design document
