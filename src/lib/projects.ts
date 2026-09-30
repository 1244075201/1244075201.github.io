import { getCollection } from "astro:content";
import { existsSync } from "node:fs";
import { resolve, sep } from "node:path";
import { profile } from "../data/profile";
import { getMedia } from "../data/media";

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
    for (const id of [data.heroAsset, data.demoAsset]) {
      if (!id) continue;
      const asset = getMedia(id);
      checkAsset(asset.src);
      if (asset.poster) checkAsset(asset.poster);
    }
    if (data.demoAsset && getMedia(data.demoAsset).kind !== "video") {
      throw new Error(`Demo 必须使用视频：${data.slug}`);
    }
    if (data.cover) checkAsset(data.cover.src);
    for (const media of data.media) {
      checkAsset(media.src);
      if (media.poster) checkAsset(media.poster);
    }
  }
  return projects.sort((a, b) => a.data.order - b.data.order);
}
