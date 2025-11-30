'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

interface StartSectionProps {
  onStart: () => void;
}

const StartSection = ({ onStart }: StartSectionProps) => {
  return (
    <section className="min-h-screen bg-[#d4c4b2] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Shadow Background Overlay - Desktop */}
      <div className="absolute inset-0 z-0 opacity-50 hidden lg:block" suppressHydrationWarning>
        <Image
          src="/images/workshop/shadow-bg.webp"
          alt=""
          fill
          className="object-cover"
          priority={true}
        />
      </div>
      
      {/* Shadow Background Overlay - Mobile */}
      <div className="absolute inset-0 z-0 opacity-30 lg:hidden" suppressHydrationWarning>
        <Image
          src="/images/workshop/shadow-bg-mobile.webp"
          alt=""
          fill
          className="object-cover"
          priority={true}
        />
      </div>

      <div className="w-full max-w-[745px] mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#703535] mb-4">
            Formulário de Casamento
          </h1>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <p className="text-gray-700 text-lg leading-relaxed text-center mb-8">
            Queridos noivos, todo nosso trabalho é pensado no seu grande dia. Queremos transformar em forma de bolo a personalidade e história do casal. Estas perguntas nos guiarão para criarmos um orçamento base conforme o que vocês sonham.
          </p>
          
          <button 
            onClick={onStart}
            className="btn-primary-sm w-full flex items-center justify-center gap-2"
          >
            Começar
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default StartSection;
