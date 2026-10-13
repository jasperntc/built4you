import type { Metadata } from "next";
import { preload } from "react-dom";
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  preload("/fonts/BricolageGrotesque-latin.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
