import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { Database, Download, Server, ShieldCheck, Trash2 } from "lucide-react";

const PILLARS = [
  {
    icon: Server,
    title: "Secure AWS infrastructure",
    desc: "MediQ runs on managed AWS services, with access to your records locked down to the app.",
  },
  {
    icon: Database,
    title: "Protected database",
    desc: "Your health records live in a secured database — never in ad networks, broker lists or training sets.",
  },
  {
    icon: Download,
    title: "Export whenever",
    desc: "Pull a full copy of everything MediQ holds about you, in your own time, without asking permission.",
  },
  {
    icon: Trash2,
    title: "Delete for good",
    desc: "Erase your account and the data behind it. It is your record, so you decide when it ends.",
  },
] as const;

type LenisLike = {
  on: (e: string, fn: () => void) => void;
  off: (e: string, fn: () => void) => void;
};

/**
 * Publishes the section's entry as `--lock` (0 the moment its top edge crosses the
 * bottom of the viewport, 1 once the section is entirely on screen — or, when the
 * section is taller than the viewport, once it fills it). The shackle, the keyhole
 * glow and the status pill all read it in CSS, so closing the lock costs one style
 * write per frame. The element ships with `--lock: 1`, which is what no-JS and
 * reduced-motion visitors keep: a shut padlock.
 */
