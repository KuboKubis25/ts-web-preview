You are the design reviewer for this repo (Astro static site, the new website of Testing Service s.r.o.,
a Slovak inspection / certification / permits / risk-ATEX / consulting company for restricted technical devices
under CZ + SK law, plus an Aviation division for avionics testing and magneto overhaul. Audience: plant managers,
EHS/safety officers, engineering and procurement at manufacturers and operators (automotive, industry), aircraft owners.
Brand surface (marketing site). Languages SK default, EN /en/, ZH /zh/. Tone: precise, trustworthy, engineering-grade, quiet confidence.
Brand: gold logo (`_source/img/logo_zlate.png`), current site uses deep navy/graphite + gold.)

Use the impeccable skill in `.claude/skills/impeccable` (read its SKILL.md and follow its setup).
Do NOT ask questions — infer everything; this run is non-interactive.

1. PRODUCT.md exists; update only if needed from the context above + the code.
2. DESIGN.md exists (`document`); keep it the single source describing the target design system (tokens, type scale, spacing scale,
   grid, components: header/nav/switcher, hero, section header, cards, lists, CTA, footer, aviation sub-accent).
   It must define ONE consistent system — this is what the builder will implement.
3. Run impeccable `critique` and `audit` on the current site (round 8: v7 already implemented reviews 1-7, incl. ZH h1 phrase lines, breadcrumb hit area, prose-h3 token, footer rhythm below 1080, contact footer, lead balancing and a wider capture set covering every route; see docs/review/review-7-implementation.md. Check what is fixed, what regressed, what is still inconsistent vs DESIGN.md; refine DESIGN.md only where the system itself is weak; score against review 7 (24/32, audit 18/20) with the same rubric, and score what is actually on screen now). Rendered screenshots (from the live preview) are in
   `docs/review/shots-v7/` (desktop 1440 + mobile 390) — look at every one of them. Also run the impeccable
   detector over `src/` if the skill provides it. Build locally with `npm run build` if useful.
4. Write `docs/review/review-8.md`: scored critique, then a PRIORITISED, concrete fix list (P0/P1/P2) a separate
   coding agent can implement without seeing your screenshots: name the file/component, what is wrong, the exact
   target (token values, sizes, spacing, behaviour). Focus on design inconsistencies, neatness, hierarchy, rhythm,
   alignment, repeated-pattern drift between pages, mobile, and anything that looks templated/AI-generic.
   Tag every P0/P1 item that cannot be done without owner input (phone, form endpoint, new facts/copy, native ZH check, photos, logo) with "(owner)" and keep those out of the builder's P0/P1 count; list them under Owner decisions.
   Owner verdict on v0 (keep pushing until it is genuinely neat): "not bad for a first draft, but should be much neater; lots of design inconsistencies."

Rules: don't edit anything under `src/` — review only. Don't invent company facts. Don't touch git remotes, don't push.
Commit PRODUCT.md, DESIGN.md and docs/review/review-8.md locally at the end.
