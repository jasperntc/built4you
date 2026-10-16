import type { Episode } from "@/content/types";
import { Stamp } from "./Stamp";

type Props = {
  episode: Episode;
  /** The latest episode beside the hero: larger, and taped on, from lg up. */
  featured?: boolean;
};

/** An episode, addressed like a parcel label. */
export function ShippingLabel({ episode, featured = false }: Props) {
  const { number, title, stage, to, description, link, credit } = episode;

  return (
    <article
      className={`relative flex h-full flex-col rounded-sm border border-label-edge bg-surface-label p-4 shadow-label md:p-6 ${featured ? "lg:p-8" : ""}`}
    >
      {featured && (
        // Masking tape over the top edge. Straight, like the label: only stamps tilt.
        <span aria-hidden="true" className="tape absolute -top-3 left-1/2 hidden h-6 w-40 -translate-x-1/2 lg:block" />
      )}
      <p className="border-b border-label-edge pb-1 font-hand text-hand break-words">
        To: {credit ? credit.name : to}
      </p>
      <h3
        className={`condensed mt-4 text-title text-balance break-words ${featured ? "lg:text-display" : ""}`}
        translate="no"
      >
        {link ? (
          // A plain <a>: episodes are separate Workers, not hub routes.
          <a href={link} className="text-stamp underline underline-offset-4 hover:decoration-2">
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="mt-2 text-body">{description}</p>
      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <p className="text-body-sm text-ink-soft">Episode {number}</p>
        <Stamp stage={stage} />
      </div>
    </article>
  );
}
