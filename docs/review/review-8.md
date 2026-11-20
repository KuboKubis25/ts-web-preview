# Design review 8: v7 critique and audit

Reviewer run 2026-11-20 against:
- `docs/review/shots-v7/`: all 66 captures (1440, 1080, 1024, 640 and 390, plus the dropdown, menu, tab, ZH viewport and packages-open states);
- `src/` at commit `5cb374c`;
- a local `npm run build` (pass; `check:layout` 23 routes × 5 widths, 46 axe runs, 0 failures) and `npm run check:links` (pass; 50 pages, 1,634 internal URLs/assets/fragments, 27 redirects).

**Method.** Dual-agent, isolated, as in reviews 5–7:
- **A:** a design-director review of every v7 capture against DESIGN.md, PRODUCT.md, `src/` and `_source/pages`.
- **B:** `impeccable detect` on `src/` and `dist/`, plus a live detector injection on 5 routes at 1440 and 390. B also ran a Playwright measurement pass: computed type per role, container edges, section padding, target sizes, contrast, overflow, image loading and token counts.

The parent reviewer looked at the key captures independently (home, permits, aviation index, contact, references, 404, legal, risk, consulting, ZH viewports, mobile menu and tabs). It then checked every claim below against the source files or the captures. Where A and B disagree, this report says which was right.

**Contract.** DESIGN.md was refined this round; see "Changes in round 8" at its end. Where this review and DESIGN.md disagree, DESIGN.md wins.

---

## 1. Verdict

v7 implemented review 7 faithfully, and everything it asked for now renders:
- **ZH hero:** sets 管理您技术 / 在捷克和斯洛伐克的 / 法律合规要求 at 1440, 1080 and 1024.
- **Breadcrumb:** separators sit 8px from the text on both sides at 390, 640 and 1024.
- **Prose H3:** fluid, 19px at 390, so an H2 → H3 stack is clearly stepped on a phone.
- **Footer:** a calm 44px pitch below 1080, and the contact-page footer has no e-mail rows.
- **Aviation rail:** lists both sibling sections.
- **Hero photos:** the photo floor is 200px.

The layout is clean by measurement:
- every container edge is shared to the pixel (64 / 509 / 843 at 1440, 20 at 390);
- no route overflows;
- axe reports 0 violations;
- CLS stays below 0.007.

The site now reads as one authored system: an inspection dossier with numbered cards, a facts and contents rail, hairline download rows with `PDF · EN` meta, one coloured full stop per h1, the same footer everywhere, and a complete gold → aviation-blue accent swap.

What keeps v7 from "genuinely neat" falls into three groups:

1. **Side effects of round-7 rules.** These are this round's regressions.
   - **EN home h1:** opens with the single word "Managing" on line 1, about 255px against a 590px second line (`en-home-desktop`, the first thing an English visitor reads). Cause: a hand-placed `nowrap` span around "Czech and Slovak", added only to meet review 7's ≤230px h1-to-photo gap metric.
   - **EN risk hero lead:** breaks at the hyphen, "independent third- / party assessment". Cause: balanced leads plus a non-breaking-hyphen rule that covered headings but not leads.
   - **EN maintenance:** a ~200px rag, because "Bendix King series S20/S200" was bound into one 27-character unbreakable run.
2. **Content structure drift between language versions:**
   - EN inspections renders the training list that SK shows as four bullets as a dash-glued run-on with the link glued on ("…Lifting Devices and Technology See detailed list…");
   - the same page has "commissioning.In addition";
   - SK inspections' list lead-in has no colon, and its genitive completions are capitalised;
   - the SK legal page says "Slovakia".
3. **A system rule that contradicted the product.** DESIGN's "omit a download row that repeats an inline link" removed the accreditation PDF, the only industry document, from the inspections page. Every industry page therefore ships zero paperwork, against PRODUCT principle 5 ("Paperwork is a feature").

Smaller items:
- the 404 hero's hairline sits directly on the dark footer;
- the EN inspections breadcrumb wraps to two lines at 390;
- ZH `.statement` keeps −0.3px Latin tracking;
- the link-only list items "Mapa." and "Letisko AIP." carry full stops.

