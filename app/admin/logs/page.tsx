import { createClient } from '@/lib/supabase/server';
import { ScrollText } from 'lucide-react';
import { AdminNav } from '@/components/admin/AdminNav';
import { LogsClient, type AuditLog } from '@/components/admin/LogsClient';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Audit Logs — Admin' };

export default async function LogsPage() {
  const supabase = await createClient();
  const { data: logs } = await supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <>
      <AdminNav />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        <div className="flex items-center gap-3">
          <ScrollText size={20} className="text-slate-400" />
          <div>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Audit Logs</h1>
          </div>
        </div>
        <LogsClient initialLogs={(logs ?? []) as AuditLog[]} />
      </div>
    </>
  );
}
