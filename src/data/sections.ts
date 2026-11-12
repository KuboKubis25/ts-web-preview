import homeCopy from "./home.json";
import type { Lang } from "./ui";
export const serviceKeys = [
  "permits",
  "consulting",
  "risk",
  "inspections",
] as const;
export const aviationKeys = ["aviation", "instruments", "maintenance"] as const;
// ZH has no service detail pages; retain the archived Chinese home titles on all links.
export function serviceTitle(page: { key: string; title: string }, lang: Lang) {
  const index = serviceKeys.findIndex((key) => key === page.key);
  return lang === "zh" && index >= 0
    ? homeCopy.zh.services[index].title
    : page.title;
}
