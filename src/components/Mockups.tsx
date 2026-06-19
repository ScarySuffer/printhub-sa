// All mockups use CSS custom properties so they respond to light/dark theme

export function BrochureMockup({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Shadow */}
      <rect x="50" y="48" width="220" height="180" rx="1" fill="black" opacity="0.18" />
      {/* Back sheet */}
      <rect x="44" y="42" width="220" height="180" rx="1" fill="var(--ink-raised)" stroke="var(--ink-line)" strokeWidth="1" />
      {/* Mid sheet */}
      <rect x="38" y="36" width="220" height="180" rx="1" fill="var(--ink-raised)" stroke="var(--ink-line)" strokeWidth="1" />
      {/* Front cover */}
      <rect x="32" y="30" width="220" height="180" rx="1" fill="var(--stock)" />
      {/* Cover: signal bar top */}
      <rect x="32" y="30" width="220" height="32" fill="var(--signal)" />
      {/* Cover: logo mark */}
      <rect x="48" y="42" width="14" height="14" fill="white" opacity="0.9" />
      {/* Cover: title lines */}
      <rect x="68" y="44" width="80" height="5" rx="1" fill="white" opacity="0.8" />
      <rect x="68" y="53" width="52" height="4" rx="1" fill="white" opacity="0.5" />
      {/* Cover: body text lines */}
      <rect x="48" y="76" width="188" height="4" rx="1" fill="var(--stock-dim)" opacity="0.5" />
      <rect x="48" y="85" width="170" height="4" rx="1" fill="var(--stock-dim)" opacity="0.4" />
      <rect x="48" y="94" width="180" height="4" rx="1" fill="var(--stock-dim)" opacity="0.4" />
      {/* Divider */}
      <line x1="48" y1="110" x2="236" y2="110" stroke="var(--ink-line)" strokeWidth="1" />
      {/* Image placeholder */}
      <rect x="48" y="118" width="84" height="58" fill="var(--ink-raised)" />
      <rect x="60" y="134" width="40" height="28" rx="1" fill="var(--board)" opacity="0.3" />
      {/* Side text col */}
      <rect x="144" y="118" width="92" height="4" rx="1" fill="var(--stock-dim)" opacity="0.4" />
      <rect x="144" y="126" width="80" height="4" rx="1" fill="var(--stock-dim)" opacity="0.3" />
      <rect x="144" y="134" width="86" height="4" rx="1" fill="var(--stock-dim)" opacity="0.3" />
      <rect x="144" y="142" width="60" height="4" rx="1" fill="var(--stock-dim)" opacity="0.3" />
      {/* Bottom strip */}
      <rect x="32" y="188" width="220" height="22" fill="var(--ink-raised)" />
      <rect x="48" y="196" width="64" height="4" rx="1" fill="var(--board)" opacity="0.6" />
      {/* Crop marks top-left */}
      <line x1="24" y1="30" x2="32" y2="30" stroke="var(--board)" strokeWidth="0.75" opacity="0.5" />
      <line x1="32" y1="22" x2="32" y2="30" stroke="var(--board)" strokeWidth="0.75" opacity="0.5" />
      {/* Crop marks bottom-right */}
      <line x1="252" y1="210" x2="260" y2="210" stroke="var(--board)" strokeWidth="0.75" opacity="0.5" />
      <line x1="252" y1="210" x2="252" y2="218" stroke="var(--board)" strokeWidth="0.75" opacity="0.5" />
    </svg>
  );
}

export function VanMockup({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Ground shadow */}
      <ellipse cx="200" cy="222" rx="150" ry="10" fill="black" opacity="0.12" />
      {/* Body */}
      <rect x="40" y="90" width="320" height="110" rx="4" fill="var(--signal)" />
      {/* Cab roof slope */}
      <path d="M40 90 L110 40 L300 40 L360 90 Z" fill="var(--signal)" />
      {/* Windscreen */}
      <path d="M120 44 L160 46 L160 88 L120 88 Z" fill="var(--ink-raised)" opacity="0.55" />
      {/* Side windows */}
      <rect x="168" y="44" width="108" height="44" rx="2" fill="var(--ink-raised)" opacity="0.5" />
      {/* Rear panel — white with logo area */}
      <rect x="290" y="92" width="68" height="106" rx="2" fill="var(--stock)" opacity="0.12" />
      {/* Side panel branding — logo */}
      <rect x="80" y="108" width="30" height="30" rx="1" fill="white" opacity="0.15" />
      {/* Side panel text bars */}
      <rect x="118" y="113" width="120" height="8" rx="1" fill="white" opacity="0.3" />
      <rect x="118" y="126" width="90" height="6" rx="1" fill="white" opacity="0.2" />
      <rect x="118" y="138" width="72" height="5" rx="1" fill="white" opacity="0.15" />
      {/* Wheels */}
      <circle cx="100" cy="200" r="28" fill="var(--ink)" />
      <circle cx="100" cy="200" r="20" fill="var(--ink-raised)" />
      <circle cx="100" cy="200" r="10" fill="var(--board)" opacity="0.5" />
      <circle cx="300" cy="200" r="28" fill="var(--ink)" />
      <circle cx="300" cy="200" r="20" fill="var(--ink-raised)" />
      <circle cx="300" cy="200" r="10" fill="var(--board)" opacity="0.5" />
      {/* Bumper */}
      <rect x="40" y="192" width="320" height="10" rx="2" fill="var(--ink-raised)" opacity="0.6" />
      {/* Headlights */}
      <rect x="44" y="140" width="18" height="12" rx="1" fill="#fffbe6" opacity="0.7" />
      {/* Tail lights */}
      <rect x="342" y="140" width="14" height="12" rx="1" fill="#ff4d1c" opacity="0.5" />
    </svg>
  );
}

