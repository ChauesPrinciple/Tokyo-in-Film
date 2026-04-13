# Agent Orchestration Guide

## Overview

The Tokyo in Film project uses a hierarchical agent system to provide context-aware assistance across different content areas. This system combines:

- **Root-level AGENT.md** - Global project configuration (always active)
- **Subdirectory AGENTS.md files** - Context-specific configurations (active when working in those directories)
- **Skills** - Reusable capabilities documented in `.windsurf/skills/`
- **Workflows** - Step-by-step procedures documented in `.windsurf/workflows/`

## Agent Hierarchy

### Root Agent (`/.windsurf/AGENT.md`)

**Scope**: Entire project (always active)

**Purpose**: Provides global context about:
- Project philosophy and voice
- All available skills and workflows
- Technical stack and deployment
- Critical rules (UTF-8, versioning, etc.)
- Decision-making framework

**When Active**: Every Cascade interaction

### Subdirectory Agents

#### Guides Agent (`/guides/AGENTS.md`)

**Scope**: Files in `/guides/**`

**Purpose**: Interactive decision-making guide development
- Scenario.js integration
- Question type management
- Branching logic design

**Key Skills**:
- `fix-guide-questions`
- `maintain-writing-voice`
- `design-worksheets`

**Typical Tasks**:
- Creating new interactive guides
- Fixing question types (info vs question)
- Updating guide content

#### Pre-Production Agent (`/pre-production/AGENTS.md`)

**Scope**: Files in `/pre-production/**`

**Purpose**: Pre-production module content development
- Script adaptation exercises
- Location scouting assignments
- Storyboarding worksheets
- Production planning

**Key Skills**:
- `develop-screenwriting-exercises`
- `design-worksheets`
- `write-film-critiques`
- `maintain-writing-voice`

**Typical Tasks**:
- Creating scene adaptation assignments
- Writing location scouting guides
- Developing storyboard exercises

#### Production Agent (`/production/AGENTS.md`)

**Scope**: Files in `/production/**`

**Purpose**: Production module content development
- Camera and lighting techniques
- Practical effects exercises
- On-set problem-solving
- Low-budget filmmaking

**Key Skills**:
- `design-practical-effects`
- `design-worksheets`
- `write-film-critiques`
- `maintain-writing-voice`

**Typical Tasks**:
- Creating practical effects exercises
- Designing production technique worksheets
- Writing production analysis

#### Post-Production Agent (`/post-production/AGENTS.md`)

**Scope**: Files in `/post-production/**`

**Purpose**: Post-production module content development
- Editing fundamentals
- Color grading techniques
- Sound design exercises
- Software-specific guidance

**Key Skills**:
- `design-worksheets`
- `write-film-critiques`
- `maintain-writing-voice`

**Typical Tasks**:
- Creating editing exercises
- Designing color grading worksheets
- Writing post-production analysis

## Filmmaking Production Network

In addition to the pedagogical agent hierarchy, the project includes a **filmmaking production system** — a specialized network of 10 knowledge skills and 7 production workflows coordinated by `@film-producer-agent`.

### How It Connects

| Course Phase | Subdirectory Agent | Filmmaking Skills Used |
|---|---|---|
| **Pre-Production** | `/pre-production/AGENTS.md` | `@narrative-structure`, `@storyboard-artist`, `/script-to-shotlist`, `/professional-storyboard`, `/write-short-film` |
| **Production** | `/production/AGENTS.md` | `@visual-grammar`, `@optics-psychology`, `@lighting-architecture`, `@acoustic-design`, `@staging-blocking`, `@production-protocol`, `/coverage-strategy`, `/location-lighting-plan`, `/production-package` |
| **Post-Production** | `/post-production/AGENTS.md` | `@editorial-grammar`, `@acoustic-design`, `/editorial-assembly`, `/advanced-editorial-theory` |

### Two Modes of Use

1. **Reference Mode** — When creating module content, worksheets, or film critiques, use filmmaking skills as knowledge references (e.g., consult `@lighting-architecture` when writing about three-point lighting for students)

2. **Production Mode** — When transforming a screenplay scene into production deliverables, invoke `@film-producer-agent [scene]` to run the full orchestration sequence (AI pre-pass → structure → visual → lighting → sound → staging → editorial → package)

### Full Documentation
See `.windsurf/FILMMAKING_NETWORK_COMPLETE.md` for the complete network architecture, skill definitions, workflow table, and integration test.

---

## How Orchestration Works

### Automatic Context Loading

When you work on a file, Cascade automatically loads:

1. **Root AGENT.md** (always)
2. **Relevant subdirectory AGENTS.md** (if file is in that directory)

