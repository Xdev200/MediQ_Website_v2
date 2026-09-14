import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  Mic,
  Sparkles,
} from "lucide-react";
import { SiteFooter } from "@/components/site/footer";
import { PhotoMosaic, ScreenshotMarquee } from "@/components/site/gallery";
import { HeroStage } from "@/components/site/hero-stage";
import { metricIcons, stepIcons } from "@/components/site/icons";
import { Intelligence } from "@/components/site/intelligence";
import { SiteNav } from "@/components/site/nav";
import { PinnedPhoneScroller } from "@/components/site/pinned-scroller";
import { OrbitField, StillLife } from "@/components/site/still-life";
import {
  FEATURE_POINTS_AI,
  FEATURE_POINTS_INTEGRATION,
  FEATURE_POINTS_NUTRITION,
  METRICS,
  STEPS,
} from "@/lib/site";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <SiteNav />
      <HeroStage />
      <Integrations />
      <ScreenshotMarquee />
      <Metrics />
      <DashboardCollage />
      <Features />
      <Intelligence />
      <PinnedPhoneScroller />
      <HowItWorks />
      <PrivacyBand />
      <Loved />
      <StillLife />
      <SiteFooter />
    </div>
  );
}

function Integrations() {
  return (
    <section className="px-6 pt-16 pb-8 text-center">
      <h2 className="font-display text-xl font-semibold">Works with</h2>
      <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 font-display text-lg font-semibold tracking-tight">
        <span>Health Connect</span>
        <span>Smartwatches</span>
        <span>Blood Pressure</span>
        <span>Glucometers</span>
      </div>
      <h2 className="reveal mx-auto mt-16 max-w-3xl font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold">
        Every vital, every day
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-lg font-normal text-muted">
        Sync with your existing wearables or enter data manually. MediQ brings all your health metrics into a single,
        unified timeline.
      </p>
    </section>
  );
}

