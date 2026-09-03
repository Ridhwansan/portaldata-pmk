import React from 'react';
import { Sheet } from 'lucide-react';
import { DatasetMetadataColumn } from '@/features/catalog/types/catalog.types';

interface XlsSpreadsheetPreviewProps {
  columns: DatasetMetadataColumn[];
  rows: Record<string, string | number>[];
}

export function XlsSpreadsheetPreview({ columns, rows }: XlsSpreadsheetPreviewProps) {
  // Spreadsheet column letters (A, B, C, D...)
  const colLetters = columns.map((_, idx) => String.fromCharCode(65 + (idx % 26)));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-500 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100">
        <div className="flex items-center gap-2">
          <Sheet className="w-4 h-4 text-emerald-600" />
          <span className="font-semibold text-emerald-800">
            Tampilan Lembar Kerja Microsoft Excel (.xls / .xlsx)
          </span>
        </div>
        <span className="text-emerald-700 font-mono">Sheet1</span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-300 bg-white shadow-sm font-sans text-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            {/* Excel Row 1: Column Letters A, B, C... */}
            <tr className="bg-slate-200 text-slate-600 font-bold border-b border-slate-300">
              <th className="w-10 py-1.5 px-2 text-center bg-slate-300/80 border-r border-slate-400/50"></th>
              {colLetters.map((letter, idx) => (
                <th
                  key={idx}
                  className="py-1.5 px-3 text-center border-r border-slate-300 font-mono text-[11px]"
                >
                  {letter}
                </th>
              ))}
            </tr>
            {/* Excel Row 2: Header Names */}
            <tr className="bg-slate-100 text-slate-900 font-bold border-b-2 border-slate-400">
              <th className="py-2 px-2 text-center bg-slate-200 border-r border-slate-300 font-mono text-slate-500">
                1
              </th>
              {columns.map((col) => (
                <th
                  key={col.name}
                  className="py-2 px-3 border-r border-slate-200 font-semibold bg-emerald-50/40 text-emerald-900"
                >
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-blue-50/40 transition-colors">
                <td className="py-1.5 px-2 text-center bg-slate-100 font-mono text-slate-500 border-r border-slate-300">
                  {rIdx + 2}
                </td>
                {columns.map((col) => (
                  <td
                    key={col.name}
                    className="py-1.5 px-3 border-r border-slate-200 text-slate-700"
                  >
                    {typeof row[col.name] === 'number'
                      ? Number(row[col.name]).toLocaleString('id-ID')
                      : String(row[col.name] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
