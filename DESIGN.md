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
typography:
  display:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(2.75rem, 1.6rem + 3.6vw, 4.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.03em"
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
  h3:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  h4:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
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
  label:
    fontFamily: "IBM Plex Sans Variable, Arial, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.12em"
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
  section-y: "clamp(64px, 3rem + 4vw, 120px)"
  container: "1312px"
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
  service-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px"
  list-row:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "16px 0"
---

# Design System: Testing Service

## Overview

**Creative North Star: "The Inspection Report"**

The site should read like a well-made inspection report or a certificate dossier from a serious technical body: a strict grid, hairline rules, labelled fields, numbered items, generous margins, and one signature mark (the gold of the seal). Authority comes from order and precision, not from decoration. Every label carries real information (a jurisdiction, a regulation, a file type, a section name), and anything that only looks "technical" gets cut.

This is a refinement of the incumbent v0 world (graphite-navy, warm paper, gold, IBM Plex Sans, square corners, hairlines), not a replacement. What changes is discipline: one type scale, one spacing scale, one 12-column grid with fixed column starts, one button family, one section-header pattern, one list-row pattern, and one image treatment, used identically on every page and in every language. The dark colour appears in exactly three places: the home hero, the header CTA/buttons, and the footer. Everything else sits on paper and stone.

Density is calm and document-like: long legal prose is the core content, so the reading column is narrow (max 68ch) and the page relies on whitespace and rules rather than boxes.

**Key Characteristics:**
- Graphite ink on warm paper, gold used as a seal (sparingly), aviation blue as the division accent.
- IBM Plex Sans only. Hierarchy comes from size and weight, never from extra typefaces.
- Square corners everywhere (0px). Hairline 1px rules instead of shadows and boxes.
- A 12-column grid where *content always starts at column 5* on desktop, so every page shares the same left edge for reading text.
- No decorative microcopy, no faux-technical captions, no section numbering for its own sake.

## Colors

A restrained, warm-neutral palette: graphite-teal ink, paper and stone neutrals, one gold accent, and a separate aviation blue that replaces gold inside the Aviation division.

### Primary
- **Seal Gold** (`gold`): the brand accent on light surfaces. Used for the single full stop that ends each page's h1, the active-nav underline, hover colour of text links, the focus ring, and small numerals in service cards. AA as text on paper (5.27:1) and stone (4.8:1). Never a background fill on light surfaces.
- **Seal Gold on Dark** (`gold-on-dark`): the same role on ink surfaces. It's the only colour used as a button fill (primary button on dark: home hero, footer). 8.47:1 against ink.

### Secondary
- **Aviation Blue** (`aviation`) / **Aviation Blue on Dark** (`aviation-on-dark`): the division accent. Inside `body.aviation` (all three aviation pages) and inside the home "Aviation" teaser it *replaces* gold one for one in every accent role: h1 full stop, eyebrow, active underlines, link hover, focus ring, footer arrows. It's never used alongside gold in the same component.

### Neutral
- **Graphite Ink** (`ink`): headings, UI text, primary button fill, dark surfaces (home hero, footer).
- **Ink Raised** (`ink-raised`): the only second dark tone. Used for the image-overlay surface on dark, and for the mobile menu panel when it's opened over a dark hero. Replaces the ad-hoc `#203c49`.
- **Ink Hover** (`ink-hover`): hover state of ink buttons. Replaces the ad-hoc `#33494e`.
- **Body Text** (`text`): long-form prose paragraphs and list items (9.3:1). Replaces the ad-hoc `#465659`.
- **Muted** (`muted`): metadata, eyebrows on light, captions, breadcrumb, form help (5.78:1 on paper).
- **Paper** (`paper`): the page background.
- **Stone** (`stone`): alternate section band and form panel. Replaces the ad-hoc `#eceee9` literals.
- **White** (`white`): input fields and button text on ink. Not a section background.
- **Hairline** (`line`): all 1px dividers and list rules on light.
- **Strong Hairline** (`line-strong`): input borders and the secondary-button border (3.19:1, meets 1.4.11 non-text contrast; the v0 `#98a5a3` fails at 2.39:1).
- **Hairline on Dark** (`line-on-dark`), **Text on Dark** (`text-on-dark`), **Muted on Dark** (`muted-on-dark`): the footer and hero equivalents.

### Named Rules
**The Seal Rule.** Gold (or aviation blue) covers well under 5% of any screen. It marks one thing per component: an active state, a numeral, or the full stop. If two gold elements sit side by side, one of them is wrong.

**The One Full Stop Rule.** The coloured full stop is a brand signature with exactly one use: the end of the page's h1 (the home display headline included). Never on h2, card titles, the footer, or form headings.

**The Accent Swap Rule.** Components read `var(--accent)` / `var(--accent-on-dark)` and never a literal gold. `body.aviation` and `.aviation-scope` reassign both variables. A hard-coded gold anywhere means a missed swap.

**The Visible Focus Rule.** The focus ring is `2px solid var(--focus)` at 3px offset. `--focus` = `--accent` on light surfaces, and every dark band (`.on-dark`: home hero, footer, mobile menu over dark) sets `--focus: var(--accent-on-dark)`. A ring on ink at the light-surface accent measures 2.3–2.7:1 and fails 3:1.

**The Two-Dark Rule.** Only `ink` and `ink-raised` exist as dark surfaces. Two dark bands are never stacked against each other without a paper or stone section between them, except the footer.

## Typography

**Display / Body Font:** IBM Plex Sans Variable (fallback Arial, then PingFang SC / Microsoft YaHei for CJK)

**Character:** a single engineered grotesque with a slight typewriter warmth. It reads like technical documentation set by a careful typographer. Weight 500 for headings, 400 for text, 600 only for labels and h4.

### Hierarchy
- **Display** (500, `clamp(2.75rem, 1.6rem + 3.6vw, 4.5rem)`, lh 1.05, -0.03em): home hero h1 only. `max-width: 13ch; text-wrap: balance`.
- **H1** (500, `clamp(2.25rem, 1.5rem + 2.4vw, 3.5rem)`, lh 1.1, -0.025em): interior page titles. `max-width: 20ch; text-wrap: balance`.
- **H2** (500, `clamp(1.75rem, 1.3rem + 1.4vw, 2.5rem)`, lh 1.15, -0.02em): section headings on structured pages (home sections, gallery, related, contact). Inside prose, h2 uses the **Prose H2** step below.
- **Statement** (400, `clamp(1.375rem, 1.15rem + 0.8vw, 1.875rem)`, lh 1.35, -0.01em, max 34ch): a full-sentence positioning paragraph, e.g. the home intro "Testing Service je úzko špecializovaná…". Sentences are never set as h2.
- **Prose H2** (500, 1.75rem / 28px, lh 1.25, -0.015em, margin 56px 0 16px): section headings inside Markdown articles.
- **H3** (500, 1.375rem / 22px, lh 1.3, -0.01em): card titles, related-service titles, prose sub-sections (prose h3 margin 40px 0 12px).
- **H4** (600, 1.125rem / 18px, lh 1.4, 0): small headed groups (footer column headings, contact sub-heads, "Potrebujeme:"-style labels in prose).
- **Lead** (400, `clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)`, lh 1.55, colour `muted`, max 52ch): the one-sentence page description under h1, section intros.
- **Body** (400, 1.0625rem / 17px, lh 1.65, colour `text`, max 68ch): prose and card descriptions (cards use **Small**).
- **Small** (400, 0.875rem / 14px, lh 1.55): card descriptions, footer text, form help, breadcrumb.
- **UI** (500, 0.9375rem / 15px, lh 1.2): nav links, buttons, list-row titles, language switcher.
- **Label** (600, 0.75rem / 12px, +0.12em, UPPERCASE, colour `muted`): eyebrows, file-type tags, card numerals, the lang-tag.

### Named Rules
**The 12px Floor Rule.** Nothing on the site renders below 0.75rem (12px): no 0.49rem logo subtitles, no 0.5rem hero footers, no 0.65rem captions. Text too unimportant to be 12px gets deleted.

**The Step Rule.** Every font-size in CSS is one of the tokens above. No component-local sizes (v0 has 40+ distinct sizes; the target has 12).

**The Wrap Rule.** All headings get `text-wrap: balance`; paragraphs, leads and list items get `text-wrap: pretty`. No orphans in display type.

**The CJK Rule.** Under `:lang(zh)`, headings get `letter-spacing: 0`, `font-weight: 600`, `line-height: 1.3`; body `line-height: 1.8`; labels drop `text-transform` and letter-spacing to `0.04em`. Negative tracking is a Latin-only optimisation.

## Layout

**Container:** `width: min(100% - 2 × gutter, 1312px)`, centred. Gutter `clamp(20px, 5vw, 64px)`.

**Grid:** 12 columns, column gap 24px (desktop ≥1080px), 16px (below). Every multi-column section uses this grid (no more `1fr 2.1fr`, `1fr 2.3fr`, `1.2fr 1fr`, `1.1fr 1fr`, `1fr 1.3fr` one-offs). Fixed spans:

| Pattern | Left | Right |
|---|---|---|
| **Label + content** (home intro, article, packages, related heading, gallery heading) | cols 1–3: eyebrow/aside | cols 5–12: content (prose capped at 68ch, i.e. ≈ cols 5–11) |
| **Page hero with photo** | cols 1–7: eyebrow, h1, lead, action | cols 8–12: image 4:3 |
| **Home hero** | full-bleed split 50/50, copy aligned to container col 1 | photo bleeds to the right viewport edge |
| **Contact** | cols 1–4: details | cols 5–12: form panel |
| **Card grid** | 4 × 3 cols (≥1080), 2 × 6 cols (640–1079), 1 col (<640) | |
| **Footer** | 4 × 3 cols | |

**The Column-Five Rule.** On desktop, all reading content (intro statement, prose, packages list, contact form, related list) starts at column 5. A visitor scrolling any page sees one left edge for content and one for labels.

**Vertical rhythm** (4px base, tokens `spacing.1–10`):
- Section padding: `section-y` = `clamp(64px, 3rem + 4vw, 120px)` top and bottom, the same for every section on every page. No per-section overrides.
- Section header → section content: 48px (32px below 640px).
- Eyebrow → heading: 16px. Heading → lead: 16px. Lead → action: 32px.
- Prose paragraph spacing: 0 0 16px; list items 4px apart; lists 16px from surrounding paragraphs.
- Page hero: breadcrumb at 24px below the header; hero block padding 48px top, 64px bottom; then one hairline; then the article starts after `section-y`/2 (48px).
- Separation between sections is either a background change (paper ↔ stone) **or** a hairline, never both and never two hairlines in a row.

**Breakpoints:** only two. `sm` = 640px, `md` = 1080px (navigation collapses below `md`). Everything else is fluid via `clamp()`. Remove the v0 1600 / 1250 / 1049 / 700 / 400 set.

**Header height:** 72px desktop, 60px below `md`. The header is `position: sticky; top: 0` on paper with a bottom hairline, so long legal pages keep navigation and the CTA in reach. `scroll-padding-top` = header height + 24px.

## Elevation & Depth

Flat by default. Depth comes from tonal bands (paper → stone → ink) and 1px hairlines. The only shadow in the system is on the desktop services dropdown, which floats over content: `box-shadow: 0 12px 32px rgb(24 41 46 / 0.10)`. Cards, forms and images have no shadow and no hover lift.

**The Flat Report Rule.** If something needs separation, use a hairline or a tonal step. A shadow outside the dropdown is a bug.

## Shapes

Square corners (0px) on everything: buttons, cards, inputs, images, the form panel, the dropdown. The only rounded value is the 2px focus-ring radius. Rules are 1px `line` (or `line-on-dark`). Active states use a **2px accent underline** (nav, language switcher, aviation sub-nav), the system's one "marker" shape. Cards may use a 2px accent top rule on hover, the same marker.

Photography is always rectangular at fixed ratios: 3:2 (cards, gallery), 4:3 (page hero), full-bleed cover (home hero). All photos get the same treatment: `filter: saturate(0.8)`. Logos are never filtered except in the client strip (grayscale).

## Components

### Header / Navigation / Language switcher
- **Layout (≥1080px):** brand at col 1; then the nav (Služby ▾, Aviation, Referencie; there is no separate "Kontakt" link, because the CTA *is* the contact entry and goes to the contact page), then the header CTA, then a 1px vertical hairline (24px tall), then the language switcher. All items vertically centred on the 72px bar.
- **Brand:** the logo **roundel only**, cropped from `logo_zlate.png` (the gold ring with red T.S., *without* the red wordmark and tagline bar, which are illegible at header size), 40px tall (32px below `md`), plus the text "TESTING SERVICE" in UI type (15px, 600, +0.04em, uppercase). No tagline in the header; the tagline appears once, in the footer bottom row.
- **Nav links:** UI type, ink, 44px hit height, 28px gap. Hover: colour `accent`. Current page or section: ink text + 2px `accent` underline 6px below the baseline (the same marker as the language switcher). The "Služby" summary is current on service pages.
- **Cross-language tag:** when a nav target exists only in another language, append a **lang-tag**: Label type, `muted`, 1px `line` border, padding 1px 4px, 6px left margin (e.g. Referencie `EN`). The same component is used in the nav, the dropdown, card links, the footer and the home clients link, replacing the mixed `<small> EN</small>`, " (EN)" and "(EN)" in labels.
- **Services dropdown (desktop):** 360px panel, white, 1px `line` border, the dropdown shadow, opening 12px below the bar, left-aligned to the summary. Rows: UI type, 16px vertical padding, hairline between. The first row is "Všetky služby →" in Label style. Chevron: a 10px CSS/SVG chevron, not the `⌄` glyph.
- **Header CTA:** `button-header` (44px tall, 20px horizontal padding, label + → icon, 8px gap). It must never be taller than the nav hit area.
- **Language switcher:** three items, SK · EN · 中文, UI type at 14px, 44 × 44 hit area each, current item ink 600 with the 2px accent underline, others `muted`, hover ink.
- **Below 1080px:** row = brand · language switcher · menu button. The menu button is 44 × 44 minimum, 1px `line-strong` border, showing a 3-line SVG icon plus the label "Menu" (hide the label below 400px, keep `aria-label`). The open panel spans the full width under the header on paper: links at 17px with 52px rows and hairlines between, services listed expanded and indented 16px, the CTA as a full-width `button-primary` at the bottom.

### Buttons
- **Shape:** square, 48px tall, 24px horizontal padding, UI type, label then icon with a **fixed 12px gap** (not `space-between` with 2rem). The icon is a 16px SVG arrow.
- **Primary (light surfaces):** ink fill, white text. Hover `ink-hover`. Focus: 2px `accent` outline, 3px offset.
- **On dark:** `gold-on-dark` fill, ink text. Hover `gold-on-dark-hover`. Used for the home hero action and the footer "contact" action.
- **Secondary:** transparent, 1px `line-strong` border, ink text. On dark: 1px `rgb(255 255 255 / .4)` border, white text. Used for the interior page-hero CTA (so it doesn't compete with the header CTA) and for "Aviation" on the home teaser.
- **Text link:** UI type, ink, 1px underline at 4px offset in `line-strong`, turning `accent` on hover.
- **Arrow grammar (the Arrow Rule):** → internal page, ↗ external site (Drive, EUR-Lex, AIP), ↓ file download or in-page jump. Never decorative.

### Section header
One pattern for every section on every page: `eyebrow` (Label, `muted`, *informational*: "Služby", "Referencie", "Aviation", "Na stiahnutie"), then 16px, then h2, then an optional lead (16px below, max 52ch), with an optional trailing text link aligned to the h2 baseline on the right (desktop) or below the lead (mobile). In label + content sections the header sits in cols 1–3 (eyebrow) and cols 5–12 (h2 + lead). No numbering ("01 /", "02 /"), no "TESTING SERVICE" filler eyebrows, no coloured full stop.

### Home hero
Ink band, `min-height: min(680px, 88svh)`. Copy column: eyebrow in `gold-on-dark` ("Inšpekcie · Certifikácie · Povolenia · CZ + SK", or the localised equivalent from existing copy), display h1 (max 13ch, balanced), lead in `text-on-dark` (max 36ch), one `button-on-dark` (→ #services, ↓ icon). Photo: cover, bleeds right, `object-position: 60% 50%`, the standard saturate(0.8). **No caption bar, no tagline footer** inside the hero. Below 640px: copy first (padding 48px gutter 40px), then the photo at 4:3.

### Page hero (interior)
Breadcrumb (Small, `muted`, full trail: Úvod / Služby / *Current*, or Úvod / Aviation / *Current*; every ancestor a link; current item ink, not linked). Then the grid: cols 1–7 eyebrow (section name), h1 + accent full stop, lead, secondary button; cols 8–12 the 4:3 photo, top-aligned with the eyebrow. Without a photo, the text block spans cols 1–8. One hairline below the hero, always.

### Aviation sub-navigation
On all three aviation pages, directly under the breadcrumb and above the h1 (so the division reads as one place): a row of three tabs in UI type, 44px tall, 32px gap, 1px hairline under the whole row, current tab with the 2px `aviation` underline sitting on that hairline.

### Service card
- Grid item linking the whole card; `background: paper` on a stone band.
- Image 3:2 on top; content padding 24px.
- Card internals use **CSS subgrid** (`grid-row: span 4; grid-template-rows: subgrid`) so numeral, title, description and link line up across all four cards whatever the title length.
- Numeral row: Label in `accent` ("01"). No duplicate ↗ icon in the corner.
- Title: H3. Description: Small, `muted`, from the page's short `description` (one or two sentences), max 4 lines.
- Link: "Podrobnosti →" text link, pinned to the bottom.
- Hover/focus-within: 2px `accent` top rule over the image, title gets an underline. No colour or saturation change on the image.

### Lists
- **List row** (downloads, external references, related services, capabilities): one component. A hairline-topped stack; each row 16px vertical padding (min 56px tall), UI-type title in ink, an optional Label meta line below (e.g. `PDF`, `XLSX`), the arrow-grammar icon right-aligned. Hover: title in `accent`. The last row closes with a hairline. Adjacent lists merge into one stack with **one** heading; a list is never followed by an empty bordered row.
- **Capabilities list** (home packages): list rows without icons, Body type in ink, laid out in **2 columns** in cols 5–12 (1 column below 640px), filling column by column (`grid-auto-flow: column` with the row count computed from the item count) so there are no ragged half-empty rows.
- **Prose lists:** standard bullets in `muted`, 20px indent, items 4px apart, text colour `text`.

### Article (prose page)
Label + content grid. Aside (cols 1–3): `position: sticky; top: header + 24px`; "Obsah" eyebrow plus links to the page's h2s, Small type, 1px left rule, current/hover in `accent`. It's shown only when the page has ≥2 h2s of ≤80 characters each, and hidden below 1080px. No "TESTING SERVICE / CZ + SK" side note. Content (cols 5–11): `.prose`, max 68ch. After the prose, in order: downloads and links (one merged list-row stack), partners, then a closing CTA strip (hairline, h4 "Máte otázku k tejto službe?" or the existing `t.cta` string, plus a primary button).

### Gallery
Section header (eyebrow "Žilina · LZZI", h2), then a 4-column 3:2 grid (2 columns below 640px), 16px gap. The "more photos" disclosure uses the same list-row look (hairline, UI-type label, + / − icon at 16px).

### Forms (contact)
Form panel on `stone`, 40px padding (24px below 640px), square. Labels: Small 500 ink, 8px above the field. Inputs: `input` token, white, 1px `line-strong`, 48px tall, textarea min 160px. Focus: 2px `accent` outline at 2px offset, border becomes ink. Invalid (after interaction, `:user-invalid`): border and help text in a dark red `#9b2c1f` with the message below the field. Required marker: `*` in `muted` plus the existing "Povinné polia…" note. Two fields per row ≥640px.

### Clients strip
Eyebrow "Naši klienti" left, text link "Referencie EN →" right (with lang-tag). Logos sit in a 5-column row (3 + 2 centred below 640px), each normalised to a **36px optical height** (tune per logo: wide marks such as Dürr shorter, round marks such as VW taller, so they read as equal), grayscale, `opacity: .7`, 1 at hover. 48px above and below; one hairline below.

### Aviation teaser (home)
**Light** section on stone (not a third dark band) inside `.aviation-scope`, so accents swap to aviation blue. Grid: image cols 1–6 at 3:2, copy cols 8–12: eyebrow "Aviation", h2 "Testing Service Aviation", lead, secondary button "Podrobnosti →". The TS-A logo (`TS-A_Logo.png`) may appear at 56px above the eyebrow as the division mark.

### Footer
Ink band, padding `section-y` top, 32px bottom.
- **Top row:** h2 "Kontaktujte nás" (white, no full stop) in cols 1–7; on the right (cols 8–12, baseline-aligned) the email as a text link at Lead size and a `button-on-dark` "Napíšte nám →" to the contact form. 48px below, one `line-on-dark` hairline.
- **Grid (4 × 3 cols):** Company (name, address, main email), Legal (court register, IČO, IČ DPH, privacy link), Downloads (the files listed directly as links, no `<details>` wrapper repeating the heading), Aviation ("Aviation Testing Center · Letisko Žilina (LZZI)", exactly as the content already states it; the info.aviation email; links to the three Aviation pages). Column headings H4 white; text Small `text-on-dark`; links without underline, underline on hover, 32px min hit height.
- **Bottom row:** hairline, then "© Testing Service s.r.o." left and the tagline "Inspection · Certification · Permit" (Label, `muted-on-dark`) right. Below 640px both stack left-aligned.

## Do's and Don'ts

### Do:
- **Do** take every size, colour, space and breakpoint from the frontmatter tokens, exposed as CSS custom properties in `src/styles/global.css` (`--color-*`, `--text-*`, `--space-*`).
- **Do** start reading content at grid column 5 on desktop on every page (the Column-Five Rule).
- **Do** use the same section padding (`section-y`) for every section.
- **Do** swap accents through `--accent` / `--accent-on-dark` only (the Accent Swap Rule).
- **Do** label cross-language links with the one lang-tag component.
- **Do** keep the reading column at max 68ch and set full sentences as Statement or Lead, never as headings.
- **Do** crop the logo to the roundel for the header and keep the brand assets' original colours.

### Don't:
- **Don't** add decorative "technical" microcopy: no "TESTING SERVICE / CZ + SK" eyebrows on every hero, no "01 / TESTING SERVICE" section numbers, no "CZ · SK / EN · STN · ČSN" floating labels, no caption bar on photos, no repeated tagline lines.
- **Don't** set any text below 12px.
- **Don't** put the coloured full stop on anything except the page h1.
- **Don't** stack two dark bands, or use a dark tone other than `ink` / `ink-raised`.
- **Don't** create component-local font sizes, paddings or grid ratios.
- **Don't** use shadows except on the services dropdown, or rounded corners anywhere.
- **Don't** let a CTA button be taller than 48px (44px in the header).
- **Don't** use ↗ for internal links.
