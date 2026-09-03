'use client';

import React, { useState } from 'react';
import { Download, Check, Loader2 } from 'lucide-react';
import { FileFormat } from '@/shared/types/common.types';
import { DatasetItem } from '@/features/catalog/types/catalog.types';
import { triggerDownloadDataset } from '../../utils/exportHelpers';

interface DownloadButtonProps {
  dataset: DatasetItem;
  format: FileFormat;
  variant?: 'primary' | 'outline' | 'compact';
  className?: string;
}

export function DownloadButton({
  dataset,
  format,
  variant = 'primary',
  className = '',
}: DownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      triggerDownloadDataset(dataset, format);
      setDownloading(false);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }, 600);
  };

  const getFormatBadgeColor = () => {
    switch (format) {
      case 'CSV':
        return 'bg-blue-600 text-white';
      case 'JSON':
        return 'bg-amber-600 text-white';
      case 'XLS':
        return 'bg-emerald-600 text-white';
    }
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer ${className}`}
      >
        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${getFormatBadgeColor()}`}>
          {format}
        </span>
        {downloading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#A32A29]" />
        ) : downloaded ? (
          <Check className="w-3.5 h-3.5 text-emerald-600" />
        ) : (
          <Download className="w-3.5 h-3.5 text-slate-500" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloading}
      className={`inline-flex items-center justify-between gap-3 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 shadow-xs cursor-pointer ${
        variant === 'primary'
          ? 'bg-[#A32A29] hover:bg-[#881E1D] text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]'
          : 'border border-[#A32A29] text-[#A32A29] hover:bg-rose-50'
      } ${className}`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
            variant === 'primary' ? 'bg-white/20 text-white' : getFormatBadgeColor()
          }`}
        >
          {format}
        </span>
        <span>Unduh Data</span>
      </div>
      {downloading ? (
        <Loader2 className="w-4 h-4 animate-spin text-white" />
      ) : downloaded ? (
        <Check className="w-4 h-4 text-emerald-300" />
      ) : (
        <Download className="w-4 h-4 shrink-0" />
      )}
    </button>
  );
}
