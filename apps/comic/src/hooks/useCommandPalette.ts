"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { navItems, socialLinks, contactEmail } from "@/constants";

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

export function useCommandItems(): CommandItem[] {
  const router = useRouter();

  return useMemo(() => {
    const pages: CommandItem[] = navItems.map((item) => ({
      id: `nav-${item.href}`,
      label: item.label,
      category: "Navigation",
      action: () => router.push(item.href),
    }));

    const social: CommandItem[] = socialLinks.map((link) => ({
      id: `social-${link.label.toLowerCase()}`,
      label: link.label,
      category: "Social",
      action: () => window.open(link.href, "_blank", "noopener,noreferrer"),
    }));

    const actions: CommandItem[] = [
      {
        id: "action-email",
        label: "Send an email",
        category: "Actions",
        action: () => {
          window.location.href = `mailto:${contactEmail}`;
        },
      },
    ];

    return [...pages, ...social, ...actions];
  }, [router]);
}
