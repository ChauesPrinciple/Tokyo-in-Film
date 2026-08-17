# PLAN - Insert "Shutter Speed and Motion Blur" into Cinematography (On Set)

**Status:** IMPLEMENTED Aug 17, 2026. NOT YET PUSHED.
**Scope:** `production/cinematography.html`, plus the one approved sentence in `pre-production/cinematography.html` per section 7A.

**What shipped:**
- New `<h2>Shutter Speed and Motion Blur</h2>` at `production/cinematography.html:660`, running to line 807.
- "Two Different 180-Degree Rules" callout at `:742-758`.
- "Going Deeper: The Full Exposure Relationship" callout with the exposure formula video at `:783-807`.
- DPReview video at `:691-702`.
- New opening paragraph for Speed of Motion at `:810-815` carrying the 24 fps origin.
- Section 7A repair applied at `pre-production/cinematography.html:885`.

**Note:** `VOICE.md` lives at the repo root, not in `.devin/`. Earlier drafts of this plan cited the wrong path. Section references (2, 3, 4, 5) were correct.

## Exposure triangle diagram: RESOLVED

`assets/images/cinematography/exposure-triangle-diagram.jpg` is in place and referenced at `production/cinematography.html:792-794`.

The owner saved it to the repo root as `5206568418_579a90cbf5_w.jpg` (its original Flickr filename). Moved and renamed to match the folder's convention (`focal-length-diagram.png`, `overcranking-diagram.png`). Extension in the `<img>` corrected from `.png` to `.jpg`. Repo root is now clean of it.

**Lesson for next time:** when an owner says a supplied file is "in the folder", search the repo by extension and modification rather than by the filename Cascade invented. It will be sitting there under whatever name it arrived with.

**Why the triangle earned its place.** The callout previously said nothing: it gestured at "an actual equation" and handed off to a video. The triangle gives it a real lesson, and one that reinforces the section instead of decorating it. Each of the three controls does two jobs, one technical and one creative (aperture and depth of field, shutter and motion, ISO and grain), so no exposure correction is ever free. That is what makes the ND filter argument in the body land: ND is the only adjustment that buys exposure without spending any of the three. Two of the three corners are already taught in this course, which is why the callout can lean on them. ISO is named as the acknowledged gap, per section 7 item 7.

---

## 1. Why this section exists

The course currently uses shutter-related vocabulary it never defines. Three concrete symptoms:

| Location | What it says | Problem |
|---|---|---|
| `pre-production/cinematography.html:886` | "especially if you want to maintain a cinematic shutter speed" | Dangling term. "Cinematic shutter speed" is never defined anywhere on the site. |
| `pre-production/cinematography.html:873` | ND filters "control exposure in bright conditions without changing the aperture or shutter speed" | Assumes the reader knows why you would refuse to change shutter speed. Never explained. |
| `production/camera_manual.md:58` | "**Shutter:** 180-degree rule (1/48 or 1/60)" | Crew-facing shorthand for a rule no student-facing page teaches. |

Additionally, `production/cinematography.html` already has a **Speed of Motion** section (line 660) covering overcranking, undercranking, the rasterized look, and bullet time. That section is entirely about frame rate and never once connects frame rate to shutter. It is the missing other half of a pair.

**The gap in one line:** the course teaches frame rate manipulation for effect, and separately tells students to protect their shutter speed, without ever teaching what shutter speed does.

---

## 2. LOCKED CONSTRAINTS

