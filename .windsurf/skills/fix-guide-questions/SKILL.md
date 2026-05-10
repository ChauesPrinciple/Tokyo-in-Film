---
description: Fix decision-making guide questions that should be interactive but are displaying as static info boxes
tags: [guides, scenario, questions, interactive]
---

# Fix Guide Questions Skill

## Purpose
This skill identifies and fixes reflection questions in the decision-making guides (pre-production, production, post-production) that are incorrectly marked as `type:'info'` when they should be interactive question types like `type:'check'` or `type:'tf'`.

## When to Use
- When guide questions are displaying as static text instead of interactive elements
- When "Reflection Questions" sections show info boxes instead of checkboxes or true/false buttons
- When reviewing or updating the scenario-based guides

## Files to Check
- `pre-production/pre-guide.js`
- `production/prod-guide.js`
- `post-production/post-guide.js`

## Question Types in scenario.js

### type:'info'
Static informational box with cyan border. No user interaction required.
```javascript
{type:'info', text:'This is just information.'}
```

### type:'tf'
True/False question with two buttons. Requires `correct:true` or `correct:false`.
```javascript
{type:'tf', question:'Statement to evaluate', correct:true}
```

### type:'mc'
Multiple choice with array of options. Requires `correct:` index.
```javascript
{type:'mc', question:'Question text', options:['A','B','C'], correct:0}
```

### type:'check'
Checkbox list for reflection. No correct answer tracking.
```javascript
{type:'check', question:'Reflect on:', options:['Item 1','Item 2','Item 3']}
```

## Common Issues

### Reflection Questions as Info
**Problem:** Questions like "How can you use our classtime / excursions to create content for your film?" are marked as `type:'info'`

**Fix:** Convert to `type:'check'` with grouped options:
```javascript
{type:'check',
 question:'Reflect on the following creative strategies:',
 options:[
   'How can you use our classtime / excursions to create content for your film?',
   'Solutions do not have to be complicated; with a little creativity, we can create incredible effects with the smallest items.'
 ]}
```

## Search Pattern
Use grep to find all info-type questions:
```bash
grep -n "type:'info'" pre-production/pre-guide.js production/prod-guide.js post-production/post-guide.js
```

## Verification
After fixing, check the live guide pages:
- `/pre-production/guide.html`
- `/production/guide.html`
- `/post-production/guide.html`

The "Reflection Questions" section should show interactive checkboxes, not static cyan info boxes.


---

## Sources

This skill is **procedural** — it does not make film-craft claims. Per `CITATION_PROTOCOL.md` the citation discipline does not apply to procedural workflows (deployment, formatting, encoding, file management). If this skill is later extended with craft-level reasoning, replace this block with citations to the relevant entries in `SOURCE_INDEX.md`.