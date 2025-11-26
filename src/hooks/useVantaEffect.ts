import { useEffect, useRef, useState } from 'react';
import { preloadVantaScripts } from './useVantaPreload';
import type { VantaEffectInstance } from '@/types/vanta-global';

interface VantaFogOptions {
  highlightColor: number;
  midtoneColor: number;
  lowlightColor: number;
  baseColor: number;
  blurFactor?: number;
  speed?: number;
  zoom?: number;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
}

export const useVantaEffect = (options: VantaFogOptions) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<VantaEffectInstance | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Evita múltiplas inicializações
    if (initialized.current || vantaEffect.current || !vantaRef.current) return;
    
    initialized.current = true;

    const initVanta = async () => {
      try {
        // Tenta carregar os scripts (com timeout interno de 5s)
        await preloadVantaScripts();

        if (window.VANTA && typeof window.VANTA.FOG === 'function' && vantaRef.current) {
          vantaEffect.current = window.VANTA.FOG({
            el: vantaRef.current,
            mouseControls: options.mouseControls ?? true,
            touchControls: options.touchControls ?? true,
            gyroControls: options.gyroControls ?? false,
            minHeight: options.minHeight ?? 200.0,
            minWidth: options.minWidth ?? 200.0,
            highlightColor: options.highlightColor,
            midtoneColor: options.midtoneColor,
            lowlightColor: options.lowlightColor,
            baseColor: options.baseColor,
            blurFactor: options.blurFactor ?? 0.61,
            speed: options.speed ?? 1.5,
            zoom: options.zoom ?? 1,
          });
          
          console.log('Vanta.js inicializado com sucesso');
        } else {
          console.warn('Vanta.js não disponível - usando fallback');
        }
      } catch (error) {
        console.warn('Erro ao inicializar Vanta - usando fallback:', error);
      }
    };

    // Executa sem bloquear
    initVanta();

    return () => {
      if (vantaEffect.current) {
        try {
          vantaEffect.current.destroy();
        } catch (e) {
          console.warn('Erro ao destruir Vanta:', e);
        }
        vantaEffect.current = null;
      }
      initialized.current = false;
    };
  }, [options.highlightColor, options.midtoneColor, options.lowlightColor, options.baseColor]);

  return { vantaRef };
};
