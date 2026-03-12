export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-navy-950 pt-24 pb-24 animate-pulse">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3">
          <div className="h-3 w-24 rounded bg-navy-800" />
          <div className="h-10 w-1/2 rounded bg-navy-800" />
          <div className="h-5 w-2/3 rounded bg-navy-800" />
        </div>
        <div className="h-72 sm:h-96 w-full rounded-2xl bg-navy-800 mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {[100, 92, 87, 95, 78].map((w, i) => (
              <div key={i} className="h-4 rounded bg-navy-800" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="space-y-3">
            <div className="h-32 rounded-xl bg-navy-800" />
            <div className="h-20 rounded-xl bg-navy-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
