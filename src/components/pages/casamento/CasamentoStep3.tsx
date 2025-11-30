'use client';

import React, { useState } from 'react';
import { useCasamento } from '@/contexts/CasamentoContext';

export const CasamentoStep3: React.FC = () => {
  const { state, updateStep3, goToStep } = useCasamento();

  const [numeroConvidados, setNumeroConvidados] = useState(state.step3Data.numeroConvidados || '');
  const [budgetPorConvidado, setBudgetPorConvidado] = useState(state.step3Data.budgetPorConvidado || '');

  const getNumeroConvidadosValue = () => {
    return parseInt(numeroConvidados.replace(/\./g, '')) || 0;
  };

  const isFormValid = numeroConvidados !== '' && getNumeroConvidadosValue() > 0 && budgetPorConvidado !== '';

  const formatNumber = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    // Formata com pontos de milhares
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleNumeroConvidadosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumber(e.target.value);
    setNumeroConvidados(formatted);
    // Atualiza o contexto em tempo real
    updateStep3({
      numeroConvidados: formatted,
      budgetPorConvidado,
    });
  };

  const handleBudgetChange = (value: string) => {
    setBudgetPorConvidado(value);
    // Atualiza o contexto em tempo real
    updateStep3({
      numeroConvidados,
      budgetPorConvidado: value,
    });
  };

  const handleNext = () => {
    updateStep3({
      numeroConvidados,
      budgetPorConvidado,
    });
    goToStep(4);
  };

  const handleBack = () => {
    updateStep3({
      numeroConvidados,
      budgetPorConvidado,
    });
    goToStep(2.7);
  };

  const budgetOptions = [
    { id: 'A', label: 'Entre R$25 e R$30', value: 'R$25-R$30', min: 25, max: 30 },
    { id: 'B', label: 'Entre R$20 e R$25', value: 'R$20-R$25', min: 20, max: 25 },
    { id: 'C', label: 'Entre R$15 e R$20', value: 'R$15-R$20', min: 15, max: 20 },
    { id: 'D', label: 'Entre R$10 e R$15', value: 'R$10-R$15', min: 10, max: 15 },
  ];

  const calculateTotal = (min: number, max: number) => {
    const numConvidados = parseInt(numeroConvidados.replace(/\./g, '')) || 0;
    if (numConvidados === 0) return null;
    
    const totalMin = numConvidados * min;
    const totalMax = numConvidados * max;
    
    const formatCurrency = (value: number) => {
      return value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    };
    
    return `(entre R$ ${formatCurrency(totalMin)} e R$ ${formatCurrency(totalMax)})`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <div className="space-y-6">
        <div>
          <label htmlFor="numeroConvidados" className="block text-sm font-medium text-gray-700 mb-1">
            Número de convidados <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="numeroConvidados"
            value={numeroConvidados}
            onChange={handleNumeroConvidadosChange}
            className="w-full px-4 py-3 border rounded-lg transition-all"
            placeholder="Ex: 150"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Qual budget por convidado vocês tem preferência para investir no bolo da cerimônia? <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-3">Opções por convidado</p>
          <div className="space-y-3">
            {budgetOptions.map((option) => (
              <label
                key={option.id}
                className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  budgetPorConvidado === option.value
                    ? 'border-[#D65B58] bg-[#D65B58]/5'
                    : 'border-gray-300 hover:border-[#D65B58]/50'
                }`}
              >
                <div className="flex items-center flex-1">
                  <input
                    type="radio"
                    name="budgetPorConvidado"
                    value={option.value}
                    checked={budgetPorConvidado === option.value}
                    onChange={(e) => handleBudgetChange(e.target.value)}
                    className="w-5 h-5 text-[#D65B58] border-gray-300 focus:ring-[#D65B58] cursor-pointer"
                  />
                  <span className="ml-3 text-gray-700 font-medium">{option.label}</span>
                </div>
                {calculateTotal(option.min, option.max) && (
                  <span className="text-xs text-gray-500 ml-2">
                    {calculateTotal(option.min, option.max)}
                  </span>
                )}
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
