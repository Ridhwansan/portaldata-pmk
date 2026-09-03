import React from 'react';

interface CategoryTagProps {
  category: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function CategoryTag({
  category,
  size = 'sm',
  className = '',
}: CategoryTagProps) {
  const getCategoryColor = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('pendidikan')) {
      return 'bg-rose-50 text-[#A32A29] border-rose-200/80';
    }
    if (lower.includes('kesehatan')) {
      return 'bg-rose-50 text-[#A32A29] border-rose-200/80';
    }
    if (lower.includes('bencana') || lower.includes('kebencanaan')) {
      return 'bg-rose-50 text-[#A32A29] border-rose-200/80';
    }
    if (lower.includes('sosial') || lower.includes('bansos')) {
      return 'bg-rose-50 text-[#A32A29] border-rose-200/80';
    }
    if (lower.includes('budaya') || lower.includes('pemuda')) {
      return 'bg-rose-50 text-[#A32A29] border-rose-200/80';
    }
    return 'bg-slate-50 text-slate-700 border-slate-200';
  };

  const sizeClasses =
    size === 'sm' ? 'text-[11px] px-2.5 py-0.5 font-medium' : 'text-xs px-3 py-1 font-semibold';

  return (
    <span
      className={`inline-flex items-center rounded-md border ${getCategoryColor(
        category
      )} ${sizeClasses} ${className}`}
    >
      {category}
    </span>
  );
}