export function SignBoardMockup({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Post */}
      <rect x="162" y="190" width="16" height="70" fill="var(--board)" opacity="0.5" />
      <rect x="148" y="252" width="44" height="8" rx="2" fill="var(--board)" opacity="0.4" />
      {/* Board shadow */}
      <rect x="48" y="36" width="244" height="162" rx="3" fill="black" opacity="0.14" />
      {/* Board body */}
      <rect x="44" y="32" width="244" height="162" rx="3" fill="var(--ink-raised)" stroke="var(--ink-line)" strokeWidth="1.5" />
      {/* Signal accent bar left */}
      <rect x="44" y="32" width="8" height="162" rx="2" fill="var(--signal)" />
      {/* Content area */}
      {/* Eyebrow */}
      <rect x="68" y="52" width="72" height="5" rx="1" fill="var(--signal)" opacity="0.7" />
      {/* Headline bars */}
      <rect x="68" y="66" width="192" height="16" rx="2" fill="var(--stock)" opacity="0.9" />
      <rect x="68" y="88" width="152" height="16" rx="2" fill="var(--stock)" opacity="0.7" />
      {/* Divider */}
      <line x1="68" y1="116" x2="272" y2="116" stroke="var(--ink-line)" strokeWidth="1" />
      {/* Body copy lines */}
      <rect x="68" y="128" width="180" height="5" rx="1" fill="var(--board)" opacity="0.5" />
      <rect x="68" y="138" width="160" height="5" rx="1" fill="var(--board)" opacity="0.4" />
      <rect x="68" y="148" width="170" height="5" rx="1" fill="var(--board)" opacity="0.4" />
      {/* CTA button */}
      <rect x="68" y="165" width="88" height="20" rx="2" fill="var(--signal)" opacity="0.85" />
      <rect x="74" y="172" width="60" height="5" rx="1" fill="white" opacity="0.8" />
      {/* Bracket bolts */}
      <circle cx="56" cy="44" r="4" fill="var(--board)" opacity="0.4" />
      <circle cx="56" cy="184" r="4" fill="var(--board)" opacity="0.4" />
    </svg>
  );
}

export function DesignArtboardMockup({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 380 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Artboard outer */}
      <rect x="20" y="20" width="340" height="220" rx="2" fill="var(--ink-raised)" stroke="var(--ink-line)" strokeWidth="1" />
      {/* Ruler top */}
      <rect x="20" y="20" width="340" height="14" fill="var(--ink-line)" opacity="0.6" />
      {/* Ruler marks */}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((i) => (
        <line key={i} x1={34 + i * 20} y1="20" x2={34 + i * 20} y2={i % 5 === 0 ? 30 : 26}
          stroke="var(--board)" strokeWidth="0.75" opacity="0.5" />
      ))}
      {/* Ruler left */}
      <rect x="20" y="34" width="14" height="206" fill="var(--ink-line)" opacity="0.6" />
      {[0,1,2,3,4,5,6,7,8,9].map((i) => (
        <line key={i} x1="20" y1={44 + i * 20} x2={i % 5 === 0 ? 30 : 26} y2={44 + i * 20}
          stroke="var(--board)" strokeWidth="0.75" opacity="0.5" />
      ))}
      {/* Canvas area */}
      <rect x="36" y="36" width="322" height="202" rx="1" fill="white" opacity="0.04" />
      {/* Logo concept on canvas */}
      {/* Brand mark square */}
      <rect x="90" y="60" width="64" height="64" rx="4" fill="var(--signal)" opacity="0.9" />
      <rect x="102" y="72" width="40" height="40" rx="2" fill="white" opacity="0.2" />
      <text x="110" y="98" fontFamily="monospace" fontSize="20" fontWeight="bold" fill="white" opacity="0.9">P</text>
      {/* Wordmark lines */}
      <rect x="168" y="72" width="120" height="12" rx="2" fill="var(--stock)" opacity="0.8" />
      <rect x="168" y="90" width="80" height="8" rx="1" fill="var(--board)" opacity="0.5" />
      {/* Colour palette row */}
      {[
        "var(--signal)", "var(--ink)", "var(--stock)", "var(--confirmed)", "var(--board)"
      ].map((color, i) => (
        <rect key={i} x={90 + i * 40} y={148} width={32} height={32} rx="2"
          fill={color} stroke="var(--ink-line)" strokeWidth="0.5" />
      ))}
      {/* Type specimen */}
      <rect x="90" y="196" width="260" height="6" rx="1" fill="var(--board)" opacity="0.4" />
      <rect x="90" y="207" width="200" height="4" rx="1" fill="var(--board)" opacity="0.3" />
      {/* Selection handles around logo mark */}
      <rect x="86" y="56" width="72" height="72" rx="1" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
      <rect x="84" y="54" width="4" height="4" fill="#60a5fa" opacity="0.8" />
      <rect x="154" y="54" width="4" height="4" fill="#60a5fa" opacity="0.8" />
      <rect x="84" y="124" width="4" height="4" fill="#60a5fa" opacity="0.8" />
      <rect x="154" y="124" width="4" height="4" fill="#60a5fa" opacity="0.8" />
    </svg>
  );
}
