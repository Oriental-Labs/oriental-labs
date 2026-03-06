/**
 * Audit log helper — v2
 * The DB trigger `trim_audit_logs_trigger` keeps the table at ≤ 50 rows automatically.
 *
 * Logged actions:
 *   settings.update
 *   post.create    post.publish    post.update    post.delete
 *   project.create project.publish project.update project.delete
 *   review.create  review.publish  review.update  review.delete
 *   logs.clear
 *
 * Use logAuditAction (app/admin/audit-action.ts) from client components.
 */
import { createClient } from '@/lib/supabase/server';

export interface AuditEntry {
  action: string;
  actorEmail: string;
  entityType?: string | null;
  entityId?: string | null;
  entitySlug?: string | null;
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
  metadata?: Record<string, unknown> | null;
}

export async function logAudit(entry: AuditEntry): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.from('audit_logs').insert({
      action:      entry.action,
      actor_email: entry.actorEmail,
      entity_type: entry.entityType  ?? null,
      entity_id:   entry.entityId    ?? null,
      entity_slug: entry.entitySlug  ?? null,
      before:      entry.before      ?? null,
      after:       entry.after       ?? null,
      metadata:    entry.metadata    ?? null,
    });
  } catch {
    // Audit logging must never crash the app
  }
}
