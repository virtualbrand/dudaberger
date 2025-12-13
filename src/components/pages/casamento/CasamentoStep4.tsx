'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useCasamento } from '@/contexts/CasamentoContext';
import { useLeads } from '@/hooks/useLeads';

export const CasamentoStep4: React.FC = () => {
  const { state, updateStep4, goToStep } = useCasamento();
  const { updateLead, loading } = useLeads();

  const handleBack = () => {
    goToStep(3);
  };

  const handleNext = async () => {
    // Atualiza o lead no Supabase
    if (state.leadId) {
      await updateLead(state.leadId, {
        dados_extras: {
          ...state.step1Data,
          ...state.step2Data,
          ...state.step2_3Data,
          ...state.step2_5Data,
          ...state.step3Data,
          ...state.step4Data,
        },
      });
    }

    goToStep(5);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateStep4({ consideracoesEspecificas: e.target.value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <div className="space-y-6">
        <div>
          <label htmlFor="consideracoes" className="block text-base font-unbounded font-bold leading-relaxed text-[#703535] mb-2">
            Há algum item, tamanho ou característica específica que vocês gostariam de considerar no orçamento?
          </label>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Exemplos: quantidade de andares, uso de composições individuais, itens de decoração, 
            quantidade mínima de bolo ou porção extra para o dia seguinte. Se ainda não tiverem clareza do que desejam, podem também nos contar o que não gostariam que estivesse presente.
          </p>
          <textarea
            id="consideracoes"
            value={state.step4Data.consideracoesEspecificas || ''}
            onChange={handleChange}
            rows={5}
            placeholder="Compartilhe suas preferências e considerações aqui..."
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[#D65B58] focus:outline-none focus:ring-0 resize-none"
          />
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
          disabled={loading}
          className="btn-primary-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Salvando...' : 'Continuar'}
        </button>
      </div>
    </div>
  );
};
