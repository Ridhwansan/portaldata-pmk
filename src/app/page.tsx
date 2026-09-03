import { LandingTemplate } from '@/features/catalog/components/templates/LandingTemplate';
import { SimpleVisitorStatistics } from '@/features/statistics/components/organisms/SimpleVisitorStatistics';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Landing Page Section with Topic Filter & 4-Col Dataset Grid */}
      <LandingTemplate />

      {/* 2. Simplified Visitor Statistics Section (Hari Ini & Keseluruhan) */}
      <SimpleVisitorStatistics />
    </div>
  );
}
