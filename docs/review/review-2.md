# Design review 2: v1 (Testing Service website)

Method: dual-agent (A: isolated design review, B: isolated detector + rendered measurement), synthesised by the reviewer, who also reviewed every screenshot in `docs/review/shots-v1/` (all 20, in full-resolution tiles). Run date 2026-11-12. Non-interactive run: no owner questions were asked; owner decisions are listed at the end.

Inputs: `PRODUCT.md`, `DESIGN.md` (round-1 version), `review-1.md`, `review-1-implementation.md`, `src/**`, `dist/` (fresh `npm run build`, 50 pages), the screenshots, and Playwright measurements at 1440 / 1080 / 1024 / 640 / 390px on 9 routes.

**DESIGN.md was refined in this round** (see its "Changes in round 2"). Implement against the new DESIGN.md. Where this document and DESIGN.md disagree, DESIGN.md wins.

---

## 1. Verdict

v1 is a real step up. On desktop the system now holds:
- one left edge for labels (x = 64) and one for content (x = 509.3) on every page type;
- 100% on-token colours (15 of 15 seen);
- one button family; no radius; one shadow;
- no text below 12px; axe 0 violations on 18 runs;
- an Aviation accent swap that works down to the footer arrows.

The owner's "lots of inconsistencies" complaint is mostly answered **at 1440px**.

It is not yet neat:
- **Mobile and tablet break the system.** The contact page is visually broken on every viewport below 1080px, and the gallery header is too. Both trace to one CSS-architecture flaw.
- **Repeated-pattern drift has moved from styling to content.** Eyebrows repeat their own headings. "Kontaktujte nás" appears five times on a service page. Service names and order differ between the cards, the dropdown and the related list. Aviation pages end differently from service pages. The ZH home mixes Chinese titles with English card text.
- **The home page makes no claim.** The 72px h1 says "Testing Service." directly under a header that already says TESTING SERVICE.

The look is now tidy-corporate rather than AI-generic. But "The Inspection Report" still lives only in the tokens, not in anything a visitor would remember.

## 2. Scores

### Critique: Nielsen heuristics (Persuade surface; 7 and 10 n/a)

| # | Heuristic | v0 | v1 | Key issue in v1 |
|---|---|---|---|---|
| 1 | Visibility of system status | 2 | 3 | Sticky header, breadcrumbs, live contents nav. But no current state for the CTA on the contact page, and the mobile menu icon doesn't change when open. |
| 2 | Match system / real world | 2 | 2 | Language leaks: EN capabilities on the SK home, EN card text on ZH, "(SK)" in titles. mailto rows use the internal-link arrow. |
| 3 | User control and freedom | 3 | 3 | No traps. Language fallback is labelled. |
| 4 | Consistency and standards | 1 | 2 | Desktop is consistent. Mobile grid collapse is broken; names, order and endings drift between components. |
| 5 | Error prevention | 2 | 2 | mailto-only form; contact layout unusable below 1080px. |
| 6 | Recognition rather than recall | 2 | 3 | Good contents nav. An empty "Naše služby" h2 sits in the aviation contents. |
| 7 | Flexibility and efficiency | n/a | n/a | Marketing surface. |
| 8 | Aesthetic and minimalist design | 2 | 3 | Calm. The remaining noise is redundant eyebrows and repeated CTAs. |
| 9 | Error recovery | 2 | 2 | Inline `:user-invalid` messages; no success state. |
| 10 | Help and documentation | n/a | n/a | Marketing surface. |
| **Total** | | **16/32** | **20/32** | **Acceptable → Good on desktop; mobile pulls it down.** |

Cognitive load: **4 of 8 checks fail.**
- Single focus (five contact CTAs per service page).
- Minimal choices (closing strip, then related, then footer: three conversion blocks back to back).
- Visual hierarchy on home (the claim sits in a 20px lead).
- Working memory on *Skúšky avionických systémov* ("send the completed form", but the form row is about 900px lower).

