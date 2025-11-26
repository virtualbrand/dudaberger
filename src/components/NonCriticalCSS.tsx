'use client';

import { useEffect } from 'react';

/**
 * Componente que carrega CSS não-crítico de forma assíncrona
 * após a primeira renderização para não bloquear o critical rendering path
 */
export default function NonCriticalCSS() {
  useEffect(() => {
    // Carrega o CSS não-crítico apenas no client-side, após a montagem
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/app/non-critical.css';
    link.media = 'print'; // Inicialmente define como print para não bloquear
    
    // Após o load, muda para 'all' para aplicar os estilos
    link.onload = () => {
      link.media = 'all';
    };
    
    document.head.appendChild(link);
    
    return () => {
      // Cleanup se o componente for desmontado
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

  return null; // Este componente não renderiza nada
}
