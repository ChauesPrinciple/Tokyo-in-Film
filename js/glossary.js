
// Glossary Data
const glossaryTerms = [
    {
        term: "Frame",
        definition: "A single image from a film, or the borders of the image as seen on the screen."
    },
    {
        term: "ADR (Automated Dialogue Replacement)",
        matchTerm: "ADR",
        definition: "Re-recording dialogue in post-production to match on-screen performances.",
        image: "https://human.libretexts.org/@api/deki/files/157122/Cabin_dubbing.jpg",
        link: "https://commons.wikimedia.org/wiki/File:Cabin_dubbing.jpg"
    },
    {
        term: "Artificial Light",
        definition: "Light sources that are man-made, such as lamps, LEDs, or studio lights, used to illuminate a scene and control the lighting conditions.",
        image: "https://human.libretexts.org/@api/deki/files/157123/256px-Interior_Lighting_Artificial_31.png",
        link: "https://commons.wikimedia.org/wiki/File:Interior_Lighting_Artificial_31.png"
    },
    {
        term: "Aspect Ratio",
        definition: "The width-to-height ratio of the frame (e.g., 16:9).",
        image: "https://human.libretexts.org/@api/deki/files/157124/1024px-Aspect_ratios_for_film.png",
        link: "https://commons.wikimedia.org/wiki/File:Aspect_ratios_for_film.png"
    },
    {
        term: "Assistant Director",
        definition: "A key crew member responsible for managing the schedule, keeping the production on time, and ensuring smooth operations on set, including calling out cues and coordinating the cast and crew."
    },
    {
        term: "Auteur Theory",
        definition: "The idea that the director is the primary creative force behind a film, often imbuing it with a personal style or vision, making them the \"author\" of the movie."
    },
    {
        term: "Backlight",
        definition: "A light placed behind the subject to create separation from the background.",
        image: "https://human.libretexts.org/@api/deki/files/157125/512px-Rock_Backlighting_(3068450937).jpg",
        link: "https://commons.wikimedia.org/wiki/File:Rock_Backlighting_(3068450937).jpg"
    },
    {
        term: "Barn Doors",
        definition: "Metal flaps attached to lights to control the spread of light.",
        image: "https://human.libretexts.org/@api/deki/files/157126/512px-Elinchrom_Quadra_barn_door.jpg",
        link: "https://commons.wikimedia.org/wiki/File:Elinchrom_Quadra_barn_door.jpg"
    },
    {
        term: "Blocking",
        definition: "The precise staging of actors within the frame, as well as their movement during a scene, planned in advance to optimize composition, lighting, and camera angles."
    },
    {
        term: "CGI",
        definition: "Visual effects created through computer software to enhance or replace live-action scenes, commonly used for creating impossible or fantastical elements in film."
    },
    {
        term: "Character",
        definition: "A fictional persona brought to life through performance, dialogue, and actions in a film's narrative."
    },
    {
        term: "Chiaroscuro Lighting",
        definition: "A lighting technique that creates strong contrasts between light and dark, often used to emphasize mood or create a sense of depth.",
        image: "https://human.libretexts.org/@api/deki/files/157127/8537920722_d8e39e8374_q.jpg",
        link: "https://www.flickr.com/photos/67430875@N03/8537920722"
    },
    {
        term: "Cinematographer",
        definition: "Also known as the Director of Photography (DP), the cinematographer is responsible for the visual look of a film, including lighting, camera angles, and shot composition.",
        image: "https://human.libretexts.org/@api/deki/files/157128/512px-13-06-07_RaR_Fujinon_film_camera.jpg",
        link: "https://commons.wikimedia.org/wiki/File:13-06-07_RaR_Fujinon_film_camera.jpg"
    },
    {
        term: "Cinematic Language",
        definition: "The system of visual techniques, including camera work, editing, sound, and mise-en-scène, that filmmakers use to communicate with the audience."
    },
    {
        term: "Classical Acting",
        definition: "A traditional approach to acting that emphasizes a controlled, calculated portrayal of characters, focusing on external techniques and vocal precision."
    },
    {
        term: "Close-up",
        matchTerm: "Close-up",
        definition: "A shot that tightly frames a subject’s face or a specific object, emphasizing detail and emotion.",
        image: "https://human.libretexts.org/@api/deki/files/157129/512px-Zaragata_close-up.jpg",
        link: "https://commons.wikimedia.org/wiki/File:Zaragata_close-up.jpg"
    },
    {
        term: "Close up",
        matchTerm: "Close up",
        definition: "A shot that tightly frames a subject’s face or a specific object, emphasizing detail and emotion.",
        image: "https://human.libretexts.org/@api/deki/files/157129/512px-Zaragata_close-up.jpg",
        link: "https://commons.wikimedia.org/wiki/File:Zaragata_close-up.jpg"
    },
    {
        term: "Color Temperature",
        definition: "A measurement of the color of light, ranging from warm (orange/red) to cool (blue), used to create mood and simulate various lighting conditions in a scene."
    },
    {
        term: "Composition",
        definition: "The arrangement of visual elements (people, objects, settings) within the frame, which directs the viewer’s attention and conveys meaning."
    },
    {
        term: "C-Stand",
        definition: "A versatile stand used on set to hold lighting equipment, flags, or other accessories.",
        image: "https://human.libretexts.org/@api/deki/files/157130/512px-C-stand_retracted_and_gobo_arm_P1098.jpeg"
    },
    {
        term: "Continuity Editing",
        definition: "Ensuring that action flows logically and smoothly without drawing attention to the cuts."
    },
    {
        term: "Crane Shot",
        definition: "A shot taken from a crane that moves the camera up or down dramatically.",
        image: "https://human.libretexts.org/@api/deki/files/157140/Eiji_Tsuburaya_1934.jpg",
        link: "https://en.Wikipedia.org/wiki/Crane_shot#/media/File:Eiji_Tsuburaya_1934.jpg"
    },
    {
        term: "Cutting on Action",
        definition: "A technique where cuts are made during movement for a seamless transition."
    },
    {
        term: "Depth of Field",
        definition: "The range of distance in front of the camera where objects appear in sharp focus.",
        image: "https://human.libretexts.org/@api/deki/files/157141/Dof_blocks_f4_0.jpg",
        link: "https://en.Wikipedia.org/wiki/Depth_of_field#/media/File:Dof_blocks_f4_0.jpg"
    },
    {
        term: "Diegetic",
        definition: "Sounds that exist within the world of the film (e.g., music a character hears)."
    },
    {
        term: "Director",
        definition: "The creative leader of a film responsible for translating the script into visual storytelling and guiding the performances, camera work, and editing."
    },
    {
        term: "Dissolves",
        definition: "A type of transition where one image gradually fades out as another image fades in, often used to indicate a passage of time or change in location."
    },
    {
        term: "Dolly Shot",
        definition: "A shot where the camera is mounted on a dolly and moved along a track.",
        image: "https://human.libretexts.org/@api/deki/files/157142/AlamoFilming.jpg",
        link: "https://en.Wikipedia.org/wiki/Tracking_shot#/media/File:AlamoFilming.jpg"
    },
    {
        term: "Dutch Angle",
        definition: "A shot where the camera is tilted, creating a sense of unease or disorientation."
    },
    {
        term: "Editing",
        definition: "The process of selecting, arranging, and assembling shots into a coherent sequence to tell the film’s story, controlling pacing, continuity, and meaning."
    },
    {
        term: "Ellipsis",
        definition: "An editing technique where unnecessary time is skipped to keep the story moving."
    },
    {
        term: "Explicit Meaning",
        definition: "The obvious, surface-level meaning of a film, easily understood by the audience without needing to dig deeper into subtext or interpretation."
    },
    {
        term: "Fade-in",
        definition: "A gradual transition from a black screen to a fully visible image, commonly used at the beginning of a scene."
    },
    {
        term: "Fade-out",
        definition: "A gradual transition from an image to black, often used to signify the end of a scene or passage of time."
    },
    {
        term: "Fast Film Stock",
        definition: "Film that is more sensitive to light, allowing for shooting in lower light conditions."
    },
    {
        term: "Fill Light",
        definition: "A softer light to reduce shadows created by the key light."
    },
    {
        term: "Film Gauge",
        definition: "The size of the film stock, affecting the amount of detail captured."
    },
    {
        term: "Film Stock",
        definition: "The physical material on which images are captured during production."
    },
    {
        term: "Foley Artists",
        definition: "Technicians who recreate everyday sound effects to match on-screen actions."
    },
    {
        term: "Foley Sounds",
        definition: "Foley sounds are everyday sound effects that are added to a film or television show during post-production to enhance the audio experience."
    },
    {
        term: "Focus Puller",
        definition: "A crew member responsible for adjusting the focus of the lens during a shot."
    },
    {
        term: "Flashback",
        definition: "A narrative device that depicts past events in a film, often to provide background information or context for the current plot."
    },
    {
        term: "Flashforward",
        definition: "A narrative technique where the story jumps ahead in time to reveal events that will happen later, often used to build tension or provide foreshadowing."
    },
    {
        term: "Framing",
        definition: "The way subjects and objects are positioned within the camera's frame to create a specific composition, mood, or visual focus."
    },
    {
        term: "Frame Rate",
        definition: "The number of frames captured per second, typically 24 for cinema."
    },
    {
        term: "Gaffer",
        definition: "The chief lighting technician on a set, responsible for the design and execution of the lighting plan.",
        image: "https://human.libretexts.org/@api/deki/files/157969/Patrick_Shellenberger_in_a_production_photograph_on_the_set_of__Dim_Sum%252C_A_little_Bit_of_Heart_.jpg",
        link: "https://en.Wikipedia.org/wiki/Gaffer_(occupation)#/media/File:Patrick_Shellenberger_in_a_production_photograph_on_the_set_of_%22Dim_Sum,_A_little_Bit_of_Heart%22.jpg"
    },
    {
        term: "Handheld Shot",
        definition: "A shot where the camera is held by the operator, often creating a shaky effect."
    },
    {
        term: "High-Angle Shot",
        definition: "A shot where the camera looks down on a subject from a higher position, often making the subject appear small, weak, or vulnerable."
    },
    {
        term: "High-Key Lighting",
        definition: "A lighting style with bright, even light, often used in comedies and musicals."
    },
    {
        term: "Implicit Meaning",
        definition: "The deeper, often hidden meanings in a film, requiring interpretation of the subtext, symbols, or themes beyond the obvious plot."
    },
    {
        term: "J-Cut",
        definition: "A transition where the audio from the next scene begins before the visuals change."
    },
    {
        term: "Jump Cut",
        definition: "An abrupt cut that intentionally breaks continuity, often used for stylistic reasons."
    },
    {
        term: "Key Light",
        definition: "The main light source in a shot."
    },
    {
        term: "Keying",
        definition: "A visual effect technique where actors or objects are filmed in front of a green or blue screen, allowing different backgrounds or elements to be inserted digitally."
    },
    {
        term: "Kuleshov Effect",
        definition: "A concept where viewers derive more meaning from the sequence of two shots than from a single shot in isolation."
    },
    {
        term: "L-Cut",
        definition: "A transition where the audio from the previous scene continues into the next shot."
    },
    {
        term: "Leitmotif",
        definition: "A recurring musical theme associated with a specific character or idea."
    },
    {
        term: "Lens",
        definition: "The component of the camera responsible for focusing light onto the film or sensor."
    },
    {
        term: "Lighting",
        definition: "The use of light sources in a film to create mood, atmosphere, and depth, and to emphasize certain characters or parts of the scene."
    },
    {
        term: "Long Shot",
        definition: "A shot from a distance that shows the subject in their entirety, along with a considerable portion of their surroundings, often used to establish a scene’s setting."
    },
    {
        term: "Low-Angle Shot",
        definition: "A shot taken from below the subject, making them appear larger, more powerful, or intimidating."
    },
    {
        term: "Low-Key Lighting",
        definition: "A lighting technique creating strong contrast and deep shadows, often used in film noir."
    },
    {
        term: "Master Shot",
        definition: "A wide shot that captures the entire scene from start to finish."
    },
    {
        term: "Match Cut",
        definition: "A cut that joins two shots with similar visual elements or compositions."
    },
    {
        term: "Medium Shot",
        definition: "A shot that frames the subject from the waist up, balancing the focus between the character and their surroundings."
    },
    {
        term: "Method Acting",
        definition: "A technique where actors deeply immerse themselves into their characters by drawing on their own emotions and experiences to create realistic performances."
    },
    {
        term: "Mise-en-scène",
        definition: "Refers to everything that appears within the frame, including set design, lighting, actors, costumes, and props, all of which help to convey the film's tone and meaning."
    },
    {
        term: "Montage",
        definition: "A sequence of shots arranged to condense time, space, or information."
    },
    {
        term: "Motifs",
        definition: "Recurring visual, thematic, or auditory elements that help to reinforce a film’s themes or develop a character's arc."
    },
    {
        term: "Natural Light",
        definition: "Light that comes from natural sources like the sun or moon, often used in filmmaking to create a more authentic and realistic look."
    },
    {
        term: "Naturalistic Acting",
        definition: "A performance style that aims to reflect realistic, everyday behavior and speech, often using subtle gestures and dialogue."
    },
    {
        term: "Non-Diegetic",
        definition: "Sounds that only the audience can hear, not the characters in the film (e.g., background score)."
    },
    {
        term: "Over-the-Shoulder",
        definition: "A shot framed from behind a person’s shoulder, often used in conversations."
    },
    {
        term: "Pan",
        definition: "A horizontal camera movement from a fixed position."
    },
    {
        term: "Parallel Editing",
        definition: "Cutting back and forth between two or more simultaneous actions in different locations."
    },
    {
        term: "Practical Light",
        definition: "Light sources that appear naturally within a scene, such as lamps or streetlights, which are often integrated into the shot to create realistic lighting effects."
    },
    {
        term: "Prime Lens",
        definition: "A lens with a fixed focal length, offering a sharper image."
    },
    {
        term: "Props",
        definition: "Physical objects used by actors or present in a scene, contributing to the action or setting, like a book, a weapon, or a piece of furniture."
    },
    {
        term: "Rack Focus",
        definition: "Shifting focus within a shot to direct attention to different subjects."
    },
    {
        term: "Resolution",
        definition: "The level of detail in a video image, typically measured in pixels, with higher resolutions offering more clarity and sharpness in the picture."
    },
    {
        term: "Rule of Thirds",
        definition: "A guideline for composition that divides the frame into thirds for balanced images."
    },
    {
        term: "Score",
        definition: "Original music composed specifically for the film."
    },
    {
        term: "Seiyū",
        definition: "The Japanese term for a voice actor or voice actress. In Japan, seiyū are performers who provide the voices for characters in anime, video games, films, radio, and other media."
    },
    {
        term: "Set",
        definition: "The physical environment where the film’s action takes place, either a constructed location or a real-world site used for filming."
    },
    {
        term: "Set Design",
        definition: "The process of creating the physical surroundings in which the film’s scenes are shot, including the layout, furniture, and decoration to enhance storytelling."
    },
    {
        term: "Set Lights",
        definition: "The lighting equipment used on a film set to illuminate the actors and the scene, including key lights, fill lights, and backlights."
    },
    {
        term: "Setting",
        definition: "The time and place in which a film’s story unfolds, establishing the context for the characters and narrative."
    },
    {
        term: "Shot",
        definition: "A continuous capture of a span of action by a motion picture camera."
    },
    {
        term: "Slow Film Stock",
        definition: "Film less sensitive to light, requiring more light for proper exposure but offering sharper images."
    },
    {
        term: "Sound Bridge",
        definition: "An editing technique where sound from one scene continues into or overlaps with the next scene, helping to create smooth transitions."
    },
    {
        term: "Sound Design",
        definition: "The overall creation and manipulation of audio elements in a film, including dialogue, sound effects, and music, to enhance the narrative and emotional impact."
    },
    {
        term: "Sound Stage",
        definition: "A large, soundproofed space used for shooting interior scenes in controlled conditions, where sets can be built and lighting, sound, and camera work can be closely managed.",
        image: "https://human.libretexts.org/@api/deki/files/157148/Videowisconsinsoundstage.jpg",
        link: "https://en.Wikipedia.org/wiki/Sound_stage#/media/File:Videowisconsinsoundstage.jpg"
    },
    {
        term: "Soviet Montage",
        definition: "An editing style focusing on the juxtaposition of images to create meaning and evoke emotion."
    },
    {
        term: "Steadicam",
        definition: "A stabilizing rig that allows smooth handheld camera movement.",
        image: "https://human.libretexts.org/@api/deki/files/157146/Steadicam_and_operator_in_front_of_crowd.jpg",
        link: "https://en.Wikipedia.org/wiki/Steadicam#/media/File:Steadicam_and_operator_in_front_of_crowd.jpg"
    },
    {
        term: "Theme",
        definition: "The central ideas or messages of a film, often expressed through recurring motifs, dialogue, and visual storytelling."
    },
    {
        term: "Three-Point Lighting",
        definition: "A basic lighting setup with key, fill, and backlight.",
        image: "https://human.libretexts.org/@api/deki/files/157145/Three-point_lighting_diagram_(1).jpg",
        link: "https://en.Wikipedia.org/wiki/Three-point_lighting#/media/File:Three-point_lighting_diagram.svg"
    },
    {
        term: "Tilt",
        definition: "A vertical camera movement from a fixed position."
    },
    {
        term: "Tracking Shot",
        definition: "A shot that follows the subject’s movement, often achieved with a dolly or Steadicam.",
        image: "https://human.libretexts.org/@api/deki/files/157143/Newton_stabilized_remote_camera_head_on_a_tracking_car.jpg",
        link: "https://en.Wikipedia.org/wiki/Tracking_shot#/media/File:Newton_stabilized_remote_camera_head_on_a_tracking_car.jpg"
    },
    {
        term: "Transitions",
        definition: "Techniques used to move between scenes or shots, such as cuts, fades, dissolves, and wipes, helping to control the pace and narrative flow of the film."
    },
    {
        term: "Zoom Lens",
        definition: "A lens that allows the focal length to be adjusted without changing the lens itself.",
        image: "https://human.libretexts.org/@api/deki/files/157144/Nikkor_28-200_zoom.jpg",
        link: "https://en.Wikipedia.org/wiki/Zoom_lens#/media/File:Nikkor_28-200_zoom.jpg"
    },
    {
        term: "Visual Lexicon",
        definition: "The “vocabulary” of images, symbols, and visual conventions used by filmmakers to communicate ideas and emotions through cinematic language."
    },
    // Production Roles
    {
        term: "Best Boy",
        definition: "The primary assistant to the Gaffer or Key Grip, responsible for equipment, personnel management, and daily logistics."
    },
    {
        term: "Grip",
        definition: "Technicians who build and maintain the equipment that supports cameras (tripods, dollies) and lighting (stands, flags, nets)."
    },
    {
        term: "Line Producer",
        definition: "The producer who creates the budget and manages the daily logistics and administration of a production."
    },
    {
        term: "Producer",
        definition: "The person responsible for the financial and managerial aspects of making a film, from development to distribution."
    },
    {
        term: "Production Designer",
        definition: "The creative lead responsible for the overall visual look of the production, including sets, costumes, props, and locations."
    },
    {
        term: "Showrunner",
        definition: "The person who has overall creative authority and management responsibility for a television program."
    },
    // Pre-Production
    {
        term: "Call Sheet",
        definition: "A daily schedule issued to the cast and crew listing call times, locations, and scenes to be shot."
    },
    {
        term: "Greenlight",
        definition: "The formal approval given by a studio or financier to move a project from development into pre-production and production."
    },
    {
        term: "Logline",
        definition: "A one-sentence summary of a film's story, often used for pitching."
    },
    {
        term: "Screenplay",
        definition: "The written script of a film, including acting instructions and dialogue."
    },
    {
        term: "Shot List",
        definition: "A detailed list of every shot the director plans to capture during production, often ordered for logistical efficiency."
    },
    {
        term: "Storyboard",
        definition: "A sequence of drawings, typically with some directions and dialogue, representing the shots planned for a movie or TV production."
    },
    {
        term: "Treatment",
        definition: "A written summary of a film's story, often used to pitch the idea before a full script is written."
    },
    // Cinematography & Shots
    {
        term: "180-Degree Rule",
        definition: "A cinematography guideline that states that two characters in a scene should maintain the same left/right relationship to one another."
    },
    {
        term: "Aerial Shot",
        definition: "A shot taken from an airborne device, generally a drone, helicopter, or blimp."
    },
    {
        term: "Ambient Light",
        definition: "The available light in an encironment, whether natural (sun, moon) or artificial (streetlights, practicals)."
    },
    {
        term: "Boom Shot",
        definition: "A shot taken from a camera mounted on a boom (crane) that can move up and down."
    },
    {
        term: "Coverage",
        definition: "The amount of footage shot and different camera angles used to capture a scene."
    },
    {
        term: "Establishing Shot",
        definition: "A shot, usually from a distance, that shows the relationship between characters, objects, and their setting."
    },
    {
        term: "Extreme Close-Up",
        definition: "A shot that frames a subject very tightly, isolating a specific detail (e.g., eyes, lips, a ring)."
    },
    {
        term: "Eye Level Shot",
        definition: "A shot taken at the height of the subject's eyes, creating a neutral perspective."
    },
    {
        term: "Magic Hour",
        definition: "The time of day just after sunrise or before sunset when the light is reddish and softer."
    },
    {
        term: "POV (Point of View)",
        matchTerm: "POV",
        definition: "A shot that shows what a character is looking at, represented through the camera."
    },
    {
        term: "Two Shot",
        definition: "A shot in which the frame encompasses two people, typically from the chest up."
    },
    {
        term: "White Balance",
        definition: "Adjusting the camera's color settings to match the color temperature of the light source, ensuring white looks white."
    },
    {
        term: "Wide Shot",
        definition: "A shot that shows the subject within their surrounding environment."
    },
    {
        term: "Whip Pan",
        definition: "An extremely fast pan that blurs the image, often used as a transition."
    },
    // Story & Narrative
    {
        term: "Antagonist",
        definition: "The character, group, or force that stands in opposition to the protagonist."
    },
    {
        term: "Protagonist",
        definition: "The main character around whom the story revolves."
    },
    {
        term: "Climax",
        definition: "The turning point of the narrative where the tension hits the highest point."
    },
    {
        term: "Denouement",
        definition: "The final part of a play, movie, or narrative in which the strands of the plot are drawn together and matters are explained or resolved."
    },
    {
        term: "Exposition",
        definition: "The insertion of background information within a story or narrative."
    },
    {
        term: "Fourth Wall",
        definition: "The imaginary barrier that separates the actors from the audience."
    },
    {
        term: "Genre",
        definition: "A category of artistic composition, as in music or literature, characterized by similarities in form, style, or subject matter."
    },
    {
        term: "MacGuffin",
        definition: "A plot device in the form of some goal, desired object, or other motivator that the protagonist pursues, often with little or no narrative explanation."
    },
    {
        term: "Subtext",
        definition: "The content of a book, play, musical work, film, video game, or television series which is not announced explicitly by the characters (or author) but is implicit or becomes something understood by the observer."
    },
    // Post-Production
    {
        term: "Cross-Cutting",
        definition: "The editing technique of alternating, interweaving, or interspersing one narrative action (scene) with another."
    },
    {
        term: "Dailies",
        definition: "The raw, unedited footage shot during the making of a motion picture."
    },
    {
        term: "Insert Shot",
        definition: "A shot, usually in close-up, that emphasizes a segment of a larger scene."
    },
    {
        term: "Reaction Shot",
        definition: "A cut away from the main action to show a character's reaction to it."
    }
];

