import { Globe } from 'lucide-react';
import { countries } from '../../data/countries';

interface Props {
  citizenship: string;
  onChange: (citizenship: string) => void;
}

export default function CitizenshipForm({ citizenship, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Citizenship</h3>
      </div>
      
      <div>
        <select
          value={citizenship}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select your country of citizenship</option>
          {countries.map(country => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}