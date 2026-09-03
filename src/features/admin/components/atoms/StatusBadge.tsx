import React from 'react';
import { DatasetStatus, PermohonanStatus } from '../../types/admin.types';

interface StatusBadgeProps {
  status: DatasetStatus | PermohonanStatus;
  size?: 'sm' | 'md';
  className?: string;
}

export function StatusBadge({ status, size = 'sm', className = '' }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'published':
        return { label: 'Terpublikasi', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'draft':
        return { label: 'Draft', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
      case 'archived':
        return { label: 'Diarsipkan', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'pending':
        return { label: 'Menunggu Review', bg: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'processing':
        return { label: 'Sedang Diproses', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'approved':
        return { label: 'Disetujui', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      case 'rejected':
        return { label: 'Ditolak', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
      default:
        return { label: status, bg: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const { label, bg } = getStatusConfig();
  const sizeClass = size === 'sm' ? 'text-[11px] px-3 py-1' : 'text-xs px-3.5 py-1.5 font-bold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-bold ${bg} ${sizeClass} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span>{label}</span>
    </span>
  );
}
