import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111318",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1a1a2e 0%, transparent 50%), radial-gradient(circle at 75% 75%, #16213e 0%, transparent 50%)",
        }}
      >
        {/* Gold accent line at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #c9a84c, transparent)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#e8e4de",
              letterSpacing: -2,
              display: "flex",
              gap: 16,
            }}
          >
            <span>MAHMOUD</span>
            <span style={{ color: "#c9a84c" }}>ABDALLAH</span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 24,
              color: "#c9a84c",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Supply Chain and Operations Manager
          </div>

          {/* Location */}
          <div
            style={{
              fontSize: 18,
              color: "#7a7986",
              letterSpacing: 2,
              marginTop: 8,
            }}
          >
            Dubai, UAE - 5+ Years Experience
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 48, marginTop: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#c9a84c" }}>AED 450K+</div>
              <div style={{ fontSize: 12, color: "#7a7986", textTransform: "uppercase", letterSpacing: 2 }}>Cost Savings</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#c9a84c" }}>30+</div>
              <div style={{ fontSize: 12, color: "#7a7986", textTransform: "uppercase", letterSpacing: 2 }}>Major Events</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#c9a84c" }}>280+</div>
              <div style={{ fontSize: 12, color: "#7a7986", textTransform: "uppercase", letterSpacing: 2 }}>Workflow Nodes</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ position: "absolute", bottom: 24, fontSize: 14, color: "#7a7986", letterSpacing: 2 }}>
          mahmoudabdallah.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
