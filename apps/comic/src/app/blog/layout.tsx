import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { settings } from "@portfolio/content";

const description =
  "Articles and thoughts on web development, software engineering, and design by Akbar.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog | Akbar", description, url: "/blog" },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!settings.sections.blog) notFound();
  return children;
}
