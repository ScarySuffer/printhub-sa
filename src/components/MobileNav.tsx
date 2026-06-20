'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/providers", label: "Providers" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/dashboard/customer", label: "Dashboard" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  const getDashboardLink = () => {
    if (!user) return "/dashboard/customer";
    switch (user.role) {
      case "provider": return "/dashboard/provider";
      case "admin": return "/dashboard/admin";
      default: return "/dashboard/customer";
    }
  };

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="md:hidden flex items-center justify-center w-8 h-8 text-stock hover:opacity-80 transition-colors"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 top-[57px] z-50 flex flex-col md:hidden border-t border-ink-line"
            style={{ backgroundColor: '#0b0b0c' }}
          >
            {/* Navigation links — staggered reveal, indexed */}
            <nav className="flex flex-col">
              {NAV_LINKS.map((link, i) => {
                const href =
                  link.label === "Dashboard" && isAuthenticated
                    ? getDashboardLink()
                    : link.href;

                const isActive = pathname === href;

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease: "easeOut" }}
                    className={`relative border-b border-ink-line ${
                      isActive ? "border-l-4 border-l-signal bg-signal/5" : "border-l-4 border-l-transparent"
                    }`}
                  >
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 px-6 py-5 group"
                    >
                      <span
                        className={`font-mono text-xs tabular-nums ${
                          isActive ? "text-signal" : "text-stock-dim group-hover:text-signal"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-mono text-base uppercase tracking-wider transition-colors ${
                          isActive ? "text-stock" : "text-stock group-hover:text-stock-dim"
                        }`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Auth */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + NAV_LINKS.length * 0.05, ease: "easeOut" }}
                className="border-b border-ink-line border-l-4 border-l-transparent"
              >
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="flex items-center gap-4 px-6 py-5 w-full text-left group"
                  >
                    <LogOut className="h-3.5 w-3.5 text-stock-dim group-hover:text-signal transition-colors" />
                    <span className="font-mono text-base uppercase tracking-wider text-stock group-hover:text-signal transition-colors">
                      Logout ({user?.name})
                    </span>
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 px-6 py-5 group"
                  >
                    <span className="font-mono text-xs tabular-nums text-stock-dim group-hover:text-signal transition-colors">
                      {String(NAV_LINKS.length + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-base uppercase tracking-wider text-stock group-hover:text-signal transition-colors">
                      Sign in
                    </span>
                  </Link>
                )}
              </motion.div>
            </nav>

            {/* Theme toggle */}
            <div className="px-6 py-5 border-b border-ink-line flex items-center justify-between bg-ink-raised">
              <span className="font-mono text-xs uppercase tracking-wider text-stock-dim">
                Display
              </span>
              <ThemeToggle />
            </div>

            {/* Bottom CTA */}
            <div className="mt-auto px-6 py-6 border-t border-ink-line" style={{ backgroundColor: '#0b0b0c' }}>
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="block text-center bg-signal text-ink font-mono text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded hover:bg-stock hover:text-ink transition-all"
              >
                Start a job
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}