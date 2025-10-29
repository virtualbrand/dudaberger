import { Progress } from "@/components/ui/progress";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { VantaLoading } from "@/components/ui/vanta-loading";
import { VantaFallback } from "@/components/ui/vanta-fallback";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { workshopConfig, getPrimaryButtonText, getHoverButtonText, getProgressText, getCurrentLot } from "@/data/workshop-config";
import { useVantaEffect } from "@/hooks/useVantaEffect";

export const HeroSection = () => {
  const { vantaRef, isLoading } = useVantaEffect({
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
      {/* Fallback estático - fica atrás do Vanta */}
      {isLoading && (
        <VantaFallback 
          highlightColor="#800F2F"
          midtoneColor="#FFB3C1"
          lowlightColor="#A4133C" 
          baseColor="#23060E"
          className="z-0"
        />
      )}
      
      {/* Loading overlay enquanto o Vanta carrega */}
      {isLoading && (
        <div className="absolute inset-0 z-5 bg-black/10 backdrop-blur-[0.5px] flex items-center justify-center">
          <VantaLoading />
        </div>
      )}
      
      <div className="absolute top-0 left-0 w-full z-10">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex items-center gap-3 py-8">
            <OptimizedImage 
              src="/images/workshop-duda-logo.svg" 
              alt="Logo Workshop Duda Berger" 
              className="w-45 h-45"
              priority={true}
            />
            <div className="inline-block px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm">
              {workshopConfig.event.edition}
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative h-screen w-full flex items-center z-20">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl">
            <div className="inline-block px-6 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-8">
              {workshopConfig.event.date}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              Do ZERO aos R$ 5.000 /mês trabalhando de casa com Confeitaria
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
