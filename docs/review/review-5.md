# Design review 5: v4 critique and audit

Reviewer run 2026-11-20 against `docs/review/shots-v4/` (all 36 captures: 1440, 1080, 1024, 640 and 390, plus the dropdown, menu and tab states), `src/` at commit `4f5a55f`, and a local `npm run build`.

**Method.** dual-agent. The two assessments were run isolated from each other:
- **A:** a design-director review of every screenshot against DESIGN.md, compared with v3 where useful;
- **B:** the `impeccable detect` scan of `src/`, URL scans of 7 routes at 1440 and 390, a Playwright measurement pass, `npm run build` and `npm run check:links`.

The parent reviewer read every screenshot independently, checked the claims against `src/` and `_source/pages`, and synthesised the result.

**Contract.** `DESIGN.md` was refined this round (see "Changes in round 5" in it). Where this review and DESIGN.md disagree, DESIGN.md wins. `PRODUCT.md` gained four undecided owner items.

---

## 1. Verdict

v4 fixed what review 4 asked for. The **layout system is now finished and measurably correct**:
- the report rail is on every service and aviation article;
- the reading column ends at col 10, and the ending blocks run cols 5–12, 64px apart;
- the footer closing starts at col 8 in both divisions;
- there is no overflow at any width, and CLS is 0 at 390;
- 31 distinct type combinations are rendered, and all of them are tokens.

The owner's "lots of design inconsistencies" no longer comes from layout. It comes from **content typography and repeated content**, which a careful reader (an EHS officer, a pilot) sees on the first screen:
- **ZH home repeats itself.** The round-4 "open the disclosure when there are no capabilities" change shows the packages section's h2 and lead twice, then a ~1,400px block of prose (`zh-home-desktop` y ≈ 1990–3640).
- **The new facts block set the same fact in two typographies on one screen.** Permits shows "VTZ - A,B,C" in the rail beside "VTZ – A, B, C" in the prose. Instruments shows "Žiliny (LZZI)", a genitive that is wrong as a stand-alone value. The aviation index labels two rows "EASA" and "EASA".
- **Real source headings are rendered as paragraphs.** On permits, "Inštalácia vyhradených technických zariadení…" is a sibling of two h3s but is set as body text. On risk, ~1,470px of prose runs before the first heading, and the rail lists only 3 entries.
- **Slovak typesetting details a native reader notices:**
  - one-letter words at line ends ("spoločnosť s", "bola v");
  - "výchovno – vzdelávacie" (a compound broken by a dash);
  - “English quotes” beside „Slovak“ ones;
  - "a /alebo";
  - "4300/6300 : 236 €";
  - a heading ending in ":".
- **Small behavioural lies.** The rail marks its first entry as current before the reader gets there. The mobile tab fade washes out the current tab's first letter.

None of this needs new design. It needs the system's own rules applied to content, so DESIGN.md now spells those rules out: facts, the Heading Restoration Rule, Slovak binding, and home packages as one pattern.

---

## 2. Scores

### Critique: Nielsen heuristics (Persuade/Read surface; 7 and 10 n/a)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | The rail marks an entry current before it is reached (`Layout.astro:367`, `let active = 0`). At 390 the tab fade covers the current tab's first letter. |
| 2 | Match system / real world | 3 | Fact values read as errors ("Žiliny (LZZI)", "VTZ - A,B,C", EN "Decree (SK)508-2009"). The AIP link is from 2018. Slick 4600/4300 is still open (owner). |
| 3 | User control and freedom | 3 | No traps. The ZH packages disclosure is open on load, so its "−" mostly hides content the reader never asked for. |
| 4 | Consistency and standards | 3 | Layout consistency is now very high. New drift is in content: two typographies of one fact, headings demoted on some pages only, list case varying within one page, mobile-menu rows at 57 and 52px, uneven capabilities padding at 640/390. |
| 5 | Error prevention | 2 | The form only opens a mail client (owner, unchanged). |
| 6 | Recognition rather than recall | 3 | The rail helps a lot, but the risk page's rail has 3 entries for ~2,600px of text because its source headings were dropped. |
| 7 | Flexibility and efficiency | n/a | Marketing surface. |
| 8 | Aesthetic and minimalist design | 3 | ZH repeats its h2 and lead. The aviation index shows the EASA numbers three times (facts, bullet, nested links). The instruments e-mail appears in the fact and in the prose beside it. |
| 9 | Error recovery | 2 | No success or fallback state after "Otvoriť e-mail" (owner). |
| 10 | Help and documentation | n/a | Marketing surface. |
| | **Total** | **22/32 (69%)** | **Good, low end; flat against v3.** v1 20 → v2 21 → v3 22 → v4 22. The structural gains (rail, column-five, footer edge) were offset by new content-level drift. The P0/P1 list below is what moves 1, 2, 4 and 8 to 4. |

