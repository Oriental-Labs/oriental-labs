import type { Locale } from '@/lib/i18n/translations';

export type I18n<T = string> = Record<Locale, T>;

export interface Founder {
  slug: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  bio: I18n;
  skills: string[];
  linkedin?: string;
  github?: string;
  twitter?: string;
}

export interface TimelineEvent {
  date: string;
  title: I18n;
  description: I18n;
}

export const founders: Founder[] = [
  {
    slug: 'bruno-jorba',
    name: 'Bruno Jorba',
    role: 'CEO & Co-Founder',
    location: 'Montevideo, Uruguay',
    avatar: '/images/founders/bruno-jorba.webp',
    bio: {
      en: "Systems engineering student and full-stack developer obsessed with building products that work. Bruno leads technical direction at Oriental Labs, with a focus on clean architecture, performance, and continuous delivery. When he's not coding, he's thinking about systems — how things fit together and how to make them better.",
      es: 'Estudiante de ingeniería en sistemas y desarrollador full-stack obsesionado con construir productos que funcionen. Bruno lidera la dirección técnica en Oriental Labs, con foco en arquitectura limpia, rendimiento y entrega continua. Cuando no está programando, está pensando en sistemas — cómo encajan las piezas y cómo mejorarlas.',
    },
    skills: ['Full-Stack Development', 'Systems Architecture', 'TypeScript', 'Next.js', 'AI/ML'],
    linkedin: 'https://www.linkedin.com/in/bruno-jorba-cabrera-a93760173/',
    github: 'https://github.com/Brunito06',
  },
  {
    slug: 'emiliano-rodriguez',
    name: 'Emiliano Rodriguez',
    role: 'CEO & Co-Founder',
    location: 'Montevideo, Uruguay',
    avatar: '/images/founders/emiliano-rodriguez.webp',
    bio: {
      en: "Full-stack developer with a strong eye for design and a passion for shipping. Emiliano drives product vision and client relationships at Oriental Labs. He specializes in turning complex requirements into elegant, user-friendly experiences — from concept sketches to production-ready code.",
      es: 'Desarrollador full-stack con buen ojo para el diseño y pasión por lanzar productos. Emiliano impulsa la visión de producto y las relaciones con clientes en Oriental Labs. Se especializa en convertir requerimientos complejos en experiencias elegantes y fáciles de usar — desde bocetos conceptuales hasta código listo para producción.',
    },
    skills: ['Full-Stack Development', 'UI/UX Design', 'Product Strategy', 'React', 'Node.js'],
    github: 'https://github.com/emirod1955',
  },
];

export const timeline: TimelineEvent[] = [
  {
    date: 'Early 2023',
    title: {
      en: 'Started building together',
      es: 'Comenzaron a construir juntos',
    },
    description: {
      en: 'Bruno and Emiliano met during a university hackathon. They kept building together after — side projects, late nights, lots of iterations.',
      es: 'Bruno y Emiliano se conocieron en un hackathon universitario. Siguieron construyendo juntos — proyectos paralelos, noches largas, muchas iteraciones.',
    },
  },
  {
    date: 'Mid 2023',
    title: {
      en: 'First client, first product',
      es: 'Primer cliente, primer producto',
    },
    description: {
      en: 'Landed their first paid client — a local startup needing a redesign and an AI chatbot. Shipped in three weeks.',
      es: 'Consiguieron su primer cliente pago — una startup local que necesitaba un rediseño y un chatbot de AI. Entregado en tres semanas.',
    },
  },
  {
    date: 'Early 2024',
    title: {
      en: 'Oriental Labs is born',
      es: 'Nace Oriental Labs',
    },
    description: {
      en: 'After multiple successful projects, they made it official. Oriental Labs launched as a Uruguayan software & AI studio.',
      es: 'Tras múltiples proyectos exitosos, lo hicieron oficial. Oriental Labs se lanzó como un estudio de software y AI uruguayo.',
    },
  },
  {
    date: 'Late 2024',
    title: {
      en: 'Growing & expanding',
      es: 'Creciendo y expandiéndose',
    },
    description: {
      en: 'Expanded to serve clients internationally, with a focus on Latin American startups and global SaaS companies.',
      es: 'Se expandieron para atender clientes internacionales, con foco en startups latinoamericanas y empresas SaaS globales.',
    },
  },
];
