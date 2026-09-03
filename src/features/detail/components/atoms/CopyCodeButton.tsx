'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyCodeButtonProps {
  textToCopy: string;
  className?: string;
}

export function CopyCodeButton({ textToCopy, className = '' }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer border border-slate-700 ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-300">Tersalin!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" />
          <span>Salin JSON</span>
        </>
      )}
    </button>
  );
}
