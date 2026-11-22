import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SEHATONE — Smart Healthcare Management System",
    short_name: "SEHATONE",
    description: "Clinic and hospital management software.",
    start_url: "/",
    display: "browser",
    background_color: "#F5F3EE",
    theme_color: "#0F2A44",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
