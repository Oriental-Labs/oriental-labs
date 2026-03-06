'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Calendar, ArrowRight, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { useTranslation } from '@/lib/i18n/context';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  tags: string[];
  published_at: string | null;
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogIndex() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('posts')
      .select('id, title, slug, excerpt, tags, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        setPosts(data ?? []);
        setLoading(false);
      });
  }, []);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  const filtered = posts.filter((p) => {
    const matchesQuery = !query || p.title.toLowerCase().includes(query.toLowerCase());
    const matchesTag = !activeTag || p.tags.includes(activeTag);
    return matchesQuery && matchesTag;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="mb-12">
          <p className="text-electric-400 text-sm font-semibold tracking-widest uppercase mb-3">
            {t.blog.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">{t.blog.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">{t.blog.description}</p>
        </AnimatedSection>

        {/* Search */}
        <AnimatedSection className="mb-6">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.blog.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-navy-800/60 border border-slate-200 dark:border-navy-600/50 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:border-electric-400/50 focus:ring-1 focus:ring-electric-400/30 transition-colors"
            />
          </div>
        </AnimatedSection>

        {/* Tag filter — plain div, no animation wrapper so clicks always work */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag((prev) => (prev === tag ? null : tag))}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  activeTag === tag
                    ? 'bg-electric-400/15 border-electric-400/40 text-electric-400'
                    : 'bg-white dark:bg-navy-800/60 border-slate-200 dark:border-navy-600/50 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-500'
                }`}
              >
                {tag}
                {activeTag === tag && <X size={10} />}
              </button>
            ))}
          </div>
        )}

        {/* Posts */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 rounded-2xl bg-slate-200 dark:bg-navy-800/40 border border-slate-200 dark:border-navy-700/30 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-slate-500 text-center py-12">{t.blog.noPosts}</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block p-6 rounded-2xl bg-white dark:bg-navy-900/50 border border-slate-200 dark:border-navy-700/40 hover:border-electric-400/30 transition-colors group shadow-sm dark:shadow-none"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-electric-400 transition-colors mb-2 leading-snug">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-3">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-4 flex-wrap">
                        {post.published_at && (
                          <span className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs">
                            <Calendar size={11} />
                            {formatDate(post.published_at)}
                          </span>
                        )}
                        {post.tags.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-navy-700/60 text-slate-500 dark:text-slate-400 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <ArrowRight
                      size={16}
                      className="flex-shrink-0 text-slate-400 dark:text-slate-600 group-hover:text-electric-400 group-hover:translate-x-1 transition-all mt-1"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
