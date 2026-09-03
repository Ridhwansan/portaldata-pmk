import { AdminLoginTemplate } from '@/features/admin/components/templates/AdminLoginTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login Pengelola - Portal Data Kemenko PMK',
  description: 'Halaman masuk administrasi pengelola portal data terbuka Kemenko PMK.',
};

export default function AdminLoginPage() {
  return <AdminLoginTemplate />;
}
