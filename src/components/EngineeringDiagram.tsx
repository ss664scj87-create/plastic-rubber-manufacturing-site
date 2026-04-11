import { useEffect, useRef, useState } from "react";

const NODES = [
  { id: "task",    x: 100, y: 160, label: "ЗАДАНИЕ",      sub: "ТЗ / чертёж",        icon: "M4 6h16M4 12h16M4 18h10" },
  { id: "design",  x: 280, y: 60,  label: "ПРОЕКТ",       sub: "CAD / КМД",           icon: "M12 4v16m8-8H4" },
  { id: "cnc",     x: 460, y: 160, label: "ПРОИЗВОДСТВО",  sub: "ЧПУ / литьё",         icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { id: "qc",      x: 640, y: 60,  label: "КОНТРОЛЬ",     sub: "ОТК / метрология",    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "ship",    x: 820, y: 160, label: "ОТГРУЗКА",     sub: "РФ и СНГ",            icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12" },
];

const EDGES = [
  { from: "task",   to: "design"  },
  { from: "design", to: "cnc"     },
  { from: "cnc",    to: "qc"      },
  { from: "qc",     to: "ship"    },
];

function getCenter(node: typeof NODES[0]) {
  return { cx: node.x + 44, cy: node.y + 44 };
}

export default function EngineeringDiagram() {
  const [active, setActive] = useState<number>(-1);
  const [drawn, setDrawn] = useState(false);
  const [pulse, setPulse] = useState(0);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setDrawn(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!drawn) return;
    const timer = setInterval(() => {
      setPulse((p) => (p + 1) % NODES.length);
    }, 1200);
    return () => clearInterval(timer);
  }, [drawn]);

  return (
    <div className="w-full overflow-x-auto py-4">
      <svg
        ref={ref}
        viewBox="0 0 920 260"
        className="w-full min-w-[600px]"
        style={{ maxHeight: 260 }}
      >
        {/* Blueprint grid */}
        <defs>
          <pattern id="eng-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="rgba(245,130,32,0.6)" />
          </marker>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect width="920" height="260" fill="url(#eng-grid)" />

        {/* Dimension lines */}
        <line x1="20" y1="10" x2="900" y2="10" stroke="rgba(245,130,32,0.12)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="20" y1="250" x2="900" y2="250" stroke="rgba(245,130,32,0.12)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="10" y1="20" x2="10" y2="240" stroke="rgba(245,130,32,0.12)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="910" y1="20" x2="910" y2="240" stroke="rgba(245,130,32,0.12)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Corner marks */}
        {[[20,20],[900,20],[20,240],[900,240]].map(([x,y], i) => (
          <g key={i}>
            <line x1={x - 8} y1={y} x2={x + 8} y2={y} stroke="rgba(245,130,32,0.4)" strokeWidth="1" />
            <line x1={x} y1={y - 8} x2={x} y2={y + 8} stroke="rgba(245,130,32,0.4)" strokeWidth="1" />
          </g>
        ))}

        {/* Edges */}
        {EDGES.map((edge, i) => {
          const from = NODES.find((n) => n.id === edge.from)!;
          const to = NODES.find((n) => n.id === edge.to)!;
          const fc = getCenter(from);
          const tc = getCenter(to);
          const midX = (fc.cx + tc.cx) / 2;
          const midY = Math.min(fc.cy, tc.cy) - 30;
          const d = `M ${fc.cx} ${fc.cy} Q ${midX} ${midY} ${tc.cx} ${tc.cy}`;
          const isActive = active === i || active === i + 1 || pulse === i || pulse === i + 1;
          return (
            <g key={edge.from + edge.to}>
              <path
                d={d}
                fill="none"
                stroke="rgba(245,130,32,0.15)"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />
              {drawn && (
                <path
                  d={d}
                  fill="none"
                  stroke={isActive ? "rgba(245,130,32,0.9)" : "rgba(245,130,32,0.35)"}
                  strokeWidth={isActive ? 2 : 1.5}
                  strokeDasharray="200"
                  strokeDashoffset="200"
                  markerEnd="url(#arrowhead)"
                  filter={isActive ? "url(#glow)" : undefined}
                  style={{
                    transition: "stroke 0.4s, stroke-width 0.4s",
                    animation: `draw-path 0.8s ease ${i * 0.25}s forwards`,
                  }}
                />
              )}
              {/* Moving dot along path */}
              {drawn && pulse === i && (
                <circle r="4" fill="rgba(245,130,32,0.9)" filter="url(#glow)">
                  <animateMotion dur="1.1s" repeatCount="1" path={d} />
                </circle>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const isActive = active === i || pulse === i;
          return (
            <g
              key={node.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(-1)}
            >
              {/* Radar ping on active */}
              {isActive && (
                <circle
                  cx={node.x + 44}
                  cy={node.y + 44}
                  r="48"
                  fill="none"
                  stroke="rgba(245,130,32,0.3)"
                  strokeWidth="1"
                >
                  <animate attributeName="r" from="44" to="70" dur="0.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="0.8s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Node box */}
              <rect
                x={node.x}
                y={node.y}
                width="88"
                height="88"
                fill={isActive ? "rgba(245,130,32,0.15)" : "rgba(17,20,22,0.9)"}
                stroke={isActive ? "rgba(245,130,32,0.9)" : "rgba(245,130,32,0.35)"}
                strokeWidth={isActive ? 1.5 : 1}
                filter={isActive ? "url(#glow)" : undefined}
                style={{ transition: "fill 0.3s, stroke 0.3s" }}
                rx="2"
              />

              {/* HUD corners on box */}
              <line x1={node.x} y1={node.y + 12} x2={node.x} y2={node.y} stroke="rgba(245,130,32,0.7)" strokeWidth="1.5" />
              <line x1={node.x} y1={node.y} x2={node.x + 12} y2={node.y} stroke="rgba(245,130,32,0.7)" strokeWidth="1.5" />
              <line x1={node.x + 88} y1={node.y + 76} x2={node.x + 88} y2={node.y + 88} stroke="rgba(245,130,32,0.7)" strokeWidth="1.5" />
              <line x1={node.x + 76} y1={node.y + 88} x2={node.x + 88} y2={node.y + 88} stroke="rgba(245,130,32,0.7)" strokeWidth="1.5" />

              {/* Step index */}
              <text
                x={node.x + 6}
                y={node.y + 14}
                fontFamily="IBM Plex Mono, monospace"
                fontSize="8"
                fill="rgba(245,130,32,0.5)"
              >
                {String(i + 1).padStart(2, "0")}
              </text>

              {/* Icon */}
              <g transform={`translate(${node.x + 28}, ${node.y + 16})`}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={isActive ? "rgba(245,130,32,1)" : "rgba(245,130,32,0.6)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s" }}>
                  <path d={node.icon} />
                </svg>
              </g>

              {/* Label */}
              <text
                x={node.x + 44}
                y={node.y + 66}
                textAnchor="middle"
                fontFamily="Oswald, sans-serif"
                fontSize="9"
                fontWeight="500"
                letterSpacing="1"
                fill={isActive ? "rgba(245,130,32,1)" : "rgba(240,235,220,0.9)"}
                style={{ transition: "fill 0.3s" }}
              >
                {node.label}
              </text>
              <text
                x={node.x + 44}
                y={node.y + 78}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="7"
                fill="rgba(245,130,32,0.5)"
              >
                {node.sub}
              </text>
            </g>
          );
        })}

        {/* Bottom label */}
        <text x="460" y="248" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="rgba(245,130,32,0.3)" letterSpacing="3">
          // PRODUCTION CYCLE / TB-2211
        </text>
      </svg>
    </div>
  );
}
