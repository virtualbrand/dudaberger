'use client';

import React, { useState, useRef } from 'react';
import { useCasamento } from '@/contexts/CasamentoContext';

export const CasamentoStep5: React.FC = () => {
  const { state, updateStep5, goToStep } = useCasamento();
  const [whatsapp, setWhatsapp] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBack = () => {
    goToStep(4);
  };

  const handleNext = () => {
    updateStep5({ whatsapp });
    goToStep(6);
  };

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
      updateStep5({ whatsapp: '' });
      return;
    }
    
    const formatted = formatWhatsApp(value);
    setWhatsapp(formatted);
    updateStep5({ whatsapp: formatted });
  };

  const handleFocus = () => {
    if (!whatsapp || whatsapp === '') {
      setWhatsapp('+55 ');
      updateStep5({ whatsapp: '+55 ' });
      // Coloca o cursor no final
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(4, 4);
        }
      }, 0);
    }
  };

  // Valida se tem pelo menos +55 e 9 dígitos (mínimo para Brasil)
  const getPhoneDigits = (value: string) => {
    return value.replace(/[^\d]/g, '');
  };

  const isFormValid = () => {
    const digits = getPhoneDigits(whatsapp);
    // Para +55 (Brasil), precisa ter pelo menos 13 dígitos (55 + DDD 2 + número 9)
    if (whatsapp.startsWith('+55')) {
      return digits.length >= 13; // 55 + 2 (DDD) + 9 (número)
    }
    // Para outros países, pelo menos 10 dígitos
    return digits.length >= 10;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <div className="space-y-6">
        <div>
          <label htmlFor="whatsapp" className="block text-base font-unbounded font-bold leading-relaxed text-[#703535] mb-2">
            Contato do WhatsApp para encaminharmos a Proposta:
          </label>
          <input
            ref={inputRef}
            type="tel"
            id="whatsapp"
            value={whatsapp}
            onChange={handleWhatsAppChange}
            onFocus={handleFocus}
            placeholder="+55 (00) 00000-0000"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[#D65B58] focus:outline-none focus:ring-0"
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
          disabled={!isFormValid()}
          className="btn-primary-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
