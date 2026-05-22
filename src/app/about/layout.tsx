import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Akbar — Software Developer",
  description: "Learn about Akbar's background, skills, tech stack, and professional experience in software development.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
