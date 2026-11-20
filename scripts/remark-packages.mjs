/** Package headings remain source copy; only redundant presentation is removed. */
export default function packages({ labels }) {
  return (tree, file) => {
    const { key, lang, packageLead } = file.data.astro?.frontmatter || {};
    if (key !== 'home') return;
    const text = (node) => node.value ?? node.children?.map(text).join('') ?? '';
    const normalized = (value) => value.trim().replace(/[.]$/, '').toLocaleLowerCase();
    const nodes = tree.children;
    tree.children = nodes.filter((node, index) => {
      const value = normalized(text(node));
      if (index === 0 && node.type === 'paragraph' && value === normalized(packageLead || '')) return false;
      if (node.type === 'heading' && value === normalized(labels[lang])) return false;
      if (node.type === 'paragraph' && nodes[index + 1]?.type === 'heading' && value === normalized(text(nodes[index + 1]))) return false;
      return true;
    });
    for (const node of tree.children) {
      if (node.type !== 'heading') continue;
      node.depth = Math.min(6, node.depth + 1);
      const last = node.children.at(-1);
      if (last?.type === 'text') last.value = last.value.replace(/\.$/, '');
    }
  };
}
