'use client';

import React, { useState } from 'react';
import { FinancialSummary } from '@/types/calculadora';
import { formatCurrency } from '@/utils/calculatorUtils';
import { TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';

interface ScenarioSimulatorProps {
  summary: FinancialSummary;
}

export const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({ summary }) => {
  const [priceIncrease, setPriceIncrease] = useState(0);
  const [costReduction, setCostReduction] = useState(0);
  const [salesIncrease, setSalesIncrease] = useState(0);

  // Cenário 1: Aumento de Preços
  const newRevenueWithPriceIncrease = summary.totalRevenue * (1 + priceIncrease / 100);
  const newMarginWithPriceIncrease = newRevenueWithPriceIncrease - summary.totalVariableCosts;
  const newProfitWithPriceIncrease = newMarginWithPriceIncrease - summary.totalFixedCosts;

  // Cenário 2: Redução de Custos Fixos
  const newFixedCosts = summary.totalFixedCosts * (1 - costReduction / 100);
  const newBreakEven = newFixedCosts / (summary.averageContributionMarginPercent / 100);
  const newProfitWithCostReduction = summary.totalContributionMargin - newFixedCosts;

  // Cenário 3: Aumento de Vendas
  const newRevenueWithSalesIncrease = summary.totalRevenue * (1 + salesIncrease / 100);
  const newVariableCosts = summary.totalVariableCosts * (1 + salesIncrease / 100);
  const newMarginWithSalesIncrease = newRevenueWithSalesIncrease - newVariableCosts;
  const newProfitWithSalesIncrease = newMarginWithSalesIncrease - summary.totalFixedCosts;

  return (
    <div className="space-y-6">
      {/* Cenário 1: Aumento de Preços */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <h4 className="font-semibold text-gray-900">E se eu aumentar os preços?</h4>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Aumento de preços: {priceIncrease}%
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={priceIncrease}
              onChange={(e) => setPriceIncrease(parseFloat(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Novo Faturamento</p>
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(newRevenueWithPriceIncrease)}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Novo Lucro</p>
              <p className={`text-lg font-bold ${newProfitWithPriceIncrease >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(newProfitWithPriceIncrease)}
              </p>
            </div>
          </div>

          {priceIncrease > 0 && (
            <p className="text-xs text-gray-600 bg-white rounded p-2">
              💡 Com {priceIncrease}% de aumento, seu lucro seria{' '}
              <strong>
                {formatCurrency(newProfitWithPriceIncrease - summary.profitOrLoss)}
              </strong>{' '}
              {newProfitWithPriceIncrease > summary.profitOrLoss ? 'maior' : 'menor'}
            </p>
          )}
        </div>
      </div>

      {/* Cenário 2: Redução de Custos Fixos */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-gray-900">E se eu reduzir os custos fixos?</h4>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Redução de custos: {costReduction}%
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={costReduction}
              onChange={(e) => setCostReduction(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Novo PE</p>
              <p className="text-lg font-bold text-blue-600">
                {formatCurrency(newBreakEven)}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Novo Lucro</p>
              <p className={`text-lg font-bold ${newProfitWithCostReduction >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(newProfitWithCostReduction)}
              </p>
            </div>
          </div>

          {costReduction > 0 && (
            <p className="text-xs text-gray-600 bg-white rounded p-2">
              💡 Reduzindo {costReduction}% dos custos fixos, você economiza{' '}
              <strong>{formatCurrency(summary.totalFixedCosts * (costReduction / 100))}</strong>/mês
            </p>
          )}
        </div>
      </div>

      {/* Cenário 3: Aumento de Vendas */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <ShoppingBag className="w-5 h-5 text-purple-600" />
          <h4 className="font-semibold text-gray-900">E se eu aumentar as vendas?</h4>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Aumento de vendas: {salesIncrease}%
            </label>
            <input
              type="range"
              min="0"
              max="200"
              step="10"
              value={salesIncrease}
              onChange={(e) => setSalesIncrease(parseFloat(e.target.value))}
              className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Novo Faturamento</p>
              <p className="text-lg font-bold text-purple-600">
                {formatCurrency(newRevenueWithSalesIncrease)}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Novo Lucro</p>
              <p className={`text-lg font-bold ${newProfitWithSalesIncrease >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(newProfitWithSalesIncrease)}
              </p>
            </div>
          </div>

          {salesIncrease > 0 && (
            <p className="text-xs text-gray-600 bg-white rounded p-2">
              💡 Aumentando {salesIncrease}% nas vendas, seu lucro aumentaria{' '}
              <strong>
                {formatCurrency(newProfitWithSalesIncrease - summary.profitOrLoss)}
              </strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
