# Review 8 implementation

## Implemented

Only P0-1, P1-1–P1-5 and their P2-7 QA are implemented. DESIGN.md controls the implementation; all review-8 owner decisions remain unchanged. No ArtifactBridge tools or Agent Rooms were used.

- **P0-1:** removed the EN country-pair span and its nowrap rule. Latin home headings use the shared typography helper, balance and the existing 18ch maximum. EN needs no fallback binding. The new all-language check exposed an existing SK single-word line (`legislatívnych`) at 1024/1080/1440. Cut that one source word, as authorized; no replacement words, forced breaks, extra binding, type-size or measure changes. ZH phrase breaks stay unchanged.
- **P1-1:** compound protection now includes frontmatter description/packageLead, breadcrumb titles and Latin home Display; interior H1 protection remains. U+2011 applies to compounds of at most 24 characters, including Latin compounds on ZH surfaces. Running prose and URLs retain their normal hyphens.
- **P1-2:** document files are no longer removed from the paperwork inventory when linked inline. SK/EN inspections now have the accreditation PDF row, download hero action and rail entry. Both inline links remain. No external web-link rows were added or duplicated.
- **P1-3:** EN training items are a four-item Markdown list in the existing order; SK/EN lead-ins end with colons and items are lowercase without terminal full stops. The EN link is its own paragraph. Restored the space after `commissioning.`. Verified the entire word sequence of each inspections file against the previous commit, ignoring case and punctuation: identical.
- **P1-4:** breadcrumb ancestors cannot shrink; current text is a single ellipsised line with its full text in `title`. The separator remains 8px from each text edge and the existing 44px pseudo-element targets remain. EN ampersands bind to the following word in shared typography, including navigation, cards and footer.
- **P1-5:** Bendix King and each series designation bind independently; Slick binds directly to numeric designations, including parenthesised ones. Make-to-series spaces remain break opportunities. A final guard drops a joining space that would exceed 24 characters, including pre-existing chained unit bindings. No series numbers or words changed.
- **P2-7 (scoped):** removed the ≤230px h1/photo-gap test and old make/series binding expectations. Added real-glyph home Display one-word-line / first-line ≥50% checks at DESIGN's 1024/1080/1440 acceptance widths, protected-block line-ending checks at all five widths, ≤24-character bound runs (respecting block and CJK break opportunities), single-line breadcrumbs/full titles, paragraph-led and dash-glued-list content checks, and a download inventory check derived directly from `downloads.ts`. Added mutation probes and SK/EN maintenance/home fixtures, including 24/25-character boundaries and idempotence.

## Deferred P2

- **P2-1:** 404/footer hairline removal; its new adjacency assertion is also deferred.
- **P2-2:** link-only list punctuation and the corresponding new rule.
- **P2-3:** mobile home-hero padding token.
- **P2-4:** ZH Statement/all-negative-tracking resets.
- **P2-5:** SK home metadata, SK legal address and 404 title punctuation.
- **P2-6:** image priority hints.
- **P2-7 remainder:** only the P2-1 footer-hairline assertion is omitted. Captures include the four requested additions without implementing their deferred visual changes.

## Skipped with reason

- All 18 owner decisions and all “considered and rejected” items in review-8: unchanged by explicit instruction. In particular, source spelling/grammar, facts blocks, Slick series numbers, missing maintenance photography and native ZH decisions remain as before.
- The extended content check found **four existing home-package lead-ins without colons** (three SK, one EN). Fixing these would change content outside P1-3, including the owner-held duplicated SK supplier packages. They are explicit, hash-locked exceptions for the exact unchanged home Markdown files; the checks still reject any changed file or additional list issue. Existing heading-led checks remain, and `ATEX` is treated as an acronym rather than incorrectly lowercased.
- EN `of your` fallback binding: unnecessary; natural balancing passes.
- No requested P0/P1 implementation was skipped.

## Paperwork audit

Audited every language/page assignment, including documents already present inline. Only SK/EN inspections had a suppressed document.

| Page key | Languages | Files per page now | Change |
| --- | --- | ---: | --- |
| inspections | SK, EN | 1 | Restored `TS-Opravnenie.pdf`; inline link retained |
| instruments | SK, EN | 5 | All present; unchanged |
| maintenance | SK, EN | 1 | All present; unchanged |
| aviation | SK, EN | 2 | All present; unchanged |
| references | EN, ZH | 1 | All present; external presentation row unchanged |
| legal | SK | 1 | All present; unchanged |
| home, permits, consulting, risk, contact, 404 | Available routes | 0 assigned | No missing assigned file; no invented documents |

