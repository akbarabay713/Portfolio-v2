import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Docks from "@/components/molecules/Docks/Docks.component";
// import Footer from "@/components/layouts/Footer.component";
import PageTransition from "@/components/layouts/PageTransition.component";
import CommandPalette from "@/components/organisms/CommandPalette/CommandPalette.component";
import ThemeProvider from "@/Providers/Theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

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
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <ThemeProvider>
          <Docks />
          <CommandPalette />
          <PageTransition>{children}</PageTransition>
          {/* <Footer /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
