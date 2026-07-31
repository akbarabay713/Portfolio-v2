"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SplitHeadingProps {
  text: string;
  className?: string;
  as?: "span" | "h2";
  /** Delay before the reveal starts (seconds). */
  delay?: number;
  /** true: reveal when scrolled into view. false: reveal on mount (hero). */
  scroll?: boolean;
}

/**
 * splits text into chars and staggers them up from behind a clipped line.
 * words stay wrapped in whitespace-nowrap spans so line breaks land between words.
 */
const SplitHeading = ({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  scroll = false,
}: SplitHeadingProps) => {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const chars = ref.current?.querySelectorAll("[data-char]");
      if (!chars?.length) return;

      gsap.from(chars, {
        yPercent: 110,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.025,
        delay,
        ...(scroll && {
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            once: true,
          },
        }),
      });
    },
    { scope: ref },
  );

  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((word, w) => (
        <span
          key={w}
          aria-hidden="true"
          className="inline-block overflow-hidden whitespace-nowrap pb-[0.08em] align-bottom"
        >
          {word.split("").map((char, c) => (
            <span key={c} data-char className="inline-block will-change-transform">
              {char}
            </span>
          ))}
          {w < words.length - 1 && <span data-char className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
};

export default SplitHeading;
