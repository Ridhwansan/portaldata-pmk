import type { Metadata } from 'next';
import './globals.css';
import { PublicLayoutWrapper } from '@/shared/components/organisms/PublicLayoutWrapper';

export const metadata: Metadata = {
  title: 'Etalase Data Kemenko PMK - Portal Data Terbuka',
  description:
    'Kumpulan informasi data seputar pembangunan manusia dan kebudayaan di Indonesia. Akses dataset terbuka format CSV, JSON, dan XLS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <body className="min-h-full bg-slate-50 text-slate-900 font-sans">
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
