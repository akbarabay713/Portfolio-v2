import type { Metadata } from "next";

const description =
  "Learn about Akbar's background, skills, tech stack, and professional experience as a fullstack software developer.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: "About | Akbar", description, url: "/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
