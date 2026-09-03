import { notFound } from 'next/navigation';
import { ADMIN_DATASETS } from '@/features/admin/data/adminMockData';
import { DatasetFormContainer } from '@/features/admin/components/organisms/DatasetFormContainer';
import { Metadata } from 'next';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ADMIN_DATASETS.map((d) => ({
    id: d.id,
  }));
}

export const metadata: Metadata = {
  title: 'Edit Dataset - Portal Data Kemenko PMK',
};

export default async function EditDatasetPage({ params }: EditPageProps) {
  const { id } = await params;
  const dataset = ADMIN_DATASETS.find((d) => d.id === id);

  if (!dataset) {
    notFound();
  }

  const initialFormData = {
    title: dataset.title,
    slug: dataset.slug,
    category: dataset.category,
    kedeputianId: dataset.kedeputianId,
    publisher: dataset.publisher,
    description: dataset.description,
    formats: dataset.formats,
    status: dataset.status,
  };

  return (
    <DatasetFormContainer
      datasetId={dataset.id}
      initialData={initialFormData}
      isEditMode={true}
    />
  );
}
