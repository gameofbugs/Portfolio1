// @ts-nocheck
import SocialIcon, { KNOWN_PLATFORMS } from "../../../components/SocialIcon";

const KNOWN_KEYS = KNOWN_PLATFORMS.map(p => p.key);

export default function SocialTab({ socialLinks, addSocial, saveSocial, removeSocial, updateSocialField, saving }) {
  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 12 }}>
        <span className="section-label">Contact / Social Links</span>
        <button className="btn-primary" onClick={addSocial}>+ Add Custom Link</button>
      </div>
      <p style={{ color: "#94A3B8", fontSize: 13, marginBottom: 24, lineHeight: 1.6, maxWidth: 560 }}>
        LinkedIn, Instagram, YouTube, GitHub and itch.io are built in — just fill in a URL and it will appear
        on the portfolio's Contact section. Leave the URL blank to hide it. Add any other platform with the button above.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px,1fr))", gap: 18 }}>
        {socialLinks.map(s => {
          const isKnown = KNOWN_KEYS.includes(s.platform);
          return (
            <div key={s.id} className="card" style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(247,147,26,0.09)", border: "1px solid rgba(247,147,26,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <SocialIcon platform={s.platform} emoji={s.icon} size={17} />
                  </span>
                  <span style={{ fontWeight: 600, fontSize: 15 }}>{s.label}</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn-primary" style={{ padding: "5px 14px", fontSize: 11, borderRadius: 8 }} onClick={() => saveSocial(s)} disabled={saving}>Save</button>
                  <button className="btn-danger" onClick={() => removeSocial(s.id)}>Remove</button>
                </div>
              </div>

              {!isKnown && (
                <div style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 12, marginBottom: 12 }}>
                  <div className="field-wrap" style={{ marginBottom: 0 }}>
                    <label className="field-label">Icon</label>
                    <input className="field-input" value={s.icon || ""} onChange={e => updateSocialField(s.id, "icon", e.target.value)} style={{ fontSize: 18, textAlign: "center", padding: "8px 6px" }} placeholder="🔗" />
                  </div>
                  <div className="field-wrap" style={{ marginBottom: 0 }}>
                    <label className="field-label">Label</label>
                    <input className="field-input" value={s.label} onChange={e => updateSocialField(s.id, "label", e.target.value)} placeholder="e.g. Discord, X, TikTok..." />
                  </div>
                </div>
              )}

              {s.platform === "itchio" && (
                <div className="field-wrap">
                  <label className="field-label">Icon (emoji)</label>
                  <input className="field-input" value={s.icon || ""} onChange={e => updateSocialField(s.id, "icon", e.target.value)} style={{ fontSize: 18, maxWidth: 80, textAlign: "center" }} />
                </div>
              )}

              <div className="field-wrap" style={{ marginBottom: 0 }}>
                <label className="field-label">URL</label>
                <input className="field-input" value={s.url} onChange={e => updateSocialField(s.id, "url", e.target.value)} placeholder="https://..." />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
