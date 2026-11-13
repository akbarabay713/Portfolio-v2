"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";

export interface ManifestRow {
  title: string;
  description: string;
  stack: string;
  /** What the last column shows. */
  link:
    | { kind: "live"; href: string; label: string }
    | { kind: "code"; href: string }
    | { kind: "down" }
    | { kind: "private" };
  preview: { src: string; srcSet?: string };
}

const FLOAT_W = 360;
const FLOAT_H = 225;
const GAP = 24;

/**
 * The project table. Each client name opens that site's screenshot under its
 * row (touch and keyboard); with a mouse, hovering a row also floats the
 * screenshot beside the cursor.
 */
export default function Manifest({ rows }: { rows: ManifestRow[] }) {
  const [open, setOpen] = useState<Set<number>>(() => new Set());
  const [hovered, setHovered] = useState<number | null>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const place = useCallback((x: number, y: number) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = floatRef.current;
      if (!el) return;
      // Right of the cursor, flipped to the left near the edge, kept on screen.
      const left =
        x + GAP + FLOAT_W > window.innerWidth ? x - GAP - FLOAT_W : x + GAP;
      const top = Math.min(
        Math.max(8, y - FLOAT_H / 2),
        window.innerHeight - FLOAT_H - 8,
      );
      el.style.transform = `translate3d(${left}px, ${top}px, 0)`;
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  // Hide the floating preview when the page scrolls under a still cursor.
  useEffect(() => {
    if (hovered === null) return;
    const hide = () => setHovered(null);
    window.addEventListener("scroll", hide, { passive: true, once: true });
    return () => window.removeEventListener("scroll", hide);
  }, [hovered]);

  const floating = hovered !== null && !open.has(hovered) ? rows[hovered] : null;

  return (
    <>
      <table className="manifest">
        <thead>
          <tr>
            <th scope="col">Client</th>
            <th scope="col">What I built</th>
            <th scope="col">Stack</th>
            <th scope="col">Live site</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const isOpen = open.has(i);
            const previewId = `preview-${i}`;
            return (
              <Fragment key={row.title}>
                <tr
                  className="row"
                  data-open={isOpen || undefined}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    setHovered(i);
                    place(e.clientX, e.clientY);
                  }}
                  onPointerMove={(e) => {
                    if (e.pointerType === "mouse") place(e.clientX, e.clientY);
                  }}
                  onPointerLeave={() => setHovered((h) => (h === i ? null : h))}
                >
                  <td className="client">
                    <button
                      type="button"
                      className="client-btn"
                      aria-expanded={isOpen}
                      aria-controls={previewId}
                      onClick={() => toggle(i)}
                    >
                      <span>{row.title}</span>
                      <span className="client-toggle" aria-hidden="true">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                  </td>
                  <td className="what">{row.description}</td>
                  <td className="stack">{row.stack}</td>
                  <td className="url">
                    <RowLink link={row.link} />
                  </td>
                </tr>
                <tr className="preview-row" id={previewId} hidden={!isOpen}>
                  <td colSpan={4}>
                    {isOpen && (
                      // eslint-disable-next-line @next/next/no-img-element -- src and srcSet come from next/image's getImageProps
                      <img
                        className="preview-inline"
                        src={row.preview.src}
                        srcSet={row.preview.srcSet}
                        sizes="(max-width: 860px) 100vw, 1100px"
                        width={1920}
                        height={1200}
                        alt={`${row.title} home page`}
                        decoding="async"
                      />
                    )}
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>

      <div
        ref={floatRef}
        className="preview-float"
        data-visible={floating ? "" : undefined}
        aria-hidden="true"
      >
        {floating && (
          // eslint-disable-next-line @next/next/no-img-element -- src and srcSet come from next/image's getImageProps
          <img
            key={floating.title}
            src={floating.preview.src}
            srcSet={floating.preview.srcSet}
            sizes={`${FLOAT_W}px`}
            width={FLOAT_W}
            height={FLOAT_H}
            alt=""
            decoding="async"
          />
        )}
      </div>
    </>
  );
}

function RowLink({ link }: { link: ManifestRow["link"] }) {
  switch (link.kind) {
    case "live":
      return (
        <a className="live" href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      );
    case "code":
      return (
        <a href={link.href} target="_blank" rel="noopener noreferrer">
          Code
        </a>
      );
    case "down":
      return <span className="down">Not responding</span>;
    default:
      return <span className="down">Private</span>;
  }
}
