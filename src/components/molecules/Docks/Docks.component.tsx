"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Code2, Mail, Moon, Pencil, Sun, UserRound, Home } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import Box from "@/components/atoms/Box";
import DockItem from "@/components/atoms/Dock";
import IcGithub from "@/components/atoms/Icons/IcGithub";
import IcLinkedin from "@/components/atoms/Icons/IcLinkedin";
import { siteConfig } from "@/constants";

interface NavDock {
  tooltip: string;
  icon: React.ReactNode;
  href: string;
}

const Dock = () => {
  const mouseX = useMotionValue<number>(Infinity);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Defer mount flag to avoid hydration mismatch on the theme toggle.
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  const navigationItems: NavDock[] = useMemo(
    () => [
      { tooltip: "Home", icon: <Home size={18} />, href: "/" },
      { tooltip: "About", icon: <UserRound size={18} />, href: "/about" },
      { tooltip: "Projects", icon: <Code2 size={18} />, href: "/projects" },
      { tooltip: "Blog", icon: <Pencil size={18} />, href: "/blog" },
      { tooltip: "Contact", icon: <Mail size={18} />, href: "/contact" },
    ],
    [],
  );

  const socialItems: NavDock[] = useMemo(
    () => [
      {
        tooltip: "GitHub",
        icon: <IcGithub width={20} height={20} />,
        href: siteConfig.links.github,
      },
      {
        tooltip: "LinkedIn",
        icon: <IcLinkedin width={20} height={20} />,
        href: siteConfig.links.linkedin,
      },
    ],
    [],
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.nav
      aria-label="Primary"
      onMouseMove={(event) => mouseX.set(event.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-end gap-2 rounded-full border border-line bg-surface/80 px-3 py-2 shadow-dialog backdrop-blur-2xl"
    >
      {navigationItems.map((item) => (
        <DockItem
          key={item.tooltip}
          mouseX={mouseX}
          tooltip={item.tooltip}
          icon={item.icon}
          href={item.href}
          active={isActive(item.href)}
        />
      ))}

      <Divider />

      {socialItems.map((item) => (
        <DockItem
          key={item.tooltip}
          mouseX={mouseX}
          tooltip={item.tooltip}
          icon={item.icon}
          href={item.href}
        />
      ))}

      <Divider />

      {mounted && (
        <DockItem
          mouseX={mouseX}
          tooltip={`Switch to ${isDark ? "light" : "dark"} mode`}
          icon={isDark ? <Sun size={18} /> : <Moon size={18} />}
          onClick={toggleTheme}
        />
      )}
    </motion.nav>
  );
};

const Divider = () => <Box className="mx-1 h-10 w-px bg-line" />;

export default Dock;
