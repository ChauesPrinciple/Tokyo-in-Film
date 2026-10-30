# Continuity Audit — LONGSHOT.txt

**Audit scope:** tech, timeline, physical objects, science claims. Tagged for internal consistency.

---

## Timeline

### Pre-launch reference points

- **2019** — Ito dies (L345, L1426).
- **2053** — mission year (L28, title card 1).
- **Six months before launch** — Lagrange-5 telescope array flags sector-nine decay pattern (L32).
- **Three years before current mission time** — Nakamura's archive file is timestamped (L96). Unclear: three years before launch, or before Day Cycle 47?
- **Four weeks before Day Cycle 47** — Costa brought her data to Carter (L296).
- **Week 2** — Costa says she "has been sure since week two" (L305).

**Issue C1 — Nakamura's archive file date ambiguity.** L96 says the file is dated "three years ago." Three years before what frame of reference? Pre-launch? Current day cycle? The audience reads these as current-moment-relative by default, which puts the file at ~3 years before Day Cycle 47. But the mission has only been underway ~47 days. So "three years ago" = pre-launch, ~2050. Needs to be explicit or cut the timestamp ambiguity.

**Issue C2 — "Forty-seven days" used in multiple registers.**
- L86: slugline `DAY CYCLE 47` (explicit).
- L750 (Tanaka dialogue): `"Something has been pulling us for forty-seven days. We are almost there."` — OK, character speech, load-bearing.
- Only one prose usage found in action lines: this is the locked single load-bearing use. CLEAN.

### In-transit timeline (day cycles and 24hr times)

| Line | Slug |
|------|------|
| L40 | DAY CYCLE 01 (0:00) — relay calibration |
| L70 | DAY CYCLE 01 (0:05) — drive ignition |
| L86 | DAY CYCLE 47 (0:15) — bridge, Nakamura awake |
| L145 | CONTINUOUS (1:00) — array room Tanaka |
| L156 | CONTINUOUS (1:30) — common area Costa/Carter |
| L191 | LATER (2:30) — bridge full crew briefing |
| L233 | DAY CYCLE 47 (3:00-5:30) — various montage |
| L250 | EVENING CYCLE (5:30) — dinner |
| L337 | NIGHT CYCLE (6:30) — Costa/Carter Ito exchange |
| L371 | DAY CYCLE 49 (8:00) — array room, seventh page |
| L413 | DAY CYCLE 51 (9:30) — bridge, gradient response |
| L454 | DAY CYCLE 51 (10:30) — corridor, Costa prediction |
| L503 | NIGHT CYCLE 51 (11:00) — first dream |
| L512 | MORNING CYCLE 52 (7:30) — breakfast |
| L527 | DAY CYCLE 52 (12:00) — array room, Marshall confronts |
| L606 | DAY CYCLE 53 (14:00) — data station, feeding reveal |
| L649 | DAY CYCLE 53 (14:45) — corridor, Meridian exchange |
| L700 | DAY CYCLE 54 (13:30) — bridge, Tanaka "archive" reveal |
| L771 | NIGHT CYCLE 55 (15:00) — second dream |
| L799 | NIGHT CYCLE 56 (15:30) — relay room sabotage |
| L893 | DAY CYCLE 57 (16:30) — Costa 23:40 spike |
| L939 | CONTINUOUS (17:00) — bridge, Costa isolated |
| L974 | NIGHT CYCLE 59 (20:00) — Costa's quarters death |
| L1006 | NIGHT CYCLE 59 (20:15) — Carter medbay |
| L1023 | LATER (20:55) — Marshall finds Carter |
| L1092 | CONTINUOUS (20:30) — Marshall finds Costa |
| L1116 | DAY CYCLE 60 (21:30) — bridge, relay dilemma |
| L1228 | DAY CYCLE 61 (22:30) — Nakamura at Tanaka's door |
| L1291 | DAY CYCLE 62 (23:00) — bridge, relay destruction plan |
| L1334 | DAY CYCLE 62 (23:30) — relay destruction |
| L1355 | DAY CYCLE 62 (24:00) — toast |

**Issue C3 — Runtime marker inconsistency.** The parentheticals after sluglines — `(0:00)`, `(0:15)`, `(1:00)` etc. — were specified as screenplay-runtime markers (minutes into the film). They progress from 0:00 at the cold open to 24:00 at the toast. 24 minutes of runtime. Consistent with the 26 MIN header on the title page. CLEAN.

**Issue C4 — Cycle 52 has two times.** `MORNING CYCLE 52 (7:30)` at L512 and `DAY CYCLE 52 (12:00)` at L527. Distinct scenes, distinct times, OK.

**Issue C5 — NIGHT CYCLE 59 appears in TWO scenes running nearly in parallel but labeled different times:** Costa dies at 20:00 (L974); Carter self-enucleation at 20:15 (L1006); Marshall finds Carter at 20:55 (L1023); Marshall finds Costa at 20:30 (L1092). **The sequence in the script is: Costa dies (20:00), Carter mutilates (20:15), Marshall finds Carter (20:55), Marshall finds Costa (20:30).** Marshall finding Costa at 20:30 happens BEFORE he finds Carter at 20:55 — but in the script, Carter's scene comes first and the scene-order reads chronologically. **This is a continuity bug.** The 20:30 Costa-discovery should be placed between Carter's self-mutilation (20:15) and Marshall-finds-Carter (20:55), OR the times need to be reordered.

