"use client";

import Link from "next/link";

import { motion, MotionValue, useSpring, useTransform } from "framer-motion";

import { useRef } from "react";

export type DockItemProps = {
  icon: React.ReactNode;
  href?: string;
  tooltip?: string;
  mouseX: MotionValue<number>;
  onClick?: () => void;
};

const DockItem = ({ icon, href, tooltip, mouseX, onClick }: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect();

    if (!bounds || val === Infinity) return 150;

    return val - bounds.x - bounds.width / 2;
  });

  // dynamic width based on cursor distance
  const width = useTransform(distance, [-150, 0, 150], [40, 60, 40]);

  const smoothWidth = useSpring(width, {
    mass: 0.2,
    stiffness: 150,
    damping: 12,
  });

  const content = (
    <div
      className="
        group
        relative
        flex h-10
        items-end justify-center
        shrink-0
    
      "
    >
      <motion.div
        ref={ref}
        style={{
          width: smoothWidth,
          height: smoothWidth,
        }}
        className="
          flex items-center justify-center
          rounded-full
          border border-white/10
          bg-black/10
          backdrop-blur-xl
          transition-colors duration-200
          hover:bg-black/60
          will-change-transform
          cursor-pointer
        "
        onClick={onClick}
      >
        {icon}
      </motion.div>

      {tooltip ? (
        <div
          className="
            pointer-events-none
            absolute bottom-full mb-6
            whitespace-nowrap
            rounded-2xl
            border border-white/10
            bg-black/80
            px-4 py-2
            text-sm text-white
            opacity-0
            translate-y-2
            transition-all duration-200
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
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
