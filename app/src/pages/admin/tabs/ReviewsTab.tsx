// @ts-nocheck
export default function ReviewsTab({ reviews, addReview, saveReview, removeReview, updateReviewField, saving }) {
  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <span className="section-label">Reviews ({reviews.length} total)</span>
        <button className="btn-primary" onClick={addReview}>+ Add Review</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        {reviews.map((r) => (
          <div key={r.id} className="card" style={{ padding: 30 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(247,147,26,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  {r.image ? "🖼" : "👤"}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{r.name || "Anonymous"}</div>
                  <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "#94A3B8", letterSpacing: "0.06em" }}>{r.designation || "Reviewer"}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontFamily: "JetBrains Mono", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
                  <input type="checkbox" checked={r.enabled !== false} onChange={e => updateReviewField(r.id, "enabled", e.target.checked)} style={{ accentColor: "#F7931A" }} />
                  Visible
                </label>
                <button className="btn-primary" style={{ padding: "7px 18px", fontSize: 12 }} onClick={() => saveReview(r)} disabled={saving}>Save</button>
                <button className="btn-danger" onClick={() => removeReview(r.id)}>Remove</button>
              </div>
            </div>
            <div className="grid-2">
              <div className="field-wrap">
                <label className="field-label">Reviewer Name</label>
                <input className="field-input" value={r.name} onChange={e => updateReviewField(r.id, "name", e.target.value)} placeholder="Full name" />
              </div>
              <div className="field-wrap">
                <label className="field-label">Designation / Title</label>
                <input className="field-input" value={r.designation || ""} onChange={e => updateReviewField(r.id, "designation", e.target.value)} placeholder="e.g. Game Director at Studio X" />
              </div>
              <div className="field-wrap">
                <label className="field-label">Rating (1-5)</label>
                <input className="field-input" type="number" min={1} max={5} value={r.rating || 5} onChange={e => updateReviewField(r.id, "rating", parseInt(e.target.value) || 5)} style={{ width: 80 }} />
              </div>
              <div className="field-wrap">
                <label className="field-label">Profile Image URL</label>
                <input className="field-input" value={r.image || ""} onChange={e => updateReviewField(r.id, "image", e.target.value)} placeholder="https://..." />
              </div>
            </div>
            <div className="field-wrap" style={{ marginBottom: 0 }}>
              <label className="field-label">Review Text</label>
              <textarea className="field-input" value={r.text} onChange={e => updateReviewField(r.id, "text", e.target.value)} style={{ minHeight: 80 }} placeholder="What they said about you..." />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
