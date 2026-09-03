import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminSidebarItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
  badgeCount?: number;
}

export function AdminSidebarItem({
  label,
  href,
  icon,
  badgeCount,
}: AdminSidebarItemProps) {
  const pathname = usePathname();
  const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-4 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
        isActive
          ? 'bg-white text-[#A32A29] shadow-md font-extrabold scale-[1.01]'
          : 'text-white/85 hover:text-white hover:bg-white/10 font-semibold'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={isActive ? 'text-[#A32A29]' : 'text-white/80'}>{icon}</span>
        <span>{label}</span>
      </div>

      {badgeCount !== undefined && badgeCount > 0 && (
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
            isActive ? 'bg-[#A32A29] text-white' : 'bg-white/20 text-white border border-white/30'
          }`}
        >
          {badgeCount}
        </span>
      )}
    </Link>
  );
}
