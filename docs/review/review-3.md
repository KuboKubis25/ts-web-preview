# Design review 3: v2 critique, audit and fix list

Method: dual-agent (A: isolated design review of all 27 `shots-v2/` captures and the source · B: `impeccable detect` on `src/`, runtime detector injection, and a Playwright geometry/typography inventory of 9 routes at 1440 and 390). The reviewer also inspected every capture in `docs/review/shots-v2/` directly, slicing the tall ones. Run note: B finished before A, but A never saw B's output.

Contract: `DESIGN.md` was refined in round 3 in this same commit. **Implement against the new DESIGN.md.** Where this file and DESIGN.md disagree, DESIGN.md wins. Paths are relative to `src/`. "page" means `pages/[...path].astro`, "css" means `styles/global.css`, "Layout" means `layouts/Layout.astro`. Line numbers refer to commit `961ff8f`.

---

## 1. Verdict

v2 is a real step up. The review-2 structural work holds at every width:
- mobile-first collapse;
- one reading edge at column 5 (x = 509 at 1440, 20 at 390 on every page measured);
- one button family;
- tokenised colour (every rendered colour maps to a token);
- the offer set as the home h1;
- a working accent swap.

Build, layout QA (23 routes × 5 widths, 46 axe runs, 0 failures) and the link check all pass.

It is still **not neat**, for three reasons:

1. **The system repeats itself.**
   - "Kontaktujte nás" appears three times at the end of every article: sticky header CTA, closing button, footer h2. The closing button and the footer h2 sit within one mobile screen.
   - Aviation pages show the same three links four times: crumb/tab/h1, tabs, Related, footer.
   - The footer duplicates the privacy page and carries 11–12 links in one column against 2 in another.
2. **Patterns drift at the edges.**
   - On home, headings start at four x-positions (64, 509, 843, 64).
   - The gallery head is split across two columns.
   - A double hairline 48px apart on every page with downloads.
   - Three language-tag styles.
   - Rows of two heights in one list.
   - Hero bottoms that are 64px on some pages and ~100px on others.
   - Labels that sit ~20px off the row they label.
   - Line-heights that are off-token.
3. **It still looks templated where it counts.**
   - Four stock-photo service cards (paper stack, blueprint and hard hat, pipes, lab coat).
   - Card descriptions that restate their titles.
   - A sitemap footer.
   - An empty left column under most home sections.

   The "Inspection Report" idea shows up only as hairlines and the 01–04 numerals.

Round 3 is therefore about **removing duplication and making each pattern exist exactly once**, not about adding anything.

---

## 2. Scores

### Critique: Nielsen heuristics (7 and 10 are n/a on a Persuade surface)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Current states exist. The contact header CTA shows a border plus an underline. Mobile aviation tabs are clipped with no scroll cue. |
| 2 | Match system / real world | 2 | Slovak titles on EN/ZH (footer documents, "Objednávka kontroly magnet", "GDPR"). The aviation overview asks "…k tejto službe?". English h3s on SK aviation. |
| 3 | User control and freedom | 3 | No traps; cross-language links are labelled. |
| 4 | Consistency and standards | 3 | Four heading x-positions, double rules, three tag styles, a missing menu rule, mixed row heights. |
| 5 | Error prevention | 2 | Mailto-only form. SK 2024 and EN 2019 order forms sit side by side with no hint which is current. |
| 6 | Recognition rather than recall | 3 | Good contents nav and breadcrumb. Aviation offers the same three links four times. |
| 7 | Flexibility and efficiency | n/a | Marketing surface. |
| 8 | Aesthetic and minimalist design | 3 | Calm overall, but redundant: CTA ×3, "Služby" ×3 on a service hero, footer repeating contact details on the contact page. |
| 9 | Error recovery | 2 | Inline field errors only; no success or fallback state after "Otvoriť e-mail". |
| 10 | Help and documentation | n/a | Marketing surface. |
| | **Total** | **21/32 (66%)** | **Acceptable → close to Good.** v1 scored 20/32. |

