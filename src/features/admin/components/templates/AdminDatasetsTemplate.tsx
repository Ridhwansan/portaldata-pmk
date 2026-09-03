'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, PlusCircle, ChevronDown } from 'lucide-react';
import { AdminDatasetItem } from '../../types/admin.types';
import { DatasetTableRow } from '../molecules/DatasetTableRow';
import { DeleteConfirmModal } from '../molecules/DeleteConfirmModal';
import { ADMIN_DATASETS } from '../../data/adminMockData';

export function AdminDatasetsTemplate() {
  const [datasets, setDatasets] = useState<AdminDatasetItem[]>(ADMIN_DATASETS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredDatasets = useMemo(() => {
    return datasets.filter((item) => {
      const matchSearch =
        searchTerm === '' ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchStatus = selectedStatus === 'all' || item.status === selectedStatus;

      return matchSearch && matchCat && matchStatus;
    });
  }, [datasets, searchTerm, selectedCategory, selectedStatus]);

  const targetDataset = datasets.find((d) => d.id === deleteTargetId);

  const handleConfirmDelete = () => {
    if (deleteTargetId) {
      setDatasets((prev) => prev.filter((d) => d.id !== deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6 p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Kelola Dataset Kemenko PMK
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Total {datasets.length} kumpulan data terdaftar dalam sistem.
          </p>
        </div>

        <Link
          href="/admin/datasets/create"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#A32A29] hover:bg-[#881E1D] text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.02] cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Tambah Dataset Baru</span>
        </Link>
      </div>

      {/* Toolbar: Search & Clean Filters */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari dataset berdasarkan judul atau instansi..."
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-11 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#A32A29] focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Filter with clean contained chevron */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-full pl-4 pr-9 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#A32A29] cursor-pointer"
            >
              <option value="all">Semua Kategori</option>
              <option value="Pendidikan">Pendidikan</option>
              <option value="Kesehatan">Kesehatan</option>
              <option value="Kebencanaan">Kebencanaan</option>
              <option value="Keluarga">Keluarga</option>
              <option value="Perempuan & Anak">Perempuan & Anak</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Filter with clean contained chevron */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-full pl-4 pr-9 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-[#A32A29] cursor-pointer"
            >
              <option value="all">Semua Status</option>
              <option value="published">Terpublikasi</option>
              <option value="draft">Draft</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Dataset Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                <th className="py-4 px-4">Judul & Metadata</th>
                <th className="py-4 px-4 hidden md:table-cell">Instansi</th>
                <th className="py-4 px-4">Format</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 hidden lg:table-cell">Statistik</th>
                <th className="py-4 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredDatasets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                    Tidak ada dataset yang cocok dengan kriteria pencarian.
                  </td>
                </tr>
              ) : (
                filteredDatasets.map((dataset) => (
                  <DatasetTableRow
                    key={dataset.id}
                    dataset={dataset}
                    onDelete={(id) => setDeleteTargetId(id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
        title="Hapus Dataset"
        itemName={targetDataset?.title || ''}
      />
    </div>
  );
}
