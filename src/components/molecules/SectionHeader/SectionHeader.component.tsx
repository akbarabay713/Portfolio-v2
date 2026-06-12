"use client";

import { motion } from "framer-motion";

import Heading from "@/components/atoms/Heading";
import Body from "@/components/atoms/Body";
import { fadeUpVariants } from "@/constants";
import { cn } from "@/lib/utils.lib";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  as?: React.ElementType;
}

const SectionHeader = ({
  title,
  subtitle,
  className,
  as = "h1",
}: SectionHeaderProps) => (
  <div className={cn("mb-10", className)}>
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeUpVariants}
      transition={{ duration: 0.6 }}
    >
      <Heading as={as} variant="h2" weight="bold" className="mb-3">
        {title}
        <span className="text-accent">.</span>
      </Heading>
    </motion.div>

    {subtitle && (
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Body variant="lg" className="max-w-2xl text-muted">
          {subtitle}
        </Body>
      </motion.div>
    )}
  </div>
);

export default SectionHeader;
