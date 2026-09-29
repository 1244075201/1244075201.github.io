import { readdir, readFile, access } from "node:fs/promises";
import { resolve, dirname, extname } from "node:path";

const root = resolve("dist");
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory() ? walk(resolve(dir, e.name)) : resolve(dir, e.name),
      ),
    )
  ).flat();
}
const files = await walk(root);
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const errors = [];
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const required of [
    /<html[^>]*lang="zh-CN"/,
    /<title>[^<]+<\/title>/,
    /name="description"/,
    /rel="canonical"/,
  ]) {
    if (!required.test(html))
      errors.push(`${file}: 缺少页面元信息 ${required}`);
  }
  for (const [, attr, url] of html.matchAll(/\b(href|src|poster)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|data:|#)/.test(url)) continue;
    const [rawPath, fragment] = url.split("#");
    const pathname = decodeURIComponent(rawPath.split("?")[0]);
    let target = pathname.startsWith("/")
      ? resolve(root, "." + pathname)
      : resolve(dirname(file), pathname);
    if (!extname(target)) target = resolve(target, "index.html");
    try {
      await access(target);
      if (attr === "href" && fragment && target.endsWith(".html")) {
        const destination = await readFile(target, "utf8");
        if (!destination.includes(`id="${decodeURIComponent(fragment)}"`))
          errors.push(`${file}: 锚点不存在 ${url}`);
      }
    } catch {
      errors.push(`${file}: 资源或页面不存在 ${url}`);
    }
  }
}
if (errors.length) throw new Error(errors.join("\n"));
console.log(
  `Verified ${htmlFiles.length} HTML pages: metadata, internal links, anchors and local assets.`,
);
