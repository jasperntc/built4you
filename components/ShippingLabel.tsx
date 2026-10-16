import type { Episode } from "@/content/types";
import { Stamp } from "./Stamp";

/** An episode, addressed like a parcel label. */
export function ShippingLabel({ episode }: { episode: Episode }) {
  const { number, title, stage, to, description, link, credit } = episode;

  return (
    <article className="flex h-full flex-col rounded-sm border border-label-edge bg-surface-label p-4 shadow-label md:p-6">
      <p className="border-b border-label-edge pb-1 font-hand text-hand break-words">
        To: {credit ? credit.name : to}
      </p>
      <h3 className="condensed mt-4 text-title text-balance break-words" translate="no">
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
