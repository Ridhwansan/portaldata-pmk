'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/features/admin/components/organisms/AdminSidebar';
import { AdminHeader } from '@/features/admin/components/organisms/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Jika di halaman login, tampilkan langsung tanpa sidebar admin
  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-900">{children}</div>;
  }

  const getPageMeta = () => {
    if (pathname === '/admin') {
      return {
        title: 'Dashboard Administrasi',
        subtitle: 'Selamat datang kembali di panel pengelola data terbuka Kemenko PMK',
      };
    }
    if (pathname === '/admin/datasets') {
      return {
        title: 'Kelola Dataset',
        subtitle: 'Daftar, cari, dan sunting seluruh dataset yang terdaftar di portal',
      };
    }
    if (pathname === '/admin/datasets/create') {
      return {
        title: 'Input Dataset Baru',
        subtitle: 'Unggah file data (CSV, XLSX, JSON) dan definisikan kamus metadata',
      };
    }
    if (pathname.includes('/edit')) {
      return {
        title: 'Edit Dataset',
        subtitle: 'Pembaruan rincian metadata dan file dataset yang sudah ada',
      };
    }
    if (pathname === '/admin/permohonan-data') {
      return {
        title: 'Kelola Permohonan Data',
        subtitle: 'Verifikasi dan tindak lanjuti permintaan informasi publik dari masyarakat',
      };
    }
    return {
      title: 'Admin Portal Data',
      subtitle: 'Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan',
    };
  };

  const { title, subtitle } = getPageMeta();

  return (
    <div className="min-h-screen bg-slate-50/70 flex">
      {/* Desktop Sidebar: Sticky Full Height to the Bottom */}
      <div className="hidden lg:block shrink-0 sticky top-0 h-screen overflow-y-auto bg-[#A32A29]">
        <AdminSidebar className="min-h-screen" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <AdminHeader
          title={title}
          subtitle={subtitle}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative ml-0 w-72 bg-[#A32A29] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <AdminSidebar className="w-full h-full min-h-0" />
          </div>
        </div>
      )}
    </div>
  );
}
