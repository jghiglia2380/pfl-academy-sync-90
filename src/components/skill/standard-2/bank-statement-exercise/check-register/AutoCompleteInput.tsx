import React, { useState, useEffect } from 'react';

interface AutoCompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  field: keyof any;
  transactions: any[];
  placeholder?: string;
  className?: string;
}

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  value,
  onChange,
  field,
  transactions,
  placeholder,
  className
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const getSuggestions = (input: string) => {
      if (!input) return [];
      
      const values = transactions
        .map(t => String(t[field]))
        .filter(Boolean)
        .filter(v => v.toLowerCase().includes(input.toLowerCase()));
      
      return [...new Set(values)];
    };

    setSuggestions(getSuggestions(value));
  }, [value, field, transactions]);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder={placeholder}
        className={`w-full p-1 focus:outline-none focus:ring-1 focus:ring-blue-500 ${className}`}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-md shadow-lg max-h-40 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-3 py-2 hover:bg-blue-50 cursor-pointer"
              onClick={() => {
                onChange(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteInput;