'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Database,
  FileQuestion,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { BrandLogo } from '@/shared/components/atoms/BrandLogo';
import { AdminSidebarItem } from '../molecules/AdminSidebarItem';

interface AdminSidebarProps {
  pendingRequestsCount?: number;
  className?: string;
}

export function AdminSidebar({
  pendingRequestsCount = 2,
  className = '',
}: AdminSidebarProps) {
  const menuItems = [
    {
      label: 'Dashboard Ringkasan',
      href: '/admin',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: 'Kelola Dataset',
      href: '/admin/datasets',
      icon: <Database className="w-5 h-5" />,
    },
    {
      label: 'Permohonan Data',
      href: '/admin/permohonan-data',
      icon: <FileQuestion className="w-5 h-5" />,
      badgeCount: pendingRequestsCount,
    },
  ];

  return (
    <aside
      className={`w-64 sm:w-72 bg-[#A32A29] border-r border-[#881E1D] flex flex-col justify-between h-full min-h-screen text-white shadow-xl ${className}`}
    >
      <div className="space-y-6 p-6">
        {/* Brand Header (No 'Panel Pengelola' text as requested, just clean Logo) */}
        <div className="pb-5 border-b border-white/15 flex items-center">
          <BrandLogo size="md" href="/admin" />
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-white/60 px-3 pb-1">
            Menu Administrasi
          </span>
          {menuItems.map((item) => (
            <AdminSidebarItem
              key={item.href}
              label={item.label}
              href={item.href}
              icon={item.icon}
              badgeCount={item.badgeCount}
            />
          ))}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-white/15 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-bold text-white bg-white/15 hover:bg-white/25 border border-white/20 transition-colors shadow-2xs"
        >
          <span>Buka Portal Publik</span>
          <ExternalLink className="w-3.5 h-3.5 text-white/70" />
        </Link>

        <Link
          href="/admin/login"
          className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-bold text-rose-100 hover:text-white hover:bg-black/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar (Logout)</span>
        </Link>
      </div>
    </aside>
  );
}
