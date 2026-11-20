# Review 7 implementation

Implemented P0 → P1 → P2 in section 6 order, against `DESIGN.md`. Verification captures were made from the completed implementation. No ArtifactBridge, Agent Room, external publication, or push was used.

## Implemented

| Item | Result |
| --- | --- |
| P0-1 | ZH home phrases are block/nowrap at ≥640px; all heading `<wbr>` elements are disabled at those widths. Below 640px the existing phrase and inner-country break opportunities remain. Characters are unchanged. |
| P0-2 | Breadcrumb text keeps its natural width; centered absolute pseudo-elements supply ≥44×44px targets below 1080px. Separators retain 8px glyph spacing and the current-item flex guard remains. |
| P1-1 | Added `prose-h3`, 19–22px with 1.3 leading. Prose labels stay 18px, other H3 roles stay 22px. See the six-line source-heading exception below. |
| P1-2 | Photo heroes follow copy height, clamped to 200–300px at 1080/1440. Stacked photos and the 64px desktop hairline gap are preserved. |
| P1-3 | Footer link box gaps are zero below 1080px and 8px above; one-line mobile links have a 44px pitch with centered text. Wrapped links grow with their text. Non-link paragraphs before lists have 0/8px gaps. See the measured height exception below. |
| P1-4 | Contact footers have no email rows. The ZH contact action continues to use the existing English contact page. See the aviation-footer conflict below. |
| P1-5 | A stacked heading enters the rail when a later same-level sibling exists before the next parent heading. Prose labels remain excluded. All resulting article rails are recorded below. |
| P1-6 | Audited every SK/EN Markdown list immediately following a heading, including labels. Normalized capitalization and terminal punctuation only; all changed lines are recorded below. |
| P1-7 | All leads use balanced wrapping and pass the ≥40% final-line ratio. The long SK package lead was shortened solely by cutting source words; details below. |
| P2-1 | Shared typography binds terminal category letters, SK/CS percentages, Bendix King, and makes/series. It also processes complete authored HTML paragraphs so maintenance key lines receive the same binding. Standalone HTML tags remain intact. |
| P2-2 | Language tags inside every button are borderless. |
| P2-3 | Paragraph-first rail offset is 8px; heading-first stays 16px. Baseline tolerance is ±1px. |
| P2-4 | Added `ui-current` (15/600/1.2), used by the current language only. |
| P2-5 | Home photo starts on column seven, x=732px at 1440. Existing source photo and 60%/50% crop position remain. Responsive candidates reach 1500px, capped by source pixels; `sizes` accounts for both the wider photo and cover-crop height. The unchanged EN phrase “Czech and Slovak” stays together on desktop so the ink-to-photo gap meets ≤230px. |
| P2-6 | Captured every v6 filename plus all 20 requested missing-route captures, with additional ZH viewport/1080 captures. All output is in `shots-v7/`; older directories are untouched. Browser, actual platform font families, declared stacks, `document.fonts`, and installed CJK fonts are in `qa-v7.json`. |
| P2-7 | Added/updated browser and content checks, including deliberately broken fixtures/DOMs that must be rejected. All prior column-width, overlap, overflow, CLS, axe, image-resolution, interaction, source-heading, and typography checks remain. |

## Skipped or adapted because DESIGN / owner instructions win

- **P1-1 five-line aviation opening:** at 390px, the unchanged SK source H2 and H3 require **3 + 3 lines** at the required 24px/19px sizes, balanced wrapping, and 350px reading width. Achieving five would require changing source heading words or the prescribed typography/layout. QA enforces the exact type scale and a maximum of six lines; the source headings were not shortened.
- **P1-3 ≥200px footer reduction:** the specified spacing produces **1429.72px**, versus **1517.72px** with the v6 footer rules in the same font environment: **88px shorter**. The baseline restores the old 8px list gaps, zero link padding, and 16px paragraph margins in the current unchanged SK home footer. An earlier comparison that merely appended the old stylesheet would leave the new, more-specific paragraph selector in force; that is not the baseline used here. Removing another 112px would contradict the fixed section spacing, minimum targets, or unchanged content. QA records the requested threshold as unmet, with this exception, and enforces the actual required box gaps and target sizes.
- **P1-4 exactly one footer-grid email on every non-contact page:** DESIGN explicitly says company column 1 has **no email**, and aviation pages omit the aviation email already shown in their top row. Those aviation grids therefore retain **zero** email rows. QA expects zero for contact/aviation and one elsewhere. No new company email row was invented.
- **Owner decisions 1–18:** all remain unchanged: Slick series; maintenance photo; native ZH sign-off; ZH aviation-teaser lead; phone, form endpoint and success state; EN references copy; short replacement slogan headings; permits “Naše služby”; English title for the ZH PDF; card descriptions; pilot AIP destination; footer closing-line coverage; partners image at 390; contact lead; gallery; duplicated SK supplier package; industry documents; capability grouping. The pilot link’s label capitalization/full stop is typography-only; its destination is unchanged.

