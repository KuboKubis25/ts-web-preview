# Review 6 implementation

Implemented in section 6 order: P0 article structure and rail, P1 typography/links/heroes, then P2 footer/forms/touch targets/photos. `DESIGN.md` governs the result. No ArtifactBridge or Agent Room was used; no external source was changed.

## Implemented

- **P0-1:** repaired the EN instruments description; removed the repeated h1 and empty headings; kept “Contact us, we will answer you” and “prices”; changed the two travel options to list items. The order form is first in SK and EN downloads, with the approved EN label “Avionics test order · 2024” and truthful `XLSX · SK` metadata.
- **P0-2:** the two-line clamp lives on `.rail-text`; link padding, title, indentation and current-state rule remain on the anchor.
- **P0-3:** completed the article heading pass detailed below. Rail entries are extracted from rendered HTML, excluding labels and the second heading of each stack. Stacks have a 16px gap. The SK maintenance price is a List-token key line with a Small footnote 4px below. Both maintenance lists merge the source-split bullet without changing words or series numbers.
- **P1-1:** one idempotent text transform binds category letters backward, prepositions forward, labels to numbers, and spaced separators to their preceding word. Short compounds receive a non-breaking hyphen in heading/list/card contexts, with ordinary prose paragraphs left alone. URLs and email addresses are protected. Every Markdown edit for this item is recorded below.
- **P1-2:** shared `LinkLabel` uses the footer’s last-word/optional-language-tag/icon binding. Privacy links and the generated aviation detail links now use the same anatomy and 44px hit height.
- **P1-3:** desktop photo heroes follow copy height, clamped to 240–300px. Size containment prevents the image’s intrinsic height from enlarging the grid row. Desktop `sizes` accounts for a 450px-wide 3:2 derivative when a narrow column needs a 300px-high crop. Stacked photo ratios and caps remain unchanged.
- **P1-4:** Prose H2 is fluid, 24px at 390 and 28px at desktop, using the named token.
- **P1-5:** the rail class follows the actual first rendered article element. Heading-first rails use `--rail-offset-heading: 16px`; paragraph-first rails retain 6px. QA measures the actual font baselines with zero-size inline markers, including heading-first pages.
- **P1-6:** ZH hero breaks move without changing characters. An additional optional break inside the location phrase prevents the nine-character phrase from exceeding the 350px copy column at 390. See the native check below.
- **P2-1:** footer link lists use an 8px grid gap, inline-block links, 24px desktop minimum height and 44px below 1080. List typography and top alignment prevent inherited Body line boxes from adding unwanted space.
- **P2-2:** homogeneous footer columns show one language tag on the heading, including ZH services/aviation (EN) and company information (SK). Mixed destinations retain per-link tags; cards, teaser and CTA language indicators remain.
- **P2-3:** form labels use the named field-label size, weight and leading (14/500/1.55); inputs retain Body weight.
- **P2-4:** mobile breadcrumbs have a 44px minimum width and height, with separator margins of 8px. The current, unlinked item can shrink within its flex row, preventing font loading from moving the entire item to a second row. This fixed a measured 0.1025 CLS regression on SK permits.
- **P2-5:** the home photo includes a 480w candidate and keeps `100vw` below 1080. QA rejects any decoded image candidate supplying less than 1 source pixel per displayed pixel in either dimension.
- **P2-6:** card links and the clients-strip link share `LinkLabel`; the 390/640 checks include their tag/icon binding.
- **Owner 8, second bullet:** moved the existing supplier sentence under 供应商套餐 and added its final 。 only.
- **Owner 13, partial:** replaced featured `TESTING_CENTER-26%5B203%5D.jpg` with `TESTING_CENTER-03%5B180%5D.jpg` (wing-mounted test apparatus, 600 × 487 source). The former remains in the disclosure. Eight featured cells remain, with responsive, cropped derivatives and no enlargement. No new photography was generated.
- Builds now use `astro build --force`: Astro’s content store otherwise retained pre-change Markdown transforms even after their plugin source changed. This ensures the QA inspects the current typography and generated links.

## Headings changed per page

“Unchanged” below means no new drop, conversion or re-level was required by the refined rule. Existing long/multi-sentence source headings already represented as Body remain Body. All fourteen articles are checked against their `_source/pages` headings, and all routes get the rendered-outline checks.

