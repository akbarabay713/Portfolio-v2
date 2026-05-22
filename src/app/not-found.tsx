"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUpVariants } from "@/constants";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-[120px] sm:text-[180px] font-extrabold leading-none tracking-tighter text-gray-200 dark:text-white/5 select-none">
          404
        </h1>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 -mt-6">
          Page not found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-violet-600/25"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          Back to home
        </Link>
      </motion.div>
    </main>
  );
}
