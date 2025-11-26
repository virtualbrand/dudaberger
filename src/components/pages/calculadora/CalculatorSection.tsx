'use client';

import React from 'react';
import { CalculatorProvider, useCalculator } from '@/contexts/CalculatorContext';
import { Stepper } from './Stepper';
import { Step1Products } from './Step1Products';
import { Step2FixedCosts } from './Step2FixedCosts';
import { Step3Sales } from './Step3Sales';
import { Step4Results } from './Step4Results';

const STEPS = ['Produtos', 'Custos Fixos', 'Vendas', 'Resultados'];

const CalculatorContent: React.FC = () => {
  const { state } = useCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Stepper currentStep={state.currentStep} steps={STEPS} />

        <div className="mt-8">
          {state.currentStep === 1 && <Step1Products />}
          {state.currentStep === 2 && <Step2FixedCosts />}
          {state.currentStep === 3 && <Step3Sales />}
          {state.currentStep === 4 && <Step4Results />}
        </div>
      </div>
    </div>
  );
};

const CalculatorSection: React.FC = () => {
  return (
    <CalculatorProvider>
      <CalculatorContent />
    </CalculatorProvider>
  );
};

export default CalculatorSection;
