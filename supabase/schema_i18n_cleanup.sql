-- ─────────────────────────────────────────────────────────────────────────────
-- i18n cleanup — drops the old single-language columns now that all content
-- lives in the _i18n JSONB fields.
--
-- Run this AFTER schema_i18n.sql and after you have added English translations.
-- IF EXISTS makes every statement safe to re-run.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE posts
  DROP COLUMN IF EXISTS title,
  DROP COLUMN IF EXISTS excerpt,
  DROP COLUMN IF EXISTS content;

ALTER TABLE projects
  DROP COLUMN IF EXISTS title,
  DROP COLUMN IF EXISTS short_description,
  DROP COLUMN IF EXISTS long_description,
  DROP COLUMN IF EXISTS highlights;

ALTER TABLE reviews
  DROP COLUMN IF EXISTS quote;

ALTER TABLE site_settings
  DROP COLUMN IF EXISTS maintenance_message,
  DROP COLUMN IF EXISTS banner_text;
