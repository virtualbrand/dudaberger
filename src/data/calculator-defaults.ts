import { Product, FixedCost } from '@/types/calculadora';

export const EXAMPLE_PRODUCTS: Omit<Product, 'id'>[] = [
  {
    name: 'Bolo Decorado 1kg',
    salePrice: 120,
    ingredientCost: 28,
    packagingCost: 4.5,
    feePercentage: 3,
    quantity: 0,
  },
  {
    name: 'Bolo no Pote 300g',
    salePrice: 18,
    ingredientCost: 4.2,
    packagingCost: 1.8,
    feePercentage: 3,
    quantity: 0,
  },
  {
    name: 'Docinhos 100un',
    salePrice: 250,
    ingredientCost: 65,
    packagingCost: 15,
    feePercentage: 3,
    quantity: 0,
  },
  {
    name: 'Torta Fatia',
    salePrice: 15,
    ingredientCost: 4.5,
    packagingCost: 0.8,
    feePercentage: 3,
    quantity: 0,
  },
];

export const DEFAULT_FIXED_COSTS: Omit<FixedCost, 'id'>[] = [
  { description: 'Aluguel/Local', value: 1500, isCustom: false },
  { description: 'Energia Elétrica', value: 380, isCustom: false },
  { description: 'Água', value: 120, isCustom: false },
  { description: 'Internet/Telefone', value: 150, isCustom: false },
  { description: 'Gás', value: 250, isCustom: false },
  { description: 'Salários', value: 4000, isCustom: false },
  { description: 'Contador', value: 400, isCustom: false },
  { description: 'Produtos de Limpeza', value: 200, isCustom: false },
  { description: 'Manutenção de Equipamentos', value: 300, isCustom: false },
  { description: 'Marketing', value: 500, isCustom: false },
];

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
