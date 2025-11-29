'use client';

import React, { useState, useEffect } from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { FixedCost } from '@/types/calculadora';
import { generateId } from '@/data/calculator-defaults';
import { formatCurrency } from '@/utils/calculatorUtils';
import { CurrencyInput, TextInput } from './FormInputs';
import { Plus, Trash2, DollarSign, ArrowLeft, ArrowRight, Check, Pencil, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const Step2FixedCosts: React.FC = () => {
  const { state, addFixedCost, updateFixedCost, removeFixedCost, goToStep } = useCalculator();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingOriginalValues, setEditingOriginalValues] = useState<{ description: string; value: number } | null>(null);
  const [newCost, setNewCost] = useState<Omit<FixedCost, 'id'>>({
    description: '',
    value: 0,
    isCustom: true,
  });

  const totalFixedCosts = state.fixedCosts.reduce((sum, cost) => sum + cost.value, 0);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (editingId) {
          handleCancelEditing();
        } else if (isAddingNew) {
          handleCancelAdding();
        }
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [editingId, isAddingNew, editingOriginalValues]);

  const handleStartAdding = () => {
    setEditingId(null);
    setEditingOriginalValues(null);
    setIsAddingNew(true);
  };

  const handleStartEditing = (cost: FixedCost) => {
    setIsAddingNew(false);
    setNewCost({
      description: '',
      value: 0,
      isCustom: true,
    });
    setEditingId(cost.id);
    setEditingOriginalValues({ description: cost.description, value: cost.value });
  };

  const handleCancelEditing = () => {
    if (editingId && editingOriginalValues) {
      updateFixedCost(editingId, {
        description: editingOriginalValues.description,
        value: editingOriginalValues.value,
      });
    }
    setEditingId(null);
    setEditingOriginalValues(null);
  };

  const handleSaveEditing = () => {
    setEditingId(null);
    setEditingOriginalValues(null);
  };

  const handleSaveCustomCost = () => {
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
    setIsAddingNew(false);
  };

  const handleCancelAdding = () => {
    setNewCost({
      description: '',
      value: 0,
      isCustom: true,
    });
    setIsAddingNew(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newCost.description && newCost.value > 0) {
      e.preventDefault();
      handleSaveCustomCost();
    }
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
        <h2 className="text-3xl font-bold mb-2 text-[var(--old-lace-500)]">Informe seus Custos Fixos Mensais</h2>
        <p className="text-[var(--rosy-taupe-300)]">Custos que você paga todo mês independente das vendas</p>
      </div>

      {/* Card com Total */}
      <div className="rounded-lg p-6 mb-4 shadow-sm bg-[#D65B58]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-[#F6EEE1]">
              <DollarSign className="w-6 h-6 text-[#D65B58]" />
            </div>
            <div>
              <p className="text-sm text-white">Total de Custos Fixos</p>
              <p className="text-3xl font-bold text-white font-unbounded">
                {formatCurrency(totalFixedCosts)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-white">Por dia</p>
            <p className="text-xl font-semibold text-white font-unbounded">
              {formatCurrency(totalFixedCosts / 30)}
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Custos Fixos */}
      <div className="mt-6 mb-8">
        <div className="rounded-lg overflow-hidden bg-white shadow-sm py-4 px-3">
          <table className="w-full">
            {(state.fixedCosts.length > 0 || isAddingNew) && (
              <thead>
                <tr style={{ borderBottom: '2px solid var(--rosy-taupe-300)' }}>
                  <th className="text-left px-4 py-1 font-semibold text-[var(--carbon-black-900)] font-unbounded" style={{ borderRight: '1px solid var(--rosy-taupe-300)' }}>Custos Fixos</th>
                  <th className="text-left px-4 py-1 font-semibold text-[var(--carbon-black-900)] font-unbounded" style={{ borderRight: '1px solid var(--rosy-taupe-300)' }}>Valor Mensal</th>
                  <th className="px-4 py-1"></th>
                </tr>
              </thead>
            )}
            <tbody>
              {state.fixedCosts.map((cost) => (
                <tr
                  key={cost.id}
                  className="hover:bg-gray-50 transition-colors"
                  style={{ 
                    borderBottom: '1px solid var(--rosy-taupe-300)'
                  }}
                >
                  <td className="px-4 py-1">
                    {editingId === cost.id ? (
                      <TextInput
                        value={cost.description}
                        onChange={(value) => updateFixedCost(cost.id, { description: value })}
                        placeholder="Descrição do custo"
                        required
                      />
                    ) : (
                      <p className="font-medium text-[var(--carbon-black-900)]">{cost.description}</p>
                    )}
                  </td>

                  <td className="px-4 py-1" style={{ width: '250px' }}>
                    {editingId === cost.id ? (
                      <CurrencyInput
                        value={cost.value}
                        onChange={(value) => updateFixedCost(cost.id, { value })}
                        placeholder="R$ 0,00"
                        required
                      />
                    ) : (
                      <p className="font-medium text-[var(--carbon-black-900)]">{formatCurrency(cost.value)}</p>
                    )}
                  </td>

                  <td className="px-4 py-1" style={{ width: '120px' }}>
                    <div className="flex items-center justify-end gap-2">
                      {editingId === cost.id ? (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={handleSaveEditing}
                                disabled={!cost.description || cost.value <= 0}
                                className="p-2 rounded-lg transition-all hover:opacity-90 cursor-pointer bg-[#183D32] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent variant="light">
                              <p>Salvar</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={handleCancelEditing}
                                className="p-2 rounded-lg transition-all hover:shadow-md bg-white shadow-sm cursor-pointer text-[#9a9a9b]"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent variant="light">
                              <p>Cancelar</p>
                            </TooltipContent>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => handleStartEditing(cost)}
                                className="p-2 rounded-lg transition-all hover:shadow-md bg-white shadow-sm cursor-pointer text-[#9a9a9b]"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent variant="light">
                              <p>Editar</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => removeFixedCost(cost.id)}
                                className="p-2 rounded-lg transition-all hover:shadow-md bg-white shadow-sm cursor-pointer text-[#D65B58]"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent variant="light">
                              <p>Remover</p>
                            </TooltipContent>
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              
              {/* Linha para adicionar novo custo */}
              {isAddingNew && (
                <tr
                  className="hover:bg-gray-50 transition-colors"
                  style={{ 
                    borderBottom: '1px solid var(--rosy-taupe-300)'
                  }}
                  onKeyDown={handleKeyDown}
                >
                  <td className="px-4 py-1">
                    <TextInput
                      value={newCost.description}
                      onChange={(value) => setNewCost({ ...newCost, description: value })}
                      placeholder="Ex: Manutenção de veículo"
                      required
                    />
                  </td>

                  <td className="px-4 py-1">
                    <CurrencyInput
                      value={newCost.value}
                      onChange={(value) => setNewCost({ ...newCost, value })}
                      placeholder="R$ 0,00"
                      required
                    />
                  </td>

                  <td className="px-4 py-1">
                    <div className="flex items-center justify-end gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={handleSaveCustomCost}
                            disabled={!newCost.description || newCost.value <= 0}
                            className="p-2 rounded-lg transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-[#183D32] text-white"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent variant="light">
                          <p>Salvar</p>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={handleCancelAdding}
                            className="p-2 rounded-lg transition-all hover:shadow-md bg-white shadow-sm cursor-pointer text-[#D65B58]"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent variant="light">
                          <p>Cancelar</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          <div className="flex justify-end px-4 py-4">
            {!isAddingNew && (
              <button
                onClick={handleStartAdding}
                className="btn-success-xs-outline flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Custo Fixo</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Botões de Navegação */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="btn-secondary-sm-outline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Produtos</span>
        </button>
        <button
          onClick={handleNext}
          className="btn-secondary-sm flex items-center gap-2"
        >
          <span>Volume de Vendas</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
