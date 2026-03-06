import { getAdminReviews } from '@/lib/reviews';
import { ReviewsDashboard } from './ReviewsDashboard';
import { AdminNav } from '@/components/admin/AdminNav';

export const metadata = { title: 'Reviews' };

export default async function AdminReviewsPage() {
  const reviews = await getAdminReviews();

  return (
    <>
      <AdminNav />
      <ReviewsDashboard initialReviews={reviews} />
    </>
  );
}
