'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PublicLayoutWrapperProps {
  children: React.ReactNode;
}

export function PublicLayoutWrapper({ children }: PublicLayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    // Pada halaman admin, jangan render Navbar dan Footer publik
    return <>{children}</>;
  }

  return (
    <div className="min-h-full flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
