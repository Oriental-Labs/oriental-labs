'use client';

import { StaggerContainer, StaggerItem } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { useTranslation } from '@/lib/i18n/context';

interface Tech {
  name: string;
  icon: string;
}

const STACKS: { labelKey: 'frontend' | 'backend' | 'ai' | 'deployment'; techs: Tech[] }[] = [
  {
    labelKey: 'frontend',
    techs: [
      { name: 'Next.js', icon: '▲' },
      { name: 'React', icon: '⚛' },
      { name: 'TypeScript', icon: 'TS' },
      { name: 'TailwindCSS', icon: '🌊' },
      { name: 'Framer Motion', icon: '✦' },
    ],
  },
  {
    labelKey: 'backend',
    techs: [
      { name: 'Node.js', icon: '⬡' },
      { name: 'Python', icon: '🐍' },
      { name: 'REST APIs', icon: '⇄' },
      { name: 'n8n', icon: '⚙' },
    ],
  },
  {
    labelKey: 'ai',
    techs: [
      { name: 'OpenAI', icon: '◎' },
      { name: 'Claude API', icon: '◇' },
      { name: 'Anthropic SDK', icon: '◆' },
      { name: 'Whisper', icon: '🎙' },
    ],
  },
  {
    labelKey: 'deployment',
    techs: [
      { name: 'Supabase', icon: '⚡' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'Cloudflare Pages', icon: '☁' },
      { name: 'GitHub Actions', icon: '⚙' },
    ],
  },
];

export function TechStack() {
  const { t } = useTranslation();

  return (
    <section
      id="tech-stack"
      aria-label="Technology stack"
      className="relative py-20 sm:py-28 bg-navy-950"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t.techStack.eyebrow}
          title={t.techStack.title}
          className="mb-12"
        />

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STACKS.map((stack) => (
            <StaggerItem key={stack.labelKey}>
              <div className="rounded-2xl bg-navy-900/60 border border-navy-700/40 p-5 h-full hover:border-electric-400/30 transition-colors">
                <p className="text-xs font-semibold text-electric-400 uppercase tracking-widest mb-4">
                  {t.techStack[stack.labelKey]}
                </p>
                <div className="flex flex-col gap-2.5">
                  {stack.techs.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group"
                    >
                      <span
                        className="w-7 h-7 rounded-lg bg-navy-800 border border-navy-600/50 flex items-center justify-center text-xs text-slate-400 group-hover:border-electric-400/30 group-hover:text-electric-400 transition-colors flex-shrink-0"
                        aria-hidden="true"
                      >
                        {tech.icon}
                      </span>
                      <span className="text-sm font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