// Logic to process glossary
document.addEventListener('DOMContentLoaded', () => {
    // Sort terms by length (longest first) to prevent partial matching issues (e.g., matching "Light" inside "Artificial Light")
    const sortedTerms = glossaryTerms.sort((a, b) => (b.matchTerm || b.term).length - (a.matchTerm || a.term).length);

    // Create Tooltip Element
    const tooltip = document.createElement('div');
    tooltip.className = 'glossary-tooltip';
    document.body.appendChild(tooltip);

    // Target content areas (exclude nav, footer, etc.)
    const contentAreas = document.querySelectorAll('.textbook-content, .hero-content p, .intro-main p, .card p');

    contentAreas.forEach(area => {
        processNode(area, sortedTerms);
    });

    // Tooltip Logic
    let currentTooltipTerm = null;

    document.querySelectorAll('.glossary-term').forEach(term => {
        term.addEventListener('mouseenter', (e) => {
            const termKey = e.target.getAttribute('data-term');
            const data = glossaryTerms.find(t => (t.matchTerm || t.term) === termKey);

            if (data) {
                let content = `<strong>${data.term}</strong><br>${data.definition}`;
                if (data.image) {
                    content += `<br><img src="${data.image}" alt="${data.term}" style="max-width:100%; margin-top:10px; border-radius:4px;">`;
                }
                if (data.caption) {
                    content += `<br><small>${data.caption}</small>`;
                }
                tooltip.innerHTML = content;
                tooltip.style.display = 'block';

                // Positioning
                const rect = e.target.getBoundingClientRect();
                let top = rect.bottom + window.scrollY + 5;
                let left = rect.left + window.scrollX;

                // Adjust if off screen
                if (left + 300 > window.innerWidth) {
                    left = window.innerWidth - 310;
                }

                tooltip.style.top = `${top}px`;
                tooltip.style.left = `${left}px`;
            }
        });

        term.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    });
});

