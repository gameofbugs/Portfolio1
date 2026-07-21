// @ts-nocheck
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import LoginScreen from "./LoginScreen";
import AdminPanel from "./AdminPanel";

// ─── CSS (shared by LoginScreen + AdminPanel) ──────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #030304; color: #fff; font-family: 'Space Grotesk', sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0F1115; }
  ::-webkit-scrollbar-thumb { background: #F7931A55; border-radius: 2px; }
  @keyframes ping { 0%{transform:scale(1);opacity:1} 75%,100%{transform:scale(2.2);opacity:0} }
  @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .ping { animation: ping 1.6s cubic-bezier(0,0,0.2,1) infinite; }
  .shake { animation: shake 0.4s ease; }
  .fade-in { animation: fadeIn 0.3s ease both; }
  .grad-text { background: linear-gradient(to right, #F7931A, #FFD600); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .card { background: #0F1115; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; touch-action: manipulation; }
  .glass { background: rgba(255,255,255,0.025); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; }
  .btn-primary { background: linear-gradient(to right, #EA580C, #F7931A); border: none; color: #fff; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; border-radius: 9999px; padding: 10px 22px; cursor: pointer; transition: transform 0.25s ease, box-shadow 0.25s ease; box-shadow: 0 0 18px -5px rgba(234,88,12,0.45); display: inline-flex; align-items: center; gap: 8px; justify-content: center; touch-action: manipulation; }
  .btn-primary:hover { transform: scale(1.04); box-shadow: 0 0 28px -4px rgba(247,147,26,0.65); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .btn-ghost { background: transparent; border: 1px solid rgba(255,255,255,0.13); color: rgba(255,255,255,0.6); font-family: 'Space Grotesk', sans-serif; font-size: 13px; border-radius: 9999px; padding: 9px 20px; cursor: pointer; transition: border-color 0.2s ease, color 0.2s ease; display: inline-flex; align-items: center; gap: 6px; touch-action: manipulation; }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.4); color: #fff; }
  .btn-ghost:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-danger { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); color: #f87171; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.06em; border-radius: 8px; padding: 5px 14px; cursor: pointer; transition: background 0.2s ease, border-color 0.2s ease; touch-action: manipulation; }
  .btn-danger:hover { background: rgba(239,68,68,0.18); border-color: rgba(239,68,68,0.5); }
  .field-wrap { margin-bottom: 18px; }
  .field-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.35); display: block; margin-bottom: 7px; }
  .field-input { width: 100%; background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.09); border-radius: 8px; color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 14px; padding: 10px 14px; outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
  .field-input:focus { border-color: rgba(247,147,26,0.45); box-shadow: 0 0 0 3px rgba(247,147,26,0.08); }
  .field-input::placeholder { color: rgba(255,255,255,0.18); }
  .field-input:disabled { opacity: 0.4; cursor: not-allowed; }
  textarea.field-input { resize: vertical; min-height: 80px; line-height: 1.6; }
  select.field-input { appearance: none; cursor: pointer; }
  .tab-btn { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; padding: 9px 18px; border-radius: 10px; cursor: pointer; border: 1px solid transparent; transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease; touch-action: manipulation; }
  .tab-btn.active { background: rgba(247,147,26,0.12); color: #F7931A; border-color: rgba(247,147,26,0.28); }
  .tab-btn.inactive { background: transparent; color: rgba(255,255,255,0.35); }
  .tab-btn.inactive:hover { color: rgba(255,255,255,0.65); background: rgba(255,255,255,0.04); }
  .section-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #F7931A; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .save-toast { position: fixed; bottom: 28px; right: 28px; background: rgba(74,222,128,0.12); border: 1px solid rgba(74,222,128,0.3); color: #4ade80; font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 0.06em; padding: 13px 22px; border-radius: 12px; backdrop-filter: blur(12px); z-index: 200; display: flex; align-items: center; gap: 8px; max-width: calc(100vw - 32px); }
  .error-toast { position: fixed; bottom: 28px; right: 28px; background: rgba(239,68,68,0.12); border: 1px solid rgba(239,68,68,0.3); color: #f87171; font-family: 'JetBrains Mono', monospace; font-size: 13px; letter-spacing: 0.06em; padding: 13px 22px; border-radius: 12px; backdrop-filter: blur(12px); z-index: 200; display: flex; align-items: center; gap: 8px; max-width: calc(100vw - 32px); }
  .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.2); border-top-color: #F7931A; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; flex-shrink: 0; }
  @keyframes spin { to { transform: rotate(360deg); } }

  @media (prefers-reduced-motion: reduce) {
    .btn-primary, .btn-ghost, .btn-danger, .tab-btn, .field-input { transition: none !important; }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    .grid-2 { grid-template-columns: 1fr; }
    .save-toast, .error-toast { left: 16px; right: 16px; bottom: 16px; }
    .tab-btn { padding: 8px 13px; font-size: 10px; }
  }
`;

export default function AdminApp() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session ? data.session.user : null);
      setCheckingSession(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session ? session.user : null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div>
      <style>{CSS}</style>
      {checkingSession ? (
        <div style={{ minHeight: "100vh", background: "#030304", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className="spinner" style={{ width: 28, height: 28 }} />
        </div>
      ) : user ? (
        <AdminPanel user={user} onLogout={handleLogout} />
      ) : (
        <LoginScreen onLogin={(u) => setUser(u)} />
      )}
    </div>
  );
}
