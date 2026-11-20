import { parseFragment, type DefaultTreeAdapterMap } from "parse5";

/** Read the actual rendered outline, including labels and adjacent headings. */
export function articleOutline(html: string) {
  const elements = parseFragment(html).childNodes.filter(
    (node): node is DefaultTreeAdapterMap["element"] => "tagName" in node,
  );
  const isHeading = (node?: DefaultTreeAdapterMap["element"]) =>
    !!node && /^h[2-4]$/.test(node.tagName);
  const attr = (node: DefaultTreeAdapterMap["element"], name: string) =>
    node.attrs.find((attr) => attr.name === name)?.value;
  const text = (node: DefaultTreeAdapterMap["childNode"]): string =>
    "value" in node ? node.value : "childNodes" in node ? node.childNodes.map(text).join("") : "";
  return {
    headingFirst: isHeading(elements[0]),
    headings: elements.flatMap((node, index) =>
      /^h[23]$/.test(node.tagName) &&
      !attr(node, "class")?.split(" ").includes("prose-label") &&
      !isHeading(elements[index - 1])
        ? [{ slug: attr(node, "id")!, text: text(node), depth: Number(node.tagName[1]) }]
        : [],
    ),
  };
}
