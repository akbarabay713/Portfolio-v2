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
    <div className="relative pl-8 sm:pl-12 pb-8 sm:pb-12 group last:pb-0">
      {/* Vertical Line */}
      <div className="absolute left-[11px] top-[24px] bottom-0 w-[2px] bg-gray-200 dark:bg-white/10 group-last:hidden"></div>

      {/* Timeline Dot */}
      <div className="absolute left-0 top-[24px] w-[24px] h-[24px] flex items-center justify-center -translate-y-1/2">
        <div className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 ring-4 ring-white dark:ring-[#131313] z-10 transition-transform duration-300 group-hover:scale-125"></div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative flex flex-col sm:flex-row justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-[#131313]/80 border border-gray-100 dark:border-white/5 shadow-sm dark:shadow-none dark:backdrop-blur-sm overflow-hidden"
      >
        {/* Glow effect on hover inside the card */}
        <div className="absolute inset-0 bg-linier-to-r from-violet-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Left glowing border effect on the card */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-linier-to-b from-transparent via-violet-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="flex-1 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
            <div className="flex gap-4 items-start">
              {image && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                  <Image src={image} alt={title} fill className="object-cover" sizes="48px" />
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
                  {title}
                </h3>
                <h4 className="text-base font-medium text-gray-600 dark:text-gray-400 mt-1">
                  {subtitle}
                </h4>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 font-mono tracking-wider shrink-0 sm:pt-1">
              {date}
            </span>
          </div>

          <div className="space-y-3">
            {description.map((desc, index) => (
              <p
                key={index}
                className="text-gray-600 dark:text-gray-400 body-text-md-regular leading-relaxed"
              >
                {desc}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
