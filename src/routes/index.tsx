import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import {
  InsightsVisual,
  IntegrationVisual,
  MetabolicVisual,
  NutritionVisual,
  ORBIT_SCALE,
} from "@/components/site/feature-visuals";
import { SiteFooter } from "@/components/site/footer";
import { PhotoMosaic, ScreenshotMarquee } from "@/components/site/gallery";
import { HeroStage } from "@/components/site/hero-stage";
import { metricIcons } from "@/components/site/icons";
import { Intelligence } from "@/components/site/intelligence";
import { SiteNav } from "@/components/site/nav";
import { PrivacyCore } from "@/components/site/privacy-core";
import { PinnedPhoneScroller } from "@/components/site/pinned-scroller";
import { StillLife } from "@/components/site/still-life";
import {
  FEATURE_POINTS_AI,
  FEATURE_POINTS_INTEGRATION,
  FEATURE_POINTS_METABOLIC,
  FEATURE_POINTS_NUTRITION,
  METRICS,
} from "@/lib/site";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <SiteNav />
      <HeroStage />
      {/* <Integrations /> */}
      <Loved />
      {/* <ScreenshotMarquee /> */}
      {/* <Metrics /> */}
      {/* <DashboardCollage /> */}
      <Features />
      {/* <Intelligence /> */}
      <PinnedPhoneScroller />
      <PrivacyCore />
      
      {/* <StillLife /> */}
      <SiteFooter />
    </div>
  );
}

function Integrations() {
  return (
    <section className="px-6 pt-16 pb-8 text-center">
      <h2 className="reveal mx-auto mt-16 max-w-3xl font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold">
        14 vitals, one dashboard
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-lg font-normal text-muted">
        Heart rate, HRV, blood pressure, sleep, and more — all trended over time. Sync with your existing wearables.
      </p>
    </section>
  );
}

// function Metrics() {
//   return (
//     <section id="metrics" className="scroll-mt-24 px-6 pb-16">
//       <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         {METRICS.map((m) => {
//           const Icon = metricIcons[m.icon];
//           return (
//             <article
//               key={m.name}
//               className="reveal rounded-xl bg-card p-6 transition-transform duration-200 hover:-translate-y-1"
//             >
//               <div className="mb-4 grid size-12 place-items-center rounded-md bg-surface" style={{ color: m.color }}>
//                 <Icon className="size-6" />
//               </div>
//               <h3 className="font-display text-base font-bold tracking-tight">{m.name}</h3>
//               <p className="mt-2 text-sm leading-relaxed font-normal text-muted">{m.desc}</p>
//             </article>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// function DashboardCollage() {
//   const heights = [40, 55, 45, 70, 90, 85, 60];
//   return (
//     <section className="overflow-hidden px-6 pb-20">
//       <div className="relative mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
//         <article className="reveal rounded-xl bg-linear-to-b from-wash to-wash-lilac p-6">
//           <div className="text-[12px] font-semibold tracking-wide text-muted uppercase">Heart Rate</div>
//           <div className="font-display mt-1 text-3xl font-extrabold">58 bpm</div>
//           <svg viewBox="0 0 240 80" className="mt-4 h-20 w-full text-heart">
//             <path
//               d="M0 50 C20 50 20 20 40 30 S80 70 100 40 140 10 160 35 200 70 240 28"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="3"
//               strokeDasharray="220"
//               style={{ animation: "dash-draw 2.4s var(--ease-out-smooth) both" }}
//             />
//           </svg>
//           <div className="float-a mt-2 inline-flex rounded-pill bg-surface px-3 py-2 text-[13px] font-semibold shadow-card">
//             Resting HR · Below normal range? No — Optimal
//           </div>
//         </article>
//         <article className="reveal rounded-xl bg-ink p-6 text-white">
//           <div className="text-[12px] font-semibold tracking-wide text-white/50 uppercase">Sleep stages</div>
//           <div className="font-display mt-1 text-3xl font-extrabold">7h 20m</div>
//           <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
//             <div className="rounded-md bg-white/10 p-3">Deep 1h 39m</div>
//             <div className="rounded-md bg-white/10 p-3">REM 56m</div>
//             <div className="rounded-md bg-white/10 p-3">Core 4h 28m</div>
//             <div className="rounded-md bg-white/10 p-3">Awake 17m</div>
//           </div>
//         </article>
//         <article className="reveal rounded-xl bg-linear-to-b from-wash-mint to-wash p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-[12px] font-semibold tracking-wide text-muted uppercase">Recovery</div>
//               <div className="font-display text-3xl font-extrabold">84</div>
//             </div>
//             <svg viewBox="0 0 80 80" className="size-16">
//               <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="8" />
//               <circle
//                 cx="40"
//                 cy="40"
//                 r="30"
//                 fill="none"
//                 stroke="var(--color-success)"
//                 strokeWidth="8"
//                 strokeDasharray="188"
//                 strokeDashoffset="30"
//                 strokeLinecap="round"
//                 transform="rotate(-90 40 40)"
//                 className="ring-anim"
//                 style={{ ["--ring-c" as string]: "188", ["--ring-offset" as string]: "30" }}
//               />
//             </svg>
//           </div>
//           <p className="mt-4 text-sm font-normal text-muted">
//             The 7h 20m of sleep you had last night significantly improved your HRV baseline.
//           </p>
//         </article>
//         <article className="reveal rounded-xl bg-card p-6 md:col-span-2">
//           <div className="text-[12px] font-semibold tracking-wide text-muted uppercase">Recovery trend</div>
//           <div className="mt-4 flex h-28 items-end gap-2">
//             {heights.map((h, i) => (
//               <div
//                 key={i}
//                 className={`bar-grow flex-1 rounded-t-sm ${i === 4 ? "bg-primary" : "bg-fg/15"}`}
//                 style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }}
//               />
//             ))}
//           </div>
//         </article>
//         <article className="reveal rounded-xl bg-surface p-6 shadow-card">
//           <div className="text-[12px] font-semibold tracking-wide text-muted uppercase">Nutrition</div>
//           <div className="mt-3 flex justify-between font-display text-lg font-extrabold">
//             <span className="text-cal">520</span>
//             <span className="text-oxy">48g</span>
//             <span className="text-temp">12g</span>
//           </div>
//           <div className="flex justify-between text-[11px] text-muted">
//             <span>Calories</span>
//             <span>Protein</span>
//             <span>Fat</span>
//           </div>
//         </article>
//       </div>
//     </section>
//   );
// }

