import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { LegalPage } from "@/components/site/legal";
import type { LegalSection } from "@/components/site/legal";
import { SUPPORT_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — MediQ" },
      {
        name: "description",
        content: "How MediQ collects, stores and protects your health data, and the controls you have over it.",
      },
    ],
  }),
});

const SECTIONS: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    body: (
      <>
        <p>
          Welcome to MediQ. We are committed to protecting your personal health information and your privacy. This
          Privacy Policy explains how we collect, use, store, and share information when you use the MediQ mobile
          application (the "App") and our website.
        </p>
        <p>
          By using the App, you consent to the collection and use of information in accordance with this policy. If you
          do not agree with the terms of this Privacy Policy, please do not access or use the App.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: (
      <>
        <p>
          To provide you with personalized health tracking and AI insights, we may collect the following categories of
          information:
        </p>
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
          Nutrition data, including food descriptions, logged meals, estimated macros (proteins, fats, carbs), calories,
          and micronutrient tracking. If you use our voice logging feature, we process temporary voice recordings to
          transcribe and analyze the meal details.
        </p>
        <h3>C. Personal Profile Details</h3>
        <p>
          Details such as age, gender, height, weight, activity levels, and health goals to configure health algorithms,
          calculate BMR/TDEE targets, and personalize AI insights.
        </p>
        <h3>D. Device and Technical Information</h3>
        <p>
          Device identification tokens, operating system versions, app version details, usage logs, and diagnostics.
          This helps us troubleshoot performance issues and improve reliability.
        </p>
      </>
    ),
  },
  {
    id: "wearable-integrations",
    title: "Wearable Integrations & Android Health Connect",
    body: (
      <>
        <p>
          MediQ integrates with <strong>Android Health Connect</strong> and wearable devices to fetch fitness and health
          metrics automatically.
        </p>
        <ul>
          <li>
            <strong>Granular Controls:</strong> You choose which metrics to sync. You can enable or disable permissions
            at any time through your device's settings menu.
          </li>
          <li>
            <strong>Data Handling Restrictions:</strong> Any data retrieved from Health Connect or other wearable
            integrations is used solely to display metrics on your dashboard, perform trend analysis, and generate AI
            insights. We do not sell or lease this data to advertisers or third-party brokers.
          </li>
          <li>
            <strong>Google Play Developer Policy Compliance:</strong> Our use of information received from Health
            Connect adheres strictly to the Health Connect Permissions Policy, including the Limited Use requirements.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-your-information",
    title: "How We Use Your Information",
    body: (
      <>
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
      </>
    ),
  },
  {
    id: "data-storage-and-security",
    title: "Data Storage and Security",
    body: (
      <>
        <p>We prioritize the security of your health information:</p>
        <ul>
          <li>
            <strong>Local Storage:</strong> Your health records and credentials can be stored securely on your device.
          </li>
          <li>
            <strong>Cloud Backup & Sync:</strong> If you use our cloud sync service, your data is transferred using
            end-to-end encryption (TLS/HTTPS) and stored on secure cloud databases.
          </li>
          <li>
            <strong>Access Restrictions:</strong> Administrative access to the underlying database structures is heavily
            restricted and monitored.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-sharing-and-disclosure",
    title: "Data Sharing and Disclosure",
    body: (
      <>
        <p>We do not share your health data with any third parties except in the following limited situations:</p>
        <ul>
          <li>
            <strong>With Your Consent:</strong> If you explicitly authorize sharing (for example, with a family member
            or doctor).
          </li>
          <li>
            <strong>Service Providers:</strong> Secure sub-processors assisting us with essential app services (e.g.,
            transcription API for voice-based macro logging). These partners are legally bound to protect your data and
            are prohibited from using it for any other purpose.
          </li>
          <li>
            <strong>Legal Requirements:</strong> If required by law, court order, or governmental authority to protect
            safety or property.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-rights-and-choices",
    title: "Your Rights and Choices",
    body: (
      <>
        <p>You have full ownership of your health profile. You can:</p>
        <ul>
          <li>Review and edit your logs, height, weight, and age settings directly inside the App.</li>
          <li>Export your stored metrics at any time in standard formats (such as CSV or JSON).</li>
          <li>
            Request permanent deletion of your account and all associated cloud-synced health data by contacting us at
            the support email provided below.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "contact-us",
    title: "Contact Us",
    body: (
      <>
        <p>If you have any questions or feedback regarding this Privacy Policy, please contact us at:</p>
        <p>
          <strong>Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </p>
      </>
    ),
  },
];

function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 8, 2026"
      lead="How MediQ collects, stores and protects your health data — and the control you keep over it."
      icon={ShieldCheck}
      wash="from-wash to-wash-lilac"
      sections={SECTIONS}
    />
  );
}
