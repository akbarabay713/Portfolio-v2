import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Akbar — Software Developer",
  description: "Articles and thoughts on web development, software engineering, and design.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
