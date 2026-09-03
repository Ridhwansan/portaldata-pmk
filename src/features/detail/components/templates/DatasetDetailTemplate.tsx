'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { DatasetItem } from '@/features/catalog/types/catalog.types';
import { Breadcrumb } from '@/shared/components/molecules/Breadcrumb';
import { DatasetHeaderInfo } from '../molecules/DatasetHeaderInfo';
import { MetadataTable } from '../molecules/MetadataTable';
import { DatasetDataPreviewContainer } from '../organisms/DatasetDataPreviewContainer';
import { RelatedDatasets } from '../organisms/RelatedDatasets';
import { MOCK_DATASETS } from '@/features/catalog/data/datasets.mock';

interface DatasetDetailTemplateProps {
  dataset: DatasetItem;
}

export function DatasetDetailTemplate({ dataset }: DatasetDetailTemplateProps) {
  const breadcrumbItems = [
    { label: 'Etalase Data', href: '/' },
    { label: dataset.title, active: true },
  ];

  return (
    <div className="w-full bg-slate-50/60 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
          <Breadcrumb items={breadcrumbItems} />
          
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#A32A29] transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog</span>
          </Link>
        </div>

        {/* Dataset Header & Information Card */}
        <DatasetHeaderInfo dataset={dataset} />

        {/* Data Preview Section (Segmented Control CSV/JSON/XLS) */}
        <DatasetDataPreviewContainer dataset={dataset} />

        {/* Data Dictionary & Metadata Variable Table */}
        <MetadataTable columns={dataset.columns} />

        {/* Related Datasets */}
        <RelatedDatasets
          currentDatasetId={dataset.id}
          allDatasets={MOCK_DATASETS}
        />
      </div>
    </div>
  );
}
