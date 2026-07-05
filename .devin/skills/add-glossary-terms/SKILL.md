---
description: Add new filmmaking terms to the searchable glossary system
tags: [glossary, terms, definitions, filmmaking]
---

# Add Glossary Terms Skill

## Purpose
Add new filmmaking terminology to the interactive glossary with proper categorization and inline tooltip support.

## Glossary System Overview
The glossary uses `js/glossary.js` which provides:
- Searchable term database (200+ terms)
- Category filtering
- Inline tooltips on module pages
- Alphabetical organization

## Term Structure
Each term in `glossary.js` follows this format:

```javascript
{
  term: "Term Name",
  definition: "Clear, concise definition",
  category: "Category Name"
}
```

## Categories
Existing categories in the glossary:
- Camera & Lenses
- Lighting
- Sound
- Editing
- Production Roles
- Shot Types
- Movement
- Composition
- Narrative Structure
- Post-Production
- Pre-Production
- Equipment

## Adding a New Term

### Step 1: Open glossary.js
```bash
code js/glossary.js
```

### Step 2: Locate the terms array
Find the `const glossaryTerms = [...]` array.

### Step 3: Add new term alphabetically
Insert the new term in alphabetical order within the array:

```javascript
{
  term: "Dutch Angle",
  definition: "A camera angle where the horizon line is tilted, creating a sense of unease or disorientation.",
  category: "Camera & Lenses"
},
```

**Important:** Ensure proper comma placement. Each term object needs a comma after it except the last one.

### Step 4: Test the glossary
1. Open `glossary.html` in browser
2. Search for the new term
3. Verify it appears in correct category
4. Check definition displays properly

## Inline Tooltips
Terms automatically become tooltips on module pages if:
1. Term is wrapped in `<span class="glossary-term">` tags
2. The glossary.js script is loaded on that page

Example in HTML:
```html
<span class="glossary-term">Dutch Angle</span>
```

## Best Practices

### Writing Definitions
- Keep definitions concise (1-2 sentences)
- Use clear, student-friendly language
- Avoid jargon unless necessary
- Include practical context when helpful

### Category Selection
- Choose the most specific category
- If term fits multiple categories, pick primary use
- Consider adding new category if 5+ terms don't fit existing ones

### Term Naming
- Use industry-standard terminology
- Include common alternate names in definition
- Capitalize proper nouns only

## Common Issues

### Term not appearing in search
- Check for typos in term name
- Verify proper JSON syntax (commas, quotes)
- Clear browser cache

### Tooltip not working
- Ensure `glossary.js` is loaded on page
- Check span class is exactly `glossary-term`
- Verify term name matches exactly (case-sensitive)

### Category not showing
- Category name must match existing categories exactly
- Check for extra spaces or typos

## Bulk Adding Terms
For adding multiple terms, use this template:

```javascript
{term: "Term 1", definition: "Definition 1", category: "Category"},
{term: "Term 2", definition: "Definition 2", category: "Category"},
{term: "Term 3", definition: "Definition 3", category: "Category"}
```

Sort alphabetically before inserting into main array.

## Verification Checklist
- [ ] Term added in alphabetical order
- [ ] Definition is clear and concise
- [ ] Category is appropriate
- [ ] Proper comma placement
- [ ] No syntax errors in glossary.js
- [ ] Term appears in glossary.html search
- [ ] Category filter works correctly
- [ ] Tooltip works on module pages (if applicable)


---

## Sources

This skill is **procedural** — it does not make film-craft claims. Per `CITATION_PROTOCOL.md` the citation discipline does not apply to procedural workflows (deployment, formatting, encoding, file management). If this skill is later extended with craft-level reasoning, replace this block with citations to the relevant entries in `SOURCE_INDEX.md`.