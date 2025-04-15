import React from 'react';
import { CheckCircle } from 'lucide-react';

const CompleteButton: React.FC = () => {
  const handleComplete = () => {
    // Here you can add completion logic
    alert('Exercise completed! Great job understanding different loan types.');
  };

  return (
    <div className="flex justify-end mt-8">
      <button
        onClick={handleComplete}
        className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
      >
        <CheckCircle className="w-5 h-5 mr-2" />
        Complete Exercise
      </button>
    </div>
  );
};

export default CompleteButton;