'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, X, AlertCircle } from 'lucide-react';
import { UploadedFilePreview } from '../../types/admin.types';
import { datasetStorageService } from '../../services/datasetStorageService';
import { formatFileSize } from '@/shared/utils/formatters';

interface FileDropzoneProps {
  onFileLoaded: (preview: UploadedFilePreview | undefined) => void;
  initialFile?: UploadedFilePreview;
  className?: string;
}

export function FileDropzone({
  onFileLoaded,
  initialFile,
  className = '',
}: FileDropzoneProps) {
  const [filePreview, setFilePreview] = useState<UploadedFilePreview | undefined>(initialFile);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = async (file: File) => {
    setErrorMsg(null);
    const validExtensions = ['csv', 'xlsx', 'xls', 'json'];
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (!ext || !validExtensions.includes(ext)) {
      setErrorMsg('Format file tidak didukung. Harap unggah file berformat .CSV, .XLSX, atau .JSON');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setErrorMsg('Ukuran file melebihi batas maksimum 50 MB.');
      return;
    }

    const preview = await datasetStorageService.parseUploadedFile(file);
    setFilePreview(preview);
    onFileLoaded(preview);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setFilePreview(undefined);
    onFileLoaded(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv, .xlsx, .xls, .json"
        className="hidden"
        onChange={handleInputChange}
      />

      {!filePreview ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-3 ${
            isDragging
              ? 'border-[#A32A29] bg-rose-50/60 scale-[1.01]'
              : 'border-slate-300 hover:border-[#A32A29]/70 bg-slate-50/50 hover:bg-rose-50/20'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-rose-50 text-[#A32A29] flex items-center justify-center shadow-xs">
            <UploadCloud className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-800">
              Tarik & Lepas File ke Sini, atau <span className="text-[#A32A29] underline">Pilih File</span>
            </p>
            <p className="text-xs text-slate-500">
              Mendukung format <strong>CSV (.csv)</strong>, <strong>Excel (.xlsx / .xls)</strong>, atau <strong>JSON (.json)</strong> (Maks. 50 MB)
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
              CSV
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              XLSX
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
              JSON
            </span>
          </div>
        </div>
      ) : (
        /* File Uploaded Card */
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in zoom-in-95">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 break-all">
                  {filePreview.name}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase">
                  {filePreview.format}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Ukuran: {formatFileSize(filePreview.size)} • Terdeteksi ~{filePreview.rowCount} baris data • {filePreview.columns.length} kolom
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Ganti File
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="Hapus file"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-xl">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
}
