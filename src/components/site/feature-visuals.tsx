import {
  Activity,
  Check,
  Droplets,
  Flame,
  HeartPulse,
  KeyRound,
  Mic,
  Scale,
  Sparkles,
  Syringe,
  Watch,
} from "lucide-react";
import { PhoneFrame } from "@/components/site/phone";

const NUTRITION_MACROS = [
  { label: "Protein", value: 18, target: 190, unit: "g", color: "var(--color-oxy)" },
  { label: "Carbs", value: 69, target: 248, unit: "g", color: "var(--color-bmr)" },
  { label: "Fat", value: 18, target: 55, unit: "g", color: "var(--color-hrv)" },
] as const;

const NUTRITION_MICROS = [
  { label: "Fiber", value: 12, target: 40, unit: "g", color: "var(--color-cal)" },
  { label: "Calcium", value: 218, target: 1000, unit: "mg", color: "var(--color-oxy)" },
  { label: "Magnesium", value: 140, target: 440, unit: "mg", color: "var(--color-hrv)" },
  { label: "Iron", value: 5, target: 19, unit: "mg", color: "var(--color-workout)" },
] as const;

export function NutritionVisual() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="flex w-full max-w-xs items-center gap-3 rounded-pill bg-surface px-5 py-3 text-[14px] font-semibold shadow-card">
        <Mic className="size-4 shrink-0 text-primary" />
        <span className="flex items-end gap-1">
          {[10, 20, 14, 24, 12].map((h, i) => (
            <i
              key={i}
              className="voice-bar inline-block w-[3px] rounded-sm bg-primary-bright"
              style={{ height: h, animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </span>
        <span className="truncate font-normal text-muted">“Grilled salmon and salad...”</span>
      </div>

      <div className="w-full max-w-md rounded-lg bg-surface p-6 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[13px] font-semibold tracking-wide text-muted uppercase">Nutrient details</div>
            <div className="font-display mt-1 text-3xl font-extrabold">
              521 <span className="text-sm font-normal text-muted">/ 2,248 kcal</span>
            </div>
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="size-4" />
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {NUTRITION_MACROS.map((m) => (
            <MacroBar key={m.label} {...m} />
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-5">
          {NUTRITION_MICROS.map((m) => (
            <MicroCard key={m.label} {...m} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MacroBar({
  label,
  value,
  target,
  unit,
  color,
}: {
  label: string;
  value: number;
  target: number;
  unit: string;
  color: string;
}) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  return (
    <div>
      <div className="flex items-baseline justify-between text-[12px] font-semibold text-muted">
        <span>{label}</span>
        <span className="text-fg">{pct}%</span>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-pill bg-card">
        <div className="h-full rounded-pill" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <div className="mt-1 text-[11px] font-medium text-muted">
        {value}/{target}
        {unit}
      </div>
    </div>
  );
}

function MicroCard({
  label,
  value,
  target,
  unit,
  color,
}: {
  label: string;
  value: number;
  target: number;
  unit: string;
  color: string;
}) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  const left = Math.max(0, target - value);
  return (
    <div className="rounded-md bg-card px-3 py-2.5">
      <div className="text-[12px] font-semibold text-fg">{label}</div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-pill bg-surface">
        <div className="h-full rounded-pill" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <div className="mt-1 text-[11px] font-medium text-muted">
        {left} {unit} left
      </div>
    </div>
  );
}

const ORBIT_RING_SIZES = [340, 500] as const;

const ORBIT_ITEMS = [
  { icon: Activity, color: "var(--color-hrv)", ring: 340, delay: "0s", size: "size-20", iconSize: "size-9" },
  { icon: HeartPulse, color: "var(--color-bp)", ring: 340, delay: "-9.33s", size: "size-24", iconSize: "size-11" },
  { icon: Syringe, color: "var(--color-glucose)", ring: 340, delay: "-18.67s", size: "size-16", iconSize: "size-7" },
  { icon: Watch, color: "var(--color-workout)", ring: 500, delay: "0s", size: "size-24", iconSize: "size-11" },
  { icon: Droplets, color: "var(--color-oxy)", ring: 500, delay: "-7s", size: "size-20", iconSize: "size-9" },
  { icon: Scale, color: "var(--color-composition)", ring: 500, delay: "-14s", size: "size-24", iconSize: "size-11" },
  { icon: KeyRound, color: "var(--color-primary)", ring: 500, delay: "-21s", size: "size-20", iconSize: "size-9" },
] as const;

const CONNECTED_DEVICES = [
  { icon: Activity, label: "Health Connect", sub: "Synced 2m ago", tone: "bg-hrv/15 text-hrv" },
  { icon: Watch, label: "Smartwatch", sub: "Synced 5m ago", tone: "bg-workout/15 text-workout" },
  { icon: HeartPulse, label: "Blood pressure", sub: "Synced today", tone: "bg-bp/15 text-bp" },
  { icon: Syringe, label: "Glucometer", sub: "Synced today", tone: "bg-glucose/15 text-glucose" },
] as const;

export function IntegrationVisual() {
  return (
    <div className="relative h-full w-full overflow-visible">
      <div
        aria-hidden
        className="spot pointer-events-none absolute top-1/2 left-[64%] h-[95%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(6,7,249,0.12),transparent_70%)]"
      />

      {ORBIT_RING_SIZES.map((d) => (
        <div
          key={d}
          aria-hidden
          className="absolute top-1/2 left-[64%] hidden rounded-full border border-primary/15 md:block"
          style={{ width: d, height: d, marginLeft: -d / 2, marginTop: -d / 2 }}
        />
      ))}

      {ORBIT_ITEMS.map((item, i) => (
        <div
          key={i}
          className="orbit-spin absolute top-1/2 left-[64%] hidden md:block"
          style={{
            width: item.ring,
            height: item.ring,
            marginLeft: -item.ring / 2,
            marginTop: -item.ring / 2,
            animationDelay: item.delay,
          }}
        >
          <div
            className={`orbit-spin-rev absolute top-0 left-1/2 ${item.size} grid -translate-x-1/2 place-items-center rounded-2xl shadow-card`}
            style={{ animationDelay: item.delay, backgroundColor: item.color }}
          >
            <item.icon className={`${item.iconSize} text-white`} strokeWidth={2} />
          </div>
        </div>
      ))}

      <PhoneFrame
        className="absolute top-1/2 left-[2%] z-10 aspect-[9/19.5] w-[220px] -translate-y-1/2 shadow-device md:w-[240px]"
        screenClassName="bg-linear-to-b from-[#eef1fb] to-bg"
      >
        <div className="px-3 pt-12 pb-5">
          <div className="mb-3 flex items-center justify-between text-xs font-semibold">
            <span>9:41</span>
            <span className="opacity-60">LTE</span>
          </div>
          <h3 className="font-display text-base font-extrabold">Connected devices</h3>
          <div className="mt-4 flex flex-col gap-2">
            {CONNECTED_DEVICES.map((d) => (
              <div key={d.label} className="flex items-center gap-2 rounded-md bg-surface/80 p-2">
                <span className={`grid size-7 shrink-0 place-items-center rounded-full ${d.tone}`}>
                  <d.icon className="size-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[12px] font-bold">{d.label}</div>
                  <div className="text-[10.5px] text-muted">{d.sub}</div>
                </div>
                <Check className="size-3.5 shrink-0 text-success" />
              </div>
            ))}
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

export function InsightsVisual() {
  const heights = ["40%", "55%", "45%", "70%", "90%", "85%"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="relative h-full w-full">
      <div className="spot pointer-events-none absolute -top-10 left-1/2 h-72 w-72 -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(6,7,249,0.18),transparent_70%)]" />
      <div className="relative mx-auto w-full max-w-md rounded-lg bg-surface p-6 shadow-card">
        <div className="mb-5 text-[13px] font-semibold tracking-wide text-muted uppercase">Recovery trend</div>
        <div className="font-display text-2xl font-extrabold">Increasing</div>
        <div className="mt-4 flex h-36 items-end gap-2">
          {heights.map((h, i) => (
            <div key={days[i]} className={`flex-1 rounded-t-sm ${i === 4 ? "bg-primary" : "bg-card"}`} style={{ height: h }} />
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          {days.map((d) => (
            <div key={d} className="flex-1 text-center text-xs font-semibold text-muted">
              {d}
            </div>
          ))}
        </div>
      </div>
      <div className="float-a absolute -right-2 bottom-0 flex max-w-xs gap-4 rounded-md border border-primary/25 bg-primary/10 p-4 shadow-card backdrop-blur md:-right-6">
        <Sparkles className="mt-0.5 size-5 shrink-0 text-primary" />
        <div>
          <h4 className="text-[13px] font-bold tracking-wide text-primary uppercase">AI Insight</h4>
          <p className="mt-1 text-sm leading-relaxed font-normal">
            Your recovery score is trending up. The 7h 20m of sleep you had last night significantly improved your HRV
            baseline.
          </p>
        </div>
      </div>
    </div>
  );
}

export function MetabolicVisual() {
  return (
    <div className="relative h-full w-full">
      <div className="relative mx-auto w-full max-w-md rounded-lg bg-surface p-6 shadow-card">
        <div className="mb-5 text-[13px] font-semibold tracking-wide text-muted uppercase">Metabolic Score</div>
        <div className="flex items-end justify-between">
          <div>
            <div className="font-display text-5xl font-extrabold text-primary">82</div>
            <div className="mt-1 text-sm font-semibold text-success">Excellent</div>
          </div>
          <svg viewBox="0 0 80 80" className="size-20">
            <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="8" />
            <circle
              cx="40"
              cy="40"
              r="30"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="8"
              strokeDasharray="188"
              strokeDashoffset="34"
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
            />
          </svg>
        </div>
        <div className="mt-6 flex items-center justify-between rounded-md bg-card px-4 py-3">
          <span className="text-sm font-semibold text-muted">Metabolic Age</span>
          <span className="font-display text-lg font-extrabold">
            27 <span className="text-sm font-normal text-muted">vs. 31 actual</span>
          </span>
        </div>
      </div>
      <div className="float-b absolute -right-2 -bottom-4 max-w-xs rounded-md border border-primary/25 bg-primary/10 p-4 shadow-card backdrop-blur md:-right-6">
        <div className="flex gap-3">
          <Flame className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <h4 className="text-[13px] font-bold tracking-wide text-primary uppercase">14-day streak</h4>
            <p className="mt-1 text-sm leading-relaxed font-normal">
              Rank #128 on this week's leaderboard — 2 spots from your personal best.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