### Audit: technical

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 3 | axe 0 violations. Undersized standalone links: clients "Referencie EN" is 133 × 19.6px, contents links 21.7px tall. Contact content is unreadable below 1080px. |
| 2 | Performance | 3 | Static and lean. Photos are upscaled: home hero 720w file shown at 720 × 680; panoramic 1500 × 455 sources cropped and enlarged on the aviation hero and teaser. |
| 3 | Theming | 3 | All colours are tokens. No `aviation-on-dark-hover`, so blue buttons and links have no hover. Some UI text renders at weight 400 (nav summary 15/400, dropdown intro 12/400). |
| 4 | Responsive | 2 | Contact page and gallery head broken at 1024/640/390. Home hero is squeezed 50/50 down to 640. Cards are 4 × 230px at 1080. Page-hero photos are 922 × 692 at 1024. |
| 5 | Implementation integrity | 2 | Specificity-dependent collapse; service order from collection order; language notation hard-coded in titles; lead inferred from the first Markdown paragraph. |
| **Total** | | **13/20** | **Acceptable** |

### Detector (`impeccable detect --json dist/`; `src/` scans clean)

76 findings:

| Rule | Count | Verdict |
|---|---|---|
| hero-eyebrow-chip | 21 | Partly real. Most are eyebrows that repeat their heading or sit above a tab row that already names the division. The new Informative Eyebrow Rule removes them on contact, references, legal, 404 and the aviation pages. Service pages (parent "Služby") and the home hero keep theirs on purpose. |
| cramped-padding | 51 | False positive. Dropdown rows have 17px insets; bands are full-bleed with an inset `.wrap`. |
| flat-type-hierarchy | 2 | Contact page: accepted, because the page h1 carries the hierarchy. |
| tight-leading | 2 | Prose H2 at 1.25: a heading, so false positive. |

The browser overlay also flagged "kicker-above-heading" on Services → Naše služby and Aviation → Testing Service Aviation. That agrees with the design review: the first is redundant and gets fixed; the second stays as an allowed eyebrow.

## 3. Review-1 status

- **Fixed (keep):**
  - Tokens and the two breakpoints.
  - Roundel crop.
  - Column-Five on desktop.
  - Microcopy purge; the full stop only on h1.
  - Sticky 72/60px header with 44px targets.
  - Lang-tag in nav, cards and buttons.
  - Breadcrumb trail.
  - Card subgrid.
  - List rows with file meta and the ↓ ↗ arrows.
  - Aviation tabs and accent swap.
  - Light aviation teaser.
  - Photo saturate treatment.
  - Four-column footer.
  - Focus ring and inline errors.
  - CJK tracking.
  - Conditional sticky contents.
- **Regressed or newly introduced:**
  - Contact layout and gallery head below 1080px (P0-1).
  - The home h1 lost its claim (P1-1).
  - "(SK)/(EN)" returned through download titles (P1-7).
  - Dropdown order differs from the cards (P1-6).
  - The closing CTA uses `t.cta` three times (P1-4).
  - Auto-lead styles fragments such as "TESTING SERVICE s.r.o. divízia AVIATION" (P1-8).
- **Still inconsistent:**
  - Double hairline under the packages list (P1-10).
  - Aviation pages lack the service-page ending (P1-5).
  - 48px eyebrow gap when stacked (P0-2).
  - Rhythm after the article (P2-3).
  - Related-row and list-row typography disagree (P1-11).

---

## 4. Fix list

Every item names the file, what is wrong, and the exact target. Token names refer to the new `DESIGN.md`. "Owner" marks items that need an owner decision; implement the stated default.

### P0: blocking

**P0-1. The grid collapse is specificity-dependent, so the contact page and gallery head break below 1080px.**
- **Files:** `src/styles/global.css` (the `.grid > :is(div, aside, img, h2, .eyebrow)` reset in `@media (width < 1080px)`, plus every desktop `grid-column` rule).
- **What breaks:**
  - `.contact-layout > #enquiry { grid-column: 5 / span 8 }` has ID specificity, and `.section-head.grid > h2/.eyebrow` (0,2,1 / 0,3,0) also outranks the mobile reset. They keep their 12-column spans on a one-column grid, which creates implicit tracks.
  - At 390px, `.contact-details` is **0px wide**: address and e-mails render one character per line and the form overlaps the company name (see `shots-v1/sk-contact-640.jpg`).
  - At 1024px the contact page stays two-column (details 307px, form 550px).
  - The gallery eyebrow "ŽILINA · LZZI" is 36px wide at 390, and its h2 is offset to x = 88.
