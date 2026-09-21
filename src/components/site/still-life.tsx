import { PLAY_STORE } from "@/lib/site";

export function StillLife() {
  return (
    <section id="download" className="scroll-mt-24 overflow-hidden px-6 pt-10 pb-24 text-center">
      <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-extrabold">Start your health journey</h2>
      <p className="mx-auto mt-4 max-w-xl text-lg font-normal text-muted">
        Join thousands of users who have transformed how they track and understand their bodies.
      </p>
      <a
        href="https://play.google.com/store/apps/details?id=com.mediq.health&hl=en"
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex min-h-12 items-center rounded-pill bg-ink px-8 py-3.5 text-base font-bold text-invert hover:bg-black"
      >
        Download Free
      </a>

      <div className="relative mx-auto mt-12 h-[420px] max-w-5xl">
        <img
          src="/media/sleep_tracking.png"
          alt=""
          className="float-b absolute top-8 left-[4%] hidden h-40 w-28 rounded-lg object-cover shadow-card md:block"
        />
        <img
          src="/media/hydration.png"
          alt=""
          className="float-a absolute top-4 right-[8%] hidden h-36 w-28 rounded-lg object-cover shadow-card md:block"
        />
        <img
          src="/media/lab.png"
          alt=""
          className="float-b absolute bottom-6 left-[10%] hidden h-32 w-40 rounded-lg object-cover shadow-card md:block"
        />
        <img
          src="/media/diet.png"
          alt=""
          className="float-a absolute right-[6%] bottom-8 hidden h-36 w-28 rounded-lg object-cover shadow-card md:block"
        />

        <div className="absolute top-6 left-1/2 w-[240px] -translate-x-[70%] rounded-[36px] bg-ink p-2 shadow-device">
          <div className="rounded-[28px] bg-bg p-4 text-left">
            <div className="text-xs font-semibold">Today, March 12</div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <Ring n="40" l="Stress" c="var(--color-strain)" />
              <Ring n="84" l="Recovery" c="var(--color-success)" />
              <Ring n="92" l="Sleep" c="var(--color-hrv)" />
            </div>
            <p className="mt-4 text-[11px] leading-snug text-muted">Good morning, Alex</p>
          </div>
        </div>
        <div className="float-b absolute top-[160px] left-1/2 w-[130px] -translate-x-[-30%] rounded-[32px] bg-black p-2 shadow-device">
          <div className="rounded-[24px] bg-[#111] py-5 text-center text-white">
            <div className="text-[10px] opacity-60">10:09</div>
            <div className="mt-2 font-display text-2xl font-extrabold text-success">84</div>
            <div className="text-[10px] opacity-60">Recovery</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ring({ n, l, c }: { n: string; l: string; c: string }) {
  return (
    <div>
      <div className="mx-auto grid size-12 place-items-center rounded-full border-4" style={{ borderColor: c }}>
        <span className="font-display text-sm font-bold">{n}</span>
      </div>
      <div className="mt-1 text-[10px] text-muted">{l}</div>
    </div>
  );
}
