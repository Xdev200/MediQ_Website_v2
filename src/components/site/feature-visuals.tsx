import {
  Activity,
  Check,
  Droplets,
  FlaskConical,
  Flame,
  Gauge,
  Footprints,
  HeartPulse,
  KeyRound,
  Mic,
  Moon,
  PersonStanding,
  Plus,
  Salad,
  Scale,
  Sparkles,
  Syringe,
  TrendingDown,
  Watch,
} from "lucide-react";
import { PhoneFrame } from "@/components/site/phone";

const NUTRITION_MACROS = [
  {
    label: "Protein",
    value: 18,
    target: 190,
    unit: "g",
    color: "var(--color-oxy)",
  },
  {
    label: "Carbs",
    value: 69,
    target: 248,
    unit: "g",
    color: "var(--color-bmr)",
  },
  { label: "Fat", value: 18, target: 55, unit: "g", color: "var(--color-hrv)" },
] as const;

const NUTRITION_MICROS = [
  {
    label: "Fiber",
    value: 12,
    target: 40,
    unit: "g",
    color: "var(--color-cal)",
  },
  {
    label: "Calcium",
    value: 218,
    target: 1000,
    unit: "mg",
    color: "var(--color-oxy)",
  },
  {
    label: "Magnesium",
    value: 140,
    target: 440,
    unit: "mg",
    color: "var(--color-hrv)",
  },
  {
    label: "Iron",
    value: 5,
    target: 19,
    unit: "mg",
    color: "var(--color-workout)",
  },
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
        <span className="truncate font-normal text-muted">
          “Grilled salmon and salad...”
        </span>
      </div>

      <div className="w-full max-w-md rounded-lg bg-surface p-6 shadow-card">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[13px] font-semibold tracking-wide text-muted uppercase">
              Nutrient details
            </div>
            <div className="font-display mt-1 text-3xl font-extrabold">
              521{" "}
              <span className="text-sm font-normal text-muted">
                / 2,248 kcal
              </span>
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
        <div
          className="h-full rounded-pill"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
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
        <div
          className="h-full rounded-pill"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <div className="mt-1 text-[11px] font-medium text-muted">
        {left} {unit} left
      </div>
    </div>
  );
}

/**
 * The scale the orbit composition is drawn at. It tracks the section width so
 * the arcs keep their proportions — and their clearance from the copy — at
 * every breakpoint; the slab sets its visual box to this same height.
 */
export const ORBIT_SCALE = "clamp(300px,41vw,760px)";

/**
 * Orbit geometry, every value a fraction of `--o` (the scale above). Rings,
 * tiles and the phone all resolve against one origin — `--ocx` across, the box
 * midline down — which puts the centre of the orbits on the phone screen.
 *
 * The radii are deliberately larger than the box, so only an arched slice of
 * each ring crosses the viewport and the rest bleeds out of the section, which
 * clips it. The phone is 0.498 wide (inlined in its class, Tailwind needs a
 * literal there).
 */
const ORBIT_CX = 0.36;
const ORBIT_RINGS = [0.645, 0.937, 1.08, 1.253] as const;
const ORBIT_TILE = 0.105;

