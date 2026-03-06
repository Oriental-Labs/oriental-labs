import { MetadataRoute } from 'next';
import { SITE } from '@/lib/constants';
import { getPublishedProjects } from '@/lib/projects';
import { createClient } from '@/lib/supabase/server';

const LOCALES = ['es', 'en'] as const;

export const revalidate = 3600; // revalidate hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Published projects from DB
  let projectSlugs: string[] = [];
  try {
    const projects = await getPublishedProjects();
    projectSlugs = projects.map((p) => p.slug);
  } catch {
    // Supabase not configured yet — skip
  }

  const projectUrls = LOCALES.flatMap((locale) =>
    projectSlugs.map((slug) => ({
      url: `${SITE.url}/${locale}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  // Blog posts from Supabase
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const supabase = await createClient();
    const { data: posts } = await supabase
      .from('posts')
      .select('slug, updated_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false });

    blogUrls = LOCALES.flatMap((locale) =>
      (posts ?? []).map((post) => ({
        url: `${SITE.url}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    );
  } catch {
    // Supabase not configured yet — skip blog URLs
  }

  return [
    {
      url: `${SITE.url}/es`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE.url}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE.url}/es/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE.url}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...projectUrls,
    ...blogUrls,
  ];
}
