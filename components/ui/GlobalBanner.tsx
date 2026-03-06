'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  text: string;
  linkUrl?: string;
}

export function GlobalBanner({ text, linkUrl }: Props) {
  const [visible, setVisible] = useState(false);

  const storageKey = `banner_dismissed_${btoa(text).slice(0, 16)}`;

  useEffect(() => {
    // Only show if user hasn't dismissed this specific banner text
    if (!sessionStorage.getItem(storageKey)) {
      setVisible(true);
    }
  }, [storageKey]);

  function dismiss() {
    sessionStorage.setItem(storageKey, '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white dark:bg-navy-800/95 border border-slate-200 dark:border-electric-400/30 shadow-lg dark:shadow-glow-md backdrop-blur-sm text-sm">
        <div className="flex-1 leading-snug">
          {linkUrl ? (
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-500 dark:text-electric-300 font-medium hover:underline"
            >
              {text}
            </a>
          ) : (
            <span className="text-slate-800 dark:text-slate-200">{text}</span>
          )}
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss banner"
          className="flex-shrink-0 mt-0.5 p-0.5 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
