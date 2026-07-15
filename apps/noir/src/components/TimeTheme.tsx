"use client";

import { useEffect } from "react";
import { phaseFor } from "@/lib/time";

/**
 * Writes the current time-of-day phase onto <html data-phase="…"> so the CSS
 * palette shifts with the local hour, and keeps it in sync each minute.
 */
const TimeTheme = () => {
  useEffect(() => {
    const apply = () => {
      document.documentElement.dataset.phase = phaseFor(new Date().getHours());
    };
    apply();
    const id = window.setInterval(apply, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return null;
};

export default TimeTheme;
