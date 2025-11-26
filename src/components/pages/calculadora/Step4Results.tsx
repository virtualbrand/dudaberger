'use client';

import React, { useState } from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { formatCurrency, formatPercentage } from '@/utils/calculatorUtils';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  DollarSign, 
  RotateCcw, 
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ProductsTable } from './ResultsProductsTable';
import { ResultsCharts } from './ResultsCharts';
import { ScenarioSimulator } from './ScenarioSimulator';
import { generatePDF } from '@/utils/pdfGenerator';

export const Step4Results: React.FC = () => {
  const { state, goToStep, resetCalculator } = useCalculator();
  const [showScenarios, setShowScenarios] = useState(false);
  const { summary, calculations } = state;

  if (!summary) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Carregando resultados...</p>
      </div>
    );
  }

  const handleBack = () => {
    goToStep(3);
  };

  const handleReset = () => {
    if (confirm('Tem certeza que deseja recomeçar? Todos os dados serão perdidos.')) {
      resetCalculator();
      goToStep(1);
    }
  };

  const handleExportPDF = async () => {
    try {
      await generatePDF(state);
      alert('PDF gerado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Por favor, tente novamente.');
    }
  };

  const isProfitable = summary.profitOrLoss >= 0;
  const hasRevenue = summary.totalRevenue > 0;

  // Encontrar produtos mais rentáveis
  const sortedByMargin = [...calculations].sort(
    (a, b) => b.contributionMarginPercent - a.contributionMarginPercent
  );
  const mostProfitableProduct = sortedByMargin[0];

  const sortedByContribution = [...calculations].sort(
    (a, b) => b.totalContribution - a.totalContribution
  );
  const topContributor = sortedByContribution[0];

  const lowMarginProducts = calculations.filter(
    (c) => c.contributionMarginPercent < 50 && c.contributionMarginPercent > 0
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--old-lace-500)' }}>
          Análise Financeira da sua Confeitaria
        </h2>
        <p style={{ color: 'var(--rosy-taupe-300)' }}>Resultados completos da sua simulação</p>
      </div>

      {/* Card 1: Resumo Financeiro */}
      <div className="border-2 rounded-xl p-6 mb-6 shadow-lg" style={{ 
        backgroundColor: 'var(--old-lace-500)', 
        borderColor: 'var(--honey-bronze-500)' 
      }}>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--carbon-black-900)' }}>
          <DollarSign className="w-6 h-6" style={{ color: 'var(--honey-bronze-600)' }} />
          Resumo Financeiro
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center pb-2" style={{ borderBottom: '1px solid var(--rosy-taupe-300)' }}>
            <span style={{ color: 'var(--carbon-black-800)' }}>Faturamento Total Mensal</span>
            <span className="text-xl font-bold" style={{ color: 'var(--evergreen-600)' }}>
              {formatCurrency(summary.totalRevenue)}
            </span>
          </div>

          <div className="flex justify-between items-center pb-2" style={{ borderBottom: '1px solid var(--rosy-taupe-300)' }}>
            <span style={{ color: 'var(--carbon-black-800)' }}>(-) Custos Variáveis Totais</span>
            <span className="text-xl font-semibold" style={{ color: 'var(--honey-bronze-600)' }}>
              {formatCurrency(summary.totalVariableCosts)}
            </span>
          </div>

          <div className="flex justify-between items-center pb-2" style={{ borderBottom: '2px solid var(--carbon-black-700)' }}>
            <span className="font-medium" style={{ color: 'var(--carbon-black-800)' }}>(=) Margem de Contribuição Total</span>
            <span className="text-xl font-bold" style={{ color: 'var(--bronze-600)' }}>
              {formatCurrency(summary.totalContributionMargin)}
              <span className="text-sm ml-2">
                ({formatPercentage(summary.averageContributionMarginPercent)})
              </span>
            </span>
          </div>

          <div className="flex justify-between items-center pb-2" style={{ borderBottom: '1px solid var(--rosy-taupe-300)' }}>
            <span style={{ color: 'var(--carbon-black-800)' }}>(-) Custos Fixos</span>
            <span className="text-xl font-semibold" style={{ color: 'var(--lobster-pink-600)' }}>
              {formatCurrency(summary.totalFixedCosts)}
            </span>
          </div>

          <div className="flex justify-between items-center p-4 rounded-lg" style={{
            backgroundColor: isProfitable ? 'var(--frosted-mint-500)' : 'var(--lobster-pink-100)'
          }}>
            <span className="text-lg font-bold" style={{ color: 'var(--carbon-black-900)' }}>(=) Lucro/Prejuízo</span>
            <span className="text-3xl font-bold" style={{
              color: isProfitable ? 'var(--evergreen-700)' : 'var(--lobster-pink-700)'
            }}>
              {formatCurrency(summary.profitOrLoss)}
            </span>
          </div>
        </div>
      </div>

      {/* Card 2: Ponto de Equilíbrio */}
      <div className="rounded-xl p-6 mb-6 shadow-lg border-2" style={{ 
        backgroundColor: 'var(--old-lace-500)', 
        borderColor: 'var(--bronze-500)'
      }}>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--carbon-black-900)' }}>
          <Target className="w-6 h-6" style={{ color: 'var(--bronze-600)' }} />
          Ponto de Equilíbrio
        </h3>

        <div className="space-y-4">
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--carbon-black-700)' }}>PE em Faturamento</p>
            <p className="text-3xl font-bold" style={{ color: 'var(--bronze-600)' }}>
              {formatCurrency(summary.breakEvenPoint)}<span className="text-lg">/mês</span>
            </p>
          </div>

          <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--rosy-taupe-200)' }}>
            <p className="text-sm mb-1" style={{ color: 'var(--carbon-black-700)' }}>Você precisa faturar</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(summary.breakEvenPointDaily)}<span className="text-base">/dia</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">(considerando 30 dias)</p>
          </div>

          {hasRevenue ? (
            <div
              className={`p-4 rounded-lg ${
                summary.isAboveBreakEven
                  ? 'bg-green-100 border-2 border-green-300'
                  : 'bg-red-100 border-2 border-red-300'
              }`}
            >
              {summary.isAboveBreakEven ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    <p className="text-lg font-bold text-green-800">
                      Você está acima do ponto de equilíbrio!
                    </p>
                  </div>
                  <p className="text-green-700">
                    Você está{' '}
                    <span className="font-bold">
                      {Math.abs(summary.distanceFromBreakEvenPercent).toFixed(1)}%
                    </span>{' '}
                    acima do PE (
                    <span className="font-bold">
                      {formatCurrency(Math.abs(summary.distanceFromBreakEven))}
                    </span>
                    )
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                    <p className="text-lg font-bold text-red-800">
                      Você está abaixo do ponto de equilíbrio
                    </p>
                  </div>
                  <p className="text-red-700">
                    Falta{' '}
                    <span className="font-bold">
                      {formatCurrency(Math.abs(summary.distanceFromBreakEven))}
                    </span>{' '}
                    para atingir o equilíbrio
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                💡 Volte ao passo anterior e simule suas vendas para ver se você atinge o PE
              </p>
            </div>
          )}

          {/* Barra de Progresso */}
          {hasRevenue && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>R$ 0</span>
                <span>Ponto de Equilíbrio</span>
                <span>Faturamento Atual</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    summary.isAboveBreakEven ? 'bg-green-500' : 'bg-red-500'
                  }`}
                  style={{
                    width: `${Math.min(
                      (summary.totalRevenue / summary.breakEvenPoint) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card 3: Análise por Produto */}
      <ProductsTable calculations={calculations} totalRevenue={summary.totalRevenue} />

      {/* Insights */}
      {calculations.length > 0 && (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Insights</h3>
          <div className="space-y-3">
            {mostProfitableProduct && mostProfitableProduct.contributionMarginPercent > 0 && (
              <p className="text-gray-700">
                🏆 <strong>Produto mais rentável:</strong> {mostProfitableProduct.name} com MC de{' '}
                {formatPercentage(mostProfitableProduct.contributionMarginPercent)}
              </p>
            )}
            {topContributor && topContributor.totalContribution > 0 && (
              <p className="text-gray-700">
                💰 <strong>Produto que mais contribui:</strong> {topContributor.name} com{' '}
                {formatCurrency(topContributor.totalContribution)}
              </p>
            )}
            {lowMarginProducts.length > 0 && (
              <p className="text-gray-700">
                ⚠️ <strong>Produtos com MC abaixo de 50%:</strong>{' '}
                {lowMarginProducts.map((p) => p.name).join(', ')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Card 4: Gráficos */}
      <ResultsCharts 
        calculations={calculations}
        fixedCosts={state.fixedCosts}
        summary={summary}
      />

      {/* Card 5: Análise de Cenários */}
      <div className="border-2 rounded-xl p-6 mb-6 shadow-lg" style={{ 
        backgroundColor: 'var(--old-lace-500)', 
        borderColor: 'var(--rosy-taupe-400)'
      }}>
        <button
          onClick={() => setShowScenarios(!showScenarios)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <h3 className="text-xl font-bold" style={{ color: 'var(--carbon-black-900)' }}>Análise de Cenários</h3>
          {showScenarios ? (
            <ChevronUp className="w-6 h-6" style={{ color: 'var(--carbon-black-700)' }} />
          ) : (
            <ChevronDown className="w-6 h-6" style={{ color: 'var(--carbon-black-700)' }} />
          )}
        </button>
        
        {showScenarios && (
          <div className="mt-6">
            <ScenarioSimulator summary={summary} />
          </div>
        )}
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <button
          onClick={handleBack}
          className="px-8 py-3 font-semibold rounded-lg transition-all hover:opacity-90 cursor-pointer"
          style={{ 
            backgroundColor: 'var(--rosy-taupe-500)', 
            color: 'var(--old-lace-500)'
          }}
        >
          ← Voltar e Editar
        </button>

        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleReset}
            className="px-8 py-3 font-semibold rounded-lg transition-all hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer"
            style={{ 
              backgroundColor: 'var(--honey-bronze-600)', 
              color: 'var(--old-lace-500)'
            }}
          >
            <RotateCcw className="w-5 h-5" />
            Recomeçar Cálculo
          </button>

          <button
            onClick={handleExportPDF}
            className="px-8 py-3 font-semibold rounded-lg transition-all hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer"
            style={{ 
              backgroundColor: 'var(--evergreen-600)', 
              color: 'var(--old-lace-500)'
            }}
          >
            <Download className="w-5 h-5" />
            Exportar PDF
          </button>
        </div>
      </div>
    </div>
  );
};
