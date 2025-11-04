"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface TimelineEntry {
  title?: string;
  image?: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
  showHeader?: boolean;
  headerTitle?: string;
  headerDescription?: string;
}

export const Timeline = ({ 
  data, 
  showHeader = true, 
  headerTitle = "Changelog from my journey",
  headerDescription = "I've been working on Aceternity for the past 2 years. Here's a timeline of my journey."
}: TimelineProps) => {
  useScrollAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  useEffect(() => {
    if (!lineRef.current || !ref.current) return;

    const initAnimation = async () => {
      try {
        // Carrega GSAP dinamicamente
        const [gsapModule, scrollTriggerModule] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger')
        ]);

        const gsap = gsapModule.gsap;
        const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
        
        gsap.registerPlugin(ScrollTrigger);

        const isMobile = window.innerWidth < 768;

        // Usa ScrollTrigger tanto para mobile quanto desktop
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: isMobile ? "bottom top" : "bottom 40%",
            scrub: 0.3,
            invalidateOnRefresh: true,
            markers: false,
          }
        });

        // No mobile, anima até 200% para garantir que cobre todos os itens
        timeline.fromTo(
          lineRef.current,
          {
            height: "0%",
          },
          {
            height: isMobile ? "200%" : "98%",
            ease: "none",
          }
        );

        const handleResize = () => {
          ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);

        return () => {
          timeline.kill();
          window.removeEventListener('resize', handleResize);
        };

      } catch (error) {
        console.log('⚠️ Timeline GSAP não carregado:', error);
        return () => {}; // Noop cleanup
      }
    };

    let cleanup: (() => void) | undefined;
    
    initAnimation().then(cleanupFn => {
      cleanup = cleanupFn;
    });

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [height]);

  return (
    <div
      className="w-full bg-transparent font-kumbh"
    >
      {showHeader && (
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          <h2 className="text-lg md:text-4xl mb-4 text-black max-w-4xl">
            {headerTitle}
          </h2>
          <p className="text-neutral-700 text-sm md:text-base max-w-sm">
            {headerDescription}
          </p>
        </div>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-20 md:gap-1"
          >
            <div className="sticky flex flex-col md:flex-row z-40 top-[160px] md:top-40 self-start w-12">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-top pt-2 justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 border border-neutral-300" />
              </div>
              {item.title && (
                <h3 className="hidden md:block text-base md:pl-20 md:text-2xl font-semibold text-neutral-500">
                  {item.title}
                </h3>
              )}
            </div>

            <div className="relative pl-8 pr-4 md:pl-4 w-full flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-1">
                {item.title && (
                  <h3 className="md:hidden block text-base mb-4 text-left font-semibold text-neutral-500">
                    {item.title}
                  </h3>
                )}
                {item.content}
              </div>
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.title || "Timeline image"} 
                  className="fade-in w-full md:w-64 md:h-64 object-cover rounded-2xl shadow-lg flex-shrink-0"
                />
              )}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px]"
        >
          <div
            ref={lineRef}
            style={{
              background: 'var(--color-accent-500)'
            }}
            className="absolute inset-x-0 top-0 w-[2px] h-0 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
