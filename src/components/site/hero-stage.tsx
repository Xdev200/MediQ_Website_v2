import { useEffect, useState } from "react";
import { Activity, Droplets, Flame, Footprints, Heart, Moon, Sparkles } from "lucide-react";
import { PhoneFrame } from "@/components/site/phone";
import { PLAY_STORE } from "@/lib/site";
import { scrollToHash } from "@/lib/smooth-anchor";

/**
 * The hero has no scroll-linked motion: it simply scrolls away at 1:1, the way the
 * reference does. The device is absolutely positioned so it bleeds past the section's
 * bottom edge and is clipped there, which keeps the section ~1.18vh tall instead of
 * letting a 756px device push it to 1.4vh.
 */

export function HeroStage() {
  return (
    <header className="relative min-h-[118vh] overflow-hidden pt-24">
      <img
        src="/media/sky.jpg"
        alt=""
        className="sky-pan pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-linear-to-t from-bg via-bg/80 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        {/* <div className="reveal mb-6 inline-flex items-center gap-2 rounded-pill border border-fg/10 bg-surface/60 px-4 py-1.5 text-[12px] font-semibold tracking-[0.08em] text-muted uppercase backdrop-blur">
          <Sparkles className="size-3.5" />
          AI-Powered Health Coach
        </div> */}
        <h1 className="reveal font-display text-[clamp(2.35rem,5.4vw,4.75rem)] leading-[1] font-bold tracking-[-0.03em] text-balance">
          Make sense of your
          {/* Forcing the break below sm strands "your" on a line of its own. */}
          <br className="hidden sm:inline" /> health data.
        </h1>
        <p className="reveal mx-auto mt-4 max-w-[34rem] text-[clamp(1.05rem,1.6vw,1.5rem)] leading-[1.35] font-normal text-fg/60">
          Turn your wearables, vitals, and lifestyle into recommendations you can act on.
        </p>
        <div className="reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.mediq.health&hl=en"
            target="_blank"
            className="inline-flex min-h-12 items-center rounded-pill bg-ink px-7 py-3.5 text-base font-bold text-invert transition-transform duration-150 hover:bg-black active:scale-[0.96]"
          >
            Download Free
          </a>
          <a
            href="#features"
            onClick={(e) => {
              if (scrollToHash("#features")) e.preventDefault();
            }}
            className="inline-flex min-h-12 items-center rounded-pill border border-border bg-surface/70 px-7 py-3.5 text-base font-semibold backdrop-blur"
          >
            Explore Features
          </a>
        </div>
        {/* <div className="reveal mt-5 flex items-center justify-center gap-2.5 text-[17px] font-medium text-fg/70">
          <span className="tracking-widest text-warning">★★★★★</span>
          <span>4.9/5 Average Rating</span>
        </div> */}
      </div>

      {/* Starts below the copy — the mobile offset is explicit because the stacked
          copy block is far taller there than 58vh would allow for. */}
      <div className="absolute inset-x-0 top-[620px] z-20 mx-auto h-[756px] w-full max-w-[1100px] px-6 md:top-[max(58vh,30rem)]">
        <FlowField />
        <Phone />
        {/* <Watch /> */}
        <Chips />
      </div>

      {/* Sits above the device so it dissolves into the page at the hero's clip edge
          instead of being sliced off mid-screen. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[25] h-[15%] bg-linear-to-t from-bg via-bg/85 to-transparent"
      />

      
    </header>
  );
}

/**
 * Readings converge on the device from the metric chips; a single strand leaves it
 * carrying the insight. Paths are authored in the stage's own 1100x756 space and
 * stretch with it (preserveAspectRatio="none") so they stay anchored to the chips,
 * which are positioned in percentages.
 */
const FLOW_IN = [
  { d: "M-40,150 C90,165 210,182 314,206", dur: "5.2s", delay: "0s" },
  { d: "M-40,332 C100,326 220,292 314,252", dur: "6.4s", delay: "1.4s" },
  { d: "M1140,352 C1010,346 830,304 700,258", dur: "5.7s", delay: "2.6s" },
] as const;

/** Leaves clear of the watch so the dot is not born behind it. */
const FLOW_OUT = [{ d: "M800,152 C900,122 1010,96 1140,70", dur: "4.8s", delay: "3.4s" }] as const;

function FlowField() {
  return (
    <svg
      viewBox="0 0 1100 756"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      aria-hidden
    >
      <defs>
        <radialGradient id="flow-bloom" cx="50%" cy="34%" r="52%">
          <stop offset="0%" stopColor="var(--color-primary-bright)" stopOpacity="0.16" />
          <stop offset="60%" stopColor="var(--color-primary)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="506" cy="200" rx="450" ry="190" fill="url(#flow-bloom)" />

      {FLOW_IN.map((f) => (
        <g key={f.d}>
          <path
            d={f.d}
            fill="none"
            stroke="var(--color-primary)"
            strokeOpacity="0.45"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="3 7"
            className="flow-line"
          />
          <circle
            r="5"
            fill="var(--color-primary-bright)"
            className="flow-dot"
            style={{
              offsetPath: `path("${f.d}")`,
              ["--flow-dur" as string]: f.dur,
              ["--flow-delay" as string]: f.delay,
            }}
          />
        </g>
      ))}

      {FLOW_OUT.map((f) => (
        <g key={f.d}>
          <path
            d={f.d}
            fill="none"
            stroke="var(--color-success)"
            strokeOpacity="0.5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="3 7"
            className="flow-line-out"
          />
          <circle
            r="5.5"
            fill="var(--color-success)"
            className="flow-dot"
            style={{
              offsetPath: `path("${f.d}")`,
              ["--flow-dur" as string]: f.dur,
              ["--flow-delay" as string]: f.delay,
            }}
          />
        </g>
      ))}
    </svg>
  );
}

function Phone() {
  const c = 2 * Math.PI * 52;
  const offset = c * (1 - 0.84);
  return (
    <PhoneFrame
      className="absolute top-0 left-1/2 aspect-[370/756] w-[min(370px,74vw)] -translate-x-1/2 shadow-device md:-translate-x-[62%]"
      screenClassName="bg-linear-to-b from-[#d8eef8] to-bg"
    >
      {/* Content fills the full device height — at 756px a short screen leaves an
          obvious white void below the fold. */}
      <div className="flex h-full flex-col px-4 pt-12 pb-3">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold">
          <span>9:41</span>
          <span className="opacity-60">LTE</span>
        </div>

        <div className="text-center">
          <div className="text-sm font-semibold text-muted">Recovery</div>
          <div className="text-xs text-muted">March 12, 2026</div>
          <svg viewBox="0 0 140 140" className="mx-auto mt-1 size-32">
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

        <p className="mt-2 rounded-md bg-surface/80 p-3 text-[12px] leading-snug font-normal text-muted">
          The 7h 20m of sleep you had last night significantly improved your HRV baseline.
        </p>

        <div className="mt-2 rounded-md bg-surface/80 p-3">
          <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide text-muted uppercase">
            <span>This week</span>
            <span className="text-success">+12%</span>
          </div>
          <div className="mt-2 flex h-14 items-end gap-1.5">
            {[32, 48, 38, 64, 45, 76, 100].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-[3px] ${i === 6 ? "bg-success" : "bg-fg/15"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2">
          <Tile label="HRV" value="92" tone="text-hrv" />
          <Tile label="Strain" value="40" tone="text-strain" />
          <Tile label="SpO₂" value="98%" tone="text-oxy" />
        </div>

        <div className="mt-auto flex items-center justify-around pt-3 text-muted">
          <Activity className="size-4 text-primary" />
          <Moon className="size-4" />
          <Flame className="size-4" />
          <Footprints className="size-4" />
        </div>
      </div>
    </PhoneFrame>
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

function Tile({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-md bg-surface/80 px-2 py-2 text-center">
      <div className="text-[9px] font-semibold tracking-wide text-muted uppercase">{label}</div>
      <div className={`font-display text-sm font-extrabold ${tone}`}>{value}</div>
    </div>
  );
}

// function Watch() {
//   const [clock, setClock] = useState("10:09");
//   useEffect(() => {
//     const tick = () =>
//       setClock(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }));
//     tick();
//     const id = window.setInterval(tick, 1000);
//     return () => window.clearInterval(id);
//   }, []);
//   return (
//     <div className="float-b absolute top-[18%] left-[52%] z-10 hidden w-[218px] rounded-[44px] bg-[#1a1c1e] p-2.5 shadow-device md:block">
//       <div className="rounded-[36px] bg-black px-4 py-5 text-center text-white">
//         <div className="text-[12px] font-semibold opacity-70">{clock}</div>
//         <div className="mt-3 grid grid-cols-3 gap-1 font-display text-xl font-extrabold">
//           <span className="text-strain">40</span>
//           <span className="text-success">84</span>
//           <span className="text-hrv">92</span>
//         </div>
//         <div className="mt-1 text-[10px] tracking-wide text-white/50 uppercase">Stress · Rec · Sleep</div>
//         <div className="mt-4 rounded-md bg-[#2a1010] px-3 py-2.5 text-left">
//           <div className="text-[10px] text-white/60">Resting HR</div>
//           <div className="font-display text-2xl font-bold">58 bpm</div>
//         </div>
//       </div>
//     </div>
//   );
// }

const CHIPS = [
  {
    delay: "0s",
    pos: "left-[1%] top-[12%]",
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
    pos: "left-[3%] top-[42%]",
    icon: Heart,
    tone: "bg-heart/15 text-heart",
    body: (
      <>
        Resting HR
        <span className="block text-[12px] font-normal text-muted">58 bpm · steady</span>
      </>
    ),
  },
  {
    delay: "6s",
    pos: "right-[1%] top-[8%]",
    icon: Sparkles,
    tone: "bg-primary/15 text-primary",
    body: (
      <>
        AI Insight
        <span className="mt-1 block max-w-[180px] text-[12px] leading-snug font-normal text-muted">
          Your recovery score is trending up.
        </span>
      </>
    ),
  },
  {
    delay: "9s",
    pos: "right-[2%] top-[40%]",
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
    pos: "left-[5%] top-[70%]",
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
    pos: "right-[6%] top-[68%]",
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
            className={`chip-cycle pointer-events-none absolute z-20 hidden items-center gap-3 rounded-pill border border-white/70 bg-surface/90 px-3 py-2 text-[13px] font-semibold shadow-card backdrop-blur lg:flex ${c.pos}`}
            style={{ animationDelay: c.delay }}
          >
            <span className={`grid size-8 place-items-center rounded-full ${c.tone}`}>
              <Icon className="size-4" />
            </span>
            <span>{c.body}</span>
          </div>
        );
      })}
      <div className="pointer-events-none absolute top-[6%] left-2 z-20 flex items-center gap-2 rounded-pill bg-surface/90 px-3 py-2 text-[12px] font-semibold shadow-card lg:hidden">
        <Activity className="size-3.5 text-hrv" /> HRV trending up
      </div>
    </>
  );
}
