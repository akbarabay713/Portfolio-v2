/**
 * A short handwritten note with a drawn arrow. The arrow is drawn in once with
 * a stroke animation; with reduced motion it is simply there.
 */
export default function HandNote({
  text,
  arrow,
  className,
}: {
  text: string;
  /** SVG path for the arrow, in a 120×80 box. */
  arrow: string;
  className?: string;
}) {
  return (
    <span className={`hand-note ${className ?? ""}`} aria-hidden="true">
      <span className="hand-text">{text}</span>
      <svg className="hand-arrow" viewBox="0 0 120 80" fill="none">
        <path d={arrow} pathLength={1} />
      </svg>
    </span>
  );
}
