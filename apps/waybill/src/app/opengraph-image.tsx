import { ImageResponse } from "next/og";
import { bio, profile } from "@portfolio/content";

import { loadOgFonts } from "@/lib/og-font";

export const alt = `${bio.fullName}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Link preview: the name on kraft, with the label beside it. */
export default async function OpengraphImage() {
  const fonts = await loadOgFonts();
  const fields: [string, string][] = [
    ["FROM", `${profile.based.split(" /")[0]}, Indonesia`],
    ["ROLE", profile.role],
    ["STACK", "React, Next.js, Laravel, WordPress"],
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#c9a878",
          padding: "72px",
          fontFamily: fonts ? "Archivo" : "sans-serif",
          color: "#1b1a17",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          {bio.fullName
            .toUpperCase()
            .split(" ")
            .map((word) => (
              <span
                key={word}
                style={{
                  fontFamily: fonts ? "Archivo Expanded" : "sans-serif",
                  fontSize: fonts ? 120 : 150,
                  fontWeight: 800,
                  lineHeight: 0.92,
                }}
              >
                {word}
              </span>
            ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 440,
            background: "#f6f5ef",
            border: "3px solid #1b1a17",
            boxShadow: "8px 10px 0 rgba(27,26,23,0.16)",
            transform: "rotate(-2deg)",
          }}
        >
          {fields.map(([k, v]) => (
            <div
              key={k}
              style={{
                display: "flex",
                padding: "18px 24px",
                borderBottom: "2px solid #cfcbbf",
                fontSize: 26,
              }}
            >
              <span style={{ width: 110, color: "#5f5b52", fontSize: 20 }}>{k}</span>
              <span style={{ flex: 1 }}>{v}</span>
            </div>
          ))}
          <div style={{ display: "flex", padding: "18px 24px", fontSize: 26 }}>
            <span style={{ width: 110, color: "#5f5b52", fontSize: 20 }}>STATUS</span>
            <span style={{ color: "#1e7a46" }}>{profile.status} for work</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fonts ?? undefined,
    },
  );
}
