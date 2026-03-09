"use client";

import { useTheme } from "@/app/providers";
import { services } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionLabel from "@/components/ui/SectionLabel";

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.12);

  return (
    <div
      ref={ref}
      style={{
        background: theme.card,
        border: `1px solid ${theme.accent}1F`,
        borderRadius: 12,
        padding: "24px 22px",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${index * 120}ms`,
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${theme.accent}4D`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${theme.accent}1F`;
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontFamily: "var(--font-jetbrains), monospace",
          fontWeight: 200,
          color: theme.accent,
          opacity: 0.35,
          marginBottom: 12,
        }}
      >
        {service.number}
      </div>
      <h3
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: theme.text,
          margin: "0 0 8px 0",
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          fontSize: 12,
          color: theme.muted,
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {service.desc}
      </p>
    </div>
  );
}

export default function Services() {
  const { theme } = useTheme();
  const [ref, isVisible] = useInView(0.05);

  return (
    <section
      id="services"
      ref={ref}
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: "80px 24px",
      }}
    >
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <SectionLabel text="Services" />

        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            fontWeight: 700,
            marginBottom: 36,
            lineHeight: 1.2,
          }}
        >
          <span style={{ color: theme.text }}>How I Can </span>
          <span
            style={{
              backgroundImage: `linear-gradient(135deg, ${theme.accentLight}, ${theme.accent}, ${theme.accentDim})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Help You
          </span>
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
        }}
        className="services-grid"
      >
        {services.map((service, i) => (
          <ServiceCard key={service.number} service={service} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
