# Product

<!-- impeccable:product-schema 1 -->

<!--
Written by a non-interactive `impeccable init` run (2026-11-12). The owner asked for no questions,
so every fact below comes from the reviewer brief (docs/review/PROMPT-review.md), BRIEF.md, and the
repository content. Items marked (inferred) are reasonable readings of that evidence, not answers the
owner gave. Correct them in place.
-->

## Platform

web

## Users

- **Primary: plant, EHS/safety and engineering people at manufacturers and operators** (automotive and general industry) running or installing *vyhradené technické zariadenia* (VTZ, the Slovak/Czech legal category of restricted technical devices: pressure, lifting, electrical and gas equipment) in Slovakia or Czechia. Their job is to work out which permits, approvals, inspections, revisions, risk/ATEX/PAWA assessments and staff qualifications the law requires, and to hand that work to a competent body. They often work for foreign-owned plants (hence EN and ZH) and are dealing with CZ/SK rules that differ from EU directives.
- **Procurement / project managers** comparing suppliers for a new line or plant commissioning (inferred from the "packages for operators and suppliers" content).
- **Aircraft owners and operators** (Aviation division) who need periodic avionics (COM/NAV) checks and magneto (Slick, Bendix King) inspection and overhaul at Žilina airport (LZZI).

## Product Purpose

A multilingual marketing and information site that replaces the old Squarespace site. It explains Testing Service s.r.o.'s four service lines (permits and approvals, consulting on technical legislation and standards, risk assessment/ATEX/PAWA, inspections/testing/certification/qualifications) and the Aviation division (avionics testing, technical maintenance), shows references, offers downloadable price lists, order forms and certificates, and turns visits into enquiries (email/contact form). It works when a safety officer can tell within a minute whether Testing Service covers their device and jurisdiction, and can then send an enquiry or download the right form.

## Positioning

A small, specialised Slovak inspection and consulting company with more than 20 years of experience (source copy) that covers **both Czech and Slovak** legal requirements for restricted technical devices end to end, from design documentation and approval through commissioning to periodic inspection. It also runs a niche EASA-context avionics test centre at Žilina airport. The claim a generic EU certification body can't copy is local CZ+SK legal depth sold as a turnkey package.

## Operating Context

- Visitors arrive from search, old Squarespace URLs (redirects exist), or a referral, usually on a desktop at work. Mobile use matters for pilots and for people on site.
- Regulation is the shared vocabulary: STN/ČSN standards, vyhláška MPSVaR SR č. 508/2009 Z. z., VTZ categories A/B/C, EASA regulations 2018/1139 and 1321/2014.
- Typical artefacts: PDFs (certificates, price lists, GDPR info, leaflets) and XLSX order forms (avionics test order), downloaded and returned by email.
- Languages: Slovak default at `/`, English at `/en/`, Chinese at `/zh/` (home and references only). Pages without a translation link to the other language's version and are labelled, never machine-translated.

## Capabilities and Constraints

