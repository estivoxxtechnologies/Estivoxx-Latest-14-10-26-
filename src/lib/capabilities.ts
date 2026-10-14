function detect() {
  const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  let webgl = false;
  try {
    const c = document.createElement('canvas');
    webgl = !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch { /* no webgl */ }
  return { reduced, webgl, flat: reduced || !webgl };
}
/** `flat` = render a normal, readable page (no 3D, no scroll-scrubbing). */
export const caps = detect();
