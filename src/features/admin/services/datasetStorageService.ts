import {
  AdminDatasetItem,
  DatasetFormData,
  PermohonanDataItem,
  PermohonanStatus,
  UploadedFilePreview,
} from '../types/admin.types';
import { DatasetMetadataColumn } from '@/features/catalog/types/catalog.types';
import { ADMIN_DATASETS, MOCK_PERMOHONAN_DATA } from '../data/adminMockData';

/**
 * =========================================================================================
 * SERVICE LAYER: DatasetStorageService
 * =========================================================================================
 * Menyediakan abstraksi data management untuk operasi CRUD Dataset & Permohonan Data.
 * 
 * PANDUAN INTEGRASI BACKEND UNTUK PROGRAMMER:
 * 1. Database Riil: Anda dapat mengganti array in-memory di bawah dengan query Prisma, Supabase,
 *    Drizzle, Mongoose, atau HTTP Fetch ke REST/GraphQL API backend Anda.
 * 2. Operasi Tambah/Edit: Seluruh data kamus data (columns) dan atribut teknis (PIC, Standar SDI)
 *    sudah terstruktur rapi dan siap disimpan ke tabel relasional (misal: tabel `datasets` dan `dataset_columns`).
 * 3. File Storage: Hubungkan `parseUploadedFile` ke S3 / Google Cloud Storage / MinIO bucket.
 * =========================================================================================
 */
class DatasetStorageService {
  private datasets: AdminDatasetItem[] = [...ADMIN_DATASETS];
  private permohonanList: PermohonanDataItem[] = [...MOCK_PERMOHONAN_DATA];

  // --- Operasi Dataset ---

