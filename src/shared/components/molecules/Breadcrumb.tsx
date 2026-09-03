import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '@/shared/types/common.types';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs md:text-sm text-slate-500 overflow-x-auto whitespace-nowrap py-1 ${className}`}>
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 text-slate-500 hover:text-[#A32A29] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </Link>
        </li>

        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {item.href && !item.active ? (
              <Link
                href={item.href}
                className="text-slate-600 hover:text-[#A32A29] transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-slate-800 max-w-[200px] sm:max-w-md truncate">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
