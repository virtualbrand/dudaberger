'use client';

import React, { useState } from 'react';
import { useCasamento } from '@/contexts/CasamentoContext';

export const CasamentoStep2: React.FC = () => {
  const { state, updateStep2, goToStep } = useCasamento();

  const [responsavelDecoracao, setResponsavelDecoracao] = useState(state.step2Data.responsavelDecoracao || '');
  const [responsavelOrganizacao, setResponsavelOrganizacao] = useState(state.step2Data.responsavelOrganizacao || '');
  const [fotografo, setFotografo] = useState(state.step2Data.fotografo || '');

  const handleNext = () => {
    updateStep2({
      responsavelDecoracao,
      responsavelOrganizacao,
      fotografo,
    });
    goToStep(2.3);
  };

  const handleBack = () => {
    updateStep2({
      responsavelDecoracao,
      responsavelOrganizacao,
      fotografo,
    });
    goToStep(1);
  };

  const isFormValid = responsavelOrganizacao.trim() !== '';

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <div className="space-y-6">
        <div>
          <label htmlFor="responsavelDecoracao" className="block text-sm font-medium text-gray-700 mb-1">
            Toda festa é encantadora pela mágica do ambiente. Quem será responsável pela decoração?
          </label>
          <input
            type="text"
            id="responsavelDecoracao"
            value={responsavelDecoracao}
            onChange={(e) => setResponsavelDecoracao(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg transition-all"
            placeholder="Ex: Nisinha, Amor & Praia"
          />
        </div>

        <div>
          <label htmlFor="responsavelOrganizacao" className="block text-sm font-medium text-gray-700 mb-1">
            Quem será responsável pela organização/cerimônia? *
          </label>
          <input
            type="text"
            id="responsavelOrganizacao"
            value={responsavelOrganizacao}
            onChange={(e) => setResponsavelOrganizacao(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg transition-all"
            placeholder="Ex: Bartira, Kitty"
            required
          />
        </div>

        <div>
          <label htmlFor="fotografo" className="block text-sm font-medium text-gray-700 mb-1">
            Cada um neste mundo vem para servir aos outros de alguma maneira. Uma das mais emocionantes é quem tem o dom de registrar as emoções vividas em um grande momento. Quem será o fotógrafo?
          </label>
          <input
            type="text"
            id="fotografo"
            value={fotografo}
            onChange={(e) => setFotografo(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg transition-all"
            placeholder="Ex: Cícero"
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
          disabled={!isFormValid}
          className="btn-primary-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};