/** Tile seats: `r` is the ring, `a` the angle in degrees off the 3 o'clock ray, downwards positive. */
const ORBIT_ITEMS = [
  {
    icon: Activity,
    color: "var(--color-hrv)",
    r: 0.645,
    a: -37,
    scale: 0.94,
    tilt: -8,
    delay: "0s",
  },
  {
    icon: HeartPulse,
    color: "var(--color-bp)",
    r: 0.645,
    a: -18.5,
    scale: 1.02,
    tilt: -4,
    delay: "-1.6s",
  },
  {
    icon: Droplets,
    color: "var(--color-oxy)",
    r: 0.645,
    a: 0,
    scale: 0.97,
    tilt: -2,
    delay: "-3.2s",
  },
  {
    icon: Syringe,
    color: "var(--color-glucose)",
    r: 0.645,
    a: 18.5,
    scale: 1,
    tilt: -6,
    delay: "-4.8s",
  },
  {
    icon: FlaskConical,
    color: "var(--color-steps)",
    r: 0.645,
    a: 37,
    scale: 0.93,
    tilt: -7,
    delay: "-6.4s",
  },
  {
    icon: Watch,
    color: "var(--color-workout)",
    r: 0.937,
    a: -18.5,
    scale: 1.04,
    tilt: 3,
    delay: "-2.4s",
  },
  {
    icon: Scale,
    color: "var(--color-composition)",
    r: 0.937,
    a: 0,
    scale: 1.06,
    tilt: 2,
    delay: "-4s",
  },
  {
    icon: KeyRound,
    color: "var(--color-primary)",
    r: 0.937,
    a: 18.5,
    scale: 1.02,
    tilt: 5,
    delay: "-5.6s",
  },
] as const;

const RAD = Math.PI / 180;

/** Absolute seat on the ring, expressed against the shared `--o` / `--ocx` origin. */
function orbitSeat(r: number, a: number) {
  return {
    left: `calc(var(--ocx) + var(--o) * ${(r * Math.cos(a * RAD)).toFixed(4)})`,
    top: `calc(50% + var(--o) * ${(r * Math.sin(a * RAD)).toFixed(4)})`,
  };
}

/**
 * The app's own "Connect your data" screen, as the onboarding shows it: Health
 * Connect linked and importing, then one row per source with its switch on.
 */
const CONNECT_SOURCES = [
  {
    icon: Footprints,
    title: "Steps & Activity",
    meta: "Health Connect",
    tone: "bg-steps/15 text-steps",
  },
  {
    icon: Moon,
    title: "Sleep Stages",
    meta: "Watch · last night",
    tone: "bg-sleep/15 text-sleep",
  },
  {
    icon: HeartPulse,
    title: "Heart Rate & HRV",
    meta: "Watch · continuous",
    tone: "bg-heart/15 text-heart",
  },
  {
    icon: Salad,
    title: "Nutrition",
    meta: "Health Connect",
    tone: "bg-steps/15 text-steps",
  },
  {
    icon: Activity,
    title: "Blood Glucose",
    meta: "Glucometer · paired",
    tone: "bg-glucose/15 text-glucose",
  },
  {
    icon: Scale,
    title: "Body Composition",
    meta: "Smart scale · daily",
    tone: "bg-composition/15 text-composition",
  },
  {
    icon: Gauge,
    title: "Blood Pressure",
    meta: "Cuff · paired",
    tone: "bg-bp/15 text-bp",
  },
] as const;