- **Actually re-reading:** Marshall "opens the door on his standard circuit" at L1025 (20:55 Carter discovery), then "I'm going to move you to a bed. Then I need to check on Costa" (L1075). Then at L1092, `CONTINUOUS (20:30)` — Marshall goes to Costa's quarters, finds her dead. **20:30 is earlier than 20:55, so this is backwards.** Either the Costa-discovery time needs to be 21:XX, or the scene needs to be relocated.

**Fix C5:** Change `CONTINUOUS (20:30)` at L1092 to `CONTINUOUS (21:20)` or similar — Marshall goes from medbay (20:55, stabilizing Carter) to Costa's quarters (later). **This is a real continuity bug to fix.**

---

## Tech and physical objects

### The cognitive relay

- **L30 (title card 2):** 412-electrode interface, reads cortical signals from calibrated pilots, translates to course corrections. Requires 3 calibrated pilots minimum for safe return.
- **L42:** two meters tall, matte-black cylinder, 60 Hz hum, 412 gold contact points on headrest.
- **L44–58:** calibration sequence — Nakamura, Tanaka, Marshall all green.
- **L61:** "Three pilots calibrated."
- **L803:** calibration monitor runs green every day of mission — amber when tampered. 412-contact headrest. Input/output indicator (outbound since launch, inverted to inbound by Tanaka).
- **L805:** relay takes cortex patterns and produces navigation.
- **L1149:** two calibrated pilots remaining (Marshall, Nakamura) + Tanaka = three.
- **L1154–1159:** architecture diagram; signal-coupling threads through every layer; channel closed but hardware rooted.
- **L1179:** without relay, fusion drive = torch with no aim; inertial navigation insufficient for return.
- **L1185:** 40-hour drift window before unrecoverable.
- **L1293:** crystal lattice; housing; physical destruction.
- **L1302:** 22 minutes total for destruction (12 inside housing + 10 housing).
- **L1342:** quantum-entangled crystal lattice, fist-sized, internally illuminated.
- **L1346:** 60 Hz drops to 0, passing through 20 Hz subsonic.

**Issue C6 — Title card 2 contradiction.** Says "three calibrated pilots minimum for safe return." Nakamura later says "two calibrated pilots" is the return requirement (L1149 reference). Which is it?
- **Title card:** 3 minimum.
- **Nakamura:** "We have two calibrated pilots. You and me. Tanaka is the third." Implying 3 is the set (Marshall, Nakamura, Tanaka) and 2 are available (Marshall, Nakamura).

- **Actually re-reading L1149 in context** — she is saying they HAVE 2 operational + 1 compromised. So the minimum is 2 for return? Or 3? **The title card says 3 minimum, but Nakamura's logic in Act 3 reads as if 2 would be enough if the relay were usable.** The relay-contamination is the dealbreaker, not the pilot count.

- **Resolution:** the relay-contamination makes the pilot count irrelevant. But the title card promises 3-pilot minimum; if 2 would actually work, then the claim is wrong. **Need to either:** (a) change title card to "two pilots minimum" — simpler; (b) have Nakamura say "we had three. We have two. Even if the relay were clean, we couldn't return."

### The receiver array (distinct from the relay)

- **L81:** "Receiver online" (Tanaka during launch).
- **L145:** Secondary array room — one chair, equipment on four walls.
- **L149:** Array receiver outputs analog tone (converted electromagnetic signature).
- **L377:** "Sound from the array has changed... structured like a sentence."
- **L532:** "What have you done to the receiver settings."
- **L535:** "Narrowed the filter."
- **L805:** Tanaka "routing the receiver-array feed into the relay's signal input" — connects the two systems.

**Issue C7 — Array vs. relay distinction.** The script uses both terms. Array = receiver listening to sector-nine signal. Relay = navigation interface using cortex patterns. Tanaka's sabotage connects the array feed into the relay input. **This distinction holds throughout. CLEAN.**

### The drive

- **L30:** fusion torch without aim (title card 2).
- **L70:** drive ignites Day Cycle 01.
- **L90:** deuterium-cycle fusion drive.
- **L1179:** fusion drive without aim after relay destruction.
- **L1363:** "dying fusion drive" at toast — drive is shutting down. Earlier (L1346): "The drive has shut down" per L1408.

**Issue C8 — Drive state at toast.** L1363 "dying fusion drive" vs. L1408 "The drive has shut down." Read together: drive is cold by the exterior shot. At the toast it's in shutdown phase. OK as sequence. CLEAN.

### Physical objects (planted + recurring)

