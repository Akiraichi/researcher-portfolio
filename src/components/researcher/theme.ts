// Shared theme definitions for ResearcherPortfolio-related components

export type PaletteDef = { base: string; soft: string };

// Color palettes (extend as needed)
export const PALETTES = {
  indigo: { base: "#4f46e5", soft: "#eef2ff" },
  teal: { base: "#0d9488", soft: "#ecfeff" },
  purple: { base: "#7c3aed", soft: "#f5f3ff" },
  rose: { base: "#e11d48", soft: "#fff1f2" },
} as const;

export type PaletteName = keyof typeof PALETTES;
