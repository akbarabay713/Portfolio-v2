import { useEffect, type RefObject } from "react";

const SELECTOR =
  'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * While `active`, keeps keyboard focus inside `ref`: Tab / Shift+Tab wrap at the
 * ends, and focus is pulled back in if it ever escapes. Moves focus inside on
 * activation if it isn't already.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;

    const items = () =>
      Array.from(el.querySelectorAll<HTMLElement>(SELECTOR)).filter(
        (n) => n.offsetParent !== null,
      );

    if (!el.contains(document.activeElement)) items()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = items();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      const a = document.activeElement;
      if (!el.contains(a)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && a === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && a === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ref, active]);
}
