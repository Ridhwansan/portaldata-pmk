import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'blue' | 'green' | 'amber' | 'purple' | 'slate' | 'outline-red';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'slate',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variantStyles = {
    red: 'bg-rose-50 text-[#A32A29] border border-rose-200/70',
    blue: 'bg-sky-50 text-sky-700 border border-sky-200/70',
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-200/70',
    amber: 'bg-amber-50 text-amber-700 border border-amber-200/70',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200/70',
    slate: 'bg-slate-100 text-slate-700 border border-slate-200',
    'outline-red': 'border border-rose-300 text-[#A32A29] bg-white',
  };

  const sizeStyles = {
    sm: 'text-[11px] font-medium px-2 py-0.5 rounded-md',
    md: 'text-xs font-medium px-2.5 py-1 rounded-full',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
}