- **ON SET page owns the shutter concept.** Do NOT edit `post-production/*`. Do NOT edit the camera manual.
- **ONE exception, needs owner sign-off:** a single-sentence repair at `pre-production/cinematography.html:886`. See section 7A. This is a deletion of a forward dependency, not new teaching content. If the owner refuses the exception, the term stays dangling and the progression stays broken.
- **Headings on this page are UNNUMBERED.** Every `<h2>` on `production/cinematography.html` is plain prose ("Camera Angles and Their Meanings", "Lenses and Perspective", "Depth of Field and Focus", "Speed of Motion"). This contradicts `VOICE.md` section 4, which specifies numbered `<h2>` like `2.3.1`. **Match the existing page, use an unnumbered `<h2>`.** Do not renumber the page as part of this task. Logged as a separate issue in section 7.
- **No em dashes** in new prose (`VOICE.md` section 2).
- **Sharman voice.** Second person, parenthetical asides, short sentences mixed with long. No "it is important to note that."
- **Teaching page, so any film may be cited** (`VOICE.md` section 3). Canon restrictions do not apply here.
- **No new CSS.** Reuse the existing inline-styled callout pattern. CSS stays at `v=21`.
- **INTRODUCTORY DEPTH, HARD CEILING.** This is a first-year survey textbook, not a camera manual. The test for every sentence: does a student who has never touched a cinema camera need this to make a better shot next week? If no, it does not go in. See section 4A for the explicit include/exclude lists.
- **INTEGRATE, DO NOT BOLT ON.** The section must read as though it was always part of this chapter. It sits between existing material on both sides and must hand off cleanly to Speed of Motion. No self-contained blog-post structure. No FAQ block. No listicles.
- **NO PLAGIARISM, NO PARAPHRASE-BY-SYNONYM.** Reference material was consulted. Nothing is lifted. See section 4A.

---

## 3. Insertion point

**Immediately BEFORE `<h2>Speed of Motion</h2>` at line 660.**

Rationale: shutter must be understood before over/undercranking makes sense. Reader gets shutter and motion blur, then walks straight into deliberate frame rate manipulation. The two sections become a matched pair.

Rejected alternatives:
- After "Depth of Field and Focus" (line 417): would group the exposure concepts, but strands it far from Speed of Motion and interrupts the lens/focus run.
- After Speed of Motion (line 726): puts the explanation after the application. Backwards.
- Anywhere in the acting/production-challenges half of the page (lines 728+): wrong subject area entirely.

**Bridge into Speed of Motion.** Originally scoped as one optional sentence. It is now structural, because content beat 3 (why angle beats speed) exists precisely to make frame rate changes survivable. Speed of Motion opens on hand-cranked cameras deliberately varying frame rate and later covers cameras that shift frame rate mid-shot. A student who has just learned the ratio idea can now read that section and understand what happens to their motion blur when they overcrank. One or two sentences at the opening of line 661. Existing prose otherwise untouched.

---

## 4. Content outline

New `<h2>Shutter Speed and Motion Blur</h2>`. Nine beats, one callout, two videos. See the target length note at the end of this section.

1. **What the shutter does.** Each frame is an exposure with a duration. The shutter decides how long light hits the sensor for that single frame. Establish that this is a per-frame decision, not a per-shot one.

2. **Shutter angle vs shutter speed: same thing, two units.** Film cameras used a rotating disc with a wedge cut out of it, and the size of that opening is measured in degrees. Shutter speed measures the same fact in fractions of a second. Speed is the vocabulary photography brought with it. Angle is what film and video actually use. Establish that these are not two settings, they are two ways of naming one setting.

3. **Why angle is the more useful unit on set.** This is the practical payoff and it is the single most useful thing in this section for a student who is about to shoot. A shutter speed is an absolute duration, so the moment you change frame rate it is wrong and you have to recalculate. An angle is a ratio, so it stays correct across every frame rate by definition.

   Worked example, one only: at 24 fps a 180 degree shutter is 1/48 of a second. Change to 48 fps for slow motion and holding that same look now requires 1/96. Think in angle instead and you leave it at 180, and the camera does the arithmetic.

   **This is the load-bearing connection to the next section.** Speed of Motion is entirely about deliberately changing frame rate. That is precisely the situation where this distinction stops being pedantic and starts saving your footage. Write it so the handoff is obvious.

   **Precision requirement:** cameras that offer an angle setting are mostly cinema cameras. Many phones and hybrid cameras expose only shutter speed. Say so plainly and give the student the doubling rule as their fallback, because that is the camera most of them have.

