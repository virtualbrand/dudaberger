import { useEffect, useState } from 'react';

interface VantaPreloadState {
  isLoading: boolean;
  isReady: boolean;
  error: string | null;
}

// Estado global compartilhado para evitar múltiplos carregamentos
const globalState: { current: VantaPreloadState } = {
  current: {
    isLoading: false,
    isReady: false,
    error: null
  }
};

let loadPromise: Promise<void> | null = null;
const listeners = new Set<(state: VantaPreloadState) => void>();

const notifyListeners = () => {
  listeners.forEach(listener => listener(globalState.current));
};

const preloadVantaScripts = async (): Promise<void> => {
  if (loadPromise) {
    return loadPromise;
  }

  if (globalState.current.isReady) {
    return Promise.resolve();
  }

  globalState.current.isLoading = true;
  globalState.current.error = null;
  notifyListeners();

  loadPromise = (async () => {
    try {
      // Verifica se os scripts já foram carregados pelo preload
      if (typeof window !== 'undefined' && 
          window.THREE && 
          window.VANTA && 
          typeof window.VANTA.FOG === 'function') {
        globalState.current.isReady = true;
        globalState.current.isLoading = false;
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
          
          // Timeout de 5 segundos (reduzido de 10)
          setTimeout(() => reject(new Error('Timeout ao carregar Three.js')), 5000);
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
          
          // Timeout de 5 segundos (reduzido de 10)
          setTimeout(() => reject(new Error('Timeout ao carregar Vanta FOG')), 5000);
        });
      }

      globalState.current.isReady = true;
      globalState.current.isLoading = false;
      globalState.current.error = null;
    } catch (error) {
      globalState.current.isLoading = false;
      globalState.current.error = error instanceof Error ? error.message : 'Erro desconhecido';
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
  const [state, setState] = useState<VantaPreloadState>(globalState.current);

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
    if (!globalState.current.isLoading && !globalState.current.isReady) {
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