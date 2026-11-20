# Design review 6: v5 critique and audit

Reviewer run 2026-11-20 against:
- `docs/review/shots-v5/`: all 38 captures (1440, 1080, 1024, 640 and 390, plus the dropdown, menu, tab and packages-open states);
- `src/` at commit `10051a3`;
- a local `npm run build` (exit 0; `check:layout` 23 routes × 5 widths, 46 axe runs, 0 failures) and `npm run check:links` (exit 0; 50 pages, 1,637 URLs, 27 redirects);
- extra local captures of the two pages missing from the shot set: EN `aviation/instrument-testing/` and SK `sluzby/technicke-poradenstvo/`.

**Method.** dual-agent, isolated:
- **A:** a design-director review of every v5 screenshot against DESIGN.md, `src/` and `_source/pages`;
- **B:** `impeccable detect` on `src/`, URL detector scans of 10 routes at 1440 and 390, a Playwright measurement pass (gaps, heading stacks, rail entries, type combos, section padding, card and button metrics, image scaling, tap targets, axe, CLS), plus the link check.

The parent reviewer read the screenshots independently first. Then it checked every claim from both assessments against `src/`, `dist/` and the source files, and synthesised the result. Where A and B disagree, this report says which was right.

**Contract.** `DESIGN.md` was refined this round (see "Changes in round 6" in it). Where this review and DESIGN.md disagree, DESIGN.md wins.

---

## 1. Verdict

v5 implemented review 5 faithfully, and most of it shows on screen:
- ZH home no longer repeats itself;
- facts sit only on permits, in one typography;
- the risk page has chunked headings;
- the rail no longer lies at load;
- Slovak one-letter words and dashes are bound;
- mobile-menu rows are one height;
- tabs clear the fade;
- e-mails break only after "@";
- the hero hairline gap is symmetric.

Layout, spacing and tokens measure clean: 37 rendered type combinations, all tokens except one; section padding identical on SK/EN/ZH home; equal card rows; one button family at 48/44px.

What now keeps the site from "genuinely neat" is **a side effect of round 5's Heading Restoration Rule**, plus **two rendering faults that a reader sees at first glance**:

1. **Heading pile-ups.** Restoring every short source heading produced stacks of 2–5 headings with no text between them:
   - SK aviation index: h2 → h3, 6 lines of heading at 390 before the first bullet;
   - SK instruments: h2 → h3 → h4;
   - SK consulting: h2 → h3;
   - EN instruments: h2 → h3 → h3 → h3 → h4.

   It also turned a **price line into a 3-line h2** (5 lines at 390) on maintenance, and kept h2s that restate the h1 ("Skúšky avionických systémov sú povinné"; on EN, exactly "Aviation instrument testing").
2. **EN instruments is broken.** Its hero lead renders a literal `### Come for inspection…`. This is a v5 regression (`a2c9cf5`); the page is not in the shot set, so the QA captures never showed it.
3. **The rail's two-line clamp leaks.** On every page with a long entry, the top pixels of a third line show under the second (permits y 935–942, risk y 748/808, aviation y 818, maintenance y 685 at 1440). Next to a precise hairline rail it reads as a rendering bug.

Smaller drift:
- the Slovak binding misfires on category letters ("Kategória / A vyhradených");
- spaced slashes remain, and a line starts with "/";
- the privacy link's arrow detaches to the column edge at 390;
- one-line page heroes still leave ~190px of dead space under the lead beside a 300px photo;
- the footer's 32px link pitch collapses when a link wraps at 1080.

None of this needs a new visual direction. It needs the content-structure rules finished, and DESIGN.md now finishes them.

---

## 2. Scores

### Critique: Nielsen heuristics (Persuade/Read surface; 7 and 10 n/a, as in review 5)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 3 | The scroll-spy is honest now (nothing current at load, last entry at the bottom). But clipped third-line fragments in the rail look like a rendering fault beside the current-position rule. |
| 2 | Match system / real world | 3 | The EN instruments lead shows "###". A price is set as a section heading. "Kategória / A" separates a category letter from its noun. Slick 4600/4300 is still open (owner). |
| 3 | User control and freedom | 4 | Every disclosure ships closed in every language; no traps; tabs, menu and dropdown behave. (Was 3.) |
| 4 | Consistency and standards | 3 | Layout is consistent. Drift is in content structure: heading stacks on some pages only, spaced vs unspaced slashes on one page, a photo hero on two aviation tabs but not the third, a text-link arrow bound in the footer but not in the form. |
| 5 | Error prevention | 2 | The form only opens a mail client (owner, unchanged). |
| 6 | Recognition rather than recall | 3 | The rails now exist everywhere, but SK consulting has 9 and EN instruments 10 entries, mostly 60–107-character sentences cut to two lines. |
| 8 | Aesthetic and minimalist design | 3 | ZH repetition is gone (+). New: heading pile-ups and headings that restate the h1. One-line heroes leave a 190px void under the lead. |
| 9 | Error recovery | 2 | No success or fallback state after "Otvoriť e-mail" (owner). |
| | **Total** | **23/32 (72%)** | **Good; up 1.** v1 20 → v2 21 → v3 22 → v4 22 → v5 23. The content repeats are gone; the remaining cost is structural (headings) plus two rendering faults. P0-1 to P0-3 move heuristics 1, 2, 4 and 8 to 4. |

