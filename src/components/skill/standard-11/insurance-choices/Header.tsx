import { FileText } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <FileText className="w-12 h-12 text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">
        Choosing the Right Insurance Type
      </h1>
      <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
        Practice identifying appropriate insurance types for different scenarios. Learn how to select
        the best coverage for various situations.
      </p>
    </div>
  );
}