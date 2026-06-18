// @ts-nocheck
export default function ToolsTab({ tools, addTool, saveTool, removeTool, updateToolField, saving }) {
  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <span className="section-label">Tools &amp; Technologies</span>
        <button className="btn-primary" onClick={addTool}>+ Add Tool</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px,1fr))", gap: 18 }}>
        {tools.map(t => (
          <div key={t.id} className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 26 }}>{t.logo}</span>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{t.name}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn-primary" style={{ padding: "5px 14px", fontSize: 11, borderRadius: 8 }} onClick={() => saveTool(t)} disabled={saving}>Save</button>
                <button className="btn-danger" onClick={() => removeTool(t.id)}>Remove</button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 12, marginBottom: 12 }}>
              <div className="field-wrap" style={{ marginBottom: 0 }}>
                <label className="field-label">Emoji</label>
                <input className="field-input" value={t.logo} onChange={e => updateToolField(t.id, "logo", e.target.value)} style={{ fontSize: 20, textAlign: "center", padding: "8px 6px" }} />
              </div>
              <div className="field-wrap" style={{ marginBottom: 0 }}>
                <label className="field-label">Tool Name</label>
                <input className="field-input" value={t.name} onChange={e => updateToolField(t.id, "name", e.target.value)} />
              </div>
            </div>
            <div className="field-wrap">
              <label className="field-label">Website URL</label>
              <input className="field-input" value={t.link} onChange={e => updateToolField(t.id, "link", e.target.value)} placeholder="https://..." />
            </div>
            <div className="field-wrap" style={{ marginBottom: 0 }}>
              <label className="field-label">How You Use It</label>
              <input className="field-input" value={t.description} onChange={e => updateToolField(t.id, "description", e.target.value)} placeholder="Describe how this tool fits your workflow..." />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
