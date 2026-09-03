'use client';

import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { CatalogHero } from '../organisms/CatalogHero';
import { CatalogSidebar } from '../organisms/CatalogSidebar';
import { DatasetGrid } from '../organisms/DatasetGrid';
import { SortSelector } from '../atoms/SortSelector';
import { ActiveFilterChips } from '../molecules/ActiveFilterChips';
import { Pagination } from '@/shared/components/molecules/Pagination';
import { useDatasetFilter } from '../../hooks/useDatasetFilter';

export function CatalogTemplate() {
  const {
    filters,
    setSearchTerm,
    setKedeputian,
    toggleFormat,
    setSortBy,
    setPage,
    resetFilters,
    totalCount,
    paginatedDatasets,
    totalPages,
    activeFilterCount,
  } = useDatasetFilter();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="w-full bg-slate-50/50 min-h-screen pb-20">
      {/* Hero Section */}
      <CatalogHero
        searchTerm={filters.searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Main Catalog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Mobile Filter Toggle & Quick Sorting Bar */}
        <div className="lg:hidden flex items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#A32A29] text-white text-xs font-bold shadow-sm cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter Data</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-[#A32A29] text-[10px] font-bold flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          <SortSelector
            value={filters.sortBy}
            onChange={setSortBy}
          />
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28">
            <CatalogSidebar
              selectedKedeputian={filters.kedeputian}
              onSelectKedeputian={setKedeputian}
              selectedFormats={filters.formats}
              onToggleFormat={toggleFormat}
            />
          </div>

          {/* Dataset Grid & Results (9 cols) */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Toolbar: Active Filters & Sort */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <ActiveFilterChips
                searchTerm={filters.searchTerm}
                onClearSearch={() => setSearchTerm('')}
                selectedKedeputian={filters.kedeputian}
                onClearKedeputian={() => setKedeputian('all')}
                selectedFormats={filters.formats}
                onRemoveFormat={toggleFormat}
                onResetAll={resetFilters}
                totalResults={totalCount}
              />

              <div className="hidden sm:block shrink-0">
                <SortSelector
                  value={filters.sortBy}
                  onChange={setSortBy}
                />
              </div>
            </div>

            {/* Dataset Cards Grid (9 items per page) */}
            <DatasetGrid
              datasets={paginatedDatasets}
              onResetFilters={resetFilters}
            />

            {/* Pagination */}
            <div className="pt-8 pb-4">
              <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#A32A29] h-full shadow-2xl p-6 text-white flex flex-col z-10 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/20">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" />
                <h3 className="font-bold text-base">Filter Dataset</h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 space-y-6">
              <CatalogSidebar
                selectedKedeputian={filters.kedeputian}
                onSelectKedeputian={(id) => {
                  setKedeputian(id);
                  setMobileFilterOpen(false);
                }}
                selectedFormats={filters.formats}
                onToggleFormat={toggleFormat}
              />
            </div>

            <div className="pt-4 border-t border-white/20">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-white text-[#A32A29] font-bold rounded-full text-sm shadow-md cursor-pointer"
              >
                Terapkan Filter ({totalCount} Dataset)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
