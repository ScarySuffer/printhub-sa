"use client";

import { useState, useMemo } from "react";
import {
  VehicleType,
  Coverage,
  FinishType,
  VEHICLE_LABELS,
  FINISH_LABELS,
  calculateVehiclePrice,
} from "@/lib/vehiclePricing";
import { PROVIDERS } from "@/data/providers";
import { QuotePanel, formatRand } from "@/components/QuotePanel";
import { FieldLabel, OptionButton } from "@/components/OrderFormPrimitives";

const VEHICLE_OPTIONS: VehicleType[] = ["sedan", "bakkie", "panel-van", "minibus-taxi", "truck"];
const COVERAGE_OPTIONS: { value: Coverage; label: string; description: string }[] = [
  { value: "decals", label: "Decals only", description: "Logo + contact details" },
  { value: "partial", label: "Partial wrap", description: "Doors, bonnet or rear panel" },
  { value: "full", label: "Full wrap", description: "Entire vehicle body" },
];
const FINISH_OPTIONS: FinishType[] = ["matte", "gloss", "chrome-accent"];

export function VehicleBrandingCalculator() {
  const [vehicleType, setVehicleType] = useState<VehicleType>("bakkie");
  const [coverage, setCoverage] = useState<Coverage>("full");
  const [finish, setFinish] = useState<FinishType>("matte");
  const [fleetSize, setFleetSize] = useState(1);

  const breakdown = useMemo(
    () => calculateVehiclePrice({ vehicleType, coverage, finish, fleetSize }),
    [vehicleType, coverage, finish, fleetSize]
  );

  const matchedProviders = useMemo(
    () =>
      PROVIDERS.filter((p) => p.capabilities.includes("vehicle-branding"))
        .sort((a, b) => a.leadTimeDays - b.leadTimeDays)
        .slice(0, 3),
    []
  );

  const lineItems = [
    { label: "Base + finish (per vehicle)", value: formatRand(breakdown.perVehicleCost) },
    { label: `Fleet subtotal (×${fleetSize})`, value: formatRand(breakdown.perVehicleCost * fleetSize) },
    ...(breakdown.fleetDiscount > 0
      ? [{ label: `Fleet discount (${Math.round(breakdown.fleetDiscountRate * 100)}%)`, value: formatRand(breakdown.fleetDiscount), isDiscount: true }]
      : []),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
      <div className="space-y-8">
        <div>
          <FieldLabel step={1}>Vehicle type</FieldLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {VEHICLE_OPTIONS.map((type) => (
              <OptionButton key={type} active={vehicleType === type} onClick={() => setVehicleType(type)}>
                {VEHICLE_LABELS[type]}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <FieldLabel step={2}>Coverage</FieldLabel>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {COVERAGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setCoverage(opt.value)}
                className={`border rule py-3 px-4 text-left transition-colors ${
                  coverage === opt.value
                    ? "bg-signal text-ink border-signal"
                    : "text-stock-dim hover:border-stock"
                }`}
              >
                <div className="font-body text-sm font-medium">{opt.label}</div>
                <div className={`font-mono text-[10px] mt-1 ${coverage === opt.value ? "text-ink/70" : "text-board"}`}>
                  {opt.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <FieldLabel step={3}>Finish</FieldLabel>
          <div className="grid grid-cols-3 gap-2">
            {FINISH_OPTIONS.map((f) => (
              <OptionButton key={f} active={finish === f} onClick={() => setFinish(f)}>
                {FINISH_LABELS[f]}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <FieldLabel step={4} hint="2+ vehicles unlocks fleet discount">
            Fleet size
          </FieldLabel>
          <input
            type="number"
            min={1}
            value={fleetSize}
            onChange={(e) => setFleetSize(Math.max(1, Number(e.target.value) || 1))}
            className="w-full max-w-xs border rule bg-ink-raised text-stock font-mono text-lg px-4 py-3 focus:border-signal outline-none"
          />
        </div>
      </div>

      <QuotePanel
        total={breakdown.total}
        subLabel={`${formatRand(breakdown.total / fleetSize)} per vehicle · ${fleetSize} vehicle${fleetSize === 1 ? "" : "s"}`}
        lineItems={lineItems}
        matchedProviders={matchedProviders}
        checkoutHref="/checkout?service=vehicle-branding"
      />
    </div>
  );
}