**Cognitive load: 3 of 8 checks fail (moderate).**
- **Chunking:** risk runs ~1,470px before its first heading; EN home has a flat list of 11 capabilities.
- **Progressive disclosure:** ZH packages are open by default and run ~1,400px.
- **Visual hierarchy:** the ZH packages section reads h2 → lead → summary → the same lead → the same heading.

**Emotional journey.**
- **Peaks:** the home claim with the gold full stop; the permits first screen (rail + facts + measured prose); the real Žilina gallery; the identical footer closing (a strong end).
- **Valleys:**
  - the ZH packages déjà vu, which a Chinese procurement lead meets on their only real content page;
  - the first fact a pilot reads on instruments ("Žiliny (LZZI)");
  - the risk page's wall of text.

### Audit: technical

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 3 | axe: 0 failures in 46 runs; focus, menu and dropdown keyboard handling are correct. Gaps: two consecutive h2 "雇主 / 运营商套餐" in the ZH outline; the contact details use h2 for the company but h3 for Aviation; the privacy link is 18px tall with no 44px hit area. |
| 2 | Performance | 4 | 143–401 KB per page, one 34 KB stylesheet, font preloaded, CLS 0.0000 at 390 on every route (was ≈ 0.20 on EN/ZH home in v3), LCP 60–136 ms locally. |
| 3 | Theming | 4 | Fully tokenised. The only literal is `#000` in the tab mask stops, which DESIGN specifies. One wrong token name: `.dropdown-intro` uses `--leading-h3` (`global.css:606`). |
| 4 | Responsive | 4 | No overflow at any width. Spans only at ≥1080. Minor: at 1080 the footer `info.aviation@…` ↗ icon ends at x ≈ 1028, past the container's right edge (1026), and contact e-mail rows break inside the domain. |
| 5 | Implementation integrity | 3 | Build, `check:layout` (23 routes × 5 widths) and `check:links` (1,613 URLs) pass. The measured layout matches the contract. Content repeats itself (ZH packages, ZH "all services" = "我们的服务"), facts break the Source Typography Rule, and mobile-menu rows mix 57 and 52px (`global.css:598` vs `:1547`). |
| | **Total** | **18/20** | **Excellent** (same total as v3, with a different distribution: performance up, integrity down). |

**Detector.**
- **`src/`:** exit 2 with 4 findings, all false positives:
  - `design-system-font` ×2 for the `Plex Fallback` faces at `global.css:2,10` (DESIGN requires them);
  - `design-system-color` ×2 for the `#000` mask stops at `global.css:1660–1666` (DESIGN specifies them).
