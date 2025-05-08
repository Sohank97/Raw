'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type InteractiveButtonProps = {
  href: string;
  children: ReactNode;
  variant: 'cta' | 'amber';
  className?: string;
};

export default function InteractiveButton({ 
  href, 
  children, 
  variant,
  className = ''
}: InteractiveButtonProps) {
  let variantClasses = '';
  
  if (variant === 'cta') {
    variantClasses = 'inline-block bg-white hover:bg-gray-50 text-amber-700 py-5 px-10 rounded-lg font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300';
  } else if (variant === 'amber') {
    variantClasses = 'inline-block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 px-8 rounded-lg font-medium text-lg shadow-lg hover:scale-105 transition-all duration-300';
  }
  
  return (
    <Link href={href}>
      <span className={twMerge(variantClasses, className)}>
        {children}
      </span>
    </Link>
  );
} 