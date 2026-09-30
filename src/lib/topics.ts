import { getCollection } from "astro:content";
import { getProjects } from "./projects";

export async function getTopics(project?: string) {
  const topics = await getCollection("topics");
  const projects = await getProjects();
  const addresses = new Set<string>();
  for (const { data } of topics) {
    if (
      !projects.some(
        (p) => p.data.slug === data.project && p.data.display === "case-study",
      )
    )
      throw new Error(`主题所属项目不存在：${data.project}`);
    const key = `${data.project}/${data.slug}`;
    if (addresses.has(key)) throw new Error(`主题地址重复：${key}`);
    addresses.add(key);
  }
  return topics
    .filter((t) => !project || t.data.project === project)
    .sort((a, b) => a.data.order - b.data.order);
}
