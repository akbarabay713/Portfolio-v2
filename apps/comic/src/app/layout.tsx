import type { Metadata, Viewport } from "next";
import { Bangers, Nunito } from "next/font/google";
import "./globals.css";

import Docks from "@/components/molecules/Docks/Docks.component";
import ScrollProgress from "@/components/atoms/ScrollProgress";
import ComicBackground from "@/components/layouts/ComicBackground.component";
import ComicCursor from "@/components/atoms/ComicCursor";
import ClickBurst from "@/components/atoms/ClickBurst";
import PageTransition from "@/components/layouts/PageTransition.component";
import CommandPalette from "@/components/organisms/CommandPalette/CommandPalette.component";
import ThemeProvider from "@/Providers/Theme-provider";
import { siteConfig } from "@/constants";

// Rounded, friendly body type; chunky comic display for headings.
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const bangers = Bangers({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bangers",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  applicationName: `${siteConfig.name} — Portfolio`,
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: `${siteConfig.name} — Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#17151c" },
    { media: "(prefers-color-scheme: light)", color: "#fbf3e2" },
  ],
  colorScheme: "dark light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.author,
  url: siteConfig.url,
  jobTitle: siteConfig.jobTitle,
  email: `mailto:${siteConfig.email}`,
  sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${nunito.variable} ${bangers.variable} ${nunito.className} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <ComicBackground />
          <ComicCursor />
          <ClickBurst />
          <ScrollProgress />
          <Docks />
          <CommandPalette />
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
