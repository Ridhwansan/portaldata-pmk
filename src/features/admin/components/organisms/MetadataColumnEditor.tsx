'use client';

import React from 'react';
import { Plus, Trash2, Database, HelpCircle, Sparkles } from 'lucide-react';
import { DatasetMetadataColumn } from '@/features/catalog/types/catalog.types';

interface MetadataColumnEditorProps {
  columns: DatasetMetadataColumn[];
  onChange: (columns: DatasetMetadataColumn[]) => void;
}

const DATA_TYPES = [
  'String',
  'Integer',
  'Decimal',
  'Date',
  'Boolean',
  'Percentage',
  'Currency',
  'Geospatial',
];

export function MetadataColumnEditor({
  columns,
  onChange,
}: MetadataColumnEditorProps) {
  const handleAddColumn = () => {
    const newCol: DatasetMetadataColumn = {
      name: `kolom_${columns.length + 1}`,
      type: 'String',
      unit: '',
      description: '',
      sample: '',
      isRequired: true,
    };
    onChange([...columns, newCol]);
  };

  const handleUpdateColumn = (
    index: number,
    field: keyof DatasetMetadataColumn,
    value: any
  ) => {
    const updated = [...columns];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const handleDeleteColumn = (index: number) => {
    if (columns.length <= 1) {
      alert('Dataset harus memiliki setidaknya satu kolom variabel!');
      return;
    }
    const updated = columns.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#A32A29]" />
            <h4 className="text-sm font-extrabold text-slate-900">
              Kamus Data Variabel ({columns.length} Kolom Terdefinisi)
            </h4>
          </div>
          <p className="text-xs text-slate-500">
            Definisikan nama kolom, tipe data, satuan pengukuran, dan penjelasan teknis setiap variabel data.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddColumn}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs hover:scale-[1.02] cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kolom Variabel</span>
        </button>
      </div>

      {/* Columns List Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-extrabold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-3 w-10 text-center">#</th>
              <th className="py-3 px-3 min-w-[150px]">Nama Kolom *</th>
              <th className="py-3 px-3 min-w-[120px]">Tipe Data</th>
              <th className="py-3 px-3 min-w-[110px]">Satuan / Unit</th>
              <th className="py-3 px-3 min-w-[220px]">Deskripsi / Penjelasan *</th>
              <th className="py-3 px-3 min-w-[120px]">Contoh Nilai</th>
              <th className="py-3 px-3 w-12 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {columns.map((col, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                {/* Index */}
                <td className="py-3 px-3 text-center font-bold text-slate-400">
                  {idx + 1}
                </td>

                {/* Name */}
                <td className="py-3 px-3">
                  <input
                    type="text"
                    required
                    value={col.name}
                    onChange={(e) => handleUpdateColumn(idx, 'name', e.target.value)}
                    placeholder="nama_kolom"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-mono text-xs font-bold text-[#A32A29] focus:outline-none focus:border-[#A32A29] focus:bg-white"
                  />
                </td>

                {/* Type */}
                <td className="py-3 px-3">
                  <select
                    value={col.type}
                    onChange={(e) => handleUpdateColumn(idx, 'type', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#A32A29] focus:bg-white cursor-pointer"
                  >
                    {DATA_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </td>

                {/* Unit */}
                <td className="py-3 px-3">
                  <input
                    type="text"
                    value={col.unit || ''}
                    onChange={(e) => handleUpdateColumn(idx, 'unit', e.target.value)}
                    placeholder="%, Jiwa, Rp..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#A32A29] focus:bg-white"
                  />
                </td>

                {/* Description */}
                <td className="py-3 px-3">
                  <input
                    type="text"
                    required
                    value={col.description}
                    onChange={(e) =>
                      handleUpdateColumn(idx, 'description', e.target.value)
                    }
                    placeholder="Penjelasan makna dan metodologi variabel..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-[#A32A29] focus:bg-white"
                  />
                </td>

                {/* Sample */}
                <td className="py-3 px-3">
                  <input
                    type="text"
                    value={String(col.sample || '')}
                    onChange={(e) => handleUpdateColumn(idx, 'sample', e.target.value)}
                    placeholder="Contoh data..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-600 focus:outline-none focus:border-[#A32A29] focus:bg-white"
                  />
                </td>

                {/* Delete Action */}
                <td className="py-3 px-3 text-center">
                  <button
                    type="button"
                    onClick={() => handleDeleteColumn(idx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Hapus Kolom"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Helper Note */}
      <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50/70 border border-amber-100 text-[11px] text-amber-800">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>Tips Pengisian Metadata:</strong> Pastikan setiap kolom memiliki nama baku tanpa spasi (misal: <code>kode_provinsi</code>, <code>tahun</code>, <code>persentase_kelulusan</code>) dan berikan deskripsi yang jelas agar mudah dipahami masyarakat dan peneliti.
        </span>
      </div>
    </div>
  );
}
