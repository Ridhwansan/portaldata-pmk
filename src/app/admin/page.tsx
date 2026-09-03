import { AdminDashboardTemplate } from '@/features/admin/components/templates/AdminDashboardTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard Administrasi - Portal Data Kemenko PMK',
};

export default function AdminDashboardPage() {
  return <AdminDashboardTemplate />;
}
