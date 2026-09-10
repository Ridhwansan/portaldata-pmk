import { notFound } from 'next/navigation';
import { ADMIN_DATASETS } from '@/features/admin/data/adminMockData';
import { MOCK_DATASETS } from '@/features/catalog/data/datasets.mock';
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
  const adminDataset = ADMIN_DATASETS.find((d) => d.id === id);
  const catalogDataset = MOCK_DATASETS.find((d) => d.id === id);

  if (!adminDataset && !catalogDataset) {
    notFound();
  }

  const dataset = catalogDataset || adminDataset!;

  const initialFormData = {
    title: dataset.title,
    slug: dataset.slug,
    category: dataset.category,
    kedeputianId: dataset.kedeputianId,
    publisher: dataset.publisher,
    publisherCode: 'publisherCode' in dataset ? dataset.publisherCode : 'Kemendikdasmen',
    updateFrequency: 'updateFrequency' in dataset ? dataset.updateFrequency : 'Tahunan',
    coverageArea: 'coverageArea' in dataset ? dataset.coverageArea : 'Nasional (38 Provinsi)',
    timePeriod: 'timePeriod' in dataset ? dataset.timePeriod : '2026',
    license: 'license' in dataset ? dataset.license : 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    standardReference: 'standardReference' in dataset ? dataset.standardReference : 'Prinsip Satu Data Indonesia (Perpres No. 39/2019)',
    spatialResolution: 'spatialResolution' in dataset ? dataset.spatialResolution : 'Tingkat Provinsi & Kabupaten/Kota',
    temporalGranularity: 'temporalGranularity' in dataset ? dataset.temporalGranularity : 'Tahunan',
    contactName: 'contactPoint' in dataset && dataset.contactPoint ? dataset.contactPoint.name : 'Walidata Kemenko PMK',
    contactEmail: 'contactPoint' in dataset && dataset.contactPoint ? dataset.contactPoint.email : 'data@kemenkopmk.go.id',
    contactRole: 'contactPoint' in dataset && dataset.contactPoint ? dataset.contactPoint.role : 'Pengelola Portal Data',
    description: dataset.description,
    fullDescription: 'fullDescription' in dataset ? dataset.fullDescription : dataset.description,
    tags: 'tags' in dataset && dataset.tags ? dataset.tags.join(', ') : 'Pendidikan, Data Terbuka',
    formats: dataset.formats,
    status: 'status' in adminDataset! ? adminDataset!.status : 'published',
    columns: 'columns' in dataset && dataset.columns ? dataset.columns : undefined,
  };

  return (
    <DatasetFormContainer
      datasetId={dataset.id}
      initialData={initialFormData}
      isEditMode={true}
    />
  );
}
