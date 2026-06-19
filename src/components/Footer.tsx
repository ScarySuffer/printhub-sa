'use client';

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function Footer() {
  const { user, isAuthenticated } = useAuth();

  return (
    <footer className="border-t border-ink-line px-6 py-10 mt-auto bg-ink-raised">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <span className="font-display font-extrabold text-lg text-stock">
            PRINTHUB <span className="text-signal">SA</span>
          </span>
          <p className="font-body text-xs text-stock-dim mt-2 max-w-xs leading-relaxed">
            Booking printing, signage and branding jobs with vetted providers
            across South Africa.
          </p>
          {isAuthenticated && (
            <p className="font-mono text-[10px] text-stock-dim mt-2">
              Logged in as <span className="text-signal">{user?.name}</span>
            </p>
          )}
        </div>
        
        <nav className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-wider text-stock-dim">
          <Link href="/providers" className="hover:text-stock transition-colors hover:underline decoration-signal/50 underline-offset-4">
            Providers
          </Link>
          <Link href="/services" className="hover:text-stock transition-colors hover:underline decoration-signal/50 underline-offset-4">
            Services
          </Link>
          <Link href="/login" className="hover:text-stock transition-colors hover:underline decoration-signal/50 underline-offset-4">
            {isAuthenticated ? 'Dashboard' : 'Sign in'}
          </Link>
          {isAuthenticated && (
            <Link href="/" className="hover:text-stock transition-colors hover:underline decoration-signal/50 underline-offset-4">
              Logout
            </Link>
          )}
        </nav>
      </div>
      
      <div className="mx-auto max-w-7xl mt-6 pt-6 border-t border-ink-line">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[10px] text-stock-dim font-mono uppercase tracking-wider">
            © {new Date().getFullYear()} PrintHub SA. All rights reserved.
          </p>
          <p className="text-[10px] text-stock-dim font-mono uppercase tracking-wider flex items-center gap-1.5">
            <span>Crafted by</span>
            <span className="text-board">·</span>
            <a 
              href="https://dynamicgenholdings.co.za/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-signal hover:text-stock transition-colors hover:underline decoration-signal/50 underline-offset-4 font-medium"
            >
              DynamicGen Holdings PTY LTD
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}