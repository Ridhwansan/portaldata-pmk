import React from 'react';
import { SearchX } from 'lucide-react';
import { DatasetItem } from '../../types/catalog.types';
import { DatasetCard } from '../molecules/DatasetCard';
import { Button } from '@/shared/components/atoms/Button';

interface DatasetGridProps {
  datasets: DatasetItem[];
  onResetFilters?: () => void;
  className?: string;
}

export function DatasetGrid({
  datasets,
  onResetFilters,
  className = '',
}: DatasetGridProps) {
  if (datasets.length === 0) {
    return (
      <div className="w-full py-16 px-4 bg-white rounded-2xl border border-dashed border-slate-200 text-center flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center text-[#A32A29] mb-4">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
          Tidak Ada Dataset yang Cocok
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mb-5 leading-relaxed">
          Kriteria pencarian atau filter yang Anda pilih tidak menghasilkan data. Coba ubah kata kunci atau hapus beberapa filter.
        </p>
        {onResetFilters && (
          <Button variant="outline" size="sm" onClick={onResetFilters}>
            Reset Semua Filter
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}
    >
      {datasets.map((dataset) => (
        <DatasetCard key={dataset.id} dataset={dataset} />
      ))}
    </div>
  );
}
