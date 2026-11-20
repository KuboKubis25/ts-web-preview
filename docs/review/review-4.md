# Design review 4: v3 critique and audit

Reviewer run 2026-11-20 against `docs/review/shots-v3/` (all 30 captures: 1440, 1080, 1024, 640 and 390, plus the dropdown, menu and tab states), `src/` at commit `5a1f1a5`, and a local `npm run build`.

**Method.** dual-agent. The two assessments were run isolated from each other:
- **A:** a design-director review of every screenshot against DESIGN.md;
- **B:** the `impeccable detect` scan of `src/` plus 7 served URLs at 1440 and 390, a Playwright measurement pass and a code audit.

The parent reviewer read all the screenshots independently and synthesised the result.

**Contract.** `DESIGN.md` was updated in this round ("Changes in round 4"). Where this review and DESIGN.md disagree, DESIGN.md wins. `PRODUCT.md` gained one undecided item, the Slick series conflict.

---

## 1. Verdict

v3 is the first version that looks like **one system**:
- every home section starts at x = 64;
- one list row, 57px, used everywhere;
- one lang-tag;
- one closing, in the footer;
- numbered report-entry cards;
- a footer with four balanced columns.

Round 3 landed almost completely and nothing regressed. The owner's "lots of design inconsistencies" is now mostly answered on the home page and the service pages.

What still reads as unfinished is the **reading experience of long pages**, which is where this audience spends its time:
- On 10 of 17 article pages (every aviation page, risk, maintenance, SK instruments, EN consulting, SK legal, EN/ZH references), cols 1–4 (64–485px at 1440) are empty for the full scroll.
- The prose sits in a 608px column beside them.
- On the Aviation index the text fills about 46% of the container for ~1,100px, and it opens with sentence fragments that have no full stops.

The cause is mechanical: `src/pages/[...path].astro:48` and `:419` render the contents nav only when a page has ≥2 **h2**s, and most pages have one h2.

The fix is a system change, now in DESIGN.md: the **report rail**. Margin cols 1–3 carry a sticky rail on every article:
- an optional facts block;
- contents built from h2 + h3 + the ending blocks.

The related list moves into the article grid so it no longer competes for the margin, and the measure goes to 40rem so the prose ends exactly on col 10. This keeps the Column-Five Rule intact and makes the margin do what an inspection dossier's margin does.

Remaining work beyond that is content hygiene, mostly in aviation, plus a handful of precise alignment details. One measured technical defect: **CLS ≈ 0.20** on EN/ZH home at 390px.

---

## 2. Scores

### Critique: Nielsen heuristics (Persuade/Read surface; 7 and 10 n/a)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | Tabs, nav, contents and the contact CTA state are clear. At 390 the aviation sub-page tab row hides the overview tab to the left with no cue. |
| 2 | Match system / real world | 3 | Same things, different names: "Aviation Testing" = "Skúšky avionických systémov", "Aviation Service" = "Technická údržba". Slick 4600 vs 4300 conflict. |
| 3 | User control and freedom | 3 | No traps; cross-language links are tagged consistently. |
| 4 | Consistency and standards | 3 | Big improvement. The article margin is filled on only 7 of 17 article pages; nested list spacing drifts; the footer closing column has a moving left edge. |
| 5 | Error prevention | 2 | The form only opens a mail client (an owner decision, unchanged). |
| 6 | Recognition rather than recall | 3 | The aviation index's "Naše služby" names its two sub-pages without linking to them. |
| 7 | Flexibility and efficiency | n/a | Marketing surface. |
| 8 | Aesthetic and minimalist design | 3 | The repeated CTAs are gone. The aviation index lists the EASA regulation numbers three times (prose bullet, nested list, two link rows). |
| 9 | Error recovery | 2 | No success or fallback state after "Otvoriť e-mail". |
| 10 | Help and documentation | n/a | Marketing surface. |
| | **Total** | **22/32 (69%)** | **Good, low end.** v1 20/32 → v2 21/32 → v3 22/32. |

