import Link from "next/link";

/** 404 page inside the noir chrome. */
export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mono mb-6 text-xs tracking-widest text-faint">( ERROR · 404 )</p>
      <h1 className="display text-[30vw] leading-none text-text sm:text-[20vw]">404</h1>
      <p className="mt-8 max-w-sm leading-relaxed text-muted">
        This page drifted off into the fog. There’s nothing here.
      </p>
      <Link
        href="/"
        className="mono mt-10 border border-line px-6 py-3 text-xs text-text transition-colors hover:bg-text hover:text-bg"
      >
        ← BACK HOME
      </Link>
    </main>
  );
}
