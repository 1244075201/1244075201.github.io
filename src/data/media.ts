import registry from "./media.generated.json";
export interface MediaAsset {
  kind: "image" | "video";
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  evidence: "real-evidence" | "explanation" | "reference";
  redacted: boolean;
  source: string;
  srcset?: string;
  poster?: string;
  duration?: number;
  captions?: { src: string; label: string; language: string };
}
export const media = registry as Record<string, MediaAsset>;
export function getMedia(id: string) {
  const asset = media[id];
  if (!asset) throw new Error(`媒体未登记：${id}`);
  return asset;
}
