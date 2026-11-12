# Design review 1: Testing Service v0

Method: dual-agent (A: isolated design-review sub-agent · B: isolated detector + headless-browser sub-agent), then synthesis by the reviewer. Non-interactive run: the owner asked for no questions, so product facts were inferred from the brief and the repo (see `PRODUCT.md`).

Inputs:
- All 11 screenshots in `docs/review/shots-v0/` (desktop 1440, mobile 390), viewed in full-resolution tiles.
- All of `src/`.
- `npm run build` (passes: 50 pages, 227 images).
- `impeccable detect` on `src/`, on `dist/`, and in headless Chromium at 1280 and 390 against 6 pages.

The target system is **`DESIGN.md`**, and every fix below points at its tokens. The builder should implement DESIGN.md as the source of truth and use this list as the migration checklist.

> Owner's verdict on v0: "not bad for a first draft, but should be much neater; lots of design inconsistencies."
> Reviewer's verdict: agreed on both counts. The base world is right: graphite + paper + gold, IBM Plex Sans, square corners, hairlines. The execution has no system underneath it:
> - 47 font sizes (11 of them under 12px)
> - ~34 spacing values
> - 6 unrelated column ratios
> - 24 hard-coded colours
> - 5 image ratios
> - 3 ways to say "this page is English"
> - layers of decorative "technical" microcopy that read as template filler
>
> v1 should not change the look. It should make the look *consistent*.

---

## 1. Scores

### Critique: Nielsen heuristics

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 2 | The header isn't sticky on 3–4k px pages. Breadcrumbs misreport location (every service page says "Úvod / Služby"; aviation children skip "Aviation"). The home "Rozsah služieb +" accordion looks closed while a list sits under it. |
| 2 | Match with the real world | 2 | ↗ (the external-link convention) is used for internal links. Language leaks: "Slovakia" and "mapa (download here)" on SK pages. Whole sentences are styled as headings. |
| 3 | User control & freedom | 3 | No traps; Esc closes the menu and dropdown. The language switch silently falls back to home when there's no equivalent page. |
| 4 | Consistency & standards | 1 | This is the owner's complaint: six column systems, ~14 h2 sizes, two navies, two accent hues with mismatched footers, three download-row styles, three "(EN)" notations. |
| 5 | Error prevention | 2 | The form is mailto-only unless `PUBLIC_FORM_ENDPOINT` is set. The input border is 2.39:1, so the fields barely read as fields. |
| 6 | Recognition rather than recall | 2 | The sidebar "contents" lists full sentences. Services are named by legal process only. |
| 7 | Flexibility & efficiency | n/a | Persuade surface, no repeat workflow. |
| 8 | Aesthetic & minimalist design | 2 | The palette is restrained, but filler microcopy, sentence-headings and 80-word card bodies add noise. |
| 9 | Error recovery | 2 | Native `required` bubbles only; no inline invalid styling, no success state. |
| 10 | Help & documentation | n/a | Marketing surface. |
| **Total** | | **16 / 32 (50%)** | **Acceptable, at the bottom edge.** |

Cognitive load: 5 of 8 checks fail (high). The failures are single focus, chunking, visual hierarchy, minimal choices (8 header targets, 2 click affordances per card) and progressive disclosure (inverted: the long prose hides behind a "+" while the 9–11 item list is always open).

### Audit: technical health

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 2 | 11 font sizes under 12px; the header tagline renders at **5.6px** (401–700px) and **6.4px** (701–1250px). Input borders fail WCAG 1.4.11. The focus ring falls to 2.1–2.7:1 on dark bands. 32 headings run over 90 characters (up to 329). |
| 2 | Performance | 3 | Lean: 20 KB CSS, WebP srcsets, CLS 0.001. But the image `sizes` breakpoints (900 / 600) don't match the CSS (1250 / 1049 / 700), so cards render soft between 900 and 1250px. |
| 3 | Theming | 1 | 8 tokens defined; 24 hard-coded colour uses (16 distinct hexes). No type, spacing or layout tokens. The aviation accent swap misses the footer. |
| 4 | Responsive | 3 | No horizontal scroll at any width; the mobile menu works without JS. Touch targets are below 44px: language links 25–34 × 29, menu button 41 × 32, nav links 23px tall. Five breakpoints with component-local overrides. |
| 5 | Implementation integrity | 1 | Systemic drift (see the inventories in §3). The detector flags the templated tells on every page: `hero-eyebrow-chip` ×23, `numbered-section-labels` ×11, `kicker-above-heading`. |
| **Total** | | **10 / 20** | **Acceptable: significant work needed.** |

Detector summary:
- **Source:** the `src/` scan returns 0. The detector can't evaluate Astro templates with external CSS, so treat this as "not checked", not "clean".
- **Built HTML:** the `dist/` scan returns 221 findings:

  | Rule | Count |
  |---|---|
  | undersized-ui-text | 89 |
  | cramped-padding | 54, all false positives (full-bleed bands with an inner `.wrap`) |
  | hero-eyebrow-chip | 23 |
  | wide-tracking | 23 |
  | tiny-text | 20 |
  | numbered-section-labels | 11 |
  | skipped-heading | 1 |

- **Browser:** the run adds `straggler` ×16, `line-length` (~99 characters) and `first-viewport-column-overflow` on article pages.

---

## 2. Design-specificity verdict

