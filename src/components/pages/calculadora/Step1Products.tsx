'use client';

import React, { useState } from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { Product } from '@/types/calculadora';
import { generateId } from '@/data/calculator-defaults';
import { calculateProductMetrics, formatCurrency, formatPercentage, getMarginBadge } from '@/utils/calculatorUtils';
import { CurrencyInput, PercentageInput, TextInput } from './FormInputs';
import { Plus, Trash2, AlertCircle } from 'lucide-react';

export const Step1Products: React.FC = () => {
  const { state, addProduct, updateProduct, removeProduct, goToStep } = useCalculator();
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    salePrice: 0,
    ingredientCost: 0,
    packagingCost: 0,
    feePercentage: 3,
    quantity: 0,
  });

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.salePrice <= 0) {
      alert('Por favor, preencha o nome e o preço de venda do produto.');
      return;
    }

    const product: Product = {
      ...newProduct,
      id: generateId(),
    };

    addProduct(product);
    setNewProduct({
      name: '',
      salePrice: 0,
      ingredientCost: 0,
      packagingCost: 0,
      feePercentage: 3,
      quantity: 0,
    });
  };

  const handleClearAll = () => {
    if (confirm('Tem certeza que deseja limpar todos os produtos?')) {
      state.products.forEach(p => removeProduct(p.id));
    }
  };

  const canProceed = state.products.length > 0 && state.products.every(
    p => p.name && p.salePrice > 0
  );

  const handleNext = () => {
    if (canProceed) {
      goToStep(2);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Cadastre seus Produtos</h2>
        <p className="text-gray-600">Adicione os produtos que você vende e seus custos</p>
      </div>

      {/* Produtos Cadastrados */}
      {state.products.length > 0 && (
        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Produtos Cadastrados ({state.products.length}/15)
            </h3>
            <button
              onClick={handleClearAll}
              className="text-sm text-red-600 hover:text-red-700 underline"
            >
              Limpar todos
            </button>
          </div>

          {state.products.map((product) => {
            const calc = calculateProductMetrics(product);
            const badge = getMarginBadge(calc.contributionMarginPercent);

            return (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg">{product.name}</h4>
                    <p className="text-sm text-gray-600">
                      Preço de Venda: {formatCurrency(product.salePrice)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remover produto"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Custo Ingredientes:</span>
                    <p className="font-medium">{formatCurrency(product.ingredientCost)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Custo Embalagem:</span>
                    <p className="font-medium">{formatCurrency(product.packagingCost)}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Taxa:</span>
                    <p className="font-medium">{product.feePercentage}%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Custo Variável Total:</span>
                    <p className="font-medium text-orange-600">
                      {formatCurrency(calc.totalVariableCost)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-xs text-gray-600">Margem de Contribuição:</span>
                      <p className="font-bold text-lg text-green-600">
                        {formatCurrency(calc.contributionMarginValue)}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-gray-600">MC %:</span>
                      <p className="font-bold text-lg text-green-600">
                        {formatPercentage(calc.contributionMarginPercent)}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${badge.color}`}>
                    {badge.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Formulário para Novo Produto */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {state.products.length === 0 ? 'Adicione seu primeiro produto' : 'Adicionar Novo Produto'}
        </h3>

        {state.products.length >= 15 && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              Você atingiu o limite máximo de 15 produtos.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <TextInput
              label="Nome do Produto"
              value={newProduct.name}
              onChange={(value) => setNewProduct({ ...newProduct, name: value })}
              placeholder="Ex: Bolo Decorado 1kg"
              required
              disabled={state.products.length >= 15}
            />
          </div>

          <CurrencyInput
            label="Preço de Venda"
            value={newProduct.salePrice}
            onChange={(value) => setNewProduct({ ...newProduct, salePrice: value })}
            placeholder="R$ 0,00"
            required
            disabled={state.products.length >= 15}
          />

          <CurrencyInput
            label="Custo de Ingredientes"
            value={newProduct.ingredientCost}
            onChange={(value) => setNewProduct({ ...newProduct, ingredientCost: value })}
            placeholder="R$ 0,00"
            required
            disabled={state.products.length >= 15}
          />

          <CurrencyInput
            label="Custo de Embalagem"
            value={newProduct.packagingCost}
            onChange={(value) => setNewProduct({ ...newProduct, packagingCost: value })}
            placeholder="R$ 0,00"
            required
            disabled={state.products.length >= 15}
          />

          <PercentageInput
            label="Taxa (%) - Cartão/Delivery"
            value={newProduct.feePercentage}
            onChange={(value) => setNewProduct({ ...newProduct, feePercentage: value })}
            placeholder="3%"
            required
            disabled={state.products.length >= 15}
          />
        </div>

        <button
          onClick={handleAddProduct}
          disabled={state.products.length >= 15 || !newProduct.name || newProduct.salePrice <= 0}
          className="mt-4 w-full md:w-auto px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Adicionar Produto
        </button>
      </div>

      {/* Botão Próximo */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="px-8 py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Próximo: Custos Fixos →
        </button>
      </div>

      {!canProceed && state.products.length === 0 && (
        <p className="text-center text-sm text-red-600 mt-4">
          Adicione pelo menos 1 produto para continuar
        </p>
      )}
    </div>
  );
};
