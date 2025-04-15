import { Heart } from 'lucide-react'

export default function Header() {
  return (
    <div className="text-center mb-16">
      <div className="flex justify-center mb-6">
        <Heart className="h-20 w-20 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold text-blue-900 mb-6">
        Developing a Charitable Giving Strategy
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Create a personalized charitable giving strategy that aligns with your values and resources. 
        This exercise will help you plan thoughtful contributions to causes you care about.
      </p>
    </div>
  );
}