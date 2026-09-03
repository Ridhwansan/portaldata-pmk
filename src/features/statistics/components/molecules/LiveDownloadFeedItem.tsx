import React from 'react';
import { Download, Eye, MapPin } from 'lucide-react';
import { LiveActivityFeed } from '../../types/statistics.types';

interface LiveDownloadFeedItemProps {
  activity: LiveActivityFeed;
}

export function LiveDownloadFeedItem({ activity }: LiveDownloadFeedItemProps) {
  const isDownload = activity.action === 'download';

  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100/80 text-xs">
      <div
        className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
          isDownload
            ? 'bg-rose-100 text-[#A32A29]'
            : 'bg-sky-100 text-sky-700'
        }`}
      >
        {isDownload ? (
          <Download className="w-3.5 h-3.5" />
        ) : (
          <Eye className="w-3.5 h-3.5" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-slate-800 font-semibold line-clamp-1">
          {activity.datasetTitle}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            {activity.location}
          </span>
          {activity.format && (
            <span className="font-bold uppercase text-[#A32A29]">
              [{activity.format}]
            </span>
          )}
        </div>
      </div>

      <span className="text-[10px] text-slate-400 shrink-0">
        {activity.timestamp}
      </span>
    </div>
  );
}
