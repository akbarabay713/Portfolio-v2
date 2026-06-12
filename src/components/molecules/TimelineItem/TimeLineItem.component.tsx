"use client";

import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

export interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string[];
  image?: string | StaticImageData;
}

export const TimelineItem = ({
  title,
  subtitle,
  date,
  description,
  image,
}: TimelineItemProps) => {
  return (
    <div className="group relative pb-8 pl-8 last:pb-0 sm:pl-12 sm:pb-12">
      {/* Vertical rail */}
      <div className="absolute left-[11px] top-[24px] bottom-0 w-px bg-line group-last:hidden" />

      {/* Timeline node */}
      <div className="absolute left-0 top-[24px] flex h-6 w-6 -translate-y-1/2 items-center justify-center">
        <div className="z-10 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-canvas transition-transform duration-300 group-hover:scale-125" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative overflow-hidden rounded-lg bg-surface p-6 shadow-card"
      >
        {/* Accent edge revealed on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10 flex-1">
          <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row">
            <div className="flex items-start gap-4">
              {image && (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-line bg-elevated">
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
                <h3 className="text-lg font-bold tracking-tight text-content">
                  {title}
                </h3>
                <h4 className="mt-1 text-sm font-medium text-muted">
                  {subtitle}
                </h4>
              </div>
            </div>
            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-faint sm:pt-1">
              {date}
            </span>
          </div>

          <ul className="space-y-3">
            {description.map((desc, index) => (
              <li
                key={index}
                className="text-sm leading-relaxed text-muted"
              >
                {desc}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};
