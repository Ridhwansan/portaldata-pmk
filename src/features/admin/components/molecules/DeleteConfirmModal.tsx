import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  itemName: string;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi Hapus',
  itemName,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl z-10 space-y-5 animate-in fade-in zoom-in-95">
        <div className="w-14 h-14 rounded-full bg-rose-100 text-[#A32A29] flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Apakah Anda yakin ingin menghapus dataset <strong className="text-slate-800">"{itemName}"</strong>? Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
          >
            Ya, Hapus Data
          </button>
        </div>
      </div>
    </div>
  );
}
