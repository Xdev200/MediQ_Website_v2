import { useEffect, useRef } from "react";
import {
  Activity,
  ArrowLeft,
  Bell,
  Bot,
  Calendar,
  Check,
  ChevronRight,
  Copy,
  Download,
  Droplets,
  FileText,
  Home,
  Info,
  Lightbulb,
  Menu,
  Mic,
  MoreVertical,
  Plus,
  Search,
  Send,
  Thermometer,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PhoneFrame } from "@/components/site/phone";

/**
 * The device never moves. Each card paints its own copy of the phone at identical
 * viewport coordinates, and `clip-path` on the card clips that fixed copy to the
 * card's box without making the card its containing block. Scrolling therefore
 * wipes screen A into screen B along the card seam, and the gutter between cards
 * cuts the device away entirely — one continuous object sliced into bands.
 */

/** Device is centred vertically in the viewport and sits in the right half. */
const PHONE_HEIGHT = "min(756px, 84vh)";
/** 183px of a 1440px viewport, so the device's right edge lands at 1257. */
const PHONE_RIGHT = "12.7vw";
/** Cards are deliberately shorter than the viewport so two are visible at once. */
const CARD_HEIGHT = "clamp(520px, 68vh, 660px)";
const CARD_RADIUS = 28;

type Float = {
  /** Distance in px the chip drifts across the card's travel through the viewport. */
  rate: number;
  className: string;
  content: React.ReactNode;
};

type ScreenKey = "store" | "profile" | "home" | "chat" | "extras";

type Panel = {
  /** Which device screen this band of the pinned phone shows. */
  screen: ScreenKey;
  /** Numbered label for the onboarding run; the payoff panels leave it off. */
  eyebrow?: string;
  title: string;
  body: string;
  bullets: { title: string; desc: string }[];
  bg: string;
  floats: Float[];
};