- **Target (Collapse Rule):**
  - Rewrite layout mobile-first. `.grid` is `display: grid; grid-template-columns: minmax(0, 1fr); row-gap: 0` by default.
  - Inside `@media (width >= 1080px)` only: `grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 24px`, and **all** `grid-column` declarations (`.intro-section > div`, `.packages > div`, `.article-layout > div`, `.related > div`, labels and asides, `.page-hero > div`, `.page-hero > img`, `.aviation-feature-grid > *`, `.contact-details`, the form column, `.section-head.grid > *`, `.footer-top > *`).
  - Delete the `< 1080px` `:is()` reset.
  - Replace `#enquiry` in CSS with a class (`.contact-form-col`). Keep the `id` for the `#enquiry` anchor.
  - Below 1080px the contact page shows the form first, then the details: `order: -1` on the form column, or reorder the DOM and use `order` at ≥1080px.
- **Verify:** at 390, 640 and 1024, no element inside `main` has a width below 200px unless it is an icon, tag or logo. Contact details and the form each span the full container.

**P0-2. Stacked label + content has a 48px gap (should be 16px).**
- **File:** `global.css`, the `.grid { row-gap: var(--space-6) }` rule below 1080px.
- At 390/640/1024 the label "SLUŽBY" sits 48–60px above the packages h2, versus 16–28px in the services section. "Ďalšie služby" has the same gap.
- **Target:** solved by P0-1 (`row-gap: 0`). Where two stacked blocks need separation (page hero copy → photo, aviation teaser image → copy), add `margin-top: var(--space-6)` to the second block below 1080px only.

**P0-3. Mandatory visual QA gate (process).**
- v1's QA reported "no overflow" while `sk-contact-640.jpg` showed a broken page. Overflow checks don't catch collapsed columns.
- **Target:** extend the Playwright script used for `qa-v1.json`. For every route at 390/640/1024/1440, assert:
  - (a) every `main` text block (`p, h1–h4, li, a.list > *, label`) has `getBoundingClientRect().width >= min(280, viewport − 2 × gutter)`;
  - (b) no two block siblings overlap;
  - (c) `scrollWidth === innerWidth`.
- Fail the build check on any violation. Re-shoot `shots-v2/` with the same names as `shots-v1/`, plus the mobile menu open at 390 and the services dropdown open at 1440.

### P1: major

**P1-1. The home hero h1 must state the offer (Owner: default below).**
- **Files:**
  - `src/pages/[...path].astro`: the home branch, `<h1>{lang === "zh" ? homeLead : d.title}`, and `.hero-description`.
  - `global.css`: `.home-hero`, `.hero-copy`, `--text-display`.
- **What's wrong:**
  - SK/EN render "Testing Service." at 72px under a header that says TESTING SERVICE; the actual promise is a 20px lead.
  - ZH already uses the claim, so the three languages diverge.
  - The copy block sits at the top of a 680px band with about 300px of empty ink below the button.
  - At 640–1079 the 50/50 split squeezes the copy to 320px ("Testing / Service.", a two-line eyebrow) beside a 320px photo sliver.
- **Target:**
  - **All languages:** h1 = `homeLead` (existing source copy) + `<span class="gold">.</span>`. Remove the `.hero-description` paragraph.
  - `--text-display: clamp(2.5rem, 1.6rem + 2.4vw, 3.75rem)`, line-height 1.08, letter-spacing −0.028em, `max-width: 18ch` (`:lang(zh)` keeps 600 and `max-width: 11em`).
  - At ≥1080px, `.home-hero { grid-template-columns: 7fr 5fr; min-height: min(640px, 80svh) }`.
  - `.hero-copy { display: flex; flex-direction: column; justify-content: center; padding-block: 96px; padding-right: 64px }`.
  - **Below 1080px:** stack. Copy first, padding 48px gutter 40px; photo after it at `aspect-ratio: 3 / 2`.
  - Hero photo: add a 1440w variant (`widths={[720, 1080, 1440]}`, `sizes="(min-width:1080px) 42vw, 100vw"`); the current 720w file is upscaled to 720 × 680.

**P1-2. Eyebrows that repeat their heading (Informative Eyebrow Rule).**
- **Files:** `[...path].astro` and `src/data/ui.ts`.

