# Review 1 implementation

Implemented P0, P1 and P2 against `DESIGN.md`. No push or deployment.

| Review items | Implementation |
| --- | --- |
| P0-1, P0-3 | Colour, typography, spacing and control tokens; 1312px container; shared 12-column layout; 640/1080px breakpoints and matching image sizes. |
| P0-2, P0-5 | Original-colour roundel crop, readable brand text, removal of filler captions/labels/numbering; accent full stop only on h1. |
| P0-4, P1-3, P2-1 | Paragraphs restored from sentence-headings; short section headings; 68ch prose; conditional sticky contents with current-section indicator. Source-authored home headlines and leads. |
| P1-1, P1-2, P1-4 | Sticky 72/60px header, 44px targets, expanded mobile services, accurate breadcrumbs, shared language tags and interior heroes. |
| P1-5–P1-8 | Shared section headings, aligned card content subgrid and short descriptions, package lead/list/disclosure structure, unified download/email/external-link rows. |
| P1-9–P1-11, P2-3–P2-4 | Complete Aviation accent swap, light Aviation teaser, fixed photo ratios/treatment, optical client-logo sizing, four-column footer, eight featured Testing Center photographs and labelled aerial group. |
| P1-12, P2-2, P2-5–P2-7 | Visible focus, inline form errors, scoped form styles, service closing CTA, contact layout, CJK typography, shared SVG arrow grammar. |
| P2-8–P2-10 | 404 action layout, redirect document language, responsive browser QA and fresh screenshots. |

## Content preservation

SK and EN use the original **Testing Service** heading from `_source/pages/skmain.md` and `_source/pages/testing-service-eng.md`; the full compliance sentence from each source is the hero lead. This avoids breaking long Slovak words at 640px without changing the prescribed type scale. ZH retains its source headline and omits the duplicate lead.

A comparison against the original Markdown bodies passed after accounting for heading markup, case, moving package introductions/closing sentences into frontmatter, and the requested map-label correction. No factual body copy was removed or rewritten. The Slovak contact-country labels were localised; photo alt text describes the inspected images. Source prices, certificates and regulatory wording remain unchanged.

## DESIGN.md precedence

- Cards use four content subgrid rows, with a separate image row and the hover rule above the image.
- Closing CTA headings use the H4 visual step. Contact/form/download titles use the H3 visual step. Semantic h2/h3 elements preserve an unbroken document outline; visual steps do not dictate HTML levels.
- The menu text hides at the existing 640px breakpoint, retaining its accessible name; no conflicting 400px breakpoint was introduced.
- Informational eyebrows remain as explicitly specified by DESIGN.md. The detector's request to remove every hero eyebrow conflicts with that requirement.

## Validation

- `npm run build`: **pass**, 50 pages.
- `npm run check:links`: **pass**, 1,700 internal URL/asset/fragment checks and 27 legacy redirects.
- Preview-base build and link check with `BASE_PATH=/ts-web-preview`: **pass**. Root build restored afterward.
- `npm run check`: **pass**, zero errors, warnings or hints.
- CSS contract: no colour hex outside `:root`, all font sizes use type tokens, only 640px/1080px layout breakpoints.
- All Markdown section headings are at most 80 characters.
- Playwright: nine routes at 1440, 1080, 1024, 640 and 390px (45 views); no horizontal overflow, text below 12px, broken images or browser exceptions. Header heights are exactly 72/60px.
- Axe WCAG A/AA: ten representative page/viewport scans; zero violations. This is a sampled automated check, not a full accessibility certification.
- Interaction checks: skip link; desktop dropdown/Escape; mobile menu/Escape; inline invalid fields; package disclosure; gallery disclosure; cross-language destinations; current contents link; mobile navigation without JavaScript. All passed.
- [Screenshots](shots-v1/): the original 11 desktop/mobile views plus nine breakpoint views. Captured without focusing a control, after fonts/images loaded and page surfaces had painted.

### Detector results

Ran `.agents/skills/impeccable/scripts/impeccable detect --json dist/` (the installed path). Zero `tiny-text`, `undersized-ui-text`, `numbered-section-labels` and `skipped-heading` findings.

The detector exits 2 with 76 warnings, retained transparently rather than suppressed:

| Rule | Count | Disposition |
| --- | ---: | --- |
| hero-eyebrow-chip | 21 | Informational labels required by DESIGN.md. |
| cramped-padding | 51 | Static detector reports token-based dropdown padding and full-width bands; rendered dropdowns have 16px padding and bands have an inset `.wrap`. |
| flat-type-hierarchy | 2 | Contact headings intentionally use DESIGN.md's 22px/18px steps. |
| tight-leading | 2 | Home display/label leading follows the explicit type tokens. |

## Deferred for owner input

- Phone numbers and replacement role mailbox: no supplied values.
- A live form endpoint and its success response: no endpoint/response contract supplied; the existing mail-client fallback remains, with inline invalid-field feedback.
- New response-time promises, industrial accreditation numbers, Prague opening date and equipment-type guidance: require owner-approved facts/copy.
- Adding logo red to the site palette: requires an owner decision and a DESIGN.md change.

No other P0–P2 work was deferred.
