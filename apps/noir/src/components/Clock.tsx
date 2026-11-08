"use client";

import { useEffect, useState } from "react";
import { clockOf, phaseFor } from "@/lib/time";

/** Live "NIGHT / 21:32" indicator in the top chrome. */
const Clock = () => {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const raf = requestAnimationFrame(tick);
    const id = window.setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);

  // Render nothing until mounted to avoid a server/client mismatch.
  if (!now) return <span className="mono text-xs text-muted">-- / --:--</span>;

  const phase = phaseFor(now.getHours());

  return (
    <span className="mono flex items-center gap-2 text-xs text-muted">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="text-text">{phase.toUpperCase()}</span>
      <span className="text-faint">/</span>
      <span>{clockOf(now)}</span>
    </span>
  );
};

export default Clock;
