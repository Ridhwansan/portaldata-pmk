'use client';

import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, ChevronLeft, ChevronRight, FileSpreadsheet } from 'lucide-react';
import { DatasetMetadataColumn } from '@/features/catalog/types/catalog.types';

interface CsvTablePreviewProps {
  columns: DatasetMetadataColumn[];
  rows: Record<string, string | number>[];
}

export function CsvTablePreview({ columns, rows }: CsvTablePreviewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const handleSort = (columnName: string) => {
    if (sortColumn === columnName) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };

  const filteredRows = useMemo(() => {
    let result = [...rows];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((val) => String(val).toLowerCase().includes(q))
      );
    }

    if (sortColumn) {
      result.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];
        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        }
        return sortDirection === 'asc'
          ? String(valA).localeCompare(String(valB))
          : String(valB).localeCompare(String(valA));
      });
    }

    return result;
  }, [rows, searchTerm, sortColumn, sortDirection]);

  const totalPages = Math.ceil(filteredRows.length / pageSize) || 1;
  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredRows.slice(start, start + pageSize);
  }, [filteredRows, page, pageSize]);

  return (
    <div className="space-y-4">
      {/* Search & Meta within Preview Table */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            placeholder="Cari dalam tabel..."
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#A32A29] focus:ring-1 focus:ring-[#A32A29]"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Menampilkan baris <strong>{Math.min((page - 1) * pageSize + 1, filteredRows.length)}</strong> -{' '}
          <strong>{Math.min(page * pageSize, filteredRows.length)}</strong> dari{' '}
          <strong>{filteredRows.length}</strong> total baris
        </div>
      </div>

      {/* Table Component */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-inner bg-white">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-800 font-bold uppercase text-[11px] tracking-wider">
              <th className="py-3 px-3 text-center w-12 text-slate-500">#</th>
              {columns.map((col) => (
                <th
                  key={col.name}
                  onClick={() => handleSort(col.name)}
                  className="py-3 px-4 hover:bg-slate-200/70 transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.name}</span>
                    <ArrowUpDown
                      className={`w-3.5 h-3.5 ${
                        sortColumn === col.name ? 'text-[#A32A29]' : 'text-slate-400'
                      }`}
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paginatedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-8 text-center text-slate-400 text-sm"
                >
                  Tidak ada baris yang cocok dengan kata kunci.
                </td>
              </tr>
            ) : (
              paginatedRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-rose-50/30 transition-colors">
                  <td className="py-3 px-3 text-center text-slate-400 font-mono text-xs">
                    {(page - 1) * pageSize + idx + 1}
                  </td>
                  {columns.map((col) => (
                    <td key={col.name} className="py-3 px-4 text-slate-700 font-medium">
                      {typeof row[col.name] === 'number'
                        ? Number(row[col.name]).toLocaleString('id-ID')
                        : String(row[col.name] ?? '-')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mini Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-500">
            Halaman {page} dari {totalPages}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
