export function typography(value: string, lang?: string): string;
export function typographyCopy<T extends Record<string, unknown>>(copy: T, lang?: string): T;
export default function rehypeTypography(): (tree: unknown, file: unknown) => void;
