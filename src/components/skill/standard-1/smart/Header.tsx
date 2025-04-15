import { Lightbulb } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <Lightbulb className="w-8 h-8 text-yellow-400 mr-2" />
        <h1 className="text-3xl font-bold text-black">5 SMART GOALS METHODS</h1>
      </div>
      <h2 className="text-xl text-black">What's Your Goal?</h2>
    </div>
  );
}