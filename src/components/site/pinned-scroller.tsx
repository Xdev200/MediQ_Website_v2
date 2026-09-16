import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Check,
  ChevronRight,
  Copy,
  Droplets,
  FileText,
  Menu,
  Mic,
  Plus,
  Search,
  Send,
  Thermometer,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PhoneFrame } from "@/components/site/phone";

const PANELS = [
  {
    title: "Get answers from your data",
    body: "Ask questions about your health and get answers grounded in your own metrics.",
    bullets: [] as { title: string; desc: string }[],
    bg: "linear-gradient(180deg, #eef2f8 0%, #e4dff6 100%)",
  },
  {
    title: "Generative AI health summaries",
    body: "Our AI analyzes your correlations and gives you plain-English insights on how your lifestyle affects your biometrics.",
    bullets: [] as { title: string; desc: string }[],
    bg: "linear-gradient(180deg, #f3eef8 0%, #e8dcf6 100%)",
  },
  {
    title: "And that's not all",
    body: "MediQ also tracks the following:",
    bullets: [
      { title: "Blood Glucose", desc: "Fasting and post-meal glucose trends for metabolic health." },
      { title: "Body Temperature", desc: "Baseline deviations and fever detection algorithms." },
      { title: "Blood Oxygen", desc: "SpO₂ tracking for respiratory health monitoring." },
    ],
    bg: "linear-gradient(180deg, #eef6f8 0%, #dce8f6 100%)",
  },
] as const;

type LenisLike = { on: (e: string, fn: () => void) => void; off: (e: string, fn: () => void) => void };

