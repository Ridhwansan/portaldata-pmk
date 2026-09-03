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
    <div className={`flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 ${className}`}>
      <div className="p-2 rounded-lg bg-white text-[#A32A29] shadow-xs shrink-0 border border-slate-200/60">
        {icon}
      </div>
      <div className="min-w-0">
        <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </span>
        <div className="text-xs sm:text-sm font-semibold text-slate-800 break-words mt-0.5">
          {value}
        </div>
      </div>
    </div>
  );
}