| Where | Now | Target |
|---|---|---|
| Home services section-head | eyebrow `t.services` "Služby" over h2 "Naše služby" (ZH: 我们的服务 over 我们的服务) | remove the eyebrow; section-head is just h2 |
| Home packages label (`.packages > .eyebrow`) | "Služby" again, straight after the services section | remove it (label column stays empty; the h2 stays at col 5) |
| Interior hero, `sectionName` | eyebrow on contact ("Kontakt" over "Kontakt."), references, legal and 404 | render the eyebrow **only** when `d.kind === "service"` ("Služby") |
| Aviation pages (all three) | breadcrumb, then tab "Testing Service Aviation", then eyebrow "AVIATION", then h1 "Testing Service Aviation." | the tabs replace the eyebrow; no hero eyebrow on aviation pages |
| Home Aviation teaser | eyebrow "Aviation" over h2 "Testing Service Aviation" | keep (allowed: it names the division; the h2 names the unit) |

- The detector's hero-eyebrow-chip count should then fall from 21 to the service pages (and home) only.

**P1-3. Contact page details and rhythm (after P0-1).**
- **Files:** `[...path].astro` (contact branch), `global.css` (`.contact-details`, `.future-office`, `.contact-hero`, `.contact-layout`, `.site-footer`).
- **Address:** `p.lead.address` → plain Body `text` (17px). At Lead size (20px muted) it outshines the 22px H3.
- **Prague block:** `.future-office` drops its `border-top`; the e-mail list already closes with a hairline 49px above it, which reads as a double rule. Use `margin-top: 48px` and no rule.
- **H4 "Praha / Prague":** "Praha" on SK, "Prague" on EN.
- **Contact hero:** `.contact-hero { padding-bottom: 48px }` → delete it, so every page hero is 48/64.
- **Hero hairline → content:** currently 106px on contact versus 53px on articles. Make `.contact-layout` use `padding-block: calc(var(--section-y) / 2) var(--section-y)`, identical to `.article-layout`, with the hairline as its top border.
- **Footer on contact:** the top row is hidden, but `section-y` + 48px is kept (about 165px of empty ink). Set `.site-footer:not(:has(.footer-top)) { padding-top: var(--space-8) }`, or a modifier class.
- **Header CTA on contact:** render it as `button-secondary` with `aria-current="page"` (`Layout.astro`).

**P1-4. Remove CTA repetition; adopt the one page ending.**
- **Files:** `[...path].astro` (page hero action, `.closing-cta`, related), `ui.ts`.
- **Problem:** a service page says "Kontaktujte nás" 5 times. That is the header CTA, the hero secondary button, and three in the closing strip (H4 `t.cta`, then "Kontaktujte nás a my sa vám ozveme.", then button `t.cta`), with the footer h2 after it. On mobile the closing strip, its button and the footer h2 sit within about 600px of each other.
- **Target (DESIGN.md "Article … the one page ending"):**
  1. **Hero action:** if the page has download rows, `button-secondary` labelled `t.downloads` with a ↓ icon, linking `#downloads`. Otherwise no hero button. Never `t.cta` in the hero.
  2. **Closing strip:**
     - 1px hairline, 32px padding-top.
     - Heading as **H3** (`type-h3`) with a new key `t.ctaQuestion`: SK "Máte otázku k tejto službe?", EN "Questions about this service?", ZH "对这项服务有疑问？" (ZH to be checked by a native speaker).
     - Then `d.closing` in Body `text` (not Small muted). Omit it when it's identical to the heading or is the generic "Kontaktujte nás a my sa vám ozveme." line; drop that line from `closing` frontmatter, since it duplicates the button.
     - Then `button-primary` `t.cta`, margin-top 24px.
  3. **Related:** see P1-5.

**P1-5. Aviation pages share the industry page ending.**
- **Files:** `[...path].astro`, the `d.kind === "service"` conditions on `.closing-cta` and `.related`.
- **Target:**
  - Render the closing strip and the related section for `d.kind === "aviation"` too.
  - Related label: "Aviation" (not `t.related`); rows: the other two aviation pages.
  - Aviation index order after the prose: downloads, partners, closing strip, related, then the gallery.
  - The gallery moves to a **stone band** with normal `section-y` padding. Today it follows partners on the same paper with a 215px blank gap and no separator.
- On `instruments` the hero action becomes the download jump (P1-4), so the XLSX order form is one click from the top (PRODUCT principle 5).