**Category-interchangeable.** Swap the logo and the copy and this is a law firm, an architecture studio or a SaaS agency. The tells:
- Numbered eyebrows ("01 / TESTING SERVICE", where 01 and 03 say the same thing).
- A coloured full stop on most headings, even "Contact us (EN).".
- "TESTING SERVICE / CZ + SK" above every h1.
- A faux caption bar over the hero photo.
- An 8px "INSPECTION — CERTIFICATION — PERMIT" footer inside the hero.
- A floating "CZ · SK / EN · STN · ČSN" label.
- A "TESTING SERVICE / CZ + SK" side note in every article sidebar.
- ↗ on every link.

None of these carries information. They imitate "engineering" instead of being precise. The company name appears up to 7 times per page and the tagline 3 times.

The genuinely specific material is underused:
- the real Aviation Testing Center photography (test sets, Pelican cases, the aircraft on the apron);
- real regulation references (Vyhláška 508/2009, VTZ A/B/C, EASA 2018/1139);
- real downloadable certificates and order forms.

The North Star in DESIGN.md is **"The Inspection Report"**: order, labelled fields, hairlines and one seal colour, with every label carrying real information.

Brand note: the "gold logo" is actually a **gold ring with red letterforms, a red wordmark and a red tagline bar**. Squeezed to 57 × 51 px, the red bar becomes a smear and the wordmark is illegible. The fix is to crop to the roundel, not to recolour the site (see P0-2).

## 3. What's working (keep)

1. **The base world.** Ink `#18292e` on paper `#f8f8f4`, square corners, 1px hairlines and a single family (IBM Plex Sans Variable) are the right register for this audience. Nothing here needs a redesign.
2. **The home hero composition and the client strip.** The dark split hero with one gold action is the most authored moment. The grayscale, multiplied logo strip is the right treatment.
3. **Mechanics.** hreflang, canonical and x-default are correct. The menu and dropdown have keyboard support (Esc, focus-out). The skip link exists. Images are WebP with width/height and lazy-loaded. CLS is about 0. The mobile menu works without JS. Reduced motion is respected.

---

## 4. Fix list

Rules for the implementer:
- **Don't change copy meaning and don't invent facts.** No phone numbers, prices, response times or certificates that aren't in `_source/`.
- Every value below is a DESIGN.md token. Expose the tokens as CSS custom properties at the top of `src/styles/global.css` and use them everywhere.
- After the work, `global.css` should contain **no hex values outside `:root`**, **no font-size outside the type tokens**, and **only the breakpoints 640px and 1080px**.

### P0: system foundations (do first; most other fixes fall out of these)

**P0-1 · Tokenise `src/styles/global.css` (theming, type, space, layout).**
- **Colours**
  - Wrong: 16 hard-coded hexes, plus the `white` keyword in 5 places.
  - Target: `:root` defines every colour from the DESIGN.md frontmatter as `--color-<name>`, plus `--accent: var(--color-gold)` and `--accent-on-dark: var(--color-gold-on-dark)`. Map the old values like this:

    | Old value | New token |
    |---|---|
    | `#33494e` | `ink-hover` `#2a4147` |
    | `#203c49` | delete (see P1-9) |
    | `#465659` | `text` `#34464a` |
    | `#eceee9` | `stone` |
    | `#d1dad8`, `#d4e0e4`, `#d7dfdc` | `text-on-dark` `#d7dfdc` |
    | `#afbfbd`, `#a8bab7` | `muted-on-dark` `#a8bab7` |
    | `#496064` | `line-on-dark` `#3a5156` |
    | `#98a5a3` (input border) | `line-strong` `#7d8f8c` (3.19:1; the old value failed 1.4.11) |
    | `#f2d39c` | `gold-on-dark-hover` `#edd09a` |
    | `#18292ee8` caption overlay | delete with the caption (P1-3) |

- **Type**
  - Wrong: 47 distinct font-size values.
  - Target: the 12 type tokens in DESIGN.md (`--text-display`, `--text-h1`, `--text-h2`, `--text-statement`, `--text-prose-h2` 1.75rem, `--text-h3` 1.375rem, `--text-h4` 1.125rem, `--text-lead`, `--text-body` 1.0625rem, `--text-small` 0.875rem, `--text-ui` 0.9375rem, `--text-label` 0.75rem).
  - Letter-spacing per step: display −0.03em, h1 −0.025em, h2 −0.02em, h3 −0.01em, h4 0, label +0.12em. This replaces the global −0.035em on all h1–h3, which is too tight at h3 size.
  - Add `h1,h2,h3,h4{text-wrap:balance}` and `p,li{text-wrap:pretty}`.
- **Spacing**
  - Wrong: about 34 one-off values.
  - Target: `--space-1…10` = 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128px, plus `--gutter: clamp(20px, 5vw, 64px)` and `--section-y: clamp(64px, 3rem + 4vw, 120px)`. Every padding, margin and gap uses these.
- **Container**
  - Wrong: `.wrap` is `min(100% - var(--space)*2, 1440px)`.
  - Target: `width: min(100% - 2*var(--gutter), 1312px)`.
- **Breakpoints**
  - Wrong: 1600, 1250, 1049, 700, 400.
  - Target: **640px (`sm`) and 1080px (`md`)** only. Update the `matchMedia("(min-width: 1050px)")` in `src/layouts/Layout.astro` to 1080px.
  - Update every `sizes=` attribute in `src/pages/[...path].astro` and `src/components/Photo.astro` to match: cards `(min-width:1080px) 25vw, (min-width:640px) 50vw, 100vw`; page hero `(min-width:1080px) 40vw, 100vw`; gallery `(min-width:640px) 25vw, 50vw`.