function Features() {
  return (
    <>
      <FeaturesIntro />
      <FeatureSlab
        eyebrow="Smart Nutrition"
        title="Log meals with voice"
        body=""
        points={FEATURE_POINTS_NUTRITION}
        wash="from-wash to-wash-lilac"
        visual={<NutritionVisual />}
      />
      <FeatureSlab
        eyebrow="Seamless Integration"
        title="Connects to your ecosystem"
        body=""
        points={FEATURE_POINTS_INTEGRATION}
        wash="from-wash to-wash-blue"
        visual={<IntegrationVisual />}
        reverse
        wide
      />
      <FeatureSlab
        eyebrow="Actionable Intelligence"
        title="Understand your body"
        body="We don't just show you graphs. Our AI analyzes your correlations and gives you plain-English insights on how your lifestyle affects your biometrics."
        points={FEATURE_POINTS_AI}
        wash="from-wash to-wash-mint"
        visual={<InsightsVisual />}
        visualHeight="h-auto"
      />
      <FeatureSlab
        eyebrow="Insights & Motivation"
        title="Master your metabolism"
        body="Your Metabolic Score turns dozens of numbers into one clear answer, with a Metabolic Age that shows how you compare. Set a goal and MediQ builds the plan around your actual data."
        points={FEATURE_POINTS_METABOLIC}
        wash="from-wash to-wash-blue"
        visual={<MetabolicVisual />}
        visualHeight="h-auto"
        reverse
      />
    </>
  );
}

function FeaturesIntro() {
  return (
    <section id="features" className="scroll-mt-24 bg-ink px-6 py-16 text-center text-invert">
      <p className="mb-3 text-[13px] font-semibold tracking-[0.1em] text-white/55 uppercase">
        Intelligent Features
      </p>
      <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-white">Beyond simple tracking</h2>
    </section>
  );
}

function FeatureSlab({
  eyebrow,
  title,
  body,
  points,
  wash,
  visual,
  reverse,
  wide,
  /** Slabs whose visual flows (rather than sitting absolutely inside a fixed box) pass "h-auto". */
  visualHeight = "h-[420px] md:h-[560px]",
}: {
  eyebrow: string;
  title: string;
  body: string;
  points: readonly string[];
  wash: string;
  visual: ReactNode;
  reverse?: boolean;
  wide?: boolean;
  visualHeight?: string;
}) {
  return (
    <section className={`relative overflow-hidden border-t border-black/5 bg-linear-to-b px-6 py-24 md:py-32 ${wash}`}>
      <div
        className={`mx-auto grid w-full max-w-[1800px] items-center gap-12 ${wide ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-2"}`}
      >
        <div className={`reveal mx-auto w-full max-w-[46ch] ${reverse ? "md:order-2 md:mx-0" : "md:mx-0"}`}>
          <p className="mb-3 text-[13px] font-bold tracking-[0.1em] text-primary uppercase">{eyebrow}</p>
          <h3 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-extrabold text-fg">{title}</h3>
          <p className="mt-4 text-lg font-normal leading-relaxed text-muted">{body}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[16px] text-fg">
                <span className="grid size-6 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`relative w-full ${wide ? "h-[420px] md:h-[var(--orbit-scale)]" : visualHeight}`}
          style={wide ? ({ "--orbit-scale": ORBIT_SCALE } as CSSProperties) : undefined}
        >
          {visual}
        </div>
      </div>
    </section>
  );
}

function Loved() {
  const chips = [
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
    <section className="overflow-hidden pb-8 mt-16 mb-16">
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
