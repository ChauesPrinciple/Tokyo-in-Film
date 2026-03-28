---
description: Create a new branching scenario guide using the scenario.js engine
---

# Create Scenario Guide Workflow

## When to Use
When creating a new interactive decision-making guide that uses the scenario.js branching engine.

## Existing Scenario Guides
- `/guides/` - 15 interactive worksheet pages
- `js/scenario.js` - Shared branching scenario engine
- `pre-guide.js`, `prod-guide.js`, `post-guide.js` - Module-specific guides

## Steps

### 1. Define Guide Purpose
- What decisions will students make?
- What filmmaking concept does it teach?
- Which module does it support?
- What's the learning outcome?

### 2. Map Decision Tree
- Start with opening scenario
- Identify key decision points
- Map possible paths and outcomes
- Determine feedback for each choice
- Plan convergence or divergence

### 3. Write Scenario Content
- Opening context/situation
- Decision prompts (clear, specific)
- Choice options (2-4 per decision)
- Consequence descriptions
- Reflection questions
- Final summary/takeaway

### 4. Create JavaScript File
Use existing guides as templates:
- `pre-guide.js` for pre-production topics
- `prod-guide.js` for production topics
- `post-guide.js` for post-production topics

### 5. Structure the Data
```javascript
const scenarios = [
  {
    id: 'unique-id',
    title: 'Guide Title',
    description: 'Brief description',
    questions: [
      // Question objects here
    ]
  }
];
```

### 6. Question Types

**Info Type** (Non-interactive text)
```javascript
{
  type: 'info',
  text: 'Informational text here'
}
```

**Question Type** (Interactive decision)
```javascript
{
  type: 'question',
  text: 'What do you do?',
  options: [
    {
      text: 'Option A',
      feedback: 'Result of choosing A',
      next: 2  // Jump to question index 2
    },
    {
      text: 'Option B',
      feedback: 'Result of choosing B',
      next: 3  // Jump to question index 3
    }
  ]
}
```

**Reflection Type** (Open-ended thinking)
```javascript
{
  type: 'reflection',
  text: 'How would you approach this challenge?'
}
```

### 7. Common Mistakes to Avoid

**Using 'info' for Questions**
- Bad: `{type: 'info', text: 'What would you do?'}`
- Good: `{type: 'question', text: 'What would you do?', options: [...]}`
- Bad: `{type: 'info', text: 'How can you use our classtime?'}`
- Good: `{type: 'reflection', text: 'How can you use our classtime?'}`

**Missing 'next' Property**
- All options must have `next` to navigate
- Use `-1` for end of scenario
- Index is 0-based

**Unclear Feedback**
- Feedback should explain consequences
- Be specific about what happens
- Connect to learning objective

### 8. Write Guide Content

**Opening Context**
- Set the scene clearly
- Establish constraints
- Present the challenge
- Motivate the decision

**Decision Points**
- 2-4 options per decision
- Each option should be viable
- Consequences should teach
- Avoid obvious "wrong" answers

**Feedback**
- Explain what happens
- Why this outcome occurred
- What to consider next time
- Connect to filmmaking principles

**Reflection Questions**
- Use `type: 'reflection'`
- Open-ended prompts
- Encourage critical thinking
- No right/wrong answers

### 9. Create HTML Page

**Basic Structure**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guide Title - Tokyo in Film</title>
  <link rel="stylesheet" href="../style.css?v=12">
</head>
<body>
  <div class="tif-container">
    <h1>Guide Title</h1>
    <div id="scenario-container"></div>
  </div>
  
  <script src="../js/scenario.js"></script>
  <script src="guide-name.js"></script>
  <script>
    renderScenario('unique-id', 'scenario-container');
  </script>
</body>
</html>
```

### 10. Test Thoroughly

**Test All Paths**
- Click through every option
- Verify all `next` indices work
- Check for dead ends
- Ensure reflection questions appear

**Test Question Types**
- Info displays as text box
- Questions show clickable options
- Reflections show text input
- Feedback appears correctly

**Test on Devices**
- Desktop browser
- Mobile browser
- Different screen sizes
- Touch interactions

### 11. Integrate into Course

**Add to Module**
- Link from relevant module page
- Describe guide purpose
- Explain when to use it
- Set expectations

**Add to Free Guides**
- List in `/free-guides.html`
- Categorize appropriately
- Provide description
- Link correctly

**Update Navigation**
- Ensure back links work
- Add to module navigation
- Test all links

### 12. Deploy

Use `/deploy-updates` workflow:
- Commit JavaScript and HTML files
- Push to GitHub
- Verify on live site
- Test all interactions

## Example Scenarios

### Pre-Production Guide
**Topic**: Location Scouting in Tokyo
- Decision: Choose between 3 locations
- Considerations: Permissions, crowds, lighting
- Outcomes: Different filming challenges
- Reflection: How to adapt script to location

### Production Guide
**Topic**: On-Set Problem Solving
- Decision: Camera battery dies mid-scene
- Options: Different solutions
- Consequences: Impact on schedule/quality
- Reflection: Prevention strategies

### Post-Production Guide
**Topic**: Editing Choices
- Decision: Scene pacing options
- Options: Fast cuts, slow cuts, mixed
- Consequences: Different emotional impacts
- Reflection: When to use each approach

## Related Skills
- `fix-guide-questions` - Fix question type issues
- `maintain-writing-voice` - Consistent pedagogical tone
- `design-worksheets` - Pedagogical framework

## Related Workflows
- `/create-new-worksheet` - Companion worksheets
- `/update-module-content` - Integrate into modules
- `/deploy-updates` - Push to live site

## Quality Checklist

**Content**
- [ ] Clear learning objective
- [ ] Realistic scenarios
- [ ] Viable options (no obvious wrong answers)
- [ ] Specific, actionable feedback
- [ ] Reflection questions included
- [ ] Tokyo context integrated

**Technical**
- [ ] All question types correct
- [ ] All `next` indices valid
- [ ] No dead ends
- [ ] Scenario ID unique
- [ ] JavaScript syntax valid
- [ ] HTML structure correct

**User Experience**
- [ ] Clear instructions
- [ ] Intuitive navigation
- [ ] Mobile-friendly
- [ ] Feedback helpful
- [ ] Engaging and educational

**Integration**
- [ ] Linked from module
- [ ] Listed in free guides
- [ ] Navigation working
- [ ] Deployed successfully

## Scenario.js Reference

### Question Object Properties
- `type`: 'info', 'question', or 'reflection'
- `text`: The question or information text
- `options`: Array of option objects (for 'question' type)
  - `text`: Option text
  - `feedback`: Result description
  - `next`: Index of next question (-1 for end)

### Rendering Function
```javascript
renderScenario(scenarioId, containerId);
```

### Best Practices
- Keep scenarios focused (5-10 decisions max)
- Provide meaningful feedback
- Use reflection questions strategically
- Test all paths thoroughly
- Make options equally viable
