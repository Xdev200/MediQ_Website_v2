import { createFileRoute, Link } from "@tanstack/react-router";
import { Dumbbell } from "lucide-react";
import { LegalPage } from "@/components/site/legal";
import type { LegalSection } from "@/components/site/legal";
import { SUPPORT_EMAIL } from "@/lib/site";

export const Route = createFileRoute("/fitlog/privacy")({
  component: FitLogPrivacyPage,
  head: () => ({
    meta: [
      { title: "FitLog Privacy Policy — MediQ" },
      {
        name: "description",
        content:
          "What the FitLog gym member app collects, what your gym can see, who processes it, and how to delete it.",
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
          FitLog is the member app for gyms that use the BodyMetric dashboard. It is made by MediQ ("we", "us"). This
          policy explains what FitLog collects, why, who can see it, and how you can get it deleted.
        </p>
        <p>
          FitLog uses the same account as the MediQ app. If you also use MediQ, the{" "}
          <Link to="/privacy">MediQ Privacy Policy</Link> covers what MediQ itself collects.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: (
      <>
        <h3>A. Account details</h3>
        <p>
          Your name and email address, when you sign in with an email code or with Google. If you choose Google, we
          receive your name and email from Google, not your Google password.
        </p>
        <h3>B. Profile and body measurements</h3>
        <ul>
          <li>Age, sex, height and your usual weekly active minutes, which you enter when you set up the app.</li>
          <li>Weight and waist circumference, each time you log them.</li>
          <li>
            Figures we calculate from these: BMI, basal metabolic rate, daily energy use, and estimated body fat, lean
            mass and muscle mass.
          </li>
        </ul>
        <h3>C. Workouts and gym activity</h3>
        <ul>
          <li>Exercises, sets, repetitions, weights and duration that you log, and the calories we estimate from them.</li>
          <li>The gym you join, your membership status and your check-ins.</li>
          <li>The gym programs you enrol in and whether each enrolment is paid.</li>
        </ul>
        <h3>D. App activity</h3>
        <p>
          A random install ID, the app version and platform, and which onboarding screens and prompts you saw or tapped
          (for example, a suggestion to try MediQ). These events never include your health data.
        </p>
        <p>
          FitLog does not read Android Health Connect, your location, your contacts or your photos, and it shows no
          advertising.
        </p>
      </>
    ),
  },
  {
    id: "permissions",
    title: "Phone Permissions",
    body: (
      <>
        <ul>
          <li>
            <strong>Camera</strong>: only to scan your gym's QR code to join, switch or check in. The camera image is
            read on your phone and is not stored or sent to us.
          </li>
          <li>
            <strong>Microphone and speech recognition</strong>: only while you log an exercise or your weight by voice.
            Your phone's speech service turns speech into text. On most Android phones that service is provided by
            Google under Google's own privacy policy. We receive the text, never the recording.
          </li>
          <li>
            <strong>Notifications</strong>: for workout reminders. Reminders are scheduled on your phone, not sent from
            our servers.
          </li>
        </ul>
        <p>You can turn each permission off at any time in your phone's settings. The rest of the app keeps working.</p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    body: (
      <ul>
        <li>To show your workouts, measurements and trends in the app.</li>
        <li>To calculate your body figures and calories burned.</li>
        <li>To link you to your gym, record check-ins and enrol you in programs.</li>
        <li>To keep the app working, fix problems and understand which screens help people get started.</li>
      </ul>
    ),
  },
  {
    id: "what-your-gym-sees",
    title: "What Your Gym Can See",
    body: (
      <>
        <p>
          When you join a gym, its owner and trainers can see the following in their BodyMetric dashboard, so they can
          coach you:
        </p>
        <ul>
          <li>Your name, email, membership status and check-ins.</li>
          <li>The workouts you log.</li>
          <li>Your body measurement history: weight, waist, body fat, lean mass and muscle mass.</li>
          <li>The programs you enrol in and their payment status.</li>
        </ul>
        <p>
          A gym sees only members who joined it. If you leave or switch gyms, your old gym no longer receives new data
          from you.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    title: "Payments",
    body: (
      <p>
        Some gym programs are paid. Payment happens inside the Razorpay checkout. Razorpay collects your card, UPI or
        bank details under its own privacy policy. We receive only the order and whether it was paid, never your card or
        bank details.
      </p>
    ),
  },
  {
    id: "service-providers",
    title: "Service Providers",
    body: (
      <>
        <p>We do not sell your data. These companies process it for us, only to run FitLog:</p>
        <ul>
          <li>
            <strong>Amazon Web Services</strong>: sign-in (Amazon Cognito) and our app servers.
          </li>
          <li>
            <strong>Supabase</strong>: the database that stores your profile, workouts, measurements and gym activity.
          </li>
          <li>
            <strong>Razorpay</strong>: payments for paid programs.
          </li>
          <li>
            <strong>Google</strong>: sign-in, if you choose "Continue with Google".
          </li>
        </ul>
        <p>Their servers may be outside India. We may also disclose data when the law requires it.</p>
      </>
    ),
  },
  {
    id: "security",
    title: "Data Storage and Security",
    body: (
      <p>
        Data travels between the app and our servers over encrypted connections (HTTPS). The database only returns your
        own records to you, and only your gym's staff can see the records listed above. Access to the underlying systems
        is limited to the people who run them.
      </p>
    ),
  },
  {
    id: "retention-and-deletion",
    title: "Keeping and Deleting Your Data",
    body: (
      <>
        <p>We keep your data while your account is open.</p>
        <p>To delete your account and all of its data, either:</p>
        <ul>
          <li>open the MediQ app and choose Delete account in its settings, or</li>
          <li>
            email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from the address on your account with the
            subject "Delete my FitLog account".
          </li>
        </ul>
        <p>
          FitLog and MediQ share one account, so deleting it removes your data from both apps. We complete email
          requests within 30 days and confirm by email. Payment records that the law requires us to keep are kept only
          for as long as it requires. You can also ask us for a copy of your data at the same address.
        </p>
      </>
    ),
  },
  {
    id: "age",
    title: "Age Requirement",
    body: <p>FitLog is for people aged 18 and over. We do not knowingly collect data from anyone younger.</p>,
  },
  {
    id: "medical-disclaimer",
    title: "Not Medical Advice",
    body: (
      <p>
        FitLog is not a medical device. Its body figures and calorie numbers are estimates for fitness tracking, not a
        diagnosis. Talk to a doctor before acting on them.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: (
      <p>
        If we change what FitLog collects or who sees it, we will update this page and its date. For a significant
        change, we will also tell you in the app.
      </p>
    ),
  },
  {
    id: "contact-us",
    title: "Contact Us",
    body: (
      <p>
        For any question about this policy or your data, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    ),
  },
];

function FitLogPrivacyPage() {
  return (
    <LegalPage
      title="FitLog Privacy Policy"
      updated="November 10, 2026"
      lead="What the FitLog gym app collects, what your gym can see, and how to delete it."
      icon={Dumbbell}
      wash="from-wash to-wash-lilac"
      sections={SECTIONS}
    />
  );
}
