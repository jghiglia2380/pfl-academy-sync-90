import React from 'react';

interface CompleteExerciseButtonProps {
  isValid: boolean;
  onClick: () => void;
}

export const CompleteExerciseButton: React.FC<CompleteExerciseButtonProps> = ({ isValid, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={!isValid}
      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
        isValid 
          ? 'bg-green-600 text-white hover:bg-green-700' 
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      }`}
    >
      Complete Exercise
    </button>
  );
};

export default CompleteExerciseButton;