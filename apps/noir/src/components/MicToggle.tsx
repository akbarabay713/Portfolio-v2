"use client";

import { useEffect, useState } from "react";
import { disableMic, enableMic } from "@/lib/audio";

type State = "off" | "on" | "error";

/** Toggle mic reactivity for the hero flow field. */
const MicToggle = () => {
  const [state, setState] = useState<State>("off");

  // Release the mic if the component unmounts while active.
  useEffect(() => () => disableMic(), []);

  const toggle = async () => {
    if (state === "on") {
      disableMic();
      setState("off");
      return;
    }
    try {
      await enableMic();
      setState("on");
    } catch {
      setState("error");
      window.setTimeout(() => setState("off"), 2200);
    }
  };

  const label =
    state === "on" ? "REACTING TO MIC" : state === "error" ? "MIC BLOCKED" : "REACT TO MIC";

  return (
    <button
      onClick={toggle}
      aria-pressed={state === "on"}
      className="mono flex items-center gap-2 text-xs text-faint transition-colors hover:text-text"
    >
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${
          state === "on" ? "animate-pulse bg-accent" : state === "error" ? "bg-negative" : "bg-faint"
        }`}
        style={state === "error" ? { background: "#ff6b6b" } : undefined}
      />
      {label}
    </button>
  );
};

export default MicToggle;
