# Review 2 implementation

Implemented P0, P1 and P2 against `DESIGN.md`; the design contract takes precedence. The accepted owner defaults are applied: the source compliance sentence is the home H1, existing page titles are the short service titles, and service/Aviation endings use the closing question. No ArtifactBridge or Agent Rooms were used. Local commit only; no push or deployment.

## Implemented

| Review item | Change |
| --- | --- |
| P0-1 | All 12-column spans live exclusively in the ≥1080px breakpoint. Base grids have one column. Replaced the `#enquiry` layout selector with `.contact-form-col`; form appears first below 1080px. |
| P0-2 | Stacked grids use zero row gap; photo/copy transitions receive the explicit 32px separation. |
| P0-3 | Added `scripts/qa-layout.mjs` as a mandatory part of `npm run build`, with route-wide geometry, image and accessibility checks, interaction assertions, and reproducible screenshots. CI installs Chromium. |
| P1-1 | SK/EN/ZH home H1s use the existing compliance sentence; removed the duplicate lead. Applied the display token, vertically centred 7/5 desktop composition and stacked mobile/tablet layout. |
| P1-2 | Removed repeated services/packages, contact, references, legal, 404 and Aviation hero eyebrows. Kept the informative eyebrows specified by DESIGN. |
| P1-3 | Body-sized contact address, locale-specific Prague heading, consistent hero/article rhythm, no extra Prague rule, compact contact footer and current-state header CTA. |
| P1-4 | Service/Aviation hero actions jump to downloads where present. Closing headings use the accepted question, followed by optional Body copy and a primary CTA; removed generic duplicate closing copy. |
| P1-5 | Aviation shares the downloads → partners (index) → closing → related ending. Gallery follows on stone. Removed the now-redundant empty contact heading in the Slovak maintenance article. |
| P1-6 | `sections.ts` owns ordered service and Aviation keys. Cards, navigation and related rows use page titles. Chinese links consistently reuse existing Chinese home service titles because Chinese service detail pages do not exist. |
| P1-7 | Download language and division are typed data; language suffixes removed from titles. Shared language tags handle cross-language files and unboxed button/dark variants. English halves of existing bilingual document titles are used where available. Slovak accreditation/GDPR files correctly identify SK. |
| P1-8 | Removed automatic first-paragraph lead styling. Article paragraphs remain Body; the home introduction's supporting paragraph is also Body. |
| P1-9 | Aviation services are H3 children of the offer section, regulation bullets are nested, and the EASA URL has a readable link label. |
| P1-10 | Capabilities and disclosure form one continuous stack, without the extra margin/rule. |
| P1-11 | Download, email and related rows share 17px/500 titles and consistent metadata/icons. Capabilities remain 400. |
| P1-12 | Container-driven 1/2/4 service cards, 24px gaps, and 16:9 mobile card photos. |
| P1-13 | Chinese cards use descriptions and titles from `_source/pages/zho.md`; no English card bodies. Chinese home includes the Aviation teaser with an EN destination tag, but no invented Chinese Aviation description. Latin teaser/eyebrow strings have `lang="en"`. Phrase-level wrap opportunities preserve the Chinese hero's words. |
| P1-14 | Framed photos are cropped to 3:2 before responsive resizing, with candidates capped by the usable source crop. Home cover retains its native source ratio with crop-aware `sizes`. Replaced the Aviation panorama with real photos listed below. Partner artwork uses its natural size, responsive width and multiply blending. |
| P1-15 | Desktop services dropdown ships closed, including without JavaScript. Mobile CSS exposes the service list without JS forcing the details element open. |
| P2-1 | Mobile menu has a close icon, viewport-height scrolling panel, root scroll lock, service label, ruled rows and full-width CTA. Escape closes and returns focus. |
| P2-2 | Intentional 13px/600 stacked mobile wordmark beside the 32px mark; no extra breakpoint. |
| P2-3 | Article-to-related spacing is 64px. |
| P2-4 | Prose measure is 38rem; downloads, closing and related stacks retain the full content width. |
| P2-5 | Footer top email follows the division. Duplicate company email removed except on contact. Industry and Aviation documents occupy their respective columns; Chinese footer action uses a distinct enquiry label. |
| P2-6 | Mailto list rows use ↗, including contact and instruments. The form's mailto action also uses the external arrow. |
| P2-7 | Standalone text links have 44px hit height; contents links gain 6px vertical padding. |
| P2-8 | Client optical height is 40px, with a quieter Dürr and enlarged Hyundai wordmark. Reference-strip border overrides removed; adjacent section rules share one physical hairline. |
| P2-9 | Added the distinct Aviation hover token and used it for dark buttons/footer link hover. |
| P2-10 | Navigation/disclosure UI uses 500 and labels use 600. |
| P2-11 | Normalised source punctuation, spaced dashes and heading case. English capability fragments on the SK home were replaced with existing Slovak Aviation service wording. |
| P2-12 | Removed duplicate references headings in EN/ZH and linked the existing “here”/“此处” wording to the main reference list. |
| P2-13 | Balanced home eyebrow with nonbreaking `CZ + SK`. |
| P2-14 | 404/legal heroes follow the shared eyebrow/action rules; 404 retains its primary home action. |

