import type { Metadata } from "next";

const description =
  "Get in touch with Akbar for web development projects, collaborations, or just to say hello.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact | Akbar", description, url: "/contact" },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