**P0-2 · Replace the header logo lockup with the roundel.**
- **Where:** `src/layouts/Layout.astro` (`.brand`) and `global.css` (`.brand*`).
- **Wrong:**
  - The full 1500 × 959 lockup (roundel + red wordmark + red tagline bar) is shrunk to 57 × 51 px (34px on mobile), so the wordmark and bar are illegible red smears.
  - It is then repeated as typed text: "TESTING SERVICE" plus a tagline at 0.49rem (7.8px), 0.4rem (6.4px) at ≤1250px and 0.35rem (5.6px) at ≤700px.
- **Target:**
  - Create a cropped asset `_source/img/logo-mark.png` containing only the gold-ring "T.S." roundel (in the source PNG the circle sits at about x 475–1025, y 0–550 of 1500 × 959). Crop only; don't recolour or redraw.
  - Render it at **40px height desktop, 32px below 1080px**, with a 12px gap to the text "TESTING SERVICE" in `--text-ui` 600, +0.04em, uppercase.
  - **Delete `.brand small`** (the tagline) from the header. The tagline now appears once, in the footer bottom row.
  - The `<img>` alt stays empty (the text is beside it), and the link gets `aria-label="Testing Service — úvod"` (per language).

**P0-3 · Unify the grid: the Column-Five Rule.**
- **Where:** `global.css`, in `.intro-section`, `.article-layout`, `.page-hero.has-photo`, `.contact-layout`, `.aviation-feature-grid`, `.footer-grid` and `.related > div`.
- **Wrong:** six unrelated ratios (`1fr 2.1fr`, `1fr 2.3fr`, `1.2fr 1fr`, `1fr 1.3fr`, `1.1fr 1fr`, `1fr 1fr 1.2fr`) with gaps of 3, 4 and 5rem. The content columns start at x = 520, 518, 680, 789 and 809, so every page has a different reading edge. The article column also stops at 800px, 57px short of the container edge.
- **Target:** one `.grid` utility, `display:grid; grid-template-columns: repeat(12, minmax(0,1fr)); column-gap: 24px` (16px below 1080px). Fixed spans (≥1080px):

  | Block | Left | Right |
  |---|---|---|
  | intro / article / packages / related heading | label or aside `1 / span 3` | content `5 / span 8` |
  | page hero with photo | text `1 / span 7` | photo `8 / span 5` |
  | contact | details `1 / span 4` | form `5 / span 8` |
  | footer | four columns `span 3` each | |

  - In the article, prose is capped at `max-width: 68ch`, while lists, downloads and the partners block span the full `5 / span 8`.
  - Below 1080px everything stacks to a single column, except the footer (2 columns) and the cards (2 columns until 640px).

**P0-4 · Fix content headings that are really paragraphs.**
- **Where:** `src/content/pages/**/*.md`. This is a content-structure change: demote heading levels, don't rewrite text.
- **Wrong:** whole sentences and paragraphs are authored as `##`. That produces 32 headings over 90 characters (up to 329), a sidebar "contents" made of sentences, body text that looks more important than the real section headings, and `instruments.md` starting with an h3 before any h2.
  - `sk/permits.md`: the opening 50-word `##` and the two closing sentence `##`s ("Inšpekciou technológií…", "Zabraňuje sa tak…").
  - `sk/aviation.md`: four consecutive sentence `##`s ("TESTING SERVICE s.r.o. divízia AVIATION", "Pre bezpečné vykonanie letu…", "Preto je periodické…", "Ide samozrejme o…").
  - `sk/instruments.md`: `### skúšky avionických systémov sú povinné` before any h2, and `## AVIATION TESTING CENTER` in capitals.
  - The same pattern in `consulting`, `risk`, `inspections`, `home` (SK and EN) and the `en/aviation` and `en/instruments` pages.
- **Target:**
  - A heading is at most about 80 characters and names a section ("Stavebné povolenie", "Povolenie na prevádzku").
  - Any `##` longer than that becomes a plain paragraph. If it's the first block of the page, give it `class="lead"`: either let the template render the first paragraph as `.lead` (`.prose > p:first-child` styled as Lead), or add a `lead:` frontmatter field.
  - Normalise ALL-CAPS headings to sentence case in the markdown (case only; the text stays the same).
  - Remove the h3-before-h2 skip.
  - In `src/pages/[...path].astro`, render the contents nav only when `headings.length >= 2 && headings.every(h => h.text.length <= 80)`.

**P0-5 · Remove decorative microcopy (the templated tells).**
- **Where:** `src/pages/[...path].astro`, `src/layouts/Layout.astro`, `global.css`.
- **Delete:**
  - `.hero-foot` ("INSPECTION — CERTIFICATION — PERMIT", 8px) and its CSS.
  - `.image-caption` ("TESTING SERVICE / CZ / SK" bar over the hero photo) and its CSS.
  - `.technical-label` ("CZ · SK / EN · STN · ČSN") and its CSS.
  - `.side-note` ("TESTING SERVICE / CZ + SK" or "/ AVIATION" in the article aside) and its CSS.
  - The eyebrow "TESTING SERVICE" above the footer h2.
  - The section numbering "01 /", "02 /", "03 /", "04 /" on home sections.
- **Replace:**
  - The page-hero eyebrow "TESTING SERVICE / CZ + SK" with the section name: service pages → `t.services` ("Služby"); aviation pages → "Aviation"; references → `t.references`; contact → `t.contact`; legal → `t.legal`.
  - The home eyebrows with informational labels: intro → none (the statement stands alone); services → `t.services`; packages → `t.packages` moves to the h2 (see P1-7) and the eyebrow becomes `t.services`; aviation → "Aviation".
- **Gold full stop:** keep it **only** after the page h1 (including the home display h1, which currently lacks it). Remove the `<span class="gold">.</span>` from every h2: home sections and the footer `Layout.astro` h2.

