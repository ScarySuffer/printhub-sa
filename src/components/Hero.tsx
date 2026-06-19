"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrochureMockup } from "@/components/Mockups";

export function Hero() {
  return (
    <section className="relative px-6 pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-center">
          {/* Left: copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-6"
            >
              50 providers · 9 provinces · live booking
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-extrabold text-[14vw] leading-[0.9] md:text-[7vw] lg:text-[5.5vw] tracking-tight text-stock"
            >
              GET IT
              <br />
              PRINTED.
              <br />
              <span className="text-signal">TODAY,</span>
              <br />
              NOT EVENTUALLY.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="font-body text-stock-dim text-base md:text-lg max-w-md mt-8 leading-relaxed"
            >
              Upload your file. Get quoted by vetted providers near you.
              Track it from press to delivery — without a single phone call.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex gap-3 mt-8 flex-wrap"
            >
              <Link
                href="/services"
                className="group flex items-center gap-2 bg-signal text-ink font-mono text-sm font-semibold uppercase tracking-wider px-6 py-3.5 hover:bg-stock transition-colors"
              >
                Start a job
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/providers"
                className="flex items-center border border-ink-line text-stock font-mono text-sm font-semibold uppercase tracking-wider px-6 py-3.5 hover:border-stock transition-colors"
              >
                Browse providers
              </Link>
            </motion.div>
          </div>

          {/* Right: mockup illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
            aria-hidden
          >
            <BrochureMockup className="w-full max-w-[380px] drop-shadow-2xl" />
          </motion.div>
        </div>
      </div>

      {/* Ambient background mark — a faint registration-cross in the corner */}
      <div
        className="pointer-events-none absolute top-8 right-8 opacity-[0.04] text-stock font-mono text-[120px] leading-none select-none hidden xl:block"
        aria-hidden
      >
        ⊕
      </div>
    </section>
  );
}
