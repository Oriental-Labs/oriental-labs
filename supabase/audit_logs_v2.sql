-- ─── Migration: Extend audit_logs with rich entity tracking ─────────────────
-- Run once in the Supabase SQL editor.
-- The existing trim_audit_logs_trigger (keeps ≤50 rows) is unchanged.

alter table audit_logs
  add column if not exists entity_type text,
  add column if not exists entity_id   uuid,
  add column if not exists entity_slug text,
  add column if not exists before      jsonb,
  add column if not exists after       jsonb;

-- Filter by entity type (used by log filter UI)
create index if not exists idx_audit_logs_entity_type
  on audit_logs (entity_type, created_at desc);

-- Search by entity slug
create index if not exists idx_audit_logs_entity_slug
  on audit_logs (entity_slug);
