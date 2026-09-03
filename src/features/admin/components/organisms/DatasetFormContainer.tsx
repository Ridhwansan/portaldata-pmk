'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CheckCircle,
  FileText,
  Layers,
  ArrowLeft,
  ChevronDown,
  Check,
} from 'lucide-react';
import { DatasetFormData, UploadedFilePreview } from '../../types/admin.types';
import { FileDropzone } from '../atoms/FileDropzone';
import { datasetStorageService } from '../../services/datasetStorageService';
import { FileFormat } from '@/shared/types/common.types';
import { KedeputianId } from '@/features/catalog/types/catalog.types';

interface DatasetFormContainerProps {
  initialData?: Partial<DatasetFormData>;
  datasetId?: string;
  isEditMode?: boolean;
}

export function DatasetFormContainer({
  initialData,
  datasetId,
  isEditMode = false,
}: DatasetFormContainerProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const [formData, setFormData] = useState<DatasetFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || 'Pendidikan',
    kedeputianId: initialData?.kedeputianId || 'deputi-3',
    publisher: initialData?.publisher || 'Kementerian Pendidikan Dasar dan Menengah',
    publisherCode: initialData?.publisherCode || 'Kemendikdasmen',
    updateFrequency: initialData?.updateFrequency || 'Tahunan',
    coverageArea: initialData?.coverageArea || 'Nasional (38 Provinsi)',
    timePeriod: initialData?.timePeriod || '2026',
    license: initialData?.license || 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    description: initialData?.description || '',
    fullDescription: initialData?.fullDescription || '',
    tags: initialData?.tags || 'Pendidikan, Data Terbuka, Kemenko PMK',
    formats: initialData?.formats || ['CSV'],
    status: initialData?.status || 'published',
    uploadedFile: initialData?.uploadedFile,
  });

  const handleFormatToggle = (fmt: FileFormat) => {
    setFormData((prev) => {
      const exists = prev.formats.includes(fmt);
      const newFormats = exists
        ? prev.formats.filter((f) => f !== fmt)
        : [...prev.formats, fmt];
      return { ...prev, formats: newFormats };
    });
  };

  const handleFileLoaded = (preview: UploadedFilePreview | undefined) => {
    if (preview) {
      setFormData((prev) => ({
        ...prev,
        uploadedFile: preview,
        formats: Array.from(new Set([...prev.formats, preview.format])),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        uploadedFile: undefined,
      }));
    }
  };

  const handleSubmit = async (targetStatus: 'published' | 'draft') => {
    if (!formData.title.trim()) {
      alert('Judul dataset wajib diisi!');
      return;
    }

    if (formData.formats.length === 0) {
      alert('Pilih setidaknya satu format file dataset!');
      return;
    }

    setLoading(true);
    const submissionData: DatasetFormData = {
      ...formData,
      status: targetStatus,
    };

    if (isEditMode && datasetId) {
      await datasetStorageService.updateDataset(datasetId, submissionData);
    } else {
      await datasetStorageService.createDataset(submissionData);
    }

    setLoading(false);
    setSuccessMsg(true);

    setTimeout(() => {
      router.push('/admin/datasets');
    }, 1200);
  };

  const formatOptions: { id: FileFormat; name: string; ext: string; desc: string }[] = [
    {
      id: 'CSV',
      name: 'CSV (Comma-Separated)',
      ext: '.csv',
      desc: 'Format tabel standar untuk analisis dan pengolahan data',
    },
    {
      id: 'XLS',
      name: 'Microsoft Excel',
      ext: '.xlsx / .xls',
      desc: 'Format spreadsheet untuk Microsoft Excel & aplikasi lembar kerja',
    },
    {
      id: 'JSON',
      name: 'JSON (API Payload)',
      ext: '.json',
      desc: 'Format hierarki data untuk integrasi aplikasi & developer API',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/datasets"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#A32A29] mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Dataset</span>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isEditMode ? 'Edit Dataset' : 'Input & Tambah Dataset Baru'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Unggah file data sumber (CSV, XLSX, JSON) dan lengkapi kamus metadata dataset.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit('draft')}
            className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
          >
            Simpan Draft
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit('published')}
            className="px-6 py-2.5 rounded-full bg-[#A32A29] hover:bg-[#881E1D] text-white text-xs sm:text-sm font-bold shadow-sm transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : 'Publikasikan Dataset'}
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 text-sm font-bold animate-in fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Dataset berhasil disimpan! Mengalihkan ke halaman daftar dataset...</span>
        </div>
      )}

      {/* 1. File Upload Dropzone (CSV / XLSX / JSON) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Layers className="w-5 h-5 text-[#A32A29]" />
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              1. Unggah File Sumber Data
            </h3>
            <p className="text-xs text-slate-500">
              Pilih atau seret file berformat CSV, Excel (XLSX), atau JSON untuk diinput.
            </p>
          </div>
        </div>

        <FileDropzone
          onFileLoaded={handleFileLoaded}
          initialFile={formData.uploadedFile}
        />
      </div>

      {/* 2. Informasi Utama Dataset */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <FileText className="w-5 h-5 text-[#A32A29]" />
          <div>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              2. Informasi & Metadata Dataset
            </h3>
            <p className="text-xs text-slate-500">
              Lengkapi rincian judul, kategori, instansi, dan deskripsi data.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Title */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-slate-700">
              Judul Dataset <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Contoh: Tingkat partisipasi sekolah mulai dari TK hingga SMA"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#A32A29] focus:bg-white"
            />
          </div>

          {/* Category Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Rumpun / Kategori Topik <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#A32A29] focus:bg-white cursor-pointer"
              >
                <option value="Pendidikan">Pendidikan & Moderasi Beragama</option>
                <option value="Kesehatan">Kesehatan & Kependudukan</option>
                <option value="Kebencanaan">Kebencanaan & Mitigasi</option>
                <option value="Keluarga">Keluarga & Kesejahteraan</option>
                <option value="Perempuan & Anak">Perempuan & Perlindungan Anak</option>
                <option value="Pemuda & Olahraga">Pemuda, Olahraga & Kebudayaan</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Kedeputian Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Kedeputian Pembina <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={formData.kedeputianId}
                onChange={(e) =>
                  setFormData({ ...formData, kedeputianId: e.target.value as KedeputianId })
                }
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#A32A29] focus:bg-white cursor-pointer"
              >
                <option value="deputi-1">Kedeputian 1 (Peningkatan Kesejahteraan Sosial)</option>
                <option value="deputi-2">Kedeputian 2 (Penanggulangan Kemiskinan)</option>
                <option value="deputi-3">Kedeputian 3 (Pendidikan & Moderasi Beragama)</option>
                <option value="deputi-4">Kedeputian 4 (Kesehatan & Kependudukan)</option>
                <option value="deputi-5">Kedeputian 5 (Revolusi Mental & Kebudayaan)</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Publisher */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Instansi Penerbit / Sumber Data <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.publisher}
              onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
              placeholder="Contoh: Kementerian Kesehatan RI"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#A32A29] focus:bg-white"
            />
          </div>

          {/* Update Frequency Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Frekuensi Pembaruan
            </label>
            <div className="relative">
              <select
                value={formData.updateFrequency}
                onChange={(e) => setFormData({ ...formData, updateFrequency: e.target.value })}
                className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#A32A29] focus:bg-white cursor-pointer"
              >
                <option value="Bulanan">Bulanan</option>
                <option value="Triwulanan">Triwulanan</option>
                <option value="Semesteran">Semesteran</option>
                <option value="Tahunan">Tahunan</option>
                <option value="Real-time">Real-time / Berkala</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-slate-700">
              Ringkasan Deskripsi <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Deskripsi singkat yang tampil pada kartu dataset..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#A32A29] focus:bg-white"
            />
          </div>

          {/* Full Description */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-slate-700">
              Deskripsi Lengkap & Metodologi
            </label>
            <textarea
              rows={4}
              value={formData.fullDescription}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              placeholder="Jelaskan cakupan data, metodologi pengumpulan, batasan data, dsb..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#A32A29] focus:bg-white"
            />
          </div>

          {/* Formats Selection Checklist (Clear & Unambiguous Checkboxes) */}
          <div className="space-y-3 sm:col-span-2 pt-3 border-t border-slate-100">
            <div>
              <label className="text-xs font-bold text-slate-800 block">
                Format File yang Disediakan untuk Publik <span className="text-red-500">*</span>
              </label>
              <p className="text-[11px] text-slate-500">
                Pilih format yang dapat diunduh oleh masyarakat (bisa memilih lebih dari satu).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {formatOptions.map((fmt) => {
                const isChecked = formData.formats.includes(fmt.id);
                return (
                  <label
                    key={fmt.id}
                    onClick={() => handleFormatToggle(fmt.id)}
                    className={`flex items-start gap-3 p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${
                      isChecked
                        ? 'border-[#A32A29] bg-rose-50/40 shadow-xs ring-1 ring-[#A32A29]/20'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked
                          ? 'bg-[#A32A29] text-white'
                          : 'border-2 border-slate-300 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900">
                          {fmt.id}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {fmt.ext}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        {fmt.desc}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Link
          href="/admin/datasets"
          className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50"
        >
          Batal
        </Link>
        <button
          type="button"
          disabled={loading}
          onClick={() => handleSubmit('published')}
          className="px-8 py-3 rounded-full bg-[#A32A29] hover:bg-[#881E1D] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan & Publikasikan'}
        </button>
      </div>
    </div>
  );
}