Cognitive load fails 3 of 8 checks:
- **Single focus:** repeated CTA.
- **Chunking:** 9–11 mixed download rows on instruments; 11-item footer column.
- **Minimal choices:** three conversion blocks in a row at the end of each article.

Emotional journey:
- **Peaks:** the 60px home claim with the gold full stop; the real Žilina gallery.
- **Valleys:** the 2,400px card stack at 640–1024; the near-empty ZH packages section.
- **End:** a sitemap, not a confident close.

### Audit: technical quality

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 3 | Axe clean on 46 runs. Gaps: brand link 40px tall (32px mobile), breadcrumb links 18px tall at 390, footer links 32px, footer e-mail 28–31px, "Menu" label at weight 400. |
| 2 | Performance | 3 | Responsive srcsets capped at source pixels, lazy images, minimal JS. Mobile home hero upscales its 390×256 source to 390×260 (1.6%). |
| 3 | Theming | 3 | All colours tokenised, accent swap complete. Off-token values: line-heights 1.4 / 1.6 / inherited 1.65, panel padding 40px, tag offset 6px, contents padding 6px, 13px wordmark not in the type tokens. |
| 4 | Responsive | 3 | No overflow, collapse fixed. A one-column 3:2 card stack at 640–~700px; a 683px home hero photo at 1024; clipped tabs at 390. |
| 5 | Implementation integrity | 3 | Coherent tokens. Overrides are appended at css 1062–1110 instead of edited in place, `.contact-layout` is declared twice (553, 893), and `margin-top: -1px` is applied to sections with no hairline above. |
| | **Total** | **15/20** | **Good** |

### Detector

- **Static scan of `src/`:** exit 0. One advisory: `design-system-font-size` at css:1323 (the 13px stacked wordmark). This is a false positive against the old YAML. It is now a token (`wordmark-stacked`), so it should clear.
- **Runtime injection** on 8 routes:
  - `hero-eyebrow-chip` on the home hero (allowed by DESIGN) and on the service hero "Služby" (**now a true positive**: the round-3 contract removes interior eyebrows).
  - `kicker-above-heading` on the home teaser "Aviation" over "Testing Service Aviation" (**true positive**: the eyebrow repeats its heading; removed in round 3).
  - Aviation, instruments, contact and references: clean.
- **After round 3, the expected detector result is one finding** (`hero-eyebrow-chip` on the home hero, accepted).

---

## 3. Review-2 status

| Item | Status |
|---|---|
| P0-1 collapse, P0-2 row gap, P0-3 QA gate | Fixed |
| P1-1 hero, P1-2 eyebrows, P1-5 aviation ending, P1-6 service list, P1-10, P1-11, P1-14 photos, P1-15 dropdown closed | Fixed |
| P1-3 contact rhythm | Partial: contact footer still 112–125px to the first text (target 64), header CTA shows border + underline |
| P1-4 one closing | Partial: the CTA is still shown three times (the system rule caused it; fixed in DESIGN round 3) |
| P1-7 lang tags | Partial: three treatments, tags wrap alone at 390 |
| P1-8 no inferred lead | Fixed technically; source fragments now read as errors (see P2-12) |
| **P1-9 nested regulation list** | **Regressed**: the P2-11 dash normalisation turned the Markdown `-` markers into en dashes, so the list renders as one bullet "Odkazy na predpisy: – No 2018/1139 – No 1321/2014" |
| P1-12 card grid | Partial: one 3:2 column at 640–~700px |
| P1-13 ZH | Partial: cards truncated with "…", Latin/Slovak footer, teaser rhythm differs |
| P2-1 mobile menu | Fixed, but a rule is missing and there are two stacked label rows |
| P2-5 footer split | Done as specified, but it produced the overloaded Aviation column (the spec was wrong; fixed in DESIGN) |
| P2-6 arrows | Lists fixed; footer mailto and privacy links have no icon |
| P2-11 source typography | Partial: case drift in capabilities, an unspaced em dash on EN references, the list regression |
| P2-12 references | Partial: "here" and the presentation are repeated as rows; ~100px dead space under the lead |
| P2-13 eyebrow balance | Partial: line 2 starts with "·" at 390 |
| Everything else | Fixed |

