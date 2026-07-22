// @ts-nocheck
import ImageUploader from "../../../components/ImageUploader";
import SingleImageField from "../../../components/SingleImageField";

export default function GamesTab({ games, addGame, saveGame, removeGame, updateGameField, saving, onUploadError }) {
  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <span className="section-label">Games ({games.length} total)</span>
        <button className="btn-primary" onClick={addGame}>+ Add Game</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {games.map((g, idx) => (
          <div key={g.id} className="card" style={{ padding: 30 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 30 }}>{g.cover}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{g.title}</div>
                  <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "#94A3B8", letterSpacing: "0.06em" }}>Game #{idx + 1}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-primary" style={{ padding: "7px 18px", fontSize: 12 }} onClick={() => saveGame(g)} disabled={saving}>Save</button>
                <button className="btn-danger" onClick={() => removeGame(g.id)}>Remove</button>
              </div>
            </div>

            <div className="field-wrap">
              <label className="field-label">🖼 Cover Image (shown in the games grid)</label>
              <SingleImageField
                gameId={g.id}
                value={g.cover_image || ""}
                onChange={(val) => updateGameField(g.id, "cover_image", val)}
                onError={onUploadError}
              />
            </div>

            <div className="grid-2">
              <div className="field-wrap">
                <label className="field-label">Title</label>
                <input className="field-input" value={g.title} onChange={e => updateGameField(g.id, "title", e.target.value)} />
              </div>
              <div className="field-wrap">
                <label className="field-label">Cover Emoji (fallback if no image set)</label>
                <input className="field-input" value={g.cover} onChange={e => updateGameField(g.id, "cover", e.target.value)} style={{ fontSize: 20 }} />
              </div>
              <div className="field-wrap">
                <label className="field-label">Genre</label>
                <input className="field-input" value={g.genre} onChange={e => updateGameField(g.id, "genre", e.target.value)} placeholder="e.g. Roguelite / Action" />
              </div>
              <div className="field-wrap">
                <label className="field-label">Release Year</label>
                <input className="field-input" type="number" value={g.year} onChange={e => updateGameField(g.id, "year", e.target.value)} />
              </div>
              <div className="field-wrap">
                <label className="field-label">Platform(s)</label>
                <input className="field-input" value={g.platform} onChange={e => updateGameField(g.id, "platform", e.target.value)} placeholder="e.g. PC, Console, Mobile" />
              </div>
              <div className="field-wrap">
                <label className="field-label">Status</label>
                <select className="field-input" value={g.status} onChange={e => updateGameField(g.id, "status", e.target.value)}>
                  <option>Released</option>
                  <option>In Development</option>
                  <option>Early Access</option>
                  <option>Cancelled</option>
                  <option>On Hold</option>
                </select>
              </div>
              <div className="field-wrap">
                <label className="field-label">⭐ Featured Project</label>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontFamily: "JetBrains Mono", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
                    <input type="checkbox" checked={!!g.featured} onChange={e => { updateGameField(g.id, "featured", e.target.checked); if (e.target.checked && !g.featured_order) updateGameField(g.id, "featured_order", 0); }} style={{ accentColor: "#F7931A" }} />
                    Show in Featured section
                  </label>
                  {g.featured && (
                    <div>
                      <input className="field-input" type="number" value={g.featured_order || 0} onChange={e => updateGameField(g.id, "featured_order", parseInt(e.target.value) || 0)} style={{ width: 70, padding: "6px 10px", fontSize: 12 }} placeholder="Order" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="field-wrap">
              <label className="field-label">Short Description</label>
              <textarea className="field-input" value={g.description} onChange={e => updateGameField(g.id, "description", e.target.value)} style={{ minHeight: 70 }} placeholder="A short tagline shown on the card..." />
            </div>

            <div className="field-wrap">
              <label className="field-label">📝 Detailed Description</label>
              <textarea className="field-input" value={g.detailed_description || ""} onChange={e => updateGameField(g.id, "detailed_description", e.target.value)} style={{ minHeight: 100 }} placeholder="Longer write-up shown when a visitor expands the game (Play Store style)..." />
            </div>

            <div className="field-wrap">
              <label className="field-label">🎬 Trailer / Video Link</label>
              <input className="field-input" value={g.video_url || ""} onChange={e => updateGameField(g.id, "video_url", e.target.value)} placeholder="YouTube, Vimeo, or any video URL..." />
            </div>

            <div className="field-wrap">
              <label className="field-label">🖼 Screenshots / Gallery Images</label>
              <ImageUploader
                gameId={g.id}
                images={g.images || []}
                onChange={(next) => updateGameField(g.id, "images", next)}
                onError={onUploadError}
              />
            </div>

            <div className="field-wrap" style={{ marginBottom: 0 }}>
              <label className="field-label">⚡ Development Challenges &amp; Lessons Learned</label>
              <textarea
                className="field-input"
                value={g.challenges}
                onChange={e => updateGameField(g.id, "challenges", e.target.value)}
                style={{ minHeight: 130, borderColor: g.challenges ? "rgba(247,147,26,0.25)" : "rgba(255,255,255,0.09)" }}
                placeholder="Write about technical challenges, hard decisions, failures, breakthroughs, and lessons learned..."
              />
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 6, letterSpacing: "0.04em" }}>
                {(g.challenges || "").length} chars · shown as expandable dev log on portfolio
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