## Photos and resolution

- Aviation index hero: `20190628_141438.jpg` (1500 × 844), showing the actual branded service vehicle and aircraft.
- Home Aviation teaser: `TESTING_CENTER-21%5B198%5D.jpg` (1500 × 851), showing the aircraft and test equipment.
- Instrument-testing hero retains the real cockpit/test-equipment photo `TESTING_CENTER-32%5B209%5D.jpg` (1500 × 964).
- Replaced the undersized featured gallery photo `TESTING_CENTER-25%5B202%5D.jpg` (250 × 307) with `TESTING_CENTER-36%5B213%5D.jpg` (1085 × 981). The small photo remains in the expanded gallery at its available resolution, never enlarged.
- Inspected `Sn%C3%ADmka.JPG`; it is a regulation table, not a photograph, so it was not used for a hero.
- Home hero includes native-source variants through 1440/1500w. Its `sizes` accounts for cover cropping; a nominal 42vw-only declaration would choose too few vertical pixels on desktop.
- Browser QA decodes the selected image files and compares actual pixel dimensions against the rendered crop and device pixel ratio. It checks 1× across the route matrix and 2× for SK/ZH home and Aviation at 390/1440px. Available source resolution caps the 2× target; no source enlargement is generated.

## Chinese native-speaker check

No new Chinese marketing/service prose was written. Service descriptions, service names, the compliance sentence and package lead come from `_source/pages/zho.md`; reference text comes from `_source/pages/references-zho.md`. The Aviation proper name stays English and the link advertises the EN destination.

New, rendered UI labels requiring native review:

| Label | Use |
| --- | --- |
| 航空 | Navigation/footer division label |
| 详情 | Service-card and Aviation-teaser action |
| 发送咨询 | Footer enquiry action |

Also check the existing rendered UI labels retained from the implementation: 首页, 菜单, 关闭菜单, 跳转到内容, 行业案例, 联系我们, 下载, 下载和链接, 公司信息, 语言, 套餐完整说明. Existing source labels 我们的客户, 我们的服务 and 雇主 / 运营商套餐 are reused unchanged.

Unused Chinese form, gallery and service-ending labels remain empty: there are no Chinese pages that render those controls. No speculative form translations or Chinese closing-question prose were added. Chinese headings use keep-all wrapping; the hero adds nonbreaking source phrases so 捷克 and 法律 are not split.

## Verification

- `npm run check`: zero errors, warnings or hints.
- `npm run build`: 50 generated pages; its browser gate passes.
- `npm run check:links`: all internal URLs/assets/fragments and 27 legacy redirects pass.
- The same build and link checks pass with `BASE_PATH=/ts-web-preview`.
- Browser matrix: all 23 content routes (including 404) × 390/640/1024/1080/1440px = 115 layout checks per build.
- Axe: all 23 routes at 390 and 1440px = 46 WCAG A/AA scans per build, zero violations.
- Interaction checks: mobile menu/scroll lock/close icon/Escape/focus return, closed desktop dropdown, form validation, expanded gallery, no-JS mobile navigation and closed no-JS desktop dropdown, 2× image selection.
- Evidence: `qa-v2.json` (root build), `qa-v2-preview.json` (preview-path build), and `shots-v2/`. All `shots-v1/` filenames are reproduced, with additional mobile page captures and the requested menu/dropdown states.
- Manually inspected the 390px contact, home SK/ZH, service, Aviation and menu captures, plus the 640px gallery and desktop compositions. Native-language review remains a human check.

The review's literal universal 280px text-width threshold conflicts with DESIGN's intentionally smaller card interiors, two-column form fields and indented lists. The gate therefore uses explicitly bounded thresholds for those named patterns, excludes inline breadcrumb items, and separately asserts that every stacked structural column fills its container. It checks sibling rectangle intersections and document overflow independently. This catches the original zero-width contact column even without page overflow.

Detector results: 11 `hero-eyebrow-chip` findings, exclusively the eight service pages and three home pages. The remaining findings are 69 `cramped-padding`, nine `flat-type-hierarchy`, two `tight-leading`, and one `design-system-font-size`. The padding findings target full-bleed bands/ruled rows whose inset lives in their containers; the type findings reflect the prescribed H3/H4 hierarchy. The new font-size finding is the explicitly required 13px mobile wordmark, specified in DESIGN's Header rule although absent from its YAML type ramp. DESIGN takes precedence; the wordmark remains 13px. These are recorded exceptions, not a claim that the detector reports zero findings.

Run `npx playwright install --with-deps chromium` once after installing dependencies. `npm run qa:capture` refreshes the report/screenshots against an existing build; the normal build runs the same assertions without modifying committed screenshots.

## Skipped

- Phone number: none supplied in the source; no number invented.
- Live form endpoint: not supplied; existing mailto fallback retained.

No P0/P1/P2 implementation item is deferred. Native-speaker checking is identified above, not claimed as completed. Existing source facts such as the Prague “coming soon” status remain as supplied.
