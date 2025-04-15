import { Dices } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 p-4 rounded-full">
          <Dices className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">
        Viewing Gambling as a Form of Entertainment
      </h1>
      <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
        Learn to evaluate gambling activities as entertainment expenses and understand their financial implications through interactive analysis.
      </p>
    </div>
  );
}