'use client';

import React, { useState } from 'react';
import { BarChart3, ArrowUpRight } from 'lucide-react';
import { MonthlyDownloadData } from '../../types/statistics.types';
import { formatNumber } from '@/shared/utils/formatters';

interface DownloadTrendsChartProps {
  data: MonthlyDownloadData[];
}

export function DownloadTrendsChart({ data }: DownloadTrendsChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxDownloads = Math.max(...data.map((d) => d.downloads));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#A32A29]" />
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              Tren Unduhan Dataset per Bulan (2026)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Pertumbuhan akumulatif minat pemanfaatan data terbuka Kemenko PMK.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 self-start sm:self-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-[#A32A29]" />
            <span>Unduhan</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="pt-6">
        <div className="h-56 flex items-end justify-between gap-1.5 sm:gap-3 border-b border-slate-200 pb-2 relative">
          {data.map((item, idx) => {
            const heightPercent = Math.max(12, (item.downloads / maxDownloads) * 100);
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Floating Tooltip */}
                {isHovered && (
                  <div className="absolute -top-12 z-20 bg-slate-900 text-white text-[11px] py-1 px-2.5 rounded-lg shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95 pointer-events-none">
                    <div className="font-bold">{item.month} {item.year}</div>
                    <div className="text-rose-300 font-mono">
                      {formatNumber(item.downloads)} unduhan
                    </div>
                  </div>
                )}

                {/* Bar */}
                <div
                  className={`w-full max-w-[36px] rounded-t-lg transition-all duration-300 ${
                    isHovered
                      ? 'bg-[#A32A29] shadow-lg shadow-[#A32A29]/30 scale-y-105 origin-bottom'
                      : 'bg-rose-700/80 hover:bg-[#A32A29]'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />

                {/* X Axis Label */}
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium mt-2">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
        <span>Rata-rata unduhan bulanan: <strong>18,500+</strong> unduhan</span>
        <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
          <ArrowUpRight className="w-3.5 h-3.5" />
          Naik 24.5% dari tahun sebelumnya
        </span>
      </div>
    </div>
  );
}
