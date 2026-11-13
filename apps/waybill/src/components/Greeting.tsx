"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** By the visitor's own clock, not Yogyakarta's. */
const greeting = () => {
  const h = new Date().getHours();
  if (h < 5) return "hi, night owl!";
  if (h < 12) return "good morning!";
  if (h < 18) return "good afternoon!";
  return "good evening!";
};

/** A handwritten hello above the name; nothing is rendered on the server. */
export default function Greeting() {
  const text = useSyncExternalStore(subscribe, greeting, () => "");
  return (
    <p className="greeting" aria-hidden={text ? undefined : true}>
      {text}
    </p>
  );
}
