# Design review 7: v6 critique and audit

Reviewer run 2026-11-20 against:
- `docs/review/shots-v6/`: all 42 captures (1440, 1080, 1024, 640 and 390, plus the dropdown, menu, tab and packages-open states);
- `src/` at commit `5fd4131`;
- a local `npm run build` (exit 0; `check:layout` 23 routes × 5 widths, 46 axe runs, 0 failures), `npm run check:links` (exit 0; 50 pages, 1,631 URLs, 27 redirects) and `npm run check` (0 errors, 0 warnings, 0 hints).

**Method.** Dual-agent, isolated:
- **A:** a design-director review of every v6 screenshot against DESIGN.md, `src/` and `_source/pages`;
- **B:** `impeccable detect` on `src/`; URL detector scans of 12 routes at 1440 and 390; a Playwright measurement pass at 390, 1080 and 1440 covering:
  - overflow and CLS;
  - axe;
  - heading stacks and the rail (entries, clamp height, baseline);
  - hero photo height against the copy, and the hairline gap;
  - section padding, card heights and button metrics;
  - text-link icon gap and footer gaps;
  - tap targets, rendered type combinations and SK line edges;
  - image scaling and column left edges.

The parent reviewer read every screenshot independently first. It then checked both assessments' claims against `src/` and the captures, and synthesised the result. Where A and B disagree, this report says which was right.

**Contract.** `DESIGN.md` was refined this round (see "Changes in round 7" in it). Where this review and DESIGN.md disagree, DESIGN.md wins.

---

## 1. Verdict

v6 implemented review 6 faithfully. The rendering faults that hit a reader at first glance in v5 are gone:
- EN instruments is clean, with a 4-entry rail and the order form as its first download;
- the rail clamp no longer leaks a third line;
- the maintenance price is a key line, not a 3-line heading;
- heading stacks are two deep at most, 16.00px apart (measured);
- category letters, numbers and slashes bind the right way;
- every arrow stays with its last word;
- ZH footer tags are consolidated.

B's measurement pass found the layout clean:
- **Shared edges:** every column edge is shared within 1px (x 64 / 509.33 / 843.33 at 1440).
- **Heroes:** the page-hero h1 is identical on every interior page (56px, top 165.69, or 234.69 under the aviation tabs).
- **Home sections:** section padding is identical in SK, EN and ZH.
- **Stability and access:** CLS is 0.0000 everywhere; axe reports 0 violations.

What keeps v6 from "genuinely neat" is **side effects of the round-6 fixes plus one regression**. Most of them show at narrow widths, where the shot set and the QA are thinnest:

1. **The ZH home h1 breaks inside "Czech and Slovakia" on desktop.** At 1024 and 1440 the lines are 管理您技术在捷克和 / 斯洛伐克的 / 法律合规要求. (`zh-home-desktop` y 262–480; `zh-home-1024` y 150–330.) Line 1 ends on the conjunction 和 and tears the place-name pair apart. Round 6 removed the line that began with 的 and introduced this instead. B's local measurement got the intended three lines, so the build's QA passes with a different CJK fallback font from the one the live captures use. The first line a Chinese reader sees is broken, and the QA can't see it.
2. **Breadcrumb spacing is uneven on every interior page below 1080.** The 44px `min-width` added in round 6 pushes the "/" about 20px away from "Úvod" but leaves it 8px from the next item. (`sk-service-mobile` x 20–85, y 105; `sk-aviation-mobile-tabs`; `sk-service-640`; `sk-contact-1024`.) It is the first line of every interior page on a phone or tablet.
3. **The prose hierarchy collapses at 390.** Prose H2 became fluid (24px), but Prose H3 stayed at 22px. An h2 → h3 stack therefore reads as one 5–7-line slab of heading:
   - `sk-aviation-mobile` y 825–1010: 6 lines before the first bullet;
   - `en-aviation-testing-mobile`: a 4-line h3 that looks heavier than the 1-line h2 above it.
4. **Short heroes still leave empty paper** beside a 240px stock photo:
   - risk: 131px under the lead;
   - consulting: 100px;
   - permits: 70px.

   Improved from 190px, but it is still the most template-looking composition on the industry pages.
5. **Rhythm drift at narrow widths and on the contact page:**
   - footer links sit on a 52px pitch against 22px text lines below 1080;
   - the contact footer repeats the aviation e-mail but not the industry one;
   - the aviation rail lists "Aviation Service" but not its sibling "Aviation Testing";
   - maintenance lists drop the full stops the aviation index uses;
   - leads end in orphans ("to you.").

None of this needs a new visual direction. DESIGN.md now closes the gaps in the system itself:
- a fluid `prose-h3`;
- a 200px hero floor;
- a breadcrumb hit area that doesn't move the separators;
- a 44px footer pitch below 1080 and a rule for the contact footer;
- a sibling rule for rail entries;
- balanced leads;
- ZH display lines that are forced at ≥640;
- a 6/6 home-hero split.

---

## 2. Scores

