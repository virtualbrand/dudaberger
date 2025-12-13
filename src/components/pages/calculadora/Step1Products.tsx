'use client';

import React, { useState } from 'react';
import { useCalculator } from '@/contexts/CalculatorContext';
import { Product } from '@/types/calculadora';
import { generateId } from '@/data/calculator-defaults';
import { calculateProductMetrics, formatCurrency, formatPercentage, getMarginBadge } from '@/utils/calculatorUtils';
import { CurrencyInput, PercentageInput, TextInput } from './FormInputs';
import { Plus, Trash2, AlertCircle, ArrowRight, Check, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';

export const Step1Products: React.FC = () => {
  const { state, addProduct, updateProduct, removeProduct, goToStep } = useCalculator();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    salePrice: 0,
    ingredientCost: 0,
    packagingCost: 0,
    feePercentage: 3,
    taxPercentage: 0,
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
      taxPercentage: 0,
      quantity: 0,
    });
    setIsModalOpen(false);
  };

  const handleClearAll = () => {
    state.products.forEach(p => removeProduct(p.id));
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
        <h2 className="text-3xl font-bold mb-2" style={{ color: '#703535' }}>Cadastre seus Produtos</h2>
        <p className="text-[var(--rosy-taupe-300)]">Adicione os produtos que você vende e seus custos</p>
      </div>

      {/* Produtos Cadastrados */}
      {state.products.length > 0 && (
        <div className="mb-8 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold" style={{ color: '#703535' }}>
              Produtos Cadastrados ({state.products.length}/15)
            </h3>
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={state.products.length >= 15}
              className="btn-success-xs-outline flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Novo Produto
            </button>
          </div>

          {state.products.map((product) => {
            const calc = calculateProductMetrics(product);
            const badge = getMarginBadge(calc.contributionMarginPercent);

            return (
              <div
                key={product.id}
                className="py-6 px-4 rounded-lg bg-[#FFFFFF] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header com nome e preço */}
                <div className="flex items-center justify-between p-4 bg-[var(--old-lace-500)]">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg" style={{ color: '#703535' }}>{product.name}</h4>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-bold font-unbounded text-[var(--evergreen-600)]">
                        {formatCurrency(product.salePrice)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="p-2 rounded-lg transition-all hover:bg-[var(--lobster-pink-100)] text-[var(--lobster-pink-600)] cursor-pointer"
                      title="Remover produto"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Detalhes dos custos */}
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-[var(--carbon-black-700)]">Custo Ingredientes:</span>
                    <p className="font-semibold" style={{ color: '#703535' }}>{formatCurrency(product.ingredientCost)}</p>
                  </div>
                  <hr className="border-t border-[#e5d5c3]" />
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-[var(--carbon-black-700)]">Custo Embalagem:</span>
                    <p className="font-semibold" style={{ color: '#703535' }}>{formatCurrency(product.packagingCost)}</p>
                  </div>
                  <hr className="border-t border-[#e5d5c3]" />
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-[var(--carbon-black-700)]">Taxa:</span>
                    <p className="font-semibold" style={{ color: '#703535' }}>{product.feePercentage}%</p>
                  </div>
                  {(product.taxPercentage || 0) > 0 && (
                    <>
                      <hr className="border-t border-[#e5d5c3]" />
                      <div className="flex justify-between items-center py-1">
                        <span className="text-sm text-[var(--carbon-black-700)]">Imposto:</span>
                        <p className="font-semibold" style={{ color: '#703535' }}>{(product.taxPercentage || 0).toFixed(1)}%</p>
                      </div>
                    </>
                  )}
                  <hr className="border-t border-[#e5d5c3]" />
                  <div className="flex justify-between items-center py-1 pt-2">
                    <span className="text-sm font-semibold text-[var(--honey-bronze-700)]">Custo Variável Total:</span>
                    <p className="font-bold text-[var(--honey-bronze-700)]">
                      {formatCurrency(calc.totalVariableCost)}
                    </p>
                  </div>
                </div>

                {/* Footer com margem de contribuição */}
                <div className="px-4 py-4 bg-gradient-to-r from-[var(--evergreen-50)] to-[var(--evergreen-100)] border-t-2 border-[#e5d5c3]">
                  <div className="flex items-center justify-between gap-4">
                    {/* Métricas de Margem */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-unbounded text-[var(--evergreen-700)]">Margem de contribuição:</span>
                      <p className="font-unbounded text-md font-bold text-[var(--evergreen-700)]">
                        {formatCurrency(calc.contributionMarginValue)}
                      </p>
                      <p className="font-unbounded text-xs font-bold text-[var(--evergreen-700)]">
                        ({formatPercentage(calc.contributionMarginPercent)})
                      </p>
                    </div>
                    
                    {/* Badge de Status */}
                    <div className="flex items-center gap-3">
                      <span 
                        className="px-5 py-1 rounded-full text-sm font-bold shadow-md"
                        style={{
                          backgroundColor: badge.bgColor,
                          color: badge.textColor
                        }}
                      >
                        {badge.text}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Novo Produto */}
      <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 bg-[#fbf7ef] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg outline-none focus:outline-none focus-visible:outline-none max-h-[90vh] overflow-y-auto" style={{ maxWidth: '500px' }}>
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl font-bold" style={{ color: '#703535' }}>
                Novo Produto
              </Dialog.Title>
              <Dialog.Close asChild>
                <button 
                  className="rounded-lg p-2 hover:bg-[var(--old-lace-300)] transition-colors cursor-pointer"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" style={{ color: '#703535' }} />
                </button>
              </Dialog.Close>
            </div>

            {state.products.length >= 15 && (
              <div className="mb-4 p-3 rounded-lg flex items-center gap-2 shadow-sm" style={{
                backgroundColor: 'var(--honey-bronze-100)'
              }}>
                <AlertCircle className="w-5 h-5" style={{ color: 'var(--honey-bronze-700)' }} />
                <p className="text-sm" style={{ color: 'var(--honey-bronze-900)' }}>
                  Você atingiu o limite máximo de 15 produtos.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              <TextInput
                label="Nome do Produto"
                value={newProduct.name}
                onChange={(value) => setNewProduct({ ...newProduct, name: value })}
                placeholder="Ex: Bolo Decorado 1kg"
                required
                disabled={state.products.length >= 15}
                whiteBackground
              />

              <CurrencyInput
                label="Preço de Venda"
                value={newProduct.salePrice}
                onChange={(value) => setNewProduct({ ...newProduct, salePrice: value })}
                placeholder="R$ 0,00"
                required
                disabled={state.products.length >= 15}
                whiteBackground
              />

              <CurrencyInput
                label="Custo de Ingredientes"
                value={newProduct.ingredientCost}
                onChange={(value) => setNewProduct({ ...newProduct, ingredientCost: value })}
                placeholder="R$ 0,00"
                required
                disabled={state.products.length >= 15}
                whiteBackground
              />

              <CurrencyInput
                label="Custo de Embalagem"
                value={newProduct.packagingCost}
                onChange={(value) => setNewProduct({ ...newProduct, packagingCost: value })}
                placeholder="R$ 0,00"
                required
                disabled={state.products.length >= 15}
                whiteBackground
              />

              <PercentageInput
                label="Taxa (%) - Cartão/Delivery"
                value={newProduct.feePercentage}
                onChange={(value) => setNewProduct({ ...newProduct, feePercentage: value })}
                placeholder="3%"
                required
                disabled={state.products.length >= 15}
                whiteBackground
              />

              <PercentageInput
                label="Imposto (%)"
                value={newProduct.taxPercentage || 0}
                onChange={(value) => setNewProduct({ ...newProduct, taxPercentage: value })}
                placeholder="0%"
                disabled={state.products.length >= 15}
                whiteBackground
              />
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleAddProduct}
                disabled={state.products.length >= 15 || !newProduct.name || newProduct.salePrice <= 0}
                className="btn-success-sm flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Salvar Produto
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Formulário inicial quando não há produtos */}
      {state.products.length === 0 && (
        <div className="rounded-lg p-6 mb-6 shadow-sm bg-white">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#703535' }}>
            Adicione seu primeiro produto
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <TextInput
                label="Nome do Produto"
                value={newProduct.name}
                onChange={(value) => setNewProduct({ ...newProduct, name: value })}
                placeholder="Ex: Bolo Decorado 1kg"
                required
              />
            </div>

            <CurrencyInput
              label="Preço de Venda"
              value={newProduct.salePrice}
              onChange={(value) => setNewProduct({ ...newProduct, salePrice: value })}
              placeholder="R$ 0,00"
              required
            />

            <CurrencyInput
              label="Custo de Ingredientes"
              value={newProduct.ingredientCost}
              onChange={(value) => setNewProduct({ ...newProduct, ingredientCost: value })}
              placeholder="R$ 0,00"
              required
            />

            <CurrencyInput
              label="Custo de Embalagem"
              value={newProduct.packagingCost}
              onChange={(value) => setNewProduct({ ...newProduct, packagingCost: value })}
              placeholder="R$ 0,00"
              required
            />

            <PercentageInput
              label="Taxa (%) - Cartão/Delivery"
              value={newProduct.feePercentage}
              onChange={(value) => setNewProduct({ ...newProduct, feePercentage: value })}
              placeholder="3%"
              required
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={handleAddProduct}
              disabled={!newProduct.name || newProduct.salePrice <= 0}
              className="btn-success-xs-outline flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Produto
            </button>
          </div>
        </div>
      )}

      {/* Navegação */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="btn-secondary-sm-outline flex items-center gap-2"
        >
          <span>Custos Fixos</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {!canProceed && state.products.length === 0 && (
        <p className="text-center text-sm mt-4" style={{ color: 'var(--lobster-pink-500)' }}>
          Adicione pelo menos 1 produto para continuar
        </p>
      )}
    </div>
  );
};