### P1: major consistency, hierarchy and accessibility fixes

**P1-1 · Header: sticky, shorter, proportionate CTA, real hit areas.**
- **Where:** `src/layouts/Layout.astro`, `global.css` `.site-header`, `.header-inner`, `.main-navigation`, `.language-switcher`, `.header-cta`, `.menu-toggle`.
- **Wrong:**
  - The header isn't sticky and is 93px tall.
  - The CTA block is 61px tall, overweight and taller than the nav it sits in.
  - Nav link hit areas are 23px tall; language links are 0.72rem (11.5px) with 25–34 × 29px targets.
  - "Kontakt" and "Kontaktujte nás" both lead to the contact page.
  - The `⌄` glyph sits below the x-height.
- **Target:**
  - `.site-header{position:sticky;top:0;z-index:20;background:var(--color-paper);border-bottom:1px solid var(--color-line)}`. Bar height **72px** (≥1080px) and **60px** below. Set `scroll-padding-top: 96px`.
  - Nav items: Služby ▾, Aviation, Referencie. **Remove the "Kontakt" nav link.** The CTA goes to the contact page (`contact.path + "/"`), and the form section stays anchored `#enquiry`.
  - Nav links: `--text-ui`, `min-height:44px; display:inline-flex; align-items:center`, 28px gap.
  - Active state for nav links, the "Služby" summary on service pages and the language switcher: ink text plus a **2px `--accent` underline** drawn with `box-shadow: inset 0 -2px` on the 44px box. This replaces the gold text colour for the active nav and makes nav and switcher match.
  - CTA: `button-header`, **44px tall**, padding `0 20px`, gap 8px, icon →.
  - A 1px × 24px `--color-line` divider between the CTA and the language switcher.
  - Language links: 14px (`0.875rem`) 500, current 600, each `min-width:44px; min-height:44px`, centred.
  - Replace the `⌄` with an inline SVG chevron (10 × 6px, `stroke: currentColor`, 1.5px), vertically centred, rotating 180° when `[open]`.
- **Below 1080px:**
  - Row: brand · language switcher · menu button.
  - Menu button: **44 × 44 min**, 1px `--color-line-strong` border, inline SVG three-line icon (18px) plus the text "Menu". The text is hidden visually below 400px but stays as the accessible name. Don't hide the icon (the v0 hides the ☰ below 700px).
  - The open panel: full width under the bar, links at 17px with 52px rows and hairlines between, the services sub-list expanded and indented 16px, and the CTA as a full-width 48px `button-primary` at the bottom.

**P1-2 · One lang-tag component for cross-language links.**
- **Where:** `Layout.astro` (the nav "Referencie `<small> EN</small>`" and the ZH dropdown " (EN)"), `[...path].astro` (clients link "Referencie (EN) ↗"), `src/data/ui.ts` (zh: `aviation: "Aviation (EN)"`, `contact: "Contact (EN)"`, `cta: "Contact us (EN)"`, `more: "Details (EN)"`).
- **Wrong:** three notations (superscript small, "(EN)" in parentheses, "(EN)" inside labels). This puts "Contact us (EN)." into the ZH footer in 4rem display type.
- **Target:**
  - A `<span class="lang-tag" lang="en">EN</span>` rendered after the label whenever the target page's language differs from the current page. Label type (12px 600 +0.12em), `--color-muted`, 1px `--color-line` border, padding `1px 4px`, `margin-left: 6px`, `vertical-align: 0.1em`.
  - Remove every "(EN)" from the `ui.ts` strings. The ZH CTA and footer heading use a Chinese UI string; add `cta: "联系我们"` in `ui.zh` (UI chrome, consistent with the existing Chinese nav strings), and the tag marks the English destination.
  - Apply the tag in: the nav, the dropdown, card "more" links, the clients-strip link, the footer links and the footer CTA button.

**P1-3 · Home hero: fix the wrap, simplify, align with the system.**
- **Where:** `[...path].astro` (home branch), `global.css` `.home-hero`, `.hero-copy*`, `.hero-visual`.
- **Wrong:**
  - `h1{max-width:10ch}` at about 83px breaks "Istota pre / vaše / technológie." and "Confidence in / your / technology." with an orphan word.
  - The h1 size is overridden 4 times across breakpoints.
  - The caption bar and hero-foot are filler (deleted in P0-5).
- **Target:**
  - h1 uses `--text-display` with `max-width: 13ch; text-wrap: balance`, and ends with the accent full stop in `--accent-on-dark`.
  - Hero `min-height: min(680px, 88svh)`.
  - Copy padding `var(--space-9) var(--space-8) var(--space-8)` with the left edge on the container column 1 (keep the existing `max(var(--gutter), (100vw - 1312px)/2)` formula, updated to 1312).
  - Eyebrow in `--accent-on-dark`.
  - Lead in `--color-text-on-dark`, `max-width: 36ch`.
  - One `button-on-dark` (48px tall, gap 12px), with ↓ because it jumps to `#services`.
  - Photo: `object-position: 60% 50%`, `filter: saturate(.8)` (the standard photo treatment, P1-10).
  - **Below 640px:** copy first (48px top, 40px bottom), then the photo at `aspect-ratio: 4/3` (not a fixed 300px height).

