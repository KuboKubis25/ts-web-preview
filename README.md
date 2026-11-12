# Testing Service website

Static Astro 7 site replacing the supplied Squarespace export. Slovak is the default, English lives at `/en/`, and Chinese at `/zh/`. There is no client framework, CMS, tracking, or external font service.

## Run locally

Use Node **22.23.4 or newer supported LTS** (`nvm use` reads `.nvmrc`).

```sh
npm ci
npx playwright install --with-deps chromium # once, for the build QA gate
npm run dev
```

`dev` and `build` first copy the supplied downloads and generate host redirects. Open the URL printed by Astro. To test the exact preview deployment:

```sh
SITE=https://kubokubis25.github.io BASE_PATH=/ts-web-preview/ PUBLIC_INDEXABLE=false npm run build
npm run check:links
SITE=https://kubokubis25.github.io BASE_PATH=/ts-web-preview/ npm run preview
```

Visit `http://localhost:4321/ts-web-preview/`. Astro 7 runs preview as a background server; use `npx astro preview stop` to stop it. Alternatively, copy `.env.example` to `.env` and use plain `npm run build` / `npm run preview`.

```sh
npm run check       # Astro + TypeScript diagnostics
npm run build       # Production output, then the required browser QA gate
npm run check:links # Check dist, using its canonical URL to discover the actual base
```

`npm run check:layout` checks every content route at 390, 640, 1024, 1080 and 1440px: reading-column widths, sibling overlap, page overflow, mobile contact order, image pixel resolution, keyboard/menu/form behavior, and axe accessibility. It serves the built files on a temporary local port and discovers the base path from the build. A failure fails `npm run build`. `npm run qa:capture` also writes `docs/review/qa-v2.json` and screenshots in `docs/review/shots-v2/`. CI installs Chromium before building.

The link checker validates internal hrefs, images/srcsets, form actions, fragments, sitemap URLs, all 27 legacy redirects, image dimensions/alt attributes, one H1 per content page, and robots consistency. External websites are not crawled.

## Edit content

- **Page text:** `src/content/pages/sk/`, `en/`, `zh/`. These are ordinary Markdown files. The metadata between `---` lines controls title, description, URL, language, source provenance, page kind, and image. Use `##` for sections and `###` for subsections; the template supplies the H1.
- **Homepage introduction, service summaries and capabilities:** `src/data/home.json`, grouped by language. Homepage package text remains in each language's `home.md`.
- **Navigation and form labels:** `src/data/ui.ts`.
- **Download labels and placement:** `src/data/downloads.ts`. Put new PDFs/XLSX in `_source/files/`, then add a matching entry. The build copies all downloads to `public/s/` and `dist/s/` without modifying them.
- **Photography:** `_source/img/`. `Photo.astro` generates responsive WebP images through Astro assets. Choose existing source photographs; filenames are exact and some contain percent escapes. `src/data/gallery.json` preserves the real photos from the old Aviation and aerial galleries in Aviation.
- **Design:** `src/styles/global.css` contains the shared colors, grid, typography, responsive rules and Aviation accent.

The original `_source/pages/`, `_source/files/`, images and sitemap remain the migration record. `_source/html/` is the supplied, gitignored raw export and is **not required to build**. `scripts/migrate-content.py` records the initial import process; do not rerun it over edited content.

Root-relative Markdown links such as `[Certificate](/s/TS-Opravnenie.pdf)` automatically receive `BASE_PATH`. Old page links and absolute testing-service.org links are mapped to their new destinations by `scripts/remark-links.mjs`. Template links must use `url()` from `src/lib/urls.ts`. Do not manually hardcode `/ts-web-preview/` in content.

### Add a page or translation

Copy a similar Markdown file and give it a unique `path` (no leading/trailing slash). Pages with the same `key` are translations: the language switcher and hreflang/sitemap alternates are generated from that key. If a translation is absent, the switcher points to that language's home; hreflang lists only real translations.

The source has no Slovak references page and no Chinese service, contact or Aviation pages. Those navigation links explicitly identify English content. Do not create missing translations without human-authored copy.

To add another language, extend the schema enum in `src/content.config.ts`, `languages` and labels in `src/data/ui.ts`, the switcher labels in `Layout.astro`, and homepage data/title in `home.json` and `[...path].astro`. Add its real Markdown content, sharing existing keys. Review language fallbacks, then run all checks. Choose a font that supports the new script; Chinese uses the visitor's system CJK fonts.

