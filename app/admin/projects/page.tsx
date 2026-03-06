import { getAdminProjects } from '@/lib/projects';
import { ProjectsDashboard } from './ProjectsDashboard';
import { AdminNav } from '@/components/admin/AdminNav';

export const metadata = { title: 'Projects' };

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();
  return (
    <>
      <AdminNav />
      <ProjectsDashboard initialProjects={projects} />
    </>
  );
}
