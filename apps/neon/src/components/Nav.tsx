"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { settings, siteConfig } from "@portfolio/content";

import { scrollToAnchor } from "@/components/gsap/SmoothScroll";

const links = [
  { label: "Home", href: "#home" },
  { label: "About Me", href: "#about" },
  { label: "Skills", href: "#skills" },
  ...(settings.sections.experience
    ? [{ label: "Experience", href: "#experience" }]
    : []),
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

/** Hamburger button + full-screen overlay navigation. */
const Nav = () => {
  const [open, setOpen] = useState(false);

  const goTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // Wait for the overlay to release the body scroll lock before scrolling.
    gsap.delayedCall(0.15, () => scrollToAnchor(href));
  };

  // Lock scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="fixed right-6 top-6 z-[70] flex h-12 w-12 flex-col items-center justify-center gap-1.5 sm:right-10 sm:top-8"
      >
        <motion.span
          animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
          className="block h-0.5 w-7 bg-content"
        />
        <motion.span
          animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
          className="block h-0.5 w-7 bg-content"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-2 bg-canvas/95 backdrop-blur-sm"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={goTo(link.href)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.35 }}
                className="font-display text-5xl text-muted transition-colors hover:text-accent sm:text-6xl"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={`mailto:${siteConfig.email}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.05 * links.length + 0.1 }}
              className="mt-8 text-sm text-faint transition-colors hover:text-accent"
            >
              {siteConfig.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
