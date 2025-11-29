"use client";

import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { getPrimaryButtonText, getProgressText, getCurrentLot } from "@/data/workshop-config";
import Image from "next/image";

const workshopImages = [
  "/images/workshop/workshop-1.webp",
  "/images/workshop/workshop-17.webp",
  "/images/workshop/workshop-15.webp",
  "/images/workshop/workshop-7.webp",
];

export const HeroSection = () => {
  const handleScroll = () => {
    const el = document.getElementById("investimento");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#d4c4b2]">
      {/* Shadow Background Overlay */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Image
          src="/images/workshop/shadow-bg.webp"
          alt=""
          fill
          className="object-cover"
          priority={true}
        />
      </div>
      
      {/* Header */}
      <div className="absolute top-0 left-0 w-full z-10">
        <div className="px-6 md:px-8 lg:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]">
          <div className="flex items-center gap-3 pt-20">
            <OptimizedImage 
              src="/images/workshop/logo.webp" 
              alt="Workshop Duda Berger" 
              priority={true}
              className="w-[280px] [filter:brightness(0)_saturate(100%)_invert(28%)_sepia(15%)_saturate(1520%)_hue-rotate(313deg)_brightness(92%)_contrast(89%)]"
            />
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative min-h-screen w-full flex items-center z-20">
        <div className="w-full">
          <div className="grid lg:grid-cols-2 gap-0 items-center">
            {/* Left Content - Alinhado com o logo */}
            <div className="px-6 md:px-8 lg:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] space-y-6 max-w-5xl">
              <div className="inline-block px-6 py-2 rounded-full bg-[#c3b3a1] text-[#703535] text-sm mb-4">
                13 E 14 DE DEZEMBRO | NO ZOOM | AO VIVO
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#703535] mb-6 leading-tight">
                R$ 10.000 /mês trabalhando de casa com Confeitaria
              </h1>
              <div className="text-[#703535] mb-8 text-lg md:text-xl">
                <p>2 dias com o passo a passo completo para faturar da sua cozinha:</p>
                <p>
                  <strong>PRODUTO + LUCRO + VENDA</strong>
                </p>
              </div>
              <div className="mt-10">
                <div className="flex flex-col gap-4 max-w-[360px]">
                  <button
                    onClick={handleScroll}
                    className="btn-primary-md w-full group flex items-center justify-center gap-2"
                  >
                    <span>{getPrimaryButtonText()}</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <div className="flex flex-col gap-2">
                    <Progress
                      value={getCurrentLot().soldPercentage}
                      className="w-full h-2 bg-white/20 rounded-full"
                      barClassName="bg-[#b8827d] rounded-full transition-all"
                      aria-label={`Progresso de vagas: ${getProgressText()}`}
                    />
                    <span className="text-sm text-[#703535]">{getProgressText()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Mosaic - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:flex items-center justify-center h-screen p-8">
              <div className="grid grid-cols-2 gap-4 max-w-2xl w-full">
                {/* Imagem 1 - Top Left */}
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md">
                  <Image
                    src={workshopImages[0]}
                    alt="Produto do workshop 1"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
                
                {/* Imagem 2 - Top Right (offset down) */}
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md mt-16">
                  <Image
                    src={workshopImages[1]}
                    alt="Produto do workshop 2"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
                
                {/* Imagem 3 - Bottom Left (offset up) */}
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md -mt-8">
                  <Image
                    src={workshopImages[2]}
                    alt="Produto do workshop 3"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
                
                {/* Imagem 4 - Bottom Right */}
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-md mt-8">
                  <Image
                    src={workshopImages[3]}
                    alt="Produto do workshop 4"
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
