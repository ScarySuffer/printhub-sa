export type PaperSize = "A4" | "A3" | "A5" | "DL";
export type ColorMode = "mono" | "color";
export type Binding = "none" | "staple" | "spiral" | "perfect";

export const PAPER_SIZE_LABELS: Record<PaperSize, string> = {
  A4: "A4 (210 × 297mm)",
  A3: "A3 (297 × 420mm)",
  A5: "A5 (148 × 210mm)",
  DL: "DL (99 × 210mm)",
};

// Cost per page in Rand, by size and color mode
const PAGE_RATE: Record<PaperSize, Record<ColorMode, number>> = {
  A4: { mono: 0.45, color: 2.1 },
  A3: { mono: 0.95, color: 4.2 },
  A5: { mono: 0.3, color: 1.4 },
  DL: { mono: 0.28, color: 1.3 },
};

const BINDING_COST: Record<Binding, number> = {
  none: 0,
  staple: 0,
  spiral: 18,
  perfect: 45,
};

export const BINDING_LABELS: Record<Binding, string> = {
  none: "Loose pages",
  staple: "Stapled corner",
  spiral: "Spiral bound",
  perfect: "Perfect bound (booklet)",
};

export interface PrintJobConfig {
  paperSize: PaperSize;
  colorMode: ColorMode;
  pages: number;
  copies: number;
  binding: Binding;
  doubleSided: boolean;
}

export interface PriceBreakdown {
  perCopyPageCost: number;
  pageSubtotal: number;
  bindingSubtotal: number;
  doubleSidedDiscount: number;
  total: number;
  costPerCopy: number;
}

export function calculatePrice(config: PrintJobConfig): PriceBreakdown {
  const rate = PAGE_RATE[config.paperSize][config.colorMode];
  const effectivePages = config.doubleSided
    ? Math.ceil(config.pages / 2)
    : config.pages;

  const perCopyPageCost = effectivePages * rate;
  const pageSubtotal = perCopyPageCost * config.copies;
  const bindingSubtotal = BINDING_COST[config.binding] * config.copies;

  // Volume discount: small nudge for bulk copies, reflecting real print economics
  const volumeDiscountRate =
    config.copies >= 100 ? 0.12 : config.copies >= 50 ? 0.08 : config.copies >= 20 ? 0.04 : 0;
  const doubleSidedDiscount = (pageSubtotal + bindingSubtotal) * volumeDiscountRate;

  const total = pageSubtotal + bindingSubtotal - doubleSidedDiscount;
  const costPerCopy = config.copies > 0 ? total / config.copies : 0;

  return {
    perCopyPageCost,
    pageSubtotal,
    bindingSubtotal,
    doubleSidedDiscount,
    total,
    costPerCopy,
  };
}

export function formatRand(value: number): string {
  return `R${value.toFixed(2)}`;
}
