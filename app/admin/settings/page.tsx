import { AdminNav } from '@/components/admin/AdminNav';
import { getSiteSettings } from '@/lib/settings';
import { SettingsForm } from './SettingsForm';

export const metadata = { title: 'Settings' };
export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <AdminNav />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Global site configuration. Changes take effect within 60 seconds.
          </p>
        </div>
        <SettingsForm settings={settings} />
      </div>
    </>
  );
}