  public async getAllDatasets(): Promise<AdminDatasetItem[]> {
    // [DEVELOPER HOOK]: Ganti dengan `await prisma.dataset.findMany({ include: { columns: true } })`
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.datasets]), 100);
    });
  }

  public async getDatasetById(id: string): Promise<AdminDatasetItem | null> {
    // [DEVELOPER HOOK]: Ganti dengan `await prisma.dataset.findUnique({ where: { id }, include: { columns: true } })`
    const dataset = this.datasets.find((d) => d.id === id);
    return dataset ? { ...dataset } : null;
  }

  public async createDataset(formData: DatasetFormData): Promise<AdminDatasetItem> {
    // [DEVELOPER HOOK]: Ganti dengan query INSERT / create database:
    // await prisma.dataset.create({ data: { ... } })
    const newId = `ds-${String(this.datasets.length + 1).padStart(3, '0')}`;

    const defaultColumns: DatasetMetadataColumn[] = formData.columns && formData.columns.length > 0
      ? formData.columns
      : [
          { name: 'id', type: 'Integer', description: 'Nomor identifikasi unik data', sample: 1, unit: 'ID' },
          { name: 'kode_wilayah', type: 'String', description: 'Kode baku wilayah menurut BPS/Kemendagri', sample: '31.71', unit: 'Kode' },
          { name: 'nama_wilayah', type: 'String', description: 'Nama provinsi atau kabupaten/kota', sample: 'DKI Jakarta' },
          { name: 'tahun', type: 'Integer', description: 'Tahun pencatatan data indikator', sample: 2026, unit: 'Tahun' },
          { name: 'nilai_indikator', type: 'Decimal', description: 'Besaran capaian nilai indikator', sample: 84.5, unit: 'Persen (%)' },
        ];

    const newDataset: AdminDatasetItem = {
      id: newId,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: formData.title,
      description: formData.description,
      fullDescription: formData.fullDescription,
      category: formData.category,
      kedeputianId: formData.kedeputianId,
      publisher: formData.publisher,
      publisherCode: formData.publisherCode || 'PMK',
      publishDate: new Date().toISOString().slice(0, 10),
      updateDate: new Date().toISOString().slice(0, 10),
      updateFrequency: formData.updateFrequency || 'Tahunan',
      coverageArea: formData.coverageArea || 'Nasional (38 Provinsi)',
      timePeriod: formData.timePeriod || '2026',
      license: formData.license || 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
      standardReference: formData.standardReference || 'Prinsip Satu Data Indonesia (Perpres No. 39/2019)',
      spatialResolution: formData.spatialResolution || 'Tingkat Provinsi & Kabupaten/Kota',
      temporalGranularity: formData.temporalGranularity || 'Tahunan',
      contactPoint: {
        name: formData.contactName || 'Walidata Kemenko PMK',
        email: formData.contactEmail || 'data@kemenkopmk.go.id',
        role: formData.contactRole || 'Pengelola Portal Data',
      },
      formats: formData.formats.length > 0 ? formData.formats : ['CSV'],
      status: formData.status,
      downloadCount: 0,
      viewCount: 0,
      fileSize: formData.uploadedFile ? `${(formData.uploadedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
      fileName: formData.uploadedFile?.name || 'dataset.csv',
      columns: defaultColumns,
    };

    this.datasets = [newDataset, ...this.datasets];
    return newDataset;
  }

  public async updateDataset(
    id: string,
    formData: Partial<DatasetFormData>
  ): Promise<AdminDatasetItem | null> {
    // [DEVELOPER HOOK]: Ganti dengan `await prisma.dataset.update({ where: { id }, data: { ... } })`
    const index = this.datasets.findIndex((d) => d.id === id);
    if (index === -1) return null;

    const existing = this.datasets[index];
    const updated: AdminDatasetItem = {
      ...existing,
      title: formData.title || existing.title,
      description: formData.description || existing.description,
      fullDescription: formData.fullDescription || existing.fullDescription,
      category: formData.category || existing.category,
      kedeputianId: formData.kedeputianId || existing.kedeputianId,
      publisher: formData.publisher || existing.publisher,
      publisherCode: formData.publisherCode || existing.publisherCode,
      updateFrequency: formData.updateFrequency || existing.updateFrequency,
      coverageArea: formData.coverageArea || existing.coverageArea,
      timePeriod: formData.timePeriod || existing.timePeriod,
      license: formData.license || existing.license,
      standardReference: formData.standardReference || existing.standardReference,
      status: formData.status || existing.status,
      formats: formData.formats || existing.formats,
      columns: formData.columns || existing.columns,
      contactPoint: formData.contactName
        ? {
            name: formData.contactName,
            email: formData.contactEmail || 'data@kemenkopmk.go.id',
            role: formData.contactRole || 'Walidata',
          }
        : existing.contactPoint,
      updateDate: new Date().toISOString().slice(0, 10),
    };

    this.datasets[index] = updated;
    return updated;
  }

  public async deleteDataset(id: string): Promise<boolean> {
    // [DEVELOPER HOOK]: Ganti dengan `await prisma.dataset.delete({ where: { id } })`
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

  public async parseUploadedFile(file: File): Promise<{
    preview: UploadedFilePreview;
    columns: DatasetMetadataColumn[];
  }> {
    const extension = file.name.split('.').pop()?.toLowerCase();
    let format: 'CSV' | 'JSON' | 'XLS' = 'CSV';
    let columnNames: string[] = ['id', 'kode_wilayah', 'nama_wilayah', 'tahun', 'nilai_indikator'];
    let rowCount = 240;

    let columns: DatasetMetadataColumn[] = [
      { name: 'id', type: 'Integer', description: 'Nomor identifikasi baris data', sample: 1, unit: 'ID' },
      { name: 'kode_wilayah', type: 'String', description: 'Kode wilayah referensi BPS', sample: '31.71', unit: 'Kode' },
      { name: 'nama_wilayah', type: 'String', description: 'Nama provinsi / daerah', sample: 'DKI Jakarta' },
      { name: 'tahun', type: 'Integer', description: 'Tahun pendataan', sample: 2026, unit: 'Tahun' },
      { name: 'nilai_indikator', type: 'Decimal', description: 'Nilai capaian indikator', sample: 88.4, unit: 'Persen (%)' },
    ];

    if (extension === 'json') {
      format = 'JSON';
      columnNames = ['metadata', 'summary', 'data_records', 'total_count'];
      rowCount = 1;
      columns = [
        { name: 'metadata', type: 'JSON', description: 'Objek metadata umum', sample: '{"version":"1.0"}' },
        { name: 'summary', type: 'JSON', description: 'Ringkasan statistik agregat', sample: '{"total": 1200}' },
        { name: 'data_records', type: 'Array', description: 'Array baris data utama', sample: '[{...}]' },
        { name: 'total_count', type: 'Integer', description: 'Jumlah total baris data', sample: 1200, unit: 'Baris' },
      ];
    } else if (extension === 'xlsx' || extension === 'xls') {
      format = 'XLS';
      columnNames = ['No', 'Kode_Prov', 'Provinsi', 'Target_2026', 'Realisasi_2026', 'Capaian_Persen'];
      rowCount = 38;
      columns = [
        { name: 'No', type: 'Integer', description: 'Nomor urut provinsi', sample: 1 },
        { name: 'Kode_Prov', type: 'String', description: 'Kode provinsi BPS', sample: '31', unit: 'Kode' },
        { name: 'Provinsi', type: 'String', description: 'Nama provinsi', sample: 'DKI Jakarta' },
        { name: 'Target_2026', type: 'Decimal', description: 'Target kinerja tahun 2026', sample: 90.0, unit: '%' },
        { name: 'Realisasi_2026', type: 'Decimal', description: 'Realisasi capaian tahun 2026', sample: 89.2, unit: '%' },
        { name: 'Capaian_Persen', type: 'Decimal', description: 'Persentase keberhasilan', sample: 99.1, unit: '%' },
      ];
    } else if (extension === 'csv') {
      format = 'CSV';
      rowCount = 150;
    }

    return {
      preview: {
        name: file.name,
        size: file.size,
        type: file.type || `application/${extension}`,
        format,
        rowCount,
        columns: columnNames,
      },
      columns,
    };
  }
}

export const datasetStorageService = new DatasetStorageService();

