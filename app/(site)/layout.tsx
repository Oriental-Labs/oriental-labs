import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlobalBanner } from '@/components/ui/GlobalBanner';
import { getSiteSettings } from '@/lib/settings';

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      {settings.banner_enabled && settings.banner_text && (
        <GlobalBanner
          text={settings.banner_text}
          linkUrl={settings.banner_link_url ?? undefined}
        />
      )}
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
