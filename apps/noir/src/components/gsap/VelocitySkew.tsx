"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Renderless: skews every [data-skew] element with scroll velocity and eases
 * it back — fast flicks make images lean into the motion.
 */
const VelocitySkew = () => {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const setter = gsap.quickSetter("[data-skew]", "skewY", "deg");
    const clamp = gsap.utils.clamp(-5, 5);
    const proxy = { skew: 0 };

    ScrollTrigger.create({
      onUpdate(self) {
        const skew = clamp(self.getVelocity() / -350);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.9,
            ease: "power3.out",
            overwrite: true,
            onUpdate: () => setter(proxy.skew),
          });
        }
      },
    });
  });

  return null;
};

export default VelocitySkew;
