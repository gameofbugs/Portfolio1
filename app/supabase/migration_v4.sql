-- ═══════════════════════════════════════════════════════════════════
--  MIGRATION v4 — run AFTER migration_v3.sql
--  Adds tables needed for Portfolio Update1 spec:
--    skills, reviews, contact_messages, analytics, settings
--  Also adds new columns to profile and games tables.
-- ═══════════════════════════════════════════════════════════════════

-- ── 1. EXTEND PROFILE ────────────────────────────────────────────
ALTER TABLE profile ADD COLUMN IF NOT EXISTS availability  TEXT NOT NULL DEFAULT 'Available';
ALTER TABLE profile ADD COLUMN IF NOT EXISTS resume_url    TEXT NOT NULL DEFAULT '';


-- ── 2. EXTEND GAMES ─────────────────────────────────────────────
ALTER TABLE games ADD COLUMN IF NOT EXISTS featured       BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE games ADD COLUMN IF NOT EXISTS featured_order INT     NOT NULL DEFAULT 0;


-- ── 3. SKILLS TABLE ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skills (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL DEFAULT '',
  logo       TEXT NOT NULL DEFAULT '⚡',
  sort_order INT  NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_skills_all" ON skills FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "write_skills_auth" ON skills FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- ── 4. REVIEWS TABLE ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL DEFAULT '',
  designation TEXT NOT NULL DEFAULT '',
  text        TEXT NOT NULL DEFAULT '',
  image       TEXT NOT NULL DEFAULT '',
  rating      INT  NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  enabled     BOOLEAN NOT NULL DEFAULT true,
  sort_order  INT  NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_reviews_all" ON reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "write_reviews_auth" ON reviews FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- ── 5. CONTACT MESSAGES TABLE ───────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL DEFAULT '',
  email      TEXT NOT NULL DEFAULT '',
  message    TEXT NOT NULL DEFAULT '',
  read       BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
-- Only authenticated admins can read/delete; anon can only insert
CREATE POLICY "insert_contact_anon" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "read_contact_auth"   ON contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "delete_contact_auth" ON contact_messages FOR DELETE TO authenticated USING (true);


-- ── 6. ANALYTICS TABLE ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS analytics (
  id                  SERIAL PRIMARY KEY,
  date                DATE NOT NULL DEFAULT CURRENT_DATE,
  visitors_today      INT  NOT NULL DEFAULT 0,
  portfolio_views     INT  NOT NULL DEFAULT 0,
  resume_opens        INT  NOT NULL DEFAULT 0,
  resume_downloads    INT  NOT NULL DEFAULT 0,
  project_clicks      INT  NOT NULL DEFAULT 0,
  contact_submissions INT  NOT NULL DEFAULT 0,
  UNIQUE(date)
);

ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_analytics_all" ON analytics FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "write_analytics_auth" ON analytics FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- ── 7. SETTINGS TABLE ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS settings (
  id              SERIAL PRIMARY KEY,
  reviews_enabled BOOLEAN NOT NULL DEFAULT true,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO settings (id, reviews_enabled)
VALUES (1, true)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_settings_all" ON settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "write_settings_auth" ON settings FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- ── 8. REALTIME ─────────────────────────────────────────────────
-- Enable Realtime for new tables in Supabase Dashboard:
-- Database → Replication → toggle ON: skills, reviews, contact_messages, analytics, settings
