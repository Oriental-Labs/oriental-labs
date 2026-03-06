import { AdminNav } from '@/components/admin/AdminNav';
import { ReviewEditor } from '@/components/admin/ReviewEditor';

export const metadata = { title: 'New review' };

export default function NewReviewPage() {
  return (
    <>
      <AdminNav />
      <ReviewEditor />
    </>
  );
}
