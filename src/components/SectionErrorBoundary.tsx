"use client";

import ErrorBoundary from './ErrorBoundary';
import { ReactNode } from 'react';

interface SectionErrorBoundaryProps {
  children: ReactNode;
  sectionName?: string;
}

/**
 * Error Boundary específico para seções
 * Fornece um fallback mais discreto que não quebra o layout da página
 */
export default function SectionErrorBoundary({ children, sectionName }: SectionErrorBoundaryProps) {
  const fallback = (
    <section className="w-full py-16 md:py-24 bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-red-100">
          <svg 
            className="w-6 h-6 text-red-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {sectionName ? `Erro ao carregar: ${sectionName}` : 'Erro ao carregar seção'}
        </h3>
        <p className="text-sm text-gray-600">
          Esta seção não pôde ser carregada. Continue navegando pela página.
        </p>
      </div>
    </section>
  );

  return (
    <ErrorBoundary fallback={fallback}>
      {children}
    </ErrorBoundary>
  );
}