**Cognitive load: 3 of 8 checks fail** (moderate).
- **Chunking:** the aviation index runs ~1,100px of fragments before its first h2.
- **Visual hierarchy:** the aviation article's first line is a meta fragment set as body text.
- **Consistency:** article pages with and without a margin.

**Emotional journey.**
- **Peaks:** the home claim with the gold full stop; the real Žilina gallery; the footer closing.
- **Valley:** the first scroll of the aviation index, which is the page aircraft owners land on.

### Audit: technical

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 3 | axe is clean across 46 runs. Headings are 1×h1 with no skips; ARIA is correct on the menu, dropdown and form. Minor: an empty-alt aerial group sits under a labelled `role="group"`. |
| 2 | Performance | 3 | 32KB CSS, 75KB fonts, LCP < 110ms locally. **CLS ≈ 0.20 on `/en/` and `/zh/` at 390** (font swap rewraps the hero eyebrow). |
| 3 | Theming | 4 | Fully tokenised. The only literals are a mask stop (`global.css:1580`) and the `theme-color` meta (`Layout.astro:78`). |
| 4 | Responsive | 4 | No overflow at any width. Spans only at ≥1080; breakpoints 640/1080 plus container queries 540/1120. |
| 5 | Implementation integrity | 4 | Build, `check:links` and `check:layout` (23 routes × 5 widths) pass. No ID selectors, no off-scale values. |
| | **Total** | **18/20** | **Excellent** (v2 15/20). |

**Detector.**
- **`src/`:** exit 0, with one advisory: `design-system-color` for `#000` at `global.css:1580`. This is a **false positive**: it is the alpha stop of the tab-row mask.
- **URL scans:**
  - `hero-eyebrow-chip` on the SK/ZH home at 1440. Allowed: it is DESIGN eyebrow #1.
  - `kicker-above-heading` on the contact page's "Čoskoro / Praha". Allowed: eyebrow #3.
- No actionable detector findings.

---

## 3. Fixed since review 3 (confirmed in the screenshots)

**Page ending and footer**
- One closing (footer top row). No in-article strip, no repeated CTA on one screen.
- Footer: four balanced columns, ≤6 items each, every link once, the accent swapped to aviation blue on aviation pages.

**Grid and home sections**
- Every home section heading starts at x = 64.
- The intro is a 7/5 statement split.
- The capabilities grid fills row by row at 3/2/1.

**Cards, lists and tags**
- Photo-free numbered cards at 4/2/1, with the subgrid aligning the description rows.
- List meta is inline at ≥640 and under the title at 390. Rows are 57px everywhere.
- One lang-tag style, including on dark and inside buttons.

**Heroes, navigation and mobile**
- Interior heroes and the teaser have no eyebrow; the teaser is top-aligned.
- Mobile menu: "Služby" Label row, a rule under the last service, no "Všetky služby" row. The dropdown is flush with → on its first row.
- The aviation tabs scroll at 390 with a right-edge fade. The hero eyebrow never starts a line with "·".

**Contact and content**
- Contact: the details H3 aligns with the form H3 (y ≈ 454 at 1440). The header CTA is secondary with no underline on the contact page.
- The nested regulation list is restored. ZH cards show complete first sentences. Gallery cells are uniform. The teaser photo is not repeated in the gallery.

## 4. Regressed / still drifting

- **No regressions.**
- **One side effect:** scrolling the current aviation tab into view at 390 now hides "Testing Service Aviation" to the left with no cue.
- **Still drifting:**
  - the empty article margin (P0-1);
  - aviation source typography (P1-3);
  - thin ZH sections (P2-4);
  - card descriptions that restate titles (owner, carried over);
  - aviation naming (owner, carried over).

---

## 5. Fix list

Every item names the file, the defect and the exact target. Pixel positions are at 1440 unless stated. Container 1312px, 12 columns, 24px gap → column width 87.33px. Column n starts at x = 64 + (n − 1) × 111.33: col 1 = 64, col 4 = 398, col 5 = 509, col 8 = 843, col 10 end = 1153, col 12 end = 1376.

