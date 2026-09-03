import React from 'react';
import { Database } from 'lucide-react';
import { SearchInput } from '../atoms/SearchInput';
import { formatNumber } from '@/shared/utils/formatters';

interface CatalogHeroProps {
  totalDatasets?: number;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: () => void;
}

export function CatalogHero({
  totalDatasets = 2450,
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}: CatalogHeroProps) {
  return (
    <section className="pt-14 pb-12 sm:pt-20 sm:pb-16 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        {/* Top Badge: 2,450 Dataset Tersedia */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-200 bg-rose-50 text-[#A32A29] text-xs sm:text-sm font-bold shadow-2xs">
          <Database className="w-3.5 h-3.5" />
          <span>{formatNumber(totalDatasets)} Dataset Tersedia</span>
        </div>

        {/* Main Title: Etalase Data Kemenko PMK */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Etalase <span className="text-[#A32A29]">Data</span> Kemenko PMK
          </h1>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
            Kumpulan informasi data seputar pembangunan manusia dan kebudayaan di Indonesia
          </p>
        </div>

        {/* Search Bar - Pill Rounded */}
        <div className="pt-2">
          <SearchInput
            value={searchTerm}
            onChange={onSearchChange}
            onSubmit={onSearchSubmit}
            placeholder="Cari dataset..."
          />
        </div>
      </div>
    </section>
  );
}
