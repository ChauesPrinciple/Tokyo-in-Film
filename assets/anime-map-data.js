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
    {name:"Celes Wedding Chapel (Shibuya)",lat:35.6725,lng:139.7256,label:"Tsukiyama holds Nishiki's girlfriend Kimi on the altar of a church and lures Kaneki there. Touka arrives, feeds on Kaneki's flesh to summon her kagune, and holds Tsukiyama off. No guide identifies the church."},
    {name:"CCG Main HQ (Chiyoda)",lat:35.691,lng:139.7356,label:"The CCG's headquarters are in the 1st Ward, and the Washuu clan that leads the organization is eventually revealed to be a family of ghouls. No guide identifies a real building."},
    {name:"Ginza Station Intersection",lat:35.6719,lng:139.7639,label:"Opening shot of Tokyo Ghoul :re. Haise Sasaki walks through Ginza — a man with no memory, wearing a CCG uniform, leading a squad of half-ghouls. The city moves around him. He doesn't know who he used to be."},
    {name:"Ueno Station",lat:35.7138,lng:139.777,label:"Shirazu joined the Quinx Squad to pay for treatment for his hospitalized sister, Haru. No guide ties Ueno Station to a Tokyo Ghoul scene."},
    {name:"Museum Café (Model for :re)",lat:35.7329,lng:139.7066,label:"Museum Cafe and Diner, a few minutes from Kanamecho Station, is reported as the real model for :re, the coffee shop Touka runs. In episode 2 of :re, Haise stops in and cries after tasting her coffee."},
    {name:"JR Shinjuku East Exit",lat:35.6928,lng:139.7024,label:"No published guide ties the Shinjuku East Exit to a Tokyo Ghoul scene."},
    {name:"Kabukichō",lat:35.695,lng:139.702,label:"Kaneki's ghoul instincts surface for the first time. The hunger hits him in Kabukichō's back alleys — surrounded by drunk humans stumbling between bars. He can smell their blood. He runs. This is the scene where the audience realizes he can't go back."},
    {name:"Yoyogi Park",lat:35.6717,lng:139.6967,label:"In :re, Tsukiyama and Kanae come upon Haise with the Quinx Squad on a street, and Tsukiyama runs toward him and falls. Haise hears him say \"Kaneki\" but does not recognize him. No guide places this scene in Yoyogi Park."},
    {name:"Shinagawa Grand Commons",lat:35.6286,lng:139.7386,label:"Kori Ui leads the CCG's operation to exterminate the Tsukiyama family. Haise fights at the hideout and confronts Tsukiyama on the roof. No guide ties this to Shinagawa."},
    {name:"Milky Way Café (Ikebukuro)",lat:35.7336,lng:139.7156,label:"In episode 1, Kaneki and Rize have lunch at the Milky Way café in Ikebukuro during their date."}
  ],
  overlays: []
},

