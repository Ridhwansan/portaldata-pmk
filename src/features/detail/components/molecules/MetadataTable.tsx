'use client';

import React, { useState } from 'react';
import {
  Database,
  Search,
  FileSpreadsheet,
  FileJson,
  Hash,
  Download,
} from 'lucide-react';
import { DatasetItem, DatasetMetadataColumn } from '@/features/catalog/types/catalog.types';
import { triggerDownloadMetadata } from '../../utils/exportHelpers';

interface MetadataTableProps {
  columns: DatasetMetadataColumn[];
  dataset?: DatasetItem;
}

export function MetadataTable({ columns, dataset }: MetadataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColumns = columns.filter((col) => {
    const term = searchTerm.toLowerCase();
    return (
      col.name.toLowerCase().includes(term) ||
      col.description.toLowerCase().includes(term) ||
      col.type.toLowerCase().includes(term) ||
      (col.unit && col.unit.toLowerCase().includes(term))
    );
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 lg:p-10 shadow-xs space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#A32A29]" />
            <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl">
              Kamus Data & Spesifikasi Variabel (Data Dictionary)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Penjelasan definisi teknis, tipe data, satuan pengukuran, dan format nilai setiap kolom.
          </p>
        </div>

        {/* Action Buttons: Download Kamus CSV & JSON */}
        {dataset && (
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => triggerDownloadMetadata(dataset, 'CSV')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all cursor-pointer"
              title="Unduh Kamus Data format CSV"
            >
              <FileSpreadsheet className="w-4 h-4 text-slate-500" />
              <span>Unduh Kamus (CSV)</span>
            </button>
            <button
              type="button"
              onClick={() => triggerDownloadMetadata(dataset, 'JSON')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all cursor-pointer"
              title="Unduh Metadata format JSON"
            >
              <FileJson className="w-4 h-4 text-slate-500" />
              <span>Unduh Metadata (JSON)</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter & Count Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama kolom / variabel..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#A32A29] focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Hash className="w-3.5 h-3.5 text-slate-400" />
          <span>
            {filteredColumns.length} dari {columns.length} Variabel Kolom
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-700 font-extrabold uppercase text-[10px] sm:text-[11px] tracking-wider">
              <th className="py-3.5 px-4">Nama Kolom</th>
              <th className="py-3.5 px-4">Tipe Data</th>
              <th className="py-3.5 px-4">Satuan / Unit</th>
              <th className="py-3.5 px-4">Deskripsi / Penjelasan</th>
              <th className="py-3.5 px-4">Contoh Nilai</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredColumns.length > 0 ? (
              filteredColumns.map((col, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#A32A29] whitespace-nowrap">
                    {col.name}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold border border-slate-200">
                      {col.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium whitespace-nowrap">
                    {col.unit ? (
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono">
                        {col.unit}
                      </span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 leading-relaxed min-w-[240px]">
                    {col.description}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500 text-xs whitespace-nowrap">
                    {String(col.sample)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-xs text-slate-400">
                  Tidak ada variabel yang sesuai dengan kata kunci &ldquo;{searchTerm}&rdquo;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

