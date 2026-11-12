import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { bio, siteConfig } from "@portfolio/content";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const title = `${bio.fullName} | ${siteConfig.jobTitle}`;
const description =
  "Fullstack developer in Yogyakarta. I build web apps and client websites with Next.js, Laravel and WordPress.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  keywords: [...siteConfig.keywords, bio.fullName],
  authors: [{ name: bio.fullName, url: siteConfig.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title,
    description,
    siteName: bio.fullName,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#c9a878",
};

/** Marks the label as already printed for the rest of the session, before first paint. */
const printOnce = `try{if(sessionStorage.getItem("printed"))document.documentElement.dataset.printed="";else sessionStorage.setItem("printed","1")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: printOnce }} />
      </head>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
