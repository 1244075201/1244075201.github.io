// Local-only media preparation. Original files never enter public/ or Git.
// Usage: FFMPEG=/path/to/ffmpeg node scripts/prepare-media.mjs
import { spawnSync } from "node:child_process";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import sharp from "sharp";
import { registerCaptions } from "./write-captions.mjs";

const ffmpeg = process.env.FFMPEG;
if (!ffmpeg) throw new Error("Set FFMPEG to your local ffmpeg executable.");
const output = "public/media";
await mkdir(output, { recursive: true });
const registry = {};
function run(args) {
  const result = spawnSync(
    ffmpeg,
    ["-hide_banner", "-loglevel", "error", "-y", ...args],
    { encoding: "utf8" },
  );
  if (result.status !== 0) throw new Error(result.stderr);
}
const sources = {
  npc: "素材/LLM NPC/日常对话录像.mp4",
  tft: "素材/TFT/问答录像.mp4",
  vr: "素材/游戏与交互/DND&VR桌游.mp4",
  shooter: "素材/游戏与交互/射击游戏.mp4",
  escape: "素材/游戏与交互/密室解密.mp4",
  math: "素材/游戏与交互/古代数学之迷.mp4",
};
const images = [
  [
    "npc-ui",
    "素材/LLM NPC/hero.png",
    "NPC 实机交互界面",
    "基于 Generative Agents / Smallville 环境扩展；本项目重点展示 Persistent Context 与 NPC 交互机制。",
    false,
  ],
  [
    "npc-original",
    "素材/LLM NPC/系统架构图.png",
    "原始 Thesis Architecture Diagram",
    "项目原始架构图；网页架构重绘以此为依据。",
    false,
  ],
  [
    "tft-ui",
    "素材/TFT/UI.png",
    "TFT Strategy Agent 真实界面",
    "录制时版本：Set 18 · Patch 18.2。此作品集不提供实时游戏数据。",
    false,
  ],
  [
    "workspace",
    "素材/记账工作台/工作台主界面.png",
    "自由职业工作与结算管理工作台（已脱敏）",
    "真实产品界面；客户、工作内容与敏感金额已脱敏。",
    true,
  ],
];
for (const [id, source, alt, caption, redacted] of images) {
  const { width, height } = await sharp(source).metadata();
  const widths = [...new Set([480, 960, width].filter((w) => w <= width))];
  for (const w of widths)
    await sharp(source)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ lossless: true })
      .toFile(`${output}/${id}-${w}.webp`);
  registry[id] = {
    kind: "image",
    src: `/media/${id}-${width}.webp`,
    srcset: widths.map((w) => `/media/${id}-${w}.webp ${w}w`).join(", "),
    width,
    height,
    alt,
    caption,
    evidence: "real-evidence",
    redacted,
    source,
  };
}
const videos = [
  {
    id: "npc-demo",
    source: "npc",
    duration: 58.9,
    width: 1976,
    height: 1064,
    posterTime: 50,
    crf: 22,
    maxrate: "2600k",
    alt: "NPC 完整交互演示",
    caption:
      "Uncut Interaction Demo · 保留输入、等待、回复与记忆更新。基于 Generative Agents / Smallville 环境扩展。",
  },
  {
    id: "tft-demo",
    source: "tft",
    duration: 65.5,
    width: 1920,
    height: 1080,
    posterTime: 55,
    crf: 22,
    maxrate: "2600k",
    alt: "TFT 实际问答演示",
    caption: "完整问答流程；Set 18 / Patch 18.2 为录制时的版本上下文。",
  },
  {
    id: "shooter-demo",
    source: "shooter",
    duration: 150.8436,
    width: 1920,
    height: 978,
    posterTime: 60,
    crf: 25,
    maxrate: "1700k",
    alt: "射击游戏 Gameplay",
    caption: "真实游戏操作录像。",
  },
  {
    id: "escape-demo",
    source: "escape",
    duration: 124.725,
    width: 864,
    height: 544,
    posterTime: 45,
    crf: 24,
    maxrate: "1200k",
    alt: "密室解谜游戏 Gameplay",
    caption: "真实游戏操作录像。",
  },
  {
    id: "math-demo",
    source: "math",
    duration: 160.37037,
    width: 962,
    height: 544,
    posterTime: 65,
    crf: 24,
    maxrate: "1000k",
    alt: "古代数学之旅 Gameplay",
    caption: "真实游戏操作录像。",
  },
  {
    id: "vr-highlight",
    source: "vr",
    start: 270,
    duration: 75,
    width: 1280,
    height: 720,
    posterTime: 310,
    crf: 24,
    maxrate: "1600k",
    alt: "VR D&D 战斗片段精选",
    caption: "原片 04:30–05:45 的连续战斗片段；未加速。完整演示保留原有署名。",
  },
  ...[0, 240, 480, 720].map((start, i) => ({
    id: `vr-part-${i + 1}`,
    source: "vr",
    start,
    duration: Math.min(240, 764.485979 - start),
    width: 1280,
    height: 720,
    posterTime: start + 10,
    crf: 25,
    maxrate: "1300k",
    alt: `VR D&D 完整演示第 ${i + 1} 部分`,
    caption: `原片顺序分段 ${i + 1}/4 · ${Math.floor(start / 60)}:${String(start % 60).padStart(2, "0")} 起；未经加速。`,
  })),
];
for (const v of videos) {
  console.log(`Preparing ${v.id}`);
  const source = sources[v.source];
  run([
    "-ss",
    String(v.posterTime),
    "-i",
    source,
    "-frames:v",
    "1",
    "-vf",
    `scale=${v.width}:${v.height}`,
    `${output}/${v.id}-poster.png`,
  ]);
  await sharp(`${output}/${v.id}-poster.png`)
    .webp({ quality: 88 })
    .toFile(`${output}/${v.id}-poster.webp`);
  await unlink(`${output}/${v.id}-poster.png`);
  // Only the final WebP poster remains in the published tree.
  const input =
    v.start === undefined
      ? ["-i", source]
      : ["-ss", String(v.start), "-i", source, "-t", String(v.duration)];
  run([
    ...input,
    "-map",
    "0:v:0",
    "-map",
    "0:a?",
    "-vf",
    `scale=${v.width}:${v.height}`,
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    "-crf",
    String(v.crf),
    "-maxrate",
    v.maxrate,
    "-bufsize",
    "5200k",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "96k",
    "-movflags",
    "+faststart",
    "-map_metadata",
    "-1",
    `${output}/${v.id}.mp4`,
  ]);
  registry[v.id] = {
    kind: "video",
    src: `/media/${v.id}.mp4`,
    poster: `/media/${v.id}-poster.webp`,
    width: v.width,
    height: v.height,
    duration: v.duration,
    alt: v.alt,
    caption: v.caption,
    evidence: "real-evidence",
    redacted: false,
    source,
  };
}
await registerCaptions(registry);
await writeFile(
  "src/data/media.generated.json",
  JSON.stringify(registry, null, 2) + "\n",
);
console.log("Media registry written.");