---

## 4. What's working (keep it)

1. **One reading edge and one list.** Measured: every prose block, list stack, form and related list starts at x = 509.3 at 1440. List stacks are 866.7 wide and prose is 608. Section spacing is identical across all pages that share a pattern. No doubled hero/article hairline.
2. **The home claim.** The compliance sentence at Display size with the gold full stop, vertically centred in the 7/5 split. This is the most authored moment on the site, and ZH wraps by phrase without splitting words.
3. **Paperwork as a feature.** Download rows with file-type meta, the hero "Na stiahnutie ↓" jump on pages with files, and the aviation accent swap reaching the footer button and its hover.

---

## 5. Priority issues (critique)

- **[P0] One closing, not three.**
  - *Why:* a calm, confident brand doesn't ask three times in 600px; it is also the most visible "template" tell.
  - *Fix:* remove the closing strip; the footer top row becomes the single closing with `ctaQuestion` (see FIX P0-2).
  - *Command:* `/impeccable distill`.
- **[P0] One section-heading edge.**
  - *Why:* headings jumping between x = 64 / 509 / 843 make the home page feel assembled rather than composed.
  - *Fix:* two section patterns, every heading at col 1 (FIX P0-1).
  - *Command:* `/impeccable layout`.
- **[P0] Footer is a sitemap.**
  - *Why:* the last impression on every page is an unbalanced 11-link column plus duplicate privacy links.
  - *Fix:* four balanced columns, each link once (FIX P0-3).
  - *Command:* `/impeccable distill`.
- **[P1] Stock service cards.**
  - *Why:* four stock moods are the most category-interchangeable element on the site, and on mobile and tablet they make home 6,700px long.
  - *Fix:* photo-free numbered entries (FIX P1-1).
  - *Command:* `/impeccable distill`.
- **[P1] Edge drift.**
  - *Why:* small misalignments (double rules, uneven rows, labels off-baseline, uneven hero bottoms) are exactly what the owner reads as "inconsistent".
  - *Fix:* FIX P1-2 … P1-9.
  - *Command:* `/impeccable polish`.

### Persona red flags

**Jordan (first-timer)**
- Card text restates the titles ("Poradenské služby" / "Poradenské služby – technické štandardy…"), so Jordan can't tell which service covers a pressure vessel.
- Two service sections on home ("Naše služby" and "Služby pre prevádzkovateľov a dodávateľov"), with aviation items mixed into the industry list.
- "Referencie EN" in the SK nav sends Jordan to English with no other warning.

**Casey (mobile)**
- The home page is 6,746px; the footer alone is ~1,400px.
- The hero eyebrow's second line starts with "·".
- The aviation tabs cut off "Skúšky avionických sy" with no cue.
- Lang tags drop onto their own line in download rows.
- A rule is missing in the open menu.
- The contact CTA appears twice on one screen.

**EHS officer at a foreign-owned plant (project persona)**
- The EN pages exist, but the trust documents (accreditation, GDPR, privacy) are SK-only, and the footer shows them under Slovak titles.
- On ZH every "详情" leads to English and the footer is Latin/Slovak.
- The mailto-only form may be blocked by corporate mail.
- Contact labels drift between "Get in touch", "Send an enquiry" and "Contact".

---

## 6. Fix list

There are **no functional blockers** (build, axe and links pass). In this round, **P0 = system-wide duplication or drift visible on every page**, **P1 = visible inconsistency on specific patterns or widths**, and **P2 = polish, token hygiene and content-dependent items**. Each item names the file, what is wrong, the exact target, and how to verify it.

### P0: system

**P0-1 · Two section patterns; every section heading starts at column 1**

Where:
- page 255–257 (services head), 283–307 (packages), 520–560 (gallery);
- css 515–546 (`.section-label`, intro), 1131–1140 (`.related > .eyebrow`, `.section-head.grid > .eyebrow`).

