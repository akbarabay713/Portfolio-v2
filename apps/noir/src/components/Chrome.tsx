"use client";

import { useEffect, useRef, useState } from "react";
import Clock from "@/components/Clock";
import HelpOverlay from "@/components/HelpOverlay";
import { useFocusTrap } from "@/lib/useFocusTrap";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Archive", href: "#archive" },
  { label: "Studies", href: "#studies" },
  { label: "Contact", href: "#contact" },
];

/** Fixed top bar: wordmark, section nav (mobile menu below md), help, clock. */
const Chrome = () => {
  const [active, setActive] = useState("#home");
  const [menu, setMenu] = useState(false);
  const [help, setHelp] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useFocusTrap(menuRef, menu);

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  // Reflect the active section in the browser tab title.
  useEffect(() => {
    const label = LINKS.find((l) => l.href === active)?.label;
    document.title =
      !label || active === "#home" ? "Akbar | Studio" : `${label} | Akbar`;
  }, [active]);

  // j / k jump to the next / previous section (power-user shortcut).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menu) {
        setMenu(false);
        return;
      }
      if (e.key !== "j" && e.key !== "k") return;
      if (document.querySelector('[role="dialog"]') || menu) return; // overlay open
      const el = document.activeElement;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
      const i = LINKS.findIndex((l) => l.href === active);
      const next =
        e.key === "j" ? Math.min(LINKS.length - 1, i + 1) : Math.max(0, i - 1);
      if (next !== i) {
        document
          .getElementById(LINKS[next].href.slice(1))
          ?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, menu]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:-z-10 before:h-20 before:bg-linear-to-b before:from-bg before:from-60% before:to-transparent sm:px-8">
        <a href="#home" className="mono -my-3 py-3 text-sm font-semibold tracking-widest text-text">
          AKBAR/DEV
        </a>

        <nav className="mono hidden items-center gap-5 text-xs lg:flex">
          {LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`flex items-center gap-1.5 transition-colors ${
                  isActive ? "text-text" : "text-faint hover:text-muted"
                }`}
              >
                ({link.label.toUpperCase()})
                {isActive && <span className="h-1 w-1 rounded-full bg-accent" />}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setHelp(true)}
            className="mono hidden text-xs text-faint transition-colors hover:text-text sm:inline"
          >
            (?) HELP
          </button>
          <Clock />
          <button
            onClick={() => setMenu(true)}
            aria-label="Open menu"
            className="-my-2.5 -mr-2 flex h-11 w-11 flex-col items-end justify-center gap-1.5 pr-2 lg:hidden"
          >
            <span className="h-px w-6 bg-text" />
            <span className="h-px w-4 bg-text" />
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      {menu && (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="animate-fade fixed inset-0 z-[65] flex flex-col bg-bg px-5 py-4 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="mono text-sm font-semibold tracking-widest text-text">AKBAR/DEV</span>
            <button onClick={() => setMenu(false)} aria-label="Close menu" className="mono -my-2.5 min-h-11 text-xs text-faint">
              CLOSE ✕
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-2">
            {LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenu(false)}
                style={{ animationDelay: `${i * 0.05}s` }}
                className="animate-rise display text-5xl text-text"
              >
                ({link.label.toUpperCase()})
              </a>
            ))}
          </nav>
          <button
            onClick={() => {
              setMenu(false);
              setHelp(true);
            }}
            className="mono min-h-11 self-start text-xs text-faint"
          >
            (?) HELP
          </button>
        </div>
      )}

      <HelpOverlay open={help} onClose={() => setHelp(false)} />
    </>
  );
};

export default Chrome;
