'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export const useLenisScrollSimplified = () => {
  const pathname = usePathname();
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const initLenis = async () => {
      try {
        // Aguardar o DOM ser totalmente carregado
        await new Promise(resolve => {
          if (document.readyState === 'complete') {
            resolve(true);
          } else {
            window.addEventListener('load', () => resolve(true), { once: true });
          }
        });

        // Importar Lenis dinamicamente
        const { default: Lenis } = await import('@studio-freight/lenis');

        // Limpar instância anterior se existir
        if (lenisRef.current) {
          lenisRef.current.destroy();
        }

        // Criar nova instância do Lenis
        lenisRef.current = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        // Função de animação
        function raf(time: number) {
          if (lenisRef.current) {
            lenisRef.current.raf(time);
          }
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Scroll para o topo em mudanças de rota
        lenisRef.current.scrollTo(0, { immediate: true });

      } catch (error) {
        console.warn('Erro ao inicializar Lenis:', error);
      }
    };

    initLenis();

    // Cleanup na mudança de rota
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [location.pathname]);

  // Cleanup global no unmount
  useEffect(() => {
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);
};