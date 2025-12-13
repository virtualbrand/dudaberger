'use client';

import React from 'react';
import { NumericFormat } from 'react-number-format';

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  whiteBackground?: boolean;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  placeholder = 'R$ 0,00',
  label,
  required = false,
  disabled = false,
  whiteBackground = false,
}) => {
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--carbon-black-800)' }}>
          {label}
          {required && <span className="ml-1" style={{ color: 'var(--lobster-pink-500)' }}>*</span>}
        </label>
      )}
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
          backgroundColor: disabled ? 'var(--carbon-black-400)' : whiteBackground ? 'white' : 'var(--old-lace-500)',
          color: 'var(--carbon-black-900)',
          borderColor: '#9a9a9b',
          borderWidth: '0.5px',
          outline: 'none',
          boxShadow: 'none'
        }}
        className="w-full px-4 py-3 rounded-lg disabled:cursor-not-allowed transition-all focus:border-[#D65B58] active:border-[#D65B58]"
      />
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
  whiteBackground?: boolean;
}

export const PercentageInput: React.FC<PercentageInputProps> = ({
  value,
  onChange,
  placeholder = '0%',
  label,
  required = false,
  disabled = false,
  whiteBackground = false,
}) => {
  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium mb-1" style={{ color: 'var(--carbon-black-800)' }}>
          {label}
          {required && <span className="ml-1" style={{ color: 'var(--lobster-pink-500)' }}>*</span>}
        </label>
      )}
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
          backgroundColor: disabled ? 'var(--carbon-black-400)' : whiteBackground ? 'white' : 'var(--old-lace-500)',
          color: 'var(--carbon-black-900)',
          borderColor: '#9a9a9b',
          borderWidth: '0.5px',
          outline: 'none',
          boxShadow: 'none'
        }}
        className="w-full px-4 py-3 rounded-lg disabled:cursor-not-allowed transition-all focus:border-[#D65B58] active:border-[#D65B58]"
      />
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
  whiteBackground?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  required = false,
  disabled = false,
  whiteBackground = false,
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
          backgroundColor: disabled ? 'var(--carbon-black-400)' : whiteBackground ? 'white' : 'var(--old-lace-500)',
          color: 'var(--carbon-black-900)',
          borderColor: '#9a9a9b',
          borderWidth: '0.5px',
          outline: 'none',
          boxShadow: 'none'
        }}
        className="w-full px-4 py-3 rounded-lg disabled:cursor-not-allowed transition-all focus:border-[#D65B58] active:border-[#D65B58]"
      />
    </div>
  );
};
