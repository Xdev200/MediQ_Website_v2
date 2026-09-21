import { createFileRoute } from "@tanstack/react-router";
import { ScrollText } from "lucide-react";
import { LegalCallout, LegalPage } from "@/components/site/legal";
import type { LegalSection } from "@/components/site/legal";
import { SUPPORT_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Service — MediQ" },
      {
        name: "description",
        content: "The terms that apply when you use the MediQ app and website, including the medical disclaimer.",
      },
    ],
  }),
});

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    body: (
      <>
        <p>
          By downloading, installing, or using the MediQ mobile application (the "App") or our website, you agree to be
          bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use or access the
          App.
        </p>
        <p>
          We reserve the right to modify or replace these Terms at any time. We will notify you of any material changes
          by updating the "Last Updated" date at the top of these Terms and, if you have registered, sending a
          notification within the App.
        </p>
      </>
    ),
  },
  {
    id: "medical-disclaimer",
    title: "Medical Disclaimer (Critical Information)",
    body: (
      <LegalCallout>
        <p>
          <strong>WARNING:</strong> MediQ is a health tracking and AI informational tool. It is <strong>NOT</strong> a
          medical device and is not intended to diagnose, treat, prevent, or manage any medical condition or disease.
          The content, metrics, charts, and AI-generated insights provided by the App are for general informational and
          motivational purposes only. Always consult a qualified medical professional before making any changes to your
          treatment plan, medication, diet, or exercise routine. Do not ignore professional medical advice because of
          information you read in the App.
        </p>
      </LegalCallout>
    ),
  },
  {
    id: "eligibility-and-accounts",
    title: "Eligibility and User Accounts",
    body: (
      <>
        <p>
          You must be at least 18 years of age, or the age of legal majority in your jurisdiction, to use the App. If
          you create an account in the App:
        </p>
        <ul>
          <li>You agree to provide accurate, complete, and up-to-date profile details (height, weight, age, etc.).</li>
          <li>
            You are responsible for maintaining the confidentiality of your account credentials and for all activities
            that occur under your account.
          </li>
          <li>You must notify us immediately of any unauthorized use of your account or security breaches.</li>
        </ul>
      </>
    ),
  },
  {
    id: "use-of-the-app",
    title: "Use of the App & License",
    body: (
      <>
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
            Use the App in any manner that could disable, damage, or impair our services or interfere with other users'
            enjoyment.
          </li>
          <li>Input false, misleading, or harmful data.</li>
          <li>
            Use any automated scraping, data mining, or indexing tools to extract content from the App or website.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "integrations-and-wearables",
    title: "Integrations & Wearable Data",
    body: (
      <>
        <p>
          The App allows synchronization with third-party tracking software (such as Android Health Connect) and
          personal medical devices (glucometers, blood pressure monitors, etc.).
        </p>
        <ul>
          <li>
            We are not responsible for the accuracy or completeness of data sent by third-party hardware, sensors, or
            external applications.
          </li>
          <li>
            Your use of third-party integration platforms is governed by the respective terms and privacy policies of
            those services.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: (
      <p>
        All intellectual property rights in the App, including its visual design, UI layouts, icons, logo, text content,
        algorithms, and code, are owned by MediQ or our licensors. You may not copy, replicate, distribute, or create
        derivative works of any part of our platform without prior written consent.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    body: (
      <>
        <p>
          To the maximum extent permitted by applicable law, MediQ, its directors, employees, or partners, shall not be
          liable for any indirect, incidental, special, consequential, or punitive damages, including without
          limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
        </p>
        <ul>
          <li>Your access to or use of (or inability to access or use) the App.</li>
          <li>Any errors or omissions in health calculations, macro calculations, or AI insights.</li>
          <li>Unauthorized access, use, or alteration of your transmissions or health records.</li>
          <li>
            Any physical injury, health complication, or medical emergency arising from your reliance on App metrics or
            AI recommendations.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    body: (
      <p>
        These Terms shall be governed by and construed in accordance with the laws of your local jurisdiction, without
        regard to its conflict of law provisions.
      </p>
    ),
  },
  {
    id: "contact-us",
    title: "Contact Us",
    body: (
      <>
        <p>If you have any questions, feedback, or complaints regarding these Terms, please contact us at:</p>
        <p>
          <strong>Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </p>
      </>
    ),
  },
];

function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="June 8, 2026"
      lead="The rules that apply when you use the MediQ app and website."
      icon={ScrollText}
      wash="from-wash to-wash-blue"
      sections={SECTIONS}
    />
  );
}