### P0: blocks "genuinely neat"

#### P0-1 Article reading layout: the report rail (DESIGN.md › Article)
**Where:**
- `src/pages/[...path].astro` (lines ~48, ~417–455: `headings`, `<aside>`, `.related` section);
- `src/styles/global.css` (~918–1010 article/contents/prose/related; ~1300–1315 spans; ~1481 aside hidden);
- `src/layouts/Layout.astro` (~351 scroll-spy).

**Wrong:**
- The contents nav requires ≥2 h2s, so 10 of 17 article pages show an empty 421px margin for the whole page (`sk-aviation-desktop`, `sk-aviation-testing-desktop`, `en-references-desktop`).
- Related lives in a separate `.related` section with a margin Label ("Ďalšie služby"), while downloads/partners are H3 blocks in the content column. These are two patterns for one ending.

**Target:**
1. **One grid.** `.article-layout` contains `<aside class="rail">` (cols 1–3) and one content `<div>` (cols 5–12). The content div holds `.prose`, then `#downloads`, `#partners` (aviation index), and `#related` (industry pages).
   - Delete the standalone `<section class="wrap related grid">`.
   - Related becomes `<section class="related-block" id="related"><h2 class="type-h3">{t.related}</h2><LinkList …/></section>`, the same markup as `.downloads`.
   - Remove `.related > .eyebrow { padding-top: 20px }` and the `.article-layout:has(+ .related)` rule.
2. **Ending-block spacing.** `.downloads, .partners, .related-block { margin-top: 64px }` (`--space-8`). Article padding: `calc(var(--section-y) / 2)` top, `var(--section-y)` bottom.
3. **Measure.** `--measure: 40rem` (640px). The prose now ends at x ≈ 1149, matching col 10's end at 1153. Lists stay cols 5–12 (to 1376).
4. **Rail entries.** Build them from `content.headings` with depth 2 **and** 3, then append the ending blocks that render: `{ slug: "downloads", text: t.downloadsLinks }`, `{ slug: "partners", text: <the partners heading string now inlined at `[...path].astro` ~437; move it to a new `ui.ts` key `partners`> }`, `{ slug: "related", text: t.related }`.
   - Show the contents when entries ≥ 2. Drop the `h.text.length <= 80` gate.
   - Instead, an entry is one line with `white-space: nowrap; overflow: hidden; text-overflow: ellipsis`, with `title={h.text}`.
   - The ellipsis is allowed in the rail only; it is navigation, not source copy.
5. **Rail CSS.**
   - `.rail { position: sticky; top: 96px; align-self: start; max-height: calc(100dvh - 120px); overflow-y: auto; padding-top: 6px }`. The 6px aligns the Label baseline with the first 17/1.65 prose line; verify with the existing baseline check.
   - Label `t.toc` → 16px → entries.
   - Entry: Small 14/1.55, `color: var(--color-muted)`, `padding: 8px 0 8px 12px`, `border-left: 1px solid var(--color-line)`, no gap between entries (the rule reads as one continuous line).
   - h3 entries: `padding-left: 24px`.
   - Hover: `color: var(--color-ink)`.
   - Current (`aria-current="location"`): `color: var(--color-ink); box-shadow: inset 2px 0 var(--accent)`. **Not** accent-coloured text, which replaces the current `.contents a[aria-current] { color: var(--accent) }`.
6. **Scroll-spy** (`Layout.astro` ~351): include the h3 and ending-block targets. The current entry is the last target whose top is ≤ `rail-top + 24px`.
7. **Below 1080px.** The contents stay hidden (unchanged), and the rail's facts block, if any, renders as in P1-1.

**Result per page at 1440:**

| Page | Entries |
|---|---|
| SK aviation | Naše služby · Aviation Testing · Aviation Service · Na stiahnutie a odkazy · Naši partneri |
| SK instruments | Aviation Testing Center · Pre pilotov: organizácia pri prílete · Na stiahnutie a odkazy |
| Permits | 2 h2 + 2 h3 + Ďalšie služby |