4. **The 180-degree shutter rule.** Shutter open for half of each frame's duration. At 24 fps that is 1/48, and since most cameras do not offer 1/48, you use 1/50 and nobody alive can tell the difference. This is the "cinematic shutter speed" that `pre-production/cinematography.html:886` currently refers to without defining. State the rule plainly: double your frame rate and that is your shutter.

5. **Two different artifacts, not one.** Most introductory explanations collapse these and it costs the student the ability to reason. **Motion blur** comes from a long exposure: the subject keeps moving while the frame is still being exposed, so it smears. **Strobing** comes from the gaps between exposures: the camera is not looking at all for part of every frame, so fast movement stutters and skips. Different causes, opposite cures. A wider shutter adds blur and smooths strobing. A narrower shutter cuts blur and worsens strobing. 180 degrees is the compromise the industry settled on.

   One paragraph, plain language. Do not introduce sensor readout, rolling shutter, or the jello effect.

   **PRECISION REQUIREMENT, see section 4A.** Blur tracks the actual exposure time, not the angle in isolation. Phrase every blur claim as holding at a given frame rate. Do not write "a wider angle means more blur" as an unconditional law.

6. **What breaking it looks like, in both directions.** Narrower shutter gives crisp, hard, aggressive motion. Wider shutter gives smeared, fluid, dreamlike motion. Neither is wrong. A dial with a default, not a rule with one correct answer. (Originally scoped to hold the second video. That video moved to the beat 10 callout once its actual subject was known, so this beat is prose only.)

7. **NAME COLLISION CALLOUT.** See section 5 below. Highest-value pedagogical item in the section.

8. **The exposure trap, and the ND payoff.** Shutter is one of the controls for exposure, but on a motion picture camera it is the one you should not reach for, because changing it changes how motion renders. Too bright, and the honest fix is ND, not a faster shutter.

   **This paragraph must explicitly complete the ND thread the prep chapter opened.** The student already chose ND filters in pre-production for one stated reason (keeping a wide aperture in bright light). Here they learn the second reason, which they could not have understood earlier. Phrase it as a payoff arriving on schedule, not as a correction of the earlier chapter. Something in the shape of: you already packed the ND filter to protect your aperture, and now you know the other half of what it protects.

   This is what makes the progression work. The prep chapter never has to define shutter, and the set chapter never has to re-teach filters.

9. **On-set practical close.** What to actually lock before rolling, including on a phone. Ends on a Sharman beat, per `VOICE.md` section 5 (chapter closers wrap in voice).

10. **"Going Deeper" callout, optional, closes the section.** Holds the exposure formula video. Spec in section 4B. Must come after the practical close so the section still ends on its own terms for the student who stops reading at beat 9.

**Bridge into Speed of Motion** per section 3.

**Target length:** 8 to 10 paragraphs, two callouts, two videos. If it runs longer, cut. Do not add subsections.

---

## 4A. Sources consulted, and how they must NOT be used

Reference material was supplied across two rounds. All of it is **background reading only.** Every sentence in our section gets written from scratch, in Sharman voice, second person. If a sentence could be dropped into the source article without anyone noticing, rewrite it.

### The sources and their specific hazards

| Source | What it is | Hazard |
|---|---|---|
| Insta360 blog, "Shutter Angle Explained" | Commercial content marketing | Product placement, listicles of use cases, an FAQ block, a frame-rate conversion table. All structurally wrong for a textbook chapter. |
| shutterangle.com, "Cinematic Look Part 2" | Serious technical writing for working shooters | Correct but far above our level. Most of it must be discarded, not simplified. |
| No Film School / Cinematography Database, exposure formula | Math-heavy production tool piece | Entirely out of scope. |
| StudioBinder, "What is Shutter Speed" (owner-supplied excerpt) | Blog explainer | Source of the angle-vs-speed framing in beat 2 and 3. Contains a unit slip, see below. Its phrasing is clean and therefore tempting. Rewrite completely. |
| StudioBinder, "What Is the 180-Degree Shutter Rule" | Blog explainer | Contains the useful blur-vs-angle correction AND a hard factual error. See below. |
| Fstoppers / DPReview TV, DigitalCameraWorld cheat sheet | Gear press | Useful for confirming which cameras expose angle vs speed. Sources conflict on specifics. Do not assert camera capabilities. |

