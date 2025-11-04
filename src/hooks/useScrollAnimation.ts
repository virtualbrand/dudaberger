import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    let isLoaded = false;

    const initAnimations = async () => {
      try {
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
              gsap.fromTo(element, 
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
            });
          });

          ScrollTrigger.refresh();
        }, 100);

        return () => {
          clearTimeout(timer);
          if (isLoaded) {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          }
        };

      } catch (error) {
        console.log('⚠️ Animações GSAP não carregadas:', error);
        return () => {}; // Noop cleanup
      }
    };

    let cleanup: (() => void) | undefined;
    
    initAnimations().then(cleanupFn => {
      cleanup = cleanupFn;
    });

    // Cleanup principal
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);
};
