export function url(path = "") {
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
export function absolute(path = "", site: URL | undefined) {
  return new URL(url(path), site || "https://www.testing-service.org").href;
}
