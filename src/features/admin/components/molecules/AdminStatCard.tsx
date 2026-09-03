import React from 'react';

interface AdminStatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  accentBorder?: string;
  className?: string;
}

export function AdminStatCard({
  title,
  value,
  subtitle,
  icon,
  accentBorder = 'border-l-4 border-[#A32A29]',
  className = '',
}: AdminStatCardProps) {
  return (
    <div
      className={`bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex items-start justify-between gap-4 ${accentBorder} ${className}`}
    >
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </div>
        <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
      </div>

      <div className="w-12 h-12 rounded-2xl bg-slate-50 text-[#A32A29] flex items-center justify-center shrink-0 border border-slate-100">
        {icon}
      </div>
    </div>
  );
}
