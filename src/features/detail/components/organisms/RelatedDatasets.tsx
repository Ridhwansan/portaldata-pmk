import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { DatasetItem } from '@/features/catalog/types/catalog.types';
import { DatasetCard } from '@/features/catalog/components/molecules/DatasetCard';

interface RelatedDatasetsProps {
  currentDatasetId: string;
  allDatasets: DatasetItem[];
}

export function RelatedDatasets({
  currentDatasetId,
  allDatasets,
}: RelatedDatasetsProps) {
  const currentDataset = allDatasets.find((d) => d.id === currentDatasetId);
  const related = allDatasets
    .filter(
      (d) =>
        d.id !== currentDatasetId &&
        (d.category === currentDataset?.category ||
          d.kedeputianId === currentDataset?.kedeputianId)
    )
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="space-y-4 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#A32A29]" />
          <h3 className="font-bold text-slate-900 text-lg sm:text-xl">
            Dataset Terkait Lainnya
          </h3>
        </div>
        <Link
          href="/"
          className="text-xs sm:text-sm font-semibold text-[#A32A29] hover:underline flex items-center gap-1"
        >
          <span>Lihat Semua</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {related.map((dataset) => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
      </div>
    </div>
  );
}