**Cognitive load: 3 of 8 checks fail (moderate).**
- **Visual hierarchy:** heading stacks (SK aviation, SK instruments, SK consulting, EN instruments).
- **Redundancy:** headings that restate the h1 (SK and EN instruments).
- **Scannability of the rail:** long sentence entries, clipped.

Chunking is now fixed on risk, and progressive disclosure on ZH packages.

**Emotional journey.**
- **Peaks:**
  - the home claim with the gold full stop;
  - the permits first screen (facts + rail + measured prose);
  - the tidy contact page;
  - the real Žilina gallery;
  - the identical footer closing.
- **Valleys:**
  - the first line a foreign pilot reads on EN instruments ("### Come for inspection…");
  - the aviation index opening with ~200px of stacked headings at 390 (`sk-aviation-mobile` y 825–1040);
  - maintenance: a hero with no photo, then a price shouting as a 3-line h2;
  - glyph slivers in every long rail.

### Audit: technical

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 4 | axe: 0 violations in 46 build runs and 20 B runs, contrast included. The ZH double-h2, contact heading levels and privacy target from review 5 are all fixed. Minor: breadcrumb links at 390 are 32–42px wide (44px tall), below DESIGN's 44px hit rule though above WCAG 2.2's 24px. (Was 3.) |
| 2 | Performance | 4 | CLS ≤ 0.0016 on every route. Gallery extras lazy inside closed `<details>`. One image fractionally upscaled: home hero at 390 shown 390×260 from a 390×256 candidate (1.02×). |
| 3 | Theming | 4 | Fully tokenised. One off-token combination: form labels 14/500/1.55 (`div.form-row > label`). DESIGN now names it the `field-label` token. |
| 4 | Responsive | 3 | No overflow on any route or width. Mobile drift: the privacy link's arrow detaches to x 338 at 390; a line starts with "/" on risk at 390; Prose H2 runs 4–5 lines at 390 (fixed 28px); the price h2 runs 5 lines at 390. (Was 4.) |
| 5 | Implementation integrity | 3 | Build, layout QA and link check pass, but QA let a literal `###` ship in a hero lead (EN instruments) and never captured the EN aviation sub-pages. The rail clamp is implemented exactly as DESIGN wrote it, and that leaks (DESIGN fixed). |
| | **Total** | **18/20** | **Excellent; same total as v4 with a different distribution.** Accessibility is up; responsive and integrity carry the new faults. |

**Detector.**
- **`src/`:** exit 2 with 4 findings, all false positives:
  - `design-system-font` ×2 for the `Plex Fallback` faces at `global.css:2,10` (DESIGN requires them);
  - `design-system-color` ×2 for the `#000` tab-mask stops at `global.css:1683,1686` (DESIGN specifies them).