// ── CHAINSAW MAN ─────────────────────────────────────────
chainsaw_man: {
  title: "Chainsaw Man", eyebrow: "Part 1 · Reze Arc", subtitle: "Tokyo Devil Hunter Map · Public Safety Division",
  theme: { accent:'#ea580c', accentBright:'#f97316', border:'rgba(234,88,12,0.4)', glow:'rgba(234,88,12,0.3)' },
  statuses: {
    division_hq:    { color:'#0f1f0f', label:'Division HQ' },
    high_devil:     { color:'#200000', label:'High Devil Activity' },
    devil_activity: { color:'#200505', label:'Devil Activity' },
    reze_battle:    { color:'#351000', label:'Reze Arc' }
  },
  // Only wards with actual story weight. Other wards fall through to 'not featured'
  // treatment (dimmed, click shows switch links to the other anime).
  wards: {
    "千代田区":{n:1,name:"Chiyoda",status:"division_hq",title:"Public Safety HQ · Jinbocho (Reze Arc)",devilThreat:"Moderate",divisions:["Public Safety Bureau"],devils:[],characters:["Makima","Kishibe","Denji","Reze"],prose:"Japan's Public Safety Bureau Devil Hunter Division operates its central command from an unmarked Ministry building here. The ward also contains the Jinbocho cluster — the café, the phone booth, the church, and the stone stairs where Denji and Reze fell for each other and fought their way out of it."},
    "新宿区":{n:4,name:"Shinjuku",status:"high_devil",title:"Kabukichō — Devil Hunting Ground",devilThreat:"High",divisions:["Division 4"],devils:["Fear Devil","Darkness Devil"],characters:["Denji","Power","Aki Hayakawa"],prose:"Kabukichō's nightlife creates a rich feeding environment for devils. Division 4 — Denji, Power, Aki, Himeno, Kobeni — runs nightly patrols through the entertainment district. The team's home ward."},
    "渋谷区":{n:13,name:"Shibuya",status:"reze_battle",title:"★ REZE ARC — The Café — First Encounter",devilThreat:"Extreme",divisions:["Division 4"],devils:["Reze (Bomb Devil)"],characters:["Denji","Reze","Beam","Kobeni"],prose:"Where Denji first met Reze — the Bomb Devil. The café, the aquarium date, and the streets where the truth exploded into violence."},
    "練馬区":{n:20,name:"Nerima",status:"devil_activity",title:"Nerima — First Mission",devilThreat:"Moderate",divisions:["Division 4"],devils:["Sea Cucumber Devil"],characters:["Denji","Power","Makima"],prose:"Denji's first real Tokyo assignment. Sea cucumber devil. Power leaps off the Koun Building with excessive force and zero subtlety. The mundane beginning of the worst job in the world."},
    "江戸川区":{n:23,name:"Edogawa",status:"reze_battle",title:"★ REZE ARC CLIMAX — Harbor Battle",devilThreat:"Extreme",divisions:["Division 4"],devils:["Reze (Bomb Devil)"],characters:["Denji","Reze","Makima"],prose:"Site of the Reze arc's climactic battle. Reze's escape route brought the conflict to the waterways and industrial piers. Devastating emotional consequences."}
  },
  pois: [
    // ── Romance / daily life (Jinbocho) ──
    {name:"Phone Booth (Kanda Catholic Church)",lat:35.6977,lng:139.7574,label:"Fans match this Jinbocho phone booth to the one where Reze runs in out of the rain and meets Denji, who coughs up a flower he had eaten and gives it to her. Guides note that no real booth matches the film exactly."},
    {name:"Aoi Building",lat:35.7001,lng:139.7582,label:"The Aoi Building on Hakusan-dori appears in the background as Reze walks to her part-time job at the café."},
    {name:"Onnazaka (Women's Slope)",lat:35.7003,lng:139.7585,label:"Fans say the slope where Denji and Reze walk together in the film is based on Onnazaka, a stone stairway between Jinbocho and Ochanomizu. Visitors have left gerbera flowers on the landing."},
    {name:"Trois Bagues Vertes (Café Futamichi)",lat:35.7002,lng:139.7573,label:"Fans identify Trois Bagues Vertes near Jinbocho Station as the model for the café where Reze works, though this has not been officially confirmed. At the end of the film, Denji waits there with flowers for Reze, who never arrives, and Power shows up and fights with him over the bouquet."},
    {name:"Kanda Catholic Church",lat:35.6995,lng:139.7575,label:"Kanda Catholic Church in Nishi-Kanda stands near the Jinbocho streets that fans associate with the Reze arc. No published guide confirms that the church itself appears in the film."},
    // ── Reze Arc battle route ──
    {name:"Suidobashi / Jinbocho Streets",lat:35.6985,lng:139.7550,label:"At the festival, during the fireworks, Reze kisses Denji, bites off his tongue, and reveals herself as the Bomb hybrid. No guide ties this scene to a specific street."},
    {name:"Central Chiyoda (Car Chase)",lat:35.6920,lng:139.7560,label:"During the attack on Public Safety, the Future Devil warns Aki of a bad outcome and he stops the car, and Reze arrives carrying the heads of two hunters she has killed. The Violence Fiend tries to stop her, fails, and retreats with Kobeni. No guide places this scene in Chiyoda."},
    {name:"Nihonbashi / Chūō District",lat:35.6840,lng:139.7710,label:"During the Typhoon Devil's storm, the Angel Devil is nearly swept away, and Aki catches him by the hand, which costs Aki two months of his life. No guide places this scene in Nihonbashi."},
    {name:"Tokyo Tower (Aerial Battle)",lat:35.6586,lng:139.7454,label:"Denji rides Beam through the Tokyo skyline — chain in the shark's mouth like reins. Sharknado. They carve through Typhoon Devil above the city. Tokyo Tower stands in the background of the most insane fight in Part 1."},
    {name:"Tokyo Bay Waterfront",lat:35.6450,lng:139.7700,label:"After Reze blows off Denji's arms, he wraps her in his chain and drags them both into the sea, where they sink together. No guide identifies the stretch of water."},
    {name:"Coastline (Morning After)",lat:35.6480,lng:139.7750,label:"On the shore, Denji revives Reze and asks her to run away with him. She insists her feelings were an act, and Denji tells her he will wait for her at the café at noon. No guide identifies the shore."},
    {name:"Alley near Café Futamichi",lat:35.6990,lng:139.7565,label:"Reze passes up the train, buys a flower, and heads back toward the café. Rats gather at her feet and form Makima, and the Angel Devil impales Reze with a spear. No guide identifies this alley."},
    // ── Season 1 ──
    {name:"Nerima Station South Exit",lat:35.7378,lng:139.6539,label:"In episode 2, on Denji's first patrol with Power, a call requests backup in front of Nerima Station for the Sea Cucumber Devil. Power leaps from a building and kills it with a hammer made of blood, claiming the kill as hers."},
    {name:"Koun Building (Nerima)",lat:35.7371,lng:139.6548,label:"Near Nerima Station in episode 2, Power jumps from a building to kill the Sea Cucumber Devil with a blood hammer. No guide identifies the building she jumps from."}
  ],
  overlays: []
},

