import { useEffect } from 'react';
import { progress } from '../state/progress';
import { smooth as sm } from '../three/math';
import { NAV } from '../config/site';

/**
 * Drives DOM that depends on scroll without React re-renders per frame:
 * fades each `.scene` in/out by its data-a/data-b range, fades the intro, and reports the active nav index.
 */
export function useCinematicDom(enabled: boolean, onActive: (i: number) => void) {
  useEffect(() => {
    if (!enabled) return;
    const scenes = [...document.querySelectorAll<HTMLElement>('.scene[data-a]')];
    const intro = document.getElementById('intro');
    const start = performance.now();
    let raf = 0, activeIdx = -1;

    const tick = () => {
      const p = progress.p;
      if (intro) intro.style.opacity = String((1 - sm(0, 0.06, p)) * Math.min(1, (performance.now() - start) / 2400));
      for (const s of scenes) {
        const a = +s.dataset.a!, b = +s.dataset.b!, hold = s.dataset.hold === 'true';
        const o = Math.min(sm(a, a + 0.012, p), hold ? 1 : 1 - sm(b - 0.012, b, p));
        s.style.opacity = String(o);
        s.style.visibility = o > 0.01 ? 'visible' : 'hidden';
        s.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
      }
      let idx = 0;
      NAV.forEach((n, i) => { if (p >= n.start - 0.002) idx = i; });
      if (idx !== activeIdx) { activeIdx = idx; onActive(idx); }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [enabled, onActive]);
}
