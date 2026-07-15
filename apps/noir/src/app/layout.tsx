import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { siteConfig } from "@portfolio/content";
import "./globals.css";

import TimeTheme from "@/components/TimeTheme";
import Chrome from "@/components/Chrome";
import CornerBrackets from "@/components/CornerBrackets";
import Grain from "@/components/Grain";
import RingCursor from "@/components/gsap/RingCursor";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} — Studio`,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: `${siteConfig.name} — Studio`,
    description: siteConfig.description,
    siteName: `${siteConfig.name} — Studio`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-phase="night">
      <body
        className={`${geist.variable} ${geistMono.variable} ${instrument.variable} ${geist.className}`}
      >
        <TimeTheme />
        <RingCursor />
        <CornerBrackets />
        <Grain />
        <Chrome />
        {children}
      </body>
    </html>
  );
}
