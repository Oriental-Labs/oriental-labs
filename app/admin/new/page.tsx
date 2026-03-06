import { AdminNav } from '@/components/admin/AdminNav';
import { PostEditor } from '@/components/admin/PostEditor';

export const metadata = { title: 'New post' };

export default function NewPostPage() {
  return (
    <>
      <AdminNav />
      <PostEditor />
    </>
  );
}
