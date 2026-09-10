'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { DatasetItem } from '@/features/catalog/types/catalog.types';
import { Breadcrumb } from '@/shared/components/molecules/Breadcrumb';
import { DatasetHeaderInfo } from '../molecules/DatasetHeaderInfo';
import { MetadataTable } from '../molecules/MetadataTable';
import { TechnicalMetadataCard } from '../molecules/TechnicalMetadataCard';
import { MetadataViewerModal } from '../molecules/MetadataViewerModal';
import { DatasetDataPreviewContainer } from '../organisms/DatasetDataPreviewContainer';
import { RelatedDatasets } from '../organisms/RelatedDatasets';
import { MOCK_DATASETS } from '@/features/catalog/data/datasets.mock';

interface DatasetDetailTemplateProps {
  dataset: DatasetItem;
}

export function DatasetDetailTemplate({ dataset }: DatasetDetailTemplateProps) {
  const [isMetadataModalOpen, setIsMetadataModalOpen] = useState(false);

  const breadcrumbItems = [
    { label: 'Etalase Data', href: '/' },
    { label: 'Katalog', href: '/dataset' },
    { label: dataset.title, active: true },
  ];

  return (
    <div className="w-full bg-slate-50/70 min-h-screen py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
          <Breadcrumb items={breadcrumbItems} />
          
          <Link
            href="/dataset"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#A32A29] transition-colors self-start sm:self-auto bg-white px-4 py-2 rounded-full border border-slate-200/80 shadow-2xs hover:shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog</span>
          </Link>
        </div>

        {/* 1. Dataset Header & Information Card (Primary Hero & Quick Actions) */}
        <DatasetHeaderInfo
          dataset={dataset}
          onOpenMetadataModal={() => setIsMetadataModalOpen(true)}
        />

        {/* 2. Interactive Data Preview Section (Segmented Control CSV/JSON/XLS) */}
        <DatasetDataPreviewContainer dataset={dataset} />

        {/* 3. Data Dictionary & Variable Specifications (Kamus Data) */}
        <MetadataTable
          columns={dataset.columns}
          dataset={dataset}
        />

        {/* 4. Technical Specifications & Governance (Satu Data Indonesia) */}
        <TechnicalMetadataCard
          dataset={dataset}
          onOpenModal={() => setIsMetadataModalOpen(true)}
        />

        {/* 5. Related Datasets */}
        <RelatedDatasets
          currentDatasetId={dataset.id}
          allDatasets={MOCK_DATASETS}
        />
      </div>

      {/* Metadata Viewer Modal */}
      <MetadataViewerModal
        isOpen={isMetadataModalOpen}
        onClose={() => setIsMetadataModalOpen(false)}
        dataset={dataset}
      />
    </div>
  );
}

