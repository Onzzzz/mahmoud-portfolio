"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  readonly target: number;
  readonly duration?: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

export function CountUp({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
  className,
  style,
}: CountUpProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          function animate(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}
