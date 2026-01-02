# Tokyo in Film - Open Courseware

Location-based filmmaking curriculum designed for study abroad programs in Tokyo. This Open Educational Resource (OER) guides students through the three phases of film production using the city as a living set.

## Curriculum Structure

The course is divided into three distinct phases, mirroring the professional filmmaking workflow:

### Phase 1: Pre-Production
**Focus:** Planning, location scouting, and visual research.
- **Key Modules:** Screenwriting, Storyboarding, Scouting.
- **Tools:**
    - *Location Mini-Doc Form*: A structured scouting report.
    - *Pilgrimage Shots Plan*: Workflow for recreating specific anime/cinema frames.

### Phase 2: Production
**Focus:** Cinematography, lighting, and directing.
- **Key Modules:** Camera operation, Light, Sound.
- **Tools:**
    - *Production Worksheet*: Daily filming log.
    - *Choreographed Motion*: Advanced unit for action blocking and camera movement.

### Phase 3: Post-Production
**Focus:** Editing, sound design, and color grading.
- **Key Modules:** Assembly, Foley, Color.
- **Tools:**
    - *Favorite Place Add-On*: Narrative editing exercise.
    - *Miniatures in Motion*: Scale and perspective exercise.

## Technical Setup for Educators

### 1. Website Structure
The site is built with static HTML/CSS for easy hosting (GitHub Pages, Netlify) and zero maintenance.
- `index.html`: Course landing page and interactive map.
- `glossary.html`: Searchable database of film terms.
- `**/guide.html`: The main interactive textbook pages for each phase.

### 2. Google Forms Integration
The course uses Google Forms for student submissions. To deploy this course:
1.  **Copy the Scripts**: Use the provided scripts (found in the project history or `create_email_receipt_script.js`) to generate your own Google Forms.
2.  **Embed**: Replace the `iframe` `src` attributes in the `guide.html` files with your own published Form URLs.
3.  **Automation**: The `create_email_receipt_script.js` utility allows you to automatically email students a copy of their plans upon submission.

### 3. H5P Interactive Content
This course integrates H5P modules from LibreTexts. These are correctly embedded and require no maintenance.

## OER & Licensing
This curriculum is adapted from *Moving Pictures* by Russell Sharman and tailored for experiential learning in Tokyo. It is designed to be free and remixable.

## Customization
- **Map**: The interactive map (`index.html`) is a Google MyMap embed. You can replace the `iframe` with your own custom map.
- **Glossary**: Terms are stored in `js/glossary.js`. You can easily add or remove terms by editing the array in that file.

---
*Created for the "Tokyo in Film" Study Abroad Program.*
