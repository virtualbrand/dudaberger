'use client';

import React from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { formatCurrency, calculateProductMetrics } from '@/utils/calculatorUtils';
import { TrendingUp, Package } from 'lucide-react';
import { NumericFormat } from 'react-number-format';

export const Step3Sales: React.FC = () => {
  const { state, updateProductQuantity, goToStep, calculateSummary } = useCalculator();

  const calculations = state.products.map(calculateProductMetrics);
  const totalRevenue = calculations.reduce((sum, calc) => sum + calc.revenue, 0);
  const totalContribution = calculations.reduce((sum, calc) => sum + calc.totalContribution, 0);
  const avgMargin = totalRevenue > 0 ? (totalContribution / totalRevenue) * 100 : 0;

  const handleNext = () => {
    calculateSummary();
    goToStep(4);
  };

  const handleBack = () => {
    goToStep(2);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--old-lace-500)' }}>Quantos produtos você vende por mês?</h2>
        <p style={{ color: 'var(--rosy-taupe-300)' }}>Informe a quantidade mensal de cada produto</p>
      </div>

      {/* Card com Totais */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-lg p-6 border-2" style={{ 
          backgroundColor: 'var(--old-lace-500)', 
          borderColor: 'var(--evergreen-500)'
        }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--evergreen-600)', color: 'var(--old-lace-500)' }}>
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-sm" style={{ color: 'var(--carbon-black-700)' }}>Faturamento Total Projetado</p>
          </div>
          <p className="text-3xl font-bold" style={{ color: 'var(--evergreen-600)' }}>
            {formatCurrency(totalRevenue)}
          </p>
        </div>

        <div className="rounded-lg p-6 border-2" style={{ 
          backgroundColor: 'var(--old-lace-500)', 
          borderColor: 'var(--honey-bronze-500)'
        }}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full" style={{ backgroundColor: 'var(--honey-bronze-600)', color: 'var(--old-lace-500)' }}>
              <Package className="w-5 h-5" />
            </div>
            <p className="text-sm" style={{ color: 'var(--carbon-black-700)' }}>Margem de Contribuição Total</p>
          </div>
          <p className="text-3xl font-bold" style={{ color: 'var(--honey-bronze-600)' }}>
            {formatCurrency(totalContribution)}
            <span className="text-lg ml-2">({avgMargin.toFixed(1)}%)</span>
          </p>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--old-lace-500)' }}>Simulação de Vendas</h3>

        {state.products.map((product) => {
          const calc = calculateProductMetrics(product);

          return (
            <div
              key={product.id}
              className="rounded-lg p-4 hover:shadow-lg transition-shadow border"
              style={{ 
                backgroundColor: 'var(--old-lace-500)', 
                borderColor: 'var(--rosy-taupe-400)'
              }}
            >
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="md:col-span-2">
                  <h4 className="font-semibold" style={{ color: 'var(--carbon-black-900)' }}>{product.name}</h4>
                  <p className="text-sm" style={{ color: 'var(--carbon-black-700)' }}>
                    Preço unitário: {formatCurrency(product.salePrice)}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--carbon-black-600)' }}>
                    MC unitária: {formatCurrency(calc.contributionMarginValue)} (
                    {calc.contributionMarginPercent.toFixed(1)}%)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--carbon-black-800)' }}>
                    Quantidade/mês
                  </label>
                  <NumericFormat
                    value={product.quantity || ''}
                    onValueChange={(values) => updateProductQuantity(product.id, values.floatValue || 0)}
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={0}
                    allowNegative={false}
                    placeholder="0"
                    type="text"
                    style={{
                      backgroundColor: 'var(--old-lace-500)',
                      color: 'var(--carbon-black-900)',
                      borderColor: 'var(--rosy-taupe-400)'
                    }}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
                  />
                </div>

                <div className="text-right">
                  <p className="text-sm" style={{ color: 'var(--carbon-black-700)' }}>Faturamento</p>
                  <p className="text-xl font-bold" style={{ color: 'var(--evergreen-600)' }}>
                    {formatCurrency(calc.revenue)}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--carbon-black-600)' }}>
                    MC: {formatCurrency(calc.totalContribution)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalRevenue === 0 && (
        <div className="rounded-lg p-4 mb-8 border" style={{ 
          backgroundColor: 'var(--honey-bronze-100)', 
          borderColor: 'var(--honey-bronze-400)'
        }}>
          <p className="text-sm" style={{ color: 'var(--honey-bronze-900)' }}>
            💡 <strong>Dica:</strong> Informe as quantidades para simular seu faturamento e verificar se você atinge o ponto de equilíbrio. Você também pode pular esta etapa se quiser apenas calcular o ponto de equilíbrio.
          </p>
        </div>
      )}

      {/* Botões de Navegação */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="px-8 py-3 font-semibold rounded-lg transition-all hover:opacity-90"
          style={{ 
            backgroundColor: 'var(--rosy-taupe-500)', 
            color: 'var(--old-lace-500)'
          }}
        >
          ← Voltar
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 font-semibold rounded-lg transition-all hover:opacity-90"
          style={{ 
            backgroundColor: 'var(--evergreen-500)', 
            color: 'var(--old-lace-500)'
          }}
        >
          Ver Resultados →
        </button>
      </div>
    </div>
  );
};
