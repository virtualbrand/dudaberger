import { Product, ProductCalculation, FinancialSummary, FixedCost } from '@/types/calculadora';

export const calculateProductMetrics = (product: Product): ProductCalculation => {
  const { salePrice, ingredientCost, packagingCost, feePercentage, quantity = 0 } = product;
  
  // Custo variável total unitário
  const feeAmount = salePrice * (feePercentage / 100);
  const totalVariableCost = ingredientCost + packagingCost + feeAmount;
  
  // Margem de contribuição unitária
  const contributionMarginValue = salePrice - totalVariableCost;
  const contributionMarginPercent = (contributionMarginValue / salePrice) * 100;
  
  // Valores totais
  const revenue = quantity * salePrice;
  const totalContribution = quantity * contributionMarginValue;
  
  return {
    ...product,
    quantity,
    totalVariableCost,
    contributionMarginValue,
    contributionMarginPercent,
    revenue,
    totalContribution,
    revenuePercentage: 0, // Será calculado depois
  };
};

export const calculateFinancialSummary = (
  products: Product[],
  fixedCosts: FixedCost[]
): FinancialSummary => {
  // Calcular métricas de cada produto
  const calculations = products.map(calculateProductMetrics);
  
  // Totais
  const totalRevenue = calculations.reduce((sum, calc) => sum + calc.revenue, 0);
  const totalVariableCosts = calculations.reduce(
    (sum, calc) => sum + calc.totalVariableCost * (calc.quantity || 0),
    0
  );
  const totalContributionMargin = totalRevenue - totalVariableCosts;
  const averageContributionMarginPercent = 
    totalRevenue > 0 ? (totalContributionMargin / totalRevenue) * 100 : 0;
  
  // Custos fixos
  const totalFixedCosts = fixedCosts.reduce((sum, cost) => sum + cost.value, 0);
  
  // Lucro/Prejuízo
  const profitOrLoss = totalContributionMargin - totalFixedCosts;
  
  // Ponto de Equilíbrio
  const breakEvenPoint = 
    averageContributionMarginPercent > 0 
      ? totalFixedCosts / (averageContributionMarginPercent / 100)
      : 0;
  const breakEvenPointDaily = breakEvenPoint / 30;
  
  // Status em relação ao PE
  const isAboveBreakEven = totalRevenue >= breakEvenPoint;
  const distanceFromBreakEven = totalRevenue - breakEvenPoint;
  const distanceFromBreakEvenPercent = 
    breakEvenPoint > 0 ? (distanceFromBreakEven / breakEvenPoint) * 100 : 0;
  
  return {
    totalRevenue,
    totalVariableCosts,
    totalContributionMargin,
    averageContributionMarginPercent,
    totalFixedCosts,
    profitOrLoss,
    breakEvenPoint,
    breakEvenPointDaily,
    isAboveBreakEven,
    distanceFromBreakEven,
    distanceFromBreakEvenPercent,
  };
};

export const calculateProductsWithPercentages = (
  products: Product[]
): ProductCalculation[] => {
  const calculations = products.map(calculateProductMetrics);
  const totalRevenue = calculations.reduce((sum, calc) => sum + calc.revenue, 0);
  
  return calculations.map(calc => ({
    ...calc,
    revenuePercentage: totalRevenue > 0 ? (calc.revenue / totalRevenue) * 100 : 0,
  }));
};

export const formatCurrency = (value: number): string => {
  const isInteger = value % 1 === 0;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: isInteger ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};

export const getMarginColor = (percentage: number): string => {
  if (percentage >= 60) return 'text-green-600 bg-green-50';
  if (percentage >= 50) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

export const getMarginBadge = (percentage: number): { text: string; color: string } => {
  if (percentage >= 60) return { text: 'Excelente', color: 'bg-green-500' };
  if (percentage >= 50) return { text: 'Bom', color: 'bg-yellow-500' };
  return { text: 'Atenção', color: 'bg-red-500' };
};
