import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          background: "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #022c22 100%)",
          color: "#f4f4f5",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            gap: 0,
          }}
        >
          <div style={{ flex: 1, background: "rgba(255,255,255,0.01)" }} />
          <div style={{ flex: 1, background: "rgba(245,158,11,0.02)" }} />
          <div style={{ flex: 1, background: "rgba(16,185,129,0.02)" }} />
        </div>

        <div
          style={{
            position: "absolute",
            right: -120,
            top: "50%",
            transform: "translateY(-50%)",
            width: 600,
            height: 600,
            borderRadius: 999,
            background: "radial-gradient(circle at center, rgba(245,158,11,0.08) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: -60,
            bottom: -60,
            width: 300,
            height: 300,
            borderRadius: 999,
            background: "radial-gradient(circle at center, rgba(16,185,129,0.06) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
            gap: 4,
            }}
          >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: "#f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                fontWeight: 700,
                color: "#000",
                fontFamily: "system-ui",
              }}
            >
              S
            </div>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: "#f4f4f5" }}>
              SunteckSolar
            </span>
            <span style={{ fontSize: 14, color: "#6ee7b7", background: "rgba(16,185,129,0.12)", padding: "3px 10px", borderRadius: 999, fontWeight: 600 }}>
              Nigeria
            </span>
          </div>

          <div
            style={{
              fontSize: 58,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#f4f4f5",
              maxWidth: 640,
            }}
          >
            Never Pay for Generator Fuel Again
          </div>

          <div
            style={{
              fontSize: 18,
              color: "#a1a1aa",
              maxWidth: 520,
              marginTop: 6,
              lineHeight: 1.5,
            }}
          >
            Premium solar installations for Nigerian homes and businesses. Zero upfront cost with flexible payment plans up to 18 months.
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 999, background: "rgba(245,158,11,0.08)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.12)", fontSize: 13, fontWeight: 600 }}>
              ⚡ Tier-1 Panels & Inverters
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 999, background: "rgba(16,185,129,0.08)", color: "#34d399", border: "1px solid rgba(16,185,129,0.12)", fontSize: 13, fontWeight: 600 }}>
              ✅ SON Certified Installers
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 999, background: "rgba(245,158,11,0.08)", color: "#fbbf24", border: "1px solid rgba(245,158,11,0.12)", fontSize: 13, fontWeight: 600 }}>
              💰 Pay-in-3 or Pay-in-6
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 18,
              paddingTop: 16,
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <span style={{ fontSize: 11, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.05em" }}>Locations</span>
              <span style={{ fontSize: 14, color: "#d4d4d8", fontWeight: 500 }}>Benin City · Agbor</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <span style={{ fontSize: 11, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.05em" }}>Contact</span>
              <span style={{ fontSize: 14, color: "#d4d4d8", fontWeight: 500 }}>0703 195 3010</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <span style={{ fontSize: 11, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.05em" }}>Instagram</span>
              <span style={{ fontSize: 14, color: "#d4d4d8", fontWeight: 500 }}>@suntecksolars</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <span style={{ fontSize: 11, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.05em" }}>Radio Show</span>
              <span style={{ fontSize: 14, color: "#d4d4d8", fontWeight: 500 }}>Solar Yan · Speed FM 96.9</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
