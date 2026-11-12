# Sitemap and migration map

All paths below are relative to the configured `BASE_PATH`. Production uses `/`; the GitHub Pages preview uses `/ts-web-preview/`. All new content URLs end with `/`.

## New tree

```text
/                                      Slovak home
├── sluzby/                            Navigation group (links to home #services)
│   ├── povolenia-a-schvalenia/
│   ├── technicke-poradenstvo/
│   ├── rizika-atex-pawa/
│   └── inspekcie-a-skusky/
├── letectvo/
│   ├── skusky-avioniky/
│   └── technicka-udrzba/
├── kontaktujte-nas/
├── ochrana-osobnych-udajov/             Original Slovak GDPR download + legal identity
├── en/
│   ├── services/                      Navigation group (links to /en/#services)
│   │   ├── permits-and-approvals/
│   │   ├── technical-consulting/
│   │   ├── risk-atex-pawa/
│   │   └── inspections-and-testing/
│   ├── aviation/
│   │   ├── instrument-testing/
│   │   └── technical-maintenance/
│   ├── references/
│   └── contact/
└── zh/
    └── references/

/s/*                                   Original downloadable files
/sitemap.xml                           Canonical content + hreflang alternates
/robots.txt                            Controlled by PUBLIC_INDEXABLE
/404.html                              Custom error page
```

No Slovak references translation was present. The Slovak menu therefore points to `/en/references/` and labels it EN. Chinese has only home and references; links to detailed services, Aviation and contact identify English destinations. The language switcher uses the content key to link to an equivalent page, falling back to that language's home only when necessary. `hreflang` and `x-default` refer to real matching content (SK default when available, otherwise EN).

## Every old sitemap URL

The original host is `https://www.testing-service.org`. Each old path receives a static redirect page with meta refresh, destination canonical, JavaScript and a normal fallback link. `public/_redirects` and `dist/_redirects` are generated for hosts supporting HTTP 301 rules (both slash variants).

| Old URL                                         | New URL                                 |
| ----------------------------------------------- | --------------------------------------- |
| `/ait-gallery`                                  | `/letectvo/`                            |
| `/aviation`                                     | `/letectvo/`                            |
| `/aviation-2`                                   | `/en/aviation/`                         |
| `/aviation-technical-maintenance`               | `/letectvo/technicka-udrzba/`           |
| `/aviation-technical-maintenance-1`             | `/en/aviation/technical-maintenance/`   |
| `/aviation-testing-service`                     | `/letectvo/skusky-avioniky/`            |
| `/aviation-testing-service-2`                   | `/en/aviation/instrument-testing/`      |
| `/consulting-services`                          | `/en/services/technical-consulting/`    |
| `/consulting-services-sk`                       | `/sluzby/technicke-poradenstvo/`        |
| `/foto`                                         | `/letectvo/`                            |
| `/hire-us`                                      | `/en/contact/`                          |
| `/inspections-testing-qualifications-sk`        | `/sluzby/inspekcie-a-skusky/`           |
| `/inspections-testing-revisions-qualifications` | `/en/services/inspections-and-testing/` |
| `/kontakt`                                      | `/kontaktujte-nas/`                     |
| `/lang-nav`                                     | `/`                                     |
| `/language-eng`                                 | `/en/`                                  |
| `/language-svk`                                 | `/`                                     |
| `/our-services`                                 | `/en/services/permits-and-approvals/`   |
| `/permit-assurance`                             | `/en/services/permits-and-approvals/`   |
| `/povolenia-schvalenia`                         | `/sluzby/povolenia-a-schvalenia/`       |
| `/references-en`                                | `/en/references/`                       |
| `/references-zho`                               | `/zh/references/`                       |
| `/risk-atex-pawa-sk`                            | `/sluzby/rizika-atex-pawa/`             |
| `/risk-safety-atex-certification`               | `/en/services/risk-atex-pawa/`          |
| `/skmain`                                       | `/`                                     |
| `/testing-service-eng`                          | `/en/`                                  |
| `/zho`                                          | `/zh/`                                  |

## Content decisions

- `our-services` duplicates `permit-assurance`; both resolve to the one English permits page.
- `language-eng` and `language-svk` contained service lists. Their real offerings, including laser safety, OHS and Aviation, are retained on the respective homepage. Empty `lang-nav` resolves to Slovak home.
- Both Aviation language trees use one design and a shared translation key structure. The source's English/Slovak differences are preserved.
- `foto` and `ait-gallery` contain real photography despite minimal scraped text. Their images are incorporated into the Aviation overview's gallery, with responsive lazy images and a native expandable section. The former standalone pages redirect to Aviation.
- All 12 supplied PDF/XLSX files retain their filenames under `/s/`. The missing `/s/LZZI-Map` download is recovered from the supplied `LZZI_AD.JPG`, also available as `/s/LZZI-Map.jpg`.
- Company registration text receives diacritics and formatting corrections. The old telephone link attached to IČO is removed; no phone number is invented.
- Raw export content is not fetched at runtime. Copied editable Markdown removes duplicated footers and redundant page titles; heading hierarchy and obvious typos are corrected without changing the service claims.

The sitemap excludes all legacy redirects and the 404 page. No additional translations, customers, certificates or service claims are introduced.
