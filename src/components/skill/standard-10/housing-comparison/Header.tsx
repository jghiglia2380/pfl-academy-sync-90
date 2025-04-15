import { Home } from 'lucide-react';


export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="p-3 bg-blue-100 rounded-full">
          <Home className="h-8 w-8 text-blue-600" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Housing Options Comparison Exercise
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Compare housing options based on your personal priorities. Learn how to evaluate different living arrangements 
        and make informed decisions about your housing choices.
      </p>
    </div>
  );
}