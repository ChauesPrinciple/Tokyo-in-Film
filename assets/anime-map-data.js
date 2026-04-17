/* Anime map data — Tokyo Ghoul, Chainsaw Man, Jujutsu Kaisen
 * Extracted from anime-map.html for maintainability.
 * Loaded as window.ANIME before the map's main script runs.
 */
window.ANIME = {

// ── TOKYO GHOUL ──────────────────────────────────────────
tokyo_ghoul: {
  title: "Tokyo Ghoul", eyebrow: "Chaues Productions", subtitle: "CCG Ward Map · Ghoul Activity Zones",
  theme: { accent:'#8b0000', accentBright:'#dc143c', border:'rgba(139,0,0,0.4)', glow:'rgba(139,0,0,0.3)' },
  statuses: {
    ccg_stronghold: { color:'#1a3a5f', label:'CCG Stronghold' },
    low: { color:'#2d3436', label:'Low Activity' },
    moderate: { color:'#632b2b', label:'Moderate Activity' },
    high: { color:'#8b0000', label:'High Activity' },
    critical: { color:'#4a0404', label:'Critical' },
    contested: { color:'#6b1a6b', label:'Contested' }
  },
  wards: {
    "千代田区":{n:1,name:"Chiyoda",status:"ccg_stronghold",title:"CCG Main Headquarters",factions:["CCG Main HQ"],characters:["Marude Itsuki","Yoshitoki Washū"],locations:["CCG Main Building","RC Gate Network"],prose:"The administrative center of the Commission of Counter Ghoul. Yoshitoki Washū operates from this ward. The entire district is blanketed by RC scanners. Any ghoul detected here is eliminated within minutes."},
    "中央区":{n:2,name:"Chūō",status:"moderate",title:"Financial District Beneath the Surface",factions:["CCG Second Branch"],characters:["Amon Kōtarō"],locations:["Banking District","Underground Tunnels"],prose:"Tokyo's financial heart hides ghoul trafficking routes through the deep tunnel systems beneath the major banks."},
    "港区":{n:3,name:"Minato",status:"low",title:"Embassy District — V Organization Presence",factions:["V Organization"],characters:["V Organization agents"],locations:["Embassies","Luxury Hotels","Tokyo Bay"],prose:"The V Organization—the shadow group controlling the CCG from behind the scenes—maintains covert posts in this high-visibility district."},
    "新宿区":{n:4,name:"Shinjuku",status:"high",title:"Kabukichō — The Hunting Grounds",factions:["Unaffiliated Ghouls"],characters:["Multiple Unaffiliated Ghouls"],locations:["Kabukichō","Nightlife Districts"],prose:"Tokyo's wildest nightlife district is a feeding paradise. Ghouls blend easily into the chaotic crowds. Multiple One-Eyed Ghoul sightings reported."},
    "文京区":{n:5,name:"Bunkyō",status:"moderate",title:"University District — Bureau Archives",factions:["CCG Bureau of Investigation"],characters:["Ghoul Researchers"],locations:["University of Tokyo","CCG Archives"],prose:"The CCG Bureau of Investigation keeps its main research archives here. Several prominent ghoul researchers were later found to have been ghouls themselves."},
    "台東区":{n:6,name:"Taitō",status:"moderate",title:"Old Families — The Shimoguchi Clan",factions:["Old-Guard Ghoul Survivors"],characters:["Shimoguchi Clan survivors"],locations:["Asakusa","Ueno"],prose:"Ancient ghoul families maintained territories here for generations before CCG modernization."},
    "墨田区":{n:7,name:"Sumida",status:"high",title:"Bin Brothers Territory",factions:["Bin Brothers"],characters:["Bin-ichi","Bin-joo"],locations:["Sumida River","Skytree Shadow"],prose:"The Bin Brothers claimed this ward as their hunting territory. Bodies surface in the Sumida River with disturbing frequency."},
    "江東区":{n:8,name:"Kōtō",status:"high",title:"Warehouse District — Aogiri Trafficking Routes",factions:["Aogiri Tree"],characters:["Aogiri operatives"],locations:["Container Yards","Warehouses"],prose:"Aogiri Tree uses shipping facilities here for trafficking human livestock."},
    "品川区":{n:9,name:"Shinagawa",status:"moderate",title:"Port of Shadows",factions:["Harbor Ghoul Syndicate"],characters:["Syndicate operatives"],locations:["Port of Tokyo","Docks"],prose:"Ghoul contraband moves through these docks. A complex web of corrupt handlers makes investigation difficult."},
    "目黒区":{n:10,name:"Meguro",status:"high",title:"Tsukiyama Estate — The Gourmet's Domain",factions:["Tsukiyama Family"],characters:["Shuu Tsukiyama"],locations:["Tsukiyama Estate","Dinner Parties"],prose:"Shuu Tsukiyama (The Gourmet) conducts his elaborate, theatrical hunts from this ward. Multiple high-profile humans vanished after attending exclusive Tsukiyama dinner parties."},
    "大田区":{n:11,name:"Ōta",status:"critical",title:"⚔ THE 11TH WARD WAR",factions:["Aogiri Tree","CCG Special Operations"],characters:["Tatara","Yamori/Jaso","Kaneki Ken","Suzuya Jūzō"],locations:["Industrial Zones","Battle Site"],prose:"Aogiri Tree established its primary stronghold here. The CCG launched the 11th Ward Battle—site of Kaneki Ken's transformation."},
    "世田谷区":{n:12,name:"Setagaya",status:"low",title:"Quiet Suburb — Yoshimura's Influence",factions:["Anteiku Network"],characters:["Peripheral Anteiku members"],locations:["Residential Areas"],prose:"Several ghoul families live quietly here, conforming to Yoshimura's non-predatory philosophy."},
    "渋谷区":{n:13,name:"Shibuya",status:"moderate",title:"HySy ArtMask Studio — Uta's Domain",factions:["HySy ArtMask Studio"],characters:["Uta","Renji Yomo"],locations:["Shibuya Crossing","Harajuku","Mask Studio"],prose:"In a back alley, Uta's HySy ArtMask Studio—the premier supplier of ghoul masks, crafted from human facial tissue. Uta himself is a mystery."},
    "中野区":{n:14,name:"Nakano",status:"high",title:"Aogiri Cell — Underground Operations",factions:["Aogiri Tree"],characters:["Tatara"],locations:["Underground Facility","Safe Houses"],prose:"An Aogiri Tree operational cell ran kidnapping and supply operations from a basement facility here. Multiple CCG investigators assigned to this ward have been killed."},
    "杉並区":{n:15,name:"Suginami",status:"moderate",title:"The Fueguchi Ward",factions:["CCG Investigators"],characters:["Hinami Fueguchi","Mado Kureo","Amon Kōtarō"],locations:["Suburban Streets","Fueguchi Residence"],prose:"Quiet suburban Suginami became significant when Hinami Fueguchi relocated here. The quiet streets hide the tragedy of the Fueguchi incident."},
    "豊島区":{n:16,name:"Toshima",status:"critical",title:"Noro — The Unkillable",factions:["Aogiri Tree"],characters:["Noro"],locations:["Ikebukuro","Terror Zones"],prose:"Noro—the grotesque, seemingly immortal Aogiri Tree general. CCG investigators assigned to the 16th Ward show the highest casualty rate in eastern Tokyo."},
    "北区":{n:17,name:"Kita",status:"low",title:"Northern Outpost",factions:["CCG Northern Outpost"],characters:["Outpost personnel"],locations:["Northern Districts","Arakawa River"],prose:"Low-profile ghoul presence—primarily small hunting groups that avoid attention."},
    "荒川区":{n:18,name:"Arakawa",status:"moderate",title:"Borderland — Ghoul Refugees",factions:["Displaced Ghouls"],characters:["Ward 11 refugees"],locations:["Arakawa River","Refugee Routes"],prose:"A borderland between CCG-controlled central wards and the more chaotic outer wards."},
    "板橋区":{n:19,name:"Itabashi",status:"high",title:"Owl Sightings — Classified Incidents",factions:["One-Eyed Owl"],characters:["One-Eyed Owl"],locations:["Residential Areas"],prose:"Multiple Owl sightings attributed to this ward in classified CCG reports. Exact casualty figures remain sealed."},
    "練馬区":{n:20,name:"Nerima",status:"contested",title:"★ THE 20TH WARD — ANTEIKU",factions:["Anteiku","CCG 20th Ward Branch"],characters:["Kaneki Ken","Yoshimura","Touka Kirishima","Rize Kamishiro"],locations:["Anteiku Café","CCG Branch"],prose:"THE ward. Yoshimura's domain. Anteiku Café served coffee to humans and provided meat to ghouls who would not hunt. The Anteiku Raid is the emotional climax of the original series."},
    "足立区":{n:21,name:"Adachi",status:"critical",title:"Aogiri Tree — Northern Operations",factions:["Aogiri Tree"],characters:["Aogiri operatives"],locations:["Warehouse Districts"],prose:"Aogiri Tree maintained major storage and operations facilities in Adachi's vast warehouse districts."},
    "葛飾区":{n:22,name:"Katsushika",status:"moderate",title:"V Organization — Deep Cover",factions:["V Organization"],characters:["V Organization operatives"],locations:["Residential Ward"],prose:"The V Organization maintains deep-cover assets in Katsushika. Human disappearances are systematically attributed to other causes."},
    "江戸川区":{n:23,name:"Edogawa",status:"high",title:"Gateway to Ward 24",factions:["CCG Checkpoint"],characters:["Ward 24 scouts (MIA)"],locations:["Edogawa River","CCG Checkpoint"],prose:"The easternmost ward. Beyond the river—Ward 24. No investigator has returned from there."}
  },
  pois: [
    // ── Key story locations ──
    {name:"Celes Wedding Chapel (Shibuya)",lat:35.6725,lng:139.7256,label:"The Gourmet Arc. Tsukiyama lures Kaneki to a 'dinner party' inside a church — where ghouls bid on the right to eat him. The stained glass. The balcony seats. Kaneki's kagune erupts for the first time in public. The Gourmet gets a taste and becomes obsessed."},
    {name:"CCG Main HQ (Chiyoda)",lat:35.691,lng:139.7356,label:"The Commission of Counter Ghoul. Every investigator reports here. Washū family runs it from the top floor — and the Washū are ghouls themselves. The building that symbolizes the lie at the center of the entire series."},
    {name:"Ginza Station Intersection",lat:35.6719,lng:139.7639,label:"Opening shot of Tokyo Ghoul :re. Haise Sasaki walks through Ginza — a man with no memory, wearing a CCG uniform, leading a squad of half-ghouls. The city moves around him. He doesn't know who he used to be."},
    {name:"Ueno Station",lat:35.7138,lng:139.777,label:"Shirazu and Urie — the Quinx Squad's dysfunctional heart. They meet contacts here in :re. Shirazu is broke, sending every paycheck to his sister's medical bills. Urie is calculating his next promotion. Neither knows how little time Shirazu has left."},
    {name:"Museum Café (Model for :re)",lat:35.7329,lng:139.7066,label:"The real café that inspired ':re' — Touka's coffee shop after the timeskip. She builds it as a successor to Anteiku. A place where ghouls and humans can sit together. Haise walks in not knowing why it feels like home."},
    {name:"JR Shinjuku East Exit",lat:35.6928,lng:139.7024,label:"Touka and Kaneki. The East Exit crowd. She finds him here in Season 1 — or he finds her. Shinjuku at night, neon and noise, two people who shouldn't exist trying to have a normal conversation about nothing."},
    {name:"Kabukichō",lat:35.695,lng:139.702,label:"Kaneki's ghoul instincts surface for the first time. The hunger hits him in Kabukichō's back alleys — surrounded by drunk humans stumbling between bars. He can smell their blood. He runs. This is the scene where the audience realizes he can't go back."},
    {name:"Yoyogi Park",lat:35.6717,lng:139.6967,label:"Tsukiyama finds Haise here in :re. The Gourmet, emaciated and broken after losing Kaneki, encounters Sasaki in the park. He can smell him — it's Kaneki's body, but the mind is someone else. Tsukiyama weeps. 'It's you. It's really you.' Haise has no idea who this man is."},
    {name:"Shinagawa Grand Commons",lat:35.6286,lng:139.7386,label:"The Tsukiyama Family Extermination Operation launches from Shinagawa. CCG musters its forces to wipe out the Tsukiyama estate. Haise leads the operation — ordered to kill the family of a man who loved Kaneki more than anyone."},
    {name:"Milky Way Café (Ikebukuro)",lat:35.7336,lng:139.7156,label:"An Ikebukuro café in Noro's territory. Every café in Tokyo Ghoul is a front, a meeting place, or a memorial. In the 16th Ward, you drink your coffee fast and you don't stay after dark."}
  ],
  overlays: []
},

// ── CHAINSAW MAN ─────────────────────────────────────────
chainsaw_man: {
  title: "Chainsaw Man", eyebrow: "Part 1 · Reze Arc", subtitle: "Tokyo Devil Hunter Map · Public Safety Division",
  theme: { accent:'#ea580c', accentBright:'#f97316', border:'rgba(234,88,12,0.4)', glow:'rgba(234,88,12,0.3)' },
  statuses: {
    division_hq: { color:'#0f1f0f', label:'Division HQ' },
    public_safety_active: { color:'#111a11', label:'Public Safety Active' },
    low_activity: { color:'#1e1c1a', label:'Low Activity' },
    devil_activity: { color:'#200505', label:'Devil Activity' },
    bomb_conflict: { color:'#2a1000', label:'Bomb Conflict' },
    high_devil: { color:'#200000', label:'High Devil' },
    reze_battle: { color:'#351000', label:'Reze Battle' }
  },
  wards: {
    "千代田区":{n:1,name:"Chiyoda",status:"division_hq",title:"Public Safety HQ — Central Command",devilThreat:"Low",divisions:["Public Safety Bureau"],devils:[],characters:["Makima","Kishibe"],prose:"Japan's Public Safety Bureau Devil Hunter Division maintains its central command here. Makima's office is located in a nondescript Ministry building."},
    "中央区":{n:2,name:"Chūō",status:"low_activity",title:"Financial District — Routine Devils",devilThreat:"Low",divisions:["Division 4"],devils:["Money Devil","Fear Devil"],characters:[],prose:"Financial misery generates steady but manageable devil activity. Division 4 handles quarterly sweeps."},
    "港区":{n:3,name:"Minato",status:"public_safety_active",title:"Minato Waterfront — Division Hub",devilThreat:"Moderate",divisions:["Division 4"],devils:["Sea Devil"],characters:[],prose:"Tokyo Bay waterfront includes Public Safety staging facilities disguised as shipping companies. Water-based devil manifestations monitored from marine patrol."},
    "新宿区":{n:4,name:"Shinjuku",status:"high_devil",title:"Kabukichō — Devil Hunting Ground",devilThreat:"High",divisions:["Division 4"],devils:["Fear Devil","Darkness Devil"],characters:["Denji","Power","Aki Hayakawa"],prose:"Kabukichō's nightlife creates a rich feeding environment for devils. Division 4 runs nightly patrols through the entertainment district."},
    "文京区":{n:5,name:"Bunkyō",status:"low_activity",title:"Academic Ward — Quiet Threat",devilThreat:"Low",divisions:["Division 4"],devils:["Uncertainty Devil"],characters:[],prose:"University district. Devil manifestations here tend to be intellectualized. Concentration of rational thinkers may suppress devil manifestation."},
    "台東区":{n:6,name:"Taitō",status:"devil_activity",title:"Asakusa — Kishibe's Drinking Ward",devilThreat:"Moderate",divisions:["Division 4"],devils:["Historical Devils"],characters:["Kishibe"],prose:"Ancient Asakusa generates steady devil activity from deep historical roots. Kishibe frequents Asakusa's izakayas between missions."},
    "墨田区":{n:7,name:"Sumida",status:"devil_activity",title:"Industrial Devil Activity",devilThreat:"Moderate",divisions:["Division 4"],devils:["Saw Devil","Machine Devil","Water Devil"],characters:[],prose:"Skytree district and industrial zones harbor persistent devil nests. Sumida River has reported Water Devil manifestations."},
    "江東区":{n:8,name:"Kōtō",status:"devil_activity",title:"Container Yards — Devil Trafficking",devilThreat:"High",divisions:["Division 4"],devils:["Steel Devil","Machine Devil"],characters:[],prose:"Key transit corridor for illegal devil contracts—the underground market for contracted devil parts."},
    "品川区":{n:9,name:"Shinagawa",status:"public_safety_active",title:"South Transit — Response Corridor",devilThreat:"Moderate",divisions:["Division 4"],devils:[],characters:[],prose:"Shinagawa Station makes this a rapid deployment zone for Division 4 teams. Key transport hub for moving devil hunters."},
    "目黒区":{n:10,name:"Meguro",status:"low_activity",title:"Residential — Below Threshold",devilThreat:"Low",divisions:["Division 4"],devils:["Fear Devil"],characters:[],prose:"Upscale residential Meguro sits below the threat threshold for Division 4 priority."},
    "大田区":{n:11,name:"Ōta",status:"devil_activity",title:"Airport — Threat Ingress Point",devilThreat:"Moderate-High",divisions:["Division 4 Airport Task Force"],devils:["Foreign Devils"],characters:[],prose:"Haneda Airport is a significant ingress point for foreign devil manifestations via air travel and cargo."},
    "世田谷区":{n:12,name:"Setagaya",status:"low_activity",title:"Residential Suburban — Routine Patrol",devilThreat:"Low",divisions:["Division 4"],devils:[],characters:[],prose:"Standard suburban devil threat. Annual clearance operations. The kind of ordinary neighborhood life Denji was denied."},
    "渋谷区":{n:13,name:"Shibuya",status:"reze_battle",title:"★ REZE ARC — The Café — First Encounter",devilThreat:"Extreme",divisions:["Division 4"],devils:["Reze (Bomb Devil)"],characters:["Denji","Reze","Beam","Kobeni"],prose:"Where Denji first met Reze—the Bomb Devil. The café, the aquarium date, and the streets where the truth exploded into violence."},
    "中野区":{n:14,name:"Nakano",status:"devil_activity",title:"Nakano — Devil Nest Clearance",devilThreat:"High",divisions:["Division 4"],devils:["Cockroach Devil"],characters:["Denji","Power"],prose:"Division 4 conducted a significant nest clearance. Memorable primarily for Power's chaotic combat style causing property damage."},
    "杉並区":{n:15,name:"Suginami",status:"low_activity",title:"Suburban West — Quiet Sector",devilThreat:"Low",divisions:["Division 4"],devils:[],characters:[],prose:"Quiet residential west Tokyo. The kind of ward where normal people live normal lives."},
    "豊島区":{n:16,name:"Toshima",status:"devil_activity",title:"Ikebukuro — Night Terror District",devilThreat:"High",divisions:["Division 4"],devils:["Fear Devil","Spike Devil"],characters:["Denji"],prose:"Ikebukuro's competing entertainment ecosystems generate sustained devil activity. Fear Devil feeds heavily on urban anxiety."},
    "北区":{n:17,name:"Kita",status:"public_safety_active",title:"Northern Sector — Division Outpost",devilThreat:"Moderate",divisions:["Division 4"],devils:[],characters:["Aki Hayakawa"],prose:"Division 4 maintains a northern outpost. Aki Hayakawa operated from this sector during early patrols."},
    "荒川区":{n:18,name:"Arakawa",status:"devil_activity",title:"Arakawa River — Water Devil Territory",devilThreat:"Moderate-High",divisions:["Division 4"],devils:["Water Devil","Aquatic Devils"],characters:[],prose:"The Arakawa River is considered Water Devil territory. Division 4 maintains strict no-solo-crossing protocol at night."},
    "板橋区":{n:19,name:"Itabashi",status:"low_activity",title:"Northern Residential — Managed Threat",devilThreat:"Low-Moderate",divisions:["Division 4"],devils:[],characters:[],prose:"Routine devil activity managed by Division 4 outpost coverage. The ward's ordinary character represents the normal life Denji would have wanted."},
    "練馬区":{n:20,name:"Nerima",status:"devil_activity",title:"Outer Ward — Elevated Incidents",devilThreat:"Moderate",divisions:["Division 4"],devils:["Rat Devil"],characters:[],prose:"Elevated incident frequency for an outer ward—partially attributed to sustained Rat Devil population in underground infrastructure."},
    "足立区":{n:21,name:"Adachi",status:"devil_activity",title:"Northern Industrial — Devil Accumulation",devilThreat:"High",divisions:["Division 4"],devils:["Rat Devil"],characters:[],prose:"Highest devil accumulation rate of the outer wards. Combination of industrial accident history and river access makes this a premier devil nesting ground."},
    "葛飾区":{n:22,name:"Katsushika",status:"devil_activity",title:"Eastern Ward — Unmonitored Incidents",devilThreat:"Moderate",divisions:["Division 4"],devils:[],characters:[],prose:"Devil incident reports inconsistently filed. Division 4 suspects local officials have suppressed reports. Kishibe noted this as a surveillance blind spot."},
    "江戸川区":{n:23,name:"Edogawa",status:"reze_battle",title:"★ REZE ARC CLIMAX — Harbor Battle",devilThreat:"Extreme",divisions:["Division 4"],devils:["Reze (Bomb Devil)"],characters:["Denji","Reze","Makima"],prose:"Site of the Reze arc's climactic battle. Reze's escape route brought the conflict to the waterways and industrial piers. Devastating emotional consequences."}
  },
  pois: [
    // ── Romance / daily life (Jinbocho) ──
    {name:"Phone Booth (Kanda Catholic Church)",lat:35.6977,lng:139.7574,label:"A storm. A phone booth. Denji meets a girl named Reze. She's soaked, she's smiling, and she's the most normal person he's ever talked to. She's also a Soviet-trained assassin with a bomb in her neck."},
    {name:"Aoi Building",lat:35.7001,lng:139.7582,label:"The street Reze walks to work. Quiet, residential Jinbocho. Fans have matched the exact building from the manga panels — down to the facade details."},
    {name:"Onnazaka (Women's Slope)",lat:35.7003,lng:139.7585,label:"Stone stairs from the 1924 earthquake reconstruction. Reze walks these every day to the café. Fans leave gerbera flowers on the landing — Reze's flower, the symbol of what she and Denji almost had."},
    {name:"Trois Bagues Vertes (Café Futamichi)",lat:35.7002,lng:139.7573,label:"The real café that inspired Reze's workplace. Also where Denji waits with flowers on the last day. She never shows. Power does. He eats the flowers."},
    {name:"Kanda Catholic Church",lat:35.6995,lng:139.7575,label:"The church near the phone booth. Its quiet European architecture anchors the Jinbocho pilgrimage cluster — five Reze Arc locations within a two-minute walk of each other."},
    // ── Reze Arc battle route ──
    {name:"Suidobashi / Jinbocho Streets",lat:35.6985,lng:139.7550,label:"Fireworks. A kiss. Then Reze bites out Denji's tongue and transforms. The Bomb Devil. The battle starts in the same streets where they fell for each other."},
    {name:"Central Chiyoda (Car Chase)",lat:35.6920,lng:139.7560,label:"Division 4 flees by car. Reze pursues on foot — faster than the vehicle. Aki engages her; Future Devil gives him just enough foresight to survive. Violence Fiend pulls him out at the last second."},
    {name:"Nihonbashi / Chūō District",lat:35.6840,lng:139.7710,label:"Typhoon Devil arrives — a grotesque infant brain surrounded by a cyclone. The storm swallows central Tokyo. Angel Devil is nearly torn away by the wind. Aki grabs his bare hand. Two months of lifespan gone. 'Die when I'm not around to stop it.'"},
    {name:"Tokyo Tower (Aerial Battle)",lat:35.6586,lng:139.7454,label:"Denji rides Beam through the Tokyo skyline — chain in the shark's mouth like reins. Sharknado. They carve through Typhoon Devil above the city. Tokyo Tower stands in the background of the most insane fight in Part 1."},
    {name:"Tokyo Bay Waterfront",lat:35.6450,lng:139.7700,label:"Reze blows off Denji's arm. He shoots chains from the stumps, wraps them both together, and falls into Tokyo Bay. Reze can't detonate underwater. They sink to the bottom, tangled in each other."},
    {name:"Coastline (Morning After)",lat:35.6480,lng:139.7750,label:"Dawn. All three wash ashore. Denji could kill her. He doesn't. 'I would've regretted it.' Reze insists she faked everything. Denji asks: then why didn't you kill me at the school? 'Meet me at the café.'"},
    {name:"Alley near Café Futamichi",lat:35.6990,lng:139.7565,label:"Reze changes her mind. She turns back toward the café. Rats follow her into the alley and form into Makima. Angel throws spears from the rooftop. The country mouse never made it home."},
    // ── Season 1 ──
    {name:"Nerima Station South Exit",lat:35.7378,lng:139.6539,label:"Sea cucumber devil. Denji's first real Tokyo assignment. Power gets scolded by Makima for property damage. The mundane beginning of the worst job in the world."},
    {name:"Koun Building (Nerima)",lat:35.7371,lng:139.6548,label:"Power leaps off the building to stomp the sea cucumber devil. Excessive force, zero subtlety. Peak Blood Fiend behavior. The building matches the real Koun Building near Nerima Station."}
  ],
  overlays: []
},

// ── JUJUTSU KAISEN ───────────────────────────────────────
jjk: {
  title: "Jujutsu Kaisen", eyebrow: "Shibuya Incident · Culling Game", subtitle: "Cursed Territory Map · Barrier Zones",
  theme: { accent:'#6b21a8', accentBright:'#8b5cf6', border:'rgba(124,58,237,0.4)', glow:'rgba(124,58,237,0.3)' },
  statuses: {
    shibuya_incident: { color:'#8b0000', label:'Shibuya Incident Zone' },
    shibuya_aftermath: { color:'#4a0000', label:'Post-Shibuya Chaos' },
    colony_tokyo_1: { color:'#6b21a8', label:'Colony — Tokyo No.1' },
    colony_tokyo_2: { color:'#2563eb', label:'Colony — Tokyo No.2' },
    sendai_colony: { color:'#7c3aed', label:'Sendai Colony Territory' },
    cursed_zone: { color:'#ea580c', label:'Cursed Spirit Outbreak' },
    jujutsu_high: { color:'#059669', label:'Jujutsu High Territory' },
    neutral: { color:'#1e3a8a', label:'Neutral Zone' }
  },
  wards: {
    "渋谷区":{n:13,name:"Shibuya",status:"shibuya_incident",title:"Shibuya Incident — October 31",factions:["Cursed Spirits","Jujutsu Sorcerers"],characters:["Gojo Satoru","Sukuna","Itadori Yuji","Nanami Kento","Mahito"],locations:["Shibuya Station","Scramble Crossing","Hikarie"],prose:"The Shibuya Incident. Curtain barrier traps civilians. Gojo Satoru sealed in Prison Realm. Sukuna unleashed. Thousands dead. The event that changed everything."},
    "千代田区":{n:1,name:"Chiyoda",status:"shibuya_aftermath",title:"Post-Shibuya Chaos",factions:["Government"],characters:[],locations:["Imperial Palace District"],prose:"Imperial Palace district. Jujutsu society in disarray after Gojo's sealing. Emergency protocols activated."},
    "新宿区":{n:4,name:"Shinjuku",status:"colony_tokyo_1",title:"Culling Game Colony — Tokyo No.1",factions:["Culling Game Players"],characters:["Megumi Fushiguro","Reggie Star"],locations:["TMG Building","Colony Barrier"],prose:"BARRIER ACTIVE. Culling Game colony established. Players forced to earn points or die. TMG Building serves as landmark."},
    "港区":{n:3,name:"Minato",status:"colony_tokyo_2",title:"Culling Game Colony — Tokyo No.2",factions:["Culling Game Players"],characters:["Hakari Kinji","Charles Bernard"],locations:["Roppongi","Colony Barrier"],prose:"BARRIER ACTIVE. Second Tokyo colony. High concentration of awakened sorcerers. Deadly game rules in effect."},
    "豊島区":{n:16,name:"Toshima",status:"sendai_colony",title:"Sendai Colony Territory",factions:["Colony Transit"],characters:[],locations:["Ikebukuro"],prose:"Northern colony influence. Ikebukuro area. Players from Sendai colony occasionally spotted during transit."},
    "中央区":{n:2,name:"Chūō",status:"cursed_zone",title:"High Cursed Spirit Activity",factions:["Cursed Spirits"],characters:[],locations:["Tokyo Station"],prose:"Post-Shibuya cursed spirit outbreak. Tokyo Station area overrun. Jujutsu High struggling to contain."},
    "文京区":{n:5,name:"Bunkyō",status:"jujutsu_high",title:"Tokyo Jujutsu High Territory",factions:["Jujutsu High"],characters:["Yaga Masamichi"],locations:["Jujutsu High Campus"],prose:"Tokyo Jujutsu High school grounds. Heavily protected. Students mobilized for Culling Game intervention."},
    "台東区":{n:6,name:"Taitō",status:"cursed_zone",title:"Asakusa Cursed Outbreak",factions:["Cursed Spirits"],characters:[],locations:["Sensō-ji Temple"],prose:"Traditional district now plagued by cursed spirits. Sensō-ji temple area particularly dangerous."},
    "墨田区":{n:7,name:"Sumida",status:"neutral",title:"Neutral Zone",factions:[],characters:[],locations:["Skytree District"],prose:"Skytree district. Outside colony barriers. Cursed spirit activity present but manageable."},
    "江東区":{n:8,name:"Kōtō",status:"neutral",title:"Eastern Industrial Zone",factions:[],characters:[],locations:["Waterfront"],prose:"Industrial waterfront. Low population density. Some cursed spirit activity."},
    "品川区":{n:9,name:"Shinagawa",status:"neutral",title:"Southern Gateway",factions:[],characters:[],locations:["Transport Hub"],prose:"Transport hub. Refugees fleeing Tokyo pass through here."},
    "目黒区":{n:10,name:"Meguro",status:"neutral",title:"Residential District",factions:[],characters:[],locations:["Residential Areas"],prose:"Relatively quiet residential area. Citizens evacuating."},
    "大田区":{n:11,name:"Ōta",status:"neutral",title:"Haneda Airport Zone",factions:[],characters:[],locations:["Haneda Airport"],prose:"Airport district. Military and jujutsu society monitoring cursed activity."},
    "世田谷区":{n:12,name:"Setagaya",status:"neutral",title:"Western Residential",factions:[],characters:[],locations:["Residential Areas"],prose:"Large residential ward. Civilian evacuation ongoing."},
    "中野区":{n:14,name:"Nakano",status:"neutral",title:"Western District",factions:[],characters:[],locations:["Residential Area"],prose:"Residential area west of Shinjuku colony barrier."},
    "杉並区":{n:15,name:"Suginami",status:"neutral",title:"Outer Western Ward",factions:[],characters:[],locations:["Outer Ward"],prose:"Outer ward. Less affected by central Tokyo chaos."},
    "北区":{n:17,name:"Kita",status:"neutral",title:"Northern District",factions:[],characters:[],locations:["Northern Residential"],prose:"Northern residential area. Monitoring for colony expansion."},
    "荒川区":{n:18,name:"Arakawa",status:"neutral",title:"Arakawa River Zone",factions:[],characters:[],locations:["Arakawa River"],prose:"River district. Natural barrier against cursed spirit spread."},
    "板橋区":{n:19,name:"Itabashi",status:"neutral",title:"Northwestern Zone",factions:[],characters:[],locations:["Northwestern Residential"],prose:"Northwestern residential area. Relatively stable."},
    "練馬区":{n:20,name:"Nerima",status:"neutral",title:"Westernmost Ward",factions:[],characters:[],locations:["Outer Ward"],prose:"Furthest from Shibuya incident. Safest ward in Tokyo."},
    "足立区":{n:21,name:"Adachi",status:"cursed_zone",title:"Northern Cursed Activity",factions:["Cursed Spirits"],characters:[],locations:["Warehouse Districts"],prose:"Northern ward experiencing cursed spirit outbreaks."},
    "葛飾区":{n:22,name:"Katsushika",status:"neutral",title:"Eastern Residential",factions:[],characters:[],locations:["Residential Ward"],prose:"Eastern residential area. Moderate cursed activity."},
    "江戸川区":{n:23,name:"Edogawa",status:"neutral",title:"Easternmost Ward",factions:[],characters:[],locations:["Eastern Edge"],prose:"Eastern edge of Tokyo. Border monitoring active."}
  },
  pois: [
    // ── Shibuya Incident (Oct 31) ──
    {name:"Shibuya Station — Hachiko Exit",lat:35.658,lng:139.701,label:"The curtain falls. Civilians are sealed inside the station. Geto's screen sets the trap — Gojo walks in knowing it's a trap, believing he can break it. He's wrong."},
    {name:"Shibuya Station — Underground B5F",lat:35.6575,lng:139.7015,label:"Prison Realm activates. Gojo freezes — six minutes of memory flashing through his mind. Geto says 'You're my best friend. The only one.' Gojo Satoru is sealed."},
    {name:"Shibuya Scramble Crossing",lat:35.6595,lng:139.7004,label:"Ground zero. Toji's resurrected body tears through Dagon's domain. Sukuna takes Itadori's body and carves Jogo apart here. The crossing runs red."},
    {name:"Shibuya Hikarie",lat:35.6591,lng:139.7034,label:"Nanami's last stand. Burned beyond recognition, he walks toward Mahito knowing he's dead. 'You've got it from here.' Mahito touches him. Itadori watches."},
    {name:"Shibuya Mark City",lat:35.658,lng:139.699,label:"Choso corners Itadori here. A fight Yuji should not survive — until Choso sees a false memory of Yuji as his brother and hesitates. Blood Manipulation vs Divergent Fist."},
    {name:"SHIBUYA109",lat:35.6616,lng:139.6985,label:"Sukuna's Malevolent Shrine — 200-meter radius domain expansion. The building, the block, the people inside. All cleaved. Shibuya's most recognizable building, unmade in seconds."},
    // ── First-years origin (Ep.3) ──
    {name:"Harajuku Station",lat:35.6702,lng:139.7024,label:"Before any of it. Yuji and Megumi sit on the bench waiting for their new teacher. Gojo arrives late, grinning. 'Let's go pick up the third one.' The team that will break the world starts here."},
    {name:"Takeshita Street",lat:35.671,lng:139.7025,label:"Nobara Kugisaki steps onto Takeshita-dori and stops. 'I'm in Tokyo.' She hasn't seen a cursed spirit yet. She hasn't lost anyone yet. She's just a girl from the countryside seeing the city for the first time."},
    {name:"Alta Harajuku",lat:35.6708,lng:139.7030,label:"Yuji and Megumi spot Nobara arguing with a model scout who didn't pick her. First impression: she's difficult. Later they'll realize that stubbornness is what keeps her alive."},
    {name:"Harajuku Coin Lockers",lat:35.6705,lng:139.7027,label:"All three students together for the first time. Gojo announces their first mission. 'Roppongi.' Nobody knows what's waiting. The audience does."},
    // ── Key locations ──
    {name:"Roppongi Hills",lat:35.6604,lng:139.7292,label:"First mission. Nobara proves she belongs — hammer and nails against a cursed womb. Tokyo Tower looms behind her in the OP. This is where she decides she's not going home."},
    {name:"Sendagaya Tunnel",lat:35.678,lng:139.712,label:"Megumi kneels at the tunnel mouth in the OP, shikigami dissolving around him. In-story: a routine investigation that introduces how Grade 2+ curses operate in Tokyo's infrastructure."},
    {name:"Otaguro Park (Suginami)",lat:35.7049,lng:139.6195,label:"Maki puts on the cursed spirit glasses for the first time. The pond is full of low-grade spirits — invisible to anyone without cursed energy. A quiet, creepy scene that establishes the show's rules."},
    {name:"Kichijoji Kinema Cinema",lat:35.7034,lng:139.5796,label:"Junpei arc. The rooftop batting cages match the real building. Mahito befriends Junpei here — the cruelest manipulation in the series. Junpei thinks he's found someone who understands him."},
    // ── Culling Game ──
    {name:"TMG Building (Shinjuku)",lat:35.6896,lng:139.6917,label:"Tokyo Colony No.1. The twin towers of the Metropolitan Government Building become the landmark inside the barrier. Megumi and Reggie Star fight here — Megumi's domain expansion debut."},
    // ── Shinjuku villain scenes ──
    {name:"Shinjuku Café (Geto meeting)",lat:35.6905,lng:139.7005,label:"Geto, Jogo, Hanami, and Mahito sit in a Shinjuku café planning the Shibuya Incident. The scene mirrors a business meeting — four cursed spirits ordering coffee, discussing genocide."},
    {name:"Nanami's Former Office (Shinjuku)",lat:35.6930,lng:139.7020,label:"Before Jujutsu High, Nanami was a salaryman. His old office building in Shinjuku. He quit because he realized the mundane world was just as cursed — it just didn't have a name for it."},
    // ── Post-Shibuya ──
    {name:"Ramla Hall (Iidabashi)",lat:35.7022,lng:139.7436,label:"After Shibuya collapses everything. Yuki Tsukumo, Yuji, and Choso regroup here. Yuki explains the theory of cursed energy optimization. The adults are gone — these three are what's left of the resistance."},
    {name:"Don Quijote Ginza Bridge",lat:35.6668,lng:139.7624,label:"Naoya Zenin hunts Yuji through the Ginza district. Choso intervenes. The Zenin clan's ugliest son vs two brothers who shouldn't exist. Blood techniques paint the bridge red."},
    {name:"Kabuki-za Theatre",lat:35.6695,lng:139.7679,label:"Yuta Okkotsu appears — sent to execute Yuji Itadori on Jujutsu High orders. The strongest second-year vs the boy who ate Sukuna's finger. Yuta's been ordered to kill, but he's got a different plan."}
  ],
  overlays: [
    {type:'circle',lat:35.6895,lng:139.7038,r:3000,color:'#6b21a8',label:'Tokyo Colony No.1 Barrier'},
    {type:'circle',lat:35.6473,lng:139.7353,r:2500,color:'#2563eb',label:'Tokyo Colony No.2 Barrier'},
    {type:'circle',lat:35.6595,lng:139.7004,r:2000,color:'#8b0000',label:'Shibuya Incident Curtain'},
    {type:'circle',lat:35.7081,lng:139.7549,r:2000,color:'#059669',label:'Jujutsu High Territory'}
  ]
},

// ── SHINKAI (Suzume × Your Name) ──────────────────────────
shinkai: {
  title: "Suzume × Your Name",
  eyebrow: "Shinkai's Tokyo",
  subtitle: "Sacred Sites · Door-scapes · Cityscape Poetry",
  theme: { accent:'#7c3aed', accentBright:'#a855f7', border:'rgba(168,85,247,0.4)', glow:'rgba(168,85,247,0.3)', tileBase:'https://a.basemaps.cartocdn.com/rastertiles/voyager' },
  statuses: {
    both:       { color:'#a855f7', label:'Both Films' },
    your_name:  { color:'#3b82f6', label:'Your Name (2016)' },
    suzume:     { color:'#ef4444', label:'Suzume (2022)' },
    background: { color:'#6b7280', label:'Cityscape / Background' }
  },
  wards: {
    "千代田区":{n:1,name:"Chiyoda",status:"suzume",title:"Hijiri Bridge · Ochanomizu Door",characters:["Suzume Iwato","Sōta Munakata"],locations:["Hijiri Bridge (聖橋)","Ochanomizu Station","Kanda River"],prose:"The Tokyo act of Suzume climaxes here. Above Hijiri Bridge — the iconic arch where three rail lines converge over the Kanda River — the Tokyo Keystone's door opens and the sky-spanning Worm emerges. Suzume and Sōta fight to close the door before the Worm falls on central Tokyo."},
    "中央区":{n:2,name:"Chūō",status:"background",title:"Aerial Cityscape",locations:["Ginza","Nihonbashi"],prose:"Central Tokyo appears in both films as part of Shinkai's signature aerial-cityscape montages — the city photographed from above at dawn, dusk, and night, lit with painterly precision."},
    "港区":{n:3,name:"Minato",status:"both",title:"Tokyo Tower · National Art Center",characters:["Taki Tachibana","Miki Okudera"],locations:["National Art Center Tokyo","Tokyo Tower","Roppongi"],prose:"Taki's first date with Okudera-senpai takes him to the National Art Center in Roppongi — Kisho Kurokawa's curving glass façade, rendered nearly frame-for-frame in Shinkai's hand-painted style. Tokyo Tower punctuates the aerial cityscape sequences of both films."},
    "新宿区":{n:4,name:"Shinjuku",status:"both",title:"Taki's Tokyo · Suga Shrine",characters:["Taki Tachibana","Sōta Munakata"],locations:["Suga Shrine","Shinanomachi Station","Yotsuya Station"],prose:"The emotional core of Your Name sits in Shinjuku. Taki lives and attends high school somewhere in this ward; the red staircase at Suga Shrine in Yotsuya — where he and Mitsuha finally ask each other's names — is a ten-minute walk from Yotsuya Station. Sōta's Tokyo apartment in Suzume is also located in this ward."},
    "文京区":{n:5,name:"Bunkyō",status:"suzume",title:"North of Hijiri Bridge",locations:["Hijiri Bridge (north approach)","Yushima / Hongō"],prose:"The opposite bank of the Kanda River from Ochanomizu. Establishing shots of the Tokyo door sequence look across into this ward; red-brick architecture, sloping streets, and the silhouettes of Yushima and Hongō fill Shinkai's backgrounds."},
    "墨田区":{n:7,name:"Sumida",status:"background",title:"Skytree Horizon",locations:["Tokyo Skytree (visible)"],prose:"The Skytree anchors the eastern horizon in wide Tokyo shots across both films — most dramatically during Suzume's Worm emergence, when the creature's bulk is framed against its silhouette."},
    "渋谷区":{n:13,name:"Shibuya",status:"your_name",title:"Scramble · Yoyogi Clock Tower",locations:["Shibuya Scramble Crossing","NTT Docomo Yoyogi Building","Sendagaya"],prose:"Shinkai's Tokyo is essentially Shibuya-Tokyo. The NTT Docomo Yoyogi tower — the art-deco clock building that haunts Your Name's skyline — stands in Sendagaya. The Scramble Crossing features in the film's kinetic Tokyo montage."}
  },
  pois: [
    // ── Your Name ──
    {name:"Suga Shrine Stairs",lat:35.6869,lng:139.7199,label:"The red staircase at Suga Shrine, Yotsuya — the final scene of Your Name, where Taki and Mitsuha finally meet and ask each other's names. A ten-minute walk from Yotsuya Station.",color:"#3b82f6"},
    {name:"NTT Docomo Yoyogi Building",lat:35.6839,lng:139.7020,label:"The art-deco clock tower that anchors Your Name's Tokyo skyline. Not open to the public, but visible from all around Sendagaya and Yoyogi.",color:"#3b82f6"},
    {name:"National Art Center Tokyo",lat:35.6654,lng:139.7263,label:"Taki's date with Okudera-senpai. Kurokawa's curving glass façade — the shots of them walking through the lobby and café are nearly frame-accurate to the real building.",color:"#3b82f6"},
    {name:"Shinanomachi Station",lat:35.6797,lng:139.7196,label:"Taki commutes through this JR Chūō-Sōbu line station. Featured in Your Name's Tokyo montage.",color:"#3b82f6"},
    {name:"Yotsuya Station Pedestrian Bridge",lat:35.6858,lng:139.7301,label:"The overhead bridge at Yotsuya where Taki and Mitsuha almost pass each other on parallel trains — the near-miss moment before the film's final act.",color:"#3b82f6"},
    {name:"Meiji Kinenkan",lat:35.6785,lng:139.7199,label:"The wedding hall and restaurant where Taki and Okudera-senpai eat lunch, near Gaien-mae.",color:"#3b82f6"},
    // ── Suzume ──
    {name:"Hijiri Bridge (聖橋)",lat:35.6993,lng:139.7649,label:"The Tokyo climax. The door above this bridge opens and the Worm emerges — Suzume and Sōta fight to close it before it falls on the city. The real bridge's stone arch and the crossing JR Chūō line are rendered nearly frame-for-frame.",color:"#ef4444"},
    {name:"Ochanomizu Station",lat:35.6994,lng:139.7651,label:"The JR Chūō / Marunouchi subway interchange Suzume emerges from on her Tokyo arrival. The platform view of Hijiri Bridge is the film's establishing shot for the entire Tokyo sequence.",color:"#ef4444"},
    // ── Both ──
    {name:"Tokyo Tower",lat:35.6586,lng:139.7454,label:"A fixed point in Shinkai's Tokyo. Appears throughout the aerial cityscape sequences of both Your Name and Suzume.",color:"#a855f7"},
    {name:"Shibuya Scramble Crossing",lat:35.6595,lng:139.7005,label:"The world's busiest intersection. Featured in both films' Tokyo montage sequences.",color:"#a855f7"}
  ],
  overlays: []
}
};
