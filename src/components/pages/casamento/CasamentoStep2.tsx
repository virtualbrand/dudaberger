'use client';

import React, { useState, useRef } from 'react';
import { useCasamento } from '@/contexts/CasamentoContext';
import { useLeads } from '@/hooks/useLeads';

export const CasamentoStep2: React.FC = () => {
  const { state, updateStep2, goToStep } = useCasamento();
  const { updateLead, loading } = useLeads();

  const [responsavelDecoracao, setResponsavelDecoracao] = useState(state.step2Data.responsavelDecoracao || '');
  const [responsavelOrganizacao, setResponsavelOrganizacao] = useState(state.step2Data.responsavelOrganizacao || '');
  const [fotografo, setFotografo] = useState(state.step2Data.fotografo || '');
  const [whatsapp, setWhatsapp] = useState(state.step2Data.whatsapp || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const formatWhatsApp = (value: string) => {
    // Remove tudo exceto dígitos e o sinal de +
    let cleaned = value.replace(/[^\d+]/g, '');
    
    // Se não começar com +, adiciona
    if (!cleaned.startsWith('+')) {
      if (cleaned.length > 0) {
        cleaned = '+' + cleaned;
      } else {
        return '';
      }
    }
    
    // Remove o + para processar os dígitos
    const digitsOnly = cleaned.slice(1);
    
    // Se começar com 55, é Brasil
    if (digitsOnly.startsWith('55')) {
      const countryCode = '+55';
      const restOfNumber = digitsOnly.slice(2);
      
      if (restOfNumber.length === 0) return countryCode;
      if (restOfNumber.length <= 2) return `${countryCode} (${restOfNumber}`;
      if (restOfNumber.length <= 7) return `${countryCode} (${restOfNumber.slice(0, 2)}) ${restOfNumber.slice(2)}`;
      return `${countryCode} (${restOfNumber.slice(0, 2)}) ${restOfNumber.slice(2, 7)}-${restOfNumber.slice(7, 11)}`;
    }
    
    // Para outros países (códigos de 1-2 dígitos que não sejam 55)
    const match = digitsOnly.match(/^(\d{1,2})/);
    if (match) {
      const countryCode = '+' + match[1];
      const restOfNumber = digitsOnly.slice(match[1].length);
      
      if (restOfNumber.length > 0) {
        return `${countryCode} ${restOfNumber}`;
      }
      return countryCode;
    }
    
    return cleaned;
  };

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Se o usuário apagou tudo, limpa o estado
    if (value === '' || value === '+') {
      setWhatsapp('');
      return;
    }
    
    const formatted = formatWhatsApp(value);
    setWhatsapp(formatted);
  };

  const handleFocus = () => {
    if (!whatsapp || whatsapp === '') {
      setWhatsapp('+55 ');
      // Coloca o cursor no final
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(4, 4);
        }
      }, 0);
    }
  };

  const getPhoneDigits = (value: string) => {
    return value.replace(/[^\d]/g, '');
  };

  const isWhatsAppValid = () => {
    const digits = getPhoneDigits(whatsapp);
    // Para +55 (Brasil), precisa ter pelo menos 13 dígitos (55 + DDD 2 + número 9)
    if (whatsapp.startsWith('+55')) {
      return digits.length >= 13;
    }
    // Para outros países, pelo menos 10 dígitos
    return digits.length >= 10;
  };

  const handleNext = async () => {
    // Salva os dados no contexto
    updateStep2({
      responsavelDecoracao,
      responsavelOrganizacao,
      fotografo,
      whatsapp,
    });

    // Atualiza o lead no Supabase
    if (state.leadId) {
      await updateLead(state.leadId, {
        whatsapp: whatsapp.replace(/[^\d+]/g, ''),
        dados_extras: {
          ...state.step1Data,
          responsavelDecoracao,
          responsavelOrganizacao,
          fotografo,
        },
      });
    }

    goToStep(2.3);
  };

  const handleBack = () => {
    updateStep2({
      responsavelDecoracao,
      responsavelOrganizacao,
      fotografo,
      whatsapp,
    });
    goToStep(1);
  };

  const isFormValid = responsavelOrganizacao.trim() !== '' && isWhatsAppValid();

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

        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
            Contato do WhatsApp para encaminharmos a Proposta <span className="text-red-500">*</span>
          </label>
          <input
            ref={inputRef}
            type="tel"
            id="whatsapp"
            value={whatsapp}
            onChange={handleWhatsAppChange}
            onFocus={handleFocus}
            placeholder="+55 (00) 00000-0000"
            className="w-full px-4 py-3 border rounded-lg transition-all"
            required
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
          disabled={!isFormValid || loading}
          className="btn-primary-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Salvando...' : 'Próximo'}
        </button>
      </div>
    </div>
  );
};
