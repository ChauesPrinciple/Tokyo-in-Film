---
description: Set up a new assignment from concept to submission system
---

# Setup New Assignment Workflow

## When to Use
When creating a complete new assignment including instructions, rubric, and submission system.

## Steps

### 1. Define Assignment Scope
- What skill will students practice?
- Which module does it support?
- Individual or group project?
- What's the deliverable format?
- How long should it take?

### 2. Set Learning Objectives
- Specific skills to demonstrate
- Technical competencies required
- Creative elements expected
- Process documentation needed

### 3. Create Assignment Instructions

**Use Standard Format**:
1. **Title**: Clear, descriptive
2. **Overview**: What and why
3. **Learning Objectives**: What you'll master
4. **Requirements**: Specific deliverables
5. **Instructions**: Step-by-step process
6. **Examples**: Course film references
7. **Tokyo Context**: Local considerations
8. **Assessment**: How it's graded
9. **Submission**: What, where, when

**Write with Clarity**:
- Use `maintain-writing-voice` skill
- Direct and encouraging tone
- Specific, actionable steps
- Visual examples
- Realistic expectations

### 4. Design Assessment Rubric

Use `create-assessment-rubrics` skill:
- Define categories (4-5 max)
- Set performance levels (Exemplary, Proficient, Developing, Beginning)
- Weight categories appropriately
- Provide specific criteria
- Include examples

**Standard Categories**:
- Technical Execution (20-30%)
- Creative Choices (20-30%)
- Storytelling/Content (20-30%)
- Process/Documentation (10-20%)
- Presentation (10-20%)

### 5. Create Supporting Materials

**Worksheets**:
- Use `/create-new-worksheet` workflow
- Planning templates
- Shot lists
- Storyboard templates
- Reflection guides

**Examples**:
- Course film references
- Student work samples (with permission)
- Step-by-step demonstrations
- Common mistakes to avoid

**Resources**:
- Technical guides
- Software tutorials
- Location suggestions
- Equipment lists

### 6. Set Up Google Form (if needed)

Use `manage-google-forms` skill:
- Create submission form
- Required fields (name, file link, etc.)
- Optional reflection questions
- Confirmation message
- Response collection

**Standard Form Fields**:
- Student name
- Assignment title
- Link to video/document
- Reflection question 1
- Reflection question 2
- Any challenges faced?
- Anything you're proud of?

### 7. Create Assignment Page

**HTML Structure**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Assignment Title - Tokyo in Film</title>
  <link rel="stylesheet" href="../style.css?v=12">
</head>
<body>
  <div class="tif-container">
    <h1>Assignment Title</h1>
    
    <section class="assignment-overview">
      <!-- Overview content -->
    </section>
    
    <section class="assignment-requirements">
      <!-- Requirements -->
    </section>
    
    <section class="assignment-instructions">
      <!-- Step-by-step -->
    </section>
    
    <section class="assignment-examples">
      <!-- Course film examples -->
    </section>
    
    <section class="assignment-rubric">
      <!-- Assessment criteria -->
    </section>
    
    <section class="assignment-submission">
      <!-- How to submit -->
    </section>
  </div>
