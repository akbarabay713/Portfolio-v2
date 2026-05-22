"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, CornerDownLeft } from "lucide-react";
import { useCommandPalette, useCommandItems } from "@/hooks/useCommandPalette";

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

  // Auto-focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selected = listRef.current.querySelector("[data-selected='true']");
    if (selected) {
      selected.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Group items by category
  const grouped = filteredItems.reduce<Record<string, typeof filteredItems>>(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {},
  );

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-[90vw] max-w-lg"
          >
            <div className="bg-white dark:bg-[#111118] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-white/5">
                <Search size={18} className="text-gray-400 dark:text-gray-500 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search pages, links..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none"
                />
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[10px] font-mono text-gray-400 dark:text-gray-500">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div ref={listRef} className="max-h-[320px] overflow-y-auto p-2">
                {filteredItems.length === 0 ? (
                  <div className="py-8 text-center text-sm text-gray-400 dark:text-gray-500">
                    No results found
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, categoryItems]) => (
                    <div key={category} className="mb-2 last:mb-0">
                      <p className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 py-1.5">
                        {category}
                      </p>
                      {categoryItems.map((item) => {
                        flatIndex++;
                        const isSelected = flatIndex === selectedIndex;
                        const currentIndex = flatIndex;
                        return (
                          <button
                            key={item.id}
                            data-selected={isSelected}
                            onMouseEnter={() => setSelectedIndex(currentIndex)}
                            onClick={() => {
                              setSelectedIndex(currentIndex);
                              executeSelected();
                            }}
                            className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                              isSelected
                                ? "bg-violet-500/10 text-violet-600 dark:text-violet-300"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                            }`}
                          >
                            <span className="font-medium">{item.label}</span>
                            {isSelected && (
                              <ArrowRight size={14} className="text-violet-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer hints */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-gray-100 dark:border-white/5 text-[11px] text-gray-400 dark:text-gray-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 font-mono">↑↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <CornerDownLeft size={12} />
                    Select
                  </span>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 font-mono">ESC</kbd>
                  Close
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
