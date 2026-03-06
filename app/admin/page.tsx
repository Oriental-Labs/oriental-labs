import { createClient } from '@/lib/supabase/server';
import { AdminDashboard } from './AdminDashboard';
import { AdminNav } from '@/components/admin/AdminNav';

export const metadata = { title: 'Posts' };

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('id, slug, status, published_at, updated_at, title_i18n')
    .order('updated_at', { ascending: false });

  return (
    <>
      <AdminNav />
      <AdminDashboard initialPosts={posts ?? []} />
    </>
  );
}
