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
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--carbon-black-800)' }}>
          {label}
          {required && <span className="ml-1" style={{ color: 'var(--lobster-pink-500)' }}>*</span>}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <DollarSign className="h-5 w-5" style={{ color: 'var(--carbon-black-600)' }} />
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
          style={{
            backgroundColor: disabled ? 'var(--carbon-black-400)' : 'var(--old-lace-500)',
            color: 'var(--carbon-black-900)',
            borderColor: !value && required ? 'var(--lobster-pink-500)' : 'var(--rosy-taupe-400)'
          }}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:outline-none disabled:cursor-not-allowed transition-all"
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
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--carbon-black-800)' }}>
          {label}
          {required && <span className="ml-1" style={{ color: 'var(--lobster-pink-500)' }}>*</span>}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Percent className="h-5 w-5" style={{ color: 'var(--carbon-black-600)' }} />
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
          style={{
            backgroundColor: disabled ? 'var(--carbon-black-400)' : 'var(--old-lace-500)',
            color: 'var(--carbon-black-900)',
            borderColor: !value && required ? 'var(--lobster-pink-500)' : 'var(--rosy-taupe-400)'
          }}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:outline-none disabled:cursor-not-allowed transition-all"
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
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--carbon-black-800)' }}>
          {label}
          {required && <span className="ml-1" style={{ color: 'var(--lobster-pink-500)' }}>*</span>}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        style={{
          backgroundColor: disabled ? 'var(--carbon-black-400)' : 'var(--old-lace-500)',
          color: 'var(--carbon-black-900)',
          borderColor: !value && required ? 'var(--lobster-pink-500)' : 'var(--rosy-taupe-400)'
        }}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none disabled:cursor-not-allowed transition-all"
      />
    </div>
  );
};
