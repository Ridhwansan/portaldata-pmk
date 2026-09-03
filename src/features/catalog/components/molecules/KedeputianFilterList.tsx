import React from 'react';
import {
  LayoutGrid,
  ShieldCheck,
  HeartHandshake,
  GraduationCap,
  Activity,
  Flame,
} from 'lucide-react';
import { KedeputianId } from '../../types/catalog.types';
import { KEDEPUTIAN_LIST } from '../../data/datasets.mock';

interface KedeputianFilterListProps {
  selectedKedeputian: KedeputianId;
  onSelect: (id: KedeputianId) => void;
}

export function KedeputianFilterList({
  selectedKedeputian,
  onSelect,
}: KedeputianFilterListProps) {
  const getIcon = (iconName: string, isActive: boolean) => {
    const iconClass = `w-4 h-4 shrink-0 ${isActive ? 'text-[#A32A29]' : 'text-white/80'}`;
    switch (iconName) {
      case 'LayoutGrid':
        return <LayoutGrid className={iconClass} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} />;
      case 'HeartHandshake':
        return <HeartHandshake className={iconClass} />;
      case 'GraduationCap':
        return <GraduationCap className={iconClass} />;
      case 'Activity':
        return <Activity className={iconClass} />;
      case 'Flame':
        return <Flame className={iconClass} />;
      default:
        return <LayoutGrid className={iconClass} />;
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="text-[11px] font-bold uppercase tracking-wider text-white/70 px-3 pb-1">
        Kedeputian
      </div>
      {KEDEPUTIAN_LIST.map((item) => {
        const isActive = selectedKedeputian === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 text-left cursor-pointer ${
              isActive
                ? 'bg-white text-[#A32A29] font-bold shadow-md'
                : 'text-white/90 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              {getIcon(item.iconName, isActive)}
              <span className="truncate">{item.name}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
