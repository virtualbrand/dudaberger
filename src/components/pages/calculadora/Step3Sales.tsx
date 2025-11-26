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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Quantos produtos você vende por mês?</h2>
        <p className="text-gray-600">Informe a quantidade mensal de cada produto</p>
      </div>

      {/* Card com Totais */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-600 text-white p-2 rounded-full">
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-sm text-gray-600">Faturamento Total Projetado</p>
          </div>
          <p className="text-3xl font-bold text-green-600">
            {formatCurrency(totalRevenue)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-600 text-white p-2 rounded-full">
              <Package className="w-5 h-5" />
            </div>
            <p className="text-sm text-gray-600">Margem de Contribuição Total</p>
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {formatCurrency(totalContribution)}
            <span className="text-lg ml-2">({avgMargin.toFixed(1)}%)</span>
          </p>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-semibold text-gray-900">Simulação de Vendas</h3>

        {state.products.map((product) => {
          const calc = calculateProductMetrics(product);

          return (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div className="md:col-span-2">
                  <h4 className="font-semibold text-gray-900">{product.name}</h4>
                  <p className="text-sm text-gray-600">
                    Preço unitário: {formatCurrency(product.salePrice)}
                  </p>
                  <p className="text-xs text-gray-500">
                    MC unitária: {formatCurrency(calc.contributionMarginValue)} (
                    {calc.contributionMarginPercent.toFixed(1)}%)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantidade/mês
                  </label>
                  <NumericFormat
                    value={product.quantity || ''}
                    onValueChange={(values) => updateProductQuantity(product.id, values.floatValue || 0)}
                    thousandSeparator="."
                    decimalScale={0}
                    allowNegative={false}
                    placeholder="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600">Faturamento</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatCurrency(calc.revenue)}
                  </p>
                  <p className="text-xs text-gray-500">
                    MC: {formatCurrency(calc.totalContribution)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalRevenue === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-yellow-800">
            💡 <strong>Dica:</strong> Informe as quantidades para simular seu faturamento e verificar se você atinge o ponto de equilíbrio. Você também pode pular esta etapa se quiser apenas calcular o ponto de equilíbrio.
          </p>
        </div>
      )}

      {/* Botões de Navegação */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
        >
          ← Voltar
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition-colors"
        >
          Ver Resultados →
        </button>
      </div>
    </div>
  );
};
