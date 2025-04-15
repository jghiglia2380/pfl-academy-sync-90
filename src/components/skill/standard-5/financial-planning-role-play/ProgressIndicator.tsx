import React from 'react';

type ProgressIndicatorProps = {
  currentStep: number;
};

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <>
      <div className="flex items-center">
        {[1, 2, 3, 4].map((stepNumber) => (
          <React.Fragment key={stepNumber}>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {stepNumber}
            </div>
            {stepNumber < 4 && (
              <div className={`flex-1 h-1 mx-2 ${
                currentStep > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600">
        <span>Character</span>
        <span>Plan</span>
        <span>Reflect</span>
        <span>Review</span>
      </div>
    </>
  );
}