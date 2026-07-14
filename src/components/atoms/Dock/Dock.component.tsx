"use client";

import Link from "next/link";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils.lib";

export type DockItemProps = {
  icon: React.ReactNode;
  href?: string;
  tooltip?: string;
  mouseX: MotionValue<number>;
  active?: boolean;
  onClick?: () => void;
  baseSize?: number;
  maxSize?: number;
};

const DockItem = ({
  icon,
  href,
  tooltip,
  mouseX,
  active,
  onClick,
  baseSize = 40,
  maxSize = 60,
}: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds || val === Infinity) return 150;
    return val - bounds.x - bounds.width / 2;
  });

  // Magnify based on cursor proximity.
  const width = useTransform(distance, [-150, 0, 150], [baseSize, maxSize, baseSize]);
  const smoothWidth = useSpring(width, {
    mass: 0.2,
    stiffness: 150,
    damping: 12,
  });

  const content = (
    <div className="group relative flex h-10 shrink-0 items-end justify-center">
      <motion.div
        ref={ref}
        style={{ width: smoothWidth, height: smoothWidth }}
        onClick={onClick}
        whileTap={{ scale: 0.85 }}
        className={cn(
          "flex cursor-pointer items-center justify-center rounded-full border-2 transition-colors duration-200 will-change-transform",
          active
            ? "border-outline bg-accent text-accent-contrast"
            : "border-outline bg-elevated text-muted hover:bg-card-hover hover:text-content",
        )}
      >
        {icon}
      </motion.div>

      {tooltip ? (
        <div className="pointer-events-none absolute bottom-full mb-3 translate-y-2 whitespace-nowrap rounded-md border-2 border-outline bg-surface px-3 py-1.5 text-xs font-bold text-content opacity-0 ink-shadow-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          {tooltip}
        </div>
      ) : null}
    </div>
  );

  if (href) {
    const isExternal =
      href.startsWith("http://") || href.startsWith("https://");

    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }

    return <Link href={href}>{content}</Link>;
  }

  return content;
};

export default DockItem;