- **URL scans** (10 routes × 1440/390): 7 findings on 5 routes, all allowed by DESIGN:
  - `hero-eyebrow-chip` on the SK/EN/ZH home at 1440 (eyebrow #1);
  - `kicker-above-heading` on contact "Čoskoro / Praha" at 1440 and 390 (eyebrow #3).
- **No actionable detector findings.** As in round 5, the detector cannot see heading structure, clamp leaks or source typography, which is where this round's problems are.

**Design specificity.** Still authored, not templated:
- numbered paper cards;
- the facts-and-contents rail;
- labelled hairline lists;
- one gold full stop;
- the real TS-A gallery;
- no gradients, icon tiles, rounded cards or faux-technical captions.

The generic leftovers:
- the home hero (dark copy block + stock robot line, with a ~320px dark gap at x 520–840 at 1440);
- stock photos on the industry service heroes;
- the sales-sentence headings restored from the Squarespace export. A dossier titles its sections; it doesn't stack slogans.

---

## 3. Fixed since review 5 (confirmed on screen and by measurement)

| Item | Status |
|---|---|
| P0-1 Home packages | **Fixed.** ZH shows 3 package rows + a closed disclosure; body headings are h3; nothing repeats (`zh-home-packages-open-390`). SK/EN teaser labels are gone. |
| P0-2 Facts | **Fixed.** Only on SK/EN permits; one typography; unique labels. |
| P1-1 Source headings | **Fixed as specified, with side effects** (stacks, price heading, h1 restatements; see P0-3). |
| P1-2 Scroll-spy | **Fixed.** No current entry at load; the last entry is current at the bottom. |
| P1-3 Slovak typesetting | **Partial.** One-letter words and dashes are bound (B: no SK line ends in a one-letter word or starts with "–" on 9 routes × 3 widths). Remaining: spaced slashes, a line starting with "/", category letters bound the wrong way, "No / 1321/2014" split (P1-1). |
| P1-4 Capabilities | **Fixed.** Content-sized rows at 390/640; the closing rule runs full width on EN. |
| P1-5 Labels and lists | **Fixed** on instruments and risk. One leftover: SK consulting "Systémy EX" (capital) in a lowercase list (P1-1). |
| P1-6 Mobile menu | **Fixed.** Every row is 57px. |
| P1-7 Tabs | **Fixed.** The current tab starts at x = 68 at 390, with the previous tab visible. |
| P1-8 E-mails | **Fixed.** One line at 1080, no meta, breaks only after "@". |
| P2-1 Hairline gap | **Fixed.** 64 / 40px. |
| P2-2 16:9 hero | **Partial.** Two-line titles are fine; one-line titles still leave ~190px of dead space (`sk-risk-desktop` y 275–465). DESIGN changes the rule (P1-3). |
| P2-3 Contact rhythm | **Fixed.** |
| P2-4 Privacy link | **Fixed at ≥640, broken at 390.** The arrow detaches (P1-2). |
| P2-5 Rail two lines | **Broken.** The clamp leaks a third line (P0-2). |
| P2-6 ZH dash / % | **Fixed** (native check pending). |
| P2-7 Token hygiene | **Fixed.** |
| P2-8 / P2-9 / P2-10 | **Fixed.** |
| Owner 3, 11 | Maintenance no-photo hero applied; partners crop fixed (first logo at x ≈ 511). |

## 4. Regressed / still drifting

**Regressions in v5:**
1. **EN instruments lead.** `src/content/pages/en/instruments.md:6` puts the literal `### ` into `description`. → P0-1
2. **Rail clamp leak.** `global.css:992–1003` has the padding and `-webkit-line-clamp` on the same `<a>`. → P0-2
3. **Heading stacks, price as h2, headings that restate the h1.** These come from the restoration rule. → P0-3
4. **Privacy link at 390.** `.text-link { display: inline-flex }` (`global.css:442`) stretches a wrapped link to full width. → P1-2
5. **Category-letter binding.** `scripts/rehype-typography.mjs:9` binds a capital "A" forward. → P1-1

**Still drifting:**
- one-line hero dead space (P1-3);
- Prose H2 too large at 390 (P1-4);
- rail baseline when the article opens with a heading (P1-5);
- the ZH hero line starting with 的 (P1-6);
- footer rhythm at 1080 (P2-1);
- owner items in §6.

---

## 5. Fix list

Pixel positions are at 1440 unless stated. Container 1312px, 12 columns, 24px gap → column width 87.33px. Column n starts at x = 64 + (n − 1) × 111.33: col 1 = 64, col 5 = 509, col 8 = 843, col 10 ends at 1153, col 12 ends at 1376.

**Builder count: P0 = 3, P1 = 6, P2 = 6.** Items tagged (owner) are listed again under Owner decisions and are **not** in that count.

### P0: blocks "genuinely neat"

#### P0-1 EN instruments: rebuild the page under the round-6 rules
**Where:**
- `src/content/pages/en/instruments.md`;
- `src/data/downloads.ts` (the instruments order form);
- `scripts/qa-layout.mjs` and `scripts/qa-source-headings.mjs`.

**Wrong:** at 1440 (local capture of `/en/aviation/instrument-testing/`):
- **Hero lead (y ≈ 328):** "### Come for inspection of avionics to Žilina (LZZI/ILZ), or we will come to you."
- **Repeated title:** the article opens with h2 "Aviation instrument testing", which equals the h1.
- **Heading stacks:**
  - h3 "Testing of avionics IS mandatory" sits directly on the h2 "Testing Service division Aviation offers services … EASA" (107 characters, 3 lines);
  - later h2 "The question is: will you come to us or will we come to you?" → h3 "Aviation Testing Center" → h3 "Come for inspection…" → h3 "We will come for inspection…" → h4 "We need:" (five headings, no text between them).
- **Rail:** 10 entries.
- **Order form:** it is a prose bullet "Individual (download) · SK" and is therefore missing from the downloads list. On SK it is the first download row.

**Target** (words from `_source/pages/aviation-testing-service-2.md`; only structure and typography change):
1. **Lead:** `description: "Come for inspection of avionics to Žilina (LZZI/ILZ), or we will come to you."`
2. **Article body**, in order:
   - Drop the h2 equal to the h1 (DESIGN › Heading Restoration Rule, "equal to the page h1").
   - `## Testing of avionics is mandatory` (sentence case, Source Typography Rule) → `### Testing Service division Aviation offers services tailored to meet specified requirements according to EASA` (a two-deep stack: 16px between them, and only the h2 in the rail) → paragraph "Put your aircraft in a group and you have unbeatable prices." (add the full stop).
   - `## Contact us, we will answer you` → paragraph "Completed order send to info.aviation@testing-service.org." Remove the "### Download order form" heading and its one-item list: after the form moves to downloads, that heading is empty.
   - `## The question is: will you come to us or will we come to you?` Drop "Aviation Testing Center" (an empty source heading; the name stays in the footer). The two option headings become a prose list of stand-alone fragments: "- Come for inspection of avionics to Žilina (LZZI/ILZ)." and "- We will come for inspection with our inspection vehicle to you." Then the prose label "We need:" as an **h3 element styled with the H4 token**, then the existing four-item list.
3. **Downloads:**
   - Give the `TS-AObjednavkaFinal_2024.xlsx` entry in `downloads.ts` a `titleEn: "Avionics test order · 2024"`. This is a translation of the existing SK title, used as a UI label, like the other `titleEn` values. If that counts as new copy, keep the SK title and show `XLSX · SK` meta.
   - The row is then the first downloads row on EN as on SK (kind `form`).
4. **Expected rail:** "Testing of avionics is mandatory", "Contact us, we will answer you", "The question is: will you come to us or will we come to you?", "Downloads and links" (4 entries).
5. **QA (new, every route and language):**
   - no hero lead or card description contains `#`, `*` or `[`;
   - no prose heading equals the h1;
   - no run of more than two consecutive prose headings;
   - the instruments pages in both languages list the order form first in downloads.
   - Add `en-aviation-testing-desktop.jpg` and `en-aviation-testing-mobile.jpg` to the capture set.

#### P0-2 Rail: clamp on an inner span, so no third line ever shows
**Where:**
- `src/layouts/Layout.astro` (rail entry markup);
- `src/styles/global.css:992–1003`.

**Wrong:** every two-line-clamped entry shows the top 3–5px of its third line inside the 8px bottom padding:
- `sk-service-desktop` x 89–320, y 935–942;
- `sk-risk-desktop` y 748 and 808;
- `sk-aviation-desktop` y 818;
- `sk-maintenance-desktop` y 685.

**Target** (DESIGN › Article › rail, "Clamp anatomy"):
```css
.contents a { display: block; padding: var(--space-2) 0 var(--space-2) var(--space-3); /* rule + current state stay here */ }
.contents a .rail-text { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
```
- Markup: `<a …><span class="rail-text">{text}</span></a>`, with `title` kept on the `<a>`.

**QA:** for every `.rail-text`, `getBoundingClientRect().height ≤ 2 × 14 × 1.55 + 0.5` (43.9px). No entry's `scrollHeight` exceeds its box without the ellipsis.

#### P0-3 Content structure: finish the Heading Restoration Rule on every article
**Where:**
- `src/content/pages/sk/{aviation,instruments,maintenance,consulting}.md` and their EN counterparts;
- `global.css` `.prose` heading margins;
- the rail entry builder in `Layout.astro`;
- `scripts/qa-source-headings.mjs`.

DESIGN refined the rule (Typography › Heading stack; Heading Restoration Rule: data line, empty heading, heading equal to / starting with the h1, prose-label level).

**Wrong → target, page by page:**

| Page | Wrong (1440 unless noted) | Target |
|---|---|---|
| SK maintenance | `## 250 hod./500 hod./Revízia (kontrola) magnet … 4300/6300: 236 €*/ks` renders as a 3-line Prose H2 (x 509–970, y 790–885); 5 lines at 390 (`sk-maintenance-mobile` y 810–980); its rail entry is clipped. | A **key line**: `<p class="key-line">` in the List token (17/500/1.4, `ink`), 24px above, then "*bez DPH" as `<p class="small muted">` 4px below it, then the paragraph at the normal 16px. Not in the rail (the rail is "Naša špecializácia", "Na stiahnutie a odkazy"). Words and series numbers unchanged (owner item 1). |
| SK instruments | h2 "Skúšky avionických systémov sú povinné" restates the h1 (y 681); h2 "Aviation Testing Center" → h3 "Pre pilotov…" → h4 "Počas prevádzky TWR:" stack (y 816 / 887 / 946). | First line becomes a Body paragraph "Skúšky avionických systémov sú povinné." (starts with the h1), followed by "Vyplnený formulár odošlite na …". Drop the empty "Aviation Testing Center" h2. "Pre pilotov: organizácia pri prílete" becomes the h2. The four labels ("Počas prevádzky TWR:", "Mimo prevádzky TWR:", "Potrebujeme:", "Majte prichystané:") become **h3 elements styled with the H4 token**. Rail: "Pre pilotov: organizácia pri prílete", "Na stiahnutie a odkazy". |
| SK aviation index | h2 "Pre bezpečné vykonanie letu…" → h3 "Preto je periodické preskúšanie…" with a 40px gap and both in the rail; "Naše služby" h2 → "Aviation Testing" h3 likewise (y 1366–1437). | Keep both stacks (two deep is allowed), with **16px** between the two headings (`.prose :is(h2,h3,h4) + :is(h3,h4) { margin-top: var(--space-4) }`). The rail omits the second heading of each stack: "Preto je periodické…" and "Aviation Testing" (it sits directly under "Naše služby"). "Aviation Service" follows prose, so it keeps its entry. |
| EN aviation index | "Our offer" h2 → "Aviation Testing" h3. | Same stack spacing and rail rule. |
| SK consulting | h2 "Prevádzkovateľ: Prísna kontrola technológie pred prevzatím" → h3 "Zabezpečenie, že platíte…" with a ~56px gap (local capture y 671 → 742). | 16px stack spacing; the h3 drops out of the rail. Heading case after the colon follows sentence case: "Prevádzkovateľ: prísna kontrola technológie pred prevzatím". |
| EN instruments | see P0-1 | P0-1 |
| All articles | — | Run the refined rule on every article (SK/EN permits, consulting, risk, inspections, aviation, instruments, maintenance) and record per page in the implementation notes: headings dropped (equal to h1 / empty), converted (key line, Body), labels re-levelled, stacks kept. |

**QA:**
- no `.prose` run of three consecutive headings;
- the second heading in a two-heading run sits 16 ± 1px below the first heading's last line box;
- no prose heading's text equals the h1 or starts with the full h1 text;
- no prose heading contains "€", "%" or a "digit + unit" pattern;
- every h4-styled label sits exactly one level below its section heading (no skipped level);
- rail entries = h2/h3 minus second-of-stack minus labels.

### P1: visible inconsistency or a broken promise

#### P1-1 Typography transform: labels, slashes, numbers, compounds (DESIGN › Wrap Rule)
**Where:** `scripts/rehype-typography.mjs` (`typography()`), plus content fixes in `src/content/pages/sk/*.md` and `en/*.md` and `src/data/home.json`.

**Wrong:**
- "Kategória / A vyhradených" (`sk-service-mobile` y ≈ 1752–1772; `sk-service-640` y ≈ 1558): the category letter is bound forward, as if it were the conjunction "a".
- A line starts with "/" at 390 (`sk-risk-mobile` y ≈ 1175, "Slovenskej / Českej").
- "No / 1321/2014" (`sk-aviation-mobile` y ≈ 1585).
- "výchovno- / vzdelávacie" splits at its hyphen (`sk-home-1080` x 718, y ≈ 2407; also at 640); "third- / party" in the EN card (`en-home-640` y ≈ 345).
- Spaced slashes between single words remain, right next to "a/alebo" on the same page.

**Target:**
1. **Capital-letter labels.** Bind an uppercase single letter to the *preceding* word when it is not sentence-initial:
   - `text.replace(/([^\s.!?:„(])(\s)([AIKOSUVZ])(?=[\s,.)])/g, '$1 $3')`;
   - apply it **before** the forward pass, and restrict the forward pass to lowercase letters plus capitals at the start of a node or after `„`, `(` or `[.!?:] `.
   - Covers "Kategória A", "skupiny A", "sk. A", "TWY A".
2. **Slash.** `/ \/ /g` → `' / '` (no line starts with "/").
3. **Numbers.** `/\b(č\.|No|Nr\.|sk\.) (?=[\dA-Z])/g` → `'$1 '`.
4. **Compounds.** In headings, list rows, card text and capabilities only (not `.prose p`), replace the hyphen in `\p{L}{2,}-\p{L}{2,}` compounds of ≤ 24 characters with U+2011.
5. **Content: unspace single-word slashes** (Source Typography Rule; the words stay):
   - `sk/permits.md:29` "revízie/úradné skúšky";
   - `sk/risk.md:17` "Slovenskej/Českej republiky";
   - `sk/consulting.md:38` "STN/ČSN";
   - `sk/consulting.md:44` "CZ/SK";
   - `sk/home.md:43` "produktu/technológie";
   - `sk/home.md:45` "produkt/technológia";
   - `sk/home.md:48` "obsluhy/opravy";
   - then `grep -n ' / ' src/content/pages/{sk,en}/*.md src/data/home.json` and apply the same to every single-word pair. Multi-word alternatives ("IFR check / VFR check") keep their spaces and get the binding from item 2.
6. **Content: list case.** `sk/consulting.md` "Systémy EX pre…" → "systémy EX pre…" (one list, one style).

**QA:** extend the Range-rect line check (SK 390/1440) so that no line starts with "/", no line ends in "Kategória", "skupiny", "sk." or "TWY" with the letter on the next line, and no line ends with "No" or "č.".

#### P1-2 Text links: one icon binding (DESIGN › Buttons › One icon binding)
**Where:**
- `global.css:442–455` (`.text-link`);
- `src/components/ContactForm.astro:76–80`;
- the card link and clients-strip link markup;
- the existing `FooterLink.astro` nowrap helper (reuse it).

**Wrong:** at 390 the privacy link wraps to two lines and its → sits at x ≈ 338, the far edge of the form panel, 120px from the word it belongs to (`sk-contact-mobile` x 44–345, y 988–1022).

**Target:**
- `.text-link { display: inline-block; padding-block: calc((var(--hit-height) - 1lh) / 2); }` (no `inline-flex`).
- Render the label as `…<span class="nowrap">{lastWord}&nbsp;<Icon/></span>`, with the lang tag inside the nowrap span when present, exactly like the footer.
- Icon gap 8px.

**QA:** at 390, the gap between every `.text-link` icon and the right edge of its last text line is 8 ± 1px; the hit height is ≥ 44px.

#### P1-3 Page-hero photo height follows the copy (DESIGN › Photography › Ratios)
**Where:** `global.css` `.page-hero > img` (desktop block), `<Photo>` widths for the hero.

**Wrong:** a one-line h1 + one-line lead beside a 533 × 300 photo leaves 190px of empty paper under the lead:
- `sk-risk-desktop` x 64–760, y 275–465;
- `sk-service-desktop` y 335–465 (130px with a two-line h1).

It is the most template-looking composition left after the home hero.

**Target, at ≥1080 only:**
- `.page-hero > img { align-self: stretch; width: 100%; height: auto; min-height: 240px; max-height: 300px; aspect-ratio: auto; object-fit: cover; }`.
- Resulting heights: risk/contact-like heroes 240px; permits (two-line h1) 240px; aviation pages with a button ≈ 240–300px.
- Below 1080px: unchanged (3:2, capped at `min(50svh, 400px)`).
- Keep the Resolution Rule (crop, never upscale: a 533 × 240 crop of the 3:2 derivatives needs no new widths).

**QA:**
- at 1440 on every photo hero, photo height = clamp(240, copy-column height, 300) ± 1;
- the empty space under the lead is ≤ 240 − copy height;
- the hero hairline gap stays 64px.

#### P1-4 Prose H2: fluid size
**Where:** `global.css` prose h2 rule, `src/data/tokens.ts` (`prose-h2`).

**Wrong:** fixed 28px. At 390, restored headings run 4–5 lines (`sk-risk-mobile` y 1060–1190 "Dodržujete…": 4 lines; `sk-aviation-mobile` y 825–925: 3 lines, then a 3-line h3).

**Target:** `font-size: clamp(1.5rem, 1.3rem + 0.8vw, 1.75rem)` (24px at 390, 28px from ≈ 1100px); lh 1.25 and −0.015em unchanged.

**QA:** the type-token check accepts 24–28px for `.prose h2`; at 390 the computed size is 24 ± 0.5px.

#### P1-5 Rail baseline when the article opens with a heading (DESIGN › Baseline Rule)
**Where:** `global.css` rail `padding-top`, `Layout.astro` (add `.rail--heading-first` when the first `.prose` child is a heading).

**Wrong:** on the aviation index, SK instruments and maintenance the article opens with a Prose H2, and the rail keeps the 6px offset computed for a 17px paragraph. The Label visibly sits on a different line from the h2 beside it (`sk-aviation-desktop` label y ≈ 677 vs h2 y ≈ 681; `sk-maintenance-desktop` ≈ 566 vs ≈ 570). Measure the exact baseline offset; the current QA only checks the paragraph case.

**Target:** compute the offset so the Label's first baseline equals the h2's first baseline. At 28/1.25 vs 12/1.3 that is ≈ (35 − 15.6)/2 + (cap-height difference); measure and set it as a token `--rail-offset-heading`. After P0-3 some of these pages open with a paragraph again; the class must follow the first child.

**QA:** extend the existing Baseline check: |label baseline − first prose baseline| ≤ 2px on every article, whichever element comes first.

#### P1-6 ZH home hero: no line starts with 的
**Where:** `src/pages/[...path].astro:158` (`.split(/(?=在捷克|和斯洛伐克|的法律合规要求)/)`).

**Wrong:** line 3 of the display h1 starts with the particle 的 at every width ("的法律合规要求." at `zh-home-desktop` y 418–480, `zh-home-mobile` y 250–295). A Chinese reader sees that as a broken line.

**Target:** split at phrase boundaries that keep 的 with its noun phrase: "管理您技术 / 在捷克和斯洛伐克的 / 法律合规要求" (`.split(/(?=在捷克和斯洛伐克的|法律合规要求)/)`). The characters are unchanged; only the line breaks move. List it for the native check (owner item 8).

**QA:** no `.hero h1 span` text starts with 的, 了 or 和.

### P2: neatness and rhythm

#### P2-1 Footer link rhythm (DESIGN › Footer rhythm)
**Where:** `global.css` footer list rules, `FooterLink.astro`.

**Wrong:** at 1080 a wrapped link ("Zabezpečenie povolení / a schválení", "info.aviation@ / testing-service.org") has ~6px to the next item, while one-line links sit on a 32px pitch (`sk-home-1080` x 552–1026, y ≈ 3645–3760).

**Target:**
- the list is `display: grid; row-gap: var(--space-2)`;
- links `min-height: 24px` at ≥1080 and 44px below, `display: inline-block`;
- no 32px min-height.

**QA:** at 1080 and 1440, the vertical distance from each footer link's last line box to the next link's first line box is 8 ± 1px.

#### P2-2 ZH footer: one lang tag per column (DESIGN › Lang tags in a footer column)
**Where:** `Layout.astro` footer columns 3 and 4; `LangTag.astro`.

**Wrong:** the ZH footer carries 9 "EN"/"SK" boxes, one on every link (`zh-home-desktop` y ≈ 3500–3600). Together with the cards, teaser and CTA, the ZH home shows ~15 boxed tags.

**Target:**
- when every link in a column targets the same other language, render the tag once after the column heading (`我们的服务 EN`, `航空 EN`) and none on its links;
- the legal column (GDPR → SK, Accreditations → SK) gets `公司信息` + one SK tag only if all its links go to SK; otherwise keep per-link tags;
- cards, teaser and CTA are unchanged.

#### P2-3 Form labels on the `field-label` token
**Where:** `global.css` `.form-row > label`, `tokens.ts`.

**Target:**
- add `--text-field-label: var(--text-small)`, `--weight-field-label: 500` and `--leading-field-label: var(--leading-small)`, and use them;
- the type-token QA lists `field-label` (14/500/1.55) as a token.

No visual change.

#### P2-4 Breadcrumb hit width at <1080
**Where:** `global.css` breadcrumb links (`.breadcrumb a`).

**Wrong:** "Úvod" 32 × 44, "Služby" 42 × 44, "Home" 38 × 44 at 390 (B).

**Target:** `min-width: var(--hit-height); display: inline-flex; align-items: center` with the text left-aligned. The visible position is unchanged; the extra width goes to the right before the "/" separator, which moves by at most 12px. Then check that the separator spacing stays 8px from the text (use `margin-inline` on the separator, not on the link).

#### P2-5 Home hero photo at 390: no fractional upscale
**Where:** `[...path].astro` home hero `<Photo>` `widths` / `sizes`.

**Wrong:** displayed 390 × 260 from a 390 × 256 candidate (1.02×; B).

**Target:** the 1× candidate for a 390px slot is ≥ 400w (emit 480w and keep `sizes="100vw"` below 1080).

**QA:** the existing no-enlargement check uses ≥ 1.00 for both dimensions of a `cover` image (rendered box vs the intrinsic size scaled to cover).

#### P2-6 Card links and the clients-strip link use the P1-2 binding
**Where:** `.card-content .text-link` (`global.css:788`), the clients strip "Referencie EN →".

**Target:** the same `nowrap` last word + tag + icon span, so at 540–640px (2-column cards) "Podrobnosti →" / "详情 EN →" can never strand the icon. No visual change at current widths; it closes the pattern.

### Owner decisions (not for the builder; not in the P0/P1 count)
1. **Slick series** 4600/6300 vs 4300/6300 (carried), and "Bendix King serie" vs "série". Also **(owner)**: merge the source-split maintenance bullets "500 hodinové a generálne opravy magnet typ" + "Bendix King serie S20/S200 a Slick série 4300/6300" into one item. The source breaks one phrase across two bullets (`sk-maintenance-desktop` y 617–649). DESIGN keeps Markdown list structure, so this needs approval.
2. **Maintenance hero photo (owner, P1).** A real TS-A magneto or bench photo, so the three aviation tabs share one hero type. Until then the hairline sits 111px higher than on the sibling tabs at 1440 (y 487 vs 598).
3. **EN instruments copy.**
   - "Contact us, we will answer you" is a call-to-action heading that the footer closing already makes. Keep it or drop it.
   - The source says "unbeatable prizes" and the site says "prices". Confirm the correction.
4. **Aviation naming** (carried): "Aviation Testing / Aviation Service" (source H3s) vs the tab labels; "Aviation Testing Center" for both the gallery and the (now dropped) instruments h2.
5. **SK home source carries the supplier package twice** in two wordings (carried), with an unclosed "(dodatočne k EU smernici".
6. **Pilot "letisko AIP" link** points to AIRAC 193 (May 2018) (carried).
7. **Card descriptions that restate titles** (carried): "Poradenské služby – technické štandardy a legislatíva", "Inšpekcie, testovanie, certifikácie."
8. **Native ZH check:**
   - P1-6 hero line breaks;
   - the ZH supplier-teaser sentence "本服务专为…", which now reads as the last line of 红星计划 in the open disclosure (`zh-home-packages-open-390` y ≈ 4200): move it under 供应商套餐 and add 。;
   - the round-5 strings (`packages` 运营商与供应商服务, `all` 全部服务, dashes, 100%);
   - the English hero eyebrow and footer tagline;
   - a ZH aviation-teaser lead (the teaser is h2 + button beside a 430px image, x 843–1376, y ≈ 2445–2840).
9. **Phone number, form endpoint and success state** (carried).
10. **EN references:** "Trusted by industry leaders." and the link text "here" (carried).
11. **Footer closing line** exists only on risk and inspections (carried).
12. **Permits rail shows "Naše služby" next to "Ďalšie služby"** (`sk-service-desktop` y 1035–1072). The source h2 "Naše služby" inside a service page reads like the home section. A better heading is owner copy.
13. **Gallery:** 3 of the 8 featured cells show the same yellow cases (low).
14. **Partners image at 390** is illegible (`sk-aviation-mobile` y ≈ 2625–2675). A stacked or larger asset would fix it.
15. **Contact lead** "Testing Service s.r.o. · Martin, Slovensko" repeats the H3 and address beside it (low).

---

## 6. Order of work and acceptance

1. **P0-1 to P0-3.** Re-shoot:
   - `sk-aviation-desktop`, `sk-aviation-mobile`;
   - `sk-aviation-testing-desktop`, `sk-aviation-testing-mobile`;
   - `sk-maintenance-desktop`, `sk-maintenance-mobile`;
   - `sk-service-desktop`, `sk-risk-desktop`;
   - new: `en-aviation-testing-desktop`, `en-aviation-testing-mobile`, `sk-consulting-desktop`.
2. **P1-1 to P1-6.** Re-shoot `sk-service-mobile`, `sk-risk-mobile`, `sk-contact-mobile`, `sk-home-1080`, `zh-home-desktop`, `zh-home-mobile`.
3. **P2-1 to P2-6.**
4. `npm run build` (includes `check:layout`) and `npm run check:links` pass.
5. **New or changed checks:**
   - no Markdown syntax in leads or descriptions;
   - no heading equal to or starting with the h1;
   - no run of more than two headings;
   - 16px stack gap;
   - no data line as a heading;
   - labels one level below their section;
   - rail clamp height ≤ 2 lines;
   - rail entries exclude second-of-stack;
   - line-start "/" and category-letter checks;
   - text-link icon gap 8px at 390;
   - hero photo height = clamp(240, copy, 300) at 1440;
   - `.prose h2` 24px at 390;
   - rail baseline ±2px whatever the first element;
   - no ZH hero line starting with 的;
   - footer 8px link gap.
6. **Screenshots** to `docs/review/shots-v6/`, with the v5 filenames plus `en-aviation-testing-desktop.jpg`, `en-aviation-testing-mobile.jpg` and `sk-consulting-desktop.jpg`.
7. **In the implementation notes:**
   - the per-page heading diff for P0-3 (dropped, converted, re-levelled, stacks kept);
   - every content line changed for P1-1;
   - the ZH line-split change for the native check.
