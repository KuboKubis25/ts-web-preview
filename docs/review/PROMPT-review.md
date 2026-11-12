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
3. Run impeccable `critique` and `audit` on the current site (round 2: v1 already implemented review-1; check what is fixed, what regressed, what is still inconsistent vs DESIGN.md; you may refine DESIGN.md where the system itself is weak). Rendered screenshots (from the live preview) are in
   `docs/review/shots-v1/` (desktop 1440 + mobile 390) — look at every one of them. Also run the impeccable
   detector over `src/` if the skill provides it. Build locally with `npm run build` if useful.
4. Write `docs/review/review-2.md`: scored critique, then a PRIORITISED, concrete fix list (P0/P1/P2) a separate
   coding agent can implement without seeing your screenshots: name the file/component, what is wrong, the exact
   target (token values, sizes, spacing, behaviour). Focus on design inconsistencies, neatness, hierarchy, rhythm,
   alignment, repeated-pattern drift between pages, mobile, and anything that looks templated/AI-generic.
   Owner verdict on v0 (keep pushing until it is genuinely neat): "not bad for a first draft, but should be much neater; lots of design inconsistencies."

Rules: don't edit anything under `src/` — review only. Don't invent company facts. Don't touch git remotes, don't push.
Commit PRODUCT.md, DESIGN.md and docs/review/review-2.md locally at the end.