The 11 file records yield 21 rendered page/file assignments across translations. The check requires each file specifically inside the download list, not merely somewhere in prose or the footer, and also checks the applicable hero/rail jumps.

## Every changed content line

### Authored home heading

`src/pages/[...path].astro`, SK `homeLead`, source `_source/pages/skmain.md:7`:

```diff
-Splnenie českých a slovenských legislatívnych požiadaviek pre vašu technológiu
+Splnenie českých a slovenských požiadaviek pre vašu technológiu
```

This is the only word deletion. EN and ZH home text, all frontmatter source strings, and all owner-held strings are unchanged.

### Authored inspections content

The exact changed lines follow (blank lines are structural). These changes use the existing words from `_source/pages/inspections-testing-qualifications-sk.md` and `_source/pages/inspections-testing-revisions-qualifications.md`.

```diff
diff --git a/src/content/pages/en/inspections.md b/src/content/pages/en/inspections.md
index 3384f60..bff542c 100644
--- a/src/content/pages/en/inspections.md
+++ b/src/content/pages/en/inspections.md
@@ -23 +23,8 @@ Testing Service provides the elaboration of all initial and periodic revisions,
-In addition to OSH (BOZP) training, we provide the training and education of professional competence of workers for operations and services of – Electric Devices and Technology – Pressure Devices and Technology – Gas Devices and Technology – Lifting Devices and Technology [See detailed list of training courses and accreditations here.](/s/TS-Opravnenie.pdf)
+In addition to OSH (BOZP) training, we provide the training and education of professional competence of workers for operations and services of:
+
+- electric devices and technology
+- pressure devices and technology
+- gas devices and technology
+- lifting devices and technology
+
+[See detailed list of training courses and accreditations here.](/s/TS-Opravnenie.pdf)
@@ -31 +38 @@ Establishing your technology in Slovak legislation consists of creating the peri
-In addition, we provide a complex testing (including environmental, safety and fire protection) to ensure that technology is fulfilling all legal requirements and is ready for commissioning.In addition, we also provide operators with a complex testing before commissioning. This exhaustive examinations ensures that your technology is ready for commissioning and all local legal requirements are fulfilled. The procedure includes testing of restricted technical devices, testing of environmental factors and fire-protection safety.
+In addition, we provide a complex testing (including environmental, safety and fire protection) to ensure that technology is fulfilling all legal requirements and is ready for commissioning. In addition, we also provide operators with a complex testing before commissioning. This exhaustive examinations ensures that your technology is ready for commissioning and all local legal requirements are fulfilled. The procedure includes testing of restricted technical devices, testing of environmental factors and fire-protection safety.
diff --git a/src/content/pages/sk/inspections.md b/src/content/pages/sk/inspections.md
index b968627..7bb6112 100644
--- a/src/content/pages/sk/inspections.md
+++ b/src/content/pages/sk/inspections.md
@@ -23 +23 @@ TESTING SERVICE zabezpečuje vypracovanie všetkých úvodných a periodických
-Okrem školenia BOZP poskytujeme aj školenie a vzdelávanie odbornej spôsobilosti pracovníkov na operácie a služby
+Okrem školenia BOZP poskytujeme aj školenie a vzdelávanie odbornej spôsobilosti pracovníkov na operácie a služby:
@@ -25,4 +25,4 @@ Okrem školenia BOZP poskytujeme aj školenie a vzdelávanie odbornej spôsobilo
-- Elektrických zariadení a technológií
-- Tlakových zariadení a technológií
-- Plynových zariadení a technológií
-- Zdvíhacích zariadení a technológií
+- elektrických zariadení a technológií
+- tlakových zariadení a technológií
+- plynových zariadení a technológií
+- zdvíhacích zariadení a technológií
```

### Newly surfaced existing UI strings

No new labels were authored. SK inspections reuses `Na stiahnutie`, `Na stiahnutie a odkazy` (heading and rail), `Oprávnenie`, and `PDF`. EN reuses `Downloads`, `Downloads and links` (heading and rail), `Accreditations`, and `PDF · SK`. The existing component supplies the ↓ icons. Breadcrumb title attributes reuse the full current label verbatim on each applicable route.

### Shared rendered typography changes

The source files for these strings are unchanged. In the inventory below, `⍽` denotes U+00A0 (a nonbreaking space); ordinary spaces denote allowed breaks. Repeated appearances of the same label are listed once, with their affected routes.

**SK — `/`**

