---
name: Testing Service
description: Inspection · Certification · Permit. CZ + SK compliance for restricted technical devices, plus Testing Service Aviation.
colors:
  ink: "#18292e"
  ink-raised: "#22383e"
  ink-hover: "#2a4147"
  text: "#34464a"
  muted: "#566466"
  paper: "#f8f8f4"
  stone: "#eceee9"
  white: "#ffffff"
  line: "#d9deda"
  line-strong: "#7d8f8c"
  line-on-dark: "#3a5156"
  text-on-dark: "#d7dfdc"
  muted-on-dark: "#a8bab7"
  gold: "#886020"
  gold-on-dark: "#e3bd78"
  gold-on-dark-hover: "#edd09a"
  aviation: "#25667c"
  aviation-on-dark: "#a4d1df"
  aviation-on-dark-hover: "#c4e3ec"
  error: "#9b2c1f"
typography:
  display:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 2.4vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.028em"
  h1:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(2.25rem, 1.5rem + 2.4vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  h2:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  statement:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  prose-h2:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(1.5rem, 1.3rem + 0.8vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  h3:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  h4:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0em"
  lead:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  list:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.4
  small:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.55
  ui:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.2
  field-label:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.55
  label:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.12em"
  wordmark:
    fontFamily: "IBM Plex Sans Variable, Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.04em"
  wordmark-stacked:
    fontFamily: "IBM Plex Sans Variable, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.06em"
rounded:
  none: "0px"
  focus: "2px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "24px"
  "6": "32px"
  "7": "48px"
  "8": "64px"
  "9": "96px"
  "10": "128px"
  gutter: "clamp(20px, 5vw, 64px)"
  grid-gap: "24px"
  section-y: "clamp(64px, 3rem + 4vw, 120px)"
  container: "1312px"
  measure: "40rem"
  rail-top: "96px"
  header: "72px"
  header-compact: "60px"
  panel: "48px"
  panel-sm: "24px"
  hairline-gap: "clamp(40px, 1rem + 3.4vw, 64px)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
  button-on-dark:
    backgroundColor: "{colors.gold-on-dark}"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-on-dark-hover:
    backgroundColor: "{colors.gold-on-dark-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0 23px"
    height: "48px"
  button-header:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "44px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "48px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    height: "44px"
  lang-tag:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    padding: "1px 4px"
  lang-tag-on-dark:
    textColor: "{colors.muted-on-dark}"
    typography: "{typography.label}"
    padding: "1px 4px"
  service-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "32px 24px 24px"
  list-row:
    textColor: "{colors.ink}"
    typography: "{typography.list}"
    padding: "16px 0"
    height: "56px"
  menu-row:
    textColor: "{colors.ink}"
    typography: "{typography.list}"
    padding: "16px 0"
    height: "56px"
  rail-link:
    textColor: "{colors.muted}"
    typography: "{typography.small}"
    padding: "8px 0 8px 12px"
  rail-link-current:
    textColor: "{colors.ink}"
---

# Design System: Testing Service

<!-- Round 6 (2026-11-20): refined after the v5 review (docs/review/review-6.md). Round-6 system changes are listed
under "Changes in round 6" at the end; rounds 5, 4 and 3 stay listed below them. If this file disagrees with any
review-N.md, this file wins. -->

## Overview

**Creative North Star: "The Inspection Report"**

The site should read like a well-made inspection report or certificate dossier from a serious technical body. That means a strict grid, hairline rules, a left margin that carries titles and labels, numbered entries, generous margins, and one signature mark: the gold of the seal. Authority comes from order and precision, not decoration. Every label carries real information (a jurisdiction, a regulation, a file type, a section name it doesn't already repeat). Anything that only *looks* "technical" gets cut, and so does anything said twice.

This refines the incumbent world (graphite-navy, warm paper, gold, IBM Plex Sans, square corners, hairlines); it doesn't replace it. The discipline is **one of each**, used identically on every page, in both divisions and in every language:

- one type scale and one spacing scale;
- one 12-column grid with two section patterns and one collapse rule;
- one button family, one list row and one language tag;
- one page ending, ending in one footer.

Dark colour appears in exactly three places: the home hero, buttons and the header CTA, and the footer. Everything else sits on paper and stone.

Density is calm and document-like. Long legal prose is the core content. The reading column is exactly six grid columns wide (cols 5–10, `measure` = 40rem ≈ 75 characters at 17px). Its left margin is never an empty void: on every article it carries the **report rail**, the sticky table of contents that a technical dossier prints in its margin. The page relies on whitespace and rules rather than boxes.

**Key characteristics:**
- Graphite ink on warm paper. Gold is a seal, used sparingly; aviation blue is the division accent.
- IBM Plex Sans only. Hierarchy comes from size, not weight: headings are 500, labels 600.
- Square corners everywhere (0px). Hairline 1px rules instead of shadows and boxes.
- Every section heading starts at column 1. Reading content starts at column 5, with the report rail in cols 1–3 beside it. Below 1080px everything is one column.
- No decorative microcopy, no faux-technical captions, no label that repeats its heading, no call to action repeated on screen.

## Colors

The palette is restrained and warm-neutral: graphite-teal ink, paper and stone neutrals, one gold accent, and a separate aviation blue that replaces gold inside the Aviation division.

### Primary
- **Seal Gold** (`gold`): the brand accent on light surfaces. Used for:
  - the full stop that ends each page's h1;
  - the active-nav underline;
  - the hover colour of text links and list rows;
  - the focus ring;
  - card numerals.

  AA as text on paper (5.27:1) and stone (4.8:1). Never a background fill on light surfaces.
- **Seal Gold on Dark** (`gold-on-dark`): the same role on ink surfaces, and the fill of `button-on-dark` (home hero, footer). 8.47:1 against ink.

### Secondary
- **Aviation Blue** (`aviation`), **Aviation Blue on Dark** (`aviation-on-dark`) and **Aviation Blue on Dark, hover** (`aviation-on-dark-hover`): the division accent.
  - Inside `body.aviation` (all three aviation pages) and `.aviation-scope` (the home Aviation teaser) it *replaces* gold one for one in every accent role, including the `button-on-dark` fill and its hover.
  - Never used alongside gold in the same component.

### Neutral
- **Graphite Ink** (`ink`): headings, UI text, primary button fill, dark surfaces.
- **Ink Raised** (`ink-raised`): the only second dark tone (image placeholder on dark).
- **Ink Hover** (`ink-hover`): hover state of ink buttons.
- **Body Text** (`text`): long-form prose (9.3:1).
- **Muted** (`muted`): metadata, eyebrows on light, captions, breadcrumb, form help (5.78:1 on paper).
- **Paper**, **Stone**, **White**:
  - `paper` is the page background;
  - `stone` is the alternate section band and the form panel;
  - `white` is for inputs, the dropdown panel and text on ink. Never a section background.
- **Hairline** (`line`); **Strong Hairline** (`line-strong`: input, secondary-button and menu-button borders, 3.19:1); **Hairline, Text and Muted on Dark**: as named.
- **Error** (`error`): invalid field border and message only.

### Named Rules
**The Seal Rule.** Gold (or aviation blue) covers well under 5% of any screen. It marks one thing per component: an active state, a numeral, or the full stop.

**The One Full Stop Rule.** The coloured full stop ends the page's h1 (home included) and nothing else. In Chinese the h1 ends with the same Latin gold `.`, not `。`.

**The Accent Swap Rule.** Components read `var(--accent)`, `var(--accent-on-dark)` and `var(--accent-on-dark-hover)`, never a literal colour. `body.aviation` and `.aviation-scope` reassign all three.

**The Visible Focus Rule.** `2px solid var(--focus)` at 3px offset (2px for inputs). `--focus` is `--accent` on light surfaces, and `--accent-on-dark` on every `.on-dark` band.

**The Two-Dark Rule.** Only `ink` and `ink-raised` exist as dark surfaces. Two dark bands are never stacked without a paper or stone section between them.

## Typography

**Font:** IBM Plex Sans Variable (fallback Arial, then PingFang SC / Microsoft YaHei for CJK). **Weights:** 500 for every heading, list title, UI element and the closing h2; 400 for running text; 600 *only* for Label, the wordmark and the current language in the switcher. Hierarchy is carried by size, so an H4 never out-shouts an H3.

**Font loading.** Preload the Latin subset of the variable font (`<link rel="preload" as="font" type="font/woff2" crossorigin>`) and declare a metric-matched fallback face (`@font-face { font-family: "Plex Fallback"; src: local("Arial"); size-adjust / ascent-override / descent-override / line-gap-override }` tuned to IBM Plex Sans), placed second in every stack. The swap from fallback to Plex must not rewrap a line: CLS < 0.05 on every route at 390px.

### Hierarchy
- **Display** (500, 40→60px, lh 1.08, −0.028em): the home hero h1 only. `max-width: 18ch`, balanced. States the offer (the compliance sentence from the source copy).
- **H1** (500, 36→56px, lh 1.1, −0.025em): interior page titles. `max-width: 20ch`.
- **H2** (500, 28→40px, lh 1.15, −0.02em): section headings (home sections, gallery, footer closing).
- **Statement** (400, 22→30px, lh 1.35, −0.01em, max 34ch): the home intro sentence. Never invent a heading from a sentence; a *source* heading that is a sentence follows the Heading Restoration Rule.
- **Prose H2** (500, 24→28px, lh 1.25, −0.015em, margin 56px 0 16px): h2 inside Markdown. Fluid like H2 (24px at 390, 28px from ≈1100px), because restored source headings are sentences and a fixed 28px runs them to 4–5 lines on a phone.
- **H3** (500, 22px, lh 1.3): card titles, prose sub-sections (margin 40px 0 12px), blocks after an article (downloads, partners), and the contact details headings.
- **Heading stack.** When a prose heading directly follows another prose heading (no paragraph, list or figure between them), the second one's top margin is **16px** (`.prose :is(h2, h3, h4) + :is(h3, h4) { margin-top: var(--space-4) }`), so a stack reads as one heading block, not as two sections with nothing in them. A stack is at most **two** headings deep; an h2 → h3 → h4 run is not allowed (the Heading Restoration Rule resolves it).
- **H4** (500, 18px, lh 1.4): footer column headings and "Potrebujeme:"-style labels in prose.
- **Lead** (400, 18→20px, lh 1.55, `muted`, max 52ch): the one-sentence page description under h1 and section intros. Only from frontmatter (`description`, `packageLead`).
- **Body** (400, 17px, lh 1.65, `text`, max `measure` = 40rem): prose.
- **List** (500, 17px, lh 1.4, `ink`): every list-row title, disclosure summary, related row and mobile-menu row. One token for every row.
- **Small** (400, 14px, lh 1.55): card descriptions, footer text and links, form help, breadcrumb, contents nav.
- **UI** (500, 15px, lh 1.2): nav links, buttons, tabs, language switcher, dropdown rows. Never 400 (this includes the "Menu" label).
- **Field label** (500, 14px, lh 1.55, `ink`): form field labels only. It is the Small size at the UI weight, named so the Step Rule holds.
- **Label** (600, 12px, lh 1.3, +0.12em, UPPERCASE, `muted`): eyebrows, file-type meta, card numerals, lang-tag.
- **Wordmark** (600, 15px, +0.04em, uppercase) and **Wordmark stacked** (600, 13px, lh 1.1, +0.06em, below 640px only). These are the only 13px text on the site.

### Named Rules
**The 12px Floor Rule.** Nothing renders below 0.75rem (12px).

**The Step Rule.** Every font-size, weight and line-height combination in CSS is one of the tokens above, *including line-height*. No component-local values (no `1.4` on UI text, no `1.6` on Small, no inherited 1.65 on a summary).

**The Wrap Rule.** Headings use `text-wrap: balance`; paragraphs, leads and list items use `text-wrap: pretty`. Separator dots stay with the word before them (`Inšpekcie&nbsp;·`), so no line ever starts with "·". The same binding applies to a spaced dash (`slovo&nbsp;– ďalej`, ZH `标志\u2060——`): no line ever starts with "–" or "——". A spaced slash between multi-word alternatives (`IFR check / VFR check`) is bound the same way (`check&nbsp;/ VFR`), so no line starts with "/"; between single words the slash is unspaced (Source Typography Rule). **In Slovak and Czech text** a one-letter preposition or conjunction (a, i, k, o, s, u, v, z and their capitals) is bound to the next word with a non-breaking space, in statements, leads, headings, list rows, card text and prose. **Exception: an uppercase single letter in the middle of a sentence is a label, not a preposition** (a device group "Kategória A", "skupiny A", "sk. A", a taxiway "TWY A"): it is bound to the *preceding* word instead (`Kategória&nbsp;A vyhradených`). A capital counts as a preposition only at the start of a text node, after `„` or `(`, or after a sentence end (`.`, `!`, `?`, `:` followed by a space). A number is bound to its label in every Latin language: `č.&nbsp;3`, `No&nbsp;1321/2014`, `Nr.&nbsp;…`, `sk.&nbsp;A`. A hyphenated compound in a list row, card text or heading never breaks at its hyphen (U+2011 non-breaking hyphen for compounds of ≤ 24 characters: `výchovno‑vzdelávacie`, `third‑party`); in running prose the normal hyphen stays. Do all of this as one build-time text transform (remark/rehype plus the same helper for `home.json` and `ui.ts` strings), never by hand.

**The Measure Rule.** Reading text is capped by `measure` (40rem = 640px, which equals cols 5–10 at the 1312px container: 6 × 87.33 + 5 × 24 = 644px). Only running text, prose headings and prose lists are capped. List stacks (downloads, related) span the whole content area (cols 5–12), so every right-aligned icon sits on the container's right edge.

**The CJK Rule.** Under `:lang(zh)`:
- Headings: `letter-spacing: 0`, weight 600 (CJK needs the extra weight at the same size), `line-height: 1.3`, `word-break: keep-all` plus `overflow-wrap: anywhere`.
- Body and lead: `line-height: 1.8`.
- Labels: keep 600, letter-spacing drops to 0.04em.

Latin strings inside a ZH page carry `lang="en"` and keep the Latin rules.

ZH punctuation is not run through the Latin normalisation: the clause dash is "——" without spaces (never " – "), and percentages are unspaced ("100%"). Any ZH change to source strings is listed for the owner's native check.

**The Source Typography Rule.** Source copy keeps its words. Typographic normalisation is expected:
- dash → spaced en dash (" – "), including unspaced em dashes;
- no space before punctuation;
- sentence case for headings;
- a sentence fragment that stands as its own paragraph or list item starts with a capital letter and ends with a full stop;
- units and lists of letters are spaced: `230 V`, `max. 50 m`, `A, B, C`, `250 h` (a non-breaking space between number and unit);
- parentheses and quotes are balanced; a stray full stop inside a parenthesis is dropped;
- a hyphenated compound keeps an **unspaced hyphen** even when the source spaces it (`výchovno-vzdelávacie`, `vedecko-technický`); only a dash between clauses or list items becomes " – ";
- quotation marks follow the language: Slovak/Czech „…“, English “…”;
- no spaces around a slash between alternatives (`a/alebo`, `revízie/úradné skúšky`); units are spaced (`250 hod.`, `236 €`), and there is no space before ":" (`4300/6300: 236 €`);
- **one list, one style:** items that complete a lead-in ending in ":" start lowercase and take no full stop; stand-alone fragments start with a capital and end with a full stop. A lead-in sentence that introduces a list ends with ":";
- headings never end with "." or ":" (a "?" stays). The only colon-ended labels are H4 prose labels ("Potrebujeme:").

**The Heading Restoration Rule.** The source (an old Squarespace export) uses heading markup for two different things, and the content files must tell them apart the same way on every page:
- a source heading that is **one sentence of at most 110 characters** is a real section heading. It stays a heading, at its source level, with the levels shifted so the article's first heading is h2 and no level is skipped. Its words are unchanged; the terminal "." is dropped;
- a source heading that is longer, or holds more than one sentence, is a styled paragraph and becomes a Body paragraph;
- a short label line ending in ":" that introduces a list or a step ("Počas prevádzky TWR:", "Potrebujeme:") is a **prose label**, the same for every such label on a page. Its element is the level directly below its section heading (h3 under an h2, h4 under an h3), and it is always styled with the **H4 token**, whatever its level, so no level is skipped and every label looks the same;
- a source heading that is a **data line** (it carries a price, a quantity or a "name: value" pair, e.g. "250 hod./500 hod./Revízia (kontrola) magnet … : 236 €*/ks") is not a heading. It renders as a **key line**: a Body-width paragraph in the **List token** (17/500/1.4, `ink`), 24px above, its footnote ("*bez DPH") directly under it in Small `muted` with 4px between, then the normal 16px paragraph rhythm. It is not a rail entry;
- an **empty source heading** (one whose only content, after the hero lead has been lifted out of the source, is another heading) is not rendered; the next heading takes its level. Example: SK instruments "Aviation Testing Center", whose source content was the line that is now the hero lead. The name still appears in the footer's Aviation column;
- a prose heading **equal to the page h1** (case-insensitive) is not rendered; one that **starts with the full h1 text** and adds a predicate (SK instruments "Skúšky avionických systémov sú povinné") is a stand-alone fragment and becomes a Body paragraph ending in a full stop. Nothing on a page restates the h1 as a heading;
- after these steps, a **heading stack** is at most two headings deep (see Typography › Heading stack). The second heading of a stack is not a rail entry: the rail lists the block once, under its first heading.

Every article page is checked against its `_source/pages` file with this rule; the rail entries follow from it.

These apply to every content file, including the aviation pages, whose opening fragments were missed in round 3.

**Markdown structure is never "normalised"**: list markers (`-`, `*`) and nesting stay as Markdown syntax.

## Layout

**Container:** `width: min(100% - 2 × gutter, 1312px)`, centred. Gutter `clamp(20px, 5vw, 64px)`.

**Grid:** 12 columns with a 24px `grid-gap` at ≥1080px. **Below 1080px every grid is one column.**

### The two section patterns
There are exactly two section patterns. **Every section heading (eyebrow, h2) starts at column 1.** There are no exceptions besides the named splits below.

| Pattern | Used by | Desktop spans |
|---|---|---|
| **Full-width section** | home intro, home services, home packages, gallery, clients strip | header cols 1–8 (eyebrow, h2, lead); content cols 1–12 |
| **Margin + content** | article (interior pages, including their downloads, partners and related blocks), contact | margin cols 1–3: the report rail (article) or the contact details (contact, cols 1–4); content cols 5–12, running text capped at `measure` |

Named splits (media compositions, not sections):

| Split | Spans |
|---|---|
| Home hero | full-bleed 7/5: copy aligned to container col 1, photo bleeds to the right viewport edge |
| Page hero with photo | copy cols 1–7, photo cols 8–12 |
| Aviation teaser | image cols 1–6, copy cols 8–12 |
| Home intro | statement cols 1–7, supporting Body paragraph cols 8–12, both top-aligned to the statement's first line box |

Component grids:

| Grid | Columns |
|---|---|
| Card grid | 4 columns when its container is ≥1120px wide, 2 columns from 540px, 1 column below 540px |
| Capabilities list | 3 columns at ≥1080px, 2 at 640–1079px, 1 below 640px; **filled row by row** so the hairlines run straight across; each row sizes to its own tallest item (`grid-auto-rows: auto`, never `1fr`) |
| Gallery | 4 columns, 24px gap; 2 columns below 640px, 16px gap |
| Footer | 4 × 3 cols at ≥1080px; 2 × 6 at 640–1079px; 1 column below 640px |

**The Column-Five Rule.** On desktop, all reading content starts at column 5 (x = 509px at 1440). Column 1 holds headings, the report rail and full-width content. Nothing else gets a left edge. The article margin column is empty **only** when the rail has fewer than two entries (in practice the short EN/ZH references page). Home sections never leave it empty, because they use the full-width pattern.

**The Collapse Rule (mobile-first).** Every `grid-column` span is declared **only inside `@media (width >= 1080px)`**. Base styles are one column, and no ID selectors appear in layout CSS. Stacked grids use `row-gap: 0`; the gap comes from the stacked element's own margin (16px after a margin title, 32px between a photo and copy).

**The Baseline Rule.** A margin title's first baseline aligns with the first text baseline of the content beside it:
- contact details: `padding-top` = the form panel's padding;
- report rail: its first Label's ("Údaje" or "Obsah") first baseline aligns with the first baseline of the article's first element, whatever that element is: `padding-top: 6px` when the article opens with a Body paragraph (17/1.65 vs 12/1.3), and the value that gives the same baseline when it opens with a Prose H2 (measure it; QA asserts ±2px). A rail never starts visibly above or below the first line beside it.

### Vertical rhythm (4px base)
**Section padding.** Every section has `section-y` top and bottom, with these exceptions:
- the clients strip: 48px;
- the page hero: 48px top, `hairline-gap` bottom, *measured from the last element's box* (the last child has `margin-bottom: 0`);
- the article: `hairline-gap` top, after the hero hairline, and `section-y` bottom (it contains its own related block);
- contact: `hairline-gap` top.

`hairline-gap` = `clamp(40px, 1rem + 3.4vw, 64px)` (64px at 1440, 40px at 390), so the hero hairline sits in the middle of an equal gap on both sides. It is measured from the hairline to the top of the first line box (prose, rail Label, facts Label or form panel). This replaces the round-4 `section-y / 2` (52.8px at 1440 against 64px above the rule).

**Inside a section:**

| From | To | Gap |
|---|---|---|
| Section header | content | 48px (32px below 640px) |
| Eyebrow | heading | 16px |
| Heading | lead | 16px |
| Lead (or heading, if there is no lead) | action | 32px |
| Block | block, inside the article ending (downloads, partners, related) | 64px |

**The Hairline Adjacency Rule.** Separation between sections is a background change **or** a hairline, never both and never neither. A block that would start with a rule drops it when its previous sibling already ends with one; that last rule of the list *is* the separator.

**Breakpoints:** `sm` = 640px, `md` = 1080px, plus container queries for the card grid (540px and 1120px inline size). Nothing else.

**Header height:** 72px at ≥1080px, 60px below. Sticky on paper with a bottom hairline. `scroll-padding-top` is the header height + 24px.

## Elevation & Depth

Flat. Depth comes from tonal bands and hairlines. The only shadow is the desktop services dropdown: `0 12px 32px rgb(24 41 46 / 0.10)`. Active underlines may be drawn with `box-shadow: inset 0 -2px`; that is a rule, not elevation, and never sits inside a bordered button.

## Shapes

Corners are square everywhere; the 2px focus-ring radius is the only rounding. Rules are 1px. Active states use a **2px accent underline** (nav, language switcher, aviation tabs). Cards use a 2px accent top rule on hover.

**Photography**
- **Ratios.** Page heroes at ≥1080px: the photo's height **follows the copy column**, clamped to **240–300px** (`align-self: stretch; height: auto; min-height: 240px; max-height: 300px; aspect-ratio: auto; object-fit: cover` on the photo, which spans cols 8–12 = 533px at 1440). A one-line title with a one-line lead therefore sits beside a 533 × 240 photo (≈ 2.2:1), not beside a 300px photo with a 190px empty block under the lead, and a hero with an action button gets up to 300px (16:9). Other ratios: **3:2** for page heroes below 1080px, the teaser and the gallery, and full-bleed cover for the home hero.
- **Subject.** A page-hero photo shows the page's own subject (a TS-A photo on aviation pages). A photo of a different subject (an automotive belt drive on the magneto page) is replaced or omitted (copy cols 1–8); this is an owner decision about which photo, never a reason to keep the wrong one. Photos with burned-in annotation text are not used in the featured gallery grid.
- **Treatment.** All photos get `filter: saturate(0.8)`.
- **The Resolution Rule.** A photo is never displayed larger than its source pixels at 1×. Every `<Photo>` emits widths up to 2× its largest displayed size, or the source width if that is smaller.
- **One cell size.** Inside a gallery grid every cell renders at the same size. An undersized source is excluded from the grid, not centred small inside a cell.
- **One appearance per page.** A photo appears at most once per page: the teaser image is not also in the gallery on the same page.
- **Logos** are never filtered, except in the client strip.

## Components

### Header / Navigation / Language switcher
**At ≥1080px.** The header row runs:
1. brand at col 1;
2. nav (Služby ▾, Aviation, Referencie);
3. header CTA;
4. a 24px vertical hairline;
5. the language switcher.

Everything is vertically centred on the 72px bar.

**Brand.** The logo roundel only (from `logo_zlate.png`, original colours), 40px (32px below `md`), plus "TESTING SERVICE" in Wordmark type. The whole brand link has a **44px hit area** (`min-height: 44px`). Below 640px the wordmark is the stacked two-line lockup (Wordmark stacked).

**Nav links.** UI type, ink, 44px hit height, 28px gap. Hover `accent`; current page gets a 2px `accent` underline.

**Header CTA on the contact page.** Rendered as `button-secondary` (44px) with `aria-current="page"` and **no underline** (`box-shadow: none`). The border is the current state.

**Services dropdown (desktop).**
- Ships closed (`<details>` without `open`).
- 360px white panel, 1px `line` border, the dropdown shadow. Its top edge sits **flush on the header's bottom hairline**.
- First row: "Všetky služby →" in Label type, linking to home `#services`. Use **→, never ↓**, because it navigates to another page.
- Other rows: UI type at lh 1.2, 16px vertical padding, hairlines between rows.
- The chevron is a 12 × 12 SVG in `ink`.

**Lang-tag (one component).**
- Label type, `muted`, 1px `line` border, padding 1px 4px, **8px** left margin. `white-space: nowrap`, and bound to the preceding word by a non-breaking space so it never wraps alone.
- On dark: the same box with `muted-on-dark` text and a `line-on-dark` border.
- Inside a filled button only: no border, `currentColor`, opacity .75.
- **In list rows the language goes into the meta line** (`PDF · EN`), not next to the title.

**Language switcher.** SK · EN · 中文 in UI type (15px). Each item is 44 × 44. The current item is ink, weight 600, with the underline; the others are `muted`.

**Below 1080px.**
- Header bar: brand · language switcher · menu button. The menu button is 44 × 44 with a 1px `line-strong` border; its "Menu" label is UI 500 and visible from 640px; `aria-label` is always present.
- Open state: the icon becomes ✕ and `aria-expanded="true"`. The panel covers the viewport below the header (`calc(100dvh - header)`, paper, scrolls internally, body scroll locked).
- Panel contents:
  1. a Label row "Služby" (not a link);
  2. the four services as List rows indented 16px;
  3. Aviation and Referencie as List rows;
  4. the CTA as a full-width `button-primary`, 24px below the last rule.

  Every row is a `menu-row`: the List token, 16px block padding, 56px minimum plus its 1px hairline (57px), **including the last service row and the Aviation and Referencie rows**. One height for every row; the old 52px value is gone. There is no "Všetky služby" row in the mobile panel.

### Buttons
- **Size and anatomy.**
  - Height 48px (44px in the header).
  - Padding 24px (23px plus a 1px border for secondary).
  - UI type: the label, then a 16px SVG icon, with a fixed 12px gap (8px in the header).
- **Variants.**
  - **Primary** (light): ink fill, white text; hover `ink-hover`.
  - **On dark:** `accent-on-dark` fill, ink text; hover `accent-on-dark-hover`.
  - **Secondary:** transparent with a 1px `line-strong` border. On dark the border is `rgb(255 255 255 / .4)`.
- **Text link.** UI type, ink, 1px underline at 4px offset in `line-strong`, `accent` on hover. A standalone text link (not inline in prose) has a 44px hit area. This includes the footer e-mail, the breadcrumb links on touch (`min-height: 44px` below 1080px) and footer links (`min-height: 44px` below 1080px, 32px at ≥1080px).
- **One icon binding for every link that carries an icon** (text links, card links, the form's privacy link, footer links, list rows' inline variants): the icon sits inline 8px after the last word, and the last word plus icon are `white-space: nowrap`. A wrapped label therefore never leaves its arrow at the far edge of the column. Standalone text links are `display: inline-block` with the hit area made by block padding (`padding-block: calc((44px - 1lh) / 2)`), not `inline-flex`, because an `inline-flex` link that wraps stretches to the column width and pushes the icon to the right edge (v5 contact form at 390px).
- **The Arrow Rule.** → internal page; ↗ leaves the site (external **or** `mailto:`); ↓ file download or in-page jump on the *same* page. Every link in a list, the footer or a menu carries its arrow; inline prose links carry none.

### Section header
`eyebrow` (optional) → 16px → h2 → optional lead (16px, max 52ch) → optional trailing text link or action (32px). Always starts at column 1.

**The Informative Eyebrow Rule.** An eyebrow must add information its heading lacks. If it would repeat or paraphrase the heading, the breadcrumb or the current nav item, omit it. The complete list of eyebrows on the site:
1. the home hero line;
2. "Žilina · LZZI" over the gallery;
3. "Čoskoro" over the Prague office;
4. "Naši klienti" in the clients strip;
5. Label rows inside a list or menu;
6. the report rail's two Labels, "Údaje" and "Obsah".

Interior page heroes have **no eyebrow**; the breadcrumb carries the parent. The home Aviation teaser has none either; its h2 already names the division.

### Home hero
- **Band.** Ink, `min-height: min(640px, 80svh)`, grid 7 / 5 at ≥1080px.
- **Copy column.** Vertically centred, padding 96px block and 64px right. It holds:
  1. the eyebrow in `accent-on-dark`, each item `nowrap` with its trailing separator;
  2. the display h1 with the gold full stop;
  3. one `button-on-dark` (→ `#services`, ↓).
- **Photo.** Cover, bleeding right, `object-position: 60% 50%`.
- **Below 1080px.** Stacked: copy first (padding 48px top/bottom, gutter sides, 40px bottom), then the photo at 3:2 full width, **`max-height: 50svh`**, `object-fit: cover`.

### Page hero (interior)
- **Order.** Breadcrumb (Small, ancestors linked, current item ink). Industry pages show the full trail (`Úvod / Služby / <page>`). **All three aviation pages show the same two-item trail `Úvod / Aviation`** (Aviation is a link on the two sub-pages and plain ink text on the index), because the tabs name the page. A breadcrumb never consists of "Úvod" alone. Aviation pages then show the tabs. Then the grid: h1 with full stop → 16px → lead → [32px → action] in cols 1–7, and the photo in cols 8–12 (height follows the copy, 240–300px, see Photography), top-aligned with the h1's first line box.
- **No photo.** The copy spans cols 1–8.
- **The last child of the copy column has `margin-bottom: 0`.** The hero's bottom padding (64px) is therefore always the true distance to the hairline. One hairline sits below the hero, always.
- **Hero action.** Pages with downloads show a `button-secondary` "Na stiahnutie ↓" (`#downloads`); others show none.
- **Below 1080px.** Copy, then the photo at 3:2 (`max-height: min(50svh, 400px)`, `object-fit: cover`) with exactly 32px above it, whether or not there is an action. The 400px cap keeps a 640–1079px tablet from showing a 600px-tall stock photo before the first line of content. The same cap applies to the home hero photo and the aviation teaser image below 1080px.

### Aviation sub-navigation
- **Placement.** On all three aviation pages, under the breadcrumb and above the h1.
- **Tabs.** Three tabs, UI type, 44px tall, 32px gap, a 1px hairline under the row. The current tab has the 2px `aviation` underline on that hairline.
- **Below 640px.** The row scrolls horizontally with `scroll-padding-inline: var(--gutter)`, and the current tab is scrolled into view with `inline: "start"`. A 32px fade is applied on **each** edge that has hidden tabs beyond it: right only (`linear-gradient(to right, #000 calc(100% - 32px), transparent)`) at scroll start, left only (`linear-gradient(to right, transparent, #000 32px)`) at scroll end, both in between. Classes `.fade-start` / `.fade-end` are toggled on `scroll` and on load. On the two sub-pages the row therefore always shows that "Testing Service Aviation" exists to the left. The current tab is scrolled in with `scroll-padding-inline-start: calc(var(--gutter) + 48px)`, so about 48px of the previous tab stays visible under the start fade and **the fade never covers the current tab's label**.
- **One hero type per tab set.** The three aviation pages switch with the tabs, so they share one hero type: all with a photo or all without. A missing subject photo (maintenance) is an owner item; until it arrives the page keeps the no-photo hero, and QA records the jump in hero height between tabs as a known owner-blocked difference, not a builder defect.
- **Local navigation.** The tabs *are* the division's local navigation, so aviation pages have **no Related block**.

### Service card (numbered report entry)
- The whole card is the link: `paper` on a `stone` band, **no photo**. Photos live on the service pages' heroes, where they illustrate one service rather than four stock moods in a row.
- Padding 32px top, 24px sides and bottom. Subgrid rows: numeral (Label, `accent`) → 16px → title (H3, the page h1 string) → 12px → description (Small `muted`) → 24px → "Podrobnosti →" text link pinned to the bottom. The card's bottom padding is measured to the link's text box (the link's 44px hit area extends upward, not down).
- **Description.** One complete sentence in the card's language, never truncated with an ellipsis. On ZH, use the first sentence of the source paragraph. If the description only restates the title, the owner rewrites it; until then show it unchanged.
- **Hover/focus-within.** 2px accent top rule, title underline.

### Lists (one component)
- **List row.** A hairline-topped stack. Each row is at least 56px tall with 16px vertical padding. Title in the **List** token.
  - At ≥640px the optional meta (Label `muted`: `PDF`, `XLSX · EN`) sits **on the same line, right-aligned, 16px before the icon**, so every row in a stack has the same height. Meta must add information the title lacks: a row whose title is an e-mail address has **no** meta (the `@` and the ↗ already say it).
  - An e-mail address in a row, the footer or a fact may break only after "@" (`<wbr>` after the "@"); the icon stays bound to the last part. Nothing overflows its column at 1080px.
  - Below 640px the meta moves under the title.
  - Then the arrow-grammar icon, right-aligned, 16px. Hover: title and icon in `accent`. The last row closes with a hairline.
  - Used for downloads, external links, e-mail rows, related pages and contact details.
- **Disclosure row.** A list row whose icon is + / −, summary in the **List** token (17/500, not 15px). When it follows a list it is the last row of that stack. When it follows a capabilities grid it keeps its own top rule with `margin-top: -1px`, so one full-width rule closes the grid even when the last row is partial. A disclosure always ships closed.
- **Capabilities list** (home packages). List rows without icons, Body 400 ink, in the capabilities grid (3/2/1 columns, row by row, `align-items: start`, rows sized to their own content, so the first lines of a row share one baseline and single-line items are neither centred nor padded to the tallest item on the page). The disclosure row spans the full width under it.
- **Prose lists.** Bullets in `muted`, 20px indent, 4px between items, nested lists indented a further 20px. A "loose" Markdown list (blank lines between some items) renders exactly like a tight one: `.prose li > p { margin: 0 }`. A nested list sits 4px below its parent item's text and adds no bottom margin (`.prose li > :is(ul, ol) { margin-block: 4px 0 }`); only top-level lists get the 16px block margin.
- **Ordering.** Downloads are ordered order forms → price lists → certificates → leaflets → external references. A row that only repeats an inline link in the prose above it is omitted.

### Article (prose page) and the one page ending
- **Grid.** Margin + content, as **one** grid that contains the prose *and* every ending block (downloads, partners, related). There is no separate `.related` section any more.
- **Content (cols 5–12).** `.prose` capped at `measure` (cols 5–10), followed by the ending blocks, which span cols 5–12.
- **Margin (cols 1–3): the report rail.** One `<nav class="rail">` in an `<aside>` that spans the full height of the article grid row, so it stays sticky from the first paragraph to the last related row.
  - `position: sticky; top: var(--rail-top)` (96px = header 72 + 24). `max-height: calc(100dvh - var(--rail-top) - 24px); overflow-y: auto`.
  - **Optional facts block first ("Údaje").** A `<dl>` from the page's frontmatter `facts: [{ label, value }]` with 2–4 rows. Label `t.facts` ("Údaje" / "Key facts" / "要点"), then 16px, then rows. Each row: `dt` in Label type (`muted`) → 4px → `dd` in Small (14/1.55, `ink`), 12px block padding, 1px `line` rule between rows and below the last. **Every value uses only words from that page's own source text** (inflected forms count: a stand-alone value uses the nominative of a source word, e.g. source "vyhlášky" → value "vyhláška") (a regulation number, a certificate number, a location, a device group), **normalised by the Source Typography Rule** like the prose beside it, and in the base form a stand-alone value needs ("Žilina (LZZI)", not the genitive "Žiliny (LZZI)"; "vyhláška MPSVaR SR č. 508/2009 Z. z."; "VTZ – A, B, C"). The same fact never appears in two typographies on one screen.
    - **Two rows never share a label**; values under one label are joined with " · " in one row.
    - A fact never repeats the hero lead or a value in the first screen of prose beside it (the instruments order e-mail is already in the first prose line, so it is not a fact).
    - The block needs **two distinct rows**; with fewer, the page shows no facts block.
    - Never write a summary, a count or a claim. A page without facts in frontmatter shows no facts block. Then 48px.
  - Label `t.toc` ("Obsah"), then 16px, then the entries.
  - **Entries, in document order:** every prose h2 and h3 (h3 indented a further 12px), except the second heading of a heading stack and prose labels, then the ending blocks that exist ("Na stiahnutie a odkazy", "Naši partneri", "Ďalšie služby"). Entries come from the rendered headings and are never typed by hand. An entry wraps to at most **two lines**, and only text beyond that is truncated with an ellipsis, **in the rail only**; its `title` attribute carries the full text.
  - **Clamp anatomy.** The clamp sits on an inner `<span class="rail-text">` (`display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden`). The padding, the left rule and the current-state rule stay on the `<a>`. A clamp on the padded `<a>` itself lets the top of a third line show inside the bottom padding, which is what v5 does.
  - **Entry style (`rail-link`):** Small (14/1.55), `muted`, `padding: 8px 0 8px 12px` (h3: 24px left), 1px `line` left rule. Hover: `ink` text. **Current** (scroll-spy, `aria-current="location"`): `ink` text and a 2px `accent` left rule (`box-shadow: inset 2px 0 var(--accent)`), never accent-coloured text. The accent is a rule here, like every other active state.
  - **Scroll-spy truth.** No entry is current until its target's top has passed `rail-top + 24px`; while the reader is still in the text above the first heading, nothing is marked. When the page is scrolled to the bottom, the last entry is current.
  - The contents part is shown whenever it has **≥2 entries**; the rail as a whole is shown when it has a facts block or ≥2 contents entries. This covers every service page and every aviation page in SK and EN. Hidden below 1080px (the content is one column there and the hero already offers the downloads jump).
- **Below 1080px.** The contents part is hidden. The facts block, if any, renders between the hero hairline and the prose as a 2-column `dl` (1 column below 640px), with 32px below it.
- **Prose start.** The prose has `margin-top: 0` on its first child. The rail's Label baseline aligns with the first prose line (Baseline Rule).

After the prose, **every service page and every aviation page** ends with the same sequence. The blocks are 64px apart, each headed in H3 (`<h2 class="type-h3">`) with an `id` so the rail can link to it, all in cols 5–12:
1. **Na stiahnutie a odkazy** (`#downloads`): one merged list-row stack. Omit it when it is empty.
2. **Naši partneri** (`#partners`, aviation index only): the partner image at its natural size (≤480px), multiply-blended.
3. **Ďalšie služby** (`#related`, industry pages only): a list stack of the sibling service pages. It is the same component as the downloads block (H3 + list stack), **not** a margin Label. The rail owns the margin.

The article's bottom padding is `section-y`, measured from the last list's closing hairline to the footer band.

There is **no in-article closing strip.** The closing question lives in the footer's top row (below), so the contact call appears once per page ending instead of three times.

### Gallery
- On a **stone** band. A full-width section header at col 1: eyebrow "Žilina · LZZI" → 16px → h2.
- Grid as specified in Layout. "Ďalšie fotografie (57)" is a disclosure row spanning the grid.

### Forms (contact)
- **Layout.** Margin + content at ≥1080px: details in cols 1–4, form in cols 5–12. Below 1080px, one column with the form first. The details column has `padding-top: var(--panel)`, so its H3 aligns with the form's H3.
- **Form panel.** On `stone`, padding `panel` (48px), `panel-sm` (24px) below 640px.
- **Labels.** Field label token (14/500/1.55), ink, 8px above the field. The privacy-notice link under the message field is a standalone text link: → icon and a 44px hit area. The input text itself is the `input` token: Body **400**, never inherited 500.
- **Fields.** Two per row at ≥640px. Focus: 2px `accent` outline at 2px offset, border ink. Invalid (`:user-invalid`): `error` border and message.
- **Details column.**
  - H3 company name, then the address in Body `text`.
  - E-mail rows as list rows (↗, no meta).
  - H3 "Aviation" (the same level as the company: both are contact points, so both are the same element, `<h2 class="type-h3">`) and its e-mail row. Each contact block is the same stack: H3 → 16px → address (if any) → 24px → e-mail row. Blocks are 48px apart, measured from the previous block's closing hairline to the next H3, so an H3 never floats between two rules at uneven distances.
  - 48px.
  - "Čoskoro" eyebrow, then "Praha" / "Prague" as the same element as the other two blocks (`<h2 class="type-h3">`), and the address.

### Clients strip
- Full-width section with 48px block padding and one hairline below.
- Row: the eyebrow "Naši klienti" on the left; the text link "Referencie EN →" on the right.
- Logos in 5 equal cells (3 + 2 centred below 640px) at a **40px optical height**: grayscale, `opacity: .7`, 1 on hover.

### Home packages (all three languages, one pattern)
- Full-width section: section header (h2 `t.packages` → 16px → lead `packageLead`) → 48px → **rows** → the disclosure row "Celý popis balíkov", **closed**.
- **Rows.** The language's capabilities list when it has one (SK, EN). A language without one (ZH) shows the **package names** instead: the text of the body's package headings, in order, in the same capabilities grid (one row of three at ≥1080px). They are derived from the body, never typed.
- **The section never says a thing twice.** `t.packages` must differ from every package name, and when rendering the disclosure body:
  - a leading paragraph equal to `packageLead` is not rendered;
  - a heading equal to `t.packages` is not rendered;
  - a paragraph whose text equals the heading that immediately follows it (the source's teaser label, e.g. "供应商套餐") is not rendered;
  - body headings render one level down (`##` → h3 in the H3 token), because they sit under the section h2.
- Content that only the owner can resolve (two wordings of the same package in the SK source) stays until the owner picks one.

### Aviation teaser (home, all three languages)
- A light section on stone inside `.aviation-scope`. Image in cols 1–6 at 3:2; copy in cols 8–12, **top-aligned with the image** (not vertically centred).
- Copy: optional TS-A mark (56px, then 24px) → h2 "Testing Service Aviation" → 16px → lead → 32px → `button-secondary` "Podrobnosti →". With no lead (ZH), the gap from h2 to the button is 32px.
- The image is not the aviation page hero, and it doesn't appear in the gallery.
- Below 1080px the teaser is stacked, with the image at 3:2 and `max-height: 50svh`.

### Footer (the one page ending)
- **Band.** Ink, padding `section-y` top and 32px bottom. On the contact page there is no top row, and the grid starts exactly 64px below the band's top (`.footer-grid` gets no extra top padding there).
- **Top row (the closing; every page except contact).**
  - **Cols 1–7:** h2 `t.ctaQuestion`, white, no full stop: SK "Máte otázku?", EN "Have a question?", ZH "有疑问？". Then, if the page has a `closing` text that differs from the question, it follows 16px below in Body `text-on-dark`, max 52ch.
  - **Cols 8–12, left-aligned at column 8** (x = 843 at 1440, the same edge as the home intro paragraph and the aviation teaser copy). The e-mail's first baseline aligns with the h2's first baseline:
    the division e-mail as a text link at Lead size with a 44px hit area (industry: jakub.kubis@; aviation: info.aviation@), then 16px, then `button-on-dark` `t.enquiry` → contact `#enquiry`.
  - 48px below the top row, one `line-on-dark` hairline.
  - Below 1080px it is one column, left-aligned at the gutter.
  - The h2 never equals the header CTA label (`t.cta`), so the sticky header and the footer never say the same thing on one screen.
- **Grid: four balanced columns, at most 6 items each, every link exactly once.**
  1. **Company:** name; address. No e-mail; it is in the top row.
  2. **Právne údaje:** register; IČO; IČ DPH; "Ochrana osobných údajov →" (the privacy page, which holds the GDPR PDF); "Oprávnenie ↓" (the accreditation PDF).
  3. **Služby:** the four service links (→), from the single service list.
  4. **Aviation:** location line; info.aviation@ ↗; the three aviation page links (→).

  **The top-row e-mail wins.** The division e-mail shown in the top row is never repeated in the grid: on aviation pages column 4 has no info.aviation@ row; on industry pages column 1 has no jakub.kubis@ row. Every other link appears exactly once.
- **Footer rhythm.** Footer link items are separated by a fixed 8px gap (`row-gap: var(--space-2)`), each link `min-height: 24px` at ≥1080px (44px below), instead of a 32px minimum height: a link that wraps to two lines keeps the same 8px to the next item as a one-line link.
- **Lang tags in a footer column.** When every link in a footer column goes to the same other language (ZH pages: "我们的服务" and the three aviation page links go to EN), the tag appears once, after the column heading (`我们的服务 EN`), and not on each link. A column with mixed targets keeps per-link tags.

  Division documents (price lists, order forms, certificates, leaflets) live on their pages' download lists, not in the footer.
- **Footer type.** Headings H4 white; text and links Small `text-on-dark`, lh 1.55. The icon sits inline directly after the last word (8px, `white-space: nowrap` on the last word + icon), so a wrapped label never strands its arrow at the column edge.
- **Bottom row.** Hairline, then "© Testing Service s.r.o." on the left and the tagline Label `muted-on-dark` on the right; stacked below 640px.

## Content model (single sources of truth)
- **Services.** One ordered array `["permits", "consulting", "risk", "inspections"]` from `src/data/sections.ts`, consumed by the dropdown, mobile menu, home cards, related lists and the footer "Služby" column. One display title per language.
- **Aviation pages.** `["aviation", "instruments", "maintenance"]`, with the same treatment.
- **Downloads.** `{ file, title, titleEn?, page, lang, division, kind: "form" | "pricelist" | "certificate" | "leaflet" | "other" }`. `kind` drives the list order; `lang` drives the meta-line language. Titles contain no language notation and no bilingual "SK / EN" pairs. A bilingual title is split into `title` and `titleEn`.
- **UI strings.** Every key exists in SK, EN and ZH. `ctaQuestion` is the footer closing heading on every page. `t.cta` is used only by the header CTA and the mobile-menu CTA.

## Do's and Don'ts

### Do:
- **Do** take every size, colour, space, line-height and breakpoint from the tokens.
- **Do** write layout CSS mobile-first, with spans only inside `@media (width >= 1080px)`.
- **Do** start every section heading at column 1 and reading content at column 5.
- **Do** end every page with the same footer closing, and every service or aviation article with downloads → [partners] → [related].
- **Do** swap accents through `--accent*` only.
- **Do** check every page at 390, 640, 1024 and 1440px before calling a change done.

### Don't:
- **Don't** add decorative "technical" microcopy, or eyebrows that repeat their heading, the breadcrumb or the nav.
- **Don't** set any text below 12px, UI text at weight 400, or a line-height that isn't a token.
- **Don't** put the coloured full stop on anything except the page h1.
- **Don't** show the same call to action twice on one screen; the sticky header counts as being on every screen.
- **Don't** draw two hairlines where one block ends and the next begins.
- **Don't** stack two dark bands, use shadows outside the dropdown, or round corners.
- **Don't** truncate source copy with an ellipsis.
- **Don't** list a document or link twice in the footer, or a photo twice on a page.
- **Don't** use ↗ for internal links, → for `mailto:`, or ↓ for a link to another page.

## Changes in round 6
**Content structure (the remaining source of "inconsistency")**
- Heading Restoration Rule, second pass: data lines become a key line (List token + Small footnote), empty source headings are not rendered, a heading equal to the h1 is dropped and one starting with the h1 becomes a Body paragraph, prose labels take the level below their section heading but always the H4 token.
- Heading stack: at most two headings with no content between them, the second 16px below the first, and only the first in the rail.
- Prose H2 becomes fluid (24→28px).

**Typography**
- Wrap Rule: a mid-sentence capital single letter is a label bound to the preceding word ("Kategória A"); spaced slashes are bound so no line starts with "/"; numbers are bound to their label (`č.`, `No`); short compounds use a non-breaking hyphen in rows, cards and headings.
- New `field-label` token for form labels.

**Components**
- Rail: the two-line clamp sits on an inner span; the Baseline Rule covers articles that open with a heading.
- One icon binding for every link with an icon (last word + icon nowrap); standalone text links are inline-block, not inline-flex.
- Page-hero photo height follows the copy (240–300px) at ≥1080; one hero type per aviation tab set (owner-blocked for maintenance).
- Footer: the top-row e-mail is never repeated in the grid; links are 8px apart regardless of wrapping; a column whose links all go to one other language shows its lang tag once on the heading.
- Contact: the Prague block uses the same element as the other two.

## Changes in round 5
**Content typography (the remaining source of "inconsistency")**
- Facts: source words, normalised typography, base form, unique labels, no repeats, two rows minimum.
- Source Typography Rule gains compounds, quotes, slashes, units/colons, one-list-one-style and heading punctuation; new Heading Restoration Rule.
- Wrap Rule binds spaced dashes and Slovak/Czech one-letter words with a non-breaking space; CJK punctuation is exempt from Latin normalisation.

**Components**
- Home packages: one pattern in every language (rows + closed disclosure), package names as rows when there are no capabilities, a no-repeat rule for the body, body headings one level down. Replaces round-4 "open when no capabilities".
- Capabilities rows size to their own content; the disclosure keeps its own top rule.
- Rail: scroll-spy marks nothing before the first target; entries wrap to two lines.
- Mobile menu: every row is a 57px List row (`menu-row`).
- Aviation tabs: 48px scroll-padding so the fade never covers the current tab.
- Lists: no `E-MAIL` meta; e-mail addresses break only after "@"; loose lists render like tight ones.
- Contact: both contact blocks share one element and one stack; the privacy link is a full text link.

**Layout**
- `hairline-gap` token for both sides of the hero hairline (64px at 1440, 40px at 390).
- Page-hero photo 16:9 at ≥1080; photo subject must match the page.

## Changes in round 4
**Reading layout (long pages)**
- The article margin (cols 1–3) becomes the **report rail**: a sticky contents list built from h2 + h3 + the ending blocks, shown at ≥2 entries. Previously it needed ≥2 h2s, so 10 of 17 article pages (both aviation indexes, SK instruments, both maintenance and both risk pages, EN consulting, SK legal, and the EN/ZH references pages) showed an empty 445px left margin beside a narrow column.
- `measure` 38rem → 40rem, so the reading column is exactly cols 5–10.
- Related moves inside the article grid as an H3 + list block, identical to downloads; the rail owns the margin, so no margin Label competes with it. Ending blocks are 64px apart.
- Rail active state = ink text + 2px accent left rule (accent is never a text colour for an active state).
- Optional "Údaje" facts block at the top of the rail (frontmatter `facts`, values verbatim from source), shown as a strip above the prose below 1080px.

**Smaller system fixes**
- Footer closing column left-aligned at col 8 with baseline alignment to the h2.
- Aviation tabs fade on both overflowing edges.
- Nested prose lists: 4px top, 0 bottom.
- Capabilities grid `align-items: start`.
- Font loading: preload + metric-matched fallback, CLS < 0.05.
- Source Typography Rule covers units, letter lists and balanced parentheses.

**Hero and navigation**
- Aviation breadcrumb is always `Úvod / Aviation`; no breadcrumb is "Úvod" alone.
- Stacked hero, home hero and teaser photos are capped at `min(50svh, 400px)` below 1080px.

**Content**
- The Source Typography Rule applies to the aviation prose too. Its fragment paragraphs ("…divízia Aviation", "…avionický systém", "…povinné", "…letovej spôsobilosti") end with full stops.

## Changes in round 3
**Grid and rhythm**
- Two section patterns, with every heading at col 1 (home packages and gallery move to the full-width pattern; the home intro becomes a 7/5 statement split).
- Baseline Rule and Hairline Adjacency Rule.
- The last element in the page hero has `margin-bottom: 0`.

**Type**
- H4 at 500, and a List token (17/500/1.4) for every row and disclosure.
- Wordmark tokens, and line-heights become part of the Step Rule.

**Page ending**
- The in-article closing strip is removed. The footer top row is the single closing (`ctaQuestion` + e-mail + `t.enquiry`).
- Aviation pages drop Related (the tabs are the local nav) and the current breadcrumb.

**Footer**
- Rebuilt as four balanced columns, with no documents repeated from the pages.

**Components**
- Service cards become photo-free numbered entries, with the card grid at 540/1120.
- Home hero photo capped at 50svh below 1080px.
- Interior heroes lose their eyebrow, and the teaser loses its eyebrow and is top-aligned.
- One lang-tag (boxed on dark too; in list rows the language goes in the meta line).
- List meta inline at ≥640px.
- Mobile-menu rule fix with no "Všetky služby" row; dropdown flush, with the → arrow.
- Tab fade; contact details aligned to the form; input weight 400; 44px hit areas for the brand, footer e-mail, and mobile breadcrumb and footer links.

**Content**
- Source Typography Rule protects Markdown lists and capitalises fragments.
- Downloads get `kind` and `titleEn`.
