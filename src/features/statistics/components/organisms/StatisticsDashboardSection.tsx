import React from 'react';
import {
  FileText,
  Download,
  Users,
  Building,
  Radio,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { StatOverviewCard } from '../molecules/StatOverviewCard';
import { TopDatasetRow } from '../molecules/TopDatasetRow';
import { LiveDownloadFeedItem } from '../molecules/LiveDownloadFeedItem';
import { DownloadTrendsChart } from './DownloadTrendsChart';
import { CategoryDistributionChart } from './CategoryDistributionChart';
import {
  METRIC_OVERVIEW,
  MONTHLY_DOWNLOADS,
  CATEGORY_STATS,
  TOP_DOWNLOADED_DATASETS,
  LIVE_ACTIVITY_FEEDS,
} from '../../data/statistics.mock';
import { formatNumber } from '@/shared/utils/formatters';

export function StatisticsDashboardSection() {
  return (
    <section className="py-16 bg-slate-100/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-[#A32A29] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparansi & Pemanfaatan Data</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Statistik Pengunjung & <span className="text-[#A32A29]">Tren Unduhan</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Pantau aktivitas akses dan tingkat pemanfaatan data terbuka oleh publik, akademisi, dan lembaga mitra secara transparan.
          </p>
        </div>

        {/* 4 KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatOverviewCard
            title="Total Dataset"
            value={formatNumber(METRIC_OVERVIEW.totalDatasets)}
            subtitle="Tersebar di 5 Kedeputian PMK"
            icon={<FileText className="w-6 h-6" />}
            trend={{ value: '+18.2%', isPositive: true }}
          />
          <StatOverviewCard
            title="Total Unduhan"
            value={formatNumber(METRIC_OVERVIEW.totalDownloads)}
            subtitle="File berhasil diunduh publik"
            icon={<Download className="w-6 h-6" />}
            trend={{ value: '+32.4%', isPositive: true }}
          />
          <StatOverviewCard
            title="Pengunjung / Bulan"
            value={formatNumber(METRIC_OVERVIEW.monthlyVisitors)}
            subtitle="Pengguna aktif portal data"
            icon={<Users className="w-6 h-6" />}
            trend={{ value: '+14.6%', isPositive: true }}
          />
          <StatOverviewCard
            title="Format Terpopuler"
            value={`${METRIC_OVERVIEW.popularFormat} (${METRIC_OVERVIEW.popularFormatPercent}%)`}
            subtitle="Paling diminati analis data"
            icon={<Building className="w-6 h-6" />}
          />
        </div>

        {/* Visual Charts Grid (2 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <DownloadTrendsChart data={MONTHLY_DOWNLOADS} />
          </div>
          <div className="lg:col-span-5">
            <CategoryDistributionChart stats={CATEGORY_STATS} />
          </div>
        </div>

        {/* Top Downloaded & Live Activity Feed (2 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Top Downloaded (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Trophy className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  Dataset Paling Banyak Diunduh
                </h3>
                <p className="text-xs text-slate-500">
                  Data dengan frekuensi pemanfaatan tertinggi oleh masyarakat.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {TOP_DOWNLOADED_DATASETS.map((ds, idx) => (
                <TopDatasetRow key={ds.id} rank={idx + 1} data={ds} />
              ))}
            </div>
          </div>

          {/* Live Activity Feed (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-[#A32A29] animate-pulse" />
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                    Aktivitas Unduhan Terkini
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pembaruan feed unduhan dari berbagai wilayah Indonesia.
                  </p>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <div className="space-y-3">
              {LIVE_ACTIVITY_FEEDS.map((act) => (
                <LiveDownloadFeedItem key={act.id} activity={act} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
