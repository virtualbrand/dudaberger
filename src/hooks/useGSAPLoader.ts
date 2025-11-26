import { useState } from 'react';

interface GSAPLoadState {
  gsap: any;
  ScrollTrigger: any;
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useGSAPLoader = () => {
  const [state, setState] = useState<GSAPLoadState>({
    gsap: null,
    ScrollTrigger: null,
    isLoaded: false,
    isLoading: false,
    error: null
  });

  const loadGSAP = async () => {
    if (state.isLoaded || state.isLoading) return state;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const [gsapModule, scrollTriggerModule] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger')
      ]);

      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      // Registra o plugin
      gsap.registerPlugin(ScrollTrigger);

      setState({
        gsap,
        ScrollTrigger,
        isLoaded: true,
        isLoading: false,
        error: null
      });

      return { gsap, ScrollTrigger, isLoaded: true, isLoading: false, error: null };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage
      }));
      console.error('❌ Erro ao carregar GSAP:', error);
      return { ...state, isLoading: false, error: errorMessage };
    }
  };

  return {
    ...state,
    loadGSAP
  };
};