// @ts-nocheck
export default function SettingsTab({ settings, setSettings, saveSettings, saving }) {
  return (
    <div className="fade-in">
      <div className="card" style={{ padding: 36, maxWidth: 600 }}>
        <span className="section-label" style={{ display: "block", marginBottom: 28 }}>Portfolio Settings</span>

        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={settings?.reviews_enabled !== false}
                onChange={e => setSettings(s => ({ ...s, reviews_enabled: e.target.checked }))}
                style={{ accentColor: "#F7931A", width: 18, height: 18 }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>Enable Reviews Section</div>
                <div style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "#94A3B8", letterSpacing: "0.04em", marginTop: 3 }}>
                  Show or hide the entire reviews section on the portfolio
                </div>
              </div>
            </label>
          </div>
        </div>

        <button className="btn-primary" onClick={saveSettings} disabled={saving}>
          {saving ? <><span className="spinner" /> Saving\u2026</> : "Save Settings →"}
        </button>
      </div>
    </div>
  );
}
