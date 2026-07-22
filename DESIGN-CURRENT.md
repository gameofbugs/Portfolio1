# Portfolio Website — Current Design Document

**Stack:** Vite + React 18 + TypeScript, Supabase (Postgres + Auth + Storage + Realtime), deployed on Vercel.
**Structure:** Single app, two routes — public portfolio (`/`) and admin panel (`/admin`), sharing one Supabase backend.

---

## 1. Visual Identity

**Theme:** Dark, "Bitcoin/DeFi" aesthetic — near-black background, orange/gold gradients, glowing accents, monospace tech labels. Reads like a crypto dashboard crossed with a game-dev devlog.

### Color Palette

| Token | Hex / Value | Usage |
|---|---|---|
| Background | `#030304` | Page background, near-black |
| Surface | `#0F1115` | Cards, panels |
| Surface (translucent) | `rgba(10,12,16,0.78)` | Alternating section backgrounds |
| Primary orange | `#F7931A` | Accent, gradient text, borders, icons |
| Deep orange | `#EA580C` | Gradient starts, button/avatar gradients |
| Gold | `#FFD600` | Secondary gradient stop, stat highlights |
| Success green | `#4ade80` | "Live" indicator, "Released" badge |
| Muted slate | `#94A3B8` | Body/secondary text |
| Light body | `#CBD5E1` | About-section paragraph text |
| Muted badge grey | `#94A3B8` on `rgba(148,163,184,0.1)` | Neutral/planned status badge |
| White | `#ffffff` | Headings, primary text |
| Borders | `rgba(255,255,255,0.05–0.18)` | Hairline dividers, card borders |

**Signature gradient:** `linear-gradient(to right, #F7931A, #FFD600)` — used for `.grad-text` (gradient-clipped headline text) and stat numbers.
**Button gradient:** `linear-gradient(to right, #EA580C, #F7931A)` with an orange glow shadow (`box-shadow: 0 0 22px rgba(234,88,12,0.5)`).

### Typography

- **Display / body font:** `Space Grotesk` (400/500/600/700) — headings, buttons, nav name.
- **Mono / label font:** `JetBrains Mono` (400/500) — section labels (`// Published Games`), badges, stat values, nav links, footer, "Live" indicator. Always uppercase, wide letter-spacing (`0.07em`–`0.2em`).
- Both loaded via Google Fonts with `<link rel="preconnect">` hints in `<head>` for faster load.
- Headline sizing uses `clamp()` for fluid responsiveness, e.g. hero `clamp(36px, 5.5vw, 72px)`, section headers `clamp(26px, 4vw, 46px)`.
- `text-wrap: balance` applied to all headings (`h1`–`h4`) to prevent widows.

### Signature Visual Motifs

- **Gradient text** (`.grad-text`): orange→gold clipped-background text used on every section headline's emphasized word.
- **Section labels**: small mono `// Comment-style` eyebrow text above each heading (`// Tech Stack`, `// Developer DNA`, `// Get In Touch`), reinforcing the "code editor" feel.
- **Ambient background**: fixed, full-viewport layer sitting behind all content (`z-index: -1`):
  - 3 large blurred color orbs (460–520px, `blur(110px)`) slowly drifting via independent 22–32s keyframe animations.
  - 32 small ember-like particles (2–6px, orange/gold) rising from the bottom of the viewport with slight horizontal sway, looping every 14–32s, randomized per-particle via `useMemo`.
  - Disabled/reduced on mobile (`blur(75px)`, half the particles hidden) for performance.
  - **Reduced motion:** Both CSS `@media (prefers-reduced-motion: reduce)` and JS-side detection disable all animations when the user requests it.
- **Grid overlay** in the hero: a faint graph-paper grid (`50px` cells) masked by a radial gradient so it fades toward the edges.
- **"Live" indicator**: green dot with a `ping` (expanding-ring) animation next to the word "Live" in the nav — signals the site is realtime-connected to the database.
- **Orbit graphic** in the hero: a circular badge (game controller emoji + "N Games") ringed by two concentric circles spinning in opposite directions (`spin-slow` / `spin-slow-r`), with two floating glass chips ("players" count, "years" count) orbiting around it and gently bobbing (`float` keyframe).
- **Glassmorphism** (`.glass`): `rgba(255,255,255,0.03)` background + `blur(12px)` backdrop filter + hairline border — used for floating stat chips and the "Developer DNA" trait cards.
- **Card hover state** (`.card:hover`): lifts 3px, border brightens to orange, adds a soft orange glow shadow — applied uniformly to game cards, tool cards, and social cards.
- **Skeleton loading**: every section has a matching skeleton component (shimmer gradient sweeping left-to-right) shown while Supabase data loads, so there's no layout jump/flash of empty content.
- **`touch-action: manipulation`** on all interactive elements to prevent 300ms tap delay on mobile.

