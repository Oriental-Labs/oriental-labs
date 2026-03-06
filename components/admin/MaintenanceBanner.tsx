import { AlertTriangle } from 'lucide-react';

export function MaintenanceBanner() {
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/25 text-amber-600 dark:text-amber-400 text-sm px-4 py-2.5 text-center flex items-center justify-center gap-2">
      <AlertTriangle size={14} className="flex-shrink-0" />
      <span>
        <strong>Maintenance mode is active.</strong> Public users are redirected to{' '}
        <code className="text-xs bg-amber-500/10 px-1 py-0.5 rounded">/maintenance</code>.
      </span>
    </div>
  );
}
