'use server';

import { logAudit, type AuditEntry } from '@/lib/audit';
import { createClient } from '@/lib/supabase/server';

/**
 * Server-action wrapper for client components.
 * Resolves actor email from the current session, then calls logAudit.
 */
export async function logAuditAction(
  entry: Omit<AuditEntry, 'actorEmail'>
): Promise<void> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  await logAudit({ ...entry, actorEmail: user.email ?? 'unknown' });
}