| Page | Dropped / converted / re-levelled | Two-heading stacks retained |
| --- | --- | --- |
| SK permits | Heading words and levels unchanged; typography only. “Naše služby” retained as instructed. | None. |
| EN permits | Unchanged. | None. |
| SK consulting | Sentence case: “Prevádzkovateľ: Prísna kontrola technológie pred prevzatím” → “Prevádzkovateľ: prísna kontrola technológie pred prevzatím”. | That h2 → “Zabezpečenie, že platíte za technológiu bez akýchkoľvek právnych problémov” h3; only the h2 in the rail. |
| EN consulting | Heading words and levels unchanged; short compounds get typographic non-breaking hyphens. | None. |
| SK risk | “Slovenskej / Českej” → “Slovenskej/Českej” within the h2; words and levels unchanged. | None. |
| EN risk | Heading words and levels unchanged; `third-party` and `Un-prevented` receive non-breaking hyphens in headings. | None. |
| SK inspections | Unchanged. Heading-first rail baseline fixed. | None. |
| EN inspections | Unchanged. | None. |
| SK aviation | No heading words or levels changed. | “Pre bezpečné vykonanie letu je nevyhnutný správne pracujúci avionický systém” → “Preto je periodické preskúšanie komunikačných a navigačných systémov v lietadlách povinné”; “Naše služby” → “Aviation Testing”. Second headings are excluded from the rail; “Aviation Service” remains because prose precedes it. |
| EN aviation | No heading words or levels changed. | “Our offer” → “Aviation Testing”; only “Our offer” in the rail. “Aviation Service” remains. |
| SK instruments | “Skúšky avionických systémov sú povinné” becomes a Body sentence ending in a full stop. Empty “Aviation Testing Center” removed. “Pre pilotov: organizácia pri prílete” moves h3 → h2. “Počas prevádzky TWR:”, “Mimo prevádzky TWR:”, “Potrebujeme:” and “Majte prichystané:” move h4 → h3, all styled with H4. | Pilot section h2 → first TWR label h3, 16px gap; label omitted from rail. Rail has the pilot section and downloads only. |
| EN instruments | Repeated “Aviation instrument testing” removed. “Testing of avionics IS mandatory” becomes sentence-case h2; “Testing Service division Aviation offers services tailored to meet specified requirements according to EASA” becomes h3. Empty “Download order form” and “Aviation Testing Center” removed. “Come for inspection of avionics to Žilina (LZZI/ILZ)” and “We will come for inspection with our inspection vehicle to you” become list fragments ending in full stops. “We need:” moves h4 → h3 with H4 styling. “Contact us, we will answer you” retained. | Mandatory-testing h2 → EASA h3. Rail contains mandatory testing, contact, the travel question, and downloads (four entries). |
| SK maintenance | Full “250 hod./500 hod./Revízia (kontrola) magnet Bendix King série S20/S200 a Slick série 4300/6300: 236 €*/ks” becomes a key line; words unchanged. Footnote becomes Small muted. “Naša špecializácia” unchanged. | None. Rail has specialization and downloads only. |
| EN maintenance | “Our specialization” unchanged. No data heading exists in this source. | None. |

Other pages: no heading words changed on SK/EN home, contacts, SK legal, EN/ZH references or 404. On ZH home, the existing supplier heading keeps its words and now precedes its teaser sentence. Footer heading labels keep their words; only language-tag placement changes.

## P1-1 content-line ledger

The following table identifies every edited Markdown line for P1-1. No words were added or removed. The exact old/new full lines follow in the appendix.

| File | Line | Change |
| --- | --- | --- |
| `sk/permits.md` | 29 | `revízie / úradné skúšky` → `revízie/úradné skúšky` |
| `sk/risk.md` | 17 | `Slovenskej / Českej republiky` → `Slovenskej/Českej republiky` |
| `sk/consulting.md` | 29 | `Systémy EX pre…` → `systémy EX pre…` |
| `sk/consulting.md` | 38 | `STN / ČSN` → `STN/ČSN` |
| `sk/consulting.md` | 44 | `CZ / SK` → `CZ/SK` |
| `sk/home.md` | 43 | `produktu / technológie` → `produktu/technológie` |
| `sk/home.md` | 45 | `produkt / technológia` → `produkt/technológia` |
| `sk/home.md` | 48 | `obsluhy / opravy` → `obsluhy/opravy` |
| `en/aviation.md` | 15 | `IFR / VFR` → `IFR/VFR` |

The only remaining spaced slash in the audited SK/EN Markdown and `home.json` is the multi-word alternative `Avionics: IFR check / VFR check` in `home.json`. Its text is preserved and its slash is bound at render time. Data strings use the same build-time helper; no manual NBSP edits were made to them. The consulting heading’s sentence-case change belongs to P0-3 and is listed above.

## ZH strings for native-speaker check

No Chinese words were added, translated, shortened or replaced.