EN/ZH references keep no rail (1 entry). That short page is the only allowed empty margin.

**QA:**
- Extend `check:layout`: on every article page at 1440, `.rail` exists unless the entry count < 2.
- The rail's left edge is x = 64 and the prose's left edge is x = 509.
- The prose's right edge is ≤ 1153.
- No `.related` section exists outside `.article-layout`.

### P1: visible inconsistency or a broken promise

#### P1-1 Facts block at the top of the rail (optional, source-verbatim)
**Where:**
- `src/content.config.ts` (add an optional `facts: z.array(z.object({ label: z.string(), value: z.string() })).max(4).optional()`);
- frontmatter of the pages below;
- `[...path].astro` rail;
- `src/data/ui.ts` (new key `facts`: SK "Údaje", EN "Key facts", ZH "要点").

**Target:**
- **Desktop.** `<dl class="facts">` above the contents. Label `t.facts` → 16px → rows. Each row: `dt` Label (12/600/+0.12em, muted) → 4px → `dd` Small 14/1.55 ink. 12px block padding, 1px `line` between rows and below the last. 48px between the facts and the "Obsah" Label.
- **Below 1080px.** Render the same `dl` between the hero hairline and the prose: 2 columns at 640–1079 (24px gap), 1 column below 640, 32px below it. Implement it as a second render of the same data outside the aside, shown only below 1080, so it doesn't fight the sticky aside.
- **Values must be copied from that page's own source file. Nothing summarised, no counts.** Verified candidates (SK; mirror them in EN from the EN source):

| Page | Facts |
|---|---|
| `sk/permits.md` | `Predpis` → `vyhláška MPSVaR SR č. 508/2009 Z. z.`; `Zariadenia` → `VTZ – A, B, C` |
| `sk/aviation.md` | `Predpisy` → `EASA No 2018/1139 · No 1321/2014`; `Osvedčenie` → `SK.145.031` (the certificate title in `downloads.ts`) |
| `sk/instruments.md` | `Miesto` → `Žilina (LZZI)`; `Objednávka` → `info.aviation@testing-service.org` (in the prose; plain text, **not** a second mailto link) |
| `sk/maintenance.md` | `Magnetá` → `Bendix King S20/S200 · Slick 4300/6300`. Only after the owner resolves the Slick conflict (P1-4); until then omit this page's facts. |

- Pages without verified facts (risk, consulting, inspections, legal) get **no** facts block. Do not invent one.

#### P1-2 Aviation breadcrumb is a lone "Úvod"
**Where:** `[...path].astro` ~303 (breadcrumb), visible in `sk-aviation-desktop` and `sk-aviation-mobile` (y ≈ 105: just "Úvod").

**Target:** all three aviation pages show `Úvod / Aviation`.
- On the index, "Aviation" is the current item: ink, `aria-current="page"`.
- On the sub-pages it is a link to the index.

A breadcrumb is never "Úvod" alone (DESIGN › Page hero).

#### P1-3 Aviation source typography and structure
**Where:** `src/content/pages/sk/aviation.md` and `en/aviation.md` (plus `instruments.md` and `permits.md` for the unit fixes).

**Target:**
- **Full stops on the fragment paragraphs** (Source Typography Rule; the words are unchanged):
  - "Testing Service s.r.o., divízia Aviation."
  - "…správne pracujúci avionický systém."
  - "…v lietadlách povinné."
  - "…zachovanie letovej spôsobilosti."
  - Do the same in EN.
- **Units and lists:**
  - instruments: "230 V k dispozícii (max. 50 m od meracieho priestoru)", with a non-breaking space between number and unit;
  - permits: "VTZ – A, B, C";
  - permits: "(revízie / úradné skúšky sk. A)". Drop the stray "." and balance the parentheses; the words are unchanged.
