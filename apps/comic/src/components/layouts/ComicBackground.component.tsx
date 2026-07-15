/** Fixed comic-paper backdrop: a subtle Ben-Day halftone that sits behind all content. */
const ComicBackground = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
    <div className="comic-halftone absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_100%)]" />
  </div>
);

export default ComicBackground;