Wrong:
- Home h2s start at x = 64 (services), 509 (packages), 843 (teaser), 64 (footer).
- The intro statement sits at col 5 with an empty cols 1–4.
- The gallery puts its eyebrow at col 1 and its h2 at col 5, on one row (eyebrow → h2 gap −30px), above a full-width grid.

Target (DESIGN › Layout › The two section patterns):
- **Home intro:** statement in cols 1–7 (Statement token, max 34ch); the supporting Body paragraph in cols 8–12. Both are top-aligned: add `padding-top` to the paragraph equal to (statement line-height − body line-height) / 2 ≈ 6px at 1440. Below 1080px: stacked, 24px between them.
- **Packages:** full-width section.
  - The header (h2 + lead, max 52ch) at cols 1–8 from col 1.
  - The capabilities list spans cols 1–12 in **3 columns at ≥1080px, 2 at 640–1079px, 1 below 640px**, filled row by row (`grid-auto-flow: row`), so each row's hairline runs straight across.
  - The disclosure row spans the whole width as the last row.
  - Header → list: 48px (32px below 640px).
- **Gallery:** a full-width header at col 1, with the eyebrow "Žilina · LZZI" → 16px → h2 stacked. Delete the `.section-head.grid` two-column variant entirely.
- **Related, contents and contact** keep margin + content (Label in cols 1–3, content in cols 5–12).
- **The teaser** is a named split (h2 at col 8), unchanged.

Verify: at 1440 every `section h2` has x = 64, except the teaser (843) and the article/related content.

**P0-2 · One page ending: remove the closing strip; the footer top row is the closing**

Where:
- page 491–505 (`.closing-cta`);
- Layout 209–228 (`.footer-top`);
- css 821–838;
- `data/ui.ts` (`ctaQuestion` in sk/en/zh).

Wrong: on service and aviation pages the sticky header "Kontaktujte nás", the closing button "Kontaktujte nás" and the footer h2 "Kontaktujte nás" all appear within ~600px (≈460px on mobile).

Target:
1. **Delete the `.closing-cta` section** and its CSS.
2. **Article ending order:** downloads → [partners] → [related on industry pages]. Each block is 48px apart; related starts 64px after the last article block.
3. **Footer top row on every page except contact:**
   - h2 = `t.ctaQuestion`. Change the values to SK "Máte otázku?", EN "Have a question?", ZH "有疑问？".
   - If the page frontmatter has `closing` and it isn't the same sentence, render it 16px under the h2 as a Body paragraph in `text-on-dark`, max 52ch.
   - Right column: the division e-mail (Lead size, `min-height: 44px; display: inline-flex; align-items: center`) → 16px → `button-on-dark` labelled `t.enquiry` ("Napíšte nám" / "Send an enquiry" / existing ZH), linking to the contact page `#enquiry`.
   - `t.cta` stays only in the header CTA and the mobile-menu CTA.
4. The risk page's `closing` text currently ends with "kontaktujte nás". It stays as source copy, rendered as the Body line under the question.

Verify:
- No page has two visible elements with the label `t.cta`.
- The footer h2 text never equals the header CTA text.
- `grep -c closing-cta dist/**/*.html` = 0.

**P0-3 · Footer: four balanced columns, every link once**

Where:
- Layout 236–318;
- `footerFiles`, Layout 31–36;
- `data/downloads.ts` (titles).

Wrong:
- The Aviation column has 11 items (12 on ZH), mixing plain text, an icon-less mailto, → pages and ↓ files.
- The Downloads column has 2.
- The privacy page appears twice ("Ochrana osobných údajov" in Legal plus "… · GDPR" in Downloads).
- On the contact page the footer repeats the details column (Layout 241–245 even adds jakub.kubis@).

Target (DESIGN › Footer):

