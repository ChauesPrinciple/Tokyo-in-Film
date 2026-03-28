---
description: Update existing module content with new information, examples, or improvements
---

# Update Module Content Workflow

## When to Use
When revising existing pre-production, production, or post-production module pages with new content, examples, or improvements.

## Steps

### 1. Identify Update Need
- What content needs updating?
- Why is the update needed? (outdated, unclear, missing info)
- Which module(s) are affected?
- Is this a minor edit or major revision?

### 2. Read Existing Content
Use `read_file` tool with UTF-8 encoding:
- Review current module structure
- Note existing examples and references
- Identify voice and tone patterns
- Check for Japanese text (requires UTF-8)

### 3. Plan Changes
- List specific sections to update
- Gather new examples from course films
- Prepare Tokyo-specific additions
- Ensure consistency with course philosophy

### 4. Make Edits
**CRITICAL**: Use proper encoding for Japanese text
- Use `edit` or `multi_edit` tools
- Preserve UTF-8 encoding
- Maintain existing HTML structure
- Keep consistent voice and tone

**Encoding Rule**: 
- NEVER use plain PowerShell for bulk edits
- Always specify UTF-8 encoding
- Test Japanese characters after editing

### 5. Update Examples
- Add specific course film references
- Include timestamps for scenes
- Provide visual descriptions
- Connect to student assignments

### 6. Add Tokyo Context
- Suggest local filming locations
- Address practical constraints
- Provide cultural context
- Include seasonal considerations

### 7. Maintain Voice Consistency
Use `maintain-writing-voice` skill:
- Direct and encouraging
- Specific and visual
- Conversational but informed
- Honest about constraints

### 8. Update Related Content
- Check if other modules reference this content
- Update cross-links if needed
- Add new glossary terms if introduced
- Update worksheet references

### 9. Increment CSS Version (if styles changed)
If you modified `style.css`:
- Update version number (currently v=12)
- Update all HTML files that reference it
- Use `update-css-version` skill

### 10. Test Changes
- Verify UTF-8 encoding (Japanese text displays correctly)
- Check HTML validity
- Test links and navigation
- View on mobile and desktop
- Ensure no broken references

### 11. Deploy Updates
Use `/deploy-updates` workflow:
- Commit with descriptive message
- Push to GitHub (tokyo-main → main)
- Verify on live site
- Check for any issues

### 12. Document Changes
- Note what was updated
- Record rationale for changes
- Update any related documentation
- Inform students if significant changes

## Module-Specific Considerations

### Pre-Production Modules
- Script and storyboard examples
- Location scouting guidance
- Tokyo filming locations
- Cultural sensitivity notes

### Production Modules
- Camera and lighting techniques
- Smartphone-specific guidance
- On-set problem-solving
- Safety protocols

### Post-Production Modules
- Software tutorials (DaVinci Resolve, Audacity)
- Editing techniques
- Sound design guidance
- Export settings

## Related Skills
- `update-module-content` - General module editing framework
- `maintain-writing-voice` - Voice consistency
- `fix-encoding-issues` - UTF-8 Japanese text handling
- `update-css-version` - Cache-busting for style changes
- `add-glossary-terms` - New terminology

## Related Workflows
- `/deploy-updates` - Deploy changes to live site
- `/create-new-worksheet` - Add supporting worksheets
- `/add-new-film-critique` - Add film analysis content

## Quality Checklist

**Content Quality**
- [ ] Information accurate and current
- [ ] Examples specific and relevant
- [ ] Tokyo context included
- [ ] Course films referenced
- [ ] Clear and actionable

**Technical Quality**
- [ ] UTF-8 encoding preserved
- [ ] Valid HTML5
- [ ] Links working
- [ ] Images loading
- [ ] Mobile-responsive

**Voice and Tone**
- [ ] Consistent with existing content
- [ ] Direct and encouraging
- [ ] Specific and visual
- [ ] Culturally sensitive

**Integration**
- [ ] Cross-references updated
- [ ] Glossary terms added
- [ ] Navigation working
- [ ] Related modules consistent

## Common Update Types

### Adding New Film Examples
1. Watch scene and note timestamp
2. Describe visual elements specifically
3. Explain technique used
4. Connect to student exercise
5. Add to relevant module section

### Clarifying Instructions
1. Identify confusion point
2. Add step-by-step breakdown
3. Include visual examples
4. Provide troubleshooting tips
5. Test clarity with fresh eyes

### Adding Tokyo Context
1. Research local locations
2. Address practical constraints
3. Provide specific suggestions
4. Include cultural notes
5. Offer backup options

### Updating Technical Information
1. Verify current best practices
2. Update software versions
3. Revise settings/workflows
4. Test new instructions
5. Update screenshots if needed

## Encoding Safety Protocol

**Before Editing**:
- Confirm file has Japanese text
- Note current encoding
- Backup file if major changes

**During Editing**:
- Use UTF-8 explicitly
- Test Japanese characters
- Preserve existing encoding

**After Editing**:
- Verify Japanese text displays
- Check for corruption
- Test in browser
- Deploy and verify live

## Emergency Rollback

If update causes issues:
1. Identify problem
2. Revert to previous commit
3. Fix issue locally
4. Test thoroughly
5. Redeploy corrected version
