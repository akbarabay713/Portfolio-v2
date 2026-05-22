"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Code2, Mail, Moon, Pencil, Sun, UserRound } from "lucide-react";
import { useTheme } from "next-themes";

import Box from "@/components/atoms/Box";
import DockItem from "@/components/atoms/Dock";
import { DockItemProps } from "@/components/atoms/Dock/Dock.component";
import IcGithub from "@/components/atoms/Icons/IcGithub";
import IcLinkedin from "@/components/atoms/Icons/IcLinkedin";

const Dock = () => {
  const mouseX = useMotionValue<number>(Infinity);

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  // Defer mount flag to next tick to avoid synchronous setState inside effect
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navigationItems: Omit<DockItemProps, "mouseX">[] = useMemo(
    () => [
      {
        tooltip: "Root",
        icon: <span className="text-lg">~/</span>,
        href: "/",
      },
      {
        tooltip: "About",
        icon: <UserRound size={18} className="text-black dark:text-white" />,
        href: "/about",
      },
      {
        tooltip: "Projects",
        icon: <Code2 size={18} className="text-black dark:text-white" />,
        href: "/projects",
      },
      {
        tooltip: "Blog",
        icon: <Pencil size={18} className="text-black dark:text-white" />,
        href: "/blog",
      },
      {
        tooltip: "Contact",
        icon: <Mail size={18} className="text-black dark:text-white" />,
        href: "/contact",
      },
    ],
    [],
  );

  const socialItems: Omit<DockItemProps, "mouseX">[] = useMemo(
    () => [
      {
        tooltip: "GitHub",
        icon: (
          <IcGithub
            width={22}
            height={22}
            className="text-black dark:text-white"
          />
        ),
        href: "https://github.com/akbarabay713",
      },
      {
        tooltip: "LinkedIn",
        icon: (
          <IcLinkedin
            width={22}
            height={22}
            className="text-black dark:text-white"
          />
        ),
        href: "https://www.linkedin.com/in/akbarabu/",
      },
    ],
    [],
  );

  return (
    <motion.div
      onMouseMove={(event) => {
        mouseX.set(event.pageX);
      }}
      onMouseLeave={() => {
        mouseX.set(Infinity);
      }}
      className="
        fixed bottom-4 left-1/2 z-50
        flex items-end gap-2
        -translate-x-1/2
        rounded-full
        border border-white/10
   
        px-3 py-2
        backdrop-blur-2xl
        shadow-[0_0_40px_rgba(0,0,0,0.12)]
        dark:shadow-[0_0_40px_rgba(0,0,0,0.3)]
      "
    >
      {navigationItems.map((item) => (
        <DockItem
          key={item.tooltip}
          mouseX={mouseX}
          tooltip={item.tooltip}
          icon={item.icon}
          href={item.href}
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
          tooltip={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          icon={
            theme === "dark" ? (
              <Sun size={18} className="text-black dark:text-white" />
            ) : (
              <Moon size={18} className="text-black dark:text-white" />
            )
          }
          onClick={toggleTheme}
        />
      )}
    </motion.div>
  );
};

const Divider = () => {
  return <Box className="mx-1 h-10 w-px bg-black/10 dark:bg-white/10" />;
};

export default Dock;
