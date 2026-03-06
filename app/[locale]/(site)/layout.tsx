import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlobalBanner } from '@/components/ui/GlobalBanner';
import { getSiteSettings } from '@/lib/settings';
import { pickI18n } from '@/lib/i18n-content';
import type { Locale } from '@/lib/i18n/translations';

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const settings = await getSiteSettings();

  // Resolve banner text for the current locale
  const bannerText = settings.banner_text_i18n
    ? pickI18n(settings.banner_text_i18n, locale as Locale)
    : settings.banner_text;

  return (
    <>
      {settings.banner_enabled && bannerText && (
        <GlobalBanner
          text={bannerText}
          linkUrl={settings.banner_link_url ?? undefined}
        />
      )}
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
