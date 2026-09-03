import { CatalogTemplate } from '@/features/catalog/components/templates/CatalogTemplate';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Katalog Dataset Terbuka - Etalase Data Kemenko PMK',
  description:
    'Eksplorasi seluruh katalog dataset terbuka Kemenko PMK dengan filter kedeputian, format file CSV/JSON/XLS, dan pengurutan data.',
};

export default function DatasetPage() {
  return (
    <div className="w-full">
      <CatalogTemplate />
    </div>
  );
}
