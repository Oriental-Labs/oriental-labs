import { notFound } from 'next/navigation';
import { LanguageProvider } from '@/lib/i18n/context';
import type { Locale } from '@/lib/i18n/translations';

const LOCALES: Locale[] = ['es', 'en'];

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as Locale)) {
    notFound();
  }

  return (
    <LanguageProvider initialLocale={locale as Locale}>
      {children}
    </LanguageProvider>
  );
}
