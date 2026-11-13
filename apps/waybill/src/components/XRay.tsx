"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

export const XRAY_EVENT = "xray:toggle";

interface Report {
  lcp: number | null;
  fcp: number | null;
  cls: number;
  jsKb: number;
  jsFiles: number;
  totalKb: number;
  nodes: number;
  colors: [string, string][];
}

const TOKENS: [string, string][] = [
  ["Kraft", "--kraft"],
  ["Paper", "--paper"],
  ["Ink", "--ink"],
  ["Muted", "--muted-paper"],
  ["Stamp", "--stamp"],
];

const kb = (bytes: number) => Math.round(bytes / 1024);

/**
 * X-ray mode: press X (or the X-ray button) and the page is scanned into a
 * negative that labels its own parts, with an inspection report measured from
 * this visit. Esc or X again closes it.
 */
export default function XRay() {
  const [on, setOn] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const vitals = useRef({ lcp: null as number | null, fcp: null as number | null, cls: 0 });

  // Record this visit's paint and layout-shift numbers from the start.
  useEffect(() => {
    const observers: PerformanceObserver[] = [];
    const watch = (type: string, cb: (list: PerformanceObserverEntryList) => void) => {
      try {
        const po = new PerformanceObserver(cb);
        po.observe({ type, buffered: true });
        observers.push(po);
      } catch {
        // Entry type not supported in this browser.
      }
    };
    watch("largest-contentful-paint", (l) => {
      const last = l.getEntries().at(-1);
      if (last) vitals.current.lcp = Math.round(last.startTime);
    });
    watch("paint", (l) => {
      const fcp = l.getEntries().find((e) => e.name === "first-contentful-paint");
      if (fcp) vitals.current.fcp = Math.round(fcp.startTime);
    });
    watch("layout-shift", (l) => {
      for (const e of l.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
        if (!e.hadRecentInput) vitals.current.cls += e.value;
      }
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const measure = (): Report => {
      const res = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
      const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      const js = res.filter((r) => r.initiatorType === "script" || /\.js(\?|$)/.test(r.name));
      // Compressed size, which is the same whether a file came over the network or from cache.
      const size = (r: PerformanceResourceTiming) => r.encodedBodySize || 0;
      const root = getComputedStyle(document.documentElement);
      return {
        ...vitals.current,
        cls: Math.round(vitals.current.cls * 1000) / 1000,
        jsKb: kb(js.reduce((s, r) => s + size(r), 0)),
        jsFiles: js.length,
        totalKb: kb(res.reduce((s, r) => s + size(r), 0) + (nav?.encodedBodySize ?? 0)),
        nodes: document.getElementsByTagName("*").length,
        colors: TOKENS.map(([name, v]) => [name, root.getPropertyValue(v).trim()]),
      };
    };

    // Each labelled part shows its rendered size next to its name.
    const label = () => {
      document.querySelectorAll<HTMLElement>("[data-xray]").forEach((el) => {
        const r = el.getBoundingClientRect();
        el.dataset.xraySize = `${Math.round(r.width)}×${Math.round(r.height)}`;
      });
    };

    const apply = (next: boolean) => {
      const html = document.documentElement;
      flushSync(() => {
        if (next) {
          label();
          setReport(measure());
          html.dataset.xray = "";
        } else {
          delete html.dataset.xray;
        }
        setOn(next);
      });
    };

    const toggle = (next: boolean) => {
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => unknown;
      };
      if (reduce || !doc.startViewTransition) return apply(next);
      document.documentElement.dataset.xrayScan = next ? "in" : "out";
      const t = doc.startViewTransition(() => apply(next)) as { finished: Promise<void> };
      t.finished.finally(() => delete document.documentElement.dataset.xrayScan);
    };

    const isOn = () => "xray" in document.documentElement.dataset;

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      if (e.key === "x" || e.key === "X") toggle(!isOn());
      else if (e.key === "Escape" && isOn()) toggle(false);
    };
    const onToggle = () => toggle(!isOn());

    window.addEventListener("keydown", onKey);
    window.addEventListener(XRAY_EVENT, onToggle);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(XRAY_EVENT, onToggle);
    };
  }, []);

  return (
    <>
      <div className="xray-line" aria-hidden="true">
        <span>SCANNING</span>
      </div>
      <p className="sr-only" aria-live="polite">
        {on ? "X-ray mode on. Press Escape to close." : ""}
      </p>
      {on && report && (
        <aside className="xray-report" aria-label="Inspection report">
          <div className="xray-report-head">
            <span>INSPECTION REPORT</span>
            <button
              type="button"
              className="xray-close"
              onClick={() => window.dispatchEvent(new Event(XRAY_EVENT))}
            >
              Close <kbd>Esc</kbd>
            </button>
          </div>
          <dl>
            <div>
              <dt>Largest paint</dt>
              <dd>{report.lcp !== null ? `${report.lcp} ms` : "n/a"}</dd>
            </div>
            <div>
              <dt>First paint</dt>
              <dd>{report.fcp !== null ? `${report.fcp} ms` : "n/a"}</dd>
            </div>
            <div>
              <dt>Layout shift</dt>
              <dd>{report.cls}</dd>
            </div>
            <div>
              <dt>JavaScript</dt>
              <dd>
                {report.jsKb} KB in {report.jsFiles} files
              </dd>
            </div>
            <div>
              <dt>Page weight</dt>
              <dd>
                {report.totalKb} KB compressed
              </dd>
            </div>
            <div>
              <dt>Elements</dt>
              <dd>{report.nodes}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>Archivo, width 100–125 · JetBrains Mono</dd>
            </div>
            <div>
              <dt>Colours</dt>
              <dd className="xray-swatches">
                {report.colors.map(([name, value]) => (
                  <i key={name} title={`${name} ${value}`} style={{ background: value }} />
                ))}
              </dd>
            </div>
            <div>
              <dt>Built with</dt>
              <dd>Next.js 16, React 19, plain CSS</dd>
            </div>
          </dl>
          <p className="xray-foot">Measured on this visit, in your browser.</p>
        </aside>
      )}
    </>
  );
}
