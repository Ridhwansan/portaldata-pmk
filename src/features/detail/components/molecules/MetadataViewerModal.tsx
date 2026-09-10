'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  FileJson,
  FileSpreadsheet,
  FileText,
  Copy,
  Check,
  Building2,
  Calendar,
  MapPin,
  Award,
  ShieldCheck,
  UserCheck,
  Hash,
  BookOpen,
} from 'lucide-react';
import { DatasetItem } from '@/features/catalog/types/catalog.types';
import { formatDate } from '@/shared/utils/formatters';
import {
  getStructuredMetadata,
  triggerDownloadMetadata,
} from '../../utils/exportHelpers';

interface MetadataViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataset: DatasetItem;
}

type ModalTab = 'sdi' | 'dictionary' | 'json';

export function MetadataViewerModal({
  isOpen,
  onClose,
  dataset,
}: MetadataViewerModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>('sdi');
  const [copied, setCopied] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const metadataJson = getStructuredMetadata(dataset);
  const formattedJson = JSON.stringify(metadataJson, null, 2);

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 bg-linear-to-r from-slate-900 via-[#881E1D] to-[#A32A29] text-white flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                Standar Satu Data Indonesia (SDI)
              </span>
              <span className="text-[11px] font-mono text-white/70">
                ID: {dataset.id}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              Metadata & Kamus Data Terbuka
            </h2>
            <p className="text-xs sm:text-sm text-white/80 line-clamp-1 max-w-2xl font-medium">
              {dataset.title}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 sm:px-8 gap-2 sm:gap-6 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('sdi')}
            className={`py-3.5 px-3 border-b-2 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'sdi'
                ? 'border-[#A32A29] text-[#A32A29] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Spesifikasi & Tata Kelola</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('dictionary')}
            className={`py-3.5 px-3 border-b-2 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'dictionary'
                ? 'border-[#A32A29] text-[#A32A29] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Hash className="w-4 h-4" />
            <span>Kamus Variabel ({dataset.columns.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`py-3.5 px-3 border-b-2 text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'json'
                ? 'border-[#A32A29] text-[#A32A29] bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileJson className="w-4 h-4" />
            <span>JSON Schema / Raw</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-slate-50/40">
          {/* TAB 1: Spesifikasi & Tata Kelola SDI */}
          {activeTab === 'sdi' && (
            <div className="space-y-6">
              {/* Sekilas Informasi */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A32A29]">
                  Deskripsi & Metodologi
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {dataset.fullDescription || dataset.description}
                </p>
              </div>

              {/* Grid Atribut Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-rose-50 text-[#A32A29] shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Produsen Data
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">
                      {dataset.publisher}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {dataset.kedeputianName}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-rose-50 text-[#A32A29] shrink-0">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Walidata / PIC Teknis
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">
                      {dataset.contactPoint?.name || 'Walidata Kemenko PMK'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {dataset.contactPoint?.email || 'data@kemenkopmk.go.id'}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-700 shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Temporal & Frekuensi
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">
                      Tahun {dataset.timePeriod || '2026'} ({dataset.updateFrequency})
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Dirilis: {formatDate(dataset.publishDate)}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Cakupan Spasial
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">
                      {dataset.coverageArea || 'Nasional (38 Provinsi)'}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {dataset.spatialResolution || 'Tingkat Provinsi / Kabupaten'}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-start gap-3 sm:col-span-2">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-700 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Lisensi & Standar Interoperabilitas
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block mt-0.5">
                      {dataset.license}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      Standar Referensi: {dataset.standardReference || 'Prinsip Satu Data Indonesia (Perpres No. 39/2019)'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Kamus Variabel */}
          {activeTab === 'dictionary' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Daftar {dataset.columns.length} Variabel Kolom
                </span>
                <span className="text-[11px] text-slate-500">
                  Format baku kamus data Kemenko PMK
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-3.5">Nama Kolom</th>
                      <th className="py-3 px-3.5">Tipe Data</th>
                      <th className="py-3 px-3.5">Satuan</th>
                      <th className="py-3 px-3.5">Deskripsi Variabel</th>
                      <th className="py-3 px-3.5">Contoh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dataset.columns.map((col, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="py-3 px-3.5 font-mono font-bold text-[#A32A29]">
                          {col.name}
                        </td>
                        <td className="py-3 px-3.5">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold border border-slate-200">
                            {col.type}
                          </span>
                        </td>
                        <td className="py-3 px-3.5 text-slate-600 font-medium">
                          {col.unit || '-'}
                        </td>
                        <td className="py-3 px-3.5 text-slate-600 leading-relaxed">
                          {col.description}
                        </td>
                        <td className="py-3 px-3.5 font-mono text-slate-500">
                          {String(col.sample)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: JSON Schema */}
          {activeTab === 'json' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Schema.org / DCAT-AP Metadata Representation
                </span>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors shadow-2xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Salin JSON</span>
                    </>
                  )}
                </button>
              </div>

              <div className="bg-slate-900 rounded-2xl p-4 overflow-x-auto border border-slate-800">
                <pre className="text-[11px] sm:text-xs font-mono text-slate-200 leading-relaxed">
                  {formattedJson}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Direct Downloads */}
        <div className="px-6 py-4 sm:px-8 sm:py-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Unduh metadata dalam format:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => triggerDownloadMetadata(dataset, 'JSON')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <FileJson className="w-3.5 h-3.5 text-amber-600" />
              <span>Metadata (JSON)</span>
            </button>

            <button
              type="button"
              onClick={() => triggerDownloadMetadata(dataset, 'CSV')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Kamus Data (CSV)</span>
            </button>

            <button
              type="button"
              onClick={() => triggerDownloadMetadata(dataset, 'MD')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <span>Dokumen (MD)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#A32A29] hover:bg-[#881E1D] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
