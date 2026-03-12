export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="mb-8 space-y-3">
          <div className="h-3 w-20 rounded bg-slate-200 dark:bg-navy-800" />
          <div className="h-9 w-3/4 rounded bg-slate-200 dark:bg-navy-800" />
          <div className="h-4 w-1/2 rounded bg-slate-200 dark:bg-navy-800" />
        </div>
        <div className="h-64 sm:h-80 w-full rounded-2xl bg-slate-200 dark:bg-navy-800 mb-10" />
        <div className="space-y-3">
          {[100, 95, 88, 92, 80, 96, 75, 90].map((w, i) => (
            <div key={i} className="h-4 rounded bg-slate-200 dark:bg-navy-800" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
