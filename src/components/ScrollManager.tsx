import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Componente para gerenciar scroll após mudanças de rota
export const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll para o topo quando a rota muda
    window.scrollTo(0, 0);
    
    // Força update do ScrollTrigger após mudança de rota (dinamicamente)
    const timer = setTimeout(async () => {
      try {
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        ScrollTrigger.refresh();
      } catch (error) {
        console.log('⚠️ ScrollTrigger não disponível para refresh');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

export default ScrollManager;