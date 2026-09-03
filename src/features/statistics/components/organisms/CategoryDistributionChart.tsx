import React from 'react';
import { PieChart } from 'lucide-react';
import { CategoryStat } from '../../types/statistics.types';
import { formatNumber } from '@/shared/utils/formatters';

interface CategoryDistributionChartProps {
  stats: CategoryStat[];
}

export function CategoryDistributionChart({ stats }: CategoryDistributionChartProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-5">
      <div className="flex items-center gap-2 pb-1">
        <PieChart className="w-5 h-5 text-[#A32A29]" />
        <div>
          <h3 className="font-bold text-slate-900 text-base sm:text-lg">
            Distribusi Dataset per Sektor
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Komposisi data berdasarkan rumpun bidang koordinasi PMK.
          </p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-3.5 pt-2">
        {stats.map((cat) => (
          <div key={cat.category} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700">{cat.category}</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-normal">
                  {formatNumber(cat.count)} dataset
                </span>
                <span className="text-slate-900 font-bold">{cat.percentage}%</span>
              </div>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${cat.percentage}%`,
                  backgroundColor: cat.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
