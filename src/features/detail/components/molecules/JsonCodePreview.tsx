'use client';

import React from 'react';
import { CopyCodeButton } from '../atoms/CopyCodeButton';

interface JsonCodePreviewProps {
  data: Record<string, any>;
}

export function JsonCodePreview({ data }: JsonCodePreviewProps) {
  const jsonString = JSON.stringify(data, null, 2);
  const lines = jsonString.split('\n');

  return (
    <div className="relative rounded-2xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-slate-400 font-mono ml-2">dataset_payload.json</span>
        </div>

        <CopyCodeButton textToCopy={jsonString} />
      </div>

      {/* Code Block with line numbers */}
      <div className="p-4 max-h-[460px] overflow-auto font-mono text-xs sm:text-sm text-slate-200">
        <pre className="flex">
          <code className="text-slate-600 select-none pr-4 text-right border-r border-slate-800 mr-4">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </code>
          <code className="text-emerald-400 flex-1 whitespace-pre overflow-x-auto">
            {jsonString}
          </code>
        </pre>
      </div>
    </div>
  );
}
