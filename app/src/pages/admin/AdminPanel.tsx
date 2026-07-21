// @ts-nocheck
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProfileTab from "./tabs/ProfileTab";
import GamesTab from "./tabs/GamesTab";
import ToolsTab from "./tabs/ToolsTab";
import SocialTab from "./tabs/SocialTab";

export default function AdminPanel({ user, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [games, setGames] = useState([]);
  const [tools, setTools] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [tab, setTab] = useState("profile");
  const [toast, setToast] = useState(null); // { type: 'success'|'error', msg }
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // ── Load all data ──
  const loadAll = async () => {
    setLoading(true);
    try {
      const [{ data: p }, { data: g }, { data: t }, { data: s }] = await Promise.all([
        supabase.from("profile").select("*").eq("id", 1).single(),
        supabase.from("games").select("*").order("year", { ascending: false }),
        supabase.from("tools").select("*").order("id", { ascending: true }),
        supabase.from("social_links").select("*").order("sort_order", { ascending: true }),
      ]);
      if (p) setProfile(p);
      if (g) setGames(g);
      if (t) setTools(t);
      if (s) setSocialLinks(s);
    } catch (e) {
      showToast("error", "// failed to load data\u201d);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Save profile ──
  const saveProfile = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("profile")
      .update({
        name: profile.name,
        title: profile.title,
        avatar: profile.avatar,
        aim: profile.aim,
        games_published: profile.games_published,
        years_active: profile.years_active,
        total_players: profile.total_players,
      })
      .eq("id", 1);
    setSaving(false);
    if (error) showToast("error", "// save failed: " + error.message);
    else showToast("success", "✓ Profile saved to portfolio");
  };

  // ── Games CRUD ──
  const saveGame = async (game) => {
    setSaving(true);
    const { error } = await supabase
      .from("games")
      .upsert({
        id: game.id,
        title: game.title,
        genre: game.genre,
        year: parseInt(game.year),
        platform: game.platform,
        status: game.status,
        cover: game.cover,
        cover_image: game.cover_image || "",
        description: game.description,
        detailed_description: game.detailed_description || "",
        video_url: game.video_url || "",
        images: game.images || [],
        challenges: game.challenges,
      });
    setSaving(false);
    if (error) showToast("error", "// save failed: " + error.message);
    else showToast("success", `✓ "${game.title}" saved`);
  };

  const addGame = async () => {
    const newGame = {
      title: "Untitled Game",
      genre: "Genre",
      year: new Date().getFullYear(),
      platform: "PC",
      status: "In Development",
      cover: "🎮",
      cover_image: "",
      description: "",
      detailed_description: "",
      video_url: "",
      images: [],
      challenges: "",
    };
    const { data, error } = await supabase.from("games").insert(newGame).select().single();
    if (error) showToast("error", "// failed to add game");
    else {
      setGames(prev => [data, ...prev]);
      await supabase.from("profile").update({ games_published: games.length + 1 }).eq("id", 1);
      setProfile(p => p ? { ...p, games_published: games.length + 1 } : p);
    }
  };

  const removeGame = async (id) => {
    const { error } = await supabase.from("games").delete().eq("id", id);
    if (error) showToast("error", "// failed to remove game");
    else {
      const updated = games.filter(g => g.id !== id);
      setGames(updated);
      await supabase.from("profile").update({ games_published: updated.length }).eq("id", 1);
      setProfile(p => p ? { ...p, games_published: updated.length } : p);
      showToast("success", "✓ Game removed");
    }
  };

  const updateGameField = (id, field, val) => {
    setGames(prev => prev.map(g => g.id === id ? { ...g, [field]: val } : g));
  };

  // ── Tools CRUD ──
  const saveTool = async (tool) => {
    setSaving(true);
    const { error } = await supabase
      .from("tools")
      .upsert({ id: tool.id, name: tool.name, logo: tool.logo, link: tool.link, description: tool.description });
    setSaving(false);
    if (error) showToast("error", "// save failed: " + error.message);
    else showToast("success", `✓ "${tool.name}" saved`);
  };

  const addTool = async () => {
    const { data, error } = await supabase
      .from("tools")
      .insert({ name: "New Tool", logo: "🔧", link: "", description: "" })
      .select()
      .single();
    if (error) showToast("error", "// failed to add tool");
    else setTools(prev => [...prev, data]);
  };

  const removeTool = async (id) => {
    const { error } = await supabase.from("tools").delete().eq("id", id);
    if (error) showToast("error", "// failed to remove tool");
    else {
      setTools(prev => prev.filter(t => t.id !== id));
      showToast("success", "✓ Tool removed");
    }
  };

  const updateToolField = (id, field, val) => {
    setTools(prev => prev.map(t => t.id === id ? { ...t, [field]: val } : t));
  };

  // ── Social Links CRUD ──
  const saveSocial = async (s) => {
    setSaving(true);
    const { error } = await supabase
      .from("social_links")
      .upsert({ id: s.id, platform: s.platform, label: s.label, url: s.url, icon: s.icon, sort_order: s.sort_order });
    setSaving(false);
    if (error) showToast("error", "// save failed: " + error.message);
    else showToast("success", `✓ "${s.label}" saved`);
  };

  const addSocial = async () => {
    const nextOrder = socialLinks.length ? Math.max(...socialLinks.map(s => s.sort_order || 0)) + 1 : 1;
    const { data, error } = await supabase
      .from("social_links")
      .insert({ platform: "", label: "New Link", url: "", icon: "🔗", sort_order: nextOrder })
      .select()
      .single();
    if (error) showToast("error", "// failed to add link");
    else setSocialLinks(prev => [...prev, data]);
  };

  const removeSocial = async (id) => {
    const { error } = await supabase.from("social_links").delete().eq("id", id);
    if (error) showToast("error", "// failed to remove link");
    else {
      setSocialLinks(prev => prev.filter(s => s.id !== id));
      showToast("success", "✓ Link removed");
    }
  };

  const updateSocialField = (id, field, val) => {
    setSocialLinks(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s));
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#030304", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <span className="spinner" style={{ width: 32, height: 32 }} />
        <span style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>// connecting to database...</span>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#030304" }}>
      {/* Toasts */}
      {toast && (
        <div className={toast.type === "success" ? "save-toast fade-in" : "error-toast fade-in"} role="status" aria-live="polite">
          {toast.msg}
        </div>
      )}

      {/* Top bar */}
      <div style={{ background: "#0A0C10", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px", position: "sticky", top: 0, zIndex: 50, minHeight: 64, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <div style={{ position: "relative", width: 10, height: 10 }}>
            <div className="ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#F7931A" }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#F7931A" }} />
          </div>
          <span style={{ fontFamily: "JetBrains Mono", fontSize: 13, letterSpacing: "0.12em", color: "#F7931A" }}>ADMIN PANEL</span>
          <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em" }}>// {user?.email}</span>
          {saving && <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "rgba(247,147,26,0.6)", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 6 }}><span className="spinner" style={{ width: 10, height: 10 }} /> saving\u2026</span>}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "rgba(74,222,128,0.6)", letterSpacing: "0.08em" }}>● LIVE DB</span>
          <button className="btn-ghost" onClick={onLogout}>Logout</button>
        </div>
      </div>

      <div style={{ maxWidth: 1020, margin: "0 auto", padding: "32px 20px 60px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
          {["profile", "games", "tools", "social"].map(t => (
            <button key={t} className={`tab-btn ${tab === t ? "active" : "inactive"}`} onClick={() => setTab(t)}>
              {t === "profile" ? "👤 Profile" : t === "games" ? `🎮 Games (${games.length})` : t === "tools" ? `🔧 Tools (${tools.length})` : `🔗 Contact (${socialLinks.length})`}
            </button>
          ))}
        </div>

        {tab === "profile" && (
          <ProfileTab profile={profile} setProfile={setProfile} saveProfile={saveProfile} saving={saving} />
        )}

        {tab === "games" && (
          <GamesTab
            games={games}
            addGame={addGame}
            saveGame={saveGame}
            removeGame={removeGame}
            updateGameField={updateGameField}
            saving={saving}
            onUploadError={(msg) => showToast("error", "// " + msg)}
          />
        )}

        {tab === "tools" && (
          <ToolsTab tools={tools} addTool={addTool} saveTool={saveTool} removeTool={removeTool} updateToolField={updateToolField} saving={saving} />
        )}

        {tab === "social" && (
          <SocialTab socialLinks={socialLinks} addSocial={addSocial} saveSocial={saveSocial} removeSocial={removeSocial} updateSocialField={updateSocialField} saving={saving} />
        )}
      </div>
    </div>
  );
}
