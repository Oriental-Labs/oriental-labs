'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Tag, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTranslation } from '@/lib/i18n/context';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  tags: string[];
  cover_image_url: string | null;
  published_at: string | null;
  status: string;
}

function formatDate(dateStr: string | null, locale: string) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString(
    locale === 'es' ? 'es-UY' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
}

export function BlogPostContent({
  post,
  relatedPosts,
  isPreview,
}: {
  post: Post;
  relatedPosts: Post[];
  isPreview: boolean;
}) {
  const { t, locale } = useTranslation();

  return (
    <div className="min-h-screen bg-navy-950 pt-24 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Preview banner */}
        {isPreview && (
          <div className="mb-6 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium text-center">
            Preview mode — this post is not publicly visible
          </div>
        )}

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-electric-400 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          {t.blog.backToBlog}
        </Link>

        {/* Cover image */}
        {post.cover_image_url && (
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-navy-800 mb-8">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 672px) 100vw, 672px"
            />
          </div>
        )}

        {/* Meta */}
        <header className="mb-8">
          {post.tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <Tag size={12} className="text-slate-500" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-navy-800/60 text-slate-400 text-xs border border-navy-600/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-slate-400 text-lg leading-relaxed mb-4">{post.excerpt}</p>
          )}

          {post.published_at && (
            <p className="flex items-center gap-1.5 text-slate-500 text-sm">
              <Calendar size={13} />
              {t.blog.publishedOn} {formatDate(post.published_at, locale)}
            </p>
          )}
        </header>

        <div className="border-t border-navy-700/50 mb-8" />

        {/* Content */}
        <article className="prose prose-invert prose-slate max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-electric-400 prose-a:no-underline hover:prose-a:underline prose-code:text-electric-400 prose-code:bg-navy-800/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-navy-800/80 prose-pre:border prose-pre:border-navy-600/40 prose-blockquote:border-l-electric-400 prose-blockquote:text-slate-400 prose-li:text-slate-300 prose-strong:text-white prose-hr:border-navy-700/50 prose-table:text-slate-300 prose-th:text-white prose-thead:border-navy-600/40 prose-tbody:border-navy-700/40">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-navy-700/50">
            <h2 className="text-lg font-semibold text-white mb-6">{t.blog.relatedPosts}</h2>
            <div className="space-y-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl bg-navy-900/50 border border-navy-700/40 hover:border-electric-400/30 transition-colors group"
                >
                  <span className="text-slate-300 group-hover:text-white transition-colors text-sm font-medium leading-snug">
                    {related.title}
                  </span>
                  <ArrowRight
                    size={14}
                    className="flex-shrink-0 text-slate-600 group-hover:text-electric-400 group-hover:translate-x-0.5 transition-all"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
