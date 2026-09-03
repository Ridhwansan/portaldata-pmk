'use client';

import React from 'react';
import Link from 'next/link';
import {
  Database,
  FileCheck,
  Clock,
  Download,
  PlusCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { AdminStatCard } from '../molecules/AdminStatCard';
import { DatasetTableRow } from '../molecules/DatasetTableRow';
import { PermohonanTableRow } from '../molecules/PermohonanTableRow';
import { ADMIN_DATASETS, MOCK_PERMOHONAN_DATA } from '../../data/adminMockData';

export function AdminDashboardTemplate() {
  const publishedCount = ADMIN_DATASETS.filter((d) => d.status === 'published').length;
  const draftCount = ADMIN_DATASETS.filter((d) => d.status === 'draft').length;
  const pendingRequests = MOCK_PERMOHONAN_DATA.filter((p) => p.status === 'pending').length;

  return (
    <div className="space-y-8 p-6 sm:p-8 max-w-7xl mx-auto">
      {/* 4 Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <AdminStatCard
          title="Dataset Terpublikasi"
          value={publishedCount}
          subtitle="Tersedia di portal publik"
          icon={<Database className="w-6 h-6" />}
          accentBorder="border-l-4 border-[#A32A29]"
        />
        <AdminStatCard
          title="Dataset Draft"
          value={draftCount}
          subtitle="Menunggu tinjauan publikasi"
          icon={<FileCheck className="w-6 h-6" />}
          accentBorder="border-l-4 border-slate-400"
        />
        <AdminStatCard
          title="Permohonan Masuk"
          value={MOCK_PERMOHONAN_DATA.length}
          subtitle="Total permintaan data masyarakat"
          icon={<Clock className="w-6 h-6" />}
          accentBorder="border-l-4 border-blue-500"
        />
        <AdminStatCard
          title="Perlu Tindakan"
          value={pendingRequests}
          subtitle="Permohonan belum direview"
          icon={<Clock className="w-6 h-6 text-amber-600" />}
          accentBorder="border-l-4 border-amber-500"
        />
      </div>

      {/* Quick Action Banner */}
      <div className="bg-gradient-to-r from-[#A32A29] to-[#881E1D] rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Kelola & Input Dataset Terbuka Kemenko PMK
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Tambahkan kumpulan data baru dalam format CSV, Excel (XLSX), atau JSON dengan pengisian kamus metadata terstandar.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/datasets/create"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#A32A29] font-bold text-sm shadow-md hover:bg-rose-50 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah Dataset Baru</span>
          </Link>
          <Link
            href="/admin/permohonan-data"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-sm transition-colors cursor-pointer"
          >
            <span>Review Permohonan ({pendingRequests})</span>
          </Link>
        </div>
      </div>

      {/* Recent Datasets Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Dataset Terbaru yang Dikelola
            </h3>
            <p className="text-xs text-slate-500">
              Daftar dataset yang baru diperbarui atau diunggah.
            </p>
          </div>

          <Link
            href="/admin/datasets"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#A32A29] hover:underline"
          >
            <span>Lihat Semua Dataset</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                <th className="py-3 px-4">Judul & Metadata</th>
                <th className="py-3 px-4 hidden md:table-cell">Instansi</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 hidden lg:table-cell">Aktivitas</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_DATASETS.slice(0, 4).map((dataset) => (
                <DatasetTableRow
                  key={dataset.id}
                  dataset={dataset}
                  onDelete={() => {}}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
