export default function OrangeLoader() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#030304", display: "flex",
      alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 32
    }}>
      <div className="loader-spinner">
        <div id="sq1" />
        <div id="sq2" />
        <div id="sq3" />
        <div id="sq4" />
        <div id="sq5" />
      </div>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        color: "#F7931A", letterSpacing: "0.2em", textTransform: "uppercase",
        opacity: 0.6
      }}>Loading...</span>
      <style>{`
        .loader-spinner {
          --square: 26px; --offset: 30px; --duration: 2.4s; --delay: 0.2s;
          --timing-function: ease-in-out;
          width: calc(3 * var(--offset) + var(--square));
          height: calc(2 * var(--offset) + var(--square));
          position: relative;
        }
        .loader-spinner div {
          display: inline-block; background: #EA580C; border: none;
          border-radius: 2px;
          width: var(--square); height: var(--square);
          position: absolute; padding: 0; margin: 0;
        }
        .loader-spinner #sq1 {
          left: calc(0 * var(--offset)); top: calc(0 * var(--offset));
          animation: sq1 var(--duration) var(--delay) var(--timing-function) infinite;
        }
        .loader-spinner #sq2 {
          left: calc(0 * var(--offset)); top: calc(1 * var(--offset));
          animation: sq2 var(--duration) var(--delay) var(--timing-function) infinite;
        }
        .loader-spinner #sq3 {
          left: calc(1 * var(--offset)); top: calc(1 * var(--offset));
          animation: sq3 var(--duration) var(--delay) var(--timing-function) infinite;
        }
        .loader-spinner #sq4 {
          left: calc(2 * var(--offset)); top: calc(1 * var(--offset));
          animation: sq4 var(--duration) var(--delay) var(--timing-function) infinite;
        }
        .loader-spinner #sq5 {
          left: calc(3 * var(--offset)); top: calc(1 * var(--offset));
          animation: sq5 var(--duration) var(--delay) var(--timing-function) infinite;
        }
        @keyframes sq1 {
          0% { left: calc(0 * var(--offset)); top: calc(0 * var(--offset)); }
          8.333% { left: calc(0 * var(--offset)); top: calc(1 * var(--offset)); }
          100% { left: calc(0 * var(--offset)); top: calc(1 * var(--offset)); }
        }
        @keyframes sq2 {
          0% { left: calc(0 * var(--offset)); top: calc(1 * var(--offset)); }
          8.333% { left: calc(0 * var(--offset)); top: calc(2 * var(--offset)); }
          16.67% { left: calc(1 * var(--offset)); top: calc(2 * var(--offset)); }
          25% { left: calc(1 * var(--offset)); top: calc(1 * var(--offset)); }
          83.33% { left: calc(1 * var(--offset)); top: calc(1 * var(--offset)); }
          91.67% { left: calc(1 * var(--offset)); top: calc(0 * var(--offset)); }
          100% { left: calc(0 * var(--offset)); top: calc(0 * var(--offset)); }
        }
        @keyframes sq3 {
          0%,100% { left: calc(1 * var(--offset)); top: calc(1 * var(--offset)); }
          16.67% { left: calc(1 * var(--offset)); top: calc(1 * var(--offset)); }
          25% { left: calc(1 * var(--offset)); top: calc(0 * var(--offset)); }
          33.33% { left: calc(2 * var(--offset)); top: calc(0 * var(--offset)); }
          41.67% { left: calc(2 * var(--offset)); top: calc(1 * var(--offset)); }
          66.67% { left: calc(2 * var(--offset)); top: calc(1 * var(--offset)); }
          75% { left: calc(2 * var(--offset)); top: calc(2 * var(--offset)); }
          83.33% { left: calc(1 * var(--offset)); top: calc(2 * var(--offset)); }
          91.67% { left: calc(1 * var(--offset)); top: calc(1 * var(--offset)); }
        }
        @keyframes sq4 {
          0% { left: calc(2 * var(--offset)); top: calc(1 * var(--offset)); }
          33.33% { left: calc(2 * var(--offset)); top: calc(1 * var(--offset)); }
          41.67% { left: calc(2 * var(--offset)); top: calc(2 * var(--offset)); }
          50% { left: calc(3 * var(--offset)); top: calc(2 * var(--offset)); }
          58.33% { left: calc(3 * var(--offset)); top: calc(1 * var(--offset)); }
          100% { left: calc(3 * var(--offset)); top: calc(1 * var(--offset)); }
        }
        @keyframes sq5 {
          0% { left: calc(3 * var(--offset)); top: calc(1 * var(--offset)); }
          50% { left: calc(3 * var(--offset)); top: calc(1 * var(--offset)); }
          58.33% { left: calc(3 * var(--offset)); top: calc(0 * var(--offset)); }
          66.67% { left: calc(2 * var(--offset)); top: calc(0 * var(--offset)); }
          75% { left: calc(2 * var(--offset)); top: calc(1 * var(--offset)); }
          100% { left: calc(2 * var(--offset)); top: calc(1 * var(--offset)); }
        }
      `}</style>
    </div>
  );
}
