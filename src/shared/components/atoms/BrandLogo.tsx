import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'md' | 'lg' | 'xl';
  href?: string;
  className?: string;
}

export function BrandLogo({
  variant = 'light',
  size = 'lg',
  href = '/',
  className = '',
}: BrandLogoProps) {
  const sizeMap = {
    md: 'h-12 w-52 sm:w-60',
    lg: 'h-14 sm:h-16 w-64 sm:w-76',
    xl: 'h-16 sm:h-20 w-72 sm:w-96',
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center group focus:outline-none transition-transform hover:opacity-95 ${className}`}
      aria-label="Kemenko PMK"
    >
      <div className={`relative flex items-center ${sizeMap[size]}`}>
        <Image
          src="/logo-kemenko-pmk.png"
          alt="KEMENKO PMK"
          fill
          sizes="(max-width: 768px) 260px, 340px"
          className="object-contain object-left"
          priority
        />
      </div>
    </Link>
  );
}
