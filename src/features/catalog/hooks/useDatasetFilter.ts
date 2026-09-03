'use client';

import { useState, useMemo } from 'react';
import { DatasetItem, CatalogFilterState, KedeputianId, SortOrder } from '../types/catalog.types';
import { FileFormat } from '@/shared/types/common.types';
import { MOCK_DATASETS } from '../data/datasets.mock';

const INITIAL_FILTER_STATE: CatalogFilterState = {
  searchTerm: '',
  kedeputian: 'all',
  formats: [],
  sortBy: 'newest',
  page: 1,
  itemsPerPage: 9,
};

export function useDatasetFilter(initialDatasets: DatasetItem[] = MOCK_DATASETS) {
  const [filters, setFilters] = useState<CatalogFilterState>(INITIAL_FILTER_STATE);

  const setSearchTerm = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm, page: 1 }));
  };

  const setKedeputian = (kedeputian: KedeputianId) => {
    setFilters((prev) => ({ ...prev, kedeputian, page: 1 }));
  };

  const toggleFormat = (format: FileFormat) => {
    setFilters((prev) => {
      const exists = prev.formats.includes(format);
      const newFormats = exists
        ? prev.formats.filter((f) => f !== format)
        : [...prev.formats, format];
      return { ...prev, formats: newFormats, page: 1 };
    });
  };

  const setSortBy = (sortBy: SortOrder) => {
    setFilters((prev) => ({ ...prev, sortBy, page: 1 }));
  };

  const setPage = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTER_STATE);
  };

  const filteredAndSortedDatasets = useMemo(() => {
    let result = [...initialDatasets];

    // Filter by Kedeputian
    if (filters.kedeputian !== 'all') {
      result = result.filter((item) => item.kedeputianId === filters.kedeputian);
    }

    // Filter by Formats
    if (filters.formats.length > 0) {
      result = result.filter((item) =>
        filters.formats.some((fmt) => item.formats.includes(fmt))
      );
    }

    // Filter by Search
    if (filters.searchTerm.trim()) {
      const query = filters.searchTerm.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.publisher.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort
    result.sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime();
      }
      if (filters.sortBy === 'oldest') {
        return new Date(a.updateDate).getTime() - new Date(b.updateDate).getTime();
      }
      if (filters.sortBy === 'downloads') {
        return b.downloadCount - a.downloadCount;
      }
      if (filters.sortBy === 'views') {
        return b.viewCount - a.viewCount;
      }
      if (filters.sortBy === 'title_asc') {
        return a.title.localeCompare(b.title);
      }
      if (filters.sortBy === 'title_desc') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    return result;
  }, [initialDatasets, filters]);

  const totalPages = Math.ceil(filteredAndSortedDatasets.length / filters.itemsPerPage) || 1;
  const paginatedDatasets = useMemo(() => {
    const start = (filters.page - 1) * filters.itemsPerPage;
    return filteredAndSortedDatasets.slice(start, start + filters.itemsPerPage);
  }, [filteredAndSortedDatasets, filters.page, filters.itemsPerPage]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.kedeputian !== 'all') count += 1;
    if (filters.formats.length > 0) count += filters.formats.length;
    if (filters.searchTerm.trim()) count += 1;
    return count;
  }, [filters]);

  return {
    filters,
    setSearchTerm,
    setKedeputian,
    toggleFormat,
    setSortBy,
    setPage,
    resetFilters,
    totalCount: filteredAndSortedDatasets.length,
    paginatedDatasets,
    totalPages,
    activeFilterCount,
  };
}