function processNode(node, terms) {
    // Process text nodes only
    if (node.nodeType === 3) {
        let content = node.nodeValue;
        let originalContent = content;
        let replaced = false;

        // Skip if inside specific tags (links, already processed, headers)
        if (node.parentNode.tagName === 'A' ||
            node.parentNode.tagName === 'H1' ||
            node.parentNode.tagName === 'H2' ||
            node.parentNode.tagName === 'H3' ||
            node.parentNode.classList.contains('glossary-term')) {
            return;
        }

        terms.forEach(termData => {
            if (replaced) return; // Simple avoidance of double-wrapping for now

            const term = termData.matchTerm || termData.term;
            // distinct regex to avoid replacing parts of words
            const regex = new RegExp(`\\b(${escapeRegExp(term)})\\b`, 'i');

            if (regex.test(content)) {
                // Split logic to preserve DOM structure would be complex, 
                // so we use a simpler replacement wrapper strategy for this iteration
                // Note: This replaces the *first* instance found in this text node for simplicity and performance
                const match = content.match(regex);
                if (match) {
                    // Create wrapper
                    const span = document.createElement('span');
                    span.className = 'glossary-term';
                    span.setAttribute('data-term', term);
                    span.textContent = match[0]; // Use original casing

                    // Split text node
                    const index = match.index;
                    const before = content.slice(0, index);
                    const after = content.slice(index + match[0].length);

                    const afterNode = document.createTextNode(after);
                    const beforeNode = document.createTextNode(before);

                    // Modify DOM
                    node.parentNode.insertBefore(beforeNode, node);
                    node.parentNode.insertBefore(span, node);
                    node.parentNode.insertBefore(afterNode, node);
                    node.parentNode.removeChild(node);

                    replaced = true;

                    // Recursively process the rest (afterNode) to catch multiple terms in one block
                    processNode(afterNode, terms);
                }
            }
        });
    } else if (node.nodeType === 1 && !['SCRIPT', 'STYLE', 'IMG', 'IFRAME'].includes(node.tagName)) {
        // Recurse into children
        Array.from(node.childNodes).forEach(child => processNode(child, terms));
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
