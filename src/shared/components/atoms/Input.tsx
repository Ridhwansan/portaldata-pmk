import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export function Input({
  icon,
  rightElement,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="relative flex items-center w-full">
      {icon && (
        <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
          {icon}
        </div>
      )}
      <input
        className={`w-full bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 rounded-full py-2.5 transition-all duration-200 text-sm focus:outline-none focus:border-[#A32A29] focus:ring-2 focus:ring-[#A32A29]/20 ${
          icon ? 'pl-10' : 'pl-4'
        } ${rightElement ? 'pr-20 sm:pr-24' : 'pr-4'} ${className}`}
        {...props}
      />
      {rightElement && (
        <div className="absolute right-1.5 flex items-center">
          {rightElement}
        </div>
      )}
    </div>
  );
}