1. **Home h1:** unchanged complete string `管理您技术在捷克和斯洛伐克的法律合规要求` (existing decorative final `.` retained). Previous phrase breaks were `管理您技术 / 在捷克 / 和斯洛伐克 / 的法律合规要求`. New main phrase breaks are `管理您技术 / 在捷克和斯洛伐克的 / 法律合规要求`; the location phrase additionally permits `在捷克和 / 斯洛伐克的` at narrow widths. All changes are `<wbr>`/no-wrap markup. No line begins with 的, 了 or 和.
2. **Supplier sentence:** `本服务专为向斯洛伐克或捷克共和国出口产品的供应商量身打造` → `本服务专为向斯洛伐克或捷克共和国出口产品的供应商量身打造。`; moved from after 红星计划 to immediately below 供应商套餐. This is the only changed Chinese punctuation in this implementation.
3. **Footer heading presentation on ZH home and references:** existing `公司信息`, `我们的服务`, `航空` now display as `公司信息 SK`, `我们的服务 EN`, `航空 EN` with the existing tag component. Their Chinese words are unchanged; individual footer links no longer repeat those tags.

Round-5 `运营商与供应商服务`, `全部服务`, dashes and `100%` remain unchanged and still await the previously requested native review. The English hero eyebrow/footer tagline and absent ZH aviation-teaser lead remain as instructed.

## QA and captures

- `QA_CAPTURE=true npm run build` passes, including `check:layout`: **23 routes × 390/640/1024/1080/1440; 46 axe runs; zero failures**.
- Existing column-width, overlap, horizontal-overflow, CLS, axe, menu, tabs, forms, gallery, scroll-spy, source-heading and no-JavaScript checks remain. Largest measured 390px CLS: **0.01516**, including deliberately delayed fonts.
- `npm run check:links` passes: **50 HTML pages, 1,631 internal URLs/assets/fragments, 27 legacy redirects**.
- `npm run check` passes: **0 errors, 0 warnings, 0 hints**.
- Added/updated assertions cover all review-6 items: clean descriptions; h1 repetition; maximum two headings; 16px stack gap; no data heading; label levels and H4 styling; key-line spacing; order form first; rail membership/clamp/baseline; actual SK line starts/ends; number/category/compound transform fixtures and idempotence; text-link binding/gap/hit height; copy-dependent hero height and empty space; fluid Prose H2; ZH phrase starts/supplier placement; footer gap and column tags; field-label token; breadcrumb targets/separators; and strict decoded-image no-enlargement.
- Injected regressions prove the new heading, rail, hero, footer, icon, breadcrumb and form-token checks actually reject broken layouts.
- Visually inspected the EN instruments and SK maintenance/contact at 390, ZH home at 390, EN home/cards at 640, SK instruments at 1024, SK home/footer at 1080, and SK risk/aviation at 1440.
- **42 captures** in `docs/review/shots-v6/`: all 38 v5 filenames plus `en-aviation-testing-desktop.jpg`, `en-aviation-testing-mobile.jpg`, `sk-consulting-desktop.jpg`, and `sk-consulting-mobile.jpg`. Older directories are untouched. Report: `docs/review/qa-v6.json`.

## Skipped / retained with reason

- **No P0/P1/P2 item omitted.** Two literal review descriptions need the design-contract interpretation: footer spacing is the 8px **inter-item** gap with a 24px minimum link box (not an 8px gap between glyph ink); breadcrumb separator margins stay 8px while the extra touch width extends to the right of short labels. QA checks those specified boxes and margins.
- **Further gallery replacements:** only one additional eligible, sufficiently large, unannotated Testing Center photo was available. `TESTING_CENTER-25%5B202%5D.jpg` is 250px wide (too small for a 310px desktop cell); `TESTING_CENTER-21%5B198%5D.jpg` is the reserved teaser image, which DESIGN says must not appear in the gallery; `20190628_141438.jpg` is already the aviation hero; `AT1.png`, `AT2.png`, `at3.png` and the inspected aerial alternative carry baked-in annotations/captions. Retained the other original cells rather than upscale, duplicate, or violate the subject rules. The new photo reduces the repeated yellow-case composition by one.
- **Unresolved owner items intentionally unchanged:** Slick 4600/4300 wording and `serie/série`; maintenance hero photo; aviation naming; duplicated SK supplier package; pilot AIP URL; repeated card descriptions; ZH eyebrow/footer/teaser lead copy; phone number; form endpoint and success state; EN references copy; footer closing line; permits “Naše služby”; partners asset at 390; contact lead. No new copy was invented to resolve them.
- Native-speaker approval is still required for the ZH presentation/punctuation listed above; no translation review is claimed.

## Appendix: exact P1-1 line edits

### `src/content/pages/sk/permits.md`

