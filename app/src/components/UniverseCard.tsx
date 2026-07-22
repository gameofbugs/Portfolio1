interface UniverseCardProps {
  avatar: string;
  name: string;
  role: string;
  availability: string;
  years: number;
  projectCount: number;
}

export default function UniverseCard({ avatar, name, role, availability, years, projectCount }: UniverseCardProps) {
  return (
    <div className="universe-parent">
      <div className="universe-card">
        <div className="universe-glass" />
        <div className="universe-logo">
          <span className="u-circle u-circle1" />
          <span className="u-circle u-circle2" />
          <span className="u-circle u-circle3" />
          <span className="u-circle u-circle4" />
          <span className="u-circle u-circle5">
            <svg viewBox="0 0 29.667 31.69" className="u-svg">
              <path d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z" />
              <path d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z" />
              <path d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z" />
            </svg>
          </span>
        </div>
        <div className="universe-content">
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg,#EA580C,#F7931A)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, fontWeight: 700, margin: "0 auto 16px",
            boxShadow: "0 0 32px -6px rgba(247,147,26,0.5)",
          }}>
            {avatar}
          </div>
          <span className="universe-title">{name}</span>
          <span className="universe-text">{role}</span>
          <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <span className="universe-badge" style={{ borderColor: "rgba(74,222,128,0.3)", color: "#4ade80", background: "rgba(74,222,128,0.08)" }}>{availability}</span>
            <span className="universe-badge" style={{ borderColor: "rgba(247,147,26,0.3)", color: "#F7931A", background: "rgba(247,147,26,0.08)" }}>{years}+ yrs</span>
            <span className="universe-badge" style={{ borderColor: "rgba(255,214,0,0.3)", color: "#FFD600", background: "rgba(255,214,0,0.08)" }}>{projectCount} projects</span>
          </div>
        </div>
      </div>
      <style>{`
        .universe-parent { width: 290px; height: 360px; perspective: 1000px; margin: 0 auto; }
        .universe-card {
          height: 100%; border-radius: 50px;
          background: linear-gradient(135deg, #EA580C, #F7931A);
          transition: all 0.5s ease-in-out; transform-style: preserve-3d;
          box-shadow: rgba(234,88,12,0) 40px 50px 25px -40px, rgba(234,88,12,0.2) 0px 25px 25px -5px;
          position: relative;
        }
        .universe-glass {
          transform-style: preserve-3d; position: absolute; inset: 8px;
          border-radius: 55px; border-top-right-radius: 100%;
          background: linear-gradient(0deg, rgba(3,3,4,0.7) 0%, rgba(3,3,4,0.9) 100%);
          transform: translate3d(0px, 0px, 25px);
          border-left: 1px solid rgba(247,147,26,0.3);
          border-bottom: 1px solid rgba(247,147,26,0.3);
          transition: all 0.5s ease-in-out;
        }
        .universe-content {
          position: relative; z-index: 2;
          padding: 60px 30px 30px; text-align: center;
          transform: translate3d(0, 0, 26px);
          display: flex; flex-direction: column; align-items: center;
        }
        .universe-title { display: block; color: #fff; font-weight: 700; font-size: 22px; }
        .universe-text { display: block; color: rgba(247,147,26,0.8); font-size: 13px; margin-top: 6px; font-family: 'JetBrains Mono', monospace; letter-spacing: 0.05em; }
        .universe-badge { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.07em; padding: 3px 10px; border-radius: 9999px; border: 1px solid; }
        .universe-logo { position: absolute; right: 0; top: 0; transform-style: preserve-3d; z-index: 3; }
        .universe-logo .u-circle {
          display: block; position: absolute; aspect-ratio: 1; border-radius: 50%;
          top: 0; right: 0;
          box-shadow: rgba(100,100,111,0.2) -10px 10px 20px 0px;
          backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px);
          background: rgba(247,147,26,0.15);
          transition: all 0.5s ease-in-out;
        }
        .u-circle1 { width: 170px; transform: translate3d(0,0,20px); top: 8px; right: 8px; }
        .u-circle2 { width: 140px; transform: translate3d(0,0,40px); top: 10px; right: 10px; transition-delay: 0.4s; }
        .u-circle3 { width: 110px; transform: translate3d(0,0,60px); top: 17px; right: 17px; transition-delay: 0.8s; }
        .u-circle4 { width: 80px; transform: translate3d(0,0,80px); top: 23px; right: 23px; transition-delay: 1.2s; }
        .u-circle5 {
          width: 50px; transform: translate3d(0,0,100px); top: 30px; right: 30px;
          display: grid; place-content: center; transition-delay: 1.6s;
        }
        .u-circle5 .u-svg { width: 20px; fill: #fff; }
        .universe-parent:hover .universe-card {
          transform: rotate3d(1,1,0,30deg);
          box-shadow: rgba(234,88,12,0.3) 30px 50px 25px -40px, rgba(234,88,12,0.1) 0px 25px 30px 0px;
        }
        .universe-parent:hover .universe-card .u-circle2 { transform: translate3d(0,0,60px); }
        .universe-parent:hover .universe-card .u-circle3 { transform: translate3d(0,0,80px); }
        .universe-parent:hover .universe-card .u-circle4 { transform: translate3d(0,0,100px); }
        .universe-parent:hover .universe-card .u-circle5 { transform: translate3d(0,0,120px); }
      `}</style>
    </div>
  );
}
