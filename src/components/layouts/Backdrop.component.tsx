const Backdrop = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
  >
    {/* dot grid, faded toward the edges */}
    <div className="absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />

    {/* aurora orbs */}
    <div className="animate-aurora-slow absolute -top-[15%] left-1/2 h-[65vh] w-[65vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--aurora),0.14),transparent_60%)] blur-3xl" />
    <div className="animate-aurora-slower absolute -left-[5%] top-[25%] h-[45vh] w-[45vw] rounded-full bg-[radial-gradient(circle,rgba(var(--aurora),0.08),transparent_65%)] blur-3xl" />
    <div className="animate-aurora-slow absolute -bottom-[10%] -right-[5%] h-[50vh] w-[50vw] rounded-full bg-[radial-gradient(circle,rgba(var(--aurora-2),0.06),transparent_65%)] blur-3xl" />

    {/* vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--canvas)_95%)]" />
  </div>
);

export default Backdrop;
