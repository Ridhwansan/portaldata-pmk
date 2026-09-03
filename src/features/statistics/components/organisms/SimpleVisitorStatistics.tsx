import React from 'react';

export function SimpleVisitorStatistics() {
  const todayStats = [
    { value: '3.951', label: 'Kunjungan Hari Ini' },
    { value: '25', label: 'Dataset Diunduh Hari Ini' },
    { value: '93', label: 'Publikasi Diunduh Hari Ini' },
    { value: '120', label: 'Data Induk Diunduh Hari Ini' },
  ];

  const overallStats = [
    { value: '3.271.529', label: 'Total Kunjungan' },
    { value: '113.741', label: 'Total Dataset Diunduh' },
    { value: '137.049', label: 'Total Publikasi Diunduh' },
    { value: '234.444', label: 'Total Data Induk Diunduh' },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Statistik Pengunjung Portal Data Kemenko PMK
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Ringkasan pemanfaatan dan akses data publik secara berkala
          </p>
        </div>

        {/* Section: Hari Ini */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A32A29]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Hari Ini
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {todayStats.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border-l-4 border-[#A32A29] p-6 shadow-xs hover:shadow-md transition-shadow border-y border-r border-slate-200/80"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Keseluruhan */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Keseluruhan
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {overallStats.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border-l-4 border-slate-700 p-6 shadow-xs hover:shadow-md transition-shadow border-y border-r border-slate-200/80"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info note */}
        <div className="text-center text-xs text-slate-400 pt-4 font-medium">
          Pembaruan terakhir: 03 September 2026 | 11:01 WIB
        </div>
      </div>
    </section>
  );
}
