export const ym = (d: Date | "Now") =>
  d === "Now" ? "now" : `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;

export const ymd = (d: Date) => d.toISOString().slice(0, 10);

/** Deterministic 7-char pseudo-hash so /work reads like a git log. */
export const hash = (seed: string) => {
  let h = 0x811c9dc5;
  for (const ch of seed) {
    h ^= ch.charCodeAt(0);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0").slice(0, 7);
};

export const readingTime = (body: string) =>
  `${Math.max(1, Math.round(body.split(/\s+/).length / 220))} min`;
