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
  CheckCircle2,
  Mail,
  Layers,
  Clock,
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
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
              <ShieldCheck className="w-5 h-5 text-[#A32A29]" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
              Spesifikasi Teknis & Tata Kelola Satu Data
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Standar interoperabilitas, metadata terstruktur, dan tata kelola walidata resmi sesuai prinsip Satu Data Indonesia (Perpres No. 39/2019).
          </p>
        </div>

        {onOpenModal && (
          <button
            type="button"
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 px-4 py-2.5 rounded-full border border-slate-300 shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all cursor-pointer self-start sm:self-auto shrink-0"
          >
            <FileCode2 className="w-4 h-4 text-slate-500" />
            <span>Lihat Schema Lengkap</span>
          </button>
        )}
      </div>

      {/* 2 Semantic Groups Grid with consistent neutral styling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Panel 1: Tata Kelola & Produsen */}
        <div className="bg-slate-50/60 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              Tata Kelola & Produsen Data
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
              Instansi Resmi
            </span>
          </div>

          <div className="space-y-4">
            {/* Produsen */}
            <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-slate-200/70 shadow-2xs">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 border border-slate-200/60">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Instansi Produsen Data
                </span>
                <span className="text-sm font-extrabold text-slate-900 block">
                  {dataset.publisher}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                  {dataset.kedeputianName}
                </span>
              </div>
            </div>

            {/* Walidata */}
            <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-slate-200/70 shadow-2xs">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 border border-slate-200/60">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Walidata / PIC Teknis
                </span>
                <span className="text-sm font-extrabold text-slate-900 block">
                  {dataset.contactPoint?.name || 'Walidata Kemenko PMK'}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{dataset.contactPoint?.email || 'data@kemenkopmk.go.id'}</span>
                </div>
              </div>
            </div>

            {/* Lisensi */}
            <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-slate-200/70 shadow-2xs">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 border border-slate-200/60">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Lisensi & Hak Distribusi
                </span>
                <span className="text-sm font-extrabold text-slate-900 block">
                  {dataset.license}
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Bebas digunakan kembali untuk riset, analisis, dan publikasi dengan atribusi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Cakupan & Standarisasi SDI */}
        <div className="bg-slate-50/60 rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/70">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              Cakupan, Temporal & Standarisasi
            </span>
            <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
              Prinsip SDI
            </span>
          </div>

          <div className="space-y-4">
            {/* Cakupan Spasial */}
            <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-slate-200/70 shadow-2xs">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 border border-slate-200/60">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Cakupan Wilayah (Spatial Coverage)
                </span>
                <span className="text-sm font-extrabold text-slate-900 block">
                  {dataset.coverageArea || 'Nasional (38 Provinsi)'}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-medium">
                  Resolusi: {dataset.spatialResolution || 'Tingkat Provinsi & Kabupaten/Kota'}
                </span>
              </div>
            </div>

            {/* Periode & Pembaruan */}
            <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-slate-200/70 shadow-2xs">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 border border-slate-200/60">
                <Clock className="w-4 h-4" />
              </div>
              <div className="min-w-0 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Periode & Riwayat Pembaruan
                </span>
                <span className="text-sm font-extrabold text-slate-900 block">
                  Tahun {dataset.timePeriod || '2026'} ({dataset.updateFrequency})
                </span>
                <div className="text-xs text-slate-500">
                  Diperbarui: <span className="font-semibold text-slate-700">{formatDate(dataset.updateDate)}</span>
                  {' • '}
                  Rilis: <span className="font-semibold text-slate-700">{formatDate(dataset.publishDate)}</span>
                </div>
              </div>
            </div>

            {/* Standar & Format */}
            <div className="flex items-start gap-3.5 bg-white p-4 rounded-xl border border-slate-200/70 shadow-2xs">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 border border-slate-200/60">
                <Globe2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Standar Data & Format Distribusi
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                  {dataset.standardReference || 'Prinsip Satu Data Indonesia (Perpres No. 39/2019)'}
                </span>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="text-[11px] text-slate-400 font-medium">Format:</span>
                  {dataset.formats.map((fmt) => (
                    <span
                      key={fmt}
                      className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

