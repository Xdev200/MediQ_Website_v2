import type { MouseEvent, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteFooter } from "@/components/site/footer";
import { SiteNav } from "@/components/site/nav";
import { SUPPORT_EMAIL } from "@/lib/site";
import { scrollToHash } from "@/lib/smooth-anchor";

export type LegalSection = {
  /** Anchor target, also used by the sidebar index. */
  id: string;
  title: string;
  body: ReactNode;
};

/**
 * Shared shell for the policy pages: a wash hero in the site's slab language, a
 * sticky index down the left, and the clauses on one surface sheet.
 */
export function LegalPage({
  title,
  updated,
  lead,
  icon: Icon,
  wash,
  sections,
}: {
  title: string;
  updated: string;
  lead: string;
  icon: LucideIcon;
  /** Gradient stops, matching the marketing slabs (e.g. "from-wash to-wash-lilac"). */
  wash: string;
  sections: LegalSection[];
}) {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <SiteNav />

      <header className={`border-b border-black/5 bg-linear-to-b px-6 pt-36 pb-16 text-center md:pb-20 ${wash}`}>
        <span className="mx-auto mb-6 grid size-14 place-items-center rounded-xl border border-border bg-surface text-primary shadow-card">
          <Icon className="size-7" />
        </span>
        <p className="mb-3 text-[13px] font-bold tracking-[0.1em] text-primary uppercase">Legal</p>
        <h1 className="font-display text-[clamp(2.25rem,5vw,3.25rem)] font-extrabold">{title}</h1>
        <p className="mx-auto mt-4 max-w-[46ch] text-lg leading-relaxed font-normal text-muted">{lead}</p>
        <p className="mt-6 inline-flex rounded-pill border border-border bg-surface/70 px-4 py-2 text-[13px] font-semibold text-muted backdrop-blur">
          Last updated {updated}
        </p>
      </header>

      <div className="mx-auto grid w-full max-w-[1120px] gap-10 px-6 py-16 md:py-20 lg:grid-cols-[232px_1fr] lg:gap-14">
        <SectionIndex sections={sections} />

        <main className="rounded-xl border border-border bg-surface px-6 py-10 shadow-card md:px-12 md:py-12">
          {sections.map((section, i) => (
            <LegalBlock key={section.id} id={section.id} n={i + 1} title={section.title} first={i === 0}>
              {section.body}
            </LegalBlock>
          ))}

          <div className="mt-12 rounded-lg border border-border bg-linear-to-b from-wash to-wash-blue p-6 text-center">
            <h2 className="font-display text-lg font-bold">Questions or requests?</h2>
            <p className="mx-auto mt-2 max-w-[42ch] text-[15px] font-normal text-muted">
              Write to us — including to export or delete your data — and we will come back to you.
            </p>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-pill bg-ink px-5 text-[15px] font-semibold text-invert transition-opacity hover:opacity-90"
            >
              <Mail className="size-4" />
              {SUPPORT_EMAIL}
            </a>
          </div>
        </main>
      </div>

      <SiteFooter />
    </div>
  );
}

function SectionIndex({ sections }: { sections: LegalSection[] }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (scrollToHash(`${window.location.pathname}#${id}`)) e.preventDefault();
  };

  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-[14px] font-semibold text-muted hover:text-fg">
        <ArrowLeft className="size-4" />
        Back to MediQ
      </Link>
      <p className="mb-4 text-[12px] font-bold tracking-[0.1em] text-muted uppercase">On this page</p>
      <ol className="flex flex-col gap-2.5 border-l border-border pl-4">
        {sections.map((section, i) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => onClick(e, section.id)}
              className="flex gap-2 text-[14px] leading-snug font-medium text-muted transition-colors hover:text-primary"
            >
              <span className="tabular-nums">{i + 1}.</span>
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function LegalBlock({
  id,
  n,
  title,
  first,
  children,
}: {
  id: string;
  n: number;
  title: string;
  first: boolean;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 ${first ? "" : "mt-10 border-t border-border pt-10"} [&_a]:font-medium [&_a]:text-primary [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-display [&_h3]:text-[15px] [&_h3]:font-bold [&_h3]:text-fg [&_li]:mb-2.5 [&_li]:text-[15px] [&_li]:leading-[1.7] [&_li]:marker:text-primary/60 [&_p]:mb-4 [&_p]:text-[15px] [&_p]:leading-[1.7] [&_p]:font-normal [&_p]:text-muted [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-fg [&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:text-muted`}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="font-display grid size-8 shrink-0 place-items-center rounded-md bg-primary/12 text-[14px] font-bold text-primary">
          {n}
        </span>
        <h2 className="font-display text-[21px] font-bold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

/** Pulls a clause out of the run of text — used for the medical disclaimer. */
export function LegalCallout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-4 rounded-lg border border-danger/20 bg-danger/5 p-5">
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-danger" />
      <div className="[&_p]:mb-0 [&_p]:text-[15px] [&_p]:leading-[1.7] [&_p]:text-fg">{children}</div>
    </div>
  );
}
