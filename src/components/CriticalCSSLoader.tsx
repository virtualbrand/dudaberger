"use client";

import { useEffect } from 'react';

/**
 * Componente que carrega CSS não-crítico de forma assíncrona
 * para evitar render-blocking
 */
export function CriticalCSSLoader() {
  useEffect(() => {
    // Carregar CSS de animações de forma assíncrona
    const loadNonCriticalCSS = () => {
      // Carrega tw-animate-css de forma não-bloqueante
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/animations.css';
      link.media = 'print';
      link.onload = function() {
        // @ts-ignore
        this.media = 'all';
      };
      document.head.appendChild(link);
    };

    // Carregar após o primeiro render
    if (document.readyState === 'complete') {
      loadNonCriticalCSS();
    } else {
      window.addEventListener('load', loadNonCriticalCSS);
      return () => window.removeEventListener('load', loadNonCriticalCSS);
    }
  }, []);

  return null;
}
