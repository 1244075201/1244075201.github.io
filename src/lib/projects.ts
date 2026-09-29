import { getCollection } from "astro:content";
import { existsSync } from "node:fs";
import { resolve, sep } from "node:path";
import { profile } from "../data/profile";

export async function getProjects() {
  const projects = await getCollection("projects");
  const slugs = new Set<string>();
  const publicRoot = resolve("public");
  function checkAsset(src: string) {
    const target = resolve(publicRoot, src.slice(1));
    if (!target.startsWith(publicRoot + sep) || !existsSync(target)) {
      throw new Error(`本地资源不存在或路径无效：${src}`);
    }
  }
  if (profile.resume) checkAsset(profile.resume);
  for (const { data } of projects) {
    if (slugs.has(data.slug)) throw new Error(`项目 slug 重复：${data.slug}`);
    slugs.add(data.slug);
    if (data.cover) checkAsset(data.cover.src);
    for (const media of data.media) {
      checkAsset(media.src);
      if (media.poster) checkAsset(media.poster);
    }
  }
  return projects.sort((a, b) => a.data.order - b.data.order);
}
