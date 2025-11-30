'use client';

import React from 'react';
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

  return (
    <div className="min-h-screen py-8 px-4 bg-[#F6EEE1] flex items-center justify-center">
      <div className="mx-auto max-w-[900px] w-full">
        <div>
          {state.currentStep === 1 && <CasamentoStep1 />}
          {state.currentStep === 2 && <CasamentoStep2 />}
          {state.currentStep === 2.3 && <CasamentoStep2_3 />}
          {state.currentStep === 2.5 && <CasamentoStep2_5 />}
          {state.currentStep === 2.7 && <CasamentoStep2_7 />}
          {state.currentStep === 3 && <CasamentoStep3 />}
          {state.currentStep === 4 && <CasamentoStep4 />}
          {state.currentStep === 5 && <CasamentoStep5 />}
          {state.currentStep === 6 && <CasamentoStep6 />}
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
