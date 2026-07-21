// @ts-nocheck
import { useState, useEffect, useMemo } from "react";
import { getVideoEmbedUrl } from "../lib/videoEmbed";

export default function GameDetailModal({ open, onClose, game }) {
  const slides = useMemo(() => {
    if (!game) return [];
    const list = [];
    if (game.video_url) list.push({ type: "video", url: game.video_url, embed: getVideoEmbedUrl(game.video_url) });
    if (game.cover_image) list.push({ type: "image", url: game.cover_image });
    (game.images || []).forEach((url) => list.push({ type: "image", url }));
    return list;
  }, [game]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (open) setIndex(0);
  }, [open, game?.id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, slides.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [open, slides.length, onClose]);

  if (!open || !game) return null;

  const slide = slides[index];

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={game.title}
      style={{
        position: "fixed", inset: 0, background: "rgba(3,3,4,0.92)", backdropFilter: "blur(6px)",
        zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
        overscrollBehavior: "contain",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card"
        style={{ width: "100%", maxWidth: 760, maxHeight: "92vh", overflowY: "auto", position: "relative", padding: 0 }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position: "absolute", top: 14, right: 14, width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)", background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 17, cursor: "pointer", zIndex: 5 }}
        >
          ×
        </button>

        {/* Media */}
        {slide && (
          <div style={{ position: "relative", background: "#0A0C10", borderRadius: "16px 16px 0 0", overflow: "hidden" }}>
            {slide.type === "video" ? (
              slide.embed ? (
                <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
                  <iframe
                    src={slide.embed}
                    title="Game trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                  />
                </div>
              ) : (
                <div style={{ padding: "60px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 14 }}>▶</div>
                  <a href={slide.url} target="_blank" rel="noreferrer" className="btn-primary" style={{ textDecoration: "none" }}>Watch Trailer ↗</a>
                </div>
              )
            ) : (
              <img src={slide.url} alt={game.title} width="760" height="428" style={{ width: "100%", maxHeight: "46vh", objectFit: "contain", display: "block", margin: "0 auto" }} />
            )}

            {slides.length > 1 && (
              <>
                <button
                  onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                  disabled={index === 0}
                  aria-label="Previous"
                  style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 16, cursor: index === 0 ? "default" : "pointer", opacity: index === 0 ? 0.3 : 1 }}
                >‹</button>
                <button
                  onClick={() => setIndex((i) => Math.min(i + 1, slides.length - 1))}
                  disabled={index === slides.length - 1}
                  aria-label="Next"
                  style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 16, cursor: index === slides.length - 1 ? "default" : "pointer", opacity: index === slides.length - 1 ? 0.3 : 1 }}
                >›</button>
                <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, display: "flex", gap: 6, justifyContent: "center" }}>
                  {slides.map((s, i) => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: i === index ? "#F7931A" : "rgba(255,255,255,0.35)" }} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Details */}
        <div style={{ padding: "28px 30px 34px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
            {!game.cover_image && (
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(247,147,26,0.09)", border: "1px solid rgba(247,147,26,0.24)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{game.cover}</div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{game.title}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                <span className="badge badge-o">{game.genre}</span>
                <span className="badge badge-g">{game.year}</span>
                <span className={`badge ${game.status === "Released" ? "badge-gr" : game.status === "In Development" ? "badge-o" : "badge-mu"}`}>{game.status}</span>
              </div>
            </div>
          </div>

          <p style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", marginBottom: 20 }}>{game.platform}</p>

          {game.description && (
            <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.75, marginBottom: 22 }}>{game.description}</p>
          )}

          {game.detailed_description && (
            <div style={{ marginBottom: 24 }}>
              <span className="section-label" style={{ display: "block", marginBottom: 10 }}>// About This Game</span>
              <p style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.85, whiteSpace: "pre-line" }}>{game.detailed_description}</p>
            </div>
          )}

          <div>
            <span className="section-label" style={{ display: "block", marginBottom: 10 }}>// Challenges &amp; Lessons Learned</span>
            <p style={{ color: "#CBD5E1", fontSize: 13, lineHeight: 1.85, whiteSpace: "pre-line" }}>{game.challenges || "No dev log written yet."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
