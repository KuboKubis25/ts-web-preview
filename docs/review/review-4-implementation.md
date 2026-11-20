# Review 4 implementation

Implemented in review-4 §6 order: P0 reading layout and its four desktop captures, then P1, then P2, then the full browser checks and final captures. DESIGN.md takes precedence over the review. No ArtifactBridge tools or Agent Rooms were used. Source headings and Slick series numbers are unchanged.

## Implemented

- **P0-1:** One article grid contains the prose, downloads, partners and related services. The sticky `nav.rail` sits inside a full-height aside, as DESIGN.md specifies. Its contents use h2/h3 headings and rendered ending blocks, with indentation, title-backed ellipsis, continuous rules and an ink/active-rule scroll-spy state. Related services now use an H3-sized heading in the content column. Prose measure is 40rem; ending blocks have 64px top margins. Short EN/ZH references retain their permitted empty margin.
- **P1-1:** Optional typed facts, rendered by one component in the desktop rail and above mobile prose. Six pages have two verified facts each; mobile uses two columns from 640px, one below, and a 32px gap to prose. Every value is an exact substring of that page's own `_source/pages` file (see table). No maintenance or ZH facts were added.
- **P1-2:** Every aviation breadcrumb has Home / Aviation; Aviation is current on the index and linked on subpages.
- **P1-3:** Aviation fragments gain punctuation and initial capitals, with source headings and words retained. Instruments use nonbreaking spaces in `230 V` and `50 m`; SK permits get letter-list spacing and balanced parentheses. Build-time UI links after both aviation service blocks use `t.more` and respect the deployment base. Regulation links now sit in the original nested list / prose, and duplicate download rows are removed.
- **P1-5:** Latin font preload and a metric-adjusted Plex Fallback in both font stacks. Arial is followed by its Linux metric-compatible fallback, Liberation Sans; regular and medium/bold fallback faces use size-adjust 98.4%. Delayed-font checks verify unchanged home eyebrow line counts and CLS below 0.05 at 390px on every route.
- **P1-6:** Start/end fades update on initial font readiness, resize and passive scrolling. Both show in the middle; only the hidden edge fades at either end.
- **P2-1–3:** Footer closing starts at column 8, including the email and button; token-derived line-box offsets accommodate Latin and CJK headings. Nested list margins are 4px / 0. Capabilities align at their first line with 16px top padding and equal-height row rules.
- **P2-4:** Packages open by default when there are no capabilities. ZH intro paragraphs use keep-all wrapping and explicit phrase boundaries; no prose was translated or rewritten.
- **P2-5:** Home, interior and teaser stacked photos are capped at `min(50svh, 400px)`. Existing real source photographs and responsive srcsets are retained; browser checks reject enlargement or insufficient image candidates.
- **P2-7:** First-child prose margins remain zero. The rail gets the specified 6px baseline offset. Article top padding follows DESIGN.md's `section-y / 2`; the discrepancy with the review's literal 64px is recorded below.
- **P2-8–9:** Decorative aerial wrapper no longer advertises an empty labelled group. The CSS ink property and browser theme-color now use the same `colors.ink` constant.

## Source-verbatim facts

| Pages | Own source file | Exact values |
|---|---|---|
| SK permits | `_source/pages/povolenia-schvalenia.md` | `MPSVaR SR č. 508/2009 Z. z.`; `VTZ - A,B,C` |
| EN permits | `_source/pages/permit-assurance.md` | `Decree (SK)508-2009`; `restricted technical devices (RTDs)` |
| SK aviation | `_source/pages/aviation.md` | `No 2018/1139`; `No 1321/2014` |
| EN aviation | `_source/pages/aviation-2.md` | `No 2018/1139`; `No 1321/2014` |
| SK instruments | `_source/pages/aviation-testing-service.md` | `Žiliny (LZZI)`; `info.aviation@testing-service.org` |
| EN instruments | `_source/pages/aviation-testing-service-2.md` | `Žilina (LZZI/ILZ)`; `info.aviation@testing-service.org` |

