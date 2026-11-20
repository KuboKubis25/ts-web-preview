# Review 5 implementation

Implemented against DESIGN.md in review-5 §6 order: P0 and its seven captures; P1 and its seven captures; P2 and the approved owner items; full validation and final captures. No source originals or older screenshot directories were changed. No external publishing or push.

## Implemented

- **P0-1:** all home package disclosures ship closed. ZH rows derive from the source package headings. The home Markdown transform removes the repeated leading lead, equal teaser/heading pairs and section-title repeats, demotes package headings to h3 and strips terminal full stops. The redundant SK/EN teaser labels were cut; substantive descriptions and both SK supplier-package versions remain. The two approved ZH UI labels are in place.
- **P0-2:** facts remain only on SK/EN permits, with source words and normalized typography. Aviation and instruments facts were removed: their remaining non-repeating facts did not meet the two-row minimum.
- **P1-1:** restored short source headings throughout the service and aviation articles, retaining their words. First article headings are h2, subsequent source hierarchy uses h2/h3 without skipped levels; short procedural labels use h4. See the page-by-page audit below.
- **P1-2:** the contents rail has no current entry before a target is reached, and selects the last target at the page bottom.
- **P1-3:** one shared typography helper processes Markdown text nodes, home data, UI strings and rendered copy. It binds SK/CS one-letter words, Latin spaced en dashes, and number/unit pairs; skips code/pre and URLs; and leaves ZH punctuation to the explicitly approved edits. Corrected the compound, quotes, slash, list-introducing colon, maintenance units/colon, specialization heading punctuation and permits final full stop.
- **P1-4:** capabilities rows size to their own content; items in each row retain aligned hairlines, and the disclosure supplies a full-width closing rule.
- **P1-5:** all four SK instruments labels and the EN label use real h4 elements. Completion lists use lowercase starts (proper names/acronyms preserved) and no terminal full stops. EN risk's flattened lists have semantic list markup using the existing words. Loose prose-list paragraphs have zero margins.
- **P1-6:** mobile navigation rows, including the section label and final service row, measure 57px.
- **P1-7:** mobile tabs reserve 48px beyond the gutter at the start; the current tab clears the fade and the previous tab remains visible.
- **P1-8:** shared email rendering permits a break only after `@`, binds the arrow to the domain, and removes redundant email metadata. Contact rows and footer addresses stay inside their columns at 1080px.
- **P2-1:** `hairline-gap` is shared in CSS and exported tokens; hero bottom, article top and contact top use the same 40–64px value.
- **P2-2:** desktop page-hero photos render at 16:9; stacked photos retain 3:2 and their height cap. Responsive derivatives retain source-pixel limits. Hero candidates include 400/720/1080/1440/2000 where the source permits them; the 3:2 derivative also supplies the desktop cover crop without enlargement.
- **P2-3:** company, Aviation and Prague contact headings are all h2 with H3 typography. Address/email stacks and block spacing use the specified 16/24/48px rhythm.
- **P2-4:** form privacy link has an internal arrow and a 44px hit area.
- **P2-5:** rail entries wrap to two lines and retain full `title` text.
- **P2-6:** approved ZH percent/dash normalization and word-joiner binding; exact strings below.
- **P2-7:** dropdown intro uses Label leading; menu icon uses the shared 16px token.
- **P2-8 / P2-9:** cut the repeated aviation opening lines in SK/EN, removed the nested regulation pair, and moved the original links onto the existing numbers in the EASA bullet. No new prose words.
- **P2-10:** seventh featured cell is now **`TESTING_CENTER-08%5B185%5D.jpg`**, the next unused unannotated TESTING_CENTER photo after the already-featured `06`. `AT1.png` remains available in the expanded gallery. The new source is 1500 × 408; its 3:2 crop is at most 612 × 408, sufficient for the 310px maximum cell, with density capped at source pixels.
- **Owner item 3:** both maintenance pages use DESIGN's no-photo hero, with copy in cols 1–8. Inspected the source aviation images, including the exposed aircraft engine photo; none unambiguously depicts the page's magneto servicing subject. No substitute stock photo was used.
- **Owner item 11:** `src/assets/partners-cropped.png` is a lossless pixel-preserving extraction of the original partners JPEG, removing only its 13px left white margin. Original: 1268 × 209; crop: 1255 × 209. The first logo's aircraft-wing ink begins at the crop's x=0, aligned to col 5. No recoloring, redrawing or upscaling. Reproduce with `node scripts/crop-partners.mjs`; decoded RGB pixels were verified identical to the source extraction.

