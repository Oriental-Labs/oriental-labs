import Link from 'next/link';
import { headers } from 'next/headers';

export default async function NotFound() {
  const h = await headers();
  const pathname = h.get('x-pathname') ?? '';
  const locale = pathname.startsWith('/en') ? 'en' : 'es';
  const isEn = locale === 'en';

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center px-4 text-center">
      <p className="text-electric-400 text-sm font-semibold uppercase tracking-widest mb-4">
        Error 404
      </p>
      <h1 className="text-6xl sm:text-8xl font-bold text-white mb-4">
        404
      </h1>
      <p className="text-slate-400 text-lg max-w-sm mb-8">
        {isEn
          ? "The page you're looking for doesn't exist or has been moved."
          : 'La página que buscás no existe o fue movida.'}
      </p>
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 bg-electric-400 hover:bg-electric-300 text-navy-950 font-semibold text-sm rounded-xl px-6 py-3 transition-colors"
      >
        ← {isEn ? 'Back to home' : 'Volver al inicio'}
      </Link>
    </div>
  );
}
