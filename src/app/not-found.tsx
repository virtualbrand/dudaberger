'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function NotFound() {
  useScrollAnimation();

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
          <div className="absolute inset-0 bg-black/40" />
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
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Conteúdo da Hero */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-unbounded font-bold text-white mb-6 leading-tight animate-fade-in">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-unbounded font-bold text-white mb-8 leading-tight animate-fade-in animation-delay-200">
            Página não encontrada
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl animate-fade-in animation-delay-400">
            A página que você está procurando não existe ou foi removida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-600">
            <Link
              href="/"
              className="px-8 py-4 bg-[#703535] text-white font-unbounded font-semibold rounded-full hover:bg-[#5a2a2a] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Voltar para Home
            </Link>
            
            <Link
              href="/casamento"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-unbounded font-semibold rounded-full border-2 border-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Ver Casamentos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
