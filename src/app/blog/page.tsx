"use client";

import { motion } from "framer-motion";
import { Rss } from "lucide-react";

import Heading from "@/components/atoms/Heading";
import StatusPill from "@/components/atoms/StatusPill";
import { fadeUpVariants } from "@/constants";

export default function BlogPage() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-accent-dim">
          <Rss size={32} className="text-accent" />
        </div>
        <Heading variant="h2" weight="bold" className="mb-4">
          Blog<span className="text-accent">.</span>
        </Heading>
      </motion.div>

      <motion.p
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mb-8 max-w-md text-lg text-muted"
      >
        I&apos;m writing about web development, software engineering, and design.
        Stay tuned!
      </motion.p>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <StatusPill>Coming soon</StatusPill>
      </motion.div>
    </main>
  );
}