function Metrics() {
  return (
    <section id="metrics" className="scroll-mt-24 px-6 pb-16">
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m) => {
          const Icon = metricIcons[m.icon];
          return (
            <article
              key={m.name}
              className="reveal rounded-xl bg-card p-6 transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="mb-4 grid size-12 place-items-center rounded-md bg-surface" style={{ color: m.color }}>
                <Icon className="size-6" />
              </div>
              <h3 className="font-display text-base font-bold tracking-tight">{m.name}</h3>
              <p className="mt-2 text-sm leading-relaxed font-normal text-muted">{m.desc}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function DashboardCollage() {
  const heights = [40, 55, 45, 70, 90, 85, 60];
  return (
    <section className="overflow-hidden px-6 pb-20">
      <div className="relative mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
        <article className="reveal rounded-xl bg-linear-to-b from-wash to-wash-lilac p-6">
          <div className="text-[12px] font-semibold tracking-wide text-muted uppercase">Heart Rate</div>
          <div className="font-display mt-1 text-3xl font-extrabold">58 bpm</div>
          <svg viewBox="0 0 240 80" className="mt-4 h-20 w-full text-heart">
            <path
              d="M0 50 C20 50 20 20 40 30 S80 70 100 40 140 10 160 35 200 70 240 28"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="220"
              style={{ animation: "dash-draw 2.4s var(--ease-out-smooth) both" }}
            />
          </svg>
          <div className="float-a mt-2 inline-flex rounded-pill bg-surface px-3 py-2 text-[13px] font-semibold shadow-card">
            Resting HR · Below normal range? No — Optimal
          </div>
        </article>
        <article className="reveal rounded-xl bg-ink p-6 text-white">
          <div className="text-[12px] font-semibold tracking-wide text-white/50 uppercase">Sleep stages</div>
          <div className="font-display mt-1 text-3xl font-extrabold">7h 20m</div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-md bg-white/10 p-3">Deep 1h 39m</div>
            <div className="rounded-md bg-white/10 p-3">REM 56m</div>
            <div className="rounded-md bg-white/10 p-3">Core 4h 28m</div>
            <div className="rounded-md bg-white/10 p-3">Awake 17m</div>
          </div>
        </article>
        <article className="reveal rounded-xl bg-linear-to-b from-wash-mint to-wash p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[12px] font-semibold tracking-wide text-muted uppercase">Recovery</div>
              <div className="font-display text-3xl font-extrabold">84</div>
            </div>
            <svg viewBox="0 0 80 80" className="size-16">
              <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="8" />
              <circle
                cx="40"
                cy="40"
                r="30"
                fill="none"
                stroke="var(--color-success)"
                strokeWidth="8"
                strokeDasharray="188"
                strokeDashoffset="30"
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
                className="ring-anim"
                style={{ ["--ring-c" as string]: "188", ["--ring-offset" as string]: "30" }}
              />
            </svg>
          </div>
          <p className="mt-4 text-sm font-normal text-muted">
            The 7h 20m of sleep you had last night significantly improved your HRV baseline.
          </p>
        </article>
        <article className="reveal rounded-xl bg-card p-6 md:col-span-2">
          <div className="text-[12px] font-semibold tracking-wide text-muted uppercase">Recovery trend</div>
          <div className="mt-4 flex h-28 items-end gap-2">
            {heights.map((h, i) => (
              <div
                key={i}
                className={`bar-grow flex-1 rounded-t-sm ${i === 4 ? "bg-primary" : "bg-fg/15"}`}
                style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
        </article>
        <article className="reveal rounded-xl bg-surface p-6 shadow-card">
          <div className="text-[12px] font-semibold tracking-wide text-muted uppercase">Nutrition</div>
          <div className="mt-3 flex justify-between font-display text-lg font-extrabold">
            <span className="text-cal">520</span>
            <span className="text-oxy">48g</span>
            <span className="text-temp">12g</span>
          </div>
          <div className="flex justify-between text-[11px] text-muted">
            <span>Calories</span>
            <span>Protein</span>
            <span>Fat</span>
          </div>
        </article>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-ink px-6 py-24 text-invert">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="mb-3 text-[13px] font-semibold tracking-[0.1em] text-primary-bright uppercase">
          Intelligent Features
        </p>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-white">Beyond simple tracking</h2>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-5">
        <article className="reveal grid items-center gap-8 overflow-hidden rounded-xl bg-linear-to-b from-wash to-wash-lilac p-8 text-fg md:grid-cols-2 md:p-12">
          <div>
            <p className="mb-3 text-[13px] font-bold tracking-[0.1em] text-primary uppercase">Smart Nutrition</p>
            <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold">Log meals with your voice</h3>
            <p className="mt-4 max-w-[32ch] text-lg font-normal leading-relaxed text-muted">
              Forget barcode scanning. Simply speak your meal and our AI instantly calculates macros, calories, and
              micronutrients with incredible accuracy.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {FEATURE_POINTS_NUTRITION.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[16px]">
                  <span className="grid size-6 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <NutritionVisual />
        </article>

        <article className="reveal grid items-center gap-8 overflow-hidden rounded-xl bg-linear-to-b from-wash to-wash-blue p-8 text-fg md:grid-cols-2 md:p-12">
          <div className="md:order-2">
            <p className="mb-3 text-[13px] font-bold tracking-[0.1em] text-primary uppercase">Seamless Integration</p>
            <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold">Connects to your ecosystem</h3>
            <p className="mt-4 max-w-[32ch] text-lg font-normal leading-relaxed text-muted">
              MediQ syncs directly with Android Health Connect and your favorite wearables. All your data flows in
              automatically to create one unified health profile.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {FEATURE_POINTS_INTEGRATION.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[16px]">
                  <span className="grid size-6 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <OrbitField />
        </article>

        <article className="reveal grid items-center gap-8 overflow-hidden rounded-xl bg-linear-to-b from-wash to-wash-mint p-8 text-fg md:grid-cols-2 md:p-12">
          <div>
            <p className="mb-3 text-[13px] font-bold tracking-[0.1em] text-primary uppercase">Actionable Intelligence</p>
            <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold">Understand your body</h3>
            <p className="mt-4 max-w-[32ch] text-lg font-normal leading-relaxed text-muted">
              We don't just show you graphs. Our AI analyzes your correlations and gives you plain-English insights on
              how your lifestyle affects your biometrics.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {FEATURE_POINTS_AI.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[16px]">
                  <span className="grid size-6 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <InsightsVisual />
        </article>
      </div>
    </section>
  );
}

function NutritionVisual() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-3 rounded-pill bg-surface px-6 py-4 text-[15px] font-semibold shadow-card">
        <Mic className="size-5 text-primary" />
        <span className="flex items-end gap-1">
          {[12, 24, 16, 28, 14].map((h, i) => (
            <i
              key={i}
              className="voice-bar inline-block w-[3px] rounded-sm bg-primary-bright"
              style={{ height: h, animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </span>
        <span className="font-normal text-muted">“Grilled salmon and salad...”</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Macro value="520" label="Calories" color="text-cal" />
        <Macro value="48g" label="Protein" color="text-oxy" />
        <Macro value="12g" label="Fat" color="text-temp" />
      </div>
    </div>
  );
}

function Macro({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="rounded-md bg-surface px-3 py-4 text-center shadow-card">
      <div className={`font-display text-2xl font-extrabold ${color}`}>{value}</div>
      <div className="mt-1 text-xs font-medium text-muted">{label}</div>
    </div>
  );
}

function InsightsVisual() {
  const heights = ["40%", "55%", "45%", "70%", "90%", "85%"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div>
      <div className="rounded-lg bg-surface p-6 shadow-card">
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
      <div className="mt-4 flex gap-4 rounded-md border border-primary/25 bg-primary/10 p-4">
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

function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="mb-3 text-[13px] font-semibold tracking-[0.1em] text-muted uppercase">Onboarding</p>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold">Ready in minutes</h2>
      </div>
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => {
          const Icon = stepIcons[s.icon];
          return (
            <article key={s.n} className="reveal relative overflow-hidden rounded-xl border border-border bg-surface p-8">
              <span className="font-display absolute top-2 right-4 text-6xl font-extrabold text-fg/5">{s.n}</span>
              <div className="mb-6 grid size-12 place-items-center rounded-md bg-primary/15 text-primary">
                <Icon className="size-6" />
              </div>
              <h3 className="font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed font-normal text-muted">{s.desc}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PrivacyBand() {
  return (
    <section className="px-6 pb-16">
      <div className="relative mx-auto flex min-h-[420px] max-w-5xl flex-col items-center justify-end overflow-hidden rounded-[40px] bg-ink px-6 pt-16 pb-16 text-center text-white">
        <svg viewBox="0 0 120 140" className="absolute top-10 h-36 w-32 text-white/80" aria-hidden>
          <path
            className="lock-shackle"
            d="M36 58 V38 a24 24 0 0 1 48 0 v20"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <rect x="22" y="58" width="76" height="64" rx="14" fill="#2a3033" />
          <circle cx="60" cy="88" r="8" fill="currentColor" />
        </svg>
        <h2 className="relative font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold">Data Storage and Security</h2>
        <p className="relative mt-3 max-w-[40ch] text-lg font-normal text-white/65">
          We do not sell or lease this data to advertisers or third-party brokers. Your health records can be stored
          securely on your device.
        </p>
      </div>
    </section>
  );
}

function Loved() {
  const chips = [
    "4.9/5 Average Rating",
    "Steps & Activity",
    "Sleep Stages",
    "Heart Rate",
    "HRV & Stress",
    "Nutrition",
    "Blood Glucose",
    "Android Health Connect",
  ];
  const loop = [...chips, ...chips];
  return (
    <section className="overflow-hidden pb-8">
      <PhotoMosaic />
      <h2 className="px-6 text-center font-display text-[clamp(2rem,4vw,3rem)] font-extrabold">
        Track everything from sleep to nutrition
      </h2>
      <div className="marquee-track-rev mt-10 flex w-max gap-4 px-4">
        {loop.map((c, i) => (
          <span key={`${c}-${i}`} className="rounded-lg bg-card px-5 py-4 text-sm font-semibold whitespace-nowrap">
            ★ {c}
          </span>
        ))}
      </div>
    </section>
  );
}
