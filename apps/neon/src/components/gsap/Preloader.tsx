"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const NAME = "AKBAR";
const SEEN_KEY = "neon-intro-seen";

/** Phones skip the curtain so the page shows sooner on slow connections. */
const skipsIntro = () =>
  window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 639px)").matches ||
  Boolean(sessionStorage.getItem(SEEN_KEY));

/**
 * How long hero entrances should wait for the preloader curtain. Zero when
 * the preloader is skipped.
 */
export const introDelay = () => {
  if (typeof window === "undefined") return 0.8;
  return skipsIntro() ? 0 : 0.8;
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
      if (skipsIntro()) {
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
        duration: 0.45,
        ease: "power4.out",
        stagger: 0.04,
      })
        .from("[data-pre-bar]", { scaleX: 0, duration: 0.3, ease: "power2.inOut" }, "-=0.2")
        .to(ref.current, {
          yPercent: -100,
          duration: 0.55,
          ease: "power4.inOut",
          delay: 0.05,
        });
    },
    { scope: ref },
  );

  if (done) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-[90] hidden flex-col items-center justify-center gap-4 bg-canvas sm:flex"
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