- **URL scans:**
  - `hero-eyebrow-chip` on the SK/ZH home at 1440 is allowed (DESIGN eyebrow #1);
  - `kicker-above-heading` on the contact page's "Čoskoro / Praha" is allowed (eyebrow #3).
  - Every other route is clean.
- **No actionable detector findings.** The detector cannot see repeated or unnormalised content, which is where this round's problems are.

---

## 3. Fixed since review 4 (confirmed in the screenshots and by measurement)

**Reading layout**
- **The rail:** a sticky rail at x = 64 / top 96 on every service and aviation article. It aligns to the baseline of the first prose line, and its active state is an ink text plus accent rule.
- **The reading column:** prose at x = 509 ending at col 10, and related services as an H3 + list inside the article grid. Ending blocks are 64.0px apart.
- **Facts:** the facts block renders on desktop, in 2 columns at 640–1079 and in 1 column at 390, with 32px below it.

**Aviation**
- The breadcrumb reads `Úvod / Aviation` on all three aviation pages.
- Fragments end with full stops. "230 V" and "max. 50 m" are spaced; "VTZ – A, B, C" and the balanced parentheses are fixed in the prose.
- "Podrobnosti →" follows both aviation-index service blocks.
- The duplicate EASA download rows are gone.

**System details**
- The footer closing is left-aligned at x = 843 in both divisions, with baseline alignment.
- Nested lists sit 4px / 0 from their parent item.
- Capabilities are top-aligned.
- Stacked photos are capped at `min(50svh, 400px)` (1024: 922 × 400).
- Tabs fade on both edges.
- CLS is 0 (font preload plus metric fallback).
- The aerial group semantics are fixed, and `theme-color` comes from the token.

## 4. Regressed / still drifting

**Regressions (side effects of round-4 changes):**
1. The ZH packages section duplicates its h2 and lead and opens ~1,400px of prose (from round-4 P2-4). → P0-1
2. Facts are copied byte-for-byte from the source: two typographies of one fact, a genitive value, duplicate labels, a repeated e-mail. → P0-2
3. The rail's default "current" state is wrong. → P1-2
4. The capabilities `grid-auto-rows: 1fr` (kept while adding top alignment) pads every single-line row to the tallest item at 640/390. A partial last row leaves a half-width rule (EN 11 items). → P1-4
5. The tab scroll-into-view puts the current tab's first letter under the start fade at 390. → P1-7

**Still drifting:**
- Slovak typesetting (P1-3);
- demoted source headings (P1-1);
- list styles (P1-5);
- the owner items in §6.

---

## 5. Fix list

Pixel positions are at 1440 unless stated. Container 1312px, 12 columns, 24px gap → column width 87.33px. Column n starts at x = 64 + (n − 1) × 111.33: col 1 = 64, col 5 = 509, col 8 = 843, col 10 ends at 1153, col 12 ends at 1376.

**Builder count: P0 = 2, P1 = 8, P2 = 7** (P2-1 to P2-7). Items tagged (owner) are listed again in §6 and are **not** in that count.

### P0: blocks "genuinely neat"

#### P0-1 Home packages: one pattern in every language, nothing said twice (DESIGN › Home packages)
**Where:**
- `src/pages/[...path].astro:242–262` (packages section);
- `src/data/ui.ts:136` (ZH `packages`) and `:140` (ZH `all`);
- `src/content/pages/{sk,en,zh}/home.md`.

**Wrong:**
- **ZH section opens twice.** `zh-home-desktop`: section h2 "雇主 / 运营商套餐" (y ≈ 1993) and lead (y ≈ 2052), then summary "套餐完整说明", then the same lead again (y ≈ 2205) and the same heading again (y ≈ 2295). The outline has two consecutive h2s with that text.
- **ZH teaser duplicate.** A plain paragraph "供应商套餐" (y ≈ 3176) sits directly above the heading "供应商套餐".
- **ZH section is too long.** The disclosure is `open` because ZH has no capabilities, giving a ~1,400px block of prose in cols 1–6 with nothing at right (mobile: ~2,500px).
- **SK/EN bodies have the same flaws behind a closed disclosure:**
  - a teaser label paragraph before each package heading ("Balík pre zamestnávateľa/prevádzkovateľa", "Supplier Package");
  - body `##` rendered as h2 under the section h2;
  - a heading ending in "." ("Služby pre dodávateľov technológie.").
- The ZH dropdown's first row "我们的服务" equals the nav label `services`.

**Target:**
1. **Always closed.** Remove `open={copy.capabilities.length === 0}`; the disclosure ships closed in every language.
2. **Rows for every language.** If `copy.capabilities` is empty, render the **package names** in the same `.list.capabilities` grid instead. Take them from the body's `##` headings in document order, read from `content.headings` with depth 2: on ZH "雇主 / 运营商套餐 · 红星计划 · 供应商套餐", one row of three at ≥1080, stacked at 390. Same markup and CSS as the SK capabilities; no links.
3. **No repeats in the body.** Use a rehype step applied to home only, or filter in the template:
   - drop a leading paragraph whose text equals `packageLead`;
   - drop a heading whose text equals `t.packages`;
   - drop a paragraph whose text equals the text of the heading immediately after it;
   - render body h2 as h3 (H3 token 22/500/1.3, CJK 600).
   - Strip a trailing "." from headings (Source Typography Rule).
4. **ZH UI strings** (UI labels, not source copy; list them for the native check as in round 4):
   - `packages`: "运营商与供应商服务" (the meaning of the SK/EN label "Services for operators & suppliers"), so it no longer equals a package name;
   - `all`: "全部服务".
5. **QA:**
   - no `.packages details[open]` on load;
   - on every home, no two consecutive headings with equal text;
   - the section h2 text is not equal to any capability/package row;
   - the `.packages` section is ≤ 900px tall at 1440 on all three homes.

#### P0-2 Facts block: source words, one typography, no repeats (DESIGN › Article › rail, facts)
**Where:** frontmatter `facts` in
- `src/content/pages/sk/permits.md:10–14`
- `en/permits.md:10–14`
- `sk/aviation.md:10–14`
- `en/aviation.md:10–14`
- `sk/instruments.md:10–14`
- `en/instruments.md:10–14`

Also `scripts/qa-layout.mjs` (its "exact substring" check must change to the new rule).

**Wrong:**
- `sk-service-desktop` x 64–374, y 650–808: "VTZ - A,B,C" beside the prose "VTZ – A, B, C" (y ≈ 1155), and "MPSVaR SR č. 508/2009 Z. z." without its noun.
- `sk-aviation-desktop` y 764–853 (and mobile): two rows both labelled "EASA".
- `sk-aviation-testing-desktop`:
  - "Miesto" → "Žiliny (LZZI)", a genitive (y 787);
  - "Objednávka" → `info.aviation@…`, which is also the second prose line at x 509, y 766.
- EN permits: "Decree (SK)508-2009", "restricted technical devices (RTDs)".

**Target values** (source words, typography normalised; the QA check becomes "every word token of the value occurs in the page's source file"):

| Page | Rows |
|---|---|
| SK permits | `Predpis` → "vyhláška MPSVaR SR č. 508/2009 Z. z."; `Zariadenia` → "VTZ – A, B, C" |
| EN permits | `Regulation` → "Decree (SK) 508/2009"; `Devices` → "Restricted technical devices (RTDs)" |
| SK/EN aviation | The two "EASA" rows merge into one (`EASA` → "No 2018/1139 · No 1321/2014"). One row is below the 2-row minimum, and the round-4 notes confirm "SK.145.031" is not in either aviation source file, so **remove `facts` from both aviation pages**. The numbers stay in the prose. |
| SK/EN instruments | The `Objednávka`/`Order` row repeats the second prose line, so it goes. The remaining row ("Žilina (LZZI)" / "Žilina (LZZI/ILZ)") is below the minimum, so **remove `facts` from both instruments pages** unless a second verbatim, non-repeating fact exists in that page's source. Don't invent one. |

Result: the facts block stays on the two permits pages only. That is the honest outcome of the rule; it is better than a block that reads as an error.

**QA:**
- No two rows in a block share a label.
- Every block has ≥2 rows or is absent.
- No fact value equals a string in the hero lead or in the first 3 prose blocks.

### P1: visible inconsistency or a broken promise

#### P1-1 Restore real source headings (DESIGN › Heading Restoration Rule)
**Where:** `src/content/pages/sk/permits.md:23`, `sk/risk.md` (whole file), the EN counterparts, and a check of every other article against its `_source/pages` file.

**Wrong:**
- **Permits.** "Inštalácia vyhradených technických zariadení – povolenie pre inštaláciu technických zariadení skupiny A." is a `###` in `_source/pages/povolenia-schvalenia.md:13`, a sibling of "Prvé uvedenie do prevádzky" and "Povolenie na prevádzku". It renders as body text at `sk-service-desktop` y ≈ 1027, so the rail skips it.
- **Risk.** `sk-risk-desktop` y 652–2122 has no heading. The source (`_source/pages/risk-atex-pawa-sk.md:11,15,26,30`) has short one-sentence headings there.

**Target:** apply the rule; words unchanged, terminal "." dropped, "?" kept.
- **Permits:** make that line `###` (h3), between the "Stavebné povolenie…" h2 and "Prvé uvedenie…".
- **Risk:**
  - "Dodržujete bezpečnostné štandardy a všetky právne predpisy Slovenskej / Českej republiky?" → h3;
  - "Uistite sa, že vaša bezpečnostná dokumentácia a potrebné súbory sú v poriadku" → h3;
  - "Predchádzajte potenciálnym nehodám vďaka rigoróznej a nestrannej bezpečnostnej analýze od tretej strany" → h3;
  - "Neexistuje ospravedlnenie pri zanedbaní bezpečnosti zamestnancov" → h2.
  - Keep the long source h2s (line 7, 150+ characters; line 24, two sentences) as paragraphs.
  - Shift levels so the first heading in the article is h2 and nothing skips a level.
  - Expected rail: 7–8 entries.
- **Other pages:** check EN risk, consulting, inspections and legal the same way and record the per-page heading diff in the implementation notes.

**QA:** for each article, headings that the rule keeps from `_source` appear as h2/h3 in the built HTML.

#### P1-2 Rail scroll-spy marks nothing until a target is reached
**Where:** `src/layouts/Layout.astro:366–378`.

**Wrong:**
- `let active = 0`: "Tri kľúčové kroky" is current at load on risk, while its heading is 1,470px below (`sk-risk-desktop` y 694).
- The same happens on permits and aviation.

**Target:**
- `let active = -1`.
- If `window.innerHeight + scrollY >= document.documentElement.scrollHeight - 2`, set `active = sections.length - 1`.
- `-1` removes `aria-current` from all entries.

**QA:** at scroll 0 on risk/permits/aviation, no `.contents a[aria-current]`; at the page bottom, the last entry is current.

#### P1-3 Slovak typesetting: one build-time transform (DESIGN › Wrap Rule, Source Typography Rule)
**Where:** a new `scripts/rehype-typography.mjs` registered in `astro.config.*` next to `remark-links.mjs`, plus the same helper applied to `home.json` and `ui.ts` strings at render time.

**Target:**
1. **One-letter words.** In `lang` sk/cs content, replace `/(^|[\s(„])([AaIiKkOoSsUuVvZz]) /g` → `$1$2 ` in text nodes, excluding `code`/`pre`/URLs.
   - Visible fixes: "spoločnosť s / dlhotrvajúcou" (`sk-home-desktop` y ≈ 1140, also at 1024/640/390), "bola v / súlade" (`sk-service-desktop` y ≈ 685), "efektivity a / minimalizovania".
2. **Dash binding.** Replace `/ – /g` → ` – ` (all Latin languages). Fixes the lines starting with "– povolenia" (`sk-home-1080` x 386, y ≈ 2436; `sk-home-640` y ≈ 2860) and "– povolenie pre inštaláciu" (`sk-service-mobile` y ≈ 1536).
3. **Content fixes (data, words unchanged):**
   - `src/data/home.json:21`: "výchovno – vzdelávacie" → "výchovno-vzdelávacie".
   - `src/content/pages/sk/risk.md:38`: “papieri od stola” → „papieri od stola“.
   - `sk/risk.md:54`: "a /alebo" → "a/alebo".
   - `sk/risk.md:23`: add ":" after "ako napríklad".
   - `src/content/pages/sk/maintenance.md:19`: "250 hod./500 hod./Revízia (kontrola) magnet Bendix King série S20/S200 a Slick série 4300/6300: 236 €*/ks." (series numbers unchanged; see owner item 1).
   - `sk/maintenance.md:12`: "## Naša špecializácia" (no colon; the rail entry follows).
   - `sk/permits.md` "Povolenie na prevádzku" paragraph: end "…(commissioning)." with a full stop.

**QA:** no text line in the built SK HTML at 390/1440 ends with a one-letter word or starts with "–" (check via Range rects on `.prose`, `.statement`, `.capabilities`, `.lead`).

#### P1-4 Capabilities grid: rows size to content; one closing rule
**Where:** `src/styles/global.css:826–847`.

**Wrong:**
- `grid-auto-rows: 1fr` plus `height: 100%` pads single-line rows to the tallest item on the page: ~45px of empty space under one-line items at 390 (`sk-home-mobile`, `en-home-mobile`) and 117px rows at 640.
- `.capabilities + .disclosure { border-top: 0 }` leaves a half-width final rule when the last row is partial (`en-home-desktop` x 955–1376, y ≈ 2449–2538; `sk-home-1024`).

**Target:**
- `.capabilities { grid-auto-rows: auto }`.
- Keep `height: 100%` on `li` (the row's items still share the row height, so the hairlines run straight).
- `.capabilities + .disclosure { border-top: 1px solid var(--color-line); margin-top: -1px }`.

**QA:** at 390, every capabilities `li` height = its content + 32px ± 1. At 1440 EN, the disclosure's top rule spans 64–1376.

#### P1-5 Prose labels and lists: one style per page (DESIGN › Source Typography Rule, Heading Restoration Rule)
**Where:** `src/content/pages/sk/instruments.md:25–40`, `sk/risk.md:23–28` and their EN counterparts; `global.css` `.prose li > p`.

**Wrong:**
- **Labels.** "Počas prevádzky TWR:" and "Mimo prevádzky TWR:" are body text, while "Potrebujeme:" and "Majte prichystané:" are H4 on the same page (`sk-aviation-testing-desktop` y 965/1085 vs 1196/1338).
- **List case.** Items "Mapa" / "letisko AIP" and "zariadiť manipuláciu…" / "Lietadlovú knihu" mix case.
- **Loose lists.** Blank lines inside a Markdown list (`zh/home.md`, `sk/home.md` packages) make loose items.

**Target:**
- All four labels are `####` (H4 18/500/1.4).
- Lists that complete a "…:" lead-in are lowercase with no full stops ("mapa", "letisko AIP", "zariadiť…", "lietadlovú knihu", …); apply the same check to the risk lists.
- Add `.prose li > p { margin: 0 }`.

#### P1-6 Mobile menu: one row height
**Where:** `global.css:598` (`.dropdown a { padding: 16px 0 }` leaking into the mobile panel) vs `:1529, :1547–1552, :1589` (literal `min-height: 52px`).

**Wrong:** the service rows measure 57px and the Aviation/Referencie rows 52px (`sk-menu-open-390` y 110–441).

**Target:** every mobile-panel row uses `min-height: var(--list-row-height)` (56) + 1px rule, with `padding-block: var(--space-4)`. Delete the three literal 52px values (DESIGN `menu-row`).

**QA:** all `.mobile-panel` rows are 57 ± 0.5px.

#### P1-7 Aviation tabs: the fade never covers the current tab
**Where:** `global.css:1657` (`scroll-padding-inline: var(--gutter)`), `Layout.astro:~349` (`scrollIntoView`).

**Wrong:** at 390 on the sub-pages, the current tab starts at x = 20 under the 32px start fade, so "S" of "Skúšky" is washed out (`sk-aviation-testing-mobile-tabs` x 20–40, y 160–185), and the cue that "Testing Service Aviation" exists to the left is lost.

**Target:**
- `scroll-padding-inline-start: calc(var(--gutter) + 48px); scroll-padding-inline-end: var(--gutter)`.
- Keep `inline: "start"`.

**QA:** at 390 on both sub-pages, the current tab's left edge is ≥ 52px, and the previous tab is visible in x < 52.

#### P1-8 E-mail rows and footer at 1080: no meta, break only after "@"
**Where:**
- `src/components/LinkList.astro` (meta);
- the contact details in `[...path].astro:360–395`;
- `src/components/FooterLink.astro` and `Layout.astro:~268` (footer e-mail).

**Wrong:**
- At 1080, "jakub.kubis@testing- / service.org" breaks inside the domain beside an `E-MAIL` meta that repeats what the address already says (`sk-contact-1080` x 54–362, y 590–633 and 756–790).
- The footer `info.aviation@…` ↗ ends at x ≈ 1028, past the container's right edge at 1026 (`sk-home-1080` y ≈ 3710).

**Target:**
- No meta on rows whose title is an e-mail address.
- Render addresses as `local@<wbr>domain` with `white-space: nowrap` on each part, so the only break is after "@". The icon stays bound to the domain part (`nowrap` on the last part + icon, as in the footer rule).

**QA:** at 1080, no e-mail element's right edge exceeds its column, and no line inside an address breaks outside "@".

### P2: neatness and rhythm

#### P2-1 One gap on both sides of the hero hairline (`hairline-gap`)
**Where:**
- `global.css:943` and `:1114` (`padding-block: calc(var(--section-y) / 2) var(--section-y)`);
- the page-hero bottom padding;
- the contact top padding;
- `src/data/tokens.ts`.

**Wrong:** 64px above the hero hairline but 52.8px below it at 1440 (32px at 390). Review 4's 64px and DESIGN's `section-y / 2` disagreed, and the builder correctly followed DESIGN. DESIGN now resolves it.

**Target:**
- Add `--hairline-gap: clamp(40px, 1rem + 3.4vw, 64px)`.
- Page-hero `padding-bottom`, article `padding-top` and contact `padding-top` all equal `var(--hairline-gap)`. Measure from the hairline to the top of the first line box (prose, rail Label, facts, form panel).
- Update the `check:layout` article-start check to 64 ± 2 at 1440 and 40 ± 2 at 390.

#### P2-2 Page-hero photo at 16:9 on desktop
**Where:** `global.css` `.page-hero > img` (~`:933`, `aspect-ratio: 3 / 2`).

**Wrong:**
- On every service page the copy column is ~120–200px tall (one or two h1 lines + one lead), beside a 533 × 355 photo. This leaves a 160–230px dead block under the lead (`sk-risk-desktop` y 270–520, `sk-service-desktop` y 330–520).
- It is the most template-looking composition after the home hero.

**Target:**
- At ≥1080: `aspect-ratio: 16 / 9` (533 × 300 at 1440).
- Below 1080: unchanged (3:2, capped at `min(50svh, 400px)`).
- Update `<Photo>` widths so the Resolution Rule still holds (crop, never upscale).

#### P2-3 Contact details: one element and one rhythm per block
**Where:** `[...path].astro:361, 379, 392`.

**Wrong:**
- The company is `<h2 class="type-h3">` but Aviation and Praha are `<h3>`.
- The "Aviation" H3 floats between two rules at uneven distances (47px above, 30px below; `sk-contact-desktop` y 642–719).

**Target:**
- All three are `<h2 class="type-h3">`.
- Each block: H3 → 16px → address (if any) → 24px → e-mail row.
- 48px from the previous block's closing hairline to the next H3; the "Čoskoro" eyebrow → 16px → H3.

#### P2-4 Privacy link in the form
**Where:** `src/components/ContactForm.astro:76–77`.

**Target:** a standalone text link: → icon (it is an internal page), `min-height: 44px; display: inline-flex; align-items: center`.

#### P2-5 Rail entries wrap to two lines
**Where:** `global.css:987–996`.

**Wrong:** "Pre pilotov: organizácia pri prí…" at 1080 (rail ≈ 225px wide).

**Target:** `white-space: normal; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden`. Keep `title`.

#### P2-6 ZH dash and percentage
**Where:**
- `src/content/pages/zh/home.md`: the three " – " list items (`zh-home-desktop` y ≈ 3470–3540) and "100 %";
- `src/data/home.json` ZH.

**Target:**
- "——" without spaces in place of " – " inside ZH sentences.
- "100%".
- Bind "——" to the preceding character (`⁠——`) so no line starts with it (`zh-home-desktop` y ≈ 3616).
- List the changed strings for the native check.

#### P2-7 Token hygiene
- `global.css:606`: `.dropdown-intro` `line-height: var(--leading-label)` (not `--leading-h3`).
- `global.css:373–374`: `.icon-menu` 16px, like every other icon. If 18px is wanted for optical weight, add it as a named size in DESIGN; don't keep a literal.

#### P2-8 Aviation index opening line repeats the h1 (owner)
"Testing Service s.r.o., divízia Aviation." (`sk-aviation-desktop` y 721) restates the h1. Omit it only with owner approval.

#### P2-9 EASA numbers three times on the aviation index (owner)
After P0-2 the facts no longer repeat them. The prose still has both the bullet "EASA: Regulation (EC) No 2018/1139 a No 1321/2014 easa.europa.eu" and the nested "Odkazy na predpisy" links. Keep the bullet and drop the nested pair (moving its links onto the numbers in the bullet), **with owner approval** (it is a content cut).

#### P2-10 Featured gallery photo with burned-in labels (owner)
`AT1.png` (7th featured cell, `sk-aviation-desktop` x 732–1042, y ≈ 2791–2997) has annotation text cropped off at the edges. Swap it for an unannotated photo from the same set in the featured eight (`[...path].astro:~95`). Which photo is the owner's choice; the builder may propose the next unannotated one.

#### P2-11 Contact details on mobile repeat the footer (P3, note only)
The address appears at `sk-contact-mobile` y ≈ 1270 and again in the footer at y ≈ 1955. DESIGN allows it (the contact page has no footer top row). No action.

### Owner decisions (not for the builder; not in the P0/P1 count)
1. **Slick series** 4600/6300 vs 4300/6300 (carried). Also "Bendix King serie" vs "série" in the maintenance list.
2. **Aviation naming** (carried): "Aviation Testing / Aviation Service" (source H3s) vs the tabs "Skúšky avionických systémov / Technická údržba"; "Aviation Testing Center" used for both the gallery and the instruments h2. The instruments h2 → h3 pile-up (y 854 → 925) follows from the source.
3. **Maintenance hero photo (owner, P1).** A stock automotive belt drive on the magneto page (`sk-maintenance-desktop` x 843–1376). Supply a real TS-A photo (magneto/bench) or approve no photo (copy cols 1–8).
4. **SK home source carries the supplier package twice** in two wordings (`sk/home.md:42–70`, also in `_source/pages/skmain.md`), with an unclosed "(dodatočne k EU smernici". Pick one.
5. **Pilot "letisko AIP" link** points to AIRAC 193 (May 2018). A current URL is needed.
6. **Card descriptions that restate titles** (carried): "Poradenské služby – technické štandardy a legislatíva", "Inšpekcie, testovanie, certifikácie."
7. **Phone number, form endpoint and success state** (carried).
8. **Native ZH check:**
   - the new UI strings `packages` "运营商与供应商服务" and `all` "全部服务" (P0-1);
   - the ZH dash/percent edits (P2-6);
   - the English hero eyebrow and footer tagline, and the Latin "GDPR / Accreditations / Slovakia" footer labels (carried);
   - a ZH teaser lead (the ZH aviation teaser is h2 + button only beside a 430px image).
9. **EN references:** "Trusted by industry leaders." (carried) and the link text "here"; propose "main list of references", which is a copy change.
10. **Footer closing line** exists only on risk and inspections. Either all service pages get one (owner copy) or none do.
11. **Partners image** (carried): its opaque white margin puts the first logo ~8px right of col 5. Approve a crop of the white margin.
12. **Aviation index:** approve dropping the opening line (P2-8) and the nested regulation pair (P2-9).

---

## 6. Order of work and acceptance

1. **P0-1, P0-2** → re-shoot `zh-home-desktop`, `zh-home-mobile`, `sk-home-desktop`, `en-home-desktop`, `sk-service-desktop`, `sk-aviation-desktop`, `sk-aviation-testing-desktop`.
2. **P1-1 to P1-8** → re-shoot `sk-risk-desktop`, `sk-risk-mobile`, `sk-menu-open-390`, `sk-aviation-testing-mobile-tabs`, `sk-contact-1080`, `sk-home-1080`, `sk-home-640`.
3. **P2-1 to P2-7.**
4. `npm run build` (includes `check:layout`) and `npm run check:links` pass.
5. **New or changed checks:**
   - no open packages disclosure and no equal consecutive headings on home (P0-1);
   - the facts rules: unique labels, ≥2 rows, no repeat of the lead or first prose, word-token sourcing (P0-2);
   - source-heading restoration (P1-1);
   - no current rail entry at scroll 0 (P1-2);
   - no line ending in a one-letter word or starting with "–" (P1-3);
   - capabilities row heights and a full-width closing rule (P1-4);
   - mobile rows 57px (P1-6);
   - current tab ≥ 52px from the left at 390 (P1-7);
   - e-mail containment at 1080 (P1-8);
   - `hairline-gap` 64/40 (P2-1).
6. Screenshots to `docs/review/shots-v5/` with the same filenames as v4, plus `en-home-640.jpg` (partial last capabilities row) and `zh-home-mobile` with the packages disclosure **opened** (`zh-home-packages-open-390.jpg`) to prove nothing repeats inside it.
7. In the implementation notes, list every ZH string changed or added, every source heading restored per page, and every facts row with its source line.
