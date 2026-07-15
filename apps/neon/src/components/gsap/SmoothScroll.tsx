"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

/**
 * Scroll to an in-page anchor, going through ScrollSmoother when it's active
 * (native anchor jumps don't work with transform-based scrolling).
 */
export const scrollToAnchor = (href: string) => {
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(href, true, "top top");
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }
};

/**
 * ScrollSmoother wrapper: smooths wheel scrolling and enables data-speed /
 * data-lag parallax on children. Fixed-position chrome (nav, rails, cursor)
 * must live OUTSIDE this wrapper. Touch devices keep native scrolling.
 */
const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.1,
      effects: true,
    });
  });

  return (
    <div id="smooth-wrapper" ref={ref}>
      <div id="smooth-content">{children}</div>
    </div>
  );
};

export default SmoothScroll;
