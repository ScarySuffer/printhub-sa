// src/components/dashboard/WalletCard.tsx
'use client';

import { ArrowUpRight, Wallet } from 'lucide-react';

interface WalletCardProps {
  credits: number;
  onAddCredits?: () => void;
}

export function WalletCard({ credits, onAddCredits }: WalletCardProps) {
  return (
    <div className="bg-linear-to-br from-signal/10 to-teal/10 dark:from-signal/20 dark:to-teal/20 border border-signal/20 dark:border-signal/30 rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-signal/10 dark:bg-signal/20 rounded-lg">
            <Wallet className="h-6 w-6 text-signal" />
          </div>
          <div>
            <p className="text-sm text-board-600 dark:text-board-400">Available Credits</p>
            <p className="text-3xl font-bold text-ink dark:text-stock">
              R{credits.toFixed(2)}
            </p>
          </div>
        </div>
        
        {onAddCredits && (
          <button
            onClick={onAddCredits}
            className="flex items-center gap-1 text-sm font-medium text-signal hover:text-signal/80 transition-colors"
          >
            Add Credits
            <ArrowUpRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}