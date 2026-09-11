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
  Search,
  CheckCircle2,
  Layers,
  Sparkles,
  Eye,
  Code2,
  ExternalLink,
  Globe2,
  Mail,
  Clock,
  Download,
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
type JsonViewMode = 'visual' | 'raw';

export function MetadataViewerModal({
  isOpen,
  onClose,
  dataset,
}: MetadataViewerModalProps) {
  const [activeTab, setActiveTab] = useState<ModalTab>('sdi');
  const [jsonViewMode, setJsonViewMode] = useState<JsonViewMode>('visual');
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredColumns = dataset.columns.filter((col) => {
    const term = searchTerm.toLowerCase();
    return (
      col.name.toLowerCase().includes(term) ||
      col.description.toLowerCase().includes(term) ||
      col.type.toLowerCase().includes(term) ||
      (col.unit && col.unit.toLowerCase().includes(term))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 sm:px-8 sm:py-6 bg-[#A32A29] text-white flex items-start justify-between gap-4 shrink-0 shadow-xs">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                Standar Satu Data Indonesia (SDI)
              </span>
              <span className="text-[11px] font-mono text-white/80 bg-black/20 px-2 py-0.5 rounded-full">
                ID: {dataset.id}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
              Metadata & Kamus Data Terbuka
            </h2>
            <p className="text-xs sm:text-sm text-white/90 line-clamp-1 max-w-2xl font-normal">
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

        {/* Solid Segmented Control Tab Navigation (No bleed-through) */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 sm:px-8 py-2.5 shrink-0">
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl w-full sm:w-auto sm:inline-flex">
            <button
              type="button"
              onClick={() => setActiveTab('sdi')}
              className={`flex-1 sm:flex-initial py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'sdi'
                  ? 'bg-white text-[#A32A29] shadow-xs ring-1 ring-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Spesifikasi & Tata Kelola</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dictionary')}
              className={`flex-1 sm:flex-initial py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'dictionary'
                  ? 'bg-white text-[#A32A29] shadow-xs ring-1 ring-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Hash className="w-4 h-4" />
              <span>Kamus Variabel ({dataset.columns.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('json')}
              className={`flex-1 sm:flex-initial py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === 'json'
                  ? 'bg-white text-[#A32A29] shadow-xs ring-1 ring-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <FileJson className="w-4 h-4" />
              <span>JSON Schema / Raw</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-slate-50/50">
          {/* TAB 1: Spesifikasi & Tata Kelola SDI */}
          {activeTab === 'sdi' && (
            <div className="space-y-6">
              {/* Sekilas Informasi */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A32A29] block">
                  Deskripsi & Metodologi
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {dataset.fullDescription || dataset.description}
                </p>
              </div>

              {/* Grid Atribut Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 border border-slate-200/60">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Instansi Produsen Data
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                      {dataset.publisher}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      Unit Pengampu: {dataset.kedeputianName}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 border border-slate-200/60">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Walidata / PIC Teknis
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                      {dataset.contactPoint?.name || 'Walidata Kemenko PMK'}
                    </span>
                    <span className="text-xs font-mono text-slate-500 block">
                      {dataset.contactPoint?.email || 'data@kemenkopmk.go.id'}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 border border-slate-200/60">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Temporal & Frekuensi
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                      Tahun {dataset.timePeriod || '2026'} ({dataset.updateFrequency})
                    </span>
                    <span className="text-xs text-slate-500 block">
                      Dirilis: {formatDate(dataset.publishDate)}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 border border-slate-200/60">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Cakupan Spasial
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                      {dataset.coverageArea || 'Nasional (38 Provinsi)'}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      {dataset.spatialResolution || 'Tingkat Provinsi / Kabupaten'}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex items-start gap-3.5 sm:col-span-2">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 border border-slate-200/60">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Lisensi & Standar Interoperabilitas
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                      {dataset.license}
                    </span>
                    <span className="text-xs text-slate-500 block">
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari nama kolom / variabel..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#A32A29] focus:bg-white transition-colors"
                  />
                </div>
                <div className="text-xs font-semibold text-slate-500 shrink-0 px-2">
                  Menampilkan {filteredColumns.length} dari {dataset.columns.length} kolom
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-700 font-extrabold uppercase text-[10px] tracking-wider">
                      <th className="py-3 px-3.5">Nama Kolom</th>
                      <th className="py-3 px-3.5">Tipe Data</th>
                      <th className="py-3 px-3.5">Satuan</th>
                      <th className="py-3 px-3.5">Deskripsi Variabel</th>
                      <th className="py-3 px-3.5">Contoh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredColumns.length > 0 ? (
                      filteredColumns.map((col, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-3.5 font-mono font-bold text-[#A32A29] whitespace-nowrap">
                            {col.name}
                          </td>
                          <td className="py-3 px-3.5 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold border border-slate-200">
                              {col.type}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 text-slate-600 font-medium whitespace-nowrap">
                            {col.unit ? (
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-mono">
                                {col.unit}
                              </span>
                            ) : (
                              <span className="text-slate-300">-</span>
                            )}
                          </td>
                          <td className="py-3 px-3.5 text-slate-600 leading-relaxed min-w-[200px]">
                            {col.description}
                          </td>
                          <td className="py-3 px-3.5 font-mono text-slate-500 whitespace-nowrap">
                            {String(col.sample)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-xs text-slate-400">
                          Tidak ada kolom yang cocok dengan pencarian &ldquo;{searchTerm}&rdquo;
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: JSON Schema / Raw */}
          {activeTab === 'json' && (
            <div className="space-y-4">
              {/* Header Bar with Sub-view Switcher & Copy */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-2xs">
                {/* Segmented Sub-view switch */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setJsonViewMode('visual')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      jsonViewMode === 'visual'
                        ? 'bg-white text-[#A32A29] shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Tampilan Terstruktur</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setJsonViewMode('raw')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      jsonViewMode === 'raw'
                        ? 'bg-white text-[#A32A29] shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Kode JSON (Schema.org)</span>
                  </button>
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyJson}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-xs font-bold text-slate-700 transition-colors shadow-2xs hover:shadow-xs active:scale-[0.98] cursor-pointer self-start sm:self-auto"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Tersalin ke Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Salin JSON Lengkap</span>
                    </>
                  )}
                </button>
              </div>

              {/* View 1: Visual Schema Breakdown (Low Cognitive Load) */}
              {jsonViewMode === 'visual' && (
                <div className="space-y-4">
                  {/* Identitas Schema */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      <Globe2 className="w-4 h-4 text-slate-500" />
                      <span>Identitas Schema.org / DCAT-AP</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">@context</span>
                        <span className="font-mono text-slate-800 font-semibold">{metadataJson['@context']}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">@type / identifier</span>
                        <span className="font-mono text-slate-800 font-semibold">{metadataJson['@type']} ({metadataJson.identifier})</span>
                      </div>
                    </div>
                  </div>

                  {/* Organisasi & Walidata */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Organisasi Produsen (@organization)
                      </span>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {metadataJson.organization.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {metadataJson.organization.kedeputian}
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Narahubung Walidata (@contactPoint)
                      </span>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {metadataJson.contactPoint.name}
                      </div>
                      <div className="text-xs font-mono text-slate-500">
                        {metadataJson.contactPoint.email}
                      </div>
                    </div>
                  </div>

                  {/* Format Distribusi */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Distribusi Berkas Unduhan (@distribution)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {metadataJson.distribution.map((dist, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-slate-800 border border-slate-200 inline-block">
                            {dist.encodingFormat}
                          </span>
                          <span className="block text-[11px] text-slate-600 font-mono truncate">
                            {dist.contentUrl}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* View 2: Formatted Clean JSON Code Block */}
              {jsonViewMode === 'raw' && (
                <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs font-mono text-slate-400">
                    <span>schema_dcat_ap.json</span>
                    <span className="text-[11px] text-slate-500">{formattedJson.split('\n').length} baris kode</span>
                  </div>
                  <div className="p-4 max-h-[380px] overflow-auto font-mono text-xs text-slate-200 leading-relaxed">
                    <pre className="whitespace-pre overflow-x-auto text-emerald-400">
                      {formattedJson}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer with Direct Downloads */}
        <div className="px-6 py-4 sm:px-8 sm:py-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Unduh metadata dalam format:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => triggerDownloadMetadata(dataset, 'JSON')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              <FileJson className="w-4 h-4 text-slate-500" />
              <span>Metadata (JSON)</span>
            </button>

            <button
              type="button"
              onClick={() => triggerDownloadMetadata(dataset, 'CSV')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-slate-500" />
              <span>Kamus Data (CSV)</span>
            </button>

            <button
              type="button"
              onClick={() => triggerDownloadMetadata(dataset, 'MD')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Dokumen (MD)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#A32A29] hover:bg-[#881E1D] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow active:scale-[0.98] transition-all cursor-pointer"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

