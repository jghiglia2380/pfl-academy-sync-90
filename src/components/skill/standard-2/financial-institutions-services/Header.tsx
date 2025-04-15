import { Building2 } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <Building2 className="h-16 w-16 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Exploring Financial Institutions and Services
      </h1>
      <p className="text-lg text-gray-600">
        This activity is designed to help you understand the various types of financial 
        institutions, the services they offer, and the ways you can pay for goods and 
        services. You'll answer comprehension questions and analyze real-world scenarios 
        to apply what you've learned.
      </p>
    </div>
  );
}