'use client';

import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/MobileNav";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/providers", label: "Providers" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/dashboard/customer", label: "Dashboard" },
];

export function Header() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/dashboard/customer';
    switch (user.role) {
      case 'provider': return '/dashboard/provider';
      case 'admin': return '/dashboard/admin';
      default: return '/dashboard/customer';
    }
  };

  // While loading, show a neutral header
  // This matches what the server renders
  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 border-b bg-ink/95 backdrop-blur-sm dark:bg-ink/95 border-stock/10 dark:border-ink/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-display font-black text-lg sm:text-xl tracking-tight text-stock">
              PRINTHUB
            </span>
            <span className="font-mono text-[10px] sm:text-xs text-signal border border-signal/50 px-1.5 py-0.5 rounded-sm">
              SA
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-wider text-stock-dim hover:text-stock transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <div className="w-16 h-8 bg-stock/10 rounded animate-pulse" />
            <div className="w-24 h-8 bg-stock/10 rounded animate-pulse" />
          </div>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-ink/95 backdrop-blur-sm dark:bg-ink/95 border-stock/10 dark:border-ink/30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-display font-black text-lg sm:text-xl tracking-tight text-stock">
            PRINTHUB
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-signal border border-signal/50 px-1.5 py-0.5 rounded-sm">
            SA
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => {
            const href = link.label === "Dashboard" && isAuthenticated 
              ? getDashboardLink() 
              : link.href;
            return (
              <Link
                key={link.href}
                href={href}
                className="font-mono text-xs uppercase tracking-wider text-stock-dim hover:text-stock transition-colors"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && <NotificationsDropdown />}
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-stock-dim">
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="font-mono text-xs uppercase tracking-wider text-stock-dim hover:text-stock transition-colors flex items-center gap-1"
              >
                <LogOut className="h-3 w-3" />
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="font-mono text-xs uppercase tracking-wider text-stock-dim hover:text-stock transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/services"
                className="bg-signal text-ink font-mono text-xs font-semibold uppercase tracking-wider px-4 py-2.5 hover:bg-stock transition-colors"
              >
                Start a job
              </Link>
            </>
          )}
        </div>

        {/* Mobile: hamburger */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}