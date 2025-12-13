'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { useCasamento } from '@/contexts/CasamentoContext';
import { useLeads } from '@/hooks/useLeads';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const CasamentoStep1: React.FC = () => {
  const { state, updateStep1, goToStep, setLeadId } = useCasamento();
  const { createLead, loading } = useLeads();
  
  const [nomeCasal, setNomeCasal] = useState(state.step1Data.nomeCasal || '');
  const [dataCerimonia, setDataCerimonia] = useState(state.step1Data.dataCerimonia || '');
  const [localFesta, setLocalFesta] = useState(state.step1Data.localFesta || '');
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    state.step1Data.dataCerimonia ? new Date(state.step1Data.dataCerimonia) : undefined
  );

  const isFormValid = nomeCasal.trim() !== '' && dataCerimonia !== '' && localFesta.trim() !== '';

  const handleNext = async () => {
    // Salva os dados no contexto
    updateStep1({
      nomeCasal,
      dataCerimonia,
      localFesta,
    });

    // Cria o lead no Supabase
    if (!state.leadId) {
      // Separa os nomes do casal
      const nomes = nomeCasal.split('&').map(n => n.trim());
      const nomeNoivo = nomes[0] || '';
      const nomeNoiva = nomes[1] || '';

      const lead = await createLead({
        nome_noivo: nomeNoivo,
        nome_noiva: nomeNoiva,
        data_casamento: dataCerimonia,
        local_evento: localFesta,
        status: 'lead',
      });

      if (lead) {
        setLeadId(lead.id);
      }
    }

    goToStep(2);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      setDataCerimonia(formattedDate);
    }
    setOpenDatePicker(false);
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
            <Label htmlFor="dataCerimonia" className="block text-sm font-medium text-gray-700 mb-1">
              Data da cerimônia <span className="text-red-500">*</span>
            </Label>
            <Popover open={openDatePicker} onOpenChange={setOpenDatePicker}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="dataCerimonia"
                  className="w-full justify-between font-normal h-[50px] px-4 bg-white hover:bg-gray-50 text-base text-gray-900 cursor-pointer"
                  style={{ fontFamily: 'KumbhSans, system-ui, sans-serif !important' } as React.CSSProperties}
                >
                  <span className={selectedDate ? "text-gray-900" : "text-gray-500 opacity-80"} style={{ fontFamily: 'KumbhSans, system-ui, sans-serif' }}>
                    {selectedDate ? selectedDate.toLocaleDateString('pt-BR') : "Selecione a data"}
                  </span>
                  <ChevronDownIcon className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[251px] overflow-hidden p-0 border-0 shadow-lg" align="start">
                <style jsx global>{`
                  [data-slot="calendar"],
                  [data-slot="calendar"] *,
                  [data-slot="calendar"] button,
                  [data-slot="calendar"] select,
                  [data-slot="calendar"] div,
                  [data-slot="calendar"] span,
                  [data-slot="calendar"] td,
                  [data-slot="calendar"] th,
                  .rdp,
                  .rdp *,
                  .rdp button,
                  .rdp select,
                  .rdp div,
                  .rdp span,
                  .rdp td,
                  .rdp th,
                  .rdp-month,
                  .rdp-day,
                  .rdp-weekday,
                  .rdp-caption,
                  .rdp-nav,
                  .rdp-button_next,
                  .rdp-button_previous,
                  .rdp-dropdown,
                  .rdp-dropdown_root,
                  .rdp-caption_label {
                    font-family: 'KumbhSans', system-ui, sans-serif !important;
                  }
                  button[class*="rdp"],
                  button[data-day],
                  select[name="month"],
                  select[name="year"] {
                    font-family: 'KumbhSans', system-ui, sans-serif !important;
                  }
                  [data-slot="calendar"] button {
                    cursor: pointer !important;
                  }
                  [data-slot="calendar"] select {
                    cursor: pointer !important;
                  }
                  [data-slot="calendar"] button:hover {
                    cursor: pointer !important;
                  }
                  [data-slot="calendar"] button:focus,
                  [data-slot="calendar"] button:focus-visible,
                  [data-slot="calendar"] select:focus,
                  [data-slot="calendar"] select:focus-visible,
                  .rdp button:focus,
                  .rdp button:focus-visible,
                  .rdp select:focus,
                  .rdp select:focus-visible,
                  select[name="month"]:focus,
                  select[name="month"]:focus-visible,
                  select[name="year"]:focus,
                  select[name="year"]:focus-visible,
                  .rdp-dropdown:focus,
                  .rdp-dropdown:focus-visible,
                  .rdp-months_dropdown:focus,
                  .rdp-months_dropdown:focus-visible,
                  .rdp-years_dropdown:focus,
                  .rdp-years_dropdown:focus-visible,
                  .bg-popover:focus,
                  .bg-popover:focus-visible,
                  .rdp-dropdown_root:focus,
                  .rdp-dropdown_root:focus-visible,
                  .rdp-dropdown_root:focus-within,
                  .rdp-dropdown_root:has(:focus),
                  span.has-focus\:border-ring:focus,
                  span.has-focus\:border-ring:focus-visible,
                  span.has-focus\:ring-ring\/50:focus,
                  span.has-focus\:ring-ring\/50:focus-visible,
                  [class*="has-focus"]:focus,
                  [class*="has-focus"]:focus-visible {
                    outline: 1px solid #D65B58 !important;
                    outline-offset: 0px !important;
                    box-shadow: none !important;
                    border-color: #D65B58 !important;
                    -webkit-appearance: none !important;
                  }
                  .rdp-day_button {
                    cursor: pointer !important;
                    font-family: 'KumbhSans', system-ui, sans-serif !important;
                  }
                  button[data-selected-single="true"],
                  [data-selected-single="true"] {
                    background-color: #D65B58 !important;
                    color: #ffffff !important;
                  }
                  .rdp-nav {
                    align-items: center !important;
                  }
                  .rdp-button_previous,
                  .rdp-button_next {
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                  }
                `}</style>
                <div className="font-sans" style={{ fontFamily: 'KumbhSans, system-ui, sans-serif' }}>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    captionLayout="dropdown"
                    onSelect={handleDateSelect}
                    fromYear={2024}
                    toYear={2030}
                    className="font-sans"
                    style={{ fontFamily: 'KumbhSans, system-ui, sans-serif' } as React.CSSProperties}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const maxDate = new Date(today);
                      maxDate.setDate(maxDate.getDate() + 180);
                      return date < today || date > maxDate;
                    }}
                  />
                </div>
              </PopoverContent>
            </Popover>
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
          disabled={!isFormValid || loading}
          className="btn-primary-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Salvando...' : 'Próximo'}
        </button>
      </div>
    </div>
  );
};
