import { notFound } from 'next/navigation';
import { AdminNav } from '@/components/admin/AdminNav';
import { ProjectEditor } from '@/components/admin/ProjectEditor';
import { getProjectById } from '@/lib/projects';

export const metadata = { title: 'Edit project' };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <>
      <AdminNav />
      <ProjectEditor initial={project} />
    </>
  );
}
