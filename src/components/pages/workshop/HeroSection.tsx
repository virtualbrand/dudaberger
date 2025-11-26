"use client";

import { Progress } from "@/components/ui/progress";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { VantaFallback } from '@/components/ui/vanta-fallback'
import { OptimizedImage } from "@/components/ui/optimized-image";
import { workshopConfig, getPrimaryButtonText, getHoverButtonText, getProgressText, getCurrentLot } from "@/data/workshop-config";
import { useVantaEffect } from "@/hooks/useVantaEffect";

export const HeroSection = () => {
  const { vantaRef } = useVantaEffect({
    highlightColor: 0x800F2F,
    midtoneColor: 0xFFB3C1,
    lowlightColor: 0xA4133C,
    baseColor: 0x23060E,
  });

  return (
    <section 
      ref={vantaRef}
      className="min-h-screen w-full relative overflow-hidden"
    >
      {/* Fallback estático - sempre visível */}
      <VantaFallback 
        highlightColor="#800F2F"
        midtoneColor="#FFB3C1"
        lowlightColor="#A4133C" 
        baseColor="#23060E"
        className="z-0"
      />
      
      <div className="absolute top-0 left-0 w-full z-10">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex items-center gap-3 pt-20">
            <OptimizedImage 
              src="/images/workshop/logo.webp" 
              alt="Workshop Duda Berger" 
              priority={true}
            />
          </div>
        </div>
      </div>
      
      <div className="relative min-h-screen w-full flex items-center z-20">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl">
            <div className="inline-block px-6 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-8">
              {workshopConfig.event.date}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              R$ 10.000 /mês trabalhando de casa com Confeitaria
            </h1>
            <div className="text-white mb-8 text-lg md:text-xl">
              <p>
                2 dias com o passo a passo completo para faturar da sua cozinha:
              </p>
              <p>
                <strong>PRODUTO + LUCRO + VENDA</strong>
              </p>
            </div>
                          <div className="mt-10">
              <div className="flex flex-col gap-4 max-w-[360px]">
                <InteractiveHoverButton
                  text={getPrimaryButtonText()}
                  hoverText={getHoverButtonText()}
                  className="w-full"
                  onClick={() => {
                    const el = document.getElementById('investimento');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
                <div className="flex flex-col gap-2">
                  <Progress
                    value={getCurrentLot().soldPercentage}
                    className="w-full h-2 bg-white/10 rounded-full"
                    barClassName="bg-[#FFB3C1] rounded-full transition-all"
                  />
                  <span className="text-sm text-white/90">{getProgressText()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
