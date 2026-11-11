import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { LegalPage } from "@/components/site/legal";
import type { LegalSection } from "@/components/site/legal";
import { SUPPORT_EMAIL } from "@/lib/site";

/**
 * The account-deletion page Google Play links to from FitLog's store listing
 * (Data safety → "Delete account URL"). Play requires it to name the app,
 * give the steps, and say what is deleted and what is kept, for how long.
 * Keep it in step with apps/gym-member/src/services/accountDeletionService.ts
 * in the mediQ repo and the delete_user_account_data() database function.
 */
export const Route = createFileRoute("/fitlog/delete-account")({
  component: FitLogDeleteAccountPage,
  head: () => ({
    meta: [
      { title: "Delete your FitLog account — MediQ" },
      {
        name: "description",
        content:
          "How to delete your FitLog account and data, in the app or by email, and what is deleted and kept.",
      },
    ],
  }),
});

const SUBJECT = "Delete my FitLog account";
const MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;

const SECTIONS: LegalSection[] = [
  {
    id: "overview",
    title: "Deleting Your Account",
    body: (
      <>
        <p>
          This page explains how to delete your account in <strong>FitLog</strong>, the gym member app made by MediQ
          (Google Play: <code className="rounded bg-black/5 px-1.5 py-0.5 text-[14px] text-fg">com.mediq.fitlog</code>), and what happens to your data.
        </p>
        <p>
          You can delete your account in the app, which takes a few seconds, or ask us by email if you no longer have
          the app. Either way, deletion is permanent and cannot be undone.
        </p>
        <p>
          FitLog uses the same account as the MediQ app. Deleting it removes your data from <strong>both</strong> apps.
        </p>
      </>
    ),
  },
  {
    id: "in-the-app",
    title: "Delete in the FitLog App",
    body: (
      <>
        {/* LegalBlock styles ul only; Tailwind's preflight strips ol numbering. */}
        <ol className="mb-4 ml-5 list-decimal text-muted">
          <li>Open FitLog and sign in.</li>
          <li>
            Tap the <strong>Profile</strong> tab.
          </li>
          <li>
            Scroll to the bottom and tap <strong>Delete account</strong>.
          </li>
          <li>
            Read the confirmation and tap <strong>Delete account</strong> again.
          </li>
        </ol>
        <p>
          The app stays locked while your data is deleted. When it finishes, you are signed out and see "Account
          deleted". Your data is removed straight away.
        </p>
        <p>
          <strong>Signed in with Google?</strong> For your security, the app may ask you to sign in again before it
          deletes your account. Nothing is deleted until you do.
        </p>
        <p>
          <strong>Own a gym?</strong> An account that owns a gym on the BodyMetric dashboard can't be deleted in the
          app, because that would also delete the gym and its members' records. Email us and we'll help you hand the gym
          over or close it first.
        </p>
      </>
    ),
  },
  {
    id: "by-email",
    title: "Delete Without the App",
    body: (
      <>
        <p>
          Email <a href={MAILTO}>{SUPPORT_EMAIL}</a> from the email address you use to sign in to FitLog, with the
          subject "{SUBJECT}".
        </p>
        <p>
          We send the request from that address only, so we know it's yours. If you write from a different address, we
          will ask you to confirm from the one on your account. We complete requests within 30 days and confirm by
          email when it's done.
        </p>
        <p>
          <strong>Just some of your data?</strong> To delete particular records, such as your weight history, without
          closing your account, email us at the same address and tell us what to remove.
        </p>
      </>
    ),
  },
  {
    id: "what-is-deleted",
    title: "What Is Deleted",
    body: (
      <>
        <ul>
          <li>Your account and sign-in, including the link to your Google account if you used Google.</li>
          <li>Your profile: name, email, age, sex, height and activity level.</li>
          <li>
            Every weight and waist measurement, and the figures calculated from them (BMI, body fat, lean mass, muscle
            mass, metabolic rate).
          </li>
          <li>Every workout you logged and the calories calculated for it.</li>
          <li>Your gym membership, check-ins and join requests. Your gym no longer sees you in its dashboard.</li>
          <li>Your program enrolments, including their payment status.</li>
          <li>Your settings, notification history and app activity linked to your account.</li>
          <li>Workout reminders on the phone you delete from.</li>
          <li>If you use MediQ with the same account: all of your MediQ health data and uploaded files.</li>
        </ul>
      </>
    ),
  },
  {
    id: "what-is-kept",
    title: "What Is Kept, and for How Long",
    body: (
      <>
        <ul>
          <li>
            <strong>Backups:</strong> our database's automatic backups taken before your deletion may still contain
            your data until they expire, within 30 days. They are encrypted, and we don't restore from them to bring
            back deleted accounts.
          </li>
          <li>
            <strong>Payments:</strong> if you paid for a gym program, Razorpay keeps its own record of that payment, as
            payment law requires, under{" "}
            <a href="https://razorpay.com/privacy/" target="_blank" rel="noreferrer">
              Razorpay's privacy policy
            </a>
            . We keep no copy.
          </li>
          <li>
            <strong>Shared gym content:</strong> any exercise or program you added to a gym's shared list stays for
            that gym, with your name removed.
          </li>
        </ul>
        <p>Nothing else from your account is kept.</p>
      </>
    ),
  },
  {
    id: "more",
    title: "More About Your Data",
    body: (
      <p>
        The <Link to="/fitlog/privacy">FitLog Privacy Policy</Link> explains what FitLog collects, who can see it, and
        who processes it for us. For any question, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
      </p>
    ),
  },
];

function FitLogDeleteAccountPage() {
  return (
    <LegalPage
      title="Delete Your FitLog Account"
      updated="November 11, 2026"
      lead="How to delete your FitLog account and data, and exactly what is removed."
      icon={Trash2}
      wash="from-wash to-wash-lilac"
      sections={SECTIONS}
    />
  );
}
