import Link from "next/link";

/** 404 page inside the neon chrome. */
export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
        <span aria-hidden="true" className="mr-3 inline-block h-2.5 w-2.5 bg-accent" />
        Error 404
      </p>
      <h1 className="font-display text-[30vw] leading-none text-ghost sm:text-[20vw]">404</h1>
      <p className="mt-8 max-w-sm leading-relaxed text-muted">
        This page doesn&apos;t exist. It may have moved, or the link is wrong.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-accent-contrast transition-colors hover:bg-accent-strong"
      >
        Back home
      </Link>
    </main>
  );
}
