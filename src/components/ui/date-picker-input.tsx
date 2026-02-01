'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DatePickerInputProps {
  value: string; // YYYY-MM-DD format
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

export function DatePickerInput({
  value,
  onChange,
  label,
  placeholder = 'Selecione a data',
  disabled = false,
  minDate,
  maxDate,
  className = '',
}: DatePickerInputProps) {
  const [open, setOpen] = React.useState(false);
  
  // Convert string to Date object
  const selectedDate = value ? new Date(`${value}T00:00:00`) : undefined;

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      // Convert Date to YYYY-MM-DD string
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      onChange(`${year}-${month}-${day}`);
      setOpen(false);
    }
  };

  const displayValue = selectedDate 
    ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR })
    : '';

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm bg-white text-left flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D65B58] focus:border-transparent cursor-pointer"
          >
            <span className={displayValue ? 'text-gray-900' : 'text-gray-400'}>
              {displayValue || placeholder}
            </span>
            <CalendarIcon className="h-4 w-4 text-gray-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto min-w-[280px] overflow-visible p-0 border-0 shadow-lg rounded-xl" align="start">
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
              font-size: 0.75rem !important;
            }
            .rdp-day_button:hover:not([disabled]):not([data-selected-single="true"]) {
              background-color: #D65B58 !important;
              color: #ffffff !important;
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
            /* Dias fora do mês atual (mês anterior/posterior) */
            .rdp-outside .rdp-day_button,
            .rdp-day.rdp-outside button,
            [data-outside="true"] button,
            [data-outside="true"] .rdp-day_button,
            td[data-outside="true"] button {
              color: #9ca3af !important;
              opacity: 0.7 !important;
            }
            .rdp-outside .rdp-day_button:hover,
            [data-outside="true"] button:hover {
              background-color: #e5e7eb !important;
              color: #6b7280 !important;
            }
          `}</style>
          <div className="font-sans rounded-xl overflow-hidden" style={{ fontFamily: 'KumbhSans, system-ui, sans-serif' }}>
            <Calendar
              mode="single"
              selected={selectedDate}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
              fromYear={2024}
              toYear={2030}
              className="font-sans rounded-xl"
              style={{ fontFamily: 'KumbhSans, system-ui, sans-serif' } as React.CSSProperties}
              disabled={(date) => {
                if (minDate && date < minDate) return true;
                if (maxDate && date > maxDate) return true;
                return false;
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
