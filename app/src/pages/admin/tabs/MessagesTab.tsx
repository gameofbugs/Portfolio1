// @ts-nocheck
export default function MessagesTab({ messages, markRead, removeMessage, saving }) {
  if (!messages || messages.length === 0) {
    return (
      <div className="fade-in">
        <span className="section-label">Messages</span>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          Contact <span className="grad-text">Messages</span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono", fontSize: 13, padding: "40px 0" }}>
          // no messages yet — contact form submissions will appear here
        </p>
      </div>
    );
  }

  const unread = messages.filter(m => !m.read);
  const read = messages.filter(m => m.read);

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 12 }}>
        <div>
          <span className="section-label">Messages</span>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>
            Contact <span className="grad-text">Messages</span>
            {unread.length > 0 && (
              <span style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "#F7931A", marginLeft: 12, background: "rgba(247,147,26,0.1)", padding: "2px 10px", borderRadius: 9999, fontWeight: 400 }}>
                {unread.length} unread
              </span>
            )}
          </h2>
        </div>
      </div>

      {unread.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <span className="field-label" style={{ marginBottom: 12 }}>Unread</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {unread.map(m => renderMessage(m, markRead, removeMessage, saving))}
          </div>
        </div>
      )}

      {read.length > 0 && (
        <div>
          <span className="field-label" style={{ marginBottom: 12 }}>Read</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {read.map(m => renderMessage(m, markRead, removeMessage, saving))}
          </div>
        </div>
      )}
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function renderMessage(m, markRead, removeMessage, saving) {
  return (
    <div
      key={m.id}
      className="card"
      style={{
        padding: 20,
        borderLeft: m.read ? "1px solid rgba(255,255,255,0.08)" : "3px solid #F7931A",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, fontSize: 15 }}>{m.name}</span>
            <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{m.email}</span>
            {!m.read && <span className="badge badge-o" style={{ fontSize: 9 }}>NEW</span>}
          </div>
          {m.subject && (
            <div style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "#94A3B8", marginTop: 4 }}>
              Subject: {m.subject}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "rgba(255,255,255,0.25)", whiteSpace: "nowrap" }}>
            {formatDate(m.created_at)}
          </span>
        </div>
      </div>

      <div style={{
        background: "rgba(0,0,0,0.25)", borderRadius: 8, padding: 14,
        marginBottom: 14, border: "1px solid rgba(255,255,255,0.04)"
      }}>
        <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{m.message}</p>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {!m.read && (
          <button className="btn-ghost" style={{ fontSize: 11, padding: "5px 14px", borderRadius: 8 }} onClick={() => markRead(m.id)} disabled={saving}>
            Mark Read
          </button>
        )}
        <button className="btn-danger" onClick={() => removeMessage(m.id)} disabled={saving}>
          Delete
        </button>
      </div>
    </div>
  );
}