**P1-6. One ordered service list and one name per service.**
- **Files:** new `src/data/sections.ts` (or extend `ui.ts`); `Layout.astro` (`services = pages.filter(kind === "service")` gives collection order: Consulting, Inspections, Permits, Risk); `[...path].astro` (`services` array, `copy.services[i]?.title`); `src/data/home.json`.
- **Problem:** cards run Permits → Consulting → Risk → Inspections, while the dropdown and mobile menu run Consulting → Inspections → Permits → Risk. Names differ too:
  - Card "Poradenské služby - technické štandardy a legislatíva" vs dropdown/related/h1 "Poradenské služby".
  - Card "Inšpekcie, revízie, certifikácie a profesionálne kvalifikácie" vs "Inšpekcie, skúšky a kvalifikácie".
  - Card "Analýza Rizík" vs "Analýza rizík".
- **Target:**
  - `export const serviceKeys = ["permits", "consulting", "risk", "inspections"]` and `aviationKeys = ["aviation", "instruments", "maintenance"]`, imported everywhere.
  - Card title = page `title` (drop `copy.services[i].title`) until the owner chooses other short titles (**Owner**).
  - The long card phrasings move into the card description only if they aren't already there.

**P1-7. Language notation comes from data, never from titles.**
- **Files:** `src/data/downloads.ts`, `src/components/LinkList.astro`, `Layout.astro` (footer downloads), `LangTag.astro`, `global.css` `.lang-tag`.
- **Problem:** titles contain "(SK)", "(EN)" and "Osvedčenie / Certificate" style suffixes. "IFR price list · 2024 (EN)" shows on the EN page itself. The EN footer mixes "Privacy policy [SK tag]" with "Oprávnenie / Accreditations (SK)".
- **Target:**
  - Strip "(SK)", "(EN)" and "(中文)" from every `title`. Keep `lang`. Add `division: "industry" | "aviation"`.
  - `LinkList` rows and footer links render `<LangTag current={page.lang} target={file.lang}>` after the title (a `lang === "both"` file gets no tag).
  - Bilingual document titles ("Osvedčenie / Certificate · SK.145.031") are the document's real name. Keep them, but on EN/ZH show only the English half if the data provides `titleEn`; otherwise leave them as they are.
  - **Lang-tag inside a button or on dark:** `border: 0; color: currentColor; opacity: .75; padding-inline: 0`. This fixes the boxed "EN" inside the ZH header CTA "联系我们 EN" and inside the footer button.

**P1-8. Leads only from frontmatter.**
- **File:** `global.css`, the `.lead, .prose > p:first-child` selector.
- **Problem:** the first Markdown paragraph is styled as Lead, so "TESTING SERVICE s.r.o. divízia AVIATION" (aviation index) and "skúšky avionických systémov sú povinné" (instruments, lowercase, no full stop) render as 20px muted intros, and long legal first paragraphs are greyed out.
- **Target:** remove `.prose > p:first-child` from the selector. The first paragraph is Body `text`. Where the first line is a label-like fragment, change it in Markdown (`src/content/pages/{sk,en}/aviation.md`) to a Prose H2 if it introduces a section, or keep it as a normal paragraph. Don't change its words.

**P1-9. Aviation index heading structure and lists (content markup only).**
- **Files:** `src/content/pages/sk/aviation.md` (≈ lines 36–42), `en/aviation.md` (≈ 32–38).
- **Problems:**
  - An empty `## Naše služby` / `## Our offer` is followed by sibling `## Aviation Testing` and `## Aviation Service`: three stacked 28px headings, and an empty entry in the contents nav.
  - "Odkazy na predpisy:" is a bullet followed by sibling bullets "No 2018/1139" and "No 1321/2014". It should be a nested list.
  - A raw URL "http://www.easa.europa.eu/" sits in running text.
- **Target:**
  - Make the two services `###`.
  - Nest the two regulation bullets under "Odkazy na predpisy:".
  - Turn the raw URL into a link with the text "easa.europa.eu" (same destination).
  - Words unchanged.

**P1-10. Double hairline in home packages.**
- **Files:** `global.css` (`.capabilities { margin-bottom: 32px }`, `.disclosure { border-top }`), `[...path].astro`.
- **Problem:** the list's last-row rule and the disclosure's top rule are 33px apart.
- **Target:** the disclosure is the last row of the same stack: `.capabilities { margin-bottom: 0 }` and `.capabilities + .disclosure { border-top: 0 }`. Because the capabilities fill column by column with 9 items (5 + 4), the summary row spans both columns under them. The right column's last empty cell gets no rule.

