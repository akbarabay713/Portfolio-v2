"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

interface CommandItem {
  id: string;
  label: string;
  category: string;
  action: () => void;
}

interface UseCommandPaletteReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  query: string;
  setQuery: (q: string) => void;
  filteredItems: CommandItem[];
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
  executeSelected: () => void;
}

export function useCommandPalette(items: CommandItem[]): UseCommandPaletteReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setRawQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const setQuery = useCallback((q: string) => {
    setRawQuery(q);
    setSelectedIndex(0);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, [setQuery]);
  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) {
        setQuery("");
        setSelectedIndex(0);
      }
      return !prev;
    });
  }, [setQuery]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(lower) ||
        item.category.toLowerCase().includes(lower),
    );
  }, [items, query]);



  const executeSelected = useCallback(() => {
    const item = filteredItems[selectedIndex];
    if (item) {
      item.action();
      close();
    }
  }, [filteredItems, selectedIndex, close]);

  // Keyboard shortcut: ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, toggle, close]);

  // Arrow keys & Enter navigation
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        executeSelected();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, filteredItems.length, executeSelected]);

  return {
    isOpen,
    open,
    close,
    toggle,
    query,
    setQuery,
    filteredItems,
    selectedIndex,
    setSelectedIndex,
    executeSelected,
  };
}

/** Build command items from portfolio data */
export function useCommandItems(): CommandItem[] {
  const router = useRouter();

  return useMemo(() => {
    const pages: CommandItem[] = [
      { id: "nav-home",     label: "Home",     category: "Navigation", action: () => router.push("/") },
      { id: "nav-about",    label: "About",    category: "Navigation", action: () => router.push("/about") },
      { id: "nav-projects", label: "Projects", category: "Navigation", action: () => router.push("/projects") },
      { id: "nav-blog",     label: "Blog",     category: "Navigation", action: () => router.push("/blog") },
      { id: "nav-contact",  label: "Contact",  category: "Navigation", action: () => router.push("/contact") },
    ];

    const social: CommandItem[] = [
      { id: "social-github",   label: "GitHub",   category: "Social", action: () => window.open("https://github.com/pmint05", "_blank") },
      { id: "social-linkedin", label: "LinkedIn", category: "Social", action: () => window.open("https://www.linkedin.com/in/pmint05/", "_blank") },
      { id: "social-x",        label: "X / Twitter", category: "Social", action: () => window.open("https://x.com/pmint05", "_blank") },
    ];

    return [...pages, ...social];
  }, [router]);
}
