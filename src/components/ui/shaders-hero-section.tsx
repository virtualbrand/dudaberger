"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { ArrowRight } from "lucide-react"
import { getPrimaryButtonText, getProgressText, getCurrentLot } from "@/data/workshop-config"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { WorkshopMarquee } from "@/components/ui/cta-with-marquee"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

export function ShaderBackground({ children }: ShaderBackgroundProps) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-[#442020] via-[#442020] to-[#652826]">
      {children}
    </div>
  )
}

export function Header() {
  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div className="px-6 md:px-8 lg:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]">
        <div className="flex items-center gap-3 pt-20">
          <OptimizedImage 
            src="/images/workshop/logo.webp" 
            alt="Workshop Duda Berger" 
            priority={true}
            className="w-[280px]"
          />
        </div>
      </div>
    </div>
  )
}

export function HeroContent() {
  const handleScroll = () => {
    const el = document.getElementById("investimento")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="relative min-h-screen w-full flex items-center z-20">
      <div className="w-full">
        <div className="grid lg:grid-cols-[55%_45%] gap-0 items-center">
          {/* Left Content - Alinhado com o logo */}
          <div className="px-6 md:px-8 lg:pl-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))] space-y-6 max-w-5xl">
            <div className="inline-block px-6 py-2 rounded-full bg-white/10 text-white/80 text-sm mb-4">
              13 E 14 DE DEZEMBRO | NO ZOOM | AO VIVO
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              R$ 10.000 /mês trabalhando de casa com Confeitaria
            </h1>
            <div className="text-white mb-8 text-lg md:text-xl">
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
                    className="w-full h-2 bg-white/10 rounded-full"
                    barClassName="bg-[#FFB3C1] rounded-full transition-all"
                    aria-label={`Progresso de vagas: ${getProgressText()}`}
                  />
                  <span className="text-sm text-white/90">{getProgressText()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Marquee Grid - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:flex items-center relative overflow-hidden h-screen">
            <div className="relative w-full">
              <WorkshopMarquee />
              {/* Vignette apenas na borda esquerda - mesma altura das imagens */}
              <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#180b0b] to-transparent z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
