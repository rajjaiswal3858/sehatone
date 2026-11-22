import { ImageResponse } from "next/og";

export const alt = "SEHATONE — Smart Healthcare Management System for clinics and hospitals";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0F2A44", color: "#fff", padding: 72, fontFamily: "serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "sans-serif", fontSize: 30, letterSpacing: 4, fontWeight: 700 }}>
          <div style={{ width: 48, height: 48, background: "#fff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 16, height: 16, background: "#14A394" }} />
          </div>
          <span>SEHAT</span><span style={{ color: "#5FD1C2", fontWeight: 400, marginLeft: -16 }}>ONE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.05 }}>
          <span>One smart system.</span>
          <span style={{ color: "#5FD1C2", fontStyle: "italic" }}>Complete healthcare management.</span>
        </div>
        <div style={{ display: "flex", fontFamily: "sans-serif", fontSize: 26, color: "#A9BCCF" }}>
          Registration · Reception & doctor dashboards · Token queues · Live displays · Reports
        </div>
      </div>
    ),
    size,
  );
}
