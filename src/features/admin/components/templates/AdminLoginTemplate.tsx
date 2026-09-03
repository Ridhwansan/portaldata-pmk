'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { BrandLogo } from '@/shared/components/atoms/BrandLogo';

export function AdminLoginTemplate() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@kemenkopmk.go.id');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  /**
   * Dummy Login Handler:
   * Sediakan fungsi autentikasi di sini untuk dihubungkan ke backend (NextAuth, Firebase, JWT, Supabase, dsb).
   */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi autentikasi dummy dan redirect ke dashboard admin
    setTimeout(() => {
      setLoading(false);
      router.push('/admin');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#A32A29]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4 z-10">
        <div className="inline-flex justify-center">
          <BrandLogo size="xl" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Portal Administrasi Data
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Masuk ke panel pengelolaan data terbuka Kemenko PMK
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 space-y-6">
          <div className="flex items-center gap-2 p-3 bg-rose-50 rounded-2xl border border-rose-100 text-xs text-slate-600">
            <Info className="w-4 h-4 text-[#A32A29] shrink-0" />
            <span>
              <strong>Mode Dummy Auth:</strong> Klik tombol masuk di bawah untuk langsung menuju dashboard admin.
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Email / NIP Pengelola
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kemenkopmk.go.id"
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-11 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#A32A29] focus:bg-white"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Kata Sandi
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-11 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#A32A29] focus:bg-white"
                />
              </div>
            </div>

            {/* Remember Me & Help */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-3.5 h-3.5 rounded text-[#A32A29] focus:ring-[#A32A29]"
                />
                <span>Ingat saya</span>
              </label>
              <a href="#" className="text-[#A32A29] font-semibold hover:underline">
                Bantuan login?
              </a>
            </div>

            {/* Submit Button (Pill Rounded) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-full bg-[#A32A29] hover:bg-[#881E1D] text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Memverifikasi...' : 'Masuk ke Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Back to Public Portal */}
          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-500 hover:text-[#A32A29] transition-colors"
            >
              &larr; Kembali ke Portal Publik
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
