type LenisLike = { scrollTo: (target: string | HTMLElement | number, opts?: Record<string, unknown>) => void };

const NAV_OFFSET = -96;

/**
 * Smoothly scrolls to a same-page hash target via the active Lenis instance
 * (falling back to native smooth scroll before Lenis has mounted).
 * Returns true if it handled the scroll — callers should preventDefault() in that case.
 * Returns false for cross-page links, letting the browser navigate normally.
 */
export function scrollToHash(href: string): boolean {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return false;

  const path = href.slice(0, hashIndex) || "/";
  if (typeof window === "undefined" || window.location.pathname !== path) return false;

  const id = href.slice(hashIndex + 1);
  if (!id) return false;
  const target = document.getElementById(id);
  if (!target) return false;

  const lenis = (window as Window & { __lenis?: LenisLike }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return true;
}