export function IntegrationVisual() {
  return (
    <div className="relative h-full w-full overflow-visible [--o:var(--orbit-scale)] [--ocx:calc(var(--o)*0.36)]">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-[var(--ocx)] hidden h-[var(--o)] w-[calc(var(--o)*2.2)] -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <div className="spot h-full w-full rounded-full bg-[radial-gradient(circle,rgba(6,7,249,0.1),transparent_65%)]" />
      </div>

      {ORBIT_RINGS.map((r, i) => (
        <div
          key={r}
          aria-hidden
          className="absolute top-1/2 left-[var(--ocx)] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border md:block"
          style={{
            width: `calc(var(--o) * ${(r * 2).toFixed(3)})`,
            height: `calc(var(--o) * ${(r * 2).toFixed(3)})`,
            borderColor: `color-mix(in oklab, var(--color-primary) ${14 - i * 2}%, transparent)`,
          }}
        />
      ))}

      {ORBIT_ITEMS.map((item, i) => (
        <div
          key={i}
          className="orbit-drift absolute hidden -translate-x-1/2 -translate-y-1/2 md:block"
          style={{ ...orbitSeat(item.r, item.a), animationDelay: item.delay }}
        >
          <div
            className="grid place-items-center rounded-[26%] shadow-card"
            style={{
              width: `calc(var(--o) * ${(ORBIT_TILE * item.scale).toFixed(4)})`,
              height: `calc(var(--o) * ${(ORBIT_TILE * item.scale).toFixed(4)})`,
              transform: `rotate(${item.tilt}deg)`,
              backgroundColor: item.color,
            }}
          >
            <item.icon
              className="text-white"
              style={{
                width: `calc(var(--o) * ${(ORBIT_TILE * item.scale * 0.46).toFixed(4)})`,
                height: "auto",
              }}
              strokeWidth={2}
            />
          </div>
        </div>
      ))}

      <PhoneFrame
        className="absolute top-1/2 left-1/2 z-10 aspect-[9/19.5] w-[220px] -translate-x-1/2 -translate-y-1/2  md:left-[var(--ocx)] md:w-[max(210px,calc(var(--o)*0.498))]"
        screenClassName="bg-[#eef6f2]"
      >
        {/* Sized in em off the orbit scale so the screen reads the same at any phone size. */}
        <div className="flex h-full flex-col pt-12 text-[clamp(11px,calc(var(--o)*0.021),17px)]">
          <div className="flex items-center justify-between px-[1.3em] text-[0.8em] font-semibold">
            <span>9:41</span>
            <span className="opacity-60">LTE</span>
          </div>

          <h3 className="font-display mt-[0.5em] px-[1.2em] text-[1.45em] leading-tight font-extrabold">
            Connect your data
          </h3>

          <div className="mt-[0.8em] min-h-0 flex-1 px-[0.85em]">
            <div className="rounded-[1.5em] bg-white px-[1em] py-[0.85em] shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[0.6em]">
                  <span className="grid size-[2.4em] shrink-0 place-items-center rounded-[0.9em] bg-success/15 text-success">
                    <Check className="size-[1.2em]" strokeWidth={2.5} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[0.95em] font-bold">
                      Health Connect
                    </div>
                    <div className="text-[0.78em] text-muted">
                      Permissions granted
                    </div>
                  </div>
                </div>
                <span className="rounded-pill bg-success/15 px-[0.7em] py-[0.25em] text-[0.75em] font-semibold text-success">
                  Linked
                </span>
              </div>
              <div className="mt-[0.75em] h-[0.4em] rounded-full bg-fg/10">
                <div className="h-full w-[68%] rounded-full bg-success" />
              </div>
              <p className="mt-[0.5em] text-[0.75em] text-muted">
                Importing 90 days of history · 68%
              </p>
            </div>

            <div className="mt-[0.6em] flex flex-col gap-[0.5em]">
              {CONNECT_SOURCES.map((r) => (
                <div
                  key={r.title}
                  className="flex items-center gap-[0.7em] rounded-[1.35em] bg-white px-[0.8em] py-[0.6em] shadow-card"
                >
                  <span
                    className={`grid size-[2.6em] shrink-0 place-items-center rounded-[0.9em] ${r.tone}`}
                  >
                    <r.icon className="size-[1.3em]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[0.95em] font-bold">
                      {r.title}
                    </div>
                    <div className="truncate text-[0.78em] text-muted">
                      {r.meta}
                    </div>
                  </div>
                  <span className="flex h-[1.35em] w-[2.4em] shrink-0 items-center rounded-full bg-primary px-[0.15em]">
                    <span className="ml-auto size-[1.05em] rounded-full bg-white" />
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-[0.7em] rounded-[1.35em] border border-dashed border-fg/15 px-[0.8em] py-[0.6em] text-muted">
                <span className="grid size-[2.6em] shrink-0 place-items-center rounded-[0.9em] bg-fg/5">
                  <Plus className="size-[1.3em]" />
                </span>
                <div className="text-[0.9em] font-semibold">
                  Add another device
                </div>
              </div>
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

const INSIGHT_TABS = ["All", "Body", "Diet", "Report"] as const;

/** The three outcomes the forecast card commits to, as chips on the blue card. */
const FORECAST_CHIPS = [
  { label: "Est. Fat Change", value: "-6.1kg" },
  { label: "Est. Muscle Change", value: "Stable" },
  { label: "Projected Weight", value: "69.9kg" },
] as const;

const VISION_STATS = [
  { label: "Projected Weight", value: "-6.1kg", tone: "text-oxy" },
  { label: "Est. Fat Change", value: "-6.1kg", tone: "text-strain" },
  { label: "Est. Muscle Change", value: "Stable", tone: "text-fg" },
] as const;

/**
 * The 12-week projection: a flat "no change" baseline against a declining
 * forecast, with the gap between them shaded. Strokes are non-scaling so the
 * dashes keep their weight when the box stretches.
 */
function VisionChart() {
  return (
    <div className="relative mt-2 h-24 md:h-32">
      <svg
        viewBox="0 0 320 120"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="vision-gap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-oxy)" stopOpacity="0.26" />
            <stop offset="100%" stopColor="var(--color-oxy)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vision-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-oxy)" />
            <stop offset="100%" stopColor="var(--color-strain)" />
          </linearGradient>
        </defs>
        <g className="chart-wipe">
          <path d="M6 14 L314 14 L314 98 Z" fill="url(#vision-gap)" />
          <path
            d="M6 14 L314 14"
            fill="none"
            stroke="var(--color-steps)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="1 7"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M6 14 L314 98"
            fill="none"
            stroke="url(#vision-line)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="1 7"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>
      <span className="absolute top-[11.7%] right-0 size-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-steps" />
      <span className="absolute top-[81.7%] right-0 size-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-strain" />
    </div>
  );
}

export function InsightsVisual() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center">
      <div
        aria-hidden
        className="spot pointer-events-none absolute -top-8 left-1/2 h-72 w-72 -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(6,7,249,0.18),transparent_70%)]"
      />

      <div className="relative mx-auto flex w-full max-w-lg flex-col gap-3 md:gap-4">
        <div className="flex gap-6 border-b border-fg/10 text-[13px] font-bold md:text-[15px]">
          {INSIGHT_TABS.map((t, i) => (
            <span
              key={t}
              className={`-mb-px border-b-2 pb-2 ${i === 0 ? "border-primary text-primary" : "border-transparent text-muted"}`}
            >
              {t}
            </span>
          ))}
        </div>

        <article className="rounded-lg bg-primary p-4 text-white shadow-card md:p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 shrink-0 md:size-5" />
            <h4 className="font-display text-lg font-extrabold text-white md:text-xl">
              Maintain Your Best
            </h4>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed font-normal text-white/85 md:text-[15px]">
            Our scientific program can help you reach 69.9kg, an estimated loss
            of 6.1kg fat, by December 2026.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {FORECAST_CHIPS.map((c) => (
              <div
                key={c.label}
                className="rounded-md bg-white/15 px-2.5 py-2 md:px-3"
              >
                <div className="text-[10px] leading-tight font-semibold text-white/75 md:text-[11px]">
                  {c.label}
                </div>
                <div className="font-display mt-1 text-[15px] font-extrabold md:text-lg">
                  {c.value}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-lg bg-surface p-4 shadow-card md:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-1 gap-3 lg:gap-5">
              {VISION_STATS.map((v) => (
                <div key={v.label} className="min-w-0">
                  <div className="truncate text-[10px] font-semibold text-muted lg:text-[12px]">
                    {v.label}
                  </div>
                  <div
                    className={`font-display mt-0.5 text-base font-extrabold lg:text-xl ${v.tone}`}
                  >
                    {v.value}
                  </div>
                </div>
              ))}
            </div>
            <TrendingDown className="size-4 shrink-0 text-primary lg:size-5" />
          </div>

          <div className="mt-3 flex justify-end">
            <span className="rounded-pill bg-primary px-3 py-1 text-[11px] font-bold text-white md:text-[12px]">
              -6.1kg by Week 12
            </span>
          </div>

          <VisionChart />

          <div className="mt-2 flex justify-between text-[11px] font-semibold md:text-[12px]">
            <span className="text-muted">Week 0</span>
            <span className="text-primary">Week 12</span>
          </div>
        </article>

        <article className="flex gap-3 rounded-lg bg-surface p-4 shadow-card">
          <PersonStanding className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <h4 className="text-[14px] font-bold md:text-[15px]">
              Sleep is driving your recovery
            </h4>
            <p className="mt-1 text-[12px] leading-relaxed font-normal text-muted md:text-[13px]">
              Nights above 7h lifted your HRV baseline 12% over the last three
              weeks.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

const METABOLIC_SCORE = 82;
const METABOLIC_R = 84;
const METABOLIC_C = 2 * Math.PI * METABOLIC_R;

const METABOLIC_AGES = [
  { label: "Metabolic Age", value: "27", tone: "text-success" },
  { label: "Actual Age", value: "31", tone: "text-fg" },
] as const;

/** Score dial: a full track with the arc filled to the score, opening at 12 o'clock. */
function ScoreDial() {
  return (
    <div className="relative mx-auto mt-4 aspect-square w-[180px] md:w-[216px]">
      {/* No track ring: the app opens the dial straight onto the background, as the reference does. */}
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full -rotate-90"
        aria-hidden
      >
        <circle
          cx="100"
          cy="100"
          r={METABOLIC_R}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={METABOLIC_C}
          strokeDashoffset={METABOLIC_C * (1 - METABOLIC_SCORE / 100)}
          className="ring-anim"
          style={{
            ["--ring-c" as string]: String(METABOLIC_C),
            ["--ring-offset" as string]: String(
              METABOLIC_C * (1 - METABOLIC_SCORE / 100),
            ),
          }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-[56px] leading-none font-extrabold md:text-[68px]">
            {METABOLIC_SCORE}
          </div>
          <div className="mt-2 text-[11px] font-bold tracking-[0.12em] text-primary uppercase md:text-[12px]">
            Excellent
          </div>
        </div>
      </div>
    </div>
  );
}

export function MetabolicVisual() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center">
      <div
        aria-hidden
        className="spot pointer-events-none absolute -top-8 left-1/2 h-72 w-72 -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(6,7,249,0.18),transparent_70%)]"
      />

      <div className="relative mx-auto flex w-full max-w-lg flex-col gap-3 md:gap-4">
        <div className="flex gap-6 border-b border-fg/10 text-[13px] font-bold md:text-[15px]">
          {INSIGHT_TABS.map((t) => (
            <span
              key={t}
              className={`-mb-px border-b-2 pb-2 ${t === "Body" ? "border-primary text-primary" : "border-transparent text-muted"}`}
            >
              {t}
            </span>
          ))}
        </div>

        <article className="rounded-lg bg-surface p-4 shadow-card md:p-6">
          <div className="text-center text-[11px] font-bold tracking-[0.14em] text-muted uppercase md:text-[12px]">
            Metabolic Score
          </div>

          <ScoreDial />

          <div className="mt-5 grid grid-cols-2 gap-4 border-t border-fg/10 pt-4">
            {METABOLIC_AGES.map((a) => (
              <div key={a.label} className="text-center">
                <div className="text-[10px] font-bold tracking-[0.12em] text-muted uppercase md:text-[11px]">
                  {a.label}
                </div>
                <div
                  className={`font-display mt-1 text-3xl font-extrabold md:text-4xl ${a.tone}`}
                >
                  {a.value}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="flex gap-3 rounded-lg bg-surface p-4 shadow-card">
          <Flame className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <h4 className="text-[14px] font-bold md:text-[15px]">
              14-day streak — rank #128
            </h4>
            <p className="mt-1 text-[12px] leading-relaxed font-normal text-muted md:text-[13px]">
              Two spots from your personal best on this week's leaderboard.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
