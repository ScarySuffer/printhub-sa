"use client";

interface FieldLabelProps {
  step: number;
  children: React.ReactNode;
  hint?: string;
}

export function FieldLabel({ step, children, hint }: FieldLabelProps) {
  return (
    <label className="font-mono text-[10px] uppercase tracking-wider text-board block mb-3">
      {String(step).padStart(2, "0")} — {children}
      {hint && <span className="text-board/70 normal-case"> ({hint})</span>}
    </label>
  );
}

interface OptionButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function OptionButton({ active, onClick, children, className = "" }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border rule py-3 px-3 font-body text-sm text-left transition-colors ${
        active
          ? "bg-signal text-ink border-signal"
          : "text-stock-dim hover:border-stock"
      } ${className}`}
    >
      {children}
    </button>
  );
}
