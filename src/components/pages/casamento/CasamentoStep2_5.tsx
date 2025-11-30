'use client';

import React, { useState } from 'react';
import { useCasamento } from '@/contexts/CasamentoContext';

export const CasamentoStep2_5: React.FC = () => {
  const { state, updateStep2_5, goToStep } = useCasamento();

  const [selectedDoces, setSelectedDoces] = useState<string[]>(state.step2_5Data?.doces || []);

  const docesOptions = [
    { id: 'A', label: 'Mesa de Doces (6 a 8 doces por convidado)', value: 'mesa-doces' },
    { id: 'B', label: 'Reposição da Mesa de Doces (10 doces por convidado)', value: 'reposicao-mesa' },
    { id: 'C', label: 'Sobremesa no Menu', value: 'sobremesa-menu' },
  ];

  const handleToggleDoce = (value: string) => {
    const newSelection = selectedDoces.includes(value)
      ? selectedDoces.filter(d => d !== value)
      : [...selectedDoces, value];
    
    setSelectedDoces(newSelection);
    updateStep2_5({
      doces: newSelection,
    });
  };

  const handleNext = () => {
    updateStep2_5({
      doces: selectedDoces,
    });
    goToStep(2.7);
  };

  const handleBack = () => {
    updateStep2_5({
      doces: selectedDoces,
    });
    goToStep(2.3);
  };

  const isFormValid = selectedDoces.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <div className="space-y-6">
        <h4 className="text-lg md:text-xl lg:text-2xl font-bold font-unbounded text-[#703535] mb-6">
          Agora, vamos falar um pouco sobre a quantidade.
        </h4>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quais outros doces serão servidos? *
          </label>
          <p className="text-xs text-gray-500 mb-3">Selecione uma ou mais opções</p>
          <div className="space-y-3">
            {docesOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedDoces.includes(option.value)
                    ? 'border-[#D65B58] bg-[#D65B58]/5'
                    : 'border-gray-300 hover:border-[#D65B58]/50'
                }`}
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedDoces.includes(option.value)}
                  onChange={() => handleToggleDoce(option.value)}
                  className="w-5 h-5 text-[#D65B58] border-gray-300 rounded cursor-pointer"
                />
                <span className="ml-3 text-gray-700 font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
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
          disabled={!isFormValid}
          className="btn-primary-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};