### Hard exclusions, non-negotiable

These are either too advanced, or belong to a different chapter, or are the sources' own material:

- **The exposure formula.** `f-stop squared / shutter = lux * ISO / C`, light meter calibration constants, spreadsheet math. Absolutely not. Our students are not metering.
- **Conversion tables.** Several sources ship one. We do not. The doubling relationship goes in prose. Exactly two worked numbers are permitted: the 24 fps case (180 degrees, 1/48, dialed as 1/50) and the 48 fps case in beat 3 that demonstrates why the ratio matters. No third.
- **Shutter mechanism taxonomy.** Half-moon versus butterfly shutters, pivot placement, mirror-to-viewfinder reflection. Interesting, irrelevant here.
- **Per-camera historical angles.** Bell and Howell Eyemo at 160 degrees, Filmo 70 DR at 204 degrees. Trivia.
- **Flicker and mains frequency.** 50 Hz versus 60 Hz, 172.8 and 144 degree shutters to avoid banding. Real problem, wrong course.
- **Rolling shutter and the jello effect.** Sensor readout behavior. Different topic.
- **The high frame rate debate.** Hobbit at 48 fps, Avatar sequels at 60 fps. Adjacent to our existing Speed of Motion section, but adding it here widens scope. Logged in section 7 as a possible future addition to Speed of Motion, not to this section.
- **ISO.** Naming it as the third exposure control is acceptable in passing. Teaching it is a separate section the chapter does not currently have.

### Film examples

Naming a film that a source also named is not plagiarism. Films are public. The only real constraints are accuracy and course fit.

- **Accuracy.** Any specific claim gets verified before it is asserted. *Saving Private Ryan* is the standard narrow-shutter example and the attribution is widely published, but confirm the 45 and 90 degree figures before printing them. If they cannot be confirmed, name the film and describe the look without numbers. Per `VOICE.md` section 3, no lazy pairings.
- **Reject *Inception* for this purpose.** Not because a source used it, but because the claim is not established. Insta360's own article hedges it ("while cinematographers use multiple techniques to achieve this look"). We already cite *Inception* soundly on `post-production/animated-films.html` for practical effects. Do not stack an unverified shutter claim on top of that.
- **Prefer films already taught in this course**, so the section reinforces the syllabus instead of expanding the reference set. Check the existing page first. This is a pedagogical preference, not a contamination rule.
- **What actually would be plagiarism:** reusing a source's sentences, or walking through their examples in their order as a substitute for our own structure. That is the thing to guard against, not the existence of overlapping film titles.

### Source errors we must NOT inherit

The supplied material contains real mistakes. Catching them is part of the job.

1. **Unit slip: "double our shutter speed from 1/48th to 1/96th."** Going from 1/48 to 1/96 makes the exposure *shorter*, not longer. The denominator doubles; the duration halves. The sentence is intelligible but backwards as written. **Our text says the exposure time is cut in half, or simply gives the new value without claiming anything "doubled."**

2. **Hard error in the second StudioBinder article: "adjust your shutter speed to 96 frames per second."** Shutter speed is not measured in frames per second. It should read 1/96 of a second. **Do not reproduce. Watch for this class of unit confusion anywhere in our own draft, since it is exactly the mistake a student will make.**

