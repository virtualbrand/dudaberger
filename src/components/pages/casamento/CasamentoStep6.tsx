'use client';

import React from 'react';
import Image from 'next/image';
import { useCasamento } from '@/contexts/CasamentoContext';

export const CasamentoStep6: React.FC = () => {
  const { state, goToStep } = useCasamento();

  const handleBack = () => {
    goToStep(5);
  };

  const handleSendWhatsApp = () => {
    // Monta a mensagem com todos os dados do formulário
    const { step1Data, step2Data, step2_3Data, step2_5Data, step3Data, step4Data, step5Data } = state;
    
    let message = `*Orçamento de Bolo de Casamento*\n\n`;
    
    // Step 1
    message += `*Dados do Casal*\n`;
    message += `Nome: ${step1Data.nomeCasal || ''}\n`;
    message += `Data da Cerimônia: ${step1Data.dataCerimonia || ''}\n`;
    message += `Local da Festa: ${step1Data.localFesta || ''}\n\n`;
    
    // Step 2
    if (step2Data.responsavelDecoracao || step2Data.responsavelOrganizacao || step2Data.fotografo) {
      message += `*Fornecedores*\n`;
      if (step2Data.responsavelDecoracao) message += `Decoração: ${step2Data.responsavelDecoracao}\n`;
      if (step2Data.responsavelOrganizacao) message += `Organização: ${step2Data.responsavelOrganizacao}\n`;
      if (step2Data.fotografo) message += `Fotógrafo: ${step2Data.fotografo}\n`;
      message += `\n`;
    }
    
    // Step 2.3
    if (step2_3Data.motivacaoBolo) {
      message += `*Motivação para o Bolo*\n`;
      message += `${step2_3Data.motivacaoBolo}\n\n`;
    }
    
    // Step 2.5
    if (step2_5Data.selectedDoces && step2_5Data.selectedDoces.length > 0) {
      message += `*Doces*\n`;
      const docesLabels: Record<string, string> = {
        'mesa-doces': 'Mesa de doces',
        'reposicao-mesa': 'Reposição da mesa',
        'sobremesa-menu': 'Sobremesa no menu'
      };
      step2_5Data.selectedDoces.forEach((doce: string) => {
        message += `• ${docesLabels[doce] || doce}\n`;
      });
      message += `\n`;
    }
    
    // Step 3
    message += `*Convidados e Orçamento*\n`;
    message += `Número de Convidados: ${step3Data.numeroConvidados || ''}\n`;
    const budgetLabels: Record<string, string> = {
      '18-21': 'R$18 a R$21',
      '25-30': 'R$25 a R$30',
      '35-40': 'R$35 a R$40',
      '45+': 'R$45 ou mais'
    };
    message += `Orçamento por Convidado: ${budgetLabels[step3Data.budgetPorConvidado] || step3Data.budgetPorConvidado || ''}\n\n`;
    
    // Step 4
    if (step4Data.consideracoesEspecificas) {
      message += `*Considerações Específicas*\n`;
      message += `${step4Data.consideracoesEspecificas}\n\n`;
    }
    
    message += `---\n`;
    message += `Aguardo referências de bolos que vocês adoram! 😊`;
    
    // Pega o número de WhatsApp (remove formatação)
    const whatsappNumber = (step5Data.whatsapp || '').replace(/[^\d]/g, '');
    
    // Cria o link do WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Abre o WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <div className="space-y-4">
        <h4 className="text-lg md:text-xl lg:text-2xl font-bold font-unbounded text-[#703535]">
          Obrigada por chegar até aqui! Agora só falta um passo importante
        </h4>
        
        <div className="space-y-2 text-left">
          <p className="text-base text-gray-700 leading-relaxed">
            Para elaborar a Proposta, preciso que vocês me enviem algumas referências de bolos que adoram. Sem essas imagens, não consigo criar uma proposta alinhada ao estilo e ao casamento dos sonhos de vocês.</p>
          
          <p className="text-base text-gray-700 leading-relaxed">
            Essas imagens ajudam a entender o estilo, a estética e o tipo de decoração que combinam com vocês. 
            O Pinterest é uma ótima opção para buscar inspirações.
          </p>
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
          onClick={handleSendWhatsApp}
          className="btn-primary-sm flex items-center gap-3"
        >
          <Image 
            src="/icons/whatsapp-icon.svg" 
            alt="WhatsApp" 
            width={18} 
            height={18}
            className="brightness-0 invert"
          />
          Enviar no WhatsApp
        </button>
      </div>
    </div>
  );
};
