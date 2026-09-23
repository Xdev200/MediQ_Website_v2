const TILES = [
  {
    src: "/media/gym.png",
    alt: "Ride recovery",
    overlay: { title: "Activity", a: "6,240", al: "Steps", b: "84", bl: "Recovery" },
  },
  {
    src: "/media/diet.png",
    alt: "Morning nutrition",
    overlay: { title: "Nutrition", a: "520", al: "kcal", b: "48g", bl: "Protein" },
  },
  {
    src: "/media/lab.png",
    alt: "Outdoor training",
    overlay: { title: "Heart Rate", a: "58", al: "Resting", b: "92", bl: "HRV" },
  },
  {
    src: "/media/hydration.png",
    alt: "Hydration",
    overlay: { title: "Hydration", a: "1.2L", al: "Today", b: "2L", bl: "Goal" },
  },
  {
    src: "/media/sleep_tracking.png",
    alt: "Recovery routine",
    overlay: { title: "Sleep", a: "7h 20m", al: "Duration", b: "Optimal", bl: "Quality" },
  },
] as const;

export function ScreenshotMarquee() {
  const loop = [...TILES, ...TILES];
  return (
    <section className="overflow-hidden py-10">
      <div className="marquee-track flex w-max gap-4 px-4">
        {loop.map((t, i) => (
          <figure
            key={`${t.src}-${i}`}
            className="relative h-[420px] w-[260px] shrink-0 overflow-hidden rounded-[28px] bg-card"
          >
            <img src={t.src} alt={t.alt} className="h-full w-full object-cover" />
            <figcaption className="absolute inset-x-4 bottom-4 rounded-lg bg-ink/80 p-4 text-invert backdrop-blur">
              <div className="text-[11px] font-semibold tracking-wide uppercase opacity-70">{t.overlay.title}</div>
              <div className="mt-2 flex justify-between font-display text-xl font-extrabold">
                <span>
                  {t.overlay.a}
                  <span className="mt-0.5 block text-[11px] font-medium opacity-70">{t.overlay.al}</span>
                </span>
                <span>
                  {t.overlay.b}
                  <span className="mt-0.5 block text-[11px] font-medium opacity-70">{t.overlay.bl}</span>
                </span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function PhotoMosaic() {
  const imgs = TILES;
  return (
    /* pb-3 clears the +10px translate on the odd tiles: they are bottom-aligned, so
       without it overflow-hidden shaves their lower edge. */
    <div className="relative mx-auto mb-8 flex h-32 max-w-content items-end justify-center gap-2 overflow-hidden pb-3 sm:h-40 sm:gap-3 md:h-44">
      {imgs.map((t, i) => (
        <img
          key={t.src}
          src={t.src}
          alt=""
          className="h-20 w-16 rounded-lg object-cover shadow-card sm:h-28 sm:w-24 md:h-36 md:w-28"
          style={{ transform: `translateY(${i % 2 === 0 ? -12 : 10}px)` }}
        />
      ))}
    </div>
  );
}
