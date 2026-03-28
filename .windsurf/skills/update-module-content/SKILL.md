---
description: Edit and update content in pre-production, production, and post-production module pages
tags: [modules, content, editing, textbook]
---

# Update Module Content Skill

## Purpose
Edit textbook module pages while preserving structure, navigation, and UTF-8 encoding.

## Module Structure

### Pre-Production (6 modules)
- `pre-production/1.1-script-breakdown.html`
- `pre-production/1.2-storyboarding.html`
- `pre-production/1.3-shot-lists.html`
- `pre-production/1.4-location-scouting.html`
- `pre-production/1.5-casting-rehearsal.html`
- `pre-production/1.6-cinematography.html`
- `pre-production/guide.html` (decision-making guide)

### Production (5 modules)
- `production/2.1-production-stage.html`
- `production/2.2-camera-work.html`
- `production/2.3-blocking-staging.html`
- `production/2.4-lighting-sound.html`
- `production/2.5-directing-actors.html`
- `production/guide.html` (decision-making guide)

### Post-Production (5 modules)
- `post-production/3.1-editing-basics.html`
- `post-production/3.2-color-grading.html`
- `post-production/3.3-sound-design.html`
- `post-production/3.4-vfx-compositing.html`
- `post-production/3.5-final-export.html`
- `post-production/guide.html` (decision-making guide)

## Standard Module Components

### Required Elements
1. **Navigation bar** - Links to all sections
2. **TOC number** - e.g., `<span class="toc-number">1.1</span>`
3. **Chapter banner** - GIF header image
4. **Main content** - Wrapped in `<div class="textbook-content">`
5. **Assignments section** - In-class and homework tasks
6. **Footer** - Standard across all pages

### CSS and Scripts
All modules load:
- `style.css?v=12` (current version)
- `js/scroll-animate.js` (scroll reveal animations)
- `js/glossary.js` (inline term tooltips)

## Editing Guidelines

### Content Updates
When editing module content:
- Maintain existing HTML structure
- Preserve all navigation links
- Keep TOC numbers consistent
- Don't remove chapter banners
- Maintain assignment structure

### Adding New Content
Use existing patterns:
```html
<h2>Section Title</h2>
<p>Paragraph text with <span class="glossary-term">technical terms</span>.</p>

<h3>Subsection</h3>
<ul>
  <li><strong>Point:</strong> Description</li>
</ul>
```

### Embedding Media
YouTube videos:
```html
<div class="video-container">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID" 
          allowfullscreen loading="lazy"></iframe>
</div>
```

Images:
```html
<img src="../path/to/image.jpg" alt="Description" class="chapter-banner">
```

### Assignment Sections
Standard assignment structure:
```html
<h2>In-Class Assignment</h2>
<div class="assignment-box">
  <h3>Assignment Title</h3>
  <p>Description...</p>
  
  <h4>Steps</h4>
  <ol>
    <li>Step 1</li>
    <li>Step 2</li>
  </ol>
  
  <h4>Deliverables</h4>
  <ul>
    <li>Item 1</li>
  </ul>
</div>
```

## UTF-8 Encoding
**CRITICAL:** Always use UTF-8 encoding when editing:

PowerShell:
```powershell
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
# Make edits...
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
```

Python:
```python
with open('file.html', 'r', encoding='utf-8') as f:
    content = f.read()
# Make edits...
with open('file.html', 'w', encoding='utf-8') as f:
    f.write(content)
```

## Navigation Updates
If adding/removing modules, update navigation in:
1. `index.html` (main navigation)
2. All module pages (nav bar)
3. `scene-project.html` (if relevant)

## Testing Checklist
After editing a module:
- [ ] Page loads without errors
- [ ] Navigation links work
- [ ] Images/videos display
- [ ] Glossary terms have tooltips
- [ ] Scroll animations work
- [ ] Assignments are readable
- [ ] No encoding corruption
- [ ] Mobile responsive layout intact

## Common Patterns

### Highlighting Important Info
```html
<div class="info-box">
  <h4>Important Note</h4>
  <p>Key information...</p>
</div>
```

### Code Examples
```html
<pre><code class="language-javascript">
// Code example
const example = "value";
</code></pre>
```

### Glossary Terms
Wrap technical terms:
```html
<span class="glossary-term">Mise-en-scène</span>
```

## Version Control
Before major edits:
```bash
git add path/to/module.html
git commit -m "Update module X.X: description of changes"
```

This allows easy rollback if needed.

## Related Skills
- **update-css-version** - If you modify styles
- **fix-encoding-issues** - If Japanese text gets corrupted
- **add-glossary-terms** - If adding new technical terms