3. ~~Conflicting claims about camera limits.~~ **RESOLVED, and the real answer is better than either source's version.** The apparent contradiction dissolves once you separate film from digital.

   On a **film** camera, 180 degrees is the practical ceiling, because the mechanism needs the other half of every rotation to pull the next frame of film into position. The limit is physical, not stylistic. On a **digital** camera there is no film to advance, so the exposure can run right up to the full frame duration, which is the 360 degree equivalent.

   Confirmed by two independent sources: shutterangle.com ("large angles are harder because of the need for next frame advancement", and electronic shutters permit "full time exposure") and cinemashock.org ("film cameras can't have the shutter bigger than 180 degree, because that's the time needed to move the film").

   **This is worth one clause in the text**, because it explains why 180 became "normal" in the first place. It was the practical maximum of the machine, not a taste decision. That is a genuinely satisfying thing for a student to learn and it costs one sentence. DigitalCameraWorld's blanket claim is simply wrong for digital cameras.

4. **Blur versus angle, the useful correction.** The second StudioBinder article makes a point worth keeping: motion blur is a function of the actual exposure duration, not of the angle considered alone. The same angle at two different frame rates produces different amounts of blur, because the underlying exposure times differ. The angle holds the *ratio* constant, which is why the look stays consistent, but the blur itself comes from time. **At our level this resolves to one discipline: state blur comparisons at a fixed frame rate.** Do not teach the misconception, and do not belabor the correction either.

### Citation convention

If a specific sourced claim survives verification, cite it inline in parentheses, matching the existing house pattern (see `post-production/animated-films.html:674`, which closes a quoted statistic with `(parade.com)`). Do not add a footnote system.

---

## 4B. Video embeds (two, both owner-supplied)

**Markup pattern for both:** copy the canonical captioned widget already on this page at lines 678-689. Do not invent a variant.

### Video 1: `X4vg1Qmb0Eg` - CONFIRMED, no issues

**Actual title:** "DPReview TV: Why Shutter Angle Is Better Than Shutter Speed (for video)"

**Placement:** inside content beat 3, immediately after the angle-versus-speed payoff and its worked example.

**Fit:** excellent. This is exactly the argument beat 3 makes, delivered by the people who made the case publicly. Chris Niccolls presents. Caption can name it directly.

**Proposed caption:** `Why shutter angle beats shutter speed, from DPReview TV`

### Video 2: `up2Y4YYgyfY` - CONFIRMED, and it creates a scope conflict

**Actual title:** "The Exposure Formula Explained"

**Description:** covers how to calculate the light required for a given combination of ISO, shutter, and aperture.

**THE PROBLEM.** This is the video that accompanies the No Film School / Cinematography Database piece, which section 4A already places on the hard exclusion list as "entirely out of scope, our students are not metering." I wrote that exclusion before knowing what the video was. The owner has asked for this video specifically, and its content is the one thing the introductory ceiling rules out. That is a direct conflict between two owner instructions and it is not mine to quietly resolve.

**It also does not fit beat 6.** Beat 6 is about the look of narrow versus wide shutter. This video is exposure math. Placing it there would leave the caption describing something the surrounding prose never discusses.

**OWNER DECISION, LOCKED: "Going Deeper" callout.**

Goes at the END of the section, inside the callout pattern the page already uses at lines 384-415 ("Going Deeper: The Focal Length Is Also An Emotional Choice"). That convention exists to hold material above the baseline without disrupting the baseline, which is exactly this situation.

Rules for the callout:
- **Explicitly optional.** The student must understand they can skip it and lose nothing required.
- **Short.** Two or three sentences of framing, then the video. This is not a licence to teach metering in the callout instead of the body.
- **Framing:** the body of the section tells you to protect your shutter and reach for ND instead. This shows what the full exposure relationship looks like underneath, for anyone who wants to see the machinery. Name ISO and aperture as the other two controls without teaching them.
- **Do NOT reproduce the formula in prose.** The video carries it. Writing `f-stop squared / shutter = lux * ISO / C` into the page would import exactly what section 4A excludes.
- **Caption:** `The Exposure Formula Explained`. Its real title.