**P1-4 · Page hero (all interior pages): one pattern.**
- **Where:** `[...path].astro` (the breadcrumb and `.page-hero`), `global.css`.
- **Wrong:**
  - Breadcrumbs are inaccurate. Services always read "Úvod / Služby", with "Služby" unlinked and the page name missing. Aviation sub-pages skip "Aviation". It's a plain `div`.
  - Text is vertically centred against the photo, so the h1 top sits at different y positions per page (238 vs 292px).
  - The image ratio is 1.3 desktop and 1.7 mobile.
  - The hero CTA is a second ink block competing with the header CTA.
  - Pages without a photo get a border-bottom and then the article adds a border-top, giving a double rule.
- **Target:**
  - **Breadcrumb:** `<nav aria-label="Breadcrumb"><ol>`, Small type, `--color-muted`, separator "/" with 8px margins. Full trail with every ancestor linked:
    - Úvod / Služby (→ `/#services`) / *Title*
    - Úvod / Aviation (→ the aviation overview) / *Title*
    - On the aviation overview itself: Úvod / *Aviation*

    The current item is ink, not a link, with `aria-current="page"`. It sits 24px below the header.
  - **Hero grid** (P0-3 spans): `align-items: start`; the photo's top edge aligns with the eyebrow's top. Padding `48px 0 64px`. Photo `aspect-ratio: 4/3` at every width.
  - **Order:** eyebrow (section name, P0-5) → 16px → h1 (`--text-h1`, `max-width: 20ch`, balance, accent full stop) → 16px → lead (`max-width: 52ch`) → 32px → **`button-secondary`** with →. It doesn't appear on contact or legal, as now.
  - **Rule:** exactly one hairline between hero and body, as `border-top` on the body container only. Delete `.page-hero:not(.has-photo){border-bottom}`.
  - **References page:** it reuses the home hero robot photo. Render it without a photo (`image` removed from `en/references.md` and `zh/references.md` frontmatter) and put the client-logo strip directly under the hero as its visual.

**P1-5 · Section header: one pattern everywhere.**
- **Where:** `.section-heading`, `.section-label`, `.gallery .section-heading`, `.intro-section`, `.related > .eyebrow`, `.downloads h2`, `.partners h2`, `.contact-details h2`, `form h2`.
- **Wrong:**
  - Section h2s come in about 14 sizes (base clamp, intro clamp, aviation clamp, footer clamp, 2, 1.9, 1.8, 1.7 ×3, …).
  - The right-hand slot is used for a tech label on one section, an eyebrow on another (gallery "ŽILINA / LZZI") and nothing elsewhere.
  - The eyebrow-to-heading gap ranges from 0.8 to 2rem.
- **Target:** one `.section-head` partial or class:
  - eyebrow (Label, muted) → 16px → h2 (`--text-h2`) → optional lead 16px below (`max-width: 52ch`);
  - optional trailing text link aligned right on the h2 baseline (≥1080px) or 16px below the lead (mobile);
  - 48px (32px mobile) to the section content.
  - In label + content sections the eyebrow sits in cols 1–3 and the h2 and lead in cols 5–12.
  - Small sub-headings inside a section ("Na stiahnutie", "Naši partneri", "Napíšte nám", the contact-details company name) use **H3** (`--text-h3`), not h2 sizes.

**P1-6 · Service cards: equal rows, less text, one affordance.**
- **Where:** `[...path].astro` (`.service-card`), `global.css` (`.service-grid`, `.service-card*`, `.card-*`, `.text-link`).
- **Wrong:**
  - `h3{min-height:3.5em}` is shorter than a 3-line title (3.75em), so descriptions start at different heights.
  - The numeral row has a corner ↗ that duplicates the "Podrobnosti" link.
  - Descriptions run 60–80 words at 0.86rem, swinging between 0.82 and 0.95rem across breakpoints.
  - Only the cards are desaturated (`saturate(.55)`).
  - Mobile becomes about 2,600px of cards.
- **Target:**
  - `.service-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}` (2 columns at 640–1079px, 1 below).
  - Each card is `display:grid; grid-row: span 5; grid-template-rows: subgrid` (image, numeral, title, description, link) so every row aligns across cards.
  - Image `aspect-ratio: 3/2`, padding 24px.
  - Numeral: Label in `--accent`, no icon.
  - Title: `--text-h3`.
  - Description: `--text-small`, `--color-muted`, `-webkit-line-clamp: 4`. Use the page's short frontmatter `description` (`p.data.description`) instead of the long `home.json` `services[i].text`. That text is fuller and lives on the service pages anyway. *Owner may veto: if they want the long text, keep it, but clamp it to 4 lines.*
  - Link: "Podrobnosti →" text link at the bottom.
  - Whole card is the link. Hover and focus-within: a 2px `--accent` top rule (`box-shadow: inset 0 2px var(--accent)` on the content block) and title underline. No image change.
  - Mobile below 640px: keep the image at 3:2. The clamp keeps the cards short.

**P1-7 · Home "packages" section: remove the confusing accordion stack.**
- **Where:** `[...path].astro` (`.packages`), `global.css` (`.package-details`, `.capabilities`).
- **Wrong:**
  - The h2 "Služby pre prevádzkovateľov a dodávateľov." is followed by a "Rozsah služieb +" accordion. Its label duplicates the services eyebrow, and it hides about 760 words of `home.md` prose.
  - Below it, separated by a 72px gap, sits an always-visible 9 (SK) or 11 (EN) item list that looks like the accordion's content but isn't.
  - The EN list leaves a ragged last row in 3 columns; ZH has no list at all.
