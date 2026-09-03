import React from 'react';
import { FileText, Code2, Sheet, Check } from 'lucide-react';
import { FileFormat } from '@/shared/types/common.types';

interface FormatFilterListProps {
  selectedFormats: FileFormat[];
  onToggleFormat: (format: FileFormat) => void;
}

export function FormatFilterList({
  selectedFormats,
  onToggleFormat,
}: FormatFilterListProps) {
  const formats: { format: FileFormat; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      format: 'CSV',
      label: 'CSV (Comma-Separated)',
      icon: <FileText className="w-4 h-4" />,
      desc: 'Tabel data tabular standar',
    },
    {
      format: 'JSON',
      label: 'JSON (Object Tree)',
      icon: <Code2 className="w-4 h-4" />,
      desc: 'Format API & developer',
    },
    {
      format: 'XLS',
      label: 'XLS / Excel',
      icon: <Sheet className="w-4 h-4" />,
      desc: 'Spreadsheet analisis',
    },
  ];

  return (
    <div className="space-y-1.5 pt-3 border-t border-white/20">
      <div className="text-[11px] font-bold uppercase tracking-wider text-white/70 px-3 pb-1">
        Tipe Format Data
      </div>
      {formats.map(({ format, label, icon }) => {
        const isSelected = selectedFormats.includes(format);

        return (
          <button
            key={format}
            type="button"
            onClick={() => onToggleFormat(format)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
              isSelected
                ? 'bg-white/25 text-white font-bold border border-white/40'
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={isSelected ? 'text-white' : 'text-white/70'}>{icon}</span>
              <span>{format}</span>
            </div>
            <div
              className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                isSelected
                  ? 'bg-white text-[#A32A29] border-white'
                  : 'border-white/40 bg-white/10'
              }`}
            >
              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
