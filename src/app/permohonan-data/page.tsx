'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Send,
  CheckCircle2,
  User,
  ChevronDown,
} from 'lucide-react';
import { Breadcrumb } from '@/shared/components/molecules/Breadcrumb';

export default function PermohonanDataPage() {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    namaLengkap: '',
    nik: '',
    email: '',
    noHp: '',
    lembaga: '',
    kategoriLembaga: 'Pemerintah',
    kategoriData: 'Pendidikan',
    judulData: '',
    tujuanPenggunaan: '',
    formatDibutuhkan: 'CSV',
    setujuSyarat: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTicketId(`REQ-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`);
      setSubmitted(true);
    }, 800);
  };

  const breadcrumbs = [
    { label: 'Permohonan Data', active: true },
  ];

  return (
    <div className="w-full bg-slate-50/60 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumb items={breadcrumbs} />

        {/* Page Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-[#A32A29] text-xs font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Layanan PPID & Keterbukaan Data</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Formulir Permohonan Data & Informasi Publik
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
            Jika dataset yang Anda perlukan belum tersedia pada portal Etalase Data Terbuka Kemenko PMK, Anda dapat mengajukan permohonan data resmi melalui formulir di bawah ini.
          </p>
        </div>

        {/* Success State */}
        {submitted ? (
          <div className="bg-white rounded-3xl border border-emerald-200 p-10 shadow-md text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Permohonan Data Berhasil Diajukan!
            </h2>
            <p className="text-slate-600 text-sm max-w-lg mx-auto">
              Nomor Tiket Permohonan Anda:
            </p>
            <div className="inline-block px-6 py-3 bg-slate-100 rounded-full font-mono text-xl sm:text-2xl font-extrabold text-[#A32A29] border border-slate-200">
              {ticketId}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Tim PPID Kemenko PMK akan memverifikasi permohonan Anda dalam waktu maksimal 3 hari kerja. Notifikasi status dan tautan unduhan data akan dikirimkan ke email <strong>{formData.email}</strong>.
            </p>
            <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/dataset"
                className="px-8 py-3 rounded-full bg-[#A32A29] text-white font-bold text-sm hover:bg-[#881E1D] transition-colors shadow-sm"
              >
                Kembali ke Katalog
              </Link>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 cursor-pointer"
              >
                Buat Permohonan Baru
              </button>
            </div>
          </div>
        ) : (
          /* Form Card */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xs space-y-10"
          >
            {/* Section 1: Identitas Pemohon */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <User className="w-5 h-5 text-[#A32A29]" />
                <h3 className="font-bold text-slate-900 text-lg">
                  1. Identitas Pemohon
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">
                    Nama Lengkap Sesuai KTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.namaLengkap}
                    onChange={(e) =>
                      setFormData({ ...formData, namaLengkap: e.target.value })
                    }
                    placeholder="Nama Lengkap"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#A32A29] focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">
                    Nomor Induk Kependudukan (NIK) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={formData.nik}
                    onChange={(e) =>
                      setFormData({ ...formData, nik: e.target.value })
                    }
                    placeholder="16 digit NIK KTP"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#A32A29] focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">
                    Alamat Email Aktif <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="nama@email.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#A32A29] focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">
                    Nomor WhatsApp / Telepon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.noHp}
                    onChange={(e) =>
                      setFormData({ ...formData, noHp: e.target.value })
                    }
                    placeholder="081234567890"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#A32A29] focus:bg-white"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700">
                    Nama Institusi / Universitas / Organisasi
                  </label>
                  <input
                    type="text"
                    value={formData.lembaga}
                    onChange={(e) =>
                      setFormData({ ...formData, lembaga: e.target.value })
                    }
                    placeholder="Contoh: Universitas Indonesia / Badan Riset / Perorangan"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#A32A29] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Rincian Permohonan Data */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <FileText className="w-5 h-5 text-[#A32A29]" />
                <h3 className="font-bold text-slate-900 text-lg">
                  2. Rincian Data yang Dibutuhkan
                </h3>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">
                      Rumpun / Kategori Data <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.kategoriData}
                        onChange={(e) =>
                          setFormData({ ...formData, kategoriData: e.target.value })
                        }
                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#A32A29] focus:bg-white cursor-pointer"
                      >
                        <option value="Pendidikan">Pendidikan & Moderasi Beragama</option>
                        <option value="Kesehatan">Kesehatan & Kependudukan</option>
                        <option value="Kesejahteraan Sosial">Kesejahteraan Sosial & Bansos</option>
                        <option value="Penanggulangan Kemiskinan">Pemberdayaan & Kemiskinan</option>
                        <option value="Pemuda & Olahraga">Revolusi Mental & Kebudayaan</option>
                        <option value="Kebencanaan">Mitigasi & Penanggulangan Bencana</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700">
                      Format Data yang Diharapkan <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.formatDibutuhkan}
                        onChange={(e) =>
                          setFormData({ ...formData, formatDibutuhkan: e.target.value })
                        }
                        className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#A32A29] focus:bg-white cursor-pointer"
                      >
                        <option value="CSV">CSV (Comma-Separated Values)</option>
                        <option value="XLS">Microsoft Excel (.xlsx / .xls)</option>
                        <option value="JSON">JSON (REST API Payload)</option>
                        <option value="PDF">Dokumen Publikasi (PDF)</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">
                    Judul / Nama Dataset yang Dimohon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.judulData}
                    onChange={(e) =>
                      setFormData({ ...formData, judulData: e.target.value })
                    }
                    placeholder="Contoh: Data Realisasi Penyaluran Bantuan Sosial Kabupaten X Tahun 2025"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#A32A29] focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">
                    Tujuan & Alasan Penggunaan Data <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.tujuanPenggunaan}
                    onChange={(e) =>
                      setFormData({ ...formData, tujuanPenggunaan: e.target.value })
                    }
                    placeholder="Jelaskan secara ringkas maksud dan tujuan penggunaan data..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#A32A29] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Terms & Submit Button (Pill Rounded) */}
            <div className="space-y-6 pt-4 border-t border-slate-100">
              <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-slate-600 select-none">
                <input
                  type="checkbox"
                  required
                  checked={formData.setujuSyarat}
                  onChange={(e) =>
                    setFormData({ ...formData, setujuSyarat: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 rounded text-[#A32A29] focus:ring-[#A32A29]"
                />
                <span>
                  Saya menyatakan bahwa data dan informasi yang saya sampaikan adalah benar, dan saya bersedia mematuhi ketentuan perundang-undangan terkait pemanfaatan informasi publik.
                </span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Link
                  href="/"
                  className="px-6 py-3 rounded-full border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full bg-[#A32A29] hover:bg-[#881E1D] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Mengirimkan...' : 'Kirim Permohonan'}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
