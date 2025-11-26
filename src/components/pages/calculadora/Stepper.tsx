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
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    transition-all duration-300
                    ${
                      isCompleted
                        ? 'bg-pink-600 text-white'
                        : isActive
                        ? 'bg-pink-600 text-white ring-4 ring-pink-200'
                        : 'bg-gray-200 text-gray-600'
                    }
                  `}
                >
                  {isCompleted ? <Check className="w-6 h-6" /> : stepNumber}
                </div>
                <span
                  className={`
                    text-xs mt-2 text-center hidden md:block
                    ${isActive ? 'text-pink-600 font-semibold' : 'text-gray-500'}
                  `}
                >
                  {step}
                </span>
              </div>
              {stepNumber < steps.length && (
                <div
                  className={`
                    flex-1 h-1 mx-2 transition-all duration-300
                    ${isCompleted ? 'bg-pink-600' : 'bg-gray-200'}
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
