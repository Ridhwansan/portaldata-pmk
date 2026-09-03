'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, User, Mail, Phone, Building, FileText, Send } from 'lucide-react';
import { PermohonanDataItem, PermohonanStatus } from '../../types/admin.types';
import { StatusBadge } from '../atoms/StatusBadge';
import { formatDate } from '@/shared/utils/formatters';

interface PermohonanDetailModalProps {
  item: PermohonanDataItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: PermohonanStatus, notes: string) => void;
}

export function PermohonanDetailModal({
  item,
  isOpen,
  onClose,
  onUpdateStatus,
}: PermohonanDetailModalProps) {
  if (!isOpen || !item) return null;

  const [selectedStatus, setSelectedStatus] = useState<PermohonanStatus>(item.status);
  const [adminNotes, setAdminNotes] = useState(item.adminNotes || '');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onUpdateStatus(item.id, selectedStatus, adminNotes);
      setSaving(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-[#A32A29] text-sm">
                {item.ticketId}
              </span>
              <StatusBadge status={item.status} />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Rincian Permohonan Informasi Publik
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Pemohon Info */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3 text-xs sm:text-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Identitas Pemohon
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-slate-700">
              <User className="w-4 h-4 text-slate-400 shrink-0" />
              <span><strong>{item.namaLengkap}</strong> (NIK: {item.nik})</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Building className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{item.lembaga || 'Perorangan'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Mail className="w-4 h-4 text-slate-400 shrink-0" />
              <a href={`mailto:${item.email}`} className="text-[#A32A29] hover:underline">
                {item.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{item.noHp}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Data yang Diminta */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Dataset & Alasan Permohonan
          </div>
          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
            <div className="text-sm font-bold text-slate-900">
              {item.judulData}
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>Kategori: <strong>{item.kategoriData}</strong></span>
              <span>•</span>
              <span>Format Diinginkan: <strong className="uppercase">{item.formatDibutuhkan}</strong></span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 pt-1 leading-relaxed border-t border-rose-100/80">
              "{item.tujuanPenggunaan}"
            </p>
          </div>
        </div>

        {/* Section 3: Tindakan Admin & Status */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
            Ubah Status Permohonan
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { status: 'pending' as PermohonanStatus, label: 'Menunggu' },
              { status: 'processing' as PermohonanStatus, label: 'Diproses' },
              { status: 'approved' as PermohonanStatus, label: 'Disetujui' },
              { status: 'rejected' as PermohonanStatus, label: 'Ditolak' },
            ].map((btn) => (
              <button
                key={btn.status}
                type="button"
                onClick={() => setSelectedStatus(btn.status)}
                className={`py-2 px-3 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                  selectedStatus === btn.status
                    ? 'bg-[#A32A29] text-white border-[#A32A29] shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-slate-700">
              Catatan / Tanggapan Admin ke Pemohon
            </label>
            <textarea
              rows={3}
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Tuliskan catatan verifikasi, nomor registrasi, atau tautan file unduhan..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#A32A29] focus:bg-white"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50"
          >
            Tutup
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#A32A29] hover:bg-[#881E1D] text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
