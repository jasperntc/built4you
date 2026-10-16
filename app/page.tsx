import { ShippingLabel } from "@/components/ShippingLabel";
import { episodes } from "@/content/episodes";
import { SUGGEST_URL } from "@/content/site";

export default function Home() {
  return (
    <main id="main">
      <section aria-labelledby="hero-title" className="mx-auto max-w-6xl px-4 pt-12 pb-16 md:px-6 md:pt-16">
        <h1 id="hero-title" className="condensed max-w-[12ch] text-display-xl text-balance">
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

      <section aria-labelledby="episodes-title" className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <h2 id="episodes-title" className="condensed text-display text-balance">
          Episodes
        </h2>
        <ol className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-6">
          {episodes.map((episode) => (
            <li key={episode.slug}>
              <ShippingLabel episode={episode} />
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
