'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface NavDropdownProps {
  label: string;
  href?: string;
  items?: { label: string; href: string; description?: string }[];
}

export function NavDropdown({ label, href = '#', items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const hasItems = items && items.length > 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!hasItems) {
    return (
      <Link
        href={href}
        className="text-white/90 hover:text-white text-sm font-medium py-2 px-3 rounded-md hover:bg-white/10 transition-colors"
      >
        {label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium py-2 px-3 rounded-md hover:bg-white/10 transition-colors focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-4 h-4 text-white/80 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-rose-50 hover:text-[#A32A29] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <div className="font-medium">{item.label}</div>
              {item.description && (
                <div className="text-xs text-slate-400 mt-0.5">{item.description}</div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
