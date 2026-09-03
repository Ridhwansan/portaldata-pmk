import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricTrendBadgeProps {
  value: string;
  isPositive?: boolean;
  className?: string;
}

export function MetricTrendBadge({
  value,
  isPositive = true,
  className = '',
}: MetricTrendBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
        isPositive
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : 'bg-rose-50 text-rose-700 border border-rose-200'
      } ${className}`}
    >
      {isPositive ? (
        <TrendingUp className="w-3 h-3" />
      ) : (
        <TrendingDown className="w-3 h-3" />
      )}
      <span>{value}</span>
    </span>
  );
}
