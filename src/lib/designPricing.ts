export type DesignDeliverable =
  | "logo"
  | "business-stationery"
  | "brochure-layout"
  | "social-media-pack"
  | "full-brand-identity";

export const DESIGN_DELIVERABLE_LABELS: Record<DesignDeliverable, string> = {
  logo: "Logo design",
  "business-stationery": "Business stationery set",
  "brochure-layout": "Brochure / flyer layout",
  "social-media-pack": "Social media template pack",
  "full-brand-identity": "Full brand identity",
};

const BASE_FEE: Record<DesignDeliverable, number> = {
  logo: 1800,
  "business-stationery": 1400,
  "brochure-layout": 2200,
  "social-media-pack": 1900,
  "full-brand-identity": 7500,
};

export type RevisionRounds = 1 | 2 | 3 | "unlimited";

const REVISION_SURCHARGE: Record<RevisionRounds, number> = {
  1: 0,
  2: 350,
  3: 650,
  unlimited: 1400,
};

export const REVISION_LABELS: Record<string, string> = {
  "1": "1 revision round",
  "2": "2 revision rounds",
  "3": "3 revision rounds",
  unlimited: "Unlimited revisions",
};

export type TurnaroundSpeed = "standard" | "rush";

const RUSH_MULTIPLIER = 1.4;

export interface DesignJobConfig {
  deliverable: DesignDeliverable;
  revisions: RevisionRounds;
  turnaround: TurnaroundSpeed;
}

export interface DesignPriceBreakdown {
  baseFee: number;
  revisionSurcharge: number;
  rushSurcharge: number;
  total: number;
  estimatedDays: number;
}

const BASE_DAYS: Record<DesignDeliverable, number> = {
  logo: 4,
  "business-stationery": 3,
  "brochure-layout": 3,
  "social-media-pack": 4,
  "full-brand-identity": 12,
};

export function calculateDesignPrice(config: DesignJobConfig): DesignPriceBreakdown {
  const baseFee = BASE_FEE[config.deliverable];
  const revisionSurcharge = REVISION_SURCHARGE[config.revisions];
  const subtotal = baseFee + revisionSurcharge;
  const rushSurcharge = config.turnaround === "rush" ? Math.round(subtotal * (RUSH_MULTIPLIER - 1) * 100) / 100 : 0;
  const total = subtotal + rushSurcharge;

  const baseDays = BASE_DAYS[config.deliverable];
  const estimatedDays = config.turnaround === "rush" ? Math.max(1, Math.ceil(baseDays / 2)) : baseDays;

  return { baseFee, revisionSurcharge, rushSurcharge, total, estimatedDays };
}
