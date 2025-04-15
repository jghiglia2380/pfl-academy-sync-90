import { FileText } from 'lucide-react';

export const ExerciseHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex justify-center items-center w-16 h-16 bg-blue-100 rounded-full mb-4">
        <FileText className="w-8 h-8 text-blue-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">W-4 Form Exercise</h1>
      <p className="text-gray-600">Learn how to complete a W-4 form for proper tax withholding from your paycheck.</p>
    </div>
  );
};