**P1-11. One list-row typography.**
- **Files:** `global.css` (`.list > a, .list > li { font-size: var(--text-ui) }`, `.related h3`), `[...path].astro` (related uses `<h3>` inside the row), `LinkList.astro`.
- **Problem:** related rows are 22px H3 and every other row is 15px UI. On service pages the related list visually outranks the closing CTA.
- **Target:**
  - Every list-row title is **Body 17px, weight 500, ink, line-height 1.4**; meta is Label 600 `muted`, 4px below.
  - Related rows render the title in a `<span class="list-title">` (not h3), with the page `description` as an optional Small `muted` second line.
  - Capabilities rows stay Body 400.
  - Hover: title **and** icon `accent`.

**P1-12. Card grid too narrow at 1080–1279px.**
- **File:** `global.css` `.service-grid`.
- **Problem:** at 1080 the four cards are about 230px wide and titles wrap to five lines ("Poradenské / služby - / technické / štandardy / a legislatíva").
- **Target:**
  - `.services-section .wrap { container-type: inline-size }`.
  - Base `.service-grid { grid-template-columns: minmax(0, 1fr) }`.
  - `@container (inline-size >= 600px) { repeat(2, minmax(0, 1fr)) }`, `@container (inline-size >= 1120px) { repeat(4, minmax(0, 1fr)) }`.
  - Gap 24px.
  - Below 640px the card image uses `aspect-ratio: 16 / 9`, which cuts about 180px from the mobile stack.

**P1-13. ZH home: no English chrome or card bodies; include Aviation.**
- **Files:** `src/data/ui.ts` (zh), `[...path].astro`, `src/data/home.json`, `global.css` `:lang(zh)`.
- **Problems:**
  - ZH strings in English: `more: "Details"`, `contact: "Contact"`, `name`, `email`, `company`, `message`, `send`, and others.
  - ZH cards show Chinese titles over English descriptions (`p.data.description` of the EN page).
  - The ZH hero eyebrow is English and renders title-case because `:lang(zh) .eyebrow { text-transform: none }`.
  - The Aviation teaser is excluded (`lang !== "zh"`) while nav and footer link to Aviation.
  - Headings break inside words: 捷|克, 法|律, 认|证.
- **Target:**
  - Translate every ZH UI key; **a native speaker checks before launch**. Suggested: more 详情, contact 联系方式, name 姓名, email 电子邮件, company 公司, message 留言, send 发送, mail 打开邮件, soon 即将开业, related 其他服务, toc 目录.
  - Card description: use `copy.services[i].description` from `home.json`. Add ZH strings there only from existing ZH source copy (check `src/content/pages/zh/` and `_source/pages/`); if none exists, render no description rather than English.
  - The hero eyebrow span gets `lang="en"`, and the rule becomes `:lang(zh) .eyebrow:not([lang="en"])`.
  - Render the Aviation teaser on ZH, with the button lang-tag `EN`.
  - `:lang(zh) :is(h1, h2, h3) { word-break: keep-all; overflow-wrap: anywhere }`.

**P1-14. Images displayed above source resolution.**
- **Files:** `src/components/Photo.astro` (widths), `src/content/pages/*/aviation.md` (`image`), the teaser in `[...path].astro`.
- **Problems:**
  - The aviation hero (`TESTING_CENTER-10`, source 1500 × 455 panorama) is cropped to 4:3 and shown at 533 × 400: visibly soft.
  - The same photo is reused as the home teaser at 644 × 429.
  - The home hero ships 720w at 720 × 680.
- **Target:**
  - Page-hero ratio becomes **3:2** for every page (DESIGN.md), with `sizes="(min-width:1080px) 37vw, 100vw"` and widths up to 2× the displayed size.
  - Aviation index hero and home teaser: use a non-panoramic real photo if `_source/img` has one (`20190628_141438.jpg` and `Snímka.JPG` are candidates; check their content first). Otherwise use the panorama at 16:9 with `object-position` tuned, and never upscale.
  - Use different photos for the teaser and the aviation hero.
  - Partners image: no white box (`mix-blend-mode: multiply` on paper), natural size, `object-fit: contain`.

**P1-15. Desktop services dropdown ships open.**
- **File:** `Layout.astro` (`<details class="services-menu" open>`).
- **Problem:** with JS disabled, or before the deferred script runs, the 360px panel covers the hero at 1440.
- **Target:** ship without `open`. Below 1080px the mobile panel shows the services list regardless of `open` via CSS (`.services-menu > .dropdown { display: block }` inside the mobile media query, which already exists). Remove the JS that forces `open` on mobile.

