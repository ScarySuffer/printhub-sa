export type SignageMaterial = "coreflute" | "acm" | "acrylic" | "aluminium";
export type MountType = "wall-mounted" | "freestanding" | "hanging" | "vehicle-magnetic";

export const SIGNAGE_MATERIAL_LABELS: Record<SignageMaterial, string> = {
  coreflute: "Coreflute (budget, short-term)",
  acm: "3mm ACM board",
  acrylic: "Acrylic (premium finish)",
  aluminium: "Aluminium composite",
};

// Cost per square meter in Rand
const MATERIAL_RATE_PER_SQM: Record<SignageMaterial, number> = {
  coreflute: 380,
  acm: 720,
  acrylic: 980,
  aluminium: 1150,
};

const MOUNT_COST: Record<MountType, number> = {
  "wall-mounted": 0,
  freestanding: 850,
  hanging: 450,
  "vehicle-magnetic": 320,
};

export const MOUNT_LABELS: Record<MountType, string> = {
  "wall-mounted": "Wall mounted",
  freestanding: "Freestanding with base",
  hanging: "Hanging bracket",
  "vehicle-magnetic": "Vehicle magnetic",
};

export interface SignageJobConfig {
  widthMm: number;
  heightMm: number;
  material: SignageMaterial;
  mount: MountType;
  quantity: number;
  doubleSided: boolean;
}

export interface SignagePriceBreakdown {
  areaSqm: number;
  materialCost: number;
  mountCost: number;
  doubleSidedSurcharge: number;
  perUnitCost: number;
  total: number;
}

export function calculateSignagePrice(config: SignageJobConfig): SignagePriceBreakdown {
  const areaSqm = (config.widthMm / 1000) * (config.heightMm / 1000);
  const materialCost = areaSqm * MATERIAL_RATE_PER_SQM[config.material];
  const mountCost = MOUNT_COST[config.mount];
  const doubleSidedSurcharge = config.doubleSided ? materialCost * 0.7 : 0;

  const perUnitCost = materialCost + mountCost + doubleSidedSurcharge;
  const total = perUnitCost * config.quantity;

  return { areaSqm, materialCost, mountCost, doubleSidedSurcharge, perUnitCost, total };
}
