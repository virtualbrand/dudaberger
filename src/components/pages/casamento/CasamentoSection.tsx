'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CasamentoProvider, useCasamento } from '@/contexts/CasamentoContext';
import { CasamentoStepper } from './CasamentoStepper';
import { CasamentoStep1 } from './CasamentoStep1';
import { CasamentoStep2 } from './CasamentoStep2';
import { CasamentoStep2_3 } from './CasamentoStep2_3';
import { CasamentoStep2_5 } from './CasamentoStep2_5';
import { CasamentoStep2_7 } from './CasamentoStep2_7';
import { CasamentoStep3 } from './CasamentoStep3';
import { CasamentoStep4 } from './CasamentoStep4';
import { CasamentoStep5 } from './CasamentoStep5';
import { CasamentoStep6 } from './CasamentoStep6';

const STEPS = ['Etapa 1', 'Etapa 2', 'Etapa 2.3', 'Etapa 2.5', 'Etapa 2.7', 'Etapa 3', 'Etapa 4', 'Etapa 5', 'Etapa 6'];

const CasamentoContent: React.FC = () => {
  const { state } = useCasamento();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayStep, setDisplayStep] = useState(state.currentStep);

  useEffect(() => {
    if (displayStep !== state.currentStep) {
      setIsTransitioning(true);
      
      const timer = setTimeout(() => {
        setDisplayStep(state.currentStep);
        setIsTransitioning(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [state.currentStep, displayStep]);

  return (
    <div className="min-h-screen py-8 px-4 bg-[#d4c4b2] flex items-center justify-center relative overflow-hidden">
      {/* Shadow Background Overlay - Desktop */}
      <div className="absolute inset-0 z-0 opacity-50 hidden lg:block" suppressHydrationWarning>
        <Image
          src="/images/workshop/shadow-bg.webp"
          alt=""
          fill
          className="object-cover"
          priority={true}
        />
      </div>
      
      {/* Shadow Background Overlay - Mobile */}
      <div className="absolute inset-0 z-0 opacity-30 lg:hidden" suppressHydrationWarning>
        <Image
          src="/images/workshop/shadow-bg-mobile.webp"
          alt=""
          fill
          className="object-cover"
          priority={true}
        />
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        .step-enter {
          animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .step-exit {
          animation: fadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      <div className="mx-auto max-w-[900px] w-full relative z-10">
        <div className={isTransitioning ? 'step-exit' : 'step-enter'}>
          {displayStep === 1 && <CasamentoStep1 />}
          {displayStep === 2 && <CasamentoStep2 />}
          {displayStep === 2.3 && <CasamentoStep2_3 />}
          {displayStep === 2.5 && <CasamentoStep2_5 />}
          {displayStep === 2.7 && <CasamentoStep2_7 />}
          {displayStep === 3 && <CasamentoStep3 />}
          {displayStep === 4 && <CasamentoStep4 />}
          {displayStep === 5 && <CasamentoStep5 />}
          {displayStep === 6 && <CasamentoStep6 />}
        </div>
      </div>
    </div>
  );
};

const CasamentoSection: React.FC = () => {
  return (
    <CasamentoProvider>
      <CasamentoContent />
    </CasamentoProvider>
  );
};

export default CasamentoSection;