### P2: minor (fix in the same pass where cheap)

**P2-1. Mobile menu open state.**
- **Files:** `Layout.astro`, `global.css`.
- **Target:**
  - The icon swaps ☰ → ✕ while `aria-expanded="true"`.
  - The panel is `height: calc(100dvh - var(--header-height))`, scrolls internally, and sets `overflow: hidden` on `html` while open.
  - Add a Label row "Služby" (`t.services`, not linked) above the indented services. The existing "Všetky služby" intro row stays below it as the first link.
  - Rows 52px with hairlines; CTA full-width `button-primary` at the end.

**P2-2. Mobile header brand.**
- **File:** `global.css` (below 640px).
- **Problem:** `.brand > span { max-width: 8ch }` wraps "TESTING / SERVICE" as body-size text. It looks accidental.
- **Target:** `font-size: 13px; line-height: 1.1; letter-spacing: .06em; font-weight: 600`, with the two lines vertically centred on the 32px roundel. This is the intentional stacked lockup in DESIGN.md.
- The menu label stays hidden below 640px. No 400px breakpoint.

**P2-3. Rhythm after the article.**
- **Files:** `global.css` (`.article-layout` padding-bottom, `.related { padding-top: 0 }`).
- **Problem:** closing strip → related is 105px; DESIGN says 64px.
- **Target:** when the article is followed by `.related`, the article's padding-bottom is `var(--space-8)` (`.article-layout:has(+ .related)`). `.related` keeps top padding 0 and bottom `section-y`.

**P2-4. Prose measure.**
- **File:** `global.css` (`.prose { max-width: 68ch }`, which renders ≈ 88 characters per line).
- **Target:** `max-width: var(--measure)` with `--measure: 38rem` (≈ 70 characters).
- Download, closing and related stacks stay full width (cols 5–12).
- Lead stays 52ch, statement 34ch.

**P2-5. Footer content and redundancy.**
- **Files:** `Layout.astro` (footer), `downloads.ts`.
- **Top-row e-mail:** `info.aviation@testing-service.org` on `body.aviation` pages; `jakub.kubis@` elsewhere.
- **Company column:** drop the duplicate `jakub.kubis@` link; it is already in the top row (keep it on the contact page, where the top row is hidden).
- **Downloads column:** only `division === "industry"` files plus GDPR. Aviation files go to the Aviation column, after the three page links (↓ icons).
- **ZH:** the footer h2 and button both say 联系我们. The button uses `t.enquiry`, which in ZH is also 联系我们; set zh `enquiry: "发送咨询"` (native check).

**P2-6. mailto rows use ↗, not →.**
- **Files:** `LinkList.astro`, the contact details, the `instruments` rows in `[...path].astro`.
- **Target:** any `href` starting with `mailto:` renders the external (↗) icon. Meta stays `E-MAIL`.

**P2-7. Undersized standalone links.**
- **Files:** `global.css` (`.text-link`, `.contents a`).
- **Target:**
  - Standalone `.text-link` (clients strip "Referencie EN →", card links): `display: inline-flex; align-items: center; min-height: 44px`.
  - `.contents a`: `padding-block: 6px` (≥ 32px rows).
  - Inline prose and breadcrumb links are exempt (inline-text exception).

**P2-8. Clients strip.**
- **Files:** `src/components/Logos.astro`, `global.css` `.logo-strip`.
- **Target:**
  - Optical height 40px (from 36).
  - Re-tune `--logo-scale` so the Hyundai wordmark is ≥ 12px tall and Dürr does not dominate.
  - On the references page, remove the special-case borders (`.reference-clients`, `.reference-clients + .article-layout { border-top: 0 }`). The strip sits under the hero hairline and the article keeps its own top hairline, as on every other page.

**P2-9. Aviation hover tokens.**
- **File:** `global.css` (`body.aviation, .aviation-scope { --accent-on-dark-hover: var(--color-aviation-on-dark) }`).
- **Problem:** the hover equals the rest state.
- **Target:** add `--color-aviation-on-dark-hover: #c4e3ec` and assign it. Every `.button-on-dark:hover` and footer link hover reads `--accent-on-dark-hover`.

**P2-10. UI weights.**
- **File:** `global.css`.
- **Problem:** the nav `summary` text renders 15/400 and `.dropdown-intro` 12/400.
- **Target:** UI is always 500 and Label always 600 (Step Rule).

