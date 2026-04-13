---
description: Generate industry-standard screenplay .docx files using Node.js and the docx library with correct Courier New formatting, margins, and element builders
tags: [screenwriting, formatter, nodejs, docx, courier-new, screenplay-format, export]
---

# Format Screenplay as .docx Skill

## Purpose
Produce a properly formatted screenplay document (.docx) using Node.js and the `docx` npm library. Outputs US Letter format with industry-standard margins, Courier New 12pt font, and correct indentation for all screenplay elements.

---

## Page & Margin Specs
- **Page size:** US Letter 8.5" × 11"
- **Left margin:** 1.5" → 2160 DXA
- **Right margin:** 1" → 1440 DXA
- **Top margin:** 1" → 1440 DXA
- **Bottom margin:** 1" → 1440 DXA
- **Font:** Courier New, 12pt → `size: 24` (docx uses half-points)
- **1 inch = 1440 DXA** (all measurements in DXA units)

---

## Dependencies
```js
"use strict";
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  PageBreak, Header, Footer, PageNumber, BorderStyle
} = require("docx");
const fs = require("fs");

const C  = "Courier New";
const SZ = 24; // 12pt in half-points
```

---

## Element Builders

### Screenplay Elements
```js
// FADE IN: (left-aligned, space after)
const FADE_IN = () => new Paragraph({
  spacing: { before: 0, after: 240 },
  children: [new TextRun({ text: "FADE IN:", font: C, size: SZ })]
});

// Transitions: FADE OUT. / CUT TO: (right-aligned)
const TRANS = (text) => new Paragraph({
  spacing: { before: 240, after: 0 },
  alignment: AlignmentType.RIGHT,
  children: [new TextRun({ text, font: C, size: SZ })]
});

// Scene heading / slug line (uppercase, bold, space before)
const SLUG = (text) => new Paragraph({
  spacing: { before: 360, after: 0 },
  children: [new TextRun({ text, font: C, size: SZ, bold: true })]
});

// Action / description (flush left)
const ACTION = (text) => new Paragraph({
  spacing: { before: 0, after: 0 },
  children: [new TextRun({ text, font: C, size: SZ })]
});

// Empty line
const BLANK = () => new Paragraph({
  spacing: { before: 0, after: 0 },
  children: [new TextRun({ text: "", font: C, size: SZ })]
});

// Character cue (~2.25" from content left = 3240 DXA)
const CHAR = (name) => new Paragraph({
  spacing: { before: 240, after: 0 },
  indent: { left: 3240 },
  children: [new TextRun({ text: name, font: C, size: SZ })]
});

// Parenthetical
const PAREN = (text) => new Paragraph({
  spacing: { before: 0, after: 0 },
  indent: { left: 2520, right: 2160 },
  children: [new TextRun({ text: `(${text})`, font: C, size: SZ })]
});

// Dialogue block
const DLG = (text) => new Paragraph({
  spacing: { before: 0, after: 0 },
  indent: { left: 1800, right: 1800 },
  children: [new TextRun({ text, font: C, size: SZ })]
});

// Act heading (centered, bold, underlined)
const ACT_HDR = (text) => new Paragraph({
  spacing: { before: 0, after: 240 },
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text, font: C, size: SZ, bold: true, underline: {} })]
});

// End of act (centered, bold)
const ACT_END = (text) => new Paragraph({
  spacing: { before: 240, after: 480 },
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text, font: C, size: SZ, bold: true })]
});

// Page break
const PB = () => new Paragraph({ children: [new PageBreak()] });
```

### Indentation Reference
| Element | Left indent | Right indent |
|---------|-------------|--------------|
| Character cue | 3240 DXA (~2.25") | — |
| Parenthetical | 2520 DXA | 2160 DXA |
| Dialogue | 1800 DXA | 1800 DXA |
| Action/Slug | 0 | 0 |

---

## Notes / Dev Section Builders (Arial, non-screenplay)
```js
const NOTE_H1 = (text) => new Paragraph({
  spacing: { before: 400, after: 160 },
  children: [new TextRun({ text, font: "Arial", size: 36, bold: true, color: "1B2631" })]
});

const NOTE_H2 = (text) => new Paragraph({
  spacing: { before: 300, after: 120 },
  children: [new TextRun({ text, font: "Arial", size: 24, bold: true, color: "2C3E50" })]
});

const NOTE_BODY = (text) => new Paragraph({
  spacing: { after: 140 },
  children: [new TextRun({ text, font: "Arial", size: 20 })]
});

const NOTE_BOLD = (text) => new Paragraph({
  spacing: { before: 120, after: 40 },
  indent: { left: 360 },
  children: [new TextRun({ text, font: "Arial", size: 20, bold: true })]
});

const NOTE_ITEM = (text) => new Paragraph({
  spacing: { after: 100 },
  indent: { left: 720 },
  children: [new TextRun({ text: "\u2013  " + text, font: "Arial", size: 20 })]
});

const NOTE_QUOTE = (text) => new Paragraph({
  spacing: { before: 100, after: 160 },
  indent: { left: 720, right: 360 },
  border: { left: { style: BorderStyle.SINGLE, size: 12, color: "F39C12", space: 8 } },
  children: [new TextRun({ text, font: "Arial", size: 19, italics: true, color: "5D6D7E" })]
});
```

---

## Content Array Pattern
Each entry is `[BUILDER_FUNCTION, optionalText]`. Builder is called with text if provided, with no args if not.

```js
const ACT_ONE = [
  [ACT_HDR, "ACT ONE"],
  [BLANK],
  [FADE_IN],
  [BLANK],
  [SLUG, "EXT. LOCATION NAME - TIME OF DAY"],
  [BLANK],
  [ACTION, "Description of scene action."],
  [BLANK],
  [CHAR, "CHARACTER NAME"],
  [PAREN, "direction"],
  [DLG, "Dialogue line here."],
  [BLANK],
  [TRANS, "CUT TO:"],
  [BLANK],
  [ACT_END, "END OF ACT ONE"],
  [PB],
];
```

---

## Title Page Pattern
```js
const TITLE_PAGE = [
  [BLANK],[BLANK],[BLANK],[BLANK],[BLANK],[BLANK],
  [() => new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [new TextRun({ text: "TITLE", font: C, size: 52, bold: true })]
  })],
  [BLANK],
  [() => new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: "Written by: Author Name", font: C, size: SZ })]
  })],
  [BLANK],[BLANK],[BLANK],[BLANK],[BLANK],
  [() => new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: "Production Company", font: C, size: SZ })]
  })],
  [PB],
];
```

---

## Document Assembly & Export
```js
const allContent = [...TITLE_PAGE, ...ACT_ONE, ...ACT_TWO, ...ACT_THREE];

const doc = new Document({
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, right: 1440, bottom: 1440, left: 2160 }
      }
    },
    children: allContent.map(([fn, arg]) => arg !== undefined ? fn(arg) : fn())
  }]
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("screenplay.docx", buffer);
  console.log("Done.");
});
```

---

## Known Scripts Using This Formatter
- **KURASAWA** (Chaues / Chaues Productions) — Three-act horror screenplay set in an abandoned Japanese ghost town. Characters: Keiko (blogger/paranormal investigator), Aya (folklore researcher, possessed by Mr. Tanaka's spirit). Antagonist: Kuchisake-onna (Slit-Mouthed Woman). Supporting: Zashiki-warashi (child spirits). Setting: Kurasawa Village and its abandoned elementary school.

---

## Related Skills
- **write-short-film-scripts** — Structural methodology that produces the content this formatter outputs
