'use client';

import React, { useState } from 'react';
import { useCasamento } from '@/contexts/CasamentoContext';
import { useLeads } from '@/hooks/useLeads';

export const CasamentoStep2_3: React.FC = () => {
  const { state, updateStep2_3, goToStep } = useCasamento();
  const { updateLead, loading } = useLeads();

  const [motivacaoBolo, setMotivacaoBolo] = useState(state.step2_3Data?.motivacaoBolo || '');

  const handleNext = async () => {
    updateStep2_3({
      motivacaoBolo,
    });

    // Atualiza o lead no Supabase
    if (state.leadId) {
      await updateLead(state.leadId, {
        dados_extras: {
          ...state.step1Data,
          ...state.step2Data,
          motivacaoBolo,
        },
      });
    }

    goToStep(2.5);
  };

  const handleBack = () => {
    updateStep2_3({
      motivacaoBolo,
    });
    goToStep(2);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <div className="space-y-6">
        <h6 className="text-base font-bold font-unbounded text-[#703535] leading-relaxed">
          A tradição de bolos altos começou na França no século XVII. A corte vivia com muita fartura e a oferecia para seus convidados. Desde então, ele está presente em importantes celebrações como símbolo de prosperidade e união. Hoje em dia, é visto por nossos casais como uma forma de compartilhar amor e criar memórias afetivas em forma de doce.
        </h6>

        <div>
          <label htmlFor="motivacaoBolo" className="block text-sm font-medium text-gray-700 mb-2">
            Além da história e tradição, queremos conhecer vocês! O que os motiva a optarem pela escolha de ter o bolo no casamento?
          </label>
          <textarea
            id="motivacaoBolo"
            value={motivacaoBolo}
            onChange={(e) => setMotivacaoBolo(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg transition-all resize-none"
            rows={5}
            placeholder="Conte-nos sua motivação..."
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
          {loading ? 'Salvando...' : 'Próximo'}
        </button>
      </div>
    </div>
  );
};