function useLockProgress(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const measure = () => {
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      // The shackle starts wide open as the section's top edge appears and is home by
      // the time the section is fully in view; a section taller than the viewport
      // finishes once it has filled the screen instead.
      const span = Math.min(r.height, vh) || 1;
      const p = Math.max(0, Math.min(1, (vh - r.top) / span));
      el.style.setProperty("--lock", (p * p * (3 - 2 * p)).toFixed(4));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Lenis drives its own rAF loop and does not always emit native scroll events.
    let unsub: (() => void) | undefined;
    const bind = () => {
      const lenis = (window as Window & { __lenis?: LenisLike }).__lenis;
      if (!lenis || unsub) return;
      lenis.on("scroll", onScroll);
      unsub = () => lenis.off("scroll", onScroll);
    };
    bind();
    const id = window.setInterval(bind, 250);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      unsub?.();
      window.clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}

export function PrivacyCore() {
  const sectionRef = useRef<HTMLElement>(null);
  useLockProgress(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="privacy"
      className="section scroll-mt-24 overflow-hidden border-t border-black/5 bg-linear-to-b from-wash to-wash-blue"
      style={{ "--lock": "1" } as CSSProperties}
    >
      <div className="mx-auto max-w-narrow text-center">
        <p className="eyebrow text-primary">Privacy &amp; Security</p>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold">
          Your data, under lock
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-lg leading-relaxed font-normal text-muted">
          Health records are the most personal data you have. Here is exactly
          how MediQ holds them — and how you take them back.
        </p>
      </div>

      <div className="mx-auto mt-16 grid w-full max-w-content items-center gap-6 lg:grid-cols-[1fr_minmax(280px,360px)_1fr] lg:gap-10">
        <PillarColumn from={0} />
        <LockVisual />
        <PillarColumn from={2} />
      </div>

      <div className="reveal mx-auto mt-14 flex max-w-narrow items-center justify-center gap-3 rounded-xl border border-border bg-surface/70 px-6 py-4 text-center backdrop-blur">
        <ShieldCheck className="size-5 shrink-0 text-primary" />
        <p className="text-[15px] font-medium text-fg">
          We do not sell or lease your data to advertisers or third-party
          brokers.
        </p>
      </div>
    </section>
  );
}

function PillarColumn({ from }: { from: 0 | 2 }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:gap-6">
      {PILLARS.slice(from, from + 2).map((pillar, i) => {
        const Icon = pillar.icon;
        return (
          <article
            key={pillar.title}
            className="reveal flex-1 rounded-xl border border-border bg-surface p-6 text-center transition-shadow duration-300 hover:shadow-card sm:text-left"
            style={{ animationDelay: `${(from + i) * 90}ms` }}
          >
            <div className="mx-auto mb-5 grid size-11 place-items-center rounded-md bg-primary/15 text-primary sm:mx-0">
              <Icon className="size-5" />
            </div>
            <h3 className="font-display text-lg font-bold">{pillar.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed font-normal text-muted">
              {pillar.desc}
            </p>
          </article>
        );
      })}
    </div>
  );
}

/**
 * Hinged on the right leg, which never leaves the body: at `--lock: 0` the shackle
 * has swung wide open over the left shoulder, and it falls shut as `--lock` reaches 1.
 */
const SHACKLE_TRANSFORM =
  "rotate(calc((1 - var(--lock)) * 40deg)) translateY(calc((1 - var(--lock)) * -10px))";

function LockVisual() {
  return (
    <div className="relative mx-auto flex w-full max-w-[360px] flex-col items-center py-6">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-primary) 18%, transparent) 0%, transparent 66%)",
          opacity: "calc(0.35 + var(--lock) * 0.65)",
        }}
      />
      <svg
        aria-hidden
        viewBox="0 0 300 300"
        className="pointer-events-none absolute top-1/2 left-1/2 w-[128%] -translate-x-1/2 -translate-y-1/2 text-fg"
      >
        <circle
          cx="150"
          cy="150"
          r="146"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
        <circle
          cx="150"
          cy="150"
          r="116"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.14"
          strokeWidth="1"
          strokeDasharray="2 12"
          strokeLinecap="round"
        />
      </svg>

      <svg
        viewBox="0 0 300 400"
        className="relative w-[74%]"
        fill="none"
        aria-hidden
        style={{
          filter:
            "drop-shadow(0 20px 34px color-mix(in oklab, #1f2025 14%, transparent))",
        }}
      >
        <defs>
          <linearGradient
            id="pc-body"
            x1="150"
            y1="160"
            x2="150"
            y2="380"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#ccd6e8" />
          </linearGradient>
          <linearGradient
            id="pc-shackle"
            x1="82"
            y1="60"
            x2="218"
            y2="210"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#c3cddc" />
            <stop offset="0.5" stopColor="#95a1b6" />
            <stop offset="1" stopColor="#b3bfd0" />
          </linearGradient>
        </defs>

        {/* Legs run well into the body, so the lift never exposes their ends. */}
        <path
          d="M82 214V128a68 68 0 0 1 136 0v86"
          stroke="url(#pc-shackle)"
          strokeWidth="34"
          strokeLinecap="round"
          style={{
            transform: SHACKLE_TRANSFORM,
            transformOrigin: "218px 206px",
          }}
        />

        <rect
          x="34"
          y="176"
          width="232"
          height="204"
          rx="40"
          fill="url(#pc-body)"
          stroke="#1f2025"
          strokeOpacity="0.14"
          strokeWidth="1.5"
        />
        <rect
          x="37"
          y="179"
          width="226"
          height="198"
          rx="37"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.9"
          strokeWidth="1.5"
        />

        {/* Keyhole: dim while the lock hangs open, lit once it closes. */}
        <g style={{ opacity: "calc(0.45 + var(--lock) * 0.55)" }}>
          <circle
            cx="150"
            cy="258"
            r="46"
            fill="var(--color-primary)"
            fillOpacity="0.1"
          />
          <circle cx="150" cy="258" r="20" fill="var(--color-primary)" />
          <path d="M142 274h16l6 42h-28z" fill="var(--color-primary)" />
        </g>
      </svg>

      <div className="relative mt-7 h-10 w-full" aria-hidden>
        <StatusPill
          label="Unlocked"
          tone="muted"
          opacity="calc((0.45 - var(--lock)) * 6)"
        />
        <StatusPill
          label="Locked & secured"
          tone="primary"
          opacity="calc((var(--lock) - 0.55) * 6)"
        />
      </div>
    </div>
  );
}

function StatusPill({
  label,
  tone,
  opacity,
}: {
  label: string;
  tone: "muted" | "primary";
  opacity: string;
}) {
  return (
    <span
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity } as CSSProperties}
    >
      <span
        className={`inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-4 py-2 text-[13px] font-semibold shadow-card ${
          tone === "primary" ? "text-primary" : "text-muted"
        }`}
      >
        <ShieldCheck className="size-4" />
        {label}
      </span>
    </span>
  );
}
