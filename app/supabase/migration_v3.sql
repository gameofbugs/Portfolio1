-- ═══════════════════════════════════════════════════════════════════
--  MIGRATION v3 — run AFTER migration_v2.sql
--  Adds a dedicated cover image field for each game (separate from the
--  in-game screenshot gallery), used for the card grid / thumbnail.
-- ═══════════════════════════════════════════════════════════════════

ALTER TABLE games ADD COLUMN IF NOT EXISTS cover_image TEXT NOT NULL DEFAULT '';

-- That's it — RLS policies from migration_v2.sql already cover this
-- column since they're defined per-table, not per-column.