**The plateau, honestly.** The critique total is 24/32 again, but for different reasons: every review-7 deduction is resolved. About 40% of the remaining deductions are **owner-blocked**:
- the mailto-only form with no success state (heuristics 5 and 9, which cap at 2 without an endpoint);
- the Slick series conflict;
- the native ZH check;
- the missing magneto photo;
- source-copy errors.

Builder work alone can reach about 27/32. Beyond that, the next gains need the owner decisions in section 7, not more system rules.

**A process note.** Three of this round's regressions came from QA metrics that were tuned to pixels: a gap of ≤230px, and "bind the make to its series". DESIGN.md now states acceptance as typographic outcomes instead: no one-word line, first line ≥ 50% of the widest, no bound run over 24 characters, no line ending in "-" or "&". Pixel coordinates in DESIGN are illustrations, not targets.

---

## 2. Scores

### Critique: Nielsen heuristics (Persuade/Read surface; 7 and 10 n/a, as in reviews 5–7)

| # | Heuristic | Score | Key issue |
|---|---|---|---|
| 1 | Visibility of system status | 4 | Rail lists both aviation sibling sections; nav, tab, switcher and breadcrumb current states are correct in both accents. |
| 2 | Match system / real world | 3 | EN source errors on key pages: "No 2018/1139 **a** No 1321/2014" and "Comissioning" (owner). "commissioning.In" (builder). "Slovakia" on SK legal. Slick 4600 vs 4300 (owner). |
| 3 | User control and freedom | 4 | Disclosures ship closed; menu, dropdown and tabs behave. |
| 4 | Consistency and standards | 3 | Same content, different structure in SK and EN inspections. The 404 page breaks the Hairline Adjacency Rule. The breadcrumb wraps on one route. Facts appear only on permits (owner). |
| 5 | Error prevention | 2 | The form only opens a mail client (owner). |
| 6 | Recognition rather than recall | 3 | Industry pages have no download list, so the accreditation PDF is reachable only through an inline "tu"/"here" link or the footer. The risk rail has 7 sentence-length entries (owner: short titles). |
| 8 | Aesthetic and minimalist design | 3 | EN hero "Managing" orphan. EN risk lead "third-/party". The maintenance rag. Risk leaves ≈94px of empty paper under a one-line lead. The ZH teaser is an h2 and a button beside a 430px image (owner lead). |
| 9 | Error recovery | 2 | No success or fallback state after "Otvoriť e-mail" (owner). |
| | **Total** | **24/32 (75%)** | **Good; flat** (v1 20 → v2 21 → v3 22 → v4 22 → v5 23 → v6 24 → v7 24). Every review-7 deduction is fixed; new deductions come from round-7 side effects and EN content drift. P0-1 and P1-1…P1-5 move heuristics 4 and 8 to 4 (26/32); P1-2 lifts 6. |

**Cognitive load: 1 of 8 checks fails (low; was 2).**
- **Fails: chunking.**
  - EN home shows 11 capability rows in one run at 390; three of them are aviation items inside an industry package list (owner: capability grouping).
  - The risk rail is 7 sentences.
- **Now passes: visual hierarchy at 390.** Prose H2 24px against Prose H3 19px.
- **Also passes:** single focus, grouping, one thing at a time, minimal choices, working memory, progressive disclosure.

**Emotional journey.**
- **Peaks:**
  - the SK and ZH home claims;
  - the permits first screen (facts, rail, measured prose);
  - SK instruments as a pilot checklist with the order form as the first download;
  - the real Žilina gallery;
  - the contact form;
  - a footer that is identical and calm on every page.
- **Valleys:**
  - the EN hero's lone "Managing";
  - "third-/party" in the EN risk hero;
  - the EN inspections run-on list;
  - a plant officer finding no document on any industry service page;
  - the ZH visitor meeting an "EN" tag on almost every click (owner, inherent to the language scope);
  - the SK aviation page at 390 still opening with 6 lines of heading (accepted in round 7; owner short titles).

