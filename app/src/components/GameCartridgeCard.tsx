interface GameCartridgeCardProps {
  title: string;
  year: number;
  cover?: string;
}

export default function GameCartridgeCard({ title, year, cover = "🎮" }: GameCartridgeCardProps) {
  return (
    <div className="cartridge-wrap">
      <div className="cartridge-card">
        <div className="cartridge-ups">
          <div className="cartridge-screw">+</div>
          <div className="cartridge-screw">+</div>
        </div>
        <div className="cartridge-body">
          <div className="cartridge-lines">
            <div className="cartridge-line" />
            <div className="cartridge-line" />
          </div>
          <div className="cartridge-stripe">
            <div className="cartridge-roll">
              <div className="cartridge-wheel" />
              <div className="cartridge-tape" />
              <div className="cartridge-wheel" />
            </div>
            <span className="cartridge-year">{year}</span>
          </div>
          <div className="cartridge-bar">
            <span className="cartridge-time">{title}</span>
          </div>
        </div>
        <div className="cartridge-bottom">
          <div className="cartridge-connector">
            <div className="cartridge-dot" />
            <div className="cartridge-pin" />
            <div className="cartridge-screw">+</div>
            <div className="cartridge-pin" />
            <div className="cartridge-dot" />
          </div>
        </div>
      </div>
      <style>{`
        .cartridge-card {
          width: 300px; height: 200px;
          background: #252525; border-radius: 8px;
          box-shadow: rgba(0,0,0,0.4) 0px 2px 4px, rgba(0,0,0,0.3) 0px 7px 13px -3px, rgba(0,0,0,0.2) 0px -3px 0px inset;
        }
        .cartridge-ups { display: flex; justify-content: space-between; padding: 4px 8px; }
        .cartridge-bottom { display: flex; justify-content: space-between; padding: 0 8px; margin-top: -10px; }
        .cartridge-screw {
          display: flex; color: #000; border: 1px solid #000;
          background: #aaa; height: 12px; width: 12px;
          border-radius: 50%; align-items: center; justify-content: center;
          font-size: 10px; font-weight: bold;
        }
        .cartridge-body {
          width: 230px; height: 115px; margin: 8px auto 0;
          background: #FFFDD0;
          clip-path: polygon(5% 0, 95% 0, 100% 10%, 100% 100%, 100% 100%, 0 100%, 0 100%, 0 10%);
          border-radius: 5px; position: relative;
        }
        .cartridge-lines { padding: 12px 10px 0; }
        .cartridge-line { height: 1px; background: #000; margin-bottom: 14px; width: 90%; margin-left: auto; margin-right: auto; }
        .cartridge-stripe {
          display: flex; width: 228px; height: 50px;
          background: #F7931A; margin-top: 18px; align-items: center;
        }
        .cartridge-roll { display: flex; align-items: center; margin-left: 24px; gap: 8px; }
        .cartridge-wheel {
          width: 20px; height: 20px;
          border: 2px dashed #fff; box-shadow: 0 0 0 4.4px #fff;
          border-radius: 50%;
          animation: cartridgeSpin 2s linear infinite;
        }
        .cartridge-tape { width: 36px; height: 20px; background: #252525; }
        .cartridge-year {
          margin-left: 16px; font-family: 'JetBrains Mono', monospace;
          font-size: 18px; font-weight: 700; color: #030304;
        }
        .cartridge-bar {
          display: flex; width: 230px; height: 18px;
          background: #EA580C; margin-top: 4px;
          border-bottom-left-radius: 4px; border-bottom-right-radius: 4px;
          align-items: center; justify-content: center;
        }
        .cartridge-time {
          font-family: 'JetBrains Mono', monospace; font-size: 9px;
          color: #fff; text-transform: uppercase; letter-spacing: 0.05em;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 200px;
        }
        .cartridge-connector {
          width: 150px; height: 36px; margin: 0 auto;
          background: #252525;
          clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%);
          display: flex; align-items: center; justify-content: center; gap: 4px;
        }
        .cartridge-dot { width: 6px; height: 6px; background: #bebebe; border-radius: 50%; }
        .cartridge-pin { width: 6px; height: 6px; background: #bebebe; border-radius: 2px; }
        @keyframes cartridgeSpin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
