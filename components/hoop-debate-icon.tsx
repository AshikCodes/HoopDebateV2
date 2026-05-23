/**
 * HoopDebate favicon / brand mark.
 *
 * Concept (chosen): split basketball under a hoop rim — reads as
 * "pick a side" (orange vs sky) + basketball at 16×16.
 *
 * Other concepts considered:
 * - VS chevron: two triangles meeting at center (too generic)
 * - Hoop only: rim arc + net lines (no "two options" cue)
 */

type HoopDebateIconProps = {
  size?: number;
  className?: string;
};

const BG = "#09090b";
const RIM = "#fafafa";
const LEFT = "#f97316";
const RIGHT = "#38bdf8";
const OUTLINE = "#e4e4e7";

export function HoopDebateIcon({ size = 32, className }: HoopDebateIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect width="32" height="32" rx="6" fill={BG} />
      <path
        d="M 7 12.5 Q 16 4.5 25 12.5"
        stroke={RIM}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="19" r="9" stroke={OUTLINE} strokeWidth="1.5" />
      <path d="M 16 10 A 9 9 0 0 0 16 28 Z" fill={LEFT} />
      <path d="M 16 10 A 9 9 0 0 1 16 28 Z" fill={RIGHT} />
    </svg>
  );
}
