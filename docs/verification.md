# Verification

## Build and links

Validated with Node 22.23.4 and Astro 7.4.11.

- `npm run check`: no errors, warnings or hints.
- `npm run build`: successful static build.
- `npm run check:links`: 50 HTML pages and 1,798 internal URL/asset/fragment checks; no broken internal URLs, assets, or fragments; every one of the 27 old sitemap slugs has a valid redirect.
- Preview configuration: `SITE=https://kubokubis25.github.io`, `BASE_PATH=/ts-web-preview/`, `PUBLIC_INDEXABLE=false`, empty `PUBLIC_FORM_ENDPOINT`.
- Production configuration also tested: root base, production origin, indexing enabled, configured HTTPS form endpoint.
- SHA-256 comparison: all 12 supplied PDF/XLSX downloads match their source files byte-for-byte.

The final `dist/` is the preview build. No GitHub deployment was performed.

## Browser checks

Chromium via Playwright, using the built static site:

- All 27 legacy redirects preserve query parameters and URL fragments.
- Equivalent-page language switching and missing-translation home fallbacks.
- Desktop service disclosure by Enter and Escape, mobile menu toggle and Escape.
- No horizontal overflow on home, Chinese home, English contact and Aviation at widths 320, 390, 768, 1024 and 1440 pixels.
- Native required-field/email validation and mailto fallback.
- Configured endpoint receives the expected POST fields. The test intercepted the request locally; no external message was sent.
- Mobile navigation, Aviation gallery disclosure and native form fallback remain available without JavaScript.
- Sampled home, English home, Chinese home, Aviation, contact and consulting pages have no automated axe WCAG A/AA violations and no browser errors.

## Lighthouse

Local mobile-emulation measurements on the preview build; scores can vary with hardware, network and hosting. SEO is intentionally constrained by preview noindex and was not scored.

| Page              | Performance | Accessibility | Best practices |   CLS |
| ----------------- | ----------: | ------------: | -------------: | ----: |
| Slovak home       |          96 |           100 |            100 |     0 |
| Aviation overview |         100 |           100 |            100 | 0.001 |
| Contact           |         100 |           100 |            100 | 0.001 |

The first run identified low-contrast gold labels, small footer tap targets, inaccessible label overrides, and mobile hero sizing. These were corrected and rechecked. This automated validation does not claim a full manual accessibility certification. External legacy links, historical regulatory statements, and actual form-provider delivery are outside the local build check.
