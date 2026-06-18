-- ═══════════════════════════════════════════════════════════════════
--  MIGRATION v2 — run AFTER your original supabase-setup.sql
--  Supabase Dashboard → SQL Editor → New Query → paste this whole file → Run
--
--  This migration:
--   1. Adds new game fields: detailed_description, video_url, images
--   2. Creates a social_links table (Contact section) with 5 built-in
--      platforms pre-seeded (LinkedIn, Instagram, YouTube, GitHub, itch.io)
--   3. Replaces the old "anon key can write anything" policies with
--      proper ones: public (anon) can only READ; only a logged-in admin
--      (Supabase Auth session) can WRITE. This is what actually fixes
--      the "API key exposed in frontend" problem — the anon key is
--      *meant* to be public for Supabase apps, what matters is that it
--      can no longer be used to modify your data.
--   4. Sets up a public Storage bucket for game screenshot uploads.
-- ═══════════════════════════════════════════════════════════════════


-- ── 1. EXTEND GAMES TABLE ────────────────────────────────────────────
ALTER TABLE games ADD COLUMN IF NOT EXISTS detailed_description TEXT NOT NULL DEFAULT '';
ALTER TABLE games ADD COLUMN IF NOT EXISTS video_url             TEXT NOT NULL DEFAULT '';
ALTER TABLE games ADD COLUMN IF NOT EXISTS images                TEXT[] NOT NULL DEFAULT '{}';


-- ── 2. SOCIAL / CONTACT LINKS TABLE ─────────────────────────────────
CREATE TABLE IF NOT EXISTS social_links (
  id         SERIAL PRIMARY KEY,
  platform   TEXT NOT NULL DEFAULT '',   -- 'linkedin' | 'instagram' | 'youtube' | 'github' | 'itchio' | '' (custom)
  label      TEXT NOT NULL DEFAULT 'New Link',
  url        TEXT NOT NULL DEFAULT '',   -- leave blank to hide on the portfolio
  icon       TEXT NOT NULL DEFAULT '🔗', -- emoji used for itch.io / custom links
  sort_order INT  NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed the 5 built-in platforms once (URLs start blank — fill them in
-- from the admin panel's new Contact tab; a blank URL stays hidden).
INSERT INTO social_links (platform, label, url, icon, sort_order)
SELECT * FROM (VALUES
  ('linkedin',  'LinkedIn',  '', '🔗', 1),
  ('instagram', 'Instagram', '', '🔗', 2),
  ('youtube',   'YouTube',   '', '🔗', 3),
  ('github',    'GitHub',    '', '🔗', 4),
  ('itchio',    'itch.io',   '', '🎮', 5)
) AS v(platform, label, url, icon, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM social_links);


-- ── 3. ROW LEVEL SECURITY — REAL FIX FOR THE EXPOSED-KEY ISSUE ──────
ALTER TABLE profile      ENABLE ROW LEVEL SECURITY;
ALTER TABLE games        ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools        ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Drop every old "anon can write" policy from supabase-setup.sql
DROP POLICY IF EXISTS anon_write_profile ON profile;
DROP POLICY IF EXISTS anon_write_games   ON games;
DROP POLICY IF EXISTS anon_write_tools   ON tools;
DROP POLICY IF EXISTS allow_login_check  ON admin_users;
DROP POLICY IF EXISTS public_read_profile ON profile;
DROP POLICY IF EXISTS public_read_games   ON games;
DROP POLICY IF EXISTS public_read_tools   ON tools;

-- profile: anyone can read, only a signed-in admin can write
CREATE POLICY "select_profile_all" ON profile
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "write_profile_auth" ON profile
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- games: anyone can read, only a signed-in admin can write
CREATE POLICY "select_games_all" ON games
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "write_games_auth" ON games
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- tools: anyone can read, only a signed-in admin can write
CREATE POLICY "select_tools_all" ON tools
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "write_tools_auth" ON tools
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- social_links: anyone can read, only a signed-in admin can write
CREATE POLICY "select_social_all" ON social_links
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "write_social_auth" ON social_links
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- admin_users is no longer used for login (replaced by Supabase Auth
-- below) — lock it down completely. You can also just delete this
-- table once you've confirmed login via Supabase Auth works:
--   DROP TABLE IF EXISTS admin_users;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
-- (intentionally no policies on admin_users — anon and authenticated
-- both get zero access to it now)


-- ── 4. STORAGE BUCKET FOR GAME SCREENSHOTS ──────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('game-images', 'game-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "game_images_public_read" ON storage.objects;
DROP POLICY IF EXISTS "game_images_auth_insert" ON storage.objects;
DROP POLICY IF EXISTS "game_images_auth_update" ON storage.objects;
DROP POLICY IF EXISTS "game_images_auth_delete" ON storage.objects;

CREATE POLICY "game_images_public_read" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'game-images');

CREATE POLICY "game_images_auth_insert" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'game-images');

CREATE POLICY "game_images_auth_update" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'game-images');

CREATE POLICY "game_images_auth_delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'game-images');


-- ── 5. REALTIME ──────────────────────────────────────────────────────
--  Also enable Realtime for the new table (do this in the dashboard):
--  Database → Replication → toggle ON: social_links
--  (profile, games, tools should already be on from the original setup)


-- ═══════════════════════════════════════════════════════════════════
--  AFTER RUNNING THIS — ONE MANUAL STEP REQUIRED:
--  Create your real admin login: Supabase Dashboard → Authentication
--  → Users → Add User → enter an email + password. Use that email and
--  password to log into /admin going forward (the old admin_users
--  username/password no longer works, by design — that table was
--  readable by anyone with the anon key, which is a real security hole).
-- ═══════════════════════════════════════════════════════════════════
