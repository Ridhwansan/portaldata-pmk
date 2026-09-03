'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { PermohonanDataItem, PermohonanStatus } from '../../types/admin.types';
import { PermohonanTableRow } from '../molecules/PermohonanTableRow';
import { PermohonanDetailModal } from '../organisms/PermohonanDetailModal';
import { MOCK_PERMOHONAN_DATA } from '../../data/adminMockData';

export function AdminPermohonanTemplate() {
  const [requests, setRequests] = useState<PermohonanDataItem[]>(MOCK_PERMOHONAN_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PermohonanDataItem | null>(null);

  const filteredRequests = useMemo(() => {
    return requests.filter((item) => {
      const matchSearch =
        searchTerm === '' ||
        item.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.judulData.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lembaga.toLowerCase().includes(searchTerm.toLowerCase());

      const matchTab = activeTab === 'all' || item.status === activeTab;
      return matchSearch && matchTab;
    });
  }, [requests, searchTerm, activeTab]);

  const handleUpdateStatus = (id: string, newStatus: PermohonanStatus, notes: string) => {
    setRequests((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus, adminNotes: notes } : item
      )
    );
  };

  const statusTabs = [
    { id: 'all', label: 'Semua Permohonan', count: requests.length },
    { id: 'pending', label: 'Menunggu Review', count: requests.filter((r) => r.status === 'pending').length },
    { id: 'processing', label: 'Sedang Diproses', count: requests.filter((r) => r.status === 'processing').length },
    { id: 'approved', label: 'Disetujui', count: requests.filter((r) => r.status === 'approved').length },
    { id: 'rejected', label: 'Ditolak', count: requests.filter((r) => r.status === 'rejected').length },
  ];

  return (
    <div className="space-y-6 p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Kelola Permohonan Data & Informasi Publik
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Daftar pengajuan permohonan data oleh masyarakat, akademisi, dan lembaga mitra melalui layanan PPID.
        </p>
      </div>

      {/* Status Filter Tabs (Pill Rounded) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {statusTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#A32A29] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.2 rounded-full text-[10px] font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search Toolbar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari berdasarkan No. Tiket, nama pemohon, instansi..."
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-11 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#A32A29] focus:bg-white"
          />
        </div>
      </div>

      {/* Permohonan Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] tracking-wider">
                <th className="py-4 px-4">No. Tiket & Tanggal</th>
                <th className="py-4 px-4">Pemohon & Instansi</th>
                <th className="py-4 px-4">Dataset yang Diminta</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 text-sm">
                    Tidak ada permohonan data pada kategori ini.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((item) => (
                  <PermohonanTableRow
                    key={item.id}
                    item={item}
                    onOpenDetail={(it) => setSelectedItem(it)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permohonan Detail Modal */}
      <PermohonanDetailModal
        item={selectedItem}
        isOpen={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
