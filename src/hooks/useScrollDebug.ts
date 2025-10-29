import { useEffect } from 'react';

export const useScrollDebug = () => {
  useEffect(() => {
    console.log('🔍 Diagnóstico de Scroll:');
    
    // Verifica se o scroll nativo funciona
    const testNativeScroll = () => {
      console.log('📏 Altura da página:', document.body.scrollHeight);
      console.log('📏 Altura da viewport:', window.innerHeight);
      console.log('🔄 Scroll Y atual:', window.scrollY);
      console.log('✅ Scroll nativo disponível:', document.body.scrollHeight > window.innerHeight);
    };

    // Verifica se Lenis existe
    const checkLenis = () => {
      const lenisElements = document.querySelectorAll('[data-lenis-prevent]');
      console.log('🎯 Elementos Lenis encontrados:', lenisElements.length);
    };

    // Testa scroll programático
    const testProgrammaticScroll = () => {
      setTimeout(() => {
        console.log('🧪 Testando scroll programático...');
        window.scrollTo(0, 100);
        setTimeout(() => {
          console.log('📍 Posição após teste:', window.scrollY);
          window.scrollTo(0, 0);
        }, 1000);
      }, 2000);
    };

    testNativeScroll();
    checkLenis();
    testProgrammaticScroll();

    // Event listeners para monitorar scroll
    const handleScroll = () => {
      console.log('🔄 Scroll event detectado:', window.scrollY);
    };

    const handleWheel = (e: WheelEvent) => {
      console.log('🖱️ Wheel event:', e.deltaY);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);
};

export default useScrollDebug;