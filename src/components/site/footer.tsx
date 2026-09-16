import { Link } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { SUPPORT_EMAIL } from "@/lib/site";
import { scrollToHash } from "@/lib/smooth-anchor";

function onHashClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
  if (scrollToHash(href)) e.preventDefault();
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface px-6 pt-16 pb-10">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <img src="/icon.png" alt="" className="mb-3 size-10 rounded-md" />
          <div className="font-display text-[22px] font-extrabold tracking-tight">MediQ</div>
          <p className="mt-2 max-w-[260px] text-sm leading-relaxed font-normal text-muted">
            Your AI-powered personal health companion. Track vitals, nutrition, sleep, and activity — all in one app.
          </p>
        </div>
        <div>
          <h2 className="mb-4 font-display text-[13px] font-bold tracking-[0.08em] text-muted uppercase">Product</h2>
          <ul className="flex flex-col gap-2.5 text-[15px] font-normal">
            <li>
              <a href="/#metrics" onClick={(e) => onHashClick(e, "/#metrics")} className="hover:text-muted">
                Metrics
              </a>
            </li>
            <li>
              <a href="/#features" onClick={(e) => onHashClick(e, "/#features")} className="hover:text-muted">
                Features
              </a>
            </li>
            <li>
              <a href="/#how-it-works" onClick={(e) => onHashClick(e, "/#how-it-works")} className="hover:text-muted">
                How It Works
              </a>
            </li>
            <li>
              <a href="/#download" onClick={(e) => onHashClick(e, "/#download")} className="hover:text-muted">
                Download
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-display text-[13px] font-bold tracking-[0.08em] text-muted uppercase">
            Health Tracking
          </h2>
          <ul className="flex flex-col gap-2.5 text-[15px] font-normal">
            <li>
              <a href="/#metrics" onClick={(e) => onHashClick(e, "/#metrics")} className="hover:text-muted">
                Vitals
              </a>
            </li>
            <li>
              <a href="/#features" onClick={(e) => onHashClick(e, "/#features")} className="hover:text-muted">
                Nutrition
              </a>
            </li>
            <li>
              <a href="/#features" onClick={(e) => onHashClick(e, "/#features")} className="hover:text-muted">
                Sleep
              </a>
            </li>
            <li>
              <a href="/#features" onClick={(e) => onHashClick(e, "/#features")} className="hover:text-muted">
                Activity
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-4 font-display text-[13px] font-bold tracking-[0.08em] text-muted uppercase">Support</h2>
          <ul className="flex flex-col gap-2.5 text-[15px] font-normal">
            <li>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-muted">
                Contact Us
              </a>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-muted">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-muted">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-5xl border-t border-border pt-7 text-[13px] font-normal text-muted">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <span>© 2026 MediQ. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-fg">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-fg">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
