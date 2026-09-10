import { FileFormat } from '@/shared/types/common.types';
import { KedeputianId, DatasetMetadataColumn, DatasetContactPoint } from '@/features/catalog/types/catalog.types';

export type DatasetStatus = 'published' | 'draft' | 'archived';

export type PermohonanStatus = 'pending' | 'processing' | 'approved' | 'rejected';

export interface AdminDatasetItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription?: string;
  category: string;
  kedeputianId: KedeputianId;
  publisher: string;
  publisherCode?: string;
  publishDate: string;
  updateDate: string;
  updateFrequency?: string;
  coverageArea?: string;
  timePeriod?: string;
  license?: string;
  standardReference?: string;
  spatialResolution?: string;
  temporalGranularity?: string;
  contactPoint?: DatasetContactPoint;
  formats: FileFormat[];
  status: DatasetStatus;
  downloadCount: number;
  viewCount: number;
  fileSize?: string;
  fileName?: string;
  columns?: DatasetMetadataColumn[];
}

export interface PermohonanDataItem {
  id: string;
  ticketId: string;
  namaLengkap: string;
  nik: string;
  email: string;
  noHp: string;
  lembaga: string;
  kategoriLembaga: string;
  kategoriData: string;
  judulData: string;
  tujuanPenggunaan: string;
  formatDibutuhkan: string;
  createdAt: string;
  status: PermohonanStatus;
  adminNotes?: string;
  responseFileUrl?: string;
}

export interface UploadedFilePreview {
  name: string;
  size: number;
  type: string;
  format: FileFormat;
  rowCount: number;
  columns: string[];
  rawSample?: string;
}

export interface DatasetFormData {
  title: string;
  slug: string;
  category: string;
  kedeputianId: KedeputianId;
  publisher: string;
  publisherCode: string;
  updateFrequency: string;
  coverageArea: string;
  timePeriod: string;
  license: string;
  standardReference?: string;
  spatialResolution?: string;
  temporalGranularity?: string;
  contactName?: string;
  contactEmail?: string;
  contactRole?: string;
  description: string;
  fullDescription: string;
  tags: string;
  formats: FileFormat[];
  status: DatasetStatus;
  uploadedFile?: UploadedFilePreview;
  columns?: DatasetMetadataColumn[];
}
