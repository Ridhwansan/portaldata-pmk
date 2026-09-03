import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-1';

  const variantStyles = {
    primary:
      'bg-[#A32A29] hover:bg-[#8A1F1E] active:bg-[#721817] text-white shadow-sm focus:ring-[#A32A29]/40',
    secondary:
      'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 focus:ring-slate-400',
    outline:
      'border border-[#A32A29] text-[#A32A29] hover:bg-[#A32A29] hover:text-white active:bg-[#8A1F1E] focus:ring-[#A32A29]/30',
    ghost:
      'text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus:ring-slate-300',
    danger:
      'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