| Column | Contents |
|---|---|
| **Testing Service s.r.o.** | name; address (3 lines). No e-mail on any page. |
| **Právne údaje** / Company details / existing ZH label | register (2 lines); IČO; IČ DPH; "Ochrana osobných údajov →" (legal page); "Oprávnenie ↓" (the `TS-Opravnenie.pdf` entry; EN/ZH title "Accreditations") |
| **Služby** / Services / 我们的服务 | the four services from `serviceKeys`, → (ZH: the existing ZH titles, linking EN with lang-tag) |
| **Aviation** / 航空 | "Aviation Testing Center · Žilina (LZZI)"; info.aviation@ with ↗; the three aviation pages with → |

- Remove every division document from the footer. They are on their pages' download lists.
- Remove the GDPR PDF link; it is on the legal page.
- Footer links: Small 14 / lh 1.55, 8px gap. The icon sits inline after the text with `white-space: nowrap` on the last word + icon. `min-height: 44px` below 1080px, 32px at ≥1080px.
- On the contact page: no top row, and `.site-footer:not(:has(.footer-top)) .footer-grid { padding-top: 0 }`, so the first footer heading is exactly 64px below the band's top.

Verify: each column has ≤6 items at 1440; no href appears twice inside `<footer>`.

**P0-4 · List rows: one height, one type token, one meta position**

Where:
- `components/LinkList.astro` 10–40;
- css 636–684 (`.list`, `.list-title`, `.disclosure summary`), 842–846.

Wrong:
- Rows with meta are 77px and rows without are 57px, in the same stack.
- The title line-height is 1.4 while DESIGN said Body.
- The disclosure summary is 15px with an inherited 1.65 inside a 17px stack.
- The lang tag sits after the title and wraps alone at 390 ("…order form · 2019 / EN / XLSX").

Target:
- Title = **List** token (17 / 500 / lh 1.4).
- At ≥640px: the row is a 3-column grid `1fr auto 16px` with `column-gap: 16px`. The meta (Label, `muted`) is right-aligned, vertically centred, then the icon. The language goes into the meta string: `XLSX · EN`, `PDF · SK`, `E-MAIL`. Every row is 56px min.
- Below 640px: the meta sits under the title (4px gap); the icon stays right.
- Disclosure `summary`: List token (17/500/1.4), icon + / − at 16px.
- Remove `LangTag` from list-row titles. The tag goes into the meta text, generated from `download.lang` when it differs from the page language.

Verify: every `.list > li` in one stack has the same height at 1440.

### P1: patterns and widths

**P1-1 · Service cards become photo-free numbered report entries**

Where: page 255–280 (card markup), css 590–630 and 1110–1119 (container query), 1376–1378.

Wrong:
- Four stock photos make the most generic block on the site.
- At 640–~700px the grid is one column of 3:2 cards ~615px each (≈2,460px for four).
- At 1024 and 640 the cards run 600–700px tall each.

Target (DESIGN › Service card):
- Delete the `<Photo>` from the card.
- Padding 32px top, 24px sides and bottom.
- Subgrid rows: numeral (Label, accent) → 16px → H3 title → 12px → Small `muted` description → 24px → "Podrobnosti →".
- Measure the bottom padding to the link text: use `margin-block: -12px` on the 44px link, so the visible gap is 24px. Fixes the 38/24 asymmetry.
- Container query: 2 columns at `inline-size >= 540px`, 4 at `>= 1120px`.
- Hover: the 2px accent top rule (the card keeps a 2px transparent top border at rest, so nothing shifts).
- The service photos stay on the service page heroes.

Verify: at 390 the four cards total ≤ 900px; at 640 there are 2 columns.

**P1-2 · Remove the double hairline (downloads → next block)**

Where: css 821–835.

Wrong: the downloads list's closing rule and the closing strip's top rule are 48px apart (instruments, inspections, maintenance).

Target: P0-2 removes the strip. Also implement the general Hairline Adjacency Rule:

```css
:is(.list, .disclosure:last-child) + :is(section, .related) { border-top: 0; }
```

Add a QA assertion: no two horizontal 1px rules within 48px of each other in the same column.

**P1-3 · Interior hero: no eyebrow, true 64px bottom, consistent mobile photo gap**

Where: page 376–395; css 736–750, 1147–1153, 1289–1292.

