import localFont from "next/font/local";

export const proximaNovaCondesedFont = localFont({
  fallback: ["sans-serif"],
  src: [
    {
      path: "../assets/fonts/proxima-nova-condesed/Proxima-Nova-Extra-Regular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../assets/fonts/proxima-nova-condesed/Proxima-Nova-Condensed-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../assets/fonts/proxima-nova-condesed/Proxima-Nova-Condensed-Semibold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../assets/fonts/proxima-nova-condesed/Proxima-Nova-Condensed-Bold.ttf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--MonaSans-font",
});

export const proximaNovaFont = localFont({
  fallback: ["sans-serif"],
  src: [
    {
      path: "../assets/fonts/proxima-nova/Proxima-Nova-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../assets/fonts/proxima-nova/Proxima-Nova-Medium.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "../assets/fonts/proxima-nova/Proxima-Nova-Semibold.ttf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../assets/fonts/proxima-nova/Proxima-Nova-Bold.otf",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--MonaSans-font",
});
