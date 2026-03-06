import { createClient, createStaticClient } from '@/lib/supabase/server';
import type { DbProject, DbProjectInsert, DbProjectUpdate } from '@/types/project';

/** Build-time: get published project slugs without cookies. */
export async function getPublishedProjectSlugs(): Promise<{ slug: string }[]> {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from('projects')
    .select('slug')
    .eq('status', 'published');
  return (data ?? []) as { slug: string }[];
}

/** Public: only published, featured first, then sort_order asc, then newest. */
export async function getPublishedProjects(limit = 6): Promise<DbProject[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('featured', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[projects] getPublishedProjects:', error.message);
    return [];
  }
  return (data ?? []) as DbProject[];
}

/** Public: single published project by slug. */
export async function getPublishedProjectBySlug(slug: string): Promise<DbProject | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) return null;
  return data as DbProject;
}

/** Admin: single project by slug regardless of status (for preview). */
export async function getProjectBySlugAdmin(slug: string): Promise<DbProject | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data as DbProject;
}

/** Admin: all projects regardless of status. */
export async function getAdminProjects(): Promise<DbProject[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('[projects] getAdminProjects:', error.message);
    return [];
  }
  return (data ?? []) as DbProject[];
}

/** Admin: single project by id. */
export async function getProjectById(id: string): Promise<DbProject | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as DbProject;
}

/** Admin: create. */
export async function createProject(payload: DbProjectInsert): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from('projects').insert(payload);
  return { error: error?.message ?? null };
}

/** Admin: update. */
export async function updateProject(
  id: string,
  payload: DbProjectUpdate
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from('projects').update(payload).eq('id', id);
  return { error: error?.message ?? null };
}

/** Admin: delete. */
export async function deleteProject(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from('projects').delete().eq('id', id);
  return { error: error?.message ?? null };
}
