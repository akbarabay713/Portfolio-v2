import Reveal from "@/components/Reveal";

interface SectionHeaderProps {
  /** Parenthesized title, e.g. "SELECTED ARCHIVE". */
  title: string;
  /** Short kicker shown next to the index, e.g. "ARCHIVE". */
  kicker: string;
  index: number;
  total?: number;
  meta?: string;
}

/** Section head: bracketed title left, big ghost numeral right. */
const SectionHeader = ({
  title,
  kicker,
  index,
  total = 7,
  meta,
}: SectionHeaderProps) => {
  const num = String(index).padStart(2, "0");
  return (
    <div className="relative mb-16 border-t border-line pt-6">
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute -top-2 right-0 select-none text-[26vw] leading-none text-ghost sm:text-[18vw]"
      >
        {num}
      </span>

      <div className="relative flex items-start justify-between">
        <Reveal>
          <h2 className="display max-w-md text-4xl sm:text-5xl">
            ( {title} )
          </h2>
        </Reveal>
        <div className="mono mt-1 text-right text-[11px] text-faint">
          <p>
            {kicker.toUpperCase()} · {num} / {String(total).padStart(2, "0")}
          </p>
          {meta && <p className="mt-2 text-muted">{meta}</p>}
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;
