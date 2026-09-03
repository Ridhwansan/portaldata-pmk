import { notFound } from 'next/navigation';
import { MOCK_DATASETS } from '@/features/catalog/data/datasets.mock';
import { DatasetDetailTemplate } from '@/features/detail/components/templates/DatasetDetailTemplate';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return MOCK_DATASETS.map((dataset) => ({
    id: dataset.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const dataset = MOCK_DATASETS.find((d) => d.id === id);

  if (!dataset) {
    return {
      title: 'Dataset Tidak Ditemukan - Etalase Data Kemenko PMK',
    };
  }

  return {
    title: `${dataset.title} - Etalase Data Kemenko PMK`,
    description: dataset.description,
  };
}

export default async function DatasetDetailPage({ params }: PageProps) {
  const { id } = await params;
  const dataset = MOCK_DATASETS.find((d) => d.id === id);

  if (!dataset) {
    notFound();
  }

  return <DatasetDetailTemplate dataset={dataset} />;
}
