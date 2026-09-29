import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const localAsset = z
  .string()
  .regex(/^\/(?!\/)[^?#]+$/, "资源必须使用以 / 开头的本地路径");
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    category: z.enum(["ai", "games", "lab"]),
    order: z.number().int(),
    featured: z.boolean().default(false),
    display: z.enum(["case-study", "gallery"]).default("case-study"),
    contentStatus: z
      .enum(["placeholder", "partial", "complete"])
      .default("placeholder"),
    summary: z.string().optional(),
    projectStatus: z.string().optional(),
    role: z.string().optional(),
    period: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    cover: z.object({ src: localAsset, alt: z.string().min(1) }).optional(),
    media: z
      .array(
        z.object({
          type: z.enum(["image", "video"]),
          src: localAsset,
          alt: z.string().min(1),
          caption: z.string().optional(),
          poster: localAsset.optional(),
        }),
      )
      .default([]),
    links: z
      .array(
        z.object({
          label: z.string().min(1),
          url: z.url({ protocol: /^https$/ }),
        }),
      )
      .default([]),
    showTimeline: z.boolean().default(false),
    iterations: z
      .array(
        z.object({
          version: z.string().min(1),
          problem: z.string().min(1),
          evidence: z.string().optional(),
          change: z.string().optional(),
          result: z.string().optional(),
          next: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

export const collections = { projects };
