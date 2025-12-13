'use client';

import React from 'react';
import { useCasamento } from '@/contexts/CasamentoContext';

export const CasamentoStep2_7: React.FC = () => {
  const { goToStep } = useCasamento();

  const handleNext = () => {
    goToStep(3);
  };

  const handleBack = () => {
    goToStep(2.5);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <div className="space-y-6">
        <h6 className="text-base font-bold font-unbounded text-[#703535] leading-relaxed">
          Na cidade de Garopaba, temos costume de ir a cafeterias desfrutar de um bom café e uma rica fatia de bolo fresquinho. O valor médio de uma fatia exposta na vitrine para uma pessoa é de R$ 18 a R$ 21, com a decoração padrão de cada local.
        </h6>
      </div>

      <div className="mt-8 flex justify-between">
        <button 
          onClick={handleBack}
          className="btn-secondary-sm-outline"
        >
          Voltar
        </button>
        <button 
          onClick={handleNext}
          className="btn-primary-sm"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
