import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = 'Cari dataset...',
  className = '',
}: SearchInputProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center w-full max-w-2xl mx-auto ${className}`}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 rounded-full py-4 pl-7 pr-36 text-sm sm:text-base shadow-sm focus:outline-none focus:border-[#A32A29] focus:ring-4 focus:ring-[#A32A29]/10 transition-all duration-200"
      />
      <div className="absolute right-2 flex items-center">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#A32A29] hover:bg-[#881E1D] text-white text-sm font-bold shadow-sm transition-all duration-200 hover:shadow hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <span>Cari Data</span>
          <Search className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
