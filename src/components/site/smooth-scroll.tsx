import { useEffect, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let rafId = 0;
    let destroyed = false;
    let instance: { destroy: () => void; raf: (t: number) => void } | null = null;

    void import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      instance = lenis;
      (window as Window & { __lenis?: typeof lenis }).__lenis = lenis;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      instance?.destroy();
      const w = window as Window & { __lenis?: unknown };
      if (w.__lenis === instance) w.__lenis = undefined;
    };
  }, []);

  return children;
}
