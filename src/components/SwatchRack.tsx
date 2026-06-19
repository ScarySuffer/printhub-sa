"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SERVICE_CATEGORIES, serviceHref } from "@/data/services";

export function SwatchRack() {
  return (
    <section className="py-16 px-6 border-b rule">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-stock">
            Pick the stock.
          </h2>
          <span className="font-mono text-xs uppercase tracking-wider text-board hidden sm:block">
            6 categories
          </span>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 snap-x">
          {SERVICE_CATEGORIES.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="snap-start shrink-0"
            >
              <Link
                href={serviceHref(service.slug)}
                className="group block w-56 border rule hover:border-signal transition-colors"
              >
                <div
                  className="h-28 w-full border-b rule"
                  style={{ backgroundColor: service.swatchColor }}
                  aria-hidden
                />
                <div className="p-4">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-board mb-1">
                    {service.material}
                  </div>
                  <div className="font-display font-bold text-stock text-lg leading-tight">
                    {service.label}
                  </div>
                  <p className="font-body text-xs text-stock-dim mt-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
