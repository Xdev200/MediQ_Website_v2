import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/footer";
import { SiteNav } from "@/components/site/nav";
import { SUPPORT_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteNav />
      <div className="relative mx-auto max-w-[800px] px-6 pt-28 pb-24">
        <header className="mb-8 rounded-xl border border-border bg-surface px-6 py-12 text-center shadow-card">
          <h1 className="font-display text-[clamp(2rem,5vw,2.75rem)] font-extrabold">Terms of Service</h1>
          <p className="mt-3 text-sm font-medium text-muted">Last Updated: June 8, 2026</p>
        </header>
        <main className="rounded-xl border border-border bg-surface px-6 py-10 shadow-card md:px-12 md:py-12">
          <LegalBlock title="1. Acceptance of Terms">
            <p>
              By downloading, installing, or using the MediQ mobile application (the "App") or our website, you agree
              to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use or
              access the App.
            </p>
            <p>
              We reserve the right to modify or replace these Terms at any time. We will notify you of any material
              changes by updating the "Last Updated" date at the top of these Terms and, if you have registered, sending
              a notification within the App.
            </p>
          </LegalBlock>

          <LegalBlock title="2. Medical Disclaimer (Critical Information)">
            <p className="rounded-sm border-l-4 border-danger bg-danger/5 p-4 text-fg">
              <strong>WARNING:</strong> MediQ is a health tracking and AI informational tool. It is <strong>NOT</strong>{" "}
              a medical device and is not intended to diagnose, treat, prevent, or manage any medical condition or
              disease. The content, metrics, charts, and AI-generated insights provided by the App are for general
              informational and motivational purposes only. Always consult a qualified medical professional before
              making any changes to your treatment plan, medication, diet, or exercise routine. Do not ignore
              professional medical advice because of information you read in the App.
            </p>
          </LegalBlock>

          <LegalBlock title="3. Eligibility and User Accounts">
            <p>
              You must be at least 18 years of age, or the age of legal majority in your jurisdiction, to use the App.
              If you create an account in the App:
            </p>
            <ul>
              <li>
                You agree to provide accurate, complete, and up-to-date profile details (height, weight, age, etc.).
              </li>
              <li>
                You are responsible for maintaining the confidentiality of your account credentials and for all
                activities that occur under your account.
              </li>
              <li>You must notify us immediately of any unauthorized use of your account or security breaches.</li>
            </ul>
          </LegalBlock>

          <LegalBlock title="4. Use of the App & License">
            <p>
              We grant you a personal, non-exclusive, non-transferable, revocable license to use the App on your mobile
              device for personal, non-commercial purposes, subject to these Terms.
            </p>
            <p>
              You agree <strong>NOT</strong> to:
            </p>
            <ul>
              <li>Decompile, reverse engineer, disassemble, or attempt to derive the source code of the App.</li>
              <li>
                Use the App in any manner that could disable, damage, or impair our services or interfere with other
                users' enjoyment.
              </li>
              <li>Input false, misleading, or harmful data.</li>
              <li>
                Use any automated scraping, data mining, or indexing tools to extract content from the App or website.
              </li>
            </ul>
          </LegalBlock>

          <LegalBlock title="5. Integrations & Wearable Data">
            <p>
              The App allows synchronization with third-party tracking software (such as Android Health Connect) and
              personal medical devices (glucometers, blood pressure monitors, etc.).
            </p>
            <ul>
              <li>
                We are not responsible for the accuracy or completeness of data sent by third-party hardware, sensors,
                or external applications.
              </li>
              <li>
                Your use of third-party integration platforms is governed by the respective terms and privacy policies
                of those services.
              </li>
            </ul>
          </LegalBlock>

          <LegalBlock title="6. Intellectual Property">
            <p>
              All intellectual property rights in the App, including its visual design, UI layouts, icons, logo, text
              content, algorithms, and code, are owned by MediQ or our licensors. You may not copy, replicate,
              distribute, or create derivative works of any part of our platform without prior written consent.
            </p>
          </LegalBlock>

          <LegalBlock title="7. Limitation of Liability">
            <p>
              To the maximum extent permitted by applicable law, MediQ, its directors, employees, or partners, shall not
              be liable for any indirect, incidental, special, consequential, or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul>
              <li>Your access to or use of (or inability to access or use) the App.</li>
              <li>Any errors or omissions in health calculations, macro calculations, or AI insights.</li>
              <li>Unauthorized access, use, or alteration of your transmissions or health records.</li>
              <li>
                Any physical injury, health complication, or medical emergency arising from your reliance on App metrics
                or AI recommendations.
              </li>
            </ul>
          </LegalBlock>

          <LegalBlock title="8. Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of your local jurisdiction,
              without regard to its conflict of law provisions.
            </p>
          </LegalBlock>

          <LegalBlock title="9. Contact Us">
            <p>If you have any questions, feedback, or complaints regarding these Terms, please contact us at:</p>
            <p>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-primary">
                {SUPPORT_EMAIL}
              </a>
            </p>
          </LegalBlock>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}

function LegalBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-9 last:mb-0 [&_h3]:mt-5 [&_h3]:mb-2.5 [&_h3]:font-display [&_h3]:text-base [&_h3]:font-semibold [&_li]:mb-2 [&_li]:text-[15px] [&_li]:leading-relaxed [&_p]:mb-4 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:font-normal [&_p]:text-muted [&_strong]:text-fg [&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:text-muted">
      <h2 className="mb-4 border-b-2 border-primary/10 pb-2 font-display text-[22px] font-bold">{title}</h2>
      {children}
    </section>
  );
}
