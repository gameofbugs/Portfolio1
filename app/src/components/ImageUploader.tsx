// @ts-nocheck
import { useState, useRef } from "react";
import { supabase, GAME_IMAGES_BUCKET } from "../lib/supabaseClient";

// Reusable image-list editor: admin can either upload a file (stored in
// the public "game-images" Supabase Storage bucket) or paste an existing
// image URL. Both end up as plain URL strings in the `images` array, so
// the portfolio side doesn't need to know which path was used.
export default function ImageUploader({ gameId, images = [], onChange, onError }) {
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const addUrl = () => {
    const val = urlInput.trim();
    if (!val) return;
    onChange([...images, val]);
    setUrlInput("");
  };

  const handleFiles = async (files) => {
    if (!files || !files.length) return;
    setUploading(true);
    const uploaded = [];
    try {
      for (const file of Array.from(files)) {
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        const path = `games/${gameId || "new"}/${Date.now()}-${safeName}`;
        const { error: uploadErr } = await supabase.storage
          .from(GAME_IMAGES_BUCKET)
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (uploadErr) throw uploadErr;
        const { data: pub } = supabase.storage.from(GAME_IMAGES_BUCKET).getPublicUrl(path);
        uploaded.push(pub.publicUrl);
      }
      onChange([...images, ...uploaded]);
    } catch (e) {
      onError && onError(e.message || "Image upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeAt = (idx) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const move = (idx, dir) => {
    const next = [...images];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  return (
    <div>
      {images.length > 0 && (
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
          {images.map((url, idx) => (
            <div key={idx} style={{ position: "relative", width: 84, height: 84, borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)", flexShrink: 0 }}>
              <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button
                type="button"
                onClick={() => removeAt(idx)}
                title="Remove"
                style={{ position: "absolute", top: 3, right: 3, width: 20, height: 20, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.65)", color: "#f87171", fontSize: 12, cursor: "pointer", lineHeight: 1 }}
              >
                ×
              </button>
              <div style={{ position: "absolute", bottom: 3, left: 3, display: "flex", gap: 3 }}>
                <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0} style={{ width: 18, height: 18, fontSize: 10, borderRadius: 4, border: "none", background: "rgba(0,0,0,0.6)", color: "#fff", cursor: idx === 0 ? "default" : "pointer", opacity: idx === 0 ? 0.3 : 1 }}>←</button>
                <button type="button" onClick={() => move(idx, 1)} disabled={idx === images.length - 1} style={{ width: 18, height: 18, fontSize: 10, borderRadius: 4, border: "none", background: "rgba(0,0,0,0.6)", color: "#fff", cursor: idx === images.length - 1 ? "default" : "pointer", opacity: idx === images.length - 1 ? 0.3 : 1 }}>→</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          disabled={uploading}
          style={{ fontSize: 12, padding: "8px 16px" }}
        >
          {uploading ? <><span className="spinner" style={{ width: 11, height: 11 }} /> Uploading...</> : "⬆ Upload Image(s)"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => handleFiles(e.target.files)}
        />
        <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, color: "rgba(255,255,255,0.25)" }}>or</span>
        <input
          className="field-input"
          placeholder="Paste image URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
          style={{ flex: 1, minWidth: 180, padding: "8px 12px" }}
        />
        <button type="button" className="btn-ghost" onClick={addUrl} style={{ fontSize: 12, padding: "8px 16px" }}>
          + Add URL
        </button>
      </div>
    </div>
  );
}
