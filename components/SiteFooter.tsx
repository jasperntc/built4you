import { INSTAGRAM_URL, PORTFOLIO_URL } from "@/content/site";
import { BrandPicture } from "./BrandPicture";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-12 md:px-6">
      <div className="flex items-start gap-4">
        <BrandPicture kind="mark" width={30} height={40} alt="" className="shrink-0" />
        <div className="text-body-sm">
          <p>
            <span translate="no">Built4You</span> is a series by Jasper Ng.
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a href={PORTFOLIO_URL} className="underline underline-offset-4 hover:decoration-2">
                <span translate="no">jasperntc.dev</span>
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} className="underline underline-offset-4 hover:decoration-2">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