- Astro static site, no client framework, plain CSS custom properties, minimal JS (menu toggle, mailto fallback for the form). Content lives in Markdown per language under `src/content/pages/<lang>/` plus typed data in `src/data/`.
- Deployed as a GitHub Pages preview under a base path; `SITE`, `BASE_PATH`, `PUBLIC_INDEXABLE`, `PUBLIC_FORM_ENDPOINT` env flags. Every internal link must respect base.
- Contact form posts to a configurable endpoint, otherwise falls back to mailto.
- Fonts: IBM Plex Sans Variable self-hosted (full Latin Extended for Slovak diacritics); CJK from the system stack.
- Performance target: Lighthouse 95+, no layout shift. Accessible keyboard nav, `lang` and `hreflang` per page.
- **Undecided:** phone numbers (none in the source content, so don't add any); Prague office opening date (source says only "coming soon"); final production domain; the Slick magneto series (the source says "4600/6300" on the aviation overview and "4300/6300" on the maintenance page; the owner must pick one, and both pages and the home capabilities list then use it). Also undecided (round 5): the SK home source carries the supplier package twice in two wordings (pick one); the pilot "letisko AIP" link points to a 2018 AIRAC page (current URL needed); the magneto page hero is a stock automotive belt-drive photo (needs a real TS-A photo or none); whether every service page gets a footer closing line (only risk and inspections have one). Also undecided (round 6): merging the source-split maintenance bullet ("…magnet typ" / "Bendix King serie…"); a real magneto/bench photo so all three aviation tabs share one hero type; whether EN instruments keeps the heading "Contact us, we will answer you" and the corrected "prices" (source: "prizes"); a better heading than "Naše služby" inside the permits article; ZH hero line breaks and the supplier-teaser placement (native check). Also undecided (round 7): an English title for the Chinese-titled reference-list PDF shown on the EN references page; whether the sentence-length "slogan" headings restored from the Squarespace source should be replaced by short section titles (new copy); English UI strings left on ZH pages (footer "Accreditations", "Slovakia", the hero eyebrow; native check); which industry documents exist beyond the accreditation PDF. Also undecided (round 8): two English word errors carried from the source ("No 2018/1139 **a** No 1321/2014" on EN aviation, and the "Comissioning" heading on EN permits); whether risk, consulting and inspections get a "Key facts" block like permits (values must come from each page's own source text); whether the generic EN references lead ("Trusted by industry leaders.") stays.

## Brand Commitments

- Name: **Testing Service s.r.o.**, Timravy 31, 036 01 Martin, Slovakia; registered at Okresný súd Žilina, odd. Sro, vložka č. 118043/L; IČO 36677213; IČ DPH SK2022243982. Aviation contact info.aviation@testing-service.org; main contact jakub.kubis@testing-service.org. Prague (Forum Karlín, Pernerova 51) is listed as "coming soon".
- Tagline in the logo: **INSPECTION · CERTIFICATION · PERMIT**.
- Logo: `_source/img/logo_zlate.png`, a gold ring "T.S." roundel with **red** letterforms, a red "TESTING SERVICE" wordmark and a red tagline bar. The roundel is gold and red, not gold only. Aviation sub-brand logo: `_source/img/TS-A_Logo.png` (red/blue winged roundel). The logos are fixed assets; crop them, never redraw or recolour them.
- Site palette per the owner: deep navy/graphite with a gold accent; Aviation gets its own accent within the same system.
- Voice: precise, trustworthy, engineering-grade, quiet confidence. No hype, no emoji, no invented numbers.

## Evidence on Hand

- Client logos (used with the source site's permission as shown there): Dürr, Hyundai, KIA, Rolls-Royce, Volkswagen (`_source/img/*-optimized*.png`).
- Downloadable documents in `_source/files/` (12 entries in `src/data/downloads.ts`): price lists, order forms, certificates (e.g. Osvedčenie SK.145.031), GDPR information, aviation organigram and leaflet.
- Reference list and promotional presentation as Google Drive links (EN/ZH references page).
- Photography: industrial stock (car assembly, documents, pipes, lab operator) and real Aviation Testing Center photos from Žilina (TESTING_CENTER-*, "Nad Stredným Slovenskom" aerials).
- Partner image: Žilinská univerzita / Letecké výcvikové a vzdelávacie centrum / Žilina airport.
- **Absent, do not fabricate:** testimonials, case studies, client counts, certification body numbers beyond those in the files, phone numbers, prices on the page, team bios.

## Product Principles

1. **Clarity of obligation first.** Every service page should make it obvious which legal obligation it covers, for which devices, in which country, and what the next step is.
2. **Earn trust through precision, not adjectives.** Cite the real regulation, document and certificate. Never add decorative "technical" microcopy that carries no information.
3. **One company, two divisions, one system.** Industry and Aviation share every structural pattern; only the accent changes.
4. **Language honesty.** Never pretend a translation exists. Label cross-language links clearly and consistently.
5. **Paperwork is a feature.** Downloads and order forms are primary actions for this audience, not footer leftovers.

## Accessibility & Inclusion

WCAG 2.2 AA (per BRIEF.md: "keep it WCAG AA", accessible keyboard nav, aria). Slovak diacritics and CJK must render correctly at every size. The text must stay legible for an older, desktop-first professional audience, so nothing set below 12px.
