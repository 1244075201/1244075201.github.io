import { readFile, writeFile } from "node:fs/promises";

// Reviewed summaries of narration and visible actions, not verbatim ASR output.
export async function registerCaptions(registry) {
  const summaries = JSON.parse(
    await readFile("src/data/video-summaries.json", "utf8"),
  );
  summaries["vr-highlight"] = summaries["vr-part-2"]
    .filter(([start, end]) => end > 30 && start < 105)
    .map(([start, end, text]) => [
      Math.max(0, start - 30),
      Math.min(75, end - 30),
      text,
    ]);
  const stamp = (seconds) =>
    new Date(Math.round(seconds * 1000)).toISOString().slice(11, 23);
  for (const [id, cues] of Object.entries(summaries)) {
    const src = `/media/${id}-summary.vtt`;
    const vtt =
      "WEBVTT\n\nNOTE 中文讲解与画面摘要，非逐字稿。\n\n" +
      cues
        .map(
          ([start, end, text]) =>
            `${stamp(start)} --> ${stamp(end)}\n${text}\n`,
        )
        .join("\n");
    await writeFile(`public${src}`, vtt);
    registry[id].captions = {
      src,
      label: "中文讲解摘要（非逐字）",
      language: "zh-CN",
    };
  }
  return registry;
}
if (process.argv[1]?.replaceAll("\\", "/").endsWith("/write-captions.mjs")) {
  const registry = JSON.parse(
    await readFile("src/data/media.generated.json", "utf8"),
  );
  await writeFile(
    "src/data/media.generated.json",
    JSON.stringify(await registerCaptions(registry), null, 2) + "\n",
  );
}