- **"Naše služby" on the aviation index.** After each H3 block ("Aviation Testing", "Aviation Service"), add a standalone text link `t.more` → ("Podrobnosti →"), with a 44px hit area and 16px above it, linking to `instruments` and `maintenance` respectively. Keep the H3 text as in the source.
- **Regulation repetition.**
  - Turn the nested items "No 2018/1139" and "No 1321/2014" under "Odkazy na predpisy:" into inline links, using the same URLs as the two EASA rows in `downloads.ts`.
  - Then drop those two EASA rows from the aviation downloads list. DESIGN › Lists: "a row that only repeats an inline link in the prose above it is omitted."
  - The "No 216/2008 · ucl.cz" row stays unless the same treatment applies to its prose bullet; apply it there too.

#### P1-4 Slick 4600/6300 vs 4300/6300 (owner)
- **Where:** `sk/aviation.md:43`, `src/data/home.json:27` (4600) vs `sk/maintenance.md:15,19` and `en/maintenance.md:15` (4300). Both values exist in `_source`.
- **Target:** don't pick one. Leave the copy as it is, and list it in the implementation notes as an owner question (PRODUCT.md › Undecided). Once it's answered, all four places use the one value.

#### P1-5 Layout shift on EN/ZH home at 390 (CLS ≈ 0.20)
**Where:** `src/layouts/Layout.astro` (head) and the `@font-face` in `global.css`.

**Target:**
- `<link rel="preload" href="<Latin woff2 subset url>" as="font" type="font/woff2" crossorigin>`.
- Add a fallback face: `@font-face { font-family: "Plex Fallback"; src: local("Arial"); size-adjust: 100.6%; ascent-override: 102.5%; descent-override: 27.5%; line-gap-override: 0% }`. Tune the values until the hero eyebrow wraps identically before and after the swap. Put `"Plex Fallback"` second in every font stack.
- **QA:** CLS < 0.05 on every route at 390 (add it to `check:layout`).

#### P1-6 Aviation tabs hide the overview tab at 390
**Where:** the `.section-nav` CSS (~1580) and the tab script in `Layout.astro`.

**Target:** a fade on both edges, per the new DESIGN rule.
- `.fade-end` (more to the right): `mask-image: linear-gradient(to right, #000 calc(100% - 32px), transparent)`.
- `.fade-start` (more to the left): `linear-gradient(to right, transparent, #000 32px)`.
- Both: `linear-gradient(to right, transparent, #000 32px, #000 calc(100% - 32px), transparent)`.
- Toggle the classes on `scroll` (passive) and on load.

### P2: neatness and rhythm

#### P2-1 Footer closing column: one left edge
- **Where:** footer top row in `Layout.astro` and the footer CSS. The e-mail starts at x ≈ 1066 on industry pages and ≈ 1058 on aviation pages, because it is right-aligned and the two addresses differ in length.
- **Target:**
  - The cols 8–12 block is **left-aligned at x = 843** (col 8). That is the same edge as the home intro paragraph and the aviation teaser copy.
  - The e-mail's first baseline aligns with the h2's first baseline: offset the e-mail with `padding-top = (h2 line box − lead line box) / 2` at the current size (h2 40/46 vs lead 20/31 at 1440 → 7.5px). Use a calc on the tokens, not a literal.
  - Then 16px, then the button. Below 1080, unchanged (left at the gutter).

#### P2-2 Nested prose list rhythm
- **Where:** `global.css` ~976, `.prose :is(ul, ol) { margin-block: var(--space-4) }`, which also hits nested lists. Visible on the aviation index (y 1218–1338: 43–44px gaps around the nested list against a 32px item rhythm).
- **Target:** `.prose li > :is(ul, ol) { margin-block: var(--space-1) 0 }`.

#### P2-3 Capabilities grid baselines
- **Where:** home `.packages` capabilities grid (`sk-home-desktop`, y ≈ 935–1150). Single-line items are vertically centred beside two-line items, so first lines in a row don't share a baseline.
- **Target:** `align-items: start` on the grid and on each cell. Keep the 16px top padding, so every first line sits 16px below the row's top hairline.

#### P2-4 ZH home: thin packages section and mid-phrase breaks
**Where:** `src/data/home.json` (ZH) and the packages section in `[...path].astro`.

