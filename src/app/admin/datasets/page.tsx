import { AdminDatasetsTemplate } from '@/features/admin/components/templates/AdminDatasetsTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kelola Dataset - Portal Data Kemenko PMK',
};

export default function AdminDatasetsPage() {
  return <AdminDatasetsTemplate />;
}
