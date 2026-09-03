import React from 'react';
import {
  Building2,
  RefreshCw,
  Award,
  Download,
  Eye,
  Star,
  MapPin,
} from 'lucide-react';
import { DatasetItem } from '@/features/catalog/types/catalog.types';
import { CategoryTag } from '@/features/catalog/components/atoms/CategoryTag';
import { DetailMetaItem } from '../atoms/DetailMetaItem';
import { DownloadButton } from '../atoms/DownloadButton';
import { formatDate, formatNumber } from '@/shared/utils/formatters';

interface DatasetHeaderInfoProps {
  dataset: DatasetItem;
}

export function DatasetHeaderInfo({ dataset }: DatasetHeaderInfoProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
      {/* Top Tag & Stats */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CategoryTag category={dataset.category} size="md" />
          <span className="text-xs text-slate-400 font-medium">
            Dipublikasikan: {formatDate(dataset.publishDate)}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
          <div className="flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5 text-[#A32A29]" />
            <span>{formatNumber(dataset.downloadCount)} Unduhan</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatNumber(dataset.viewCount)} Dilihat</span>
          </div>
          <div className="flex items-center gap-1 text-amber-600 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{dataset.rating}</span>
          </div>
        </div>
      </div>

      {/* Dataset Title & Description */}
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
          {dataset.title}
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
          {dataset.fullDescription || dataset.description}
        </p>
      </div>

      {/* Quick Download Section */}
      <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#A32A29]">
            Unduh Dataset Terbuka
          </h4>
          <p className="text-xs text-slate-600 mt-0.5">
            Tersedia dalam format standar untuk kemudahan pengolahan data Anda.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {dataset.formats.map((fmt) => (
            <DownloadButton
              key={fmt}
              dataset={dataset}
              format={fmt}
              variant="primary"
            />
          ))}
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        <DetailMetaItem
          icon={<Building2 className="w-4 h-4" />}
          label="Instansi Penerbit"
          value={dataset.publisher}
        />
        <DetailMetaItem
          icon={<RefreshCw className="w-4 h-4" />}
          label="Pembaruan"
          value={dataset.updateFrequency}
        />
        <DetailMetaItem
          icon={<MapPin className="w-4 h-4" />}
          label="Cakupan"
          value={dataset.coverageArea || 'Nasional'}
        />
        <DetailMetaItem
          icon={<Award className="w-4 h-4" />}
          label="Lisensi Data"
          value={dataset.license}
        />
      </div>

      {/* Tags */}
      {dataset.tags && dataset.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-400 mr-1">Tag:</span>
          {dataset.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
