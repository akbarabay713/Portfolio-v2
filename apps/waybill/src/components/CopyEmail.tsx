"use client";

import { useState } from "react";

/** Copies the address, for people who don't use a mail app. */
export default function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      // Clipboard blocked: select the address so a normal copy works.
      const el = document.querySelector(".post-stamp .big");
      if (el) window.getSelection()?.selectAllChildren(el);
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2200);
  };

  return (
    <button type="button" className="btn btn-line copy-btn" onClick={copy} data-state={state}>
      <span aria-live="polite">
        {state === "copied" ? "Copied" : state === "failed" ? "Selected, press copy" : "Copy address"}
      </span>
    </button>
  );
}
