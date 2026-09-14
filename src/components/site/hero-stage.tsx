import { useEffect, useRef, useState } from "react";
import { Activity, Droplets, Flame, Footprints, Heart, Moon, Sparkles } from "lucide-react";
import { PLAY_STORE } from "@/lib/site";

export function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const raw = Math.min(1, Math.max(0, -rect.top / Math.max(1, el.offsetHeight * 0.5)));
      setP(reduce ? 0 : raw);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scale = 1 + p * 0.28;
  const lift = p * -90;
  const fade = 1 - p * 1.15;

  return (
    <header ref={stageRef} className="relative min-h-[118vh] overflow-hidden pt-28 md:pt-32">
      <img
        src="/media/sky.jpg"
        alt=""
        className="sky-pan pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-linear-to-t from-bg via-bg/80 to-transparent"
      />

      <div
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
        style={{ opacity: Math.max(0, fade), transform: `translateY(${p * -28}px)` }}
      >
        <div className="reveal mb-6 inline-flex items-center gap-2 rounded-pill border border-primary/20 bg-surface/70 px-4 py-1.5 text-[13px] font-semibold tracking-wide text-primary uppercase backdrop-blur">
          <Sparkles className="size-3.5" />
          AI-Powered Health Coach
        </div>
        <h1 className="reveal font-display text-[clamp(3rem,6.4vw,5.2rem)] font-extrabold tracking-[-0.04em]">
          Make sense of your
          <br />
          health data.
        </h1>
        <p className="reveal mx-auto mt-5 max-w-xl text-lg font-normal leading-relaxed text-muted">
          MediQ turns your wearables, vitals, and lifestyle into personalized recommendations. Track everything from
          sleep to nutrition in one beautifully designed app.
        </p>
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#download"
            className="inline-flex min-h-12 items-center rounded-pill bg-ink px-7 py-3.5 text-base font-bold text-invert transition-transform duration-150 hover:bg-black active:scale-[0.96]"
          >
            Download Free
          </a>
          <a
            href="#features"
            className="inline-flex min-h-12 items-center rounded-pill border border-border bg-surface/70 px-7 py-3.5 text-base font-semibold backdrop-blur"
          >
            Explore Features
          </a>
        </div>
        <div className="reveal mt-5 flex items-center justify-center gap-3 text-sm font-medium text-muted">
          <span className="tracking-widest text-warning">★★★★★</span>
          <span>4.9/5 Average Rating</span>
        </div>
      </div>

      <div
        className="relative z-20 mx-auto mt-6 h-[560px] w-full max-w-[980px]"
        style={{ transform: `translateY(${lift}px) scale(${scale})`, transformOrigin: "center top" }}
      >
        <Phone />
        <Watch />
        <Chips />
      </div>

      <a
        href={PLAY_STORE}
        target="_blank"
        rel="noreferrer"
        className="absolute right-5 bottom-8 z-30 hidden items-center gap-3 rounded-lg bg-ink px-4 py-3 text-invert shadow-device md:flex"
      >
        <span className="grid size-12 place-items-center rounded-md bg-invert/10 font-display text-lg font-extrabold">
          MQ
        </span>
        <span className="text-left text-[13px] leading-snug">
          <strong className="block text-sm">Download for Android</strong>
          Get started with MediQ for free today.
        </span>
      </a>
    </header>
  );
}

function Phone() {
  const c = 2 * Math.PI * 52;
  const offset = c * (1 - 0.84);
  return (
    <div className="float-a absolute top-0 left-1/2 w-[280px] -translate-x-[62%] rounded-[44px] bg-ink p-2.5 shadow-device md:w-[310px]">
      <div className="relative overflow-hidden rounded-[36px] bg-linear-to-b from-[#d8eef8] to-bg">
        <div className="absolute top-3 left-1/2 z-10 h-[22px] w-[108px] -translate-x-1/2 rounded-[12px] bg-black" />
        <div className="px-4 pt-10 pb-5">
          <div className="mb-3 flex items-center justify-between text-xs font-semibold">
            <span>9:41</span>
            <span className="opacity-60">LTE</span>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-muted">Recovery</div>
            <div className="text-xs text-muted">March 12, 2026</div>
            <svg viewBox="0 0 140 140" className="mx-auto mt-2 size-36">
              <circle cx="70" cy="70" r="52" fill="none" stroke="rgba(31,32,37,0.1)" strokeWidth="10" />
              <circle
                cx="70"
                cy="70"
                r="52"
                fill="none"
                stroke="var(--color-success)"
                strokeWidth="10"
                strokeLinecap="round"
                transform="rotate(-90 70 70)"
                className="ring-anim"
                style={{
                  ["--ring-c" as string]: String(c),
                  ["--ring-offset" as string]: String(offset),
                  strokeDasharray: c,
                }}
              />
              <text x="70" y="68" textAnchor="middle" className="fill-fg" style={{ fontSize: 28, fontWeight: 800 }}>
                84
              </text>
              <text x="70" y="88" textAnchor="middle" className="fill-muted" style={{ fontSize: 11, fontWeight: 600 }}>
                Good
              </text>
            </svg>
          </div>
          <div className="mt-1 grid grid-cols-2 gap-2">
            <Mini label="Sleep" value="7h 20m" />
            <Mini label="Steps" value="6,240" />
          </div>
          <p className="mt-3 rounded-md bg-surface/80 p-3 text-[12px] leading-snug font-normal text-muted">
            The 7h 20m of sleep you had last night significantly improved your HRV baseline.
          </p>
        </div>
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-surface/80 px-3 py-2">
      <div className="text-[10px] font-semibold tracking-wide text-muted uppercase">{label}</div>
      <div className="font-display text-base font-extrabold">{value}</div>
    </div>
  );
}

