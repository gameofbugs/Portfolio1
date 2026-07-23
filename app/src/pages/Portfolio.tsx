// @ts-nocheck
import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import AnimatedBackground from "../components/AnimatedBackground";
import GameDetailModal from "../components/GameDetailModal";
import OrangeLoader from "../components/OrangeLoader";
import Typewriter from "../components/Typewriter";
import FlipCard from "../components/FlipCard";
import GlassStackCards from "../components/GlassStackCards";
import ResumeButton from "../components/ResumeButton";
import SocialCircleMenu from "../components/SocialCircleMenu";
import BottomNav from "../components/BottomNav";
import ScrollToTop from "../components/ScrollToTop";

const DEFAULT_DATA = {
  name: "Alex Mercer",
  title: "Indie Game Developer",
  avatar: "AM",
  aim: "To craft immersive, story-driven games that blur the line between reality and digital worlds — one pixel at a time.",
  gamesPublished: 4,
  yearsActive: 6,
  totalPlayers: "120K+",
  availability: "Available",
  resumeUrl: "",
};

const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='28' viewBox='0 0 24 28'%3E%3Cpath fill='%23F7931A' d='M2 2 L20 14 L12 16 L14 24 L10 24 L8 16 L2 2 Z'/%3E%3C/svg%3E"), auto; }
  body { background: #030304; color: #fff; font-family: 'Space Grotesk', sans-serif; overflow-x: hidden; }
  a, button, input, textarea, select { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='28' viewBox='0 0 24 28'%3E%3Cpath fill='%23FFD600' d='M2 2 L20 14 L12 16 L14 24 L10 24 L8 16 L2 2 Z'/%3E%3C/svg%3E"), pointer; }
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
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes scrollLoop {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes blink { 50% { opacity: 0; } }

  .ambient-bg { position: fixed; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; background: #030304; }
  .ambient-orb { position: absolute; border-radius: 50%; filter: blur(110px); will-change: transform; }
  .ambient-orb-1 { animation: orbDrift1 26s ease-in-out infinite; }
  .ambient-orb-2 { animation: orbDrift2 32s ease-in-out infinite; }
  .ambient-orb-3 { animation: orbDrift3 22s ease-in-out infinite; }
  .ambient-particle { position: absolute; bottom: -20px; border-radius: 50%; animation-name: particleRise; animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform, opacity; }

  @media (prefers-reduced-motion: reduce) {
    .ambient-orb, .ambient-particle, .float, .float-delay, .spin-slow, .spin-slow-r, .ping, .fade-in, .skeleton, .slide-up { animation: none !important; }
    html { scroll-behavior: auto; }
  }

  .float { animation: float 6s ease-in-out infinite; }
  .float-delay { animation: float 5s ease-in-out 1.2s infinite; }
  .spin-slow { animation: spin 12s linear infinite; }
  .spin-slow-r { animation: spinR 18s linear infinite; }
  .ping { animation: ping 1.6s cubic-bezier(0,0,0.2,1) infinite; }
  .fade-in { animation: fadeIn 0.5s ease both; }
  .slide-up { animation: slideUp 0.6s ease both; }

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

  .game-card { padding: 0; cursor: pointer; overflow: hidden; display: flex; flex-direction: column; }
  .game-card-cover { width: 100%; aspect-ratio: 4 / 3; background: linear-gradient(135deg, rgba(247,147,26,0.14), rgba(10,12,16,0.6)); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; flex-shrink: 0; }
  .game-card-cover img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
  .game-card:hover .game-card-cover img { transform: scale(1.06); }
  .game-card-cover .cover-emoji { font-size: 46px; }
  .game-card-cover .video-pill { position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.18); color: #F7931A; font-size: 12px; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
  .game-card-body { padding: 22px 22px 24px; display: flex; flex-direction: column; flex: 1; }

    [id] { scroll-margin-top: 104px; }

  .skeleton { background: linear-gradient(90deg, #0F1115 25%, #1a1d24 50%, #0F1115 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 8px; }
  .live-dot { display: inline-flex; align-items: center; gap: 6px; font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #4ade80; letter-spacing: 0.1em; text-transform: uppercase; }

  .container { width: 100%; max-width: 1320px; margin: 0 auto; padding: 0 48px; }
  .hero-grid { display: grid; grid-template-columns: 420px 1fr 300px; gap: 48px; align-items: center; }
  .orb-wrap { width: 280px; height: 280px; position: relative; display: flex; align-items: center; justify-content: center; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
  .stats-grid { display: grid; grid-template-columns: repeat(3,1fr); }
  .games-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px,1fr)); gap: 24px; align-items: start; }
  .tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px,1fr)); gap: 20px; }
  .social-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap: 18px; }
  .nav-links { display: flex; align-items: center; gap: 32px; }

  .section-pad { scroll-margin-top: 84px; }

  .terminal-card {
    background: #0A0C10; border: 1px solid rgba(247,147,26,0.2);
    border-radius: 12px; padding: 24px; font-family: 'JetBrains Mono', monospace;
    position: relative; overflow: hidden;
  }
  .terminal-card::before {
    content: ""; position: absolute; top: 0; left: 0; right: 0;
    height: 28px; background: rgba(247,147,26,0.08);
    border-bottom: 1px solid rgba(247,147,26,0.15);
    border-radius: 12px 12px 0 0;
  }
  .terminal-dots {
    position: absolute; top: 8px; left: 12px; display: flex; gap: 6px;
  }
  .terminal-dots span {
    width: 10px; height: 10px; border-radius: 50%;
  }

  .horiz-scroll { display: flex; gap: 24px; overflow-x: auto; padding: 8px 0 16px; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; }
  .horiz-scroll > * { scroll-snap-align: start; flex-shrink: 0; }

  .skill-chip { display: flex; align-items: center; gap: 10px; padding: 12px 20px; background: rgba(15,17,21,0.8); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; transition: border-color 0.3s, transform 0.3s; touch-action: manipulation; }
  .skill-chip:hover { border-color: rgba(247,147,26,0.3); transform: translateY(-2px); }
  .skill-chip .skill-logo { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }

  .review-card { padding: 28px; text-align: center; min-width: 280px; max-width: 340px; }
  .review-stars { display: flex; gap: 2px; justify-content: center; margin-bottom: 12px; }
  .review-stars span { color: #FFD600; font-size: 16px; }

  .contact-form { display: flex; flex-direction: column; gap: 16px; max-width: 480px; }
  .contact-form input, .contact-form textarea {
    width: 100%; background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.09);
    border-radius: 10px; color: #fff; font-family: 'Space Grotesk', sans-serif;
    font-size: 14px; padding: 12px 16px; outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .contact-form input:focus, .contact-form textarea:focus {
    border-color: rgba(247,147,26,0.45); box-shadow: 0 0 0 3px rgba(247,147,26,0.08);
  }
  .contact-form input::placeholder, .contact-form textarea::placeholder { color: rgba(255,255,255,0.2); }
  .contact-form textarea { resize: vertical; min-height: 100px; line-height: 1.6; }

  .modal-overlay { position: fixed; inset: 0; z-index: 200; background: rgba(3,3,4,0.85); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn 0.25s ease both; }
  .modal-content { background: #0F1115; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; max-width: 600px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 32px; position: relative; }

  @media (max-width: 1200px) {
    .hero-grid { grid-template-columns: 320px 1fr; gap: 32px; }
    .hero-grid .orb-wrap { display: none; }
  }

  @media (max-width: 900px) {
    .hero-grid { grid-template-columns: 1fr; text-align: center; }
    .hero-grid .universe-parent { margin: 0 auto; }
    .orb-wrap { width: 220px; height: 220px; justify-self: center; margin-top: 32px; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .stats-grid { grid-template-columns: repeat(3,1fr); }
  }

  @media (max-width: 640px) {
    .container { padding: 0 20px; }
    .nav-links { gap: 16px; }
    .nav-link { font-size: 10px; }
    .live-dot span:last-child { display: none; }
    .stats-grid { grid-template-columns: 1fr; }
    .stat-item { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .stat-item:last-child { border-bottom: none; }
    .games-grid { grid-template-columns: 1fr; }
    .tools-grid { grid-template-columns: 1fr; }
    .section-pad { padding: 60px 20px; }
    .hero-pad { padding-top: 110px; padding-bottom: 60px; padding-left: 20px; padding-right: 20px; }
    .orb-wrap { width: 180px; height: 180px; }
  }

  @media (max-width: 400px) {
    .social-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 640px) {
    .ambient-particle:nth-child(even) { display: none; }
    .ambient-orb { filter: blur(75px); }
  }
`;

const getEmbedPdfUrl = (url) => {
  if (!url) return url;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://docs.google.com/viewer?embedded=true&url=https://drive.google.com/uc?export=view&id=${match[1]}`;
  return url;
};

const getDownloadUrl = (url) => {
  if (!url) return url;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  return url;
};

export default function Portfolio() {
  const [data, setData] = useState(() => DEFAULT_DATA);
  const [games, setGames] = useState([]);
  const [tools, setTools] = useState([]);
  const [skills, setSkills] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [reviewsEnabled, setReviewsEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loaderDone, setLoaderDone] = useState(false);
  const [detailGame, setDetailGame] = useState(null);
  const [showResume, setShowResume] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactDone, setContactDone] = useState(false);
  const [contactErr, setContactErr] = useState("");

  const loadData = useCallback(async () => {
    try {
      const results = await Promise.allSettled([
        supabase.from("profile").select("*").eq("id", 1).single(),
        supabase.from("games").select("*").order("year", { ascending: false }),
        supabase.from("tools").select("*").order("id", { ascending: true }),
        supabase.from("social_links").select("*").order("sort_order", { ascending: true }),
        supabase.from("skills").select("*").order("sort_order", { ascending: true }),
        supabase.from("reviews").select("*").eq("enabled", true).order("sort_order", { ascending: true }),
        supabase.from("settings").select("reviews_enabled").eq("id", 1).single(),
      ]);

      const [profileRes, gamesRes, toolsRes, socialRes, skillsRes, reviewsRes, settingsRes] = results;

      if (profileRes.status === "fulfilled" && profileRes.value.data && !profileRes.value.error) {
        const p = profileRes.value.data;
        setData({
          name: p.name, title: p.title, avatar: p.avatar, aim: p.aim,
          gamesPublished: p.games_published, yearsActive: p.years_active,
          totalPlayers: p.total_players,
          availability: p.availability || "Available",
          resumeUrl: p.resume_url || "",
        });
      } else {
        console.warn("Profile load:", profileRes.status === "fulfilled" ? profileRes.value.error : profileRes.reason);
      }

      if (gamesRes.status === "fulfilled" && gamesRes.value.data) setGames(gamesRes.value.data);
      if (toolsRes.status === "fulfilled" && toolsRes.value.data) setTools(toolsRes.value.data);
      if (socialRes.status === "fulfilled" && socialRes.value.data) {
        setSocialLinks(socialRes.value.data.filter((s) => s.url && s.url.trim() !== ""));
      }
      if (skillsRes.status === "fulfilled" && skillsRes.value.data) setSkills(skillsRes.value.data);
      if (reviewsRes.status === "fulfilled" && reviewsRes.value.data) setReviews(reviewsRes.value.data);
      if (settingsRes.status === "fulfilled" && settingsRes.value.data) {
        setReviewsEnabled(settingsRes.value.data.reviews_enabled !== false);
      }
    } catch (err) {
      console.error("Portfolio data load error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    const channel = supabase
      .channel("portfolio-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "profile" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "games" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "tools" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "social_links" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "skills" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "reviews" }, () => loadData())
      .on("postgres_changes", { event: "*", schema: "public", table: "settings" }, () => loadData())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [loadData]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaderDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const sections = ["hero", "projects", "skills", "about", "contact"];
      let current = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const featured = games.filter((g) => g.featured).sort((a, b) => (a.featured_order || 0) - (b.featured_order || 0));
  const nonFeatured = games.filter((g) => !g.featured);

  const submitContact = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject?.value?.trim() || "";
    const message = form.message.value.trim();
    if (!name || !email || !message) { setContactErr("// all fields required"); return; }
    setContactSubmitting(true); setContactErr("");
    try {
      const { error } = await supabase.from("contact_messages").insert({ name, email, subject, message });
      if (error) throw error;
      try {
        await fetch("https://mcp.supabase.com/functions/v1/send-contact-notification", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }),
        });
      } catch (_) { /* email notification is optional */ }
      setContactDone(true);
      form.reset();
    } catch (err) {
      setContactErr("// failed to send — try again later");
    } finally {
      setContactSubmitting(false);
    }
  };

  if (!loaderDone || loading) {
    return (
      <>
        {!loaderDone && <OrangeLoader />}
        {loaderDone && loading && (
          <div style={{ position: "fixed", inset: 0, background: "#030304", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="spinner" style={{ width: 28, height: 28, border: "2px solid rgba(255,255,255,0.2)", borderTopColor: "#F7931A", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
          </div>
        )}
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
      </>
    );
  }

  const SkeletonCard = () => (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div className="skeleton" style={{ width: "100%", aspectRatio: "4/3" }} />
      <div style={{ padding: 22 }}>
        <div className="skeleton" style={{ height: 18, width: "70%", marginBottom: 10 }} />
        <div className="skeleton" style={{ height: 12, width: "90%", marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 12, width: "60%" }} />
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", color: "#fff" }}>
      <style>{CSS}</style>
      <AnimatedBackground />

      {/* ── DESKTOP NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(3,3,4,0.75)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        height: 88, display: "flex", alignItems: "center", padding: "0 24px"
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
            <button className="nav-link" onClick={() => scrollTo("hero")}>Home</button>
            <button className="nav-link" onClick={() => scrollTo("projects")}>Projects</button>
            <button className="nav-link" onClick={() => scrollTo("skills")}>Skills</button>
            <button className="nav-link" onClick={() => scrollTo("about")}>About</button>
            <button className="nav-link" onClick={() => scrollTo("contact")}>Contact</button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="hero-pad" style={{ paddingTop: 140, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, overflow: "hidden", minHeight: "100vh" }}>
        <div className="grid-bg" style={{ position: "absolute", inset: 0, pointerEvents: "none", maskImage: "radial-gradient(ellipse at 40% 50%, black 20%, transparent 75%)", WebkitMaskImage: "radial-gradient(ellipse at 40% 50%, black 20%, transparent 75%)" }} />
        <div style={{ position: "absolute", top: "10%", right: "12%", width: 480, height: 480, background: "#F7931A", opacity: 0.055, borderRadius: "50%", filter: "blur(130px)", pointerEvents: "none" }} />

        <div className="container hero-grid" style={{ position: "relative", zIndex: 1 }}>
          {/* Profile Flip Card */}
          <div className="fade-in" style={{ animationDelay: "0.3s" }}>
            <FlipCard
              front={
                <div style={{ textAlign: "center", padding: 20 }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: "linear-gradient(135deg,#EA580C,#F7931A)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, fontWeight: 700, margin: "0 auto 16px",
                    boxShadow: "0 0 32px -6px rgba(247,147,26,0.5)"
                  }}>
                    {data.avatar}
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{data.name}</h3>
                  <p style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "#F7931A", letterSpacing: "0.05em" }}>{data.title}</p>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12, flexWrap: "wrap" }}>
                    <span className="badge badge-gr">{data.availability}</span>
                    <span className="badge badge-o">{data.yearsActive}+ yrs</span>
                    <span className="badge badge-g">{data.gamesPublished} projects</span>
                  </div>
                </div>
              }
              back={
                <div style={{ textAlign: "center", padding: 20 }}>
                  <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{data.aim}</p>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <p style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>// flip back to see resume</p>
                    <button className="btn-primary" onClick={() => setShowResume(true)} style={{ fontSize: 12, padding: "8px 18px" }}>
                      Open Resume ↗
                    </button>
                  </div>
                </div>
              }
            />
          </div>

          {/* Typewriter + CTA */}
          <div>
            <Typewriter />
            <p style={{ color: "#94A3B8", fontSize: 17, lineHeight: 1.75, maxWidth: 500, marginBottom: 40, marginTop: 24 }}>
              {data.yearsActive} years shipping games that players remember.
            </p>
            <div className="hero-buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <ResumeButton onClick={() => setShowResume(true)} />
              <button className="btn-primary" onClick={() => scrollTo("projects")}>View Projects <span style={{ fontSize: 16 }}>↓</span></button>
            </div>
          </div>

          {/* Planet Orb */}
          <div className="float orb-wrap" style={{ justifySelf: "center" }}>
            <div className="spin-slow" style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(247,147,26,0.22)" }} />
            <div className="spin-slow-r" style={{ position: "absolute", inset: "22px", borderRadius: "50%", border: "1px dashed rgba(247,147,26,0.12)" }} />
            <div style={{ width: "66%", height: "66%", borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #EA580C 0%, #0F0808 70%)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6, boxShadow: "0 0 70px -10px rgba(247,147,26,0.45), inset 0 0 30px rgba(0,0,0,0.5)" }}>
              <span style={{ fontSize: "clamp(28px,4vw,46px)" }}>🎮</span>
              <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "#FFD600", letterSpacing: "0.12em", textTransform: "uppercase" }}>{data.gamesPublished} Games</span>
            </div>
            <div className="glass float-delay" style={{ position: "absolute", top: 8, right: -28, padding: "9px 15px", minWidth: 80 }}>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>players</div>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 17, color: "#FFD600", fontWeight: 500 }}>{data.totalPlayers}</div>
            </div>
            <div className="glass float" style={{ position: "absolute", bottom: 18, left: -32, padding: "9px 15px", minWidth: 70, animationDelay: "0.7s" }}>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>years</div>
              <div style={{ fontFamily: "JetBrains Mono", fontSize: 17, color: "#F7931A", fontWeight: 500 }}>{data.yearsActive}+</div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="container" style={{ marginTop: 72 }}>
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
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section id="projects" className="section-pad" style={{ padding: "88px 24px", background: "rgba(10,12,16,0.78)" }}>
        <div className="container">
          <span className="section-label">// Featured Work</span>
          <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 700, marginBottom: 16 }}>
            Featured <span className="grad-text">Projects</span>
          </h2>
          <p style={{ color: "#94A3B8", fontSize: 16, marginBottom: 36, maxWidth: 480, lineHeight: 1.65 }}>
            Hand-picked projects that showcase the best of my work.
          </p>
          {featured.length > 0 ? (
            <div className="horiz-scroll" style={{ scrollbarWidth: "thin", padding: "12px 0" }}>
              {featured.map((g) => (
                <div key={g.id} style={{ minWidth: 300, maxWidth: 340, cursor: "pointer" }} onClick={() => setDetailGame(g)}>
                  <FlipCard
                    front={
                      <div style={{ textAlign: "center", padding: 16 }}>
                        {g.cover_image ? (
                          <img src={g.cover_image} alt={g.title} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8, marginBottom: 12 }} />
                        ) : (
                          <span style={{ fontSize: 48, display: "block", marginBottom: 12 }}>{g.cover}</span>
                        )}
                        <h3 style={{ fontSize: 18, fontWeight: 700 }}>{g.title}</h3>
                        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 8, flexWrap: "wrap" }}>
                          <span className="badge badge-o">{g.genre}</span>
                          <span className="badge badge-g">{g.year}</span>
                          <span className={`badge ${g.status === "Released" ? "badge-gr" : "badge-o"}`}>{g.status}</span>
                        </div>
                      </div>
                    }
                    back={
                      <div style={{ textAlign: "center", padding: 16 }}>
                        <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{g.description}</p>
                        <div style={{ display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap" }}>
                          {g.platform && <span className="badge badge-gr" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>{g.platform}</span>}
                        </div>
                        <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "#FFD600", letterSpacing: "0.08em", display: "block", marginTop: 16 }}>
                          VIEW DETAILS →
                        </span>
                      </div>
                    }
                  />
                </div>
              ))}
            </div>
          ) : games.length > 0 ? (
            <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono", fontSize: 13 }}>// no featured projects selected yet</p>
          ) : null}
        </div>
      </section>

      {/* ── MY PROJECTS ── */}
      {nonFeatured.length > 0 && (
        <section className="section-pad" style={{ padding: "88px 24px" }}>
          <div className="container">
            <span className="section-label">// All Projects</span>
            <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 700, marginBottom: 52 }}>
              My <span className="grad-text">Projects</span>
            </h2>
            <div className="games-grid">
              {nonFeatured.map((g) => (
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
                    <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "#F7931A", letterSpacing: "0.08em" }}>VIEW DETAILS →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SKILLS ── */}
      <section id="skills" className="section-pad" style={{ padding: "88px 24px", background: "rgba(10,12,16,0.78)" }}>
        <div className="container">
          <span className="section-label">// Toolbox</span>
          <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 700, marginBottom: 16 }}>
            Skills &amp; <span className="grad-text">Technologies</span>
          </h2>
          <p style={{ color: "#94A3B8", fontSize: 16, marginBottom: 44, maxWidth: 480, lineHeight: 1.65 }}>
            The tools and technologies I use to build games.
          </p>
          {skills.length > 0 ? (
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <GlassStackCards
                items={skills.map(s => ({
                  icon: <span style={{ fontSize: 32 }}>{s.logo}</span>,
                  label: s.name,
                }))}
              />
            </div>
          ) : (
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <GlassStackCards
                items={tools.map(t => ({
                  icon: <span style={{ fontSize: 32 }}>{t.logo}</span>,
                  label: t.name,
                }))}
              />
            </div>
          )}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section-pad" style={{ padding: "88px 24px" }}>
        <div className="container about-grid">
          <div>
            <span className="section-label">// Developer DNA</span>
            <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 700, marginBottom: 24 }}>
              What <span className="grad-text">Drives Me</span>
            </h2>
            {/* Terminal-style story */}
            <div className="terminal-card slide-up">
              <div className="terminal-dots">
                <span style={{ background: "#f87171" }} />
                <span style={{ background: "#FBBF24" }} />
                <span style={{ background: "#4ade80" }} />
              </div>
              <div style={{ marginTop: 16, paddingTop: 8 }}>
                <p style={{ color: "#4ade80", fontSize: 13, marginBottom: 8 }}>$ <span style={{ color: "#F7931A" }}>cat</span> about_developer.txt</p>
                <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.9, fontFamily: "'JetBrains Mono', monospace" }}>
                  {data.aim}
                </p>
                <p style={{ color: "#94A3B8", fontSize: 12, marginTop: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                  <span style={{ color: "#4ade80" }}>$</span> <span style={{ color: "#F7931A" }}>echo</span> "Ready to build the next great game."<span style={{ animation: "blink 1s step-end infinite" }}>▌</span>
                </p>
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <ResumeButton onClick={() => setShowResume(true)} />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { icon: "⚡", title: "Performance First", body: "Every millisecond matters. Clean code, fast builds, smooth 60fps gameplay." },
              { icon: "🧩", title: "Systems Thinking", body: "Games are systems. I design each mechanic to create emergent, interesting interactions." },
              { icon: "🔬", title: "Always Learning", body: "Ship, gather feedback, cut what doesn't work. The best games are forged in revision." },
            ].map((item, i) => (
              <div key={i} className="glass slide-up" style={{ padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start", animationDelay: `${i * 0.1}s` }}>
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

      {/* ── REVIEWS ── */}
      {reviewsEnabled && reviews.length > 0 && (
        <section className="section-pad" style={{ padding: "88px 24px", background: "rgba(10,12,16,0.78)" }}>
          <div className="container" style={{ textAlign: "center" }}>
            <span className="section-label">// Wall of Love</span>
            <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 700, marginBottom: 44 }}>
              What People <span className="grad-text">Say</span>
            </h2>
            <div className="horiz-scroll" style={{ justifyContent: reviews.length <= 2 ? "center" : undefined, paddingBottom: 8 }}>
              {reviews.map((r) => (
                <div key={r.id} className="card review-card fade-in">
                  {r.image && (
                    <div style={{ width: 56, height: 56, borderRadius: "50%", overflow: "hidden", margin: "0 auto 12px", border: "2px solid rgba(247,147,26,0.2)" }}>
                      <img src={r.image} alt={r.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span key={s} style={{ opacity: s <= r.rating ? 1 : 0.2 }}>★</span>
                    ))}
                  </div>
                  <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.7, marginBottom: 16, fontStyle: "italic" }}>"{r.text}"</p>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>{r.name}</span>
                    {r.designation && (
                      <span style={{ display: "block", fontFamily: "JetBrains Mono", fontSize: 10, color: "#F7931A", marginTop: 3, letterSpacing: "0.05em" }}>{r.designation}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT ── */}
      <section id="contact" className="section-pad" style={{ padding: "88px 24px" }}>
        <div className="container">
          <span className="section-label">// Get In Touch</span>
          <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 700, marginBottom: 16 }}>
            Let's <span className="grad-text">Connect</span>
          </h2>
          <p style={{ color: "#94A3B8", fontSize: 16, marginBottom: 44, maxWidth: 480, lineHeight: 1.65 }}>
            Have a project in mind or just want to chat about game dev?
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            {/* Contact Form */}
            <div>
              <form className="contact-form" onSubmit={submitContact}>
                <input type="text" name="name" placeholder="Your Name" autoComplete="name" />
                <input type="email" name="email" placeholder="Your Email" autoComplete="email" />
                <input type="text" name="subject" placeholder="Subject" />
                <textarea name="message" placeholder="Your Message" />
                {contactErr && <p style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "#f87171" }}>{contactErr}</p>}
                {contactDone ? (
                  <p style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "#4ade80", letterSpacing: "0.05em" }}>✓ Message sent! I'll get back to you soon.</p>
                ) : (
                  <button className="btn-primary" type="submit" disabled={contactSubmitting} style={{ alignSelf: "flex-start" }}>
                    {contactSubmitting ? "Sending..." : "Send Message"}
                  </button>
                )}
              </form>
            </div>

            {/* Social Links */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
              <SocialCircleMenu links={socialLinks} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "36px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>
          © {new Date().getFullYear()} {data.name} · <span style={{ color: "rgba(247,147,26,0.4)" }}>game developer portfolio</span>
        </p>
      </footer>

      {/* ── RESUME PREVIEW MODAL ── */}
      {showResume && (
        <div className="modal-overlay" onClick={() => setShowResume(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowResume(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 22, cursor: "pointer", fontFamily: "Space Grotesk" }}>✕</button>
            <div style={{ textAlign: "center" }}>
              <span className="section-label" style={{ display: "block", marginBottom: 8 }}>// Resume</span>
              <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>{data.name} · <span className="grad-text">Resume</span></h3>
              {data.resumeUrl ? (
                <div>
                  <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 16, marginBottom: 20, border: "1px solid rgba(255,255,255,0.06)" }}>
                    <iframe src={getEmbedPdfUrl(data.resumeUrl)} title="Resume" style={{ width: "100%", height: 400, border: "none", borderRadius: 8 }} />
                  </div>
                  <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                    <a href={getDownloadUrl(data.resumeUrl)} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: "none" }}>
                      Download PDF ↓
                    </a>
                  </div>
                </div>
              ) : (
                <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "JetBrains Mono", fontSize: 13 }}>// resume not uploaded yet</p>
              )}
            </div>
          </div>
        </div>
      )}

      <GameDetailModal
        open={!!detailGame}
        onClose={() => setDetailGame(null)}
        game={detailGame}
      />

      <ScrollToTop />
      <BottomNav activeSection={activeSection} onNavigate={scrollTo} />
    </div>
  );
}
