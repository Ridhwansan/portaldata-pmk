import React from 'react';

interface DetailMetaItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function DetailMetaItem({
  icon,
  label,
  value,
  className = '',
}: DetailMetaItemProps) {
  return (
    <div
      className={`flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all ${className}`}
    >
      <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0 border border-slate-200/60">
        {icon}
      </div>
      <div className="min-w-0 space-y-0.5">
        <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        <div className="text-xs sm:text-sm font-bold text-slate-900 break-words leading-snug">
          {value}
        </div>
      </div>
    </div>
  );
}