const PANELS: Panel[] = [
  {
    screen: "store",
    eyebrow: "Step 1 · Download",
    title: "Get started",
    body: "Get MediQ free from the Google Play Store. No subscription required for the core features.",
    bullets: [],
    bg: "linear-gradient(180deg, #f2f6f8 0%, #dee9f6 100%)",
    floats: [
      {
        rate: -28,
        className: "top-[22%] -left-[46%] w-[58%]",
        content: (
          <div className="flex items-center gap-2 rounded-pill bg-white px-3.5 py-2 text-[12px] font-semibold shadow-device">
            <Download className="size-3.5 shrink-0 text-primary" />
            Free on Google Play
          </div>
        ),
      },
      {
        rate: 30,
        className: "bottom-[20%] -right-[40%] w-[50%]",
        content: (
          <div className="rounded-[18px] bg-white px-4 py-3 shadow-device">
            <div className="text-[10px] font-semibold tracking-wide text-muted uppercase">
              Price
            </div>
            <div className="font-display text-lg font-extrabold text-success">
              Free
            </div>
          </div>
        ),
      },
    ],
  },
  {
    screen: "profile",
    eyebrow: "Step 2 · Onboarding",
    title: "Set your baseline",
    body: "Answer a few questions about your metrics and health goals, so every insight that follows is measured against you.",
    bullets: [],
    bg: "linear-gradient(180deg, #f4f0f8 0%, #e3e2f8 100%)",
    floats: [
      {
        rate: -30,
        className: "top-[26%] -left-[48%] w-[62%]",
        content: (
          <div className="rounded-[18px] bg-white px-4 py-3 shadow-device">
            <div className="text-[10px] font-semibold tracking-wide text-muted uppercase">
              Goal
            </div>
            <div className="text-[13px] leading-snug font-semibold">
              Sleep better, wake up recovered
            </div>
          </div>
        ),
      },
      {
        rate: 26,
        className: "bottom-[22%] -right-[38%] w-[52%]",
        content: (
          <div className="flex items-center gap-2 rounded-pill bg-white px-3.5 py-2 text-[12px] font-semibold shadow-device">
            <Check className="size-3.5 shrink-0 text-success" />
            Takes 2 minutes
          </div>
        ),
      },
    ],
  },
  {
    screen: "home",
    eyebrow: "Step 3 · Your day",
    title: "Track your day",
    body: "Calories in against calories out, the workouts you have logged and the deficit your goal actually needs — the home screen answers all of it at a glance.",
    bullets: [],
    bg: "linear-gradient(180deg, #eef8f4 0%, #dcefe7 100%)",
    floats: [
      {
        rate: -26,
        className: "top-[20%] -left-[46%] w-[60%]",
        content: (
          <div className="flex items-center gap-2 rounded-pill bg-white px-3.5 py-2 text-[12px] font-semibold shadow-device">
            <Activity className="size-3.5 shrink-0 text-primary" />
            1,060 kcal burned
          </div>
        ),
      },
      {
        rate: 30,
        className: "bottom-[20%] -right-[40%] w-[56%]",
        content: (
          <div className="rounded-[18px] bg-white px-4 py-3 shadow-device">
            <div className="text-[10px] font-semibold tracking-wide text-muted uppercase">
              Today’s deficit
            </div>
            <div className="font-display text-lg font-extrabold text-success">
              −500 kcal
            </div>
          </div>
        ),
      },
    ],
  },
  {
    screen: "chat",
    eyebrow: "Step 4 · Optimize",
    title: "Get answers from your data",
    body: "Ask questions about your health and get answers grounded in your own metrics.",
    bullets: [],
    bg: "linear-gradient(180deg, #eef2f8 0%, #e4dff6 100%)",
    floats: [
      {
        rate: -30,
        className: "bottom-[20%] -right-[40%] w-[54%]",
        content: (
          <div className="flex items-center gap-2 rounded-pill bg-white px-3.5 py-2 text-[12px] font-semibold shadow-device">
            <FileText className="size-3.5 shrink-0 text-primary" />
            Grounded in 5 sources
          </div>
        ),
      },
      {
        rate: 26,
        className: "top-[17%] -left-[46%] w-[64%]",
        content: (
          <div className="rounded-[18px] bg-white px-4 py-3 shadow-device">
            <div className="text-[10px] font-semibold tracking-wide text-muted uppercase">
              Recovery
            </div>
            <div className="font-display text-lg font-extrabold text-success">
              84 · trending up
            </div>
          </div>
        ),
      },
    ],
  },
  {
    screen: "extras",
    title: "And that's not all",
    body: "MediQ also tracks the following:",
    bullets: [
      {
        title: "Blood Glucose",
        desc: "Fasting and post-meal glucose trends for metabolic health.",
      },
      {
        title: "Body Temperature",
        desc: "Baseline deviations and fever detection algorithms.",
      },
      {
        title: "Blood Oxygen",
        desc: "SpO₂ tracking for respiratory health monitoring.",
      },
    ],
    bg: "linear-gradient(180deg, #eef6f8 0%, #dce8f6 100%)",
    floats: [
      {
        rate: -26,
        className: "top-[20%] -left-[46%] w-[60%]",
        content: (
          <div className="flex items-center gap-2 rounded-pill bg-white px-3.5 py-2 text-[12px] font-semibold shadow-device">
            <Thermometer className="size-3.5 shrink-0 text-temp" />
            36.6°C baseline
          </div>
        ),
      },
      {
        rate: 30,
        className: "bottom-[20%] -right-[40%] w-[58%]",
        content: (
          <div className="flex items-center gap-2 rounded-pill bg-white px-3.5 py-2 text-[12px] font-semibold shadow-device">
            <Droplets className="size-3.5 shrink-0 text-oxy" />
            SpO₂ 98%
          </div>
        ),
      },
    ],
  },
];

type LenisLike = {
  on: (e: string, fn: () => void) => void;
  off: (e: string, fn: () => void) => void;
};

/**
 * Publishes the card's travel through the viewport as `--p` (-1 entering, 0 centred,
 * 1 leaving). Floats read it in CSS, so each frame costs one style write per card.
 */
