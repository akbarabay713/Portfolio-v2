"use client";

import { useEffect, useState } from "react";

/** The X-ray button in the top bar; mirrors the mode however it was switched. */
export default function XRayToggle({ place = "bar" }: { place?: "bar" | "footer" }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const sync = () => setOn("xray" in html.dataset);
    const mo = new MutationObserver(sync);
    mo.observe(html, { attributes: true, attributeFilter: ["data-xray"] });
    return () => mo.disconnect();
  }, []);

  return (
    <button
      type="button"
      className={place === "bar" ? "xray-btn" : "link-btn xray-footer"}
      aria-pressed={on}
      onClick={() => window.dispatchEvent(new Event("xray:toggle"))}
    >
      X-ray{place === "bar" && <kbd aria-hidden="true">X</kbd>}
    </button>
  );
}
