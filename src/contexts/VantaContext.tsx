"use client";

import { createContext, useContext, useRef, useState, useEffect, ReactNode } from 'react';

interface VantaContextType {
  vantaInstance: any;
  isLoading: boolean;
  registerSection: (id: string, ref: HTMLElement) => void;
  unregisterSection: (id: string) => void;
}

const VantaContext = createContext<VantaContextType | undefined>(undefined);

interface VantaProviderProps {
  children: ReactNode;
  config?: {
    highlightColor: number;
    midtoneColor: number;
    lowlightColor: number;
    baseColor: number;
  };
}

/**
 * Provider que compartilha uma única instância do Vanta.js entre múltiplas seções
 * Reduz overhead de carregar e renderizar múltiplas instâncias
 */
export function VantaProvider({ children, config }: VantaProviderProps) {
  const vantaInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const sectionsRef = useRef<Map<string, HTMLElement>>(new Map());
  const currentSectionRef = useRef<string | null>(null);

  // Configuração padrão
  const defaultConfig = {
    highlightColor: 0x800F2F,
    midtoneColor: 0xFFB3C1,
    lowlightColor: 0xA4133C,
    baseColor: 0x23060E,
  };

  const vantaConfig = config || defaultConfig;

  useEffect(() => {
    let mounted = true;

    const initVanta = async () => {
      try {
        if (typeof window === 'undefined') return;

        // Carrega Three.js primeiro
        const THREE = await import('three');
        (window as any).THREE = THREE;

        // Carrega Vanta Fog
        const VANTA = await import('vanta/dist/vanta.fog.min');

        if (!mounted) return;

        // Pega a primeira seção registrada
        const firstSection = sectionsRef.current.values().next().value;
        if (!firstSection) return;

        // Cria uma única instância do Vanta
        vantaInstanceRef.current = (VANTA as any).default({
          el: firstSection,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 400.00,
          minWidth: 400.00,
          ...vantaConfig,
          speed: 1.5,
          zoom: 0.8
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao carregar Vanta:', error);
        setIsLoading(false);
      }
    };

    // Delay para não bloquear a renderização inicial
    const timer = setTimeout(initVanta, 100);

    return () => {
      mounted = false;
      clearTimeout(timer);
      if (vantaInstanceRef.current) {
        vantaInstanceRef.current.destroy();
        vantaInstanceRef.current = null;
      }
    };
  }, []);

  const registerSection = (id: string, ref: HTMLElement) => {
    sectionsRef.current.set(id, ref);
    
    // Se já temos uma instância do Vanta e esta é uma nova seção, atualiza o elemento
    if (vantaInstanceRef.current && sectionsRef.current.size === 1) {
      vantaInstanceRef.current.setOptions({ el: ref });
    }
  };

  const unregisterSection = (id: string) => {
    sectionsRef.current.delete(id);
  };

  const value = {
    vantaInstance: vantaInstanceRef.current,
    isLoading,
    registerSection,
    unregisterSection,
  };

  return (
    <VantaContext.Provider value={value}>
      {children}
    </VantaContext.Provider>
  );
}

export function useSharedVanta(sectionId: string) {
  const context = useContext(VantaContext);
  
  if (!context) {
    throw new Error('useSharedVanta must be used within VantaProvider');
  }

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      context.registerSection(sectionId, sectionRef.current);
    }

    return () => {
      context.unregisterSection(sectionId);
    };
  }, [sectionId, context]);

  return {
    vantaRef: sectionRef,
    isLoading: context.isLoading,
    vantaInstance: context.vantaInstance,
  };
}
