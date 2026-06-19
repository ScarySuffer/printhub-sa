"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Provider } from "@/data/providers";

interface LineItem {
  label: string;
  value: string;
  isDiscount?: boolean;
}

interface QuotePanelProps {
  total: number;
  subLabel?: string;
  lineItems: LineItem[];
  matchedProviders: Provider[];
  checkoutHref: string;
}

function formatRand(value: number): string {
  return `R${value.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function QuotePanel({
  total,
  subLabel,
  lineItems,
  matchedProviders,
  checkoutHref,
}: QuotePanelProps) {
  return (
    <div className="lg:sticky lg:top-24 self-start space-y-6">
      <div className="border rule p-6 bg-ink-raised">
        <div className="font-mono text-[10px] uppercase tracking-wider text-board mb-4">
          Live quote
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={total}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-mono text-5xl font-semibold text-stock mb-1"
          >
            {formatRand(total)}
          </motion.div>
        </AnimatePresence>
        {subLabel && (
          <div className="font-mono text-xs text-board mb-6">{subLabel}</div>
        )}

        <div className="space-y-2 border-t rule pt-4 font-mono text-xs">
          {lineItems.map((item) => (
            <div
              key={item.label}
              className={`flex justify-between ${item.isDiscount ? "text-confirmed" : "text-stock-dim"}`}
            >
              <span>{item.label}</span>
              <span>
                {item.isDiscount ? "−" : ""}
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <Link
          href={checkoutHref}
          className="mt-6 block text-center bg-signal text-ink font-mono text-sm font-semibold uppercase tracking-wider px-6 py-3.5 hover:bg-stock transition-colors"
        >
          Continue to checkout
        </Link>
      </div>

      {matchedProviders.length > 0 && (
        <div className="border rule p-6">
          <div className="font-mono text-[10px] uppercase tracking-wider text-board mb-4">
            Fastest match
          </div>
          <div className="space-y-3">
            {matchedProviders.map((provider) => (
              <Link
                key={provider.id}
                href={`/providers/${provider.id}`}
                className="flex items-center justify-between group"
              >
                <div>
                  <div className="font-body text-sm text-stock group-hover:text-signal transition-colors">
                    {provider.name}
                  </div>
                  <div className="font-mono text-[10px] text-board">
                    {provider.city.toUpperCase()}
                  </div>
                </div>
                <div className="font-mono text-xs text-confirmed">
                  {provider.leadTimeDays}d
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { formatRand };
