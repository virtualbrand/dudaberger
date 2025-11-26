import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    let isLoaded = false;
    let scrollTriggers: any[] = [];
    let rafId: number | null = null;

    const initAnimations = async () => {
      try {
        // Aguarda idle time ou timeout de 1s para não bloquear thread principal
        if ('requestIdleCallback' in window) {
          await new Promise(resolve => {
            requestIdleCallback(resolve, { timeout: 1000 });
          });
        } else {
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Carrega GSAP dinamicamente
        const [gsapModule, scrollTriggerModule] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger')
        ]);

        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);
        isLoaded = true;

        // Aguardar o DOM estar pronto
        const timer = setTimeout(() => {
          const animations = [
            { selector: ".scroll-bottom", props: { y: 50 } },
            { selector: ".scroll-left", props: { x: -80 } },
            { selector: ".scroll-right", props: { x: 80 } },
            { selector: ".scroll-top", props: { y: -80 } },
            { selector: ".fade-in", props: { y: 0 } }
          ];

          animations.forEach(animation => {
            document.querySelectorAll(animation.selector).forEach(element => {
              const trigger = gsap.fromTo(element, 
                {
                  opacity: 0,
                  filter: "blur(10px)",
                  ...animation.props,
                },
                {
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                  x: 0,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    end: "top 65%",
                    scrub: 1,
                    toggleActions: "play reverse play reverse",
                  }
                }
              );
              
              // Armazenar referência ao ScrollTrigger
              if (trigger.scrollTrigger) {
                scrollTriggers.push(trigger.scrollTrigger);
              }
            });
          });

          ScrollTrigger.refresh();
        }, 100);

        return () => {
          clearTimeout(timer);
          // Limpar todos os ScrollTriggers criados
          scrollTriggers.forEach(trigger => {
            if (trigger && typeof trigger.kill === 'function') {
              trigger.kill();
            }
          });
          scrollTriggers = [];
          
          // Cancelar qualquer RAF pendente
          if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        };

      } catch (error) {
        return () => {}; // Noop cleanup
      }
    };

    let cleanup: (() => void) | undefined;
    
    initAnimations().then(cleanupFn => {
      cleanup = cleanupFn;
    });

    // Cleanup principal - executado quando componente desmonta
    return () => {
      if (cleanup) {
        cleanup();
      }
      
      // Limpeza adicional de segurança
      if (isLoaded) {
        try {
          const { ScrollTrigger } = require('gsap/ScrollTrigger');
          ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
        } catch (e) {
          // ScrollTrigger não carregado, ignorar
        }
      }
    };
  }, []); // Array vazio garante que só executa uma vez
};