Wrong:
- The "SLUŽBY" eyebrow repeats the breadcrumb 68px above it and the current nav item.
- Contact and references heroes are bottom-heavy: lead margin 32 + padding 64 ≈ 100px to the hairline.
- On mobile, lead → photo is 64px without an action and 32px with one.

Target:
- Remove the eyebrow from every interior hero.
- `.page-hero > div > :last-child { margin-bottom: 0 }`.
- Stacked photo `margin-top: 32px` only.
- Desktop photo top-aligned with the h1's first line box: `margin-top` = (h1 line-height − cap height) ≈ 8px at 56px, or simply align to the h1 top.

Verify: hero last text → hairline = 64px on contact, references, permits and aviation at 1440 and 390.

**P1-4 · Aviation: remove duplicate navigation**

Where: page 340–375 (breadcrumb/tabs), 509–527 (related).

Wrong: "Testing Service Aviation" as the breadcrumb current item, tab and h1 within 150px, plus a Related list that repeats the tabs.

Target:
- On `kind === "aviation"`, omit the breadcrumb's current crumb (keep "Úvod /" and, on child pages, "Aviation").
- Omit `.related` entirely.
- On the aviation index the ending is downloads → partners, then the gallery on stone.

**P1-5 · One lang-tag**

Where: `components/LangTag.astro`; css 240–255; Layout header nav; footer.

Wrong:
- Boxed in the nav and cards, unboxed in buttons and on dark.
- The ZH header shows "航空 [EN]" boxed next to "联系我们 EN" unboxed.
- On dark, "Privacy policy SK" reads as stray text.

Target:
- Box everywhere: Label 600, 1px border (`line` on light, `line-on-dark` with `muted-on-dark` text on dark), padding 1px 4px, `margin-left: 8px`, `white-space: nowrap`.
- Join it to the previous word with `&nbsp;`.
- The only unboxed case is inside filled buttons (header CTA, on-dark button): `currentColor`, opacity .75.
- In list rows, see P0-4 (meta line).

**P1-6 · Mobile menu panel**

Where: Layout 120–200; css 431–460 (`.dropdown > a:last-child { border-bottom: 0 }` leaks below 1080px).

Wrong:
- No hairline between "Inšpekcie, skúšky a kvalifikácie" and "Aviation".
- The Label "SLUŽBY" sits directly over a second label-styled row "VŠETKY SLUŽBY ↓".

Target:
- Wrap the border-bottom removal in `@media (width >= 1080px)`.
- Below 1080px, hide the "Všetky služby" row.
- Rows: List token, 52px, hairline below every row.
- CTA 24px below the last rule.

**P1-7 · Desktop dropdown details**

Where: css 425–460; Layout dropdown markup.

