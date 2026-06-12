"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, CornerDownLeft } from "lucide-react";

import Input from "@/components/atoms/Input";
import { useCommandPalette, useCommandItems } from "@/hooks/useCommandPalette";
import { cn } from "@/lib/utils.lib";

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <kbd className="inline-flex items-center gap-1 rounded border border-line bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-faint">
    {children}
  </kbd>
);

const CommandPalette = () => {
  const items = useCommandItems();
  const {
    isOpen,
    close,
    query,
    setQuery,
    filteredItems,
    selectedIndex,
    setSelectedIndex,
    executeSelected,
  } = useCommandPalette(items);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current
      .querySelector("[data-selected='true']")
      ?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const grouped = filteredItems.reduce<Record<string, typeof filteredItems>>(
    (acc, item) => {
      (acc[item.category] ??= []).push(item);
      return acc;
    },
    {},
  );

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-[20%] z-50 w-[90vw] max-w-lg -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-dialog">
              {/* Search */}
              <div className="relative border-b border-line p-3">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 text-faint"
                />
                <Input
                  ref={inputRef}
                  type="search"
                  placeholder="Search pages, links, actions…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
                {filteredItems.length === 0 ? (
                  <div className="py-8 text-center text-sm text-faint">
                    No results found
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, categoryItems]) => (
                    <div key={category} className="mb-2 last:mb-0">
                      <p className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-faint">
                        {category}
                      </p>
                      {categoryItems.map((item) => {
                        flatIndex++;
                        const currentIndex = flatIndex;
                        const isSelected = currentIndex === selectedIndex;
                        return (
                          <button
                            key={item.id}
                            data-selected={isSelected}
                            onMouseEnter={() => setSelectedIndex(currentIndex)}
                            onClick={() => {
                              setSelectedIndex(currentIndex);
                              executeSelected();
                            }}
                            className={cn(
                              "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                              isSelected
                                ? "bg-accent-dim text-accent"
                                : "text-muted hover:bg-elevated",
                            )}
                          >
                            <span className="font-semibold">{item.label}</span>
                            {isSelected && (
                              <ArrowRight size={14} className="shrink-0 text-accent" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[11px] text-faint">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Kbd>↑↓</Kbd> Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <CornerDownLeft size={12} /> Select
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <Kbd>ESC</Kbd> Close
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
