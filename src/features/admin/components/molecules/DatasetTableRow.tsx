import React from 'react';
import Link from 'next/link';
import { Edit3, Trash2, ExternalLink, Eye, Download } from 'lucide-react';
import { AdminDatasetItem } from '../../types/admin.types';
import { StatusBadge } from '../atoms/StatusBadge';
import { FormatPill } from '@/features/catalog/components/atoms/FormatPill';
import { formatDate, formatNumber } from '@/shared/utils/formatters';

interface DatasetTableRowProps {
  dataset: AdminDatasetItem;
  onDelete: (id: string) => void;
}

export function DatasetTableRow({ dataset, onDelete }: DatasetTableRowProps) {
  return (
    <tr className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 text-xs sm:text-sm">
      {/* Dataset Name & Meta */}
      <td className="py-4 px-4 max-w-sm">
        <div className="space-y-1">
          <Link
            href={`/admin/datasets/${dataset.id}/edit`}
            className="font-bold text-slate-900 hover:text-[#A32A29] line-clamp-2 transition-colors"
          >
            {dataset.title}
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-600">{dataset.category}</span>
            <span>•</span>
            <span>Update: {formatDate(dataset.updateDate)}</span>
            {dataset.fileSize && (
              <>
                <span>•</span>
                <span>{dataset.fileSize}</span>
              </>
            )}
          </div>
        </div>
      </td>

      {/* Publisher */}
      <td className="py-4 px-4 text-slate-600 hidden md:table-cell">
        <div className="font-medium text-xs truncate max-w-[180px]">
          {dataset.publisher}
        </div>
      </td>

      {/* Formats */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-1">
          {dataset.formats.map((fmt) => (
            <FormatPill key={fmt} format={fmt} size="sm" />
          ))}
        </div>
      </td>

      {/* Status */}
      <td className="py-4 px-4">
        <StatusBadge status={dataset.status} />
      </td>

      {/* Downloads / Views */}
      <td className="py-4 px-4 hidden lg:table-cell text-slate-500 font-mono text-xs">
        <div className="flex flex-col">
          <span className="font-bold text-slate-800">
            {formatNumber(dataset.downloadCount)} unduhan
          </span>
          <span className="text-[10px] text-slate-400">
            {formatNumber(dataset.viewCount)} dilihat
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="py-4 px-4 text-right">
        <div className="flex items-center justify-end gap-1.5">
          <Link
            href={`/dataset/${dataset.id}`}
            target="_blank"
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Lihat Pratinjau Publik"
          >
            <ExternalLink className="w-4 h-4" />
          </Link>

          <Link
            href={`/admin/datasets/${dataset.id}/edit`}
            className="p-2 rounded-full text-slate-600 hover:text-[#A32A29] hover:bg-rose-50 transition-colors"
            title="Edit Dataset"
          >
            <Edit3 className="w-4 h-4" />
          </Link>

          <button
            type="button"
            onClick={() => onDelete(dataset.id)}
            className="p-2 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Hapus Dataset"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