### Audit: technical

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 4 | axe: 0 violations (46 build runs plus B's runs). Every text pair is ≥4.5:1; the lowest is gold on stone at 4.80. Focus ring is visible on every focusable element, accent-on-dark on dark bands. Breadcrumb links measure 22px tall by bounding box, but the ::after pseudo-element provides the 44 × 44 hit area (B's "<24px" flag is a false positive of bounding-box measurement). |
| 2 | Performance | 4 | CSS 7.9 KB transferred, no JS bundle, fonts 75.5 KB, home images 269 KB, lazy gallery (11 of 65 images fetched initially). Max CLS 0.0066. Two noisy hints: `fetchpriority` on a non-hero home image and `fetchpriority="auto"` on 62 gallery images (P2-6). |
| 3 | Theming | 4 | 197 custom properties. The only colour literals outside `:root` are the 4 `#000` mask stops (specified). Every font-size uses a token. One misuse: the mobile home-hero bottom padding reuses `--prose-h3-top` (40px, not on the spacing scale) (P2-3). |
| 4 | Responsive | 3 | No overflow anywhere. Narrow and medium-width typesetting faults: EN hero orphan at 1024–1440, lead hyphen break, breadcrumb wrap at 390, maintenance rag. |
| 5 | Implementation integrity | 3 | Build, layout QA, links and `astro check` pass. But QA asserted the wrong things: the ≤230px gap metric produced the EN orphan, and no check catches a line ending in "-" or a bound run wider than the measure allows. A DESIGN rule hid a page's only document. A code-only `.hero-place-names` rule existed with no DESIGN entry. The capture set lacks EN contact and a 404 at 1024. |
| | **Total** | **18/20** | **Excellent; unchanged.** The system is sound; the drift is in typesetting edge cases and the QA's choice of metrics. |

**Detector.**
- **`src/`:** exit 2 with 4 findings, all false positives (the same as reviews 6–7):
  - `design-system-font` ×2 for the metric-matched `Plex Fallback` faces (`global.css:2,10`), which DESIGN requires;
  - `design-system-color` ×2 for the `#000` tab-mask stops (`global.css:1752,1755`), which DESIGN specifies.