```diff
-Kontroly a⍽servis leteckých magnet Slick⍽(4600/6300) a⍽Bendix⍽King⍽(S20/S200)
+Kontroly a⍽servis leteckých magnet Slick⍽(4600/6300) a⍽Bendix⍽King (S20/S200)
```

**SK — `/letectvo/`**

```diff
-Kontroly a⍽servis leteckých magnet Slick⍽(4600/6300) a⍽Bendix⍽King⍽(S20/S200), sprostredkovanie opravy avioniky a⍽poradenstvo v⍽oblasti zástavby avioniky.
+Kontroly a⍽servis leteckých magnet Slick⍽(4600/6300) a⍽Bendix⍽King (S20/S200), sprostredkovanie opravy avioniky a⍽poradenstvo v⍽oblasti zástavby avioniky.
```

**SK — `/letectvo/technicka-udrzba/`**

```diff
-500 hodinové a⍽generálne opravy magnet typ Bendix⍽King⍽serie⍽S20/S200 a⍽Slick⍽série⍽4300/6300.
+500 hodinové a⍽generálne opravy magnet typ Bendix⍽King serie⍽S20/S200 a⍽Slick série⍽4300/6300.
```

**SK — `/letectvo/technicka-udrzba/`**

```diff
-250⍽hod./500⍽hod./Revízia (kontrola) magnet Bendix⍽King⍽série⍽S20/S200 a⍽Slick⍽série⍽4300/6300: 236⍽€*/ks
+250⍽hod./500 hod./Revízia (kontrola) magnet Bendix⍽King série⍽S20/S200 a⍽Slick série⍽4300/6300: 236⍽€*/ks
```

**EN — all 10 EN routes**

```diff
-Permits & approvals
+Permits &⍽approvals
```

**EN — all 10 EN routes**

```diff
-Inspections, testing & qualifications
+Inspections, testing &⍽qualifications
```

**EN — `/en/`**

```diff
-Services for operators & suppliers
+Services for operators &⍽suppliers
```

**EN — `/en/aviation/technical-maintenance/`**

```diff
-500 hour inspection and overhaul of aircraft magnetos Bendix⍽King⍽series⍽S20/S200 and Slick 4300/6300 (coming soon).
+500 hour inspection and overhaul of aircraft magnetos Bendix⍽King series⍽S20/S200 and Slick⍽4300/6300 (coming soon).
```

**EN risk lead and its generated description metadata** — `/en/services/risk-atex-pawa/`. U+002D becomes U+2011; every word is unchanged:

```diff
-Uncompromising, unbiased and independent third-party assessment of your safety conditions.
+Uncompromising, unbiased and independent third‑party assessment of your safety conditions.
```

**ZH string inventory:** no visible Chinese string was added or changed. The only new Chinese attribute occurrence is `title="我们的行业案例"` on the `/zh/references/` current breadcrumb, copied verbatim from that existing label. ZH home phrases, optional mobile break, package copy, English UI strings and tracking remain unchanged. No Chinese copy was authored.

## Verification

- `QA_CAPTURE=true npm run build`: **PASS**, including `check:layout` and injected regression probes.
- `npm run check:links`: **PASS** — 50 HTML pages, 1,640 internal URLs/assets/fragments, 27 redirects.
- `npm run check`: **PASS** — 38 files, zero errors/warnings/hints.
- **23 real routes × 390/640/1024/1080/1440 = 115 cases; 46 axe runs; zero failures.** All existing column-width, overlap, overflow, CLS, ZH h1, typography, rail, image-density and interaction checks remain, apart from the explicitly superseded assertions.
- Highest recorded CLS: **0.007366**, below 0.05. No horizontal overflow, narrow columns or overlapping blocks. Mobile 390px explicitly includes all SK/EN/ZH home pages, EN risk, and SK/EN inspections and maintenance; all of these also passed the other four widths.
- Inspected saved mobile home, inspections and maintenance captures, EN desktop home/risk, SK home at 1024 and EN inspections at 640. The EN breadcrumb ellipsises at 390 and is complete at 640; the inspections document/action is visible; magneto make and series can wrap independently.
- ZH checks and captures use the same actual CJK font, **WenQuanYi Zen Hei**; Latin uses self-hosted **IBM Plex Sans**.
- **70 captures** in `docs/review/shots-v8/`: every v7 filename preserved, plus `en-contact-desktop`, `en-contact-mobile`, `404-1024`, and `en-inspections-640`. Older shot directories are untouched. Machine report: `docs/review/qa-v8.json`.
- `git diff --check`: clean. Local commit only; no push.
