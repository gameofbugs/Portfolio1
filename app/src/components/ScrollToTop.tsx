import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        className="scroll-top-btn"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none" as const,
        }}
      >
        <svg className="scroll-top-icon" viewBox="0 0 384 512">
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </button>
      <style>{`
        .scroll-top-btn {
          position: fixed; bottom: 80px; right: 20px; z-index: 100;
          width: 50px; height: 50px; border-radius: 50%;
          background: rgba(15,17,21,0.9);
          border: 1px solid rgba(247,147,26,0.3);
          cursor: pointer; display: flex; align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease, transform 0.3s ease, background 0.3s;
          box-shadow: 0 0 0 4px rgba(247,147,26,0.1);
        }
        .scroll-top-btn:hover {
          width: 140px; border-radius: 50px;
          background: #F7931A; border-color: #F7931A;
        }
        .scroll-top-icon { width: 14px; transition: transform 0.3s; }
        .scroll-top-icon path { fill: #F7931A; transition: fill 0.3s; }
        .scroll-top-btn:hover .scroll-top-icon { transform: translateY(-200%); }
        .scroll-top-btn:hover .scroll-top-icon path { fill: #030304; }
        .scroll-top-btn::before {
          content: "Back to Top"; position: absolute;
          color: #030304; font-size: 0px; white-space: nowrap;
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600; transition: font-size 0.3s;
        }
        .scroll-top-btn:hover::before { font-size: 12px; }
        @media (max-width: 640px) {
          .scroll-top-btn { bottom: 76px; right: 12px; width: 42px; height: 42px; }
          .scroll-top-btn:hover { width: 42px; background: rgba(15,17,21,0.9); }
          .scroll-top-btn:hover .scroll-top-icon { transform: none; }
          .scroll-top-btn::before { display: none; }
        }
      `}</style>
    </>
  );
}
