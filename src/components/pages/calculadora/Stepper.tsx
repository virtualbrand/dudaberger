'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface StepperProps {
  currentStep: number;
  steps: string[];
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: isCompleted || isActive ? 'var(--honey-bronze-500)' : 'var(--carbon-black-400)',
                    color: 'var(--old-lace-500)',
                    boxShadow: isActive ? '0 0 0 4px var(--honey-bronze-200)' : 'none'
                  }}
                >
                  {isCompleted ? <Check className="w-6 h-6" /> : stepNumber}
                </div>
                <span
                  className="text-xs mt-2 text-center hidden md:block font-semibold"
                  style={{
                    color: isActive ? 'var(--honey-bronze-500)' : 'var(--rosy-taupe-400)'
                  }}
                >
                  {step}
                </span>
              </div>
              {stepNumber < steps.length && (
                <div
                  className="flex-1 h-1 mx-2 transition-all duration-300"
                  style={{
                    backgroundColor: isCompleted ? 'var(--honey-bronze-500)' : 'var(--carbon-black-400)'
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
