import type { Product } from "../types";

export const CATEGORIES = ["All", "GTA VI", "PS5 Console", "Xbox Console", "VR", "Racing Wheel", "Big Screen Gaming"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_ICON: Record<Category, string> = {
  All: "☺", "GTA VI": "🎮", "PS5 Console": "🎮", "Xbox Console": "🎮", VR: "🥽", "Racing Wheel": "🏎", "Big Screen Gaming": "📽",
};

export const CATEGORY_MATCH: Record<Category, (p: Product) => boolean> = {
  All: () => true,
  "GTA VI": (p) => /GTA/i.test(p.name),
  "PS5 Console": (p) => /PS5/i.test(p.name),
  "Xbox Console": (p) => /Xbox/i.test(p.name),
  VR: (p) => /\bVR\b|Oculus|Quest/i.test(p.name),
  "Racing Wheel": (p) => /Wheel|Racing/i.test(p.name),
  "Big Screen Gaming": (p) => /Projector|Big Screen/i.test(p.name),
};
