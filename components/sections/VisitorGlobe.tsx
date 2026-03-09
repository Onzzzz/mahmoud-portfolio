"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTheme } from "@/app/providers";
import { visitorLocations } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";
import { Globe as GlobeIcon, Users, MapPin, Eye } from "lucide-react";

// ── Types for API response ──────────────────────────────────
interface VisitorLocation {
  city: string;
  country: string;
  countryCode?: string;
  lat: number;
  lng: number;
  count: number;
}

interface VisitorData {
  activeVisitors: number;
  totalToday: number;
  totalAllTime: number;
  locations: VisitorLocation[];
  timestamp: number;
}

// ── Adapt static fallback data to match API shape ───────────
const fallbackLocations: VisitorLocation[] = visitorLocations.map((loc) => ({
  city: loc.city,
  country: loc.country,
  lat: loc.lat,
  lng: loc.lng,
  count: 1,
}));

// ─── 3D Globe Component using globe.gl ──────────────────────
function Globe3D({ locations }: { locations: VisitorLocation[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const { theme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  // Dubai as the central hub
  const DUBAI = { lat: 25.276, lng: 55.296 };

  // Derive globe data from locations prop
  const globeLocations = locations.map((loc) => ({
    city: loc.city,
    country: loc.country,
    lat: loc.lat,
    lng: loc.lng,
    size: Math.min(1.2, 0.3 + loc.count * 0.15),
    isDubai: loc.city === "Dubai",
  }));

  // Ensure Dubai is always present
  if (!globeLocations.some((loc) => loc.isDubai)) {
    globeLocations.unshift({
      city: "Dubai",
      country: "UAE",
      lat: DUBAI.lat,
      lng: DUBAI.lng,
      size: 1.2,
      isDubai: true,
    });
  }

  // Arc data: connections from each city to Dubai
  const arcsData = globeLocations
    .filter((loc) => !loc.isDubai)
    .map((loc) => ({
      startLat: loc.lat,
      startLng: loc.lng,
      endLat: DUBAI.lat,
      endLng: DUBAI.lng,
      city: loc.city,
      country: loc.country,
    }));

  // Points data for each location
  const pointsData = globeLocations.map((loc) => ({
    lat: loc.lat,
    lng: loc.lng,
    size: loc.size,
    city: loc.city,
    country: loc.country,
    isDubai: loc.isDubai,
  }));

  // Label data for cities
  const labelsData = globeLocations.map((loc) => ({
    lat: loc.lat,
    lng: loc.lng,
    text: loc.city,
    size: loc.isDubai ? 1.2 : 0.8,
  }));

  const initGlobe = useCallback(async () => {
    if (!containerRef.current || globeRef.current) return;

    try {
      const GlobeModule = await import("globe.gl");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const GlobeConstructor = GlobeModule.default as any;

      const accent = theme.accent;
      const accentRgb = hexToRgb(accent);

      const globe = GlobeConstructor()
        .width(containerRef.current.clientWidth)
        .height(400)
        .backgroundColor("rgba(0,0,0,0)")
        .showAtmosphere(true)
        .atmosphereColor(accent)
        .atmosphereAltitude(0.15)
        .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-dark.jpg")
        // Points (cities)
        .pointsData(pointsData)
        .pointAltitude((d: any) => {
          const point = d as (typeof pointsData)[0];
          return point.isDubai ? 0.06 : 0.02;
        })
        .pointRadius((d: any) => {
          const point = d as (typeof pointsData)[0];
          return point.isDubai ? 0.6 : 0.3 * point.size;
        })
        .pointColor((d: any) => {
          const point = d as (typeof pointsData)[0];
          return point.isDubai ? accent : `rgba(${accentRgb}, 0.8)`;
        })
        .pointsMerge(false)
        // Arcs (connections to Dubai)
        .arcsData(arcsData)
        .arcColor(() => [`rgba(${accentRgb}, 0.6)`, `rgba(${accentRgb}, 0.3)`])
        .arcStroke(0.5)
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        .arcDashAnimateTime(2000)
        .arcAltitudeAutoScale(0.3)
        // Labels
        .labelsData(labelsData)
        .labelText("text")
        .labelSize((d: any) => {
          const label = d as (typeof labelsData)[0];
          return label.size;
        })
        .labelDotRadius((d: any) => {
          const label = d as (typeof labelsData)[0];
          return label.text === "Dubai" ? 0.4 : 0.2;
        })
        .labelColor(() => `rgba(${accentRgb}, 0.9)`)
        .labelResolution(2)
        .labelAltitude(0.01)
        // Controls
        .enablePointerInteraction(true)
        // Initial view centered on Dubai
        .pointOfView({ lat: 25, lng: 55, altitude: 2.2 }, 0);

      globe(containerRef.current);
      globeRef.current = globe;

      // Auto-rotate
      const controls = globe.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.enableZoom = false;
      }

      setLoaded(true);
    } catch (err) {
      console.warn("Globe.gl initialization failed:", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initGlobe();

    return () => {
      if (globeRef.current) {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = false;
        }
      }
    };
  }, [initGlobe]);

  // Update globe data when locations change (live updates)
  useEffect(() => {
    if (!globeRef.current) return;
    globeRef.current
      .pointsData(pointsData)
      .arcsData(arcsData)
      .labelsData(labelsData);
  }, [locations]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (globeRef.current && containerRef.current) {
        globeRef.current.width(containerRef.current.clientWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", minHeight: 400 }}>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: 400,
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease",
          cursor: "grab",
        }}
      />

      {/* Loading state */}
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              border: `2px solid ${theme.accent}20`,
              borderTopColor: theme.accent,
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <span style={{ fontSize: 11, color: theme.muted }}>
            Loading 3D Globe...
          </span>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ─── Helper: hex to rgb string ──────────────────────────────
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "200, 168, 76";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

// ─── Location Cards ─────────────────────────────────────────
function LocationCards({ locations }: { locations: VisitorLocation[] }) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
        gap: 8,
        width: "100%",
      }}
    >
      {locations.map((loc) => (
        <div
          key={`${loc.city}-${loc.country}`}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            background: `${theme.accent}06`,
            border: `1px solid ${theme.accent}12`,
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "all 0.2s",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: theme.accent,
              opacity: loc.city === "Dubai" ? 1 : 0.5,
              boxShadow:
                loc.city === "Dubai"
                  ? `0 0 8px ${theme.accent}60`
                  : "none",
              flexShrink: 0,
            }}
          />
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: loc.city === "Dubai" ? theme.accent : theme.text,
              }}
            >
              {loc.city}
              {loc.count > 1 && (
                <span
                  style={{
                    fontSize: 9,
                    color: theme.muted,
                    fontWeight: 400,
                    marginLeft: 4,
                  }}
                >
                  ({loc.count})
                </span>
              )}
            </div>
            <div style={{ fontSize: 9, color: theme.muted }}>
              {loc.country}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main Section ───────────────────────────────────────────
export default function VisitorGlobe() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.1);
  const [shouldRender, setShouldRender] = useState(false);
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null);
  const [isLive, setIsLive] = useState(false);

  // Only render globe when section is visible (performance)
  useEffect(() => {
    if (isVisible && !shouldRender) {
      setShouldRender(true);
    }
  }, [isVisible, shouldRender]);

  // Fetch real visitor data from API + poll every 30s
  useEffect(() => {
    let mounted = true;
    let interval: ReturnType<typeof setInterval>;

    async function fetchVisitors() {
      try {
        const res = await fetch("/api/visitors");
        if (res.ok && mounted) {
          const data: VisitorData = await res.json();
          setVisitorData(data);
          setIsLive(true);
        }
      } catch {
        // API failed — use fallback static data
      }
    }

    // Initial fetch
    fetchVisitors();

    // Poll every 30 seconds
    interval = setInterval(fetchVisitors, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Derive display data: use real API data if available, fallback to static
  const displayLocations =
    visitorData && visitorData.locations.length > 0
      ? visitorData.locations
      : fallbackLocations;

  const activeCount = visitorData?.activeVisitors ?? 0;
  const totalAll = visitorData?.totalAllTime ?? 0;
  const cityCount = displayLocations.length;
  const hasRealData = isLive && visitorData && visitorData.locations.length > 0;

  return (
    <section
      id="visitor-globe"
      ref={ref}
      style={{ maxWidth: 820, margin: "0 auto", padding: "80px 24px" }}
    >
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <SectionLabel text="Global Reach" />
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 700,
            marginBottom: 8,
            lineHeight: 1.2,
          }}
        >
          <span style={{ color: theme.text }}>Network </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Across the Globe
          </span>
        </h2>
        <p
          style={{
            fontSize: 13,
            color: theme.muted,
            marginBottom: 24,
            maxWidth: 500,
          }}
        >
          Professional connections spanning UAE, KSA, Egypt, Europe, Asia &
          beyond — built through 5+ years of cross-border supply chain work.
        </p>
      </div>

      <div
        style={{
          background: theme.card,
          border: `1px solid ${theme.accent}1F`,
          borderRadius: 16,
          overflow: "hidden",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* 3D Globe */}
        <div style={{ position: "relative" }}>
          {shouldRender ? (
            <Globe3D locations={displayLocations} />
          ) : (
            <div
              style={{
                width: "100%",
                height: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GlobeIcon
                size={48}
                style={{ color: theme.accent, opacity: 0.2 }}
              />
            </div>
          )}
        </div>

        {/* Stats & Location Cards */}
        <div style={{ padding: "16px 20px 20px" }}>
          {/* Visitor counter */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 8,
                background: `${theme.accent}08`,
                border: `1px solid ${theme.accent}1F`,
              }}
            >
              <GlobeIcon size={14} style={{ color: theme.accent }} />
              <span style={{ fontSize: 12, color: theme.soft }}>
                <strong
                  style={{ color: theme.accent, transition: "all 0.3s" }}
                >
                  {activeCount}
                </strong>{" "}
                {isLive ? "active now" : "visitors"}
              </span>
              {isLive && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#4ade80",
                    display: "inline-block",
                    animation: "livePulse 2s ease-in-out infinite",
                  }}
                />
              )}
            </div>
            {isLive && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 16px",
                  borderRadius: 8,
                  background: `${theme.accent}08`,
                  border: `1px solid ${theme.accent}1F`,
                }}
              >
                <Eye size={14} style={{ color: theme.accent }} />
                <span style={{ fontSize: 12, color: theme.soft }}>
                  <strong style={{ color: theme.accent }}>{totalAll}</strong>{" "}
                  total
                </span>
              </div>
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 8,
                background: `${theme.accent}08`,
                border: `1px solid ${theme.accent}1F`,
              }}
            >
              <Users size={14} style={{ color: theme.accent }} />
              <span style={{ fontSize: 12, color: theme.soft }}>
                <strong style={{ color: theme.accent }}>{cityCount}</strong>{" "}
                {hasRealData ? (cityCount === 1 ? "city" : "cities") : "network cities"}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 16px",
                borderRadius: 8,
                background: `${theme.accent}08`,
                border: `1px solid ${theme.accent}1F`,
              }}
            >
              <MapPin size={14} style={{ color: theme.accent }} />
              <span style={{ fontSize: 12, color: theme.soft }}>
                Hub:{" "}
                <strong style={{ color: theme.accent }}>Dubai, UAE</strong>
              </span>
            </div>
          </div>

          {/* Location cards */}
          <LocationCards locations={displayLocations} />

          <style>{`
            @keyframes livePulse {
              0%, 100% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.4; transform: scale(0.8); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
