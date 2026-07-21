// @ts-nocheck
import { useState, useRef } from "react";
import { supabase, GAME_IMAGES_BUCKET } from "../lib/supabaseClient";

// Single-image variant of ImageUploader, used for a game's primary cover
// art (the thumbnail shown in the card grid) — as opposed to the
// multi-image gallery used for in-game screenshots.
export default function SingleImageField({ gameId, value, onChange, onError }) {
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const path = `covers/${gameId || "new"}/${Date.now()}-${safeName}`;
      const { error: uploadErr } = await supabase.storage
        .from(GAME_IMAGES_BUCKET)
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (uploadErr) throw uploadErr;
      const { data: pub } = supabase.storage.from(GAME_IMAGES_BUCKET).getPublicUrl(path);
      onChange(pub.publicUrl);
    } catch (e) {
      onError && onError(e.message || "Cover upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flexWrap: "wrap" }}>
      <div style={{ width: 90, height: 90, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(0,0,0,0.3)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {value ? (
          <img src={value} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono" }}>no cover</span>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 200, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            disabled={uploading}
            style={{ fontSize: 12, padding: "8px 16px" }}
          >
            {uploading ? <><span className="spinner" style={{ width: 11, height: 11 }} /> Uploading\u2026</> : "⬆ Upload Cover"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files && e.target.files[0])}
          />
          {value && (
            <button type="button" className="btn-danger" onClick={() => onChange("")}>Remove</button>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="field-input"
            placeholder="...or paste image URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); if (urlInput.trim()) { onChange(urlInput.trim()); setUrlInput(""); } } }}
            style={{ flex: 1, padding: "8px 12px" }}
          />
          <button type="button" className="btn-ghost" style={{ fontSize: 12, padding: "8px 16px" }} onClick={() => { if (urlInput.trim()) { onChange(urlInput.trim()); setUrlInput(""); } }}>Use URL</button>
        </div>
      </div>
    </div>
  );
}
