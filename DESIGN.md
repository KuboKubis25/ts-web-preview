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
    fontSize: "1.75rem"
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
  grid-gap: "24px"
  section-y: "clamp(64px, 3rem + 4vw, 120px)"
  container: "1312px"
  measure: "38rem"
  header: "72px"
  header-compact: "60px"
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
    height: "56px"
---

# Design System: Testing Service

<!-- Round 2 (2026-11-12): refined after the v1 review (docs/review/review-2.md). Changes from round 1 are
summarised in "Changes in round 2" at the end. Where this file and review-1.md disagree, this file wins. -->

## Overview

**Creative North Star: "The Inspection Report"**

The site should read like a well-made inspection report or a certificate dossier from a serious technical body: a strict grid, hairline rules, labelled fields, numbered items, generous margins, and one signature mark (the gold of the seal). Authority comes from order and precision, not from decoration. Every label carries real information (a jurisdiction, a regulation, a file type, a section name it doesn't already repeat), and anything that only *looks* "technical" gets cut.

This is a refinement of the incumbent world (graphite-navy, warm paper, gold, IBM Plex Sans, square corners, hairlines), not a replacement. The discipline is: one type scale, one spacing scale, one 12-column grid with fixed column starts and **one collapse rule**, one button family, one section-header pattern, one list-row pattern, one page ending, one image treatment, used identically on every page, in both divisions and in every language. The dark colour appears in exactly three places: the home hero, buttons/header CTA, and the footer. Everything else sits on paper and stone.

Density is calm and document-like: long legal prose is the core content, so the reading column is narrow (`measure` = 38rem ≈ 70 characters) and the page relies on whitespace and rules rather than boxes.

**Key Characteristics:**
- Graphite ink on warm paper, gold used as a seal (sparingly), aviation blue as the division accent.
- IBM Plex Sans only. Hierarchy comes from size and weight, never from extra typefaces.
- Square corners everywhere (0px). Hairline 1px rules instead of shadows and boxes.
- A 12-column grid where *reading content always starts at column 5* on desktop; below 1080px everything is one column.
- No decorative microcopy, no faux-technical captions, no labels that repeat their own heading.

## Colors

A restrained, warm-neutral palette: graphite-teal ink, paper and stone neutrals, one gold accent, and a separate aviation blue that replaces gold inside the Aviation division.

### Primary
- **Seal Gold** (`gold`): the brand accent on light surfaces. Used for the full stop that ends each page's h1, the active-nav underline, hover colour of text links and list rows, the focus ring, and card numerals. AA as text on paper (5.27:1) and stone (4.8:1). Never a background fill on light surfaces.
- **Seal Gold on Dark** (`gold-on-dark`): the same role on ink surfaces, and the fill of `button-on-dark` (home hero, footer). 8.47:1 against ink.

### Secondary
- **Aviation Blue** (`aviation`) / **on Dark** (`aviation-on-dark`) / **on Dark hover** (`aviation-on-dark-hover`): the division accent. Inside `body.aviation` (all three aviation pages) and `.aviation-scope` (home Aviation teaser) it *replaces* gold one for one in every accent role, **including the `button-on-dark` fill and its hover** (`aviation-on-dark` → `aviation-on-dark-hover`). Never used alongside gold in the same component.

### Neutral
- **Graphite Ink** (`ink`): headings, UI text, primary button fill, dark surfaces (home hero, footer).
- **Ink Raised** (`ink-raised`): the only second dark tone (image placeholder on dark, mobile menu over a dark hero).
- **Ink Hover** (`ink-hover`): hover state of ink buttons.
- **Body Text** (`text`): long-form prose and list items (9.3:1).
- **Muted** (`muted`): metadata, eyebrows on light, captions, breadcrumb, form help (5.78:1 on paper).
- **Paper** (`paper`): the page background. **Stone** (`stone`): alternate section band and form panel. **White** (`white`): inputs and text on ink, never a section background.
- **Hairline** (`line`), **Strong Hairline** (`line-strong`, input and secondary-button borders, 3.19:1), **Hairline/Text/Muted on Dark**: as named.
- **Error** (`error`): invalid field border and message only.

### Named Rules
**The Seal Rule.** Gold (or aviation blue) covers well under 5% of any screen. It marks one thing per component: an active state, a numeral, or the full stop.

**The One Full Stop Rule.** The coloured full stop ends the page's h1 (home included) and nothing else. In Chinese the h1 ends with the same Latin gold `.` (not `。`), for one brand mark across languages.

**The Accent Swap Rule.** Components read `var(--accent)`, `var(--accent-on-dark)` and `var(--accent-on-dark-hover)` and never a literal colour. `body.aviation` and `.aviation-scope` reassign all three. A hard-coded gold anywhere means a missed swap; a swap without a distinct hover value is a bug.

**The Visible Focus Rule.** `2px solid var(--focus)` at 3px offset (2px for inputs). `--focus` = `--accent` on light surfaces; every `.on-dark` band sets `--focus: var(--accent-on-dark)`.

**The Two-Dark Rule.** Only `ink` and `ink-raised` exist as dark surfaces. Two dark bands are never stacked without a paper or stone section between them, except the footer.

## Typography

**Font:** IBM Plex Sans Variable (fallback Arial, then PingFang SC / Microsoft YaHei for CJK). Weight 500 for headings, 400 for text, 600 only for labels, h4 and the brand wordmark.

### Hierarchy
- **Display** (500, `clamp(2.5rem, 1.6rem + 2.4vw, 3.75rem)` = 40→60px, lh 1.08, −0.028em): the home hero h1 only. `max-width: 18ch`, balanced. The display h1 **states the offer** (the compliance sentence from the source copy), never just the company name; the header already says the name.
- **H1** (500, 36→56px, lh 1.1, −0.025em): interior page titles. `max-width: 20ch`.
- **H2** (500, 28→40px, lh 1.15, −0.02em): section headings on structured pages (home sections, gallery, footer top row).
- **Statement** (400, 22→30px, lh 1.35, −0.01em, max 34ch): a full-sentence positioning paragraph (home intro). Sentences are never set as headings.
- **Prose H2** (500, 28px, lh 1.25, −0.015em, margin 56px 0 16px): h2 inside Markdown.
- **H3** (500, 22px, lh 1.3): card titles, prose sub-sections (margin 40px 0 12px), and the headings of the blocks that follow an article (downloads, partners, closing CTA).
- **H4** (600, 18px, lh 1.4): footer column headings, contact sub-heads, "Potrebujeme:"-style labels in prose.
- **Lead** (400, 18→20px, lh 1.55, `muted`, max 52ch): the one-sentence page description under h1 and section intros. **A lead only ever comes from frontmatter (`description`, `packageLead`)**; the first paragraph of Markdown is ordinary Body.
- **Body** (400, 17px, lh 1.65, `text`, max `measure`): prose, list-row titles.
- **Small** (400, 14px, lh 1.55): card descriptions, footer text, form help, breadcrumb, contents nav.
- **UI** (500, 15px, lh 1.2): nav links, buttons, disclosure summaries, tabs, language switcher. Never 400.
- **Label** (600, 12px, +0.12em, UPPERCASE, `muted`): eyebrows, file-type meta, card numerals, lang-tag. Never 400.

### Named Rules
**The 12px Floor Rule.** Nothing renders below 0.75rem (12px).

**The Step Rule.** Every font-size, weight and line-height pair in CSS is one of the tokens above. No component-local values.

**The Wrap Rule.** Headings `text-wrap: balance`; paragraphs, leads and list items `text-wrap: pretty`.

**The Measure Rule.** Reading text is capped by `measure` (38rem ≈ 608px ≈ 70 characters of Plex at 17px), not by `68ch` (which renders ≈ 88 characters because Plex is narrower than its `0` glyph). Only running text is capped. List stacks, the closing strip and the related list span the full content area (cols 5–12), so every right-aligned icon sits on the container's right edge.

**The CJK Rule.** Under `:lang(zh)`: headings `letter-spacing: 0`, weight 600, `line-height: 1.3`, `word-break: keep-all` plus `overflow-wrap: anywhere` (so 捷克 / 法律 / 认证 never split; authors may also insert `<wbr>` between phrases); body `line-height: 1.8`; labels keep 600 and drop letter-spacing to 0.04em. **Latin strings inside a ZH page carry `lang="en"`** and keep the Latin rules (uppercase labels, tracking).

**The Source Typography Rule.** Source copy keeps its words. Typographic normalisation is allowed and expected: hyphen used as a dash → en dash with spaces (" – "), no space before punctuation ("zariadenia ." → "zariadenia."), sentence case for headings and titles ("Analýza Rizík" → "Analýza rizík", "Povolenie-povolenie" → "Povolenie – povolenie"). This is not a rewrite.

## Layout

**Container:** `width: min(100% - 2 × gutter, 1312px)`, centred. Gutter `clamp(20px, 5vw, 64px)`.

**Grid:** 12 columns, `grid-gap` 24px, at ≥1080px. **Below 1080px every grid is one column.** Fixed spans at ≥1080px:

| Pattern | Left | Right |
|---|---|---|
| **Label + content** (home intro, packages, article, related, contact) | cols 1–3: label | cols 5–12: content (running text capped at `measure`) |
| **Full-width section** (home services, gallery, clients) | section header and grid span cols 1–12 | |
| **Page hero with photo** | cols 1–7: copy | cols 8–12: image |
| **Home hero** | full-bleed split 7/5: copy aligned to container col 1 | photo bleeds to the right viewport edge |
| **Aviation teaser** | cols 1–6: image | cols 8–12: copy |
| **Card grid** | 4 columns when its container is ≥1120px wide, otherwise 2; 1 column below 640px | |
| **Gallery** | 4 columns, 24px gap (same lines as the card grid); 2 columns below 640px, 16px gap | |
| **Footer** | 4 × 3 cols; 2 × 1 at 640–1079px; 1 column below 640px | |

**The Column-Five Rule.** On desktop, all reading content starts at column 5 (x = 509px at 1440). One left edge for content, one (col 1) for labels and full-width sections.

**The Collapse Rule (mobile-first).** Every `grid-column` span is declared **only inside `@media (width >= 1080px)`**. Base styles are one column, so nothing can outrank the collapse. No ID selectors in layout CSS. Stacked label + content grids use `row-gap: 0` (the label's own 16px margin is the gap). A layout verification at 390, 640 and 1024px is part of done (see the QA gate in review-2.md).

**Vertical rhythm** (4px base):
- Section padding: `section-y` top and bottom for every section. Exceptions are named: the clients strip (48px), the page hero (48px top, 64px bottom), the article (`section-y / 2` top after the hero hairline).
- A section that directly follows an article **on the same background** (related, gallery) drops its top padding to 0 and starts 64px after the article's last block; an article's bottom padding then becomes 64px, never `section-y + section-y`.
- Section header → section content: 48px (32px below 640px). Eyebrow → heading 16px. Heading → lead 16px. Lead → action 32px.
- Separation between sections is a background change **or** a hairline, never both, never two hairlines within 48px of each other, never neither.

**Breakpoints:** `sm` = 640px, `md` = 1080px, plus one container query (card grid at 1120px inline size). Nothing else.

**Header height:** 72px at ≥1080px, 60px below. Sticky on paper with a bottom hairline. `scroll-padding-top` = header + 24px.

## Elevation & Depth

Flat. Depth comes from tonal bands and hairlines. The only shadow is the desktop services dropdown: `0 12px 32px rgb(24 41 46 / 0.10)`. Active underlines may be drawn with `box-shadow: inset 0 -2px` (that's a rule, not elevation).

## Shapes

Square corners everywhere; 2px focus-ring radius only. Rules are 1px. Active states use a **2px accent underline** (nav, language switcher, aviation tabs); cards use a 2px accent top rule on hover.

Photography: rectangular, fixed ratios: **3:2** (cards, gallery, teaser, page hero), full-bleed cover (home hero). (Round 1's 4:3 page hero is retired: one ratio for every framed photo.) All photos get `filter: saturate(0.8)`. **Resolution rule:** a photo is never displayed larger than its source pixels at 1×; every `<Photo>` emits widths up to 2× its largest displayed size (or the source width, whichever is smaller). The panoramic Testing Center sources (1500 × 408–516px) are cropped for 3:2 to ≈ 680 × 455; use them at ≤ 460px displayed width (gallery, cards), and use a non-panoramic source for any larger frame. Logos are never filtered except in the client strip.

## Components

### Header / Navigation / Language switcher
- **≥1080px:** brand at col 1; nav (Služby ▾, Aviation, Referencie), header CTA, a 24px vertical hairline, language switcher. All vertically centred on the 72px bar.
- **Brand:** logo roundel only (from `logo_zlate.png`, original colours), 40px (32px below `md`), plus "TESTING SERVICE" (UI size, 600, +0.04em, uppercase), whole brand link 44px tall. Below 640px the wordmark is an intentional **two-line stacked lockup**: 13px/600, line-height 1.1, +0.06em, block height equal to the 32px roundel.
- **Nav links:** UI, ink, 44px hit height, 28px gap. Hover `accent`. Current: 2px `accent` underline. On the contact page the header CTA is current: render it as `button-secondary` (44px) with `aria-current="page"`.
- **Services dropdown (desktop):** ships **closed** (`<details>` without `open`); JS opens it in the mobile panel. 360px white panel, 1px `line` border, the dropdown shadow, 12px below the bar. First row "Všetky služby →" in Label 600. Rows UI 500, 16px vertical padding, hairlines. Order and names come from the single service list (see *Content model*).
- **Lang-tag:** Label 600, `muted`, 1px `line` border, padding 1px 4px, 6px left margin. **Inside a button or on dark:** no border, `color: currentColor`, `opacity: .75`. File rows get the tag from data, never from "(SK)" text in a title.
- **Language switcher:** SK · EN · 中文, 14px, 44 × 44 each, current ink 600 with the underline, others `muted`.
- **Below 1080px:** brand · language switcher · menu button (44 × 44, 1px `line-strong`; label "Menu" visible ≥640px, `aria-label` always). Open state: icon becomes ✕, `aria-expanded="true"`; the panel covers the viewport below the header (`height: calc(100dvh - header)`, paper, scrolls internally, body scroll locked). Contents: a Label row "Služby", the four services indented 16px (52px rows, hairlines), Aviation, Referencie, then the CTA as full-width `button-primary`.

### Buttons
- 48px tall (44px header), 24px padding (23px + 1px border for secondary), UI type, label then a 16px SVG icon with a fixed 12px gap (8px in the header).
- **Primary** (light): ink / white, hover `ink-hover`. **On dark:** `accent-on-dark` fill, ink text, hover `accent-on-dark-hover` (gold in industry, blue in aviation). **Secondary:** transparent, 1px `line-strong`; on dark `rgb(255 255 255 / .4)`.
- **Text link:** UI, ink, 1px underline at 4px offset in `line-strong`, `accent` on hover. A standalone text link (not inline in prose) has a 44px-tall hit area (`display: inline-flex; min-height: 44px; align-items: center`).
- **The Arrow Rule:** → internal page, ↗ leaves the site (external site **or** `mailto:`), ↓ file download or in-page jump. Never decorative.

### Section header
`eyebrow` (optional) → 16px → h2 → optional lead (16px, max 52ch) → optional trailing text link.

**The Informative Eyebrow Rule.** An eyebrow must add information that its heading lacks and must not repeat the previous section's eyebrow. If it would repeat or paraphrase the heading ("Služby" over "Naše služby", "Kontakt" over "Kontakt.", "References" over "Our references"), omit it. Allowed eyebrows: the home hero line, the parent section on child pages ("Služby" over a service h1), "Žilina · LZZI" over the gallery, "Aviation" over the home teaser, "Čoskoro" over the Prague office, a Label row inside a list. In label + content sections the label column may be empty.

### Home hero
Ink band, `min-height: min(640px, 80svh)`, grid 7 / 5 at ≥1080px. Copy column is a flex column, **vertically centred** (`justify-content: center`), padding 96px block, 64px right. Contents: eyebrow in `accent-on-dark` ("Inšpekcie · Certifikácie · Povolenia · CZ + SK" / "Inspection · Certification · Permit · CZ + SK"; on the ZH page the same Latin line marked `lang="en"`), display h1 = the compliance sentence + gold full stop, then one `button-on-dark` (→ #services, ↓). No lead paragraph (the h1 is the claim). Photo cover, bleeds right, `object-position: 60% 50%`, srcset up to 1440w. **Below 1080px:** stacked, copy first (padding 48px gutter 40px), then the photo at 3:2 full width.

### Page hero (interior)
Breadcrumb (Small, full trail, ancestors linked, current item ink). Aviation pages: then the aviation tabs. Then the grid: cols 1–7 [eyebrow per the Informative Eyebrow Rule], h1 + full stop, lead, optional action; cols 8–12 the 3:2 photo, top-aligned with the first text line. Without a photo the copy spans cols 1–8. One hairline below the hero, always. Padding 48px top, 64px bottom on every page (contact included).
- **Hero action:** service and aviation pages that have downloads show a `button-secondary` "Na stiahnutie ↓" (`#downloads`); otherwise no hero button (the header CTA and the closing strip already ask for contact). Never a second "Kontaktujte nás" in the hero.
- **Below 1080px:** copy, then the photo at 3:2, `max-height: 50svh`, `object-fit: cover`.

### Aviation sub-navigation
On all three aviation pages, under the breadcrumb, above the h1: three tabs, UI 500, 44px tall, 32px gap, 1px hairline under the row, current tab with the 2px `aviation` underline on that hairline. Horizontal scroll below 640px with the current tab scrolled into view. Because the tabs name the division, aviation page heroes have **no eyebrow**.

### Service card
- Whole card is the link; `paper` on a `stone` band. Image 3:2 on top (16:9 below 640px to shorten the mobile stack); content padding 24px.
- Content rows use subgrid so numeral, title, description and link line up across a row.
- Numeral: Label 600 in `accent`. Title: H3, **the same string as the page h1** (single service list). Description: Small `muted`, 1–2 sentences, max 4 lines, **in the card's language**; if the target page doesn't exist in this language, the card shows the localised short description from the home data, and only the link carries the lang-tag.
- Link: "Podrobnosti →" text link pinned to the bottom. EN "Details", ZH "详情" (same word in every language).
- Hover/focus-within: 2px accent top rule, title underline.

### Lists (one component)
- **List row:** hairline-topped stack; each row min 56px, 16px vertical padding; title **Body 17px, 500, ink**; optional meta line below in Label 600 `muted` (`PDF`, `XLSX`, `E-MAIL`) or an optional Small `muted` description; the arrow-grammar icon right-aligned, 16px. Hover: title and icon in `accent`. The last row closes with a hairline. Used for downloads, external links, e-mail rows, related pages and contact details.
- **Disclosure row:** a list row whose icon is + / −. When it follows a list it is the **last row of that stack** (no extra margin, no second top rule).
- **Capabilities list** (home packages): list rows without icons, Body 400 ink, 2 columns filling column by column; 1 column below 640px.
- **Prose lists:** bullets in `muted`, 20px indent, 4px between items, nested lists indented a further 20px.

### Article (prose page) and the one page ending
Label + content grid. Aside (cols 1–3, sticky at header + 24px): "Obsah" eyebrow plus links to the page's h2s, Small, 1px left rule, current in `accent`; shown when the page has ≥2 non-empty h2s, hidden below 1080px. Content (cols 5–12): `.prose` capped at `measure`.

After the prose, **every service page and every aviation page** ends with the same sequence, each block 48px apart, each headed in H3:
1. **Na stiahnutie a odkazy** (`#downloads`): one merged list-row stack (files, external references, e-mail rows). Omit when empty.
2. **Partners** (aviation index only): partner image at its natural size (≤480px), no white box (`mix-blend-mode: multiply` or a transparent asset).
3. **Closing strip:** a 1px hairline, H3 "Máte otázku k tejto službe?" (EN "Questions about this service?", ZH "对这项服务有疑问？"), the page's `closing` text in Body `text` if it exists and is not the same sentence as the heading, then `button-primary` with `t.cta`. The heading never equals the button label.
4. **Related** (label + content section, top padding 0, 64px after the closing strip): label "Ďalšie služby" (industry) or "Aviation" (aviation pages); a list stack of the sibling pages, titles in list-row type, → icon.

### Gallery
On a **stone** band (it follows the article, so it needs the tonal change). Full-width section header: eyebrow "Žilina · LZZI", h2. 4-column 3:2 grid, 24px gap; 2 columns 16px gap below 640px. "Ďalšie fotografie (57)" as a disclosure row.

### Forms (contact)
Contact section: label + content grid at ≥1080px (details cols 1–4, form cols 5–12), **one column below 1080px** with the form first and the details after. Form panel on `stone`, 40px padding (24px below 640px). Labels Small 500 ink, 8px above the field. Inputs: `input` token. Focus: 2px `accent` outline at 2px offset, border ink. Invalid (`:user-invalid`): `error` border and message. Two fields per row ≥640px.
- **Details column:** H3 company name; address in **Body** `text` (not Lead); e-mail rows as list rows (↗, meta `E-MAIL`); H4 "Aviation" + its e-mail row; then "Čoskoro" eyebrow + H4 "Praha" (SK) / "Prague" (EN) + address, separated by 48px **without** another hairline (the list already closes with one).

### Clients strip
Full-width section, 48px block padding, one hairline below. Row: eyebrow "Naši klienti" left, text link "Referencie EN →" right (44px hit area). Logos in 5 equal cells (3 + 2 centred below 640px), **40px optical height** (tuned per logo via `--logo-scale`), grayscale, `opacity: .7`, 1 on hover. On the references page the same strip sits between the hero hairline and the article, with the article keeping its own top hairline: no strip-specific border overrides.

### Aviation teaser (home, all three languages)
Light section on stone inside `.aviation-scope`. Image cols 1–6 at 3:2 (a non-panoramic or 2× source; not the same photo as the aviation page hero), copy cols 8–12: optional TS-A mark 56px, eyebrow "Aviation", h2 "Testing Service Aviation", lead, `button-secondary` "Podrobnosti →" (with lang-tag on ZH, linking the EN page). Below 1080px stacked, image 3:2 `max-height: 50svh`.

### Footer
Ink band, padding `section-y` top (64px when the top row is hidden, i.e. on the contact page), 32px bottom.
- **Top row:** h2 `t.cta` (white, no full stop) in cols 1–7; cols 8–12 right-aligned: the division's e-mail as a text link at Lead size (industry pages: jakub.kubis@; aviation pages: info.aviation@), then `button-on-dark` "Napíšte nám →". 48px below, one `line-on-dark` hairline. Below 1080px all left-aligned.
- **Grid:** Company (name, address; no e-mail, it's in the top row), Legal (register, IČO, IČ DPH, privacy link), Downloads (**industry documents and GDPR only**), Aviation (location line, info.aviation e-mail, links to the three pages, then the aviation documents). Headings H4 white; text Small `text-on-dark`; links 32px min height, icon directly after the label (8px), underline on hover.
- **Bottom row:** hairline, "© Testing Service s.r.o." left, tagline Label `muted-on-dark` right; stacked below 640px.

## Content model (single sources of truth)
- **Services:** one ordered array `["permits", "consulting", "risk", "inspections"]` exported from one module and consumed by the dropdown, mobile menu, home cards, related lists and footer. Each service has exactly one display title per language, used as the h1, card title, dropdown row and related row. (The owner picks the final short titles; until then, use the page `title`.)
- **Aviation pages:** `["aviation", "instruments", "maintenance"]`, same treatment.
- **Downloads:** `{ file, title, page, lang, division: "industry" | "aviation" }`. Titles contain no language notation; `lang` drives the lang-tag.
- **UI strings:** every key exists in SK, EN and ZH; no English strings in the ZH table.

## Do's and Don'ts

### Do:
- **Do** take every size, colour, space and breakpoint from the tokens, exposed as `--color-*`, `--text-*`, `--space-*`.
- **Do** write layout CSS mobile-first: spans only inside `@media (width >= 1080px)`.
- **Do** start reading content at column 5 on desktop and cap running text at `measure`.
- **Do** end every service and aviation page with the same four-block ending.
- **Do** swap accents (including button fill and hover) through `--accent*` only.
- **Do** label cross-language links with the lang-tag component, from data.
- **Do** check every page at 390, 640, 1024 and 1440px before calling a change done.

### Don't:
- **Don't** add decorative "technical" microcopy, or eyebrows that repeat their heading.
- **Don't** set any text below 12px, or UI/Label text at weight 400.
- **Don't** put the coloured full stop on anything except the page h1.
- **Don't** repeat the same call to action twice in one viewport, or use the CTA string as both heading and button.
- **Don't** stack two dark bands, use shadows outside the dropdown, or round corners.
- **Don't** infer a lead from the first Markdown paragraph.
- **Don't** display a photo larger than its source resolution.
- **Don't** use ↗ for internal links or → for `mailto:`.

## Changes in round 2
Display token resized for a sentence-length claim (40→60px, 18ch) and the hero grid widened to 7/5; Collapse Rule (mobile-first spans, `row-gap: 0`); container-query card grid; one photo ratio (3:2) and a resolution rule; `measure` token replaces 68ch; list-row title fixed at Body 500 for every list; disclosure becomes the last row of its list; Informative Eyebrow Rule; one page ending for service and aviation pages; hero action is the download jump, never a second contact button; aviation button fill and hover tokens; lang-tag inside buttons/on dark; mailto uses ↗; dropdown ships closed; mobile menu open state; footer splits industry and aviation documents and shows the division e-mail; ZH Latin strings marked `lang="en"` plus `keep-all` headings; Source Typography Rule; content model.
