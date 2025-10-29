import { useState, useEffect } from 'react';

interface DevicePerformance {
  isLowEnd: boolean;
  memoryLevel: 'low' | 'medium' | 'high';
  connectionType: 'slow' | 'medium' | 'fast';
  shouldReduceAnimations: boolean;
  shouldReduceEffects: boolean;
}

export const useDevicePerformance = (): DevicePerformance => {
  const [performance, setPerformance] = useState<DevicePerformance>({
    isLowEnd: false,
    memoryLevel: 'medium',
    connectionType: 'medium',
    shouldReduceAnimations: false,
    shouldReduceEffects: false,
  });

  useEffect(() => {
    const detectPerformance = () => {
      // Detectar memória do device
      const memory = (navigator as any).deviceMemory || 4;
      const memoryLevel: 'low' | 'medium' | 'high' = 
        memory <= 2 ? 'low' : memory <= 4 ? 'medium' : 'high';

      // Detectar conexão
      const connection = (navigator as any).connection;
      let connectionType: 'slow' | 'medium' | 'fast' = 'medium';
      
      if (connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') {
        connectionType = 'slow';
      } else if (connection?.effectiveType === '3g') {
        connectionType = 'medium';
      } else {
        connectionType = 'fast';
      }

      // Detectar se é mobile
      const isMobile = window.innerWidth < 768;
      
      // Detectar se user prefere reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Critérios para low-end device
      const isLowEnd = 
        memory < 4 || 
        connectionType === 'slow' ||
        (isMobile && memoryLevel === 'low') ||
        prefersReducedMotion;

      // Configurações baseadas na performance
      const shouldReduceAnimations = 
        isLowEnd || 
        prefersReducedMotion || 
        connectionType === 'slow';

      const shouldReduceEffects = 
        memoryLevel === 'low' || 
        (isMobile && connectionType === 'slow');

      setPerformance({
        isLowEnd,
        memoryLevel,
        connectionType,
        shouldReduceAnimations,
        shouldReduceEffects,
      });
    };

    detectPerformance();

    // Re-detectar se a tela for redimensionada
    const handleResize = () => detectPerformance();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return performance;
};

// Hook para configurações de animação baseadas na performance
export const useAnimationConfig = () => {
  const { shouldReduceAnimations, shouldReduceEffects } = useDevicePerformance();

  return {
    // GSAP/Lenis configs
    duration: shouldReduceAnimations ? 0.3 : 1.2,
    ease: shouldReduceAnimations ? 'ease' : 'ease-out',
    
    // Framer Motion configs
    animate: !shouldReduceAnimations,
    transition: {
      duration: shouldReduceAnimations ? 0.2 : 0.6,
      ease: shouldReduceAnimations ? 'easeOut' : 'easeInOut',
    },
    
    // Efeitos visuais
    enableParticles: !shouldReduceEffects,
    enableBlur: !shouldReduceEffects,
    enableShadows: !shouldReduceEffects,
    
    // Vanta configs
    vantaEnabled: !shouldReduceEffects,
    vantaQuality: shouldReduceEffects ? 'low' : 'high',
  };
};

export default useDevicePerformance;