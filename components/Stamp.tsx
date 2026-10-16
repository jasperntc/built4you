import { STAGE_LABELS, type Stage } from "@/content/types";

/** A rubber stamp with the episode's stage, tilted −4° (Shipped −7°). */
export function Stamp({ stage }: { stage: Stage }) {
  return (
    <span
      data-stage={stage}
      className="stamp condensed inline-block shrink-0 -rotate-4 rounded-xs border-2 border-current px-2 py-1 text-stamp-text text-stamp data-[stage=shipped]:-rotate-7 data-[stage=shipped]:text-stamp-green"
    >
      {STAGE_LABELS[stage]}
    </span>
  );
}