## DESIGN precedence and QA changes

`check:layout` retains the existing column-width, overlap, horizontal-overflow, type-token, baseline, sticky rail, image-resolution, interaction, no-JavaScript, CLS and axe checks. It now also checks:

- closed packages; no equal consecutive home headings; distinct section/row titles; package height ≤900px at 1440; derived ZH row names; no repeated lead/teaser inside expanded bodies; h3 package headings;
- facts with 2–4 rows, unique labels, no repetition of the lead/first three prose blocks, source-word tokens, identical desktop/mobile values;
- eligible source headings in built h2/h3 (procedural labels in h4), plus no skipped article levels;
- idle rail on arrival and last entry current at bottom on risk/permits/aviation;
- actual Range-derived SK lines at 390/1440, including expanded packages, without a trailing one-letter word or leading en dash;
- content-sized capabilities at 390, equal item heights within each desktop/tablet row, and the full-width closing rule;
- 57px mobile-menu rows; current aviation tabs ≥52px from the left on both sub-pages, with the preceding tab visible;
- email containment (including 1080), no internal part wrapping, no email meta, and the domain-bound arrow;
- hero/article/contact hairline gaps, 64px at 1440 and 40px at 390; desktop photo ratio; contact heading levels/rhythm; privacy target size; two-line rail labels; loose-list margins.

Three old assertions were changed to follow the new contract: ZH packages are closed; capabilities heights are equal **within each row**, not across the whole grid; EASA links live in the bullet instead of a required nested list. The old arbitrary 620px minimum source crop for every gallery image is now an actual rendered-width check: DESIGN explicitly permits 2× density capped by available source pixels. The independent served-bitmap resolution checks at 1×/2× and the no-enlargement checks remain active.

**Facts sourcing exception required by DESIGN:** `_source/pages/povolenia-schvalenia.md:15` contains `vyhlášky`, while DESIGN explicitly requires the standalone base form `vyhláška`. The source-word check maps this one documented inflection to its base form; all other word/number tokens must occur in the page's own source. It does not use a general fuzzy match.

**Heading interpretation:** already represented source titles/leads, the partners ending and the footer contact action are not duplicated in the article. Those specific source-line exceptions are recorded in `scripts/qa-source-headings.mjs`. Long or multi-sentence source headings remain paragraphs. The short maintenance price heading is restored under DESIGN's heading rule even though review P1-3 illustrates its text as a prose line. Source spelling is preserved, including EN permits `Comissioning` and SK consulting `situácii`; no editorial correction was invented.

## Facts rows and source lines

| Page | Label | Rendered value (ordinary spaces shown) | Source |
|---|---|---|---|
| SK permits | Predpis | vyhláška MPSVaR SR č. 508/2009 Z. z. | `_source/pages/povolenia-schvalenia.md:15`; base form of `vyhlášky` as required by DESIGN |
| SK permits | Zariadenia | VTZ – A, B, C | `_source/pages/povolenia-schvalenia.md:15`; original `VTZ - A,B,C` |
| EN permits | Regulation | Decree (SK) 508/2009 | `_source/pages/permit-assurance.md:15`; original `Decree (SK)508-2009` |
| EN permits | Devices | Restricted technical devices (RTDs) | `_source/pages/permit-assurance.md:15`; initial case normalized |

No facts rows remain on SK/EN aviation or instruments; no replacement facts were invented.

## Restored headings per page

Text below shows ordinary spaces; the shared transform may bind them in rendered HTML. Existing headings not listed as restored retain their words.

