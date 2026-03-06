import { notFound } from 'next/navigation';
import { AdminNav } from '@/components/admin/AdminNav';
import { ReviewEditor } from '@/components/admin/ReviewEditor';
import { getReviewById } from '@/lib/reviews';

export const metadata = { title: 'Edit review' };

export default async function EditReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const review = await getReviewById(id);
  if (!review) notFound();

  return (
    <>
      <AdminNav />
      <ReviewEditor initial={review} />
    </>
  );
}
