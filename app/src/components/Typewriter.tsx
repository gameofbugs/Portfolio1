import { useState, useEffect } from "react";

const WORDS = [
  "Unity Gameplay Programmer",
  "Indie Game Developer",
  "Problem Solver",
  "Game Of Bugs",
  "Building Interactive Experiences",
];

export default function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((p) => p + 1), 80);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((p) => p - 1), 40);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((p) => (p + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "clamp(14px, 2vw, 20px)",
        color: "#F7931A",
        letterSpacing: "0.04em",
      }}>
        {WORDS[wordIndex].slice(0, charIndex)}
      </span>
      <span style={{
        display: "inline-block", width: 2, height: "1em",
        background: "#F7931A", marginLeft: 2,
        animation: "blink 0.8s step-end infinite",
      }} />
      <style>{`
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </span>
  );
}
