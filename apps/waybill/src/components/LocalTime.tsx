"use client";

import { useSyncExternalStore } from "react";

const ZONE = "Asia/Jakarta";
const ZONE_OFFSET_H = 7;

// One shared ticker that fires on each new minute.
const subscribe = (notify: () => void) => {
  let timer: ReturnType<typeof setTimeout>;
  const tick = () => {
    notify();
    timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
  };
  timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
  return () => clearTimeout(timer);
};

const clock = () =>
  new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: ZONE });

const offset = () => {
  const visitor = -new Date().getTimezoneOffset() / 60;
  const diff = ZONE_OFFSET_H - visitor;
  if (diff === 0) return "same time as you";
  const hours = `${Math.abs(diff)} h`;
  return diff > 0 ? `${hours} ahead of you` : `${hours} behind you`;
};

/** "21:04 in Yogyakarta", live. The server renders the plain zone instead. */
export function LocalClock() {
  const time = useSyncExternalStore(subscribe, clock, () => "");
  return <span suppressHydrationWarning>{time ? `${time} in Yogyakarta` : "UTC+7"}</span>;
}

/** How far the visitor's clock is from Yogyakarta, e.g. "6 h ahead of you". */
export function TimeOffset() {
  const text = useSyncExternalStore(subscribe, offset, () => "");
  // Always rendered, so the line's space is reserved before the time is known.
  return <span className="offset">{text || "\u00a0"}</span>;
}
