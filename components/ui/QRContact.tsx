"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/app/providers";
import { QrCode } from "lucide-react";

export default function QRContact() {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!show || !canvasRef.current) return;

    const loadQR = async () => {
      try {
        const QRCode = (await import("qrcode")).default;
        const vCard = [
          "BEGIN:VCARD",
          "VERSION:3.0",
          "FN:Mahmoud Abdallah",
          "TITLE:Supply Chain & Operations Manager",
          "ORG:Golden Sparrow Trading LLC",
          "TEL;TYPE=WORK:+971544720857",
          "EMAIL:mahmoudf.abdallah@outlook.com",
          "URL:https://mahmoud-abdallah.com",
          "ADR;TYPE=WORK:;;Dubai;;;UAE",
          "END:VCARD",
        ].join("\n");

        await QRCode.toCanvas(canvasRef.current, vCard, {
          width: 180,
          margin: 2,
          color: {
            dark: theme.isDark ? "#ffffff" : "#000000",
            light: "#00000000",
          },
        });
      } catch {
        // qrcode package not available, render fallback
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx && canvasRef.current) {
          canvasRef.current.width = 180;
          canvasRef.current.height = 180;
          ctx.fillStyle = theme.muted;
          ctx.font = "12px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("QR Code", 90, 90);
        }
      }
    };

    loadQR();
  }, [show, theme.isDark, theme.muted]);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 14px",
          background: `${theme.accent}10`,
          border: `1px solid ${theme.accent}30`,
          borderRadius: 6,
          color: theme.accent,
          fontSize: 10,
          fontWeight: 500,
          cursor: "pointer",
          transition: "all 0.2s",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `${theme.accent}20`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = `${theme.accent}10`;
        }}
      >
        <QrCode size={12} />
        Save Contact
      </button>

      {show && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(8px)",
          }}
          onClick={() => setShow(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: theme.card,
              border: `1px solid ${theme.accent}30`,
              borderRadius: 14,
              padding: "28px 24px",
              textAlign: "center",
              maxWidth: 280,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: theme.text,
                marginBottom: 4,
              }}
            >
              Scan to Save Contact
            </div>
            <div
              style={{
                fontSize: 10,
                color: theme.muted,
                marginBottom: 16,
              }}
            >
              vCard with contact details
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <canvas ref={canvasRef} style={{ borderRadius: 8 }} />
            </div>
            <button
              onClick={() => setShow(false)}
              style={{
                padding: "8px 20px",
                background: `${theme.accent}15`,
                border: `1px solid ${theme.accent}30`,
                borderRadius: 6,
                color: theme.accent,
                fontSize: 10,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
