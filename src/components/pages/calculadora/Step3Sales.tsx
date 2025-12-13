'use client';

import React from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { formatCurrency, calculateProductMetrics } from '@/utils/calculatorUtils';
import { TrendingUp, Package, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
    <div className="max-w-[900px] mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--old-lace-500)' }}>Quantos produtos você vende por mês?</h2>
        <p style={{ color: 'var(--rosy-taupe-300)' }}>Informe a quantidade mensal de cada produto</p>
      </div>

      {/* Card com Totais */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-lg p-6 shadow-sm bg-[#D65B58]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-[#F6EEE1]">
                <TrendingUp className="w-6 h-6 text-[#D65B58]" />
              </div>
              <div>
                <p className="text-sm text-white">Faturamento Total Projetado</p>
                <p className="text-3xl font-bold text-white font-unbounded">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg p-6 shadow-sm bg-[#D65B58]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-[#F6EEE1]">
                <Package className="w-6 h-6 text-[#D65B58]" />
              </div>
              <div>
                <p className="text-sm text-white">Margem de Contribuição Total</p>
                <p className="text-3xl font-bold text-white font-unbounded">
                  {formatCurrency(totalContribution)}
                  <span className="text-lg ml-2">({avgMargin.toFixed(1)}%)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--old-lace-500)' }}>Simulação de Vendas</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                <Info className="w-4 h-4" style={{ color: 'var(--old-lace-500)' }} />
              </button>
            </TooltipTrigger>
            <TooltipContent variant="light" className="max-w-xs">
              <p className="text-sm">Informe as quantidades para simular seu faturamento e verificar se você atinge o ponto de equilíbrio. Você também pode pular esta etapa se quiser apenas calcular o ponto de equilíbrio.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {state.products.map((product) => {
          const calc = calculateProductMetrics(product);

          return (
            <div
              key={product.id}
              className="rounded-lg p-6 hover:shadow-lg transition-shadow shadow-sm"
              style={{
                backgroundColor: '#FFFFFF', 
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
                      borderColor: '#9a9a9b',
                      borderWidth: '0.5px',
                      outline: 'none',
                      boxShadow: 'none'
                    }}
                    className="w-full px-4 py-3 rounded-lg disabled:cursor-not-allowed transition-all focus:border-[#D65B58] active:border-[#D65B58]"
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

      {/* Botões de Navegação */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="btn-secondary-sm-outline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Custos Fixos</span>
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-3 btn-secondary-sm font-semibold flex items-center gap-2 transition-all hover:opacity-90 cursor-pointer text-white bg-[#5D3B2E]"
        >
          <span>Resultados</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
