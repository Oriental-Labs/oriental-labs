'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { ProjectModal } from '@/components/projects/ProjectModal';
import { useTranslation } from '@/lib/i18n/context';
import type { DbProject } from '@/types/project';

interface Props {
  dbProjects?: DbProject[];
}

// Primary tags to surface as filter pills (in order of priority)
const PRIMARY_TAGS = ['Web', 'AI', 'Experiments'];

export function Projects({ dbProjects = [] }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<DbProject | null>(null);
  const { t } = useTranslation();

  // Build filter list: use primary tags that actually appear, then any extras
  const availableFilters = useMemo(() => {
    const allTags = new Set(dbProjects.flatMap((p) => p.tags));
    const primary = PRIMARY_TAGS.filter((tag) => allTags.has(tag));
    const extras = [...allTags].filter((t) => !PRIMARY_TAGS.includes(t)).sort();
    return [...primary, ...extras].slice(0, 6); // cap at 6 filter pills
  }, [dbProjects]);

  const filtered = activeFilter === 'All'
    ? dbProjects
    : dbProjects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-navy-950 via-navy-900/30 to-navy-950"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-electric-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <SectionHeader
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          description={t.projects.description}
        />

        {availableFilters.length > 1 && (
          <ProjectFilters filters={availableFilters} active={activeFilter} onChange={setActiveFilter} />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <ProjectCard project={project} onClick={setSelectedProject} />
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-500">
                {t.projects.noProjects}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
