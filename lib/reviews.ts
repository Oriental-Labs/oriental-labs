import { createClient } from '@/lib/supabase/server';
import type { Review, ReviewInsert, ReviewUpdate } from '@/types/review';

/** Public: only published, featured first, then sort_order asc, then newest. */
export async function getPublishedReviews(limit = 4): Promise<Review[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('status', 'published')
    .order('featured', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('[reviews] getPublishedReviews:', error.message);
    return [];
  }
  return (data ?? []) as Review[];
}

/** Admin: all reviews regardless of status, newest first. */
export async function getAdminReviews(): Promise<Review[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('[reviews] getAdminReviews:', error.message);
    return [];
  }
  return (data ?? []) as Review[];
}

/** Admin: single review by id. */
export async function getReviewById(id: string): Promise<Review | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data as Review;
}

/** Admin: create (browser client used in ReviewEditor, this is for server actions if needed). */
export async function createReview(payload: ReviewInsert): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from('reviews').insert(payload);
  return { error: error?.message ?? null };
}

/** Admin: update. */
export async function updateReview(
  id: string,
  payload: ReviewUpdate
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from('reviews').update(payload).eq('id', id);
  return { error: error?.message ?? null };
}

/** Admin: delete. */
export async function deleteReview(id: string): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.from('reviews').delete().eq('id', id);
  return { error: error?.message ?? null };
}