Facts intentionally preserve the source's declension, punctuation and device-list spacing. The normalized prose is separate. The aviation facts use two regulation rows: the review's proposed combined EASA wording is not verbatim, and `SK.145.031` does not occur in either aviation page's source file. A download title is insufficient under the owner's page-source-only rule.

## Skipped / contract differences

- **P1-4:** No choice between Slick 4600/6300 and 4300/6300. Series numbers remain unchanged everywhere, and both maintenance pages have no facts block.
- **P2-6:** No transparent trim is possible on the supplied asset. `_source/img/Na%C5%A1i_Partneri.jpg` is actually a 1268 × 209 RGB WebP with no alpha channel, zero transparent pixels and an opaque white margin. It is the only partners composite in `_source/img`. Cropping that opaque margin would exceed the owner's “transparent margin only” instruction, so no derived asset or image modification was made.
- **P2-7 literal 64px:** DESIGN.md defines `section-y: clamp(64px, 3rem + 4vw, 120px)` and article padding `section-y / 2`. At 1440px that is 52.8px, not 64px; the rail's Label also has its prescribed 6px baseline offset. The QA check enforces this governing formula and alignment rather than silently changing the design tokens to satisfy the conflicting review number.
- **Owner-data items:** Phone number; real form endpoint and success state; aviation naming; replacement card descriptions; ZH English eyebrow/footer copy; EN references lead; vector logo; Slovak references page. All remain unchanged.
- **Unverified facts:** No facts for risk, consulting, inspections, legal, references or ZH; no certificate fact sourced from a different file.

## ZH strings for native-speaker check

New short UI labels (both currently unused on the two ZH routes):

| Key | String |
|---|---|
| `facts` | `要点` |
| `partners` | `合作伙伴` |

The only modified ZH prose strings are the existing two home intro strings below. Removing `<wbr>` reproduces the previous strings exactly; the text itself is unchanged.

```html
Testing Service <wbr>是一家具有悠久传统的<wbr>精品法律与工程咨询公司

凭借 20 多年经验，<wbr>我们为运营商、制造商和供应商<wbr>提供技术在捷克与斯洛伐克<wbr>满足本地法规要求的<wbr>一站式高端服务
```

The disclosure's existing `套餐完整说明` label is unchanged; only its initial open state changes. No other ZH strings were added or changed.

## Verification

`check:layout` retains column-width, sibling-overlap and horizontal-overflow checks at 390, 640, 1024, 1080 and 1440px, plus accessibility and responsive-image checks. New checks cover rail presence/edges/targets/active treatment, source-verbatim facts and mobile layout, ending spacing, delayed-font CLS and eyebrow wrapping, tab fade transitions, footer column/baseline alignment, all three stacked-photo caps, article start rhythm, nested lists, capabilities, ZH disclosure/wrapping, breadcrumbs, aerial semantics and the shared theme token. Interaction checks exercise sticky rail navigation through h3 and ending targets; regression probes deliberately displace/remove the rail, change article padding and move the footer closing to verify detection.

Final results and capture manifest are recorded in `qa-v4.json`. Captures are confined to `shots-v4/`; `shots-v3/` is unchanged. The set retains all v3 filenames and adds risk and maintenance desktop/mobile captures and `sk-aviation-testing-mobile-tabs.jpg`.

Final checks:

- `QA_CAPTURE=true npm run build`: passed; 23 routes × 5 widths, 46 axe runs, zero failures.
- Worst measured 390px CLS with fonts delayed 350ms: **0.002862** (`en/references/`), below 0.05.
- `npm run check:links`: passed; 50 HTML pages, 1,613 internal URLs/assets/fragments, 27 legacy redirects.
- `npm run check`: passed; zero errors, warnings or hints.
- 35 screenshots in `shots-v4/`, including all 30 previous capture names plus the requested additions (and risk/maintenance mobile views). The final captures run before axe's focus/scroll probes so they show the arrival state.
- Visual checks covered the desktop rail on aviation, permits, risk and maintenance; mobile aviation/facts and EN/ZH home; tablet photo caps; and the scrolled mobile tab state. Source headings match the pre-change files, and removing `<wbr>` from the two ZH intro strings restores them byte-for-byte.
