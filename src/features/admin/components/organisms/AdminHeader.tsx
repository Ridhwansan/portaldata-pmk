'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Menu } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileSidebar?: () => void;
}

export function AdminHeader({
  title,
  subtitle,
  onOpenMobileSidebar,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 sm:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {onOpenMobileSidebar && (
          <button
            type="button"
            onClick={onOpenMobileSidebar}
            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
            aria-label="Buka Menu Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* User Admin Profile Avatar */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#A32A29] text-white flex items-center justify-center font-bold text-sm shadow-xs select-none">
            AD
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              Admin Kemenko PMK
            </span>
            <span className="text-[11px] text-slate-400">
              Pusdatin PMK
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
