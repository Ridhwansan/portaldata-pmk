import { FileFormat } from '@/shared/types/common.types';

export type KedeputianId = 'all' | 'deputi-1' | 'deputi-2' | 'deputi-3' | 'deputi-4' | 'deputi-5';

export interface KedeputianInfo {
  id: KedeputianId;
  name: string;
  fullName: string;
  iconName: string;
  count: number;
}

export type SortOrder = 'newest' | 'oldest' | 'downloads' | 'views' | 'title_asc' | 'title_desc';

export interface DatasetMetadataColumn {
  name: string;
  type: string;
  description: string;
  sample: string | number;
}

export interface DatasetItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  kedeputianId: KedeputianId;
  kedeputianName: string;
  publisher: string;
  publisherCode: string;
  publisherLogo?: string;
  publishDate: string;
  updateDate: string;
  updateFrequency: string;
  license: string;
  formats: FileFormat[];
  downloadCount: number;
  viewCount: number;
  rating: number;
  tags: string[];
  coverageArea: string;
  timePeriod: string;
  columns: DatasetMetadataColumn[];
  previewRows: Record<string, string | number>[];
  jsonData: Record<string, any>;
}

export interface CatalogFilterState {
  searchTerm: string;
  kedeputian: KedeputianId;
  formats: FileFormat[];
  sortBy: SortOrder;
  page: number;
  itemsPerPage: number;
}
