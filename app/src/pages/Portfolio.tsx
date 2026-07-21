// @ts-nocheck
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  SkeletonCard,
  SkeletonToolCard,
  SkeletonHero,
  SkeletonStatsBar,
  SkeletonSocialCard,
} from "../components/Skeletons";
import SocialIcon from "../components/SocialIcon";
import GameDetailModal from "../components/GameDetailModal";
import AnimatedBackground from "../components/AnimatedBackground";

const DEFAULT_DATA = {
  name: "Alex Mercer",
  title: "Indie Game Developer",
  avatar: "AM",
  aim: "To craft immersive, story-driven games that blur the line between reality and digital worlds — one pixel at a time.",
  gamesPublished: 4,
  yearsActive: 6,
  totalPlayers: "120K+",
};

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #030304; color: #fff; font-family: 'Space Grotesk', sans-serif; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0F1115; }
  ::-webkit-scrollbar-thumb { background: #F7931A55; border-radius: 2px; }

  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes ping { 0%{transform:scale(1);opacity:1} 75%,100%{transform:scale(2.2);opacity:0} }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes spinR { from{transform:rotate(360deg)} to{transform:rotate(0deg)} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  @keyframes orbDrift1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(70px,-50px)} }
  @keyframes orbDrift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-60px,60px)} }
  @keyframes orbDrift3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(50px,40px)} }
  @keyframes particleRise {
    0% { transform: translate(0,0); opacity: 0; }
    8% { opacity: 1; }
    25% { transform: translate(18px,-25vh); }
    50% { transform: translate(-16px,-52vh); }
    75% { transform: translate(14px,-78vh); }
    92% { opacity: 1; }
    100% { transform: translate(0,-112vh); opacity: 0; }
  }

  .ambient-bg { position: fixed; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; background: #030304; }
  .ambient-orb { position: absolute; border-radius: 50%; filter: blur(110px); will-change: transform; }
  .ambient-orb-1 { animation: orbDrift1 26s ease-in-out infinite; }
  .ambient-orb-2 { animation: orbDrift2 32s ease-in-out infinite; }
  .ambient-orb-3 { animation: orbDrift3 22s ease-in-out infinite; }
  .ambient-particle { position: absolute; bottom: -20px; border-radius: 50%; animation-name: particleRise; animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform, opacity; }

  @media (prefers-reduced-motion: reduce) {
    .ambient-orb, .ambient-particle, .float, .float-delay, .spin-slow, .spin-slow-r, .ping, .fade-in, .skeleton { animation: none !important; }
    .game-card-cover img { transition: none !important; }
    html { scroll-behavior: auto; }
  }

  .float { animation: float 6s ease-in-out infinite; }
  .float-delay { animation: float 5s ease-in-out 1.2s infinite; }
  .spin-slow { animation: spin 12s linear infinite; }
  .spin-slow-r { animation: spinR 18s linear infinite; }
  .ping { animation: ping 1.6s cubic-bezier(0,0,0.2,1) infinite; }
  .fade-in { animation: fadeIn 0.5s ease both; }

  h1, h2, h3, h4 { color: #ffffff; text-wrap: balance; }
  .grad-text { color: #F7931A; background: linear-gradient(to right, #F7931A, #FFD600); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  @supports not (-webkit-background-clip: text) { .grad-text { color: #F7931A; background: none; } }
  .section-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #F7931A; margin-bottom: 14px; display: block; }
  .card { background: #0F1115; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease; touch-action: manipulation; }
  .card:hover { border-color: rgba(247,147,26,0.4); box-shadow: 0 0 32px -10px rgba(247,147,26,0.22); transform: translateY(-3px); }
  .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.09); border-radius: 14px; }

  .btn-primary { background: linear-gradient(to right, #EA580C, #F7931A); border: none; color: #fff; font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px; letter-spacing: 0.07em; text-transform: uppercase; border-radius: 9999px; padding: 13px 28px; cursor: pointer; transition: transform 0.25s ease, box-shadow 0.25s ease; box-shadow: 0 0 22px -5px rgba(234,88,12,0.5); display: inline-flex; align-items: center; gap: 8px; touch-action: manipulation; }
  .btn-primary:hover { transform: scale(1.05); box-shadow: 0 0 32px -4px rgba(247,147,26,0.7); }
  .btn-outline { background: transparent; border: 1.5px solid rgba(255,255,255,0.18); color: #fff; font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: 14px; border-radius: 9999px; padding: 12px 28px; cursor: pointer; transition: border-color 0.25s ease, background 0.25s ease; display: inline-flex; align-items: center; gap: 8px; touch-action: manipulation; }
  .btn-outline:hover { border-color: rgba(255,255,255,0.55); background: rgba(255,255,255,0.07); }

  .badge { font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.07em; text-transform: uppercase; border-radius: 9999px; padding: 3px 10px; white-space: nowrap; }
  .badge-o { background: rgba(247,147,26,0.12); color: #F7931A; border: 1px solid rgba(247,147,26,0.28); }
  .badge-g { background: rgba(255,214,0,0.1); color: #FFD600; border: 1px solid rgba(255,214,0,0.22); }
  .badge-gr { background: rgba(74,222,128,0.1); color: #4ade80; border: 1px solid rgba(74,222,128,0.25); }
  .badge-mu { background: rgba(148,163,184,0.1); color: #94A3B8; border: 1px solid rgba(148,163,184,0.2); }

  .grid-bg { background-image: linear-gradient(to right, rgba(30,41,59,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,41,59,0.4) 1px, transparent 1px); background-size: 50px 50px; }
  .nav-link { font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.45); background: none; border: none; cursor: pointer; transition: color 0.2s ease; padding: 4px 2px; text-decoration: none; touch-action: manipulation; }
  .nav-link:hover { color: #F7931A; }
  .nav-link:focus-visible { outline: 2px solid #F7931A; outline-offset: 4px; border-radius: 2px; }

  .devlog-trigger { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #F7931A; letterSpacing: 0.08em; }

  .game-card { padding: 0; cursor: pointer; overflow: hidden; display: flex; flex-direction: column; }
  .game-card-cover { width: 100%; aspect-ratio: 4 / 3; background: linear-gradient(135deg, rgba(247,147,26,0.14), rgba(10,12,16,0.6)); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; flex-shrink: 0; }
  .game-card-cover img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
  .game-card:hover .game-card-cover img { transform: scale(1.06); }
  .game-card-cover .cover-emoji { font-size: 46px; }
  .game-card-cover .video-pill { position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.18); color: #F7931A; font-size: 12px; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
  .game-card-body { padding: 22px 22px 24px; display: flex; flex-direction: column; flex: 1; }

  [id] { scroll-margin-top: 84px; }

  .skeleton { background: linear-gradient(90deg, #0F1115 25%, #1a1d24 50%, #0F1115 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 8px; }
  .live-dot { display: inline-flex; align-items: center; gap: 6px; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #4ade80; letter-spacing: 0.1em; text-transform: uppercase; }

  .social-card { display: flex; align-items: center; gap: 14px; padding: 18px 20px; text-decoration: none; }
  .social-card .icon-wrap { width: 42px; height: 42px; border-radius: 11px; background: rgba(247,147,26,0.09); border: 1px solid rgba(247,147,26,0.22); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .social-card .label { color: #fff; font-weight: 600; font-size: 15px; word-break: break-word; }

  /* ── RESPONSIVE ── */
  .container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 24px; }
  .hero-grid { display: grid; grid-template-columns: 1fr 300px; gap: 48px; align-items: center; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
  .stats-grid { display: grid; grid-template-columns: repeat(3,1fr); }
  .games-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px,1fr)); gap: 24px; align-items: start; }
  .tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr)); gap: 20px; }
  .social-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap: 18px; }
  .nav-links { display: flex; align-items: center; gap: 32px; }
  .orb-wrap { width: 280px; height: 280px; position: relative; display: flex; align-items: center; justify-content: center; justify-self: center; }

  .section-pad { scroll-margin-top: 84px; }

  @media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr; text-align: center; }
    .orb-wrap { width: 220px; height: 220px; justify-self: center; margin-top: 32px; }
    .hero-buttons { justify-content: center; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .stats-grid { grid-template-columns: repeat(3,1fr); }
  }

  @media (max-width: 640px) {
    .nav-links { gap: 16px; }
    .nav-link { font-size: 10px; }
    .live-dot span:last-child { display: none; }
    .stats-grid { grid-template-columns: 1fr; }
    .stat-item { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .stat-item:last-child { border-bottom: none; }
    .games-grid { grid-template-columns: 1fr; }
    .tools-grid { grid-template-columns: 1fr; }
    .social-grid { grid-template-columns: 1fr 1fr; }
    .orb-wrap { width: 180px; height: 180px; }
    .btn-primary, .btn-outline { font-size: 13px; padding: 11px 22px; }
    .section-pad { padding: 60px 20px; }
    .hero-pad { padding-top: 110px; padding-bottom: 60px; padding-left: 20px; padding-right: 20px; }
  }

  @media (max-width: 400px) {
    .social-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 640px) {
    .ambient-particle:nth-child(even) { display: none; }
    .ambient-orb { filter: blur(75px); }
  }
`;

export default function Portfolio() {
  const [data, setData] = useState(() => DEFAULT_DATA);
  const [games, setGames] = useState([]);
  const [tools, setTools] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailGame, setDetailGame] = useState(null);

  const loadData = async () => {
    try {
      const [{ data: profile, error: profileErr }, { data: gamesData, error: gamesErr }, { data: toolsData, error: toolsErr }, { data: socialData, error: socialErr }] =
        await Promise.all([
          supabase.from("profile").select("*").eq("id", 1).single(),
          supabase.from("games").select("*").order("year", { ascending: false }),
          supabase.from("tools").select("*").order("id", { ascending: true }),
          supabase.from("social_links").select("*").order("sort_order", { ascending: true }),
        ]);
      if (profileErr) throw profileErr;
      if (gamesErr) throw gamesErr;
      if (toolsErr) throw toolsErr;
      if (socialErr) throw socialErr;

      setData({
        name: profile.name,
        title: profile.title,
        avatar: profile.avatar,
        aim: profile.aim,
        gamesPublished: profile.games_published,
        yearsActive: profile.years_active,
        totalPlayers: profile.total_players,
      });
      setGames(gamesData || []);
      setTools(toolsData || []);
      setSocialLinks((socialData || []).filter((s) => s.url && s.url.trim() !== ""));
    } catch (err) {
      console.error("Failed to load portfolio data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const channel = supabase
      .channel("portfolio-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "profile" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "games" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "tools" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "social_links" }, () => loadData())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div style={{ minHeight: "100vh", color: "#fff" }}>
      <style>{CSS}</style>
      <AnimatedBackground />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(3,3,4,0.75)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        height: 68, display: "flex", alignItems: "center", padding: "0 24px"
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 0, maxWidth: "100%", paddingLeft: 24, paddingRight: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#EA580C,#F7931A)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, letterSpacing: "0.05em", boxShadow: "0 0 16px -4px rgba(247,147,26,0.5)", flexShrink: 0 }}>
              {data.avatar}
            </div>
            <span style={{ fontFamily: "JetBrains Mono", fontSize: 14, fontWeight: 500, letterSpacing: "0.03em" }}>{data.name}</span>
          </div>
          <div className="nav-links">
            <span className="live-dot">
              <span style={{ position: "relative", width: 7, height: 7, display: "inline-block", flexShrink: 0 }}>
                <span className="ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4ade80" }} />
                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4ade80" }} />
              </span>
              <span>Live</span>
            </span>
            <button className="nav-link" onClick={() => scrollTo("games")}>Games</button>
            <button className="nav-link" onClick={() => scrollTo("tools")}>Tools</button>
            <button className="nav-link" onClick={() => scrollTo("about")}>About</button>
            <button className="nav-link" onClick={() => scrollTo("contact")}>Contact</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-pad" style={{ position: "relative", paddingTop: 140, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, overflow: "hidden" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", maskImage: "radial-gradient(ellipse at 40% 50%, black 20%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse at 40% 50%, black 20%, transparent 75%)" }} />
        <div style={{ position: "absolute", top: "10%", right: "12%", width: 480, height: 480, background: "#F7931A", opacity: 0.055, borderRadius: "50%", filter: "blur(130px)", pointerEvents: "none" }} />

        <div className="container hero-grid" style={{ position: "relative", zIndex: 1 }}>
          {loading ? (
            <SkeletonHero />
          ) : (
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(247,147,26,0.07)", border: "1px solid rgba(247,147,26,0.22)", borderRadius: 9999, padding: "6px 16px", marginBottom: 32 }}>
                <div style={{ position: "relative", width: 8, height: 8, flexShrink: 0 }}>
                  <div className="ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4ade80" }} />
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#4ade80" }} />
                </div>
                <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, letterSpacing: "0.14em", color: "#94A3B8", textTransform: "uppercase" }}>Available for Collaboration</span>
              </div>
              <h1 style={{ fontSize: "clamp(36px,5.5vw,72px)", fontWeight: 700, lineHeight: 1.07, marginBottom: 22 }}>
                {data.name}<br />
                <span className="grad-text">{data.title}</span>
              </h1>
              <p style={{ color: "#94A3B8", fontSize: 17, lineHeight: 1.75, maxWidth: 500, marginBottom: 40 }}>
                {data.yearsActive} years shipping games that players remember.
              </p>
              <div className="hero-buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => scrollTo("games")}>View Games <span style={{ fontSize: 16 }}>↓</span></button>
                <button className="btn-outline" onClick={() => scrollTo("about")}>About Me</button>
              </div>
            </div>
          )}

          {/* Orb */}
          <div className="float orb-wrap">
            <div className="spin-slow" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(247,147,26,0.22)" }} />
            <div className="spin-slow-r" style={{ position: "absolute", inset: "22px", borderRadius: "50%", border: "1px dashed rgba(247,147,26,0.12)" }} />
            <div style={{ width: "66%", height: "66%", borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #EA580C 0%, #0F0808 70%)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6, boxShadow: "0 0 70px -10px rgba(247,147,26,0.45), inset 0 0 30px rgba(0,0,0,0.5)" }}>
              <span style={{ fontSize: "clamp(28px,4vw,46px)" }}>🎮</span>
              {loading ? (
                <div className="skeleton" style={{ height: 11, width: 60 }} />
              ) : (
                <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "#FFD600", letterSpacing: "0.12em", textTransform: "uppercase" }}>{data.gamesPublished} Games</span>
              )}
            </div>
            <div className="glass float-delay" style={{ position: "absolute", top: 8, right: -28, padding: "9px 15px", minWidth: 80 }}>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>players</div>
              {loading ? <div className="skeleton" style={{ height: 17, width: 40 }} /> : <div style={{ fontFamily: "JetBrains Mono", fontSize: 17, color: "#FFD600", fontWeight: 500 }}>{data.totalPlayers}</div>}
            </div>
            <div className="glass float" style={{ position: "absolute", bottom: 18, left: -32, padding: "9px 15px", minWidth: 70, animationDelay: "0.7s" }}>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>years</div>
              {loading ? <div className="skeleton" style={{ height: 17, width: 30 }} /> : <div style={{ fontFamily: "JetBrains Mono", fontSize: 17, color: "#F7931A", fontWeight: 500 }}>{data.yearsActive}+</div>}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="container" style={{ marginTop: 72 }}>
          {loading ? (
            <SkeletonStatsBar />
          ) : (
            <div className="stats-grid" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {[
                ["Games Published", data.gamesPublished],
                ["Years Active", `${data.yearsActive}+`],
                ["Community Reach", data.totalPlayers],
              ].map(([label, val], i) => (
                <div key={i} className="stat-item" style={{ padding: "28px 32px", textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div className="grad-text" style={{ fontFamily: "JetBrains Mono", fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, marginBottom: 6 }}>{val}</div>
                  <div style={{ color: "#94A3B8", fontSize: 13 }}>{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── GAMES ── */}
      <section id="games" className="section-pad" style={{ padding: "88px 24px", background: "rgba(10,12,16,0.78)" }}>
        <div className="container">
          <span className="section-label">// Published Games</span>
          <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 700, marginBottom: 52 }}>
            Shipped &amp; <span className="grad-text">Battle-Tested</span>
          </h2>
          <div className="games-grid">
            {loading
              ? [1, 2, 3, 4].map(i => <SkeletonCard key={i} />)
              : games.map(g => (
                <div key={g.id} className="card game-card fade-in" onClick={() => setDetailGame(g)}>
                  <div className="game-card-cover">
                    {g.cover_image ? (
                      <img src={g.cover_image} alt={g.title} loading="lazy" />
                    ) : (
                      <span className="cover-emoji">{g.cover}</span>
                    )}
                    {g.video_url && <span className="video-pill">▶</span>}
                  </div>
                  <div className="game-card-body">
                    <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8, lineHeight: 1.25 }}>{g.title}</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                      <span className="badge badge-o">{g.genre}</span>
                      <span className="badge badge-g">{g.year}</span>
                      <span className={`badge ${g.status === "Released" ? "badge-gr" : g.status === "In Development" ? "badge-o" : "badge-mu"}`}>{g.status}</span>
                    </div>
                    <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.65, marginBottom: 16, flex: 1 }}>{g.description}</p>
                    <span className="devlog-trigger">VIEW DETAILS →</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section id="tools" className="section-pad" style={{ padding: "88px 24px" }}>
        <div className="container">
          <span className="section-label">// Tech Stack</span>
          <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 700, marginBottom: 16 }}>
            Tools I <span className="grad-text">Build With</span>
          </h2>
          <p style={{ color: "#94A3B8", fontSize: 16, marginBottom: 52, maxWidth: 480, lineHeight: 1.65 }}>The instruments of creation — each chosen for a reason.</p>
          <div className="tools-grid">
            {loading
              ? [1, 2, 3, 4, 5, 6].map(i => <SkeletonToolCard key={i} />)
              : tools.map(t => (
                <a key={t.id} href={t.link || "#"} target="_blank" rel="noreferrer" style={{ textDecoration: "none", display: "block" }}>
                  <div className="card fade-in" style={{ padding: 24, display: "flex", alignItems: "flex-start", gap: 16, height: "100%" }}>
                    <div style={{ width: 50, height: 50, borderRadius: 12, background: "rgba(234,88,12,0.1)", border: "1px solid rgba(234,88,12,0.28)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{t.logo}</div>
                    <div>
                      <h4 style={{ fontWeight: 600, fontSize: 16, marginBottom: 6, color: "#fff" }}>{t.name}</h4>
                      <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.6 }}>{t.description}</p>
                      {t.link && <p style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "#F7931A", marginTop: 10, letterSpacing: "0.05em" }}>↗ {t.link.replace("https://", "")}</p>}
                    </div>
                  </div>
                </a>
              ))
            }
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad" style={{ padding: "88px 24px", background: "rgba(10,12,16,0.78)" }}>
        <div className="container about-grid">
          <div>
            <span className="section-label">// Developer DNA</span>
            <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 700, marginBottom: 24 }}>
              What <span className="grad-text">Drives Me</span>
            </h2>
            {loading ? (
              <div>
                <div className="skeleton" style={{ height: 16, width: "100%", marginBottom: 10 }} />
                <div className="skeleton" style={{ height: 16, width: "100%", marginBottom: 10 }} />
                <div className="skeleton" style={{ height: 16, width: "70%" }} />
              </div>
            ) : (
              <p style={{ color: "#CBD5E1", fontSize: 16, lineHeight: 1.9 }}>{data.aim}</p>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { icon: "⚡", title: "Performance First", body: "Every millisecond matters. Clean code, fast builds, smooth 60fps gameplay." },
              { icon: "🧩", title: "Systems Thinking", body: "Games are systems. I design each mechanic to create emergent, interesting interactions." },
              { icon: "🔬", title: "Iterate Ruthlessly", body: "Ship, gather feedback, cut what doesn't work. The best games are forged in revision." },
            ].map((item, i) => (
              <div key={i} className="glass" style={{ padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 46, height: 46, borderRadius: 11, background: "rgba(247,147,26,0.09)", border: "1px solid rgba(247,147,26,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: 15, marginBottom: 5 }}>{item.title}</h4>
                  <p style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.65 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ padding: "88px 24px" }}>
        <div className="container">
          <span className="section-label">// Get In Touch</span>
          <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 700, marginBottom: 16 }}>
            Let's <span className="grad-text">Connect</span>
          </h2>
          <p style={{ color: "#94A3B8", fontSize: 16, marginBottom: 44, maxWidth: 480, lineHeight: 1.65 }}>
            Find me across the web — happy to talk games, tools, or collaboration.
          </p>
          {loading ? (
            <div className="social-grid">
              {[1, 2, 3, 4, 5].map(i => <SkeletonSocialCard key={i} />)}
            </div>
          ) : socialLinks.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono", fontSize: 13 }}>// no links added yet</p>
          ) : (
            <div className="social-grid">
              {socialLinks.map(s => (
                <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="card social-card fade-in">
                  <span className="icon-wrap">
                    <SocialIcon platform={s.platform} emoji={s.icon} size={20} />
                  </span>
                  <span className="label">{s.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "36px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>
          © {new Date().getFullYear()} {data.name} · <span style={{ color: "rgba(247,147,26,0.4)" }}>game developer portfolio</span>
        </p>
      </footer>

      <GameDetailModal
        open={!!detailGame}
        onClose={() => setDetailGame(null)}
        game={detailGame}
      />
    </div>
  );
}
