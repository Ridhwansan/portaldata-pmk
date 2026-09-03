import { AdminPermohonanTemplate } from '@/features/admin/components/templates/AdminPermohonanTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kelola Permohonan Data - Portal Data Kemenko PMK',
};

export default function AdminPermohonanPage() {
  return <AdminPermohonanTemplate />;
}
