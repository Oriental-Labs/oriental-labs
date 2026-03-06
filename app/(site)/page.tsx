import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { TechStack } from '@/components/sections/TechStack';
import { Projects } from '@/components/sections/Projects';
import { About } from '@/components/sections/About';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { getPublishedReviews } from '@/lib/reviews';
import { getPublishedProjects } from '@/lib/projects';
import { getSiteSettings } from '@/lib/settings';

export const revalidate = 60;

export default async function Home() {
  const settings = await getSiteSettings();

  const [dbReviews, dbProjects] = await Promise.all([
    getPublishedReviews(settings.home_reviews_limit),
    getPublishedProjects(settings.home_projects_limit),
  ]);

  return (
    <>
      <Hero takingClients={settings.taking_clients} />
      <Services />
      <TechStack />
      <Projects dbProjects={dbProjects} />
      <About />
      <Testimonials dbReviews={dbReviews} />
      <Contact />
    </>
  );
}
