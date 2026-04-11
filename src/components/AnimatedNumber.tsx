import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  className?: string;
  baseDelay?: number;
}

export default function AnimatedNumber({ value, className = "", baseDelay = 0 }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={`inline-flex ${className}`} aria-label={value}>
      {value.split("").map((char, i) => {
        const isDigit = /\d/.test(char);
        const delay = baseDelay + i * 0.12;

        if (!isDigit) {
          return (
            <span
              key={i}
              className="digit-flicker"
              style={{ animationDelay: `${delay + 2}s` }}
            >
              {char}
            </span>
          );
        }

        return (
          <span
            key={i}
            className={`digit-slot${visible ? " animate" : ""}`}
            style={{ position: "relative" }}
          >
            <span style={{ animationDelay: `${delay}s` }}>
              {char}
            </span>
            {/* Scan overlay on each digit */}
            {visible && (
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 40%, rgba(245,130,32,0.12) 100%)",
                  pointerEvents: "none",
                }}
              />
            )}
          </span>
        );
      })}
    </span>
  );
}