## QA and capture evidence

- `QA_CAPTURE=true npm run build` — pass, including `check:layout`: **23 routes × 5 widths** (390, 640, 1024, 1080, 1440), **46 axe runs**, **0 failures**.
- `npm run check:links` — pass: **50 HTML pages, 1,634 internal URLs/assets/fragments, 27 redirects**.
- `npm run check` — **0 errors, 0 warnings, 0 hints**.
- `npm run qa:capture` — same layout/interaction/regression checks and same font environment as the screenshots; report: [qa-v7.json](qa-v7.json).
- No horizontal overflow, narrow/overlapping reading blocks, or image upscaling at the tested widths, including 2× density image checks. Mobile font loading is deliberately delayed for the existing CLS checks.
- Screenshots: [shots-v7](shots-v7/). The capture script asserts every v6 filename and every newly required desktop/mobile filename exists. Mobile, tablet and desktop renderings were visually inspected, including ZH home, SK aviation, permits, risk, and the revised EN home composition.

New/changed assertions cover: ZH rendered line starts; breadcrumb glyph spacing, pseudo-element hit areas, row height and current-text clearance; fluid Prose H3; source-preserving aviation stack; copy-clamped photo height/empty space; footer box gaps, pitch, preceding paragraph gaps and email count; sibling-aware rail membership and ±1px baseline; Markdown list style; lead final-line width; transform fixtures and idempotence (including raw HTML safety); SK rendered word/percent line edges at all five widths; `ui-current` scope; button language tags; home photo edge and heading gap. Deliberately broken DOMs exercise the new checks, including rails with and without a later sibling; pre-existing regression probes remain. Parser dependencies `unified` and `remark-parse` are now explicit dev dependencies at their already-installed versions.

Maximum observed CLS: **0.006588**, below 0.05.

### Font environment

Chromium **158.0.8127.18**. Actual resolved platform fonts (via Chromium DevTools, not inferred from CSS):

- `enBody`: IBM Plex Sans.
- `skH1`: IBM Plex Sans.
- `zhH1`: WenQuanYi Zen Hei.

Installed CJK families reported by `fc-list :lang=zh family`:

- Unifont\-JP
- WenQuanYi Zen Hei Mono,文泉驛等寬正黑,文泉驿等宽正黑
- Droid Sans Fallback
- Unifont Sample
- WenQuanYi Zen Hei Sharp,文泉驛點陣正黑,文泉驿点阵正黑
- WenQuanYi Zen Hei,文泉驛正黑,文泉驿正黑
- Unifont

All line measurements run after `document.fonts.ready` in the same browser/context that writes the captures. No alternate QA font stack is injected.

## ZH strings for native-speaker check

**No Chinese copy was added or rewritten.** The only changed ZH text markup is the home heading:

- Complete unchanged string: `管理您技术在捷克和斯洛伐克的法律合规要求.` (the existing Latin gold full stop remains).
- ≥640px lines: `管理您技术` / `在捷克和斯洛伐克的` / `法律合规要求.`
- 390px lines: `管理您技术` / `在捷克和` / `斯洛伐克的` / `法律合规要求.`
- Three outer spans now use `zh-line`. Existing nested no-wrap spans and `<wbr>` break opportunities remain for mobile; all heading `<wbr>` elements are hidden at ≥640px. QA requires the desktop/tablet line starts 管 / 在 / 法 and rejects the forbidden mobile line starts and an unpaired terminal 和.

Native-speaker sign-off remains an owner decision. The other previously listed ZH strings, spaced slash, English labels, punctuation, package heading and supplier-sentence placement were not edited.

## Content changes

### P1-7 SK package lead

`src/content/pages/sk/home.md:10` now reads:

> Ponúkame naše služby zviazané do jednotlivých balíčkov, ktoré majú za účel kompletne zabezpečiť akékoľvek právne požiadavky.

This cuts the introductory and final qualifying clauses from `_source/pages/skmain.md:53`, with initial capitalization and terminal punctuation normalized. It adds no words. The old long lead exceeded Chromium’s balanced-line limit at 390px and left a 35.34% last line; the shorter source excerpt meets the ≥40% check. Package body, supplier duplicates and capability grouping remain unchanged.