- **Target:** label + content grid.
  - **cols 1–3:** eyebrow `t.services`.
  - **cols 5–12:**
    - h2 `t.packages`;
    - the first paragraph of `home.md` as a Lead;
    - the capabilities as the **list-row** component in **2 columns** (1 below 640px), with `grid-auto-flow: column` and `grid-template-rows: repeat(ceil(n/2), auto)` so the columns fill evenly;
    - then a disclosure styled as a list row: label "Celý popis balíkov" (or `t.detail`), a 16px +/− icon, `<details>`, with the remaining prose inside at prose width.
  - In ZH, where there are no capabilities, the disclosure follows the lead directly.
  - Capability text in ink `--text-body`, not muted 0.9rem.

**P1-8 · Lists: one list-row component (downloads, links, related, capabilities).**
- **Where:** `.download-list`, `.related`, `.order-email`, `.capabilities`, the aviation EASA links block, the instruments map/AIP block.
- **Wrong:**
  - Three different row styles on one page (`sk/instruments`):
    - file rows with a type label and a right-aligned ↓;
    - a loose underlined mailto (`.order-email`);
    - link rows with inline arrows and no label.
  - Two `.download-list` blocks stacked with `margin-block: 2rem` each, so a double hairline about 32px apart (`sk/aviation`).
  - Related services use top rules; capabilities use bottom rules.
- **Target:** `.list` = `border-top: 1px solid var(--color-line)`; `.list > a, .list > li` = `display:flex; justify-content:space-between; align-items:center; gap:16px; min-height:56px; padding:16px 0; border-bottom:1px solid var(--color-line)`.
  - Title in `--text-ui` ink; optional meta line (Label, muted) such as `PDF` or `XLSX`; the right-aligned icon follows the **Arrow Rule** (↓ download, ↗ external, → internal).
  - Hover: title in `--accent`.
  - **Merge** each page's downloads and external links into **one** list under **one** H3 "Na stiahnutie a odkazy" (or `t.downloads`). On instruments this includes the order email as a row (meta "E-mail", icon →) and the map and AIP rows.
  - Related services on service pages use the same list: 3 rows stacked in cols 5–12 under the "Ďalšie služby" eyebrow in cols 1–3, title in `--text-h3`, icon →.

**P1-9 · Aviation sub-accent: complete the swap; drop the second navy.**
- **Where:** `global.css` `.aviation`, `.aviation-feature*`; `[...path].astro` (home aviation section, `.section-nav`); `Layout.astro` footer.
- **Wrong:**
  - The home aviation band uses `#203c49`, a second navy directly above the footer's `#18292e`, so there's a visible seam.
  - It has its own blue `#a4d1df`.
  - The aviation pages swap `--accent` to `#25667c`, but the footer arrow stays gold-light, so one footer shows a teal dot next to a gold arrow.
  - Only the aviation pages have a sibling sub-nav, placed *below* the hero.
- **Target:**
  - `body.aviation, .aviation-scope { --accent: var(--color-aviation); --accent-on-dark: var(--color-aviation-on-dark); }`. Every accent use, footer included, reads these variables (footer arrows and full stop use `--accent-on-dark`).
  - **Home aviation teaser:** make it a **light section on `--color-stone`** with class `aviation-scope`.
    - Image cols 1–6 at 3:2; copy cols 8–12: eyebrow "Aviation" in `--accent`, h2 "Testing Service Aviation" (no `<br>`/`<em>` split, so the accessible text no longer reads "Testing ServiceAviation."), lead, and a `button-secondary` "Podrobnosti →".
    - Optionally show `_source/img/TS-A_Logo.png` at 56px height above the eyebrow.
    - Delete `#203c49` and `#a4d1df` literals.
    - This also leaves only two dark bands on the page: the hero and the footer.
  - **Aviation sub-nav** (`.section-nav`): move it **above** the page hero, directly under the breadcrumb, on all three aviation pages.
    - Tabs in `--text-ui`, 44px tall, 32px gap, one hairline under the row.
    - Current tab: 2px `--accent` underline sitting on that hairline, ink text.
    - Mobile: a horizontally scrollable row (`overflow-x:auto; scrollbar-width:none`), not wrapped.

**P1-10 · One photo treatment and fixed ratios.**
- **Where:** `global.css`, all `img` in `.home-hero`, `.page-hero`, `.service-card`, `.aviation-feature`, `.gallery-grid`.
- **Wrong:**
  - Cards are desaturated to 0.55 while everything else is full colour; the neon-yellow robots dominate the home page.
  - Five aspect ratios (1.6, 1.25, 1.8, 1.3, 1.7, 1.4, 1.2) change per breakpoint.
- **Target:**
  - Every photo: `filter: saturate(.8)`.
  - Ratios: cards, gallery and aviation teaser **3:2**; page hero **4:3**; home hero cover. The same at all widths.
  - Logos are never filtered except the clients strip (grayscale).

**P1-11 · Footer: one scale, clear columns, no repetition.**
- **Where:** `src/layouts/Layout.astro` (`<footer>`), `global.css` `.site-footer`, `.footer-*`.
- **Wrong:**
  - The footer has its own type scale (h3 1rem, bottom row 0.65rem / 10.4px).
  - Column 1 mixes the address, a "Kontakt ↗" link, an unlabelled "Aviation" line and an email.
  - The downloads `<details>` summary repeats the column heading ("Na stiahnutie · PDF / XLSX") and uses the unstyled native ▶ marker.
  - "Testing Service Aviation ↗" sits under Downloads.
  - The bottom row repeats the company name and the tagline.
  - The email floats right, detached from the grid.
  - The contact page shows the big "Kontaktujte nás." footer directly under the contact form.