### Buttons & Badges

- `.btn-primary`: pill-shaped, orange gradient fill, uppercase mono-weight label, glow shadow, scales up 1.05x on hover. Only `transform` and `box-shadow` transition (no `transition: all`).
- `.btn-outline`: pill-shaped, transparent, subtle white border, brightens on hover. Only `border-color` and `background` transition.
- `.badge`: small pill, mono font, uppercase — 4 color variants:
  - `badge-o` (orange) — genre tag
  - `badge-g` (gold) — year tag
  - `badge-gr` (green) — "Released" status
  - `badge-mu` (muted grey) — "Planned"/other status

### Focus States

- `.nav-link:focus-visible` has a 2px orange outline with offset for keyboard navigation.
- `.field-input:focus` has an orange border glow (`box-shadow: 0 0 0 3px rgba(247,147,26,0.08)`).

---

## 2. Page Structure (Public Portfolio, `/`)

Single-page scrolling site with a fixed translucent nav; sections are anchor-linked and smooth-scrolled.

1. **Nav bar** (fixed, blurred glass strip)
   - Circular avatar badge (initials, orange gradient) + name
   - "● Live" status indicator
   - Anchor links: Games / Tools / About / Contact

2. **Hero**
   - Eyebrow pill: "Available for Collaboration" (with pulsing green dot)
   - Name + gradient-highlighted title (`Indie Game Developer`)
   - One-line tagline ("N years shipping games that players remember")
   - CTA buttons: "View Games ↓" (primary) / "About Me" (outline)
   - Right side: orbiting badge graphic showing games-published count, floating chips for total players and years active
   - Below the fold: 3-column stat bar (Games Published / Years Active / Community Reach), each value in gradient mono type

3. **Games** (`#games`) — "Shipped & Battle-Tested"
   - Responsive card grid (auto-fill, min 270px)
   - Each card: cover image (or emoji fallback) with a ▶ pill if a trailer exists, title, genre/year/status badges, short description, "VIEW DETAILS →" link
   - Click opens **Game Detail Modal**: full-screen dark overlay (`overscroll-behavior: contain`), image/video carousel (arrow-key navigable), detailed description, dev challenges/postmortem text
   - Modal has `role="dialog"`, `aria-modal="true"`, and body scroll/touch locked while open
   - Images have explicit `width`/`height` to prevent CLS

4. **Tools** (`#tools`) — "Tools I Build With"
   - Grid of tech-stack cards: logo/emoji chip, tool name, description, and clickable link (e.g. Unity, Godot, Blender, FMOD, Figma, GitHub)

5. **About** (`#about`) — "What Drives Me"
   - Left: mission statement paragraph (editable "aim" field)
   - Right: 3 glass trait cards — Performance First / Systems Thinking / Iterate Ruthlessly

6. **Contact** (`#contact`) — "Let's Connect"
   - Grid of social cards (icon + label) pulling from a dynamic social-links list; hidden entirely if a link's URL is blank
   - Real brand SVG icons for LinkedIn/Instagram/YouTube/GitHub; emoji fallback for itch.io or custom platforms

7. **Footer**
   - Copyright line + "game developer portfolio" tag in muted orange

All section transitions alternate background tint (`#030304` ↔ `rgba(10,12,16,0.78)`) to visually separate sections without hard borders. Each section has `scroll-margin-top: 84px` to account for the fixed nav.

---

## 3. Admin Panel (`/admin`)

- **Auth-gated**: Supabase Auth session required; `LoginScreen` shown if unauthenticated.
- **Login form** uses `signInWithPassword()` with descriptive error messages distinguishing between invalid credentials, unconfirmed email, and connection errors.
- Inputs have `autoComplete` attributes (`email`, `current-password`) for browser autofill.
- **Tabbed interface** (`AdminPanel.tsx`) with 4 tabs, each editing one data domain:
  - **Profile tab** — name, title, avatar initials, mission statement, games/years/players stats
  - **Games tab** — full CRUD on games: title, genre, year, platform, status, cover image, screenshot gallery, trailer URL, description, dev-challenges writeup
  - **Tools tab** — CRUD on tech-stack entries
  - **Social tab** — CRUD on contact/social links (platform, label, URL, icon, sort order)
- Reuses the same dark visual language as the public site (cards, glass panels, orange accents).
- Image uploads go through `ImageUploader` / `SingleImageField` components to a public Supabase Storage bucket (`game-images`).
- Toast notifications have `role="status"` and `aria-live="polite"` for screen reader announcements.

---

## 4. Data Model (Supabase / Postgres)

