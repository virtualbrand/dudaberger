'use client';

import React from 'react';
import Image from 'next/image';
import { useCasamento } from '@/contexts/CasamentoContext';
import { useLeads } from '@/hooks/useLeads';

export const CasamentoStep6: React.FC = () => {
  const { state, goToStep } = useCasamento();
  const { updateLead, loading } = useLeads();

  const handleBack = () => {
    goToStep(5);
  };

  const handleSendWhatsApp = async () => {
    // Atualiza os dados do lead, mantendo o status como "lead"
    if (state.leadId) {
      await updateLead(state.leadId, {
        status: 'lead',
        dados_extras: {
          ...state.step1Data,
          ...state.step2Data,
          ...state.step2_3Data,
          ...state.step2_5Data,
          ...state.step3Data,
          ...state.step4Data,
          ...state.step5Data,
        },
      });
    }

    // Monta a mensagem com todos os dados do formulário
    const { step1Data, step2Data, step2_3Data, step2_5Data, step3Data, step4Data } = state;
    
    let message = `*Proposta para nosso Bolo de Casamento*\n`;
    
    // Step 1 + convidados + orçamento (lista com bullets)
    const dataCerimoniaFormatada = step1Data.dataCerimonia
      ? new Date(step1Data.dataCerimonia + 'T12:00:00').toLocaleDateString('pt-BR')
      : '';
    message += `- Nome dos Noivos: ${step1Data.nomeCasal || ''}\n`;
    message += `- Data da Cerimônia: ${dataCerimoniaFormatada}\n`;
    message += `- Local da Festa: ${step1Data.localFesta || ''}\n`;
    const numConvidados = parseInt(String(step3Data.numeroConvidados || '').replace(/\./g, '')) || 0;
    message += `- ${step3Data.numeroConvidados || 0} ${numConvidados === 1 ? 'convidado' : 'convidados'}\n`;
    message += `- Orçamento: ${step3Data.budgetPorConvidado || ''} /convidado\n\n`;

    // Step 2.3
    if (step2_3Data.motivacaoBolo) {
      message += `*Nossa motivação*\n`;
      message += `${step2_3Data.motivacaoBolo}\n\n`;
    }
    
    // Step 4
    if (step4Data.consideracoesEspecificas) {
      message += `*Considerações específicas*\n`;
      message += `${step4Data.consideracoesEspecificas}`;
    }
    
    // Cria o link do WhatsApp
    const whatsappUrl = `https://wa.me/5548991797296?text=${encodeURIComponent(message)}`;
    
    // Abre o WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <div className="space-y-4">
        <h4 className="text-lg md:text-xl lg:text-2xl font-bold font-unbounded text-[#703535] text-pretty">
          Obrigada por chegar até aqui! Agora só falta um passo importante
        </h4>
        
        <div className="space-y-2 text-left">
          <p className="text-base text-gray-700 leading-relaxed text-pretty">
            Para elaborar a Proposta, preciso que vocês me enviem algumas referências de bolos que adoram. Sem essas imagens, não consigo criar uma proposta alinhada ao estilo e ao casamento dos sonhos de vocês.</p>
          
          <p className="text-base text-gray-700 leading-relaxed text-pretty">
            Essas imagens ajudam a entender o estilo, a estética e o tipo de decoração que combinam com vocês. 
            O Pinterest é uma ótima opção para buscar inspirações.
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button 
          onClick={handleBack}
          className="btn-secondary-sm-outline"
          disabled={loading}
        >
          Voltar
        </button>
        <button 
          onClick={handleSendWhatsApp}
          disabled={loading}
          className="btn-primary-sm flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <>
              <Image 
                src="/icons/whatsapp-icon.svg" 
                alt="WhatsApp" 
                width={18} 
                height={18}
                className="brightness-0 invert"
              />
              Enviar no WhatsApp
            </>
        </button>
      </div>
    </div>
  );
};
