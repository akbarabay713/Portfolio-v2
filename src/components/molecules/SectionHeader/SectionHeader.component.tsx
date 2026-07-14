"use client";

import { motion } from "framer-motion";

import Heading from "@/components/atoms/Heading";
import Body from "@/components/atoms/Body";
import { EASE_OUT, fadeUpVariants } from "@/constants";
import { cn } from "@/lib/utils.lib";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  as?: React.ElementType;
}

const viewport = { once: true, margin: "-80px" } as const;

const SectionHeader = ({
  title,
  subtitle,
  className,
  as = "h1",
}: SectionHeaderProps) => (
  <div className={cn("mb-10", className)}>
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={viewport}
      variants={fadeUpVariants}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      <Heading as={as} variant="h2" weight="bold" className="mb-3">
        <span className="relative isolate inline-block">
          {/* Highlighter marker that swipes in under the title. */}
          <motion.span
            aria-hidden="true"
            className="absolute -left-[0.08em] -right-[0.2em] bottom-[0.05em] -z-10 h-[0.34em] origin-left -skew-x-6 bg-highlight"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.25 }}
          />
          {title}
        </span>
      </Heading>
    </motion.div>

    {subtitle && (
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={viewport}
        variants={fadeUpVariants}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}
      >
        <Body variant="lg" className="max-w-2xl text-muted">
          {subtitle}
        </Body>
      </motion.div>
    )}
  </div>
);

export default SectionHeader;
