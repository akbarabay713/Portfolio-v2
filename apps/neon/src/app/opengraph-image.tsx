import { ImageResponse } from "next/og";
import { siteConfig } from "@portfolio/content";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** OG card matching the neon hero. */
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
          background: "#1a1a1a",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#a3a3a3",
            fontSize: "24px",
            letterSpacing: "6px",
          }}
        >
          <span style={{ width: "16px", height: "16px", background: "#10df5c" }} />
          <span>{siteConfig.author.toUpperCase()}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: "150px",
              fontWeight: 900,
              color: "#10df5c",
              lineHeight: 0.95,
              textTransform: "uppercase",
            }}
          >
            Fullstack
          </span>
          <span
            style={{
              fontSize: "150px",
              fontWeight: 900,
              color: "#a3a3a3",
              lineHeight: 0.95,
              paddingLeft: "40px",
              textTransform: "uppercase",
            }}
          >
            Developer
          </span>
        </div>

        <div style={{ display: "flex", color: "#5c5c5c", fontSize: "24px" }}>
          <span>React · Next.js · TypeScript · PHP</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