**P2-11. Source typography normalisation** (words unchanged; DESIGN.md Source Typography Rule).
- **Files:** `src/content/pages/**`, `src/data/home.json`.
- **Fixes:**
  - "zariadenia ." → "zariadenia."
  - "posúdenie ." → "posúdenie."
  - "na “kľúč” ." → "na „kľúč“."
  - "Stavebné Povolenie-povolenie začať stavbu" → "Stavebné povolenie – povolenie začať stavbu"
  - "Poradenské služby - technické…" → "Poradenské služby – technické…"
  - "Analýza Rizík" → "Analýza rizík"
  - Capabilities "inšpekcie - revízie - certifikácie - povolenia" → "inšpekcie – revízie – certifikácie – povolenia"
  - EN Title Case prose headings ("Trusted by Industry Leaders", "Our References") → sentence case
  - "Aviation testing center" vs "Aviation Testing Center" → one form, "Aviation Testing Center" (proper name)

**P2-12. References page (EN/ZH).**
- **File:** `src/content/pages/en/references.md` (and zh).
- **Problems:** the h1 "Our references." is followed by the lead "Trusted by industry leaders.", then prose h2 "Trusted by Industry Leaders" and h2 "Our References". There is a contents aside for a two-paragraph page, and "You can see our main list of references here" no longer links anything.
- **Target:**
  - Remove the two prose h2s; the hero already carries them, so the page then has <2 h2s and no aside.
  - Link "here" to the main-list Drive URL, or change the sentence's end to point to the list below ("…in the list below."). **Owner** (copy change); default: link "here".

**P2-13. Mobile hero eyebrow orphan.**
- **File:** `global.css`.
- **Problem:** at 390 "INŠPEKCIE · CERTIFIKÁCIE · POVOLENIA · CZ +" wraps, leaving "SK" alone; at 640 it takes three lines.
- **Target:** `.hero-copy .eyebrow { text-wrap: balance }`, and wrap "CZ + SK" in a `white-space: nowrap` span.

**P2-14. 404 and legal pages follow the hero rules.**
- No eyebrow (P1-2).
- The 404 action row uses `button-primary` "Späť na úvod →".
- Legal pages get no hero action (already the case) but the same article ending minus closing and related.

---

## 5. Owner decisions (implement the default; flag in the PR)

1. **Home h1 = the compliance sentence** (P1-1). Default yes. It is existing source copy, already used on ZH.
2. **Service short titles** (P1-6). Default: use the page `title` everywhere.
3. **Closing-strip question copy** "Máte otázku k tejto službe?" / "Questions about this service?" / "对这项服务有疑问？" (P1-4). Default yes. ZH copy needs a native check.
4. **ZH UI translations** (P1-13, P2-5). Needs a native check.
5. **Teaser and aviation hero photos** (P1-14). Pick from the real Testing Center sources.
6. Still open from round 1: phone numbers, the form endpoint, the Prague opening date, a role mailbox, and logo red in the palette. Don't invent any of these.

## 6. Done means

- [ ] All P0 and P1 items implemented; P2 where cheap.
- [ ] `npm run build`, `npm run check`, `npm run check:links` pass (also with `BASE_PATH=/ts-web-preview`).
- [ ] The P0-3 QA gate passes on all routes × 390/640/1024/1440.
- [ ] Detector: `hero-eyebrow-chip` only on service pages and home; no new rule types.
- [ ] axe 0 violations, re-run.
- [ ] `docs/review/shots-v2/` with the same file names as shots-v1, plus `sk-menu-open-390.jpg` and `sk-dropdown-open-1440.jpg`.
- [ ] A short `review-2-implementation.md` mapping each item ID to its change, and listing anything deferred with a reason.

## 7. What would make it memorable (not required this round)

The North Star is "The Inspection Report", but nothing on the page yet looks like a report. Once the system is clean, the highest-value authored move is to show the actual jurisdiction depth:
- a compact "CZ | SK" two-column fact row on each service page, giving the regulation names already cited in the prose (e.g. vyhláška 508/2009 Z. z.) and VTZ categories A/B/C;
- or a home matrix of device groups (tlakové, zdvíhacie, elektrické, plynové) against the four services.

Both use only facts already in the content. Treat it as a round-3 candidate after the owner confirms the mapping.