// ── JUJUTSU KAISEN ───────────────────────────────────────
jjk: {
  title: "Jujutsu Kaisen", eyebrow: "Shibuya Incident · Culling Game", subtitle: "Cursed Territory Map · Barrier Zones",
  theme: { accent:'#6b21a8', accentBright:'#8b5cf6', border:'rgba(124,58,237,0.4)', glow:'rgba(124,58,237,0.3)' },
  statuses: {
    shibuya_incident: { color:'#8b0000', label:'Shibuya Incident Zone' },
    colony_tokyo_1: { color:'#6b21a8', label:'Colony — Tokyo No.1' },
    colony_tokyo_2: { color:'#2563eb', label:'Colony — Tokyo No.2' },
    jujutsu_high: { color:'#059669', label:'Jujutsu High Territory' }
  },
  // Only wards with actual story weight. Other wards fall through to 'not featured'
  // treatment (dimmed, click shows switch links to the other anime).
  wards: {
    "渋谷区":{n:13,name:"Shibuya",status:"shibuya_incident",title:"Shibuya Incident — October 31",factions:["Cursed Spirits","Jujutsu Sorcerers"],characters:["Gojo Satoru","Sukuna","Itadori Yuji","Nanami Kento","Mahito"],locations:["Shibuya Station","Scramble Crossing","Hikarie"],prose:"The Shibuya Incident. Curtain barrier traps civilians. Gojo Satoru sealed in Prison Realm. Sukuna unleashed. Thousands dead. The event that changed everything."},
    "新宿区":{n:4,name:"Shinjuku",status:"colony_tokyo_1",title:"Culling Game Colony — Tokyo No.1",factions:["Culling Game Players"],characters:["Megumi Fushiguro","Reggie Star"],locations:["TMG Building","Colony Barrier"],prose:"BARRIER ACTIVE. Culling Game colony established. Players forced to earn points or die. TMG Building serves as landmark."},
    "港区":{n:3,name:"Minato",status:"colony_tokyo_2",title:"Culling Game Colony — Tokyo No.2",factions:["Culling Game Players"],characters:["Hakari Kinji","Charles Bernard"],locations:["Roppongi","Colony Barrier"],prose:"BARRIER ACTIVE. Second Tokyo colony. High concentration of awakened sorcerers. Deadly game rules in effect."},
    "文京区":{n:5,name:"Bunkyō",status:"jujutsu_high",title:"Tokyo Jujutsu High Territory",factions:["Jujutsu High"],characters:["Yaga Masamichi"],locations:["Jujutsu High Campus"],prose:"Tokyo Jujutsu High school grounds. Heavily protected. Students mobilized for Culling Game intervention."}
  },
  pois: [
    // ── Shibuya Incident (Oct 31) ──
    {name:"Shibuya Station — Hachiko Exit",lat:35.658,lng:139.701,label:"On October 31 a curtain falls over Shibuya, trapping civilians so that Gojo cannot freely use his domain. Just outside this exit, at the Scramble Crossing, Megumi fights his father, Toji, in episode 40."},
    {name:"Shibuya Station — Underground B5F",lat:35.6575,lng:139.7015,label:"On the Fukutoshin Line platform at B5F, Kenjaku opens the Prison Realm, and Gojo is stunned at the sight of Geto's body. In the one minute that passes in his mind, the seal completes and Gojo is sealed."},
    {name:"Shibuya Scramble Crossing",lat:35.6595,lng:139.7004,label:"Ground zero. Toji's resurrected body tears through Dagon's domain. Sukuna takes Itadori's body and carves Jogo apart here. The crossing runs red."},
    {name:"Shibuya Hikarie",lat:35.6591,lng:139.7034,label:"Gojo arrives at Shibuya Hikarie B3F in episode 32 and sees the crowd trapped inside the barrier. Below it, inside the Hikarie 1 gate of the Tokyo Metro station, Yuji fights Choso, who stops short of killing him after seeing false memories of Yuji as his brother."},
    {name:"Shibuya Mark City",lat:35.658,lng:139.699,label:"The Mark City connecting walkway, with Okamoto Taro's mural, is matched to episode 38, where Naobito Zenin, Maki and Nanami face Dagon."},
    {name:"SHIBUYA109",lat:35.6616,lng:139.6985,label:"Sukuna's Malevolent Shrine — 200-meter radius domain expansion. The building, the block, the people inside. All cleaved. Shibuya's most recognizable building, unmade in seconds."},
    // ── First-years origin (Ep.3) ──
    {name:"Harajuku Station",lat:35.6702,lng:139.7024,label:"In episode 3, Yuji and Megumi sit outside Harajuku Station waiting for Gojo, who comes down from the station and waves. The group then meets Nobara by the coin lockers near Takeshita Street."},
    {name:"Takeshita Street",lat:35.671,lng:139.7025,label:"Nobara Kugisaki steps onto Takeshita-dori and stops. 'I'm in Tokyo.' She hasn't seen a cursed spirit yet. She hasn't lost anyone yet. She's just a girl from the countryside seeing the city for the first time."},
    {name:"Alta Harajuku",lat:35.6708,lng:139.7030,label:"Yuji and Megumi spot Nobara arguing with a model scout who didn't pick her. First impression: she's difficult. Later they'll realize that stubbornness is what keeps her alive."},
    {name:"Harajuku Coin Lockers",lat:35.6705,lng:139.7027,label:"All three students together for the first time. Gojo announces their first mission. 'Roppongi.' Nobody knows what's waiting. The audience does."},
    // ── Key locations ──
    {name:"Roppongi Hills",lat:35.6604,lng:139.7292,label:"After meeting at Harajuku, Gojo takes the first-years to Roppongi, where Nobara fights curses with her hammer and nails. In the first opening, Nobara appears in a shot that guides place beside Roppongi Hills."},
    {name:"Sendagaya Tunnel",lat:35.678,lng:139.712,label:"Sendagaya Tunnel is the setting for Megumi's shot in the first opening sequence."},
    {name:"Otaguro Park (Suginami)",lat:35.7049,lng:139.6195,label:"In the first opening, Maki appears in Otaguro Park wearing the glasses she uses to see cursed spirits, with a curse rising from the pond."},
    {name:"Kichijoji Kinema Cinema",lat:35.7034,lng:139.5796,label:"Guides identify Kichijoji Plaza, which has a rooftop batting center, as the model for the Kinema Cinema. There Junpei watches Mahito kill three boys who had bullied him and follows him out, and Mahito later draws him into his hideout and manipulates him."},
    // ── Culling Game ──
    {name:"TMG Building (Shinjuku)",lat:35.6896,lng:139.6917,label:"No published guide ties the Tokyo Metropolitan Government Building to a Jujutsu Kaisen scene."},
    // ── Shinjuku villain scenes ──
    {name:"Shinjuku Café (Geto meeting)",lat:35.6905,lng:139.7005,label:"Geto crosses a Shinjuku street with the cursed spirits Jogo and Hanami, a crossing guides place at Kabukicho Intersection. At a nearby restaurant, Jogo proposes killing Gojo in exchange for the Prison Realm, and the heat around him kills the people inside."},
    {name:"Nanami's Former Office (Shinjuku)",lat:35.6930,lng:139.7020,label:"After graduating from Jujutsu High, Nanami left sorcery for an office job before returning to work as a sorcerer. A pilgrimage guide places his old office in Shinjuku but does not name the building."},
    // ── Post-Shibuya ──
    {name:"Ramla Hall (Iidabashi)",lat:35.7022,lng:139.7436,label:"No published guide or episode summary ties Iidabashi Ramla to Jujutsu Kaisen."},
    {name:"Don Quijote Ginza Bridge",lat:35.6668,lng:139.7624,label:"Naoya Zenin's fight with Choso takes place in a tunnel, and no guide links it to Ginza."},
    {name:"Kabuki-za Theatre",lat:35.6695,lng:139.7679,label:"Yuta Okkotsu, appointed as Yuji's executioner, fights him while secretly working to keep him alive, and their fight ends in a traditional theater. No guide confirms that the theater is modeled on Kabuki-za."}
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
  theme: {
    accent:'#7c3aed', accentBright:'#a855f7', border:'rgba(168,85,247,0.4)', glow:'rgba(168,85,247,0.3)',
    tileStyle:'voyager', // the bright basemap, under the twilight gradient
    tileOpacity:0.55, // semi-transparent so the twilight gradient shows through
    background:'linear-gradient(180deg,#1e3a5f 0%,#5a4a7a 35%,#d4698c 70%,#f4a988 100%)'
  },
  // Wards in these films are arbitrary admin boundaries — the narrative lives at POI level.
  // Ward clicks zoom-to-ward and color-highlight, but don't open an info panel.
  disableWardInfo: true,
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
