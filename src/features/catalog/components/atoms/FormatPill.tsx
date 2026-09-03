import React from 'react';
import { FileFormat } from '@/shared/types/common.types';

interface FormatPillProps {
  format: FileFormat;
  size?: 'sm' | 'md';
  active?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

export function FormatPill({
  format,
  size = 'sm',
  active = false,
  onClick,
  interactive = false,
}: FormatPillProps) {
  const getFormatStyle = () => {
    switch (format) {
      case 'CSV':
        return active
          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100';
      case 'JSON':
        return active
          ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100';
      case 'XLS':
        return active
          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const sizeClasses =
    size === 'sm' ? 'text-[11px] px-2 py-0.5 font-semibold' : 'text-xs px-3 py-1 font-bold';

  if (interactive) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center justify-center rounded uppercase tracking-wider border transition-colors cursor-pointer ${sizeClasses} ${getFormatStyle()}`}
      >
        {format}
      </button>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded uppercase tracking-wider border transition-colors ${sizeClasses} ${getFormatStyle()}`}
    >
      {format}
    </span>
  );
}
