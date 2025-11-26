'use client';

import React, { useState } from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { FixedCost } from '@/types/calculadora';
import { generateId } from '@/data/calculator-defaults';
import { formatCurrency } from '@/utils/calculatorUtils';
import { CurrencyInput, TextInput } from './FormInputs';
import { Plus, Trash2, DollarSign } from 'lucide-react';

export const Step2FixedCosts: React.FC = () => {
  const { state, addFixedCost, updateFixedCost, removeFixedCost, goToStep } = useCalculator();
  const [newCost, setNewCost] = useState<Omit<FixedCost, 'id'>>({
    description: '',
    value: 0,
    isCustom: true,
  });

  const totalFixedCosts = state.fixedCosts.reduce((sum, cost) => sum + cost.value, 0);

  const handleAddCustomCost = () => {
    if (!newCost.description || newCost.value <= 0) {
      alert('Por favor, preencha a descrição e o valor do custo fixo.');
      return;
    }

    const cost: FixedCost = {
      ...newCost,
      id: generateId(),
    };

    addFixedCost(cost);
    setNewCost({
      description: '',
      value: 0,
      isCustom: true,
    });
  };

  const handleNext = () => {
    goToStep(3);
  };

  const handleBack = () => {
    goToStep(1);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--old-lace-500)' }}>Informe seus Custos Fixos Mensais</h2>
        <p style={{ color: 'var(--rosy-taupe-300)' }}>Custos que você paga todo mês independente das vendas</p>
      </div>

      {/* Card com Total */}
      <div className="rounded-lg p-6 mb-8 border-2" style={{ 
        backgroundColor: 'var(--old-lace-500)', 
        borderColor: 'var(--bronze-500)'
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--bronze-600)', color: 'var(--old-lace-500)' }}>
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm" style={{ color: 'var(--carbon-black-700)' }}>Total de Custos Fixos</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--bronze-600)' }}>
                {formatCurrency(totalFixedCosts)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm" style={{ color: 'var(--carbon-black-700)' }}>Por dia</p>
            <p className="text-xl font-semibold" style={{ color: 'var(--carbon-black-900)' }}>
              {formatCurrency(totalFixedCosts / 30)}
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Custos Fixos */}
      <div className="space-y-4 mb-8">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--old-lace-500)' }}>Custos Fixos</h3>

        {state.fixedCosts.map((cost) => (
          <div
            key={cost.id}
            className="rounded-lg p-4 hover:shadow-lg transition-shadow border"
            style={{ 
              backgroundColor: 'var(--old-lace-500)', 
              borderColor: 'var(--rosy-taupe-400)'
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                {cost.isCustom ? (
                  <TextInput
                    value={cost.description}
                    onChange={(value) => updateFixedCost(cost.id, { description: value })}
                    placeholder="Descrição do custo"
                  />
                ) : (
                  <p className="font-medium" style={{ color: 'var(--carbon-black-900)' }}>{cost.description}</p>
                )}
              </div>

              <div className="w-48">
                <CurrencyInput
                  value={cost.value}
                  onChange={(value) => updateFixedCost(cost.id, { value })}
                  placeholder="R$ 0,00"
                />
              </div>

              {cost.isCustom && (
                <button
                  onClick={() => removeFixedCost(cost.id)}
                  className="p-2 rounded-lg transition-all hover:opacity-80"
                  style={{ color: 'var(--lobster-pink-600)' }}
                  title="Remover custo"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Adicionar Novo Custo Fixo */}
      <div className="rounded-lg p-6 mb-8 border" style={{ 
        backgroundColor: 'var(--old-lace-500)', 
        borderColor: 'var(--rosy-taupe-400)'
      }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--carbon-black-900)' }}>Adicionar Outro Custo Fixo</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <TextInput
              label="Descrição"
              value={newCost.description}
              onChange={(value) => setNewCost({ ...newCost, description: value })}
              placeholder="Ex: Manutenção de veículo"
            />
          </div>

          <CurrencyInput
            label="Valor Mensal"
            value={newCost.value}
            onChange={(value) => setNewCost({ ...newCost, value })}
            placeholder="R$ 0,00"
          />
        </div>

        <button
          onClick={handleAddCustomCost}
          disabled={!newCost.description || newCost.value <= 0}
          className="mt-4 w-full md:w-auto px-6 py-3 font-semibold rounded-lg disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{
            backgroundColor: !newCost.description || newCost.value <= 0 ? 'var(--carbon-black-600)' : 'var(--bronze-600)',
            color: 'var(--old-lace-500)'
          }}
        >
          <Plus className="w-5 h-5" />
          Adicionar Custo Fixo
        </button>
      </div>

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
          Próximo: Volume de Vendas →
        </button>
      </div>
    </div>
  );
};
