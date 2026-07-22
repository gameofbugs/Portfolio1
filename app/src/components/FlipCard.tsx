interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export default function FlipCard({ front, back, className = "" }: FlipCardProps) {
  return (
    <div className={`flip-card-wrap ${className}`}>
      <div className="flip-card-inner">
        <div className="flip-card-front">{front}</div>
        <div className="flip-card-back">{back}</div>
      </div>
      <style>{`
        .flip-card-wrap {
          background-color: transparent; width: 100%; height: 254px;
          perspective: 1000px; font-family: sans-serif;
        }
        .flip-card-inner {
          position: relative; width: 100%; height: 100%;
          text-align: center; transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        .flip-card-wrap:hover .flip-card-inner { transform: rotateY(180deg); }
        .flip-card-front, .flip-card-back {
          position: absolute; display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          width: 100%; height: 100%;
          -webkit-backface-visibility: hidden; backface-visibility: hidden;
          border: 1px solid rgba(247,147,26,0.3);
          border-radius: 1rem; padding: 24px;
          box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
          overflow: hidden;
        }
        .flip-card-front {
          background: linear-gradient(135deg, rgba(247,147,26,0.12), rgba(15,17,21,0.9));
          color: #fff;
        }
        .flip-card-back {
          background: linear-gradient(135deg, #EA580C, #F7931A);
          color: white; transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