**Consequence for the other callout.** The section now carries two. They must not read as the same device. The name-collision callout takes its own heading ("Two Different 180-Degree Rules" or similar) and the "Going Deeper" label is reserved for the optional math. Same inline styling for both, different heading language.

### Markup template

Substitute the ID and the confirmed caption.

```html
<div class="mt-video-widget mt-video-width-55">
    <div style="position: relative; width: 640px; height: 360px; margin: auto;">
        <iframe loading="lazy" src="https://www.youtube.com/embed/VIDEO_ID?wmode=opaque&amp;rel=0"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;"></iframe>
    </div>
    <a href="https://www.youtube.com/watch?v=VIDEO_ID" target="_blank" class="video-fallback-link">Watch
        on YouTube</a>
    <p class="mt-align-center">CONFIRMED CAPTION</p>
</div>
```

### Caption convention (corrected after owner review)

**Captions are short and descriptive. They are NOT video titles and NOT channel credits.**

Verified against every caption on this page: "Steadicam Demo", "Kiesza's 'Hideaway'", "The 'Keystone Kops'", "The Lobby Shootout from *The Matrix*", "Running on the Beach scene". Two to five words naming what the student is about to watch. No sentences, no attribution, no pasted titles.

**Shipped captions:** `Shutter Angle vs Shutter Speed` and `The Exposure Formula`.

**My earlier reasoning was wrong.** I insisted captions could not be written without knowing the exact video title, when the house convention never uses titles in the first place. Knowing the video's *subject* was always sufficient. The titles still needed verifying for accuracy, but that was never what the caption required.

**Spacing note:** two videos inside one section is heavier than anything else on this page except Speed of Motion, which carries three. Acceptable, but they must sit in different beats as specified above, not stacked.

---

## 5. The name collision (mandatory)

The course teaches a **different** 180-degree rule, thoroughly, in post-production:

- `post-production/editing-and-animation.html:467-495` - the continuity rule, axis of action, the diagram, the *Whiplash* walkthrough, "jumping the line"
- `:302` - named in the continuity-editing intro
- `:577-579`, `:585` - returns as Murch's criterion five

A student who meets "180-degree rule" on the On Set page with no warning will reasonably assume it is the rule they already learned. These two things share a number and share nothing else.

**Requirement:** an explicit callout distinguishing them, reusing the inline styling from lines 384-415 (a `<section>` with `background: rgba(255,255,255,0.03)`, `border-left: 3px solid var(--accent-neon-cyan)`, and an uppercase neon-cyan `<h3>`). Copy that styling exactly rather than inventing a variant.

**Heading must NOT say "Going Deeper."** That label is reserved for the optional exposure math callout at beat 10. Use something declarative, for example "Two Different 180-Degree Rules". Same look, different job, different words.

Callout must state: the shutter 180 is about exposure duration per frame and lives in the camera; the continuity 180 is about the axis of action and lives in coverage and the edit. Cross-reference the post-production section by name so the student can go read it.

---

## 6. Verification before writing

Per `CITATION_PROTOCOL.md`, search before citing. Nothing below gets written from memory.

1. **Arithmetic framing. CONFIRMED.** 180 degrees at 24 fps is 1/48. Most cameras do not offer 1/48, so 1/50 is what you dial, and the difference is imperceptible. Consistent across every source checked. State in our own terms.

2. ***Saving Private Ryan*. CONFIRMED at primary-source level. Cleared for use with the specific figures.**
   - **American Cinematographer**, Janusz Kaminski in his own words: "we shot a lot of the film with the camera shutter set at 45 or 90 degrees. The 45-degree shutter was especially effective while filming explosions. When the sand is blasted into the air, you can see every particle, almost every grain, coming down."
   - **DGA Quarterly**, Spielberg: "I used a 45-degree shutter on the explosions, and a 90-degree shutter on most of the running shots."
   - Kaminski elsewhere describes the result as "a certain staccato in actor's movement" and "crispiness of explosions."
   - **This is as well-attested as a technical claim gets.** Attribute to Kaminski, not to the film in the abstract, and cite `(American Cinematographer)` inline per the house pattern. The word "staccato" is Kaminski's own, so it may be quoted but must be marked as his.

