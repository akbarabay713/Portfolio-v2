import type { Metadata } from "next";
import "./globals.css";
import Docks from "@/components/molecules/Docks/Docks.component";
// import Footer from "@/components/layouts/Footer.component";
import { proximaNovaCondesedFont, proximaNovaFont } from "@/lib/fonts.lib";
import ThemeProvider from "@/Providers/Theme-provider";

export const metadata: Metadata = {
  title: "Akbar | Software Developer",
  description:
    "Portfolio of Akbar, a software developer specializing in web development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${proximaNovaCondesedFont.variable} ${proximaNovaFont.variable} antialiased`}
      >
        <ThemeProvider>
          <Docks />
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
