// @ts-nocheck
import { useMemo, memo } from "react";

const PARTICLE_COUNT = 32;

// Pure-CSS ambient backdrop: a few large soft-blurred orbs slowly drifting,
// plus small ember-like particles rising and swaying. Fixed + negative
// z-index so it always sits behind real content and never intercepts
// clicks (pointer-events: none throughout).
function AnimatedBackground() {
  const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const particles = useMemo(() => {
    if (prefersReduced) return [];
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const isYellow = Math.random() > 0.55;
      return {
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 14 + Math.random() * 18,
        delay: -(Math.random() * 30),
        opacity: 0.25 + Math.random() * 0.4,
        color: isYellow ? "#FFD600" : "#F7931A",
      };
    });
  }, [prefersReduced]);

  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-orb ambient-orb-1" style={{ top: "-8%", left: "-6%", width: 460, height: 460, background: "#F7931A", opacity: 0.11 }} />
      <div className="ambient-orb ambient-orb-2" style={{ top: "35%", right: "-10%", width: 520, height: 520, background: "#FFD600", opacity: 0.07 }} />
      <div className="ambient-orb ambient-orb-3" style={{ bottom: "-12%", left: "20%", width: 420, height: 420, background: "#EA580C", opacity: 0.09 }} />
      {particles.map((p) => (
        <span
          key={p.id}
          className="ambient-particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default memo(AnimatedBackground);
