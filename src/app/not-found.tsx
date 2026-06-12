"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import Button from "@/components/atoms/Button";
import { fadeUpVariants } from "@/constants";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6 }}
      >
        <p className="select-none text-[120px] font-extrabold leading-none tracking-tighter text-content/5 sm:text-[180px]">
          404
        </p>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <h1 className="-mt-6 mb-2 text-2xl font-bold text-content">
          Page not found
        </h1>
        <p className="mb-8 max-w-sm text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Button
          as={Link}
          href="/"
          variant="primary"
          caps
          className="group"
          startIcon={
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
          }
        >
          Back to home
        </Button>
      </motion.div>
    </main>
  );
}