</body>
</html>
```

### 8. Integrate into Module

**Link from Module Page**:
- Add assignment link to relevant module
- Describe assignment briefly
- Indicate difficulty level
- Set due date expectations

**Update Module Navigation**:
- Ensure assignment appears in sequence
- Add to module index
- Update breadcrumbs
- Test all links

### 9. Add to Course Calendar

**Timeline Considerations**:
- When is it introduced?
- How long to complete?
- When is it due?
- Does it build on previous work?
- Does future work depend on it?

**Sequencing**:
- Pre-production → Production → Post-production
- Simple → Complex
- Individual → Group
- Technical → Creative

### 10. Create Submission System

**Option A: Google Form**
- Create form with required fields
- Embed in assignment page
- Set up response collection
- Configure notifications

**Option B: File Upload**
- Specify file naming convention
- Indicate file format requirements
- Provide upload location
- Set file size limits

**Option C: Link Submission**
- YouTube/Vimeo upload instructions
- Google Drive sharing settings
- Link submission form
- Privacy settings guidance

### 11. Prepare Grading Materials

**Rubric Document**:
- Printable or digital rubric
- Space for comments
- Score calculation
- Feedback template

**Grading Workflow**:
- How to access submissions
- Viewing/downloading process
- Feedback delivery method
- Grade recording system

**Example Feedback**:
- Positive opening
- Category-specific notes
- Actionable suggestions
- Encouraging close

### 12. Test Assignment End-to-End

**Student Perspective**:
- Read instructions for clarity
- Check all links work
- Verify examples load
- Test submission process
- Ensure rubric is clear

**Instructor Perspective**:
- Submission collection works
- Grading rubric is complete
- Feedback system functional
- Timeline is realistic

### 13. Deploy and Announce

**Deploy**:
- Use `/deploy-updates` workflow
- Commit all files
- Push to GitHub
- Verify on live site

**Announce to Students**:
- Email or announcement
- Highlight key points
- Clarify due date
- Offer office hours

### 14. Monitor and Support

**During Assignment Period**:
- Answer questions promptly
- Clarify confusing points
- Provide examples if needed
- Extend deadline if necessary

**Common Issues**:
- Technical problems
- Unclear instructions
- Resource access
- Time management

### 15. Collect and Grade

**Collection**:
- Download all submissions
- Organize by student
- Check for completeness
- Note late submissions

**Grading**:
- Use rubric consistently
- Provide specific feedback
- Record grades
- Return to students

### 16. Reflect and Improve

**Post-Assignment Review**:
- What worked well?
- What was confusing?
- Were expectations realistic?
- How can it improve?

**Update for Next Time**:
- Revise unclear instructions
- Add missing examples
- Adjust timeline
- Update rubric

## Assignment Types

### Technical Exercise
**Focus**: Specific technique mastery
**Duration**: 1-2 weeks
**Deliverable**: Short video demonstrating technique
**Example**: Three-Shot Exercise, Action Choreography

### Film Analysis
**Focus**: Critical viewing and writing
**Duration**: 1 week
**Deliverable**: Written analysis (500-1000 words)
**Example**: Visual Foreshadowing Analysis, Fight Scene Structure

### Creative Project
**Focus**: Original filmmaking
**Duration**: 2-4 weeks
**Deliverable**: Short film or scene
**Example**: Tokyo Location Scene, Practical Effects Showcase

### Planning Document
**Focus**: Pre-production skills
**Duration**: 1 week
**Deliverable**: Storyboard, shot list, script
**Example**: Location Scout Report, Shot List for Scene

### Reflection Assignment
**Focus**: Critical thinking and growth
**Duration**: Ongoing or 1 week
**Deliverable**: Written reflection
**Example**: Filming Journal, Process Documentation

## Related Skills
- `design-worksheets` - Supporting materials
- `create-assessment-rubrics` - Grading criteria
- `maintain-writing-voice` - Consistent tone
- `manage-google-forms` - Submission system

## Related Workflows
- `/create-new-worksheet` - Assignment worksheets
- `/update-module-content` - Module integration
- `/deploy-updates` - Publish assignment

## Quality Checklist

**Instructions**
- [ ] Clear learning objectives
- [ ] Specific requirements
- [ ] Step-by-step process
- [ ] Course film examples
- [ ] Tokyo context included
- [ ] Realistic timeline

**Assessment**
- [ ] Rubric created
- [ ] Categories weighted
- [ ] Criteria specific
- [ ] Examples provided
- [ ] Feedback template ready

**Submission**
- [ ] System set up
- [ ] Instructions clear
- [ ] Format specified
- [ ] Deadline stated
- [ ] Confirmation working

**Integration**
- [ ] Linked from module
- [ ] Navigation updated
- [ ] Resources accessible
- [ ] All links working

**Support**
- [ ] FAQ prepared
- [ ] Office hours scheduled
- [ ] Help resources listed
- [ ] Contact info provided

## Common Pitfalls

**Unclear Instructions**
- Too vague or abstract
- Missing steps
- Assumed knowledge
- No examples

**Unrealistic Expectations**
- Too complex for time given
- Requires unavailable resources
- Ignores Tokyo constraints
- Beyond skill level

**Poor Assessment**
- Vague rubric criteria
- Inconsistent grading
- No feedback
- Unclear standards

**Technical Issues**
- Broken submission system
- File format problems
- Access restrictions
- Platform incompatibility

## Emergency Adjustments

**If Assignment Too Hard**:
- Extend deadline
- Simplify requirements
- Provide more examples
- Offer extra support

**If Submission System Fails**:
- Set up alternative method
- Communicate clearly
- Extend deadline
- Test backup system

**If Instructions Unclear**:
- Post clarification
- Update assignment page
- Hold Q&A session
- Provide examples
