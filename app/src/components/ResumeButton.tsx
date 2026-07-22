interface ResumeButtonProps {
  onClick: () => void;
  label?: string;
}

export default function ResumeButton({ onClick, label = "View Resume" }: ResumeButtonProps) {
  return (
    <div className="resume-btn-wrap">
      <button className="resume-btn" onClick={onClick}>
        {label}
        <span />
      </button>
      <style>{`
        .resume-btn-wrap button {
          border: none; display: block; position: relative;
          padding: 0.7em 2.4em; font-size: 16px;
          background: transparent; cursor: pointer; user-select: none;
          overflow: hidden; color: #F7931A; z-index: 1;
          font-family: 'Space Grotesk', sans-serif; font-weight: 500;
          border-radius: 9999px;
        }
        .resume-btn-wrap button span {
          position: absolute; left: 0; top: 0; width: 100%; height: 100%;
          background: transparent; z-index: -1;
          border: 2px solid #F7931A; border-radius: 9999px;
        }
        .resume-btn-wrap button span::before {
          content: ""; display: block; position: absolute;
          width: 8%; height: 500%;
          background: #030304;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(-60deg);
          transition: all 0.3s;
        }
        .resume-btn-wrap button:hover span::before {
          transform: translate(-50%, -50%) rotate(-90deg);
          width: 100%; background: #F7931A;
        }
        .resume-btn-wrap button:hover { color: #030304; }
        .resume-btn-wrap button:active span::before { background: #EA580C; }
      `}</style>
    </div>
  );
}
