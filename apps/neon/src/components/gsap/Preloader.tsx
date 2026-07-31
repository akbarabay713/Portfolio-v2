"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const NAME = "AKBAR";
const SEEN_KEY = "neon-intro-seen";

/**
 * How long hero entrances should wait for the preloader curtain. Zero on
 * repeat visits within the same session (the preloader is skipped).
 */
export const introDelay = () => {
  if (typeof window === "undefined") return 1.3;
  return sessionStorage.getItem(SEEN_KEY) ? 0 : 1.3;
};

/**
 * intro: name staggers up char by char, green bar draws underneath, curtain lifts.
 * shown once per browser session.
 */
const Preloader = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        sessionStorage.getItem(SEEN_KEY)
      ) {
        setDone(true);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(SEEN_KEY, "1");
          setDone(true);
        },
      });
      tl.from("[data-pre-char]", {
        yPercent: 110,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.06,
      })
        .from("[data-pre-bar]", { scaleX: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.3")
        .to(ref.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          delay: 0.15,
        });
    },
    { scope: ref },
  );

  if (done) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-4 bg-canvas"
    >
      <p className="font-display overflow-hidden pb-[0.08em] text-6xl text-content sm:text-8xl">
        {NAME.split("").map((char, i) => (
          <span key={i} data-pre-char className="inline-block will-change-transform">
            {char}
          </span>
        ))}
      </p>
      <div data-pre-bar className="h-1 w-40 origin-left bg-accent sm:w-56" />
    </div>
  );
};

export default Preloader;