3. ~~Confirm both videos' identities.~~ **DONE.** Both titles verified. See section 4B. `up2Y4YYgyfY` is the exposure formula video. Owner has ruled: "Going Deeper" callout.

4. ~~Do not assert camera hardware limits.~~ **RESOLVED.** See section 4A item 3. Film cameras top out near 180 degrees for mechanical reasons; digital cameras do not. Say so.

5. **24 fps origin. CONFIRMED, with one important correction to my own earlier framing.**
   - Attributable to **Stanley Watkins**, chief engineer at Western Electric. They asked Warner Bros. what speed theatres were actually projecting at in 1926. Large houses ran around 80 to 90 feet per minute (roughly 21 to 24 fps), smaller houses 100 feet per minute and up (27 fps and higher). They split the difference at 90 feet per minute, which is 24 fps. Adopted as standard in November 1926.
   - **Correction:** I earlier described this as arbitrary. It was not purely arbitrary. 24 fps was also around the minimum needed for acceptable sound fidelity on an optical track, since a faster-moving track carries more sound information. **Both reasons must be given or neither.** Calling it an accident is inaccurate.
   - **Verdict: permitted, one or two sentences maximum, and it belongs in the bridge into Speed of Motion**, where hand-cranking is already the subject. Do not let it colonise the shutter section.
6. **No diagram asset exists.** `assets/images/cinematography/` has no shutter image (checked: 22 files, closest is `overcranking-diagram.png`, which belongs to Speed of Motion). Either ship the section text-only or source a properly licensed diagram. **Recommendation: text-only for v1.** Do not fabricate an image reference. `VOICE.md` section 5 requires that images named in prose actually exist.
7. **Glossary is empty on this topic.** `js/glossary.js` contains no "shutter" entry (verified). Adding entries is a separate step, see section 7.

---

## 7. Out of scope, logged for later

These are real and should not be silently folded into this task.

1. **Glossary additions.** `shutter speed`, `shutter angle`, `180-degree shutter rule`, `motion blur` are all absent from `js/glossary.js`. Needs owner sign-off on wording, and the glossary tooltip system will surface these across every page, not just this one.
2. **Heading numbering violation.** This entire page uses unnumbered `<h2>`s against `VOICE.md` section 4. Page-wide fix, separate task, do not bundle.
3. **Quiz and MCQ impact.** Quiz 3 covers "Production, Mise-en-Scene and Cinematography On Set." New teaching content means `MCQ_BANK.md` and `QUIZZES.md` are now incomplete relative to the page. **Do NOT auto-generate questions from this section.** Owner reviews quiz content.
4. (Superseded. See section 7A.)
5. **Camera manual alignment.** `production/camera_manual.md:58` and its presets at `:63-64` use the shorthand. Once the textbook defines the term, the manual could reference the chapter instead of restating it.
6. **High frame rate debate.** Would belong in the existing Speed of Motion section, not the new one. Separate task if wanted.
7. **ISO and the exposure triangle.** The chapter teaches aperture (in prep) and will now teach shutter. ISO is the missing third. Real gap, deliberately not filled here.
8. **Possible inaccuracy in the existing Speed of Motion paragraph, found during verification.** Line 661-667 attributes the sped-up look of early comedy to deliberate undercranking, which is true as far as it goes. Research turned up a second and larger cause: silent films were routinely *projected* faster than they were shot, and this was widely known and compensated for by the filmmakers themselves. By the late 1920s theatres commonly ran 27 fps and higher, sometimes faster still on busy days to fit in extra showings. So part of the "Keystone Cops" effect is a projection artefact, not only a shooting choice. **Not touching this now.** It is existing prose, it is not wrong, and it is outside the approved scope. Logged because it is a genuine enrichment opportunity for whoever revisits that paragraph.

