import { ImageResponse } from "next/og";
import { siteConfig } from "@/constants";

export const alt = `${siteConfig.author} — ${siteConfig.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#121212",
          backgroundImage:
            "radial-gradient(900px 500px at 50% -10%, rgba(30,215,96,0.12), transparent 70%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "9999px",
              backgroundColor: "#1ed760",
            }}
          />
          <span
            style={{
              color: "#b3b3b3",
              fontSize: "26px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Portfolio
          </span>
        </div>

        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: "128px",
            fontWeight: 800,
            letterSpacing: "-4px",
            lineHeight: 1,
          }}
        >
          {siteConfig.author}
        </div>

        <div
          style={{
            display: "flex",
            color: "#1ed760",
            fontSize: "52px",
            fontWeight: 700,
            marginTop: "16px",
          }}
        >
          {siteConfig.jobTitle}
        </div>

        <div
          style={{
            display: "flex",
            color: "#b3b3b3",
            fontSize: "30px",
            fontWeight: 400,
            marginTop: "32px",
            maxWidth: "880px",
            lineHeight: 1.4,
          }}
        >
          Fast, accessible, beautifully designed web experiences.
        </div>
      </div>
    ),
    { ...size },
  );
}
