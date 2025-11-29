'use client';

import React from 'react';
import { Check, CakeSlice, HandCoins, CircleDollarSign, ChartNoAxesCombined } from 'lucide-react';
import { useCalculator } from '@/contexts/CalculatorContext';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

const STEP_ICONS = [CakeSlice, HandCoins, CircleDollarSign, ChartNoAxesCombined];

export const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  const { goToStep, state } = useCalculator();

  // Validação para cada etapa
  const canAccessStep = (stepNumber: number): boolean => {
    if (stepNumber <= currentStep) return true; // Sempre pode acessar etapas anteriores ou atual
    
    switch (stepNumber) {
      case 2: // Custos Fixos - precisa ter pelo menos 1 produto
        return state.products.length > 0;
      case 3: // Vendas - precisa ter pelo menos 1 produto e 1 custo fixo
        return state.products.length > 0 && state.fixedCosts.length > 0;
      case 4: // Resultados - precisa ter pelo menos 1 produto com quantidade > 0
        return state.products.some(p => (p.quantity || 0) > 0);
      default:
        return false;
    }
  };

  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isClickable = canAccessStep(stepNumber);
          const StepIcon = STEP_ICONS[index];

          return (
            <React.Fragment key={stepNumber}>
              <div 
                className="flex flex-col items-center"
                style={{ minWidth: '120px' }}
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
                    width: '65px',
                    height: '65px',
                    boxShadow: isActive ? '0 0 0 4px var(--honey-bronze-200)' : 'none'
                  }}
                >
                  {isCompleted ? <Check className="w-7 h-7" /> : <StepIcon className="w-7 h-7" />}
                </div>
                <span
                  className={`text-xs md:text-sm lg:text-base font-bold font-unbounded mt-2 text-center hidden md:block ${
                    isActive ? 'text-[var(--honey-bronze-500)]' : 'text-[var(--rosy-taupe-400)]'
                  } ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                >
                  {step}
                </span>
              </div>
              {stepNumber < steps.length && (
                <div
                  className={`flex-1 h-[2px] mx-2 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-[#b17878]'  // Linha entre steps completados e atual
                      : stepNumber === currentStep
                      ? 'bg-[#e58684]'  // Linha entre step atual e próximo
                      : 'bg-[#d4c4b2]'  // Linha padrão entre steps não alcançados
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
