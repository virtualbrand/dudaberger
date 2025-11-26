'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import {
  CalculatorState,
  CalculatorAction,
  Product,
  FixedCost,
} from '@/types/calculadora';
import { 
  calculateProductsWithPercentages, 
  calculateFinancialSummary 
} from '@/utils/calculatorUtils';
import { EXAMPLE_PRODUCTS, DEFAULT_FIXED_COSTS, generateId } from '@/data/calculator-defaults';

const initialState: CalculatorState = {
  currentStep: 1,
  products: EXAMPLE_PRODUCTS.map(p => ({ ...p, id: generateId() })),
  fixedCosts: DEFAULT_FIXED_COSTS.map(c => ({ ...c, id: generateId() })),
  calculations: [],
  summary: null,
};

const calculatorReducer = (
  state: CalculatorState,
  action: CalculatorAction
): CalculatorState => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };

    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };

    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id ? { ...p, ...action.payload.product } : p
        ),
      };

    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(p => p.id !== action.payload),
      };

    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };

    case 'ADD_FIXED_COST':
      return { ...state, fixedCosts: [...state.fixedCosts, action.payload] };

    case 'UPDATE_FIXED_COST':
      return {
        ...state,
        fixedCosts: state.fixedCosts.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload.cost } : c
        ),
      };

    case 'REMOVE_FIXED_COST':
      return {
        ...state,
        fixedCosts: state.fixedCosts.filter(c => c.id !== action.payload),
      };

    case 'SET_FIXED_COSTS':
      return { ...state, fixedCosts: action.payload };

    case 'UPDATE_PRODUCT_QUANTITY':
      return {
        ...state,
        products: state.products.map(p =>
          p.id === action.payload.id
            ? { ...p, quantity: action.payload.quantity }
            : p
        ),
      };

    case 'CALCULATE_SUMMARY':
      const calculations = calculateProductsWithPercentages(state.products);
      const summary = calculateFinancialSummary(state.products, state.fixedCosts);
      return { ...state, calculations, summary };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

interface CalculatorContextType {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  goToStep: (step: number) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  addFixedCost: (cost: FixedCost) => void;
  updateFixedCost: (id: string, cost: Partial<FixedCost>) => void;
  removeFixedCost: (id: string) => void;
  updateProductQuantity: (id: string, quantity: number) => void;
  calculateSummary: () => void;
  resetCalculator: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const CalculatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  const goToStep = (step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const addProduct = (product: Product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    dispatch({ type: 'UPDATE_PRODUCT', payload: { id, product } });
  };

  const removeProduct = (id: string) => {
    dispatch({ type: 'REMOVE_PRODUCT', payload: id });
  };

  const addFixedCost = (cost: FixedCost) => {
    dispatch({ type: 'ADD_FIXED_COST', payload: cost });
  };

  const updateFixedCost = (id: string, cost: Partial<FixedCost>) => {
    dispatch({ type: 'UPDATE_FIXED_COST', payload: { id, cost } });
  };

  const removeFixedCost = (id: string) => {
    dispatch({ type: 'REMOVE_FIXED_COST', payload: id });
  };

  const updateProductQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_PRODUCT_QUANTITY', payload: { id, quantity } });
  };

  const calculateSummary = () => {
    dispatch({ type: 'CALCULATE_SUMMARY' });
  };

  const resetCalculator = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <CalculatorContext.Provider
      value={{
        state,
        dispatch,
        goToStep,
        addProduct,
        updateProduct,
        removeProduct,
        addFixedCost,
        updateFixedCost,
        removeFixedCost,
        updateProductQuantity,
        calculateSummary,
        resetCalculator,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};
