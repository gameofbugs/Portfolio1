// @ts-nocheck
export default function SkillsTab({ skills, addSkill, saveSkill, removeSkill, updateSkillField, saving }) {
  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <span className="section-label">Skills ({skills.length} total)</span>
        <button className="btn-primary" onClick={addSkill}>+ Add Skill</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 18 }}>
        {skills.map((s) => (
          <div key={s.id} className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 26 }}>{s.logo}</span>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn-primary" style={{ padding: "5px 14px", fontSize: 11, borderRadius: 8 }} onClick={() => saveSkill(s)} disabled={saving}>Save</button>
                <button className="btn-danger" onClick={() => removeSkill(s.id)}>Remove</button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", gap: 12, marginBottom: 12 }}>
              <div className="field-wrap" style={{ marginBottom: 0 }}>
                <label className="field-label">Logo</label>
                <input className="field-input" value={s.logo} onChange={e => updateSkillField(s.id, "logo", e.target.value)} style={{ fontSize: 20, textAlign: "center", padding: "8px 6px" }} placeholder="⚡" />
              </div>
              <div className="field-wrap" style={{ marginBottom: 0 }}>
                <label className="field-label">Skill Name</label>
                <input className="field-input" value={s.name} onChange={e => updateSkillField(s.id, "name", e.target.value)} placeholder="e.g. Unity, C#, Blender" />
              </div>
            </div>
            <div className="field-wrap" style={{ marginBottom: 0 }}>
              <label className="field-label">Sort Order</label>
              <input className="field-input" type="number" value={s.sort_order || 0} onChange={e => updateSkillField(s.id, "sort_order", parseInt(e.target.value) || 0)} style={{ width: 80 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
