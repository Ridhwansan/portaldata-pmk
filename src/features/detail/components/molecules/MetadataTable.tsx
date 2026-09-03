import React from 'react';
import { Database, HelpCircle } from 'lucide-react';
import { DatasetMetadataColumn } from '@/features/catalog/types/catalog.types';

interface MetadataTableProps {
  columns: DatasetMetadataColumn[];
}

export function MetadataTable({ columns }: MetadataTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-[#A32A29]" />
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">
            Kamus Data & Spesifikasi Variabel
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-medium">
          {columns.length} Variabel Terdefinisi
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
              <th className="py-3 px-4">Nama Kolom</th>
              <th className="py-3 px-4">Tipe Data</th>
              <th className="py-3 px-4">Deskripsi / Penjelasan</th>
              <th className="py-3 px-4">Contoh Nilai</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {columns.map((col, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-[#A32A29]">
                  {col.name}
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px] font-semibold border border-slate-200">
                    {col.type}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600 leading-relaxed">
                  {col.description}
                </td>
                <td className="py-3 px-4 font-mono text-slate-500 text-xs">
                  {String(col.sample)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
