"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Thin green progress line on the right edge, scrubbed to page scroll. */
const ScrollLine = () => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const fill = ref.current?.firstElementChild;
      if (!fill) return;

      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.4 },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed right-3 top-0 z-40 hidden h-full w-0.5 bg-line lg:block"
    >
      <div className="h-full w-full origin-top bg-accent" />
    </div>
  );
};

export default ScrollLine;
