type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 800;
  style: "normal";
};

async function fetchTtf(query: string): Promise<ArrayBuffer> {
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${query}`, {
    signal: AbortSignal.timeout(8000),
  }).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
  if (!url) throw new Error("no ttf");
  return fetch(url, { signal: AbortSignal.timeout(8000) }).then((r) =>
    r.arrayBuffer(),
  );
}

/**
 * Archivo Expanded 800 (the name) and Archivo 400 (the label) as TTFs for
 * next/og, fetched from Google Fonts while the image is generated. Returns
 * null offline, so the image still renders with the default font.
 */
export async function loadOgFonts(): Promise<OgFont[] | null> {
  try {
    const [display, body] = await Promise.all([
      fetchTtf("Archivo:wdth,wght@125,800"),
      fetchTtf("Archivo:wght@400"),
    ]);
    return [
      { name: "Archivo Expanded", data: display, weight: 800, style: "normal" },
      { name: "Archivo", data: body, weight: 400, style: "normal" },
    ];
  } catch {
    return null;
  }
}