### Critique: Nielsen heuristics (Persuade/Read surface; 7 and 10 n/a, as in reviews 5–6)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 4 (was 3) | The rail is clean: no third-line slivers, labels on the baseline (H2-first 0.00px, paragraph-first −2.00px). Current nav, tabs and breadcrumb are correct. |
| 2 | Match system / real world | 3 | ZH hero splits 捷克和 / 斯洛伐克. Slick 4600/6300 (aviation index) vs 4300/6300 (maintenance) (owner). "60%" unspaced in SK. EN references lists a Chinese-titled PDF (owner). |
| 3 | User control and freedom | 4 | Disclosures ship closed; menu, tabs and dropdown behave. |
| 4 | Consistency and standards | 3 | Uneven breadcrumb separators below 1080. Footer pitch 32px vs 52px. The rail shows one of two sibling h3s. Maintenance list style differs from the aviation index. The contact footer drops one e-mail but keeps the other. |
| 5 | Error prevention | 2 | The form only opens a mail client (owner, unchanged). |
| 6 | Recognition rather than recall | 3 | Rails are shorter (consulting 8, EN instruments 4), but risk still carries 7 sentence entries, 4 of them ellipsised at 1080. The aviation rail misstates the section structure. |
| 8 | Aesthetic and minimalist design | 3 | Heading slabs on phones. Empty paper beside short heroes. The home hero's ~320px dark gap (x 520–840). The ZH teaser is h2 + button beside a 430px image (owner lead). |
| 9 | Error recovery | 2 | No success or fallback state after "Otvoriť e-mail" (owner). |
| | **Total** | **24/32 (75%)** | **Good; up 1.** v1 20 → v2 21 → v3 22 → v4 22 → v5 23 → v6 24. The rendering faults are gone. What remains is narrow-width rhythm and one ZH regression. P0-1, P0-2, P1-1 and P1-3 move heuristics 4 and 8 to 4. |

**Cognitive load: 2 of 8 checks fail (moderate; was 3).**
- **Visual hierarchy at 390:** H2 ≈ H3 in size, so stacks read as one block.
- **Chunking:** EN home shows 11 capability rows (SK 9) in one undifferentiated list at 390 (`en-home-mobile` y 2950–3770); the risk rail is 7 sentences.

Passing:
- single focus;
- grouping;
- one thing at a time;
- minimal choices;
- working memory;
- progressive disclosure (packages, gallery, ZH package body all ship closed).

**Emotional journey.**
- **Peaks:**
  - the home claim with its gold full stop;
  - the permits first screen (facts + rail + measured prose);
  - SK instruments as a pilot's checklist ("Počas prevádzky TWR:", "Potrebujeme:", "Majte prichystané:", then the order form as the first download);
  - the tidy contact form;
  - the real Žilina gallery;
  - the identical footer closing.
- **Valleys:**
  - the ZH hero's first line ending on 和;
  - the aviation index at 390 opening with six lines of heading;
  - the risk hero's empty paper beside a pipes stock photo;
  - the uneven "Úvod  /" at the top of every phone page;
  - maintenance's hairline ≈ 60px higher than its sibling tabs (owner photo).

### Audit: technical

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 4 | axe: 0 violations in 46 build runs and 24 B runs, contrast included. Every target below 44px at 390 is an inline prose link (WCAG 2.5.8 exemption). The breadcrumb now meets 44 × 44, at the cost of visual spacing (P0-2). |
| 2 | Performance | 4 | CLS 0.0000 on every measured route and width (QA max 0.0152 under deliberately delayed fonts). No image is shown larger than its decoded source; the 480w home candidate fixed the 1.02× upscale. |
| 3 | Theming | 4 | Fully tokenised. One unnamed combination: the switcher's current language, 15/600/1.2. DESIGN allows it but had no token; it is now `ui-current` (P2-4). |
| 4 | Responsive | 3 | No overflow anywhere. Narrow-width drift: breadcrumb separators (P0-2), Prose H3 not fluid (P1-1), 52px footer pitch (P1-3), ZH hero breaks at ≥1024 in the captures (P0-1). |
| 5 | Implementation integrity | 3 | Build, layout QA, links and type check all pass. But the ZH hero check passes locally while the capture shows the wrong break: QA and captures don't share CJK fonts. The shot set still omits 10 routes (SK/EN inspections, EN permits/consulting/risk, EN aviation index and maintenance, ZH references, legal, 404). Review 6's EN instruments regression only surfaced through an extra local capture. |
| | **Total** | **18/20** | **Excellent; same total and distribution as review 6.** Responsive and integrity both drift at the widths and routes the shot set covers least. |

**Detector.**
- **`src/`:** exit 2 with 4 findings, all false positives (the same as review 6):
  - `design-system-font` ×2 for the `Plex Fallback` faces (`global.css:2,10`); DESIGN requires them;
  - `design-system-color` ×2 for the `#000` tab-mask stops (`global.css:1720,1723`); DESIGN specifies them.
