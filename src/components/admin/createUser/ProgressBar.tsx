
import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: totalSteps }, (_, index) => index + 1).map((step) => (
        <div key={step} className="flex items-center flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            step <= currentStep ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'
          }`}>
            {step}
          </div>
          {step < totalSteps && (
            <div className={`flex-1 h-1 mx-2 ${
              step < currentStep ? 'bg-red-500' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
