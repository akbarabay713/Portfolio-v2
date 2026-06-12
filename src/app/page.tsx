"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { ArrowRight } from "lucide-react";

import Button from "@/components/atoms/Button";
import StatusPill from "@/components/atoms/StatusPill";
import { IcGithub, IcLinkedin } from "@/components/atoms/Icons/SocialIcons";
import { fadeUpVariants, siteConfig } from "@/constants";
import profileImg from "@/assets/images/akbarr.webp";

const fade = (delay: number) => ({
  initial: "initial" as const,
  animate: "animate" as const,
  variants: fadeUpVariants,
  transition: { duration: 0.6, delay },
});

export default function Home() {
  const [text] = useTypewriter({
    words: [
      "Hey, I'm Akbar 👋",
      "I build things for the web",
      "Fullstack Developer",
    ],
    loop: true,
    delaySpeed: 2500,
    typeSpeed: 80,
    deleteSpeed: 40,
  });

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Avatar */}
      <motion.div {...fade(0)} className="mb-8">
        <div className="relative accent-glow rounded-full">
          <div className="absolute inset-0 scale-150 rounded-full bg-accent/15 blur-2xl" />
          <Image
            src={profileImg}
            alt="Portrait of Akbar"
            width={112}
            height={112}
            priority
            className="relative rounded-full border border-line ring-2 ring-accent/30"
          />
        </div>
      </motion.div>

      {/* Status */}
      <motion.div {...fade(0.05)} className="mb-6">
        <StatusPill>Available for opportunities</StatusPill>
      </motion.div>

      {/* Typewriter heading */}
      <motion.div {...fade(0.15)} className="mb-6 max-w-4xl">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-content sm:text-5xl md:text-6xl">
          {text}
          <Cursor cursorColor="var(--accent)" />
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.div {...fade(0.25)} className="mb-12 max-w-xl">
        <p className="text-base leading-relaxed text-muted md:text-lg">
          I craft fast, intuitive, and beautifully designed web experiences —
          focused on clean code and products people love to use.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        {...fade(0.35)}
        className="mb-16 flex flex-wrap items-center justify-center gap-4"
      >
        <Button
          as={Link}
          href="/projects"
          variant="primary"
          caps
          className="group"
          endIcon={
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          }
        >
          View my work
        </Button>
        <Button as={Link} href="/contact" variant="outline" caps>
          Let&apos;s talk
        </Button>
      </motion.div>

      {/* Socials */}
      <motion.div {...fade(0.45)} className="flex items-center gap-5">
        <a
          href={siteConfig.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-faint transition-colors hover:text-content"
          aria-label="GitHub"
        >
          <IcGithub width={24} height={24} />
        </a>
        <div className="h-4 w-px bg-line-strong" />
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-faint transition-colors hover:text-content"
          aria-label="LinkedIn"
        >
          <IcLinkedin width={20} height={20} />
        </a>
      </motion.div>

      {/* Command palette hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <kbd className="inline-flex items-center gap-1.5 rounded-md border border-line bg-elevated px-3 py-1 font-mono text-[11px] text-faint">
          ⌘K <span className="text-faint/70">to navigate</span>
        </kbd>
      </motion.div>
    </main>
  );
}
