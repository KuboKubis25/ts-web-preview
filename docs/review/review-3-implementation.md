# Review 3 implementation

Implemented against `DESIGN.md`, with the owner's decisions taking precedence on source content. No ArtifactBridge or Agent Rooms were used. Local commit only; no push.

## Implemented

- **P0-1–4:** full-width home section headers and gallery header; split intro; row-filled 3/2/1 capabilities grid; one footer closing; balanced company/legal/services/aviation footer; semantic list stacks with equal desktop/tablet row heights, List typography and inline metadata.
- **P1-1–12:** photo-free numbered cards at the 540/1120 container thresholds; single separators; true hero bottom spacing; removal of interior/teaser eyebrows and redundant aviation navigation; consistent language tags; mobile menu rules and arrows; flush desktop dropdown; capped, full-width stacked hero photo; top-aligned teaser; contact and related baselines; restored nested regulation lists; scrolling aviation tabs with an overflow fade; nonbreaking eyebrow separators.
- **P2-1–9:** exposed design tokens, typography/spacing cleanup, touch targets, complete Chinese first-sentence card descriptions, typed and ordered downloads, localized certificate/accreditation titles, duplicate link removal, source typography corrections, consistent gallery cells, contact CTA state, consolidated CSS and expanded layout QA.
- Removed the 2019 order-form listing and replaced the English prose link with the 2024 form, marked SK. The English page keeps that prose link and omits the duplicate download row. The source files remain archived under `_source`.
- Removed the duplicated Slovak instruments sentence. Preserved source headings, including Aviation Testing / Aviation Service. Shortened two SK and two EN card descriptions only by deleting source words, with sentence-initial capitalization where needed.
- Removed duplicate instruments email/map/AIP rows and the duplicate references row; their inline source links remain. Kept the promotional presentation and the Chinese PDF row, with `PDF · 中文` metadata.
- Excluded four gallery sources unable to supply a 620px-wide 3:2 cell, and excluded the teaser photo. Replaced two featured images with sufficiently large sources.

## Contract resolutions

- The aviation email appears once in the footer, in its closing row on aviation pages, and in the aviation column elsewhere. This satisfies the unique-href rule.
- Hero bottom spacing is measured from the last visible content box, including the photo where it extends below the text. Photos stay aligned to the heading as DESIGN requires.
- At 390px, the SK and EN card heights total under 900px. ZH totals about 927px: DESIGN's complete first sentences, fixed typography/spacing and preserved source headings take precedence over the review's 900px target. No clipping or ellipsis is used.
- Paragraphs in the collapsed intro retain DESIGN's reading-width limits; QA checks those limits instead of requiring the text to stretch across the full container.

## Verification

- `npm run build` includes `check:layout`: 23 content routes at 390, 640, 1024, 1080 and 1440px, plus 46 axe runs.
- Added rendered assertions for section-heading alignment, adjacent rules, equal list heights, hero spacing, CTA duplication, footer link counts/uniqueness, eyebrow line starts using text Ranges, token line heights and touch targets.
- Additional checks cover List typography, nested regulations, retired order forms, localized footer questions, hero photo width/height, contact baselines, contact footer spacing, card layout, gallery resolution, menu rules, dropdown placement and aviation-tab behavior.
- Regression probes deliberately displace a heading, duplicate a footer link, resize a list row and introduce off-token leading, then verify the new checks reject those defects.
- Existing checks cover overflow, overlapping elements, grid collapse, image resolution at 1×/2×, keyboard interactions, no-JavaScript navigation and form validation.
- `npm run check` and `npm run check:links` pass. Layout results: `qa-v3.json`. Screenshots: all 27 previous filenames under `shots-v3/`, plus `sk-service-640.jpg`, `sk-aviation-mobile-tabs.jpg` and `zh-home-1024.jpg`.
- Visually inspected desktop 1440 and mobile 390 home, service, aviation, instruments, contact and references compositions, plus ZH at 1024.

## Skipped / retained

- Phone number and live form endpoint, as requested.
- Source-heading rewrites and newly authored card copy, as requested.
- ZH compression beyond the complete first source sentence, because DESIGN wins.
- Native Chinese editorial approval remains an owner task; the supplied UI labels were used.
