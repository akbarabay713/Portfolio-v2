"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Button from "@/components/atoms/Button";
import Magnetic from "@/components/atoms/Magnetic";
import { IcGithub, IcLinkedin } from "@/components/atoms/Icons/SocialIcons";
import { bio, EASE_OUT, fadeUpVariants, siteConfig } from "@/constants";

const fade = (delay: number) => ({
  initial: "initial" as const,
  animate: "animate" as const,
  variants: fadeUpVariants,
  transition: { duration: 0.7, delay, ease: EASE_OUT },
});

export default function Home() {
  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col items-start justify-center overflow-hidden px-6 text-left">
      <motion.div {...fade(0)} className="mb-8">
        <Image
          src={bio.avatar}
          alt="Portrait of Akbar"
          width={112}
          height={112}
          priority
          className="ink-border ink-shadow -rotate-3 rounded-full object-cover transition-transform duration-300 hover:rotate-0"
        />
      </motion.div>

      <motion.div {...fade(0.15)} className="mb-6 max-w-4xl">
        <h1 className="font-display tracking-wide text-4xl leading-tight text-content sm:text-6xl md:text-7xl">
          {bio.greeting}
        </h1>
      </motion.div>

      <motion.div {...fade(0.25)} className="mb-12 max-w-xl">
        <p className="text-base leading-relaxed text-muted md:text-lg">
          I&apos;m a fullstack developer. I build fast, easy-to-use web apps and
          sites, and I care about writing clean code and getting the details right.
        </p>
      </motion.div>

      <motion.div
        {...fade(0.35)}
        className="mb-16 flex flex-wrap items-center justify-start gap-4"
      >
        <Magnetic>
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
        </Magnetic>
        <Magnetic>
          <Button as={Link} href="/contact" variant="outline" caps>
            Let&apos;s talk
          </Button>
        </Magnetic>
      </motion.div>

      <motion.div {...fade(0.45)} className="-ml-3 flex items-center gap-5">
        <Magnetic strength={6}>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center text-faint transition-colors hover:text-accent"
            aria-label="GitHub"
          >
            <IcGithub width={24} height={24} />
          </a>
        </Magnetic>
        <div className="h-4 w-px bg-line-strong" />
        <Magnetic strength={6}>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 w-11 items-center justify-center text-faint transition-colors hover:text-accent"
            aria-label="LinkedIn"
          >
            <IcLinkedin width={20} height={20} />
          </a>
        </Magnetic>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <kbd className="inline-flex items-center gap-1.5 rounded-md border-2 border-outline bg-elevated px-3 py-1 font-mono text-[11px] font-bold text-muted">
          ⌘K <span className="text-faint">to navigate</span>
        </kbd>
      </motion.div>
    </main>
  );
}