## Configuration

| Variable               | Default                           | Purpose                                                                      |
| ---------------------- | --------------------------------- | ---------------------------------------------------------------------------- |
| `SITE`                 | `https://www.testing-service.org` | Origin for canonical and sitemap URLs; omit a project path                   |
| `BASE_PATH`            | `/`                               | Deployment path; accepts surrounding slashes                                 |
| `PUBLIC_INDEXABLE`     | `false`                           | Only exact `true` enables indexing; controls both robots meta and robots.txt |
| `PUBLIC_FORM_ENDPOINT` | empty                             | HTTPS form receiver; public build-time value, never a secret                 |

With no form endpoint, the contact form opens an email draft addressed to `jakub.kubis@testing-service.org`, including the entered fields. The visitor must send it in their email application. Native mailto submission remains available without JavaScript. The site does not claim that a message has been sent. With an endpoint, the form POSTs `name`, `email`, `company`, and `message` directly to that service; the receiver owns delivery, spam handling and success/error pages. No provider is provisioned by this repo. Aviation orders remain downloadable spreadsheets, sent to `info.aviation@testing-service.org`.

No contact phone number appears in the scraped contact pages (their Organization telephone field is empty). Their `tel:36677213` link is an erroneous link on the IČO, not a phone number, so the rebuild displays it only as company registration data.

Existing source dates, prices, accreditations, regulations and language differences are preserved as supplied, not independently re-certified. For example, the English magneto page says “coming soon,” and the Slovak page lists a price. Download labels retain their original years. `docs/sitemap.md` records the migration decisions.

## Deploy the preview

`.github/workflows/deploy.yml` builds on a push to `main` or `master`, or manual dispatch. It installs from the lockfile, runs type checks, builds with `SITE=https://kubokubis25.github.io`, `BASE_PATH=/ts-web-preview/`, and `PUBLIC_INDEXABLE=false`, then validates links before uploading the Pages artifact. Choose **GitHub Actions** under the repository's Settings → Pages. The repository name must be `ts-web-preview` for this default path; change `BASE_PATH` if it differs. An optional repository variable `PUBLIC_FORM_ENDPOINT` configures delivery.

The workflow follows the [official Astro GitHub Pages deployment guide](https://docs.astro.build/en/guides/deploy/github/). This implementation is committed locally; no remote creation, push, or deployment is part of the rebuild.

`noindex` metadata protects all preview content. The generated `robots.txt` disallows crawling, but crawlers request robots at the **origin root**: GitHub project Pages cannot control `https://kubokubis25.github.io/robots.txt`. Set a root robots policy separately if needed; every page still carries `noindex`. Redirect and 404 pages always remain noindex.

## Switch to the production domain

1. Configure the final host for `www.testing-service.org` and the apex `testing-service.org`, including HTTPS. For GitHub Pages, set the custom domain in Settings → Pages, point the `www` CNAME to `kubokubis25.github.io`, and configure apex DNS using GitHub's current [custom-domain DNS instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). Keep existing email MX/TXT records. GitHub Actions deployments use the Pages custom-domain setting; a `CNAME` file is unnecessary for this workflow (branch-based publishing needs one).
2. Build with `SITE=https://www.testing-service.org`, `BASE_PATH=/`, and `PUBLIC_INDEXABLE=true`. Update the workflow environment too. These variables are compiled into HTML; changing hosting environment variables without rebuilding has no effect.
3. Set the form endpoint if desired, then run `npm run check`, `npm run build` and `npm run check:links`. Test the actual domain, downloads and form delivery after deployment.
4. Configure the host to redirect HTTP and the noncanonical domain to the canonical HTTPS domain. Submit the generated `/sitemap.xml` once production is live.

For Netlify or Cloudflare Pages, publish `dist/` and use `npm run build`; `dist/_redirects` provides real 301 redirects. On GitHub Pages, the static redirect pages provide meta refresh, canonical destination, an ordinary fallback link, and JavaScript replacement preserving query and fragment. GitHub adds a trailing slash to old directory URLs before serving the redirect. Every old sitemap slug is covered, including empty language folders and duplicate services. Keep the redirect map in `src/data/redirects.json` when adding or changing routes. Original `/s/` file URLs stay valid; the old extensionless map also remains available.
