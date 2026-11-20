export function typography(value: string, lang?: string, compounds?: boolean): string;
export function typographyCopy<T extends Record<string, unknown>>(copy: T, lang?: string, compounds?: boolean): T;
export default function rehypeTypography(): (tree: unknown, file: unknown) => void;
