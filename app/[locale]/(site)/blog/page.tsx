import type { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import { BlogIndex } from './BlogIndex';
import type { Locale } from '@/lib/i18n/translations';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  const title = isEs ? 'Blog' : 'Blog';
  const description = isEs
    ? 'Ideas, proceso y lecciones de construir software real.'
    : 'Thoughts, process, and lessons from building real software at Oriental Labs.';

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE.url}/${locale}/blog`,
      languages: { es: `${SITE.url}/es/blog`, en: `${SITE.url}/en/blog`, 'x-default': `${SITE.url}/en/blog` },
    },
    openGraph: {
      title: `Blog | ${SITE.name}`,
      description,
      images: [`/api/og?type=blog&title=Blog&subtitle=${encodeURIComponent(description)}&locale=${locale}`],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <BlogIndex locale={locale as Locale} />;
}
