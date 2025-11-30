'use client';

import React, { useState } from 'react';
import { useCasamento } from '@/contexts/CasamentoContext';

export const CasamentoStep1: React.FC = () => {
  const { state, updateStep1, goToStep } = useCasamento();
  
  const [nomeCasal, setNomeCasal] = useState(state.step1Data.nomeCasal || '');
  const [dataCerimonia, setDataCerimonia] = useState(state.step1Data.dataCerimonia || '');
  const [localFesta, setLocalFesta] = useState(state.step1Data.localFesta || '');

  const isFormValid = nomeCasal.trim() !== '' && dataCerimonia !== '' && localFesta.trim() !== '';

  const handleNext = () => {
    updateStep1({
      nomeCasal,
      dataCerimonia,
      localFesta,
    });
    goToStep(2);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <h2 className="text-base md:text-lg lg:text-xl font-bold font-unbounded text-[#703535] mb-6 text-center leading-relaxed">
        Agora, abram seus corações.<br className="hidden xl:block" /> Por aqui nós adoramos ler novos contos!
      </h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="nomeCasal" className="block text-sm font-medium text-gray-700 mb-1">
            Nome do casal <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nomeCasal"
            value={nomeCasal}
            onChange={(e) => setNomeCasal(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg transition-all"
            placeholder="Ex: Maria & João"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-1">
            <label htmlFor="dataCerimonia" className="block text-sm font-medium text-gray-700 mb-1">
              Data da cerimônia <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="dataCerimonia"
              value={dataCerimonia}
              onChange={(e) => setDataCerimonia(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg transition-all"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="localFesta" className="block text-sm font-medium text-gray-700 mb-1 ">
              Local da festa <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="localFesta"
              value={localFesta}
              onChange={(e) => setLocalFesta(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg transition-all"
              placeholder="Ex: Fazenda Verde, Praia do Rosa / SC"
              required
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
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
