import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Akbar — Software Developer",
  description: "Explore Akbar's portfolio of web development projects built with React, Next.js, and modern technologies.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
