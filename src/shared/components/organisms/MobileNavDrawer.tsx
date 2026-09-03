'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, FileText, Database, Home, X } from 'lucide-react';
import { BrandLogo } from '../atoms/BrandLogo';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: { label: string; href: string }[];
}

export function MobileNavDrawer({ isOpen, onClose, items }: MobileNavDrawerProps) {
  const pathname = usePathname();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getIcon = (href: string) => {
    if (href === '/') return <Home className="w-4 h-4" />;
    if (href === '/dataset') return <Database className="w-4 h-4" />;
    if (href === '/permohonan-data') return <FileText className="w-4 h-4" />;
    return null;
  };

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-visibility duration-300 ${
        isOpen ? 'visible' : 'invisible pointer-events-none'
      }`}
    >
      {/* Backdrop with smooth opacity transition */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel with smooth slide-in/slide-out translation */}
      <div
        className={`relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 bg-[#A32A29] flex items-center justify-between">
          <BrandLogo size="md" />
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-white hover:bg-white/10 cursor-pointer"
            aria-label="Tutup Menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-4 py-6 space-y-2">
          {items.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-4 py-3 rounded-full font-bold text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-rose-50 text-[#A32A29] border border-rose-200 shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-[#A32A29]' : 'text-slate-400'}>
                    {getIcon(item.href)}
                  </span>
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 text-center">
          <p className="font-bold text-slate-700">Etalase Data Terbuka</p>
          <p>© 2026 Kemenko PMK RI</p>
        </div>
      </div>
    </div>
  );
}
