import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { BrandPicture } from "@/components/BrandPicture";
import { SiteFooter } from "@/components/SiteFooter";
import { brandToken } from "@/lib/brand-tokens";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://built4you.jasperntc.dev"),
  title: "Built4You",
  description:
    "Friends send me app ideas. I build one and post the build on Instagram.",
  icons: {
    icon: "/brand/b4u-favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

// Browser chrome matches the kraft ground in each theme.
const kraft = brandToken("surface-kraft");
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: kraft.light },
    { media: "(prefers-color-scheme: dark)", color: kraft.dark },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  preload("/fonts/BricolageGrotesque-latin.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  return (
    <html lang="en">
      <body className="min-h-dvh bg-surface-kraft font-sans text-body text-ink antialiased">
        <a
          href="#main"
          className="sr-only rounded-sm bg-surface-label text-body-sm text-ink shadow-label focus:not-sr-only focus:fixed focus:px-4 focus:py-2 focus:top-4 focus:left-4 focus:z-10"
        >
          Skip to content
        </a>
        <header className="mx-auto max-w-6xl px-4 pt-6 md:px-6 md:pt-8">
          <BrandPicture kind="lockup" width={160} height={52} alt="Built4You" priority />
        </header>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
