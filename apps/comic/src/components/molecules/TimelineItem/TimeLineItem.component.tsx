"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

import { EASE_OUT } from "@/constants";

export interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string[];
  image?: string | StaticImageData;
}

const viewport = { once: true, margin: "-60px" } as const;

const listContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const listItem = {
  initial: { opacity: 0, x: -12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT } },
};

export const TimelineItem = ({
  title,
  subtitle,
  date,
  description,
  image,
}: TimelineItemProps) => {
  return (
    <div className="group relative pb-8 pl-8 last:pb-0 sm:pl-12 sm:pb-12">
      {/* Ink rail that draws itself downward. */}
      <motion.div
        className="absolute left-[11px] top-[24px] bottom-0 w-0.5 origin-top bg-outline group-last:hidden"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      />

      {/* Node that pops in. */}
      <div className="absolute left-0 top-[24px] flex h-6 w-6 -translate-y-1/2 items-center justify-center">
        <motion.div
          className="z-10 h-3.5 w-3.5 rounded-full border-2 border-outline bg-accent transition-transform duration-300 group-hover:scale-125"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={viewport}
          transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.15 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="ink-border ink-shadow relative rounded-lg bg-surface p-6 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[7px_7px_0_0_var(--outline)]"
      >
        <div className="relative z-10 flex-1">
          <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row">
            <div className="flex items-start gap-4">
              {image && (
                <div className="ink-border relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-elevated">
                  <Image
                    src={image}
                    alt={`${subtitle} logo`}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              )}
              <div>
                <h3 className="font-display text-xl tracking-wide text-content">
                  {title}
                </h3>
                <h4 className="mt-1 text-sm font-semibold text-muted">
                  {subtitle}
                </h4>
              </div>
            </div>
            <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-faint sm:pt-1">
              {date}
            </span>
          </div>

          <motion.ul
            className="space-y-3"
            variants={listContainer}
            initial="initial"
            whileInView="animate"
            viewport={viewport}
          >
            {description.map((desc, index) => (
              <motion.li
                key={index}
                variants={listItem}
                className="text-sm leading-relaxed text-muted"
              >
                {desc}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </div>
  );
};
