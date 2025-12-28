'use client';

import React, { useState, useRef } from 'react';
import { useCasamento } from '@/contexts/CasamentoContext';

export const CasamentoStep0_5: React.FC = () => {
  const { state, updateStep1, goToStep } = useCasamento();
  
  const [whatsapp, setWhatsapp] = useState(state.step1Data.whatsapp || '');
  const inputRef = useRef<HTMLInputElement>(null);

  const formatWhatsApp = (value: string) => {
    let cleaned = value.replace(/[^\d+]/g, '');
    
    if (!cleaned.startsWith('+')) {
      if (cleaned.length > 0) {
        cleaned = '+' + cleaned;
      } else {
        return '';
      }
    }
    
    const digitsOnly = cleaned.slice(1);
    
    if (digitsOnly.startsWith('55')) {
      const countryCode = '+55';
      const restOfNumber = digitsOnly.slice(2);
      
      if (restOfNumber.length === 0) return countryCode;
      if (restOfNumber.length <= 2) return `${countryCode} (${restOfNumber}`;
      if (restOfNumber.length <= 7) return `${countryCode} (${restOfNumber.slice(0, 2)}) ${restOfNumber.slice(2)}`;
      return `${countryCode} (${restOfNumber.slice(0, 2)}) ${restOfNumber.slice(2, 7)}-${restOfNumber.slice(7, 11)}`;
    }
    
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
    if (whatsapp.startsWith('+55')) {
      return digits.length >= 13;
    }
    return digits.length >= 10;
  };

  const handleNext = () => {
    // Salva o WhatsApp no contexto
    updateStep1({
      ...state.step1Data,
      whatsapp,
    });
    goToStep(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <h2 className="text-base md:text-lg lg:text-xl font-bold font-unbounded text-[#703535] mb-6 text-center leading-relaxed">
        Antes de começarmos, qual o número do WhatsApp que podemos enviar a proposta?
      </h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
            WhatsApp *
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

      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleNext}
          disabled={!isWhatsAppValid()}
          className="btn-primary-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};
