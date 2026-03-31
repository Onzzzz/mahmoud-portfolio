import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Mahmoud Abdallah — Procurement & Supply Chain";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#111318",
          color: "#F0ECE4",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Gold accent line */}
        <div
          style={{
            width: "80px",
            height: "4px",
            background: "#C9A84C",
            marginBottom: "40px",
            borderRadius: "2px",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          <span>Mahmoud </span>
          <span style={{ color: "#C9A84C" }}>Abdallah</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 400,
            color: "#8A8478",
            marginBottom: "48px",
          }}
        >
          Procurement & Supply Chain Professional
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "60px",
          }}
        >
          {[
            { value: "AED 450K+", label: "Documented Savings" },
            { value: "30+", label: "Major Events" },
            { value: "7+", label: "Years Experience" },
          ].map((stat) => (
            <div key={stat.label} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "32px", fontWeight: 700, color: "#C9A84C" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "16px", color: "#50504A", marginTop: "4px" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Location */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "16px",
            color: "#50504A",
            letterSpacing: "0.1em",
          }}
        >
          DUBAI, UAE
        </div>
      </div>
    ),
    { ...size }
  );
}