**Wrong:**
- The ZH packages section is h2 + lead + one closed disclosure row: ~300px of band carrying one row.
- The intro statement breaks inside words ("精品法/律", "满/足").

**Target:**
- When a language has no capabilities list, render the packages `<details>` **open** by default (`open` attribute; summary unchanged), so the section shows its content.
- Under `:lang(zh)`, apply `word-break: keep-all; overflow-wrap: anywhere` (already DESIGN's CJK heading rule) to `.statement` and the intro paragraph too. Insert `<wbr>` at phrase boundaries in the two ZH intro strings, a data-only change with the words unchanged.

#### P2-5 Stacked photo height on tablets
- **Where:** page-hero, home-hero and teaser photo CSS below 1080 (`sk-aviation-testing-1024`: a ~500px-tall photo before any content).
- **Target:** `max-height: min(50svh, 400px)` (currently `50svh`), `object-fit: cover`, for all three. Update the hero photo checks in `check:layout`.

#### P2-6 Partners image off the column edge
- **Where:** `_source` partners PNG used in `[...path].astro` (`#partners`). The visible logos start at x ≈ 515, 6px right of col 5 (509), because of transparent padding.
- **Target:** trim the transparent margin in a derived asset (don't recolour or redraw the logos), so the first logo's ink starts at 509.

#### P2-7 Rail/prose start alignment after the hero hairline
- **Where:** article top.
- **Target:** the first prose line and the rail Label both start `section-y / 2` below the hero hairline. Today the prose's first paragraph is at y ≈ 720 on aviation (hairline 654) and the contents Label at y ≈ 646 on permits (hairline 585). Make both measure 64px ± 2 at 1440 from the hairline to the top of the first line box, and add the check.

#### P2-8 Aerial photos: empty labelled group
- **Where:** `[...path].astro:495`. 38 `alt=""` images inside `role="group" aria-label={t.aerials}`, so screen readers announce an empty group.
- **Target:** keep `alt=""` (they are decorative duplicates) but drop `role="group"`/`aria-label` from the wrapper. The visible `<h3>{t.aerials}</h3>` already labels the block.

#### P2-9 `theme-color` literal
- **Where:** `Layout.astro:78`.
- **Target:** import the ink value from the same token source as the CSS (or a shared constant), so a token change can't leave it stale.

### Owner decisions (carried over; not for the coding agent)
1. Slick series 4600 vs 4300 (P1-4).
2. Aviation naming: "Aviation Testing / Aviation Service" (source H3s) vs the page titles "Skúšky avionických systémov / Technická údržba", and "Aviation Testing Center" used for both the gallery and the instruments h2.
3. Card descriptions that restate titles ("Poradenské služby – technické štandardy a legislatíva", "Inšpekcie, testovanie, certifikácie.").
4. A phone number and a real form endpoint (with a success state).
5. The ZH hero eyebrow and footer tagline are English ("INSPECTION · CERTIFICATION · PERMIT"), and the ZH footer shows Latin-script labels. Native ZH editorial review.
6. A generic EN references lead ("Trusted by industry leaders.").

---

## 6. Order of work and acceptance

1. P0-1 (rail, related move, measure) → re-shoot `sk-aviation-desktop`, `sk-aviation-testing-desktop`, `sk-service-desktop` and `en-references-desktop`.
2. P1-1 to P1-6.
3. P2-1 to P2-9.
4. `npm run build` (includes `check:layout`) and `npm run check:links` pass.
5. New checks:
   - rail presence and edges (P0-1);
   - the CLS budget (P1-5);
   - the double-edge tab fade (P1-6);
   - the footer closing left edge = col 8 (P2-1);
   - the 400px stacked-photo cap (P2-5);
   - hairline-to-first-line = 64px (P2-7).
6. Screenshots to `docs/review/shots-v4/` with the same filenames as v3, plus `sk-risk-desktop.jpg` and `sk-maintenance-desktop.jpg` (long single-h2 pages), and `sk-aviation-testing-mobile-tabs.jpg` (scrolled tab row).
