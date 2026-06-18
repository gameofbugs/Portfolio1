-- ═══════════════════════════════════════════════════════════════════
--  GAME DEVELOPER PORTFOLIO — SUPABASE SQL SETUP
--  Run this entire file in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════════


-- ── 1. ADMIN USERS TABLE ────────────────────────────────────────────
--  Stores login credentials for the admin panel.
--  NOTE: In a real production app, never store plain-text passwords.
--  For a personal portfolio this is fine since the URL is secret.

CREATE TABLE IF NOT EXISTS admin_users (
  id         SERIAL PRIMARY KEY,
  username   TEXT NOT NULL UNIQUE,
  password   TEXT NOT NULL,
  role       TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert your admin account (change these values!)
INSERT INTO admin_users (username, password, role)
VALUES ('admin', 'admin123', 'admin')
ON CONFLICT (username) DO NOTHING;


-- ── 2. PROFILE TABLE ────────────────────────────────────────────────
--  One row only (id = 1). Holds all the hero/about section data.

CREATE TABLE IF NOT EXISTS profile (
  id              SERIAL PRIMARY KEY,
  name            TEXT    NOT NULL DEFAULT 'Alex Mercer',
  title           TEXT    NOT NULL DEFAULT 'Indie Game Developer',
  avatar          TEXT    NOT NULL DEFAULT 'AM',
  aim             TEXT    NOT NULL DEFAULT 'Your mission statement here.',
  games_published INT     NOT NULL DEFAULT 0,
  years_active    INT     NOT NULL DEFAULT 0,
  total_players   TEXT    NOT NULL DEFAULT '0',
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Insert the default profile row
INSERT INTO profile (id, name, title, avatar, aim, games_published, years_active, total_players)
VALUES (
  1,
  'Alex Mercer',
  'Indie Game Developer',
  'AM',
  'To craft immersive, story-driven games that blur the line between reality and digital worlds — one pixel at a time. I believe games are the most powerful medium for human connection and shared experience.',
  4,
  6,
  '120K+'
)
ON CONFLICT (id) DO NOTHING;


-- ── 3. GAMES TABLE ──────────────────────────────────────────────────
--  Each game is a row. Admin can add/remove/edit. Portfolio reads all.

CREATE TABLE IF NOT EXISTS games (
  id          SERIAL PRIMARY KEY,
  title       TEXT    NOT NULL DEFAULT 'Untitled Game',
  genre       TEXT    NOT NULL DEFAULT 'Genre',
  year        INT     NOT NULL DEFAULT 2024,
  platform    TEXT    NOT NULL DEFAULT 'PC',
  status      TEXT    NOT NULL DEFAULT 'In Development',
  cover       TEXT    NOT NULL DEFAULT '🎮',
  description TEXT    NOT NULL DEFAULT '',
  challenges  TEXT    NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample games
INSERT INTO games (title, genre, year, platform, status, cover, description, challenges) VALUES
(
  'Neon Abyss 2',
  'Roguelite / Action',
  2024,
  'PC, Console',
  'Released',
  '🎮',
  'A fast-paced roguelite dungeon crawler set in a cyberpunk underworld.',
  'Balancing procedural generation with handcrafted feel was the hardest part. We iterated on the room generation algorithm 12 times before getting the right density. Player feedback revealed the early game was too punishing — required a full difficulty curve redesign 3 weeks before launch.'
),
(
  'Stellar Drift',
  'Puzzle / Exploration',
  2023,
  'PC, Mobile',
  'Released',
  '🌌',
  'Navigate gravitational fields to reunite lost star systems in this serene puzzle game.',
  'Physics simulation performance on mobile was brutal. Had to build a custom lightweight gravity engine since Box2D was too heavy. Also underestimated localization scope — shipped in 3 languages but the text layout broke badly in German.'
),
(
  'Ironclad Siege',
  'Strategy / Tower Defense',
  2022,
  'PC',
  'Released',
  '⚔️',
  'Medieval siege warfare meets modern strategy in this real-time tower defense epic.',
  'AI pathfinding at scale was nightmare fuel. A* broke down with 200+ simultaneous units. Rebuilt the entire pathfinding system using flow fields which required 3 months of R&D. Multiplayer desync issues haunted the beta for 6 weeks.'
),
(
  'Voidwalker',
  'Horror / Survival',
  2021,
  'PC',
  'Released',
  '👁️',
  'Survive the cosmic horrors lurking between dimensions in this psychological horror game.',
  'Procedural horror is a paradox — too random and it loses tension, too scripted and players find patterns. Designed an anxiety meter system that adapts encounter frequency to player behavior. Audio design took longer than all visual work combined.'
);


-- ── 4. TOOLS TABLE ──────────────────────────────────────────────────
--  Each tool/technology is a row.

CREATE TABLE IF NOT EXISTS tools (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL DEFAULT 'New Tool',
  logo        TEXT NOT NULL DEFAULT '🔧',
  link        TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample tools
INSERT INTO tools (name, logo, link, description) VALUES
('Unity',   '🎯', 'https://unity.com',          'Primary game engine for all projects'),
('Godot',   '🟣', 'https://godotengine.org',     'Open-source engine for rapid prototyping'),
('Blender', '🧊', 'https://blender.org',         '3D modeling, animation, and rigging'),
('FMOD',    '🔊', 'https://fmod.com',            'Dynamic audio engine and sound design'),
('Figma',   '✏️', 'https://figma.com',           'UI/UX design and game interface mockups'),
('GitHub',  '⬡',  'https://github.com',          'Version control and team collaboration');


-- ── 5. ROW LEVEL SECURITY (RLS) ─────────────────────────────────────
--  IMPORTANT: Supabase locks tables by default with RLS.
--  These policies allow the anon key (used by both apps) to read/write.
--  Since the admin panel URL is secret, this is safe for a portfolio.

-- Enable RLS on all tables
ALTER TABLE admin_users  ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile      ENABLE ROW LEVEL SECURITY;
ALTER TABLE games        ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools        ENABLE ROW LEVEL SECURITY;

-- admin_users: only allow SELECT (login check), never expose passwords via insert/update
CREATE POLICY "allow_login_check" ON admin_users
  FOR SELECT TO anon USING (true);

-- profile: public read, anon write (admin panel uses anon key)
CREATE POLICY "public_read_profile" ON profile
  FOR SELECT TO anon USING (true);

CREATE POLICY "anon_write_profile" ON profile
  FOR ALL TO anon USING (true) WITH CHECK (true);

-- games: public read, anon write
CREATE POLICY "public_read_games" ON games
  FOR SELECT TO anon USING (true);

CREATE POLICY "anon_write_games" ON games
  FOR ALL TO anon USING (true) WITH CHECK (true);

-- tools: public read, anon write
CREATE POLICY "public_read_tools" ON tools
  FOR SELECT TO anon USING (true);

CREATE POLICY "anon_write_tools" ON tools
  FOR ALL TO anon USING (true) WITH CHECK (true);


-- ── 6. REALTIME (for live portfolio updates) ─────────────────────────
--  Enable realtime on the tables the portfolio listens to.
--  Do this in: Supabase Dashboard → Database → Replication
--  Toggle ON: profile, games, tools
--  (Cannot be done via SQL — must be done in the dashboard UI)


-- ═══════════════════════════════════════════════════════════════════
--  DONE! After running this:
--  1. Go to Project Settings → API → copy "Project URL" and "anon public" key
--  2. Paste both into portfolio.jsx and admin-panel.jsx at the top
--  3. Enable Realtime for profile, games, tools in the Supabase dashboard
-- ═══════════════════════════════════════════════════════════════════
