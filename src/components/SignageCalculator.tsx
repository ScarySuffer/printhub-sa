"use client";

import { useState, useMemo } from "react";
import {
  SignageMaterial,
  MountType,
  SIGNAGE_MATERIAL_LABELS,
  MOUNT_LABELS,
  calculateSignagePrice,
} from "@/lib/signagePricing";
import { PROVIDERS } from "@/data/providers";
import { QuotePanel, formatRand } from "@/components/QuotePanel";
import { FieldLabel, OptionButton } from "@/components/OrderFormPrimitives";

const MATERIAL_OPTIONS: SignageMaterial[] = ["coreflute", "acm", "acrylic", "aluminium"];
const MOUNT_OPTIONS: MountType[] = ["wall-mounted", "freestanding", "hanging", "vehicle-magnetic"];

export function SignageCalculator() {
  const [widthMm, setWidthMm] = useState(1000);
  const [heightMm, setHeightMm] = useState(600);
  const [material, setMaterial] = useState<SignageMaterial>("acm");
  const [mount, setMount] = useState<MountType>("wall-mounted");
  const [quantity, setQuantity] = useState(1);
  const [doubleSided, setDoubleSided] = useState(false);

  const breakdown = useMemo(
    () => calculateSignagePrice({ widthMm, heightMm, material, mount, quantity, doubleSided }),
    [widthMm, heightMm, material, mount, quantity, doubleSided]
  );

  const matchedProviders = useMemo(
    () =>
      PROVIDERS.filter((p) => p.capabilities.includes("signage"))
        .sort((a, b) => a.leadTimeDays - b.leadTimeDays)
        .slice(0, 3),
    []
  );

  const lineItems = [
    { label: "Board area", value: `${breakdown.areaSqm.toFixed(2)} m²` },
    { label: "Material cost (per unit)", value: formatRand(breakdown.materialCost) },
    ...(breakdown.mountCost > 0 ? [{ label: "Mounting hardware", value: formatRand(breakdown.mountCost) }] : []),
    ...(breakdown.doubleSidedSurcharge > 0
      ? [{ label: "Double-sided print", value: formatRand(breakdown.doubleSidedSurcharge) }]
      : []),
    { label: `Per unit × ${quantity}`, value: formatRand(breakdown.perUnitCost * quantity) },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
      <div className="space-y-8">
        <div>
          <FieldLabel step={1}>Dimensions (mm)</FieldLabel>
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div>
              <span className="font-mono text-[10px] text-board block mb-1">Width</span>
              <input
                type="number"
                min={100}
                value={widthMm}
                onChange={(e) => setWidthMm(Math.max(100, Number(e.target.value) || 100))}
                className="w-full border rule bg-ink-raised text-stock font-mono text-lg px-4 py-3 focus:border-signal outline-none"
              />
            </div>
            <div>
              <span className="font-mono text-[10px] text-board block mb-1">Height</span>
              <input
                type="number"
                min={100}
                value={heightMm}
                onChange={(e) => setHeightMm(Math.max(100, Number(e.target.value) || 100))}
                className="w-full border rule bg-ink-raised text-stock font-mono text-lg px-4 py-3 focus:border-signal outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <FieldLabel step={2}>Material</FieldLabel>
          <div className="grid grid-cols-2 gap-2">
            {MATERIAL_OPTIONS.map((m) => (
              <OptionButton key={m} active={material === m} onClick={() => setMaterial(m)}>
                {SIGNAGE_MATERIAL_LABELS[m]}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <FieldLabel step={3}>Mounting</FieldLabel>
          <div className="grid grid-cols-2 gap-2">
            {MOUNT_OPTIONS.map((m) => (
              <OptionButton key={m} active={mount === m} onClick={() => setMount(m)}>
                {MOUNT_LABELS[m]}
              </OptionButton>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="double-sided"
            checked={doubleSided}
            onChange={(e) => setDoubleSided(e.target.checked)}
            className="h-4 w-4 accent-[#ff4d1c]"
          />
          <label htmlFor="double-sided" className="font-body text-sm text-stock-dim cursor-pointer">
            Print both sides
          </label>
        </div>

        <div>
          <FieldLabel step={4}>Quantity</FieldLabel>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
            className="w-full max-w-xs border rule bg-ink-raised text-stock font-mono text-lg px-4 py-3 focus:border-signal outline-none"
          />
        </div>
      </div>

      <QuotePanel
        total={breakdown.total}
        subLabel={`${formatRand(breakdown.perUnitCost)} per unit · ${quantity} unit${quantity === 1 ? "" : "s"}`}
        lineItems={lineItems}
        matchedProviders={matchedProviders}
        checkoutHref="/checkout?service=signage"
      />
    </div>
  );
}
