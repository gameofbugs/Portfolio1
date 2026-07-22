interface BottomNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const ITEMS = [
  { id: "hero", label: "Home", icon: "🏠" },
  { id: "projects", label: "Projects", icon: "🎮" },
  { id: "skills", label: "Skills", icon: "⚡" },
  { id: "contact", label: "Contact", icon: "📫" },
];

export default function BottomNav({ activeSection, onNavigate }: BottomNavProps) {
  return (
    <>
      <nav className="bottom-glass-nav">
        {ITEMS.map((item) => (
          <button
            key={item.id}
            className={`bottom-nav-btn ${activeSection === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
      <style>{`
        .bottom-glass-nav {
          position: fixed; left: 50%; bottom: 12px;
          bottom: calc(12px + env(safe-area-inset-bottom));
          transform: translateX(-50%);
          width: calc(100% - 20px); max-width: 520px;
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          background: rgba(15,17,21,0.85);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3),
                      inset 2px 2px 5px -2px rgba(255,255,255,0.05),
                      inset -2px -2px 5px 2px rgba(255,255,255,0.03);
          padding: 6px 8px;
          border-radius: 99rem;
          display: flex; justify-content: center; gap: 4px;
          z-index: 100;
        }
        .bottom-nav-btn {
          display: flex; flex-direction: column; align-items: center;
          flex: 1 1 0; min-width: 0;
          color: rgba(255,255,255,0.45);
          background: none; border: none;
          text-decoration: none; padding: 8px 6px;
          border-radius: 999rem;
          -webkit-tap-highlight-color: transparent;
          cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
        }
        .bottom-nav-btn:hover {
          background-color: rgba(247,147,26,0.1);
          color: #F7931A;
        }
        .bottom-nav-btn.active {
          background: rgba(247,147,26,0.15);
          color: #F7931A;
        }
        .bottom-nav-btn:active { transform: scale(0.96); }
        .bottom-nav-icon { font-size: 1.3rem; line-height: 1; }
        .bottom-nav-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.65rem; font-weight: 600;
          line-height: 1; margin-top: 3px;
        }
        @media (min-width: 769px) { .bottom-glass-nav { display: none; } }
      `}</style>
    </>
  );
}
