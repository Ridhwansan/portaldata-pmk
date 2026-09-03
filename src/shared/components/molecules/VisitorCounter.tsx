import React from 'react';

interface VisitorCounterProps {
  count?: number;
  className?: string;
}

export function VisitorCounter({
  count = 1234567,
  className = '',
}: VisitorCounterProps) {
  const digits = String(count).padStart(7, '0').split('');

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
        Total Pengunjung
      </span>
      <div className="flex items-center gap-1">
        {digits.map((digit, idx) => (
          <div
            key={idx}
            className="w-6 h-8 sm:w-7 sm:h-9 bg-white text-slate-900 font-mono font-bold text-base sm:text-lg rounded flex items-center justify-center shadow-md border border-slate-300/40 select-none"
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
}
