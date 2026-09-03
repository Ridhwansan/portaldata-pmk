import { AdminDatasetItem, DatasetFormData, PermohonanDataItem, PermohonanStatus, UploadedFilePreview } from '../types/admin.types';
import { ADMIN_DATASETS, MOCK_PERMOHONAN_DATA } from '../data/adminMockData';

/**
 * Service Layer: DatasetStorageService
 * Menyediakan abstraksi manajemen data untuk operasi CRUD Dataset & Permohonan Data.
 * Struktur ini siap dihubungkan langsung ke Database (PostgreSQL, Supabase, Prisma, REST API, dsb).
 */
class DatasetStorageService {
  private datasets: AdminDatasetItem[] = [...ADMIN_DATASETS];
  private permohonanList: PermohonanDataItem[] = [...MOCK_PERMOHONAN_DATA];

  // --- Operasi Dataset ---

  public async getAllDatasets(): Promise<AdminDatasetItem[]> {
    // Simulasi delay async API
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.datasets]), 100);
    });
  }

  public async getDatasetById(id: string): Promise<AdminDatasetItem | null> {
    const dataset = this.datasets.find((d) => d.id === id);
    return dataset ? { ...dataset } : null;
  }

  public async createDataset(formData: DatasetFormData): Promise<AdminDatasetItem> {
    const newId = `ds-${String(this.datasets.length + 1).padStart(3, '0')}`;
    const newDataset: AdminDatasetItem = {
      id: newId,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      kedeputianId: formData.kedeputianId,
      publisher: formData.publisher,
      publishDate: new Date().toISOString().slice(0, 10),
      updateDate: new Date().toISOString().slice(0, 10),
      formats: formData.formats.length > 0 ? formData.formats : ['CSV'],
      status: formData.status,
      downloadCount: 0,
      viewCount: 0,
      fileSize: formData.uploadedFile ? `${(formData.uploadedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
      fileName: formData.uploadedFile?.name || 'dataset.csv',
    };

    this.datasets = [newDataset, ...this.datasets];
    return newDataset;
  }

  public async updateDataset(id: string, formData: Partial<DatasetFormData>): Promise<AdminDatasetItem | null> {
    const index = this.datasets.findIndex((d) => d.id === id);
    if (index === -1) return null;

    const existing = this.datasets[index];
    const updated: AdminDatasetItem = {
      ...existing,
      title: formData.title || existing.title,
      description: formData.description || existing.description,
      category: formData.category || existing.category,
      kedeputianId: formData.kedeputianId || existing.kedeputianId,
      publisher: formData.publisher || existing.publisher,
      status: formData.status || existing.status,
      formats: formData.formats || existing.formats,
      updateDate: new Date().toISOString().slice(0, 10),
    };

    this.datasets[index] = updated;
    return updated;
  }

  public async deleteDataset(id: string): Promise<boolean> {
    const initialLen = this.datasets.length;
    this.datasets = this.datasets.filter((d) => d.id !== id);
    return this.datasets.length < initialLen;
  }

  // --- Operasi Permohonan Data ---

  public async getAllPermohonan(): Promise<PermohonanDataItem[]> {
    return [...this.permohonanList];
  }

  public async updatePermohonanStatus(
    id: string,
    status: PermohonanStatus,
    adminNotes?: string
  ): Promise<PermohonanDataItem | null> {
    const index = this.permohonanList.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated = {
      ...this.permohonanList[index],
      status,
      adminNotes: adminNotes ?? this.permohonanList[index].adminNotes,
    };

    this.permohonanList[index] = updated;
    return updated;
  }

  // --- File Parser Helper Simulator ---

  public async parseUploadedFile(file: File): Promise<UploadedFilePreview> {
    const extension = file.name.split('.').pop()?.toLowerCase();
    let format: 'CSV' | 'JSON' | 'XLS' = 'CSV';
    let columns: string[] = ['id', 'kode_wilayah', 'nama_wilayah', 'tahun', 'nilai_indikator'];
    let rowCount = 240;

    if (extension === 'json') {
      format = 'JSON';
      columns = ['metadata', 'summary', 'data_records', 'total_count'];
      rowCount = 1;
    } else if (extension === 'xlsx' || extension === 'xls') {
      format = 'XLS';
      columns = ['No', 'Kode_Prov', 'Provinsi', 'Target_2026', 'Realisasi_2026', 'Capaian_Persen'];
      rowCount = 38;
    } else if (extension === 'csv') {
      format = 'CSV';
      rowCount = 150;
    }

    return {
      name: file.name,
      size: file.size,
      type: file.type || `application/${extension}`,
      format,
      rowCount,
      columns,
    };
  }
}

export const datasetStorageService = new DatasetStorageService();
