import { DatasetItem } from '@/features/catalog/types/catalog.types';
import { FileFormat } from '@/shared/types/common.types';

export function getStructuredMetadata(dataset: DatasetItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    identifier: dataset.id,
    name: dataset.title,
    description: dataset.fullDescription || dataset.description,
    category: dataset.category,
    organization: {
      '@type': 'GovernmentOrganization',
      name: dataset.publisher,
      code: dataset.publisherCode,
      superOrganization: 'Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan',
      kedeputian: dataset.kedeputianName,
    },
    temporalCoverage: dataset.timePeriod || '2026',
    spatialCoverage: dataset.coverageArea || 'Nasional (38 Provinsi)',
    accrualPeriodicity: dataset.updateFrequency,
    license: dataset.license,
    licenseUrl: dataset.licenseUrl || 'https://creativecommons.org/licenses/by/4.0/',
    standardReference: dataset.standardReference || 'Prinsip Satu Data Indonesia (Perpres No. 39/2019)',
    spatialResolution: dataset.spatialResolution || 'Tingkat Provinsi & Kabupaten/Kota',
    temporalGranularity: dataset.temporalGranularity || 'Tahunan',
    contactPoint: {
      '@type': 'ContactPoint',
      name: dataset.contactPoint?.name || 'Walidata Kemenko PMK',
      email: dataset.contactPoint?.email || 'data@kemenkopmk.go.id',
      role: dataset.contactPoint?.role || 'Pengelola Portal Data Terbuka',
    },
    datePublished: dataset.publishDate,
    dateModified: dataset.updateDate,
    distribution: dataset.formats.map((fmt) => ({
      '@type': 'DataDownload',
      encodingFormat: fmt === 'CSV' ? 'text/csv' : fmt === 'JSON' ? 'application/json' : 'application/vnd.ms-excel',
      contentUrl: `https://data.kemenkopmk.go.id/dataset/${dataset.slug}/download.${fmt.toLowerCase()}`,
    })),
    keywords: dataset.tags,
    variableMeasured: dataset.columns.map((col) => ({
      '@type': 'PropertyValue',
      name: col.name,
      description: col.description,
      dataType: col.type,
      unitText: col.unit || 'Standard Unit',
      valueSample: col.sample,
      required: col.isRequired !== undefined ? col.isRequired : true,
    })),
  };
}

export function triggerDownloadMetadata(
  dataset: DatasetItem,
  format: 'JSON' | 'CSV' | 'MD' = 'JSON'
) {
  let content = '';
  let mimeType = 'text/plain';
  let filename = `${dataset.slug}-metadata-${new Date().toISOString().slice(0, 10)}`;

  if (format === 'JSON') {
    mimeType = 'application/json;charset=utf-8;';
    filename += '.json';
    const metadataObj = getStructuredMetadata(dataset);
    content = JSON.stringify(metadataObj, null, 2);
  } else if (format === 'CSV') {
    mimeType = 'text/csv;charset=utf-8;';
    filename = `${dataset.slug}-kamus-data-${new Date().toISOString().slice(0, 10)}.csv`;
    const headers = ['Nama_Kolom', 'Tipe_Data', 'Satuan_Unit', 'Deskripsi_Variabel', 'Contoh_Nilai'];
    const rows = dataset.columns.map((col) => [
      `"${col.name}"`,
      `"${col.type}"`,
      `"${col.unit || '-'}"`,
      `"${col.description.replace(/"/g, '""')}"`,
      `"${String(col.sample).replace(/"/g, '""')}"`,
    ].join(','));
    content = `${headers.join(',')}\n${rows.join('\n')}`;
  } else if (format === 'MD') {
    mimeType = 'text/markdown;charset=utf-8;';
    filename += '.md';
    content = `# Metadata & Kamus Data: ${dataset.title}

- **ID Dataset**: \`${dataset.id}\`
- **Produsen Data**: ${dataset.publisher} (${dataset.publisherCode || 'PMK'})
- **Kedeputian Pembina**: ${dataset.kedeputianName}
- **Kategori**: ${dataset.category}
- **Tanggal Publikasi**: ${dataset.publishDate}
- **Pembaruan Terakhir**: ${dataset.updateDate} (${dataset.updateFrequency})
- **Cakupan Spasial**: ${dataset.coverageArea || 'Nasional'}
- **Periode Waktu**: ${dataset.timePeriod || '2026'}
- **Lisensi**: ${dataset.license}
- **Standar Referensi**: ${dataset.standardReference || 'Satu Data Indonesia'}

## Deskripsi
${dataset.fullDescription || dataset.description}

## Kamus Variabel (Data Dictionary)

| Nama Kolom | Tipe Data | Satuan | Deskripsi | Contoh Nilai |
| :--- | :--- | :--- | :--- | :--- |
${dataset.columns.map((c) => `| \`${c.name}\` | ${c.type} | ${c.unit || '-'} | ${c.description} | ${c.sample} |`).join('\n')}

---
*Dikeluarkan oleh Portal Data Terbuka Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan (Kemenko PMK)*
`;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function triggerDownloadDataset(dataset: DatasetItem, format: FileFormat) {
  let content = '';
  let mimeType = 'text/plain';
  let filename = `${dataset.slug}-${new Date().toISOString().slice(0, 10)}`;

  if (format === 'CSV') {
    mimeType = 'text/csv;charset=utf-8;';
    filename += '.csv';
    const headers = dataset.columns.map((col) => col.name).join(',');
    const rows = dataset.previewRows
      .map((row) =>
        dataset.columns
          .map((col) => {
            const val = row[col.name];
            return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
          })
          .join(',')
      )
      .join('\n');
    content = `${headers}\n${rows}`;
  } else if (format === 'JSON') {
    mimeType = 'application/json;charset=utf-8;';
    filename += '.json';
    content = JSON.stringify(dataset.jsonData, null, 2);
  } else if (format === 'XLS') {
    mimeType = 'application/vnd.ms-excel;charset=utf-8;';
    filename += '.xls';
    const headers = dataset.columns.map((col) => col.name).join('\t');
    const rows = dataset.previewRows
      .map((row) => dataset.columns.map((col) => row[col.name]).join('\t'))
      .join('\n');
    content = `${headers}\n${rows}`;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