- **URL scans** (12 routes × 1440/390): 5 findings, all allowed by DESIGN:
  - `hero-eyebrow-chip` on SK/EN/ZH home at 1440 (eyebrow #1);
  - `kicker-above-heading` on contact "Čoskoro / Praha" at 1440 and 390 (eyebrow #3).
- **No actionable detector findings.** The detector can't see line breaks, separator spacing, heading-size ratios or composition voids, which is where this round's problems are.
- **Overlay:** the URL scans ran in their own headless Chromium (no-sandbox wrapper), so no live overlay was injected.

**Design specificity.** Authored, not templated:
- numbered paper cards;
- the facts-and-contents rail;
- labelled hairline download rows with file-type and language meta;
- one gold (or aviation-blue) full stop;
- the real TS-A gallery;
- the instruments checklist;
- no gradients, icon tiles, rounded cards or faux-technical captions.

The generic leftovers:
- the home hero: a dark slab with ~320px of nothing between the h1 and a stock robot line (P2-5);
- stock-photo industry heroes in the text-left / image-right pattern with empty paper under short copy (P1-2);
- sentence-length "slogan" headings restored from the Squarespace export. A dossier titles its sections. Replacing them is new copy, so it is an owner item (owner 7).

---

## 3. Fixed since review 6 (confirmed on screen and by measurement)

| Item | Status |
|---|---|
| P0-1 EN instruments | **Fixed.** Clean lead; no h1 repeat; one 2-deep stack; 4-entry rail; "Avionics test order · 2024, XLSX · SK" is the first download (`en-aviation-testing-desktop` y 1431). Residue: the lead ends in the orphan "to you." (P1-7). |
| P0-2 Rail clamp | **Fixed.** Max `.rail-text` height 43.38px (limit 43.9); no sliver (`sk-service-desktop` x 89–323, y 840–862; `sk-risk-desktop` y 650–731). |
| P0-3 Heading structure | **Fixed to spec.** Key line + footnote on maintenance; SK instruments opens with a paragraph; stacks 16.00px; no heading equals or starts with the h1. Side effects: mobile slabs (P1-1) and the rail sibling gap (P1-5). |
| P1-1 Typography transform | **Fixed.** "Kategória A", "revízie/úradné", "No 1321/2014", "výchovno‑vzdelávacie", "third‑party". Residue: "skupiny A" at the end of a heading is unbound (the lookahead needs a following character). "Bendix / King" splits at 640 (`sk-home-640` y 2847–2875). "60%" unspaced (P2-1). |
| P1-2 Text-link binding | **Fixed.** Icon gap 8px on every link at 390; the privacy link keeps its arrow on "údajov" (`sk-contact-mobile` x 44–182, y 998–1025). |
| P1-3 Hero photo height | **Implemented as specified; the rule was too weak.** Photo = clamp(240, copy, 300) on all 6 photo heroes, but voids of 131 / 100 / 70px remain (P1-2; DESIGN floor now 200). |
| P1-4 Fluid Prose H2 | **Fixed.** Exposes the fixed H3 (P1-1). |
| P1-5 Rail baseline | **Fixed.** H2-first 0.00px; paragraph-first −2.00px, exactly at tolerance (P2-3 tightens it). |
| P1-6 ZH hero | **Regressed at ≥1024** (P0-1). No line starts with 的, but line 1 ends with 和. Correct at 390. |
| P2-1 Footer rhythm | **Fixed at ≥1080** (8px box gap). The DESIGN text contradicted itself (24px in Footer, 32px in Buttons); now one definition. Below 1080 the pitch is 52px (P1-3). |
| P2-2 ZH footer tags | **Fixed.** 公司信息 SK, 我们的服务 EN, 航空 EN. |
| P2-3 Field label | **Fixed.** |
| P2-4 Breadcrumb hit width | **Hit area fixed, visual spacing broken** (P0-2). |
| P2-5 Home photo 480w | **Fixed** (B: decoded 480 × 316 for a 390 × 260 box). |
| P2-6 Card and strip links | **Fixed.** No stranded arrows at 540–640. |
| Owner 8 (ZH supplier sentence) / owner 13 (gallery) | Applied as recorded in the implementation notes. |

## 4. Regressed / still drifting

**Regressions in v6:**
1. **ZH hero line 1 ends on 和 at ≥1024.** `:lang(zh) .hero-copy h1 { max-width: 11em }` (`global.css:1359`) can't hold the 14-character first two phrases, so the browser uses the narrow-width `<wbr>` after 和 (`[...path].astro:162–169`). → P0-1
2. **Breadcrumb separator spacing below 1080.** `min-width: var(--hit-height)` on `.breadcrumb a` (`global.css:1515–1519`). → P0-2

**Still drifting:**
- Prose H3 is fixed at 22px (P1-1);
- short-hero voids (P1-2);
- 52px footer pitch below 1080 (P1-3);
- contact-footer e-mail asymmetry (P1-4);
- the rail omits one of two sibling sub-sections (P1-5);
- list style under a heading (P1-6);
- lead orphans (P1-7);
- typography residue (P2-1);
- the home hero dark gap (P2-5);
- capture-set and font-parity gaps in QA (P2-7).

---

## 5. Fix list

Pixel positions are at 1440 unless stated. Container 1312px, 12 columns, 24px gap, so the column width is 87.33px. Column n starts at x = 64 + (n − 1) × 111.33:
- col 1 = 64;
- col 5 = 509;
- col 7 = 732;
- col 8 = 843;
- col 12 ends at 1376.

**Builder count: P0 = 2, P1 = 7, P2 = 7.** Items tagged (owner) are listed again under Owner decisions and are **not** in that count.

### P0: blocks "genuinely neat"

#### P0-1 ZH home h1: force the phrase lines at ≥640 (DESIGN › CJK Rule › ZH display line breaks)
**Where:**
- `src/pages/[...path].astro:158–170` (ZH h1 markup);
- `src/styles/global.css:1359` (`:lang(zh) .hero-copy h1`);
- `scripts/qa-layout.mjs`.

**Wrong:**
- **1440:** `zh-home-desktop` lines are 管理您技术在捷克和 / 斯洛伐克的 / 法律合规要求.
- **1024:** `zh-home-1024`, same lines.

Line 1 ends with the conjunction 和 and splits 捷克和斯洛伐克 ("Czech and Slovakia"). B's local run rendered the intended lines, so the outcome depends on the CJK fallback font, and QA doesn't use the capture font.

**Target:**
1. **Markup.** Render the three phrases as `<span class="zh-line">管理您技术</span><span class="zh-line">在捷克和<wbr>斯洛伐克的</span><span class="zh-line">法律合规要求<span class="gold">.</span></span>`. The characters are unchanged.
2. **CSS:**
   ```css
   .zh-line { display: inline; }
   @media (width >= 640px) {
     :lang(zh) .hero-copy h1 { max-width: none; }
     .zh-line { display: block; white-space: nowrap; }
   }
   ```
   - Below 640 the spans stay inline, and the only break opportunities are the `<wbr>` and the phrase boundaries (keep `word-break: keep-all`).
   - At 390 the result stays 管理您技术 / 在捷克和 / 斯洛伐克的 / 法律合规要求, as now.
3. **Width check.** At ≥640, the longest line (在捷克和斯洛伐克的, 9 characters) at the Display size must fit the copy column:
   - at 1440: 9 × 60 = 540px inside a ≈ 600px column (after P2-5, 668px);
   - at 640: 9 × 40 = 360px inside 600px.

   If any width between 640 and 1079 overflows, reduce nothing; let the h1 use its fluid size. Do not re-enable the inner `<wbr>` above 640.

**QA:**
- run the line check with the **same font stack and installed CJK fonts as the capture run** (record `document.fonts` and the resolved family of the h1 in `qa-v7.json`);
- at 640, 1024, 1080 and 1440 the h1 has exactly 3 line boxes, starting with 管, 在 and 法;
- at 390 no line starts with 的, 了 or 和, and no line ends with 和 unless the next line starts with 斯洛伐克.
- Native check stays listed (owner 3).

#### P0-2 Breadcrumb: hit area without moving the separators (DESIGN › Header › Breadcrumb hit area)
**Where:** `src/styles/global.css:1511–1519` (`@media (width < 1080px) .breadcrumb li / .breadcrumb a`), `global.css:911–915` (separator).

**Wrong:** below 1080, "Úvod" has a 44px-wide box, so the separator sits about 20px after the word but 8px before "Služby" / "Aviation". Seen on every interior page at 390, 640 and 1024:
- `sk-service-mobile` x 20–85, y 105;
- `sk-aviation-mobile-tabs`;
- `sk-service-640` x 32–97;
- `sk-contact-1024` x 51–116.

**Target:**
```css
@media (width < 1080px) {
  .breadcrumb a { position: relative; display: inline; min-width: 0; min-height: 0; }
  .breadcrumb a::after {
    content: ""; position: absolute; left: 50%; top: 50%;
    width: max(100%, var(--hit-height)); height: var(--hit-height);
    translate: -50% -50%;
  }
  .breadcrumb ol { min-height: var(--hit-height); align-items: center; }
}
```
- Keep the separator's `margin-inline: var(--space-2)`.
- Keep the round-6 CLS guard (`li[aria-current] { flex: 1; min-width: 0 }`).
- Check that the breadcrumb's vertical position doesn't change: the `ol` keeps a 44px row, so the tabs and h1 below don't move.

**QA:**
- at 390, 640, 1024 and 1440, the distance from each link's last glyph to the separator glyph and from the separator glyph to the next item's first glyph is 8 ± 1px;
- each link's hit area (`::after` box) is ≥ 44 × 44 below 1080;
- the hit areas of "Úvod" and "Služby" don't overlap the current item's text by more than the 24px WCAG spacing circle allows;
- CLS stays < 0.05 at 390.

### P1: visible inconsistency or a broken promise

#### P1-1 Prose H3: fluid size (DESIGN › Typography › Prose H3; new token `prose-h3`)
**Where:**
- `global.css` `.prose h3` (line ≈ 1037);
- `src/data/tokens.ts` (add `prose-h3`);
- type-token QA.

**Wrong:** at 390, Prose H2 is 24px and Prose H3 22px, so a stack reads as one slab:
- `sk-aviation-mobile` y 825–1010 (3 + 3 lines);
- `en-aviation-testing-mobile` (1-line h2, then a 4-line h3 that outweighs it);
- `sk-service-mobile` y 1500–1600.

**Target:**
- `.prose h3 { font-size: clamp(1.1875rem, 1.05rem + 0.55vw, 1.375rem); line-height: 1.3; letter-spacing: -0.01em; }`: 19px at 390, 22px from ≈ 945px.
- H3 outside prose (cards, the downloads/partners/related headings, contact details) stays fixed at 22px.
- Prose labels (the h3/h4 elements styled with the H4 token) are unchanged at 18px. At 390 the order is therefore 24 > 19 > 18. Keep the label weight 500 and its colon, so it still differs from Prose H3 by size and punctuation.

**QA:**
- `.prose h3:not(.prose-label)` computes 19 ± 0.5px at 390 and 22px at 1440;
- the type-token check lists `prose-h3`;
- at 390 the SK aviation opening stack is ≤ 5 lines (was 6).

#### P1-2 Page-hero photo floor 240 → 200px (DESIGN › Photography › Ratios)
**Where:** `global.css` `.page-hero > img` (≥1080 block). The `<Photo>` `sizes` don't need to change (a 533 × 200 crop of the 720w derivative).

**Wrong:** at 1440 the empty paper under the lead is:
- risk 131px (`sk-risk-desktop` x 64–760, y 270–406);
- consulting 100px;
- permits 70px.

The B measurements: copy 108.6 / 139.6 / 170px beside a 240px photo.

**Target:**
- `min-height: 200px` (was 240); everything else unchanged (`align-self: stretch; height: auto; max-height: 300px; aspect-ratio: auto; object-fit: cover`).
- Expected photo heights at 1440:
  - permits 200, risk 200, consulting 200;
  - aviation 200 (copy 188.6);
  - SK instruments 250 (copy);
  - EN instruments 219.6 (copy);
  - inspections: measure.
- Below 1080: unchanged.

**QA:**
- the photo height = clamp(200, copy height, 300) ± 1 on every photo hero at 1080 and 1440;
- the empty space under the lead is ≤ 200 − copy height;
- the hero hairline gap stays 64px at 1440.

#### P1-3 Footer rhythm below 1080: 44px pitch, no gap (DESIGN › Footer rhythm)
**Where:** `global.css` footer list rules (≈ 1280–1305 and the `< 1080` block ≈ 1501).

**Wrong:** below 1080 every link is `min-height: 44px` plus an 8px row gap, a 52px pitch against 22px text lines:
- `sk-home-mobile` y 5170–5340;
- `sk-service-mobile` footer;
- `sk-home-1024` y 4690–4960.

The Aviation column goes location line → 38px → e-mail → 52px → links. The footer is ≈ 1,300px tall at 390.

**Target:**
- below 1080: `.footer-grid ul { row-gap: 0 }`; links stay `min-height: 44px; display: inline-block` with the text vertically centred by block padding (`padding-block: calc((44px - 1lh) / 2)`);
- a non-link line before the first link (the location line, the IČ DPH line) gets `margin-bottom: 0`, so the first link's own 44px box gives the air;
- at ≥1080 nothing changes: an 8px box gap with a 24px minimum height.

Also fix the QA definition (B found 10.31px line-box gaps after one-line links at ≥1080): the footer check measures **box** gaps (8 ± 1px at ≥1080, 0 ± 1px below), not glyph line boxes.

**QA:**
- at 390 and 1024, consecutive footer links are 44 ± 1px apart (top to top);
- the footer band at 390 is ≥ 200px shorter than in v6 on SK home.

#### P1-4 Contact page footer: no e-mail rows (DESIGN › Footer › Contact page footer)
**Where:** `src/layouts/Layout.astro` footer columns 1 and 4 (the "top-row e-mail wins" logic).

**Wrong:** the contact page has no footer top row. Its footer still lists info.aviation@ in the Aviation column but no jakub.kubis@, while the details column above lists both (`sk-contact-mobile` footer y ≈ 2400–2450; `sk-contact-1024`).

**Target:** on the contact page (any language), neither footer column renders an e-mail row. The Aviation column is then location line → three page links.

**QA:**
- on `/kontaktujte-nas/` and its EN/ZH equivalents, `.footer-grid a[href^="mailto:"]` count is 0;
- on every other page it is exactly 1 (the division e-mail not shown in the top row).

#### P1-5 Rail: list both sibling sub-sections (DESIGN › Heading Restoration Rule › Exception (siblings))
**Where:** the rail entry builder (`src/lib/article.ts` / `Layout.astro`; whichever computes `data-rail-entries`), plus the rail QA.

**Wrong:** SK aviation's rail shows "Naše služby" → "Aviation Service" but not "Aviation Testing", because "Aviation Testing" is the second heading of the "Naše služby" stack (`sk-aviation-desktop` rail x 77–190, y 788–826). EN aviation does the same under "Our offer". A reader sees one of two parallel services.

**Target:**
- a second-of-stack heading is omitted **only** when no later heading of the same level follows it inside the same parent section;
- In SK aviation the first h2 section is h2 "Pre bezpečné…" → h3 "Preto je periodické…" (stack) → list → h3 "Ide samozrejme…". "Preto je…" therefore has a later sibling h3 and is listed too. Expected SK aviation rail (8 entries):
  1. "Pre bezpečné vykonanie letu je nevyhnutný správne pracujúci avionický systém";
  2. "Preto je periodické preskúšanie…" (h3);
  3. "Ide samozrejme o dôležitú podmienku…" (h3);
  4. "Naše služby";
  5. "Aviation Testing" (h3);
  6. "Aviation Service" (h3);
  7. "Na stiahnutie a odkazy";
  8. "Naši partneri".

  Long entries clamp to two lines as now. A stack whose second heading has no later sibling (SK consulting "Prevádzkovateľ: …" → "Zabezpečenie, že platíte…"; SK instruments' pilot h2 → first TWR label; EN instruments' mandatory h2 → EASA h3) keeps the round-6 omission. Apply the rule mechanically to every article and record the resulting rail per page in the implementation notes;
- EN aviation the same.

**QA:** the rail-membership check implements the sibling exception; the injected-regression test covers a stack with and without a later sibling.

#### P1-6 One list style under a heading (DESIGN › Source Typography Rule › one list, one style)
**Where:** `src/content/pages/sk/maintenance.md:13–15`, `src/content/pages/en/maintenance.md` (the "Our specialization" list), plus a sweep of every article.

**Wrong:** the maintenance lists sit directly under "Naša špecializácia" / "Our specialization" (no lead-in sentence), so they are stand-alone fragments:
- SK has capitals but no full stops (`sk-maintenance-desktop` y 617–709);
- EN has neither ("mediation of repair of avionics");
- the aviation index lists end every fragment with "." (`sk-aviation-desktop` y 776–933).

**Target (typography only; words unchanged):**
- **SK:**
  - "…Slick série 4300/6300." (keep the owner-pending series number exactly as it is);
  - "Sprostredkovanie opravy avioniky.";
  - "Poradenstvo v oblasti zástavby avioniky.";
- **EN:**
  - "…Slick 4300/6300 (coming soon)."
  - "Mediation of repair of avionics."
  - "Consultancy about built in the avionics parts."
- Then grep every `src/content/pages/{sk,en}/*.md` for a list whose previous block is a heading, and apply the same rule. Record each changed line in the implementation notes.

**QA:** a content check. A Markdown list whose preceding sibling is a heading has every item starting with an uppercase letter (or a digit) and ending with "." (or "?").

#### P1-7 Leads: balanced, no orphan (DESIGN › Wrap Rule)
**Where:** `global.css` `.lead` (and the hero/section-intro lead selectors that set `text-wrap: pretty`, ≈ line 270).

**Wrong:**
- "…or we will come / to you." (`en-aviation-testing-desktop` y 328–360);
- "…na letisko do / Žiliny (LZZI)." (`sk-aviation-testing-1080` y 408).

**Target:** `.lead { text-wrap: balance; }`. Body paragraphs and list items stay `pretty`.

**QA:** on every route at 390, 1080 and 1440, a lead with ≥ 2 lines has a last line ≥ 40% of its widest line.

### P2: neatness and rhythm

#### P2-1 Typography transform residue (DESIGN › Wrap Rule)
**Where:** `scripts/rehype-typography.mjs` (`typography()`); the same helper for `home.json` and `ui.ts`.

**Target:**
1. **Category letter at the end of a node:**
   - change the backward-binding lookahead to `(?=[\s,.)]|$)`;
   - fixes "…technických zariadení skupiny A" (`sk/permits.md:23`) in the h3 and its rail entry.
2. **SK/CS percentages:**
   - for `lang` sk/cs, `/(\d)\s?%/g` → `'$1 %'`;
   - this changes `sk/consulting.md:12` "60%" → "60 %" at render; don't edit the Markdown;
   - EN and ZH are untouched.
3. **Product names:**
   - bind `Bendix King` → `Bendix King`;
   - bind a make to a following parenthesised series or series word: `/(Slick|King)\s(?=\(|série|serie|series)/g` → `'$1 '`;
   - bind `(série|serie|series)\s(?=[A-Z0-9])` → `'$1 '`;
   - fixes "Bendix / King" and "Slick / (4600/6300)" at 640 (`sk-home-640` y 2847–2875).

**QA:**
- fixtures for all three in the transform tests (and idempotence);
- the SK Range-rect line check adds: no line ends with "Bendix", "Slick", "série" or "skupiny", and no line starts with "%".

#### P2-2 Lang tag inside a secondary button: borderless (DESIGN › Lang-tag)
**Where:** `global.css:397` `.button:not(.button-secondary) .lang-tag`.

**Wrong:** the ZH teaser's bordered secondary button contains a boxed "EN" tag, a box in a box (`zh-home-desktop` x 843–990; `zh-home-mobile` y 712–760).

**Target:** the selector becomes `.button .lang-tag { border: 0; color: currentColor; opacity: .75; }`. No other change.

#### P2-3 Rail offset for paragraph-first articles: 6 → 8px (DESIGN › Baseline Rule)
**Where:** `global.css` rail `padding-top` (paragraph-first case); `--rail-offset-heading` stays 16px.

**Wrong:** the rail label baseline sits −2.00px above the first paragraph's baseline on permits, risk, consulting and SK instruments at 1080 and 1440 (B), exactly at the old tolerance.

**Target:** `padding-top: var(--space-2)` (8px).

**QA:** tolerance tightened to ±1px for both cases.

#### P2-4 Name the switcher's current-language combination (`ui-current`)
**Where:** `src/data/tokens.ts`, the switcher CSS, the type-token QA.

**Target:**
- add `ui-current` (15/600/1.2) and use `--weight-ui-current: 600` for `[aria-current]` in the language switcher;
- the QA token list accepts it only on `.lang-switcher [aria-current]`.

No visual change.

#### P2-5 Home hero split 7/5 → 6/6 (DESIGN › Layout › Home hero)
**Where:** `global.css:1479` (`.home-hero { grid-template-columns: 7fr 5fr }` at ≥1080); the home hero `<Photo>` `widths`/`sizes`.

**Wrong:** a ~320px dark gap between the end of the display h1 (x ≈ 520) and the photo (x 840) (`sk-home-viewport-1440`, `en-home-desktop`, `zh-home-desktop`). It is the most template-like composition left.

**Target:**
- `grid-template-columns: calc(max(var(--gutter), (100vw - var(--container)) / 2) + (min(100vw - 2 * var(--gutter), var(--container)) + var(--grid-gap)) / 2) 1fr;`
- that puts the photo's left edge on the col-7 line: x = 732 at 1440, 540 + gutter at 1080;
- copy column padding unchanged (96px block, 64px right);
- the photo becomes ≈ 708px wide at 1440: update `sizes` and emit widths up to 2× that (or the source width if smaller), per the Resolution Rule;
- keep `object-position: 60% 50%` and check the robot line still reads.

**QA:**
- at 1440, the photo left edge = 732 ± 1;
- no image upscale (existing check);
- the dark gap between the h1's right edge and the photo is ≤ 230px on SK, EN and ZH.

#### P2-6 Capture set and QA font parity
**Where:** `scripts/qa-layout.mjs` (capture list and environment report).

**Target:**
1. **Add captures** at 1440 and 390 for the routes the set has never covered:
   - SK and EN inspections;
   - EN permits, EN consulting, EN risk;
   - EN aviation index, EN maintenance;
   - ZH references;
   - SK legal/privacy;
   - 404.

   Keep every v6 filename.
2. **Record the environment** in `qa-v7.json`: the browser build, the resolved font family of the ZH h1, the SK h1 and the EN body, and the list of installed CJK fonts.
3. **Font parity.** The ZH line checks (P0-1) must run in the same environment that produces the captures.

#### P2-7 Footer and contact QA definitions
**Where:** `scripts/qa-layout.mjs`.

**Target:** add the new or changed checks so these items can't drift back:
- footer box gaps (P1-3);
- contact-footer mailto count (P1-4);
- breadcrumb glyph spacing (P0-2);
- lead last-line ratio (P1-7);
- the list-style content check (P1-6);
- `prose-h3` size (P1-1);
- the photo floor (P1-2).

Each check gets an injected-regression proof, as in round 6.

*(Builder P2 count = 7. The Chinese-titled PDF on EN references is owner item 9: don't invent a `titleEn`.)*

### Owner decisions (not for the builder; not in the P0/P1 count)
1. **Slick series** (carried): 4600/6300 on the aviation index and home capabilities vs 4300/6300 on maintenance, and "Bendix King serie" vs "série" inside one SK bullet.
2. **Maintenance hero photo (owner, P1)** (carried): a real TS-A magneto or bench photo, so all three aviation tabs share one hero type. Until then maintenance's hairline sits ≈ 60px higher than its siblings at 1440 (DESIGN now states this as the only temporary exception).
3. **Native ZH check (owner, P1):**
   - the P0-1 line breaks;
   - the spaced slash in 雇主 / 运营商套餐;
   - English strings left on ZH pages (the hero eyebrow "INSPECTION · CERTIFICATION · PERMIT · CZ + SK", footer "Accreditations", "GDPR", "Slovakia");
   - the round-5 strings (运营商与供应商服务, 全部服务, dashes, 100%);
   - the supplier-sentence placement from round 6.
4. **ZH aviation-teaser lead (owner, P1)** (carried): h2 + button beside a 430px image leaves a ≈ 300px void (`zh-home-desktop` ≈ y 2530–2880). DESIGN allows no lead, but a native one-sentence lead would close the void.
5. **Phone number, form endpoint and success state (owner, P1)** (carried). The form depends on a desktop mail client, which often fails on locked-down plant PCs.
6. **EN references copy** (carried): "Trusted by industry leaders." and the link text "here".
7. **Slogan headings → short section titles (owner, P1).** The Heading Restoration Rule keeps ≤110-character source sentences as headings. Examples:
   - "Pre bezpečné vykonanie letu je nevyhnutný správne pracujúci avionický systém";
   - "Dodržujete bezpečnostné štandardy a všetky právne predpisy Slovenskej/Českej republiky?";
   - the 7 risk rail sentences.

   They are the main reason the rails and mobile openings are heavy, and the main remaining "Squarespace" tell. Short titles (e.g. "Povinné preskúšanie", "Dokumentácia", "Tri kľúčové kroky") are new copy, so they need the owner's words. If approved, the builder applies them with the same rule; the system doesn't change.
8. **"Naše služby" inside permits** (carried): it sits next to "Ďalšie služby" in the rail.
9. **English title for the Chinese reference-list PDF** on the EN references page ("Testing Service · 行业案例", `en-references-desktop` y 909), e.g. a `titleEn`; the label needs the owner.
10. **Card descriptions that restate titles** (carried): "Dohliadanie na povolenia a schválenia.", "Inšpekcie, testovanie, certifikácie."
11. **Pilot "letisko AIP" link** points to a 2018 AIRAC page (carried).
12. **Footer closing line** exists only on risk and inspections (carried).
13. **Partners image at 390** is illegible (`sk-aviation-mobile` y ≈ 2655–2700) (carried).
14. **Contact lead** "Testing Service s.r.o. · Martin, Slovensko" repeats the H3 and address beside it (carried, low).
15. **Gallery:** 3 of 8 featured cells still show the yellow cases (low; no further eligible photos without annotations).
16. **SK home source carries the supplier package twice** in two wordings (carried; visible only in the open disclosure).
17. **Industry documents:** the industry division shows only the accreditation PDF. If price lists, order forms or certificates exist for the four services, they belong on those pages' download lists ("Paperwork is a feature").
18. **Capability list chunking on mobile:** EN shows 11 and SK 9 capability rows in one run at 390. Grouping them (e.g. operators / suppliers / aviation) would need the owner's grouping; until then they stay one list.

---

## 6. Order of work and acceptance

1. **P0-1 and P0-2.** Re-shoot:
   - `zh-home-desktop`, `zh-home-1024`, `zh-home-mobile`;
   - `sk-service-mobile`, `sk-service-640`;
   - `sk-aviation-mobile-tabs`;
   - `sk-contact-1024`.
2. **P1-1 to P1-7.** Re-shoot:
   - `sk-aviation-mobile`, `en-aviation-testing-mobile`, `en-aviation-testing-desktop`;
   - `sk-risk-desktop`, `sk-consulting-desktop`, `sk-service-desktop`;
   - `sk-home-mobile`, `sk-home-1024`;
   - `sk-contact-mobile`;
   - `sk-aviation-desktop`, `sk-maintenance-desktop`;
   - `sk-aviation-testing-1080`.
3. **P2-1 to P2-7.**
4. `npm run build` (includes `check:layout`), `npm run check:links` and `npm run check` pass.
5. **New or changed checks:**
   - ZH h1 = 3 lines starting 管/在/法 at ≥640, run in the capture font environment;
   - breadcrumb glyph-to-separator 8 ± 1px and a 44 × 44 hit area below 1080;
   - `.prose h3` 19 ± 0.5px at 390;
   - hero photo = clamp(200, copy, 300);
   - footer link pitch 44 ± 1px below 1080, box gap 8 ± 1px at ≥1080;
   - 0 mailto rows in the contact footer, exactly 1 elsewhere;
   - rail sibling exception;
   - list style under headings;
   - lead last line ≥ 40%;
   - transform fixtures (end-of-node letter, SK percent, product names);
   - rail baseline ±1px;
   - `ui-current` token;
   - home photo left edge 732 ± 1 at 1440.
6. **Screenshots** go to `docs/review/shots-v7/`, with every v6 filename plus the P2-6 additions (`sk-inspections-*`, `en-inspections-*`, `en-service-*`, `en-consulting-*`, `en-risk-*`, `en-aviation-*`, `en-maintenance-*`, `zh-references-*`, `sk-legal-*`, `404-*`, each `-desktop` and `-mobile`).
7. **In the implementation notes:**
   - every content line changed for P1-6;
   - the resulting rail entries per article for P1-5;
   - the ZH markup change for the native check;
   - the font environment recorded for P2-6.
