'use client';

import React from 'react';
import { Check, Circle } from 'lucide-react';
import { useCasamento } from '@/contexts/CasamentoContext';

interface CasamentoStepperProps {
  currentStep: number;
  steps: string[];
}

export const CasamentoStepper: React.FC<CasamentoStepperProps> = ({ currentStep, steps }) => {
  const { goToStep, state } = useCasamento();

  const stepNumbers = [1, 2, 2.3, 2.5, 2.7, 3, 4, 5, 6];

  const isStep1Valid = () => {
    const { nomeCasal, dataCerimonia, localFesta } = state.step1Data;
    return nomeCasal && dataCerimonia && localFesta;
  };

  const isStep3Valid = () => {
    const { numeroConvidados, budgetPorConvidado } = state.step3Data;
    const num = parseInt(String(numeroConvidados).replace(/\./g, '')) || 0;
    return numeroConvidados && num > 0 && budgetPorConvidado;
  };

  const isStep5Valid = () => {
    const { whatsapp } = state.step5Data;
    if (!whatsapp) return false;
    const digits = whatsapp.replace(/[^\d]/g, '');
    if (whatsapp.startsWith('+55')) {
      return digits.length >= 13;
    }
    return digits.length >= 10;
  };

  const canAccessStep = (stepNumber: number): boolean => {
    // Permite acesso a etapas anteriores ou atual
    if (stepNumber <= currentStep) return true;
    
    // Permite acesso ao step 2 se step 1 estiver válido
    if (stepNumber === 2 && isStep1Valid()) return true;
    
    // Permite acesso ao step 2.3 se step 1 estiver válido (step 2 é opcional)
    if (stepNumber === 2.3 && isStep1Valid()) return true;
    
    // Permite acesso ao step 2.5 se step 1 estiver válido
    if (stepNumber === 2.5 && isStep1Valid()) return true;
    
    // Permite acesso ao step 2.7 se step 1 estiver válido
    if (stepNumber === 2.7 && isStep1Valid()) return true;
    
    // Permite acesso ao step 3 se step 1 estiver válido
    if (stepNumber === 3 && isStep1Valid()) return true;
    
    // Permite acesso ao step 4 se step 1 e 3 estiverem válidos
    if (stepNumber === 4 && isStep1Valid() && isStep3Valid()) return true;
    
    // Permite acesso ao step 5 se step 1 e 3 estiverem válidos
    if (stepNumber === 5 && isStep1Valid() && isStep3Valid()) return true;
    
    // Permite acesso ao step 6 se step 1, 3 e 5 estiverem válidos
    if (stepNumber === 6 && isStep1Valid() && isStep3Valid() && isStep5Valid()) return true;
    
    return false;
  };

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = stepNumbers[index];
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isClickable = canAccessStep(stepNumber);

          return (
            <React.Fragment key={stepNumber}>
              <div 
                className="flex flex-col items-center"
                onClick={() => isClickable && goToStep(stepNumber)}
              >
                <div
                  className={`rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-[#703535] text-[#fdfbf7] hover:bg-[#D65B58]'
                      : isActive
                      ? 'bg-[#D65B58] text-[#fdfbf7]'
                      : isClickable
                      ? 'bg-white text-[#D65B58] hover:bg-[#D65B58] hover:text-[#fdfbf7]'
                      : 'bg-white text-[#D65B58]'
                  } ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                  style={{
                    width: '35px',
                    height: '35px',
                    boxShadow: isActive ? '0 0 0 4px rgba(212, 196, 178, 0.3)' : 'none'
                  }}
                >
                  {isCompleted ? (
                    <Check className="w-[10px] h-[10px]" />
                  ) : (
                    <Circle className="w-[10px] h-[10px]" fill="currentColor" />
                  )}
                </div>
              </div>
              {stepNumber < steps.length && (
                <div
                  className={`flex-1 h-[2px] mx-2 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-[#b17878]'
                      : stepNumber === currentStep
                      ? 'bg-[#e58684]'
                      : 'bg-[#d4c4b2]'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
