'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from '@studio-freight/lenis';

export const useLenisScrollSimple = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Limpa instância anterior se existir
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    // Força scroll para o topo na mudança de rota
    window.scrollTo(0, 0);

    // Aguarda um pouco para o DOM atualizar
    const initTimer = setTimeout(() => {
      try {
        // Verifica se há conteúdo scrollável
        const hasScrollableContent = document.body.scrollHeight > window.innerHeight + 50;
        
        if (!hasScrollableContent) {
          console.log('⚠️ Conteúdo não scrollável, Lenis desabilitado');
          return;
        }

        // Cria nova instância do Lenis com configuração simples
        lenisRef.current = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 2,
          infinite: false,
          gestureOrientation: 'vertical',
          wheelMultiplier: 1,
        });

        // Função de animação simples
        function raf(time: number) {
          if (lenisRef.current) {
            lenisRef.current.raf(time);
          }
          rafIdRef.current = requestAnimationFrame(raf);
        }
        rafIdRef.current = requestAnimationFrame(raf);

        console.log('✅ Lenis inicializado para rota:', location.pathname);

      } catch (error) {
        console.error('❌ Erro ao inicializar Lenis:', error);
        // Fallback para scroll nativo
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      }
    }, 100); // Timeout mais curto

    return () => {
      clearTimeout(initTimer);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [location.pathname]); // Reinicia a cada mudança de rota

  return lenisRef.current;
};