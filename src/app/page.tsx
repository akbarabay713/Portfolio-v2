"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { ArrowRight } from "lucide-react";
import { IcGithub, IcLinkedin } from "@/components/atoms/Icons/SocialIcons";
import { fadeUpVariants } from "@/constants";
import profileImg from "@/assets/images/akbarr.webp";
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
    <main className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 overflow-hidden">
      {/* Avatar */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-2xl scale-150" />
          <Image
            src={profileImg}
            alt="Akbar"
            width={108}
            height={108}
            className="relative rounded-full border border-gray-200 dark:border-white/10 shadow-xl ring-2 ring-violet-500/30"
          />
        </div>
      </motion.div>

      {/* Status pill */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mb-6"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-xs font-medium text-violet-600 dark:text-violet-300 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Available for opportunities
        </span>
      </motion.div>

      {/* Typewriter heading */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="max-w-4xl mb-6"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
          {text}
          <Cursor cursorColor="#8b5cf6" />
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="max-w-xl mb-12"
      >
        <p className="text-base md:text-lg text-gray-500 dark:text-white/50 leading-relaxed">
          I craft fast, intuitive, and beautifully designed web experiences —
          focused on clean code and products people love to use.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="flex flex-wrap items-center justify-center gap-4 mb-16"
      >
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-violet-600/25 hover:shadow-violet-500/40"
        >
          View my work
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white font-semibold text-sm transition-all duration-300"
        >
          Let&apos;s talk
        </Link>
      </motion.div>

      {/* Social links */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="flex items-center gap-5"
      >
        <a
          href="https://github.com/akbarabay713"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          aria-label="GitHub"
        >
          <IcGithub width={24} height={24} />
        </a>
        <div className="w-px h-4 bg-gray-200 dark:bg-white/10" />
        <a
          href="https://www.linkedin.com/in/akbarabu/?locale=en_US"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
          aria-label="LinkedIn"
        >
          <IcLinkedin width={20} height={20} />
        </a>
      </motion.div>

      {/* Keyboard shortcut hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <kbd className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[11px] font-mono text-gray-400 dark:text-gray-500">
          ⌘K{" "}
          <span className="text-gray-300 dark:text-gray-600">to navigate</span>
        </kbd>
      </motion.div>
    </main>
  );
}
