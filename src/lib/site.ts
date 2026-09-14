export const PLAY_STORE =
  "https://play.google.com/store/apps/details?id=com.mediq.health";
export const SUPPORT_EMAIL = "taqnikin@gmail.com";

export const NAV = [
  { href: "/#metrics", label: "Metrics" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
] as const;

export const METRICS = [
  {
    name: "Steps & Activity",
    desc: "Daily movement tracking, step goals, and active energy expenditure.",
    color: "var(--color-steps)",
    icon: "steps",
  },
  {
    name: "Sleep Stages",
    desc: "Deep, REM, and light sleep analysis with an overall quality score.",
    color: "var(--color-sleep)",
    icon: "sleep",
  },
  {
    name: "Heart Rate",
    desc: "Continuous resting and active heart rate tracking.",
    color: "var(--color-heart)",
    icon: "heart",
  },
  {
    name: "HRV & Stress",
    desc: "Heart rate variability analysis to measure recovery and stress.",
    color: "var(--color-hrv)",
    icon: "hrv",
  },
  {
    name: "Nutrition",
    desc: "AI-powered voice logging for precise macro and micronutrients.",
    color: "var(--color-cal)",
    icon: "nutrition",
  },
  {
    name: "Blood Glucose",
    desc: "Fasting and post-meal glucose trends for metabolic health.",
    color: "var(--color-glucose)",
    icon: "glucose",
  },
  {
    name: "Body Temperature",
    desc: "Baseline deviations and fever detection algorithms.",
    color: "var(--color-temp)",
    icon: "temp",
  },
  {
    name: "Blood Oxygen",
    desc: "SpO₂ tracking for respiratory health monitoring.",
    color: "var(--color-oxy)",
    icon: "oxygen",
  },
] as const;

export const FEATURE_POINTS_NUTRITION = [
  "Instant macro & calorie breakdown",
  "Voice-powered recognition",
  "Personalized dietary insights",
] as const;

export const FEATURE_POINTS_INTEGRATION = [
  "Android Health Connect sync",
  "Wearable device compatibility",
  "Manual entry for legacy devices",
] as const;

export const FEATURE_POINTS_AI = [
  "Correlation analysis (e.g. sleep vs. HRV)",
  "Generative AI health summaries",
  "Predictive trend alerts",
] as const;

export const STEPS = [
  {
    n: "1",
    title: "Download",
    desc: "Get the app for free from the Google Play Store. No subscription required for core features.",
    icon: "download",
  },
  {
    n: "2",
    title: "Profile",
    desc: "Answer a few questions about your baseline metrics and health goals.",
    icon: "profile",
  },
  {
    n: "3",
    title: "Connect",
    desc: "Sync with Health Connect or your wearable device to import historical data.",
    icon: "connect",
  },
  {
    n: "4",
    title: "Optimize",
    desc: "Let the AI analyze your data and start receiving personalized recommendations.",
    icon: "optimize",
  },
] as const;
