'use client';

import React from 'react';
import { ProductCalculation } from '@/types/calculadora';
import { formatCurrency, formatPercentage, getMarginBadge } from '@/utils/calculatorUtils';
import { Package } from 'lucide-react';

interface ProductsTableProps {
  calculations: ProductCalculation[];
  totalRevenue: number;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({ calculations, totalRevenue }) => {
  const sortedCalculations = [...calculations].sort(
    (a, b) => b.contributionMarginPercent - a.contributionMarginPercent
  );

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Package className="w-6 h-6 text-pink-600" />
        Análise por Produto
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Produto</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">MC %</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">MC (R$) Unit.</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Qtd. Vendida</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Faturamento</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">Contribuição</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-700">% Fat.</th>
            </tr>
          </thead>
          <tbody>
            {sortedCalculations.map((calc, index) => {
              const badge = getMarginBadge(calc.contributionMarginPercent);
              
              return (
                <tr
                  key={calc.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 ${
                    index === 0 ? 'bg-green-50' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{calc.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold text-white ${badge.color}`}>
                        {badge.text}
                      </span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 font-semibold text-green-600">
                    {formatPercentage(calc.contributionMarginPercent)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700">
                    {formatCurrency(calc.contributionMarginValue)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700">
                    {calc.quantity || 0}
                  </td>
                  <td className="text-right py-3 px-4 font-medium text-gray-900">
                    {formatCurrency(calc.revenue)}
                  </td>
                  <td className="text-right py-3 px-4 font-bold text-blue-600">
                    {formatCurrency(calc.totalContribution)}
                  </td>
                  <td className="text-right py-3 px-4 text-gray-700">
                    {formatPercentage(calc.revenuePercentage)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
