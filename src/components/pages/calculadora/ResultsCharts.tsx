'use client';

import React from 'react';
import { ProductCalculation, FixedCost, FinancialSummary } from '@/types/calculadora';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';

interface ResultsChartsProps {
  calculations: ProductCalculation[];
  fixedCosts: FixedCost[];
  summary: FinancialSummary;
}

const COLORS = ['#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#84cc16'];

export const ResultsCharts: React.FC<ResultsChartsProps> = ({ calculations, fixedCosts, summary }) => {
  // Dados para gráfico de pizza: Composição dos Custos Fixos
  const fixedCostsData = fixedCosts
    .filter(cost => cost.value > 0)
    .map(cost => ({
      name: cost.description,
      value: cost.value,
    }));

  // Dados para gráfico de barras: MC% por produto
  const marginData = calculations
    .filter(calc => calc.contributionMarginPercent > 0)
    .map(calc => ({
      name: calc.name.length > 20 ? calc.name.substring(0, 20) + '...' : calc.name,
      mc: parseFloat(calc.contributionMarginPercent.toFixed(2)),
    }));

  // Dados para gráfico de barras: Faturamento por produto
  const revenueData = calculations
    .filter(calc => calc.revenue > 0)
    .map(calc => ({
      name: calc.name.length > 20 ? calc.name.substring(0, 20) + '...' : calc.name,
      faturamento: calc.revenue,
    }));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BarChart3 className="w-6 h-6 text-pink-600" />
        Gráficos
      </h3>

      <div className="space-y-8">
        {/* Gráfico de Pizza: Custos Fixos */}
        {fixedCostsData.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Composição dos Custos Fixos</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fixedCostsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: ${formatCurrency(entry.value)}`}
                >
                  {fixedCostsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Gráfico de Barras: MC% */}
        {marginData.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Margem de Contribuição (%) por Produto</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marginData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                <Legend />
                <Bar dataKey="mc" fill="#10b981" name="MC %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Gráfico de Barras: Faturamento */}
        {revenueData.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Faturamento por Produto</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="faturamento" fill="#ec4899" name="Faturamento" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
