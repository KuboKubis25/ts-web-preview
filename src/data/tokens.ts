export const colors = { ink: "#18292e" } as const;
export const spacing = { hairlineGap: "clamp(40px, 1rem + 3.4vw, 64px)" } as const;

export const typography = {
  "ui-current": { size: "0.9375rem", weight: 600, leading: 1.2 },
  "prose-h3": { size: "clamp(1.1875rem, 1.05rem + 0.55vw, 1.375rem)", weight: 500, leading: 1.3 },
  "prose-h2": { size: "clamp(1.5rem, 1.3rem + 0.8vw, 1.75rem)", weight: 500, leading: 1.25 },
  "field-label": { size: "0.875rem", weight: 500, leading: 1.55 },
} as const;
