import type { Lang } from "./ui";
export interface Download {
  file: string;
  title: string;
  titleEn?: string;
  page: string;
  lang: Lang | "both";
  division: "industry" | "aviation";
  kind: "form" | "pricelist" | "certificate" | "leaflet" | "other";
}
export const downloadTitle = (file: Download, lang: Lang) =>
  lang !== "sk" && file.titleEn ? file.titleEn : file.title;
export const downloadOrder = [
  "form",
  "pricelist",
  "certificate",
  "leaflet",
  "other",
] as const;
export const downloads: Download[] = [
  {
    kind: "form",
    file: "TS-AObjednavkaFinal_2024.xlsx",
    title: "Objednávka skúšok avioniky · 2024",
    page: "instruments",
    division: "aviation",
    lang: "sk",
  },
  {
    kind: "pricelist",
    file: "TS-AIFRcennik2024ENG.pdf",
    title: "IFR price list · 2024",
    page: "instruments",
    division: "aviation",
    lang: "en",
  },
  {
    kind: "pricelist",
    file: "TS-AVFRcennik2024ENG.pdf",
    title: "VFR price list · 2024",
    page: "instruments",
    division: "aviation",
    lang: "en",
  },
  {
    kind: "leaflet",
    file: "TSLetak_Sep2018-22pw.pdf",
    title: "Aviation · informačný leták",
    page: "instruments",
    division: "aviation",
    lang: "sk",
  },
  {
    kind: "leaflet",
    file: "TS-Letak_Sep-2018_ENG.pdf",
    title: "Aviation · information leaflet",
    page: "instruments",
    division: "aviation",
    lang: "en",
  },
  {
    kind: "form",
    file: "TS-A_Objednavka_Magneta_.xlsx",
    title: "Objednávka kontroly magnet",
    page: "maintenance",
    division: "aviation",
    lang: "sk",
  },
  {
    kind: "certificate",
    file: "TS-Osvedenie-SK145031.pdf",
    title: "Osvedčenie · SK.145.031",
    titleEn: "Certificate · SK.145.031",
    page: "aviation",
    division: "aviation",
    lang: "both",
  },
  {
    kind: "other",
    file: "TS-A-organigram-2018-k8cj.pdf",
    title: "Aviation · Organigram · 2018",
    page: "aviation",
    division: "aviation",
    lang: "both",
  },
  {
    kind: "certificate",
    file: "TS-Opravnenie.pdf",
    title: "Oprávnenie",
    titleEn: "Accreditations",
    page: "inspections",
    division: "industry",
    lang: "sk",
  },
  {
    kind: "other",
    file: "CNTS-Presentation-EN-translation-Chinese.pdf",
    title: "Testing Service · 行业案例",
    page: "references",
    division: "industry",
    lang: "zh",
  },
  {
    kind: "other",
    file: "GDPR_SK_TS_ver1-1.pdf",
    title: "Ochrana osobných údajov · GDPR",
    page: "legal",
    division: "industry",
    lang: "sk",
  },
];
