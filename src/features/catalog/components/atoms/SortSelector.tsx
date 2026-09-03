import React from 'react';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { SortOrder } from '../../types/catalog.types';

interface SortSelectorProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
  className?: string;
}

export function SortSelector({
  value,
  onChange,
  className = '',
}: SortSelectorProps) {
  const options: { value: SortOrder; label: string }[] = [
    { value: 'newest', label: 'Terbaru ke Terlama' },
    { value: 'oldest', label: 'Terlama ke Terbaru' },
    { value: 'downloads', label: 'Paling Banyak Diunduh' },
    { value: 'views', label: 'Paling Populer (Views)' },
    { value: 'title_asc', label: 'Judul (A - Z)' },
    { value: 'title_desc', label: 'Judul (Z - A)' },
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs font-semibold text-slate-500 shrink-0 hidden sm:inline-flex items-center gap-1">
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
        Urutkan:
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOrder)}
          className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold rounded-full pl-4 pr-9 py-2 focus:outline-none focus:border-[#A32A29] transition-colors cursor-pointer shadow-2xs"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}
