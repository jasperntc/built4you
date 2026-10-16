import { ShippingLabel } from "@/components/ShippingLabel";
import { episodes } from "@/content/episodes";
import { SUGGEST_URL } from "@/content/site";

// Newest first: the latest episode takes the hero slot, the rest follow.
const [latest, ...earlier] = episodes.toSorted((a, b) => b.number - a.number);

export default function Home() {
  return (
    <main id="main">
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-center lg:gap-16 lg:pt-16 lg:pb-16">
        <section aria-labelledby="hero-title" className="pt-12 pb-16 md:pt-16 lg:p-0">
          <h1
            id="hero-title"
            className="condensed max-w-[12ch] text-display-xl text-balance lg:text-[clamp(56px,9vw,112px)]"
          >
            What should I build you?
          </h1>
          <p className="mt-6 max-w-prose">
            Tell me about an app you wish existed. I pick one, build it, film it, and send it to the
            person who asked.
          </p>
          <a
            href={SUGGEST_URL}
            className="mt-8 inline-block rounded-md bg-stamp px-6 py-3 text-button text-on-stamp shadow-press underline-offset-4 hover:underline active:translate-y-[3px] active:shadow-none"
          >
            Suggest an app
          </a>
        </section>

        {latest && (
          <section aria-labelledby="episodes-title" className="pb-16 lg:pb-0">
            {/* Beside the hero the label speaks for itself; the heading stays for screen readers. */}
            <h2 id="episodes-title" className="condensed text-display text-balance lg:sr-only">
              Episodes
            </h2>
            <ol className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-6 lg:mt-0 lg:block">
              <li>
                <ShippingLabel episode={latest} featured />
              </li>
            </ol>
          </section>
        )}
      </div>

      {earlier.length > 0 && (
        <section aria-labelledby="earlier-title" className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
          <h2 id="earlier-title" className="condensed text-display text-balance">
            Earlier episodes
          </h2>
          <ol className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-6">
            {earlier.map((episode) => (
              <li key={episode.slug}>
                <ShippingLabel episode={episode} />
              </li>
            ))}
          </ol>
        </section>
      )}
    </main>
  );
}
