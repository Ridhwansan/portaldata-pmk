import { MetricOverview, MonthlyDownloadData, CategoryStat, TopDatasetStat, LiveActivityFeed } from '../types/statistics.types';

export const METRIC_OVERVIEW: MetricOverview = {
  totalDatasets: 2450,
  totalDownloads: 148290,
  monthlyVisitors: 42500,
  popularFormat: 'CSV',
  popularFormatPercent: 64,
  totalInstitutions: 28,
};

export const MONTHLY_DOWNLOADS: MonthlyDownloadData[] = [
  { month: 'Jan', year: 2026, downloads: 9800, views: 24500 },
  { month: 'Feb', year: 2026, downloads: 11200, views: 28900 },
  { month: 'Mar', year: 2026, downloads: 14500, views: 36200 },
  { month: 'Apr', year: 2026, downloads: 13800, views: 33400 },
  { month: 'Mei', year: 2026, downloads: 16900, views: 41800 },
  { month: 'Jun', year: 2026, downloads: 18400, views: 44200 },
  { month: 'Jul', year: 2026, downloads: 19100, views: 47600 },
  { month: 'Agu', year: 2026, downloads: 21500, views: 52100 },
  { month: 'Sep', year: 2026, downloads: 23800, views: 58400 },
  { month: 'Okt', year: 2026, downloads: 26400, views: 64200 },
  { month: 'Nov', year: 2026, downloads: 28900, views: 71000 },
];

export const CATEGORY_STATS: CategoryStat[] = [
  { category: 'Pendidikan', count: 624, percentage: 25.5, color: '#A32A29' },
  { category: 'Kesehatan & Gizi', count: 538, percentage: 22.0, color: '#C2410C' },
  { category: 'Kesejahteraan Sosial', count: 512, percentage: 20.9, color: '#0284C7' },
  { category: 'Kemiskinan & Bansos', count: 480, percentage: 19.6, color: '#16A34A' },
  { category: 'Kebudayaan & Pemuda', count: 296, percentage: 12.0, color: '#7C3AED' },
];

export const TOP_DOWNLOADED_DATASETS: TopDatasetStat[] = [
  {
    id: 'ds-004',
    title: 'Data Terpadu Kesejahteraan Sosial Penerima Bansos PKH dan Sembako',
    category: 'Kesejahteraan Sosial',
    publisher: 'Kemensos RI',
    downloads: 31050,
    formats: ['CSV', 'JSON', 'XLS'],
  },
  {
    id: 'ds-005',
    title: 'Prevalensi dan Percepatan Penurunan Stunting Balita per Kabupaten',
    category: 'Kesehatan',
    publisher: 'BKKBN & Kemenkes',
    downloads: 28900,
    formats: ['CSV', 'JSON'],
  },
  {
    id: 'ds-003',
    title: 'Data proyeksi terjadinya bencana di seluruh indonesia tahun 2026',
    category: 'Kebencanaan',
    publisher: 'BNPB',
    downloads: 22400,
    formats: ['CSV', 'JSON'],
  },
  {
    id: 'ds-002',
    title: 'Data masyarakat terdampak tuberculosis yang berhasil ditangani',
    category: 'Kesehatan',
    publisher: 'Kemenkes RI',
    downloads: 19820,
    formats: ['CSV', 'XLS'],
  },
  {
    id: 'ds-001',
    title: 'Tingkat partisipasi sekolah mulai dari TK hingga SMA',
    category: 'Pendidikan',
    publisher: 'Kemendikdasmen',
    downloads: 14230,
    formats: ['CSV', 'JSON'],
  },
];

export const LIVE_ACTIVITY_FEEDS: LiveActivityFeed[] = [
  {
    id: 'act-1',
    action: 'download',
    datasetTitle: 'Data Terpadu Kesejahteraan Sosial Penerima Bansos',
    format: 'CSV',
    location: 'Jakarta Pusat, DKI Jakarta',
    timestamp: '2 menit yang lalu',
  },
  {
    id: 'act-2',
    action: 'download',
    datasetTitle: 'Prevalensi Penurunan Stunting Balita per Kabupaten',
    format: 'JSON',
    location: 'Bandung, Jawa Barat',
    timestamp: '5 menit yang lalu',
  },
  {
    id: 'act-3',
    action: 'view',
    datasetTitle: 'Tingkat partisipasi sekolah mulai TK hingga SMA',
    location: 'Surabaya, Jawa Timur',
    timestamp: '8 menit yang lalu',
  },
  {
    id: 'act-4',
    action: 'download',
    datasetTitle: 'Data Proyeksi Terjadinya Bencana Indonesia 2026',
    format: 'XLS',
    location: 'Padang, Sumatera Barat',
    timestamp: '14 menit yang lalu',
  },
];
