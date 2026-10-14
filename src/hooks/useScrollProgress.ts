import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { progress } from '../state/progress';

gsap.registerPlugin(ScrollTrigger);

/** Maps the scroll position over #track to progress.target (0..1). */
export function useScrollProgress(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (location.hash) history.replaceState(null, '', location.pathname + location.search); // keep the URL clean
    const st = ScrollTrigger.create({ trigger: '#track', start: 'top top', end: 'bottom bottom', onUpdate: (s) => { progress.target = s.progress; } });
    return () => st.kill();
  }, [enabled]);
}
