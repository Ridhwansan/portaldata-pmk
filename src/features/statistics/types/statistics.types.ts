export interface MetricOverview {
  totalDatasets: number;
  totalDownloads: number;
  monthlyVisitors: number;
  popularFormat: string;
  popularFormatPercent: number;
  totalInstitutions: number;
}

export interface MonthlyDownloadData {
  month: string;
  year: number;
  downloads: number;
  views: number;
}

export interface CategoryStat {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

export interface TopDatasetStat {
  id: string;
  title: string;
  category: string;
  publisher: string;
  downloads: number;
  formats: string[];
}

export interface LiveActivityFeed {
  id: string;
  action: 'download' | 'view';
  datasetTitle: string;
  format?: string;
  location: string;
  timestamp: string;
}