---

## 7A. The progression fix at `pre-production/cinematography.html:886`

**A forward link is the wrong solution and is hereby rejected.** "See chapter 2.3" tells the student the book was assembled out of order. The book has a progression. Each chapter should stand on what the reader already knows at that point.

### The actual structural problem

The two chapters have clean, defensible jobs:

| Chapter | Job | Owns |
|---|---|---|
| `pre-production/cinematography.html` | What you choose before you roll | Lenses, focal length, aperture, filters, resolution, aspect ratio, shot vocabulary |
| `production/cinematography.html` (On Set) | How you operate once you are rolling | Angles, depth of field, movement, speed of motion, and now shutter |

Shutter is an operating decision. It belongs On Set. That is correct and should not change.

The defect is that the prep chapter's ND paragraph reaches forward and borrows shutter to justify itself:

> "Even phone shooters can benefit from clip-on ND filters when shooting in harsh sunlight, especially if you want to maintain a cinematic shutter speed." (`:886`)

At that point in the book the reader has been taught aperture (`:556-564`) but not shutter. So the sentence closes on a term that carries no meaning yet. The clause is doing no work.

### The fix, in two halves

**Half one, in prep.** Cut the forward dependency at `:886`. The paragraph already gives a complete and correct reason for ND two sentences earlier: you want a shallow depth of field on a bright day and you need to cut light without closing the iris. That reason stands entirely on aperture, which the reader has. Remove the trailing shutter clause, or end the sentence on the sunlight point. One sentence changes. No new concept enters the prep chapter. Nothing is lost, because the clause was unreadable there anyway.

**Half two, On Set.** The new section pays the thread off, per section 4 item 6. The reader who packed an ND filter in prep now learns the second thing it was protecting. The concept arrives once, in the chapter that owns it, and it retroactively enriches the earlier chapter without the earlier chapter having to gesture at it.

### Why this is better than the alternatives

- **Forward link:** admits the dependency instead of removing it. Rejected.
- **Define shutter in prep:** duplicates the concept across two chapters and puts an operating decision in the planning chapter. Breaks the progression in the other direction.
- **Move ND to On Set:** filters are gear you choose in prep. Wrong home.

### Scope note

This touches `pre-production/cinematography.html`, which the original instruction excluded. It is one sentence, and it is a deletion rather than an addition. Flagging rather than assuming. If the owner wants prep untouched, the On Set section still works, but `:886` keeps referring to something the reader cannot know yet.

---

## 8. Execution order

1. Owner approves outline, placement, the section 7A exception, and the section 4B option for the exposure formula video.
2. Run the section 6 verification searches.
3. Draft the section against `VOICE.md` and the section 4A exclusion lists. Em dash sweep before saving.
4. Insert before line 660. Add both videos per section 4B. Add the bridge into Speed of Motion.
5. Apply the section 7A half-one repair at `pre-production/cinematography.html:886`, if approved.
6. Verify: no em dashes in new prose; callout style matches lines 384-415 exactly; both video markups match lines 678-689 exactly and both captions are real; nothing from the section 4A exclusion list crept in; no borrowed examples; the ND thread reads as a payoff rather than a correction; page renders.
7. **Plagiarism self-check.** Reread the drafted section beside all supplied sources. Any sentence that tracks a source's structure or phrasing gets rewritten. Pay particular attention to the StudioBinder angle-vs-speed passage, whose phrasing is clean and therefore the easiest to absorb accidentally.
8. **Unit-error sweep.** Confirm no sentence confuses shutter duration with frame rate, and no sentence claims a shorter exposure is a "doubled" one. See section 4A.
9. Report to owner. Do not push until told.

**Deploy when approved:** `git push origin main`. CSS version unchanged at `v=21`.
