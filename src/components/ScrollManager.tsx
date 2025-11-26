'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Componente para gerenciar scroll após mudanças de rota
export const ScrollManager = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll para o topo quando a rota muda
    window.scrollTo(0, 0);
    
    // Força update do ScrollTrigger após mudança de rota (dinamicamente)
    const timer = setTimeout(async () => {
      try {
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        ScrollTrigger.refresh();
      } catch (e) {
        // ScrollTrigger não disponível
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

export default ScrollManager;