- **Target:**
  - **Top row:**
    - h2 `t.cta` (`--text-h2`, white, **no full stop**) in cols 1–7.
    - In cols 8–12, right-aligned to the container edge and baseline-aligned with the h2: the email `jakub.kubis@testing-service.org` as a text link in Lead size, and below it (16px) a `button-on-dark` "`t.enquiry` →" to `contact#enquiry`.
    - 48px below, one hairline. **Hide the whole top row on the contact page** (`page.kind !== "contact"`).
  - **Grid:** 4 × span 3 (2 × 2 at 640–1079px, 1 column below 640px).
    - Columns: **Company** (name as H4, address, main email); **Legal** (court, IČO, IČ DPH, privacy link); **Downloads**; **Aviation** (H4 "Aviation", "Aviation Testing Center · Letisko Žilina (LZZI)", `info.aviation@…`, links to the three aviation pages).
    - Downloads lists the files for the current language (`f.lang === lang || f.lang === "both"`) directly as links with a ↓, with no `<details>`.
    - Headings: `--text-h4`, white. Text: `--text-small`, `--color-text-on-dark`, line-height 1.6.
    - Links: no underline at rest, underline on hover, 32px min height.
  - **Bottom row:** hairline, then "© Testing Service s.r.o." (Small, muted-on-dark) left and "Inspection · Certification · Permit" (Label, muted-on-dark) right. Stacked left below 640px. Use no year unless it's generated at build time (`new Date().getFullYear()` is fine).

**P1-12 · Accessibility floor.**
- **Text below 12px:** after P0-1 and P0-5, no computed `font-size` may be below 12px. Grep `global.css` for `rem` values < 0.75; the only allowed value under 0.875 is `--text-label`.
- **Focus ring:**
  - Light surfaces: `:focus-visible{outline:2px solid var(--focus);outline-offset:3px}` with `--focus: var(--accent)`.
  - Dark bands: add `class="on-dark"` to the home hero and the footer, with `.on-dark{--focus: var(--accent-on-dark)}`. The v0 gold ring on ink is 2.68:1 (aviation 2.34:1), which fails 3:1.
- **Form fields:** input and textarea borders `1px solid var(--color-line-strong)` on a white field (`--color-white`), 48px tall, padding `0 16px` (textarea padding 12px 16px, min-height 160px). Focus: border ink plus the focus ring. `:user-invalid`: border `#9b2c1f` plus a message below the field.
- **Skip link:** in 4 of the 11 screenshots, "Prejsť na obsah" shows over the content (over the hero h1, the logo and the mobile content). The CSS hides it at `top:-100px` with `position:fixed`, so this is probably a focus artefact of the capture. Make it robust anyway: `position:absolute; left:16px; top:12px; transform:translateY(-200%)`, and on `:focus-visible` `transform:none`, so it sits inside the header band. Then re-shoot.
- **Scoped form styles:** replace the bare `form{}` / `form label` / `form h2` selectors with `.enquiry-form …` (set that class on the `<form>` in `src/components/ContactForm.astro`).

### P2: polish, mobile and smaller drift

**P2-1 · Article aside and prose measure.**
- **Where:** `.article-layout aside`, `.contents`, `.prose`.
- **Target:**
  - Aside sticky (`position:sticky; top:96px`) with eyebrow "Obsah" (not `t.detail` "Rozsah služieb", which is wrong on References: "SCOPE OF SERVICES" above "Our references"; add `toc: "Obsah" / "Contents" / "目录"` to `ui.ts`).
  - Contents links: Small, a 1px left rule, padding-left 12px, 8px apart, current/hover in `--accent`.
  - Prose: `--text-body`, colour `--color-text`, `max-width: 68ch` (fixes the ~99-character lines).
  - Prose h2 1.75rem, margin 56px 0 16px; prose h3 `--text-h3`, margin 40px 0 12px; h4 (for "Potrebujeme:"-type headings) `--text-h4`.
  - Lists 20px indent, items 4px apart.
  - Hide the aside below 1080px (as now).

**P2-2 · Service-page ending.**
- **Wrong:** pages end on a 16px plain sentence ("Kontaktujte nás a my sa vám ozveme.") and then "Ďalšie služby".
- **Target:** after the prose and the list, a closing CTA strip in cols 5–12: a hairline, then 32px, then H3 `t.enquiry` ("Napíšte nám"), then the existing closing sentence as Small muted, then a `button-primary` `t.cta` → to the contact page. 48px gap, then Related.

**P2-3 · Clients strip.**
- **Where:** `src/components/Logos.astro`, `.logo-strip`, `.section-label`.
- **Wrong:** optical sizes differ (Hyundai and RR read larger than Dürr and KIA); on mobile, 5 logos at 70px each with 0.7rem gaps make Hyundai unreadable.
- **Target:**
  - Each logo `height: 36px; width: auto`, with a per-logo `--logo-scale` (Dürr 0.85, KIA 0.9, Hyundai 1, RR 1.1, VW 1.15 as a starting point; tune by eye so they read equal).
  - Grayscale, `opacity: .7`, 1 on hover.
  - 5 columns ≥640px; below 640px a 3 + 2 centred grid with 24px gaps.
  - Strip padding 48px block, one hairline under.
  - Label "Naši klienti" left, link right with the lang-tag and →.

**P2-4 · Gallery (aviation).**
- **Wrong:** two stacked galleries (4 photos, then a "Fotogaléria +" accordion). 50 of 65 alt texts are "Letecký pohľad na Slovensko / Aerial view of Slovakia". The 4th featured image ("Nad_Stredným_Slovenskom-23.jpg") has a burnt-in caption and grey frame.
- **Target:**
  - One section header (eyebrow "Žilina · LZZI", h2 `t.gallery`), then a 4-column 3:2 grid (2 columns below 640px, 16px gap) of the 8 strongest Testing Center photos.
  - Then a list-row-styled disclosure "Ďalšie fotografie (n)" with the rest.
  - Replace the featured aerial with a Testing Center photo, e.g. `TESTING_CENTER-21%5B198%5D.jpg` or `-25%5B202%5D.jpg`. Check that the image is clean first.
  - Alt text: describe each photo distinctly where the content is identifiable; for the remaining generic aerials, use `alt=""` inside a group labelled "Letecké zábery Slovenska" so screen readers aren't fed 50 identical alts.
