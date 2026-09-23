import { Fragment } from "react";
import type { CSSProperties } from "react";
import { Activity, Flame, Footprints, Moon, Sparkles, TrendingUp, UtensilsCrossed, Watch } from "lucide-react";
import { PhoneFrame } from "@/components/site/phone";

/**
 * The hero has no scroll-linked motion: it simply scrolls away at 1:1, the way the
 * reference does. The device is absolutely positioned so it bleeds past the section's
 * bottom edge and is clipped there, rather than letting a 756px device set the height.
 *
 * The height is capped as well as proportional: past ~930px of viewport the device can
 * no longer reach the bottom edge, and the section would end in bare sky.
 */

export function HeroStage() {
  return (
    <header className="relative min-h-[min(118vh,1100px)] overflow-hidden pt-24">
      <img
        src="/media/sky.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-linear-to-t from-bg via-bg/80 to-transparent"
      />

      {/* Deliberately wider than --container-prose: at 76px the h1 wraps to three
          lines inside the prose rail. Display type gets its own measure. */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1 className="reveal font-display text-[clamp(2.35rem,5.4vw,4.75rem)] leading-[1] font-extrabold tracking-[-0.03em] text-balance">
          The only app you need
          {/* Below sm the headline wraps on its own; forcing the break there strands "fit." */}
          <br className="hidden sm:inline" /> to stay fit.
        </h1>
        <p className="reveal mx-auto mt-4 max-w-[52ch] text-[clamp(1.05rem,1.6vw,1.5rem)] leading-[1.35] font-normal text-fg/60">
          End-to-end tracking of every calorie in and out — meals, workouts, sleep and your wearables — turned into clear
          recommendations on what to eat and how to move next.
        </p>
      </div>

      <Aurora />

      {/* Sits just under the copy, and the offset tracks width rather than height: the
          copy's own height is set by the h1 and lede clamps, which are vw-based, so a
          vh offset drifted from 121px of gap on a short viewport to 223px on a tall
          one. 14.3rem + 12.75vw follows the measured copy bottom (255px at 640 to
          361px at 1440, where the clamps cap) and holds the gap near 56px. Mobile is
          separate because the lede wraps to five lines there. */}
      <div className="absolute inset-x-0 top-[22rem] z-20 mx-auto h-[756px] w-full max-w-[1100px] px-6 md:top-[clamp(20rem,14.3rem+12.75vw,26rem)]">
        <Phone />
        <FlowCards />
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
 * The atmospheric layer, and the piece the old hero had no equivalent of. bevel gets
 * this from a baked 6s video, so it can afford real light; we approximate it with a
 * handful of very large, heavily blurred colour fields drifting vertically on long,
 * mutually offset periods — the band order shifts the way theirs does, without
 * anything hard-edged ever appearing.
 *
 * `filter: blur()` is the whole effect here, which is the one place the design
 * system's no-blur rule cannot apply: their blur is baked into the footage.
 *
 * Bands sit in the lower half only, behind the cards and the device, above the sky.
 */
const AURORA = [
  { color: "var(--color-hrv)", top: "40%", h: "30%", o: 0.3, from: "10px", to: "-46px", dur: "52s", delay: "0s" },
  { color: "var(--color-primary-bright)", top: "50%", h: "32%", o: 0.22, from: "-30px", to: "26px", dur: "64s", delay: "-8s" },
  { color: "var(--color-sleep)", top: "60%", h: "28%", o: 0.2, from: "18px", to: "-34px", dur: "46s", delay: "-20s" },
  { color: "var(--color-cal)", top: "68%", h: "26%", o: 0.18, from: "-22px", to: "30px", dur: "58s", delay: "-14s" },
] as const;

function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {AURORA.map((b) => (
        <div
          key={b.color}
          className="aurora-band absolute left-1/2 w-[150%] rounded-[50%]"
          style={{
            top: b.top,
            height: b.h,
            background: `radial-gradient(closest-side, ${b.color} 0%, color-mix(in oklab, ${b.color} 45%, transparent) 55%, transparent 100%)`,
            opacity: b.o,
            filter: "blur(70px)",
            ["--aurora-from" as string]: b.from,
            ["--aurora-to" as string]: b.to,
            ["--aurora-dur" as string]: b.dur,
            ["--aurora-delay" as string]: b.delay,
          }}
        />
      ))}
    </div>
  );
}

function Phone() {
  const c = 2 * Math.PI * 52;
  const offset = c * (1 - 0.81);
  return (
    <PhoneFrame
      className="absolute top-0 left-1/2 z-20 aspect-[370/756] w-[min(370px,74vw)] -translate-x-1/2 shadow-device md:-translate-x-[62%]"
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
          <div className="text-sm font-semibold text-muted">Energy balance</div>
          <div className="text-xs text-muted">Today</div>
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
            <text x="70" y="68" textAnchor="middle" className="fill-fg" style={{ fontSize: 26, fontWeight: 800 }}>
              −420
            </text>
            <text x="70" y="88" textAnchor="middle" className="fill-muted" style={{ fontSize: 10, fontWeight: 600 }}>
              KCAL DEFICIT
            </text>
          </svg>
        </div>

        <div className="mt-1 grid grid-cols-2 gap-2">
          <Mini label="Calories in" value="1,850" />
          <Mini label="Calories out" value="2,270" />
        </div>

        <p className="mt-2 rounded-md bg-surface/80 p-3 text-[12px] leading-snug font-normal text-muted">
          You slept 7h 20m and recovered well — add 24g of protein at dinner and a 30-min zone 2 walk to hit today's
          target.
        </p>

        <div className="mt-2 rounded-md bg-surface/80 p-3">
          <div className="flex items-center justify-between text-[10px] font-semibold tracking-wide text-muted uppercase">
            <span>This week</span>
            <span className="text-success">6 of 7 on target</span>
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
          <Tile label="Sleep" value="7h 20m" tone="text-sleep" />
          <Tile label="Steps" value="6,240" tone="text-steps" />
          <Tile label="Protein" value="96g" tone="text-cal" />
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

/**
 * Three lanes, each carrying one data-to-insight pair along a single arc. A raw
 * reading drifts in from the left, descends and is occluded by the device; a beat
 * later its interpretation emerges from behind the right edge on the mirrored arc.
 * Same trajectory, transformed content — that conversion is the claim the hero makes,
 * so the cards have to carry it rather than sit still at the margins.
 *
 * Lanes are staggered by a third of the cycle, so a pair is always mid-flight.
 */
type CardFace = {
  icon: typeof Moon;
  tone: string;
  title: string;
  detail: string;
};

type Lane = {
  /** Vertical start of the inbound card, as a share of the 756px stage. */
  top: string;
  delay: string;
  data: CardFace;
  insight: CardFace;
};

/** Equal travel in both directions, so the two halves read at one speed. */
const CARD_DX = 520;
const CARD_DY = 260;
/**
 * The inbound card starts only just off the stage. Further out and it spends its
 * fade-in beyond the hero's own clip edge, which shows as a half card pinned to the
 * left of the viewport rather than one arriving. The outbound card starts wholly
 * behind the device: 32% of 1100 is 352, and at 238px wide its right edge lands at
 * 590, inside the 318-690 the device occupies.
 */
const IN_START = "-14%";
const OUT_START = "32%";
/** CARD_DY as a share of the 756px stage — where the inbound card handed off. */
const OUT_DROP = "34.4%";

const LANES: Lane[] = [
  {
    top: "4%",
    delay: "0s",
    data: { icon: UtensilsCrossed, tone: "bg-cal/15 text-cal", title: "Lunch logged", detail: "620 kcal · 42g protein" },
    insight: {
      icon: Sparkles,
      tone: "bg-steps/15 text-steps",
      title: "Dinner target",
      detail: "620 kcal · +24g protein",
    },
  },
  {
    top: "20%",
    delay: "-7s",
    data: { icon: Moon, tone: "bg-sleep/15 text-sleep", title: "Sleep", detail: "7h 20m · 1h 40m deep" },
    insight: {
      icon: TrendingUp,
      tone: "bg-steps/15 text-steps",
      title: "Recovery 84",
      detail: "Cleared for hard training",
    },
  },
  {
    top: "36%",
    delay: "-14s",
    data: { icon: Watch, tone: "bg-primary/15 text-primary", title: "Watch synced", detail: "Run 5.2km · 480 kcal" },
    insight: { icon: Flame, tone: "bg-steps/15 text-steps", title: "Net balance", detail: "−420 kcal · on target" },
  },
];

function Card({ face, className, style }: { face: CardFace; className: string; style: CSSProperties }) {
  const Icon = face.icon;
  return (
    <div
      className={`pointer-events-none absolute z-10 hidden w-[238px] items-center gap-3 rounded-pill border border-white/70 bg-surface/90 px-3 py-2 text-[13px] font-semibold shadow-card backdrop-blur lg:flex ${className}`}
      style={style}
    >
      <span className={`grid size-8 shrink-0 place-items-center rounded-full ${face.tone}`}>
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        {face.title}
        <span className="block truncate text-[12px] font-normal text-muted">{face.detail}</span>
      </span>
    </div>
  );
}

function FlowCards() {
  const travel = {
    ["--card-dx" as string]: `${CARD_DX}px`,
    ["--card-dy" as string]: `${CARD_DY}px`,
  };
  return (
    <>
      {LANES.map((lane) => (
        <Fragment key={lane.top}>
          <Card
            face={lane.data}
            className="card-in"
            style={{ ...travel, left: IN_START, top: lane.top, animationDelay: lane.delay }}
          />
          <Card
            face={lane.insight}
            className="card-out"
            style={{
              ...travel,
              ["--card-dy" as string]: `${-CARD_DY}px`,
              left: OUT_START,
              top: `calc(${lane.top} + ${OUT_DROP})`,
              animationDelay: lane.delay,
            }}
          />
        </Fragment>
      ))}
      <div className="pointer-events-none absolute top-[6%] left-2 z-20 flex items-center gap-2 rounded-pill bg-surface/90 px-3 py-2 text-[12px] font-semibold shadow-card lg:hidden">
        <Flame className="size-3.5 text-cal" /> 420 kcal under target
      </div>
    </>
  );
}
