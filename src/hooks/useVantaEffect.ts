import { useEffect, useRef } from 'react';

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

let scriptsLoaded = false;
let loadingPromise: Promise<void> | null = null;

const loadVantaScripts = async () => {
  // Se já está carregando, retorna a promise existente
  if (loadingPromise) {
    return loadingPromise;
  }

  // Se já foi carregado, retorna imediatamente
  if (scriptsLoaded) {
    return Promise.resolve();
  }

  loadingPromise = (async () => {
    try {
      // Carrega Three.js primeiro
      if (!window.THREE) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        document.head.appendChild(threeScript);
        await new Promise((resolve, reject) => {
          threeScript.onload = resolve;
          threeScript.onerror = reject;
        });
      }

      // Carrega Vanta FOG
      if (!window.VANTA?.FOG) {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js';
        document.head.appendChild(vantaScript);
        await new Promise((resolve, reject) => {
          vantaScript.onload = resolve;
          vantaScript.onerror = reject;
        });
      }

      scriptsLoaded = true;
    } catch (error) {
      console.error('Erro ao carregar scripts do Vanta:', error);
      loadingPromise = null;
      throw error;
    }
  })();

  return loadingPromise;
};

export const useVantaEffect = (options: VantaFogOptions) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    const initVanta = async () => {
      if (vantaEffect.current || !vantaRef.current) return;

      try {
        await loadVantaScripts();

        if (window.VANTA?.FOG && vantaRef.current) {
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
        }
      } catch (error) {
        console.error('Erro ao inicializar Vanta:', error);
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

  return vantaRef;
};
