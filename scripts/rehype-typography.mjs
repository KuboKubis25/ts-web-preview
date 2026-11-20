import { parseFragment, serialize } from 'parse5';

/** Shared, idempotent typography for Markdown text and rendered data strings. */
export function typography(value, lang, compounds = false) {
  if (lang === 'zh' && !compounds) return value;
  const bindCompounds = text => text.replace(/\p{L}{2,}(?:-\p{L}{2,})+/gu,
    word => word.length <= 24 ? word.replaceAll('-', '\u2011') : word);
  // Leave URLs and addresses intact, including their path/query punctuation.
  return value.split(/((?:https?:\/\/|mailto:|www\.)\S+|\S+@\S+)/g).map((part, index) => {
    if (index % 2) return part;
    if (lang === 'zh') return bindCompounds(part);
    let text = part.replace(/ ([·–/]) /g, '\u00a0$1 ').replace(/(\d) (?=(?:hod\.|h\b|V\b|m\b|€))/g, '$1\u00a0');
    // Labels bind backward before prepositions bind forward. Literal spaces in
    // the forward pass keep an already-bound category letter from binding twice.
    text = text.replace(/\b(No|Nr\.|sk\.) (?=[\dA-Z])/g, '$1\u00a0')
      .replace(/(č\.) (?=[\dA-Z])/g, '$1\u00a0');
    text = text.replace(/Bendix\sKing/g, 'Bendix\u00a0King')
      .replace(/Slick\s(?=\(?\d)/g, 'Slick\u00a0')
      .replace(/(série|serie|series)\s(?=[A-Z0-9])/g, '$1\u00a0');
    if (lang === 'en') text = text.replace(/ & /g, ' &\u00a0');
    if (lang === 'sk' || lang === 'cs') {
      text = text.replace(/(\d)\s?%/g, '$1\u00a0%');
      text = text.replace(/([^\s.!?:„(])(\s)([AIKOSUVZ])(?=[\s,.)]|$)/g, '$1\u00a0$3');
      for (let pass = 0; pass < 2; pass++) {
        text = text.replace(/(^|[\s(„])([aikosuvz]) /g, '$1$2\u00a0')
          .replace(/(^|[„(]|[.!?:] )([AIKOSUVZ]) /g, '$1$2\u00a0');
      }
    }
    if (compounds) text = bindCompounds(text);
    // Drop a joining space if it would chain more than 24 characters.
    // Preserve each short product/series unit and keep this pass idempotent.
    return text.replace(/[^\s]+(?:\u00a0[^\s]+)+/g, run => {
      let length = 0;
      return run.split('\u00a0').map((word, i) => {
        const separator = i && length + 1 + word.length <= 24 ? '\u00a0' : i ? ' ' : '';
        length = separator === '\u00a0' ? length + 1 + word.length : word.length;
        return separator + word;
      }).join('');
    });
  }).join('');
}

/** Transform only visible copy, never routing keys, URLs, IDs or image names. */
export function typographyCopy(copy, lang, compounds = false) {
  return Object.fromEntries(Object.entries(copy).map(([key, value]) => [key, typeof value === 'string' ? typography(value, lang, compounds || ['title', 'description', 'packageLead'].includes(key)) : value]));
}

export default function rehypeTypography() {
  return (tree, file) => {
    const lang = file.data.astro?.frontmatter?.lang;
    const visit = (node, compounds = false) => {
      if (node.type === 'element') {
        if (/^h[1-6]$/.test(node.tagName) || node.tagName === 'li') compounds = true;
        if (node.tagName === 'p') compounds = false;
      }
      if (node.type === 'element' && ['code', 'pre', 'script', 'style'].includes(node.tagName)) return;
      if (node.type === 'text') node.value = typography(node.value, lang, compounds);
      // Authored key lines are raw HTML in Markdown; normalize their text nodes
      // too, while leaving attribute values, URLs and element structure intact.
      if (node.type === 'raw' && lang !== 'zh' && /^<p\b[^>]*>[\s\S]*<\/p>$/.test(node.value)) {
        const fragment = parseFragment(node.value);
        const normalize = element => {
          if (['code', 'pre', 'script', 'style'].includes(element.tagName)) return;
          if (element.nodeName === '#text') element.value = typography(element.value, lang, compounds);
          element.childNodes?.forEach(normalize);
        };
        normalize(fragment);
        node.value = serialize(fragment);
      }
      if (node.type === 'element' && /^h[2-4]$/.test(node.tagName) && node.children?.at(-1)?.value?.endsWith(':')) {
        node.properties ||= {};
        node.properties.className = [...(node.properties.className || []), 'prose-label'];
      }
      node.children?.forEach(child => visit(child, compounds));
    };
    visit(tree);
  };
}