| Page | Source file | Restored / changed headings and source lines |
|---|---|---|
| SK permits | `povolenia-schvalenia.md` | L13 → h3 **Inštalácia vyhradených technických zariadení – povolenie pre inštaláciu technických zariadení skupiny A**. Remaining headings unchanged. |
| EN permits | `permit-assurance.md` | No demoted heading to restore. L17 **Comissioning** restores the source spelling in the existing h3. |
| SK risk | `risk-atex-pawa-sk.md` | L11 → h2 **Dodržujete bezpečnostné štandardy a všetky právne predpisy Slovenskej / Českej republiky?**; L15 → h3 **Uistite sa, že vaša bezpečnostná dokumentácia a potrebné súbory sú v poriadku**; L26 → h3 **Predchádzajte potenciálnym nehodám vďaka rigoróznej a nestrannej bezpečnostnej analýze od tretej strany**; L30 → h2 **Neexistuje ospravedlnenie pri zanedbaní bezpečnosti zamestnancov**. L36 **Tri kľúčové kroky** shifts h2 → h3. Six prose headings plus Related make seven rail entries. L7/L24 remain paragraphs. |
| EN risk | `risk-safety-atex-certification.md` | L11 → h2 **Do your safety standards comply with Slovak legislation?**; L15 → h3 **Make sure your required safety files are in order**; L21 → h3 **Prevent the possible accidents by conducting an independent third-party analysis**. L27 **Three key steps** shifts h2 → h3. L7/L19/L25 remain paragraphs. |
| SK consulting | `consulting-services-sk.md` | L13 → h3 **Nečakajte než sa technológia postaví**; L17 → h3 **Uistite sa, že kupujete a/alebo dovážate technológiu, ktorá spĺňa miestne právne štandardy**; L21 → h3 **Časté prípady našich poradenských služieb sa zameriavajú na niekoľko kľúčových situácii**. L7/L43/L45 remain paragraphs. |
| EN consulting | `consulting-services.md` | L11 → h3 **Do not wait until the technology is built**; L15 → h3 **Make sure that you are buying and/or shipping technology conferring to the local legal standards**; L19 → h3 **Common cases of our consulting services occur in several key situations**. L5/L37 remain paragraphs. |
| SK inspections | `inspections-testing-qualifications-sk.md` | L7 → h2 **Testing Service disponuje požadovanými akreditáciami na poskytovanie týchto inšpekcií**; L26 → h2 **Zaveďte svoju technológiu do miestnej legislatívy**. L15 **Školenia odborných spôsobilostí** shifts h2 → h3. L34 remains a paragraph. |
| EN inspections | `inspections-testing-revisions-qualifications.md` | L19 → h2 **Establish your technology in local legislation**. L7 (116 characters) and L27 remain paragraphs. |
| SK aviation | `aviation.md` | L9 → h2 **Pre bezpečné vykonanie letu je nevyhnutný správne pracujúci avionický systém**; L11 → h3 **Preto je periodické preskúšanie komunikačných a navigačných systémov v lietadlách povinné**; L21 → h3 **Ide samozrejme o dôležitú podmienku pre zachovanie letovej spôsobilosti**. Partner heading remains in the ending; service headings/names retained. |
| EN aviation | `aviation-2.md` | L7 → h2 **The periodic inspection of communication and navigation systems in aircraft is mandatory**; L17 → h2 **It is an important condition for Airworthiness Review Certificates – ARC**. Partner heading remains in the ending; service headings/names retained. |
| SK instruments | `aviation-testing-service.md` | L3 → h2 **Skúšky avionických systémov sú povinné**. **Počas prevádzky TWR:** and **Mimo prevádzky TWR:** become h4 labels; L40 **Potrebujeme:** and L45 **Majte prichystané:** become real h4 elements. L17 is already the hero lead and is not repeated. Aviation Testing Center and pilot heading retained. |
| EN instruments | `aviation-testing-service-2.md` | L5 → h3 **Testing of avionics IS mandatory**; L11 → h2 **Testing Service division Aviation offers services tailored to meet specified requirements according to EASA**; L15 → h2 **Contact us, we will answer you**; L23 → h2 **The question is: will you come to us or will we come to you?**; L31 → h3 **Come for inspection of avionics to Žilina (LZZI/ILZ)**; L41 → h3 **We will come for inspection with our inspection vehicle to you**. L25 **Aviation Testing Center** shifts h2 → h3; L43 **We need:** becomes h4. |
| SK maintenance | `aviation-technical-maintenance.md` | L3 **Naša špecializácia** loses its terminal colon. L10 → h2 **250 hod./500 hod./Revízia (kontrola) magnet Bendix King série S20/S200 a Slick série 4300/6300: 236 €*/ks**, source words and series retained. L16 contact action is already in the footer. |
| EN maintenance | `aviation-technical-maintenance-1.md` | L3 **Our specialization** loses its terminal colon. No other source heading. |
| SK legal | Existing legal summary; source points to `GDPR_SK_TS_ver1-1.pdf` | No demoted exported Markdown headings; existing company heading retained (the final dot belongs to the legal abbreviation `s.r.o.`). No new legal copy imported. |
| EN references | `references-en.md` | Source brand, title and lead already appear in the page chrome/hero. No restored body heading or copy change. |
| ZH references | `references-zho.md` | Source brand, title and lead already appear in the page chrome/hero. No restored body heading or copy change. |

