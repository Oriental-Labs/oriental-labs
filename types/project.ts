import type { I18nField, I18nArrayField } from '@/lib/i18n-content';

export interface GalleryItem {
  src: string;
  alt: string;
  type: 'image';
}

export interface DbProject {
  id: string;
  slug: string;
  role: string | null;
  year: string | null;
  tags: string[];
  live_url: string | null;
  github_url: string | null;
  status: 'draft' | 'published';
  featured: boolean;
  sort_order: number;
  gallery: GalleryItem[];
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
  // i18n fields (canonical)
  title_i18n: I18nField | null;
  short_description_i18n: I18nField | null;
  long_description_i18n: I18nField | null;
  highlights_i18n: I18nArrayField | null;
  // legacy columns (may not exist after cleanup migration)
  title?: string;
  short_description?: string;
  long_description?: string;
  highlights?: string[];
}

export type DbProjectInsert = Omit<DbProject, 'id' | 'created_at' | 'updated_at'>;
export type DbProjectUpdate = Partial<DbProjectInsert>;
