'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CatalogHero } from '../organisms/CatalogHero';
import { TopicFilterRow } from '../molecules/TopicFilterRow';
import { DatasetCard } from '../molecules/DatasetCard';
import { MOCK_DATASETS } from '../../data/datasets.mock';

export function LandingTemplate() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');

  const filteredDatasets = useMemo(() => {
    let list = [...MOCK_DATASETS];

    // Ensure sorted by newest first for landing page
    list.sort(
      (a, b) =>
        new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime()
    );

    if (selectedTopic !== 'all') {
      const topicMap: Record<string, string> = {
        keluarga: 'Keluarga',
        'perempuan-anak': 'Perempuan & Anak',
        kesehatan: 'Kesehatan',
        pendidikan: 'Pendidikan',
        'pemuda-olahraga': 'Pemuda & Olahraga',
        kebencanaan: 'Kebencanaan',
      };
      const cat = topicMap[selectedTopic];
      if (cat) {
        list = list.filter((item) => item.category === cat);
      }
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.publisher.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }

    return list.slice(0, 6); // Exactly 6 cards (2 rows of 3 cards on desktop)
  }, [searchTerm, selectedTopic]);

  return (
    <div className="w-full bg-slate-50/50 pb-20">
      {/* Hero Section with Floating Search */}
      <CatalogHero
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Topic Filter Selector */}
      <TopicFilterRow
        selectedTopic={selectedTopic}
        onSelectTopic={setSelectedTopic}
      />

      {/* 3-Columns Dataset Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-6">
        {/* Section Notice: Dataset Terbaru */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A32A29]" />
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Dataset Paling Baru Diunggah
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Menampilkan rilis data teranyar seputar pembangunan manusia dan kebudayaan
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDatasets.map((dataset) => (
            <DatasetCard key={dataset.id} dataset={dataset} />
          ))}
        </div>

        {/* Action: Lihat Selengkapnya */}
        <div className="pt-12 text-center">
          <Link
            href="/dataset"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#A32A29] hover:bg-[#881E1D] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Lihat Seluruh Dataset ({MOCK_DATASETS.length} Data)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
