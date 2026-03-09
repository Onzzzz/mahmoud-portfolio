"use client";

import { useTheme } from "@/app/providers";

export default function GradientMesh() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Orb 1 */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: "40vw",
          height: "40vw",
          maxWidth: 500,
          maxHeight: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.accent}${theme.isDark ? "0A" : "08"} 0%, transparent 70%)`,
          filter: "blur(60px)",
          animation: "meshFloat1 12s ease-in-out infinite",
        }}
      />
      {/* Orb 2 */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: "35vw",
          height: "35vw",
          maxWidth: 450,
          maxHeight: 450,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.accentLight}${theme.isDark ? "08" : "06"} 0%, transparent 70%)`,
          filter: "blur(80px)",
          animation: "meshFloat2 15s ease-in-out infinite",
        }}
      />
      {/* Orb 3 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "30vw",
          height: "30vw",
          maxWidth: 380,
          maxHeight: 380,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${theme.accentDim}${theme.isDark ? "06" : "04"} 0%, transparent 70%)`,
          filter: "blur(70px)",
          animation: "meshFloat3 18s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes meshFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 15px) scale(0.95); }
        }
        @keyframes meshFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 20px) scale(0.95); }
          66% { transform: translate(15px, -30px) scale(1.05); }
        }
        @keyframes meshFloat3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
