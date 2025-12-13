import { Product, FixedCost } from '@/types/calculadora';

export const EXAMPLE_PRODUCTS: Omit<Product, 'id'>[] = [
  {
    name: 'Bolo 20 fatias',
    salePrice: 280,
    ingredientCost: 88.20,
    packagingCost: 0,
    feePercentage: 0,
    taxAmount: 22.40,
    quantity: 0,
  },
];

export const DEFAULT_FIXED_COSTS: Omit<FixedCost, 'id'>[] = [
  { description: 'Aluguel', value: 1500, isCustom: false },
  { description: 'Telefone', value: 40, isCustom: false },
  { description: 'Internet', value: 90, isCustom: false },
  { description: 'Freela', value: 0, isCustom: false },
  { description: 'Contabilidade', value: 0, isCustom: false },
  { description: 'Água', value: 100, isCustom: false },
  { description: 'Energia', value: 500, isCustom: false },
  { description: 'Prolabore', value: 2000, isCustom: false },
  { description: 'Financeiro', value: 0, isCustom: false },
  { description: 'Banco taxas', value: 30, isCustom: false },
  { description: 'DAS', value: 75, isCustom: false },
  { description: 'Anúncios', value: 0, isCustom: false },
  { description: 'Apps', value: 80, isCustom: false },
  { description: 'Gás', value: 100, isCustom: false },
];

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
