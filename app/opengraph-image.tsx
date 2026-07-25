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
          background: "#070708",
          color: "#f4f4f5",
          fontFamily: "Inter, system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 80px",
              gap: 8,
              position: "relative",
            }}
          >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
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
              }}
            >
              S
            </div>
            <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>
              SunteckSolar
            </span>
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "#f4f4f5",
              maxWidth: 600,
            }}
          >
            Clean Solar Energy for Every Nigerian Home
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#a1a1aa",
              maxWidth: 520,
              marginTop: 4,
            }}
          >
            Flexible payment plans up to 18 months. Quality installations across Nigeria.
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(245, 158, 11, 0.1)",
                color: "#fbbf24",
                border: "1px solid rgba(245, 158, 11, 0.15)",
                fontSize: 14,
              }}
            >
              ₦150K/kW
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(16, 185, 129, 0.1)",
                color: "#34d399",
                border: "1px solid rgba(16, 185, 129, 0.15)",
                fontSize: 14,
              }}
            >
              20% Deposit
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(245, 158, 11, 0.1)",
                color: "#fbbf24",
                border: "1px solid rgba(245, 158, 11, 0.15)",
                fontSize: 14,
              }}
            >
              Up to 18 Months
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: -80,
            top: "50%",
            transform: "translateY(-50%)",
            width: 400,
            height: 400,
            borderRadius: 999,
            background: "radial-gradient(circle at center, rgba(245,158,11,0.1) 0%, transparent 70%)",
            opacity: 0.6,
          }}
        />
      </div>
    ),
    { ...size },
  )
}
