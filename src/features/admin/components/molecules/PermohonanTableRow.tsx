import React from 'react';
import { Eye, Clock, Mail, Building } from 'lucide-react';
import { PermohonanDataItem } from '../../types/admin.types';
import { StatusBadge } from '../atoms/StatusBadge';
import { formatDate } from '@/shared/utils/formatters';

interface PermohonanTableRowProps {
  item: PermohonanDataItem;
  onOpenDetail: (item: PermohonanDataItem) => void;
}

export function PermohonanTableRow({ item, onOpenDetail }: PermohonanTableRowProps) {
  return (
    <tr className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 text-xs sm:text-sm">
      {/* Ticket ID & Date */}
      <td className="py-4 px-4">
        <div className="space-y-1">
          <span className="font-mono font-bold text-[#A32A29] text-xs">
            {item.ticketId}
          </span>
          <div className="text-[11px] text-slate-400">
            {formatDate(item.createdAt)}
          </div>
        </div>
      </td>

      {/* Pemohon & Lembaga */}
      <td className="py-4 px-4 max-w-xs">
        <div className="space-y-0.5">
          <div className="font-bold text-slate-900 truncate">
            {item.namaLengkap}
          </div>
          <div className="text-xs text-slate-500 truncate">
            {item.lembaga || 'Perorangan'}
          </div>
        </div>
      </td>

      {/* Dataset Requested */}
      <td className="py-4 px-4 max-w-sm">
        <div className="space-y-0.5">
          <div className="font-semibold text-slate-800 line-clamp-1">
            {item.judulData}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="text-slate-600">{item.kategoriData}</span>
            <span>•</span>
            <span className="font-bold uppercase text-[#A32A29]">Format: {item.formatDibutuhkan}</span>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="py-4 px-4">
        <StatusBadge status={item.status} />
      </td>

      {/* Actions */}
      <td className="py-4 px-4 text-right">
        <button
          type="button"
          onClick={() => onOpenDetail(item)}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-[#A32A29] hover:text-white text-slate-700 text-xs font-bold transition-all duration-150 cursor-pointer shadow-2xs"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Review</span>
        </button>
      </td>
    </tr>
  );
}
