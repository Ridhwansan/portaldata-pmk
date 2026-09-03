import { FileFormat } from '@/shared/types/common.types';

export type PreviewTab = 'CSV' | 'JSON' | 'XLS';

export interface DatasetDetailState {
  activePreviewTab: PreviewTab;
  searchFilter: string;
  currentPage: number;
  pageSize: number;
}