Home package headings are all rendered h3 beneath the section h2. Only the terminal stop in SK **Služby pre dodávateľov technológie.** is cut; all package-heading words remain unchanged.

## ZH strings for native-speaker check

Only the two authorized labels and authorized punctuation/binding edits were added or changed. `U+2060` below denotes an invisible WORD JOINER; it binds a dash to the preceding character and is present in the actual strings.

| Location | Before | After |
|---|---|---|
| UI `packages` | 雇主 / 运营商套餐 | **运营商与供应商服务** |
| UI `all` | 我们的服务 | **全部服务** |
| Home service title (cards/navigation/footer use the same data) | 咨询服务——技术法规与工程标准 | 咨询服务⁠——技术法规与工程标准 (`U+2060` before `——`) |
| Red Star paragraph | `100 %` | `100%` in the unchanged sentence below |
| Supplier bullet 1 | ` – ` | `U+2060——`, full resulting string below |
| Supplier bullet 2 | ` – ` | `U+2060——`, full resulting string below |
| Supplier bullet 3 | ` – ` | `U+2060——`, full resulting string below |
| Validation paragraph | ` —— ` | `U+2060——`, full resulting string below |

Full changed source strings:

- 这是我们面向技术运营商的高端服务。 我们按周期确保技术 100% 符合本地法律与规范，并提供针对本地规范建议的解决方案。借助该方案，我们保证在捷克或斯洛伐克运行技术时，所有法律差异都被发现且所有本地法规要求均已满足，不会出现任何进一步的法定索赔。 此外，我们还保证所有法定强制文件的准确性，并完成所有本地必需测试的评估。
- 交付前检查与技术验证⁠——确保您的产品或技术符合当地法规，为客户增值
- 将技术纳入本地法规框架⁠——随设备附带已编制的检验与复检计划
- 编制强制性安全文件⁠——通过提供满足本地要求的安全手册，为您的技术增值
- 该套餐使您可随技术附带所有本地所需文件，并获得 Testing Service 颁发的验证标志⁠——Valid CZ、Valid SK。

Unchanged source strings newly exposed as the three capability rows: **雇主 / 运营商套餐**, **红星计划**, **供应商套餐**. Their body headings move h2 → h3 with no word changes. Removed only redundant occurrences of **专为技术雇主与运营商量身打造的专业服务** (kept as the section lead) and **供应商套餐** (kept as its package heading/row). Native review remains pending; no translation was invented.

## Verification

- `npm run build` passed, including `check:layout`; final run used `QA_CAPTURE=true`.
- 23 routes × **390, 640, 1024, 1080, 1440px**; **115 layout evaluations**, **46 axe runs**, zero reported failures. Maximum measured mobile CLS: **0.001524**, below 0.05.
- Expanded SK/EN/ZH packages, expanded gallery, menu/dropdown, scroll-spy, aviation fades, form validation, no-JavaScript navigation and responsive images at 2× also passed.
- `npm run check:links` passed: 50 HTML pages, 1637 internal URLs/assets/fragments, 27 legacy redirects.
- `npm run check` passed: zero errors, warnings or hints.
- `git diff --check` passed. Partner crop RGB equality verified.
- **38 captures** in `docs/review/shots-v5/`: every v4 filename plus `en-home-640.jpg` and `zh-home-packages-open-390.jpg`. Final machine report: `docs/review/qa-v5.json`. Visual inspection included mobile menu/tabs, contact at 1080, packages at 390/640, hero/rail treatments and the source-photo set.

## Skipped / retained with reason

- **P2-11:** contact details repeat the footer on mobile; explicitly note-only and permitted by DESIGN.
- Owner item 1: Slick 4600/4300 and `serie/série` choices remain as supplied; only the authorized units and punctuation changed.
- Owner item 2: aviation naming and source service names remain.
- Owner item 4: both SK supplier-package wordings and their unresolved source wording remain; no package selection was made.
- Owner item 5: historical pilot AIP URL remains.
- Owner item 6: card descriptions remain, apart from typography binding.
- Owner item 7: no phone, endpoint or form-success behavior changes.
- Owner item 8: native ZH review remains pending; inherited Latin labels and the missing ZH aviation teaser lead remain. No new ZH teaser copy.
- Owner item 9: EN references wording, including “here”, remains.
- Owner item 10: closing copy remains on only the existing service pages.
- Source heading material already represented by a hero/ending, or disqualified by the 110-character/one-sentence rule, is not duplicated or promoted; reasons above and in the QA source-line audit.
