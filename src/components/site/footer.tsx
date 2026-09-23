import { Link } from "@tanstack/react-router";
import type { MouseEvent } from "react";
import { SUPPORT_EMAIL } from "@/lib/site";
import { scrollToHash } from "@/lib/smooth-anchor";

function onHashClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
  if (scrollToHash(href)) e.preventDefault();
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface px-6 pt-14 pb-10 md:pt-16">
      <div className="mx-auto grid max-w-content gap-8 text-center md:grid-cols-[2fr_1fr_1fr] md:gap-10 md:text-left">
        <div>
          <img src="/icon.png" alt="" className="mx-auto mb-3 size-10 rounded-md md:mx-0" />
          <div className="font-display text-[22px] font-extrabold tracking-tight">MediQ</div>
          <p className="mx-auto mt-2 max-w-[260px] text-sm leading-relaxed font-normal text-muted md:mx-0">
            Your AI-powered personal health companion. Track vitals, nutrition, sleep, and activity — all in one app.
          </p>
        </div>
        <div>
          <h2 className="eyebrow font-display text-muted">Product</h2>
          <ul className="flex flex-col gap-2.5 text-[15px] font-normal">
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
              <a href="https://play.google.com/store/apps/details?id=com.mediq.health&hl=en" target="_blank" className="hover:text-muted">
                Download
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h2 className="eyebrow font-display text-muted">Support</h2>
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
      <div className="mx-auto mt-12 max-w-content border-t border-border pt-7 text-[13px] font-normal text-muted">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <span>© 2026 MediQ. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
