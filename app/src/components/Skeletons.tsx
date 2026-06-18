// @ts-nocheck
// Shared skeleton primitives. Relies on the ".skeleton" shimmer class
// defined in each page's CSS block (same animation/colors as before).

export function SkeletonBlock({ width = "100%", height = 14, radius = 8, style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius: radius, ...style }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="card" style={{ padding: 28 }}>
      <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
        <SkeletonBlock width={54} height={54} radius={13} style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <SkeletonBlock height={18} width="60%" style={{ marginBottom: 10 }} />
          <SkeletonBlock height={12} width="40%" />
        </div>
      </div>
      <SkeletonBlock height={13} width="100%" style={{ marginBottom: 8 }} />
      <SkeletonBlock height={13} width="80%" />
    </div>
  );
}

export function SkeletonToolCard() {
  return (
    <div className="card" style={{ padding: 24, display: "flex", gap: 16 }}>
      <SkeletonBlock width={50} height={50} radius={12} style={{ flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <SkeletonBlock height={16} width="50%" style={{ marginBottom: 10 }} />
        <SkeletonBlock height={13} width="80%" />
      </div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div>
      <SkeletonBlock height={26} width={220} radius={9999} style={{ marginBottom: 32 }} />
      <SkeletonBlock height={48} width="85%" style={{ marginBottom: 14 }} />
      <SkeletonBlock height={48} width="60%" style={{ marginBottom: 22 }} />
      <SkeletonBlock height={18} width="70%" style={{ marginBottom: 40 }} />
      <div style={{ display: "flex", gap: 14 }}>
        <SkeletonBlock height={48} width={150} radius={9999} />
        <SkeletonBlock height={48} width={130} radius={9999} />
      </div>
    </div>
  );
}

export function SkeletonStatsBar() {
  return (
    <div className="stats-grid" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="stat-item" style={{ padding: "28px 32px", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
          <SkeletonBlock height={32} width={80} style={{ margin: "0 auto 10px" }} />
          <SkeletonBlock height={13} width={110} style={{ margin: "0 auto" }} />
        </div>
      ))}
    </div>
  );
}

export function SkeletonSocialCard() {
  return (
    <div className="card" style={{ padding: 20, display: "flex", alignItems: "center", gap: 14 }}>
      <SkeletonBlock width={40} height={40} radius={10} style={{ flexShrink: 0 }} />
      <SkeletonBlock height={15} width="55%" />
    </div>
  );
}
