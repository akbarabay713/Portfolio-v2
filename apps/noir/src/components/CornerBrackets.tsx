/** Thin L-shaped brackets framing the viewport corners. */
const CornerBrackets = () => {
  const base = "pointer-events-none fixed z-40 h-5 w-5 border-text/25";
  return (
    <div aria-hidden="true">
      <span className={`${base} left-4 top-16 border-l border-t sm:left-7 sm:top-20`} />
      <span className={`${base} right-4 top-16 border-r border-t sm:right-7 sm:top-20`} />
      <span className={`${base} bottom-4 left-4 border-b border-l sm:bottom-7 sm:left-7`} />
      <span className={`${base} bottom-4 right-4 border-b border-r sm:bottom-7 sm:right-7`} />
    </div>
  );
};

export default CornerBrackets;
