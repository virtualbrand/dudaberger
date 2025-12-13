export interface Product {
  id: string;
  name: string;
  salePrice: number;
  ingredientCost: number;
  packagingCost: number;
  feePercentage: number;
  taxPercentage?: number;
  quantity?: number;
}

export interface FixedCost {
  id: string;
  description: string;
  value: number;
  isCustom?: boolean;
}

export interface ProductCalculation extends Product {
  totalVariableCost: number;
  contributionMarginValue: number;
  contributionMarginPercent: number;
  revenue: number;
  totalContribution: number;
  revenuePercentage: number;
}

export interface FinancialSummary {
  totalRevenue: number;
  totalVariableCosts: number;
  totalContributionMargin: number;
  averageContributionMarginPercent: number;
  totalFixedCosts: number;
  profitOrLoss: number;
  breakEvenPoint: number;
  breakEvenPointDaily: number;
  isAboveBreakEven: boolean;
  distanceFromBreakEven: number;
  distanceFromBreakEvenPercent: number;
}

export interface CalculatorState {
  currentStep: number;
  products: Product[];
  fixedCosts: FixedCost[];
  calculations: ProductCalculation[];
  summary: FinancialSummary | null;
}

export type CalculatorAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: { id: string; product: Partial<Product> } }
  | { type: 'REMOVE_PRODUCT'; payload: string }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_FIXED_COST'; payload: FixedCost }
  | { type: 'UPDATE_FIXED_COST'; payload: { id: string; cost: Partial<FixedCost> } }
  | { type: 'REMOVE_FIXED_COST'; payload: string }
  | { type: 'SET_FIXED_COSTS'; payload: FixedCost[] }
  | { type: 'UPDATE_PRODUCT_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CALCULATE_SUMMARY' }
  | { type: 'RESET' };
