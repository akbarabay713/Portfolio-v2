"use client";

import Heading from "@/components/atoms/Heading";
import { fadeUpVariants } from "@/constants";
import { motion } from "framer-motion";
import { Rss } from "lucide-react";

export default function BlogPage() {
  return (
    <main className="py-16 px-4 max-w-5xl mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <div className="w-20 h-20 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-8">
          <Rss size={32} className="text-violet-500" />
        </div>
        <Heading className="mb-4">
          Blog<span className="text-violet-500">.</span>
        </Heading>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-md">
          I&apos;m working on some articles about web development, software
          engineering, and design. Stay tuned!
        </p>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-600 dark:text-violet-300 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          Coming soon
        </div>
      </motion.div>
    </main>
  );
}
