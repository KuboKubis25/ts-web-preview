/** Add UI actions after the source's two service blocks without editing their headings. */
export default function aviationDetails({ labels, paths }) {
  return (tree, file) => {
    const { key, lang } = file.data.astro?.frontmatter || {};
    if (key !== "aviation" || !paths[lang]) return;
    const targets = {
      "Aviation Testing": paths[lang][0],
      "Aviation Service": paths[lang][1],
    };
    const children = [];
    let target;
    const appendAction = () => {
      if (!target) return;
      children.push({
        type: "paragraph",
        data: { hProperties: { className: ["service-details"] } },
        children: [
          {
            type: "link",
            url: target,
            data: { hProperties: { className: ["text-link"] } },
            children: [
              { type: "text", value: labels[lang] },
              {
                type: "html",
                value:
                  '<svg class="icon icon-right" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><path d="M3 8h10M8 3l5 5-5 5" /></svg>',
              },
            ],
          },
        ],
      });
      target = undefined;
    };
    for (const node of tree.children) {
      if (node.type === "heading") {
        appendAction();
        target =
          targets[node.children.map((child) => child.value || "").join("")];
      }
      children.push(node);
    }
    appendAction();
    tree.children = children;
  };
}