| Table | Purpose | Key columns |
|---|---|---|
| `profile` | Single-row (id=1) site content | `name`, `title`, `avatar`, `aim`, `games_published`, `years_active`, `total_players` |
| `games` | One row per shipped/in-progress game | `title`, `genre`, `year`, `platform`, `status`, `cover` (emoji fallback), `cover_image`, `description`, `detailed_description`, `challenges`, `video_url`, `images[]` |
| `tools` | Tech stack entries | `name`, `logo`, `link`, `description` |
| `social_links` | Contact section entries | `platform`, `label`, `url`, `icon`, `sort_order` |
| `admin_users` | Legacy plain-text login (deprecated) | superseded by Supabase Auth — locked to zero access |

**Security model:** Row Level Security is enabled on every table. Public (`anon`) role gets **read-only** access; all writes require an `authenticated` Supabase Auth session. The storage bucket `game-images` allows public reads but requires authentication for uploads/updates/deletes.

**Realtime:** `profile`, `games`, `tools`, and `social_links` all have Postgres changefeeds enabled — the public portfolio subscribes and re-fetches automatically whenever the admin edits data, so changes go live with no redeploy.

---

## 5. Responsive Behavior

- Breakpoints at `900px`, `640px`, and `400px`.
- Hero grid collapses from two columns (content + orbit graphic) to stacked/centered below 900px.
- Stat bar goes from 3 columns → stacked with bottom borders instead of side borders below 640px.
- Ambient particles are halved and blur radius reduced below 640px to protect performance on mobile.
- Nav link text shrinks and the "Live" label text is hidden (dot remains) on small screens.
- Social grid drops to a single column below 400px.

---

## 6. Motion & Micro-interactions

| Animation | Effect | Used on |
|---|---|---|
| `float` | Gentle up/down bob, 5–6s loop | Hero orbit graphic, floating glass chips |
| `spin` / `spinR` | Slow opposite-direction rotation, 12–18s | Concentric rings around hero orbit |
| `ping` | Expanding, fading ring | "Live" dot, availability pill |
| `orbDrift1/2/3` | Large slow positional drift, 22–32s | Background ambient orbs |
| `particleRise` | Rises + sways bottom-to-top over 14–32s, randomized per particle | Ember particles |
| `fadeIn` | Slide-up + fade-in on mount | Cards as data loads |
| `shimmer` | Left-to-right gradient sweep | Skeleton loaders |

**All animations respect `prefers-reduced-motion`** — both via CSS media query and JS-side detection on the ambient background. When reduced motion is active, all ambient, float, spin, ping, fadeIn, and shimmer animations are disabled.

**Transitions are scoped to specific properties** — no `transition: all` anywhere. Interactive elements only transition the properties that change (`transform`, `box-shadow`, `border-color`, `background`, `color`).

---

## 7. Accessibility Measures

- All icon-only buttons have `aria-label`.
- Social brand SVGs have `aria-hidden="true"`.
- Ambient background layer has `aria-hidden="true"`.
- Modals have `role="dialog"`, `aria-modal="true"`, and descriptive `aria-label`.
- Modal overlays use `overscroll-behavior: contain` and lock body scroll/touch.
- Toast notifications use `role="status" aria-live="polite"`.
- Form inputs have associated `<label>` elements.
- All headings follow a correct hierarchy (`h1` → `h2` → `h3`).
- Interactive elements have visible `:focus-visible` styles.
- Images have `alt` text (descriptive for content, `alt=""` for decorative).
- Game card covers use `loading="lazy"` for below-fold images.
- Typography uses `word-break: break-word` on long social labels.
- Login form includes `autoComplete` attributes for browser autofill compatibility.

---

## 8. Performance Considerations

- **Preconnect hints** in `<head>` for Google Fonts and Supabase CDN.
- **Explicit image dimensions** on modal images to prevent Cumulative Layout Shift.
- **`touch-action: manipulation`** on all interactive elements (eliminates 300ms tap delay).
- **`content-visibility`** candidates on sections for deferred off-screen rendering.
- **`color-scheme: dark`** on `<html>` fixes native scrollbar and form control styling in dark mode.
- **`<meta name="theme-color">`** matches the page background for browser chrome theming.
- **`viewport-fit=cover`** for proper display on notched devices.
- **Bundle:** Google Fonts loaded via `<link>` with `preconnect` (avoids render-blocking `@import`).
- **Skeleton loaders** prevent layout shift during data fetching.

---

## 9. Content Placeholders (default seed data)

The seed/demo data uses a fictional persona — "Alex Mercer," with 4 sample games (*Neon Abyss 2*, *Stellar Drift*, *Ironclad Siege*, *Voidwalker*) and 6 sample tools (Unity, Godot, Blender, FMOD, Figma, GitHub) — meant to be replaced via the admin panel with real project data.
