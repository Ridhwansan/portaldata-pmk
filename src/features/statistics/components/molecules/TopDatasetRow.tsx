import React from 'react';
import Link from 'next/link';
import { Download, ArrowUpRight } from 'lucide-react';
import { TopDatasetStat } from '../../types/statistics.types';
import { formatNumber } from '@/shared/utils/formatters';

interface TopDatasetRowProps {
  rank: number;
  data: TopDatasetStat;
}

export function TopDatasetRow({ rank, data }: TopDatasetRowProps) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
      <div className="flex items-center gap-3.5 min-w-0">
        <span
          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
            rank === 1
              ? 'bg-amber-100 text-amber-800'
              : rank === 2
              ? 'bg-slate-200 text-slate-800'
              : rank === 3
              ? 'bg-amber-700/20 text-amber-900'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          #{rank}
        </span>

        <div className="min-w-0">
          <Link
            href={`/dataset/${data.id}`}
            className="text-xs sm:text-sm font-bold text-slate-900 hover:text-[#A32A29] line-clamp-1 transition-colors"
          >
            {data.title}
          </Link>
          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
            <span>{data.publisher}</span>
            <span>•</span>
            <span className="text-[#A32A29] font-medium">{data.category}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 pl-3">
        <div className="text-right">
          <span className="block text-xs sm:text-sm font-extrabold text-slate-900">
            {formatNumber(data.downloads)}
          </span>
          <span className="text-[10px] text-slate-400">Unduhan</span>
        </div>
      </div>
    </div>
  );
}
