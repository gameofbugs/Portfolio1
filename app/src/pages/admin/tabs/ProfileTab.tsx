// @ts-nocheck
export default function ProfileTab({ profile, setProfile, saveProfile, saving }) {
  if (!profile) return null;
  return (
    <div className="card fade-in" style={{ padding: 36 }}>
      <span className="section-label" style={{ display: "block", marginBottom: 28 }}>Profile Settings</span>
      <div className="grid-2">
        <div className="field-wrap">
          <label className="field-label">Full Name</label>
          <input className="field-input" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
        </div>
        <div className="field-wrap">
          <label className="field-label">Title / Role</label>
          <input className="field-input" value={profile.title} onChange={e => setProfile(p => ({ ...p, title: e.target.value }))} />
        </div>
        <div className="field-wrap">
          <label className="field-label">Avatar Initials</label>
          <input className="field-input" value={profile.avatar} maxLength={3} onChange={e => setProfile(p => ({ ...p, avatar: e.target.value.toUpperCase() }))} style={{ fontFamily: "JetBrains Mono", letterSpacing: "0.15em" }} />
        </div>
        <div className="field-wrap">
          <label className="field-label">Years Active</label>
          <input className="field-input" type="number" value={profile.years_active} onChange={e => setProfile(p => ({ ...p, years_active: e.target.value }))} />
        </div>
        <div className="field-wrap">
          <label className="field-label">Community / Players Stat</label>
          <input className="field-input" value={profile.total_players} onChange={e => setProfile(p => ({ ...p, total_players: e.target.value }))} placeholder="e.g. 120K+" />
        </div>
      </div>
      <div className="field-wrap">
        <label className="field-label">Developer Mission Statement</label>
        <textarea className="field-input" value={profile.aim} onChange={e => setProfile(p => ({ ...p, aim: e.target.value }))} style={{ minHeight: 130 }} />
      </div>

      {/* Preview */}
      <div style={{ marginTop: 24, padding: "20px 24px", background: "rgba(247,147,26,0.04)", border: "1px solid rgba(247,147,26,0.12)", borderRadius: 12, marginBottom: 24 }}>
        <span className="section-label" style={{ display: "block", marginBottom: 12 }}>Live Preview</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#EA580C,#F7931A)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{profile.avatar}</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16 }}>{profile.name}</div>
            <div style={{ color: "#94A3B8", fontSize: 13 }}>{profile.title} · {profile.years_active} years</div>
          </div>
        </div>
      </div>

      <button className="btn-primary" onClick={saveProfile} disabled={saving}>
        {saving ? <><span className="spinner" /> Saving...</> : "Save Profile →"}
      </button>
    </div>
  );
}
