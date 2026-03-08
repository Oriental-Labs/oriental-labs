'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PenLine, Trash2, Eye, EyeOff, Star } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import type { Review } from '@/types/review';
import { deleteReviewAction } from '@/app/admin/actions/entities';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';

function formatDate(d: string | null) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
      status === 'published'
        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
    )}>
      {status}
    </span>
  );
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={11} className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'} />
      ))}
    </span>
  );
}

export function ReviewsDashboard({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [, startTransition] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, startDeleteTransition] = useTransition();
  const [statusTarget, setStatusTarget] = useState<Review | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function confirmToggleStatus() {
    if (!statusTarget) return;
    const review = statusTarget;
    const newStatus = review.status === 'published' ? 'draft' : 'published';
    const { error } = await supabase.from('reviews').update({ status: newStatus }).eq('id', review.id);
    if (!error) {
      setReviews((prev) => prev.map((r) => r.id === review.id ? { ...r, status: newStatus as Review['status'] } : r));
      setStatusTarget(null);
      startTransition(() => router.refresh());
    }
  }

  async function toggleFeatured(review: Review) {
    const newFeatured = !review.featured;
    const { error } = await supabase.from('reviews').update({ featured: newFeatured }).eq('id', review.id);
    if (!error) {
      setReviews((prev) => prev.map((r) => r.id === review.id ? { ...r, featured: newFeatured } : r));
      startTransition(() => router.refresh());
    }
  }

  async function updateSortOrder(review: Review, value: number) {
    const { error } = await supabase.from('reviews').update({ sort_order: value }).eq('id', review.id);
    if (!error) {
      setReviews((prev) => prev.map((r) => r.id === review.id ? { ...r, sort_order: value } : r));
    }
  }

  function handleDelete(id: string) {
    startDeleteTransition(async () => {
      const { error } = await deleteReviewAction(id);
      if (!error) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
        setDeleteTarget(null);
        router.refresh();
      }
    });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reviews</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/admin/reviews/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-electric-400 hover:bg-electric-300 text-navy-950 font-semibold text-sm transition-colors"
        >
          <Star size={14} />
          New review
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          No reviews yet.{' '}
          <Link href="/admin/reviews/new" className="text-electric-400 hover:underline">Add one</Link>.
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 dark:border-navy-700/40 overflow-hidden">
          {/* Desktop table */}
          <table className="w-full hidden md:table">
            <thead className="bg-slate-100 dark:bg-navy-900/60 border-b border-slate-200 dark:border-navy-700/40">
              <tr>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">Author</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">Rating</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Featured</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Order</th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">Updated</th>
                <th className="px-4 py-3 w-36" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-navy-700/30 bg-white dark:bg-transparent">
              {reviews.map((review) => (
                <tr key={review.id} className="hover:bg-slate-50 dark:hover:bg-navy-800/30 transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-slate-900 dark:text-white font-medium text-sm leading-snug line-clamp-1">{review.author_name}</span>
                    {(review.author_title || review.author_company) && (
                      <p className="text-slate-500 text-xs mt-0.5">
                        {[review.author_title, review.author_company].filter(Boolean).join(' · ')}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-4"><StarDisplay rating={review.rating} /></td>
                  <td className="px-4 py-4"><StatusBadge status={review.status} /></td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <button
                      onClick={() => toggleFeatured(review)}
                      className={cn('p-1.5 rounded-lg transition-colors',
                        review.featured
                          ? 'text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10'
                          : 'text-slate-500 dark:text-slate-600 hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-700/60'
                      )}
                      title={review.featured ? 'Unfeature' : 'Feature'}
                    >
                      <Star size={14} className={review.featured ? 'fill-yellow-400' : ''} />
                    </button>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <input
                      type="number"
                      defaultValue={review.sort_order}
                      onBlur={(e) => updateSortOrder(review, Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded-lg bg-slate-100 dark:bg-navy-800/60 border border-slate-200 dark:border-navy-600/50 text-slate-900 dark:text-white text-xs text-center focus:outline-none focus:border-electric-400/50"
                    />
                  </td>
                  <td className="px-4 py-4 text-slate-500 dark:text-slate-400 text-sm">{formatDate(review.updated_at)}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setStatusTarget(review)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-700/60 transition-colors"
                        title={review.status === 'published' ? 'Unpublish' : 'Publish'}>
                        {review.status === 'published' ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <Link href={`/admin/reviews/edit/${review.id}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-700/60 transition-colors" title="Edit">
                        <PenLine size={14} />
                      </Link>
                      <button onClick={() => setDeleteTarget(review.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/8 transition-colors" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-slate-200 dark:divide-navy-700/30 bg-white dark:bg-transparent">
            {reviews.map((review) => (
              <div key={review.id} className="px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-slate-900 dark:text-white truncate">{review.author_name}</p>
                      {review.featured && <Star size={12} className="text-yellow-400 fill-yellow-400 flex-shrink-0" />}
                    </div>
                    {(review.author_title || review.author_company) && (
                      <p className="text-xs text-slate-500 mt-0.5 truncate">
                        {[review.author_title, review.author_company].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <StarDisplay rating={review.rating} />
                      <StatusBadge status={review.status} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link href={`/admin/reviews/edit/${review.id}`}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-700/60 transition-colors">
                      <PenLine size={14} />
                    </Link>
                    <button onClick={() => setStatusTarget(review)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-700/60 transition-colors">
                      {review.status === 'published' ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                    <button onClick={() => setDeleteTarget(review.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/8 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={statusTarget !== null}
        title={statusTarget?.status === 'published' ? 'Unpublish review?' : 'Publish review?'}
        description={statusTarget?.status === 'published'
          ? 'This will hide the review from the public site.'
          : 'This will make the review visible on the public site.'}
        confirmLabel={statusTarget?.status === 'published' ? 'Unpublish' : 'Publish'}
        confirmVariant={statusTarget?.status === 'published' ? 'warning' : 'primary'}
        onCancel={() => setStatusTarget(null)}
        onConfirm={confirmToggleStatus}
      />
      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete review?"
        description="This action cannot be undone."
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
      />
    </div>
  );
}