export function PinnedPhoneScroller() {
  const trackRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Array<HTMLElement | null>>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      const line = window.innerHeight * 0.42;
      let idx = 0;
      let prog = 0;
      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line) {
          idx = i;
          prog = Math.min(1, Math.max(0, (line - rect.top) / rect.height));
        }
      });
      setActive((prev) => (prev === idx ? prev : idx));
      setProgress(prog);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
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
      unsub?.();
      window.clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={trackRef} className="relative w-full bg-ink">
      <div className="pointer-events-none sticky top-16 z-20 h-[calc(100svh-4rem)] lg:top-[4.75rem] lg:h-[calc(100vh-4.75rem)]">
        <div className="relative h-full w-full">
          <div className="absolute bottom-3 left-1/2 h-[min(560px,62svh)] w-[min(300px,78vw)] -translate-x-1/2 lg:top-[2%] lg:right-[3vw] lg:bottom-[2%] lg:left-auto lg:h-auto lg:w-[min(420px,36vw)] lg:translate-x-0">
            <IPhone screen={active} progress={progress} />
          </div>
        </div>
      </div>

      <div className="-mt-[calc(100svh-4rem)] w-full lg:-mt-[calc(100vh-4.75rem)]">
        {PANELS.map((panel, i) => (
          <article
            key={panel.title}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className={cn(
              "relative flex w-full min-h-[100svh] flex-col justify-center px-6 pt-20 pb-[min(68svh,580px)] md:px-12 lg:px-[5vw] lg:pb-24",
              i > 0 && "rounded-t-[40px] shadow-[0_-24px_60px_rgba(0,0,0,0.12)]",
              i < PANELS.length - 1 && "rounded-b-[40px]",
            )}
            style={{ background: panel.bg }}
          >
            <div
              className={cn(
                "w-full max-w-none transition-opacity duration-150 lg:max-w-[38rem]",
                active === i ? "opacity-100" : "opacity-50",
              )}
            >
              <h2 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.98] font-extrabold tracking-[-0.04em]">
                {panel.title}
              </h2>
              <p className="mt-5 w-full max-w-[46ch] text-lg font-normal leading-relaxed text-muted">{panel.body}</p>
              {panel.bullets.length ? (
                <ul className="mt-6 w-full max-w-xl space-y-3">
                  {panel.bullets.map((b) => (
                    <li key={b.title} className="rounded-lg bg-white/70 px-4 py-3 backdrop-blur">
                      <div className="font-display text-base font-bold">{b.title}</div>
                      <p className="mt-1 text-sm font-normal text-muted">{b.desc}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function IPhone({ screen, progress }: { screen: number; progress: number }) {
  return (
    <PhoneFrame className="h-full w-full">
      <StatusBar />
      <ScreenChat show={screen === 0} progress={screen === 0 ? progress : 0} />
      <ScreenSources show={screen === 1} progress={screen === 1 ? progress : 0} />
      <ScreenExtras show={screen === 2} progress={screen === 2 ? progress : 0} />
      <span
        key={screen}
        className="scan-flourish pointer-events-none absolute inset-x-3 top-0 z-40 h-[3px] rounded-full bg-linear-to-r from-transparent via-primary-bright to-transparent opacity-0 blur-[1px]"
      />
      <div className="absolute bottom-2 left-1/2 z-30 h-[5px] w-32 -translate-x-1/2 rounded-full bg-black/80" />
    </PhoneFrame>
  );
}

function StatusBar() {
  return (
    <div className="absolute inset-x-0 top-0 z-20 flex h-12 items-end justify-between px-7 pb-1 text-[12px] font-semibold">
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden>
          <rect x="0" y="7" width="3" height="5" rx="0.5" fill="currentColor" />
          <rect x="4.5" y="4" width="3" height="8" rx="0.5" fill="currentColor" />
          <rect x="9" y="1" width="3" height="11" rx="0.5" fill="currentColor" />
          <rect x="13.5" y="0" width="2.5" height="12" rx="0.5" fill="currentColor" opacity="0.35" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden>
          <path d="M1 8.5c3.2-3.8 10.8-3.8 14 0" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3.6 10c2.2-2.4 6.6-2.4 8.8 0" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8" cy="11.2" r="0.9" fill="currentColor" />
        </svg>
        <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden>
          <rect x="0.5" y="1" width="22" height="10" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <rect x="2" y="2.4" width="16" height="7.2" rx="1.4" fill="currentColor" />
          <rect x="23.2" y="4" width="2" height="4" rx="0.6" fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}

function ScreenChat({ show, progress }: { show: boolean; progress: number }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col pt-12",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <header className="flex items-center justify-between px-4 py-2">
        <span className="grid size-8 place-items-center rounded-full bg-white shadow-card">
          <Menu className="size-4" />
        </span>
        <div className="flex items-center gap-1 rounded-pill bg-white px-2.5 py-1 text-[11px] font-semibold shadow-card">
          <span className="grid size-5 place-items-center rounded-full bg-primary/15 text-[10px]">✦</span>
          Following up on rest
        </div>
        <span className="grid size-8 place-items-center rounded-full bg-white shadow-card">
          <X className="size-4" />
        </span>
      </header>

      <div className="flex-1 overflow-hidden px-4 pt-3">
        <div style={{ transform: `translateY(${-progress * 110}px)` }}>
          <div className="ml-auto max-w-[82%] rounded-[18px] rounded-br-sm bg-[#7eb6ff] px-3.5 py-2.5 text-[13px] leading-snug font-medium text-white">
            I'm feeling not rested today. What happened?
          </div>

          <p className="mt-4 text-[11px] font-medium text-muted">Thought for 16 seconds</p>
          <ul className="mt-2 space-y-1.5 text-[12px] text-muted">
            {[
              { icon: Search, t: "Reviewing your recent recovery signals" },
              { icon: FileText, t: "Analyzing sleep, strain, and HRV trends" },
              { icon: FileText, t: "Preparing insights and possible causes" },
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

          <p className="mt-4 text-[13px] leading-relaxed font-normal text-fg">
            Your recovery score is trending up. The 7h 20m of sleep you had last night significantly improved your
            HRV baseline.
          </p>

          <div className="mt-4 flex gap-3 pb-16 text-muted">
            <Copy className="size-4" />
            <ThumbsUp className="size-4" />
            <ThumbsDown className="size-4" />
          </div>
        </div>
      </div>

      <div className="px-3 pt-2 pb-5">
        <div className="flex items-center gap-2 rounded-pill bg-white px-2 py-1.5 shadow-card">
          <span className="grid size-8 place-items-center rounded-full bg-card">
            <Plus className="size-4" />
          </span>
          <span className="flex-1 text-[13px] text-muted">Ask MediQ anything</span>
          <Mic className="size-4 text-muted" />
          <span className="grid size-8 place-items-center rounded-full bg-ink text-invert">
            <Send className="size-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

function ScreenSources({ show, progress }: { show: boolean; progress: number }) {
  const sheetTop = 52 - progress * 16;
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col pt-12",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <header className="flex items-center justify-between px-4 py-2">
        <span className="grid size-8 place-items-center rounded-full bg-white shadow-card">
          <Menu className="size-4" />
        </span>
        <div className="flex items-center gap-1 rounded-pill bg-white px-2.5 py-1 text-[11px] font-semibold shadow-card">
          <span className="grid size-5 place-items-center rounded-full bg-primary/15 text-[10px]">✦</span>
          Sleep analysis
        </div>
        <span className="grid size-8 place-items-center rounded-full bg-white shadow-card">
          <X className="size-4" />
        </span>
      </header>

      <div className="px-4 pt-3 text-[13px] leading-relaxed text-muted">
        Over the last few days, recovery signals have been shorter and less frequent than what your body typically
        responds best to. While you’re still getting recovery signals from 7h 20m of sleep.
      </div>

      <div
        className="absolute inset-x-3 bottom-3 rounded-[28px] bg-white p-4 shadow-device"
        style={{ top: `${sheetTop}%` }}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-fg/15" />
        <div className="mb-4 flex items-center justify-between">
          <span className="grid size-8 place-items-center rounded-full bg-card">
            <X className="size-4" />
          </span>
          <h3 className="text-sm font-semibold">Sources</h3>
          <span className="w-8" />
        </div>
        <ol className="space-y-4">
          <li className="flex gap-3">
            <span className="w-4 text-sm font-semibold text-muted">1</span>
            <div>
              <p className="text-[13px] leading-snug font-semibold">Sleep Duration 7h 20m — Optimal quality score</p>
              <p className="mt-1 text-[12px] text-primary">Your sleep log</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="w-4 text-sm font-semibold text-muted">2</span>
            <div>
              <p className="text-[13px] leading-snug font-semibold">Heart rate variability and resting HR 58 bpm</p>
              <p className="mt-1 text-[12px] text-muted">Correlation analysis (e.g. sleep vs. HRV)</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="w-4 text-sm font-semibold text-muted">3</span>
            <div>
              <p className="text-[13px] leading-snug font-semibold">Daily Steps 6,240 and active minutes</p>
              <p className="mt-1 text-[12px] text-muted">Health Connect</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}

function ScreenExtras({ show, progress }: { show: boolean; progress: number }) {
  const rows = [
    { icon: Activity, title: "Blood Glucose", meta: "92 mg/dL · fasting", color: "text-glucose bg-glucose/15" },
    { icon: Thermometer, title: "Body Temperature", meta: "36.6°C · baseline", color: "text-temp bg-temp/20" },
    { icon: Droplets, title: "Blood Oxygen", meta: "SpO₂ 98%", color: "text-oxy bg-oxy/15" },
  ];
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col bg-[#eef2f6] pt-12",
        show ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <header className="px-5 pt-2">
        <p className="text-[11px] font-semibold tracking-wide text-muted uppercase">Today</p>
        <h3 className="font-display mt-1 text-2xl font-extrabold">Every vital</h3>
      </header>
      <div className="mt-4 flex-1 overflow-hidden px-4">
        <div
          className="space-y-2.5"
          style={{ transform: `translateY(${-progress * 90}px)` }}
        >
          {rows.map((r) => (
            <div key={r.title} className="flex items-center gap-3 rounded-[22px] bg-white px-3 py-3 shadow-card">
              <span className={cn("grid size-11 place-items-center rounded-[16px]", r.color)}>
                <r.icon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-semibold">{r.title}</div>
                <div className="text-[12px] text-muted">{r.meta}</div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-[22px] bg-white px-4 py-3 text-[13px] shadow-card">
            <span className="text-muted">Device</span>
            <span className="font-semibold">Health Connect ▾</span>
          </div>
          <div className="h-16" />
        </div>
      </div>
      <div className="px-4 pb-6">
        <div className="flex min-h-12 items-center justify-center gap-2 rounded-pill bg-ink text-[15px] font-semibold text-invert">
          <span className="grid size-5 place-items-center rounded-full bg-invert/15 text-[11px]">▶</span>
          Start
        </div>
      </div>
    </div>
  );
}
