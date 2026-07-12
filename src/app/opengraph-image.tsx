import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Deepak T — Principal Software Engineer | Cloud Architect | AI-Native Engineering";
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
          justifyContent: "space-between",
          background: "#0a0e17",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(120deg,#22d3ee,#3b82f6,#8b5cf6)",
              color: "white",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            D
          </div>
          <div style={{ color: "#94a3b8", fontSize: 28 }}>deepakthayyil.online</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#e2e8f0", fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
            Building the Future of
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              background: "linear-gradient(120deg,#22d3ee,#3b82f6,#8b5cf6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            AI-Native Engineering
          </div>
          <div style={{ marginTop: 28, color: "#94a3b8", fontSize: 30 }}>
            Deepak T · Principal Software Engineer · Cloud Architect
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
