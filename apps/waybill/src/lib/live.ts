/** Seconds between live-status rechecks (the page revalidates on the same cycle). */
export const LIVE_CHECK_SECONDS = 86400;

/**
 * True when the URL answers with a non-error status. Runs on the server while
 * the page is generated, so a slow or broken site never blocks a visitor.
 * Any network or TLS failure counts as not live.
 */
async function isLive(url: string): Promise<boolean> {
  const attempt = async (method: "HEAD" | "GET") => {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
      headers: { "user-agent": "Mozilla/5.0 (portfolio link check)" },
      next: { revalidate: LIVE_CHECK_SECONDS },
    });
    return res.status < 400;
  };

  try {
    // Some hosts reject HEAD, so fall back to GET before calling it down.
    return (await attempt("HEAD")) || (await attempt("GET"));
  } catch {
    return false;
  }
}

/** Live status for each URL, checked in parallel. */
export async function checkLive(urls: string[]): Promise<Map<string, boolean>> {
  const unique = [...new Set(urls)];
  const results = await Promise.all(unique.map(isLive));
  return new Map(unique.map((url, i) => [url, results[i]]));
}

/** "https://www.greyrox.com/" -> "greyrox.com" */
export function displayHost(url: string): string {
  return new URL(url).hostname.replace(/^www\./, "");
}
