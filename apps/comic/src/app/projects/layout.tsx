import type { Metadata } from "next";

const description =
  "Akbar’s web development projects, built with React, Next.js, and WordPress.";

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
