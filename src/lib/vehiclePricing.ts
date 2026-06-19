export type VehicleType = "sedan" | "bakkie" | "panel-van" | "minibus-taxi" | "truck";
export type Coverage = "decals" | "partial" | "full";

export const VEHICLE_LABELS: Record<VehicleType, string> = {
  sedan: "Sedan / hatchback",
  bakkie: "Bakkie",
  "panel-van": "Panel van",
  "minibus-taxi": "Minibus taxi",
  truck: "Truck (rigid body)",
};

// Base full-wrap cost in Rand by vehicle size — reflects real vinyl + labor scaling
const FULL_WRAP_BASE: Record<VehicleType, number> = {
  sedan: 6800,
  bakkie: 8200,
  "panel-van": 9600,
  "minibus-taxi": 7400,
  truck: 18500,
};

const COVERAGE_MULTIPLIER: Record<Coverage, number> = {
  decals: 0.12,
  partial: 0.45,
  full: 1,
};

export type FinishType = "matte" | "gloss" | "chrome-accent";

const FINISH_SURCHARGE: Record<FinishType, number> = {
  matte: 0,
  gloss: 0,
  "chrome-accent": 1450,
};

export const FINISH_LABELS: Record<FinishType, string> = {
  matte: "Matte vinyl",
  gloss: "Gloss vinyl",
  "chrome-accent": "Chrome accent trim",
};

export interface VehicleJobConfig {
  vehicleType: VehicleType;
  coverage: Coverage;
  finish: FinishType;
  fleetSize: number;
}

export interface VehiclePriceBreakdown {
  baseCost: number;
  finishSurcharge: number;
  perVehicleCost: number;
  fleetDiscountRate: number;
  fleetDiscount: number;
  total: number;
}

export function calculateVehiclePrice(config: VehicleJobConfig): VehiclePriceBreakdown {
  const baseCost = FULL_WRAP_BASE[config.vehicleType] * COVERAGE_MULTIPLIER[config.coverage];
  const finishSurcharge = FINISH_SURCHARGE[config.finish];
  const perVehicleCost = baseCost + finishSurcharge;

  const fleetDiscountRate =
    config.fleetSize >= 10 ? 0.18 : config.fleetSize >= 5 ? 0.1 : config.fleetSize >= 2 ? 0.05 : 0;
  const subtotal = perVehicleCost * config.fleetSize;
  const fleetDiscount = subtotal * fleetDiscountRate;
  const total = subtotal - fleetDiscount;

  return { baseCost, finishSurcharge, perVehicleCost, fleetDiscountRate, fleetDiscount, total };
}
