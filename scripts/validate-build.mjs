import { readdir, readFile, access, stat } from "node:fs/promises";
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
const topicSources = (await walk(resolve("src/content/topics"))).filter((f) =>
  f.endsWith(".md"),
);
for (const file of topicSources) {
  const source = await readFile(file, "utf8");
  const project = source.match(/^project:\s*(.+)$/m)?.[1].trim();
  const slug = source.match(/^slug:\s*(.+)$/m)?.[1].trim();
  if (
    !files.includes(
      resolve(root, "projects", project || "", slug || "", "index.html"),
    )
  )
    errors.push(`主题未生成：${file}`);
}
const registry = JSON.parse(
  await readFile("src/data/media.generated.json", "utf8"),
);
const allowedMedia = new Set();
for (const [id, asset] of Object.entries(registry)) {
  if (!(asset.width > 0 && asset.height > 0) || !asset.alt || !asset.source)
    errors.push(`媒体元数据不完整：${id}`);
  if (id === "workspace" && !asset.redacted)
    errors.push("工作台必须登记为脱敏素材");
  for (const url of [
    asset.src,
    asset.poster,
    asset.captions?.src,
    ...(asset.srcset || "").split(",").map((s) => s.trim().split(/\s+/)[0]),
  ].filter(Boolean)) {
    if (!url.startsWith("/media/") || url.includes(".."))
      errors.push(`发布媒体路径无效：${url}`);
    allowedMedia.add(resolve(root, "." + url));
  }
}
let mediaBytes = 0;
for (const file of files) {
  if (
    /\.(mp4|mov|png|jpe?g|webp|gif|vtt)$/i.test(file) &&
    !allowedMedia.has(file)
  )
    errors.push(`未登记的公开媒体：${file}`);
  if (/[\\/]素材[\\/]|梦魇|nightmare/i.test(file))
    errors.push(`排除范围内的素材进入构建：${file}`);
}
for (const file of files.filter((f) => f.startsWith(resolve(root, "media")))) {
  if (!allowedMedia.has(file)) errors.push(`未登记的发布素材：${file}`);
  const { size } = await stat(file);
  mediaBytes += size;
  if (size >= 90 * 1024 ** 2) errors.push(`单个媒体超过 90 MiB：${file}`);
}
for (const file of allowedMedia) {
  try {
    await access(file);
  } catch {
    errors.push(`登记的媒体不存在：${file}`);
  }
}
if (mediaBytes > 250 * 1024 ** 2) errors.push("发布媒体超过 250 MiB");
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  if (new Set(ids).size !== ids.length) errors.push(`${file}: 重复元素 ID`);
  for (const required of [
    /<html[^>]*lang="zh-CN"/,
    /<title>[^<]+<\/title>/,
    /name="description"/,
    /rel="canonical"/,
  ]) {
    if (!required.test(html))
      errors.push(`${file}: 缺少页面元信息 ${required}`);
  }
  const references = [
    ...html.matchAll(/\b(href|src|poster|data-video-src)="([^"]+)"/g),
  ];
  for (const [, values] of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const value of values.split(","))
      references.push(["", "src", value.trim().split(/\s+/)[0]]);
  }
  for (const [, attr, url] of references) {
    if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
    const [rawPath, fragment] = url.split("#");
    const pathname = decodeURIComponent(rawPath.split("?")[0]);
    let target = !pathname
      ? file
      : pathname.startsWith("/")
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
  `Verified ${htmlFiles.length} HTML pages: metadata, internal links, anchors and local assets; ${(mediaBytes / 1024 ** 2).toFixed(1)} MiB registered media.`,
);
