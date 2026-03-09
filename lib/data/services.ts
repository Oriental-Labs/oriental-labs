import type { Locale } from '@/lib/i18n/translations';

export type I18n<T = string> = Record<Locale, T>;

export interface Service {
  id: string;
  title: I18n;
  description: I18n;
  icon: string;
  features: I18n<string[]>;
}

export interface ProcessStep {
  step: number;
  title: I18n;
  description: I18n;
}

export const services: Service[] = [
  {
    id: 'web-development',
    title: { en: 'Web Development', es: 'Desarrollo Web' },
    description: {
      en: 'From landing pages to full-stack web apps. Fast, responsive, and built to convert.',
      es: 'Desde landing pages hasta aplicaciones full-stack. Rápidas, responsivas y construidas para convertir.',
    },
    icon: 'Globe',
    features: {
      en: [
        'Landing pages & marketing sites',
        'E-commerce & checkout flows',
        'Admin dashboards & portals',
        'API integrations',
      ],
      es: [
        'Landing pages y sitios de marketing',
        'E-commerce y flujos de compra',
        'Dashboards y portales de administración',
        'Integraciones con APIs',
      ],
    },
  },
  {
    id: 'ai-integrations',
    title: { en: 'AI Integrations', es: 'Integraciones de AI' },
    description: {
      en: 'Embed AI into your products — from simple chatbots to complex content pipelines.',
      es: 'Integra AI en tus productos — desde chatbots simples hasta pipelines de contenido complejos.',
    },
    icon: 'Sparkles',
    features: {
      en: [
        'GPT-powered chatbots & assistants',
        'Content generation pipelines',
        'Data extraction & summarization',
        'Custom fine-tuned models',
      ],
      es: [
        'Chatbots y asistentes con GPT',
        'Pipelines de generación de contenido',
        'Extracción y resumen de datos',
        'Modelos personalizados fine-tuned',
      ],
    },
  },
  {
    id: 'mvp-prototype',
    title: { en: 'MVP in 2–4 Weeks', es: 'MVP en 2–4 Semanas' },
    description: {
      en: 'Ship your idea fast. We take you from concept to a working product you can show investors.',
      es: 'Lanzá tu idea rápido. Te llevamos del concepto a un producto funcional que podés mostrar a inversores.',
    },
    icon: 'Rocket',
    features: {
      en: [
        'Rapid prototyping & validation',
        'Full-stack development',
        'Deployment & infrastructure',
        'Post-launch iteration support',
      ],
      es: [
        'Prototipado rápido y validación',
        'Desarrollo full-stack',
        'Despliegue e infraestructura',
        'Soporte de iteración post-lanzamiento',
      ],
    },
  },
  {
    id: 'automations',
    title: { en: 'Automations & Workflows', es: 'Automatizaciones & Workflows' },
    description: {
      en: 'Eliminate repetitive tasks. We connect your tools and automate your processes end-to-end.',
      es: 'Eliminá tareas repetitivas. Conectamos tus herramientas y automatizamos tus procesos de punta a punta.',
    },
    icon: 'Repeat',
    features: {
      en: [
        'Workflow automation with n8n',
        'Scheduled tasks & background jobs',
        'Automatic notifications & alerts',
        'Cross-platform data sync',
      ],
      es: [
        'Automatización de flujos con n8n',
        'Tareas programadas y jobs en background',
        'Notificaciones y alertas automáticas',
        'Sincronización de datos entre plataformas',
      ],
    },
  },
  {
    id: 'third-party-integrations',
    title: { en: 'Third-Party Integrations', es: 'Integraciones con Terceros' },
    description: {
      en: 'Connect your app with any external service. Payments, emails, maps, CRMs — all wired up.',
      es: 'Conectá tu app con cualquier servicio externo. Pagos, emails, mapas, CRMs — todo integrado.',
    },
    icon: 'Plug',
    features: {
      en: [
        'Payment gateway integrations',
        'Email & SMS integrations',
        'Google APIs, Maps & Analytics',
        'CRM & ERP integrations',
      ],
      es: [
        'Integración de pasarelas de pago',
        'Integración de email y SMS',
        'Google APIs, Maps y Analytics',
        'Integraciones con CRM y ERP',
      ],
    },
  },
  {
    id: 'performance-seo',
    title: { en: 'Performance & SEO', es: 'Rendimiento y SEO' },
    description: {
      en: 'Lighthouse scores that make you proud. Technical SEO that drives organic growth.',
      es: 'Puntajes de Lighthouse que te enorgullecen. SEO técnico que impulsa el crecimiento orgánico.',
    },
    icon: 'Zap',
    features: {
      en: [
        'Core Web Vitals optimization',
        'Technical SEO audits & fixes',
        'Structured data & metadata',
        'Image & bundle optimization',
      ],
      es: [
        'Optimización de Core Web Vitals',
        'Auditorías y correcciones de SEO técnico',
        'Datos estructurados y metadata',
        'Optimización de imágenes y bundles',
      ],
    },
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: { en: 'Discover', es: 'Descubrir' },
    description: {
      en: "We align on your goals, audience, and constraints before writing a single line.",
      es: 'Nos alineamos en tus objetivos, audiencia y restricciones antes de escribir una sola línea.',
    },
  },
  {
    step: 2,
    title: { en: 'Build', es: 'Construir' },
    description: {
      en: "Rapid, iterative development with continuous demos so you're never in the dark.",
      es: 'Desarrollo rápido e iterativo con demos continuas para que siempre estés al tanto.',
    },
  },
  {
    step: 3,
    title: { en: 'Iterate', es: 'Iterar' },
    description: {
      en: 'We refine based on real feedback. Fast cycles, clear communication.',
      es: 'Refinamos en base a feedback real. Ciclos rápidos, comunicación clara.',
    },
  },
  {
    step: 4,
    title: { en: 'Launch', es: 'Lanzar' },
    description: {
      en: 'Deploy with confidence — infrastructure, monitoring, and docs included.',
      es: 'Lanzá con confianza — infraestructura, monitoreo y documentación incluidos.',
    },
  },
];
