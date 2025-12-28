'use client';

import React from 'react';
import { useCasamento } from '@/contexts/CasamentoContext';

export const CasamentoStep5: React.FC = () => {
  const { state, goToStep } = useCasamento();

  const handleBack = () => {
    goToStep(4);
  };

  const handleNext = () => {
    goToStep(6);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <div className="space-y-6">
        <h2 className="text-base md:text-lg font-bold font-unbounded text-[#703535] leading-relaxed text-center">
          Estamos quase lá! Vamos revisar as informações antes de enviar.
        </h2>
        
        {/* Resumo dos dados */}
        <div className="bg-[#f8f4f0] p-6 rounded-lg space-y-4 text-sm">
          <div>
            <h3 className="font-bold text-[#703535] mb-2">📋 Dados do Casamento</h3>
            <p><strong>Casal:</strong> {state.step1Data.nomeCasal}</p>
            <p><strong>Data:</strong> {state.step1Data.dataCerimonia && new Date(state.step1Data.dataCerimonia).toLocaleDateString('pt-BR')}</p>
            <p><strong>Local:</strong> {state.step1Data.localFesta}</p>
          </div>

          <div>
            <h3 className="font-bold text-[#703535] mb-2">👥 Convidados e Orçamento</h3>
            <p><strong>Número de Convidados:</strong> {state.step3Data.numeroConvidados}</p>
            <p><strong>Orçamento por Convidado:</strong> {state.step3Data.budgetPorConvidado}</p>
          </div>

          {state.step1Data.whatsapp && (
            <div>
              <h3 className="font-bold text-[#703535] mb-2">📱 Contato</h3>
              <p><strong>WhatsApp:</strong> {state.step1Data.whatsapp}</p>
            </div>
          )}

          {state.step2_5Data.selectedDoces && state.step2_5Data.selectedDoces.length > 0 && (
            <div>
              <h3 className="font-bold text-[#703535] mb-2">🍰 Doces</h3>
              <ul className="list-disc list-inside">
                {state.step2_5Data.selectedDoces.map((doce: string) => (
                  <li key={doce}>{doce === 'mesa-doces' ? 'Mesa de doces' : doce === 'reposicao-mesa' ? 'Reposição da mesa' : 'Sobremesa no menu'}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="text-sm md:text-base text-gray-700 text-center">
          Todas as informações fornecidas serão utilizadas para criar uma proposta personalizada para o seu casamento.
        </p>
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
