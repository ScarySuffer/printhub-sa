"use client";

import { useState, useMemo } from "react";
import {
  DesignDeliverable,
  RevisionRounds,
  TurnaroundSpeed,
  DESIGN_DELIVERABLE_LABELS,
  REVISION_LABELS,
  calculateDesignPrice,
} from "@/lib/designPricing";
import { PROVIDERS } from "@/data/providers";
import { QuotePanel, formatRand } from "@/components/QuotePanel";
import { FieldLabel, OptionButton } from "@/components/OrderFormPrimitives";

const DELIVERABLE_OPTIONS: DesignDeliverable[] = [
  "logo",
  "business-stationery",
  "brochure-layout",
  "social-media-pack",
  "full-brand-identity",
];
const REVISION_OPTIONS: RevisionRounds[] = [1, 2, 3, "unlimited"];

export function DesignCalculator() {
  const [deliverable, setDeliverable] = useState<DesignDeliverable>("logo");
  const [revisions, setRevisions] = useState<RevisionRounds>(2);
  const [turnaround, setTurnaround] = useState<TurnaroundSpeed>("standard");

  const breakdown = useMemo(
    () => calculateDesignPrice({ deliverable, revisions, turnaround }),
    [deliverable, revisions, turnaround]
  );

  const matchedProviders = useMemo(
    () =>
      PROVIDERS.filter((p) => p.capabilities.includes("design"))
        .sort((a, b) => a.leadTimeDays - b.leadTimeDays)
        .slice(0, 3),
    []
  );

  const lineItems = [
    { label: "Base fee", value: formatRand(breakdown.baseFee) },
    ...(breakdown.revisionSurcharge > 0
      ? [{ label: "Extra revision rounds", value: formatRand(breakdown.revisionSurcharge) }]
      : []),
    ...(breakdown.rushSurcharge > 0
      ? [{ label: "Rush turnaround", value: formatRand(breakdown.rushSurcharge) }]
      : []),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
      <div className="space-y-8">
        <div>
          <FieldLabel step={1}>What do you need designed?</FieldLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {DELIVERABLE_OPTIONS.map((d) => (
              <OptionButton key={d} active={deliverable === d} onClick={() => setDeliverable(d)}>
                {DESIGN_DELIVERABLE_LABELS[d]}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <FieldLabel step={2}>Revision rounds</FieldLabel>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {REVISION_OPTIONS.map((r) => (
              <OptionButton key={r} active={revisions === r} onClick={() => setRevisions(r)}>
                {REVISION_LABELS[String(r)]}
              </OptionButton>
            ))}
          </div>
        </div>

        <div>
          <FieldLabel step={3}>Turnaround</FieldLabel>
          <div className="grid grid-cols-2 gap-2 max-w-md">
            <button
              onClick={() => setTurnaround("standard")}
              className={`border rule py-3 px-4 text-left transition-colors ${
                turnaround === "standard" ? "bg-signal text-ink border-signal" : "text-stock-dim hover:border-stock"
              }`}
            >
              <div className="font-body text-sm font-medium">Standard</div>
              <div className={`font-mono text-[10px] mt-1 ${turnaround === "standard" ? "text-ink/70" : "text-board"}`}>
                No rush fee
              </div>
            </button>
            <button
              onClick={() => setTurnaround("rush")}
              className={`border rule py-3 px-4 text-left transition-colors ${
                turnaround === "rush" ? "bg-signal text-ink border-signal" : "text-stock-dim hover:border-stock"
              }`}
            >
              <div className="font-body text-sm font-medium">Rush</div>
              <div className={`font-mono text-[10px] mt-1 ${turnaround === "rush" ? "text-ink/70" : "text-board"}`}>
                Half the time, +40%
              </div>
            </button>
          </div>
        </div>
      </div>

      <QuotePanel
        total={breakdown.total}
        subLabel={`Estimated delivery in ${breakdown.estimatedDays} day${breakdown.estimatedDays === 1 ? "" : "s"}`}
        lineItems={lineItems}
        matchedProviders={matchedProviders}
        checkoutHref="/checkout?service=design"
      />
    </div>
  );
}
