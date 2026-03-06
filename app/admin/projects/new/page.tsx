import { AdminNav } from '@/components/admin/AdminNav';
import { ProjectEditor } from '@/components/admin/ProjectEditor';

export const metadata = { title: 'New project' };

export default function NewProjectPage() {
  return (
    <>
      <AdminNav />
      <ProjectEditor />
    </>
  );
}
