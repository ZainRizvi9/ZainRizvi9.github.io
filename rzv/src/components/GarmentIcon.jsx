const ICONS = {
  jacket: (
    <path d="M35 8 L50 16 L46 26 L42 22 V88 H24 V54 L16 60 L8 40 L24 26 V22 L35 8 Z M35 8 L28 26 L42 26 L35 8 Z" />
  ),
  base: (
    <path d="M32 10 L44 10 L48 20 L42 24 V88 H22 V24 L16 20 L20 10 L32 10 Z" />
  ),
  pants: (
    <path d="M20 10 H44 L46 40 L40 88 H32 L30 46 L28 88 H20 L18 40 L20 10 Z" />
  ),
  pack: (
    <path d="M22 24 C22 14 42 14 42 24 V32 H22 V24 Z M18 32 H46 V80 H18 V32 Z M24 32 V80 M40 32 V80" />
  ),
  cap: (
    <path d="M12 42 C12 24 52 24 52 42 L60 46 L58 50 L44 46 V52 H20 V46 L12 42 Z" />
  ),
  glove: (
    <path d="M22 88 V40 L18 20 L22 18 L26 36 V16 L30 14 L33 34 V13 L37 13 L39 34 L42 15 L46 16 L44 36 L48 20 L52 22 L47 44 V88 H22 Z" />
  ),
  beanie: (
    <path d="M14 54 C14 24 50 24 50 54 V60 H14 V54 Z M14 60 H50 V72 H14 V60 Z" />
  ),
};

export default function GarmentIcon({ type = "jacket", size = 56, className = "" }) {
  return (
    <svg
      viewBox="0 0 64 96"
      width={size}
      height={size * 1.5}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {ICONS[type] || ICONS.jacket}
    </svg>
  );
}
