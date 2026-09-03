'use client';

import React, { useState } from 'react';
import { Eye, Layers } from 'lucide-react';
import { DatasetItem } from '@/features/catalog/types/catalog.types';
import { PreviewTab } from '../../types/detail.types';
import { SegmentedTab } from '../atoms/SegmentedTab';
import { CsvTablePreview } from '../molecules/CsvTablePreview';
import { JsonCodePreview } from '../molecules/JsonCodePreview';
import { XlsSpreadsheetPreview } from '../molecules/XlsSpreadsheetPreview';
import { DownloadButton } from '../atoms/DownloadButton';

interface DatasetDataPreviewContainerProps {
  dataset: DatasetItem;
}

export function DatasetDataPreviewContainer({ dataset }: DatasetDataPreviewContainerProps) {
  // Available tabs derived from dataset formats (CSV, JSON, XLS)
  const availableTabs = dataset.formats as PreviewTab[];
  const [activeTab, setActiveTab] = useState<PreviewTab>(availableTabs[0] || 'CSV');

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header & Segmented Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#A32A29]" />
            <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
              Pratinjau Data (Data Preview)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Eksplorasi sampel data secara interaktif sesuai format pilihan sebelum mengunduh.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SegmentedTab
            availableTabs={availableTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>

      {/* Dynamic Tab Content */}
      <div className="pt-2">
        {activeTab === 'CSV' && (
          <CsvTablePreview
            columns={dataset.columns}
            rows={dataset.previewRows}
          />
        )}

        {activeTab === 'JSON' && (
          <JsonCodePreview
            data={dataset.jsonData}
          />
        )}

        {activeTab === 'XLS' && (
          <XlsSpreadsheetPreview
            columns={dataset.columns}
            rows={dataset.previewRows}
          />
        )}
      </div>

      {/* Bottom Download Trigger matching current active tab format */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <span>
          Menampilkan sampel 10 baris pertama untuk keperluan pratinjau cepat.
        </span>
        <DownloadButton
          dataset={dataset}
          format={activeTab}
          variant="outline"
          className="!py-2 text-xs"
        />
      </div>
    </div>
  );
}
