import { DatasetFormContainer } from '@/features/admin/components/organisms/DatasetFormContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Input Dataset Baru - Portal Data Kemenko PMK',
};

export default function CreateDatasetPage() {
  return <DatasetFormContainer isEditMode={false} />;
}