Target:
- First row "Všetky služby →": the ↓ becomes the `arrow-right` icon; it navigates to another page on interior routes.
- Panel `top: 100%` flush on the header's bottom hairline. DESIGN now says flush, not "12px below".
- Rows: UI 15/500/**lh 1.2**, 16px block padding.
- The "Všetky služby" row: Label 12/600/**lh 1.3**.
- Chevron: a 12 × 12 SVG in ink, rotated 180° when open.

**P1-8 · Home hero and teaser at <1080px; teaser alignment**

Where: css 470–500 (home hero), 690–708 (teaser).

Wrong:
- At 1024 the stacked hero photo is 1024 × 683, a full screen of stock robots.
- The teaser copy floats vertically centred. On ZH (no lead) the h2 → button gap is 16px, against 32px in SK and EN.
- The teaser eyebrow "Aviation" repeats the h2 (detector: `kicker-above-heading`).

Target:
- Home hero photo below 1080px: `aspect-ratio: 3/2; max-height: 50svh; object-fit: cover`.
- Teaser copy `align-self: start`.
- Remove the eyebrow.
- h2 → 16px → lead → 32px → button; without a lead, h2 → 32px → button.

**P1-9 · Margin titles and contact columns on the baseline**

Where: css 1131–1140, 1156–1161, 893–900.

Wrong:
- "ĎALŠIE SLUŽBY" sits ~20px above the first related-row title.
- The contact details H3 sits 40px above the form's H3.
- The contact H4s "Aviation" / "Praha" (18/600) outweigh the company H3 (22/500).

Target:
- `.related > .eyebrow { padding-top: 20px }`.
- `.contact-details { padding-top: var(--panel) }` (48px; see P2-1).
- Contact sub-heads "Aviation" and "Praha" become **H3** (22/500), with the "Čoskoro" eyebrow kept above Praha.
- Globally, H4 drops to weight 500.

**P1-10 · Regression: nested regulation list**

Where: `content/pages/sk/aviation.md` 30–32, `content/pages/en/aviation.md` 27–29.

Wrong: the en-dash normalisation replaced the Markdown list markers.

Target: restore `  - No 2018/1139` / `  - No 1321/2014` as nested items under "Odkazy na predpisy:".

Add a QA assertion: the aviation pages contain `li > ul > li`.

**P1-11 · Mobile aviation tabs**

Where: css 847–869; Layout 380–385.

Target:
- `scroll-padding-inline: var(--gutter)`; the first tab is aligned to x = 20.
- `scrollIntoView({ inline: "start", block: "nearest" })` on load for the current tab.
- Right-edge fade with `mask-image: linear-gradient(to right, #000 calc(100% - 32px), transparent)`, applied only when `scrollWidth > clientWidth + scrollLeft`. Toggle a class on scroll.

**P1-12 · Hero eyebrow wrap (home, 390)**

Where: page 180–185.

Target:
- Render each item as `<span class="nowrap">Inšpekcie&nbsp;·</span>`, the last one "CZ&nbsp;+&nbsp;SK".
- No line may start with "·", at any width or in any language.

### P2: polish, token hygiene, content

**P2-1 · Token hygiene (Step Rule)**

Where: css, multiple places.

| Element | Location | Change |
|---|---|---|
| Form panel padding | | 40 → `--panel` 48px (24px below 640px) |
| Lang-tag offset | | 6 → 8px |
| `.contents a` padding | | 6 → 8px |
| Footer `p, a` line-height | css 998–1001 | 1.6 → 1.55 |
| Language switcher | | UI 15/500/1.2 (current 600) |
| `.menu-label` weight | | 400 → 500 |
| Inputs | css 918–930 | `font-weight: 400; line-height: 1.65` |
| Stacked wordmark | css 1323 | Reference the new `--text-wordmark-stacked` variable |

Then expose every YAML token as a CSS custom property, and delete any literal value that duplicates one.

**P2-2 · Hit areas**

Target:
- `.brand { min-height: 44px }`.
- Footer e-mail: 44px (P0-2).
- Breadcrumb links below 1080px: `display: inline-flex; min-height: 44px; align-items: center` (keep the visual size).
- Footer links: 44px below 1080px (P0-3).

**P2-3 · ZH cards: no ellipsis**

Where: css 618–626 (line clamp); `data/home.json` zh services.

Target: remove `-webkit-line-clamp`. For ZH, render the **first sentence** of each source description (split at `。`). Never truncate source copy.

**P2-4 · Downloads order and duplicates (instruments, references)**

Where: `data/downloads.ts`; page 83–102.

Target:
- Add `kind` (`form` | `pricelist` | `certificate` | `leaflet` | `other`) and sort by it: order forms first.
- Split bilingual titles into `title` / `titleEn`:
  - "Osvedčenie / Certificate · SK.145.031" → `title` "Osvedčenie · SK.145.031", `titleEn` "Certificate · SK.145.031";
  - "Oprávnenie / Accreditations" → "Oprávnenie" / "Accreditations".
- On instruments, drop the e-mail row: the prose links the same address, and the footer top row shows it.
- On references, drop the "Our main list of references" row only if the prose "here" link points to the same URL (it does). Keep the presentation row, because the prose names it without a link. EN references: the "Testing Service · 行业案例" row stays, with meta `PDF · 中文`.

**P2-5 · Source typography pass (content files, no rewording)**

Target:
- `content/pages/en/references.md`: "sectors—helping" → "sectors – helping".
- Capabilities in `data/home.json`: SK items start lowercase except two, so capitalise the first letter of every item. EN: use sentence case for all items ("Inspection – certification – permit", "Certificates – licences – documents").
- `content/pages/sk/instruments.md`: "skúšky avionických systémov sú povinné" → "Skúšky avionických systémov sú povinné." The duplicate of the lead ("Prileťte na „STK“ avioniky Vášho…") stays (owner decision, §7).
- `sk/aviation.md`: "TESTING SERVICE s.r.o. divízia AVIATION" → "Testing Service s.r.o., divízia Aviation". This is a case normalisation of a brand name, allowed by the Source Typography Rule.

**P2-6 · Gallery cells**

Where: `data/gallery.json`; page 529–560.

Wrong: `TESTING_CENTER-25` renders 250 × 167, centred in a 310px cell, inside the expanded gallery.

Target:
- Exclude any source under 2× the cell width (620px) from the grid, or show it in an "ostatné" row at its own size, outside the grid.
- The home teaser photo (`TESTING_CENTER-21`) must not also appear as the 4th featured gallery photo on the aviation index. Swap the gallery's featured image for another ≥ 620px source.

**P2-7 · Contact header CTA state**

Where: css 404–408, 1074.

Target: `.header-cta[aria-current="page"] { box-shadow: none }`. The secondary border alone marks the current state.

**P2-8 · CSS hygiene**

Target:
- Fold the overrides appended at css 1062–1110 into their component blocks.
- Merge the duplicate `.contact-layout` declarations (553, 893).
- Apply `margin-top: -1px` only where the previous sibling has a bottom hairline (article after hero, article after clients strip).

No visual change expected; screenshots must be pixel-identical apart from the other fixes.

**P2-9 · QA gate additions** (`scripts/qa-layout.mjs`)

Add assertions for:
- every section h2 x ∈ {64, teaser 843} at 1440;
- no two 1px rules within 48px in the same column;
- every `.list > li` in a stack has the same height at ≥640px;
- the hero last text → hairline = 64 ± 1px;
- no element whose text equals `t.cta` appears more than once outside the header and the menu;
- each footer column has ≤ 6 links, no duplicate hrefs;
- no text node starts with "·" on any line (check with `Range.getClientRects` on eyebrow spans);
- no computed line-height outside the token set;
- interactive elements outside prose ≥ 44px tall below 1080px.

Regenerate `docs/review/shots-v3/` with the same filenames plus `sk-service-640`, `sk-aviation-mobile-tabs` and `zh-home-1024`.

---

## 7. Owner decisions (content; do not invent)

These are flagged, not implemented, by the builder:

1. **Card descriptions** restate their titles (consulting, risk, inspections in `data/home.json`). The owner writes one sentence per service saying *which obligation and which devices* it covers. Until then the existing text stays.
2. **Order forms.** SK 2024 and EN 2019 versions: is the 2019 EN form still valid? If not, drop it.
3. **SK aviation h3s "Aviation Testing" / "Aviation Service"**: keep the English division names, or use Slovak?
4. **Duplicate sentence on instruments** (the lead repeated in the prose, with "vášho" / "Vášho").
5. **Phone number and a live form endpoint**: still absent, still not invented.
6. **Chinese UI labels**: native check of 有疑问？, 详情, 发送咨询, 航空 (unchanged from review 2, plus the new `ctaQuestion`).

---

## 8. Questions to consider

1. The North Star is "The Inspection Report", yet the margin column carries only "Obsah". Should service pages show report fields there (Jurisdiction: CZ · SK; Regulation; Device categories), sourced from the page text?
2. Once the cards lose their photos, does the home page need the stock robot hero at all? Would a real photo from the source (aircraft, test equipment) or a pure-type ink hero be more honest?
3. Is Aviation a section or a micro-site? With tabs, its own accent and its own e-mail, it already behaves like one.

Questions skipped: the brief for this run is explicitly non-interactive ("Do NOT ask questions"). The owner decisions above stand in for them.
