import { ImageResponse } from "next/og";
import { siteConfig } from "@portfolio/content";

export const alt = `${siteConfig.author} — Studio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Editorial OG card matching the noir hero. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0c",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#8a8a92",
            fontSize: "24px",
            letterSpacing: "4px",
          }}
        >
          <span>WE.RAA</span>
          <span>• NIGHT / 23:00</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {["I BUILD FOR", "THE WEB."].map((line) => (
            <span
              key={line}
              style={{
                fontSize: "132px",
                fontWeight: 800,
                color: "#ededf0",
                lineHeight: 0.9,
                letterSpacing: "-4px",
              }}
            >
              {line}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#8a8a92",
            fontSize: "24px",
          }}
        >
          <span>{siteConfig.author} · Fullstack Developer</span>
          <span>coloured by the hour</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
