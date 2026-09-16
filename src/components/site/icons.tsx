import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Check,
  Download,
  Droplets,
  Dumbbell,
  Flame,
  Footprints,
  Heart,
  HeartPulse,
  Moon,
  Salad,
  Scale,
  Smartphone,
  Syringe,
  Thermometer,
  User,
  Wind,
} from "lucide-react";

export const metricIcons: Record<string, LucideIcon> = {
  steps: Footprints,
  sleep: Moon,
  heart: Heart,
  hrv: Activity,
  nutrition: Salad,
  glucose: Syringe,
  temp: Thermometer,
  oxygen: Wind,
  bp: HeartPulse,
  composition: Scale,
  metabolic: Flame,
  workout: Dumbbell,
};

export const stepIcons: Record<string, LucideIcon> = {
  download: Download,
  profile: User,
  connect: Smartphone,
  optimize: Activity,
};

export { Check, Droplets, Heart, Moon, Salad, Footprints };