| Object | First appearance | Later appearances | Status |
|--------|-----------------|-------------------|--------|
| Ito pin (Osaka U. crest) on Tanaka's lapel | L51 | L153 (unconscious touch), L397 (after seventh page), L807 (at relay sabotage) | SETUP + 3 payoffs. CLEAN. |
| Kanzashi pin in Nakamura's hair | L94 | Never again | DEAD THREAD (see threads.md) |
| Photograph of boy in Nakamura's console | L94 | Never again | DEAD THREAD |
| Marshall's analog watch | L46 | L1088 (ticking in Costa's quarters), L1104 (ticking while sitting) | SETUP + 2 payoffs. CLEAN. |
| Marshall's photograph of seven people | L245 | L792 (dream: six faces gone, only him) | SETUP + 1 payoff. CLEAN. |
| Costa's red pen in forearm pocket | L63 | L188 (shaking hand), L241 (pick up), L524 (writes on forearm), L925 (caps), L978 (atop the ashes), L991 (parallel to notebook) | SETUP + 5 payoffs. CLEAN. |
| Costa's wall timeline | L158 | L241 (extended), L415 (extended to second wall), L895 (23:40 spike drawn), L962 (taken down) | SETUP + 4 payoffs, closed out. CLEAN. |
| Costa's 43 printouts | L158 (count planted) | L978 (all burned) | SETUP + 1 payoff. CLEAN. |
| Carter's notebook (black cloth bound) | L65 | L162 (two-column log), L243 (tearing pages), L281 (turning it around), L1010 (six numbered items with different handwriting on item 6), L1020, L1035, L1043 | SETUP + 6 payoffs. CLEAN. |
| Ito's photocopied papers | L151 | L193, L215, L375, L381 (finds last paper), L397 | SETUP + 5 payoffs. CLEAN. |
| Sixth empty sealed pod | L339 | Never mentioned again | DEAD THREAD |
| Brass commissioning plate | L90 | Never again | DEAD THREAD (possibly OK as single atmospheric detail) |
| Nakamura's archive file (three years ago, 03:47) | L96 | L237 (still unopened), L703 (Tanaka asks about it) | SETUP + 2 payoffs. PARTIAL — never actually opened on screen. See threads.md. |
| Sixty-hertz tone | L42 (launch) | L88 (bridge, still there), L1346 (descending to silence at relay destruction) | SETUP + 2 payoffs. CLEAN. |
| Cortisol draws (72-hour) | L162 | L284 (named in reveal) | SETUP + 1 payoff. CLEAN. |
| Biometric bands | L284 | Implicit in L418 (Nakamura's spike) | CLEAN. |
| Personal trauma kit | L993 | First mention. Costa uses for suicide. | NO SETUP — appears once. Title card/launch sequence doesn't mention it. See threads.md for evaluation. |

### Science claims

**L28 (title card 1):** "fifteen hundred astronomical units from Earth" — 1500 AU.
- 1500 AU is past the heliopause (~120 AU) but inside the inner Oort cloud (~2000-5000 AU). Internally consistent with "outer Oort cloud" reference in L32. CLEAN.

**L28:** "further than anything living had ever been."
- Voyager 1 is ~165 AU. 1500 AU is ~9x further. Defensible. CLEAN.

**L30:** "a four-hundred-and-twelve-electrode interface" — fictional tech. Internally consistent with L42 ("412 gold contact points") and L803 ("412-contact headrest"). CLEAN.

**L90:** "Fifteen hundred astronomical units from Earth. Three light-days out."
- 1500 AU = 1500 × 8.3 light-minutes ≈ 12,450 light-minutes ≈ 208 light-hours ≈ 8.6 light-days.
- Script says "three light-days." **SCIENCE ERROR.** 1500 AU is ~8.6 light-days, not 3.
- **Fix C9:** either change "fifteen hundred AU" to ~520 AU (which is 3 light-days), or change "three light-days" to ~8-9 light-days. Recommendation: keep 1500 AU (sounds more like a mission-achievement) and change to "eight light-days out" or similar.

**L171 (Costa):** "Two-point-three sigma from predicted."
- Standard statistical reporting. CLEAN.

**L431 (Costa):** "Two orders of magnitude over the previous largest."
- Plausible signal quantification. CLEAN.

**L909 (Costa):** "Three orders of magnitude above anything prior. Integrated signal energy in those ninety minutes exceeds everything before last night, combined."
- Consistent with dose-response escalation. CLEAN.

**L1185 (Nakamura):** "Forty hours until we're outside any corrective approach."
- Specific, quantified. CLEAN.

**L1302 (Nakamura):** "Twelve minutes inside the relay housing once I open it. The housing takes another ten."
- Specific, quantified. CLEAN.

**L1342:** "quantum-entangled crystal lattice, fist-sized, internally illuminated."
- Fictional tech. Internally consistent. CLEAN.

---

## Summary of continuity issues requiring Pass 3 fixes

- **C1** — Clarify Nakamura's archive file date (pre-launch).
- **C5** — Fix Costa-discovery time or scene order (20:30 bug).
- **C6** — Reconcile "3 pilots minimum for safe return" with the actual Act 3 math.
- **C9** — Fix 1500 AU ≠ 3 light-days (should be ~8 light-days).

No other continuity bugs found.
