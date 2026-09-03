import React from 'react';
import {
  LayoutGrid,
  Users,
  Smile,
  Heart,
  GraduationCap,
  Trophy,
  AlertTriangle,
} from 'lucide-react';
import { TOPIC_LIST } from '../../data/datasets.mock';

interface TopicFilterRowProps {
  selectedTopic: string;
  onSelectTopic: (topicId: string) => void;
}

export function TopicFilterRow({
  selectedTopic,
  onSelectTopic,
}: TopicFilterRowProps) {
  const getTopicIcon = (iconName: string, isActive: boolean) => {
    const iconClass = `w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`;
    switch (iconName) {
      case 'LayoutGrid':
        return <LayoutGrid className={iconClass} />;
      case 'Users':
        return <Users className={iconClass} />;
      case 'Smile':
        return <Smile className={iconClass} />;
      case 'Heart':
        return <Heart className={iconClass} />;
      case 'GraduationCap':
        return <GraduationCap className={iconClass} />;
      case 'Trophy':
        return <Trophy className={iconClass} />;
      case 'AlertTriangle':
        return <AlertTriangle className={iconClass} />;
      default:
        return <LayoutGrid className={iconClass} />;
    }
  };

  return (
    <div className="py-8 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Seleksi Dataset Berdasarkan Topik
        </h2>

        <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
          {TOPIC_LIST.map((topic) => {
            const isActive = selectedTopic === topic.id;

            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => onSelectTopic(topic.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-[#A32A29] text-white shadow-md shadow-[#A32A29]/20 font-bold scale-[1.02]'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {getTopicIcon(topic.icon, isActive)}
                <span>{topic.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
