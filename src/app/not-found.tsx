'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function NotFound() {
  useScrollAnimation();
  const pathname = usePathname();

  // Detecta se estava tentando acessar o painel (dashboard, leads, propostas, contratos)
  const isDashboardArea = pathname?.startsWith('/dashboard') || 
                          pathname?.startsWith('/leads') || 
                          pathname?.startsWith('/propostas') || 
                          pathname?.startsWith('/contratos');

  const homeUrl = isDashboardArea ? '/dashboard' : '/';
  const homeText = isDashboardArea ? 'Voltar para o Painel' : 'Voltar para Home';

  return (
    <div className="min-h-screen bg-[#F6EEE1]">
      {/* Hero Section com Background Fixo */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image - Desktop */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="/images/404.webp"
            alt="Página não encontrada"
            fill
            className="object-cover"
            style={{ 
              backgroundAttachment: 'fixed'
            }}
            priority
          />
          {/* Overlay escuro para melhor legibilidade */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Background Image - Mobile */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="/images/404-mobile.webp"
            alt="Página não encontrada"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay escuro para melhor legibilidade */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Conteúdo da Hero */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-unbounded font-bold text-white mb-6 leading-tight animate-fade-in">
            404
          </h2>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-unbounded font-bold text-white mb-8 leading-tight animate-fade-in animation-delay-200">
            Página não encontrada
          </h1>
          <p className="text-lg md:text-xl text-white mb-12 max-w-2xl animate-fade-in animation-delay-400">
            A página que você está procurando não existe ou foi removida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-600">
            <Link
              href={homeUrl}
              className="btn-primary-md"
            >
              {homeText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