```diff
@@ line 29 @@
-Pred prvým uvedením do prevádzky akejkoľvek technológie, alebo zariadenia je potrebné aby boli vykonané úkony podľa legislatívy (revízie / úradné skúšky sk. A). Tieto činnosti musia byť vykonané špecializovanou a oprávnenou spoločnosťou. TESTING SERVICE to zabezpečí na „kľúč“.
+Pred prvým uvedením do prevádzky akejkoľvek technológie, alebo zariadenia je potrebné aby boli vykonané úkony podľa legislatívy (revízie/úradné skúšky sk. A). Tieto činnosti musia byť vykonané špecializovanou a oprávnenou spoločnosťou. TESTING SERVICE to zabezpečí na „kľúč“.
```

### `src/content/pages/sk/risk.md`

```diff
@@ line 17 @@
-## Dodržujete bezpečnostné štandardy a všetky právne predpisy Slovenskej / Českej republiky?
+## Dodržujete bezpečnostné štandardy a všetky právne predpisy Slovenskej/Českej republiky?
```

### `src/content/pages/sk/consulting.md`

```diff
@@ line 29 @@
-- Systémy EX pre potenciálne výbušné prostredie
+- systémy EX pre potenciálne výbušné prostredie
@@ line 38 @@
-Dodávatelia často považujú iba vyhlásenie CE za dostatočnú podmienku, aby ich technológia fungovala kdekoľvek v EÚ. Na Slovensku a v Českej republike to však nie je pravda. Vzhľadom na staršie STN / ČSN, vyhlášky a národné prílohy k normám STN-EN existuje množstvo dodatočných požiadaviek, ktoré musia byť splnené, aby bola technológia v súlade s miestnymi zákonmi. Ak sa podrobí kontrole, technológia s iba CE môže spôsobiť potenciálne oneskorenie výroby a/alebo rôzne právne poplatky v závislosti od závažnosti nedostatku.
+Dodávatelia často považujú iba vyhlásenie CE za dostatočnú podmienku, aby ich technológia fungovala kdekoľvek v EÚ. Na Slovensku a v Českej republike to však nie je pravda. Vzhľadom na staršie STN/ČSN, vyhlášky a národné prílohy k normám STN-EN existuje množstvo dodatočných požiadaviek, ktoré musia byť splnené, aby bola technológia v súlade s miestnymi zákonmi. Ak sa podrobí kontrole, technológia s iba CE môže spôsobiť potenciálne oneskorenie výroby a/alebo rôzne právne poplatky v závislosti od závažnosti nedostatku.
@@ line 44 @@
-Každá nová technológia dodávaná do Českej a Slovenskej republiky, musí byť v súlade s miestnymi právnymi predpismi a normami. Vzhľadom na rozdiely medzi normami a legislatívou EÚ a CZ / SK, certifikácia CE o zhode nestačí na to, aby poskytla úplnú ochranu pre prevádzkovateľa a obsluhu, a preto je potrebné vykonať ďalšie úpravy, aby sa zabezpečilo, že stroj/technológia je v súlade s miestnou legislatívou a spĺňa bezpečnostné požiadavky.
+Každá nová technológia dodávaná do Českej a Slovenskej republiky, musí byť v súlade s miestnymi právnymi predpismi a normami. Vzhľadom na rozdiely medzi normami a legislatívou EÚ a CZ/SK, certifikácia CE o zhode nestačí na to, aby poskytla úplnú ochranu pre prevádzkovateľa a obsluhu, a preto je potrebné vykonať ďalšie úpravy, aby sa zabezpečilo, že stroj/technológia je v súlade s miestnou legislatívou a spĺňa bezpečnostné požiadavky.
```

### `src/content/pages/sk/home.md`

```diff
@@ line 43 @@
-- inšpekcia a validácia produktu / technológie počas výroby alebo inštalácie pred odovzdaním zákazníkovi
+- inšpekcia a validácia produktu/technológie počas výroby alebo inštalácie pred odovzdaním zákazníkovi
@@ line 45 @@
-- zabezpečte, že Váš produkt / technológia je v súlade nielen s normami EN ale aj s lokálnou legislatívou a normami ČSN a STN
+- zabezpečte, že Váš produkt/technológia je v súlade nielen s normami EN ale aj s lokálnou legislatívou a normami ČSN a STN
@@ line 48 @@
-- dodajte technológiu s predpripravenými inšpekčnými a revíznymi lehotami a požiadavkami na odborné spôsobilosti pre obsluhy / opravy
+- dodajte technológiu s predpripravenými inšpekčnými a revíznymi lehotami a požiadavkami na odborné spôsobilosti pre obsluhy/opravy
```

### `src/content/pages/en/aviation.md`

```diff
@@ line 15 @@
-- IFR / VFR certified aircrafts.
+- IFR/VFR certified aircrafts.
```
