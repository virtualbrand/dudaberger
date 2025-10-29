import { useEffect, useState } from 'react';

interface VantaPreloadState {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
}

// Estado global compartilhado para evitar múltiplos carregamentos
let globalState: VantaPreloadState = {
  isLoading: false,
  isReady: false,
  error: null
};

let loadPromise: Promise<void> | null = null;
const listeners = new Set<(state: VantaPreloadState) => void>();

const notifyListeners = () => {
  listeners.forEach(listener => listener(globalState));
};

const preloadVantaScripts = async (): Promise<void> => {
  if (loadPromise) {
    return loadPromise;
  }

  if (globalState.isReady) {
    return Promise.resolve();
  }

  globalState.isLoading = true;
  globalState.error = null;
  notifyListeners();

  loadPromise = (async () => {
    try {
      // Verifica se os scripts já foram carregados pelo preload
      if (typeof window !== 'undefined' && 
          window.THREE && 
          window.VANTA && 
          typeof window.VANTA.FOG === 'function') {
        globalState.isReady = true;
        globalState.isLoading = false;
        notifyListeners();
        return;
      }

      // Carrega Three.js se não estiver disponível
      if (!window.THREE) {
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
        threeScript.crossOrigin = 'anonymous';
        document.head.appendChild(threeScript);
        
        await new Promise<void>((resolve, reject) => {
          threeScript.onload = () => resolve();
          threeScript.onerror = () => reject(new Error('Falha ao carregar Three.js'));
          
          // Timeout de 10 segundos
          setTimeout(() => reject(new Error('Timeout ao carregar Three.js')), 10000);
        });
      }

      // Carrega Vanta FOG se não estiver disponível
      if (!window.VANTA || typeof window.VANTA.FOG !== 'function') {
        const vantaScript = document.createElement('script');
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js';
        vantaScript.crossOrigin = 'anonymous';
        document.head.appendChild(vantaScript);
        
        await new Promise<void>((resolve, reject) => {
          vantaScript.onload = () => resolve();
          vantaScript.onerror = () => reject(new Error('Falha ao carregar Vanta FOG'));
          
          // Timeout de 10 segundos
          setTimeout(() => reject(new Error('Timeout ao carregar Vanta FOG')), 10000);
        });
      }

      globalState.isReady = true;
      globalState.isLoading = false;
      globalState.error = null;
    } catch (error) {
      globalState.isLoading = false;
      globalState.error = error instanceof Error ? error.message : 'Erro desconhecido';
      loadPromise = null;
    }

    notifyListeners();
  })();

  return loadPromise;
};

/**
 * Hook para preload antecipado dos scripts do Vanta
 * Pode ser usado em componentes que aparecem antes da Hero para iniciar o carregamento
 */
export const useVantaPreload = () => {
  const [state, setState] = useState<VantaPreloadState>(globalState);

  useEffect(() => {
    const listener = (newState: VantaPreloadState) => {
      setState({ ...newState });
    };

    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const startPreload = () => {
    if (!globalState.isLoading && !globalState.isReady) {
      preloadVantaScripts().catch(() => {
        // Erro já tratado no estado global
      });
    }
  };

  return {
    ...state,
    startPreload,
    preloadPromise: loadPromise
  };
};

// Exporta a função de preload para uso direto
export { preloadVantaScripts };

declare global {
  interface Window {
    THREE: any;
    VANTA: {
      FOG: (options: any) => any;
    };
  }
}