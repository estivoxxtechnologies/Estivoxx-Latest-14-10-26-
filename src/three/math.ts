export const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
/** Camera z for scroll progress inside the digital world (p 0.52 → 1). */
export const zFor = (p: number) => -2.5 - ((p - 0.52) / 0.48) * 92;
