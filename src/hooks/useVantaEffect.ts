import { useEffect, useRef, useState } from 'react';
import { preloadVantaScripts } from './useVantaPreload';

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

declare global {
  interface Window {
    THREE: any;
    VANTA: {
      FOG: (options: any) => any;
    };
  }
}

export const useVantaEffect = (options: VantaFogOptions) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initVanta = async () => {
      if (vantaEffect.current || !vantaRef.current) return;

      try {
        setIsLoading(true);
        setError(null);

        // Usa o sistema de preload otimizado
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
          
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Erro ao inicializar Vanta:', error);
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
        setIsLoading(false);
      }
    };

    initVanta();

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [options]);

  return { 
    vantaRef, 
    isLoading, 
    error 
  };
};
