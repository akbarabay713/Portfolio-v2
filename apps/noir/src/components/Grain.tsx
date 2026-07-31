const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

/** Faint film grain over the whole viewport. */
const Grain = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-[45] opacity-[0.04] mix-blend-overlay"
    style={{ backgroundImage: GRAIN, backgroundRepeat: "repeat" }}
  />
);

export default Grain;
