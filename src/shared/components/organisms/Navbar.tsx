'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import { BrandLogo } from '../atoms/BrandLogo';
import { MobileNavDrawer } from './MobileNavDrawer';

export function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showFloatingSearch, setShowFloatingSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navMenuItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Dataset', href: '/dataset' },
    { label: 'Permohonan Data', href: '/permohonan-data' },
  ];

  // Focus input when floating search opens
  useEffect(() => {
    if (showFloatingSearch) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [showFloatingSearch]);

  // Click outside to close floating search
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowFloatingSearch(false);
      }
    }
    if (showFloatingSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFloatingSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dataset?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowFloatingSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#A32A29] shadow-md border-b border-[#881E1D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Brand Logo */}
            <div className="shrink-0 flex items-center py-2">
              <BrandLogo size="lg" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2 relative">
              {navMenuItems.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#A32A29] shadow-sm font-bold'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Floating Search Trigger & Container */}
              <div className="relative" ref={searchContainerRef}>
                <button
                  type="button"
                  onClick={() => setShowFloatingSearch((prev) => !prev)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ml-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 ${
                    showFloatingSearch
                      ? 'bg-white text-[#A32A29] shadow-md'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                  aria-label="Cari Cepat"
                >
                  {showFloatingSearch ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </button>

                {/* Floating Text Input Box */}
                {showFloatingSearch && (
                  <div className="absolute right-0 top-14 w-80 sm:w-96 bg-white rounded-3xl p-3 shadow-2xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Ketik kata kunci dataset..."
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-full py-2.5 pl-4 pr-12 text-xs sm:text-sm focus:outline-none focus:border-[#A32A29] focus:bg-white transition-colors"
                      />
                      <button
                        type="submit"
                        className="absolute right-1.5 w-8 h-8 rounded-full bg-[#A32A29] hover:bg-[#881E1D] text-white flex items-center justify-center transition-colors cursor-pointer"
                        title="Cari"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setIsMobileOpen((prev) => !prev)}
                className="p-2.5 rounded-full text-white hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
                aria-label={isMobileOpen ? 'Tutup Menu' : 'Buka Menu'}
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Smooth Animated Mobile Drawer */}
      <MobileNavDrawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        items={navMenuItems}
      />
    </>
  );
}