- **`dist/`:** 76 findings.
  - `cramped-padding` ×62: false positives. The static check misses the inner `.wrap`; the rendered inset is 64px at 1440 and 20px at 390.
  - `flat-type-hierarchy` ×4 on the aviation and risk articles (body 17 → label 18 → ending H3 22): real but by design. The 18px element is the H4 prose label, and the step to Prose H2 is 28px. No action.
  - `hero-eyebrow-chip` ×3 (eyebrow #1) and `kicker-above-heading` ×2 (contact "Čoskoro / Praha", eyebrow #3): allowed by the Informative Eyebrow Rule.
  - `tight-leading` ×2: heading leading by design.
  - `em-dash-overuse` (ZH `——` in service names): ZH punctuation is exempt.
- **Live injection** (5 routes × 1440/390): only the hero eyebrow and the contact kicker, both allowed.
- **No actionable detector findings.** As in review 7, this round's problems are line breaks, structure and rules, which the detector can't see.

**Design specificity.** Authored, not templated. The remaining generic tells:
- the stock-photo industry heroes (owner photography);
- the sentence-length "slogan" headings restored from Squarespace (owner copy);
- the EN references lead "Trusted by industry leaders." (owner copy).

None of them is a builder or system issue.

---

## 3. Review 7: fixed / not fixed

| Item | Status on screen (v7) |
|---|---|
| P0-1 ZH hero lines | **Fixed** at 1440/1080/1024 (管 / 在 / 法) and at 390 (4 lines, no unpaired 和). |
| P0-2 Breadcrumb hit area | **Fixed**, with separators 8px each side. New: the current item wraps on EN inspections at 390 (P1-4). |
| P1-1 Prose H3 | **Fixed** (19px at 390). SK aviation's 3 + 3 opening lines are accepted (owner short titles). |
| P1-2 Photo floor | **Fixed** (200px). Risk still shows ≈94px of empty paper (stock-photo composition, owner photography). |
| P1-3 Footer pitch | **Fixed** (44px below 1080). |
| P1-4 Contact footer | **Fixed** (no e-mail rows). |
| P1-5 Rail siblings | **Fixed**. |
| P1-6 List style | **Fixed** under headings. **Missed** where a list follows a lead-in paragraph: SK and EN inspections (P1-3). |
| P1-7 Lead balancing | Orphans gone. **Side effect:** the "third-/party" hyphen break (P1-1). |
| P2-1 Wrap transform | **Fixed** ("skupiny A", "60 %", "Bendix King"). **Side effect:** over-binding (P1-5). |
| P2-2 Button lang tag | **Fixed**. |
| P2-3 Rail baseline | **Fixed** (visually aligned; QA ±1px). |
| P2-4 `ui-current` | **Fixed**. |
| P2-5 Home hero 6/6 | **Fixed** in SK and ZH. **Side effect:** the EN h1 orphan (P0-1). |
| P2-6 Capture set | **Fixed** for every requested route. EN contact and a 404 at 1024 are still missing (P2-7). |
| P2-7 QA checks | Present, but they assert pixel targets that caused P0-1. Replaced by outcome checks (P2-7). |

---

## 4. DESIGN.md changes this round (system, not pages)

All are listed under "Changes in round 8" in DESIGN.md:
1. **Latin Display/H1 line breaks.** No hand-placed `nowrap` spans. Acceptance: no one-word line, and the first line is ≥ 50% of the widest. The h1-to-photo gap is no longer a target.
2. **Wrap Rule.**
   - U+2011 now also applies in leads, the breadcrumb and Display/H1.
   - A make and its series are not chained into one run.
   - No bound run is longer than 24 characters.
   - In English, "&" is bound to the following word.
3. **Paperwork Rule (replaces the inline-link omission).** Every document file assigned to a page is in its download list, even when the prose also links it inline.
4. **Source Typography Rule.**
   - Link-only list items take no full stop.
   - A dash-glued run of items is a list, with the same structure in every language.
   - A missing space after a full stop is restored.
5. **Breadcrumb is always one line.** The current item is ellipsised, with its full text in `title`. It repeats the h1 below it, so this is the second permitted ellipsis.
6. **Hairline adjacency.** A page hero that ends `main` (404) has no bottom hairline.
7. **CJK tracking.** Every negatively tracked style resets to 0 under `:lang(zh)`, the Statement included.
8. **Home hero below 1080.** Padding is 48px top and bottom (the old text said both "48px top/bottom" and "40px bottom").
9. **Footer e-mail placement.** One page-type × column table replaces three overlapping clauses.
10. **Contradictions removed.**
    - The page-hero photo is 200–300px everywhere (one paragraph still said 240).
    - The gallery count is derived (it was hard-coded as 57; the render shows 54).
    - The rounds 3–7 changelogs moved out of the contract (they remain in review-3…7 and in git history).
    - The 2-entry rail is now stated as intended (same article anatomy everywhere), not an accident.

---

## 5. Fix list for the builder

The P0/P1 builder count is **1 P0 + 5 P1**. Items tagged (owner) are excluded and listed in section 7. Paths are relative to the repo root. Run `npm run build`, `npm run check:links` and `npm run qa:capture` after the batch.

### P0

**P0-1: EN home h1 strands "Managing" on line 1 (regression)**
- **Where:** `src/pages/[...path].astro:174` (the EN branch `homeLead.split(/(Czech and Slovak)/)` wrapping a `<span class="hero-place-names">`) and `src/styles/global.css:1493` (`.hero-place-names { white-space: nowrap; }`).
- **Wrong:** at 1024–1440 the balanced Display h1 sets "Managing" (≈255px) above "Czech and Slovak legal" (≈590px).
- **Target:**
  - Delete the span and the CSS rule. Render `typography(homeLead, lang)` for EN like SK and ZH. No `&nbsp;` inside "Czech and Slovak".
  - Keep `max-width: 18ch` and `text-wrap: balance`.
  - Acceptance at 1024, 1080 and 1440 for the Display h1 in SK, EN and ZH: no line is a single word, and the first line's width is ≥ 50% of the widest line.
- **Fallback:** if EN still fails at one width, bind only "of&nbsp;your" (the preposition to its object), never the country pair.
- **QA:** remove the ≤230px h1-to-photo gap assertion; it was the cause.

### P1

**P1-1: A hyphen can break inside leads, breadcrumbs and Display/H1**
- **Where:** `en-risk-desktop`, hero lead "Uncompromising, unbiased and independent third- / party assessment…". The U+2011 step in the shared typography transform (the helper used for remark, `home.json` and `ui.ts`) only runs for list rows, cards and headings.
- **Target:**
  - Apply the non-breaking-hyphen substitution (compounds ≤ 24 characters) to frontmatter `description`/`packageLead` leads, breadcrumb items and the Display/H1, in every language. Running prose keeps the normal hyphen.
  - QA at 390, 640, 1024, 1080 and 1440 on every route: no rendered line of a heading, lead, breadcrumb or list row ends with "-".

**P1-2: Inspections pages hide their only document (Paperwork Rule)**
- **Where:**
  - `src/data/downloads.ts:88–95` assigns `TS-Opravnenie.pdf` (title "Oprávnenie", `titleEn` "Accreditations", kind `certificate`) to page `inspections`;
  - the page renderer in `src/pages/[...path].astro` drops it because `sk/inspections.md:30` and the EN equivalent link the same file inline.
- **Target:**
  - Remove the "omit a download that repeats an inline link" logic for document files (PDF/XLSX). Keep omission only for external web links.
  - SK and EN inspections then get the "Na stiahnutie a odkazy" / "Downloads and links" block, with one row:
    - SK: "Oprávnenie", meta `PDF`, ↓;
    - EN: "Accreditations", meta `PDF · SK`, ↓.
  - The rail gets the ending entry, and the hero gets the `button-secondary` "Na stiahnutie ↓" / "Downloads ↓" (`#downloads`), like permits and aviation.
  - The inline link stays.
  - Audit every other page for the same omission and list the result in the implementation note.

**P1-3: Inspections training list: one structure in SK and EN, and a missing space**
- **Where:** `src/content/pages/en/inspections.md:23`, `:31`, and `src/content/pages/sk/inspections.md:23–30`.
- **Target** (typography and structure only; no words change):
  - **EN line 23:**
    - end the lead-in with ":" ("…professional competence of workers for operations and services of:");
    - turn the four dash-separated items into a Markdown list in the same order as SK, each lowercase with no full stop, because they complete the lead-in: "electric devices and technology", "pressure devices and technology", "gas devices and technology", "lifting devices and technology";
    - then put the link sentence as its own paragraph: "[See detailed list of training courses and accreditations here.](/s/TS-Opravnenie.pdf)".
  - **EN line 31:** "commissioning.In addition" → "commissioning. In addition".
  - **SK line 23:** add ":" to the lead-in ("…pracovníkov na operácie a služby:"). Lines 25–28 become lowercase, with no full stop: "elektrických zariadení a technológií", and so on.
  - Extend the round-7 list-style content check from "list directly after a heading" to "list directly after a paragraph", and to dash-glued runs (`/ – [A-Z]/` three or more times in one paragraph).
  - Record every changed line in the implementation note.

**P1-4: Breadcrumb wraps to two lines (EN inspections at 390)**
- **Where:** `en-inspections-mobile` y≈85–120: "Home / Services / Inspections, testing & / qualifications"; the ancestors centre vertically against two lines and "&" ends a line. `.breadcrumb` in `src/styles/global.css`, rendered by `src/layouts/Layout.astro` or the page template.
- **Target:**
  - `.breadcrumb ol { display: flex; flex-wrap: nowrap; min-width: 0 }`;
  - ancestors `flex: none`;
  - the current item `min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis` with `title` = its full text;
  - separators stay 8px from the text and the ::after 44px hit areas are unchanged;
  - bind EN "&" to the next word in the typography transform (`/ & /` → ` & `), which also fixes it in cards, nav and footer.
- **QA:** the breadcrumb is one line box (height = 1lh of Small) on every route at 390 and 640.

**P1-5: Make + series over-binding produces long unbreakable runs**
- **Where:**
  - `en-maintenance-desktop`: line 1 of the first list item ends ≈200px short of the measure;
  - `en-maintenance-mobile`: "aircraft magnetos" is left as a stub line;
  - SK maintenance shows the same pattern. Cause: the `(Slick|King)\s(?=…series)` binding in the typography helper, which chains "Bendix King series S20/S200" into one run of 27 characters.
- **Target:**
  - Bind "Bendix&nbsp;King", "series&nbsp;S20/S200" / "série&nbsp;S20/S200" / "serie&nbsp;S20/S200" and "Slick&nbsp;4300/6300" / "Slick&nbsp;(4600/6300)", but never across make → series.
  - Add a guard: drop any binding that would create a run longer than 24 characters.
  - QA: no bound run of more than 24 characters anywhere in rendered text, and the transform fixtures cover the maintenance and home capability strings in SK and EN.

### P2

**P2-1: The 404 hero hairline sits on the footer band**
- **Where:** `src/pages/404.astro` and `.page-hero { border-bottom }` in `global.css`. In `404-desktop` (y≈373) and `404-mobile` (y≈311) a `line` rule touches ink.
- **Target:** `main > .page-hero:last-child { border-bottom: 0 }`. QA: on every route, no 1px `line` rule is adjacent to the footer band.

**P2-2: Link-only list items carry full stops**
- **Where:** `src/content/pages/sk/instruments.md:20–21` ("[Mapa](…).", "[Letisko AIP](…).") and any EN or other equivalent.
- **Target:** remove the full stop after a list item whose whole content is one link. Update the list-style check to accept and require this form.

**P2-3: Mobile home-hero padding uses a prose token**
- **Where:** `src/styles/global.css:652`, `.hero-copy { padding: var(--space-7) var(--gutter) var(--prose-h3-top) }`.
- **Target:** `padding: var(--space-7) var(--gutter)`, i.e. 48px top and bottom below 1080. Desktop is unchanged.

**P2-4: ZH Statement keeps Latin tracking**
- **Where:** `/zh/` `.statement`, computed `letter-spacing: -0.3px`.
- **Target:** under `:lang(zh)`, set `letter-spacing: 0` on `.statement` and on every element using `--tracking-display`, `--tracking-h1`, `--tracking-h2` or the prose/H3 tracking tokens (one selector list next to the existing CJK heading rule).

**P2-5: Small content-consistency items (typography, no new facts)**
- **SK home title/description:** `src/content/pages/sk/home.md:6` reads "…pre vaše technológie." while the h1 and the source (`_source/pages/skmain.md:7`) say "…pre vašu technológiu." Use the source wording. Check EN and ZH the same way.
- **SK legal address:** `src/content/pages/sk/legal.md:13` "…036 01 Martin, Slovakia" on an SK page. Use "Slovensko", the string the SK footer already uses (`src/data/ui.ts`).
- **404 title dash:** `src/pages/404.astro:14` "404 — Stránka sa nenašla" uses an unspaced-style em dash. Per the Source Typography Rule use " – " (spaced en dash).

**P2-6: Image priority hints**
- **Where:** home (`TESTING_CENTER-21`, the aviation teaser image) carries `fetchpriority`; `/letectvo/` gallery images carry `fetchpriority="auto"` (62×).
- **Target:** `fetchpriority="high"` on the LCP hero image only; omit the attribute everywhere else (`loading="lazy"` stays).

**P2-7: QA and capture set**
- **Remove:**
  - the h1-to-photo ≤230px assertion;
  - any assertion that encodes a bound make+series run.
- **Add:**
  - Display/H1 one-word-line and first-line ≥ 50% checks (P0-1);
  - "no line ends with '-' or '&'" (P1-1, P1-4);
  - the bound-run ≤24 characters check (P1-5);
  - breadcrumb single line (P1-4);
  - no hairline adjacent to the footer (P2-1);
  - the download-list completeness check: every `downloads.ts` file with `page = X` is rendered on X (P1-2).
- **Captures:** add `en-contact-desktop`, `en-contact-mobile`, `404-1024`, and `en-inspections-640` (the breadcrumb). Keep every v7 filename. Write `shots-v8/` and `qa-v8.json`.

### Considered and rejected (no change)
- **Hide 2-entry rails** (maintenance, SK instruments, legal). Rejected: one article anatomy everywhere, and the rail is the downloads jump. DESIGN now says so explicitly.
- **Ending-block headings (H3 22px) vs Prose H2 (28px)** while both are first-level rail entries. Kept: the ending blocks are the dossier's appendix and read subordinate on purpose. Changing it would churn every article.
- **`flat-type-hierarchy` detector finding.** By design (H4 label 18 / ending H3 22 / Prose H2 28).
- **Mobile menu CTA with a centred label.** It is a full-width `button-primary`, the standard full-width form. No change.
- **The contact-page footer starting 64px below the band top** (B flagged it as a padding outlier). Specified in DESIGN, because there is no top row. No change.

---

## 6. Expected scores after the builder list
- **Critique:** heuristics 4 → 4 and 8 → 4 (P0-1, P1-1, P1-3, P1-4, P1-5, P2-1), 6 stays 3 (the risk rail is owner), so **26/32**.
- **Audit:** responsive → 4, integrity → 4 once the QA asserts outcomes, so **20/20**.
- **Beyond that:** only owner decisions move 2, 5, 6 and 9.

---

## 7. Owner decisions (not counted in the builder's P0/P1)

**New this round:**
1. **(owner)** EN aviation, `src/content/pages/en/aviation.md:24`: "No 2018/1139 **a** No 1321/2014" carries the Slovak "a" from the source. Change it to "and"? This is a word change.
2. **(owner)** EN permits, `src/content/pages/en/permits.md:27`: the heading "Comissioning" (source spelling) also shows in the rail. Change it to "Commissioning"?
3. **(owner)** Facts blocks for risk, consulting and inspections, so that every service page's rail has the same anatomy as permits. Values must come from each page's own source text (for example inspections "Zariadenia: VTZ – A, B, C" if the source supports it). Please supply or confirm the wording.

**Carried over** (unchanged, still blocking the remaining score):
4. **(owner)** Slick series: 4600/6300 (aviation index, home capabilities) vs 4300/6300 (maintenance).
5. **(owner)** A magneto/bench photo for maintenance. The hero type still jumps between aviation tabs (≈62px vs instruments).
6. **(owner)** Native ZH sign-off:
   - the hero lines;
   - the English UI strings on ZH pages ("Accreditations", "Slovakia", the hero eyebrow);
   - the package naming;
   - a ZH teaser lead.
7. **(owner)** Phone number, form endpoint and form success/fallback state (heuristics 5 and 9).
8. **(owner)** Short section titles to replace the sentence-length slogan headings, chiefly the risk rail (7 sentences) and the SK aviation opening at 390.
9. **(owner)** Industry documents beyond the accreditation PDF (price lists or order forms for the four service pages).
10. **(owner)** Card descriptions that only restate their titles (permits, inspections).
11. **(owner)** Pilot AIP link destination (currently a 2018 AIRAC page).
12. **(owner)** Footer closing lines: on every service page or on none (only risk and inspections have one).
13. **(owner)** Capability grouping: aviation items inside the industry package list.
14. **(owner)** The duplicated SK supplier package wording.
15. **(owner)** An English title for the Chinese-titled reference PDF on EN references.
16. **(owner)** EN references copy ("Trusted by industry leaders.", "here").
17. **(owner)** EN instruments heading "Contact us, we will answer you" and "prices".
18. **(owner)** Stock industry hero photos (risk pipes, permits paper stack, inspections lab), which are the most generic composition left on the site. Real plant photography would end the "template" read.
