import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { KedeputianId } from '../../types/catalog.types';
import { FileFormat } from '@/shared/types/common.types';
import { KEDEPUTIAN_LIST } from '../../data/datasets.mock';

interface ActiveFilterChipsProps {
  searchTerm: string;
  onClearSearch: () => void;
  selectedKedeputian: KedeputianId;
  onClearKedeputian: () => void;
  selectedFormats: FileFormat[];
  onRemoveFormat: (format: FileFormat) => void;
  onResetAll: () => void;
  totalResults: number;
}

export function ActiveFilterChips({
  searchTerm,
  onClearSearch,
  selectedKedeputian,
  onClearKedeputian,
  selectedFormats,
  onRemoveFormat,
  onResetAll,
  totalResults,
}: ActiveFilterChipsProps) {
  const kedeputianObj = KEDEPUTIAN_LIST.find((k) => k.id === selectedKedeputian);
  const hasActiveFilters =
    searchTerm.trim() !== '' || selectedKedeputian !== 'all' || selectedFormats.length > 0;

  if (!hasActiveFilters) {
    return (
      <div className="flex items-center justify-between text-xs text-slate-500 py-1">
        <span>Menampilkan <strong className="text-slate-800">{totalResults}</strong> dataset</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 py-1">
      <span className="text-xs text-slate-500 font-medium">Filter Aktif:</span>

      {/* Search Term Chip */}
      {searchTerm.trim() && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs text-[#A32A29] font-medium">
          <span>Kata Kunci: "{searchTerm}"</span>
          <button
            type="button"
            onClick={onClearSearch}
            className="hover:text-red-800 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Kedeputian Chip */}
      {selectedKedeputian !== 'all' && kedeputianObj && (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs text-[#A32A29] font-medium">
          <span>{kedeputianObj.name}</span>
          <button
            type="button"
            onClick={onClearKedeputian}
            className="hover:text-red-800 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Format Chips */}
      {selectedFormats.map((fmt) => (
        <span
          key={fmt}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium"
        >
          <span>Format: {fmt}</span>
          <button
            type="button"
            onClick={() => onRemoveFormat(fmt)}
            className="hover:text-slate-900 cursor-pointer"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {/* Reset Button */}
      <button
        type="button"
        onClick={onResetAll}
        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-[#A32A29] ml-1 underline underline-offset-2 transition-colors cursor-pointer"
      >
        <RotateCcw className="w-3 h-3" />
        <span>Reset Filter</span>
      </button>
    </div>
  );
}
