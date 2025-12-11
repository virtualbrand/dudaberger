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

      <div className="w-full max-w-[800px] mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-unbounded text-[#703535] mb-4">
            Formulário de Casamento
          </h1>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <p className="text-gray-700 text-lg leading-relaxed text-center mb-4">
            Queridos noivos, todo nosso trabalho é pensado no seu grande dia. Queremos transformar em forma de bolo a personalidade e história do casal. Estas perguntas nos guiarão para criarmos um orçamento base conforme o que vocês sonham.
          </p>
          
          <div className="flex justify-center">
            <button 
              onClick={onStart}
              className="btn-primary-sm flex items-center justify-center gap-2"
            >
              Começar
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartSection;
