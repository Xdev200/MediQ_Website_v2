import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const THOUGHTS = [
  "Reviewing your recent recovery signals",
  "Analyzing sleep, strain, and HRV trends",
  "Looking for possible causes of fatigue",
  "Preparing insights and recommendations",
];

export function Intelligence() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-28 text-center text-white">
      <div aria-hidden className="spot pointer-events-none absolute top-0 left-1/2 h-[420px] w-[520px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(6,7,249,0.45),transparent_70%)]" />
      <div className="relative mx-auto flex max-w-xl items-end justify-center gap-8 sm:gap-14">
        <Blob className="blob-a" color="#3d4460" label="Recovery" eyes="uu" />
        <Blob className="blob-b mb-6" color="#e8c9a8" label="Coach" halo eyes="oo" />
        <Blob className="blob-c" color="#2f6b5a" label="Analyst" eyes="==" />
      </div>
      <h2 className="relative mt-14 font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold">
        Understand your body
      </h2>
      <p className="relative mx-auto mt-4 max-w-[36ch] text-lg font-normal text-white/60">
        We don't just show you graphs. Our AI analyzes your correlations and gives you plain-English insights on how
        your lifestyle affects your biometrics.
      </p>
    </section>
  );
}

function Blob({
  className,
  color,
  label,
  halo,
  eyes,
}: {
  className: string;
  color: string;
  label: string;
  halo?: boolean;
  eyes: string;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative">
        {halo ? (
          <span className="absolute -top-3 left-1/2 h-3 w-10 -translate-x-1/2 rounded-full border-2 border-white/70" />
        ) : null}
        <div
          className="grid size-24 place-items-center rounded-[40%] shadow-device sm:size-28"
          style={{ background: color }}
        >
          <span className="font-display text-2xl tracking-widest text-white/90">{eyes}</span>
        </div>
      </div>
      <span className="mt-3 rounded-pill bg-white/10 px-3 py-1 text-xs font-semibold">{label}</span>
    </div>
  );
}

export function ChatDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timers = [900, 1800, 2800, 3800, 5200].map((t, i) => window.setTimeout(() => setStep(i + 1), t));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="grid items-center gap-10 overflow-hidden bg-linear-to-b from-wash to-wash-lilac px-6 py-24 lg:grid-cols-2 lg:px-16">
      <div className="mx-auto max-w-md">
        <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold">Get answers from your data</h2>
        <p className="mt-4 text-lg font-normal leading-relaxed text-muted">
          Ask questions about your health and get answers grounded in your own metrics.
        </p>
      </div>
      <div className="relative mx-auto w-[300px]">
        <div className="rounded-[42px] bg-ink p-2.5 shadow-device">
          <div className="relative h-[540px] overflow-hidden rounded-[34px] bg-bg px-4 pt-10">
            <div className="absolute top-3 left-1/2 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
            <div className="text-center text-xs font-semibold">Following up on rest</div>
            {step >= 1 ? (
              <div className="mt-4 ml-auto max-w-[85%] rounded-lg bg-primary px-3 py-2 text-[13px] text-white">
                I'm feeling not rested today. What happened?
              </div>
            ) : null}
            {step >= 2 && step < 4 ? (
              <ul className="mt-4 space-y-2 text-[12px] text-muted">
                {THOUGHTS.map((t, i) => (
                  <li key={t} className="flex items-center gap-2" style={{ opacity: step >= 2 ? 1 : 0.4 }}>
                    <span className="think-dot size-1.5 rounded-full bg-primary" style={{ animationDelay: `${i * 0.15}s` }} />
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
            {step >= 4 ? (
              <div className="mt-4 rounded-md bg-surface p-3 text-[13px] leading-relaxed font-normal shadow-card">
                <Check className="mb-2 size-4 text-success" />
                Your recovery score is trending up. The 7h 20m of sleep you had last night significantly improved your
                HRV baseline.
              </div>
            ) : null}
            {step >= 5 ? (
              <div className="sheet-in absolute inset-x-3 bottom-3 rounded-lg bg-surface p-4 shadow-device">
                <div className="mb-2 text-xs font-bold tracking-wide uppercase">Sources you can trust</div>
                <ol className="space-y-2 text-[12px] font-normal text-muted">
                  <li>1. Your sleep duration and quality score</li>
                  <li>2. Heart rate variability and resting HR logs</li>
                  <li>3. Daily steps and active minutes</li>
                </ol>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
