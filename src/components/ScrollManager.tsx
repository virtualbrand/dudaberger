import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Componente para gerenciar scroll após mudanças de rota
export const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll para o topo quando a rota muda
    window.scrollTo(0, 0);
    
    // Força update do ScrollTrigger após mudança de rota
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
};

export default ScrollManager;