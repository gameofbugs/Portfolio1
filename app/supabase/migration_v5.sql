-- ═══════════════════════════════════════════════════════════════════
--  MIGRATION v5 — run AFTER migration_v4.sql
--  Adds subject column, update policy for contact_messages,
--  and an email_logs table for tracking email notifications.
-- ═══════════════════════════════════════════════════════════════════

-- ── 1. ADD SUBJECT COLUMN ────────────────────────────────────────
ALTER TABLE contact_messages ADD COLUMN IF NOT EXISTS subject TEXT NOT NULL DEFAULT '';

-- ── 2. ADD UPDATE POLICY FOR MARKING AS READ ─────────────────────
-- Drop existing insert policy to include subject
DROP POLICY IF EXISTS "insert_contact_anon" ON contact_messages;
CREATE POLICY "insert_contact_anon" ON contact_messages FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Add update policy so admin can mark messages as read
CREATE POLICY "update_contact_auth" ON contact_messages FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- ── 3. EMAIL LOGS TABLE (tracks sent notifications) ──────────────
CREATE TABLE IF NOT EXISTS email_logs (
  id          SERIAL PRIMARY KEY,
  message_id  INTEGER REFERENCES contact_messages(id) ON DELETE CASCADE,
  recipient   TEXT NOT NULL DEFAULT '',
  status      TEXT NOT NULL DEFAULT 'pending',
  error_msg   TEXT NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_email_logs_auth" ON email_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_email_logs_auth" ON email_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "delete_email_logs_auth" ON email_logs FOR DELETE TO authenticated USING (true);
