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
import { PhotoMosaic } from "@/components/site/gallery";
import { HeroStage } from "@/components/site/hero-stage";
import { SiteNav } from "@/components/site/nav";
import { PrivacyCore } from "@/components/site/privacy-core";
import { PinnedPhoneScroller } from "@/components/site/pinned-scroller";
import {
  FEATURE_POINTS_AI,
  FEATURE_POINTS_INTEGRATION,
  FEATURE_POINTS_METABOLIC,
  FEATURE_POINTS_NUTRITION,
} from "@/lib/site";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <SiteNav />
      <HeroStage />
      <Loved />
      <Features />
      <PinnedPhoneScroller />
      <PrivacyCore />
      <SiteFooter />
    </div>
  );
}

function Features() {
  return (
    <>
      <FeaturesIntro />
      <FeatureSlab
        eyebrow="Smart Nutrition"
        title="Log meals with voice"
        points={FEATURE_POINTS_NUTRITION}
        wash="from-wash to-wash-lilac"
        visual={<NutritionVisual />}
      />
      <FeatureSlab
        eyebrow="Seamless Integration"
        title="Connects to your ecosystem"
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
    <section id="features" className="section scroll-mt-24 bg-ink text-center text-invert">
      <div className="mx-auto max-w-narrow">
        <p className="eyebrow text-white/55">Intelligent Features</p>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-white">Beyond simple tracking</h2>
      </div>
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
  body?: string;
  points: readonly string[];
  wash: string;
  visual: ReactNode;
  reverse?: boolean;
  wide?: boolean;
  visualHeight?: string;
}) {
  return (
    <section className={`section relative overflow-hidden border-t border-black/5 bg-linear-to-b ${wash}`}>
      <div
        className={`mx-auto grid w-full max-w-wide items-center gap-12 ${wide ? "md:grid-cols-[3fr_2fr]" : "md:grid-cols-2"}`}
      >
        <div
          className={`reveal mx-auto w-full max-w-[46ch] text-center md:text-left ${reverse ? "md:order-2 md:mr-0 md:ml-auto" : "md:mx-0"}`}
        >
          <p className="eyebrow text-primary">{eyebrow}</p>
          <h3 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-fg">{title}</h3>
          {/* Rendered only when there is copy: an empty <p> still carries mt-4, and its
              margins collapse through it, leaving the bodiless slabs a tighter
              heading-to-bullets gap than the ones that have body text. */}
          {body ? <p className="mt-4 text-base font-normal leading-relaxed text-muted sm:text-lg">{body}</p> : null}
          {/* Centred as a block on a phone, but each row stays left-read so a wrapped
              point does not drift away from its tick. */}
          <ul className="mx-auto mt-6 flex w-fit max-w-full flex-col gap-3 text-left md:mx-0">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[16px] text-fg">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`relative w-full ${wide ? "h-[500px] md:h-[var(--orbit-scale)]" : visualHeight}`}
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
    <section className="section overflow-hidden">
      <PhotoMosaic />
      <h2 className="text-center font-display text-[clamp(2rem,4vw,3rem)] font-extrabold">
        Track everything from sleep to nutrition
      </h2>
      {/* Negative inline margin cancels the section gutter: the marquee is meant to
          run edge to edge, unlike everything else in this section. */}
      <div className="marquee-track-rev mt-10 -mx-6 flex w-max gap-4 px-4">
        {loop.map((c, i) => (
          <span key={`${c}-${i}`} className="rounded-lg bg-card px-5 py-4 text-sm font-semibold whitespace-nowrap">
            ★ {c}
          </span>
        ))}
      </div>
    </section>
  );
}
