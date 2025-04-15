import React from 'react';
import { AlertCircle } from 'lucide-react';

interface JustificationInputProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
}

const JustificationInput: React.FC<JustificationInputProps> = ({ value, onChange, isValid }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 mb-2">
        <AlertCircle className="h-5 w-5 text-blue-500 mt-1" />
        <p className="text-gray-700">
          Explain your choice in 2-3 sentences, considering the person's ability to pay
          and the impact on social equity.
        </p>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your justification here..."
        className={`w-full h-32 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
          ${!isValid && value ? 'border-red-500' : 'border-gray-300'}`}
      />

      {!isValid && value && (
        <p className="text-red-500 text-sm">
          Please provide a more detailed justification (at least 2-3 sentences).
        </p>
      )}
    </div>
  );
};

export default JustificationInput;