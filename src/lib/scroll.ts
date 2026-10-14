import gsap from 'gsap';

/** Smoothly scroll to a progress value (0..1) of the cinematic track. URL is left untouched (no #hash). */
export function scrollToProgress(v: number) {
  const max = document.documentElement.scrollHeight - innerHeight;
  const proxy = { y: scrollY };
  gsap.to(proxy, { y: v * max, duration: 1.6, ease: 'power2.inOut', onUpdate: () => scrollTo(0, proxy.y) });
}
