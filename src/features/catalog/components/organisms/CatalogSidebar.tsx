import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { KedeputianId } from '../../types/catalog.types';
import { FileFormat } from '@/shared/types/common.types';
import { KedeputianFilterList } from '../molecules/KedeputianFilterList';
import { FormatFilterList } from '../molecules/FormatFilterList';

interface CatalogSidebarProps {
  selectedKedeputian: KedeputianId;
  onSelectKedeputian: (id: KedeputianId) => void;
  selectedFormats: FileFormat[];
  onToggleFormat: (format: FileFormat) => void;
  className?: string;
}

export function CatalogSidebar({
  selectedKedeputian,
  onSelectKedeputian,
  selectedFormats,
  onToggleFormat,
  className = '',
}: CatalogSidebarProps) {
  return (
    <aside className={`w-full ${className}`}>
      <div className="bg-[#A32A29] rounded-2xl p-5 shadow-lg text-white border border-[#8B2222]">
        {/* Header: Filter */}
        <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-white/20">
          <SlidersHorizontal className="w-5 h-5 text-white" />
          <h2 className="text-lg font-bold tracking-wide">Filter</h2>
        </div>

        {/* Kedeputian Filter */}
        <div className="space-y-4">
          <KedeputianFilterList
            selectedKedeputian={selectedKedeputian}
            onSelect={onSelectKedeputian}
          />

          {/* Format Filter (CSV, JSON, XLS) */}
          <FormatFilterList
            selectedFormats={selectedFormats}
            onToggleFormat={onToggleFormat}
          />
        </div>
      </div>
    </aside>
  );
}
