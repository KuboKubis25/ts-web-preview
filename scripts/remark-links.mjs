/** Prefix site-relative Markdown links at build time, including legacy source URLs. */
export default function baseAwareLinks({ base = "/", redirects = {} } = {}) {
  const prefix = base === "/" ? "" : base.replace(/\/$/, "");
  function visit(node) {
    if (typeof node.url === "string") {
      let value = node.url.replace(
        /^https?:\/\/(www\.)?testing-service\.org(?=\/)/,
        "",
      );
      if (
        value.startsWith("/") &&
        !value.startsWith("//") &&
        !(prefix && value.startsWith(prefix + "/"))
      ) {
        const parsed = new URL(value, "https://internal.invalid");
        const slug = parsed.pathname.replace(/^\/|\/$/g, "");
        const path = Object.hasOwn(redirects, slug)
          ? "/" + redirects[slug]
          : parsed.pathname;
        node.url = prefix + path + parsed.search + parsed.hash;
      }
    }
    for (const child of node.children || []) visit(child);
  }
  return visit;
}