### P1-6 every changed Markdown list line

Only capitalization and a final full stop changed. URLs, model numbers, source words and list structure are preserved.

**`src/content/pages/en/consulting.md`**

- Line 28: `- Safety designs and solutions for technology.`
- Line 29: `- EX proof systems for potentially explosive atmospheres.`
- Line 30: `- Hygienic parameters in working areas.`
- Line 31: `- Fire protection for buildings and technology.`
- Line 32: `- Environmental conditions.`

**`src/content/pages/en/instruments.md`**

- Line 29: `- Arrange aircraft movements.`
- Line 30: `- 230 V max. 50 m from aircraft.`
- Line 31: `- Aircraft logbook.`
- Line 32: `- Previous records.`

**`src/content/pages/en/maintenance.md`**

- Line 13: `- 500 hour inspection and overhaul of aircraft magnetos Bendix King series S20/S200 and Slick 4300/6300 (coming soon).`
- Line 14: `- Mediation of repair of avionics.`
- Line 15: `- Consultancy about built in the avionics parts.`

**`src/content/pages/sk/consulting.md`**

- Line 28: `- Bezpečnostné návrhy a riešenia pre technológie.`
- Line 29: `- Systémy EX pre potenciálne výbušné prostredie.`
- Line 30: `- Hygienické parametre v pracovných priestoroch.`
- Line 31: `- Protipožiarna ochrana budov a technológií.`
- Line 32: `- Environmentálne podmienky.`

**`src/content/pages/sk/instruments.md`**

- Line 20: `- [Mapa](/s/LZZI-Map.jpg).`
- Line 21: `- [Letisko AIP](https://aim.lps.sk/eAIP/eAIP_SR/AIRAC193_EFF_24MAY2018/html/LZ-AD-2.LZZI-en-SK.html).`
- Line 29: `- Zariadiť manipuláciu s lietadlami.`
- Line 30: `- 230 V k dispozícii (max. 50 m od meracieho priestoru).`
- Line 34: `- Lietadlovú knihu.`
- Line 35: `- Predchádzajúce záznamy.`

**`src/content/pages/sk/maintenance.md`**

- Line 13: `- 500 hodinové a generálne opravy magnet typ Bendix King serie S20/S200 a Slick série 4300/6300.`
- Line 14: `- Sprostredkovanie opravy avioniky.`
- Line 15: `- Poradenstvo v oblasti zástavby avioniky.`

## Resulting rails per article

Exact rendered entry text, in order; non-breaking spaces are represented as normal spaces below. Prose labels and data key lines remain excluded. A one-target references article has no displayed rail.

### /en/aviation/

1. The periodic inspection of communication and navigation systems in aircraft is mandatory
2. It is an important condition for Airworthiness Review Certificates – ARC
3. Our offer
4. Aviation Testing
5. Aviation Service
6. Downloads and links
7. Our partners

### /en/aviation/instrument-testing/

1. Testing of avionics is mandatory
2. Contact us, we will answer you
3. The question is: will you come to us or will we come to you?
4. Downloads and links

### /en/aviation/technical-maintenance/

1. Our specialization
2. Downloads and links

### /en/references/

No displayed rail (fewer than two eligible targets).

### /en/services/inspections-and-testing/

1. Professional qualifications trainings
2. Establish your technology in local legislation
3. Complex testing before commissioning
4. Related services

### /en/services/permits-and-approvals/

1. Construction permit
2. Installation of RTDs
3. Comissioning
4. Operation
5. Our offer
6. Related services

### /en/services/risk-atex-pawa/

1. Do your safety standards comply with Slovak legislation?
2. Make sure your required safety files are in order
3. Prevent the possible accidents by conducting an independent third‑party analysis
4. Three key steps
5. Un‑prevented workplace accidents and injuries
6. Related services

### /en/services/technical-consulting/

1. What do we do?
2. Do not wait until the technology is built
3. Make sure that you are buying and/or shipping technology conferring to the local legal standards
4. Common cases of our consulting services occur in several key situations
5. Ensuring you are paying for technology without any legal issues
6. Pre‑deliver validation of the technology for suppliers of technology
7. Related services

### /letectvo/

1. Pre bezpečné vykonanie letu je nevyhnutný správne pracujúci avionický systém
2. Preto je periodické preskúšanie komunikačných a navigačných systémov v lietadlách povinné
3. Ide samozrejme o dôležitú podmienku pre zachovanie letovej spôsobilosti
4. Naše služby
5. Aviation Testing
6. Aviation Service
7. Na stiahnutie a odkazy
8. Naši partneri

### /letectvo/skusky-avioniky/

