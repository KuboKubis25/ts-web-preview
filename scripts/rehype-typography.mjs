/** Shared, idempotent typography for Markdown text and rendered data strings. */
export function typography(value, lang) {
  if (lang === 'zh') return value;
  // Leave URLs and addresses intact, including their path/query punctuation.
  return value.split(/((?:https?:\/\/|mailto:|www\.)\S+|\S+@\S+)/g).map((part, index) => {
    if (index % 2) return part;
    let text = part.replace(/ – /g, '\u00a0– ').replace(/(\d) (?=(?:hod\.|h\b|V\b|m\b|€))/g, '$1\u00a0');
    if (lang === 'sk' || lang === 'cs')
      for (let pass = 0; pass < 2; pass++) text = text.replace(/(^|[\s(„])([AaIiKkOoSsUuVvZz]) /g, '$1$2\u00a0');
    return text;
  }).join('');
}

/** Transform only visible copy, never routing keys, URLs, IDs or image names. */
export function typographyCopy(copy, lang) {
  return Object.fromEntries(Object.entries(copy).map(([key, value]) => [key, typeof value === 'string' ? typography(value, lang) : value]));
}

export default function rehypeTypography() {
  return (tree, file) => {
    const lang = file.data.astro?.frontmatter?.lang;
    const visit = (node) => {
      if (node.type === 'element' && ['code', 'pre', 'script', 'style'].includes(node.tagName)) return;
      if (node.type === 'text') node.value = typography(node.value, lang);
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