function Watch() {
  const [clock, setClock] = useState("10:09");
  useEffect(() => {
    const id = window.setInterval(() => {
      const d = new Date();
      setClock(
        d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
      );
    }, 1000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="float-b absolute top-[210px] right-[8%] hidden w-[168px] rounded-[38px] bg-[#1a1c1e] p-2 shadow-device sm:block">
      <div className="rounded-[30px] bg-black px-3 py-4 text-center text-white">
        <div className="text-[11px] font-semibold opacity-70">{clock}</div>
        <div className="mt-3 grid grid-cols-3 gap-1 font-display text-lg font-extrabold">
          <span className="text-strain">40</span>
          <span className="text-success">84</span>
          <span className="text-hrv">92</span>
        </div>
        <div className="mt-1 text-[10px] tracking-wide text-white/50 uppercase">Stress · Rec · Sleep</div>
        <div className="mt-4 rounded-md bg-[#2a1010] px-2 py-2 text-left">
          <div className="text-[10px] text-white/60">Resting HR</div>
          <div className="font-display text-xl font-bold">58 bpm</div>
        </div>
      </div>
    </div>
  );
}

const CHIPS = [
  {
    delay: "0s",
    pos: "left-[4%] top-[16%]",
    icon: Droplets,
    tone: "bg-oxy/15 text-oxy",
    body: (
      <>
        Hydration
        <span className="block text-[12px] font-normal text-muted">1.2L / 2L</span>
      </>
    ),
  },
  {
    delay: "3s",
    pos: "left-[2%] top-[46%]",
    icon: Heart,
    tone: "bg-heart/15 text-heart",
    body: (
      <>
        <span className="flex items-center gap-2">
          Resting HR 58 bpm
          <svg width="56" height="18" viewBox="0 0 56 18" aria-hidden>
            <path
              d="M0 12 C8 12 8 4 16 8 S28 16 32 8 44 2 56 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="80"
              style={{ animation: "spark 1.6s linear infinite" }}
            />
          </svg>
        </span>
      </>
    ),
  },
  {
    delay: "6s",
    pos: "right-[2%] top-[12%]",
    icon: Sparkles,
    tone: "bg-primary/15 text-primary",
    body: (
      <>
        AI Insight
        <span className="mt-1 block max-w-[200px] text-[12px] leading-snug font-normal text-muted">
          Your recovery score is trending up.
        </span>
      </>
    ),
  },
  {
    delay: "9s",
    pos: "right-[6%] top-[54%]",
    icon: Flame,
    tone: "bg-cal/15 text-cal",
    body: (
      <>
        Calories
        <span className="block text-[12px] font-normal text-muted">1,850 kcal</span>
      </>
    ),
  },
  {
    delay: "12s",
    pos: "left-[10%] top-[72%]",
    icon: Moon,
    tone: "bg-sleep/15 text-sleep",
    body: (
      <>
        Sleep Duration
        <span className="block text-[12px] font-normal text-muted">7h 20m · Optimal</span>
      </>
    ),
  },
  {
    delay: "15s",
    pos: "right-[14%] top-[72%]",
    icon: Footprints,
    tone: "bg-steps/15 text-steps",
    body: (
      <>
        Daily Steps
        <span className="block text-[12px] font-normal text-muted">6,240 / 10k</span>
      </>
    ),
  },
] as const;

function Chips() {
  return (
    <>
      {CHIPS.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.delay}
            className={`chip-cycle pointer-events-none absolute hidden items-center gap-3 rounded-pill border border-white/70 bg-surface/90 px-3 py-2 text-[13px] font-semibold shadow-card backdrop-blur lg:flex ${c.pos}`}
            style={{ animationDelay: c.delay }}
          >
            <span className={`grid size-8 place-items-center rounded-full ${c.tone}`}>
              <Icon className="size-4" />
            </span>
            <span>{c.body}</span>
          </div>
        );
      })}
      <div className="pointer-events-none absolute top-[22%] left-2 flex items-center gap-2 rounded-pill bg-surface/90 px-3 py-2 text-[12px] font-semibold shadow-card lg:hidden">
        <Activity className="size-3.5 text-hrv" /> HRV trending up
      </div>
    </>
  );
}
