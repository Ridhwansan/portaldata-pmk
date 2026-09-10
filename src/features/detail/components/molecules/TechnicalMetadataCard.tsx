import React from 'react';
import {
  Building2,
  Calendar,
  MapPin,
  Award,
  ShieldCheck,
  UserCheck,
  Globe2,
  FileCode2,
} from 'lucide-react';
import { DatasetItem } from '@/features/catalog/types/catalog.types';
import { formatDate } from '@/shared/utils/formatters';

interface TechnicalMetadataCardProps {
  dataset: DatasetItem;
  onOpenModal?: () => void;
}

export function TechnicalMetadataCard({
  dataset,
  onOpenModal,
}: TechnicalMetadataCardProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#A32A29]" />
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
              Spesifikasi Teknis & Tata Kelola Satu Data
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Standar interoperabilitas dan transparansi metadata sesuai prinsip Satu Data Indonesia.
          </p>
        </div>

        {onOpenModal && (
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A32A29] hover:text-[#881E1D] bg-rose-50 hover:bg-rose-100/80 px-3.5 py-2 rounded-xl transition-colors cursor-pointer self-start sm:self-auto shrink-0"
          >
            <FileCode2 className="w-4 h-4" />
            <span>Lihat Schema Lengkap</span>
          </button>
        )}
      </div>

      {/* 2-Column Spacious Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {/* Left Column: Data Governance */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Tata Kelola & Produsen
          </h4>

          <div className="space-y-3.5">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
              <Building2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Instansi Produsen Data
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                  {dataset.publisher}
                </span>
                <span className="text-xs text-slate-500 block">
                  Unit Pengampu: {dataset.kedeputianName}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
              <UserCheck className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Walidata / PIC Teknis
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                  {dataset.contactPoint?.name || 'Walidata Kemenko PMK'}
                </span>
                <span className="text-xs font-mono text-slate-500 block">
                  {dataset.contactPoint?.email || 'data@kemenkopmk.go.id'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
              <Award className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Lisensi & Hak Cipta
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                  {dataset.license}
                </span>
                <span className="text-xs text-slate-500 block">
                  Bebas digunakan kembali untuk publikasi, analisis, dan penelitian dengan atribusi.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Spatio-Temporal & Standards */}
        <div className="space-y-4">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Cakupan & Standarisasi
          </h4>

          <div className="space-y-3.5">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
              <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Cakupan Wilayah (Spatial Coverage)
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                  {dataset.coverageArea || 'Nasional (38 Provinsi)'}
                </span>
                <span className="text-xs text-slate-500 block">
                  Resolusi: {dataset.spatialResolution || 'Tingkat Provinsi & Kabupaten/Kota'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
              <Calendar className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Periode & Riwayat Pembaruan
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                  Periode Data: {dataset.timePeriod || '2026'} ({dataset.updateFrequency})
                </span>
                <span className="text-xs text-slate-500 block">
                  Terakhir Diperbarui: {formatDate(dataset.updateDate)} (Rilis: {formatDate(dataset.publishDate)})
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100">
              <Globe2 className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <span className="text-[11px] font-semibold text-slate-400 block">
                  Standar Data & Interoperabilitas
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                  {dataset.standardReference || 'Prinsip Satu Data Indonesia (Perpres No. 39/2019)'}
                </span>
                <span className="text-xs text-slate-500 block">
                  Format Distribusi: {dataset.formats.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
