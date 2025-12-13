'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CasamentoState {
  currentStep: number;
  leadId: string | null;
  step1Data: Record<string, any>;
  step2Data: Record<string, any>;
  step2_3Data: Record<string, any>;
  step2_5Data: Record<string, any>;
  step3Data: Record<string, any>;
  step4Data: Record<string, any>;
  step5Data: Record<string, any>;
}

export type CasamentoAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_LEAD_ID'; payload: string }
  | { type: 'UPDATE_STEP1'; payload: Record<string, any> }
  | { type: 'UPDATE_STEP2'; payload: Record<string, any> }
  | { type: 'UPDATE_STEP2_3'; payload: Record<string, any> }
  | { type: 'UPDATE_STEP2_5'; payload: Record<string, any> }
  | { type: 'UPDATE_STEP3'; payload: Record<string, any> }
  | { type: 'UPDATE_STEP4'; payload: Record<string, any> }
  | { type: 'UPDATE_STEP5'; payload: Record<string, any> }
  | { type: 'RESET' };

const initialState: CasamentoState = {
  currentStep: 1,
  leadId: null,
  step1Data: {},
  step2Data: {},
  step2_3Data: {},
  step2_5Data: {},
  step3Data: {},
  step4Data: {},
  step5Data: {},
};

const casamentoReducer = (
  state: CasamentoState,
  action: CasamentoAction
): CasamentoState => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };

    case 'SET_LEAD_ID':
      return { ...state, leadId: action.payload };

    case 'UPDATE_STEP1':
      return { ...state, step1Data: { ...state.step1Data, ...action.payload } };

    case 'UPDATE_STEP2':
      return { ...state, step2Data: { ...state.step2Data, ...action.payload } };

    case 'UPDATE_STEP2_3':
      return { ...state, step2_3Data: { ...state.step2_3Data, ...action.payload } };

    case 'UPDATE_STEP2_5':
      return { ...state, step2_5Data: { ...state.step2_5Data, ...action.payload } };

    case 'UPDATE_STEP3':
      return { ...state, step3Data: { ...state.step3Data, ...action.payload } };

    case 'UPDATE_STEP4':
      return { ...state, step4Data: { ...state.step4Data, ...action.payload } };

    case 'UPDATE_STEP5':
      return { ...state, step5Data: { ...state.step5Data, ...action.payload } };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
};

interface CasamentoContextType {
  state: CasamentoState;
  dispatch: React.Dispatch<CasamentoAction>;
  goToStep: (step: number) => void;
  setLeadId: (id: string) => void;
  updateStep1: (data: Record<string, any>) => void;
  updateStep2: (data: Record<string, any>) => void;
  updateStep2_3: (data: Record<string, any>) => void;
  updateStep2_5: (data: Record<string, any>) => void;
  updateStep3: (data: Record<string, any>) => void;
  updateStep4: (data: Record<string, any>) => void;
  updateStep5: (data: Record<string, any>) => void;
  resetForm: () => void;
}

const CasamentoContext = createContext<CasamentoContextType | undefined>(undefined);

export const CasamentoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(casamentoReducer, initialState);

  const goToStep = (step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const setLeadId = (id: string) => {
    dispatch({ type: 'SET_LEAD_ID', payload: id });
  };

  const updateStep1 = (data: Record<string, any>) => {
    dispatch({ type: 'UPDATE_STEP1', payload: data });
  };

  const updateStep2 = (data: Record<string, any>) => {
    dispatch({ type: 'UPDATE_STEP2', payload: data });
  };

  const updateStep2_3 = (data: Record<string, any>) => {
    dispatch({ type: 'UPDATE_STEP2_3', payload: data });
  };

  const updateStep2_5 = (data: Record<string, any>) => {
    dispatch({ type: 'UPDATE_STEP2_5', payload: data });
  };

  const updateStep3 = (data: Record<string, any>) => {
    dispatch({ type: 'UPDATE_STEP3', payload: data });
  };

  const updateStep4 = (data: Record<string, any>) => {
    dispatch({ type: 'UPDATE_STEP4', payload: data });
  };

  const updateStep5 = (data: Record<string, any>) => {
    dispatch({ type: 'UPDATE_STEP5', payload: data });
  };

  const resetForm = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <CasamentoContext.Provider
      value={{
        state,
        dispatch,
        goToStep,
        setLeadId,
        updateStep1,
        updateStep2,
        updateStep2_3,
        updateStep2_5,
        updateStep3,
        updateStep4,
        updateStep5,
        resetForm,
      }}
    >
      {children}
    </CasamentoContext.Provider>
  );
};

export const useCasamento = () => {
  const context = useContext(CasamentoContext);
  if (!context) {
    throw new Error('useCasamento must be used within a CasamentoProvider');
  }
  return context;
};
