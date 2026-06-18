// @ts-nocheck
import { useState, useEffect, useMemo } from "react";
import { getVideoEmbedUrl } from "../lib/videoEmbed";

export default function GameGalleryModal({ open, onClose, title, videoUrl, images = [], initialIndex = 0 }) {
  const slides = useMemo(() => {
    const list = [];
    if (videoUrl) list.push({ type: "video", url: videoUrl, embed: getVideoEmbedUrl(videoUrl) });
    images.forEach((url) => list.push({ type: "image", url }));
    return list;
  }, [videoUrl, images]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (open) setIndex(Math.min(Math.max(initialIndex, 0), Math.max(slides.length - 1, 0)));
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, slides.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, slides.length, onClose]);

  if (!open || slides.length === 0) return null;

  const slide = slides[index];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(3,3,4,0.92)", backdropFilter: "blur(6px)",
        zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 880, position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontFamily: "JetBrains Mono", fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em" }}>
            {title} · {index + 1} / {slides.length}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 16, cursor: "pointer" }}
          >
            ×
          </button>
        </div>

        <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "#0A0C10", border: "1px solid rgba(255,255,255,0.08)" }}>
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
              <div style={{ padding: "70px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 18 }}>▶</div>
                <a
                  href={slide.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                  style={{ textDecoration: "none" }}
                >
                  Watch Trailer ↗
                </a>
              </div>
            )
          ) : (
            <img src={slide.url} alt={title} style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", display: "block", margin: "0 auto" }} />
          )}

          {slides.length > 1 && (
            <>
              <button
                onClick={() => setIndex((i) => Math.max(i - 1, 0))}
                disabled={index === 0}
                aria-label="Previous"
                style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 18, cursor: index === 0 ? "default" : "pointer", opacity: index === 0 ? 0.3 : 1 }}
              >
                ‹
              </button>
              <button
                onClick={() => setIndex((i) => Math.min(i + 1, slides.length - 1))}
                disabled={index === slides.length - 1}
                aria-label="Next"
                style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.18)", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 18, cursor: index === slides.length - 1 ? "default" : "pointer", opacity: index === slides.length - 1 ? 0.3 : 1 }}
              >
                ›
              </button>
            </>
          )}
        </div>

        {slides.length > 1 && (
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{ width: 8, height: 8, borderRadius: "50%", border: "none", cursor: "pointer", background: i === index ? "#F7931A" : "rgba(255,255,255,0.2)" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