- **Partners:** the "Naši partneri" image is a flattened full-colour 650px JPG strip that clashes with the grayscale client logos, and its alt names only one of the three partners. Set alt to "Žilinská univerzita – Letecké výcvikové a vzdelávacie centrum; Letisko Žilina" (the names visible in the image) and place it at `max-width: 480px` under an H3, inside cols 5–12.

**P2-5 · Contact page.**
- **Target:**
  - Details in cols 1–4: H3 company name; address in Lead size; emails as list rows (meta "E-mail", icon →); "Aviation" as an H4 sub-head; the Prague block below a hairline with the eyebrow `t.soon`.
  - Form panel in cols 5–12 on `--color-stone`, padding 40px (24px mobile), H3 `t.enquiry`.
  - Field rows 2-up ≥640px, 16px gap, labels Small 500 ink with 8px to the field.
  - Submit `button-primary` 48px.
  - The page hero has no photo, so its text spans cols 1–8 and its bottom padding is 48px (not the 4rem plus the empty right half of v0).

**P2-6 · CJK typography** (`/zh/`).
- **Wrong:** the global −0.035em tracking and weight 500 make PingFang/YaHei look thin and cramped next to Plex. The 0.14em uppercase eyebrow tracking applies to Chinese ("服务范围"). The ZH hero lead duplicates the intro statement verbatim.
- **Target:**
  - `:lang(zh) :is(h1,h2,h3,h4){letter-spacing:0;font-weight:600;line-height:1.3}`, `:lang(zh) body{line-height:1.8}`, `:lang(zh) .eyebrow{letter-spacing:.04em;text-transform:none}`.
  - ZH display h1 `max-width: 11em`.
  - On ZH, drop the hero lead. The `zh/home.md` description is identical to the ZH h1, and the current fallback repeats the intro statement, so there's no non-duplicate copy to show.
  - Don't add a web CJK font in this pass.

**P2-7 · Arrow grammar sweep.**
- **Wrong:** ↗ is used for internal links (cards, related, CTAs, footer "Kontakt ↗", the 404 "Späť na úvod ↗"), ↓ means both download and scroll, and arrows are text glyphs with inconsistent spacing.
- **Target:** → internal, ↗ external (Drive, EUR-Lex, AIP, caa.cz), ↓ file download and in-page jump. Render them as one inline SVG icon component (16px, `stroke: currentColor`, 1.5px) with a fixed 8px (inline) or 12px (button) gap. Remove the glyph spacing hacks.

**P2-8 · 404 page** (`src/pages/404.astro`).
- **Target:** the page-hero pattern without a photo: eyebrow "404", h1 with the accent full stop, lead.
  - Then a row of `button-primary` "Späť na úvod →" and `button-secondary` "English →" with a 16px gap (a flex row, not `{" "}`).

**P2-9 · Redirect stubs** (`[...path].astro`, the `target` branch).
- **Target:** set `<html lang>` from the target path (sk unless it starts with `en/` or `zh/`). Low impact.

**P2-10 · Visual QA after the build.**
- Re-shoot the same 11 screenshots (desktop 1440 and mobile 390) **without focusing anything first**. Add 1080, 1024 and 640 to check the two breakpoints.
- Re-run `.claude/skills/impeccable/scripts/impeccable detect --json dist/`. Target: zero `tiny-text`, `undersized-ui-text`, `hero-eyebrow-chip`, `numbered-section-labels` and `skipped-heading`.

---

## 5. Owner decisions (not for the builder to invent)

The design-review agent recommended these. They need facts or decisions only the owner can supply, so they are **not** in the fix list:

- **Phone number(s).** None in the source content. B2B buyers in this category expect a phone number in the header or footer. Supply one and the footer Company column and the contact details get a `tel:` row.
- **Role mailbox** (e.g. info@) instead of a personal address as the primary contact.
- **Form endpoint.** Set `PUBLIC_FORM_ENDPOINT` so the form posts instead of opening a mail client, then add an inline success state. The code path already exists.
- **Response-time promise, accreditation numbers for the industrial side, and a Prague opening date.** Only if they're true and documented.
- **An "equipment type" entry** (tlakové · zdvíhacie · elektrické · plynové · ATEX · lietadlá → which service applies). This is the single biggest specificity upgrade available, but it needs owner-approved copy per equipment class. A good v2 candidate.
- **Logo red.** The site palette doesn't use the logo's red, deliberately: red stays in the logo only. If the owner wants a red signal colour, it has to be added to DESIGN.md first.

## 6. Suggested implementation order

1. P0-1 tokens → P0-3 grid → P0-2 logo → P0-5 microcopy removal → P0-4 content headings. Rebuild and screenshot.
2. P1-1 header → P1-2 lang-tag → P1-4 page hero → P1-5 section header → P1-3 home hero.
3. P1-6 cards → P1-7 packages → P1-8 lists → P1-9 aviation → P1-10 photos → P1-11 footer → P1-12 a11y.
4. P2 items, then P2-10 QA.

Questions skipped: this was a non-interactive run, per the owner's instruction. The two open decisions surfaced in this review are listed in §5.