function useCardProgress(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const measure = () => {
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const centre = r.top + r.height / 2;
      const span = (vh + r.height) / 2;
      const p = Math.max(-1, Math.min(1, (vh / 2 - centre) / span));
      el.style.setProperty("--p", p.toFixed(4));
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

export function PinnedPhoneScroller() {
  return (
    <section
      id="how-it-works"
      /* The vertical padding here is the dark frame around the rounded cards, not
         section rhythm — that comes from the intro block below. Only the gutter is
         aligned to the page. */
      className="scroll-mt-24 bg-ink px-6 py-6 lg:py-8"
    >
      <div className="mx-auto max-w-wide">
        <div className="mx-auto max-w-narrow py-14 text-center text-white lg:py-20">
          <p className="eyebrow text-white/55">Onboarding</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold text-white">
            Ready in minutes
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-lg font-normal text-white/55">
            Four steps from installing the app to acting on what your own data
            says.
          </p>
        </div>
        <div className="flex flex-col gap-6 lg:gap-8">
          {PANELS.map((panel) => (
            <PanelCard key={panel.title} panel={panel} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PanelCard({ panel }: { panel: Panel }) {
  const ref = useRef<HTMLElement>(null);
  useCardProgress(ref);

  return (
    <article
      ref={ref}
      className="relative flex flex-col justify-center px-6 py-12 lg:h-[var(--card-h)] lg:px-20 lg:py-0"
      style={{
        background: panel.bg,
        // Clips the fixed device below to this card while leaving it positioned
        // against the viewport. Removing this collapses the whole effect.
        clipPath: `inset(0 round ${CARD_RADIUS}px)`,
        ["--card-h" as string]: CARD_HEIGHT,
      }}
    >
      <div className="relative z-10 w-full text-center lg:max-w-[46%] lg:text-left">
        {panel.eyebrow ? (
          <p className="eyebrow inline-flex rounded-pill bg-ink/8 px-3.5 py-1.5 text-fg/70">
            {panel.eyebrow}
          </p>
        ) : null}
        <h3 className="font-display text-[clamp(2rem,3.4vw,2.6rem)] leading-[0.98] font-extrabold tracking-[-0.04em]">
          {panel.title}
        </h3>
        <p className="mx-auto mt-5 max-w-[46ch] text-base leading-relaxed font-normal text-muted sm:text-lg lg:mx-0">
          {panel.body}
        </p>
        {panel.bullets.length ? (
          <ul className="mx-auto mt-6 max-w-xl space-y-3 text-left lg:mx-0">
            {panel.bullets.map((b) => (
              <li
                key={b.title}
                className="rounded-lg bg-white/70 px-4 py-3 backdrop-blur"
              >
                <div className="font-display text-base font-bold">
                  {b.title}
                </div>
                <p className="mt-1 text-sm font-normal text-muted">{b.desc}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <PhoneLayer screen={panel.screen} floats={panel.floats} />
    </article>
  );
}

/**
 * In flow beneath the copy on small screens; a viewport-fixed overlay from `lg` up,
 * where the card's clip-path turns it into the pinned device.
 */
function PhoneLayer({
  screen,
  floats,
}: {
  screen: ScreenKey;
  floats: Float[];
}) {
  return (
    <div className="relative mx-auto mt-10 aspect-[370/756] w-[min(300px,80vw)] lg:pointer-events-none lg:fixed lg:inset-0 lg:mt-0 lg:aspect-auto lg:w-auto">
      <div
        // `right` belongs to the fixed layout alone: on the stacked mobile card it
        // dragged the device out from under the copy and into the card's clip edge.
        className="relative h-full w-full lg:absolute lg:top-1/2 lg:right-[var(--phone-right)] lg:aspect-[370/756] lg:h-[var(--phone-h)] lg:w-auto lg:-translate-y-1/2"
        style={{
          ["--phone-right" as string]: PHONE_RIGHT,
          ["--phone-h" as string]: PHONE_HEIGHT,
        }}
      >
        <IPhone screen={screen} />
        {floats.map((f, i) => (
          <div
            key={i}
            // The bleed only has room in the fixed layout; on mobile the card edge
            // would slice these in half.
            className={cn("absolute z-20 hidden lg:block", f.className)}
            style={{ transform: `translateY(calc(var(--p, 0) * ${f.rate}px))` }}
          >
            {f.content}
          </div>
        ))}
      </div>
    </div>
  );
}

function IPhone({ screen }: { screen: ScreenKey }) {
  return (
    <PhoneFrame className="h-full w-full">
      {/* The screens are drawn for the full-size 370px device. The stacked mobile
          layout shows a smaller one, so the whole UI is zoomed down to match. */}
      <div className="absolute inset-0 [zoom:0.8] lg:[zoom:1]">
        <StatusBar />
        {screen === "store" ? <ScreenStore /> : null}
        {screen === "profile" ? <ScreenProfile /> : null}
        {screen === "home" ? <ScreenHome /> : null}
        {screen === "chat" ? <ScreenChat /> : null}
        {screen === "extras" ? <ScreenExtras /> : null}
      </div>
      <div className="absolute bottom-2 left-1/2 z-30 h-[5px] w-32 -translate-x-1/2 rounded-full bg-black/80" />
    </PhoneFrame>
  );
}

export function StatusBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-20 flex h-12 items-end justify-between px-7 pb-1 text-[12px] font-semibold">
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden>
          <rect x="0" y="7" width="3" height="5" rx="0.5" fill="currentColor" />
          <rect
            x="4.5"
            y="4"
            width="3"
            height="8"
            rx="0.5"
            fill="currentColor"
          />
          <rect
            x="9"
            y="1"
            width="3"
            height="11"
            rx="0.5"
            fill="currentColor"
          />
          <rect
            x="13.5"
            y="0"
            width="2.5"
            height="12"
            rx="0.5"
            fill="currentColor"
            opacity="0.35"
          />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden>
          <path
            d="M1 8.5c3.2-3.8 10.8-3.8 14 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M3.6 10c2.2-2.4 6.6-2.4 8.8 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <circle cx="8" cy="11.2" r="0.9" fill="currentColor" />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden>
          <rect
            x="0.5"
            y="1"
            width="22"
            height="10"
            rx="2.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <rect
            x="2"
            y="2.4"
            width="16"
            height="7.2"
            rx="1.4"
            fill="currentColor"
          />
          <rect
            x="23.2"
            y="4"
            width="2"
            height="4"
            rx="0.6"
            fill="currentColor"
          />
        </svg>
      </span>
    </div>
  );
}

/** Google Play's own points chip: a four-quadrant diamond, as it sits in the app bar. */
function PlayPointsMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path d="M7 0.6 13.4 7 7 13.4 0.6 7Z" fill="#fff" />
      <path d="M7 2.1 11.9 7 7 7Z" fill="#ea4335" />
      <path d="M11.9 7 7 11.9 7 7Z" fill="#fbbc04" />
      <path d="M7 11.9 2.1 7 7 7Z" fill="#34a853" />
      <path d="M2.1 7 7 2.1 7 7Z" fill="#4285f4" />
    </svg>
  );
}

function ScreenStore() {
  return (
    <div className="absolute inset-0 flex flex-col bg-white pt-12">
      <header className="flex items-center justify-between px-5 py-3">
        <ArrowLeft className="size-[22px]" strokeWidth={2} />
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 rounded-pill bg-primary py-1 pr-3 pl-1.5 text-[13px] font-semibold text-white">
            <PlayPointsMark />
            278
          </span>
          <MoreVertical className="size-[22px]" strokeWidth={2} />
        </div>
      </header>

      <div className="flex-1 overflow-hidden px-6">
        <div className="mt-2 flex items-start gap-5">
          <span className="grid size-[76px] shrink-0 place-items-center rounded-[22px] bg-white shadow-card ring-1 ring-black/5">
            <span className="font-display text-[27px] leading-none font-extrabold tracking-tight text-primary">
              mQ
            </span>
          </span>
          <div className="min-w-0 pt-1.5">
            <div className="font-display text-[27px] leading-tight font-bold">
              MediQ
            </div>
            <div className="mt-1 text-[14px] font-medium text-primary">
              NeuralMesh Private Limited
            </div>
          </div>
        </div>

        <div className="mt-7 flex items-stretch">
          <div className="flex flex-1 flex-col items-center gap-1.5">
            <Download className="size-[18px]" />
            <span className="text-[12px] text-muted">31 MB</span>
          </div>
          <span className="w-px self-center bg-fg/12" style={{ height: 38 }} />
          <div className="flex flex-1 flex-col items-center gap-1.5">
            <span className="grid size-[18px] place-items-center rounded-[3px] border-[1.5px] border-fg text-[9px] leading-none font-bold">
              3+
            </span>
            <span className="flex items-center gap-1 text-[12px] text-muted">
              Rated for 3+
              <Info className="size-3" />
            </span>
          </div>
        </div>

        <div className="mt-6 flex min-h-[46px] items-center justify-center rounded-pill bg-primary text-[15px] font-semibold text-white">
          Install
        </div>

        {/* Store gallery: enough of the app to make the install feel earned. */}
        <div className="mt-6 flex gap-2.5">
          {[
            { t: "Today", v: "84", c: "text-success" },
            { t: "Sleep", v: "7h 20m", c: "text-sleep" },
            { t: "HRV", v: "62 ms", c: "text-hrv" },
          ].map((g) => (
            <div key={g.t} className="flex-1 rounded-[14px] bg-[#eef2f6] p-2.5">
              <div className="text-[9px] font-semibold tracking-wide text-muted uppercase">
                {g.t}
              </div>
              <div
                className={cn(
                  "font-display mt-1 text-[13px] font-extrabold",
                  g.c,
                )}
              >
                {g.v}
              </div>
              <div className="mt-2 flex h-9 items-end gap-1">
                {[40, 68, 52, 88, 61].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-[2px] bg-fg/15"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <h4 className="font-display mt-5 text-[15px] font-bold">
          About this app
        </h4>
        <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
          Your health data from every device, read together and explained in
          plain English.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Health & fitness", "Wearables", "AI coach"].map((t) => (
            <span
              key={t}
              className="rounded-pill bg-[#eef2f6] px-2.5 py-1 text-[11px] font-medium text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <h4 className="font-display mt-5 text-[15px] font-bold">Data safety</h4>
        <div className="mt-2 space-y-2">
          {[
            { icon: Check, t: "No data shared with third parties" },
            { icon: Download, t: "You can request your data be exported" },
            { icon: Trash2, t: "You can request your data be deleted" },
          ].map((row) => (
            <div
              key={row.t}
              className="flex items-center gap-2.5 text-[12px] text-muted"
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#eef2f6]">
                <row.icon className="size-3.5" />
              </span>
              {row.t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** The onboarding age dial: a year ruler with majors every five and a marker on 30. */
function AgeRuler() {
  const ages = Array.from({ length: 17 }, (_, i) => 21 + i);
  return (
    <div className="mt-5 flex items-start justify-between px-2">
      {ages.map((age) => {
        const major = age % 5 === 3;
        const active = age === 30;
        return (
          <div key={age} className="flex flex-1 flex-col items-center">
            <span className="flex h-7 items-center">
              <span
                className={cn(
                  "rounded-full",
                  active
                    ? "h-7 w-[2.5px] bg-primary"
                    : major
                      ? "h-5 w-[1.5px] bg-fg/45"
                      : "h-3 w-[1.5px] bg-fg/20",
                )}
              />
            </span>
            {active ? (
              <span className="mt-1 size-0 border-x-[4px] border-b-[6px] border-x-transparent border-b-primary" />
            ) : null}
            {major ? (
              <span className="mt-1.5 text-[9px] text-muted">{age}</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function ScreenProfile() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#f6f7fc] pt-12">
      <div className="flex items-center justify-center gap-1.5 pt-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={cn(
              "h-[5px] w-8 rounded-full",
              i === 0 ? "bg-primary" : "bg-fg/15",
            )}
          />
        ))}
      </div>

      <div className="px-7 pt-7 text-center">
        <h3 className="font-display text-[26px] leading-tight font-extrabold">
          Let&rsquo;s get to know you
        </h3>
        <p className="mx-auto mt-2 max-w-[16rem] text-[14px] leading-snug text-muted">
          To personalize your metabolic analysis, we need a few details.
        </p>
      </div>

      <div className="mt-7 flex-1 px-7 text-center">
        <p className="font-display text-[18px] font-bold italic">I&rsquo;m</p>

        <div className="mx-auto mt-3.5 flex w-[80%] rounded-pill bg-fg/8 text-[15px] font-semibold">
          <span className="flex-1 rounded-pill bg-primary py-2.5 text-white shadow-card">
            Male
          </span>
          <span className="flex-1 py-2.5 text-muted">Female</span>
        </div>

        <p className="mt-6 text-[13px] font-semibold text-primary">Age</p>
        <div className="mx-auto mt-2 flex w-[54%] items-baseline justify-center gap-1.5 rounded-[18px] bg-fg/6 py-4">
          <span className="font-display text-[34px] leading-none font-extrabold">
            30
          </span>
          <span className="text-[14px] text-muted">years</span>
        </div>

        <AgeRuler />

        <div className="mx-auto mt-7 flex w-fit items-center gap-2.5 rounded-pill bg-white px-4 py-2.5 text-[13px] font-medium shadow-card">
          <Calendar className="size-4 text-primary" />
          01 Jan 1996
        </div>
      </div>

      <div className="px-6 pb-8">
        <div className="flex min-h-[52px] items-center justify-center rounded-pill bg-primary text-[16px] font-semibold text-white">
          Continue
        </div>
      </div>
    </div>
  );
}

/** Bar with its own track tint, as the home screen draws calories in and out. */
function BalanceBar({
  label,
  pct,
  value,
  target,
  tone,
}: {
  label: string;
  pct: number;
  value: string;
  target: string;
  tone: "success" | "primary";
}) {
  return (
    <div className="mt-3.5">
      <p className="text-[11px] font-bold tracking-[0.14em] text-muted">
        {label}
      </p>
      <div
        className={cn(
          "mt-2 h-2.5 rounded-full",
          tone === "success" ? "bg-success/12" : "bg-primary/12",
        )}
      >
        <div
          className={cn(
            "h-full rounded-full",
            tone === "success" ? "bg-success" : "bg-primary",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1.5 text-right text-[13px] text-muted">
        <span className="font-display font-extrabold text-fg">{value}</span>/
        {target} kcal
      </p>
    </div>
  );
}

function ScreenHome() {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#f4f6fc] pt-12">
      <header className="flex items-center justify-between px-5 pt-2.5">
        <h3 className="font-display text-[19px] leading-tight font-extrabold text-primary">
          Hi Arjun Mehta
        </h3>
        <div className="flex items-center gap-2.5">
          <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-white shadow-card">
            <Bell className="size-[18px]" />
            <span className="absolute top-[7px] right-[9px] size-[6px] rounded-full bg-danger" />
          </span>
          <span className="font-display grid size-9 shrink-0 place-items-center rounded-full bg-primary text-[15px] font-bold text-white">
            A
          </span>
        </div>
      </header>

      <div className="mt-4 min-h-0 flex-1 space-y-3 px-4">
        <div className="rounded-[24px] bg-white px-4 py-4 shadow-card">
          <div className="flex items-start justify-between">
            <div className="font-display text-[17px] font-extrabold">
              Daily Calorie Balance
            </div>
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-fg/6 text-[11px] font-bold text-muted">
              i
            </span>
          </div>
          <BalanceBar
            label="Calorie In"
            pct={62}
            value="1,390"
            target="2,248"
            tone="success"
          />
          <BalanceBar
            label="Calorie Out"
            pct={39}
            value="1,060"
            target="2,748"
            tone="primary"
          />
        </div>

        <div className="rounded-[24px] bg-white px-4 py-3.5 shadow-card">
          <div className="flex items-center justify-between">
            <div className="font-display text-[16px] font-bold">Exercise</div>
            <ChevronRight className="size-4 text-muted" />
          </div>
          <div className="mt-2.5 h-2.5 rounded-full bg-primary/12">
            <div className="h-full w-[27%] rounded-full bg-primary" />
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-muted">
            <span>2/3 activities logged</span>
            <span>
              <span className="font-display text-[13px] font-extrabold text-fg">
                304
              </span>
              /1,119 kcal
            </span>
          </div>
        </div>

        <div className="rounded-[24px] bg-white px-4 py-3.5 shadow-card">
          <div className="flex items-center justify-between">
            <div className="font-display text-[16px] font-bold">
              Goal Recommendation
            </div>
            <ChevronRight className="size-4 text-muted" />
          </div>
          <div className="mt-3 flex items-start justify-between">
            <div>
              <div className="text-[10px] font-bold tracking-[0.1em] text-muted uppercase">
                Goal
              </div>
              <div className="mt-1 text-[14px] font-semibold">Fat Loss</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold tracking-[0.1em] text-muted uppercase">
                Recommended
              </div>
              <div className="mt-1 text-[14px] font-semibold text-success">
                -500 kcal/day
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating tab bar with the assistant sitting proud of it, as in the app. */}
      <div className="relative px-4 pt-3 pb-5">
        <div className="flex items-center justify-between rounded-[26px] bg-white px-7 py-3.5 shadow-card">
          <Home className="size-6 text-primary" />
          <UtensilsCrossed className="size-6 text-muted/70" />
          <span className="w-12 shrink-0" />
          <FileText className="size-6 text-muted/70" />
          <Lightbulb className="size-6 text-muted/70" />
        </div>
        <span className="absolute bottom-[42px] left-1/2 grid size-14 -translate-x-1/2 place-items-center rounded-full bg-primary text-white shadow-device">
          <Bot className="size-7" />
        </span>
      </div>
    </div>
  );
}

function ScreenChat() {
  return (
    <div className="absolute inset-0 flex flex-col pt-12">
      <header className="flex items-center justify-between px-4 py-2">
        <span className="grid size-8 place-items-center rounded-full bg-white shadow-card">
          <Menu className="size-4" />
        </span>
        <div className="flex items-center gap-1 rounded-pill bg-white px-2.5 py-1 text-[11px] font-semibold shadow-card">
          <span className="grid size-5 place-items-center rounded-full bg-primary/15 text-[10px]">
            ✦
          </span>
          Following up on rest
        </div>
        <span className="grid size-8 place-items-center rounded-full bg-white shadow-card">
          <X className="size-4" />
        </span>
      </header>

      {/* Content runs the full height of the screen: every horizontal band of the
          device ends up framed by some card, so none of them may read as empty. */}
      <div className="flex-1 overflow-hidden px-4 pt-3">
        <div className="ml-auto max-w-[82%] rounded-[18px] rounded-br-sm bg-[#7eb6ff] px-3.5 py-2.5 text-[13px] leading-snug font-medium text-white">
          I'm feeling not rested today. What happened?
        </div>

        <p className="mt-3.5 text-[11px] font-medium text-muted">
          Thought for 16 seconds
        </p>
        <ul className="mt-2 space-y-1.5 text-[12px] text-muted">
          {[
            { icon: Search, t: "Reviewing your recent recovery signals" },
            { icon: FileText, t: "Analyzing sleep, strain, and HRV trends" },
            { icon: Search, t: "Looking for possible causes of fatigue" },
            { icon: FileText, t: "Preparing insights and recommendations" },
          ].map((row) => (
            <li key={row.t} className="flex items-center gap-2">
              <row.icon className="size-3.5 shrink-0 opacity-60" />
              <span className="flex-1">{row.t}</span>
              <ChevronRight className="size-3 opacity-40" />
            </li>
          ))}
          <li className="flex items-center gap-2 text-fg">
            <Check className="size-3.5 text-success" />
            Done
          </li>
        </ul>

        <p className="mt-3.5 text-[13px] leading-relaxed font-normal text-fg">
          Your recovery score is trending up. The 7h 20m of sleep you had last
          night significantly improved your HRV baseline.
        </p>

        <div className="mt-3.5 rounded-[18px] bg-white p-3 shadow-card">
          <div className="flex items-center justify-between text-[11px] font-semibold tracking-wide text-muted uppercase">
            <span>Recovery trend</span>
            <span className="text-success">+12%</span>
          </div>
          <div className="mt-2.5 flex h-16 items-end gap-2">
            {[26, 45, 33, 62, 41, 78, 100].map((h, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-[3px]",
                  i === 6 ? "bg-success" : "bg-fg/15",
                )}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-muted">
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-[14px] bg-white px-3 py-2 shadow-card">
            <div className="text-[10px] font-semibold tracking-wide text-muted uppercase">
              Sleep
            </div>
            <div className="font-display text-[15px] font-extrabold">
              7h 20m
            </div>
          </div>
          <div className="rounded-[14px] bg-white px-3 py-2 shadow-card">
            <div className="text-[10px] font-semibold tracking-wide text-muted uppercase">
              Resting HR
            </div>
            <div className="font-display text-[15px] font-extrabold">
              58 bpm
            </div>
          </div>
        </div>

        <div className="mt-3 flex gap-3 text-muted">
          <Copy className="size-4" />
          <ThumbsUp className="size-4" />
          <ThumbsDown className="size-4" />
        </div>
      </div>

      <div className="px-3 pt-2 pb-5">
        <div className="flex items-center gap-2 rounded-pill bg-white px-2 py-1.5 shadow-card">
          <span className="grid size-8 place-items-center rounded-full bg-card">
            <Plus className="size-4" />
          </span>
          <span className="flex-1 text-[13px] text-muted">
            Ask MediQ anything
          </span>
          <Mic className="size-4 text-muted" />
          <span className="grid size-8 place-items-center rounded-full bg-ink text-invert">
            <Send className="size-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

function ScreenExtras() {
  const rows = [
    {
      icon: Activity,
      title: "Blood Glucose",
      meta: "92 mg/dL · fasting",
      color: "text-glucose bg-glucose/15",
    },
    {
      icon: Thermometer,
      title: "Body Temperature",
      meta: "36.6°C · baseline",
      color: "text-temp bg-temp/20",
    },
    {
      icon: Droplets,
      title: "Blood Oxygen",
      meta: "SpO₂ 98%",
      color: "text-oxy bg-oxy/15",
    },
    {
      icon: Search,
      title: "Respiratory Rate",
      meta: "14 br/min · resting",
      color: "text-primary bg-primary/15",
    },
  ];
  return (
    <div className="absolute inset-0 flex flex-col bg-[#eef2f6] pt-12">
      <header className="px-5 pt-2">
        <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">
          Today
        </p>
        <h3 className="font-display mt-1 text-2xl font-extrabold">
          Every vital
        </h3>
      </header>
      <div className="mt-3 flex-1 overflow-hidden px-4">
        <div className="space-y-2.5">
          <div className="rounded-[22px] bg-white px-4 py-3 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-wide text-muted uppercase">
                Readings today
              </span>
              <span className="font-display text-lg font-extrabold text-success">
                6
              </span>
            </div>
            <p className="mt-1 text-[12px] text-muted">
              All values within your normal range.
            </p>
          </div>
          {rows.map((r) => (
            <div
              key={r.title}
              className="flex items-center gap-3 rounded-[22px] bg-white px-3 py-3 shadow-card"
            >
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-[16px]",
                  r.color,
                )}
              >
                <r.icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-semibold">{r.title}</div>
                <div className="text-[12px] text-muted">{r.meta}</div>
              </div>
              <Check className="size-4 shrink-0 text-success" />
            </div>
          ))}
          <div className="flex items-center justify-between rounded-[22px] bg-white px-4 py-3 text-[13px] shadow-card">
            <span className="text-muted">Device</span>
            <span className="font-semibold">Health Connect ▾</span>
          </div>
        </div>
      </div>
      <div className="px-4 pb-6">
        <div className="flex min-h-12 items-center justify-center gap-2 rounded-pill bg-ink text-[15px] font-semibold text-invert">
          <span className="grid size-5 place-items-center rounded-full bg-invert/15 text-[11px]">
            ▶
          </span>
          Start
        </div>
      </div>
    </div>
  );
}