1. Pre pilotov: organizácia pri prílete
2. Na stiahnutie a odkazy

### /letectvo/technicka-udrzba/

1. Naša špecializácia
2. Na stiahnutie a odkazy

### /ochrana-osobnych-udajov/

1. Testing Service s.r.o.
2. Na stiahnutie a odkazy

### /sluzby/inspekcie-a-skusky/

1. Testing Service disponuje požadovanými akreditáciami na poskytovanie týchto inšpekcií
2. Školenia odborných spôsobilostí
3. Zaveďte svoju technológiu do miestnej legislatívy
4. Komplexné testovanie pred uvedením do prevádzky
5. Ďalšie služby

### /sluzby/povolenia-a-schvalenia/

1. Stavebné povolenie – povolenie začať stavbu
2. Inštalácia vyhradených technických zariadení – povolenie pre inštaláciu technických zariadení skupiny A
3. Prvé uvedenie do prevádzky
4. Povolenie na prevádzku
5. Naše služby
6. Ďalšie služby

### /sluzby/rizika-atex-pawa/

1. Dodržujete bezpečnostné štandardy a všetky právne predpisy Slovenskej/Českej republiky?
2. Uistite sa, že vaša bezpečnostná dokumentácia a potrebné súbory sú v poriadku
3. Predchádzajte potenciálnym nehodám vďaka rigoróznej a nestrannej bezpečnostnej analýze od tretej strany
4. Neexistuje ospravedlnenie pri zanedbaní bezpečnosti zamestnancov
5. Tri kľúčové kroky
6. Nepredídené pracovné úrazy a nehody
7. Ďalšie služby

### /sluzby/technicke-poradenstvo/

1. Čo robíme?
2. Nečakajte než sa technológia postaví
3. Uistite sa, že kupujete a/alebo dovážate technológiu, ktorá spĺňa miestne právne štandardy
4. Časté prípady našich poradenských služieb sa zameriavajú na niekoľko kľúčových situácii
5. Prevádzkovateľ: prísna kontrola technológie pred prevzatím
6. Validácia technológie pred dodaním špeciálne pre dodávateľov
7. Naše skúsenosti
8. Ďalšie služby

### /zh/references/

No displayed rail (fewer than two eligible targets).

## Photo hero measurements

Heights in CSS px; each photo equals clamp(200, copy, 300), within 1px. Maintenance remains the owner-approved no-photo exception.

| Route | Width | Copy | Photo |
| --- | ---: | ---: | ---: |
| /en/aviation/ | 1440 | 188.59 | 200.00 |
| /en/aviation/instrument-testing/ | 1440 | 219.59 | 219.59 |
| /en/services/inspections-and-testing/ | 1440 | 170.19 | 200.00 |
| /en/services/permits-and-approvals/ | 1440 | 139.59 | 200.00 |
| /en/services/risk-atex-pawa/ | 1440 | 139.59 | 200.00 |
| /en/services/technical-consulting/ | 1440 | 108.59 | 200.00 |
| /letectvo/ | 1440 | 188.59 | 200.00 |
| /letectvo/skusky-avioniky/ | 1440 | 250.19 | 250.19 |
| /sluzby/inspekcie-a-skusky/ | 1440 | 170.19 | 200.00 |
| /sluzby/povolenia-a-schvalenia/ | 1440 | 170.19 | 200.00 |
| /sluzby/rizika-atex-pawa/ | 1440 | 108.59 | 200.00 |
| /sluzby/technicke-poradenstvo/ | 1440 | 139.59 | 200.00 |
| /en/aviation/ | 1080 | 212.91 | 212.91 |
| /en/aviation/instrument-testing/ | 1080 | 267.81 | 267.81 |
| /en/services/inspections-and-testing/ | 1080 | 187.81 | 200.00 |
| /en/services/permits-and-approvals/ | 1080 | 132.91 | 200.00 |
| /en/services/risk-atex-pawa/ | 1080 | 132.91 | 200.00 |
| /en/services/technical-consulting/ | 1080 | 132.91 | 200.00 |
| /letectvo/ | 1080 | 212.91 | 212.91 |
| /letectvo/skusky-avioniky/ | 1080 | 267.81 | 267.81 |
| /sluzby/inspekcie-a-skusky/ | 1080 | 156.81 | 200.00 |
| /sluzby/povolenia-a-schvalenia/ | 1080 | 187.81 | 200.00 |
| /sluzby/rizika-atex-pawa/ | 1080 | 156.81 | 200.00 |
| /sluzby/technicke-poradenstvo/ | 1080 | 132.91 | 200.00 |
