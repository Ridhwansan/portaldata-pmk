import React from 'react';
import { Table, Code, Sheet } from 'lucide-react';
import { PreviewTab } from '../../types/detail.types';

interface SegmentedTabProps {
  availableTabs: PreviewTab[];
  activeTab: PreviewTab;
  onTabChange: (tab: PreviewTab) => void;
  className?: string;
}

export function SegmentedTab({
  availableTabs,
  activeTab,
  onTabChange,
  className = '',
}: SegmentedTabProps) {
  const getTabIcon = (tab: PreviewTab) => {
    switch (tab) {
      case 'CSV':
        return <Table className="w-4 h-4" />;
      case 'JSON':
        return <Code className="w-4 h-4" />;
      case 'XLS':
        return <Sheet className="w-4 h-4" />;
    }
  };

  const getTabLabel = (tab: PreviewTab) => {
    switch (tab) {
      case 'CSV':
        return 'Pratinjau Tabel (CSV)';
      case 'JSON':
        return 'Pratinjau JSON';
      case 'XLS':
        return 'Pratinjau Excel (XLS)';
    }
  };

  return (
    <div
      className={`inline-flex p-1 bg-slate-100 rounded-full border border-slate-200 max-w-full overflow-x-auto ${className}`}
    >
      {availableTabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
              isActive
                ? 'bg-white text-[#A32A29] shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <span className={isActive ? 'text-[#A32A29]' : 'text-slate-400'}>
              {getTabIcon(tab)}
            </span>
            <span>{getTabLabel(tab)}</span>
          </button>
        );
      })}
    </div>
  );
}
