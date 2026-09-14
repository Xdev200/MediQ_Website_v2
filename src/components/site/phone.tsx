import { Droplets, Flame, Footprints, Heart, Moon } from "lucide-react";

export function HeroPhone() {
  return (
    <div className="relative mx-auto h-[520px] w-full max-w-[720px]">
      <div className="float-a absolute top-0 left-1/2 w-[280px] -translate-x-[58%] rounded-[42px] bg-ink p-2.5 shadow-device md:w-[300px]">
        <div className="relative overflow-hidden rounded-[34px] bg-bg">
          <div className="absolute top-3 left-1/2 z-10 h-[22px] w-24 -translate-x-1/2 rounded-[12px] bg-black" />
          <div className="px-4 pt-9 pb-4">
            <div className="mb-2 text-center text-xs font-semibold">9:41</div>
            <div className="mb-3 flex items-center justify-between">
              <strong className="text-sm">Today, March 12</strong>
              <span className="grid size-7 place-items-center rounded-full bg-card text-[11px] font-semibold">AL</span>
            </div>
            <p className="font-display text-base font-bold">Good morning, Alex</p>

            <div className="mt-3 rounded-[20px] bg-surface p-4 shadow-card">
              <div className="text-[11px] font-semibold tracking-wide text-muted uppercase">Recovery Score</div>
              <div className="font-display text-[40px] leading-none font-extrabold">
                84 <span className="align-middle text-sm font-semibold text-success">Good</span>
              </div>
            </div>

            <MetricRow icon={Footprints} color="text-steps" bg="bg-steps/15" label="Daily Steps" value="6,240" badge="/ 10k" />
            <MetricRow icon={Moon} color="text-sleep" bg="bg-sleep/15" label="Sleep Duration" value="7h 20m" badge="Optimal" />
            <MetricRow icon={Heart} color="text-heart" bg="bg-heart/15" label="Resting HR" value="58 bpm" />
          </div>
        </div>
      </div>

      <div className="float-b absolute top-[210px] right-[6%] hidden w-44 rounded-[42px] bg-ink p-2.5 shadow-device sm:block">
        <div className="h-[190px] rounded-[32px] bg-black px-3 py-4 text-center text-invert">
          <div className="text-xs font-semibold">10:09</div>
          <div className="mt-1 text-[13px] opacity-70">March 12</div>
          <div className="mt-4 flex justify-around font-display text-xl font-bold">
            <span>40</span>
            <span className="text-success">84</span>
            <span className="text-hrv">92</span>
          </div>
          <div className="mt-2 text-[11px] opacity-70">Stress & Energy</div>
        </div>
      </div>

      <div className="float-b absolute top-[18%] left-0 hidden items-center gap-3 rounded-md border border-border bg-surface/90 px-3 py-2.5 text-[13px] font-semibold shadow-card backdrop-blur lg:flex">
        <span className="grid size-7 place-items-center rounded-sm bg-oxy/15 text-oxy">
          <Droplets className="size-3.5" />
        </span>
        Hydration: 1.2L / 2L
      </div>
      <div className="float-a absolute top-[58%] right-0 hidden items-center gap-3 rounded-md border border-border bg-surface/90 px-3 py-2.5 text-[13px] font-semibold shadow-card backdrop-blur lg:flex">
        <span className="grid size-7 place-items-center rounded-sm bg-cal/15 text-cal">
          <Flame className="size-3.5" />
        </span>
        Calories: 1,850 kcal
      </div>
    </div>
  );
}

function MetricRow({
  icon: Icon,
  color,
  bg,
  label,
  value,
  badge,
}: {
  icon: typeof Heart;
  color: string;
  bg: string;
  label: string;
  value: string;
  badge?: string;
}) {
  return (
    <div className="mt-2 flex items-center gap-3 rounded-md bg-surface px-3 py-2.5 shadow-card">
      <span className={`grid size-9 place-items-center rounded-md ${bg} ${color}`}>
        <Icon className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-medium text-muted">{label}</div>
        <div className="font-display text-lg leading-tight font-extrabold">{value}</div>
      </div>
      {badge ? <span className={`rounded-sm px-2 py-1 text-[10px] font-bold ${bg} ${color}`}>{badge}</span> : null}
    </div>
  );
}
