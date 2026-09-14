import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Download, Menu, X } from "lucide-react";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed top-4 right-0 left-0 z-50 flex justify-center px-4">
      <nav
        className="pointer-events-auto flex w-full max-w-xl items-center justify-between gap-3 rounded-pill border border-white/70 bg-surface/80 px-2 py-1.5 shadow-card backdrop-blur-xl md:w-auto md:justify-center md:gap-5 md:px-2.5"
        aria-label="Primary"
      >
        <Link to="/" className="flex items-center gap-2 rounded-md px-2 py-1">
          <img src="/icon.png" alt="" className="size-8 rounded-[10px]" />
          <span className="font-display text-[1.05rem] font-extrabold tracking-tight">MediQ</span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-[15px] font-medium text-muted transition-colors hover:text-fg">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#download"
          className="hidden items-center gap-2 rounded-pill bg-ink px-4 py-2 text-sm font-medium text-invert transition-colors hover:bg-black md:inline-flex"
        >
          <Download className="size-3.5" strokeWidth={2.4} />
          Get the App
        </a>

        <button
          type="button"
          className="mr-1 inline-flex size-11 items-center justify-center rounded-md md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "pointer-events-auto absolute top-16 right-4 left-4 rounded-lg border border-border bg-surface p-4 shadow-card transition-[opacity,transform] duration-200 ease-[var(--ease-out-smooth)] md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <ul className="flex flex-col gap-1">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex min-h-11 items-center rounded-md px-3 text-[15px] font-medium"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/#download"
              className="mt-2 flex min-h-11 items-center justify-center rounded-pill bg-ink text-sm font-medium text-invert"
              onClick={() => setOpen(false)}
            >
              Get the App
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
