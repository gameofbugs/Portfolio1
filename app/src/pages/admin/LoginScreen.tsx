// @ts-nocheck
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

// Uses real Supabase Auth (email + password) instead of querying a
// plaintext-password table from the browser. Create the admin account
// once via Supabase Dashboard → Authentication → Users → Add User.
export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);

  const attempt = async () => {
    if (!email.trim() || !password.trim()) {
      setErr("// please enter email and password");
      return;
    }
    setLoading(true);
    setErr("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.session) {
        const msg = error?.message?.includes("Email not confirmed")
          ? "// email not confirmed — check your inbox"
          : error?.message?.includes("Invalid login credentials")
          ? "// incorrect email or password"
          : error?.message || "// authentication failed";
        setErr(msg);
        setShaking(true);
        setTimeout(() => setShaking(false), 500);
        setPassword("");
      } else {
        onLogin(data.session.user);
      }
    } catch (e) {
      setErr("// connection error — check Supabase config");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#030304", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "#F7931A", opacity: 0.04, borderRadius: "50%", filter: "blur(120px)", pointerEvents: "none" }} />

      <div className={shaking ? "shake" : ""}>
        <div className="glass" style={{ padding: "52px 44px", width: "100%", maxWidth: 440, textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#EA580C,#F7931A)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", fontSize: 28, boxShadow: "0 0 32px -8px rgba(247,147,26,0.5)" }}>🔐</div>

          <span className="section-label" style={{ display: "block", marginBottom: 10 }}>Admin Access</span>
          <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Sign In</h1>
          <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 36, lineHeight: 1.6 }}>
            This panel is restricted to the developer only.
          </p>

          <div style={{ textAlign: "left" }}>
            <div className="field-wrap">
              <label className="field-label">Email</label>
              <input
                className="field-input"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErr(""); }}
                onKeyDown={e => e.key === "Enter" && attempt()}
                disabled={loading}
                style={{ textAlign: "left" }}
              />
            </div>
            <div className="field-wrap" style={{ marginBottom: 12 }}>
              <label className="field-label">Password</label>
              <input
                className="field-input"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setErr(""); }}
                onKeyDown={e => e.key === "Enter" && attempt()}
                disabled={loading}
                style={{ letterSpacing: "0.2em" }}
              />
            </div>
            {err && (
              <p style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "#f87171", marginBottom: 16, letterSpacing: "0.06em" }}>{err}</p>
            )}
          </div>

          <button className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: 14, marginTop: 4, justifyContent: "center" }} onClick={attempt} disabled={loading}>
            {loading ? <><span className="spinner" /> Verifying\u2026</> : "Access Admin Panel"}
          </button>
        </div>
      </div>
    </div>
  );
}
