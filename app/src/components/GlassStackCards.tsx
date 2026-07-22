interface GlassStackItem {
  icon: React.ReactNode;
  label: string;
}

interface GlassStackCardsProps {
  items: GlassStackItem[];
}

export default function GlassStackCards({ items }: GlassStackCardsProps) {
  return (
    <div className="glass-stack-container">
      {items.map((item, i) => (
        <div
          key={i}
          className="glass-stack-card"
          style={{ "--r": (i - 1) * 15 } as React.CSSProperties}
        >
          {item.icon}
          <span className="glass-stack-label">{item.label}</span>
        </div>
      ))}
      <style>{`
        .glass-stack-container {
          position: relative; display: flex; justify-content: center;
          align-items: center; flex-wrap: wrap; gap: 0;
          padding: 20px 0;
        }
        .glass-stack-card {
          position: relative;
          width: 160px; height: 180px;
          background: linear-gradient(rgba(255,255,255,0.06), transparent);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 25px 25px rgba(0,0,0,0.25);
          display: flex; flex-direction: column;
          justify-content: center; align-items: center; gap: 16px;
          transition: 0.5s; border-radius: 10px;
          margin: 0 -30px;
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          transform: rotate(calc(var(--r) * 1deg));
        }
        .glass-stack-card svg { font-size: 2.5em; fill: #F7931A; width: 40px; height: 40px; }
        .glass-stack-card .glass-stack-label {
          font-family: 'JetBrains Mono', monospace; font-size: 12px;
          color: rgba(255,255,255,0.8); letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .glass-stack-container:hover .glass-stack-card {
          transform: rotate(0deg); margin: 0 10px;
        }
        @media (max-width: 640px) {
          .glass-stack-card { width: 120px; height: 140px; margin: 0 -20px; }
          .glass-stack-container:hover .glass-stack-card { margin: 0 4px; }
        }
      `}</style>
    </div>
  );
}
