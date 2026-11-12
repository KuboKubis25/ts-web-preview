# Brief: rebuild testing-service.org (Squarespace → in-house static site)

## Goal
A static site that replaces the current Squarespace site for Testing Service s.r.o. (Martin, Slovakia):
inspections, testing, permits/approvals, risk/safety/ATEX/PAWA, consulting for restricted technical
devices (CZ + SK legislation) plus an AVIATION division (avionics instrument testing, magneto overhaul).
Must look clearly better than today: serious, precise, engineering/inspection-body feel. Not a generic SaaS template.

## Source material (all already scraped — use ONLY this content, do not invent facts, clients, numbers, certificates)
- `_source/pages/*.md` — text of every current page (slug = old URL)
- `_source/html/*.html` — raw Squarespace HTML (for structure, image placement, links, form fields). Gitignored.
- `_source/img/` — all images (squarespace CDN downloads; filenames = original). Pick the relevant ones, optimise via Astro assets.
- `_source/files/` — PDFs/XLSX linked from the site (price lists, order forms, certificates, GDPR, leaflets). Keep them downloadable.
- Old sitemap: `_source/sitemap.xml`.
Text quality: fix obvious typos ("Engish", "zamestanancov") but don't rewrite meaning. Where an SK page exists only in EN or vice versa, show it only in the language it exists in (no machine-invented translations). Chinese exists only for home + references.

## Stack
- Astro (latest), static output, no client framework. Plain CSS (custom properties) — no Tailwind needed. Minimal JS.
- Content as Markdown/MDX or typed data files per language so a non-dev can edit text later.
- `npm run build` must pass clean. Keep deps minimal.
- Deploy target for preview: GitHub Pages under a project path (`/ts-web-preview/`) — make `site`/`base` configurable via env (`SITE`, `BASE_PATH`), all internal links must respect base.
- Preview must not be indexed: `<meta name="robots" content="noindex">` + robots.txt Disallow, controlled by one env flag (`PUBLIC_INDEXABLE=false` default).

## Information architecture (the main fix)
Today: language "pages" (`/language-eng`, `/language-svk`, `/zho`, `/skmain`, `/testing-service-eng`) sit in the nav as folders,
the home page is a language picker, aviation is split into "AVIATION" and "AVIATION (ENG)" nav folders, duplicate pages (`our-services` = `permit-assurance`).
New:
- Slovak default at `/`, English at `/en/`, Chinese at `/zh/`. Same slug structure per language, e.g.
  `/sluzby/povolenia-a-schvalenia/` ↔ `/en/services/permits-and-approvals/`. Keep it to:
  Home · Services (4 service pages) · Aviation (overview, instrument testing, technical maintenance) · References · Contact (+ GDPR/legal in footer).
  Drop empty/legacy pages (`lang-nav`, `foto`, `ait-gallery` if empty, duplicates) — fold any real gallery images into Aviation.
- ONE language switcher, compact, top-right in the header, consistent on every page, linking to the *same page* in the other
  language (via a translation map); if a page has no translation, link to that language's home. Proper `hreflang` alternates + `x-default`.
- Header nav: Services (dropdown/mega menu on desktop), Aviation, References, Contact. Prominent contact CTA. Mobile menu.
- Footer: company legal info (from source: address, register Okresný súd Žilina, IČO etc.), contacts, file downloads, GDPR.
- Redirects: generate a static redirect page for EVERY old slug in the old sitemap → its new URL (meta refresh + canonical + JS), so old links/Google results keep working. Also emit `public/_redirects` (Netlify/Cloudflare format) for the final host.
- `sitemap.xml` (with hreflang) generated at build.

## Design
- Use the `impeccable`-style design discipline: strong typographic hierarchy, generous whitespace, restrained palette, real
  grid, no stock-template look, no gradients-for-the-sake-of-it, no emoji icons. Logo in source is gold ("logo zlate.png") —
  derive a palette from it (deep navy/graphite + gold accent is fine) and keep it WCAG AA.
- Fonts: self-host one good sans with full Latin Extended (Slovak diacritics!) e.g. Inter or IBM Plex Sans via @fontsource; CJK via system font stack.
- Industrial photography from `_source/img` used purposefully (hero, service cards), compressed, responsive, lazy.
- Client logos (Dürr, Hyundai, KIA, Rolls-Royce, VW...) as a monochrome logo strip on home/references.
- Aviation division has its own sub-identity (same system, distinct section accent) but lives in the same site.
- Contact: show addresses (Martin + Prague "coming soon" as in source), emails, phones from source. Contact form: static form
  with `action` configurable via env (`PUBLIC_FORM_ENDPOINT`), fallback to mailto. Aviation order form = downloadable XLSX as today.
- Performance: Lighthouse 95+ target, no layout shift, accessible nav (keyboard, aria), `lang` attribute per page.

## Deliverables
1. Working Astro project in this repo, `npm run build` passing, `dist/` correct with base path.
2. `.github/workflows/deploy.yml` for GitHub Pages (build with BASE_PATH=/ts-web-preview/, SITE=https://kubokubis25.github.io).
3. `README.md`: how to edit content, add a language, run locally, deploy, switch domain (DNS + env flags), redirects.
4. `docs/sitemap.md`: old URL → new URL table and the new tree.
Do not push or create remotes. Commit locally in logical commits when done.
When finished, run the build and a quick link check over `dist/` (all internal hrefs resolve to a file) and report results.
