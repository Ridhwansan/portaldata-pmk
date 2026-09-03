import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';
import { BrandLogo } from '../atoms/BrandLogo';
import { SocialLinks } from '../molecules/SocialLinks';
import { VisitorCounter } from '../molecules/VisitorCounter';

export function Footer() {
  return (
    <footer className="bg-[#152039] text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-700/60 items-start">
          {/* Col 1: Brand Logo - Enlarged, No Description */}
          <div className="lg:col-span-4 flex flex-col items-start justify-center">
            <BrandLogo size="xl" />
          </div>

          {/* Col 2: Kontak (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-white text-xs sm:text-sm font-bold tracking-wider uppercase">
              Kontak
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-white/70 shrink-0" />
                <span className="leading-snug">(+62)21 345 9444</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/70 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Jl. Medan Merdeka Barat No. 3 Jakarta Pusat, Indonesia
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Email (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-white text-xs sm:text-sm font-bold tracking-wider uppercase">
              Email
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-white/70 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-400">Informasi Umum</span>
                  <a
                    href="mailto:roinfohumas@kemenkopmk.go.id"
                    className="text-slate-200 hover:text-white hover:underline transition-colors"
                  >
                    roinfohumas@kemenkopmk.go.id
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-white/70 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-400">Persuratan</span>
                  <a
                    href="mailto:kearsipan@kemenkopmk.go.id"
                    className="text-slate-200 hover:text-white hover:underline transition-colors"
                  >
                    kearsipan@kemenkopmk.go.id
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Media & Counter (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <SocialLinks />
            <VisitorCounter count={1234567} />
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center">
          <p className="text-xs sm:text-sm text-slate-400">
            &copy; 2026 Kementerian Koordinator Bidang Pembangunan Manusia dan Kebudayaan
          </p>
        </div>
      </div>
    </footer>
  );
}
