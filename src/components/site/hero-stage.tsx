import { Fragment } from "react";
import type { CSSProperties } from "react";
import {
  ChartColumn,
  ChevronRight,
  ClipboardList,
  Flame,
  House,
  Moon,
  PersonStanding,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  UtensilsCrossed,
  Watch,
} from "lucide-react";
import { PhoneFrame } from "@/components/site/phone";
import { StatusBar } from "@/components/site/pinned-scroller";

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
          Every calorie in and out — meals, workouts, sleep, wearables — turned into clear advice on what to do next.
        </p>
      </div>

      <Aurora />

      {/*
        HOW TO MOVE THE DEVICE UP OR DOWN
        ---------------------------------
        One knob, two tracks. Edit the numbers below; nothing else depends on them.

            sm and up:  clamp(17rem, 12.9rem + 11.6vw, 23.5rem)
                              │         │                │
                              │         │                └ ceiling, binds above ~1400px
                              │         └ ramp, binds between ~610px and ~1400px
                              └ floor, binds below ~610px
            below sm:   19rem   (its own value: the lede wraps to three lines there)

        To shift the device, change all three clamp numbers by the SAME amount, and
        the mobile value to match. 1rem = 16px; smaller pulls it up, larger pushes it
        down. Example — to close the gap by 16px:
            clamp(16rem, 11.9rem + 11.6vw, 22.5rem)  and  top-[18rem]

        Why a ramp and not one number: the copy's height is set by the h1 and lede
        clamps, which are vw-based, so the copy bottom itself slides from 233px at
        640 to 329px at 1440, where those clamps cap out. 12.9rem + 11.6vw follows
        that line and holds the gap at ~48px across the range. A fixed value, or a vh
        value, drifts — vh drifted from 121px of gap to 223px on a taller screen.
      */}
      <div className="absolute inset-x-0 top-[19rem] z-20 mx-auto h-[756px] w-full max-w-[1100px] px-6 sm:top-[clamp(17rem,12.9rem+11.6vw,23.5rem)]">
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
  const offset = c * (1 - 0.74);
  return (
    <PhoneFrame
      className="absolute top-0 left-1/2 z-20 aspect-[370/756] w-[min(370px,74vw)] -translate-x-1/2 shadow-device md:-translate-x-[62%]"
      screenClassName="bg-white"
    >
      <StatusBar />
      {/* The section clips the device at its bottom edge, so the order carries weight:
          ring, totals and the three rows all have to land inside the visible upper two
          thirds, and only the tab bar is allowed to bleed past it. */}
      <div className="flex h-full flex-col px-4 pt-12 pb-3">
        <div className="flex items-center justify-between text-[12px] font-semibold">
          {/* Spacers keep "Today" optically centred against the LTE label. */}
          <span className="w-8" />
          <span>Today</span>
          <span className="w-8 text-right text-muted">LTE</span>
        </div>

        <svg viewBox="0 0 140 140" className="mx-auto mt-1 size-[132px]">
          <circle cx="70" cy="70" r="52" fill="none" stroke="rgba(31,32,37,0.08)" strokeWidth="12" />
          <circle
            cx="70"
            cy="70"
            r="52"
            fill="none"
            stroke="var(--color-luxury)"
            strokeWidth="12"
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
            className="ring-anim"
            style={{
              ["--ring-c" as string]: String(c),
              ["--ring-offset" as string]: String(offset),
              strokeDasharray: c,
            }}
          />
          <text x="70" y="70" textAnchor="middle" className="fill-fg" style={{ fontSize: 27, fontWeight: 800 }}>
            1,250
          </text>
          <text x="70" y="88" textAnchor="middle" className="fill-muted" style={{ fontSize: 11, fontWeight: 500 }}>
            Cal left
          </text>
        </svg>

        <div className="mt-2 grid grid-cols-3">
          <Stat icon={UtensilsCrossed} tone="text-primary" value="1,350" label="Eaten" />
          <Stat icon={Flame} tone="text-cal" value="450" label="Burned" />
          <Stat icon={Target} tone="text-steps" value="1,800" label="Goal" />
        </div>

        <div className="mt-3 space-y-2">
          <Row thumb="/media/diet.png" title="Meals" value="1,350 kcal" />
          <Row icon={PersonStanding} tone="bg-steps/15 text-steps" title="Workouts" value="450 kcal" />
          <Row icon={Moon} tone="bg-sleep/15 text-sleep" title="Sleep" value="7h 20m" />
        </div>

        <div className="mt-auto grid grid-cols-4 pt-3 text-[10px] font-medium">
          <Tab icon={House} label="Home" active />
          <Tab icon={ChartColumn} label="Trends" />
          <Tab icon={ClipboardList} label="Plan" />
          <Tab icon={UserRound} label="Profile" />
        </div>
      </div>
    </PhoneFrame>
  );
}

function Stat({ icon: Icon, tone, value, label }: { icon: typeof Moon; tone: string; value: string; label: string }) {
  return (
    <div className="text-center">
      <Icon className={`mx-auto size-[18px] ${tone}`} />
      <div className="font-display mt-1 text-[17px] font-extrabold">{value}</div>
      <div className="text-[11px] font-normal text-muted">{label}</div>
    </div>
  );
}

/** Meals carries a photo, the other two a tinted glyph — as in the reference. */
function Row({
  thumb,
  icon: Icon,
  tone,
  title,
  value,
}: {
  thumb?: string;
  icon?: typeof Moon;
  tone?: string;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] bg-[#f6f7f9] px-2.5 py-2">
      {thumb ? (
        <img src={thumb} alt="" className="size-9 shrink-0 rounded-[10px] object-cover" />
      ) : (
        <span className={`grid size-9 shrink-0 place-items-center rounded-[10px] ${tone}`}>
          {Icon ? <Icon className="size-[18px]" /> : null}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold">{title}</span>
        <span className="block text-[12px] font-normal text-muted">{value}</span>
      </span>
      <ChevronRight className="size-4 shrink-0 text-muted" />
    </div>
  );
}

function Tab({ icon: Icon, label, active }: { icon: typeof Moon; label: string; active?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1 ${active ? "text-steps" : "text-muted/60"}`}>
      <Icon className="size-[18px]" />
      {label}
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
    </>
  );
}
