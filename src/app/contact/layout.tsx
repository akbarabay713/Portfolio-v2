import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Akbar — Software Developer",
  description: "Get in touch with Akbar for web development projects, collaborations, or just to say hello.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
