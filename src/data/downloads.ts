import type { Lang } from "./ui";
export interface Download {
  file: string;
  title: string;
  titleEn?: string;
  page: string;
  lang: Lang | "both";
  division: "industry" | "aviation";
}
export const downloadTitle = (file: Download, lang: Lang) =>
  lang !== "sk" && file.titleEn ? file.titleEn : file.title;
export const downloads: Download[] = [
  {
    file: "TS-AObjednavkaFinal_2024.xlsx",
    title: "Objednávka skúšok avioniky · 2024",
    page: "instruments",
    division: "aviation",
    lang: "sk",
  },
  {
    file: "TS-AObjednavkaFinal_2019-9bbj.xlsx",
    title: "Instrument testing order form · 2019",
    page: "instruments",
    division: "aviation",
    lang: "en",
  },
  {
    file: "TS-AIFRcennik2024ENG.pdf",
    title: "IFR price list · 2024",
    page: "instruments",
    division: "aviation",
    lang: "en",
  },
  {
    file: "TS-AVFRcennik2024ENG.pdf",
    title: "VFR price list · 2024",
    page: "instruments",
    division: "aviation",
    lang: "en",
  },
  {
    file: "TSLetak_Sep2018-22pw.pdf",
    title: "Aviation · informačný leták",
    page: "instruments",
    division: "aviation",
    lang: "sk",
  },
  {
    file: "TS-Letak_Sep-2018_ENG.pdf",
    title: "Aviation · information leaflet",
    page: "instruments",
    division: "aviation",
    lang: "en",
  },
  {
    file: "TS-A_Objednavka_Magneta_.xlsx",
    title: "Objednávka kontroly magnet",
    page: "maintenance",
    division: "aviation",
    lang: "sk",
  },
  {
    file: "TS-Osvedenie-SK145031.pdf",
    title: "Osvedčenie / Certificate · SK.145.031",
    titleEn: "Certificate · SK.145.031",
    page: "aviation",
    division: "aviation",
    lang: "both",
  },
  {
    file: "TS-A-organigram-2018-k8cj.pdf",
    title: "Aviation · Organigram · 2018",
    page: "aviation",
    division: "aviation",
    lang: "both",
  },
  {
    file: "TS-Opravnenie.pdf",
    title: "Oprávnenie / Accreditations",
    titleEn: "Accreditations",
    page: "inspections",
    division: "industry",
    lang: "sk",
  },
  {
    file: "CNTS-Presentation-EN-translation-Chinese.pdf",
    title: "Testing Service · 行业案例",
    page: "references",
    division: "industry",
    lang: "zh",
  },
  {
    file: "GDPR_SK_TS_ver1-1.pdf",
    title: "Ochrana osobných údajov · GDPR",
    page: "legal",
    division: "industry",
    lang: "sk",
  },
];
