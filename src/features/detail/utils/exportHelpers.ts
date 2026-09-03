import { DatasetItem } from '@/features/catalog/types/catalog.types';
import { FileFormat } from '@/shared/types/common.types';

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
    // Format simple XML spreadsheet or tab-separated values compatible with Excel
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
