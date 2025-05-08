'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type InteractiveLinkProps = {
  href: string;
  children: ReactNode;
  variant: 'primary' | 'secondary' | 'nav' | 'footer';
  className?: string;
};

export default function InteractiveLink({ 
  href, 
  children, 
  variant,
  className = '' 
}: InteractiveLinkProps) {
  let variantClasses = '';
  
  if (variant === 'primary') {
    variantClasses = 'inline-block bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 px-8 rounded-lg font-medium text-lg shadow-lg hover:scale-105 transition-all duration-300';
  } else if (variant === 'secondary') {
    variantClasses = 'inline-block border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black py-4 px-8 rounded-lg font-medium text-lg transition-all duration-300';
  } else if (variant === 'nav') {
    variantClasses = 'transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-amber-300 text-white hover:text-amber-300';
  } else if (variant === 'footer') {
    variantClasses = 'text-gray-400 hover:text-amber-300 transition-colors duration-200';
  }
  
  return (
    <Link href={href}>
      <span className={twMerge(variantClasses, className)}>
        {children}
      </span>
    </Link>
  );
} 