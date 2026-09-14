import type { ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter } from "@/components/site/footer";
import { SiteNav } from "@/components/site/nav";
import { SUPPORT_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg">
      <SiteNav />
      <div className="relative mx-auto max-w-[800px] px-6 pt-28 pb-24">
        <header className="mb-8 rounded-xl border border-border bg-surface px-6 py-12 text-center shadow-card">
          <h1 className="font-display text-[clamp(2rem,5vw,2.75rem)] font-extrabold">Privacy Policy</h1>
          <p className="mt-3 text-sm font-medium text-muted">Last Updated: June 8, 2026</p>
        </header>
        <main className="rounded-xl border border-border bg-surface px-6 py-10 shadow-card md:px-12 md:py-12">
          <LegalBlock title="1. Introduction">
            <p>
              Welcome to MediQ. We are committed to protecting your personal health information and your privacy. This
              Privacy Policy explains how we collect, use, store, and share information when you use the MediQ mobile
              application (the "App") and our website.
            </p>
            <p>
              By using the App, you consent to the collection and use of information in accordance with this policy. If
              you do not agree with the terms of this Privacy Policy, please do not access or use the App.
            </p>
          </LegalBlock>

          <LegalBlock title="2. Information We Collect">
            <p>To provide you with personalized health tracking and AI insights, we may collect the following categories of information:</p>
            <h3>A. Health and Vital Sign Data</h3>
            <p>This includes health metrics you log manually or choose to import through integrations, such as:</p>
            <ul>
              <li>Step counts, distance, active minutes, and calorie burn.</li>
              <li>Sleep duration, sleep cycles, and quality score.</li>
              <li>Heart rate, resting heart rate, and heart rate variability (HRV).</li>
              <li>Blood pressure, blood glucose, and oxygen saturation (SpO₂).</li>
              <li>Body temperature, weight, body fat, muscle mass, and BMI.</li>
            </ul>
            <h3>B. Nutrition Logs</h3>
            <p>
              Nutrition data, including food descriptions, logged meals, estimated macros (proteins, fats, carbs),
              calories, and micronutrient tracking. If you use our voice logging feature, we process temporary voice
              recordings to transcribe and analyze the meal details.
            </p>
            <h3>C. Personal Profile Details</h3>
            <p>
              Details such as age, gender, height, weight, activity levels, and health goals to configure health
              algorithms, calculate BMR/TDEE targets, and personalize AI insights.
            </p>
            <h3>D. Device and Technical Information</h3>
            <p>
              Device identification tokens, operating system versions, app version details, usage logs, and diagnostics.
              This helps us troubleshoot performance issues and improve reliability.
            </p>
          </LegalBlock>

          <LegalBlock title="3. Wearable Integrations & Android Health Connect">
            <p>MediQ integrates with <strong>Android Health Connect</strong> and wearable devices to fetch fitness and health metrics automatically.</p>
            <ul>
              <li>
                <strong>Granular Controls:</strong> You choose which metrics to sync. You can enable or disable
                permissions at any time through your device's settings menu.
              </li>
              <li>
                <strong>Data Handling Restrictions:</strong> Any data retrieved from Health Connect or other wearable
                integrations is used solely to display metrics on your dashboard, perform trend analysis, and generate
                AI insights. We do not sell or lease this data to advertisers or third-party brokers.
              </li>
              <li>
                <strong>Google Play Developer Policy Compliance:</strong> Our use of information received from Health
                Connect adheres strictly to the Health Connect Permissions Policy, including the Limited Use
                requirements.
              </li>
            </ul>
          </LegalBlock>

          <LegalBlock title="4. How We Use Your Information">
            <p>We use the collected data for the following purposes:</p>
            <ul>
              <li>To display and organize your health metrics on your personal dashboard.</li>
              <li>To compute personalized BMR, TDEE, BMI, and Health Scores.</li>
              <li>
                To generate AI-powered insights, spotting weekly or monthly health trends and recommending action plans
                (e.g., activity distribution).
              </li>
              <li>To support core safety features such as your emergency SOS alert triggers.</li>
              <li>To monitor application performance, fix crashes, and release security updates.</li>
            </ul>
          </LegalBlock>

          <LegalBlock title="5. Data Storage and Security">
            <p>We prioritize the security of your health information:</p>
            <ul>
              <li>
                <strong>Local Storage:</strong> Your health records and credentials can be stored securely on your
                device.
              </li>
              <li>
                <strong>Cloud Backup & Sync:</strong> If you use our cloud sync service, your data is transferred using
                end-to-end encryption (TLS/HTTPS) and stored on secure cloud databases.
              </li>
              <li>
                <strong>Access Restrictions:</strong> Administrative access to the underlying database structures is
                heavily restricted and monitored.
              </li>
            </ul>
          </LegalBlock>

          <LegalBlock title="6. Data Sharing and Disclosure">
            <p>We do not share your health data with any third parties except in the following limited situations:</p>
            <ul>
              <li>
                <strong>With Your Consent:</strong> If you explicitly authorize sharing (for example, with a family
                member or doctor).
              </li>
              <li>
                <strong>Service Providers:</strong> Secure sub-processors assisting us with essential app services
                (e.g., transcription API for voice-based macro logging). These partners are legally bound to protect
                your data and are prohibited from using it for any other purpose.
              </li>
              <li>
                <strong>Legal Requirements:</strong> If required by law, court order, or governmental authority to
                protect safety or property.
              </li>
            </ul>
          </LegalBlock>

          <LegalBlock title="7. Your Rights and Choices">
            <p>You have full ownership of your health profile. You can:</p>
            <ul>
              <li>Review and edit your logs, height, weight, and age settings directly inside the App.</li>
              <li>Export your stored metrics at any time in standard formats (such as CSV or JSON).</li>
              <li>
                Request permanent deletion of your account and all associated cloud-synced health data by contacting us
                at the support email provided below.
              </li>
            </ul>
          </LegalBlock>

          <LegalBlock title="8. Contact Us">
            <p>If you have any questions or feedback regarding this Privacy Policy, please contact us at:</p>
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
