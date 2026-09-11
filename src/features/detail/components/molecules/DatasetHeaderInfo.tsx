'use client';

import React, { useState } from 'react';
import {
  Building2,
  RefreshCw,
  Award,
  Download,
  Eye,
  Star,
  MapPin,
  FileCode2,
  FileJson,
  FileSpreadsheet,
  ChevronDown,
  DownloadCloud,
  FileText,
  Calendar,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { DatasetItem } from '@/features/catalog/types/catalog.types';
import { CategoryTag } from '@/features/catalog/components/atoms/CategoryTag';
import { DetailMetaItem } from '../atoms/DetailMetaItem';
import { DownloadButton } from '../atoms/DownloadButton';
import { formatDate, formatNumber } from '@/shared/utils/formatters';
import { triggerDownloadMetadata } from '../../utils/exportHelpers';

interface DatasetHeaderInfoProps {
  dataset: DatasetItem;
  onOpenMetadataModal?: () => void;
}

export function DatasetHeaderInfo({
  dataset,
  onOpenMetadataModal,
}: DatasetHeaderInfoProps) {
  const [downloadMetaMenuOpen, setDownloadMetaMenuOpen] = useState(false);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 1. Hero Information Block */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
        {/* Top Badges & Public Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            <CategoryTag category={dataset.category} size="md" />
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Dipublikasikan: {formatDate(dataset.publishDate)}</span>
            </div>
            <span className="hidden sm:inline text-xs text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Pembaruan: {formatDate(dataset.updateDate)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-600 font-semibold bg-slate-50/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-slate-200/80 self-start sm:self-auto">
            <div className="flex items-center gap-1.5" title="Jumlah total berkas diunduh">
              <Download className="w-3.5 h-3.5 text-[#A32A29]" />
              <span>{formatNumber(dataset.downloadCount)} Unduhan</span>
            </div>
            <span className="text-slate-200">|</span>
            <div className="flex items-center gap-1.5" title="Jumlah tayangan dataset">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              <span>{formatNumber(dataset.viewCount)} Dilihat</span>
            </div>
            <span className="text-slate-200">|</span>
            <div className="flex items-center gap-1 text-amber-600 font-bold" title="Penilaian dataset">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{dataset.rating}</span>
            </div>
          </div>
        </div>

        {/* Dataset Title & Description */}
        <div className="space-y-3.5">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight max-w-5xl">
            {dataset.title}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl font-normal">
            {dataset.fullDescription || dataset.description}
          </p>
        </div>

        {/* Tags / Keywords as clean pills */}
        {dataset.tags && dataset.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-semibold text-slate-400 mr-1">Kata Kunci:</span>
            {dataset.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-full bg-slate-100/80 text-slate-600 font-medium hover:bg-slate-200/80 transition-colors cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 2. Action Center: Segmented Unduh Dataset & Akses Metadata */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Kolom Kiri: Unduh Berkas Dataset Utama */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
                  <DownloadCloud className="w-4 h-4 text-[#A32A29]" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Unduh Berkas Dataset
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Pilih format data terbuka berlisensi resmi untuk diunduh dan diolah:
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
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

          {/* Kolom Kanan: Akses & Unduh Metadata SDI */}
          <div className="lg:col-span-5 lg:border-l lg:border-slate-100 lg:pl-8 pt-6 lg:pt-0 border-t lg:border-t-0 border-slate-100 flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
                  <FileCode2 className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Metadata & Kamus Data
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Dokumentasi struktur variabel & standar Satu Data Indonesia:
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              {/* Tombol Lihat Metadata (Buka Modal) */}
              {onOpenMetadataModal && (
                <button
                  type="button"
                  onClick={onOpenMetadataModal}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs sm:text-sm font-bold shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Lihat Metadata</span>
                </button>
              )}

              {/* Tombol Unduh Metadata (Dropdown JSON & CSV) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDownloadMetaMenuOpen(!downloadMetaMenuOpen)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs sm:text-sm font-bold shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-slate-500" />
                  <span>Unduh Meta</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                      downloadMetaMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {downloadMetaMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setDownloadMetaMenuOpen(false)}
                    />
                    <div className="absolute right-0 sm:right-auto sm:left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-40 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3.5 py-1.5 border-b border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Format Metadata Tersedia
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          triggerDownloadMetadata(dataset, 'JSON');
                          setDownloadMetaMenuOpen(false);
                        }}
                        className="w-full px-3.5 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#A32A29] flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <FileJson className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <span className="block font-bold">Metadata (JSON)</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            Standar SDI / Schema.org
                          </span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          triggerDownloadMetadata(dataset, 'CSV');
                          setDownloadMetaMenuOpen(false);
                        }}
                        className="w-full px-3.5 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-rose-50 hover:text-[#A32A29] flex items-center gap-2.5 transition-colors cursor-pointer"
                      >
                        <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <span className="block font-bold">Kamus Data (CSV)</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            Daftar nama kolom, tipe & unit
                          </span>
                        </div>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Key Attributes Segment / Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          label="Cakupan Wilayah"
          value={dataset.coverageArea || 'Nasional (38 Provinsi)'}
        />
        <DetailMetaItem
          icon={<Award className="w-4 h-4" />}
          label="Lisensi Data"
          value={dataset.license}
        />
      </div>
    </div>
  );
}



