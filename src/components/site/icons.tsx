import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Check,
  Download,
  Droplets,
  Footprints,
  Heart,
  Moon,
  Salad,
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
};

export const stepIcons: Record<string, LucideIcon> = {
  download: Download,
  profile: User,
  connect: Smartphone,
  optimize: Activity,
};

export { Check, Droplets, Heart, Moon, Salad, Footprints };
