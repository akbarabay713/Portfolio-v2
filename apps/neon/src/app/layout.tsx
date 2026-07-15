import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import { siteConfig } from "@portfolio/content";
import "./globals.css";

import Starfield from "@/components/Starfield";
import Nav from "@/components/Nav";
import EmailRail from "@/components/EmailRail";
import ScrollLine from "@/components/gsap/ScrollLine";
import SmoothScroll from "@/components/gsap/SmoothScroll";
import Preloader from "@/components/gsap/Preloader";
import NeonCursor from "@/components/gsap/NeonCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: `${siteConfig.name} — Portfolio`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${anton.variable} ${inter.className}`}>
        <Preloader />
        <NeonCursor />
        <Starfield />
        <Nav />
        <EmailRail />
        <ScrollLine />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
