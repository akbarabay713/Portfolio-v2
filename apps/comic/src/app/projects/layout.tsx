import type { Metadata } from "next";

const description =
  "Explore Akbar's portfolio of web development projects built with React, Next.js, WordPress, and modern technologies.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: { title: "Projects | Akbar", description, url: "/projects" },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
