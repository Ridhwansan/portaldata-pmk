import React from 'react';
import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { DatasetItem } from '../../types/catalog.types';
import { CategoryTag } from '../atoms/CategoryTag';
import { FormatPill } from '../atoms/FormatPill';
import { formatDate } from '@/shared/utils/formatters';

interface DatasetCardProps {
  dataset: DatasetItem;
}

export function DatasetCard({ dataset }: DatasetCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-md hover:border-[#A32A29]/50 transition-all duration-200 flex flex-col justify-between group">
      <div className="space-y-4">
        {/* Top: Category Tag & Date */}
        <div className="flex items-center justify-between gap-2">
          <CategoryTag category={dataset.category} size="sm" />
          <span className="text-slate-400 text-xs font-medium">
            {formatDate(dataset.publishDate)}
          </span>
        </div>

        {/* Title (Without description as requested) */}
        <Link href={`/dataset/${dataset.id}`}>
          <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-[#A32A29] transition-colors line-clamp-2">
            {dataset.title}
          </h3>
        </Link>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
        {/* Publisher & Formats */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium truncate">
            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{dataset.publisherCode || dataset.publisher}</span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {dataset.formats.map((fmt) => (
              <FormatPill key={fmt} format={fmt} size="sm" />
            ))}
          </div>
        </div>

        {/* Action Button: Lihat Detail */}
        <Link
          href={`/dataset/${dataset.id}`}
          className="w-full py-3 px-4 rounded-full border border-[#A32A29] text-[#A32A29] font-bold text-xs sm:text-sm text-center flex items-center justify-center hover:bg-[#A32A29] hover:text-white transition-all duration-200 active:scale-[0.99] cursor-pointer shadow-2xs"
        >
          <span>Lihat Detail</span>
        </Link>
      </div>
    </div>
  );
}