Example: Editing `/pre-production/script-adaptation.html`
- Loads: `/.windsurf/AGENT.md` (global context)
- Loads: `/pre-production/AGENTS.md` (pre-production context)
- Has access to: All skills and workflows

### Skill Invocation

Skills can be invoked:

**Automatically**: Based on task context
- Cascade recognizes task patterns
- Selects appropriate skill
- Applies skill guidelines

**Manually**: Using skill names in requests
- "Use the `design-practical-effects` skill to create..."
- "Apply `maintain-writing-voice` to this content"

**Via Workflows**: Workflows orchestrate multiple skills
- `/deploy-updates` uses `deploy-site` skill
- `/add-new-film-critique` uses `write-film-critiques` skill

### Workflow Execution

Workflows provide step-by-step procedures:

1. User invokes workflow: `/deploy-updates`
2. Cascade reads workflow markdown
3. Executes steps in sequence
4. Uses relevant skills as needed
5. Reports completion

## Best Practices

### For Content Development

**Creating New Modules**:
1. Identify which directory (pre/production/post)
2. Work in that directory to activate relevant agent
3. Reference course films and Tokyo context
4. Use `maintain-writing-voice` for consistency

**Updating Existing Content**:
1. Read existing file to understand context
2. Subdirectory agent provides relevant guidelines
3. Make changes consistent with module philosophy
4. Deploy using `/deploy-updates` workflow

### For Technical Maintenance

**Website Updates**:
1. Use technical skills from root agent
2. Remember UTF-8 encoding for Japanese text
3. Increment CSS version if styles change
4. Deploy and verify on live site

**Interactive Features**:
1. Work in `/guides/` for scenario guides
2. Use `/js/` for JavaScript updates
3. Test locally before deploying
4. Verify interactive functionality

### For New Features

**Adding New Film Analysis**:
1. Use `/add-new-film-critique` workflow
2. `write-film-critiques` skill provides structure
3. `maintain-writing-voice` ensures consistency
4. Update relevant module pages

**Creating New Assignments**:
1. Determine module (pre/production/post)
2. Work in that directory
3. Use `design-worksheets` skill
4. Connect to course films and Tokyo context

## Agent Communication Patterns

### Root Agent Responsibilities

- Maintain project-wide consistency
- Enforce critical rules (UTF-8, versioning)
- Provide skill and workflow discovery
- Handle deployment and technical tasks

### Subdirectory Agent Responsibilities

- Provide module-specific context
- Guide content creation for that area
- Reference relevant course films
- Maintain pedagogical consistency

### Skill Responsibilities

- Execute specific, reusable tasks
- Provide detailed guidelines
- Reference best practices
- Ensure quality standards

### Workflow Responsibilities

- Orchestrate multi-step processes
- Coordinate multiple skills
- Provide clear execution steps
- Handle complex procedures

## Extending the System

### Adding New Agents

To create a new subdirectory agent:

1. Create `AGENTS.md` in target directory
2. Define role and context
3. List relevant skills
4. Document common tasks
5. Specify quality standards

### Adding New Skills

To create a new skill:

1. Create directory in `.windsurf/skills/[skill-name]/`
2. Write `skill.md` with frontmatter (description, tags)
3. Document purpose and guidelines
4. Add examples and best practices
5. Update root AGENT.md skill list
6. If filmmaking skill: also update `FILMMAKING_NETWORK_COMPLETE.md` and `film-producer-agent/skill.md`

### Adding New Workflows

To create a new workflow:

1. Create `.windsurf/workflows/[name].md`
2. Add YAML frontmatter with description
3. Write step-by-step instructions
4. Reference relevant skills
5. Update root AGENT.md workflow list

## Troubleshooting

### Agent Not Loading

- Verify file is named `AGENTS.md` (case-insensitive)
- Check file is in correct directory
- Ensure markdown is valid

### Skills Not Available

- Verify skill directory exists in `.windsurf/skills/`
- Check `SKILL.md` has proper frontmatter
- Ensure skill is listed in root AGENT.md

### Workflows Not Working

- Verify workflow file in `.windsurf/workflows/`
- Check YAML frontmatter is valid
- Ensure steps are clear and actionable
- Test workflow execution

## Summary

The agent orchestration system provides:

- **Context-aware assistance** through subdirectory agents
- **Reusable capabilities** through skills
- **Structured processes** through workflows
- **Consistent quality** through shared guidelines
- **Scalable organization** through hierarchical structure

This system ensures Cascade provides relevant, accurate assistance regardless of which part of the Tokyo in Film project you're working on.
