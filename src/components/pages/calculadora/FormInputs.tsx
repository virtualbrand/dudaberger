'use client';

import React from 'react';
import { NumericFormat } from 'react-number-format';
import { DollarSign, Percent } from 'lucide-react';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  placeholder = 'R$ 0,00',
  label,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <DollarSign className="h-5 w-5 text-gray-400" />
        </div>
        <NumericFormat
          value={value || ''}
          onValueChange={(values) => onChange(values.floatValue || 0)}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale
          allowNegative={false}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full pl-10 pr-4 py-2 border rounded-lg
            focus:ring-2 focus:ring-pink-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${!value && required ? 'border-red-300' : 'border-gray-300'}
          `}
        />
      </div>
    </div>
  );
};

interface PercentageInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export const PercentageInput: React.FC<PercentageInputProps> = ({
  value,
  onChange,
  placeholder = '0%',
  label,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Percent className="h-5 w-5 text-gray-400" />
        </div>
        <NumericFormat
          value={value || ''}
          onValueChange={(values) => onChange(values.floatValue || 0)}
          decimalSeparator=","
          suffix="%"
          decimalScale={2}
          fixedDecimalScale
          allowNegative={false}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full pl-10 pr-4 py-2 border rounded-lg
            focus:ring-2 focus:ring-pink-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${!value && required ? 'border-red-300' : 'border-gray-300'}
          `}
        />
      </div>
    </div>
  );
};

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          w-full px-4 py-2 border rounded-lg
          focus:ring-2 focus:ring-pink-500 focus:border-transparent
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${!value && required ? 'border-red-300' : 'border-gray-300'}
        `}
      />
    </div>
  );
};
