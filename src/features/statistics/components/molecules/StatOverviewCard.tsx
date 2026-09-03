import React from 'react';
import { MetricTrendBadge } from '../atoms/MetricTrendBadge';

interface StatOverviewCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  trend?: { value: string; isPositive: boolean };
  accentColor?: string;
  className?: string;
}

export function StatOverviewCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className = '',
}: StatOverviewCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-rose-50 text-[#A32A29] flex items-center justify-center border border-rose-100 shadow-xs">
          {icon}
        </div>
        {trend && (
          <MetricTrendBadge
            value={trend.value}
            isPositive={trend.isPositive}
          />
        )}
      </div>

      <div className="space-y-1">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </h4>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </div>
        <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
